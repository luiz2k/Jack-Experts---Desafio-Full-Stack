import cors from "cors";
import express from "express";
import swaggerUi from "swagger-ui-express";
import { ErrorMiddleware } from "./middlewares/errorMiddleware";

import type { Express, Router } from "express";
import { swaggerDocument } from "./docs/swaggerDocument";

// Classe principal da aplicação
export class App {
	private app: Express;
	private errorMiddleware: ErrorMiddleware;

	constructor() {
		this.app = express();
		this.errorMiddleware = new ErrorMiddleware();
	}

	// Configura o CORS e o middleware de JSON
	public config(CORS: string): void {
		this.app.use(express.json());
		this.app.use(cors({ origin: CORS }));
	}

	// Configura as rotas da aplicação
	public routes(path: string, routes: Router): void {
		this.app.use(path, routes);
	}

	// Configura o middleware de erro
	public errorHandler(): void {
		this.app.use(this.errorMiddleware.handle);
	}

	public swaggerDocumentation(path: string): void {
		this.app.use(path, swaggerUi.serve, swaggerUi.setup(swaggerDocument));
	}

	// Inicia o servidor
	public start(port: number): void {
		this.app.listen(port, (): void => {
			console.log(`Servidor iniciado na porta ${port}!`);
		});
	}
}
