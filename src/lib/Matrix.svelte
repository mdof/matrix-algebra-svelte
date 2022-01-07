<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	import { fade } from 'svelte/transition';
	import Input from './Input.svelte';
	import type { Flow_Order } from '../lib/scripts/matrix';

	const dispatch = createEventDispatcher<{ input: { position: number; newValue: number } }>();

	export let matrix_vec: number[];
	export let rows: number;
	export let cols: number;
	export let flow_order: Flow_Order = 'column';
	export let disabled: number[] = [];

	let old_rows: number;
	let old_cols: number;
	let effectHolded = false;

	function handleInput(position: number, newValue: number) {
		matrix_vec[position] = newValue;
		dispatch('input', { position, newValue });
	}

	$: console.log(`Matrix changed to ${matrix_vec}`);
</script>

<div
	class="base-matrix matrix-config"
	style="--rows: {effectHolded ? old_rows : rows};
  --cols: {effectHolded ? old_cols : cols};
  --flow_order:{flow_order}"
>
	{#each matrix_vec as value, pos (pos)}
		<div
			transition:fade={{ duration: 200 }}
			on:introend={() => {
				old_rows = rows;
				old_cols = cols;
			}}
			on:outrostart={() => (effectHolded = true)}
			on:outroend={() => (effectHolded = false)}
			class="input-container"
		>
			<Input
				{value}
				on:input={(e) => handleInput(pos, e.detail)}
				disabled={disabled.includes(pos)}
			/>
		</div>
	{/each}
</div>

<style lang="postcss">
	.base-matrix {
		@apply grid gap-1 justify-items-center items-center;
	}
	.matrix-config {
		grid-auto-flow: var(--flow_order);
		grid-template-columns: repeat(var(--cols), 1fr);
		grid-template-rows: repeat(var(--rows), 1fr);
	}

	.input-container {
		@apply w-full flex content-center justify-center  rounded border-2 border-gray-100;
	}
</style>
