import { BadRequestError } from "../helpers/errorHandler";
import { HttpStatusCode } from "../helpers/httpStatusCode";
import { createUserSchema } from "../validations/userValidation";

import type { Request, Response } from "express";
import type { IUserService } from "../services/interfaces/IUserService";

// Controlador responsável por lidar com as operações de usuários
export class UserController {
	constructor(private readonly userService: IUserService) {}

	async create(req: Request, res: Response): Promise<Response> {
		const isValidData = createUserSchema.safeParse(req.body);

		if (!isValidData.success) {
			const errors = isValidData.error.issues;

			throw new BadRequestError("Erro na validação dos dados.", errors);
		}

		const user = await this.userService.create(isValidData.data);

		return res.status(HttpStatusCode.CREATED).json({
			statusCode: HttpStatusCode.CREATED,
			message: "Usuário criado com sucesso.",
			data: user,
		});
	}
}
