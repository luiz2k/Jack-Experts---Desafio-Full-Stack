import { createContext, useEffect } from "react";
import { Navigate, useLocation, useNavigate } from "react-router";
import { getSession } from "../../helpers/getSession";
import { signOut } from "../../services/signOut";

export const AuthContext = createContext(null);

// Contexto responsável pelo controle de autenticação do usuário
// E tambem pelo controle de rotas privadas
export function AuthProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const { pathname } = useLocation();
	const navigate = useNavigate();

	const session = getSession();

	// Verifica se o token da sessão expirou
	// Se sim, desloga o usuário e redireciona para a tela de login
	useEffect(() => {
		(async () => {
			if (session) {
				const expiresIn = session.expiresIn;

				const TWO_MINUTES = 2000 * 60;

				const expirationDate = expiresIn - TWO_MINUTES;

				if (expirationDate < Date.now()) {
					await signOut();

					navigate("/entrar");
				}
			}
		})();
	}, [session, navigate]);

	const PUBLIC_ROUTES: string[] = ["/entrar", "/registro"];
	const PRIVATE_ROUTES: string[] = ["/"];

	// Impede o acesso a rotas de autenticação quando estiver autenticado
	if (session && PUBLIC_ROUTES.includes(pathname)) {
		return <Navigate to="/" />;
	}

	// Impede o acesso a rotas privadas quando estiver deslogado
	if (!session && PRIVATE_ROUTES.includes(pathname)) {
		return <Navigate to="/entrar" />;
	}

	return <AuthContext.Provider value={null}>{children}</AuthContext.Provider>;
}
