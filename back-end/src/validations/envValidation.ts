import { z } from "zod";

const envSchema = z.object({
	PORT: z
		.string({
			message: "A porta deve ser informada.",
		})
		.transform((port) => Number(port)),
	CORS: z
		.string({
			message: "A URL de origem deve ser informada.",
		})
		.url({
			message: "A URL de origem deve ser uma URL válida.",
		}),

	TOKEN_SECRET: z.string({
		message: "Uma segredo para o JWT deve ser informado.",
	}),

	SWAGGER_ROUTE: z
		.string({
			message: "O caminho para a rota do Swagger deve ser informado.",
		})
		.regex(/^\/[a-zA-Z]+$/, {
			message: "O caminho deve começar com '/' seguido de letras. Ex: '/docs'.",
		}),
});

export const env = envSchema.parse(process.env);
