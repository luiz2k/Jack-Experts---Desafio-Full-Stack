import { Outlet } from "react-router";
import { AuthProvider } from "./modules/shared/contexts/authContext";

export default function App() {
	return (
		<div className="bg-neutral-100">
			<AuthProvider>
				<Outlet />
			</AuthProvider>
		</div>
	);
}
