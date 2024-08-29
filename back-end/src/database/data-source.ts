import "dotenv/config";
import "reflect-metadata";
import { DataSource } from "typeorm";
import { Session } from "./entities/sessionEntity";
import { Task } from "./entities/taskEntity";
import { User } from "./entities/userEntity";
import { Init1724941889387 } from "./migrations/1724941889387-init";

export const AppDataSource = new DataSource({
	type: "sqlite",
	database: "db/sqlite.db",
	synchronize: false,
	logging: false,
	entities: [User, Task, Session],
	migrations: [Init1724941889387],
});
