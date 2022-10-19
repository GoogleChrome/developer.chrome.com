---
layout: "layouts/blog-post.njk"
title: "O que há de novo no DevTools (Chrome 102)"
authors:
  - jecelynyeen
date: 2022-04-12
updated: 2022-05-12
description: "Novo painel de dicas de performance, atalhos para emular temas claros/escuros e mais..."
hero: 'image/dPDCek3EhZgLQPGtEG3y0fTn4v82/nR93c0Mdzs3YMifYHfxN.jpg'
alt: ''
tags:
  - new-in-devtools
  - devtools
  - chrome-102
---

*Tradução realizada por [Lucas Santos](https://lsantos.dev). Revisão por [Alvaro Camillo Neto](https://www.linkedin.com/in/alvarocamillont/).*

{% Partial 'devtools/banner.md' %}

{% YouTube id='0V_ph7PA_aw' %}

<!-- start: translation instructions -->
<!-- + 1. Remove the "draft: true" tag above when submitting PR -->
<!-- + 2. Provide translations under each of the English commented original content -->
<!-- + 3. Translate the "description" tag above -->
<!-- + 4. Translate all the <img> alt text -->
<!-- + 5. Update the whats-new.md file -->
<!-- end: translation instructions -->

<!-- ## Preview feature: New Performance insights panel {: #perf } -->
## Prévia de funcionalidade: Novo painel de insights de performance {: #perf }

<!-- Use the **Performance insights** panel to get actionable and use-case-driven insights on your website's performance. -->
Use o novo painel de **Performance insights** para obter sugestões e dicas acionáveis orientadas a casos de uso na performance do seu website.
<!-- [Open the panel](/docs/devtools/performance-insights/#open) and start a new recording based on your use case. For example, let’s measure the page load of this [demo page](https://coffee-cart.netlify.app/?ad=1). -->
[Abra o painel](/docs/devtools/performance-insights/#open) e comece uma nova gravação baseada no seu caso de uso. Por exemplo, vamos medir a carga dessa [página de exemplo](https://coffee-cart.netlify.app/?ad=1).

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/EjgH5CD6FHnzoEhDEWxu.png", alt="Novo painel de performance insights", width="800", height="585" %}

<!-- Once the recording is complete, you get the performance insights on the  **Insights** pane. Click on each insight item (for example, Render blocking request, layout shift) to understand the issue and potential fixes.  -->
Uma vez que a gravação for completada, você vai receber dicas e sugestões no painel **Insights**. Clique em cada item (por exemplo, "requisição bloqueando o render", "mudança de layout") para entender melhor o problema e potenciais soluções.

<!-- Go to the **Performance insights** panel [documentation](/docs/devtools/performance-insights/) to learn more with the step-by-step tutorial.  -->
Vá até a [documentação](/docs/devtools/performance-insights/) do painel de **Performance insights** para aprender mais com os tutoriais passo-a-passo.

<!-- This is a preview feature to help web developers (especially non-performance experts) to identify and fix potential performance issues. Our team is actively working on this feature and we are looking for your [feedback](https://crbug.com/1270700) for further enhancements. -->
Essa é uma funcionalidade ainda em prévia para ajudar devs (especialmente quem não é especialista em performance) a identificar e consertar potenciais problemas de performance. Nosso time está ativamente trabalhando nessa funcionalidade e precisamos do seu [feedback](https://crbug.com/1270700) para mais melhorias.

Issue relacionada: [1270700](https://crbug.com/1270700)


<!-- ## New shortcuts to emulate light and dark themes {: #emulation } -->
## Novos atalhos para emular temas claros e escuros {: #emulation }

<!-- You can now emulate the light and dark themes quicker (CSS media feature [prefers-color-scheme](https://web.dev/prefers-color-scheme/#the-prefers-color-scheme-media-query)) with the new shortcuts in the **Styles** pane. -->
Você pode agora emular temas claros e escuros mais facilmente (veja a media query CSS chamada [prefers-color-scheme](https://web.dev/prefers-color-scheme/#the-prefers-color-scheme-media-query)) com os novos atalhos no painel **Estilos**.

<!-- Previously, it took more steps to [emulate themes](/docs/devtools/rendering/emulate-css/) in the **Rendering** tab.   -->
Anteriormente, eram necessários mais passos para [emular temas](/docs/devtools/rendering/emulate-css/) na aba de **Renderização**.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/dCbNHwE5ICGNXRUws1zz.png", alt="Novos atalhos para emular temas claros e escuros", width="800", height="488" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/34c39bcabca71195024f1312ec29eecf464a633d #}

Issue relacionada: [1314299](https://crbug.com/1314299)


<!-- ## Improve security on the Network Preview tab {: #network-preview } -->
## Melhorias na segurança da aba de Visualização de Rede {: #network-preview }

<!-- DevTools now apply the Content Security Policy (CSP) in the **Preview** tab in the **Network** panel. -->
O DevTools agora aplica o *Content Security Policy (CSP)* na aba **Preview** no painel **Rede**

<!-- For example, the first screenshot shows a page that contains [mixed content](https://web.dev/what-is-mixed-content/). The page loads over a secure HTTPS connection, but the stylesheet loads over an insecure HTTP connection. -->
Por exemplo, a primeira imagem mostra uma página que contém [conteúdo misto](https://web.dev/what-is-mixed-content/). A página carrega em uma conexão HTTPS segura, mas o CSS é lido a partir de uma conexão HTTP insegura.

<!-- The browser blocked the stylesheet request by default. However, when you opened the page via the **Preview** tab in the **Network** panel, the stylesheet was not blocked previously (hence the background turned into red). It is now blocked as you would expect (second screenshot). -->
O browser bloqueia essa requisição para o CSS por padrão. No entanto, quando você abria a página através da aba **Preview** no painel **Rede**, o CSS não estava bloqueado antes (por isso o fundo fica vermelho). Agora está bloqueado, como é de se esperar (segunda imagem).

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/jxqxoJYqWXGzj4V9aJaX.png", alt="Melhorias na segurança da aba de Visualização de Rede", width="800", height="488" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/95bce20a2490b59a36d5da04c5f81d8c38230a39 #}

Issue relacionada: [833147](https://crbug.com/833147)


<!-- ## Improved reloading at breakpoint {: #debugger } -->
## Melhorias no reload em breakpoints {: #debugger }

<!-- The debugger now terminates script execution when reloading at breakpoint. -->
O debugger agora termina a execução de um script quando recarregado em um breakpoint.

<!-- For example, the script got into an endless loop previously when setting and reloading at the `ReactDOM` breakpoint in this [React demo](https://react-stuck.glitch.me/). The **Sources** panel broke due to the endless loop.  -->
Por exemplo, o script ficou preso em um loop infinito antes quando criamos e recarregamos o breakpoint `ReactDOM` nessa [demonstração em React](https://react-stuck.glitch.me/). O painel **Sources** quebrou por conta desse loop.

<!-- Continuing to execute JavaScript is causing a lot of trouble for developers and might leave the renderer in a broken state. This change aligns the debugging behavior with other browsers like Firefox. -->
Continuar executando JavaScript está causando muitos problemas para devs e pode deixar o renderizador quebrado. Essa mudança alinha o comportamento do debugger com outros browsers, como o Firefox.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/QBv59pX5TE9c7iJAB3Xu.png", alt="Melhorias no reload em breakpoints", width="800", height="566" %}

{# https://chromium.googlesource.com/chromium/src/+/ea207cee9bbd9b6731228d94778b23138373ec97 #}

Issues relacionadas: [1014415](https://crbug.com/1014415), [1004038](https://crbug.com/1004038), [1112863](https://crbug.com/1112863), [1134899](https://crbug.com/1134899)


<!-- ## Console updates  {: #console } -->
## Atualizações no Console {: #console }

<!-- ### Handle script execution errors in the Console {: #errors } -->
### Tratamento de erros de execução de script no Console {: #errors }

<!-- Errors during script evaluation in the Console now generate proper error events that trigger the `window.onerror` handler and are dispatched as `"error"` events on the window object. -->
Erros durante a execução de um script no Console agora geram os eventos corretos de erro que ativam a chamada `window.onerror` e são enviados como eventos do tipo `"error"` para o objeto `window`.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/gBtY4zD39SPizfcCGJJW.png", alt="Tratamento de erros de execução de script no Console", width="800", height="487" %}

{# https://chromium.googlesource.com/v8/v8/+/56cfdd68c731c53d016326b890b56b5c30098998 #}

Issue relacionada: [1295750](https://crbug.com/1295750)


<!-- ### Commit live expression with Enter {: #live-expression } -->
### Enter para enviar uma *live expression*  {: #live-expression }
<!-- Once you finish typing a [live expression](/blog/new-in-devtools-70/#watch), you can click `Enter` to commit it. Previously, hitting Enter resulted in adding new lines. This is inconsistent with other parts of the DevTools.  -->
Quando você terminar de digitar uma [live expression](/blog/new-in-devtools-70/#watch), você pode apertar `Enter` para enviá-la. Anteriormente, apertar `Enter` resultava na adição de novas linhas. Isso era inconsistente com outras partes do DevTools.
<!-- To add a new line in the **live expression** editor, use `Shift` + `Enter` instead. -->
Para adicionar uma nova linha no editor de **live expressions** use `Shift` + `Enter`.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/yB7m2052mYzgsRgjIMvs.png", alt="Enter para enviar uma live expression", width="800", height="541" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/f6f73b8d9eedbc5b6006e61c3be0d843188eac55 #}

Issue relacionada: [1260744](https://crbug.com/1260744)


<!-- ## Cancel user flow recording at the start {: #recorder } -->
## Cancelamento de gravações de fluxo de usuário no início {: #recorder }
<!-- You can cancel the recording during the start of user flow recording. Previously, there was no option to cancel the recording. -->
Você pode cancelar a gravação durante o início de um registro de fluxo de usuário. Anteriormente não havia essa opção.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/3vhz3UrjLd9lJKcYw2FU.png", alt="Cancelamento de gravações de fluxo de usuário no início", width="800", height="488" %}

Issue relacionada: [1257499](https://crbug.com/1257499)


<!-- ## Display inherited highlight pseudo-elements in the Styles pane {: #pseudo } -->
## Veja pseudo-elementos herdados de seleção no painel de Estilos {: #pseudo }

<!-- View the inherited highlight pseudo-elements  (e.g. `::selection`, `::spelling-error`, `::grammar-error`, and `::highlight`) in the **Styles** pane. Previously, these rules were not displayed. -->
Veja os pseudo-elementos herdados relativos à seleção (como `::selection`, `::spelling-error`, `::grammar-error` e `::highlight`) diretamente no painel **Estilos**. Anteriormente, essas regras não eram exibidas.

<!-- As mentioned in the [specification](https://drafts.csswg.org/css-pseudo-4/#highlight-cascade), when multiple styles conflict, cascade determines the winning style. This new feature helps you understand the inheritance and priority of the rules. -->
Como a [especificação](https://drafts.csswg.org/css-pseudo-4/#highlight-cascade) menciona, quando múltiplos estilos são conflitantes, a cascata de estilos determina quem "venceu". Essa nova funcionalidade ajuda você a entender a herança e a prioridade de cada uma das regras.

{% Aside %}
<!-- At the moment, you need to run Chrome with the `--enable-blink-features=HighlightInheritance` flag to enable this feature. -->
No momento, você precisa executar o Chrome com a flag `--enable-blink-features=HighlightInheritance` para ativar essa funcionalidade.
{% endAside %}

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/fD8vohg49HvBPW53GV2Q.png", alt="Veja pseudo-elementos herdados de seleção no painel de Estilos", width="800", height="529" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/bfe1683fe8b2eaa9ea2960dedca2e4a0bbc73546 #}

Issue relacionada: [1024156](https://crbug.com/1024156)


<!-- ## Miscellaneous highlights {: #misc } -->
## Outras novidades {: #misc }

<!-- These are some noteworthy fixes in this release: -->
Essas são algumas melhorias dignas de nota nessa atualizacão:

<!-- - The **Properties** pane now displays accessor properties with value by default. It was hidden mistakenly previously. ([1309087](https://crbug.com/1309087))
- The **Styles** pane now properly shows the overridden `@support` rules as strikethrough. Previously, the rules weren’t strikethrough. ([1298025](https://crbug.com/1298025))
- Fixed the CSS formatting logic in the **Sources** panel that caused multiple blank lines when editing CSS. ([1309588](https://crbug.com/1309588))
- Cap the **Expand recursively** option of an object in the **Console** to maximum 100 so it does not go on forever for circular objects. ([1272450](https://crbug.com/1272450)) -->
- O painel **Propriedades** agora mostra os acessores de cada propriedade com seus valores por padrão. Ele estava escondido por um erro anteriormente. ([1309087](https://crbug.com/1309087))
- O painel **Estilos** agora mostra as regras sobrescritas de `@support` de forma correta como riscadas. Anteriormente elas não estavam sendo exibidas nesse estilo. ([1298025](https://crbug.com/1298025))
- Logica de formação de CSS no painel de **Fontes** que causava múltiplas linhas em branco quando editando CSS foi corrigida. ([1309588](https://crbug.com/1309588))
- Limitação de, no máximo, 100 para a opção **expandir recursivamente** em qualquer objeto no console para que ele não seja executado para sempre em objetos com referência circular. ([1272450](https://crbug.com/1272450))

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/d4240f8bc96a3ebd2dc2a5b316fd41c24e20fb3c #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/cf09d1de8a0277dbaa9e2000a8d2fcca69e7128e #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/6616b9f0cd3e9f1138fb0f409fbe91206d5c8640 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/9751653723e15073588f985ba53ba5204475b8c5 #}


<!-- ## [Experimental] Copy CSS changes {: #copy } -->
## [Experimental] Copie mudanças de CSS {: #copy }

{% Aside %}
<!-- To enable the experiment, check **Sync CSS changes in the Styles pane** under **Settings** > **Experiments**. -->
Para ativar esse experimento, ative a flag **Sync CSS changes in the Styles pane** no painel **Configurações** > **Experimentos**
{% endAside %}

<!-- With this experiment, the **Styles** pane highlights your CSS changes in green. You can hover over the changed rules and click on the new copy button next to it to copy it. -->
Com esse experimento, o painel **Estilos** vai destacar suas mudanças no CSS na cor verde. Você pode passar o mouse sobre as regras alteradas e clicar no novo botão de copiar ao lado para poder copiar para a área de transferência.

<!-- Apart from that, you can copy all CSS changes across declarations by right-clicking on any rule, and selecting **Copy all CSS changes**. -->
Além disso, você pode copiar mudanças no CSS entre declarações ao clicar com o botão direito em qualquer regra e selecionar **Copiar todas as mudanças de CSS**.

<!-- A new **Copy** button is added to the [Changes](/docs/devtools/changes/) tab as well to help you keep track and copy your CSS changes with ease! -->
Um novo botão **Copiar** foi adicionado à aba de [Mudanças](/docs/devtools/changes/) para te ajudar a manter o controle e copiar suas mudanças de forma fácil.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/7PYMKJNBguswcas6jbpu.png", alt="Copie mudanças de CSS", width="800", height="488", class="screenshot" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/afe5698f1cd20304d2763574ef8e9faf6a4a6db1 #}
{# ​​https://chromium.googlesource.com/devtools/devtools-frontend/+/5de1d6140cad945783f3ca54055134f4a7db42a1 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/573dfc1cca09e49177ece3898c9ba9619c386f06 #} 

Issue relacionada: [1268754](https://crbug.com/1268754)


<!-- ## [Experimental] Picking color outside of browser {: #color-picker } -->
## [Experimental] Escolhendo cores fora do browser {: #color-picker }

{% Aside %}
<!-- To enable the experiment, check **Enable color picking outside the browser window** under **Settings** > **Experiments**. -->
Para ativar esse experimento, ative a flag **Enable color picking outside the browser window** no painel **Configurações** > **Experimentos**
{% endAside %}

<!-- Enable this experiment to pick a color outside of the browser with the color picker. Previously, you could only pick a color within the browser. -->
Ative esse experimento para poder selecionar cores fora da janela do browser com o conta-gotas. Anteriormente você só podia selecionar cores limitadas à janela do browser.

<!-- In the **Styles** pane, click on any color preview to open the color picker. Use the eyedropper to pick color from anywhere.  -->
No painel **Estilos**, clique em qualquer quadrado de pré-visualização de cores para abrir o seletor de cores. Use o conta-gotas para selecionar uma cor de qualquer lugar.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/h3xLPNl1QdvyuzZpNuqW.png", alt="Escolhendo cores fora do browser", width="800", height="450" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/1a73be9f3cb75fdd57578224b71396fbf68f8637 #}

Issue relacionada: [1245191](https://crbug.com/1245191)

{% Partial 'devtools/reach-out.md' %}
{% Partial 'devtools/whats-new.md' %}
