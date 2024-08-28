import express from "express";
import { ErrorMiddleware } from "./middlewares/errorMiddleware";

import type { Express, Router } from "express";

export class App {
	private app: Express;
	private errorMiddleware: ErrorMiddleware;

	constructor() {
		this.app = express();
		this.errorMiddleware = new ErrorMiddleware();
	}

	public routes(path: string, routes: Router): void {
		this.app.use(path, routes);
	}

	public errorHandler(): void {
		this.app.use(this.errorMiddleware.handle);
	}

	public start(port: number): void {
		this.app.listen(port, (): void => {
			console.log(`Servidor iniciado na porta ${port}!`);
		});
	}
}
