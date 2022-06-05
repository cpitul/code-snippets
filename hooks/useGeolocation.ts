import { useState, useEffect } from 'react';

export { useGeolocation };

function useGeolocation(options: PositionOptions) {
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<GeolocationPositionError | null>(null);
	const [data, setData] = useState<GeolocationCoordinates | null>(null);

	useEffect(() => {
		const successHandler = (position: GeolocationPosition) => {
			setLoading(false);
			setError(null);
			setData(position.coords);
		};
		const errorHandler = (positionError: GeolocationPositionError) => {
			setError(positionError);
			setLoading(false);
		};
		navigator.geolocation.getCurrentPosition(successHandler, errorHandler, options);
		const id = navigator.geolocation.watchPosition(successHandler, errorHandler, options);

		return () => navigator.geolocation.clearWatch(id);
	}, [options]);

	return { loading, error, data };
}
