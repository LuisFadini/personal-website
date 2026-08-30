<script lang="ts">
	import type { Snippet } from 'svelte';
	import { twMerge } from 'tailwind-merge';

	type Props = {
		as?: keyof HTMLElementTagNameMap;
		children?: Snippet;

		borderWidth?: number;
		borderColor?: string;

		shadowSize?: number;
		shadowColor?: string;

		class?: string;
		[key: string]: unknown;
	};

	const voidElements = new Set(['hr', 'img']);

	let {
		as = 'div',
		children,

		borderWidth = 2,
		borderColor = '#000',

		shadowSize = 4,
		shadowColor = '#000',

		class: className,
		...rest
	}: Props = $props();

	const classes = $derived(
		twMerge(
			'rounded-xl [border-width:var(--border-width)] [border-color:var(--border-color)] [box-shadow:var(--shadow-size)_var(--shadow-size)_0_0_var(--shadow-color)]',
			className
		)
	);

	const style = $derived(`
		--border-width: ${borderWidth}px;
		--border-color: ${borderColor};
		--shadow-size: ${shadowSize}px;
		--shadow-color: ${shadowColor};
	`);
</script>

{#if voidElements.has(as)}
	<svelte:element this={as} {...rest} class={classes} {style} />
{:else}
	<svelte:element this={as} {...rest} class={classes} {style}>
		{@render children?.()}
	</svelte:element>
{/if}
