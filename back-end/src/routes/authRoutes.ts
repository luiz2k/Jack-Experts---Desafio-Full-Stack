import { Router } from "express";
import { AuthController } from "../controllers/authController";
import { authMiddleware } from "../middlewares/authMiddleware";
import { SessionRepository } from "../repositories/sessionRepository";
import { UserRepository } from "../repositories/userRepository";
import { AuthService } from "../services/authService";
import { SessionService } from "../services/sessionService";

// Rotas relacionadas a autenticação
class AuthRoutes {
	private router: Router;
	private authController: AuthController;

	constructor() {
		const userRepository = new UserRepository();
		const sessionRepository = new SessionRepository();
		const sessionService = new SessionService(sessionRepository);
		const authService = new AuthService(userRepository, sessionService);

		this.authController = new AuthController(authService);

		this.router = Router();

		this.routes();
	}

	private routes() {
		this.router.post(
			"/login",
			this.authController.login.bind(this.authController),
		);

		this.router.use(authMiddleware.handle.bind(authMiddleware));

		this.router.post(
			"/logout",
			this.authController.logout.bind(this.authController),
		);
	}

	public getRoutes() {
		return this.router;
	}
}

export const authRoutes = new AuthRoutes();
