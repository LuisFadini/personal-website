import { BASE_URL } from '$lib';
import { getPosts } from '$lib/posts';
import type { ContentModule } from '$lib/types';
import type { RequestHandler } from '@sveltejs/kit';

const modules = import.meta.glob<ContentModule>('/src/content/*.{md,svx}', {
	eager: true,
	query: '?raw'
});

const cleanMarkdown = (src: string) =>
	src
		.replace(/^---[\s\S]*?---/, '')
		.replace(/<script[\s\S]*?<\/script>/g, '')
		.replace(/```(\w+)[^\n]*/g, '```$1')
		.replace(/<[^>\n]+>/g, '')
		.replace(/\n{3,}/g, '\n\n')
		.trim();

export const GET: RequestHandler = async () => {
	const posts = await getPosts();

	const items = posts.map((p) => {
		const raw = Object.entries(modules).find(([path]) => path.endsWith(`/${p.filename}`));

		if (!raw) {
			throw new Error(`Post not found: ${p.filename}`);
		}

		const url = `${BASE_URL}/blog/${p.slug}`;

		return {
			id: url,
			url,
			title: p.title,
			summary: p.description,
			date_published: new Date(p.createdAt).toISOString(),
			date_modified: new Date(p.updatedAt).toISOString(),
			tags: p.tags,
			content_text: cleanMarkdown(raw[1].default as string)
		};
	});

	const feed = {
		version: 'https://jsonfeed.org/version/1',
		title: 'Luís Otávio',
		home_page_url: BASE_URL,
		feed_url: `${BASE_URL}/feed.json`,
		description: 'Posts sobre tecnologia, programação e projetos pessoais.',
		language: 'pt-BR',
		items
	};

	return new Response(JSON.stringify(feed), {
		headers: {
			'Content-Type': 'application/feed+json'
		}
	});
};

export const prerender = true;
