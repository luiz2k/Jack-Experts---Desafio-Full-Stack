import jwt from "jsonwebtoken";
import { UnauthorizedError } from "../helpers/errorHandler";
import { env } from "../validations/envValidation";

import type { ISessionRepository } from "../repositories/interfaces/ISessionRepository";
import type {
	GenerateSessionOutput,
	ISessionService,
	Payload,
	UpdateSessionInput,
} from "./interfaces/ISessionService";

// Serviço responsável por lidar com a regra de negócio da sessão
export class SessionService implements ISessionService {
	constructor(private readonly sessionRepository: ISessionRepository) {}

	// Verifica se o token é válido
	public async verifyToken(token: string): Promise<Payload | false> {
		try {
			const decoded = jwt.verify(token, env.TOKEN_SECRET) as Payload;

			return decoded;
		} catch {
			return false;
		}
	}

	// Gera um novo token e salva a sessão no banco de dados
	public async generateSession(userId: string): Promise<GenerateSessionOutput> {
		const TIMESTAMP_IN_MILLISECONDS = Date.now();
		const TIMESTAMP_IN_SECONDS = Math.floor(TIMESTAMP_IN_MILLISECONDS / 1000);
		const ONE_HOUR = 60 * 60;
		const EXPIRES_IN_ONE_HOUR = TIMESTAMP_IN_SECONDS + ONE_HOUR;
		const EXPIRES_IN_ONE_HOUR_IN_MILLISECONDS = EXPIRES_IN_ONE_HOUR * 1000;

		const sessionPayload: Payload = {
			sub: userId,
			iat: TIMESTAMP_IN_SECONDS,
			exp: EXPIRES_IN_ONE_HOUR,
		};

		const token = jwt.sign(sessionPayload, env.TOKEN_SECRET);

		await this.sessionRepository.createSession({
			userId: userId,
			token: token,
			createdAt: new Date(TIMESTAMP_IN_MILLISECONDS),
			expiresAt: new Date(EXPIRES_IN_ONE_HOUR * 1000),
		});

		return {
			session: {
				token: token,
				expiresIn: EXPIRES_IN_ONE_HOUR_IN_MILLISECONDS,
			},
		};
	}

	// Verifica se o token é válido e se ele existe no banco de dados
	// Se tiver tudo correto, atualiza a sessão no banco de dados
	public async updateSession(data: UpdateSessionInput): Promise<void> {
		const verify = await this.verifyToken(data.token);

		if (!verify) {
			throw new UnauthorizedError("Sessão inválida.");
		}

		const session = await this.sessionRepository.findSession({
			userId: verify.sub,
			token: data.token,
		});

		if (!session) {
			throw new UnauthorizedError("Sessão inválida.");
		}

		await this.sessionRepository.updateSession({
			id: session.id,
			...data,
		});
	}
}
