<script lang="ts">
	import type { SocialLink } from '$lib/socials';
	import Icon from "@iconify/svelte"

	const { icon, color, href: url, label }: SocialLink = $props();
</script>

<a
	href={url}
	class={`block h-12 w-12 rounded-4xl bg-white/10 p-2 ${color ? color : 'text-zinc-50'} cursor-pointer shadow-xl shadow-black/30 transition-all duration-250 hover:scale-110 hover:rounded-xl hover:bg-accent/10  hover:shadow-none`}
	rel="external noopener noreferrer"
	target="_blank"
	aria-label={label}
>
	<Icon width="100%" {icon} />
</a>
