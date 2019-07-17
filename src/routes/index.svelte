<script context="module">
	export async function preload() {
		const response = await this.fetch('index.json');
		const index = await response.json();
		return { index };
	}
</script>

<script>
	export let index;
</script>

<svelte:head>
	<title>{index.metadata.title}</title>
	<link rel="alternate" type="application/rss+xml" title="Caleb Bassi's blog" href="blog/rss.xml">
</svelte:head>

<div class='content'>
	{@html index.html}
</div>
