import type { TaskStatus } from "../../repositories/interfaces/ITaskRepository";

export type TaskInput = {
	userId: string;
	description: string;
};

export type TaskOutput = {
	id: string;
	description: string;
	status: TaskStatus;
	createdAt: number;
	user: {
		id: string;
	};
};

export type UpdateTaskInput = {
	description?: string;
	status?: TaskStatus;
};

export interface ITaskService {
	create(data: TaskInput): Promise<TaskOutput>;

	findOne(id: string, userId: string): Promise<TaskOutput | null>;

	findAll(userId: string): Promise<TaskOutput[]>;

	update(id: string, userId: string, data: UpdateTaskInput): Promise<void>;

	remove(id: string, userId: string): Promise<void>;
}
