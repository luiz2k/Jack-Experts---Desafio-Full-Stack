export type UserInput = {
	email: string;
	password: string;
};

export type UserOutput = {
	id: string;
	email: string;
	password: string;
};

export interface IUserRepository {
	create(data: UserInput): Promise<UserOutput>;

	findByEmail(email: string): Promise<UserOutput | null>;
}
