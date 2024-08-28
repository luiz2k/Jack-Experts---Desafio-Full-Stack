import bcryptjs from "bcryptjs";
import { ConflictError } from "../helpers/errorHandler";

import type { IUserRepository } from "../repositories/interfaces/IUserRepository";
import type {
	IUserService,
	UserInput,
	UserOutput,
} from "./interfaces/IUserService";

// Serviço responsável por lidar com a regra de negócio dos usuários
export class UserService implements IUserService {
	constructor(private readonly UserRepository: IUserRepository) {}

	// Verifica se o usuário existe no sistema
	// Se não existir, faz a criptografia da senha e salva o usuário no sistema
	async create(data: UserInput): Promise<UserOutput> {
		const userExists = await this.UserRepository.findByEmail(data.email);

		if (userExists) {
			throw new ConflictError("E-mail já cadastrado.");
		}

		const SALT = 10;

		const hashPassword = bcryptjs.hashSync(data.password, SALT);

		const user = await this.UserRepository.create({
			...data,
			password: hashPassword,
		});

		return {
			id: user.id,
			email: user.email,
		};
	}
}
