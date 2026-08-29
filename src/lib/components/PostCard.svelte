<script lang="ts">
	import { asset, resolve } from '$app/paths';
	import { twMerge } from 'tailwind-merge';
	import type { PostCardProps } from '$lib/components/PostCard';
	import Bordered from './Bordered.svelte';

	const {
		slug,
		postTitle,
		shortDescription,
		tags,
		imgSrc,
		class: className
	}: PostCardProps = $props();
</script>

<Bordered
	as="a"
	href={resolve('/blog/[slug]', { slug })}
	class={twMerge(
		'flex w-full max-w-200 flex-col overflow-clip rounded-xl transition-all hover:translate-1.5 hover:shadow-none',
		className
	)}
	shadowSize={6}
>
	<img
		src={asset(imgSrc)}
		alt={postTitle}
		class="aspect-2/1 w-full shrink-0 object-cover"
		loading="lazy"
		decoding="async"
	/>

	<div class="mx-3 flex flex-col gap-2 py-3 sm:mx-4 sm:py-4">
		<div class="flex flex-col gap-3 sm:gap-4">
			<h3 class="text-xl leading-tight font-bold sm:text-2xl">
				{postTitle}
			</h3>

			<Bordered
				as="hr"
				class="mx-auto h-1.5 w-[95%] rounded-full bg-blue-400 sm:h-2"
				borderWidth={1}
				shadowSize={2}
			/>

			<p class="text-sm leading-relaxed sm:text-base">
				{shortDescription}
			</p>
		</div>

		{#if tags.length > 0}
			<div class="my-1 flex flex-row flex-wrap gap-2 sm:my-2">
				{#each tags as tag (tag)}
					<Bordered
						as="span"
						class="rounded-full bg-blue-200 px-2 py-0.5 text-sm"
						shadowSize={0}
						borderWidth={1}
					>
						#{tag}
					</Bordered>
				{/each}
			</div>
		{/if}
	</div>
</Bordered>
