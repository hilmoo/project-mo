import { LoaderFunctionArgs } from "react-router-dom";

export async function loader({ params }: LoaderFunctionArgs) {
  return fetch(`http://localhost:8000/items/${params.competitionId}`);
}
