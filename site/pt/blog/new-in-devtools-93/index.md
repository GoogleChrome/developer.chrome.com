---
layout: "layouts/blog-post.njk"
title: "O que há de novo no DevTools (Chrome 93)"
authors:
  - jecelynyeen
date: 2021-07-28
updated: 2021-07-28
description:
  "Consultas de contêiner CSS editáveis, prévia de web-bundles, melhor manejo de strings no Console e muito mais."
hero: 'image/dPDCek3EhZgLQPGtEG3y0fTn4v82/TiDoAuzLse9uUSoylxNA.jpg'
alt: ''
tags:
  - new-in-devtools
  - devtools
  - chrome-93
---

*Tradução realizada por [Alvaro Camillo Neto](https://www.linkedin.com/in/alvarocamillont/). Revisão por [Lucas Santos](http://info.lsantos.dev)*

{% Partial 'devtools/banner.md' %}

{% YouTube id="1VaPAnUGRz8" %}

## Consultas de contêiner CSS editáveis no painel Styles {: #container-queries }

Agora você pode visualizar e editar [Consultas de contêiner CSS](https://web.dev/new-responsive/#responsive-to-the-container) no painel **Styles**.

As consultas de contêiner fornecem uma abordagem muito mais dinâmica para design responsivo. A regra `@container` funciona de maneira semelhante a uma consulta de mídia com `@media`. No entanto, em vez de consultar a viewport e o agente do usuário em busca de informações, `@container` consulta o container antecessor que corresponde a certos critérios.

No painel **Elements**, clique em um elemento DOM com a regra `@container`, DevTools agora exibe as informações `@container` no painel **Styles**. Clique nele para editar o tamanho. O painel **Styles** também exibe as informações do contêiner correspondente. Passe o mouse sobre ele para destacar o elemento do contêiner na página e verifique o tamanho do contêiner. Clique nele para selecionar o elemento do contêiner.

Atualmente o recurso de consultas de contêiner é experimental. Ative a sinalização `#enable-container-queries` em `chrome://flags` para testá-las.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/3NzGBpukHQfUZUKUpUgf.png", alt="Editable CSS container queries in the Styles pane", width="800", height="554" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/46cdd9cd019f088e1134abe84dbc7d53ac60585a #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/a7e1eac63bee3728b41ae440f2ec250559e9c667 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/ef157dab2ccf321941548a51d350f9383a78d283 #}

Issue relacionada: [1146422](https://crbug.com/1146422)

## Prévia do web-bundle no painel Network  {: #web-bundle }

[Web bundle](https://web.dev/web-bundles/) é um formato de arquivo para encapsular um ou mais recursos HTTP em um único arquivo. Agora você pode visualizar o conteúdo do web bundle no painel **Network**.

O recurso de web-bundle é atualmente experimental. Habilite a sinalização `#enable-experimental-web-platform-features` em `chrome://flags` para testá-la.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/PEv1mNA14K18t5P3N6Yj.png", alt="web bundle preview", width="800", height="492" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/e7672c40f2febc80786632c188b6029b2f2ac7b7 #}

Issue relacionada: [1182537](https://crbug.com/1182537)

## Depuração da Attribution Reporting API {: #attribution-reporting }

Os erros da Attribution Reporting API agora são relatados na guia **Issues**.

[Attribution Reporting](/docs/privacy-sandbox/attribution-reporting/) é uma nova API para ajudá-lo a medir quando uma ação do usuário (como um clique no anúncio ou visualização) leva a uma conversão, sem usar identificadores entre sites.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/bkEGVEv5kKc9M6qBUmLz.png", alt="Attribution Reporting API errors in the Issues tab", width="800", height="501" %}

Issue relacionada: [1190735](https://crbug.com/1190735)

## Melhor manejo de string no console {: #string }

O novo menu de contexto no **Console** permite que você copie qualquer string como conteúdo, literais de JavaScript ou literais de JSON.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/O5uMSgkHrQ2mQDSjmg3A.png", alt="New context menu in the Console", width="800", height="477" %}

No Chrome 90, o DevTools atualizou o **Console** para sempre [formatar saídas de string como literais JSON válidos](/blog/new-in-devtools-90/#double-quotes). Recebemos feedback dos desenvolvedores de que essa mudança poderia ser confusa, e alguns acharam que a quantidade de escape era excessiva e tornava a saída ilegível.

O **Console** agora formata as saídas de string como literais JavaScript válidas e, além disso, fornece a você 3 opções de string de cópia. A opção **Copy as JavaScript literal** escapará dos caracteres especiais apropriados e envolverá a string entre aspas simples, aspas duplas ou barras, dependendo do conteúdo. Em vez disso, o **Copy string contents** copia o conteúdo da string bruta (incluindo nova linha e outros caracteres especiais) na íntegra para a área de transferência. Por fim, **Copy as JSON literal** formata a string como uma literal JSON válida e a copia para a área de transferência.

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/9242d13569e9fe67ac01e75d28fa2b6e6bf310d2 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/5715a7b9800532d8b28e2c9fa2d3c1e220ba54a8 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/29236e333a856ae5a952fe4182545b1e2bde5539 #}

Issue relacionada: [1208389](https://crbug.com/1208389)

## Depuração CORS aprimorada {: #cors }

Os TypeErrors relacionados ao CORS no **Console** agora estão vinculados ao painel Network e à guia Issues.

Clique nos dois novos ícones ao lado da mensagem de erro relacionada ao CORS para visualizar a solicitação de rede ou entender melhor a mensagem de erro e obter possíveis soluções na guia Problemas.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/VzoUggSoM0FnkDlIFPhq.png", alt="Icons next to the CORS-related error message", width="800", height="485" %}

Issue relacionada: [1213393](https://crbug.com/1213393)

## Lighthouse 8.1 {: #lighthouse }

O painel **Lighthouse** agora está executando o Lighthouse 8.1.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/wENi9RXYMxdhm3zI4NVu.png", alt="Lighthouse", width="800", height="628" %}

Se seu site expõe source maps para o Lighthouse, procure o botão **View Treemap** para ver uma análise do JavaScript enviado, filtrável por tamanho e cobertura no carregamento.

O relatório também inclui um novo filtro de métrica (consulte **Mostrar auditorias relevantes para** filtro na captura de tela). Escolha uma métrica para se concentrar nas oportunidades e diagnósticos mais relevantes para melhorar apenas essa métrica.

A **Categoria de desempenho** teve uma série de alterações de pontuação para se alinhar com outras ferramentas de desempenho e refletir melhor o estado da web.

Confira a lista completa de mudanças nas [notas de lançamento](https://github.com/GoogleChrome/lighthouse/releases).

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/62b16561e433f4aa1645826923222699ac4bad38 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/16d96a25f24c934ef4dcbbc7b827015abdd228a1 #}

Issue relacionada: [772558](https://crbug.com/772558)

## Exibir o novo URL da nota no painel Manifest {: #new-note-url }

O painel Manifest agora exibe o [URL da nova nota](https://wicg.github.io/manifest-incubations/index.html#dfn-note_taking).

Atualmente no ChromeOS (CrOS), os aplicativos Chrome e aplicativos Android que declaram um recurso de "nova nota", podem ser selecionados como um aplicativo de anotações nas configurações da caneta (aparece se o dispositivo CrOS foi usado com uma caneta).

Quando selecionado como um aplicativo de anotações, ele pode ser iniciado a partir do botão **"Criar Anotação"** da paleta da caneta. Para adicionar a aplicação web como uma das opções de aplicativo de anotação você precisará adicionar o campo `new-note-url` no manifesto web do aplicativo.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/2Cwggroar7pNesfAQi4K.png", alt="New note URL in the Manifest pane", width="800", height="477" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/51f8aaf568db256f3390c37393d294c82017565e #}

Issue relacionada: [1185678](https://crbug.com/1185678)

## Seletores de correspondência de CSS corrigidos {: #matching-selectors }

O DevTools corrigiu os seletores de correspondência de CSS, que não estavam funcionando na versão anterior.

Os seletores separados por vírgulas no painel **Styles** são coloridos de maneira diferente dependendo se eles correspondem ao nó DOM selecionado:

- Uma parte sem correspondência é mostrada em cinza claro.
- Uma parte do seletor correspondente é mostrada em preto.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/O7CoHBrKA9cVKci1SM0M.png", alt="CSS matching selectors", width="800", height="477" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/123eac3c8ceeb2e788aa4756d3104db0265f9ad3 #}

Issue relacionada: [1219153](https://crbug.com/1219153)

## Respostas JSON Pretty-printing no painel Network {: #pretty-print-json }

Agora você pode ver respostas JSON no painel **Network** de forma agradável (Pretty-printing).

Abra uma resposta JSON no painel **Network**, clique no ícone `{}` para transformar em pretty-print.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/x2NKXwJPzjycjeD7cLH6.png", alt=" Pretty-printing JSON responses in the Network panel", width="800", height="523" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/250c88b4d02da283cd0a96204b1592f59fda2fcb #}

Bug relacionado: [998674](https://crbug.com/998674)

{% Partial 'devtools/reach-out.md' %}
{% Partial 'devtools/whats-new.md' %}
