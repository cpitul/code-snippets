import { useState } from 'react';
import { useEventListener } from './useEventListener';

export { useOnlineStatus };

function useOnlineStatus() {
	const [online, setOnline] = useState<boolean>(navigator.onLine);

	useEventListener('online', () => setOnline(navigator.onLine));
	useEventListener('offline', () => setOnline(navigator.onLine));

	return online;
}
