import express from "express";
import type { Express } from "express";

export class App {
	private app: Express;

	constructor() {
		this.app = express();
	}

	public start(port: number): void {
		this.app.listen(port, (): void => {
			console.log(`Servidor iniciado na porta ${port}!`);
		});
	}
}
