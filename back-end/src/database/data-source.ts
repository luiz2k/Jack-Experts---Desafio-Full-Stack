import "dotenv/config";
import "reflect-metadata";
import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
	type: "sqlite",
	database: ".db/sqlite.db",
	synchronize: false,
	logging: false,
	entities: [`${__dirname}/entities/*{.ts,.js}`],
	migrations: [`${__dirname}/migrations/*{.ts,.js}`],
});
