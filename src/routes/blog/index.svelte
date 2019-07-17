<script context="module">
	export async function preload() {
		const response = await this.fetch('blog.json');
		const { posts, index } = await response.json();
		return { posts, index };
	}
</script>

<script>
	export let posts;
	export let index;
</script>

<svelte:head>
	<title>{index.metadata.title}</title>
	<link rel="alternate" type="application/rss+xml" title="Caleb Bassi's blog" href="blog/rss.xml">
</svelte:head>

<div class='content'>
	{@html index.html}
</div>

<ul>
	{#each posts as post}
		<li>
			{post.metadata.date} -
			<a rel="prefetch" href="blog/{post.slug}">{post.metadata.title}</a>
		</li>
	{/each}
</ul>