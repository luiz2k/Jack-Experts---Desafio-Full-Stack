import "dotenv/config";
import "reflect-metadata";
import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
	type: "sqlite",
	database: "src/database/sqlite.db",
	synchronize: false,
	logging: false,
	entities: [],
	migrations: [],
});
