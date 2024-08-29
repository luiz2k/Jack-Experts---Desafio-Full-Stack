// Classes responsável por gerar instâncias de erros de acordo com o tipo de erro

import { formatZodErrors } from "./formatZodErrors";
import { HttpStatusCode } from "./httpStatusCode";

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
		super(HttpStatusCode.BAD_REQUEST, message, zodErrors);
	}
}

export class UnauthorizedError extends ErrorBase {
	constructor(message: string) {
		super(HttpStatusCode.UNAUTHORIZED, message);
	}
}

export class ForbiddenError extends ErrorBase {
	constructor(message: string) {
		super(HttpStatusCode.FORBIDDEN, message);
	}
}

export class NotFoundError extends ErrorBase {
	constructor(message: string) {
		super(HttpStatusCode.NOT_FOUND, message);
	}
}

export class ConflictError extends ErrorBase {
	constructor(message: string) {
		super(HttpStatusCode.CONFLICT, message);
	}
}
