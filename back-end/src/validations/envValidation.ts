import { z } from "zod";

const envSchema = z.object({
	PORT: z.string().transform((port) => Number(port)),
	CORS: z.string().url(),

	TOKEN_SECRET: z.string(),

	SWAGGER_ROUTE: z.string().regex(/^\/[a-zA-Z]+$/, {
		message: "O caminho deve começar com '/' seguido de letras apenas.",
	}),
});

export const env = envSchema.parse(process.env);
