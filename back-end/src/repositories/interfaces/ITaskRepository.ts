export enum TaskStatus {
	Pending = "pending",
	Completed = "completed",
}

export type TaskInput = {
	userId: string;
	description: string;
};

export type TaskOutput = {
	id: string;
	description: string;
	status: TaskStatus;
	createdAt: Date;
	user: {
		id: string;
	};
};

export type UpdateTaskInput = {
	description?: string;
	status?: TaskStatus;
};

export interface ITaskRepository {
	create(data: TaskInput): Promise<TaskOutput>;

	findOne(id: string): Promise<TaskOutput | null>;

	findAll(userId: string): Promise<TaskOutput[]>;

	update(id: string, data: UpdateTaskInput): Promise<void>;

	remove(id: string): Promise<void>;
}
