<script context="module">
	export async function preload({ params, query }) {
		const response = await this.fetch('blog.json');
		const posts = await response.json();
		return { posts };
	}
</script>

<script>
	export let posts;
</script>

<svelte:head>
	<title>Blog</title>
	<link rel="alternate" type="application/rss+xml" title="Svelte blog" href="blog/rss.xml">
</svelte:head>

<h1>Recent posts</h1>

<ul>
	{#each posts as post}
		<li>
			{post.metadata.pubdate} -
			<a rel="prefetch" href="blog/{post.slug}">{post.metadata.title}</a>
		</li>
	{/each}
</ul>
