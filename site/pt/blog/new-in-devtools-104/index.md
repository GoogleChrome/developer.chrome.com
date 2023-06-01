---
layout: "layouts/blog-post.njk"
title: "O que há de novo no DevTools (Chrome 104)"
authors:
  - jecelynyeen
date: 2022-07-13
updated: 2022-07-13
description: "Reiniciar frames durante o debugging, opções para replay lento no painel de gravação e mais!"
hero: 'image/dPDCek3EhZgLQPGtEG3y0fTn4v82/VQeaOLYsbXAUiUZ0NnHD.jpg'
alt: ''
tags:
  - new-in-devtools
  - devtools
  - chrome-104
---

*Tradução realizada por [Lucas Santos](https://lsantos.dev). Revisão por [Alvaro Camillo Neto](https://www.linkedin.com/in/alvarocamillont/).*

{% Partial 'devtools/banner.md' %}

{% YouTube id='4RXWfw7Xg_Y' %}

<!-- start: translation instructions -->
<!-- + 1. Remove the "draft: true" tag above when submitting PR -->
<!-- + 2. Provide translations under each of the English commented original content -->
<!-- + 3. Translate the "description" tag above -->
<!-- + 4. Translate all the <img> alt text -->
<!-- + 5. Update the whats-new.md file -->

<!-- ## Restart frame during debugging {: #restart-frame } -->
## Reiniciar frame durante debugging {: #restart-frame }

<!-- The **Restart frame** feature is back! You can re-run the preceding code when paused somewhere in a function. Previously, this feature was deprecated and removed in Chrome 92 due to stability issues.  -->
A funcionalidade de **Reiniciar frame** voltou! Você pode re-executar o código anterior quando pausado em algum lugar da função. Anteriormente, essa funcionalidade foi depreciada e removida no Chrome 92 por conta de problemas de estabilidade.

<!-- In this [example](https://jec.fish/), the debugger initially paused at the breakpoint (line 343) near the end of the `toggleColorScheme` function. To restart the debugging from the beginning of the `toggleColorScheme` function, expand the **Call stack** section in the **Debugger** pane, right click on `toggleColorScheme` and select **Restart frame**.  -->
Neste [exemplo] (https://jec.fish/), o depurador inicialmente parou no ponto de interrupção (linha 343) próximo ao final da função `toggleColorScheme`. Para reiniciar a depuração desde o início da função `toggleColorScheme`, expanda a seção **Call stack** no painel **Debugger**, clique com o botão direito do mouse em `toggleColorScheme` e selecione **Reiniciar frame**

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/uBcTkuIaoHHTgJCiGNED.png", alt="Reiniciar frame durante debugging", width="800", height="499" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/7f6749f5cbbfc7d3c89cb2b6b3557d0ff33536ad #}

Issue relacionada: [1303521](https://crbug.com/1303521)


<!-- ## Slow replay options in the Recorder panel {: #recorder } -->
## Opções de reprodução lenta no painel Gravador {: #recorder}

<!-- You can now replay user flows at a slower speed — slow, very slow, and extremely slow. These options let you better observe each step replay on screen. -->
Agora você pode reproduzir os fluxos do usuário em uma velocidade mais lenta - lenta, muito lenta e extremamente lenta. Essas opções permitem que você observe melhor cada etapa repetida na tela.

<!-- [Open](/docs/devtools/recorder/#open) the **Recorder** panel and [start a new recording](/docs/devtools/recorder/#record). Once the recording is done, click on the **Replay** dropdown button. Select a speed to start a replay. -->
[Abra](/docs/devtools/recorder/#open) o painel **Recorder** e [iniciar uma nova gravação](/docs/devtools/recorder/#record). Quando a gravação estiver concluída, clique no botão suspenso **Replay**. Selecione uma velocidade para iniciar uma repetição.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/yLIIMlaew0EWfEYdDbXJ.png", alt="Opções de reprodução lenta no painel Gravador", width="800", height="486" %}

Issue relacionada: [1306756](https://crbug.com/1306756)


<!-- ## Build an extension for the Recorder panel {: #recorder-extension } -->
## Crie uma extensão para o painel Recorder {: #recorder-extension}

<!-- You can now build or install a Chrome extension to export replay scripts in your favorite format. See [Recorder extension API](/docs/extensions/reference/devtools_recorder/) documentation to learn how to build one. -->
Agora você pode criar ou instalar uma extensão do Chrome para exportar scripts de repetição em seu formato favorito. Consulte a documentação da [API de extensão do gravador](/docs/extensions/reference/devtools_recorder/) para saber como criar uma.

<!-- To install a demo extension, follow [these steps](https://github.com/puppeteer/replay#create-a-chrome-extension-for-recorder-available-from-chrome-104-onwards) outlined in the documentation.  -->
Para instalar uma extensão de demonstração, siga [estas etapas](https://github.com/puppeteer/replay#create-a-chrome-extension-for-recorder-available-from-chrome-104-onwards) descritas na documentação .

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/xRO1d79tBe0ILcBoD0oh.png", alt="Crie uma extensão para o painel Recorder", width="800", height="486" %}

Issue relacionada: [1325751](https://crbug.com/1325751)


<!-- ## Group files by Authored / Deployed in the Sources panel {: #authored-deployed } -->
## Agrupar arquivos por Autoral/Publicado no painel Sources {: #authored-deployed }

<!-- Enable the new **Group files by Authored / Deployed** option to organize your files in the Sources panel. When developing web applications with frameworks (for example, React, Angular), it can be difficult to navigate the source files due to the minified files generated by the build tools (for example, Webpack, Vite).  -->
Ative a nova opção **Agrupar arquivos por Autoral/Publicado** para organizar seus arquivos no painel Fontes. Ao desenvolver aplicativos da Web com frameworks (por exemplo, React, Angular), pode ser difícil navegar pelos arquivos de origem devido aos arquivos minificados gerados pelas ferramentas de compilação (por exemplo, Webpack, Vite).

<!-- With this checkbox, you can group files into 2 categories for quicker file search: -->
Com esta caixa de seleção, você pode agrupar os arquivos em 2 categorias para uma pesquisa de arquivos mais rápida:

<!-- - **Authored**. Similar to the source files you view in your IDE. DevTools generates these files based on source maps (provided by your build tools).
- **Deployed**. The actual files that the browser reads. Usually these files are minified. -->
- **Autoral**. Semelhante aos arquivos de origem que você visualiza em seu IDE. O DevTools gera esses arquivos com base em source maps (fornecidos por suas ferramentas de compilação).
- **Publicado**. Os arquivos reais que o navegador lê. Normalmente, esses arquivos são minificados.

<!-- Try it yourself with this [React demo](https://reactjs.org/)! -->
Faça um teste com essa [demo em React](https://reactjs.org/)!

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/5E1qbkl0Gx1REx7FdqEr.png", alt="Agrupar arquivos por Autoral/Publicado no painel Sources", width="800", height="521" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/6bc65d0595702fc826ca87e2cfe519a134b62d90 #}

Issue relacionada: [960909](https://crbug.com/960909)


<!-- ## New User Timings track in the Performance insights panel {: #performance } -->
## Nova trilha de Tempos de Usuários no painel de Performance insights {: #performance }

<!-- Visualize `performance.measure()` marks in your recording with the new **User Timings** track in the **Performance insights** panel. -->
Visualize marcas `performance.measure()` em sua gravação com a nova trilha **Tempos do usuário** no painel **Performance insights**.

<!-- For example, this [web page](https://jec.fish/demo/perf-measure) uses the [`performance.measure()`](https://web.dev/usertiming/#calculating-measurements-with-measure()) method to calculate the elapsed time of text loading. -->
Por exemplo, esta [página da web](https://jec.fish/demo/perf-measure) usa o [`performance.measure()`](https://web.dev/usertiming/#calculating-measurements-with-measure()) para calcular o tempo decorrido do carregamento do texto.

<!-- When you start [measuring the page load](/docs/devtools/performance-insights/#record), the **User Timings** track shows in the recording. Click on the timings item to view its details on the side pane. -->
Quando você começa [medindo o carregamento da página](/docs/devtools/performance-insights/#record), a trilha **User Timings** é exibida na gravação. Clique no item de tempos para ver seus detalhes no painel lateral.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/nxPCp6UaiGWJCWWx4Laa.png", alt="Nova trilha de Tempos de Usuários no painel de Performance insights", width="800", height="499" %}

Issue relacionada: [1322808](https://crbug.com/1322808)


<!-- ## Reveal assigned slot of an element {: #slot } -->
## Revelar o slot atribuído de um elemento {: #slot }

<!-- Slotted elements in the **Elements** panel have a new `slot` badge. When debugging layout issues, use this feature to identify the element which affects the node's layout quicker.  -->
Os elementos com slot no painel **Elements** têm um novo emblema `slot`. Ao depurar problemas de layout, use esse recurso para identificar o elemento que afeta o layout do nó mais rapidamente.

<!-- This [example](https://mdn.github.io/web-components-examples/slotted-pseudo-element/) contains cards with a few named slots. Inspect the `person-occupation` slot of a card, click the `slot` badge next to it to reveal its assigned slot. -->
Este [exemplo](https://mdn.github.io/web-components-examples/slotted-pseudo-element/) contém cartões com alguns slots nomeados. Inspecione o slot `person-occupation` de um cartão, clique no emblema `slot` ao lado dele para revelar o slot atribuído.

<!-- [Learn](https://developer.mozilla.org/docs/Web/Web_Components/Using_templates_and_slots) how to use [<template>](https://developer.mozilla.org/docs/Web/HTML/Element/template) and [<slot>](https://developer.mozilla.org/docs/Web/HTML/Element/slot) elements to create a flexible template that can then be used to populate the shadow DOM of a web component. -->
[Saiba](https://developer.mozilla.org/docs/Web/Web_Components/Using_templates_and_slots) como usar [<template>](https://developer.mozilla.org/docs/Web/HTML/Element/template) e [<slot>](https://developer.mozilla.org/docs/Web/HTML/Element/slot) para criar um modelo flexível que pode ser usado para preencher o shadow DOM de um componente da web.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/7uQGHp9WoMCG1RIAkgIF.png", alt="Revelar o slot atribuído de um elemento", width="800", height="486" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/164e238dabefc08018318a981131eedf2e81736b #}

Issue relacionada: [1018906](https://crbug.com/1018906)


<!-- ## Simulate hardware concurrency for Performance recordings {: #simulate } -->
## Simular a concorrência de hardware para gravações de desempenho {: #simulate }

<!-- The new **Hardware concurrency** setting in the **Performance** panel allows developers to configure the value reported by `navigator.hardwareConcurrency`. -->
 A nova configuração **Concorrência de hardware** no painel **Desempenho** permite que os desenvolvedores configurem o valor relatado por `navigator.hardwareConcurrency`.

<!-- Some applications use `navigator.hardwareConcurrency` to control the degree of parallelism of their application, for example, to control Emscripten pthread pool size. With this feature, developers can test their application performance with different core counts. -->
Alguns aplicativos usam `navigator.hardwareConcurrency` para controlar o grau de paralelismo de seu aplicativo, por exemplo, para controlar o tamanho do pool de pthreads do Emscripten. Com esse recurso, os desenvolvedores podem testar o desempenho de seus aplicativos com diferentes contagens de núcleos.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/PyykGRv29FZbBKJAwWOW.png", alt="Simular a concorrência de hardware para gravações de desempenho", width="800", height="536" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/b26de259d74a45e700d989ad9178c5e3a8b73145 #}

Issue relacionada: [1297439](https://crbug.com/1297439)


<!-- ## Preview non-color value when autocompleting CSS variables {: #css-var } -->
## Visualize valores de non-color ao preencher automaticamente as variáveis CSS {: #css-var }

<!-- When autocompleting CSS variables, DevTools now populates the non-color variable with a meaningful value so that you can preview what kind of change the value will have on the node. -->
Ao preencher automaticamente as variáveis CSS, o DevTools agora preenche a variável non-color com um valor significativo para que você possa visualizar que tipo de alteração o valor terá no nó.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/V4slwNtX9HwLPdAyr8JF.png", alt="Visualize valores de non-color ao preencher automaticamente as variáveis CSS", width="800", height="431" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/977cc58cb5654a2b68142ef8ac1b3f9ac2822694 #}

Issue relacionada: [1285091](https://crbug.com/1285091)


<!-- ## Identify blocking frames in the Back/forward cache pane {: #bfcache } -->
## Identifique os quadros de bloqueio no painel de Back/forward cache {: #bfcache }

<!-- The [Back/forward cache](/docs/devtools/application/back-forward-cache/) pane in the **Application** panel has new **frames** section to help you identify blocking frames that may be preventing the page from being eligible for bfcache. -->
O painel [Back/forward cache](/docs/devtools/application/back-forward-cache/) no painel **Application** tem uma nova seção **frames** para te ajudar a identificar os frames que podem estar impedindo a página de ser elegível para bfcache.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/UaRYEoYYoXhjSIn9seYK.png", alt="Identifique os quadros de bloqueio no painel de Back/forward cache", width="800", height="486" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/897799b24fff0639d483111dd2d957288ba2bd06 #}

Issue relacionada: [1288158](https://crbug.com/1288158)


<!-- ## Improved autocomplete suggestions for JavaScript objects {: #autocomplete } -->
## Sugestões de preenchimento automático aprimoradas para objetos JavaScript {: #autocomplete }

<!-- The the autocompletion for JavaScript object properties now display based on this order: -->
O preenchimento automático das propriedades do objeto JavaScript agora é exibido com base nesta ordem:

<!-- 1. Own enumerable properties
2. Own non-enumerable properties
3. Inherited enumerable properties
4. Inherited non-enumerable properties -->
1. Propriedades enumeráveis próprias
2. Propriedades não enumeráveis próprias
3. Propriedades enumeráveis herdadas
4. Propriedades não enumeráveis herdadas

<!-- Previously, developers found it harder to find relevant properties because the suggestion only favored own properties over inherited properties, and all inherited properties were given equal priority. -->
Anteriormente, os devs achavam mais difícil encontrar propriedades relevantes porque a sugestão só favorecia propriedades próprias sobre propriedades herdadas, e todas as propriedades herdadas recebiam a mesma prioridade.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/IvFTcOWrBOTTMRHqn8u4.png", alt="Sugestões de preenchimento automático aprimoradas para objetos JavaScript", width="800", height="563" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/cee5205ae93c95b1dce49e220b9ebfa8c998d5a6 #}

Issue relacionada: [1299241](https://crbug.com/1299241)


<!-- ## Source maps improvements {: #sourcemaps } -->
## Melhorias em source maps {: #sourcemaps }

<!-- Here are a few fixes on source maps to improve the overall debugging experience: -->
Aqui estão algumas melhorias em source maps que melhoram a experiência de debugging no geral:

<!-- - Breakpoints now work in inline `<script>` with sourceURL annotations. -->
- Breakpoints agora funcionam em tags `<script>` inline com anotações sourceURL
<!-- - The debugger now resolves block scoped variables in the **Scope** view with source maps. -->
- O debugger agora resolve variáveis com escopo de bloco na visualização **Escopo** com source maps.
  {% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/gv9cGnDMF7OVlXPWntII.png", alt="Resolução de variáveis em escopo de bloco", width="800", height="532" %}
<!-- - The debugger now resolves variables in arrow functions in the **Scope** view with source maps. -->
- O depurador agora resolve variáveis em arrow functions na visualização **Escopo** com source maps.
  {% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/CZk0xjwMQAqknkW5G4Xf.png", alt="Resolução de variáveis em arrow functions", width="800", height="479" %}

Issues relacionadas: [1329113](https://crbug.com/1329113), [1322115](https://crbug.com/1322115)


<!-- ## Miscellaneous highlights {: #misc } -->
## Outras mudanças {: #misc }

<!-- These are some noteworthy fixes in this release: -->
Estas são algumas correções dignas de nota nesta versão:

<!-- - Fixed the **Auto-completion** setting for the **Sources** panel. Previously, the auto-complete always on even the setting is disabled. ([1323286](https://crbug.com/1323286)) -->
- Corrigida a configuração **Auto-completar** para o painel **Fontes**. Anteriormente, o preenchimento automático sempre ativado, mesmo que a configuração estivesse desabilitada. ([1323286](https://crbug.com/1323286))
<!-- - Updated the **Manifest** tab in the **Application** panel to parse the latest color scheme format. ([1318305](https://crbug.com/1318305)) -->
- Atualizada a guia **Manifesto** no painel **Aplicativo** para analisar o formato de esquema de cores mais recente. ([1318305](https://crbug.com/1318305))
<!-- - Improved the suggestions for the `<script async>` rendering blocking issues in the **Performance insights** panel. Previously,  DevTools suggested to `add async attribute to the script tag` even though the script is already marked as async. ([1334096](https://crbug.com/1334096)) -->
- Melhorias nas sugestões para os problemas de bloqueio de renderização `<script async>` no painel **Percepções de desempenho**. Anteriormente, o DevTools sugeria `adicionar atributo assíncrono à tag do script` mesmo que o script já estivesse marcado como assíncrono. ([1334096](https://crbug.com/1334096))
<!-- - The **Performance insights** panel now detects iframes as potential causes for layout shifts. You can view the iframe details in the **Details** pane. ([1328873](https://crbug.com/1328873)) -->
- O painel **Performance insights** agora detecta iframes como possíveis causas para mudanças de layout. Você pode visualizar os detalhes do iframe no painel **Detalhes**. ([1328873](https://crbug.com/1328873))
<!-- - When [open file](/docs/devtools/resources/#open) in the **Command menu**, the authored files (files generated by source maps) are now ranked higher so they appear above similarly named deployed scripts. ([1312929](https://crbug.com/1312929))  -->
- Quando [abrir um arquivo](/docs/devtools/resources/#open) no **Menu Command**, os arquivos de autoria (arquivos gerados por source maps) agora são classificados mais no alto para que apareçam acima de scripts publicados com nomes semelhantes. ([1312929](https://crbug.com/1312929))

{% Partial 'devtools/reach-out.md' %}
{% Partial 'devtools/whats-new.md' %}
