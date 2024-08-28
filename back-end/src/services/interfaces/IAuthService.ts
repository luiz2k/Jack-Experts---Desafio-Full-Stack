import type { GenerateSessionOutput } from "./ISessionService";

export type LoginInput = {
	email: string;
	password: string;
};

export type LogoutInput = {
	token: string;
};

export interface IAuthService {
	login(data: LoginInput): Promise<GenerateSessionOutput>;

	logout(data: LogoutInput): Promise<void>;
}
