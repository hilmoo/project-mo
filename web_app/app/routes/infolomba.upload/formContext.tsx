import { createFormContext } from "@mantine/form";

import { CompetitionForm } from "types/infolomba";

export const [
  CompetitonFormProvider,
  useCompetitonFormContext,
  useCompetitonForm,
] = createFormContext<CompetitionForm>();
