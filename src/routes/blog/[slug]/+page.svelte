<script lang="ts">
	import type { PageProps } from './$types';
	import type { PostFrontMatter } from '$lib/posts';
	import Sidebar from '$lib/components/sidebar/Sidebar.svelte';
	import ContentHeader from '$lib/components/ContentHeader.svelte';
	import { JsonLd } from 'svelte-meta-tags';
	import { BASE_URL } from '$lib';
	import Icon from '@iconify/svelte';
	import Bordered from '$lib/components/Bordered.svelte';
	import Article from '$lib/components/blog/Article.svelte';

	const { data }: PageProps = $props();

	const { metadata, content: Component } = data as {
		metadata: PostFrontMatter;
		content: typeof import('svelte').SvelteComponent;
	};

	const formatDate = (dateString: string) =>
		new Intl.DateTimeFormat('pt-BR', {
			timeZone: 'UTC',
			day: '2-digit',
			month: '2-digit',
			year: 'numeric'
		}).format(new Date(dateString));

	const readingTimeLabel = $derived(metadata.readingTime === 1 ? 'minuto' : 'minutos');
</script>

<JsonLd
	schema={{
		'@type': 'BlogPosting',
		mainEntityOfPage: {
			'@type': 'WebPage',
			'@id': `${BASE_URL}/blog/${metadata.slug}`
		},
		headline: metadata.title,
		image: [`${BASE_URL}${metadata.imgSrc}`],
		datePublished: metadata.createdAt,
		dateModified: metadata.updatedAt,
		author: {
			'@type': 'Person',
			name: 'Luís Otávio',
			url: BASE_URL
		},
		publisher: {
			'@type': 'Person',
			name: 'Luís Otávio'
		}
	}}
/>

<div class="flex min-h-screen flex-col bg-zinc-100 md:h-screen md:flex-row">
	<Sidebar />

	<main
		class="
			flex min-h-0 w-full flex-1 flex-col items-center overflow-y-auto
			md:w-2/3 lg:w-4/5
		"
	>
		<ContentHeader text={metadata.title} />

		<Article>
			<header class="not-prose mb-10">
				<div class="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
					<Bordered class="flex items-center gap-3 bg-white px-4 py-3" shadowSize={3}>
						<Icon icon="ph:calendar-bold" class="size-6 shrink-0" aria-hidden="true" />

						<div class="min-w-0">
							<p
								class="
									text-xs font-bold tracking-wider text-zinc-500
									uppercase
								"
							>
								Criado
							</p>

							<p class="font-bold text-black">
								{formatDate(metadata.createdAt)}
							</p>
						</div>
					</Bordered>

					<Bordered class="flex items-center gap-3 bg-white px-4 py-3" shadowSize={3}>
						<Icon icon="ph:clock-clockwise-bold" class="size-6 shrink-0" aria-hidden="true" />

						<div class="min-w-0">
							<p
								class="
									text-xs font-bold tracking-wider text-zinc-500
									uppercase
								"
							>
								Atualizado
							</p>

							<p class="font-bold text-black">
								{formatDate(metadata.updatedAt)}
							</p>
						</div>
					</Bordered>

					<Bordered
						class="
							flex items-center gap-3 bg-white px-4 py-3
							sm:col-span-2 lg:col-span-1
						"
						shadowSize={3}
					>
						<Icon icon="ph:book-open-text-bold" class="size-6 shrink-0" aria-hidden="true" />

						<div class="min-w-0">
							<p
								class="
									text-xs font-bold tracking-wider text-zinc-500
									uppercase
								"
							>
								Leitura
							</p>

							<p class="font-bold text-black">
								{metadata.readingTime}
								{readingTimeLabel}
							</p>
						</div>
					</Bordered>
				</div>
			</header>

			<enhanced:img
				src={metadata.imgSrc}
				alt={metadata.title}
				class="block h-auto w-full"
				fetchpriority="high"
			/>

			<Component />
		</Article>
	</main>
</div>
