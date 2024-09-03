// Cria uma query para a URL
export const createQueryString = (name: string, value: string): string => {
	const params = new URLSearchParams();

	params.set(name, value);

	return params.toString();
};
