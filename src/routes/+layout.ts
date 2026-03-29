import { defineBaseMetaTags } from 'svelte-meta-tags';
import favicon from '$lib/assets/favicon.svg';

export const load = ({ url }) => {
	const baseTags = defineBaseMetaTags({
		title: 'Luís Otávio',
		titleTemplate: url.pathname === '/' ? '%s' : '%s | Luís Otávio',
		canonical: new URL(url.pathname, url.origin).href,

		additionalLinkTags: [
			{
				rel: 'icon',
				href: favicon
			}
		],

		additionalMetaTags: [
			{
				name: 'author',
				content: 'Luís Otávio'
			}
		]
	});

	return { ...baseTags };
};
