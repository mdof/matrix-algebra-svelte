<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { parseNumber, formatStringNumber } from './scripts/parseStringToNumber';
	export let label: string = '';
	const defaultValue = 0;
	export let value: number | string = defaultValue;
	export let displayValue: string = value.toString();
	const dispatch = createEventDispatcher();

	function reset() {
		value = defaultValue;
		displayValue = value.toString();
		dispatch('input', defaultValue);
	}

	let editing: boolean = false;
	let oldValue: string = '';
	function onChange(e: Event) {
		editing = true;
		// Validate before dispatching
		let strInput: string = (e.target as HTMLInputElement).value;
		let numInput = parseNumber(strInput);
		if (Number.isNaN(numInput)) return;
		dispatch('input', numInput);
		oldValue = strInput;
		// console.log('Dispatched ', value, strInput);
	}

	function onLeave() {
		editing = false;
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
			//This will format a received value
			// console.log('Not editing');
			let numInput = parseNumber(oldValue);
			if (Number.isNaN(numInput)) {
				// console.log('Nan value is ', displayValue);
				reset();
			} else {
				value = formatStringNumber(oldValue);
			}
			// console.log('Value modified ', value, ' from ', oldValue);
		}
	}

	//FIXME: style when focus not working in test folder and REPL
	//FIXME: logo in README.md is not showed
</script>

<label>
	{#if label != ''}
		<span>{label} </span>
	{/if}
	<input bind:value on:input={onChange} on:blur={onLeave} tabindex="0" />
</label>

<style lang="postcss">
	label {
		@apply w-full select-none flex items-center border border-transparent rounded-sm  hover:border-gray-100  focus-within:ring-indigo-700 focus-within:outline-none focus-within:ring-2 focus-within:ring-opacity-70;
	}
	span {
		@apply block flex-shrink-0 h-7 w-auto px-4  text-neutral-700  text-xs leading-7 text-center;
	}
	input {
		@apply w-full m-0 h-7 bg-transparent outline-none  text-xs leading-7 text-center;
	}
</style>
