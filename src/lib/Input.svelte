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
		dispatch('input', numInput);
	}

	function onLeave(e: Event) {
		let strInput: string = (e.target as HTMLInputElement).value;
		if (strInput == '') {
			reset();
			return;
		}
		value = formatStringNumber(strInput);
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
		bind:value
		on:input={onChange}
		on:blur={onLeave}
		tabindex="0"
	/>
</label>
