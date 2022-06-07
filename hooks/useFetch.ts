import { useAsync } from './useAsync';

const DEFAULT_OPTIONS = {
	headers: { 'Content-Type': 'application/json' },
};

function useFetch(url: string, options: object = {}, dependencies: any[] = []) {
	return useAsync(async () => {
		const res = await fetch(url, { ...DEFAULT_OPTIONS, ...options });

		if (res.ok) return res.json();

		const json = await res.json();

		return Promise.reject(json);
	}, dependencies);
}

export { useFetch };
