import { getSession } from "@/modules/shared/helpers/getSession";
import { API } from "@/modules/shared/utils/apiConnection";
import Cookies from "js-cookie";

// Inválida a sessão no back-end remove a sessão dos cookies
export const signOut = async (): Promise<void> => {
	const session = getSession();

	await API.request({
		method: "POST",
		path: "/auth/logout",
		headers: {
			Authorization: `Bearer ${session?.token}`,
		},
	});

	Cookies.remove("session");
};
