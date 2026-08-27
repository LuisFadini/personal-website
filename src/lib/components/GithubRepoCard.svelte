<script lang="ts">
	import { onMount } from 'svelte';
	import Icon from "@iconify/svelte"

	let { githubRepoUrl }: { githubRepoUrl: string } = $props();

	let repoData = $state<{
		description: string | null;
		name: string;
		full_name: string;
		stargazers_count: number | string;
		forks_count: number | string;
		owner: { avatar_url: string };
	} | null>(null);

	let error = $state<string | null>(null);

	function extractRepoPath(url: string): string | null {
		try {
			const u = new URL(url);
			return u.pathname.replace(/^\/+|\/+$/g, '');
		} catch {
			return null;
		}
	}

	const repoPath = extractRepoPath(githubRepoUrl);

	onMount(async () => {
		if (!repoPath) {
			error = 'URL do GitHub invalida';
			return;
		}

		try {
			const res = await fetch(`https://api.github.com/repos/${repoPath}`);
			if (!res.ok) throw new Error('Failed to fetch repo info');
			repoData = await res.json();
		} catch (err) {
			error = err instanceof Error ? err.message : 'Erro desconhecido';
		}
	});
</script>

{#if !repoData}
	<a
		href={githubRepoUrl}
		target="_blank"
		rel="external noopener noreferrer"
		title={error ? `Erro carregando repositório: ${error}` : 'Carregando dados do GitHub...'}
		class="
			mx-2 inline-flex w-full max-w-[min(70ch,100%)] animate-pulse items-center
			gap-3 rounded-lg border border-zinc-600 bg-zinc-800/20 px-3
			py-2 shadow-md shadow-black/20 md:mx-0 md:w-3/4
		"
	>
		<div class="h-16 w-16 shrink-0 rounded-md bg-zinc-700"></div>

		<div class="flex min-w-0 flex-1 flex-col gap-2">
			<div class="h-5 w-1/2 rounded bg-zinc-700"></div>
			<div class="h-4 w-full rounded bg-zinc-700"></div>
			<div class="h-4 w-3/4 rounded bg-zinc-700"></div>

			<div class="mt-1 flex gap-4">
				<div class="h-4 w-10 rounded bg-zinc-700"></div>
				<div class="h-4 w-10 rounded bg-zinc-700"></div>
			</div>
		</div>
	</a>
{:else}
	<a
		href={githubRepoUrl}
		target="_blank"
		rel="external noopener noreferrer"
		class="
			mx-2 inline-flex w-full max-w-[min(70ch,100%)] items-center
			gap-3 rounded-lg border border-zinc-600 bg-zinc-800/20
			px-3 py-2 shadow-md shadow-black/20
			transition-all duration-150 hover:bg-zinc-700/30 hover:shadow-none md:mx-0 md:w-3/4
		"
	>
		<img
			src={repoData.owner.avatar_url}
			alt="repo avatar"
			class="h-16 w-16 shrink-0 rounded-md object-cover"
			loading="lazy"
		/>

		<div class="flex min-w-0 flex-col gap-1">
			<h3 class="text-lg leading-tight font-semibold text-text">
				{repoData.full_name}
			</h3>

			<p class="line-clamp-2 max-w-[48ch] text-base leading-snug text-wrap text-zinc-300">
				{#if repoData.description}
					{repoData.description}
				{:else}
					<span class="text-zinc-500 italic">Sem descrição</span>
				{/if}
			</p>

			<div class="mt-1 flex items-center gap-4 text-sm text-zinc-400">
				<div class="flex items-center gap-1">
					<Icon icon="ph:star-fill" height={14} />
					<span class="leading-none">{repoData.stargazers_count}</span>
				</div>

				<div class="flex items-center gap-1">
					<Icon icon="ph:git-fork" height={14} />
					<span class="leading-none">{repoData.forks_count}</span>
				</div>
			</div>
		</div>
	</a>
{/if}
