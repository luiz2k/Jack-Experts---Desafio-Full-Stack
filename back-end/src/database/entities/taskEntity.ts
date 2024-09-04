import {
	Column,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
} from "typeorm";
import { TaskStatus } from "../../repositories/interfaces/ITaskRepository";
import { User } from "./userEntity";

// Entidade de tarefa
@Entity({ name: "tasks" })
export class Task {
	@PrimaryGeneratedColumn("uuid")
	id!: string;

	@Column({ type: "varchar", length: 20 })
	description!: string;

	@Column({ type: "varchar", enum: TaskStatus, default: "pending" })
	status!: TaskStatus;

	@Column({
		name: "created_at",
		type: "date",
		default: () => "CURRENT_TIMESTAMP",
	})
	createdAt!: Date;

	// Relacionamento
	// Uma tarefa pertence a um usuário
	@ManyToOne(
		() => User,
		(user) => user.tasks,
	)
	@JoinColumn({ name: "user_id" })
	user!: User;
}
