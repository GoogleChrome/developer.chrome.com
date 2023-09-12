---
layout: "layouts/blog-post.njk"
title: "O que há de novo no DevTools (Chrome 100)"
authors:
  - jecelynyeen
date: 2022-03-08
updated: 2022-03-08
description: 'Visualize e edite @supports em rules, renomeie e personalize o seletor de gravação e muito mais.'
hero: 'image/dPDCek3EhZgLQPGtEG3y0fTn4v82/ZKwQHEcXXjFvH7hF6UJk.jpg'
alt: ''
tags:
  - new-in-devtools
  - devtools
  - chrome-100
---

*Tradução realizada por [Alvaro Camillo Neto](https://www.linkedin.com/in/alvarocamillont/). Revisão por [Lucas Santos](https://lsantos.dev)*

{% Partial 'devtools/banner.md' %}

{% YouTube id='DAD72grzDDc' %}

<!-- start: translation instructions -->
<!-- 1. Remove the "draft: true" tag above when submitting PR -->
<!-- 2. Provide translations under each of the English commented original content -->
<!-- 3. Translate the "description" tag above -->
<!-- 4. Translate all the <img> alt text -->
<!-- 5. Update the whats-new.md file -->
<!-- end: translation instructions -->

<!-- ## Chrome 100  {: #m100 } -->
## Chrome 100  {: #m100 }
<!-- Here’s to the 100th Chrome version! Chrome DevTools will continue to provide reliable tools for developers to build on the web. Take a moment to click around in the **What’s New** tab to celebrate the milestones. -->
Aqui está a 100ª versão do Chrome! O Chrome DevTools continuará a fornecer ferramentas confiáveis para os desenvolvedores criarem na web. Reserve um momento para clicar na guia **O que há de novo** para comemorar os marcos.
<!-- As usual, you can watch the latest [What’s New in DevTools video](https://goo.gle/devtools-youtube) by clicking on the image. -->
Como de costume, você pode assistir ao último [vídeo What's New in DevTools](https://goo.gle/devtools-youtube) clicando na imagem.

{% Video src="video/dPDCek3EhZgLQPGtEG3y0fTn4v82/u8sn7ubuxjJoyPgbfNJs.mp4", class="screenshot", autoplay=true, controls=true, loop=true, muted=true %}


<!-- ## View and edit @supports at rules in the Styles pane {: #supports } -->
## Visualize e edite @supports em rules no painel Estilos {: #supports }
<!-- You can now view and edit the CSS `@supports` at-rules in the **Styles** pane. These changes make it easier to experiment with the at-rules in real time. -->
Agora você pode visualizar e editar as at-rules do CSS `@supports` no painel **Estilos**. Essas alterações facilitam a experiência com as rules em tempo real.
<!-- Open this [demo page](https://jec.fish/demo/at-support), [inspect](/docs/devtools/dom/#inspect) the `<div class=”box”>` element, view the `@supports` at-rules in the **Styles** pane. Click on the rule’s declaration to edit it.  -->
Abra esta [página de demonstração](https://jec.fish/demo/at-support), [inspecione](/docs/devtools/dom/#inspect) o elemento `<div class=”box”>`, visualize as rules do `@supports` no painel **Estilos**. Clique na declaração da rule para editá-la.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/vnokX5Hswmbvlb5weusO.png", alt="Visualize e edite @supports em rules", width="800", height="502" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/5c17e46caa5be1d8c769146baecc91e0d740f7fd #}

Issues relacionadas: [1222574](https://crbug.com/1222574), [1222573](https://crbug.com/1222573)


<!-- ## Recorder panel improvements {: #recorder } -->
## Melhorias no painel Gravação {: #recorder }
<!-- ### Support common selectors by default {: #selector } -->
### Suporte a seletores comuns por padrão {: #selector }
<!-- When determining an unique selector during recording, the [Recorder](/docs/devtools/recorder/) panel now automatically prefers elements with the following attributes: -->
Ao determinar um seletor exclusivo durante a gravação, o painel [Gravação](/docs/devtools/recorder/) agora seleciona automaticamente elementos com os seguintes atributos:

- data-testid
- data-test
- data-qa
- data-cy
- data-test-id
- data-qa-id
- data-testing

<!-- The attributes above are common selectors used in test automation.  -->
Os atributos acima são seletores comuns usados na automação de teste.
<!-- For example, [start a new recording](/docs/devtools/recorder/#record) with this [demo page](https://jec.fish/demo/recorder). Fill in an email address and observe the selector value. -->
Por exemplo, [inicie uma nova gravação](/docs/devtools/recorder/#record) com esta [página de demonstração](https://jec.fish/demo/recorder). Preencha um endereço de e-mail e observe o valor do seletor.
<!-- Since the email element has `data-testid` defined, it’s used as the selector automatically instead of the `id` or `class` attributes. -->
Como o elemento email tem `data-testid` definido, ele é usado como seletor automaticamente em vez dos atributos `id` ou `class`.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/4diI81kpscXznWLrB6a9.png", alt="Suporte a seletores comuns por padrão", width="800", height="585" %}


<!-- ### Customize the recording’s selector {: #customize-selector } -->
### Personalize o seletor de gravação {: #customize-selector }
<!-- You can customize the selector of a recording if you are not using the [common selectors](/docs/devtools/recorder/#selector). -->
Você pode personalizar o seletor de uma gravação se não estiver usando os [seletores comuns](/docs/devtools/recorder/#selector).
<!-- For example, this [demo page](https://jec.fish/demo/recorder) uses the `data-automate` attribute as the selector. [start a new recording](/docs/devtools/recorder/#record) and enter the `data-automate` as the selector attribute. Fill in an email address and observe the selector value (`[data-automate=email-address]`). -->
Por exemplo, esta [página de demonstração](https://jec.fish/demo/recorder) usa o atributo `data-automate` como seletor. [iniciar uma nova gravação](/docs/devtools/recorder/#record) e digite `data-automate` como atributo seletor. Preencha um endereço de e-mail e observe o valor do seletor (`[data-automate=email-address]`).

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/2PPPt9tOC2ZEz1l9F9AK.png", alt="Personalização do seletor de gravação", width="800", height="524" %}

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/X8r52vWEu6aC8QHFuknp.png", alt="O resultado da seleção do seletor personalizado", width="800", height="579" %}


<!-- ### Rename a recording {: #recorder-rename } -->
### Renomeação de gravação {: #recorder-rename }
<!-- You can now rename a recording in the [Recorder](/docs/devtools/recorder/) panel with the edit button (pencil icon) next to the recording’s title. -->
Agora você pode renomear uma gravação no painel [Gravador](/docs/devtools/gravador/) com o botão de edição (ícone de lápis) ao lado do título da gravação.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/Pn9Xsrq9lnStmtjpe0jt.png", alt="Renomeação de gravação", width="800", height="502" %}


<!-- ## Preview class/function properties on hover {: #properties } -->
## Visualização de propriedades de classe/função ao passar o mouse {: #properties }
<!-- You can now hover over a class or function in the **Sources** panel during debugging to preview its properties. Previously, it only showed the function name and a link to its location in the source code. -->
Agora você pode passar o mouse sobre uma classe ou função no painel **Sources** durante a depuração para visualizar as suas propriedades. Anteriormente, ele mostrava apenas o nome da função e um link para sua localização no código-fonte.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/BZzL6QMheyd31VGqhA8W.png", alt="Visualização de propriedades de classe/função ao passar o mouse", width="800", height="502" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/0a585b3883ad39f2f83fa5ab9c7731270d3a2974 ​#}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/96fb7872ce01eb3fde267e39987a82ce3d3f3e21 #}

Issue relacionada: [1049947](https://crbug.com/1049947)


<!-- ## Partially presented frames in the Performance panel {: #perf } -->
## Quadros parcialmente apresentados no painel Desempenho {: #perf }
<!-- Performance recording now displays a new frame category "Partially presented frames" in the **Frames** timeline.  -->
A gravação de desempenho agora exibe uma nova categoria de quadro "Quadros parcialmente apresentados" na linha do tempo **Frames**.
<!-- Previously, the **Frames** timeline visualizes any frames with delayed main-thread work as "dropped frames". However, there are cases where some frames may still produce visual updates (e.g. scrolling) driven by the compositor thread. -->
Anteriormente, a linha do tempo **Frames** visualizava todos os frames com atraso na main-thread como "frames descartados". No entanto, há casos em que alguns quadros ainda podem produzir atualizações visuais (por exemplo, rolagem) conduzidas pela compositor thread.
<!-- This leads to user confusion because the screenshots of these “Dropped frames” are still reflecting visual updates.  -->
Isso leva à confusão do usuário porque as capturas de tela desses “quadros descartados” ainda refletem atualizações visuais.
<!-- The new "Partially presented frames" aims to indicate more intuitively that although some content is not presented timely in the frame, but the issue is not so severe as to block visual updates altogether. -->
O novo "Quadros parcialmente apresentados" visa indicar de forma mais intuitiva que, embora alguns conteúdos não sejam apresentados em tempo hábil no quadro, o problema não é tão grave a ponto de bloquear totalmente as atualizações visuais.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/QcqjnFhMz1Bxd5dkmduj.png", alt="Quadros parcialmente apresentados no painel Desempenho", width="800", height="531" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/a06c2e7c1abeb92be9cfc6b3bf9d6edf6d742e01 #}

Issue relacionada: [1261130](https://crbug.com/1261130)


<!-- ## Miscellaneous highlights {: #misc } -->
## Destaques diversos {: #misc }
<!-- These are some noteworthy fixes in this release: -->
Estas são algumas correções dignas de nota nesta versão:
<!-- - Updated iPhone user agent strings for [emulated devices](/docs/devtools/device-mode/#device). All iPhone versions after 5 have a user-agent string with iPhone OS 13_2_3. ([1289553](https://crbug.com/1289553)) -->
- Strings de agente do usuário do iPhone atualizadas para [dispositivos emulados](/docs/devtools/device-mode/#device). Todas as versões do iPhone após a 5 têm uma string user-agent com o iPhone OS 13_2_3. ([1289553](https://crbug.com/1289553))
<!-- - You can now save [snippet](/docs/devtools/javascript/snippets/) as a JavaScript file directly. Previously, you needed to append `.js` file extension manually. ([1137218](https://crbug.com/1137218)) -->
- Agora você pode salvar [snippet](/docs/devtools/javascript/snippets/) diretamente como um arquivo JavaScript. Anteriormente, você precisava anexar a extensão de arquivo `.js` manualmente. ([1137218](https://crbug.com/1137218))
<!-- - The **Sources** panel now correctly displays scope variable names when debugging with source map. Previously, the **Sources** panel displays minified scope variable names despite sourcemap being provided. ([1294682](https://crbug.com/1294682))  -->
- O painel **Sources** agora exibe corretamente os nomes das variáveis de escopo ao depurar com o mapa de origem. Anteriormente, o painel **Sources** exibia nomes de variáveis de escopo reduzidos, apesar do source map ser fornecido. ([1294682](https://crbug.com/1294682))
<!-- - The **Sources** panel now restores scroll position correctly on page load. Previously, the position was not restored correctly causing inconvenience in debugging. ([1294422](https://crbug.com/1294422))  -->
- O painel **Sources** agora restaura a posição de rolagem corretamente no carregamento da página. Anteriormente, a posição não era restaurada corretamente causando transtornos na depuração. ([1294422](https://crbug.com/1294422))

{% Partial 'devtools/reach-out.md' %}
{% Partial 'devtools/whats-new.md' %}
