import { NotFoundError } from "../helpers/errorHandler";

import type { ITaskRepository } from "../repositories/interfaces/ITaskRepository";
import type {
	ITaskService,
	TaskInput,
	TaskOutput,
	UpdateTaskInput,
} from "./interfaces/ITaskService";

// Serviço para as tarefas
export class TaskService implements ITaskService {
	constructor(private readonly taskRepository: ITaskRepository) {}

	// Cria uma nova tarefa
	async create(data: TaskInput): Promise<TaskOutput> {
		const task = await this.taskRepository.create(data);

		return task;
	}

	// Busca uma tarefa
	// Verifica se foi encontrada
	// Se for, retorna a tarefa
	async findOne(id: string, userId: string): Promise<TaskOutput | null> {
		const task = await this.taskRepository.findOne(id);

		if (!task) {
			throw new NotFoundError("Tarefa não encontrada.");
		}

		if (task.user.id !== userId) {
			throw new NotFoundError("Tarefa não encontrada.");
		}

		return task;
	}

	// Obtém todas as tarefas de um usuário
	async findAll(userId: string): Promise<TaskOutput[]> {
		const tasks = await this.taskRepository.findAll(userId);

		return tasks;
	}

	// Verifica se uma tarefa existe
	// Se existir, atualiza os dados da tarefa
	async update(
		id: string,
		userId: string,
		data: UpdateTaskInput,
	): Promise<void> {
		const task = await this.taskRepository.findOne(id);

		if (!task) {
			throw new NotFoundError("Tarefa não encontrada.");
		}

		if (task.user.id !== userId) {
			throw new NotFoundError("Tarefa não encontrada.");
		}

		await this.taskRepository.update(id, data);
	}

	// Verifica se uma tarefa existe
	// Se existir, remove a tarefa
	async remove(id: string, userId: string): Promise<void> {
		const task = await this.taskRepository.findOne(id);

		if (!task) {
			throw new NotFoundError("Tarefa não encontrada.");
		}

		if (task.user.id !== userId) {
			throw new NotFoundError("Tarefa não encontrada.");
		}

		await this.taskRepository.remove(id);
	}
}
