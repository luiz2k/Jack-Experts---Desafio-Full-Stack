import { App } from "./app";

async function main(): Promise<void> {
	try {
		const app = new App();

		app.start(3333);
	} catch (error) {
		console.error(`ERROR NA INICIALIZAÇÃO DO SERVIDOR: ${error}`);
	}
}
main();
