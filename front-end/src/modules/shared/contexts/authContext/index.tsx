import { createContext, useEffect } from "react";
import { useNavigate } from "react-router";
import { getSession } from "../../helpers/getSession";
import { signOut } from "../../services/signOut";
import { createQueryString } from "../../utils/createQueryString";

export const AuthContext = createContext(null);

// Contexto responsável pelo controle de autenticação do usuário
export function AuthProvider({
	children,
}: {
	children: React.ReactNode;
}) {
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

				const sessionExpired = expirationDate < Date.now();

				if (sessionExpired) {
					await signOut();

					const query = createQueryString("status", "expired");

					navigate(`/entrar?${query}`);
				}
			}
		})();
	}, [session, navigate]);

	return <AuthContext.Provider value={null}>{children}</AuthContext.Provider>;
}
