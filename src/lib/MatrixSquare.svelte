<script lang="ts">
	import Matrix from './Matrix.svelte';
	import { getDimMatrix } from './scripts/matrix';

	export let matrix_vec: number[] = [];
	export let flow_order: 'column' | 'row' = 'column';
	export let disabled: number[] = [];

	let dim_matrix: number = getDimMatrix(matrix_vec);
	$: if (matrix_vec) {
		dim_matrix = getDimMatrix(matrix_vec);
	}
</script>

<Matrix rows={dim_matrix} cols={dim_matrix} bind:matrix_vec {flow_order} {disabled} />
