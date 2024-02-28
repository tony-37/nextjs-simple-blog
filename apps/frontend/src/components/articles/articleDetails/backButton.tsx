"use client";

import React from "react";
import { useRouter } from "next/navigation";
import CustomLink from "../../ui/customLink";

const BackButton = () => {
  const router = useRouter();
  return (
    <CustomLink href="#" onClick={() => router.back()}>
      Go to back
    </CustomLink>
  );
};

export default BackButton;
