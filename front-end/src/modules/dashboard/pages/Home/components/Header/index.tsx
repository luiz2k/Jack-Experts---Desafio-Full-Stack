import { BookOpenCheck } from "lucide-react";
import { Link } from "react-router-dom";
import SearchInput from "./components/SearchInput";
import { SignOutButton } from "./components/SignOutButton";

// Cabeçalho da aplicação
export function Header() {
	return (
		<header className="p-5 gap-2.5 border-b bg-primary flex items-center justify-between">
			<Link to="/" className="uppercase text-secondary">
				<BookOpenCheck size={35} />
			</Link>

			<div className="flex gap-2.5 items-center">
				<SearchInput />

				<SignOutButton />
			</div>
		</header>
	);
}
