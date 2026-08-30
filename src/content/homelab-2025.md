---
title: Revendo meu homelab de 2025 e melhorias pra 2026
slug: homelab-2025
description: Uma retrospectiva do meu homelab em 2025, o que funcionou, o que ficou de lado e mudanças para 2026.
tags:
  - homelab
  - infraestrutura
  - proxmox
  - terraform
  - docker
imgSrc: /content/homelab-2025.png
updatedAt: '2026-01-06T01:01:00.000Z'
createdAt: '2026-01-06T01:01:00.000Z'
---

Agora que 2026 começou, achei que fazia sentido olhar pra trás e revisar como foi o meu homelab em 2025, falar o que realmente mudou, o que acabou ficando de lado e o futuro dele.

Não foi um ano de grandes upgrades, mas serviu pra entender melhor como eu uso o ambiente no dia a dia, e isso acabou pesando bastante nos planos pra 2026.

## Software

No começo de 2025 instalei algumas aplicações novas, entre elas o [Actual Budget](https://github.com/actualbudget/actual). A ideia é muito boa, ainda mais por ser open-source, mas na prática acabei usando pouco. Esse tipo de ferramenta só funciona quando você mantém uma rotina bem rígida de registrar tudo, e no meu caso isso acabou virando mais atrito do que benefício, ainda mais considerando que eu já tinha um controle bem grande dos meus gastos.

O que senti falta ali foi alguma integração com bancos, algo via Open Finance, por exemplo. Sem isso, o app até é bom, mas acaba ficando esquecido depois de um tempo.

Outra adição foi o [Vaultwarden](https://github.com/dani-garcia/vaultwarden) rodando na VM de TrueNAS. Esse sim entrou de vez na rotina. Ele resolveu um problema real que eu tinha de gerenciar senhas entre navegadores e dispositivos diferentes. No desktop uso Google Chrome, no notebook uso o [Zen Browser](https://github.com/zen-browser/desktop) e no celular também Chrome, o que seria difícil sincronizar se não fosse o Vaultwarden.

Mesmo quando o servidor está desligado, consigo acessar as senhas normalmente, já que os clientes mantêm as credenciais localmente após a última conexão com o servidor.

Um ponto que ficou pendente em 2025 foi a forma como faço updates nos containers Docker que rodam dentro de um LXC no Proxmox. Eu usava o [Watchtower](https://github.com/containrrr/watchtower/) pra automatizar isso, mas com o [projeto abandonado](https://github.com/containrrr/watchtower/discussions/2135), ficou claro que essa abordagem não é totalmente sustentável. Agora devo assumir o controle e fazer updates manuais, mesmo sendo mais trabalhoso, mas garante mais previsibilidade e estabilidade.

## Hardware

Em termos de hardware, 2025 foi bem parado. O setup continuou basicamente o mesmo: apenas um servidor, roteador e a impressora 3D.

O único upgrade relevante foi no servidor, que passou de 12 GB pra 24 GB de RAM. Antes ele rodava com 4 + 8 GB e agora está com 16 + 8 GB. Não é o cenário ideal, já que módulos diferentes impedem XMP, mas foi o melhor custo-benefício no momento, já que esse módulo de 16GB retirei do meu desktop, e sendo sincero, é um servidor, não preciso de XMP, preciso de estabilidade.

Apesar disso, chega a ser meio hipócrita falar em estabilidade quando esse servidor não tem backup adequado e ficou desligado por quase 3 meses. O TrueNAS roda com apenas um HD de 1 TB e o Proxmox com um único SSD de 512 GB. O mínimo ideal seria ter pelo menos redundância local, como um mirror em ZFS, algo que ficou claramente como dívida técnica.

## Mudanças para 2026

Agora em 2026, as coisas começaram a andar um pouco mais rápido. Logo no início do ano comprei um roteador novo, um Acer Predator Connect W6x. Ele tem Wi-Fi 6, uma porta de 2.5 Gbps e quatro portas de 1 Gbps. Wi-Fi 6 em si não muda muita coisa pra mim, mas a porta de 2.5 Gbps abre mais espaço pra brincar com a rede interna.

A ideia é instalar [OpenWRT](https://openwrt.org/) assim que ele chegar. Não parece ser um modelo muito comum rodando OpenWRT, até por ainda ser [snapshot](https://openwrt.org/toh/acer/predator_connect_w6x), então provavelmente vale um post separado pra documentar o processo.

Outra mudança importante foi adicionar uma VPS [e2-micro no Google Cloud](https://docs.cloud.google.com/free/docs/free-cloud-features#compute), toda gerenciada via [OpenTofu](https://opentofu.org/), um fork open-source do [Terraform](https://developer.hashicorp.com/terraform). Isso acabou virando um gatilho pra repensar o resto do homelab, já que dá pra versionar e recriar uma VPS inteira, por que não fazer algo isso localmente no OpenWRT e no Proxmox?

Onde o OpenTofu não fizer muito sentido, por exemplo no [SBC](https://github.com/bigtreetech/BTT-Pi) da impressora 3D, a ideia é usar [Ansible](https://ansible.com/) pra manter tudo minimamente padronizado.

Também estou projetando um mini rack usando perfis de alumínio 2020. A ideia é ser algo simples e barato, mas que ajude a organizar melhor o roteador e alguns projetos futuros. Hoje fica meio espalhado, até funciona.

Pra fechar, pretendo pegar um HBA da LSI pelo eBay pra melhorar o setup do TrueNAS e poder adicionar mais HDs da forma correta, passando o dispositivo PCIe inteiro pra VM em vez de discos individuais. Também quero, dependendo do orçamento ~~e do preço das memórias~~, adicionar um segundo SSD pro Proxmox rodar em mirror, reduzindo a chance de perder os LXCs e VMs caso um SSD falhe.

Por fim, a ideia é criar um repositório no GitHub com todas as configs do homelab. Além de servir como histórico e documentação, pode ser usado para analisar, se inspirar e até reaproveitar ideias em outros ambientes.
