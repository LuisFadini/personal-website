<script lang="ts">
	import Icon from '@iconify/svelte';
	import Bordered from '$lib/components/Bordered.svelte';

	type Props = {
		githubRepoUrl: string;
	};

	type Repository = {
		name: string;
		full_name: string;
		description: string | null;
		stargazers_count: number;
		forks_count: number;
		owner: {
			avatar_url: string;
		};
	};

	let { githubRepoUrl }: Props = $props();

	let repoData = $state<Repository | null>(null);
	let loading = $state(true);
	let error = $state(false);

	const repoPath = $derived(extractRepoPath(githubRepoUrl));

	function extractRepoPath(url: string): string | null {
		try {
			const parsed = new URL(url);

			if (parsed.hostname !== 'github.com') {
				return null;
			}

			const path = parsed.pathname.replace(/^\/|\/$/g, '');

			return path.split('/').length === 2 ? path : null;
		} catch {
			return null;
		}
	}

	async function fetchRepository(path: string) {
		loading = true;
		error = false;
		repoData = null;

		try {
			const response = await fetch(`https://api.github.com/repos/${path}`);

			if (!response.ok) {
				throw new Error(`GitHub API returned ${response.status}`);
			}

			repoData = (await response.json()) as Repository;
		} catch {
			error = true;
		} finally {
			loading = false;
		}
	}

	$effect(() => {
		if (repoPath) {
			fetchRepository(repoPath);
		} else {
			loading = false;
			error = true;
		}
	});
</script>

<Bordered
	as="a"
	href={githubRepoUrl}
	target="_blank"
	rel="external noopener noreferrer"
	aria-busy={loading}
	aria-label={loading
		? 'Carregando informações do repositório'
		: error
			? 'Não foi possível carregar o repositório'
			: `Abrir repositório ${repoData?.full_name}`}
	class="
		mx-2 my-4 flex w-full max-w-[70ch] items-center gap-3
		bg-white p-3
		transition-all
		hover:translate-1
		hover:shadow-none
		md:mx-0 md:w-3/4
	"
	shadowSize={4}
>
	{#if loading}
		<div class="h-16 w-16 shrink-0 animate-pulse rounded-lg bg-zinc-200" aria-hidden="true"></div>

		<div class="flex min-w-0 flex-1 flex-col gap-2" aria-hidden="true">
			<div class="h-5 w-1/2 animate-pulse rounded bg-zinc-200"></div>
			<div class="h-4 w-full animate-pulse rounded bg-zinc-200"></div>

			<div class="mt-1 flex gap-4">
				<div class="h-4 w-10 animate-pulse rounded bg-zinc-200"></div>
				<div class="h-4 w-10 animate-pulse rounded bg-zinc-200"></div>
			</div>
		</div>
	{:else if error || !repoData}
		<div class="flex min-w-0 flex-1 items-center gap-3">
			<Icon icon="ph:github-logo-bold" width="40" height="40" class="shrink-0" aria-hidden="true" />

			<div class="min-w-0">
				<h3 class="font-bold text-black">Repositório no GitHub</h3>

				<p class="text-sm text-zinc-600">Não foi possível carregar as informações.</p>
			</div>
		</div>
	{:else}
		<img
			src={repoData.owner.avatar_url}
			alt=""
			class="h-16 w-16 shrink-0 rounded-lg border-2 border-black object-cover"
			loading="lazy"
		/>

		<div class="min-w-0">
			<h3 class="truncate text-lg leading-tight font-black text-black">
				{repoData.full_name}
			</h3>

			<p class="line-clamp-2 max-w-[48ch] text-base leading-snug text-zinc-700">
				{#if repoData.description}
					{repoData.description}
				{:else}
					<span class="text-zinc-500 italic">Sem descrição</span>
				{/if}
			</p>

			<div class="mt-2 flex items-center gap-4 text-sm font-semibold text-zinc-600">
				<span class="flex items-center gap-1">
					<Icon icon="ph:star-fill" height={14} aria-hidden="true" />
					{repoData.stargazers_count}
				</span>

				<span class="flex items-center gap-1">
					<Icon icon="ph:git-fork" height={14} aria-hidden="true" />
					{repoData.forks_count}
				</span>
			</div>
		</div>
	{/if}
</Bordered>
