import { App } from "./app";
import { AppDataSource } from "./database/data-source";

async function main(): Promise<void> {
	try {
		await AppDataSource.initialize();

		const app = new App();

		app.start(3333);
	} catch (error) {
		console.error(`ERROR NA INICIALIZAÇÃO DO SERVIDOR: ${error}`);
	}
}
main();
