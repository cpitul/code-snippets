import { useCallback, useEffect, useState } from 'react';

function useAsync(callback: () => Promise<any>, dependencies: any[] = []) {
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<unknown>(null);
	const [value, setValue] = useState<any>(null);

	const callbackMemoized = useCallback(() => {
		setLoading(true);
		setError(undefined);
		setValue(undefined);
		callback()
			.then(setValue)
			.catch(setError)
			.finally(() => setLoading(false));
	}, dependencies);

	useEffect(() => {
		callbackMemoized();
	}, [callbackMemoized]);

	return { loading, error, value };
}

export { useAsync };
