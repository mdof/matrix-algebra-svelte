<script lang="ts">
	import MatrixSquare from './MatrixSquare.svelte';
	import { getDisabled, getDimMatrix } from './scripts/matrix';

	export let matrix_vec: number[] = [];
	export let flow_order: 'column' | 'row' = 'column';

	let dim_matrix = getDimMatrix(matrix_vec);
	let disabled: number[];
	$: if (matrix_vec) {
		dim_matrix = getDimMatrix(matrix_vec);
		disabled = getDisabled(dim_matrix);
	}
</script>

<MatrixSquare bind:matrix_vec {flow_order} {disabled} />
