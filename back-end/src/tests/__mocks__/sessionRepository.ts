import { randomUUID } from "node:crypto";
import type {
	CreateSessionInput,
	ISessionRepository,
	SessionInput,
	SessionOutput,
	UpdateSessionInput,
} from "../../repositories/interfaces/ISessionRepository";

export class SessionRepository implements ISessionRepository {
	sessionRepository: SessionOutput[] = [];

	public async createSession(data: CreateSessionInput): Promise<void> {
		const { userId, ...rest } = data;

		const session = {
			id: randomUUID(),
			isValid: true,
			user: { id: userId },
			...rest,
		};

		this.sessionRepository.push(session);
	}

	public async findSession(data: SessionInput): Promise<SessionOutput | null> {
		const { userId, ...rest } = data;

		const session = this.sessionRepository.find((session) => {
			return session.user.id === userId && session.token === rest.token;
		});

		if (!session) {
			return null;
		}

		return session;
	}

	public async updateSession(data: UpdateSessionInput): Promise<void> {
		const sessions = this.sessionRepository.map((session) => {
			if (session.id === data.id) {
				return {
					...session,
					...data,
				};
			}

			return session;
		});

		this.sessionRepository = sessions;
	}

	public async removeSession(data: SessionInput): Promise<void> {
		const sessions = this.sessionRepository.filter((session) => {
			return session.user.id !== data.userId && session.token !== data.token;
		});

		this.sessionRepository = sessions;
	}
}
