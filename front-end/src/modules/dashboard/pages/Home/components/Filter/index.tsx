import { Button } from "@/components/ui/button";
import { createQueryString } from "@/modules/shared/utils/createQueryString";
import { useContext } from "react";
import { useLocation, useNavigate } from "react-router";
import { TaskContext } from "../../context";

export function Filter() {
	const { tasks, searchParam } = useContext(TaskContext);

	const navigate = useNavigate();
	const { pathname } = useLocation();

	const allTasks = searchParam !== "completed" && searchParam !== "pending";
	const completedTasks = searchParam === "completed";
	const pendingTasks = searchParam === "pending";

	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
			<Button
				variant={allTasks ? "default" : "outline"}
				onClick={() => {
					navigate(`${pathname}?${createQueryString("filter", "all")}`);
				}}
				className="p-5 h-full block w-full"
			>
				<span>Todas as tarefas</span>
				<span className="font-bold text-xl block">{tasks.length}</span>
			</Button>

			<Button
				variant={completedTasks ? "default" : "outline"}
				onClick={() => {
					navigate(`${pathname}?${createQueryString("filter", "completed")}`);
				}}
				className="p-5 h-full block w-full"
			>
				<span>Completas</span>
				<span className="font-bold text-xl block">
					{tasks.filter((task) => task.status === "completed").length}
				</span>
			</Button>

			<Button
				variant={pendingTasks ? "default" : "outline"}
				onClick={() => {
					navigate(`${pathname}?${createQueryString("filter", "pending")}`);
				}}
				className="p-5 h-full block w-full"
			>
				<span>Pendentes</span>
				<span className="font-bold text-xl block">
					{tasks.filter((task) => task.status === "pending").length}
				</span>
			</Button>
		</div>
	);
}
