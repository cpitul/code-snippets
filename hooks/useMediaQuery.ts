import { useState, useEffect } from 'react';

import { useEventListener } from './useEventListener';

function useMediaQuery(mediaQuery: string) {
	const [isMatch, setIsMatch] = useState<boolean>(false);
	const [mediaQueryList, setMediaQueryList] = useState<MediaQueryList | null>(null);

	useEffect(() => {
		const list = window.matchMedia(mediaQuery);
		setMediaQueryList(list);
		setIsMatch(list.matches);
	}, [mediaQuery]);

	if (mediaQueryList) {
		useEventListener('change', (e: any) => setIsMatch(e.matches), mediaQueryList);
	}

	return isMatch;
}

export { useMediaQuery };
