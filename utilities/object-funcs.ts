export { isObjPopulated, getDeepKeys };

const isObjPopulated = (obj: any, exceptions?: string[]): boolean => {
	if (typeof obj !== 'object' || Array.isArray(obj)) throw new TypeError('Argument must be of type object');

	let isPopulated = true;

	for (const key in obj) {
		const objKeys = typeof obj[key] === 'object' && !Array.isArray(obj[key]) && Object.keys(obj[key] ?? {});

		if (objKeys && objKeys.length > 0) {
			const nestedObj = obj[key];

			if (nestedObj) {
				for (let i = 0; i < objKeys.length; i++) {
					if (!nestedObj?.[objKeys?.[i]] || nestedObj?.[objKeys?.[i]]?.length === 0 || nestedObj?.[objKeys?.[i]] === '') {
						!exceptions?.some(field => field === objKeys[i]) && (isPopulated = false);
					}
				}
			}
		} else if (!obj?.[key] || (obj[key] as any).length === 0 || (obj[key] as any) === '') {
			!exceptions?.some(field => field === key) && (isPopulated = false);
		}
	}

	// console.log('done');
	return isPopulated;
};

const getDeepKeys = (obj: Record<string, any>) => {
	if (typeof obj !== 'object' || Array.isArray(obj)) throw new TypeError('Argument must be an object');

	let keys: string[] = [];

	for (let key in obj) {
		keys.push(key);

		if (Array.isArray(obj[key])) {
			(obj[key] as unknown as Array<any>).forEach(entry => {
				if (typeof entry === 'object') {
					keys = [...keys, ...getDeepKeys(entry)];
				}
			});
		}

		if (typeof obj[key] === 'object' && !Array.isArray(obj[key])) {
			keys = [...keys, ...getDeepKeys(obj[key])];
		}
	}

	return [...new Set(keys)];
};
