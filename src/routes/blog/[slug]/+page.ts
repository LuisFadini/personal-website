import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import type { ContentModule } from '$lib/types';
import { definePageMetaTags } from 'svelte-meta-tags';

const contentFiles = import.meta.glob<ContentModule>(`/src/content/*.{md,svx}`, {
	eager: true
});

export const load: PageLoad = async ({ data, params, url }) => {
	try {
		const fullPath = Object.keys(contentFiles).find((path) => path.endsWith(`/${data.filename}`));

		const pageTags = definePageMetaTags({
			title: data.title,
			keywords: data.tags,
			description: data.description,
			twitter: {
				cardType: 'summary_large_image',
				title: data.title,
				description: data.description,
				image: `${url.origin}${data.imgSrc}`,
				imageAlt: 'Post thumbnail image'
			},
			openGraph: {
				title: data.title,
				description: data.description,
				url: url.href,
				type: 'article',
				article: {
					publishedTime: data.createdAt,
					modifiedTime: data.updatedAt,
					tags: data.tags,
					authors: [`${url.origin}`]
				},
				images: [
					{
						url: `${url.origin}${data.imgSrc}`,
						width: 800,
						height: 400,
						type: 'image/png',
						alt: 'Post thumbnail image'
					}
				]
			}
		});

		return {
			metadata: data,
			content: contentFiles[fullPath!].default,
			...pageTags
		};
	} catch {
		error(404, `Could not find ${params.slug}`);
	}
};
