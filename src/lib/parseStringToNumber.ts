export function parseNumber(value: string) {
	const cleanPattern = new RegExp(`[^-+0-9eE,\.]`, 'g');
	const cleaned = value.replace(cleanPattern, '');

	const separators = [...cleaned.matchAll(/[\.,]/g)];
	let filteredSeparators = [...cleaned];
	//Only use last separator and delete rest
	//Don't filter last separator ( sep.length - 2 )
	for (let i = separators.length - 2; i >= 0; i--) {
		let idx = separators[i].index;
		filteredSeparators.splice(idx, 1);
	}
	const normalized = filteredSeparators.join('').replace(',', '.');

	return parseFloat(normalized);
}
