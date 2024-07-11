export interface Competition {
  id: number;
  name: string;
  organizer: string;
  deadline: number;
  deadlineSTR: string;
  url: string;
  description: string;
  image: string;
  category: Array<string>;
}

export interface CompetitionArray extends Array<Competition> {}
