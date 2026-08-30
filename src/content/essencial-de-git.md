---
title: O essencial de Git
slug: essencial-de-git
description: O que eu uso e o que você, como iniciante ou não em programação, precisa saber para trabalhar com Git no dia a dia.
tags:
  - desenvolvimento
  - git
imgSrc: /content/essencial-git.png
updatedAt: '2026-02-05T01:20:00.000Z'
createdAt: '2026-02-07T19:05:00.000Z'
---

Para começar, já aviso que este não é um artigo tão técnico sobre Git. Se quiser algo mais aprofundado, recomendo o vídeo do Fabio Akita, [Entendendo GIT | (não é um tutorial!)](https://youtu.be/6Czd1Yetaac).
Este é um tutorial relativamente simples, mostrando as funções essenciais que qualquer desenvolvedor que use Git precisa saber, não importa o nível.

## O básico de como o Git funciona

O Git trabalha basicamente com três áreas:

- Working directory: seus arquivos normais no projeto
- Staging area: área de preparação
- Repositório (.git): onde ficam os commits e o histórico

O fluxo normal é simples:

1. Você modifica arquivos
2. Usa `git add` para enviar alterações para a staging area
3. Usa `git commit` para registrar essas mudanças no histórico

Entendendo isso, o restante dos comandos fica muito mais simples.

## Instalação

Para instalar o Git, utilize o instalador no site oficial, [git-scm.com](https://git-scm.com/), ou como eu prefiro fazer, usar um gerenciador de pacotes.

Nas versões mais novas do Windows temos o [winget](https://github.com/microsoft/winget-cli), que é um gerenciador de pacotes oficial do Windows.  
Para instalar o Git com ele basta usar o comando: `winget install --id Git.Git -e --source winget`

No macOS utilize o [homebrew](https://brew.sh): `brew install git`

E no Linux, utilize o gerenciador de pacotes da sua distro favorita.
No meu caso utilizo Arch Linux e um AUR helper chamado [`yay`](https://github.com/Jguer/yay), então instalo com `yay -S git`

## Comandos básicos

### git init

`git init` é onde começa a "magia" do Git. Ele inicia um repositório no diretório atual, criando a pasta `.git`.

Por padrão essa pasta não aparece em exploradores de arquivos, para visualizá-la selecione mostrar arquivos ocultos.

Não é recomendado modificar nada dentro dessa pasta. O Git gerencia dela para você.

### git add

`git add` adiciona as alterações à área de preparação (staging area), indicando quais mudanças farão parte do próximo commit. Esse comando serve basicamente para indicar quais arquivos serão incluídos no seu [git commit](#git-commit).

Geralmente você vai querer adicionar todos os arquivos modificados de uma vez, para isso utilize `git add .`, caso queira adicionar arquivo por arquivo, para por exemplo dividir em vários commits organizados utilize `git add <nome do arquivo>`, para mais informações use o <https://git-scm.com/docs/git-add/pt_BR>

### git diff

`git diff` mostra as diferenças entre arquivos modificados e o último commit.

`git diff` mostra mudanças ainda não adicionadas à staging area, com a flag `--staged` mostra o que já está preparado para commit. É bem útil para evitar commits errados.

### git commit

`git commit` adiciona os arquivos que estão na sua área de preparação para o `.git`, assim criando uma versão histórica do seu código e podendo voltar para ela quando quiser, cada commit possui um hash sha1 associado a ele, podendo ser referenciado por seu hash completo ou por sua versão curta das 7 letras iniciais do hash.

O uso mais básico desse comando vai ser com uma curta mensagem escrita descrevendo as mudanças ocorridas, recomendo utilizar uma convenção de nomenclaturas, por exemplo o [Conventional Commits](https://www.conventionalcommits.org/pt-br/v1.0.0/). Para adicionar a mensagem do commit, use: `git commit -m "sua mensagem aqui"`.

### git log

`git log` mostra o histórico de commits. Com a flag `--oneline` ele mostrará de forma mais resumida.

### git status

`git status` mostra os arquivos modificados e quais estão na área de preparação do Git para serem incluídos no próximo commit.

### git branch

`git branch` é utilizado para gerenciar branches (ramificações) no Git. Branches permitem que você desenvolva funcionalidades, corrija bugs ou teste ideias sem afetar a linha principal do projeto.

Para listar as branches locais, use o comando `git branch`, além de mostrar as branches ele iniciará com um `*` a branch ativa.
Assim como para commit existe o Conventional Commits, para branches existe o [Conventional Branches](https://conventional-branch.github.io/) e para criar uma nova branch use `git branch nome-da-branch`

### git checkout

`git checkout` é usado para trocar entre branches, navegar para commits antigos ou criar uma nova branch.

Para trocar para uma branch use `git checkout nome-da-branch`.

Para visualizar um commit específico usando o hash curto `git checkout hash`, detalhe que ao fazer isso você entra em estado de _detached HEAD_, ou seja, não estará em nenhuma branch.

Para criar uma nova branch a partir da atual e já mudar para ela use `git checkout -b nome-da-branch`.

### git switch

`git switch` é bem similar ao [`git checkout`](#git-checkout), mas só funciona em versões mais novas do Git, ele funciona especificamente para trocar entre branches e criar.

Para trocar entre branches use `git switch nome-da-branch` e para criar, trocando de branch use `git switch -c nome-da-branch`.

### git clone

`git clone` serve para copiar um repositório remoto para sua máquina, muito útil para quando você vai contribuir com um projeto já existente.

Quando você executa `git clone https://github.com/usuario/repositorio`, o Git vai criar uma pasta com o nome do repositório, baixar todos os arquivos, baixar todo o histórico de commits e configurar o repositório remoto como `origin`, ou seja, você passa a ter uma cópia completa do projeto, incluindo histórico e branches.

Se quiser clonar com outro nome de pasta, use `git clone https://github.com/usuario/repositorio meu-projeto`

Se quiser apenas a versão mais recente, sem todo o histórico, chamado de shallow clone, use `git clone --depth=1 https://github.com/usuario/repositorio`

### git pull

`git pull` atualiza seu repositório local com as mudanças do repositório remoto. Seu uso mais comum é `git pull`, que já funciona e resolve a maioria dos casos. Mas de forma mais explicita, pode usar `git pull origin main`, que basicamente significa "Traga as atualizações da branch `main` do repositório remoto `origin`".

Recomendo sempre rodar `git pull` antes de começar a trabalhar, especialmente em projetos com mais pessoas, pois se houver conflitos, o Git interromperá o processo de merge e pedirá que você resolva manualmente antes de concluir.

### git push

`git push` envia seus commits locais para o repositório remoto. O fluxo normal de uso desse comando é [`git add`](#git-add), [`git commit`](#git-commit) e então `git push`.

No seu uso básico, precisa apenas rodar `git push`, funcionando quando sua branch já está vinculada a uma branch remota.

Mas caso for a primeira vez enviando uma branch nova você precisa adicionar mais coisas no comando `git push -u origin nome-da-branch`, a flag `-u` serve para vincular sua branch local a uma branch remota. Depois disso pode usar o fluxo normal de `git push`.

É importante lembrar que enquanto você não rodar `git push`, seus commits existem apenas na sua máquina.

## Arquivos de configuração

### .gitignore

O arquivo `.gitignore` é utilizado para dizer ao Git quais arquivos ou pastas devem ser ignorados pelo Git e não serem adicionados ao repositório, isso é extremamente importante porque nem tudo em um projeto deve ser versionado, por exemplo:

- Dependências instaladas automaticamente
- Arquivos temporários
- Arquivos de sistema
- Arquivos sensíveis
- Arquivos de build
- Logs

O `.gitignore` trabalha com padrões:

- `arquivo.txt` vai ignorar um arquivo específico
- `*.log` vai ignorar todos os arquivos `.log`
- `pasta/` vai ignorar uma pasta inteira
- `!arquivo.txt` vai remover da regra de ignorar

Por exemplo, se eu quero ignorar todos os `.logs`, mas manter o `important.log`, o `.gitignore` fica assim:

```gitignore
*.log
!important.log
```

É importante falar que o `.gitignore` não afeta arquivos que já estão sendo rastreados pelo Git. Para remover do rastreamento use `git rm --cached nome-do-arquivo`, mas tem um detalhe importante que o arquivo irá continuar nos commits antigos.

### .gitattributes

O `.gitattributes` é um arquivo usado para definir como o Git deve tratar arquivos que já fazem parte do repositório.

Um dos usos é padronizar quebras de linha, já que sistemas Windows e Linux/macOS funcionam de forma diferente, é comum surgirem conflitos por causa das diferenças de quebra de linha. Para evitar esse problema:

```properties
* text=auto
```

Isso faz com que o Git normalize automaticamente os arquivos de texto. Também é possível forçar um padrão específico:

```properties
*.js text eol=lf
```

O `.gitattributes` também pode ser usado para definir arquivos binários como imagens e PDFs, que não devem ser tratados como texto, isso evita que o Git tente gerar diff ou fazer merge como se fossem arquivos de código.

```properties
*.png binary
*.jpg binary
```

Além disso o `.gitattributes` possui mais usos a depender da plataforma, por exemplo ignorar uma linguagem de programação de ser contada como parte do repositório ou coisas assim, nesses casos, consulte a documentação do [GitHub](https://docs.github.com/en/repositories/working-with-files/managing-files/customizing-how-changed-files-appear-on-github), [Gitlab](https://docs.gitlab.com/user/project/repository/files/git_attributes/) ou até do próprio [Git](https://git-scm.com/docs/gitattributes).

## Conclusão

O Git é muito completo e poderoso, mas o uso básico é relativamente simples.

Como qualquer ferramenta, exige prática para que você se acostume com seus comandos e conceitos. Este post é apenas um overview. Há muito mais para se aprofundar, como merge, rebase, stash, cherry-pick e diferentes workflows de equipe.

Se ainda acha o Git confuso, recomendo baixar e criar um repositório só para ir testando e nada melhor para pegar o jeito de usar o Git do que você usar em um projeto na prática, algo simples mesmo, uma API ou um pequeno site.

Além disso há várias formas de usar Git, eu particularmente costumo usar pela própria interface de [controle de versão do Visual Studio Code](https://code.visualstudio.com/docs/sourcecontrol/overview), mas existe outras interfaces, [LazyGit](https://github.com/jesseduffield/lazygit), [GitHub Desktop](https://docs.github.com/en/desktop/overview/about-github-desktop) e até mesmo uma do Git com o comando `git gui`.
