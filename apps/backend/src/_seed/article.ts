import { Strapi } from "@strapi/strapi";
import { UploadFile, uploadFile } from "./helpers";
import { faker } from "@faker-js/faker";
import { join } from "path";

export const generateArticleData = async (strapi: Strapi) => {
  console.log("generating articles");

  const { DEV_SEED_DATA_ARTICLESS } = process.env;
  const articlesSize = DEV_SEED_DATA_ARTICLESS
    ? parseInt(DEV_SEED_DATA_ARTICLESS)
    : 5;

  const uploadedArticleMedia = await uploadFile(
    strapi,
    generateArticleUploadsData(articlesSize),
  );

  const bulkArticlePromises = [];
  const randomArticlesData = new Array(articlesSize)
    .fill(null)
    .map(_randomArticle);

  for (let i = 0; i < randomArticlesData.length; i++) {
    const randomArticleData = randomArticlesData[i];
    const image = uploadedArticleMedia[i].id;

    const randomArticlePromise = strapi.entityService.create(
      "api::article.article",
      {
        data: {
          ...randomArticleData,
          image,
        },
      },
    );
    bulkArticlePromises.push(randomArticlePromise);
  }

  await Promise.all(bulkArticlePromises);
};

const generateArticleUploadsData = (seeds: number): UploadFile[] => {
  return new Array(seeds).fill(null).map((_, i) => ({
    data: {
      refId: Date.now().toString(),
      ref: "api::article.article",
      field: "image",
    },
    file: {
      path: join(__dirname, `../../../src/_seed/images/${i + 1}.jpg`),
      name: `${i + 1}.jpeg`,
      type: "image/jpeg",
    },
  }));
};

const _randomArticle = () => {
  return {
    title: `${faker.word.adjective()} ${faker.word.noun()}`,
    category: faker.word.sample(),
    description: faker.lorem.paragraph(30),
    author: faker.person.fullName(),
    publishedAt: new Date().toISOString(),
  };
};
