import { BadRequestError } from "../helpers/errorHandler";
import { createUserSchema } from "../validations/userValidation";

import type { Request, Response } from "express";
import type { IUserService } from "../services/interfaces/IUserService";

// Controlador responsável por lidar com as operações de usuários
export class UserController {
	constructor(private readonly userService: IUserService) {}

	// Válida se os dados recebido pelo body está correto
	// Se tiver tudo correto, envia os dados para o serviço de usuários
	async create(req: Request, res: Response): Promise<Response> {
		const isValidData = createUserSchema.safeParse(req.body);

		if (!isValidData.success) {
			const errors = isValidData.error.issues;

			throw new BadRequestError("Erro na validação dos dados.", errors);
		}

		const user = await this.userService.create(isValidData.data);

		return res.status(201).json({
			message: "Usuário criado com sucesso.",
			data: user,
		});
	}
}
