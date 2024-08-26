import "dotenv/config";
import "reflect-metadata";
import { DataSource } from "typeorm";
import { Session } from "./entities/sessionEntity";
import { Task } from "./entities/taskEntity";
import { User } from "./entities/userEntity";

export const AppDataSource = new DataSource({
	type: "sqlite",
	database: "src/database/sqlite.db",
	synchronize: false,
	logging: false,
	entities: [User, Task, Session],
	migrations: [],
});
