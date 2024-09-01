import { CheckCheck } from "lucide-react";
import { updateTask } from "../../../../../../../services";

import { TaskContext } from "@/modules/dashboard/pages/Home/context";
import { useContext } from "react";
import type { UpdateTask } from "../../../../../../../types";

export function TableControlStatus({
	taskId,
	status,
}: {
	taskId: string;
	status: "pending" | "completed";
}) {
	const { getUpdatedTasks } = useContext(TaskContext);

	const handleTaskUpdate = async (userId: string, data: UpdateTask) => {
		const newStatus = data.status === "completed" ? "pending" : "completed";

		await updateTask(userId, { status: newStatus });

		getUpdatedTasks();
	};
	return (
		<button
			type="button"
			onClick={() =>
				handleTaskUpdate(taskId, {
					status: status,
				})
			}
			className="flex items-center justify-center gap-1.5 hover:underline"
		>
			<CheckCheck size="14" /> STATUS
		</button>
	);
}
