export interface Competition {
  id: number;
  name: string;
  organizer: string;
  deadline: string;
  url: string;
  description: string;
  image: string;
  category: [];
}

export async function loader() {
  return fetch(`http://localhost:8000/home`);
}
