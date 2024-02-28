import React from "react";
import { Comment } from "@/types";
import { Divider } from "@nextui-org/react";
import { toUIDateTimeFormat } from "@/utils";

const CommentList = ({ comments }: { comments: Comment[] }) => {
  return (
    <ul className="w-full">
      {comments.map((comment, i) => (
        <>
          <li
            key={comment.id}
            className="flex flex-col justify-between gap-1 font-medium"
          >
            <div className=" text-lg">{comment.attributes.message}</div>

            <div className="flex justify-between text-sm">
              <div>author: {comment.attributes.author ?? "-"}</div>
              <div>
                {" "}
                published:{" "}
                <span className="text-crimson">
                  {toUIDateTimeFormat(comment.attributes.publishedAt)}
                </span>
              </div>
            </div>
          </li>
          {comments.length - 1 !== i && <Divider className="my-4" />}
        </>
      ))}
    </ul>
  );
};

export default CommentList;
