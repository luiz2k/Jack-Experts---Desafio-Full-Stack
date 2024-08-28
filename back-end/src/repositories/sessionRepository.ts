import { AppDataSource } from "../database/data-source";
import { Session } from "../database/entities/sessionEntity";

import type {
	CreateSessionInput,
	ISessionRepository,
	SessionInput,
	SessionOutput,
	UpdateSessionInput,
} from "./interfaces/ISessionRepository";

export class SessionRepository implements ISessionRepository {
	sessionRepository = AppDataSource.getRepository(Session);

	public async createSession(data: CreateSessionInput): Promise<void> {
		const { userId, ...rest } = data;

		const session = this.sessionRepository.create({
			user: { id: userId },
			...rest,
		});

		await this.sessionRepository.save(session);
	}

	public async findSession(data: SessionInput): Promise<SessionOutput | null> {
		const { userId, ...rest } = data;

		const session = await this.sessionRepository.findOne({
			where: {
				user: { id: userId },
				...rest,
			},
			relations: ["user"],
			select: {
				user: {
					id: true,
				},
			},
			order: {
				createdAt: "DESC",
			},
		});

		return session;
	}

	public async updateSession(data: UpdateSessionInput): Promise<void> {
		await this.sessionRepository.update(data.id, data);
	}

	public async removeSession(data: SessionInput): Promise<void> {
		const { userId, ...rest } = data;

		await this.sessionRepository.delete({
			user: { id: userId },
			...rest,
		});
	}
}
