import { UnauthorizedError } from "../helpers/errorHandler";
import { SessionRepository } from "../repositories/sessionRepository";
import { SessionService } from "../services/sessionService";

import type { NextFunction, Request, Response } from "express";
import type { ISessionService } from "../services/interfaces/ISessionService";

// Middleware responsável por lidar com a autenticação
class AuthMiddleware {
	constructor(private readonly jwtService: ISessionService) {}

	// Verifica se o token de autenticação é válido
	// Se for válido coloca o payload no req.user
	public async handle(
		req: Request,
		_res: Response,
		next: NextFunction,
	): Promise<void> {
		const { authorization } = req.headers;

		if (!authorization) {
			throw new UnauthorizedError("Token inválido.");
		}

		const [bearer, token] = authorization.split(" ");

		if (bearer !== "Bearer" || !token) {
			throw new UnauthorizedError("Token inválido.");
		}

		const payload = await this.jwtService.verifyToken(token);

		if (!payload) {
			throw new UnauthorizedError("Token inválido.");
		}

		req.user = payload;

		next();
	}
}

const jwtRepository = new SessionRepository();
const jwtService = new SessionService(jwtRepository);
export const authMiddleware = new AuthMiddleware(jwtService);
