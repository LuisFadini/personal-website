<script lang="ts">
	import PostCard from '$lib/components/PostCard.svelte';
	import type { PageProps } from './$types';
	import Sidebar from '$lib/components/sidebar/Sidebar.svelte';
	import ContentHeader from '$lib/components/ContentHeader.svelte';
	import { JsonLd } from 'svelte-meta-tags';
	import { BASE_URL } from '$lib';

	const { data }: PageProps = $props();
</script>

<JsonLd
	schema={{
		'@type': 'Website',
		name: 'Luís Otávio',
		url: BASE_URL,
		description: 'Site pessoal com conteúdos sobre tecnologia, programação e alguns projetos.'
	}}
/>

<div class="flex flex-col md:h-screen md:flex-row">
	<Sidebar />

	<main
		class="relative flex h-full w-full flex-col items-center md:min-h-0 md:w-2/3 md:overflow-auto lg:w-4/5"
	>
		<ContentHeader text="Blog articles" />
		<div
			class="scrollbar flex min-h-0 w-full flex-col items-center gap-3 overflow-auto py-3 scrollbar-thumb-zinc-600 scrollbar-track-zinc-800"
		>
			{#each data.posts as post (post.slug)}
				<PostCard {...post} />
			{/each}
		</div>
	</main>
</div>
