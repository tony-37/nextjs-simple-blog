import { Article } from "@/types";
import { format, parseISO } from "date-fns";

export const toUIDateFormat = (date: string) =>
  format(parseISO(date), "dd.MM.yyyy");

export const toUIDateTimeFormat = (date: string) =>
  format(parseISO(date), "dd.MM.yyyy, HH:mm");

export const getUrl = (prefix: string) =>
  `${process.env.NEXT_PUBLIC_STRAPI_URL}${prefix}`;
