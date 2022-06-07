import { useState } from 'react';

function useToggle(defaultValue: boolean) {
	const [value, setValue] = useState<boolean>(defaultValue);

	function toggleValue(value?: boolean) {
		setValue((currentValue: boolean) => (typeof value === 'boolean' ? value : !currentValue));
	}

	return [value, toggleValue] as [boolean, (value?: boolean) => void];
}

export { useToggle };
