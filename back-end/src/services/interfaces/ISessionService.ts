export type GenerateSessionOutput = {
	session: {
		token: string;
		expiresIn: number;
	};
};

export type Payload = {
	sub: string;
	iat: number;
	exp: number;
};

export interface ISessionService {
	verifyToken(token: string): Promise<Payload | false>;

	generateSession(userId: string): Promise<GenerateSessionOutput>;
}
