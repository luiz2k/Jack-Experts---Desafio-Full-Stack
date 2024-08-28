export type CreateSessionInput = {
	userId: string;
	token: string;
	createdAt: Date;
	expiresAt: Date;
};

export type SessionOutput = {
	id: string;
	token: string;
	createdAt: Date;
	expiresAt: Date;
	isValid: boolean;
	user: {
		id: string;
	};
};

export type UpdateSessionInput = {
	id: string;
	token?: string;
	createdAt?: Date;
	expiresAt?: Date;
	isValid?: boolean;
};

export type SessionInput = {
	userId: string;
	token: string;
};

export interface ISessionRepository {
	createSession(data: CreateSessionInput): Promise<void>;

	findSession(data: SessionInput): Promise<SessionOutput | null>;

	updateSession(data: UpdateSessionInput): Promise<void>;

	removeSession(data: SessionInput): Promise<void>;
}
