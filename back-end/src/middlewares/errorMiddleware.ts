import { HttpStatusCode } from "../helpers/httpStatusCode";

import type { NextFunction, Request, Response } from "express";
import type { ErrorBase } from "../helpers/errorHandler";

// Middleware para tratamento de erros
export class ErrorMiddleware {
	public handle(
		error: Error & ErrorBase,
		_req: Request,
		res: Response,
		_next: NextFunction,
	) {
		const statusCode: number =
			error.statusCode ?? HttpStatusCode.INTERNAL_SERVER_ERROR;
		const zodErrors = error.zodErrors;

		const message: string = error.statusCode
			? error.message
			: "Erro interno do servidor.";

		console.error(error);

		return res.status(statusCode).json({
			statusCode: statusCode,
			message: message,
			paths: zodErrors,
		});
	}
}
