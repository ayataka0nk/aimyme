"use server";

import { redirect } from "next/navigation";

export const searchItems = (formData: FormData) => {
  const keyword = formData.get("keyword") as string;
  const pathname = "/items";
  const urlSearchParams = new URLSearchParams();
  if (keyword) {
    urlSearchParams.set("keyword", keyword);
  }
  redirect(`${pathname}?${urlSearchParams.toString()}`);
};
