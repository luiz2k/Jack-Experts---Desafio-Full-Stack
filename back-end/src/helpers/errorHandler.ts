// Classes responsável por gerar instâncias de erros de acordo com o tipo de erro

import { formatZodErrors } from "./formatZodErrors";

import type { ZodIssue } from "zod";
import type { ZodErrors } from "../types/error";

// Classe base para todos os outros tipos de erros
export class ErrorBase extends Error {
	public readonly zodErrors: ZodErrors[] | undefined;

	constructor(
		public readonly statusCode: number,
		public readonly message: string,
		zodErrors?: ZodIssue[],
	) {
		const formattedErrors = zodErrors && formatZodErrors(zodErrors);

		super(message);

		this.statusCode = statusCode;
		this.zodErrors = formattedErrors;
	}
}

export class BadRequestError extends ErrorBase {
	constructor(
		public readonly message: string,
		zodErrors?: ZodIssue[],
	) {
		const statusCode: number = 400;

		super(statusCode, message, zodErrors);
	}
}

export class UnauthorizedError extends ErrorBase {
	constructor(message: string) {
		const statusCode: number = 401;

		super(statusCode, message);
	}
}

export class ForbiddenError extends ErrorBase {
	constructor(message: string) {
		const statusCode: number = 403;

		super(statusCode, message);
	}
}

export class NotFoundError extends ErrorBase {
	constructor(message: string) {
		const statusCode: number = 404;

		super(statusCode, message);
	}
}

export class ConflictError extends ErrorBase {
	constructor(message: string) {
		const statusCode: number = 409;

		super(statusCode, message);
	}
}
