---
layout: 'layouts/doc-post.njk'
title: Glossário do Privacy Sandbox
subhead: Os artigos e a documentação do Privacy Sandbox pressupõem um conhecimento dos conceitos de privacidade, publicidade e desenvolvimento da web. Este glossário explica os termos-chave.
description: Explicações simples de conceitos chave.
date: 2021-05-18
updated: 2021-05-18
authors:
  - samdutton
---

{% Aside %}

[Informe-nos](https://github.com/GoogleChrome/developer.chrome.com/issues/new?assignees=&labels=feature+request&template=feature_request.md&title=) se algo estiver faltando!

{% endAside %}

## Plataforma de anúncios (Adtech) {: #adtech }

Uma empresa que presta serviços de veiculação de anúncios.

## Anunciante {: #advertiser }

Uma empresa que paga para anunciar seus produtos.

## Atribuição {: #attribution }

Identificação das ações do usuário que contribuem para um resultado. Por exemplo: correlação de cliques ou visualizações em anúncios com [conversões](#conversion).

## Blink {: #blink }

O [mecanismo de renderização](https://en.wikipedia.org/wiki/Browser_engine) usado pelo Chrome, desenvolvido como parte do projeto [Chromium.](#chromium)

## Chromium {: #chromium }

Um projeto de navegador web de código aberto. Chrome, Microsoft Edge, Opera e outros navegadores são baseados no Chromium.

## Taxa de cliques (Click-through rate - CTR) {: #ctr }

A proporção de usuários que clicam num anúncio depois de visualizá-lo. (Veja também [impressão](#impression).)

## Conversão de clique (Click-through-conversion - CTC) {: #ctc }

Uma conversão atribuída a um anúncio que foi 'clicado'.

## Conversão

A conclusão de alguma meta desejada depois da ação de um usuário. Por exemplo, a compra de um produto ou inscrição num boletim informativo após clicar num anúncio que leva ao site do anunciante.

## Cookie

Um site pode pedir a um navegador web para armazenar um pequeno pedaço de informação textual (chamada de cookie) no computador de um usuário. Os cookies podem ser usados por um site para salvar dados sobre um usuário (ou uma referência aos dados armazenados nos servidores de back-end do site) conforme o usuário se move pela web. Por exemplo: uma loja online pode reter detalhes do carrinho de compras mesmo que um usuário não esteja conectado, ou o site poderá registrar a atividade de navegação do usuário em seu site. Veja [Cookie primário](#first-party-cookie) e [Cookie de terceiros](#third-party-cookie).

## Privacidade diferencial {: #differential-privacy }

Técnicas para permitir o compartilhamento de informações sobre um conjunto de dados para revelar padrões de comportamento sem revelar informações privativas sobre indivíduos ou se eles pertencem ao dataset.

## Domínio

Veja [Domínio de nível superior](#tld) e [eTLD](#etld).

## eTLD, eTLD+1 {: #etld }

**Os domínios de nível superior efetivos** são definidos pela [Lista de Sufixos Públicos](https://publicsuffix.org/list/). Por exemplo:

```text
co.uk
github.io
glitch.me
```

TLDs efetivos são o que permitem que foo.appspot.com seja um site diferente de bar.appspot.com. O domínio de nível superior efetivo (**eTLD**) neste caso é appspot.com, e o nome inteiro do **site** (foo.appspot.com, bar.appspot.com) é conhecido como **eTLD + 1**.

Veja também [Domínio de nível superior](#tld) .

## Entropia

Uma medida de quanto um item de dados revela a identidade individual.

A entropia de dados é medida em bits. Quanto mais os dados revelam identidade, maior é o seu valor de entropia.

Os dados podem ser combinados para identificar um indivíduo, mas pode ser difícil descobrir se os novos dados aumentam a entropia. Por exemplo, saber que uma pessoa é da Austrália não reduz a entropia se você já sabe que a pessoa é da Ilha Kangaroo.

## Identidade federada (também conhecida como login federado)

Uma plataforma de terceiros para permitir que um usuário entre em um site, sem exigir que o site implemente seu próprio serviço de identidade.

## Fingerprinting {: #fingerprinting }

Técnicas para identificar e rastrear o comportamento de usuários individuais. O fingerprinting usa mecanismos que os usuários não conhecem e não podem controlar. Sites como [Panopticlick](https://panopticlick.eff.org) e [amiunique.org](https://amiunique.org/) mostram como os dados de fingerprint podem ser combinados para identificar uma pessoa como indivíduo.

## Superfície de fingerprinting {: #fingerprinting-surface }

Algo que pode ser usado (provavelmente em combinação com outras superfícies) para identificar um determinado usuário ou dispositivo. Por exemplo, o método JavaScript `navigator.userAgent()` e o cabeçalho de solicitação HTTP `User-Agent` dão acesso a uma superfície de fingerprinting (a string do user agent).

## First-party {: #first-party }

Recursos do site que você está visitando. Por exemplo, a página que você está lendo está no site developer.chrome.com e inclui recursos solicitados por esse site. As solicitações desses recursos primários são chamadas de 'solicitações primárias' e os [cookies](#cookie) de developer.chrome.com armazenados enquanto você está neste site são chamados [de cookies primários](#first-party-cookie). Veja também [Terceiros](#third-party).

## Cookie primário (first-party cookie) {: #first-party-cookie }

Um [cookie](#cookie) armazenado por um site enquanto um usuário está no próprio site. Por exemplo: uma loja online pode pedir a um navegador para armazenar um cookie para reter os detalhes do carrinho de compras de um usuário que não está conectado. Veja também [Cookies de terceiros](#third-party-cookie) .

## Impressão {: #impression }

- Visualização de um anúncio. (Veja também [taxa de cliques (click-through)](#ctr).)
- Um slot de anúncio: um retângulo vazio numa página web onde um anúncio pode ser exibido. Os slots de anúncio constituem o [inventário](#inventory) .

## Inventário {: #inventory }

Os slots de anúncio disponíveis num site: os retângulos vazios onde os anúncios podem ser exibidos.

## k-anonymity

Uma medida de anonimato num dataset. Se você possui um nível *k* de anonimato, não poderá ser diferenciado de *k-1* outros indivíduos que estiverem no mesmo dataset. Ou seja, *k* indivíduos possuem as mesmas informações (incluindo você).

## Nonce

Número arbitrário usado apenas uma vez na comunicação criptográfica.

## Origem

A origem de uma solicitação, incluindo o esquema e o nome do servidor, mas nenhuma informação de caminho. Por exemplo: `https://developer.chrome.com`

## Ensaio de origem {: #origin-trial }

Os ensaios de origem fornecem acesso a um recurso novo ou experimental, para possibilitar a construção de funcionalidades que os usuários poderão experimentar por um tempo limitado antes que o recurso seja disponibilizado para todos. Quando o Chrome oferece um ensaio de origem para um recurso, uma [origem](#origin) pode ser registrada para o ensaio e irá habilitar o recurso para todos os usuários daquela origem, sem exigir que os usuários precisem ativar/desativar quaisquer flags ou mudar para uma versão alternativa do Chrome (embora possam precisar fazer um upgrade). Os ensaios de origem permitem que os desenvolvedores criem demos e protótipos usando novos recursos. Os ensaios também ajudam os engenheiros do Chrome a entender como os novos recursos são usados e como eles podem interagir com outras tecnologias web. Saiba mais: [Introdução aos ensaios de origem do Chrome](https://web.dev/origin-trials/).

## Superfície passiva {: #passive-surface }

Algumas superfícies de fingerprinting, como strings de User Agent, endereços IP e cabeçalhos Accept-language, estão disponíveis para todos os sites, quer o site os solicite ou não. Isto significa que superfícies passivas podem facilmente expor toda a privacidade de um site.

A iniciativa Privacy Sandbox propõe a substituição de superfícies passivas por formas ativas de obter informações específicas, por exemplo, usando dicas de cliente uma única vez para obter o idioma do usuário, em vez de ter um cabeçalho Accept-language para cada resposta a cada servidor.

## Editor (publisher)

No contexto da Privacy Sandbox, um site que exibe anúncios.

## Alcance

O número total de pessoas que veem um anúncio (ou que visitam uma página da web que exibe o anúncio).

## Remarketing

Forma de alcançar pessoas em outros sites que já visitaram seu site. Por exemplo, uma loja online pode mostrar anúncios de uma venda de brinquedos para pessoas que já viram brinquedos em seu site.

## Site

Veja [Domínio de nível superior](#tld) e [eTLD](#etld).

## Superfície

Veja [Superfície de fingerprinting](#fingerprinting-surface) and [Superfície passiva](#passive-surface).

## Terceiro {: #third-party }

Recursos servidos por um domínio diferente do site que você está visitando. Por exemplo, um site foo.com pode usar código de análise de google-analytics.com (via JavaScript), fontes de use.typekit.net (através de um elemento de link) e um vídeo do vimeo.com (em um iframe). Veja também [First-party (primário)](#first-party).

## Cookie de terceiros {: #third-party-cookie }

Um [cookie](#cookie) armazenado por um serviço de terceiros. Por exemplo, um site de vídeo pode incluir um botão **Assistir Depois** em seu player incorporado, para permitir que um usuário adicione um vídeo à sua lista de desejos sem forçá-lo a navegar até o site de vídeo. Veja também [Cookie primário (first-party cookie)](#first-party-cookie) .

## Domínio de nível superior (TLD) {: #tld }

Domínios de nível superior, como .com e .org, estão listados no [Root Zone Database (banco de dados da zona raiz)](https://www.iana.org/domains/root/db) .

Observe que alguns 'sites' são, na verdade, apenas subdomínios. Por exemplo, translate.google.com e maps.google.com são apenas subdomínios de google.com (que é o [eTLD + 1](#etld)).

## .well-known (conhecido)

Pode ser útil adicionar redirecionamentos para um site a partir de URLs padronizadas. Por exemplo, os gerenciadores de senhas podem facilitar a atualização das senhas dos usuários se um site definir um redirecionamento de `/.well-known/change-password` para a página de alteração de senha do site. Além disso, pode ser útil acessar a política ou outras informações sobre um host *antes* de fazer uma solicitação. Por exemplo, o robots.txt informa aos rastreadores (web crawlers) quais páginas devem ser visitadas e quais páginas devem ser ignoradas. O IETF [RFC8615](https://tools.ietf.org/html/rfc8615) descreve uma maneira padronizada de permitir que os metadados de todo o site fiquem acessíveis em localidades padrão em um subdiretório /.well-known/. Você pode ver uma lista dessas em [iana.org/assignments/well-known-uris/well-known-uris.xhtml](https://www.iana.org/assignments/well-known-uris/well-known-uris.xhtml) .
