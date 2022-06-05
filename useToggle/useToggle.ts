import { useState } from 'react';

export function useToggle(defaultValue: boolean) {
  const [value, setValue] = useState(defaultValue);

  function toggleValue(value?: boolean) {
    setValue((currentValue: boolean) =>
      typeof value === 'boolean' ? value : !currentValue
    );
  }

  return [value, toggleValue] as [boolean, (value?: boolean) => void];
}
