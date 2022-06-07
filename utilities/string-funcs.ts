const firstToUpper = (text: string): string => {
	if (typeof text !== 'string') throw new TypeError('Argument must be of type string');

	return text.slice(0, 1).toUpperCase() + text.slice(1, text.length).toLowerCase();
};

const generateUrlString = (name: string) => {
	if (typeof name !== 'string') throw new TypeError('Argument must be of type string');

	const newName = name
		.split(' ')
		.filter(word => {
			let wordSplit = word.split(' ');

			if (wordSplit.length > 1) wordSplit = wordSplit.filter(word => word !== '');

			return word !== '' && !word.includes('%') && !word.includes('/') && !word.includes('+');
		})
		.map(word => word.toLowerCase())
		.join('_');

	return newName;
};

const matchStrings = (str1: string, str2: string) => {
	if (typeof str1 !== 'string' || typeof str2 !== 'string') throw new TypeError('Arguments must be of type string');

	return (str1.length === str2.length || str2.length > str1.length) && str1 !== str2;
};

const parseToken = (token: string) => {
	if (typeof token !== 'string') throw new TypeError('Argument must be of type string');

	const tokenSplit = token.split(' ');

	return {
		pre: tokenSplit?.[0],
		tokenString: tokenSplit?.[1],
	};
};

const parseHourString = (hourString: string): [string, string] => {
	if (typeof hourString !== 'string') throw new TypeError('Argument must be of type string');

	const hourStringSplit = hourString.split(':');

	const hours = hourStringSplit[0];
	const minutes = hourStringSplit[1];

	return [hours, minutes];
};

const matchHoursAscending = (
	hours1: string,
	hours2: string,
): {
	hours1: boolean;
	hours2: boolean;
} => {
	const [hour1, minute1] = parseHourString(hours1);
	const [hour2, minute2] = parseHourString(hours2);

	return +hour1 === +hour2 && +minute1 === +minute2
		? { hours1: true, hours2: true }
		: +hour1 === +hour2
		? +minute1 > +minute2
			? { hours1: true, hours2: false }
			: { hours1: false, hours2: false }
		: +hour1 > +hour2
		? { hours1: true, hours2: false }
		: { hours1: false, hours2: false };
};

const isEmail = (email: string) => {
	if (typeof email !== 'string') throw new TypeError('Argument must be of type string');

	const reEmail =
		/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

	return reEmail.test(email.toLowerCase());
};

export { firstToUpper, generateUrlString, matchStrings, parseToken, matchHoursAscending, parseHourString, isEmail };
