import { Button, Textarea } from "@nextui-org/react";
import React from "react";

type Props = {
  articleId: number;
  mutate: () => void;
};

const CommentForm = ({ articleId, mutate }: Props) => {
  const [message, setMessage] = React.useState("");

  const handleSubmit = async () => {
    await fetch("/api/comments", {
      method: "POST",
      body: JSON.stringify({ message, article: articleId, author: "User" }),
    });

   //  mutate();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full flex-col items-end gap-5"
    >
      <Textarea
        variant="flat"
        labelPlacement="outside"
        placeholder="Enter your comment"
        className=" block"
        value={message}
        onValueChange={setMessage}
      />
      <div className="">
        <Button type="submit" size="sm">
          Submit
        </Button>
      </div>
    </form>
  );
};

export default CommentForm;
