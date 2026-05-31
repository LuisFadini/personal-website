<script lang="ts">
	import { resolve } from '$app/paths';
	import photo from '$lib/assets/personal-photo.png?enhanced';
	import { navigationLinks } from '$lib/navigationLinks';
	import { socials } from '$lib/socials';
	import SocialIcon from './SocialIcon.svelte';
</script>

<aside
	class="
    h-full w-full overflow-y-auto border-b-2
    border-zinc-700 bg-zinc-900 p-6 md:w-1/3
    md:border-r-2 md:border-b-0 lg:w-1/5"
>
	<div class="flex w-full flex-col items-center gap-3">
		<enhanced:img
			src={photo}
			alt="Profile"
			class="w-40 rounded-full border border-zinc-700 shadow-xl ring-2 shadow-black/30 ring-zinc-800 md:w-48"
			fetchpriority="high"
		/>

		<div class="w-full px-3 text-start">
			<h1 class="text-3xl font-bold tracking-tight text-white">Luís Otávio</h1>

			<h2 class="mt-1 text-lg font-medium text-zinc-400">Backend developer & tinkerer</h2>
		</div>
	</div>

	<p class="mx-auto mt-5 max-w-[95%] text-justify text-base leading-relaxed text-zinc-300">
		Olá, sou um estudante do IFES-ST e desenvolvedor backend. Também gosto de trabalhar com
		hardware, como Arduino ou SBCs. Tenho experiência com diversas linguagens, com foco em
		<a
			href="https://www.typescriptlang.org/"
			target="_blank"
			rel="external noopener noreferrer"
			class="font-bold text-blue-400 transition hover:text-blue-600">Typescript</a
		>
		e
		<a
			href="https://rust-lang.org/"
			target="_blank"
			rel="external noopener noreferrer"
			class="font-bold text-orange-500 transition hover:text-orange-700">Rust</a
		>.
	</p>

	<ul class="mt-6 flex flex-col gap-2 font-semibold">
		{#each navigationLinks as link (link.href)}
			<li>
				<a
					href={resolve(link.href)}
					class="flex items-center gap-2 text-lg text-zinc-300 underline-offset-2
               transition hover:text-accent hover:underline"
				>
					<iconify-icon icon={link.icon} height="18px"></iconify-icon>
					{link.label}
				</a>
			</li>
		{/each}
	</ul>
	<ul class="mt-4 flex flex-row gap-3">
		{#each socials as social (social.href)}
			<SocialIcon {...social} />
		{/each}
	</ul>
</aside>
