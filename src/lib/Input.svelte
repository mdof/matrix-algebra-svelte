<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { parseNumber, formatStringNumber } from './scripts/parseStringToNumber';
	export let label: string = '';
	const defaultValue = 0;
	export let value: number | string = defaultValue;
	const dispatch = createEventDispatcher();

	function reset() {
		value = defaultValue;
		dispatch('input', defaultValue);
	}

	function onChange(e: Event) {
		let strInput: string = (e.target as HTMLInputElement).value;
		let numInput = parseNumber(strInput);
		if (Number.isNaN(numInput)) {
			return;
		}
		dispatch('input', numInput);
	}

	function onLeave(e: Event) {
		let strInput: string = (e.target as HTMLInputElement).value;
		let numInput = parseNumber(strInput);
		if (Number.isNaN(numInput)) {
			reset();
			return;
		}
		value = formatStringNumber(strInput);
	}
</script>

<label>
	{#if label != ''}
		<span>{label} </span>
	{/if}
	<input bind:value on:input={onChange} on:blur={onLeave} tabindex="0" />
</label>

<style>
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
