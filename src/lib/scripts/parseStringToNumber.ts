export function parseNumber(value: string): number {
	const separators = [...value.matchAll(/[\.,]/g)];
	let filteredSeparators = [...value];
	//Only use last separator and delete rest
	//Don't filter last separator ( sep.length - 2 )
	for (let i = separators.length - 2; i >= 0; i--) {
		let idx: number | undefined = separators[i].index;
		if (typeof idx !== 'undefined') filteredSeparators.splice(idx, 1);
	}
	const normalized = filteredSeparators.join('').replace(',', '.');
	let parsedNumber = parseFloat(normalized);

	return parsedNumber;
}

export function formatStringNumber(value: string): string {
	let parsedNumber = parseNumber(value);
	if (parsedNumber > 1e3 || parsedNumber < 1) {
		return parsedNumber.toExponential(2);
	}
	if (Number.isInteger(parsedNumber)) return String(parsedNumber);
	return parsedNumber.toFixed(2);
}
