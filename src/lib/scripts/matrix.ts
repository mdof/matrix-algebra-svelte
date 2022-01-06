export type Flow_Order = 'column' | 'row';

export function isSquared(vec: number[]): boolean {
	let dim_matrix = getDimMatrix(vec);
	if (typeof dim_matrix == 'undefined') return false;
	return true;
}

export function getDimMatrix(vec: number[]): number | undefined {
	let sqrtDimVec = Math.sqrt(vec.length);
	if (!Number.isInteger(sqrtDimVec)) {
		return undefined;
		// return Math.round(sqrtDimVec);
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

export function getSymmetricPosition(dim: number, flow_order: Flow_Order, pos: number): number {
	let [row, col] = getRowColPosition(dim, flow_order, pos);
	let sym = [col, row];
	return getPosition(sym[0], sym[1], dim, flow_order);
}

export function getRowColPosition(
	dim: number,
	flow_order: Flow_Order,
	pos: number
): [number, number] {
	let mod = pos % dim;
	let base = (pos - mod) / dim;
	if (flow_order == 'column') return [mod, base];
	return [base, mod];
}

export function getPosition(row: number, col: number, dim: number, flow_order: Flow_Order): number {
	if (flow_order == 'column') return col * dim + row;
	return row * dim + col;
}

function getArray(start: number, end: number): number[] {
	if (start > end) return [];
	let vec = [];
	for (let i = start; i <= end; i++) {
		vec.push(i);
	}
	return vec;
}
