<script lang="ts">
	type Props = {
		text: string;
	};

	const { text }: Props = $props();
</script>

<header class="flex w-full flex-col items-center border-black py-2 md:border-b-2 md:bg-zinc-100">
	<h1 class="text-4xl font-bold md:text-2xl">{text}</h1>
	<hr class="h-2 w-2/3 rounded-full border-2 border-black bg-neutral-400 md:hidden" />
</header>
