import { useEffect, useState } from 'react';

export { useOnScreen };

function useOnScreen(ref: Element, rootMargin: string = '0px') {
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		if (ref == null) return;
		const observer = new IntersectionObserver(([entry]) => setIsVisible(entry.isIntersecting), { rootMargin });
		observer.observe(ref);
		return () => {
			if (ref == null) return;
			observer.unobserve(ref);
		};
	}, [ref, rootMargin]);

	return isVisible;
}