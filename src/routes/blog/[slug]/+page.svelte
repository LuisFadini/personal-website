<script lang="ts">
	import type { PageProps } from './$types';
	import type { PostFrontMatter } from '$lib/posts';
	import Sidebar from '$lib/components/sidebar/Sidebar.svelte';
	import ContentHeader from '$lib/components/ContentHeader.svelte';
	import type { SvelteComponent } from 'svelte';

	const { data }: PageProps = $props();
	type C = $$Generic<typeof SvelteComponent>;

	const { metadata, content } = data as unknown as { metadata: PostFrontMatter; content: C };

	const dateToString = (dateString: string) => {
		const date = new Date(dateString);
		const dd = date.getUTCDate().toString().padStart(2, '0');
		const mm = (date.getUTCMonth() + 1).toString().padStart(2, '0');
		const yyyy = date.getUTCFullYear();

		return `${dd}/${mm}/${yyyy}`;
	};

	const pluralizedMinutes = metadata.readingTime > 1 ? 'minutos' : 'minuto';

	const Component = $derived(content);
</script>

<div class="flex flex-col md:h-screen md:flex-row">
	<Sidebar />

	<main class="flex w-full flex-col items-center overflow-y-scroll md:min-h-0 md:w-2/3 lg:w-4/5">
		<ContentHeader text={metadata.title} />

		<article
			class="inline-code headings-hide-autolink prose max-w-full px-6 py-4
            prose-invert lg:w-2/3
            prose-headings:scroll-m-4 prose-p:leading-relaxed
            prose-ul:list-outside prose-ul:marker:text-accent
            prose-li:text-[--tw-prose-invert-body]
            prose-img:mx-auto prose-img:rounded-2xl
            prose-hr:mx-5 prose-hr:my-7 prose-hr:h-0.5 prose-hr:rounded-full prose-hr:border-0 prose-hr:bg-text"
		>
			<ul class="not-prose mx-3 flex flex-col justify-between text-lg font-bold lg:flex-row">
				<li class="flex flex-row items-center gap-2 lg:w-1/3">
					<iconify-icon icon="ph:calendar-bold" width="24px"></iconify-icon>Criado: {dateToString(
						metadata.createdAt
					)}
				</li>
				<li class="flex flex-row items-center gap-2 lg:w-1/3">
					<iconify-icon icon="ph:clock-clockwise-bold" width="24px"></iconify-icon>Atualizado: {dateToString(
						metadata.updatedAt
					)}
				</li>
				<li class="flex flex-row items-center gap-2 lg:w-1/3">
					<iconify-icon icon="ph:book-open-text-bold" width="24px"></iconify-icon>Tempo de leitura: {metadata.readingTime}
					{pluralizedMinutes}
				</li>
			</ul>
			<img src={metadata.imgSrc} alt="Post thumbnail" />
			<Component />
		</article>
	</main>
</div>

<style>
	@reference "../../../app.css";

	:global(.toc) {
		@apply w-full rounded-xl border border-zinc-700 bg-zinc-900 p-4 text-zinc-200;

		:global(ol) {
			@apply ml-5 list-outside list-decimal space-y-1 text-lg font-semibold text-zinc-700 dark:text-zinc-200;

			:global(li a) {
				@apply mb-3 underline-offset-2 hover:text-accent hover:underline;
			}
		}
	}
</style>
