import { useState } from 'react';
import { useEventListener } from './useEventListener';

import { BaseElementType } from '@declarations/types';

function useHover(ref: BaseElementType) {
	const [hovered, setHovered] = useState<boolean>(false);

	useEventListener('mouseover', () => setHovered(true), ref);
	useEventListener('mouseout', () => setHovered(false), ref);

	return hovered;
}

export { useHover };
