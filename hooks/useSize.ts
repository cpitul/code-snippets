import { useState, useEffect } from 'react';

export { useSize };

function useSize(ref: Element) {
	const [size, setSize] = useState<DOMRectReadOnly | null>(null);

	useEffect(() => {
		if (ref == null) return;

		const observer = new ResizeObserver(([entry]) => setSize(entry.contentRect));
		observer.observe(ref);

		return () => observer.disconnect();
	}, []);

	return size;
}
