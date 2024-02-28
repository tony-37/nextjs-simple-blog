"use client";

import React from "react";

import Link from "next/link";
import { StyledProps } from "@/types";
import clsx from "clsx";

type Props = {
  href: string;
  onClick?: () => void;
  children: React.ReactNode;
} & StyledProps;

const CustomLink = ({ href, onClick, className, style, children }: Props) => {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={clsx(
        className,
        "relative w-fit after:absolute after:left-0 after:block after:h-[1px] after:w-0 after:bg-crimson after:content-[''] after:transition-width hover:after:w-full focus:after:w-full",
      )}
      style={style}
    >
      {children}
    </Link>
  );
};

export default CustomLink;
