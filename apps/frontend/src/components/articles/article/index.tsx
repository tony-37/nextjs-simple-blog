import React from "react";

import { Article } from "@/types";
import { getUrl, toUIDateFormat } from "@/utils";

import Link from "next/link";
import Image from "next/image";
import CustomLink from "../../ui/customLink";

const ArticleComponent = ({ article }: { article: Article }) => {
  const {
    id,
    attributes: {
      category,
      description,
      title,
      createdAt,
      image: { data: dateImage },
    },
  } = article;

  return (
    <div
      className="my-[50px] flex items-center gap-[50px] px-48"
      key={article.id}
    >
      <div className="flex flex-[1] justify-center">
        {dateImage && (
          <Link href={`/article/${id}`} className="">
            <Image
              src={getUrl(dateImage.attributes.url)}
              width={400}
              height={400}
              alt=""
              className="object-cover"
            />
          </Link>
        )}
      </div>

      <div className="flex flex-[1] flex-col gap-[30px]">
        <div className="flex items-center gap-2 text-sm">
          <span className="text-gray-500">{toUIDateFormat(createdAt)} - </span>
          <span className="font-medium uppercase text-crimson">{category}</span>
        </div>
        <Link href={`/article/${id}`}>
          <h1 className="text-2xl transition-colors hover:text-crimson-hover">
            {title}
          </h1>
        </Link>
        <p className="text-md font-light text-[#626262]">{`${description.substring(0, 200)}`}</p>

        <CustomLink href={`/article/${id}`}>Read More</CustomLink>
      </div>
    </div>
  );
};

export default ArticleComponent;
