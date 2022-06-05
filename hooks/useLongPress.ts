import { useEventListener } from './useEventListener';
import { useTimeout } from './useTimeout';
import { useEffectOnce } from './useEffectOnce';
import { BaseElementType } from '@declarations/types';

export { useLongPress };

function useLongPress(ref: BaseElementType, cb: () => void, { delay = 250 } = {}) {
	const { reset, clear } = useTimeout(cb, delay);
	useEffectOnce(clear);

	useEventListener('mousedown', reset, ref);
	useEventListener('touchstart', reset, ref);

	useEventListener('mouseup', clear, ref);
	useEventListener('mouseleave', clear, ref);
	useEventListener('touchend', clear, ref);
}
