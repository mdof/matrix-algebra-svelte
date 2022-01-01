<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { parseNumber } from './parseStringToNumber';

	export let label: string = '';
	export let value: number = -1;

	let valueSaved: string = value.toString();
	let valueDisplayed = value.toString();

	// let formatType :
	let maxSignificantDigits = 2;
	let optionsFormat = {
		style: 'decimal',
		notation: 'standard',
		maximumSignificantDigits: maxSignificantDigits,
		signDisplay: 'auto'
	};
	const locale = 'en-US';
	let formatter = new Intl.NumberFormat(locale, optionsFormat);
	let editing: boolean = false;

	const dispatch = createEventDispatcher();
	function changeNotation(not: string) {
		optionsFormat.notation = not;
		formatter = new Intl.NumberFormat(locale, optionsFormat);
	}

	function dispatchInput(e: Event) {
		editing = true;
		let input: string = (e.target as HTMLInputElement).value;
		if (input == '') {
			changeNotation('standard');
			return;
		}
		let numInput = parseNumber(input);
		// let numInput = parseFloat(input);
		console.log('---Num Input :', numInput);
		if (isNaN(numInput)) {
			console.log('Could not convert to float : ', input);
			return;
		}
		// let formInput = formatNumber(numInput);
		if (input.includes('e') && formatter.resolvedOptions().style != 'scientific') {
			changeNotation('scientific');
			console.log('Notation of formatter changed to scientific');
		}
		if (!input.includes('e') && formatter.resolvedOptions().style != 'standard') {
			changeNotation('standard');
		}

		// let formInput: string = formatter.format(numInput);
		// console.log(`Raw input : ${input}  ,  Parsed input: ${numInput},  Form input: ${formInput}`);
		console.log(`Raw input : ${input}  ,  Parsed input: ${numInput}`);
		// let valueSavedNum = formatNumber(parseNumber(valueSaved));
		// console.log('Comparing ', valueSavedNum, formInput);
		// if (formInput.toString() == valueSavedNum.toString() && !isNumber(input[input.length - 1])) {
		//     console.log('Value did not significantly changed');
		//     return;
		// }

		dispatch('input', numInput);
		valueSaved = input;
		// valueDisplayed = formInput;
	}
	// function isNumber(str: string) {
	//     return str.length === 1 && str.match(/[0-9]/i);
	// }

	function onLeave(e: Event) {
		editing = false;
		updateDisplay();
		console.log('On LEAVE: ', editing);
	}
	function updateDisplay() {
		// if (valueSaved.toLowerCase().includes('e')) {
		//     console.log('Number ', valueSaved, ' contains e');
		//     return;
		// }
		if (editing) return;
		// let numInput = parseFloat(valueSaved);
		let numInput = parseNumber(valueSaved);
		if (numInput < 1 / Math.pow(10, maxSignificantDigits)) {
			console.log('Input is lower than significant decimal');
		}
		// valueDisplayed = formatNumber(numInput);
		valueDisplayed = formatter.format(numInput);
		console.log('Number ', valueSaved, valueDisplayed, value, numInput);
	}

	function formatNumber(i: number): number {
		return parseFloat(i.toFixed(2));
	}

	$: if (value) {
		// if (value > 0) {
		// }
		// valueDisplayed = value;
		// valueSaved = value.toString();
		console.log('From Matrix : Value : ', value, '  ValueSaved: ', valueSaved);
		valueSaved = value.toString();
		console.log('From Matrix : Value : ', value, '  ValueSaved: ', valueSaved);
		updateDisplay();
		// console.log('From InputNumber ', value, valueDisplayed, valueSaved);
	}
</script>

<label
	class="w-full select-none flex items-center border border-transparent rounded-sm | hover:border-gray-100 | focus-within:outline-none focus-within:ring-2 focus-within:ring-primary-focus focus-within:ring-opacity-70"
>
	{#if label != ''}
		<span
			class="block flex-shrink-0 h-7 w-auto px-4 | text-base-content | text-xs leading-7 text-center "
			>{label}
		</span>
	{/if}
	<input
		class="w-full h-7 bg-transparent outline-none | text-xs leading-7 text-center"
		bind:value={valueDisplayed}
		on:input={dispatchInput}
		on:blur={onLeave}
		tabindex="0"
	/>
</label>
