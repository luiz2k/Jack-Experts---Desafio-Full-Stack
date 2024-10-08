import "express-async-errors";
import { App } from "./app";
import { AppDataSource } from "./database/data-source";
import { authRoutes } from "./routes/authRoutes";
import { taskRoutes } from "./routes/taskRoutes";
import { userRoutes } from "./routes/userRoute";
import { env } from "./validations/envValidation";

// Responsável por configurar/iniciar o servidor
async function main(): Promise<void> {
	try {
		await AppDataSource.initialize(); // Inicia a conexão com o banco de dados

		const app = new App();

		app.config(env.CORS);

		app.routes("/user", userRoutes.getRoutes());
		app.routes("/auth", authRoutes.getRoutes());
		app.routes("/task", taskRoutes.getRoutes());

		app.errorHandler();
		app.swaggerDocumentation(env.SWAGGER_ROUTE);

		app.start(env.PORT);
	} catch (error) {
		console.error(`ERROR NA INICIALIZAÇÃO DO SERVIDOR: ${error}`);
	}
}
main();
