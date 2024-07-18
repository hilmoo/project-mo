import { json } from "@remix-run/node";
import axios from "axios";
import dayjs from "dayjs";

import {
  APIResponseArr,
  Category,
  CompetitionArray,
  loaderIndex,
} from "types/infolomba";
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

    const competitionArray: CompetitionArray = json_competition.data.map(
      (item) => {
        return {
          ...item,
          deadlineUnix: dayjs(item.deadline).unix(),
          deadline: new Date(item.deadline).toLocaleString(),
        };
      },
    );

    if (json_competition.success) {
      const loadd: loaderIndex = {
        competition: competitionArray,
        category: categoryArray,
      };
      return json(loadd);
    } else {
      throw new Error("Failed to fetch data");
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    throw new Response("Failed to load data", { status: 500 });
  }
}
