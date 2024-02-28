"use client";

import React from "react";

import { Article } from "@/types";
import { getUrl } from "@/utils";
import { Divider, Image } from "@nextui-org/react";

import Comments from "../../comments";
import Loading from "@/app/dashboard/loading";
import BackButton from "./backButton";
import useSWR from "swr";

interface ResponseData {
  data: Article;
}

const fetcher = async (url: string) => {
  const response = await fetch(url);
  const responseData = await response.json();

  if (!response.ok) {
    throw new Error(responseData.message);
  }

  return responseData;
};

const ArticleDetailsComponent = ({ id }: { id: string }) => {
  const url = `http://localhost:3000/api/articles/${id}`;

  const { data, isLoading } = useSWR<ResponseData>(url, fetcher);
  const article = data?.data ?? null;

  if (!article || isLoading) {
    return <Loading />;
  }

  const imageUrl = article.attributes.image?.data?.attributes?.url;

  return (
    <div className="relative flex flex-col items-center justify-center px-[130px]">
      <div className="absolute left-10 top-10">
        <BackButton />
      </div>

      <div className="my-6 flex px-[230px] flex-col items-center justify-center gap-10">
        <div className="flex-[2]">
          {imageUrl && (
            <Image src={getUrl(imageUrl)} width={800} height={800} alt="" className="object-cover" />
          )}
        </div>

        <div className="flex flex-[1] flex-col gap-3">
          <h1 className="text-2xl transition">{article?.attributes.title}</h1>
          <p className="text-md font-light text-[#626262]">
            {article?.attributes.description}
          </p>
        </div>
      </div>

      <Divider className="my-4" />

      <Comments articleId={Number(id)} />
    </div>
  );
};

export default ArticleDetailsComponent;
