import { getDimMatrix, getDisabled } from './matrix';

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
});
