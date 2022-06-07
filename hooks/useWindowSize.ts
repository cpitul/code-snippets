import { useState } from 'react';
import { useEventListener } from './useEventListener';

function useWindowSize() {
	const [windowSize, setWindowSize] = useState<{ width: number; height: number }>({
		width: window.innerWidth,
		height: window.innerHeight,
	});

	useEventListener('resize', () => {
		setWindowSize({ width: window.innerWidth, height: window.innerHeight });
	});

	return windowSize;
}

export { useWindowSize };
