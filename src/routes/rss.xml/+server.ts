import { objectToXML } from '$lib/objectToXML';
import { getPosts } from '$lib/posts';
import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async () => {
	const posts = await getPosts();

	const items = posts.map((p) => ({
		title: p.title,
		description: p.description,
		link: `https://luisfadini.com/blog/${p.slug}`,
		guid: { children: `https://luisfadini.com/blog/${p.slug}`, isPermaLink: true },
		pubDate: new Date(p.updatedAt).toUTCString()
	}));

	const xmlItems = items.map((item) => `<item>${objectToXML(item)}</item>`);

	const lastBuildDate = posts[0]?.updatedAt
		? new Date(posts[0].updatedAt).toUTCString()
		: new Date().toUTCString();

	const channel = objectToXML({
		title: 'Luís Otávio',
		link: `https://luisfadini.com`,
		description: 'Posts sobre tecnologia, programação e projetos pessoais.',
		language: 'pt-BR',
    ttl: 180,
		lastBuildDate
	});

	const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
<channel>
${channel}
${xmlItems.join('\n')}
</channel>
</rss>`;

	return new Response(rss, {
		headers: {
			'Content-Type': 'application/rss+xml'
		}
	});
};

export const prerender = true;
