import { EffectCallback, useEffect, useRef } from 'react';
import isEqual from 'lodash/fp/isEqual';

function useDeepCompareEffect(callback: EffectCallback, dependencies: any[]) {
	const currentDependenciesRef = useRef<any[]>([]);

	if (!isEqual(currentDependenciesRef.current, dependencies)) {
		currentDependenciesRef.current = dependencies;
	}

	useEffect(callback, [currentDependenciesRef.current]);
}

export { useDeepCompareEffect };
