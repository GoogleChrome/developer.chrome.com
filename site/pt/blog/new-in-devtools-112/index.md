---
layout: 'layouts/blog-post.njk'
title: "O que há de novo no DevTools (Chrome 112)"
authors:
  - jecelynyeen
date: 2023-03-09
description: ""
hero: 'image/dPDCek3EhZgLQPGtEG3y0fTn4v82/KvzUegFCoxTMzwbKyi67.png'
alt: ''
tags:
  - new-in-devtools
  - devtools
  - chrome-112
---

*Tradução realizada por [Alvaro Camillo Neto](https://www.linkedin.com/in/alvarocamillont/) . Revisão por [Lucas Santos](https://lsantos.dev).*

{% Partial 'devtools/banner.md' %}
{% YouTube id='CrSmjooOEiE' %}

<!-- Translation instructions:
  1. Remove the "draft: true" tag above when submitting PR
  2. Provide translations under each of the English commented original content
  3. Translate the "description" tag above
  4. Translate all the <img> alt text
  5. Update the sites/pt/_partials/devtools/whats-new.md file -->


<!-- ## Recorder updates {: #recorder }  -->
## Atualizações do Gravador {: #recorder } 
<!-- ### Replay extensions support {: #replay-extensions } -->
### Suporte para extensões de replay {: #replay-extensions }
<!-- The **Recorder** introduces support for custom replay options that you can embed into DevTools with an extension. -->
O **Gravador** apresenta o suporte para opções de replay personalizadas que você pode incorporar no DevTools com uma extensão.
<!-- Try out the [example extension](https://github.com/puppeteer/replay/tree/main/examples/chrome-extension-replay). Select the new custom replay option to open the custom replay UI. -->
Experimente a [extensão de exemplo](https://github.com/puppeteer/replay/tree/main/examples/chrome-extension-replay). Selecione a nova opção de reprodução personalizada para abrir a interface de replay personalizada.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/CAQFVtHyds7ByB0YMZht.png", alt="Interface de replay personalizada.", width="800", height="563" %}

<!-- To customize the **Recorder** to your needs and integrate it with your tools, consider developing your own extension: explore the [chrome.devtools.recorder API](/docs/extensions/reference/devtools_recorder/) and check out more [extension examples](https://github.com/puppeteer/replay/tree/main/examples/). -->
Para personalizar o **Gravador** de acordo com suas necessidades e integrá-lo às suas ferramentas, considere desenvolver sua própria extensão: explore a [API chrome.devtools.recorder](/docs/extensions/reference/devtools_recorder/) e confira mais [exemplos de extensão](https://github.com/puppeteer/replay/tree/main/examples/).

{# https://chrome-internal.googlesource.com/devtools/devtools-internal/+/c2102177581f1c74d38502f469d99b20c1835b1c #}
{# https://chrome-internal.googlesource.com/devtools/devtools-internal/+/e304e064dbead1d684b5c61f4fb308b101b4a66b #}

Issue relacionada: [1400243](https://crbug.com/1400243).

<!-- ### Record with pierce selectors {: #pierce-selectors } -->
### Gravação com seletores pierce {: #pierce-selectors }
<!-- In addition to [custom, CSS, ARIA, text, and XPath selectors](/docs/devtools/recorder/reference/#selector), you can now record using [pierce selectors](https://pptr.dev/guides/query-selectors#pierce-selectors-pierce). These selectors behave like CSS ones but can also pierce through shadow roots. -->
Além dos [seletores personalizados, CSS, ARIA, texto e XPath](/docs/devtools/recorder/reference/#selector), agora você pode gravar usando [seletores pierce](https://pptr.dev/guides/ query-selectors#pierce-selectors-pierce). Esses seletores se comportam como os CSS, mas também podem penetrar shadow roots.

<!-- Start a new recording on a page with [shadow DOM](https://web.dev/shadowdom-v1/) and check {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/hmp8j3HiLMCcqPArD9yt.svg", alt="Checkbox.", width="22", height="22" %} **Pierce** in **Selector types to record**. Record your interaction with elements in the shadow DOM and inspect the corresponding step. -->
Inicie uma nova gravação em uma página com [shadow DOM](https://web.dev/shadowdom-v1/) e marque {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/hmp8j3HiLMCcqPArD9yt.svg", alt="Checkbox.", width="22", height="22" %} **Pierce** em **Selecione o tipo de Gravação**. Registre sua interação com elementos no shadow DOM e inspecione a etapa correspondente.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/Spqbf2DG3Fr0D2sc1kgC.png", alt="Configurando o gravador para usar seletores pierce; Seletor pierce em ação.", width="800", height="534" %}

{# https://chrome-internal.googlesource.com/devtools/devtools-internal/+/a3968d1c01dd4d1a00b9aa13c50bfdc66995879e #}

Issue relacionada: [1411188](https://crbug.com/1411188).

<!-- ### Export as a Puppeteer script with Lighthouse analysis {: #puppeteer-lighthouse } -->
### Exportar gravações como um script Puppeteer com análise Lighthouse {: #puppeteer-lighthouse }
<!-- The **Recorder** introduces a new export option: **Puppeteer (including Lighthouse analysis)**. With [Puppeteer](/docs/puppeteer/), you can automate and control Chrome. With [Lighthouse](/docs/lighthouse/), you can capture and improve your website's performance. -->
O **Gravador** apresenta uma nova opção de exportação: **Puppeteer (incluindo análise do Lighthouse)**. Com [Puppeteer](/docs/puppeteer/), você pode automatizar e controlar o Chrome. Com [Lighthouse](/docs/lighthouse/), você pode capturar e melhorar o desempenho do seu site.
<!-- Open your recording, click {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/4dU9UXvsinS4zbgjd8rK.svg", alt="Export.", width="20", height="20" %} **Export**, select the new option, and save the `.js` file. -->
Abra sua gravação, clique em {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/4dU9UXvsinS4zbgjd8rK.svg", alt="Exportar", width="20", height="20" %} **Exportar**, selecione a nova opção e salve o arquivo `.js`.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/ko6OD4tgGwUxqCJScYr9.png", alt="Exportar Puppeteer (incluindo análise do Lighthouse).", width="800", height="584" %}

<!-- [Run the Puppeteer script](/docs/puppeteer/get-started/) to get a Lighthouse report in a `flow.report.html` file. -->
[Execute o script Puppeteer](/docs/puppeteer/get-started/) para obter um relatório Lighthouse em um arquivo `flow.report.html`.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/pfvZ3QX0XhhbDBxpsyBF.png", alt="O relatório do Lighthouse foi aberto no Chrome.", width="800", height="690" %}

{# https://chrome-internal.googlesource.com/devtools/devtools-internal/+/fcaf72d9134e54140cab41c011b7520dd168a340 #}

<!-- ### Get extensions {: #get-extensions } -->
### Obter extensões {: #get-extensions } 
<!-- Explore options to customize your recorder experience, for example, with custom export options. Get extensions for the **Recorder** by clicking the {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/4dU9UXvsinS4zbgjd8rK.svg", alt="Export.", width="20", height="20" %} **Export** > **Get extensions** in a recording. -->
Explore as opções para personalizar sua experiência de gravação, por exemplo, com opções de exportação personalizadas. Obtenha extensões para o **Gravador** clicando em {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/4dU9UXvsinS4zbgjd8rK.svg", alt="Export.", width="20", height="20" %} **Exportar** > **Obter extensões** em uma gravação.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/vwgXoxR0FyArbCHvdvEY.png", alt="A opção Obter extensões no menu suspenso Exportar.", width="800", height="649" %}

<!-- Feel free to [add your own extension](https://github.com/GoogleChrome/developer.chrome.com/edit/main/site/en/docs/devtools/recorder/extensions/index.md) to the list of [Recorder Extensions](/docs/devtools/recorder/extensions/). We look forward to seeing yours on the list! -->
Sinta-se à vontade para [adicionar sua própria extensão](https://github.com/GoogleChrome/developer.chrome.com/edit/main/site/en/docs/devtools/recorder/extensions/index.md) à lista de [Extensões do Gravador](/docs/devtools/recorder/extensions/). Estamos ansiosos para ver a sua extensão na lista!

{# https://chrome-internal.googlesource.com/devtools/devtools-internal/+/21e3d3275c47df8b79c72d1a3e8f9d26cc11fc04 #}
{# https://chrome-internal.googlesource.com/devtools/devtools-internal/+/b6d02827539eb54869cbb75d3705782bfd2c95ae #}

Issues relacionadas: [1417104](https://crbug.com/1417104), [1413168](https://crbug.com/1413168).

<!-- ## Elements > Styles updates {: #elements-styles } -->
## Elementos > Atualizações de estilos {: #elements-styles }
<!-- ### CSS documentation {: #css } -->
### Documentação CSS no painel Estilos {: #css }
<!-- How many times a day do you look up documentation on CSS properties? The **Elements** > **Styles** pane now shows you a short description when you hover over a property. -->
Quantas vezes por dia você procura documentação sobre propriedades CSS? O painel **Elementos** > **Estilos** agora mostra uma breve descrição quando você passa o mouse sobre uma propriedade.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/v0joPkQg0NiMauy0bwwB.png", alt="O tooltip com documentação sobre uma propriedade CSS.", width="800", height="651" %}

<!-- The tooltip also has a **Learn more** link that takes you to an [MDN CSS Reference](https://developer.mozilla.org/docs/Web/CSS/Reference) on this property. -->
O tooltip também tem um link **Saiba mais** que leva você a uma [Referência CSS MDN](https://developer.mozilla.org/docs/Web/CSS/Reference) desta propriedade.

<!-- If you know CSS well, you might find the tooltips bothersome. To turn them all off, check {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/hmp8j3HiLMCcqPArD9yt.svg", alt="Checkbox.", width="22", height="22" %} **Don't show**. -->
Se você conhece bem o CSS, pode achar as dicas incômodas. Para desativá-las, marque {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/hmp8j3HiLMCcqPArD9yt.svg", alt="Checkbox.", width="22", height="22" %} **Não mostrar** .

<!-- To turn them back on, check {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/9gzXiTYY0nZzBxGI6KrV.svg", alt="Settings.", width="24", height="24" %} [**Settings** > **Preferences** > **Elements**](/docs/devtools/settings/preferences/#elements) > {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/hmp8j3HiLMCcqPArD9yt.svg", alt="Checkbox.", width="22", height="22" %} **Show CSS documentation tooltip**. -->
Para ativá-las novamente, marque {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/9gzXiTYY0nZzBxGI6KrV.svg", alt="Configurações.", width="24", height="24" %} [**Configurações** > **Preferências** > **Elementos**](/docs/devtools/settings/preferences/#elements) > {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/hmp8j3HiLMCcqPArD9yt.svg", alt="Checkbox.", width=" 22", height="22" %} **Mostrar dica da documentação CSS**.

{% Aside %}
<!-- DevTools pulls the descriptions for tooltips from [VS Code Custom Data](https://github.com/microsoft/vscode-custom-data). -->
O DevTools extrai as descrições das dicas do [VS Code Custom Data](https://github.com/microsoft/vscode-custom-data).
{% endAside %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/f5266ee227449dbbc3bc599df1b38cdb36cae4cb #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/d4748c98971bfff697f209fe11de892a5b93aca6 #}

Issue relacionada: [1401107](https://crbug.com/1401107).

<!-- ### CSS nesting support {: #nesting } -->
### Suporte de aninhamento de CSS {: #nesting }
<!-- The **Elements** > **Styles** pane now recognizes [CSS Nesting](/articles/css-nesting/) syntax and applies nested styles to the right elements. -->
O painel **Elementos** > **Estilos** agora reconhece a sintaxe [CSS Nesting](/articles/css-nesting/) e aplica estilos aninhados aos elementos certos.
{% Video src="video/NJdAV9UgKuN8AhoaPBquL7giZQo1/Wog2uOaJTV84OtXcHpYH.mp4", autoplay="true", muted="true", loop="true", controls="true", class="screenshot" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/f1ed9b6180cb75fcfd43dfac95ac9a40c35e03df #}

Issue relacionada: [1172985](https://crbug.com/1172985).

<!-- ## Marking logpoints and conditional breakpoints in the Console {: #logpoint } -->
## Destaque de logpoints e breakpoints condicionais no Console {: #logpoint } 
<!-- Further improving the [enhanced breakpoint UX](/blog/new-in-devtools-111/#breakpoint-redesign), the **Console** now marks messages triggered by breakpoints: -->
Nós melhoramos ainda mais a [UX do breakpoint](/blog/new-in-devtools-111/#breakpoint-redesign), o **Console** agora destaca mensagens acionadas por breakpoints:
<!-- - `console.*` calls in [conditional breakpoints](/docs/devtools/javascript/breakpoints/#conditional-loc) with an orange question mark `?` -->
- `console.*` chamadas em [breakpoints condicionais](/docs/devtools/javascript/breakpoints/#condicional-loc) com um ponto de interrogação laranja `?`
<!-- - [Logpoint](/docs/devtools/javascript/breakpoints/#log-loc) messages with pink two dots `..` -->
- [Logpoint](/docs/devtools/javascript/breakpoints/#log-loc) mensagens com dois pontos rosa `..`

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/5udIX9W4LFcDb3H6DuDp.png", alt="Mudanças na forma como o console agora exibe mensagens acionadas por pontos de interrupção: com ícones e link de origem adequado.", width="800", height="566" %}

<!-- The **Console** now gives you proper anchor links to breakpoints in source files instead of `VM<number>` scripts that Chrome creates to run any piece of Javascript on [V8](https://v8.dev/). -->
O **Console** agora fornece links de âncora adequados para breakpoints nos arquivos fonte de origem, em vez de scripts `VM<number>` que o Chrome cria para executar qualquer parte do Javascript no [V8](https://v8.dev/).
<!-- Click the link next to the breakpoint message to jump directly to the breakpoint editor. -->
Clique no link ao lado da mensagem do breakpoint para pular diretamente para o editor do breakpoint.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/8lAz0lb168HXKvhscP2Q.png", alt="O link de âncora ao lado de uma mensagem de logpoint que abre o editor no breakpoint.", width="800", height="811" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/c845a441b0fe05c22f88cdb23463edee2b5985b7 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/9762db476cd7414d3ce351f32a0564421f66901f #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/42448cc63567ac407fd2088597da83aff17c5b55 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/4739f48e50d41025aba3c2af94e61cc3069aa563 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/bb0e41ed3c30bd988c49a76f0cf084f58c0bddc2 #}

Issue relacionada: [1027458](https://crbug.com/1027458).

<!-- ## Ignore irrelevant scripts during debugging {: #ignore-list } -->
## Ignorar scripts irrelevantes durante a depuração {: #ignore-list }
<!-- To help you focus on the most important parts of your code, you can now add irrelevant scripts to the **Ignore List** right from the file tree on the **Sources** > **Page** pane. -->
Para ajudá-lo a se concentrar nas partes mais importantes do seu código, agora você pode adicionar scripts irrelevantes à **Ignore List** diretamente da árvore de arquivos no painel **Código Fonte** > **Página**.
<!-- Right-click any script or folder and select one of the ignore-related options. You may see options to add or remove the script or folder to and from the list. The [Debugger ignores scripts](/docs/devtools/javascript/reference/#show-ignore-listed-frames) added to the list and omits them in the call stack.  -->
Clique com o botão direito do mouse em qualquer script ou pasta e selecione uma das opções relacionadas a ignorar. Você pode ver opções para adicionar ou remover o script ou pasta de e para a lista. O [Debugger ignora scripts](/docs/devtools/javascript/reference/#show-ignore-listed-frames) adicionado à lista e os omite na pilha de chamadas.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/RrL7ZmzMjfhtH4gUW3ST.png", alt="Menus de contexto de uma pasta e script com opções relacionadas a ignorar.", width="800", height="521" %}

<!-- All ignore-listed scripts and folders are grayed out in the file tree. -->
Todos os scripts e pastas listados como ignorados ficam esmaecidos na árvore de arquivos.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/DRI11RoakrLnwLZPOJPO.png", alt="Os scripts e pastas listados para ignorar estão esmaecidos, você pode ocultá-los com uma opção experimental no menu suspenso Mais opções.", width="800", height="542" %}

Se você selecionar um script ignorado, o botão **Configurar** o levará para
{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/9gzXiTYY0nZzBxGI6KrV.svg", alt="Configuracões.", width="24", height="24" %} [**Configurações** > **Ignorar lista**]( /docs/devtools/settings/ignore-list/). Você também pode ocultar códigos fontes ignorados da árvore de arquivos com {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/N5Lkpdwpaz4YqRGFr2Ks.svg", alt="Menu de três pontos.", width="24", height="24" %} > [**Ocultar arquivos fontes listados como ignorados**](/docs/devtools/javascript/reference/#hide-ignore-listed) {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/XfSWf04g2cwpnFcmp40m.svg", alt="Experimental.", width="20", height="20" %}.

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/e95d2f3fd27301945a1a095bae4bbcad57326cd8 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/736762eda6a6f30d0e9c383998624e53ee04a6e2 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/2257f7bca42753d744b56f5b99b461a6f0494131 #}

Issue relacionada: [883325](https://crbug.com/883325).

<!-- ## JavaScript Profiler deprecation started {: #js-profiler-deprecation } -->
## Início da descontinuação do JavaScript Profiler {: #js-profiler-deprecation } 
<!-- As early as [Chrome 58](/blog/devtools-javascript-cpu-profile-migration-2/), the DevTools team planned to eventually deprecate the **JavaScript Profiler** and have Node.js and Deno developers use the **Performance** panel for profiling JavaScript CPU performance. -->
Já no [Chrome 58](/blog/devtools-javascript-cpu-profile-migration-2/), a equipe do DevTools planejava eventualmente descontinuar o **JavaScript Profiler** e fazer com que os desenvolvedores Node.js e Deno usassem o Painel **Desempenho** para criação de perfil de desempenho da CPU do JavaScript.
<!-- This DevTools version (112) starts the [four-phase **JavaScript Profiler** deprecation](https://github.com/ChromeDevTools/rfcs/discussions/2#discussioncomment-5189668). The **JavaScript Profiler** panel now shows the corresponding warning banner. -->
Esta versão do DevTools (112) inicia a [depreciação em quatro fases do **JavaScript Profiler**](https://github.com/ChromeDevTools/rfcs/discussions/2#discussioncomment-5189668). O painel **JavaScript Profiler** agora mostra o banner de aviso correspondente.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/v4S5YWGdBV3nbc3OkGZ3.png", alt="Banner de descontinuação na parte superior do Profiler.", width="800", height="712" %}

<!-- Instead of the **Profiler**, use the [**Performance**](/docs/devtools/performance/reference/#main) panel to profile CPU. -->
Em vez do **Profiler**, use o painel [**Performance**](/docs/devtools/performance/reference/#main) para criar o perfil da CPU.
<!-- Learn more and provide feedback in the corresponding [RFC](https://github.com/ChromeDevTools/rfcs/discussions/2) and [crbug.com/1354548](https://crbug.com/1354548).  -->
Saiba mais e forneça feedback no [RFC](https://github.com/ChromeDevTools/rfcs/discussions/2) e [crbug.com/1354548](https://crbug.com/1354548) correspondentes.

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/71244f613a27289936b979fe515346137d0190f8 #}

Issue relacionada: [1417647](https://crbug.com/1417647).

<!-- ## Emulate reduced contrast {: #reduced-contrast } -->
## Emulação de contraste reduzido {: #reduced-contrast } 
<!-- The [**Rendering**](/docs/devtools/rendering/#open-rendering) tab adds a new option to the [Emulate vision deficiencies](/docs/devtools/rendering/apply-effects/#emulate-vision-deficiencies) list—**Reduced contrast**. With this option, you can discover how your website looks to people with reduced contrast sensitivity. -->
A guia [**Renderização**](/docs/devtools/rendering/#open-rendering) adiciona uma nova opção para a lista de [emulação deficiências de visão](/docs/devtools/rendering/apply-effects/#emulate-vision-deficiencies) — **Contraste reduzido**. Com esta opção, você pode descobrir a aparência do seu site para pessoas com sensibilidade reduzida ao contraste.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/7qrlmuO7R47l5mytvoeQ.png", alt="A opção de contraste reduzido em Renderização > Emular deficiências de visão.", width="800", height="574" %}

<!-- Note that the list options have been updated to tell you what color insensitivity the options represent. -->
Observe que as opções da lista foram atualizadas para informar qual insensibilidade de cor as opções representam.
<!-- With DevTools, you can find and fix all contrast issues at once. For more information, see [Make your website more readable](/docs/devtools/accessibility/contrast/). -->
Com o DevTools, você pode encontrar e corrigir todos os problemas de contraste de uma só vez. Para obter mais informações, consulte [Torne seu site mais legível](/docs/devtools/accessibility/contrast/).

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/0eaaa173c9e2cd357c99f7a275fe1819b86f0b9a #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/768af28f8cf64e10d23b10556b59dc0770cc14b6  #}

Issues relacionadas: [1412719](https://crbug.com/1412719), [1412721](https://crbug.com/1412721).

<!-- ## Lighthouse 10 {: #lighthouse } -->
## Lighthouse 10 {: #lighthouse } 
<!-- The **Lighthouse** panel now runs [Lighthouse 10.0.1](/blog/lighthouse-10-0/). For more details, see [What's new in Lighthouse 10.0.1](/blog/lighthouse-10-0/). -->
O painel **Lighthouse** agora executa [Lighthouse 10.0.1](/blog/lighthouse-10-0/). Para obter mais detalhes, consulte [O que há de novo no Lighthouse 10.0.1](/blog/lighthouse-10-0/).
<!-- **Lighthouse** > {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/9gzXiTYY0nZzBxGI6KrV.svg", alt="Settings.", width="24", height="24" %} > {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/ZtDyFg7cjkxacORB3GQn.svg", alt="Empty checkbox.", width="24", height="24" %} **Legacy navigation** is now disabled by default. This option uses legacy [Lighthouse configuration](https://github.com/GoogleChrome/lighthouse/blob/main/docs/configuration.md) in navigation mode. -->
**Lighthouse** > {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/9gzXiTYY0nZzBxGI6KrV.svg", alt="Configurações.", width="24", height="24" %} > {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/ZtDyFg7cjkxacORB3GQn.svg", alt="Caixa de seleção vazia.", width="24", height="24" %} **Navegação legada** agora está desativada por padrão. Esta opção usa a [configuração do Lighthouse](https://github.com/GoogleChrome/lighthouse/blob/main/docs/configuration.md) legada no modo de navegação.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/mYuX9d2TFaJuWBOYGN5R.png", alt="Navegação legada desativada.", width="800", height="548" %}

<!-- Lighthouse 10 now uses Moto G Power as the [default emulation device](https://github.com/GoogleChrome/lighthouse/pull/14674). DevTools added this device to {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/9gzXiTYY0nZzBxGI6KrV.svg", alt="Settings.", width="24", height="24" %} [**Settings** > **Devices**](/docs/devtools/settings/devices/). -->
O Lighthouse 10 agora usa o Moto G Power como [dispositivo de emulação padrão](https://github.com/GoogleChrome/lighthouse/pull/14674). DevTools adicionou este dispositivo a {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/9gzXiTYY0nZzBxGI6KrV.svg", alt="Configurações.", width="24", height="24" %} [**Configurações** > **Dispositivos**](/docs/devtools/settings/devices/).

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/GpqmLAiuNasdRsfisVS7.png", alt="Moto G Power na lista de Dispositivos.", width="800", height="488" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/d5f9f7b395e2965356dfcaed026b5a1d141c19c6 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/de6c4e5973980ad98d7d1699faa4e1059f102c4d #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/8a6ca7d24e2fa33c6adfef22ee708f489657dee2 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/24e50e4e50bc6e19930df75385c316ba866e9588 #}

Issue relacionada: [772558](https://crbug.com/772558).

<!-- ## Miscellaneous highlights {: #misc } -->
## Outras novidades {: #misc }
<!-- These are some noteworthy fixes in this release: -->
Mais algumas novidades dignas de atenção nessa versão:
<!-- - The [**Sources** > **Breakpoints**](/docs/devtools/javascript/breakpoints/#manage-loc) pane now shows differentiating file paths next to ambiguous file names ([1403924](crbug.com/1403924)). -->
- O painel [**Código Fonte** > **Breakpoints**](/docs/devtools/javascript/breakpoints/#manage-loc) agora mostra caminhos de arquivo diferenciados ao lado de nomes de arquivo ambíguos 
([1403924](crbug.com/1403924)).
<!-- - The [**Main** section](/docs/devtools/performance/reference/#main) in the flame chart of the **Performance** panel now designates `CpuProfiler::StartProfiling` as `Profiler Overhead` ([1358602](https://crbug.com/1358602)). -->
- A [seção **Principal**](/docs/devtools/performance/reference/#main) no diagrama de chamas do painel **Performance** agora designa `CpuProfiler::StartProfiling` como `Profiler Overhead` ([1358602](https://crbug.com/1358602)).
<!-- - DevTools improved autocompletion: -->
- Autocompletar aprimorado do DevTools:
<!--   - **Sources**: Consistent completions of any word ([1320204](https://crbug.com/1320204)). -->
- **Código Fonte**: Conclusões consistentes de qualquer palavra ([1320204](https://crbug.com/1320204)).
<!--   - **Console**: `Arrow down` selects the first suggestion and suggestions get `Tab` hints ([1276960](https://crbug.com/1276960)). -->
- **Console**: `Seta para baixo` seleciona a primeira sugestão e as sugestões recebem dicas `Tab` ([1276960](https://crbug.com/1276960)).
<!-- - DevTools added an [event listener breakpoint](/docs/devtools/javascript/breakpoints/#event-listeners) to let you pause when you open a [Document Picture-in-Picture window](https://wicg.github.io/document-picture-in-picture/#dom-documentpictureinpicture-onenter) ([1315352](https://crbug.com/1315352)). -->
- O DevTools adicionou um [event listener para breakpoint](/docs/devtools/javascript/breakpoints/#event-listeners) para permitir que você faça uma pausa ao abrir uma [janela Picture-in-Picture do documento](https://wicg.github.io/document-picture-in-picture/#dom-documentpictureinpicture-onenter) ([1315352](https://crbug.com/1315352)).
<!-- - DevTools set up a workaround that properly displays Vue2 webpack artifacts as JavaScript ([1416562](https://crbug.com/1416562)). -->
- O DevTools configura uma solução alternativa que exibe corretamente os artefatos do webpack Vue2 como JavaScript ([1416562](https://crbug.com/1416562)).
<!-- - A [**Console** setting](/docs/devtools/settings/preferences/#console) gets a better name: Automatically expand console.trace() messages. ([1139616](https://crbug.com/1139616)). -->
- Uma [configuração **Console**](/docs/devtools/settings/preferences/#console) recebe um nome melhor: Expandir automaticamente as mensagens console.trace(). ([1139616](https://crbug.com/1139616)).

{% Partial 'devtools/reach-out.md' %}
{% Partial 'devtools/whats-new.md' %}
