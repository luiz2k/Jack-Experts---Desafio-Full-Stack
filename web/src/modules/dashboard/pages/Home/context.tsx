import { useDebounce } from "@/modules/shared/hooks/useDebounce";
import { createContext, useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getAllTasks } from "./services";

import type { HomeContextType, Task } from "./types";

export const TaskContext = createContext<HomeContextType>(
	{} as HomeContextType,
);

// Contexto responsável pelo estado das tarefas
export function TaskContextProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const [tasks, setTasks] = useState<Task[]>([]);

	// Função para buscar as tarefas e atualizar o estado
	const getUpdatedTasks = useCallback(() => {
		getAllTasks().then((tasks) => setTasks(tasks.data || []));
	}, []);

	useEffect(() => {
		getUpdatedTasks();
	}, [getUpdatedTasks]);

	const [search, setSearch] = useState<string>("");
	const searchDebounce = useDebounce<string>(search);

	const [searchParams] = useSearchParams();
	const searchParam = searchParams.get("filter");

	// Verifica se a query da url é `completed` ou `pending`
	const completeOrPending: boolean =
		searchParam === "completed" || searchParam === "pending";

	// Se `completeOrPending` for verdadeiro, filtra as tarefas pela query da url
	// Se não, obtém todas as tarefas
	const filteredTasks = completeOrPending
		? tasks.filter((task) => task.status === searchParam)
		: tasks;

	// Se `searchDebounce` tiver conteúdo, filtra as tarefas pelo conteúdo
	// Se não, retorna as tarefas já filtradas em `filteredTasks`
	const tasksFound = searchDebounce
		? filteredTasks.filter((task) =>
				task.description.toLowerCase().includes(searchDebounce.toLowerCase()),
			)
		: filteredTasks;

	// Função para atualizar o estado responsável pela busca de tarefas
	const handleSearch = (search: string) => {
		setSearch(search);
	};

	return (
		<>
			<TaskContext.Provider
				value={{
					tasks,
					filteredTasks,
					searchParam,
					search,
					handleSearch,
					tasksFound,
					getUpdatedTasks,
				}}
			>
				{children}
			</TaskContext.Provider>
		</>
	);
}
