import { MatchObjKeysReturnType } from '@declarations/types';

const isObjPopulated = (obj: any, exceptions?: string[]): boolean => {
	if (typeof obj !== 'object' || Array.isArray(obj)) throw new TypeError('Argument must be of type object');

	let isPopulated = true;

	for (const key in obj) {
		const nestedObj = obj?.[key];
		const nestedObjKeys = typeof obj[key] === 'object' && !Array.isArray(obj[key]) && Object.keys(obj[key] ?? {});

		if (nestedObjKeys && nestedObjKeys.length > 0) {
			for (let i = 0; i < nestedObjKeys.length; i++) {
				const nestedObjKey = String(nestedObjKeys[i]);
				const value = nestedObj[nestedObjKey];

				if (!value || value?.length === 0 || value === '') {
					const keyIsInException = exceptions?.some(field => field === nestedObjKey);

					if (!keyIsInException) {
						isPopulated = false;
					}
				}
			}
		} else if (!nestedObj || (nestedObj as any)?.length === 0 || nestedObj === '') {
			const keyIsInException = exceptions?.some(field => field === key);

			if (!keyIsInException) {
				isPopulated = false;
			}
		}
	}

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

export { isObjPopulated, getDeepKeys, matchObjKeys };
