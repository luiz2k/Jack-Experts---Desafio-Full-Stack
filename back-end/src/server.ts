import "express-async-errors";
import { App } from "./app";
import { AppDataSource } from "./database/data-source";
import { userRoutes } from "./routes/userRoute";

async function main(): Promise<void> {
	try {
		await AppDataSource.initialize();

		const app = new App();
		app.config("*");

		app.routes("/user", userRoutes.getRoutes());

		app.errorHandler();

		app.start(3333);
	} catch (error) {
		console.error(`ERROR NA INICIALIZAÇÃO DO SERVIDOR: ${error}`);
	}
}
main();
