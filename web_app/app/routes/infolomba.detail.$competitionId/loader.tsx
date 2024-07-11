import { json, LoaderFunctionArgs } from "@remix-run/node";
import dayjs from "dayjs";

import { Competition } from "../infolomba/context";

async function fetchData(url: string) {
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

export async function loader({ params }: LoaderFunctionArgs) {
  const url = `http://localhost:8000/items/${params.competitionId}`;
  const data: Competition = await fetchData(url);
  data.deadlineSTR = new Date(
    dayjs.unix(data.deadline).toISOString(),
  ).toLocaleString();
  return json(data);
}
