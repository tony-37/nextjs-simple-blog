"use client";

import React from "react";
import { Divider } from "@nextui-org/react";
import { Article, MetaData } from "@/types";
import ArticleComponent from "./article";
import CustomLink from "../ui/customLink";
import useSWR from "swr";
import Loading from "@/app/dashboard/loading";

type ResponseData = {
  data: Article[];
  meta: MetaData;
};

const INITIAL_POST_LIST = 2;
const INCREMENT_INITIAL_POST_LIST = 2;

const fetcher = async (url: string) => {
  const response = await fetch(url);
  const responseData = await response.json();

  if (!response.ok) {
    throw new Error(responseData.message);
  }

  return responseData;
};

const ArticlesComponent = async () => {
  const endRef = React.useRef<null | HTMLDivElement>(null);
  const [pageSize, setPageSize] = React.useState(INITIAL_POST_LIST);
  const { data, isLoading } = useSWR<ResponseData>(
    `http://localhost:3000/api/articles?pageSize=${pageSize}`,
    fetcher,
  );

  const articles = data?.data ?? [];
  const pagination = data?.meta.pagination ?? null;

  const handleLoadMore = () => {
    setPageSize((prev) => prev + INCREMENT_INITIAL_POST_LIST);
  };

  React.useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [data]);

  if (isLoading) {
    return <Loading />;
  }

  return articles.length ? (
    <div className="flex flex-col justify-center">
      {articles.map((article, i) => (
        <div>
          <ArticleComponent article={article} key={article.id} />
          {articles.length - 1 !== i && <Divider className="my-4" />}
        </div>
      ))}

      {pagination && pagination?.total > pageSize && (
        <div className="my-5 flex flex-col items-center justify-center">
          <CustomLink
            href="#"
            onClick={handleLoadMore}
            className="text-xl font-light"
          >
            Load More
          </CustomLink>
        </div>
      )}

      <div ref={endRef} />
    </div>
  ) : (
    <div className="flex h-full items-center justify-center text-xl font-thin">
      There are no articles...
    </div>
  );
};

export default ArticlesComponent;
