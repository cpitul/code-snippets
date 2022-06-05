export { parseCSV };
export type { DelimiterType, ParseCSVData };

type DelimiterType = ';';
type ParseCSVData = string | ArrayBuffer;

const parseCSV = (data: ParseCSVData, delimiter: DelimiterType) => {
	let parseCSV: Array<string[]> = [];
	let fields: string[] = [];

	const parsedData: Array<string[]> = [];

	if (typeof data === 'string') {
		const newLinebrk = data.split('\n');

		for (let i = 0; i < newLinebrk.length; i++) {
			const newLineSplit = newLinebrk[i].split(delimiter);

			if (i === 0) {
				parseCSV.push(newLineSplit);
				continue;
			}

			if (newLineSplit[0].split(' ').length === 1 && (newLineSplit[0]?.length === 20 || newLineSplit[0]?.length === 28)) {
				parseCSV.push(newLineSplit);
				continue;
			}

			parseCSV[parseCSV.length - 1][1] += '\n' + newLineSplit[0];
		}
	}

	let parseIndex: number = 0;
	for (let entry of parseCSV) {
		// index === 0 means we're on the "fields" row of the CSV file
		if (parseIndex === 0) {
			entry = entry.map(field => {
				if (field[field.length - 1] === '\r') {
					field = field.slice(0, field.length - 1);
				}

				return field;
			});

			fields = entry;
		}

		// index > 0 means we're on the "data" part of the CSV file
		if (parseIndex > 0 && entry.length > 1 && entry[1]?.length > 3) {
			if (entry.length !== fields.length) {
				throw new Error('Invalid CSV file');
			}
			entry = entry.map(string => {
				if (string[0] === '"') string = string.slice(1, string.length);

				if (string[string.length - 1] === '\r') string = string.slice(0, string.length - 1);

				return string;
			});

			parsedData.push(entry);
		}

		parseIndex++;
	}

	return { parsedData, fields };
};
