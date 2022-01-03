<script lang="ts">
	import Matrix from './Matrix.svelte';

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
</script>

<Matrix rows={dim_matrix} cols={dim_matrix} bind:matrix_vec {flow_order} />
