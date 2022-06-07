const formatDate = (date: Date | number | undefined, noYear?: boolean): string => {
	const dateToParse = typeof date === 'number' ? new Date(date) : date;

	return typeof dateToParse?.getMonth === 'function'
		? `${dateToParse.getUTCDate().toString().length === 1 ? '0' + dateToParse.getUTCDate() : dateToParse.getUTCDate()}.${
				dateToParse.getUTCMonth().toString().length === 1 && dateToParse.getUTCMonth() !== 9
					? '0' + (dateToParse.getUTCMonth() + 1)
					: dateToParse.getUTCMonth() + 1
		  }${!noYear ? '.' : ''}${!noYear ? dateToParse.getUTCFullYear() : ''}`
		: 'error format date';
};

const getHM = (date: Date | number | undefined): string => {
	const dateToParse = typeof date === 'number' ? new Date(date) : date;

	return dateToParse
		? `${
				dateToParse.getUTCHours().toString().length === 1 ? '0' + dateToParse.getUTCHours() : dateToParse.getUTCHours()
		  }:${(dateToParse.getMinutes() < 10 ? '0' : '') + dateToParse.getMinutes()}`
		: 'error format HM';
};

const isSameDate = (date1: Date | number, date2: Date | number): boolean => {
	date1 = typeof date1 === 'number' ? new Date(date1) : date1;
	date2 = typeof date2 === 'number' ? new Date(date2) : date2;

	return (
		date1?.getUTCDate() === date2?.getUTCDate() &&
		date1?.getUTCMonth() === date2?.getUTCMonth() &&
		date1?.getUTCFullYear() === date2?.getUTCFullYear()
	);
};

const isBetweenDates = (date: number, start: Date | number, end: Date | number): boolean => {
	start = typeof start === 'number' ? new Date(start) : start;
	end = typeof end === 'number' ? new Date(end) : end;

	return date >= start.getDate() && date <= end.getDate();
};

const isInTheFuture = (date: Date | number): boolean => {
	const now = new Date().getTime();
	date = typeof date === 'number' ? new Date(date).getTime() : date;

	return now < date;
};

const isLeapYear = (year: number): boolean => (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;

const getNoOfDaysInMonth = (date: Date | number) => {
	date = typeof date === 'number' ? new Date(date) : date;

	switch (date.getMonth()) {
		case 0:
		case 2:
		case 4:
		case 6:
		case 7:
		case 9:
		case 11:
			return 31;
		case 1:
			return isLeapYear(date.getFullYear()) ? 29 : 28;
		case 3:
		case 5:
		case 8:
		case 10:
			return 30;
		default:
			return 0;
	}
};

const setToLastDate = (date: Date): Date => {
	date = typeof date === 'number' ? new Date(date) : date;
	const lastDateOfMonth = getNoOfDaysInMonth(date);

	date.setDate(lastDateOfMonth);

	return date;
};

const incrementDateBy = (date: Date | number, incrementBy: number) => {
	date = typeof date === 'number' ? new Date(date) : date;

	if (!incrementBy) return date;

	const calendarDateSelectedDate = date.getDate();

	date.setDate(1);
	date.setMonth(date.getMonth() + incrementBy);

	const calendarLastDateAfterIncrement = getNoOfDaysInMonth(date);

	calendarLastDateAfterIncrement < calendarDateSelectedDate
		? date.setDate(calendarLastDateAfterIncrement)
		: date.setDate(calendarDateSelectedDate);

	return date;
};

export {
	formatDate,
	getHM,
	isSameDate,
	isBetweenDates,
	isInTheFuture,
	isLeapYear,
	setToLastDate,
	getNoOfDaysInMonth,
	incrementDateBy,
};
