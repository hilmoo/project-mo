import { createFormContext } from "@mantine/form";

interface CompetitionForm {
  name: string;
  organizer: string;
  deadline: string;
  url: string;
  description: string;
  image: File[];
  category: Array<string>;
}

export const [
  CompetitonFormProvider,
  useCompetitonFormContext,
  useCompetitonForm,
] = createFormContext<CompetitionForm>();
