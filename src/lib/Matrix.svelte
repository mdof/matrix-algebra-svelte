<script lang="ts">
	import { fade } from 'svelte/transition';
	import { createEventDispatcher } from 'svelte';
	import Input from './Input.svelte';

	export let matrix_vec: number[] = [];
	export let flow_order: 'column' | 'row' = 'column';

	function getDimMatrix(): number {
		let sqrtDimVec = Math.sqrt(matrix_vec.length);
		if (Number.isInteger(sqrtDimVec)) {
			return sqrtDimVec;
		}
		return Math.round(sqrtDimVec);
	}

	let dim_matrix = getDimMatrix();
	$: if (matrix_vec) {
		dim_matrix = getDimMatrix();
	}

	let old_dim_matrix: number;
	let effectHolded = false;

	const dispatch = createEventDispatcher();
	function handleInput(position: number, newValue: number) {
		console.log('Received new value : ', newValue);
		dispatch('input', { newValue, position });
	}
</script>

<div
	class="grid matrix gap-1 justify-items-center items-center "
	style="--dimension: {effectHolded ? old_dim_matrix : dim_matrix};--flow_order:{flow_order}"
>
	{#each matrix_vec as value, pos}
		<div
			transition:fade={{ duration: 200 }}
			on:introend={() => (old_dim_matrix = dim_matrix)}
			on:outrostart={() => (effectHolded = true)}
			on:outroend={() => (effectHolded = false)}
			class="w-full flex content-center justify-center | rounded border-2 border-gray-100 "
		>
			<Input {value} on:input={(e) => handleInput(pos, e.detail)} />
		</div>
	{/each}
</div>

<style>
	.matrix {
		grid-auto-flow: var(--flow_order);
		grid-template-columns: repeat(var(--dimension), 1fr);
		grid-template-rows: repeat(var(--dimension), 1fr);
	}
</style>
