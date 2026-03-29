import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import type { ContentModule } from '$lib/types';
import { definePageMetaTags } from 'svelte-meta-tags';

const contentFiles = import.meta.glob<ContentModule>(`/src/content/*.{md,svx}`, {
	eager: true
});

export const load: PageLoad = async ({ data, params }) => {
	try {
		const fullPath = Object.keys(contentFiles).find((path) => path.endsWith(`/${data.filename}`));

		const pageTags = definePageMetaTags({
			title: data.title,
			keywords: data.tags,
			description: data.description
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
