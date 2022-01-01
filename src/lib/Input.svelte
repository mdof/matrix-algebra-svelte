<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	export let value: number = 0;
	const dispatch = createEventDispatcher();

	function handleChange(e: Event) {
		let strInput: string = (e.target as HTMLInputElement).value;
		// let numInput = parseFloat(strInput);
		let numInput = parseNumber(strInput);
		if (isNaN(numInput)) {
			console.log('Could not convert to float : ', strInput);
			return;
		}
		dispatch('input', numInput);
	}

	$: if (value) {
		console.log('Value changed to ', value);
	}

	function parseNumber(value: string) {
		const cleanPattern = new RegExp(`[^-+0-9eE,\.]`, 'g');
		const cleaned = value.replace(cleanPattern, '');

		const separators = [...cleaned.matchAll(/[\.,]/g)];
		let filteredSeparators = [...cleaned];
		//Only use last separator and delete rest
		//Don't filter last separator ( sep.length - 2 )
		for (let i = separators.length - 2; i >= 0; i--) {
			let idx = separators[i].index;
			filteredSeparators.splice(idx, 1);
		}
		const normalized = filteredSeparators.join('').replace(',', '.');

		return parseFloat(normalized);
	}
</script>

<input bind:value on:input={handleChange} />
