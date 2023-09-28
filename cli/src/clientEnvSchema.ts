/* eslint-disable @typescript-eslint/no-namespace */
import { z, TypeOf } from "zod";

const envSchema = z.object({
  REACT_APP_SERVER_URL: z.string(),
});
declare global {
  namespace NodeJS {
    interface ProcessEnv extends TypeOf<typeof envSchema> {}
  }
}
try {
  envSchema.parse(process.env);
} catch (err) {
  if (err instanceof z.ZodError) {
    const { fieldErrors } = err.flatten();
    const errorMessage = Object.entries(fieldErrors)
      .map(([field, errors]) =>
        errors ? `${field}: ${errors.join(", ")}` : field
      )
      .join("\n  ");
    throw new Error(`Missing environment variables:\n  ${errorMessage}`);
  }
}
export const envClientSchema = envSchema.parse(process.env);
