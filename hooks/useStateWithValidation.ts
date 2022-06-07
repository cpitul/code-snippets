import { useState, useCallback } from 'react';

function useStateWithValidation<T>(validationFunc: (value: T) => boolean, initialValue: T) {
	const [state, setState] = useState<T>(initialValue);
	const [isValid, setIsValid] = useState<boolean>(() => validationFunc(state));

	const onChange = useCallback(
		(nextState: T) => {
			const value = typeof nextState === 'function' ? nextState(state) : nextState;

			setState(value);
			setIsValid(validationFunc(value));
		},
		[validationFunc],
	);

	return [state, onChange, isValid];
}

export { useStateWithValidation };
