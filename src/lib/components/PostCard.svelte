<script lang="ts">
	import { asset, resolve } from '$app/paths';
	import { twMerge } from 'tailwind-merge';
	import type { PostCardProps } from '$lib/components/PostCard';

	const {
		slug,
		postTitle,
		shortDescription,
		tags,
		imgSrc,
		class: className
	}: PostCardProps = $props();
</script>

<a
	href={resolve(`/blog/${slug}`)}
	class={twMerge(
		'flex w-full max-w-200 flex-col overflow-clip rounded-xl border-2 border-black shadow-[6px_6px_0px_0px_#000] transition-all hover:translate-1.5 hover:shadow-none',
		className
	)}
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

			<hr
				class="mx-auto h-1.5 w-[95%] rounded-full border border-black bg-blue-400 shadow-[2px_2px_0px_0px_#000] sm:h-2"
			/>

			<p class="text-sm leading-relaxed sm:text-base">
				{shortDescription}
			</p>
		</div>

		{#if tags.length > 0}
			<div class="my-1 flex flex-row flex-wrap gap-2 sm:my-2">
				{#each tags as tag (tag)}
					<span class="rounded-full border border-black bg-blue-200 px-2 py-0.5 text-sm">
						#{tag}
					</span>
				{/each}
			</div>
		{/if}
	</div>
</a>
