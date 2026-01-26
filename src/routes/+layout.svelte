<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import 'iconify-icon';

	let { children } = $props();
</script>

<svelte:head>
	<title>Luís Otávio</title>
	<link rel="icon" href={favicon} />
	<link rel="canonical" href="https://luisfadini.com/" />
	<meta name="author" content="Luís Otávio" />
</svelte:head>

{@render children()}
