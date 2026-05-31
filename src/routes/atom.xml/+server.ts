import { BASE_URL } from '$lib';
import { objectToXML } from '$lib/objectToXML';
import { getPosts } from '$lib/posts';
import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async () => {
	const posts = await getPosts();

	const updated = posts[0]?.updatedAt
		? new Date(posts[0].updatedAt).toISOString()
		: new Date().toISOString();

	const entries = posts.map((p) => {
		const entry = objectToXML({
			title: p.title,
			id: `${BASE_URL}/blog/${p.slug}`,
			updated: new Date(p.updatedAt).toISOString(),
			published: new Date(p.createdAt).toISOString(),
			summary: p.description,
			link: {
				href: `${BASE_URL}/blog/${p.slug}`
			}
		});

		const categories = p.tags.map((tag) => `<category term="${tag}" />`).join('\n');

		return `<entry>${entry}${categories}</entry>`;
	});

	const feed = objectToXML({
		title: 'Luís Otávio',
		id: BASE_URL,
		updated,
		link: {
			href: `${BASE_URL}/atom.xml`,
			rel: 'self'
		}
	});

	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
${feed}
${entries.join('\n')}
</feed>`;

	return new Response(xml, {
		headers: {
			'Content-Type': 'application/atom+xml'
		}
	});
};

export const prerender = true;
