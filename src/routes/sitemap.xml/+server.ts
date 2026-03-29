import { BASE_URL } from '$lib';
import { objectToXML } from '$lib/objectToXML';
import { getPosts } from '$lib/posts';
import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async () => {
	const posts = await getPosts();

	const entries = [
		{
			loc: `${BASE_URL}/`,
			lastmod: '2025-11-15T18:55:00.000Z',
			priority: '1.0'
		},
		{
			loc: `${BASE_URL}/sobre-mim`,
			lastmod: '2025-11-15T18:55:00.000Z',
			priority: '0.6'
		},
		...posts.map((p) => {
			return { loc: `${BASE_URL}/blog/${p.slug}`, lastmod: p.updatedAt };
		})
	];

	const xmlEntries = entries.map((entry) => `<url>${objectToXML(entry)}</url>`);

	const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${xmlEntries.join('\n')}
</urlset>`;

	return new Response(sitemap, {
		headers: {
			'Content-Type': 'application/xml'
		}
	});
};

export const prerender = true;
