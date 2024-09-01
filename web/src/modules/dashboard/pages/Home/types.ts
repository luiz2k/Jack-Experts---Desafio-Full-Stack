export type CreateTask = {
	description: string;
};

export type UpdateTask = {
	description?: string;
	status?: "pending" | "completed";
};

export type Task = {
	id: string;
	description: string;
	status: "pending" | "completed";
	createdAt: string;
};

export type HomeContextType = {
	tasks: Task[];
	filteredTasks: Task[];
	searchParam: string | null;
	search: string;
	handleSearch: (search: string) => void;
	tasksFound: Task[];
	getUpdatedTasks: () => void;
};
