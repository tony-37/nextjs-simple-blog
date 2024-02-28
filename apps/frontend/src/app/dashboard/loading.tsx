import React from "react";
import { Spinner } from "@nextui-org/react";

const Loading: React.FC = () => {
  return (
    <>
      <div className="absolute bottom-0 left-0 right-0 top-0 flex h-full items-center justify-center">
        <Spinner label="Loading..." size="lg" color="default" />
      </div>
    </>
  );
};

export default Loading;
