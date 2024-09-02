import { SessionRepository } from "../../tests/__mocks__/sessionRepository";
import { UserRepository } from "../../tests/__mocks__/userRepository";
import { AuthService } from "../authService";

import type { ISessionRepository } from "../../repositories/interfaces/ISessionRepository";
import type { IUserRepository } from "../../repositories/interfaces/IUserRepository";
import type { IAuthService } from "../interfaces/IAuthService";
import type { ISessionService } from "../interfaces/ISessionService";
import { SessionService } from "../sessionService";

describe("authService", () => {
	let userRepository: IUserRepository;
	let sessionRepository: ISessionRepository;
	let sessionService: ISessionService;
	let authService: IAuthService;

	beforeEach(() => {
		userRepository = new UserRepository();
		sessionRepository = new SessionRepository();
		sessionService = new SessionService(sessionRepository);
		authService = new AuthService(userRepository, sessionService);
	});

	describe("login", () => {
		it("Deve fazer o login e retornar a sessão", async () => {
			const data = {
				email: "example@ex.com",
				password: "123456",
			};

			const session = await authService.login(data);

			expect(session).toHaveProperty("token");
			expect(session.token).toBeDefined();
		});

		it("Deve retornar um erro se o email for inválido", async () => {
			const data = {
				email: "example@error.com",
				password: "123456",
			};

			await expect(authService.login(data)).rejects.toThrow(
				"E-mail ou senha inválidos",
			);
		});

		it("Deve retornar um erro se o password for inválido", async () => {
			const data = {
				email: "example@ex.com",
				password: "error",
			};

			await expect(authService.login(data)).rejects.toThrow(
				"E-mail ou senha inválidos",
			);
		});
	});
});
