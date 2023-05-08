---
layout: "layouts/blog-post.njk"
title: "O que há de novo no DevTools (Chrome 99)"
authors:
  - jecelynyeen
date: 2022-02-21
updated: 2022-02-21
description:
  "Limitando requests de WebSocket, novo painel da API de relatórios, estilização do console e mais."
hero: 'image/dPDCek3EhZgLQPGtEG3y0fTn4v82/KFqGlM5UJkIYrjGKHlsa.jpg'
alt: ''
tags:
  - new-in-devtools
  - devtools
  - chrome-99
---

*Tradução realizada por [Alvaro Camillo Neto](https://www.linkedin.com/in/alvarocamillont/). Revisão por [Lucas Santos](https://lsantos.dev)*

{% Partial 'devtools/banner.md' %}

{% YouTube id='zFVWeOKZBHs' %}

<!-- start: translation instructions -->
<!-- 1. Remove the "draft: true" tag above when submitting PR -->
<!-- 2. Provide translations under each of the English commented original content -->
<!-- 3. Translate the "description" tag above -->
<!-- 4. Translate all the <img> alt text -->
<!-- 5. Update the whats-new.md file -->
<!-- end: translation instructions -->

<!-- ## Throttling WebSocket requests {: #websocket } -->
## Limitando requests de WebSocket {: #websocket }
<!-- The **Network** panel now supports throttling web socket requests. Previously, the network throttling didn't work on web socket requests. -->
O painel **Rede** agora é compatível com a limitação de requests de web sockets. Anteriormente, a limitação de rede não funcionava em requests de web sockets.
<!-- Open the **Network** panel, click on a web socket request and open the **Messages** tab to observe the message transfers. Select **Slow 3G** to throttle the speed.  -->
Abra o painel **Rede**, clique em uma request de web socket e abra a guia **Mensagens** para observar as transferências de mensagens. Selecione **3G Lento** para limitar a velocidade.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/ZHJibovD0IRQ7KrWb0aD.png", alt="Limitando requests de WebSocket", width="800", height="540" %}

Issue relacionada: [423246](https://crbug.com/423246)


<!-- ## New Reporting API pane in the Application panel {: #reporting-api } -->
## Novo painel API de relatórios no painel Aplicativo {: #reporting-api }
<!-- Use the new **Reporting API** pane to monitor the reports generated on your page and their status. -->
Use o novo painel **API de relatórios** para monitorar os relatórios gerados em sua página e o status deles.

<!-- The [Reporting API](https://web.dev/reporting-api/) is designed to help you monitor security violations of your page, deprecated API calls, and more.  -->
A [API de relatórios](https://web.dev/reporting-api/) foi desenvolvida para ajudar você a monitorar violações de segurança de sua página, chamadas de API obsoletas e muito mais.
<!-- Open a page which uses the Reporting API (e.g. [demo page](https://reporting-api-demo.glitch.me/)). In the **Application** panel, scroll down to the **Background services** section and select the **Reporting API** pane.  -->
Abra uma página que usa a API de relatórios (por exemplo, [página de demonstração](https://reporting-api-demo.glitch.me/)). No painel **Aplicativo**, role para baixo até a seção **Serviços em segundo plano** e selecione o painel **API de relatórios**.
<!-- The **Reports** section shows you a list of reports generated on your page and their status. Click on it to view the report’s details. -->
A seção **Relatórios** mostra uma lista de relatórios gerados em sua página e seus status. Clique nele para ver os detalhes do relatório.
<!-- The **Endpoints** section gives you an overview of all the endpoints configured in the `Reporting-Endpoints` header.  -->
A seção **Endpoints** fornece uma visão geral de todos os endpoints configurados no cabeçalho `Reporting-Endpoints`.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/D1fUz4zuS1xwDbszgft1.png", alt="Painel da API de relatórios", width="800", height="560" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/668bc7a4bc6bea854e8fc21f0e0ca3953ff5e95a #}

Issue relacionada: [1205856](https://crbug.com/1205856)


<!-- ## Support wait until element is visible/clickable in the Recorder panel {: #recorder } -->
## Suporte para esperar até que o elemento esteja visível/clicável no painel Gravação {: #recorder }
<!-- When replaying a user flow recording, the **Recorder** panel will now wait until the element is visible or clickable in the viewport or try to automatically scroll the element into the viewport before replaying the step. Previously, the replay would fail immediately. -->
Ao reproduzir uma gravação de fluxo do usuário, o painel **Gravação** agora aguardará até que o elemento fique visível ou clicável na janela de visualização ou tente rolar automaticamente o elemento na janela de visualização antes de reproduzir a etapa. Anteriormente, o replay falhava imediatamente.
<!-- Here is an example of an off-screen menu positioned outside of the viewport and slide in when activated. The user flow is to toggle the menu, and click on the menu item. Previously, the replay would fail at the last step, because the menu item is still sliding in and not visible in the viewport yet. It’s fixed now. -->
Aqui está um exemplo de um menu off-screen posicionado fora da janela de visualização e deslizar quando ativado. O fluxo do usuário é alternar o menu e clicar no item de menu. Anteriormente, a repetição falhava na última etapa, porque o item de menu ainda está deslizando e ainda não está visível na janela de visualização. Está corrigido a partir dessa versão.

{% Video src="video/dPDCek3EhZgLQPGtEG3y0fTn4v82/Qf8f2x1u1y5FEMSmkB3A.mp4", class="screenshot", autoplay=true, controls=true, loop=true, muted=true %}

Issue relacionada: [1257499](https://crbug.com/1257499#c38)


<!-- ## Better console styling, formatting and filtering {: #console } -->
## Melhor estilização, formatação e filtragem do console {: #console }
<!-- ### Properly style log messages with ANSI escape code {: #console-styling }  -->
 ### Estilize corretamente as mensagens de log com código de escape ANSI {: #console-styling }

<!-- You can now use the [ANSI escape sequences](https://en.wikipedia.org/wiki/ANSI_escape_code) to properly style console messages. Previously, DevTools console had very limited (and partly broken) support for ANSI escape sequences. -->
Agora você pode usar as [sequências de escape ANSI](https://en.wikipedia.org/wiki/ANSI_escape_code) para estilizar corretamente as mensagens do console. Anteriormente, o console do DevTools tinha suporte muito limitado (e parcialmente quebrado) para sequências de escape ANSI.
<!-- It is common for [Node.js](https://nodejs.org/) developers to colorize log messages via ANSI escape sequences, often with the help of some styling libraries like [chalk](https://www.npmjs.com/package/chalk), [colors](https://www.npmjs.com/package/colors), [ansi-colors](https://www.npmjs.com/package/ansi-colors), [kleur](https://www.npmjs.com/package/kleur), etc.  -->
É comum que os desenvolvedores do [Node.js](https://nodejs.org/) colorem mensagens de log por meio de sequências de escape ANSI, geralmente com a ajuda de algumas bibliotecas de estilo como [chalk](https://www.npmjs.com/package/chalk), [colors](https://www.npmjs.com/package/colors), [ansi-colors](https://www.npmjs.com/package/ansi-colors), [kleur](https://www.npmjs.com/package/kleur), etc.
<!-- With these changes, you can now debug your Node.js applications seamlessly using DevTools, with proper colorized console messages. Open this [demo](https://stackblitz.com/edit/node-colors-test) to view it yourself! -->
Com essas alterações, agora você pode depurar seus aplicativos Node.js perfeitamente usando DevTools, com mensagens de console coloridas adequadas. Abra esta [demo](https://stackblitz.com/edit/node-colors-test) para ver você mesmo!
<!-- To learn more about formatting & styling console messages with DevTools, go to [format and style messages in the Console](/docs/devtools/console/format-style) documentation. -->
Para saber mais sobre como formatar e estilizar mensagens do console com o DevTools, vá para a documentação de [formato e estilo de mensagens no Console](/docs/devtools/console/format-style).
{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/6Lu7Js1rgSmjV0cnhDlH.png", alt="estilização do console", width="800", height="547" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/f061ee77a872701a366a604903e639506574520a #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/22a372d445c3f8cff00c2cfe48cb7373165bcd9d #}

Issue Relacionadas: [1282837](https://crbug.com/1282837), [1282076](https://crbug.com/1282076)


<!-- ### Properly support `%s`, `%d`, `%i` and `%f` format specifiers {: #console-format } -->
### Suporte adequado os especificadores de formato `%s`, `%d`, `%i` e `%f` {: #console-format }
<!-- The **Console** now properly performs the `%s`, `%d`, `%i`, and `%f` type conversions as specified in the [Console Standard](https://console.spec.whatwg.org/). Previously, the conversation result was inconsistent. -->
O **Console** agora executa corretamente as conversões de tipo `%s`, `%d`, `%i` e `%f` conforme especificado no [Console Standard](https://console.spec.whatwg.org/). Anteriormente, o resultado da conversa era inconsistente.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/eQPTyQMmyjOUQ6WD4n6N.png", alt="suporte a especificadores de formato na mensagem do console", width="800", height="490" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/2ec299d49c6ab2c185df660766b1fb827db87f8a #}

Issue Relacionadas: [1277944](https://crbug.com/1277944), [1282076](https://crbug.com/1282076)


<!-- ### More intuitive console group filter {: #console-filter } -->
### Filtro de grupo de console mais intuitivo {: #console-filter }
<!-- When filtering the console message, a console message is now shown if its message content matches the filter or the title of the group (or the ancestor group) matches the filter. Previously, the console group title would show despite the filter. -->
Ao filtrar a mensagem do console, uma mensagem do console agora é mostrada se o conteúdo da mensagem corresponder ao filtro ou o título do grupo (ou o grupo ancestral) corresponder ao filtro. Anteriormente, o título do grupo de console era exibido apesar do filtro.
<!-- In addition, if a console message is shown, the group (or the ancestor group) it belongs to is now shown as well.  -->
Além disso, se uma mensagem do console for exibida, o grupo (ou o grupo ancestral) ao qual ela pertence agora também é exibido.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/7iE7r79DI3cQxObhiZUh.png", alt="filtro de grupo de console", width="800", height="612" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/94734947c48283a56f93430f23b838cef10fd364 #}

Issue relacionada: [1068788](https://crbug.com/1068788)


<!-- ## Source maps improvements {: #source map } -->
## Melhorias nos source maps {: #sourcemap }
<!-- ### Debug Chrome extension with source map files {: #extension } -->
### Depuração de extensões do Chrome com arquivos de source map  {: #extension }
<!-- You can now [debug Chrome extension](/docs/extensions/mv3/getstarted/#unpacked) with source map files. Previously, DevTools only supported inline sourcemap for Chrome extension debugging. -->
Agora você pode [depurar a extensão do Chrome](/docs/extensions/mv3/getstarted/#unpacked) com arquivos de source map. Anteriormente, o DevTools suportava apenas o sourcemap inline para depuração de extensão do Chrome.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/lnRa954ROl0MSSExlBl7.png", alt="Debug Chrome extension with source map files", width="800", height="518" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/1e73eb62955de7c4b0920575c7b374d47dab6a65 #}

Issue relacionada: [212374](https://crbug.com/212374)


<!-- ### Improved source folder tree in the Sources panel {: #source-tree } -->
### Árvore de pastas aprimorada no painel Fontes {: #source-tree }
<!-- The source folder tree in the **Sources** panel is now improved with less clutter in the folder structures and naming (e.g. “../”, “./”, etc). Under the hood, this is the result of normalizing the absolute source URLs in the source maps. -->
A árvore de pastas no painel **Fontes** agora foi aprimorada com menos confusão nas estruturas de pastas e nomenclatura (por exemplo, “../”, “./”, etc). Sob o capô, isso é o resultado da normalização das URLs de origem absolutas nos source maps.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/Wl1pPVfQ51NaCtpp3KuY.png", alt="Árvore de pastas aprimorada no painel Fontes", width="800", height="444" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/68613ab02f6d556a2c5ac68ea08f466a534c6bd9 #}

Issue relacionada: [1284737](https://crbug.com/1284737)


<!-- ### Display worker source files in the Sources panel {: #worker-sourcemap } -->
### Exibição arquivos fontes de workers no painel Origens {: #worker-sourcemap }
<!-- [Worker](https://web.dev/workers-overview/) (e.g. web worker, service worker) source files with relative SourceURL are now displayed in the **Source** panel. Previously, worker source files were not handled correctly. -->
[Worker](https://web.dev/workers-overview/) (por exemplo, web worker, service worker) arquivos fontes com SourceURL relativo agora são exibidos no painel **Fontes**. Anteriormente, os arquivos fontes do worker não eram tratados corretamente.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/apH5n92bqYWINMQn5VXa.png", alt="Exibição arquivos fontes de workers no painel Origens", width="800", height="509" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/6e877d5e1a3ccca22e866fb2a70330613aeb6964 #}

Issue relacionada: [1277002](https://crbug.com/1277002)


<!-- # Chrome’s Auto Dark Theme updates {: #auto-dark-mode } -->
## Atualizações do Tema Escuro Automático do Chrome {: #auto-dark-mode }
<!-- The [Auto Dark Theme emulation](/blog/new-in-devtools-96/#auto-dark-mode) UI is now simplified. It is a checkbox now, it was a dropdown previously. -->
A interface do [Tema Escuro Automático (Auto Dark Theme)](/blog/new-in-devtools-96/#auto-dark-mode) agora está simplificada. Agora é uma caixa de seleção, anteriormente era uma lista suspensa.

<!-- Apart from that, when the [Auto Dark Theme](/blog/auto-dark-theme/) is enabled, the **Emulate prefers-color-scheme** dropdown will be disabled and set to **prefers-color-scheme: dark** automatically. -->
Além disso, quando o [Auto Dark Theme](/blog/auto-dark-theme/) estiver ativado, o menu suspenso **Emular prefers-color-scheme** será desativado e definido como **prefers-color-scheme: escuro** automaticamente.

<!-- Chrome 96 introduces an [Origin Trial](/blog/origin-trials/) for [Auto Dark Theme](/blog/auto-dark-theme/) on Android. With this feature, the browser applies an automatically generated dark theme to light themed sites, when the user has opted into dark themes in the Operating System. -->
O Chrome 96 apresentava uma [Origin Trial](/blog/origin-trials/) para [Auto Dark Theme](/blog/auto-dark-theme/) no Android. Com esse recurso, o navegador aplica um tema escuro gerado automaticamente a sites com temas claros, quando o usuário optou por temas escuros no sistema operacional.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/eqfY1jZI8kY7BknnuAom.png", alt="Emulação Auto Dark Theme", width="800", height="476" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/8443d2894b6401695ce94657e6afd5ad399eef28 #}

Issue relacionada: [1243309](https://crbug.com/1243309)


<!-- ## Touch-friendly color-picker and split pane {: #touch-friendly } -->
## Seletor de cores amigável ao toque e painel dividido {: #touch-friendly }
<!-- You can now select color, and resize the [Drawer](/docs/devtools/customize/#drawer) in DevTools with fingers or stylus on touchscreen devices. -->
Agora você pode selecionar cores e redimensionar a [Drawer](/docs/devtools/customize/#drawer) no DevTools com os dedos ou caneta em dispositivos touchscreen.
<!-- Here is an example captured with the [Google Pixelbook](https://www.google.com/chromebook/device/google-pixelbook/) device touchscreen. -->
Aqui está um exemplo capturado com a tela sensível ao toque do dispositivo [Google Pixelbook](https://www.google.com/chromebook/device/google-pixelbook/).
{% Video src="video/dPDCek3EhZgLQPGtEG3y0fTn4v82/aA3Oann2z26Yty9sgNB2.mp4", class="screenshot", autoplay=true, controls=true, loop=true, muted=true %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/f60936b29519e0cf387cd0a133d43885c6eb183d #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/22bb84d657aa69f6f7d5067605c2c133a5714172 #}

Issues relacionadas: [1284245](https://crbug.com/1284245), [1284995](https://crbug.com/1284995)


<!-- ## Miscellaneous highlights {: #misc } -->
## Destaques diversos {: #misc }
<!-- These are some noteworthy fixes in this release: -->
Estas são algumas correções dignas de nota nesta versão:
<!-- - Fixed the [edit cookies](/docs/devtools/storage/cookies/#edit) issue in the **Cookies** pane. ([1290196](https://crbug.com/1290196)) -->
- Corrigido o problema de [editar cookies](/docs/devtools/storage/cookies/#edit) no painel **Cookies**. ([1290196](https://crbug.com/1290196))
<!-- - Use `Shift` + `Tab` to select the previous command in the [Command menu](/docs/devtools/command-menu/). ([1278743](https://crbug.com/1278743)) -->
- Use `Shift` + `Tab` para selecionar o comando anterior no [menu Comando](/docs/devtools/command-menu/). ([1278743](https://crbug.com/1278743))
<!-- - Report [CORS preflight request](https://web.dev/cross-origin-resource-sharing/#preflight-requests-for-complex-http-calls) issues in the [Issues](/docs/devtools/issues/) tab. ([1272445](https://crbug.com/1272445)). -->
- Informe os problemas de [solicitação de simulação do CORS](https://web.dev/cross-origin-resource-sharing/#preflight-requests-for-complex-http-calls) na aba [Problemas](/docs/devtools/issues/ ). ([1272445](https://crbug.com/1272445)).
<!-- - Report [User-Agent Client Hints](https://web.dev/user-agent-client-hints/) issues in the [Issues](/docs/devtools/issues/) tab. ([1219359](https://crbug.com/1219359)). -->
- Relate problemas de [User-Agent Client Hints](https://web.dev/user-agent-client-hints/) na guia [Problemas](/docs/devtools/issues/).(https://crbug.com/1219359)).
<!-- - Fixed `Shift` + `Delete` and `Page up` / `Page down` behaviors in the **Sources** and **Console** panel. ([1278461](https://crbug.com/1278461), [1285662](https://crbug.com/1285662)) -->
- Corrigidos os comportamentos `Shift` + `Delete` e `Page up` / `Page down` no painel **Sources** e **Console**. ([1278461](https://crbug.com/1278461), [1285662](https://crbug.com/1285662))
<!-- - Close the breakpoint edit dialog on breakpoint removal in the **Sources** panel. (922513)  -->
- Feche a caixa de diálogo de edição do breakpoint na remoção do breakpoint no painel **Fontes**. (922513)
<!-- - No reload required when [switching light/dark theme](/docs/devtools/customize/dark-theme/) in DevTools. ([1278738](https://crbug.com/1278738)) -->


{% Partial 'devtools/reach-out.md' %}
{% Partial 'devtools/whats-new.md' %}
