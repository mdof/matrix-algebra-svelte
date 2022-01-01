export function parseNumber(value: string): number {
	const separators = [...value.matchAll(/[\.,]/g)];
	let filteredSeparators = [...value];
	//Only use last separator and delete rest
	//Don't filter last separator ( sep.length - 2 )
	for (let i = separators.length - 2; i >= 0; i--) {
		let idx = separators[i].index;
		filteredSeparators.splice(idx, 1);
	}
	const normalized = filteredSeparators.join('').replace(',', '.');
	let parsedNumber = parseFloat(normalized);

	return parsedNumber;
}

export function formatStringNumber(value: string): string {
	let parsedNumber = parseNumber(value);
	if (Number.isInteger(parsedNumber)) return String(parsedNumber);
	if (value.toLowerCase().includes('e')) return parsedNumber.toExponential(2);
	return parsedNumber.toFixed(2);
}
