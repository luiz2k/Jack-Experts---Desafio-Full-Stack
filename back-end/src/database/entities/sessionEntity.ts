import {
	Column,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./userEntity";

@Entity({ name: "sessions" })
export class Session {
	@PrimaryGeneratedColumn("uuid")
	id!: string;

	@Column({ type: "varchar" })
	token!: string;

	@Column({ name: "created_at", type: "datetime" })
	createdAt!: Date;

	@Column({ name: "expires_at", type: "datetime" })
	expiresAt!: Date;

	@Column({ name: "is_valid", type: "boolean", default: true })
	isValid!: boolean;

	@ManyToOne(
		() => User,
		(user) => user.session,
	)
	@JoinColumn({ name: "user_id" })
	user!: User;
}
