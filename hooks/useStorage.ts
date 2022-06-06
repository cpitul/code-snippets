import { useCallback, useState, useEffect, Dispatch, SetStateAction } from 'react';

export { useLocalStorage, useSessionStorage };

// LOCAL STORAGE
function useLocalStorage<T>(key: string, defaultValue: T) {
	return useStorage<T>(key, defaultValue, window.localStorage);
}

// SESSION STORAGE
function useSessionStorage<T>(key: string, defaultValue: T) {
	return useStorage<T>(key, defaultValue, window.sessionStorage);
}

function useStorage<T>(key: string, defaultValue: T, storageObject: Storage) {
	const [value, setValue] = useState<T | undefined>(() => {
		const jsonValue = storageObject.getItem(key);
		if (jsonValue) return JSON.parse(jsonValue);

		if (typeof defaultValue === 'function') {
			return defaultValue();
		} else {
			return defaultValue;
		}
	});

	useEffect(() => {
		if (value === undefined) return storageObject.removeItem(key);

		storageObject.setItem(key, JSON.stringify(value));
	}, [key, value, storageObject]);

	const remove = useCallback(() => {
		setValue(undefined);
	}, []);

	return [value, setValue, remove] as [T | undefined, Dispatch<SetStateAction<T>>, () => void];
}
