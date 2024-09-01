export type Tokens = {
	token: string;
	expiresIn: number;
};

export type Status = {
	message: string;
	color: string;
};

export type Messagens = {
	default: Status;
	created: Status;
	expired: Status;
};
