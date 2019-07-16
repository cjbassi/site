<script context="module">
	export async function preload({ params, query }) {
		const res = await this.fetch(`blog/${params.slug}.json`);
		const data = await res.json();

		if (res.status === 200) {
			return { post: data };
		} else {
			this.error(res.status, data.message);
		}
	}
</script>

<script>
	export let post;
</script>

<svelte:head>
	<title>{post.title}</title>
</svelte:head>

<h1>{post.title}</h1>
<time>{post.date}</time>

<div class='content'>
	{@html post.html}
</div>
