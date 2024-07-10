import { LoaderFunctionArgs } from "react-router-dom";
import { json } from "@remix-run/node";
import { Competition } from "../infolomba/interface";

async function fetchData(url: string) {
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

export async function loader({ params }: LoaderFunctionArgs) {
  const url = `http://localhost:8000/items/${params.competitionId}`;
  const datas: Competition = await fetchData(url);
  return json(datas);
}
