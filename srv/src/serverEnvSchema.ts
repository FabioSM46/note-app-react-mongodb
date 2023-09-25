import { z, TypeOf } from "zod";
import dotenv from "dotenv";
dotenv.config();

const envSchema = z.object({
  SECRET: z.string().min(8),
  DATABASE_URL: z.string(),
  PORT: z.coerce.number().positive().default(8080),
  DOMAIN: z.string(),
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
export const envServerSchema = envSchema.parse(process.env);
