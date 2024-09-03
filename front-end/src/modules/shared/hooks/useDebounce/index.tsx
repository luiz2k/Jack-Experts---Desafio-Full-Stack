import { useEffect, useState } from "react";

// Debounce para colocar um delay na atualização de um state
export function useDebounce<T>(value: T, delay = 500) {
	const [debouncedValue, setDebouncedValue] = useState<T>(value);

	useEffect(() => {
		const handler = setTimeout(() => {
			setDebouncedValue(value);
		}, delay);

		return () => {
			clearTimeout(handler);
		};
	});

	return debouncedValue;
}
