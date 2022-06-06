import { ChangeEvent } from 'react';
import { useEventListener } from './useEventListener';

export { useClickOutside };

function useClickOutside(ref: HTMLElement, cb: (e: ChangeEvent) => void) {
	useEventListener(
		'click',
		e => {
			if (ref == null || ref.contains(e.target)) return;

			cb(e);
		},
		document,
	);
}
