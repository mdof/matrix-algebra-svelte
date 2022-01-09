exports.testData = {
	formatString: [
		//Standard format
		//Integer
		{ input: '2.0', output: '2' },
		{ input: '2', output: '2' },
		//Float
		{ input: '2.1', output: '2.10' },
		{ input: '2.166', output: '2.17' },
		{ input: '120.1', output: '120.10' },
		//Scientific format
		//Integer
		{ input: '2e0', output: '2' },
		{ input: '2.2e0', output: '2.20' },
		// //Float
		{ input: '2e-2', output: '2.00e-2' },
		{ input: '1.234e-2', output: '1.23e-2' },
		{ input: '1.234e0', output: '1.23' },
		{ input: '12.34e-1', output: '1.23' },
		{ input: '12.34e-2', output: '1.23e-1' },
		// Above 1000 then scientific
		{ input: '1200', output: '1.20e+3' },
		{ input: '1200.4', output: '1.20e+3' }
	],
	formatStringZero: [
		//Zero
		{ input: '0', output: '0' },
		{ input: '0.0', output: '0' }
	]
};
