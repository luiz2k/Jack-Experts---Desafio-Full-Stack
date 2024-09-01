import { Button } from "@/components/ui/button";
import { signOut } from "@/modules/shared/services/signOut";
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router";

export function SignOutButton() {
	const navigate = useNavigate();

	const handleSignOut = async () => {
		await signOut();

		navigate("/entrar");
	};

	return (
		<Button
			variant="outline"
			size="sm"
			onClick={handleSignOut}
			className="size-9 p-0"
		>
			<LogOut size={20} />
		</Button>
	);
}
