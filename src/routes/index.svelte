<script context="module">
	export function preload({ params, query }) {
		return this.fetch(`index.json`)
			.then(r => console.log(r))
			.then(index => {
				return { index };
			});
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
