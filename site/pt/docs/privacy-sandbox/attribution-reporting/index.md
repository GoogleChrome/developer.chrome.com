---
layout: 'layouts/doc-post.njk'
title: Attribution Reporting (relatório de atribuições)
subhead: Meça quando a ação do usuário (como um clique no anúncio ou visualização) leva a uma conversão, sem usar identificadores cross-site.
description: A API Attribution Reporting permite medir quando a ação do usuário (como um clique ou visualização de um anúncio) leva a uma conversão, sem usar identificadores cross-site.
date: 2021-05-18
updated: 2021-08-24
authors:
  - maudn
  - samdutton
---

{% Aside 'caution' %} A API Attribution Reporting era anteriormente conhecida como API Conversion Measurement. {% endAside %}

## Status de implementação

Veja o [status](/docs/privacy-sandbox/attribution-reporting-introduction/#status) .

## Glossário

{% Aside %}

Você talvez também queira consultar o [Glossário completo do Privacy Sandbox](/docs/privacy-sandbox/glossary/).

{% endAside %}

- **Plataformas Adtech**: empresas que fornecem software e ferramentas para permitir que marcas ou agências direcionem, entreguem e analisem sua publicidade digital.
- **Anunciantes**: empresas que pagam por publicidade.
- **Editores**: empresas que exibem anúncios em seus sites.
- **Conversão click-through**: conversão que é atribuída a um clique no anúncio.
- **Conversão view-through**: conversão que é atribuída a uma impressão de anúncio (se o usuário não interagir com o anúncio e converter posteriormente).

## Quem precisa saber sobre esta API: plataformas adtech, anunciantes e editores

- As plataformas Adtech, como [plataformas de demanda](https://en.wikipedia.org/wiki/Demand-side_platform) (DSP) ou [plataformas de gerenciamento de dados](https://en.wikipedia.org/wiki/Data_management_platform) (DMP), podem usar esta API para oferecer suporte à funcionalidade que atualmente depende de cookies de terceiros.
- Anunciantes e editores que dependem de código personalizado para publicidade ou medição de conversão podem usar esta API para substituir as técnicas existentes.
- Anunciantes e editores que dependem de plataformas adtech para medição de conversão não precisam usar a API diretamente, mas podem estar interessados em entendê-la se estiverem trabalhando com plataformas adtech que possam integrar a API.

{% Aside %} Pode haver casos de uso não relacionados a anúncios. [Envolva-se](#engage) para compartilhar seu caso de uso! {% endAside %}

## Por que essa API é necessária? {: #why-is-this-api-needed }

Hoje, a medição de conversão de anúncios geralmente depende de [cookies de terceiros](https://developer.mozilla.org/docs/Web/HTTP/Cookies#Third-party_cookies). Os navegadores estão restringindo o acesso a cookies de terceiros porque eles podem ser usados para rastrear usuários em sites e prejudicar a privacidade do usuário. Esta API permite essas medições de uma forma que preserva a privacidade, sem cookies de terceiros.

## Como funciona a API Attribution Reporting e quais são seus recursos?

{% Aside %} Esta API está sendo incubada e desenvolvida de forma aberta. Está sujeito a alterações. Seu feedback é bem-vindo. Veja [como se envolver](#engage). {% endAside %}

A API Attribution Reporting permite a medição de dois eventos vinculados: um evento no site de um editor, como um usuário visualizando ou clicando num anúncio, com uma conversão subsequente no site de um anunciante.

Esta API suporta a medição de atribuição de conversão do tipo click-through (disponível na primeira implementação desta API, atualmente em [ensaio de origem](https://web.dev/conversion-measurement/#browser-support)) e medição de atribuição do tipo view-through ([veja a explicação pública](https://github.com/WICG/conversion-measurement-api/blob/main/event_attribution_reporting.md)).

A API oferece dois tipos de relatórios de atribuição que podem ser usados para diferentes casos de uso:

- Os **relatórios em nível de evento** associam um determinado clique ou visualização de anúncio (no lado do anúncio) a dados no lado da conversão. Para preservar a privacidade do usuário, evitando a junção da identidade do usuário entre sites, os dados do lado da conversão são muito limitados e os dados recebem "ruídos" (o que significa que, para uma pequena porcentagem dos casos, dados aleatórios são enviados). Como uma proteção extra de privacidade, os relatórios não são enviados imediatamente.
- Os **relatórios agregados** não estão vinculados a um evento específico do lado do anúncio. Esses relatórios fornecem dados de conversão mais ricos e de alta fidelidade do que os relatórios em nível de evento. Uma combinação de técnicas de privacidade em criptografia, distribuição de confiança e privacidade diferencial ajudam a reduzir o risco de união da identidade entre sites. Ambos os tipos de relatório podem ser usados simultaneamente. Eles são complementares. Outros recursos projetados nesta API incluem [relatórios de atribuição entre dispositivos](https://github.com/WICG/conversion-measurement-api/blob/main/cross_device.md) e [relatórios de atribuição de aplicativo para web](https://github.com/WICG/conversion-measurement-api/blob/main/app_to_web.md).

## Envolva-se e compartilhe feedback {: #engage }

- **Ensaio de origem**: [registre-se para o primeiro ensaio de origem (apenas cliques)](/origintrials/#/view_trial/3411476717733150721) ou [veja a primeira demo (apenas cliques)](https://goo.gle/demo-event-level-conversion-measurement-api) .
- Para ficar por dentro da próxima implementação dessa API que vai oferecer mais recursos e ficar disponível para experimentação no Chrome (ensaio de origem), participe da [lista de discussão para desenvolvedores](https://groups.google.com/u/1/a/chromium.org/g/attribution-reporting-api-dev).
- **GitHub**: Leia a [proposta](https://github.com/WICG/conversion-measurement-api/), [levante questões e acompanhe a discussão](https://github.com/WICG/conversion-measurement-api/issues).
- **W3C** : discuta os casos de uso da indústria no [Improving Web Advertising Business Group](https://www.w3.org/community/web-adv/participants) e participe do [Privacy Community Group](https://www.w3.org/community/privacycg/) para discussões sobre a API WebKit/Safari.
- **Suporte ao desenvolvedor**: faça perguntas e participe de discussões no [repositório Privacy Sandbox Developer Support](https://github.com/GoogleChromeLabs/privacy-sandbox-dev-support) .

## Saiba mais

- [Introdução aos relatórios de atribuição (mensuração de conversão)](/docs/privacy-sandbox/attribution-reporting-introduction)
- [Explicações técnicas da API](https://github.com/WICG/conversion-measurement-api/)
- (⚠️ obsoleto) [Uma forma de medir as conversões de anúncios com mais privacidade](https://web.dev/conversion-measurement/): visão geral da primeira iteração desta API para desenvolvedores web
- (⚠️ obsoleto) [Uma forma de medir as conversões de anúncios com mais privacidade](https://www.youtube.com/watch?v=jcDfOoWwZcM) - Vídeo: demonstração da primeira iteração desta API (apenas cliques)
- (⚠️ obsoleto) [Usando a API Event Conversion Measurement](https://web.dev/using-conversion-measurement/): como experimentar a primeira iteração desta API para desenvolvedores web
- [Explorando a Privacy Sandbox](https://web.dev/digging-into-the-privacy-sandbox)
- [Depure a API com Chrome DevTools](/blog/new-in-devtools-93/#attribution-reporting)
