import {
	Column,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./userEntity";

@Entity({ name: "tasks" })
export class Task {
	@PrimaryGeneratedColumn("uuid")
	id!: string;

	@Column({ type: "varchar", length: 20 })
	description!: string;

	@Column({ type: "boolean", default: false })
	completed!: boolean;

	@Column({ name: "created_at", type: "date" })
	createdAt!: Date;

	@ManyToOne(
		() => User,
		(user) => user.tasks,
	)
	@JoinColumn({ name: "user_id" })
	user!: User;
}
