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

<div class="brackets">
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
</div>

<style lang="postcss">
	.brackets {
		/* @apply before:content-[""] before:h-full before:block before:w-2 before:border-y-2 before:border-l-2 before:border-current before:border-solid; */

		background-image: linear-gradient(#ffb1bb, #ffb1bb), linear-gradient(#ffb1bb, #ffb1bb),
			linear-gradient(#ffb1bb, #ffb1bb), linear-gradient(#ffb1bb, #ffb1bb);

		background-repeat: no-repeat;
		background-size: 8px 3px;
		background-position: top left, top right, bottom left, bottom right;

		border: solid #ffb1bb;
		text-align: justify;
		border-width: 0 3px;
		display: inline-block;
		vertical-align: top;
		padding: 5px 15px;
		margin: 20px;
	}
	.base-matrix {
		@apply grid gap-1 justify-items-center items-center;
	}
	.matrix-config {
		grid-auto-flow: var(--flow_order);
		grid-template-columns: repeat(var(--cols), 1fr);
		grid-template-rows: repeat(var(--rows), 1fr);
	}

	.input-container {
		@apply w-full box-border flex content-center justify-center rounded border-2 border-gray-100 border-solid;
	}
</style>
