import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useContext } from "react";
import { TaskContext } from "../../../../context";

// Responsável por fazer a busca de uma tarefa
export default function SearchInput() {
	const { search, handleSearch } = useContext(TaskContext);

	return (
		<div className="relative">
			<div className="absolute left-2.5 top-3 h-4 w-4 text-muted-foreground">
				<Search size={"100%"} />
			</div>

			<Input
				type="search"
				placeholder="Busque tarefas..."
				value={search}
				onChange={(event) => handleSearch(event.target.value)}
				className="pl-8 pr-4 py-2 bg-secondary rounded-md border border-input focus:outline-none focus:ring-1 focus:ring-primary"
			/>
		</div>
	);
}
