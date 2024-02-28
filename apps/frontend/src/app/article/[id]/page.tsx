import React from "react";
import ArticleDetails from "@/components/articles/articleDetails";

type Props = {
  params: {
    id: string;
  };
};

const Page = ({ params }: Props) => {
  return <ArticleDetails {...params} />;
};

export default Page;
