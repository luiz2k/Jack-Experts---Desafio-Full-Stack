import { z } from "zod";

const envSchema = z.object({
	PORT: z.string().transform((port) => Number(port)),
	CORS: z.string().url(),

	TOKEN_SECRET: z.string(),
});

export const env = envSchema.parse(process.env);
