export type UserInput = {
	email: string;
	password: string;
};

export type CreateOutput = {
	id: string;
	email: string;
};

export type FindByEmailOutput = {
	id: string;
	email: string;
	password: string;
};

export interface IUserService {
	create(data: UserInput): Promise<CreateOutput>;

	findByEmail(email: string): Promise<FindByEmailOutput | null>;
}
