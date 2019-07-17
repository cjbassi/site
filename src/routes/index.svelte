<script context="module">
	export async function preload({ params, query }) {
		const response = await this.fetch('routes.json');
		console.log(response);
		const index = await response.json();
		console.log(index);
		return { index };
	}
</script>

<script>
	export let index;
</script>

<svelte:head>
	<title>{index.metadata.title}</title>
</svelte:head>

<h1>{index.metadata.title}</h1>

<div class="content">
	{@html index.html}
</div>
