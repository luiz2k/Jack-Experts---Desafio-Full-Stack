import bcrypt from "bcryptjs";
import { UnauthorizedError } from "../helpers/errorHandler";

import type { IUserRepository } from "../repositories/interfaces/IUserRepository";
import type {
	IAuthService,
	LoginInput,
	LogoutInput,
} from "./interfaces/IAuthService";
import type {
	GenerateSessionOutput,
	ISessionService,
} from "./interfaces/ISessionService";

// Serviço responsável por lidar com a regra de negócio da autenticação
export class AuthService implements IAuthService {
	constructor(
		private readonly userRepository: IUserRepository,
		private readonly sessionService: ISessionService,
	) {}

	// Verifica se o usuário existe no sistema
	// Se existir, verifica se a senha é a correta
	// Se for, gera uma nova sessão e retorna a mesma
	public async login(data: LoginInput): Promise<GenerateSessionOutput> {
		const user = await this.userRepository.findByEmail(data.email);

		if (!user) {
			throw new UnauthorizedError("E-mail ou senha inválidos");
		}

		const isValidPassword = bcrypt.compareSync(data.password, user.password);

		if (!isValidPassword) {
			throw new UnauthorizedError("E-mail ou senha inválidos");
		}

		const userId = user.id;

		const session = await this.sessionService.generateSession(userId);

		return session;
	}

	// Faz uma solicitação para o sessionService para invalidar uma sessão
	public async logout(data: LogoutInput) {
		await this.sessionService.updateSession({
			token: data.token,
			isValid: false,
		});
	}
}
