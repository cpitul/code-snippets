import { useEffect } from 'react';

const matchDarkMode = '(prefers-color-scheme: dark)';

const closeWithEsc = (handleClose: Function) => {
	useEffect((): (() => void) => {
		document.onkeyup =
			typeof window !== 'undefined' ? e => e.code === 'Escape' && (handleClose(), console.log(e.code)) : null;

		return () => {
			document.onkeyup = null;
		};
	}, []);
};

export { matchDarkMode, closeWithEsc };
