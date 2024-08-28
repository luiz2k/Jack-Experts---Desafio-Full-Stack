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
	// Se não existir, cria um novo com os dados recebidos
	async create(data: UserInput): Promise<UserOutput> {
		const userExists = await this.UserRepository.findByEmail(data.email);

		if (userExists) {
			throw new ConflictError("E-mail já cadastrado.");
		}

		const user = await this.UserRepository.create(data);

		return {
			id: user.id,
			email: user.email,
		};
	}
}
