---
title: Atualizando BIOS com Linux
slug: atualizando-bios-linux
description: Como fiz para atualizar a BIOS do Acer Nitro V15 sem precisar instalar Windows
tags:
  - linux
  - bios
  - acer
  - hiren's boot
imgSrc: /content/update-bios-linux.png
updatedAt: '2026-01-26T01:04:00.000Z'
createdAt: '2026-01-26T01:04:00.000Z'
---

Como fiz para atualizar a BIOS do Acer Nitro V15 sem a necessidade de instalar o Windows, utilizando apenas Linux. Mas você pode se perguntar: vale um post no blog só pra isso? Bom, acredito que sim, por ser um notebook popular e por eu não ter encontrado essa solução em nenhum lugar anteriormente.

---

## Contexto

Por que atualizar a BIOS? Bom, em algumas versões da BIOS do Acer Nitro V15, a memória reservada para hardware é de quase 2,5 GB, o que, para um notebook com 8 GB de RAM, é muita coisa. Nas versões mais recentes, a memória reservada para hardware é reduzida para aproximadamente 0,5 GB, o que para mim faria uma grande diferença, ainda mais considerando o preço atual das memórias.

A Acer, apesar de ser uma marca enorme, entrega atualizações de BIOS exclusivamente para usuários de Windows, o que, para mim, não é algo que uma fabricante que se preze faria, ainda mais considerando que esse notebook é vendido com Linux de fábrica (mesmo sendo uma distro bem ruim, ainda assim é Linux).

Além disso, eu já uso Linux no dia a dia e não queria perder meu tempo instalando Windows só para atualizar a BIOS. Esse tipo de atualização deveria ser algo simples: um `.bin` (ou similar) em um pendrive, lido diretamente pela própria UEFI/BIOS, assim como acontece na maioria (ou quase todos) dos desktops.

Algumas soluções que passaram pela minha cabeça foram:

- Pegar o SSD de um familiar emprestado que já tivesse Windows
- Usar uma máquina virtual para tentar extrair um `.bin`
- Deixar a BIOS desatualizada e seguir a vida

E bom, não foi nenhuma dessas opções que eu usei.

---

## Hiren's Boot CD

Em um post meio perdido no Reddit, no subreddit do Acer Nitro, um usuário comentou que também utilizava Linux e tinha conseguido atualizar a BIOS.  
Perguntei como ele tinha feito, e a resposta foi simples: Hiren's Boot CD.

Nunca tinha usado o Hiren’s Boot até então, mas basicamente ele é um Windows PE. Bom, o que é Windows PE? De forma bem resumida, é um Windows portátil, parecido com um LiveCD de Linux. Ele roda direto do pendrive, consegue executar praticamente qualquer `.exe` e não precisa ser instalado no disco. O Hiren’s Boot nada mais é do que um Windows PE com vários utilitários extras já inclusos.

---

## Como fazer?

**PROSSIGA COM CUIDADO. NÃO ME RESPONSABILIZO POR PERDAS DE DADOS. CASO UTILIZE LUKS, DESATIVE O fTPM POR SEGURANÇA.**

Primeiro, você precisa ter um pendrive de uns 8 GB. Em seguida, baixe o Hiren's Boot CD do site oficial:  
[https://www.hirensbootcd.org/](https://www.hirensbootcd.org/)

Com o pendrive em mãos e a ISO baixada, crie um pendrive bootável. Se o PC que estiver usando para criar esse pendrive for Windows, você pode usar ferramentas como o tradicional Rufus. No Linux, pode usar o comando `dd` (considero arriscado). Caso use Mac, não sei que ferramenta utilizar.

Mas, se quiser algo melhor, tanto para Windows quanto para Linux, use o [Ventoy](https://www.ventoy.net/en/index.html). Ele é perfeito. Uso em um pendrive de 32 GB cheio de ISOs de vários sistemas, entre eles: Mint, Ubuntu, Arch, Debian, Windows 10, Windows 11 e agora o Hiren's Boot.

Com o pendrive pronto, basta inseri-lo no notebook (caso ainda não esteja), acessar a BIOS e ajustar a ordem de boot. Não tenho prints desse processo, mas uma busca rápida no Google resolve fácil. Depois disso, é só dar boot no Hiren’s Boot, abrir o navegador, acessar o site da Acer, baixar o updater da BIOS do notebook e executar o `.exe`. O notebook vai reiniciar, atualizar a BIOS e pronto.

---

## Meu GRUB sumiu

Depois da atualização, meu GRUB simplesmente desapareceu. Isso acontece porque muitas BIOS assumem que só existe Windows e acabam ignorando completamente qualquer entrada de boot que não seja dele.

Para resolver, dei boot no Arch Linux pelo Ventoy, montei as partições do SSD, entrei em um `chroot` e reinstalei o GRUB no diretório `/boot/EFI/`. Após reiniciar, o GRUB voltou a aparecer normalmente. Não entrarei em mais detalhes porque isso depende de várias coisas, por exemplo, se você usa criptografia, entre outros fatores.
