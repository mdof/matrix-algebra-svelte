<script lang="ts">
	import MatrixSquare from './MatrixSquare.svelte';
	import { getDisabled, getDimMatrix, getSymmetricPosition } from './scripts/matrix';
	import type { Flow_Order } from './scripts/matrix';

	export let matrix_vec: number[] = [];
	// TODO: add check of symmetry of matrix before rendering
	export let flow_order: Flow_Order = 'column';

	// FIXME: type not warned by lsp
	let dim_matrix: number = getDimMatrix(matrix_vec);
	let disabled: number[];
	$: if (matrix_vec) {
		dim_matrix = getDimMatrix(matrix_vec);
		disabled = getDisabled(dim_matrix);
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
