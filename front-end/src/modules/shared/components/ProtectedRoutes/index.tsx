import { Navigate, useLocation } from "react-router";
import { getSession } from "../../helpers/getSession";

const PUBLIC_ROUTES: string[] = ["/entrar", "/registro"];
const PRIVATE_ROUTES: string[] = ["/"];

// Componente responsável pelo controle de rotas privadas
export function ProtectedRoutes({
	children,
}: {
	children: React.ReactNode;
}) {
	const { pathname } = useLocation();

	const session = getSession();

	// Impede o acesso a rotas de autenticação quando estiver autenticado
	if (session && PUBLIC_ROUTES.includes(pathname)) {
		return <Navigate to="/" />;
	}

	// Impede o acesso a rotas privadas quando estiver deslogado
	if (!session && PRIVATE_ROUTES.includes(pathname)) {
		return <Navigate to="/entrar" />;
	}

	return children;
}
