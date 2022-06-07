import { useEffect, useState } from 'react';

function useOnScreen(ref: Element, rootMargin: string = '0px') {
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		if (!ref) return;

		const observer = new IntersectionObserver(([entry]) => setIsVisible(entry.isIntersecting), { rootMargin });

		observer.observe(ref);

		return () => {
			if (!ref) return;

			observer.unobserve(ref);
		};
	}, [ref, rootMargin]);

	return isVisible;
}

export { useOnScreen };
