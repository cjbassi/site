<script context="module">
	export async function preload() {
		const response = await this.fetch('index.json');
		const index = await response.json();
		return { index };
	}
</script>

<script>
	import { BLOG_TITLE } from '../../config';

	export let index;
</script>

<svelte:head>
	<title>{index.metadata.title}</title>
	<link rel="alternate" type="application/rss+xml" title="{BLOG_TITLE}" href="blog/rss.xml">
</svelte:head>

<div class='content'>
	{@html index.html}
</div>
