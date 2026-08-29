<script lang="ts">
	type Props = {
		text: string
	}

	const { text }: Props = $props();
</script>

<header class="w-full flex flex-col items-center md:border-b-2 border-black py-2 md:bg-zinc-100">
	<h1 class="text-4xl md:text-2xl font-bold">{text}</h1>
	<hr class="md:hidden h-2 bg-neutral-400 border-2 border-black w-2/3 rounded-full" />
</header>
