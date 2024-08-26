import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn
} from "typeorm";
import { Session } from "./sessionEntity";
import { Task } from "./taskEntity";

@Entity({ name: "users" })
export class User {
	@PrimaryGeneratedColumn("uuid")
	id!: string;

	@Column({ type: "varchar", unique: true })
	email!: string;

	@Column({ type: "varchar" })
	password!: string;

	@OneToMany(
		() => Task,
		(task) => task.user,
	)
	tasks!: Task[];

	@OneToMany(
		() => Session,
		(token) => token.user,
	)
	session!: Session[];
}
