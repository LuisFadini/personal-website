<script lang="ts">
	let { children } = $props();
</script>

<div class="not-prose mx-auto flex w-full justify-center">
	{#if children}
		{@render children()}
	{:else}
		<p class="text-red-600">Insira conteúdo aqui</p>
	{/if}
</div>
