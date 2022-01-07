import {
	getDimMatrix,
	getDisabled,
	getPosition,
	getRowColPosition,
	getSymmetricPosition
} from './matrix';

describe('square matrix', () => {
	test('get dim of matrix_vec', () => {
		expect(getDimMatrix([1, 2, 3, 4])).toBe(2);
		expect(getDimMatrix([1, 2, 3, 4, 5, 6, 7, 8, 9])).toBe(3);
		expect(getDimMatrix([1, 2, 3])).toBeUndefined();
		expect(getDimMatrix([1])).toBe(1);
	});
});
describe('symmetric matrix', () => {
	test('get positions that are disabled', () => {
		expect(getDisabled(2)).toEqual([1]);
		expect(getDisabled(3)).toEqual([1, 2, 5]);
		expect(getDisabled(4)).toEqual([1, 2, 3, 6, 7, 11]);
	});
	test('get symmetric position', () => {
		//Matrix 2x2
		expect(getSymmetricPosition(2, 'column', 0)).toBe(0);
		expect(getSymmetricPosition(2, 'column', 1)).toBe(2);
		expect(getSymmetricPosition(2, 'column', 2)).toBe(1);
		expect(getSymmetricPosition(2, 'column', 3)).toBe(3);
		expect(getSymmetricPosition(2, 'row', 0)).toBe(0);
		expect(getSymmetricPosition(2, 'row', 1)).toBe(2);
		expect(getSymmetricPosition(2, 'row', 2)).toBe(1);
		//Matrix 3x3
		expect(getSymmetricPosition(3, 'column', 0)).toBe(0);
		expect(getSymmetricPosition(3, 'column', 1)).toBe(3);
		expect(getSymmetricPosition(3, 'column', 2)).toBe(6);
		expect(getSymmetricPosition(3, 'column', 3)).toBe(1);
		expect(getSymmetricPosition(3, 'column', 4)).toBe(4);
		expect(getSymmetricPosition(3, 'column', 5)).toBe(7);
		expect(getSymmetricPosition(3, 'column', 6)).toBe(2);
		expect(getSymmetricPosition(3, 'column', 7)).toBe(5);
		expect(getSymmetricPosition(3, 'column', 8)).toBe(8);
	});
});

describe('utils', () => {
	test('getRowColPosition', () => {
		//Matrix 2x2
		expect(getRowColPosition(2, 'column', 0)).toEqual([0, 0]);
		expect(getRowColPosition(2, 'column', 1)).toEqual([1, 0]);
		expect(getRowColPosition(2, 'column', 2)).toEqual([0, 1]);
		expect(getRowColPosition(2, 'column', 3)).toEqual([1, 1]);
		expect(getRowColPosition(2, 'row', 0)).toEqual([0, 0]);
		expect(getRowColPosition(2, 'row', 1)).toEqual([0, 1]);
		expect(getRowColPosition(2, 'row', 2)).toEqual([1, 0]);
		expect(getRowColPosition(2, 'row', 3)).toEqual([1, 1]);
		//Matrix 3x3
		expect(getRowColPosition(3, 'column', 0)).toEqual([0, 0]);
		expect(getRowColPosition(3, 'column', 1)).toEqual([1, 0]);
		expect(getRowColPosition(3, 'column', 2)).toEqual([2, 0]);
		expect(getRowColPosition(3, 'column', 3)).toEqual([0, 1]);
		expect(getRowColPosition(3, 'column', 4)).toEqual([1, 1]);
		expect(getRowColPosition(3, 'column', 5)).toEqual([2, 1]);
		expect(getRowColPosition(3, 'column', 6)).toEqual([0, 2]);
		expect(getRowColPosition(3, 'column', 7)).toEqual([1, 2]);
		expect(getRowColPosition(3, 'column', 8)).toEqual([2, 2]);
		expect(getRowColPosition(3, 'row', 0)).toEqual([0, 0]);
		expect(getRowColPosition(3, 'row', 1)).toEqual([0, 1]);
		expect(getRowColPosition(3, 'row', 2)).toEqual([0, 2]);
		expect(getRowColPosition(3, 'row', 3)).toEqual([1, 0]);
		expect(getRowColPosition(3, 'row', 4)).toEqual([1, 1]);
		expect(getRowColPosition(3, 'row', 5)).toEqual([1, 2]);
		expect(getRowColPosition(3, 'row', 6)).toEqual([2, 0]);
		expect(getRowColPosition(3, 'row', 7)).toEqual([2, 1]);
		expect(getRowColPosition(3, 'row', 8)).toEqual([2, 2]);
	});
	test('get position', () => {
		expect(getPosition(0, 1, 2, 'column')).toBe(2);
		expect(getPosition(0, 1, 2, 'row')).toBe(1);
	});
});
