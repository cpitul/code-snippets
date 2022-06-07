import { useEffect, useRef } from 'react';

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

export { useUpdateEffect };
