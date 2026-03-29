import { defineBaseMetaTags } from 'svelte-meta-tags';
import favicon from '$lib/assets/favicon.svg';

export const load = ({ url }) => {
	const currentUrl = new URL(url.pathname, url.origin).href;

	const baseTags = defineBaseMetaTags({
		title: 'Luís Otávio',
		titleTemplate: url.pathname === '/' ? '%s' : '%s | Luís Otávio',
		canonical: currentUrl,

		additionalLinkTags: [
			{
				rel: 'icon',
				href: favicon
			},
			{
				rel: 'alternate',
				type: 'application/rss+xml',
				href: '/rss.xml',
				title: 'Blog posts'
			},
			{
				rel: 'alternate',
				type: 'application/atom+xml',
				href: '/atom.xml',
				title: 'Blog posts'
			},
			{
				rel: 'alternate',
				type: 'application/feed+json',
				href: '/feed.json',
				title: 'Blog posts'
			}
		],

		additionalMetaTags: [
			{
				name: 'author',
				content: 'Luís Otávio'
			},
			{
				name: 'theme-color',
				content: '#4ea0c1'
			}
		],

		twitter: {
			cardType: 'summary',
			title: 'Luís Otávio'
		},

		openGraph: {
			type: 'website',
			url: currentUrl,
			locale: 'pt_BR',
			title: 'Luís Otávio',
			siteName: 'Luís Otávio'
		}
	});

	return { ...baseTags };
};
