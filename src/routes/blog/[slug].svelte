<script context="module">
	export async function preload({ params }) {
		const response = await this.fetch(`blog/${params.slug}.json`);
		return response.ok ? { post: await response.json() } : this.error(404, 'Not found');
	}
</script>

<script>
	export let post;
</script>

<svelte:head>
	<title>{post.metadata.title}</title>
</svelte:head>

<h1>{post.metadata.title}</h1>
<time>{post.metadata.pubdate}</time>

<div class='content'>
	{@html post.html}
</div>
