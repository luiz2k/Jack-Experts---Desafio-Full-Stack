import { Outlet } from "react-router";
import { ProtectedRoutes } from "./modules/shared/components/ProtectedRoutes";
import { AuthProvider } from "./modules/shared/contexts/authContext";

export default function App() {
	return (
		<div className="bg-neutral-100">
			<ProtectedRoutes>
				<AuthProvider>
					<Outlet />
				</AuthProvider>
			</ProtectedRoutes>
		</div>
	);
}
