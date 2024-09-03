import Cookies from "js-cookie";
import { createQueryString } from "../../utils/createQueryString";

import type {
	HttpRequest,
	HttpResponse,
	IHttpClientAdapter,
} from "./interfaces/IHttpClientAdapter";

// Cria um adaptador que vai fazer as chamadas HTTP
export class HttpClientAdapter implements IHttpClientAdapter {
	constructor(private readonly baseUrl: string) {}

	public async request<R>(requestData: HttpRequest): Promise<HttpResponse<R>> {
		const response = await fetch(`${this.baseUrl}${requestData.path}`, {
			method: requestData.method,
			body: requestData.body,
			headers: {
				"Content-Type": "application/json",
				...requestData.headers,
			},
			cache: requestData.cache || "default",
		});

		const data = await response.json();

		// Se o token for inválido, remove o cookie e redireciona para a tela de login
		if (data.statusCode === 401 && data.message === "Token inválido.") {
			const query = createQueryString("status", "expired");

			Cookies.remove("session");

			window.location.href = `/entrar?${query}`;
		}

		return data;
	}
}
