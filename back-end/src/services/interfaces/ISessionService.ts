export type UpdateSessionInput = {
	token: string;
	createdAt?: Date;
	expiresAt?: Date;
	isValid?: boolean;
};

export type GenerateSessionOutput = {
	token: string;
	expiresIn: number;
};

export type Payload = {
	sub: string;
	iat: number;
	exp: number;
};

export interface ISessionService {
	verifySession(token: string): Promise<Payload | false>;

	generateSession(userId: string): Promise<GenerateSessionOutput>;

	updateSession(data: UpdateSessionInput): Promise<void>;
}
