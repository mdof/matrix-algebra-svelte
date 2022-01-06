<script lang="ts">
	import Matrix from './Matrix.svelte';
	import { getDimMatrix, type Flow_Order } from './scripts/matrix';

	export let matrix_vec: number[] = [];
	export let flow_order: Flow_Order = 'column';
	export let disabled: number[] = [];

	// FIXME: type not warned by lsp
	let dim_matrix: number | undefined = getDimMatrix(matrix_vec);
	$: if (matrix_vec) {
		dim_matrix = getDimMatrix(matrix_vec);
	}
</script>

<Matrix rows={dim_matrix} cols={dim_matrix} bind:matrix_vec {flow_order} {disabled} on:input />
