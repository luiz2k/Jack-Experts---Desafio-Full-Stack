import { AppDataSource } from "../database/data-source";
import { User } from "../database/entities/userEntity";

import type {
	IUserRepository,
	UserInput,
	UserOutput,
} from "./interfaces/IUserRepository";

// Responsável por executar as operações no banco de dados relacionadas aos usuários
export class UserRepository implements IUserRepository {
	userRepository = AppDataSource.getRepository(User);

	// Salva um novo usuário
	public async create(data: UserInput): Promise<UserOutput> {
		const user = this.userRepository.create(data);

		await this.userRepository.save(user);

		return user;
	}

	// Busca um usuário
	public async findByEmail(email: string): Promise<UserOutput | null> {
		const user = await this.userRepository.findOne({
			where: {
				email,
			},
		});

		return user;
	}
}
