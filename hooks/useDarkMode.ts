import { useCallback, useEffect } from 'react';
import { useMediaQuery } from './useMediaQuery';
import { useLocalStorage } from './useStorage';

import { matchDarkMode } from '@utilities/misc';

function useDarkMode(): [boolean, React.Dispatch<any>] {
	const [darkMode, setDarkMode] = useLocalStorage<boolean>('useDarkMode', false);
	const prefersDarkMode = useMediaQuery(matchDarkMode);
	const enabled = darkMode ?? prefersDarkMode;

	const handleChange = useCallback(({ matches }: MediaQueryListEvent) => {
		setDarkMode(matches);
	}, []);

	useEffect(() => {
		const list = window.matchMedia(matchDarkMode);

		list.addEventListener('change', handleChange);

		return () => list.removeEventListener('change', handleChange);
	}, []);

	useEffect(() => {
		document.body.classList.toggle('dark-mode', enabled);
	}, [enabled]);

	return [enabled, setDarkMode];
}

export { useDarkMode };
