import z from "zod";
import { TaskStatus } from "../repositories/interfaces/ITaskRepository";

export const createTaskSchema = z.object({
	description: z
		.string()
		.min(2, "A tarefa deve ter pelo menos 2 caracteres.")
		.max(20, "A tarefa deve ter no máximo 20 caracteres."),
});

export const updateTaskSchema = z.object({
	description: z
		.string()
		.min(2, "A tarefa deve ter pelo menos 2 caracteres.")
		.max(20, "A tarefa deve ter no máximo 20 caracteres.")
		.optional(),
	status: z.enum([TaskStatus.Pending, TaskStatus.Completed]).optional(),
});
