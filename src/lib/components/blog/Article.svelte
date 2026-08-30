<script lang="ts">
	let {
		children
	}: {
		children: import('svelte').Snippet;
	} = $props();
</script>

<article
	class="prose w-full max-w-4xl px-5
		py-8 prose-zinc sm:px-8 sm:py-10

		prose-headings:scroll-mt-6
		prose-headings:font-black
		prose-headings:tracking-tight
		prose-headings:text-black

		prose-h1:text-4xl
		prose-h1:leading-tight
		prose-h2:border-b-2
		prose-h2:border-black
		prose-h2:pb-2

		prose-p:leading-7
		prose-p:text-zinc-800

		prose-a:font-bold
		prose-a:text-blue-600
		prose-a:underline
		prose-a:decoration-2
		prose-a:underline-offset-4

		prose-blockquote:border-black
		prose-blockquote:bg-zinc-200

		prose-blockquote:px-5
		prose-blockquote:py-1

		prose-blockquote:text-zinc-800
		prose-strong:font-black
		prose-strong:text-black
		prose-pre:rounded-xl
		prose-pre:border

		prose-pre:border-[#3d3f4a]
		prose-pre:shadow-[4px_4px_0_0_#000]
		prose-li:text-zinc-800
		prose-li:marker:text-accent

		prose-img:rounded-xl
		prose-img:border-2
		prose-img:border-black
		prose-img:shadow-[4px_4px_0_0_#000]

		prose-hr:border-black"
>
	{@render children()}
</article>

<style lang="postcss">
	@reference '../../../app.css';

	:global :not(pre) :where(code):not(:where([class~='not-prose'], [class~='not-prose'] *)) {
		@apply rounded-md border border-[#3d3f4a] bg-[#2d2f3a] px-1.5 py-0.5 font-mono text-[0.9em] font-medium text-[#f8f8f2];

		&::before,
		&::after {
			@apply appearance-none content-none;
		}
	}

	:global
		:where(h1, h2, h3, h4, h5, h6, th):not(:where([class~='not-prose'], [class~='not-prose'] *)) {
		a {
			@apply relative fill-(--tw-prose-headings) text-(--tw-prose-headings) no-underline decoration-0 transition-opacity;

			&::after {
				@apply absolute right-full my-auto mr-1.5 aspect-square h-lh bg-(--tw-prose-headings) opacity-0 transition-opacity duration-150 content-[""];

				--svg: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 256 256'%3E%3Cpath d='M117.18 188.74a12 12 0 0 1 0 17l-5.12 5.12A58.26 58.26 0 0 1 70.6 228a58.62 58.62 0 0 1-41.46-100.08l34.75-34.75a58.64 58.64 0 0 1 98.56 28.11a12 12 0 1 1-23.37 5.44a34.65 34.65 0 0 0-58.22-16.58l-34.75 34.75A34.62 34.62 0 0 0 70.57 204a34.4 34.4 0 0 0 24.49-10.14l5.11-5.12a12 12 0 0 1 17.01 0M226.83 45.17a58.65 58.65 0 0 0-82.93 0l-5.11 5.11a12 12 0 0 0 17 17l5.12-5.12a34.63 34.63 0 1 1 49 49l-34.81 34.7A34.4 34.4 0 0 1 150.61 156a34.63 34.63 0 0 1-33.69-26.72a12 12 0 0 0-23.38 5.44A58.64 58.64 0 0 0 150.56 180h.05a58.28 58.28 0 0 0 41.47-17.17l34.75-34.75a58.62 58.62 0 0 0 0-82.91'/%3E%3C/svg%3E");

				-webkit-mask: var(--svg) no-repeat center;
				mask: var(--svg) no-repeat center;
				mask-size: contain;
			}
		}

		&:hover a {
			@apply underline decoration-2 underline-offset-4;

			&::after {
				@apply opacity-100;
			}
		}
	}

	:global .shiki {
		@apply relative overflow-hidden rounded-xl border-2 border-[#3d3f4a] p-2 shadow-[4px_4px_0_0_#000];

		counter-reset: step;
		counter-increment: step 0;

		&.has-focused {
			.line:not(.focused) {
				@apply blur-xs transition-[filter] duration-200;
			}

			&:hover .line:not(.focused) {
				@apply blur-none;
			}
		}

		&:has(.filename) {
			@apply pt-10;
		}

		.filename {
			@apply absolute inset-x-0 top-0 z-10 flex h-10 items-center gap-2 border-b border-zinc-600 bg-zinc-500/20 px-3 font-inter text-lg font-bold backdrop-blur-sm;

			p {
				@apply m-0 flex items-center leading-none;
			}

			img {
				@apply size-6 flex-none;
			}
		}

		code {
			@apply scrollbar-none block overflow-x-auto;
		}

		.line {
			@apply border-l-4 border-transparent font-mono transition-all duration-200;

			&::before {
				counter-increment: step;

				@apply mr-6 inline-block w-4 border-transparent text-right text-neutral-600 content-[counter(step)] select-none;
			}

			&.highlighted {
				@apply -ml-2 inline-block w-[calc(100%+(--spacing(4)))] border-neutral-500 bg-neutral-600/20 pl-2;
			}

			&.diff {
				@apply -ml-2 inline-block w-[calc(100%+(--spacing(4)))] pl-2;

				&.add,
				&.remove {
					span:first-child::before {
						@apply -ml-4 inline-flex w-4;
					}
				}

				&.add {
					@apply border-green-500 bg-green-500/20;

					span:first-child::before {
						@apply text-green-500 content-["+"];
					}

					&::before {
						@apply text-green-500;
					}
				}

				&.remove {
					@apply border-red-500 bg-red-500/20 opacity-70 *:text-neutral-400!;

					span:first-child::before {
						@apply text-red-500 content-["-"];
					}

					&::before {
						@apply text-red-500;
					}
				}
			}
		}
	}

	:global .toc {
		@apply my-8 w-full rounded-xl border-2 border-black bg-white p-5 text-black shadow-[5px_5px_0_0_#000];

		ol {
			@apply ml-5 list-decimal space-y-2 text-base font-semibold;
		}

		li {
			a {
				@apply font-semibold no-underline underline-offset-2;

				&:hover {
					@apply text-accent;
				}
			}
		}
	}
</style>
