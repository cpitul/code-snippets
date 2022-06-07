import { EffectCallback, useEffect } from 'react';

function useEffectOnce(cb: EffectCallback) {
	useEffect(cb, []);
}

export { useEffectOnce };
