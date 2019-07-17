<script context="module">
	export async function preload({ params, query }) {
		const response = await this.fetch(`blog/${params.slug}.json`);
		console.log(await response.text());

		if (response.ok) {
			return { post: await response.json() };
		} else {
			this.error(response.status, 'Not found');
		}
	}
</script>

<script>
	export let post;
</script>

<svelte:head>
	<title>{post.metadata.title}</title>
</svelte:head>

<h1>{post.metadata.title}</h1>
<time>{post.metadata.date}</time>

<div class='content'>
	{@html post.html}
</div>
