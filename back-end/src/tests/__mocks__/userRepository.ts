import bcrypt from "bcryptjs";
import { randomUUID } from "node:crypto";

import type {
	IUserRepository,
	UserOutput,
} from "../../repositories/interfaces/IUserRepository";
import type { UserInput } from "../../services/interfaces/IUserService";

export class UserRepository implements IUserRepository {
	users: UserOutput[] = [
		{
			id: randomUUID(),
			email: "example@ex.com",
			password: bcrypt.hashSync("123456", 10),
		},
	];

	async create(data: UserInput): Promise<UserOutput> {
		const newUser = {
			id: randomUUID(),
			email: data.email,
			password: bcrypt.hashSync(data.password, 10),
		};

		this.users.push(newUser);

		return newUser;
	}

	async findByEmail(email: string): Promise<UserOutput | null> {
		const user = this.users.find((user) => user.email === email);

		return user || null;
	}
}
