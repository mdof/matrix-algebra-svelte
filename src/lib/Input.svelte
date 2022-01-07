<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { parseNumber, formatStringNumber } from './scripts/parseStringToNumber';
	const defaultValue = 0;
	const dispatch = createEventDispatcher<{ input: number }>();

	export let label: string = '';
	export let value: string | number = defaultValue;
	export let disabled: boolean = false;

	let oldValue: string = value.toString();

	function reset() {
		value = defaultValue;
		oldValue = value.toString();
		dispatch('input', defaultValue);
	}

	let editing: boolean = false;
	function onChange(e: Event) {
		editing = true;
		// Validate before dispatching
		let strInput: string = (e.target as HTMLInputElement).value;
		oldValue = strInput;
		let numInput = parseNumber(strInput);
		if (Number.isNaN(numInput)) {
			console.log(`Nan value ${numInput} coming from ${strInput}`);
			return;
		}
		dispatch('input', numInput);
		// console.log('Dispatched ', value, strInput);
	}

	function onLeave() {
		editing = false;
		formatValue(oldValue);
	}

	function formatValue(val: string) {
		//This will format a received value
		// console.log('Not editing');
		let numInput = parseNumber(val);
		if (Number.isNaN(numInput)) {
			console.log(`Nan value ${numInput} coming from ${oldValue}`);
			reset();
		} else {
			value = formatStringNumber(val);
		}
		// console.log('Value modified ', value, ' from ', oldValue);
	}

	$: if (value) {
		if (editing) {
			//While editing ,we need to redefine value because we are
			//dispatching the new input to have updated values of matrix as we type.
			//The matrix gets modified and value is received as number, this
			//can be a problem because we can be writing "3." and the number received
			// will be "3" so the dot will never appear and cannot write float numbers.
			value = oldValue;
		} else {
			/* console.log('Received value when not editing ', value, oldValue); */
			formatValue(value.toString());
		}
		console.log('Updated value to ', value);
	}

	//FIXME: style when focus not working in test folder and REPL
	//FIXME: logo in README.md is not showed
</script>

<label>
	{#if label != ''}
		<span>{label} </span>
	{/if}
	<input bind:value on:input={onChange} on:blur={onLeave} tabindex="0" {disabled} class:disabled />
</label>

<style lang="postcss">
	label {
		@apply w-full m-0 select-none flex items-center border border-solid border-transparent rounded-sm  
    ring-0 hover:border-gray-100  focus-within:ring-indigo-700 
    focus-within:outline-none focus-within:ring-2 focus-within:ring-opacity-70;
	}
	span {
		@apply block flex-shrink-0 h-7 w-auto px-4  text-neutral-700  text-xs leading-7 text-center;
	}
	input {
		@apply w-full m-0 h-7 border-0 bg-transparent outline-none  text-xs leading-7 text-center;
	}

	.disabled {
		@apply text-gray-300;
	}
</style>
