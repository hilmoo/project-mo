import { defer } from "@remix-run/node";
import axios from "axios";

import { APIResponseArr, Category, CompetitionArray } from "types/infolomba";
import { env } from "~/env.server";

export async function loader() {
  try {
    const response_category = await axios(
      `${env.API_ENDPOINT}infolomba/category`,
    );
    const categoryArray: Array<Category> = response_category.data;
    const response_competition = await axios.get(
      `${env.API_ENDPOINT}infolomba/home`,
    );
    const json_competition: APIResponseArr = response_competition.data;

    const competitionArray: CompetitionArray = [];
    json_competition.data.forEach((item) => {
      competitionArray.push({
        ...item,
        deadlineLocal: new Date(item.deadline).toLocaleString(),
      });
    });

    return defer({
      categoryArray,
      competition: competitionArray,
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    throw new Response("Failed to load data", { status: 500 });
  }
}
