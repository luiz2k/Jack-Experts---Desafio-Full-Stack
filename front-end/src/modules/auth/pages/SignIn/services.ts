import { API } from "@/modules/shared/utils/apiConnection";
import Cookies from "js-cookie";

import type { z } from "zod";
import type { loginSchema } from "../../../shared/validations/authValidation";
import type { Tokens } from "./types";

export const login = async (
	data: z.infer<typeof loginSchema>,
): Promise<void> => {
	const response = await API.request<Tokens>({
		method: "POST",
		path: "/auth/login",
		body: JSON.stringify(data),
	});

	if (response.statusCode === 401) {
		throw new Error(response.message);
	}

	Cookies.set("session", JSON.stringify(response.data));
};
