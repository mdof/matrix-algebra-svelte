import { parseNumber, formatStringNumber } from './parseStringToNumber';
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
	});
	test('scientific format input', () => {
		expect(parseNumber('1.0002e3')).toBeCloseTo(val, 4);
		expect(parseNumber('1,0002e3')).toBeCloseTo(val, 4);
		expect(parseNumber('1000200e-3')).toBeCloseTo(val, 4);
		expect(parseNumber('1000200e-3')).toBeCloseTo(val, 4);
	});
});

describe('formatStringNumber', () => {
	test('standard format input', () => {
		//Integer
		expect(formatStringNumber('2.0')).toBe('2');
		expect(formatStringNumber('2')).toBe('2');
		//Float
		expect(formatStringNumber('2.1')).toBe('2.10');
		expect(formatStringNumber('2.166')).toBe('2.17');
	});
	test('scientific format input', () => {
		//Integer
		expect(formatStringNumber('2e0')).toBe('2');
		//Float
		expect(formatStringNumber('2e-2')).toBe('2.00e-2');
		expect(formatStringNumber('20.5e-2')).toBe('2.05e-1');
	});
});

//This empoty export is to disable warning of jest about isolatedModules
export {};
