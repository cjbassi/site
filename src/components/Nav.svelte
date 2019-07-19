<script>
	import { onMount } from 'svelte';

	let colorscheme = "dark";

	onMount(() => {
		colorscheme = getColorscheme();
	});

	function getColorscheme() {
		return document.body.classList.contains("solarized-dark") ? "dark" : "light";
	}

	function oppositeColorscheme(s) {
		if (typeof s !== 'string') return '';
		return s === "light" ? "dark" : "light";
	}

	function toggleColorscheme() {
		if (colorscheme === "light") {
			document.body.classList.remove("solarized-light");
			document.body.classList.add("solarized-dark");
			localStorage.setItem("colorscheme", "dark");
		} else {
			document.body.classList.remove("solarized-dark");
			document.body.classList.add("solarized-light");
			localStorage.setItem("colorscheme", "light");
		}
		colorscheme = oppositeColorscheme(colorscheme);
	}

	function capitalize(s) {
		if (typeof s !== 'string') return ''
		return s.charAt(0).toUpperCase() + s.slice(1)
	}
</script>

<style>
	nav {
		display: flex;
		justify-content: center;
	}
</style>

<nav>
	<p>
		<a rel="prefetch" href=".">Caleb Bassi</a>
		-
		<a rel="prefetch" href="blog">Blog</a>
		|
		<a href="." on:click={toggleColorscheme}>
			{capitalize(oppositeColorscheme(colorscheme))} mode
		</a>
	</p>
</nav>
