import { useEffect } from 'react';

export { useEffectOnce };

function useEffectOnce(cb: (() => void) | (() => () => void)) {
	useEffect(cb, []);
}
