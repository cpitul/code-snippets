export { isObjPopulated, getDeepKeys, matchObjKeys };

type MatchObjKeysReturnType = { isValid: boolean; errorFields: string[] };

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

const matchObjKeys = <T>(object1: Partial<T>, object2: T, omit?: string[]): MatchObjKeysReturnType => {
	const object1Keys: string[] = getDeepKeys(object1);
	const object2Keys: string[] = getDeepKeys(object2);
	const errors: string[] = [];

	let isValid: boolean = true;
	const errorFields: string[] = [];

	object2Keys.forEach(obj2key => {
		const exists = object1Keys.includes(obj2key) || omit?.includes(obj2key);

		if (!exists) {
			isValid = false;
			errors.push(`${obj2key}`);
			errorFields.push(obj2key);
		}
	});

	errors.length > 0 && console.warn('Missing fields:', errors);

	return { isValid, errorFields };
};
