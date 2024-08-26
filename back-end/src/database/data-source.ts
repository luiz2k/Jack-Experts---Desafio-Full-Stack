import "dotenv/config";
import "reflect-metadata";
import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
	type: "sqlite",
	database: "todo",
	synchronize: false,
	logging: false,
	entities: [],
	migrations: [],
});
