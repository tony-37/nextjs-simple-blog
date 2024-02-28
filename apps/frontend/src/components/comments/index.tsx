"use client";

import React from "react";
import useSWR from "swr";
import { Comment } from "@/types";
import CommentList from "./commentList";
import CommentForm from "./commentForm";

type ResponseData = {
  data: Comment[];
};

const fetcher = async (url: string) => {
  const response = await fetch(url);
  const responseData = await response.json();

  if (!response.ok) {
    throw new Error(responseData.message);
  }

  return responseData;
};

const Comments = ({ articleId }: { articleId: number }) => {
  const url = `http://localhost:3000/api/comments?articleId=${articleId}`;
  const { data, mutate, isLoading } = useSWR<ResponseData>(url, fetcher);
  const comments = data?.data ?? [];

  return (
    <div className="my-6 flex w-[1024px] flex-col items-center justify-center gap-5">
      {!comments || isLoading ? (
        <span>There are no comments...</span>
      ) : (
        <CommentList comments={comments} />
      )}
      <CommentForm articleId={articleId} mutate={mutate} />
    </div>
  );
};

export default Comments;
