import { useState } from 'react';

export { useArray };

function useArray<T>(defaultValue: T[] = []) {
	const [array, setArray] = useState<T[]>(defaultValue);

	function push(element: T) {
		setArray(a => [...a, element]);
	}

	function filter(callback: () => boolean) {
		setArray((a: T[]) => a.filter(callback));
	}

	function update(index: number, newElement: T) {
		setArray((a: T[]) => [...a.slice(0, index), newElement, ...a.slice(index + 1, a.length - 1)]);
	}

	function remove(index: number) {
		setArray((a: T[]) => [...a.slice(0, index), ...a.slice(index + 1, a.length - 1)]);
	}

	function clear() {
		setArray([]);
	}

	return { array, set: setArray, push, filter, update, remove, clear };
}
