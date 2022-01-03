import { parseNumber, formatStringNumber } from './parseStringToNumber';
import { testData } from './testFormatNumber.cjs';

describe('parseNumber', () => {
	let val = 1000.2;
	test('standard format input', () => {
		expect(parseNumber('1000.2')).toBeCloseTo(val, 4);
		expect(parseNumber('1000,2')).toBeCloseTo(val, 4);
		expect(parseNumber('1,000.2')).toBeCloseTo(val, 4);
		expect(parseNumber('1.000,2')).toBeCloseTo(val, 4);
		//Error input but parse is forgiven
		expect(parseNumber('1000..2')).toBeCloseTo(val, 4);
		expect(parseNumber('0.1000.2')).toBeCloseTo(val, 4);
		//Return nan
		expect(parseNumber('aaa')).toBeNaN();
	});
	test('scientific format input', () => {
		expect(parseNumber('1.0002e3')).toBeCloseTo(val, 4);
		expect(parseNumber('1,0002e3')).toBeCloseTo(val, 4);
		expect(parseNumber('1000200e-3')).toBeCloseTo(val, 4);
		expect(parseNumber('1000200e-3')).toBeCloseTo(val, 4);
	});
});

describe('formatStringNumber', () => {
	test('format input', () => {
		for (let testFormat of testData['formatString']) {
			expect(formatStringNumber(testFormat['input'])).toBe(testFormat['output']);
		}
	});
});

//This empoty export is to disable warning of jest about isolatedModules
export {};
