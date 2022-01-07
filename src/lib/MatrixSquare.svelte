<script lang="ts">
	import Matrix from './Matrix.svelte';
	import { getDimMatrix, type Flow_Order } from './scripts/matrix';

	export let matrix_vec: number[] = [];
	export let flow_order: Flow_Order = 'column';
	export let disabled: number[] = [];

	let dim_matrix: number = 0;
	updateDimMatrix();
	$: if (matrix_vec) {
		updateDimMatrix();
	}
	// TODO: duplicated in MatrixSymm
	function updateDimMatrix() {
		let dim: number | undefined = getDimMatrix(matrix_vec);
		if (typeof dim !== 'undefined') dim_matrix = dim;
	}
</script>

<Matrix rows={dim_matrix} cols={dim_matrix} bind:matrix_vec {flow_order} {disabled} on:input />
