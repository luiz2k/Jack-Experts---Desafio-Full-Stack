import bcryptjs from "bcryptjs";
import { ConflictError } from "../helpers/errorHandler";

import type { IUserRepository } from "../repositories/interfaces/IUserRepository";
import type {
	CreateOutput,
	FindByEmailOutput,
	IUserService,
	UserInput,
} from "./interfaces/IUserService";

// Serviço responsável por lidar com a regra de negócio dos usuários
export class UserService implements IUserService {
	constructor(private readonly userRepository: IUserRepository) {}

	// Verifica se o usuário existe no sistema
	// Se não existir, faz a criptografia da senha e salva o usuário no sistema
	async create(data: UserInput): Promise<CreateOutput> {
		const userExists = await this.userRepository.findByEmail(data.email);

		if (userExists) {
			throw new ConflictError("E-mail já cadastrado.");
		}

		const SALT = 10;

		const hashPassword = bcryptjs.hashSync(data.password, SALT);

		const user = await this.userRepository.create({
			...data,
			password: hashPassword,
		});

		return {
			id: user.id,
			email: user.email,
		};
	}

	// Busca um usuário pelo seu e-mail
	async findByEmail(email: string): Promise<FindByEmailOutput | null> {
		const user = await this.userRepository.findByEmail(email);

		return user;
	}
}
