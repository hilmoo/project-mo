import { json, LoaderFunctionArgs } from "@remix-run/node";
import axios from "axios";

import { APIResponse, Competition } from "types/infolomba";
import { env } from "~/env.server";

export async function loader({ params }: LoaderFunctionArgs) {
  try {
    const response = await axios.get(
      `${env.API_ENDPOINT}infolomba/detail/${params.competitionId}`,
    );
    const jsonResponse: APIResponse = response.data;

    if (jsonResponse.success) {
      const competition: Competition | undefined = jsonResponse.data;
      if (competition) {
        competition.deadline = new Date(competition.deadline).toLocaleString();
        return json(competition);
      }
    } else {
      throw new Error("Failed to fetch data");
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    throw new Response("Failed to load data", { status: 500 });
  }
}
