export function getDimMatrix(vec: number[]): number | undefined {
	let sqrtDimVec = Math.sqrt(vec.length);
	if (!Number.isInteger(sqrtDimVec)) {
		// return Math.round(sqrtDimVec);
		return undefined;
	}
	return sqrtDimVec;
}
export function getDisabled(dim: number): number[] {
	let disabled = [];
	for (let line = 0; line < dim; line++) {
		//referring to row or col, will be determined by flow_order
		let pos_disabled = getArray(line + 1, dim - 1);
		for (let pos_in_line = 0; pos_in_line < dim; pos_in_line++) {
			if (pos_disabled.includes(pos_in_line)) {
				disabled.push(pos_in_line + line * dim);
			}
		}
	}
	return disabled;
}

function getArray(start: number, end: number): number[] {
	if (start > end) return [];
	let vec = [];
	for (let i = start; i <= end; i++) {
		vec.push(i);
	}
	return vec;
}
