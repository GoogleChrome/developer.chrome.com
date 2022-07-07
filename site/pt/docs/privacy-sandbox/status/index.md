---
layout: 'layouts/doc-post.njk'
title: Já está pronto?
subhead: Status de implementação das APIs do Privacy Sandbox.
description: Status de implementação das APIs do Privacy Sandbox. Última atualização em 2021-05-18.
date: 2021-05-18
updated: 2021-08-18
authors:
  - samdutton
---

{% Aside 'caution' %} Pode haver múltiplos períodos de ensaio de origem separados para cada API. {% endAside %}

## Attribution Reporting (relatório de atribuição)

*Anteriormente conhecido como Conversion Measurement (mensuração de conversão).*

- [Ensaio de origem atual](https://web.dev/origin-trials/): do Chrome 86, [agora estendido](https://groups.google.com/u/1/a/chromium.org/g/attribution-reporting-api-dev/c/ZKf9T8sRqAM) ao Chrome 93.
- [Cadastre-se para o ensaio de origem](/origintrials/#/view_trial/3411476717733150721).
- [Demo](https://goo.gle/demo-event-level-conversion-measurement-api).
- [Status da plataforma Chrome](https://www.chromestatus.com/features/6412002824028160).
- [Status do Blink](https://groups.google.com/a/chromium.org/g/blink-dev/search?q=conversion%20measurement) .
- [GitHub](https://github.com/WICG/conversion-measurement-api/): veja os [issues](https://github.com/WICG/conversion-measurement-api/issues) para perguntas e discussões sobre a API.

### Status: detalhes

Veja o [status](/docs/privacy-sandbox/attribution-reporting-introduction/#status).

### Todos os recursos

- [Relatórios de atribuição (medição de conversão)](/docs/privacy-sandbox/attribution-reporting)
- [Introdução aos relatórios de atribuição (mensuração de conversão)](/docs/privacy-sandbox/attribution-reporting-introduction)
- [Explicações técnicas da API](https://github.com/WICG/conversion-measurement-api/)
- (⚠️ obsoleto) [Uma forma de medir as conversões de anúncios com mais privacidade](https://web.dev/conversion-measurement/): visão geral da primeira iteração desta API para desenvolvedores web
- (⚠️ obsoleto) [Uma forma de medir as conversões de anúncios com mais privacidade](https://www.youtube.com/watch?v=jcDfOoWwZcM) - Vídeo: demonstração da primeira iteração desta API (apenas cliques)
- (⚠️ obsoleto) [Usando a API Event Conversion Measurement](https://web.dev/using-conversion-measurement/): como experimentar a primeira iteração desta API para desenvolvedores web
- [Explorando a Privacy Sandbox](https://web.dev/digging-into-the-privacy-sandbox)

## Trust Tokens

- [Ensaio de origem atual](https://web.dev/origin-trials/): do Chrome 84, [agora estendido](https://groups.google.com/a/chromium.org/g/blink-dev/c/-W90wVkS0Ks/m/Jfh5-ZWpAQAJ) ao Chrome 94.
- [Cadastre-se para o ensaio de origem](/origintrials/#/view_trial/2479231594867458049).
- [Demo](https://trust-token-demo.glitch.me/).
- [Status da plataforma Chrome](https://www.chromestatus.com/feature/5078049450098688).
- [Status do Blink](https://groups.google.com/a/chromium.org/g/blink-dev/search?q=trust%tokens) .
- [GitHub](https://github.com/WICG/trust-token-api): veja os [issues](https://github.com/WICG/trust-token-api/issues) para perguntas e discussões sobre a API.
- [Integração do Chrome DevTools](https://developers.google.com/web/updates/2021/01/devtools?utm_source=devtools#trust-token).
- Saiba mais: [Primeiros passos com os Trust Tokens](https://web.dev/trust-tokens/)

## Conjuntos primários

- [Ensaio de origem atual](https://web.dev/origin-trials/): Chrome 89 a 93.
- [Cadastre-se para o ensaio de origem](/origintrials/#/view_trial/988540118207823873).
- [Status da plataforma Chrome](https://chromestatus.com/feature/5640066519007232).
- [Status do Blink](https://groups.google.com/a/chromium.org/g/blink-dev/search?q=first-party%20sets) .
- [Proposta de API](https://github.com/privacycg/first-party-sets): veja os [issues](hhttps://github.com/privacycg/first-party-sets/issues) para perguntas e discussões sobre a API.
- Saiba mais: [Os Projetos Chromium: First-Party Sets](https://www.chromium.org/updates/first-party-sets).

## FLoC

- O [ensaio de origem](https://web.dev/origin-trials) inicial foi encerrado. Consulte [Intent to Experiment](https://groups.google.com/a/chromium.org/g/blink-dev/c/MmijXrmwrJs) para atualizações.
- [Demo](https://floc.glitch.me/) da versão inicial (o ensaio de origem foi encerrado).
- [Status do Blink](https://groups.google.com/a/chromium.org/g/blink-dev/search?q=floc) .
- [A proposta da API](https://github.com/WICG/floc) está em discussão com o [WICG](https://www.w3.org/community/wicg/) e grupos de interesse.
- [GitHub](https://github.com/WICG/floc): veja os [issues](https://github.com/WICG/floc/issues) para perguntas e discussões sobre a API.
- [Status da plataforma Chrome](https://www.chromestatus.com/features/5710139774468096).
- Saiba mais: [O que é FLoC?](https://web.dev/floc/)

## FLEDGE

Descendente do [TURTLEDOVE](https://github.com/WICG/turtledove) .

- [Intent to Prototype](https://groups.google.com/a/chromium.org/g/blink-dev/c/w9hm8eQCmNI/m/LqT59250CAAJ).
- [Status do Blink](https://groups.google.com/a/chromium.org/g/blink-dev/search?q=fledge) .
- [A proposta da API](https://github.com/WICG/turtledove/blob/main/FLEDGE.md) está em discussão com o [WICG](https://www.w3.org/community/wicg/) e grupos de interesse.
- [GitHub](https://github.com/WICG/turtledove/blob/main/FLEDGE.md): veja os [issues do TURTLEDOVE](https://github.com/WICG/turtledove/issues) para perguntas e discussões relacionados à API.

<br>

---

## Saiba mais

### Blink, Chromium e Chrome

- [Cronograma de lançamento do Chrome](https://www.chromestatus.com/features/schedule)
- [Processo de lançamento de novos recursos no Chromium](https://www.chromium.org/blink/launching-features)
- [Intent to explain: Desmistificando o processo de lançamentos do Blink](https://www.youtube.com/watch?time_continue=291&v=y3EZx_b-7tk)
- [blink-dev](https://groups.google.com/a/chromium.org/g/blink-dev/): status de implementação e discussão de recursos no Blink - o mecanismo de renderização usado pelo Chromium.
- [Pesquisa de código do Chromium](https://source.chromium.org/) .

### Ensaios de origem

- [Introdução aos ensaios de origem do Chrome](https://web.dev/origin-trials/)
- [O que são ensaios de origem de terceiros?](https://web.dev/third-party-origin-trials)
- [Solução de problemas para ensaios de origem do Chrome](/blog/origin-trial-troubleshooting/)
- [Guia de ensaios de origem para desenvolvedores web](https://github.com/GoogleChrome/OriginTrials/blob/gh-pages/developer-guide.md)
- [Explicação sobre ensaios de origem](https://github.com/GoogleChrome/OriginTrials/blob/gh-pages/explainer.md)
- [Executando um ensaio de origem](https://www.chromium.org/blink/origin-trials/running-an-origin-trial)
