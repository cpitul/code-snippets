import { useEffect, useRef } from 'react';
import isEqual from 'lodash/fp/isEqual';

import { UseEffectCb } from '@declarations/types';

export { useDeepCompareEffect };

function useDeepCompareEffect(callback: UseEffectCb, dependencies: any[]) {
	const currentDependenciesRef = useRef<any[]>([]);

	if (!isEqual(currentDependenciesRef.current, dependencies)) {
		currentDependenciesRef.current = dependencies;
	}

	useEffect(callback, [currentDependenciesRef.current]);
}
