/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */

import { useEffect } from 'react';

export { closeWithEsc };

const closeWithEsc = (handleClose: Function) => {
	useEffect((): (() => void) => {
		document.onkeyup =
			typeof window !== 'undefined' ? e => e.code === 'Escape' && (handleClose(), console.log(e.code)) : null;

		return () => {
			document.onkeyup = null;
		};
	}, []);
};
