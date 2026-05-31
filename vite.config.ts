import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { enhancedImages } from '@sveltejs/enhanced-img';
import { defineConfig } from 'vite';
import postcssNested from 'postcss-nested';

export default defineConfig({
	css: {
		transformer: 'postcss',
		postcss: {
			plugins: [postcssNested]
		}
	},
	plugins: [tailwindcss({ optimize: true }), enhancedImages(), sveltekit()]
});
