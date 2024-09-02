import { randomUUID } from "node:crypto";
import { SessionRepository } from "../../tests/__mocks__/sessionRepository";
import { SessionService } from "../sessionService";

import type { ISessionRepository } from "../../repositories/interfaces/ISessionRepository";
import type { ISessionService } from "../interfaces/ISessionService";

describe("SessionService", () => {
	let sessionRepository: ISessionRepository;
	let sessionService: ISessionService;

	beforeEach(() => {
		sessionRepository = new SessionRepository();
		sessionService = new SessionService(sessionRepository);
	});

	describe("verifyToken", () => {
		it("Deve retornar o payload se o token for valido", async () => {
			const userId = randomUUID();

			const session = await sessionService.generateSession(userId);

			const payload = await sessionService.verifySession(session.token);

			if (!payload) {
				throw new Error("Payload inválido");
			}

			expect(payload.sub).toEqual(userId);
			expect(payload).toHaveProperty("sub");
			expect(payload).toHaveProperty("iat");
			expect(payload).toHaveProperty("exp");
		});

		it("Deve retornar false se o token for inválido", async () => {
			const token = "token inválido";

			const result = await sessionService.verifySession(token);

			expect(result).toEqual(false);
		});
	});

	describe("generateSession", () => {
		it("Deve gerar um token de acesso", async () => {
			const userId = randomUUID();

			const session = await sessionService.generateSession(userId);

			expect(session.token).toBeDefined();
			expect(session.expiresIn).toBeDefined();
		});
	});
});
