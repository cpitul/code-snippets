import { useEffect, useRef } from 'react';

function useRenderCount() {
	const count = useRef<number>(1);

	useEffect(() => {
		count.current++;
	});

	return count.current;
}

export { useRenderCount };
