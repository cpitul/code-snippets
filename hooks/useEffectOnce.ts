import { UseEffectCb } from '@declarations/types';
import { useEffect } from 'react';

export { useEffectOnce };

function useEffectOnce(cb: UseEffectCb) {
	useEffect(cb, []);
}
