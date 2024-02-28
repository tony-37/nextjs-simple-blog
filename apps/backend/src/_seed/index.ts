import { Strapi } from "@strapi/strapi";
import { generateArticleData } from "./article";
import { createSeedUser, seedUserExists } from "./user";

export const generateSeedData = async (strapi: Strapi) => {
  const skipGeneration = await seedUserExists(strapi);

  if (skipGeneration) {
    console.log("skipping seed data generation...");
    return;
  }

  console.log("generating seed data...");

  await Promise.all([
    generateArticleData(strapi),
    createSeedUser(strapi),
  ]).catch((e) => {
    console.error(
      "error during generating seed data! Stopping the application...",
    );
    throw new Error(e);
  });

  console.log("generating seed data has been finished successfully!");
};
