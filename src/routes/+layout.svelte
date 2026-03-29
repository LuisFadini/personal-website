<script lang="ts">
	import '../app.css';
	import 'iconify-icon';
	import { page } from '$app/state';
	import { MetaTags, deepMerge } from 'svelte-meta-tags';
	import type { Snippet } from 'svelte';

	let { data, children }: { data: { baseMetaTags: unknown }; children: Snippet<[]> } = $props();

	let metaTags = $derived(deepMerge(data.baseMetaTags, page.data.pageMetaTags));
</script>

<MetaTags {...metaTags} />

{@render children()}
