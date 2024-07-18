import { z } from "zod";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const requiredInProduction: z.RefinementEffect<
  string | undefined
>["refinement"] = (value, ctx) => {
  if (process.env.NODE_ENV === "production" && !value) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Missing required environment variable " + ctx.path.join("."),
    });
  }
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const requiredInDevelopment: z.RefinementEffect<
  string | undefined
>["refinement"] = (value, ctx) => {
  if (process.env.NODE_ENV === "development" && !value) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Missing required environment variable " + ctx.path.join("."),
    });
  }
};

const envSchema = z.object({
  API_ENDPOINT: z.string().optional(),
  TURNSTILE_SITE_KEY: z.string().optional(),
});

export const env = envSchema.parse(process.env);
