import { json } from "@remix-run/node";
import { DateTime } from "luxon";
import { CompetitionArray } from "../infolomba/interface";

async function fetchData() {
  const response = await fetch("http://localhost:8000/home");
  const data = await response.json();
  return data;
}

export async function loader() {
  const data = await fetchData();
  const competitionArray: CompetitionArray = data.map(
    (item: { deadline: number; deadlineSTR: string }) => {
      return {
        ...item,
        deadlineSTR: DateTime.fromSeconds(item.deadline).toLocaleString(),
      };
    },
  );
  return json(competitionArray);
}
