---
layout: 'layouts/doc-post.njk'
title: FLEDGE
subhead: Uma solução para casos de uso de remarketing, projetada de forma que não possa ser usada por terceiros para rastrear o comportamento de navegação do usuário entre sites.
description: O FLEDGE atende aos casos de uso de remarketing, mas foi desenvolvido para não ser usado por terceiros para rastrear o comportamento de navegação do usuário entre sites. A API permite "leilões" no dispositivo pelo navegador, para escolher anúncios relevantes fornecidos por sites que o usuário já visitou.
date: 2021-05-18
updated: 2021-05-18
authors:
  - samdutton
---

<!--lint disable no-smart-quotes-->

## Status de implementação

- A [proposta da API](https://github.com/WICG/turtledove/blob/master/FLEDGE.md) está em discussão com o [WICG](https://www.w3.org/community/wicg/) e grupos de interesse.
- [Intent to Prototype](https://groups.google.com/a/chromium.org/g/blink-dev/c/w9hm8eQCmNI) no [Blink](https://www.chromium.org/blink).

{% Aside %} FLEDGE é descendente de [TURTLEDOVE](https://github.com/WICG/turtledove). {% endAside %}

## Por que precisamos do FLEDGE?

Compreender os interesses do usuário pode permitir anúncios mais relevantes do que simplesmente escolher anúncios com base no conteúdo do site (segmentação contextual) ou usar informações que o usuário forneceu ao site em que o anúncio aparece (segmentação de dados primários). Tradicionalmente, as plataformas de anúncios aprenderam sobre os interesses do usuário rastreando seu comportamento entre sites. Precisamos de uma maneira de apresentar aos usuários anúncios relevantes sem rastreamento entre sites (cross-site).

O FLEDGE atende aos casos de uso de [remarketing](/privacy-sandbox/glossary/#remarketing), mas foi projetado para não que não pudesse ser usado por terceiros para rastrear o comportamento de navegação do usuário. A API permite "leilões" no dispositivo pelo navegador para escolher anúncios relevantes, com base em sites que o usuário já visitou.

Com o FLEDGE:

- O navegador do usuário, não o anunciante ou a plataforma de tecnologia de anúncios, armazena grupos de interesse definidos pelo anunciante aos quais o navegador do usuário está associado.
- O navegador do usuário combina os dados do grupo de interesse com os dados do comprador/vendedor de anúncios e a lógica de negócios para realizar um "leilão" para selecionar um anúncio. Este leilão de anúncios ocorre localmente no dispositivo do usuário, em vez de compartilhar dados com terceiros.
- Os anúncios podem ser selecionados para um grupo de interesse, mas um anunciante não pode combinar os dados do grupo de interesse com outras informações sobre um usuário - em particular, a identidade de uma pessoa ou as páginas que ela visita. Um anunciante não pode saber quais páginas um usuário visualiza em um site.
- Os sites e as redes de anúncios usados por esses sites não podem aprender sobre os interesses de anúncios ou grupos de interesse de seus visitantes: a seleção de anúncios é feita no navegador do usuário.

Em outras palavras, o FLEDGE mantém a privacidade dos seus interesses e atividades de navegação. Por exemplo, se você visita uma loja de calçados on-line e mostra interesse em tênis de corrida e, em seguida, visita um site de notícias que exibe anúncios (um editor), o anunciante (a loja de calçados) não saberá quais páginas você está visualizando no site de notícias e o editor (o site de notícias) não fica sabendo do seu interesse por tênis de corrida.

## Como funciona o FLEDGE?

Quando um usuário visita uma página em um site que deseja anunciar seus produtos ou serviços (um anunciante), o site pode pedir ao navegador do usuário para associar o usuário a grupos de interesse específicos por um determinado período (por exemplo, 30 dias).

O grupo de interesse pode ser exclusivo do site do anunciante, de modo que funcione como uma lista de remarketing. Como alternativa, vários sites podem concordar em atribuir usuários ao mesmo grupo de interesse, por exemplo, se os sites forem parceiros ou pertencerem à mesma rede de anunciantes. Periodicamente, o navegador do usuário busca anúncios designados para grupos de interesse, junto com o código que fornece instruções dos anunciantes para quando um anúncio associado a um grupo de interesse deve ser elegível para licitação em um leilão no dispositivo, por exemplo, apenas em inventário com anúncios próximos ao topo da página. Quando o usuário visita um site do editor que está configurado para aceitar anúncios usando a API FLEDGE, e para exibir anúncios de uma rede de anúncios usada por um site de anunciante que o usuário visitou anteriormente, o código da rede de anúncios na página faz uma solicitação para o navegador executar código de "leilão" para selecionar um anúncio. O anúncio "vencedor" é exibido.

1. Um usuário visita uma página num site que deseja anunciar seus produtos, como uma loja online.
2. O site do anunciante (ou a tecnologia de anúncio que ele usa) pede ao navegador do usuário para ingressar num 'grupo de interesse' de anúncio chamando joinAdInterestGroup(), passando dados, incluindo anúncios relevantes para a navegação do usuário, o nome do host da plataforma de anúncios e URLs para acessar a lógica e sinais de licitação.
3. O usuário visita um site como um editor de notícias, que exibe anúncios e está configurado para aceitar anúncios selecionados usando FLEDGE.
4. O navegador do usuário executa um 'leilão' para escolher um anúncio para inventário (locais de anúncio) que pode aceitar anúncios selecionados por FLEDGE. O 'vendedor' neste leilão pode ser o próprio site ou um terceiro agindo em seu nome, como uma plataforma de fornecimento. Os 'compradores' são terceiros que fazem lances pelo inventário de anúncios do site, como plataformas de demanda agindo em nome dos anunciantes. O vendedor neste leilão de anúncios tem três tarefas:<br> • Escolher quais compradores podem participar.<br> • Escolher o lance mais desejável, com base no preço e nos metadados de cada lance.<br> • Relatar o resultado do leilão.<br>
5. O vendedor inicia o leilão de anúncios chamando runAdAuction(), com dados que incluem o nome do host do vendedor, sinais dos compradores e do vendedor e uma URL para a lógica de decisão do leilão.
6. O leilão retorna dados sobre o anúncio vencedor. Os dados não podem ser acessados pelo site do editor, exceto para renderizar o anúncio em um fenced frame.
7. O anúncio é exibido.

---

## Envolva-se e compartilhe feedback

- **GitHub**: Leia a [proposta](https://github.com/WICG/turtledove/blob/master/FLEDGE.md), [levante questões e acompanhe a discussão](https://github.com/WICG/turtledove/issues).
- **W3C**: Discuta os casos de uso da indústria no [Improving Web Advertising Business Group](https://www.w3.org/community/web-adv/participants).
- **Suporte ao desenvolvedor**: faça perguntas e participe de discussões no [repositório Privacy Sandbox Developer Support](https://github.com/GoogleChromeLabs/privacy-sandbox-dev-support).

## Saiba mais

- [Explicação técnica da API FLEDGE](https://github.com/WICG/turtledove/blob/master/FLEDGE.md)
- [Explorando a Privacy Sandbox](https://web.dev/digging-into-the-privacy-sandbox)
