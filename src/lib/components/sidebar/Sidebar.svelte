<script lang="ts">
	import { resolve } from '$app/paths';
	import photo from '$lib/assets/personal-photo.png?enhanced';
	import { navigationLinks } from '$lib/navigationLinks';
	import Icon from '@iconify/svelte';
	import { twMerge } from 'tailwind-merge';

	const socials = [
		{
			href: 'https://github.com/LuisFadini',
			icon: 'ph:github-logo-duotone',
			label: 'github',
			color: 'text-black'
		},
		{
			href: 'https://linkedin.com/in/luis-otavio-sperandio-fadini',
			icon: 'ph:linkedin-logo-duotone',
			label: 'linkedin',
			color: 'text-blue-600'
		},
		{
			href: 'https://monkeytype.com/profile/LuisFadini',
			icon: 'ph:keyboard-duotone',
			label: 'monkeytype',
			color: 'text-yellow-500'
		}
	];
</script>

<aside
	class="
    h-full w-full overflow-y-auto border-b-2 border-black
    bg-zinc-200 p-6 md:w-1/3
    md:border-r-2 md:border-b-0 lg:w-1/5"
>
	<div class="flex w-full flex-col items-center gap-3">
		<enhanced:img
			src={photo}
			alt="Profile"
			class="w-40 rounded-full border-2 border-black shadow-[4px_4px_0_0_#000] md:w-48"
			fetchpriority="high"
		/>

		<div class="w-full px-3 text-start">
			<h1 class="text-3xl font-bold tracking-tight text-black">Luís Otávio</h1>

			<h2 class="mt-1 text-lg font-medium text-zinc-600">Backend developer</h2>
		</div>
	</div>

	<p class="mx-auto mt-5 max-w-[95%] text-justify text-base leading-relaxed text-black">
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
					class="flex items-center gap-2 text-lg text-zinc-700 underline-offset-2
               transition hover:text-blue-400 hover:underline"
				>
					<Icon icon={link.icon} height="18px" />
					{link.label}
				</a>
			</li>
		{/each}
	</ul>
	<ul class="mt-4 flex flex-row gap-3">
		{#each socials as social (social.href)}
			<!-- eslint-disable svelte/no-navigation-without-resolve -->
			<a
				href={social.href}
				rel="external noopener noreferrer"
				target="_blank"
				class={twMerge(
					'rounded-xl border border-black bg-white p-2 text-3xl shadow-[2px_2px_0_0_#000] transition-all hover:translate-0.5 hover:shadow-none',
					social.color
				)}
				aria-label={social.label}
			>
				<Icon icon={social.icon} />
			</a>
			<!-- eslint-enable svelte/no-navigation-without-resolve -->
		{/each}
	</ul>
</aside>
