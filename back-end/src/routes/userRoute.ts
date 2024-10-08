import { Router } from "express";
import { UserController } from "../controllers/userController";
import { UserRepository } from "../repositories/userRepository";
import { UserService } from "../services/userService";

// Rotas relacionadas aos usuários
class UserRoutes {
	private router: Router;
	private userController: UserController;

	constructor() {
		const userRepository = new UserRepository();
		const userService = new UserService(userRepository);

		this.userController = new UserController(userService);

		this.router = Router();

		this.routes();
	}

	private routes() {
		this.router.post("/", this.userController.create.bind(this.userController));
	}

	public getRoutes() {
		return this.router;
	}
}

export const userRoutes = new UserRoutes();
