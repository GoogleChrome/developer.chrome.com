---
layout: "layouts/blog-post.njk"
title: "O que há de novo no DevTools (Chrome 93)"
authors:
  - jecelynyeen
date: 2021-07-28
updated: 2021-07-28
description:
  "Consultas de contêiner CSS editáveis, prévia de web-bundles, melhor manejo de strings no Console e muito mais."
hero: 'image/dPDCek3EhZgLQPGtEG3y0fTn4v82/xFq1Fb2KOrQfq1RG6x5e.jpg'
alt: ''
tags:
  - new-in-devtools
  - devtools
  - chrome-93
---

*Tradução realizada por [Alvaro Camillo Neto](https://www.linkedin.com/in/alvarocamillont/).*

{% include 'partials/devtools/en/banner.md' %}

{% YouTube id="1VaPAnUGRz8" %}

## Consultas de contêiner CSS editáveis no painel Styles {: #container-queries }
Agora você pode visualizar e editar [Consultas de contêiner CSS](https://web.dev/new-responsive/#responsive-to-the-container) no painel **Styles**.

As consultas de contêiner fornecem uma abordagem muito mais dinâmica para design responsivo. A regra `@container` funciona de maneira semelhante a uma consulta de mídia com `@media`. No entanto, em vez de consultar a viewport e o agente do usuário em busca de informações, `@container` consulta o container ancestral que corresponde a certos critérios.

No painel **Elements**, clique em um elemento DOM com a regra `@container`, DevTools agora exibe as informações `@container` no painel **Styles**. Clique nele para editar o tamanho. O painel **Styles** também exibe as informações do contêiner correspondente. Passe o mouse sobre ele para destacar o elemento do contêiner na página e verifique o tamanho do contêiner. Clique nele para selecionar o elemento do contêiner.

Atualmente o recurso de consultas de contêiner é experimental. Ative a sinalização `#enable-container-queries` em `chrome://flags` para testá-las.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/3NzGBpukHQfUZUKUpUgf.png", alt="Editable CSS container queries in the Styles pane", width="800", height="554" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/46cdd9cd019f088e1134abe84dbc7d53ac60585a #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/a7e1eac63bee3728b41ae440f2ec250559e9c667 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/ef157dab2ccf321941548a51d350f9383a78d283 #}

Chromium issue: [1146422](https://crbug.com/1146422)


## Prévia do web-bundle no painel Network  {: #web-bundle }
[Web bundle](https://web.dev/web-bundles/) é um formato de arquivo para encapsular um ou mais recursos HTTP em um único arquivo. Agora você pode visualizar o conteúdo do web bundle no painel **Network**.

O recurso de web-bundle é atualmente experimental. Habilite a sinalização `#enable-experimental-web-platform-features` em `chrome://flags` para testá-la.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/PEv1mNA14K18t5P3N6Yj.png", alt="web bundle preview", width="800", height="492" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/e7672c40f2febc80786632c188b6029b2f2ac7b7 #}

Chromium issue: [1182537](https://crbug.com/1182537) 


## Depuração da Attribution Reporting API {: #attribution-reporting }
Os erros da Attribution Reporting API agora são relatados na guia **Issues**.

[Attribution Reporting](https://developer.chrome.com/docs/privacy-sandbox/attribution-reporting/) é uma nova API para ajudá-lo a medir quando uma ação do usuário (como um clique no anúncio ou visualização) leva a uma conversão, sem usar identificadores entre sites.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/bkEGVEv5kKc9M6qBUmLz.png", alt="Attribution Reporting API errors in the Issues tab", width="800", height="501" %}

Chromium issue: [1190735](https://crbug.com/1190735)


## Melhor manejo de string no console {: #string }
O novo menu de contexto no **Console** permite que você copie qualquer string como conteúdo, literais de JavaScript ou literais de JSON.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/O5uMSgkHrQ2mQDSjmg3A.png", alt="New context menu in the Console", width="800", height="477" %}

No Chrome 90, o DevTools atualizou o **Console** para sempre [formatar saídas de string como literais JSON válidos](/blog/new-in-devtools-90/#double-quotes). Recebemos feedback dos desenvolvedores de que essa mudança poderia ser confusa, alguns acharam que a quantidade de escape era excessiva e tornava a saída ilegível.

O **Console** agora formata as saídas de string como literais JavaScript válidas e, além disso, fornece a você 3 opções de string de cópia. A opção **Copy as JavaScript literal** escapará dos caracteres especiais apropriados e envolverá a string entre aspas simples, aspas duplas ou barras, dependendo do conteúdo da string. Em vez disso, o **Copy string contents** copia o conteúdo da string bruta (incluindo nova linha e outros caracteres especiais) na íntegra para a área de transferência. Por fim, **Copy as JSON literal** formata a string como uma literal JSON válida e a copia para a área de transferência.

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/9242d13569e9fe67ac01e75d28fa2b6e6bf310d2 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/5715a7b9800532d8b28e2c9fa2d3c1e220ba54a8 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/29236e333a856ae5a952fe4182545b1e2bde5539 #}

Chromium issue: [1208389](https://crbug.com/1208389)


## Improved CORS debugging {: #cors }
CORS-related TypeErrors in the **Console** are now linked to the Network panel and Issues tab. 

Click on the two new icons next to the CORS-related error message to view the network request, or understand the error message further and get potential solutions in the Issues tab.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/VzoUggSoM0FnkDlIFPhq.png", alt="Icons next to the CORS-related error message", width="800", height="485" %}

Chromium issue: [1213393](https://crbug.com/1213393)


## Lighthouse 8.1 {: #lighthouse }
The **Lighthouse** panel is now running Lighthouse 8.1. 

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/wENi9RXYMxdhm3zI4NVu.png", alt="Lighthouse", width="800", height="628" %}

If your site exposes source maps to Lighthouse, look for the **View Treemap** button to see a breakdown of your shipped JavaScript, filterable by size and coverage on load. 

The report also includes a new metric filter (Refer to the **Show audits relevant to** filter in the screenshot). Pick a metric to focus on the opportunities and diagnostics most relevant to improving just that metric.

The **Performance Category** had a number of scoring changes to align with other performance tools and to better reflect the state of the web.

Check out the [release notes](https://github.com/GoogleChrome/lighthouse/releases) for a full list of changes.

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/62b16561e433f4aa1645826923222699ac4bad38 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/16d96a25f24c934ef4dcbbc7b827015abdd228a1 #}

Chromium issue: [772558](https://crbug.com/772558)


## Display new note URL in the Manifest pane {: #new-note-url }
The Manifest pane now displays the the [new note URL](https://wicg.github.io/manifest-incubations/index.html#dfn-note_taking). 

Currently on Chrome OS (CrOS), Chrome Apps and Android Apps that declare a "new-note" capability may be selected as a note-taking app in the Stylus settings (shows up if the CrOS device has been used with a stylus). When selected as a note-taking app, the app can be launched from the stylus palette's "Create Note" button. Adding `new-note-url` field in the application manifest is part of the effort to add equivalent functionality to web apps.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/2Cwggroar7pNesfAQi4K.png", alt="New note URL in the Manifest pane", width="800", height="477" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/51f8aaf568db256f3390c37393d294c82017565e #}

Chromium issue: [1185678](https://crbug.com/1185678)


## Fixed CSS matching selectors {: #matching-selectors }
DevTools fixed the CSS matching selectors, it was not working in the last release.

The comma separated selectors in the **Styles** pane are colored differently depending on whether they match the selected DOM node:

- An unmatched portion is shown in a light grey.
- A matching selector portion is shown in black.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/O7CoHBrKA9cVKci1SM0M.png", alt="CSS matching selectors", width="800", height="477" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/123eac3c8ceeb2e788aa4756d3104db0265f9ad3 #}

Chromium issue: [1219153](https://crbug.com/1219153)


## Pretty-printing JSON responses in the Network panel {: #pretty-print-json }
You can now pretty print JSON responses in the **Network** panel.

Open a JSON response in the **Network** panel, click on the `{}` icon to pretty-print it.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/x2NKXwJPzjycjeD7cLH6.png", alt=" Pretty-printing JSON responses in the Network panel", width="800", height="523" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/250c88b4d02da283cd0a96204b1592f59fda2fcb #}

Chromium bug: [998674](https://crbug.com/998674) 

{% include 'partials/devtools/en/reach-out.md' %}
{% include 'partials/devtools/en/whats-new.md' %}