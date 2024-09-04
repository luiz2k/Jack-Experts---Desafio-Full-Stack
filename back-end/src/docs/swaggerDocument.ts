import { schemas } from "./components/schemas";
import { securitySchemes } from "./components/securitySchemes";
import { auth } from "./paths/auth";
import { task } from "./paths/task";
import { user } from "./paths/user";

export const swaggerDocument = {
	openapi: "3.0.3",
	info: {
		title: "Jack Experts - Desafio",
		description: "API para gerenciamento de tarefas.",
	},

	components: {
		schemas,
		securitySchemes,
	},

	paths: {
		...auth,
		...user,
		...task,
	},
};
