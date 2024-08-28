export type UserInput = {
	email: string;
	password: string;
};

export type UserOutput = {
	id: string;
	email: string;
};

export interface IUserService {
	create(data: UserInput): Promise<UserOutput>;
}
