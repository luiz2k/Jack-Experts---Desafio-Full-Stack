import { AppDataSource } from "../database/data-source";
import { Task } from "../database/entities/taskEntity";

import type {
	ITaskRepository,
	TaskInput,
	TaskOutput,
	UpdateTaskInput,
} from "./interfaces/ITaskRepository";

// Responsável por executar as operações no banco de dados relacionadas as tarefas
export class TaskRepository implements ITaskRepository {
	taskRepository = AppDataSource.getRepository(Task);

	// Salva uma nova tarefa
	async create(data: TaskInput): Promise<TaskOutput> {
		const { userId, ...rest } = data;

		const task = this.taskRepository.create({
			user: { id: userId },
			...rest,
		});

		await this.taskRepository.save(task);

		return task;
	}

	// Busca uma tarefa
	async findOne(id: string): Promise<TaskOutput | null> {
		const task = await this.taskRepository.findOne({
			where: {
				id,
			},
			relations: ["user"],
			select: {
				user: {
					id: true,
				},
			},
		});

		return task;
	}

	// Busca todas as tarefas
	async findAll(userId: string): Promise<TaskOutput[]> {
		const tasks = await this.taskRepository.find({
			where: {
				user: {
					id: userId,
				},
			},
			order: {
				createdAt: "ASC",
			},
		});

		return tasks;
	}

	// Atualiza uma tarefa
	async update(id: string, data: UpdateTaskInput): Promise<void> {
		await this.taskRepository.update(id, data);
	}

	// Remove uma tarefa
	async remove(id: string): Promise<void> {
		await this.taskRepository.delete(id);
	}
}
