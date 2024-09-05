import { randomUUID } from "node:crypto";

import {
	type ITaskRepository,
	TaskStatus,
} from "../../repositories/interfaces/ITaskRepository";
import type {
	TaskInput,
	TaskOutput,
	UpdateTaskInput,
} from "../../services/interfaces/ITaskService";

export class TaskRepository implements ITaskRepository {
	tasks: TaskOutput[] = [];

	async create(data: TaskInput): Promise<TaskOutput> {
		const task = {
			id: randomUUID(),
			description: data.description,
			status: TaskStatus.Pending,
			createdAt: Date.now(),
			user: {
				id: data.userId,
			},
		};

		this.tasks.push(task);

		return task;
	}

	async findOne(id: string): Promise<TaskOutput | null> {
		const task = this.tasks.find((task) => task.id === id);

		return task || null;
	}

	async findAll(userId: string): Promise<TaskOutput[]> {
		const tasks = this.tasks.filter((task) => task.user.id === userId);

		return tasks;
	}

	async update(id: string, data: UpdateTaskInput): Promise<void> {
		const updatedTask = this.tasks.map((task) => {
			if (task.id === id) {
				return {
					...task,
					...data,
				};
			}

			return task;
		});

		this.tasks = updatedTask;
	}

	async remove(id: string): Promise<void> {
		const taskIndice = this.tasks.findIndex((elemento) => elemento.id === id);

		this.tasks.splice(taskIndice, 1);
	}
}
