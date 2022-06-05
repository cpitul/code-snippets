import { useEffect, useRef } from 'react';
import { useRenderCount } from './useRenderCount';

export { useDebugInformation };

function useDebugInformation(componentName: string, props: Record<string | number | symbol, any>) {
	const count = useRenderCount();
	const changedProps = useRef({});
	const previousProps = useRef(props);
	const lastRenderTimestamp = useRef(Date.now());

	const propKeys = Object.keys({ ...props, ...previousProps });
	changedProps.current = propKeys.reduce((obj, key) => {
		if (props[key] === previousProps.current[key]) return obj;
		return {
			...obj,
			[key]: { previous: previousProps.current[key], current: props[key] },
		};
	}, {});
	const info = {
		count,
		changedProps: changedProps.current,
		timeSinceLastRender: Date.now() - lastRenderTimestamp.current,
		lastRenderTimestamp: lastRenderTimestamp.current,
	};

	useEffect(() => {
		previousProps.current = props;
		lastRenderTimestamp.current = Date.now();
		console.log('[debug-info]', componentName, info);
	});

	return info;
}
