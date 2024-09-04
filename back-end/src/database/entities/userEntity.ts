import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Session } from "./sessionEntity";
import { Task } from "./taskEntity";

// Entidade de usuário
@Entity({ name: "users" })
export class User {
	@PrimaryGeneratedColumn("uuid")
	id!: string;

	@Column({ type: "varchar", unique: true })
	email!: string;

	@Column({ type: "varchar" })
	password!: string;

	// Relacionamento
	// Um usuário pode ter várias tarefas
	@OneToMany(
		() => Task,
		(task) => task.user,
	)
	tasks!: Task[];

	// Relacionamento
	// Um usuário pode ter várias sessões
	@OneToMany(
		() => Session,
		(token) => token.user,
	)
	session!: Session[];
}
