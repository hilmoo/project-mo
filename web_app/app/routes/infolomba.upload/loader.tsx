import { ActionFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/react";

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const values = JSON.parse(formData.get("uploadCompetition") as string);

  const response = await fetch("https://your-backend-api/endpoint", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  });

  const result = await response.json();

  return json(result);
}
