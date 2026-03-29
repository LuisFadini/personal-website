<script>
	import ContentHeader from '$lib/components/ContentHeader.svelte';
	import Sidebar from '$lib/components/sidebar/Sidebar.svelte';
</script>

<div class="flex flex-col md:h-screen md:flex-row">
	<Sidebar />

	<main
		class="flex h-full w-full flex-col items-center md:min-h-0 md:w-2/3 md:overflow-auto lg:w-4/5"
	>
		<ContentHeader text="Sobre mim" />
		<div
			class="inline-code headings-hide-autolink prose max-w-full px-6 py-4
            prose-invert lg:w-2/3
            prose-headings:scroll-m-4 prose-p:leading-relaxed
            prose-ul:list-outside prose-ul:marker:text-accent
            prose-li:text-[--tw-prose-invert-body]
            prose-img:mx-auto prose-img:rounded-2xl
            prose-hr:mx-5 prose-hr:my-7 prose-hr:h-0.5 prose-hr:rounded-full prose-hr:border-0 prose-hr:bg-text"
		>
			<p>
				Olá! Bem-vindo ao meu espaço na internet. Meu nome é Luís Otávio e atualmente estudo
				Informática para a Internet no IFES-ST. Lá tive meu primeiro contato com lógica de
				programação e banco de dados, mas minha história com tecnologia começou bem antes.
			</p>
			<p>
				Em 2021 ganhei meu primeiro computador. Antes eu usava um notebook de 2008 (que basicamente
				tinha minha idade). Comecei a me interessar por fazer o computador obedecer minhas ideias,
				não só com teclado e mouse, mas sim automatizando coisas. Tentei criar bots pro Discord sem
				saber programar e, obviamente, deu errado. Aí resolvi fazer o curso de JavaScript do Curso
				em Vídeo, que até hoje é o único curso de programação que fiz.
			</p>
			<p>
				Quase tudo que sei hoje foi self-taught: HTML e CSS aprendi junto com JS, depois veio
				Typescript, React, Tailwind, SolidJS, Arduino, KiCad, e mais recentemente Rust, que comecei
				a estudar no Advent of Code 2024. Agora, pra fazer esse site, estou aprendendo Svelte e
				tentando escrever melhor pra explicar minhas ideias.
			</p>
			<p>
				Em 2022 entrei no projeto de robótica da escola, focado na OBR. Trabalhei com Arduino e com
				o simulador sBotics. Na equipe Protótipo Alfa, não fomos muito bem presencialmente, mas no
				simulador eu fiz toda a programação e até uma extensão pro VS Code. No fim, fomos campeões
				nacionais na simulação nível 1. Também fiz a prova do IFES como treineiro e participei da
				ONEE, onde ganhei medalha de ouro.
			</p>
			<p>
				Em 2023 fizemos um robô melhorado, mas tivemos problemas com as baterias durante a
				competição. Mesmo assim, ficamos entre os finalistas do nacional na simulação nível 2. Nesse
				ano fiz a prova do IFES pra valer, fiquei como suplente e fui chamado em janeiro — fiquei
				muito feliz.
			</p>
			<p>
				Em 2024, já no IFES, criamos a Equipe Nautilus para fazer um robô para a OBR. Na feira de
				ciências fiz um site que resolve funções matemáticas. Também comecei um homelab com Proxmox
				num PC antigo (assunto pra postar no blog depois).
			</p>
			<p>
				Agora em 2025 não deu tempo de finalizar o robô para a OBR, então estamos iniciando um
				projeto de robô voltado pra competições regionais, pensado pra ser fácil de montar e
				programar. Na feira de ciências desenvolvemos um piso gerador de energia e ganhamos como
				melhor projeto dos segundos anos. Ainda vou escrever sobre isso e liberar tudo como open
				source no blog.
			</p>
		</div>
	</main>
</div>
