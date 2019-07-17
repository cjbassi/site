<script>
	import Nav from '../components/Nav.svelte';
</script>

<style>
	main {
		margin: 0 auto;
		padding: 0 1rem;
		max-width: 70rem;
	}
</style>

<Nav />

<main>
	<slot />
</main>