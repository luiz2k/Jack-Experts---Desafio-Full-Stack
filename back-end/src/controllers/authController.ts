import { UnauthorizedError } from "../helpers/errorHandler";
import { loginSchema, logoutSchema } from "../validations/authValidation";

import type { Request, Response } from "express";
import type { IAuthService } from "../services/interfaces/IAuthService";

// Controlador responsável por lidar com as operações de autenticação
export class AuthController {
	constructor(private readonly authService: IAuthService) {}

	public async login(req: Request, res: Response): Promise<Response> {
		const isValidData = loginSchema.safeParse(req.body);

		if (!isValidData.success) {
			throw new UnauthorizedError("E-mail ou senha inválidos");
		}

		const token = await this.authService.login(isValidData.data);

		return res.status(200).json({
			message: "Login realizado com sucesso.",
			data: token,
		});
	}

	public async logout(req: Request, res: Response): Promise<Response> {
		const authorization = req.headers.authorization as string;
		const [_bearer, token] = authorization.split(" ");

		const isValidData = logoutSchema.safeParse(token);

		if (!isValidData.success) {
			throw new UnauthorizedError("Token inválido");
		}

		await this.authService.logout({ token: isValidData.data });

		return res.status(200).json({
			message: "Logout efetuado com sucesso.",
		});
	}
}
