export { shuffle };

const shuffle = (array: Array<any>) => {
	if (!array || !Array.isArray(array)) throw new TypeError('Argument must be of type array');

	let currentIndex = array.length,
		randomIndex = 0;

	// while there remain elements to shuffle...
	while (currentIndex !== 0) {
		// pick a remaining element...
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex--;

		// and swap it with the current element.
		[array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
	}

	return array;
};
