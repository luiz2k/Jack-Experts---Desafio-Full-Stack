import Cookies from "js-cookie";

import type { Tokens } from "@/modules/auth/pages/SignIn/types";

// Obtém a sessão do usuário autenticado
export const getSession = (): Tokens | null => {
	try {
		const sessionCookie = Cookies.get("session");

		if (!sessionCookie) {
			throw Error;
		}

		return JSON.parse(sessionCookie);
	} catch {
		return null;
	}
};
