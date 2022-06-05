export { firstToUpper, generateUrlString };

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
