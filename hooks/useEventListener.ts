import { BaseElementType } from '@declarations/types';
import { useEffect, useRef } from 'react';

export { useEventListener };

function useEventListener(eventType: string, callback: (e: Event) => void, element: BaseElementType = window) {
	const callbackRef = useRef<Function>(callback);

	useEffect(() => {
		callbackRef.current = callback;
	}, [callback]);

	useEffect(() => {
		if (!element) return;

		const handler = (e: Event) => callbackRef.current(e);

		element.addEventListener(eventType, handler);

		return () => element.removeEventListener(eventType, handler);
	}, [eventType, element]);
}
