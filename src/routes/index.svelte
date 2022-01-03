<script lang="ts">
	//
	import Matrix from '$lib/Matrix.svelte';
	import MatrixSquare from '$lib/MatrixSquare.svelte';
	import MatrixSymm from '$lib/MatrixSymm.svelte';
	let vec = [10, 20, 30, 40];
	let not_squared = [1, 2, 3, 4, 5, 6];
	$: console.log(`INDEX ${vec}`);
	//
	let dim = 2;
	let vec_modified_by_dim = Array(dim * dim).fill(0);
	$: if (dim) {
		//Reset
		vec_modified_by_dim = Array(dim * dim).fill(0);
	}
</script>

<h1 class="font-bold">Welcome to matrix-algebra-svelte</h1>

<div class="block" data-test-id="reactive">
	<h2 class="font-bold">Reactivity</h2>
	<h2>Vector = {vec}</h2>
	<MatrixSquare bind:matrix_vec={vec} />
</div>
<div class="block">
	<h2 class="font-bold">Square matrix , flow column (default)</h2>
	<MatrixSquare matrix_vec={[1, 2, 3, 4]} />
	<h2 class="font-bold">Square matrix , flow row</h2>
	<MatrixSquare matrix_vec={[1, 2, 3, 4]} flow_order="row" />
	<h2 class="font-bold">Not squared</h2>
	<Matrix matrix_vec={[1, 2, 3, 4, 5, 6]} rows={2} cols={3} />
	<h2 class="font-bold">Symmetrix</h2>
	<MatrixSymm matrix_vec={[1, 2, 3, 4]} />
</div>

<div class="block">
	<h2 class="font-bold">Dynamic dimension</h2>
	<div>
		<span>Dim</span>
		<span>{dim}</span>
		<button class="w-6 bg-red-100" on:click={() => (dim -= 1)}>-</button>
		<button class="w-6 bg-red-100" on:click={() => (dim += 1)}>+</button>
	</div>
	<MatrixSquare bind:matrix_vec={vec_modified_by_dim} />
</div>

<!-- TODO: Add rows and cols input if squared matrix not desired -->
<style style="postcss">
	.block {
		@apply w-[50%] p-10 border-2 border-gray-100 rounded-xl my-14 mx-auto;
	}
</style>
