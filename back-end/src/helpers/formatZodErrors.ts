import type { ZodIssue } from "zod";
import type { ZodErrors } from "../types/error";

// Responsável por formatar as mensagens de erro do Zod
export function formatZodErrors(errors: ZodIssue[]): ZodErrors[] {
	const formattedError = errors.map((error) => ({
		path: error.path.join("."),
		message: error.message,
	}));

	return formattedError;
}
