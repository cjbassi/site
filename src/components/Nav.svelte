<script>
	import { onMount } from 'svelte';

	let colorScheme = "dark";

	onMount(() => {
		colorScheme = getColorScheme();
	});

	function getColorScheme() {
		return document.body.classList.contains("solarized-dark") ? "dark" : "light";
	}

	function oppositeColorScheme(s) {
		if (typeof s !== 'string') return '';
		return s === "light" ? "dark" : "light";
	}

	function toggleColorScheme() {
		if (colorScheme === "light") {
			document.body.classList.remove("solarized-light");
			document.body.classList.add("solarized-dark");
			localStorage.setItem("color-scheme", "dark");
		} else {
			document.body.classList.remove("solarized-dark");
			document.body.classList.add("solarized-light");
			localStorage.setItem("color-scheme", "light");
		}
		colorScheme = oppositeColorScheme(colorScheme);
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
		<a href="javascript:void(0)" on:click={toggleColorScheme}>
			{capitalize(oppositeColorScheme(colorScheme))} mode
		</a>
		-
		<a href="https://github.com/cjbassi/site">
			Source code
		</a>
	</p>
</nav>
