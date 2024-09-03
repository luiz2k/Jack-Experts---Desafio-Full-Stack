import { CreateTask } from "./components/CreateTask";
import { Filter } from "./components/Filter";
import { Header } from "./components/Header";
import { TaskTable } from "./components/Table";
import { TaskContextProvider } from "./context";

export function HomePage() {
	return (
		<TaskContextProvider>
			<Header />

			<main className="p-5 min-h-screen space-y-5 max-w-7xl m-auto">
				<Filter />
				<CreateTask />
				<TaskTable />
			</main>
		</TaskContextProvider>
	);
}
