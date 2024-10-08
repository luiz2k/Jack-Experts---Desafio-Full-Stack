export type HttpRequest = {
	method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
	path: string;
	body?: BodyInit;
	headers?: HeadersInit;
	cache?: RequestCache;
};

export type HttpResponse<R> = {
	statusCode: number;
	message: string;
	data: R;
};

export interface IHttpClientAdapter {
	request<R>(data: HttpRequest): Promise<HttpResponse<R>>;
}
