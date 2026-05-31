<script lang="ts">
	import { asset, resolve } from '$app/paths';
	import type { PostCardProps } from '$lib/components/PostCard';

	const { slug, postTitle, shortDescription, tags, imgSrc }: PostCardProps = $props();
</script>

<a
	href={resolve(`/blog/${slug}`)}
	class="mx-4 flex min-h-fit w-[90%] flex-col items-stretch overflow-hidden rounded-xl border border-zinc-600 bg-zinc-800/20 shadow-xl shadow-black/30 transition-all duration-200 hover:bg-zinc-700/30 hover:shadow-none lg:flex-row-reverse"
>
	<img
		src={asset(imgSrc)}
		alt={postTitle}
		class="block object-contain lg:h-50"
		loading="lazy"
		decoding="async"
		fetchpriority="high"
	/>
	<div class="flex flex-col gap-3 p-2">
		<div class="flex flex-col gap-1">
			<h2 class="text-2xl font-bold text-wrap text-text lg:text-3xl">{postTitle}</h2>
			<hr class="mx-3 h-1 rounded-full border-0 bg-text" />
			<p class="text-justify text-lg text-wrap lg:text-xl">{shortDescription}</p>
		</div>

		{#if tags.length > 0}
			<div class="flex flex-row flex-wrap gap-2 lg:mt-auto">
				{#each tags as tag (tag)}
					<span
						class="rounded-full bg-accent px-2 text-zinc-800 italic transition-all duration-200 hover:bg-accent/30 hover:text-zinc-300"
					>
						#{tag}
					</span>
				{/each}
			</div>
		{/if}
	</div>
</a>
