import { json } from "@remix-run/node";
import dayjs from "dayjs";

import { CompetitionArray } from "types/infolomba";

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
        deadlineSTR: new Date(
          dayjs.unix(item.deadline).toISOString(),
        ).toLocaleString(),
      };
    },
  );
  return json(competitionArray);
}
