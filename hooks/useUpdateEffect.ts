import { useEffect, useRef } from 'react';

export { useUpdateEffect };

function useUpdateEffect(callback: () => void, dependencies: any[]) {
	const firstRenderRef = useRef(true);

	useEffect(() => {
		if (firstRenderRef.current) {
			firstRenderRef.current = false;
			return;
		}
		return callback();
	}, dependencies);
}
