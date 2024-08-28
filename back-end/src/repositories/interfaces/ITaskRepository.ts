export enum TaskStatus {
	pending = "pending",
	completed = "completed",
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
	id: string;
	description?: string;
	completed?: TaskStatus;
};

export interface ITaskRepository {
	create(data: TaskInput): Promise<TaskOutput>;

	findOne(id: string): Promise<TaskOutput | null>;

	findAll(userId: string): Promise<TaskOutput[]>;

	update(data: UpdateTaskInput): Promise<void>;

	remove(id: string): Promise<void>;
}
