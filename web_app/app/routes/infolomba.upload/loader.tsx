import { json } from "@remix-run/react";
import axios from "axios";
import { env } from "~/env.server";

import { Category, loaderUpload } from "~/types/infolomba";

export async function loader() {
  try {
    const response_category = await axios(
      `${env.API_ENDPOINT}infolomba/category`,
    );
    const categoryArray: Array<Category> = response_category.data;
    const endpoint = env.API_ENDPOINT ?? "";
    const turnstile = env.TURNSTILE_SITE_KEY ?? "";

    const loadd: loaderUpload = {
      categoryArray: categoryArray,
      endpoint: endpoint,
      turnstile: turnstile,
    };
    return json(loadd);
  } catch (error) {
    console.error("Error fetching data:", error);
    throw new Response("Failed to load data", { status: 500 });
  }
}
