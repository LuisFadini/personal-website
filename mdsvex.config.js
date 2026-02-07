import { escapeSvelte } from 'mdsvex';
import { createHighlighter } from 'shiki';
import { transformerColorizedBrackets } from '@shikijs/colorized-brackets';
import {
	transformerNotationDiff,
	transformerNotationHighlight,
	transformerNotationFocus,
	transformerNotationErrorLevel,
	transformerRenderIndentGuides,
	transformerRemoveNotationEscape
} from '@shikijs/transformers';
import { h } from 'hastscript';
import rehypeExternalLinks from 'rehype-external-links';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeSlug from 'rehype-slug';
import rehypeToc from '@jsdevtools/rehype-toc';

const highlighter = await createHighlighter({
	themes: ['dracula'],
	langs: [
		'javascript',
		'typescript',
		'css',
		'svelte',
		'html',
		'html',
		'rust',
		'json',
		'dockerfile',
		'yaml',
		'terraform',
		'bash',
		'properties',
		{
			name: 'Ignore',
			scopeName: 'source.ignore',
			aliases: ['gitignore'],
			patterns: [
				{
					match: '^#.*',
					name: 'comment.line.number-sign.ignore'
				}
			]
		}
	]
});

function pushNode(node, filename, iconSelector) {
	const icon = h('iconify-icon', { height: '28px', width: '28px', icon: iconSelector }, '');
	const file = h('p', {}, [filename]);
	const span = h('span', { class: 'filename' }, [icon, file]);
	node.children.push(span);
}

export const addFilename = (meta) => {
	return {
		name: 'shiki-transformer-add-filename',
		pre(node) {
			if (!meta) return;

			const match = meta.match(/title="([^"]*)"/i);
			const filename = match ? match[1] : null;
			if (!filename) return;

			const lower = filename.toLowerCase();

			const exactMap = {
				'docker-compose.yaml': 'material-icon-theme:docker',
				'docker-compose.yml': 'material-icon-theme:docker',
				dockerfile: 'material-icon-theme:docker',
				'package.json': 'material-icon-theme:nodejs',
				'eslint.config.js': 'material-icon-theme:eslint',
				'vite.config.js': 'material-icon-theme:vite',
				'vite.config.ts': 'material-icon-theme:vite',
				'svelte.config.js': 'material-icon-theme:svelte',
				'tailwind.config.js': 'material-icon-theme:tailwindcss',
				'tailwind.config.ts': 'material-icon-theme:tailwindcss',
				'pnpm-lock.yaml': 'material-icon-theme:pnpm',
				'pnpm-workspace.yaml': 'material-icon-theme:pnpm'
			};

			if (exactMap[lower]) {
				return pushNode(node, filename, exactMap[lower]);
			}

			const patternMap = [
				[/\.stories\.(js|jsx|ts|tsx|svelte)$/i, 'material-icon-theme:storybook'],
				[/\.test\.(js|jsx|ts|tsx)$/i, 'material-icon-theme:test-ts'],
				[/\.spec\.(js|jsx|ts|tsx)$/i, 'material-icon-theme:test-ts'],
				[/\.config\.(js|ts)$/i, 'material-icon-theme:settings'],
				[/\.d\.ts$/i, 'material-icon-theme:typescript-def']
			];

			for (const [regex, icon] of patternMap) {
				if (regex.test(lower)) {
					return pushNode(node, filename, icon);
				}
			}

			const ext = lower.split('.').pop();

			const iconMap = {
				gitignore: 'material-icon-theme:git',
				prettierignore: 'material-icon-theme:prettier',
				prettierrc: 'material-icon-theme:prettier',
				js: 'material-icon-theme:javascript',
				ts: 'material-icon-theme:typescript',
				svelte: 'material-icon-theme:svelte',
				jsx: 'material-icon-theme:react',
				tsx: 'material-icon-theme:react-ts',
				json: 'material-icon-theme:json',
				html: 'material-icon-theme:html',
				css: 'material-icon-theme:css',
				md: 'material-icon-theme:markdown',
				svx: 'material-icon-theme:mdsvex',
				rs: 'material-icon-theme:rust',
				sh: 'material-icon-theme:powershell',
				yml: 'material-icon-theme:yaml',
				yaml: 'material-icon-theme:yaml'
			};

			const iconClass = iconMap[ext] || 'material-icon-theme:document';

			return pushNode(node, filename, iconClass);
		}
	};
};

/** @type {import('mdsvex').MdsvexOptions} */
const mdsvexConfig = {
	extensions: ['.svx', '.md'],
	highlight: {
		highlighter: async (code, lang = 'text', meta) => {
			const html = escapeSvelte(
				highlighter.codeToHtml(code, {
					lang,
					theme: 'dracula',
					transformers: [
						addFilename(meta),
						{
							pre(node) {
								this.addClassToHast(node, 'not-prose');
								if (meta && meta.includes('line-numbers'))
									this.addClassToHast(node, 'line-numbers');
							}
						},
						transformerRemoveNotationEscape(),
						transformerColorizedBrackets(),
						transformerNotationDiff({ matchAlgorithm: 'v3' }),
						transformerNotationHighlight({ matchAlgorithm: 'v3' }),
						transformerNotationFocus({ matchAlgorithm: 'v3' }),
						transformerNotationErrorLevel({ matchAlgorithm: 'v3' }),
						transformerRenderIndentGuides()
					]
				})
			);
			return `{@html \`${html}\` }`;
		}
	},
	rehypePlugins: [
		[rehypeExternalLinks, { target: '_blank', rel: ['noopener', 'noreferrer'] }],
		rehypeSlug,
		[rehypeAutolinkHeadings, { behavior: 'wrap' }],
		[
			rehypeToc,
			{
				cssClasses: {
					toc: 'toc not-prose'
				}
			}
		]
	]
};

export default mdsvexConfig;
