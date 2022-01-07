<script lang="ts">
	import MatrixSquare from './MatrixSquare.svelte';
	import { getDisabled, getDimMatrix, getSymmetricPosition, isSquared } from './scripts/matrix';
	import type { Flow_Order } from './scripts/matrix';

	export let matrix_vec: number[];
	export let flow_order: Flow_Order = 'column';

	let dim_matrix: number = 0;
	updateDimMatrix();

	let disabled: number[];
	$: if (matrix_vec) {
		updateDimMatrix();
		disabled = getDisabled(dim_matrix);
	}

	// TODO: duplicated in MatrixSquare
	function updateDimMatrix() {
		let dim: number | undefined = getDimMatrix(matrix_vec);
		if (typeof dim !== 'undefined') dim_matrix = dim;
	}

	function handleInput(data: { position: number; newValue: number }) {
		//Update
		let posSym = getSymmetricPosition(dim_matrix, flow_order, data.position);
		matrix_vec[posSym] = data.newValue;
		//Forward?
		//No forward
	}
</script>

<MatrixSquare bind:matrix_vec {flow_order} {disabled} on:input={(e) => handleInput(e.detail)} />
