<script lang="ts">
	import Matrix from '$lib/Matrix.svelte';
	let vec = [10, 20, 30, 40];
	let not_squared = [1, 2, 3];

	let dim = 2;
	let vec_modified_by_dim = Array(dim * dim).fill(0);
	$: if (dim) {
		//Reset
		vec_modified_by_dim = Array(dim * dim).fill(0);
	}
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>

<div class="w-[80%]">
	<h2>Vector = {vec}</h2>
	<h2>Full matrx , flow column (default)</h2>
	<Matrix matrix_vec={vec} />
	<h2>Full matrix , flow row</h2>
	<Matrix matrix_vec={vec} flow_order="row" />
	<h2>Not squared</h2>
	<Matrix matrix_vec={not_squared} />

	<div>
		<h2>Dynamic dimension</h2>
		<div>
			<span>Dim</span>
			<span>{dim}</span>
			<button class="w-6 bg-red-100" on:click={() => (dim -= 1)}>-</button>
			<button class="w-6 bg-red-100" on:click={() => (dim += 1)}>+</button>
		</div>
		<Matrix matrix_vec={vec_modified_by_dim} />
	</div>
</div>

<!-- TODO: Add rows and cols input if squared matrix not desired -->
