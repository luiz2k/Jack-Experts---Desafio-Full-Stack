import { BadRequestError } from "../helpers/errorHandler";
import { HttpStatusCode } from "../helpers/httpStatusCode";
import {
	createTaskSchema,
	updateTaskSchema,
} from "../validations/taskValidation";
import { uuidSchema } from "../validations/uuidValidation";

import type { Request, Response } from "express";
import type { ITaskService } from "../services/interfaces/ITaskService";

// Controlador responsável por lidar com as operações de tarefas
export class TaskController {
	constructor(private readonly taskService: ITaskService) {}

	async create(req: Request, res: Response): Promise<Response> {
		const userId = req.user?.sub as string;

		const isValidData = createTaskSchema.safeParse(req.body);

		if (!isValidData.success) {
			const errors = isValidData.error.issues;

			throw new BadRequestError("Erro na validação dos dados.", errors);
		}

		const task = await this.taskService.create({ ...isValidData.data, userId });

		return res.status(HttpStatusCode.CREATED).json({
			statusCode: HttpStatusCode.CREATED,
			message: "Tarefa criada com sucesso.",
			data: task,
		});
	}

	async findOne(req: Request, res: Response): Promise<Response> {
		const userId = req.user?.sub as string;

		const isValidId = uuidSchema.safeParse(req.params.id);

		if (!isValidId.success) {
			const errors = isValidId.error.issues;

			throw new BadRequestError("Erro na validação dos dados.", errors);
		}

		const task = await this.taskService.findOne(isValidId.data, userId);

		return res.status(HttpStatusCode.OK).json({
			statusCode: HttpStatusCode.OK,
			message: "Tarefa encontrada.",
			data: task,
		});
	}

	async findAll(req: Request, res: Response): Promise<Response> {
		const userId = req.user?.sub as string;

		const tasks = await this.taskService.findAll(userId);

		return res.status(HttpStatusCode.OK).json({
			statusCode: HttpStatusCode.OK,
			message: "Tarefas encontradas.",
			data: tasks,
		});
	}

	async update(req: Request, res: Response): Promise<Response> {
		const userId = req.user?.sub as string;

		const isValidId = uuidSchema.safeParse(req.params.id);

		if (!isValidId.success) {
			throw new BadRequestError("Erro na validação dos dados.");
		}

		const isValidData = updateTaskSchema.safeParse(req.body);

		if (!isValidData.success) {
			throw new BadRequestError("Erro na validação dos dados.");
		}

		await this.taskService.update(isValidId.data, userId, isValidData.data);

		return res.status(HttpStatusCode.OK).json({
			statusCode: HttpStatusCode.OK,
			message: "Tarefa atualizada.",
			data: isValidData.data,
		});
	}

	async remove(req: Request, res: Response): Promise<Response> {
		const userId = req.user?.sub as string;

		const isValidId = uuidSchema.safeParse(req.params.id);

		if (!isValidId.success) {
			throw new BadRequestError("Erro na validação dos dados.");
		}

		await this.taskService.remove(isValidId.data, userId);

		return res.status(HttpStatusCode.OK).json({
			statusCode: HttpStatusCode.OK,
			message: "Tarefa removida.",
		});
	}
}
