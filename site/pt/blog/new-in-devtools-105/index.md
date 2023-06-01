---
layout: "layouts/blog-post.njk"
title: "O que há de novo no DevTools (Chrome 105)"
authors:
  - jecelynyeen
date: 2022-08-12
updated: 2022-08-12
description: "Suporte a reprodução passo a passo e eventos com o mouse no Recorder, LCP no painel de insights de desempenho e muito mais."
hero: 'image/dPDCek3EhZgLQPGtEG3y0fTn4v82/oUHM60HZH5YBo9c1GF8B.jpg'
alt: ''
tags:
  - new-in-devtools
  - devtools
  - chrome-105
---

*Tradução realizada por [Alvaro Camillo Neto](https://www.linkedin.com/in/alvarocamillont/) . Revisão por [Lucas Santos](https://lsantos.dev).*

{% Partial 'devtools/banner.md' %}
{% YouTube id='bHw_56RiVsg' %}

<!-- start: translation instructions -->
<!-- + 1. Remove the "draft: true" tag above when submitting PR -->
<!-- + 2. Provide translations under each of the English commented original content -->
<!-- + 3. Translate the "description" tag above -->
<!-- + 4. Translate all the <img> alt text -->
<!-- + 5. Update the whats-new.md file -->


<!-- ## Step-by-step replay in the Recorder {: #recorder } -->
## Replay passo a passo no Recorder {: #recorder }
<!-- You can now set a breakpoint and replay a user flow step by step in the **Recorder** panel. -->
Agora você pode definir um breakpoint e reproduzir um fluxo de usuário passo a passo no painel **Recorder**.
<!-- To set a breakpoint, click on the blue dot next to a step. Replay your user flow, the replay will pause before executing the step. From here, you can continue the replay, execute a step, or cancel the replay. -->
Para definir um breakpoint, clique no ponto azul ao lado de uma etapa. Reproduza seu fluxo de usuário, a reprodução será pausada antes de executar a etapa. A partir daqui, você pode continuar a reprodução, executar uma etapa ou cancelar a reprodução.
<!-- With this feature, you can fully visualize and debug your user flow with ease. -->
Com esse recurso, você pode visualizar e depurar totalmente seu fluxo de usuários com facilidade.
<!-- See [Recorder features reference](/docs/devtools/recorder/reference/) for more information. -->
Consulte [Referência de recursos do Recorder](/docs/devtools/recorder/reference/) para obter mais informações.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/5RqFNkPTbtEXSC4KovNF.png", alt="Replay passo a passo no Recorder", width="800", height="547" %}

Issue relacionada: [1257499](https://crbug.com/1257499)


<!-- ## Support mouse over event in the Recorder panel {: #recorder-hover } -->
## Suporte ao evento do mouse over no painel do Recorder {: #recorder-hover }
<!-- The **Recorder** now supports adding a mouse over (hover) step manually in a recording.  -->
O **Recorder** agora é compatível com a adição manual de uma etapa de passar o mouse (hover) em uma gravação.
<!-- [This demo](https://jec.fish/demo/menu-hover) shows a pop up menu on hover. Try to record a user flow and click a menu item. -->
[Esta demonstração](https://jec.fish/demo/menu-hover) mostra um menu pop-up ao passar o mouse. Tente gravar um fluxo de usuário e clique em um item de menu.
<!-- If you replay the user flow now, it will fail because the **Recorder** doesn’t capture mouse over events automatically during recording. To resolve this, [add a step manually](/docs/devtools/recorder/reference/#add-and-remove-steps) to hover over the selector before clicking the menu item.  -->
Se você reproduzir o fluxo do usuário agora, ele falhará porque o **Recorder** não captura eventos do mouse over automaticamente durante a gravação. Para resolver isso, [adicione uma etapa manualmente](/docs/devtools/recorder/reference/#add-and-remove-steps) para passar o mouse sobre o seletor antes de clicar no item de menu.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/GY1ZkqEU3zbGmhEKoblN.png", alt="Suporte ao evento mouse over no Recorder", width="800", height="488" %}

Issue relacionada: [1257499](https://crbug.com/1257499)


<!-- ## Largest Contentful Paint (LCP) in the Performance insights panel {: #lcp } -->
## Largest Contentful Paint (LCP) no painel de insights de desempenho {: #lcp }
<!-- LCP is an important, user-centric metric for measuring [perceived load speed](https://web.dev/user-centric-performance-metrics/#types-of-metrics). You can now find out the critical paths and root causes of a [Largest Contentful Paint (LCP)](https://web.dev/lcp/). -->
O LCP é uma métrica importante e centrada no usuário para medir a [velocidade de carga percebida](https://web.dev/user-centric-performance-metrics/#types-of-metrics). Agora você pode descobrir os caminhos críticos e as causas-raiz de uma [Largest Contentful Paint (LCP)](https://web.dev/lcp/).
<!-- In a [performance recording](/docs/devtools/performance-insights/#record), click on the LCP badge in the **Timeline**. In the **Details** pane, you can view the LCP score, learn how to fix resources that slow down the LCP and see the critical path for the LCP resource. -->
Em uma [gravação de desempenho](/docs/devtools/performance-insights/#record), clique no selo do LCP na **Linha do tempo**. No painel **Detalhes**, você pode ver a pontuação do LCP, saber como corrigir recursos que tornam o LCP mais lento e ver o caminho crítico para o recurso do LCP.
<!-- See [Performance Insights](/docs/devtools/performance-insights/) to learn how to get actionable insights and improve your website’s performance with the panel. -->
Consulte [Performance Insights](/docs/devtools/performance-insights/) para saber como obter insights acionáveis e melhorar o desempenho do seu site com o painel.
{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/NZZJ1FzXxqj2U2NR0U53.png", alt="LCP no painel de insights de desempenho", width="800", height="751" %}

Issue relacionada: [1326481](https://crbug.com/1326481)


<!-- ## Identify flashes of text (FOIT, FOUT) as potential root causes for layout shifts {: #foit-fout } -->
## Identificação de flashes de texto (FOIT, FOUT) como possíveis causas-raiz para mudanças de layout {: #foit-fout }
<!-- The **Performance insights** panel now detects [flash of invisible text (FOIT) and flash of unstyled text (FOUT)](https://web.dev/preload-optional-fonts/#font-rendering) as potential root causes for layout shifts. -->
O painel **Performance Insights** agora detecta [flash de texto invisível (FOIT) e flash de texto sem estilo (FOUT)](https://web.dev/preload-optional-fonts/#font-rendering) como raiz potencial causas para mudanças de layout.
<!-- To view the potential root causes of a layout shift, click on a screenshot in the **Layout shifts** track. -->
Para ver as possíveis causas principais de uma mudança de layout, clique em uma captura de tela na faixa **Mudanças de layout**.
<!-- See [Optimize WebFont loading and rendering](https://web.dev/optimize-webfont-loading/) to learn the technique to prevent layout shifts.  -->
Consulte [Otimizar carregamento e renderização de WebFont](https://web.dev/optimize-webfont-loading/) para aprender a técnica para evitar mudanças de layout.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/AMN5oD5hlKhPhnq98sIB.png", alt="FOUT no painel de insights de desempenho", width="800", height="497" %}

Issue relacionadas: [1334628](https://crbug.com/1334628), [1328873](https://crbug.com/1328873)


<!-- ## Protocol handlers in the Manifest pane {: #manifest } -->
## Handlers de protocolo no painel Manifesto {: #manifest }
<!-- You can now use DevTools to test the [URL protocol handler registration](https://web.dev/url-protocol-handler/) for [Progressive Web Apps (PWA)](https://web.dev/learn/pwa/). -->
Agora você pode usar o DevTools para testar o [registro do handler do  protocolo da URL](https://web.dev/url-protocol-handler/) para [Progressive Web Apps (PWA)](https://web.dev/learn/ pwa/).
<!-- The URL protocol handler registration lets installed PWAs handle links that use a specific protocol (e.g. [`magnet`](https://wikipedia.org/wiki/Magnet_URI_scheme), `web+example`) for a more integrated experience. -->
O registro do handler de protocolo de URL permite que os PWAs instalados manipulem links que usam um protocolo específico (por exemplo, [`magnet`](https://wikipedia.org/wiki/Magnet_URI_scheme), `web+example`) para uma experiência mais integrada.
<!-- Navigate to the **Protocol Handlers** section via the **Application** > **Manifest** pane. You can view and test all the available protocols here. -->
Navegue até a seção **Handlers de Protocolos** no painel **Aplicação** > **Manifesto**. Você pode visualizar e testar todos os protocolos disponíveis aqui.
<!-- For example, install [this demo PWA](https://protocol-handler.glitch.me/). In the **Protocol Handlers** section, type “americano” and click **Test protocol** to open the coffee page in the PWA.  -->
Por exemplo, instale [este PWA de demonstração](https://protocol-handler.glitch.me/). Na seção **Handlers de Protocolos**, digite “americano” e clique em **Teste protocolo** para abrir a página do café no PWA.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/DuH2YwkYGPpYjnUKln8m.png", alt="Handlers de protocolo no painel Manifesto", width="800", height="402" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/cc2291cce5c5d199540334d01fcfe27207bc5962 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/1aa36584d580ed5aa2caf7a8533f2c89b16ab66b #}

Issue relacionadas: [1300613](https://crbug.com/1300613)


<!-- ## Top layer badge in the Elements panel {: #top-layer } -->
## Selo da camada superior no painel Elementos {: #top-layer }
<!-- Use the [top layer badge](/blog/top-layer-devtools/#top-layer-support-design-in-devtools) to understand the concept of the top layer and visualize how the top layer content changes.  -->
Use o [emblema da camada superior](/blog/top-layer-devtools/#top-layer-support-design-in-devtools) para entender o conceito da camada superior e visualizar como o conteúdo da camada superior muda.
<!-- The [`<dialog>` element](https://web.dev/building-a-dialog-component/) has recently become stable across browsers. When you open a dialog, it is put into a [top layer](/blog/top-layer-devtools/). Top level content renders on top of all the other content.  -->
O elemento [`<dialog>`](https://web.dev/building-a-dialog-component/) tornou-se recentemente estável nos navegadores. Quando você abre uma caixa de diálogo, ela é colocada em uma [camada superior](/blog/top-layer-devtools/). O conteúdo de nível superior é renderizado em cima de todo o outro conteúdo.
<!-- In this [demo](https://jec.fish/demo/dialog), click **Open dialog**.  -->
Nesta [demonstração](https://jec.fish/demo/dialog), clique em **Abrir caixa de diálogo**.
<!-- To help visualize the top layer elements, DevTools adds a top layer container (`#top-layer`) to the DOM tree. It resides after the closing `</html>` tag.   -->
Para ajudar a visualizar os elementos da camada superior, o DevTools adiciona um contêiner da camada superior (`#top-layer`) à árvore DOM. Ele reside após a tag de fechamento `</html>`.
<!-- To jump from the top layer container element to the top layer tree element, click the **reveal** button next to the element or its backdrop in the top layer container. -->
Para pular do elemento do contêiner da camada superior para o elemento da árvore da camada superior, clique no botão **revelar** ao lado do elemento ou de seu plano de fundo no contêiner da camada superior.
<!-- Next to the top layer tree element (for example, the dialog element), click the **top-layer** badge to jump to the top layer container. -->
Ao lado do elemento de árvore da camada superior (por exemplo, o elemento de diálogo), clique no emblema **camada superior** para ir para o contêiner da camada superior.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/pGMsiKw0IhplBMd4hZCv.png", alt="Selo da camada superior no painel Elementos", width="800", height="538" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/a8d58fa6e258423aef2b00ead3aea563629eef43 #}

Issue relacionada: [1313690](https://crbug.com/1313690)


<!-- ## Attach Wasm debugging information at runtime {: #wasm } -->
## Anexar informações de depuração do Wasm em tempo de execução {: #wasm }
<!-- You can now attach DWARF debugging information for wasm during runtime. Previously, the **Sources** panel only supported attaching source maps to JavaScript and Wasm files. -->
Agora você pode anexar informações de depuração DWARF para wasm durante o tempo de execução. Anteriormente, o painel **Fontes** só suportava anexar source maps a arquivos JavaScript e Wasm.
<!-- Open a Wasm file in the **Sources** panel. Right-click in the editor and select **Add DWARF debugging info…**  to attach debugging information on demand.  -->
Abra um arquivo Wasm no painel **Fontes**. Clique com o botão direito do mouse no editor e selecione **Adicionar informações de depuração DWARF…** para anexar informações de depuração sob demanda.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/i5DMV6DFNGRYkrXyBtlg.png", alt="ALT_TEXT_HERE", width="800", height="559" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/112d6ec238ea3b1cb12f1cabc5b988afc74022db  #}

Issue relacionada: [1341255](https://crbug.com/1341255)


<!-- ## Support live edit during debugging {: #live-edit } -->
## Suporta edição ao vivo durante a depuração {: #live-edit }
<!-- You can now edit the top-most function on the stack without restarting the debugger. -->
Agora você pode editar a função mais alta na pilha sem reiniciar o depurador.
<!-- In Chrome 104, DevTools brings back the [restart frame](/blog/new-in-devtools-104/) feature. However, you weren't able to edit the function you are currently paused in. It is common for developers to break in a function and then edit that function while paused.  -->
No Chrome 104, o DevTools traz de volta o recurso [reiniciar frame](/blog/new-in-devtools-104/). No entanto, você não conseguia editar a função na qual está pausado no momento. É comum os desenvolvedores interromperem uma função e editarem essa função enquanto estiverem pausados.
<!-- With this update, the debugger automatically restarts the function with the following restrictions: -->
Com esta atualização, o depurador reinicia automaticamente a função com as seguintes restrições:
<!-- - Only the top-most function can be edited while paused -->
<!-- - No recursive call on the same function further down the stack -->
- Apenas a função mais alta pode ser editada enquanto pausada
- Nenhuma chamada recursiva na mesma função mais abaixo na pilha

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/0PG2PnQUh5bnpIulyj7m.png", alt="edição ao vivo durante a depuração", width="800", height="560" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/b41deeb8b0b228ea4628a49e79a7ce4d8ab32ffa #}

Issue relacionada: [1334484](https://crbug.com/1334484)


<!-- ## View and edit @scope at rules in the Styles pane {: #scope } -->
## Visualize e edite @scope em regras no painel Estilos {: #scope }
<!-- You can now view and edit the [CSS `@scope` at-rules](https://drafts.csswg.org/css-cascade-6/#scope-atrule) in the **Styles** pane.  -->
Agora você pode visualizar e editar a funcionalidade do CSS [`@scope at-rules`](https://drafts.csswg.org/css-cascade-6/#scope-atrule) no painel **Estilos**.
<!-- The `@scope` at rules is part of the [CSS Cascading and Inheritance Level 6 specification](https://drafts.csswg.org/css-cascade-6/). These rules allow developers to scope style rules in CSS. -->
O `@scope` at rules faz parte da [especificação CSS Cascading and Inheritance Level 6](https://drafts.csswg.org/css-cascade-6/). Essas regras permitem aos desenvolvedores definir o escopo das regras de estilo em CSS.
<!-- Open [this demo page](https://codepen.io/miriamsuzanne/details/ZErXZVY) and inspect the hyperlink within the `<div class=”dark-theme”>` element. In the **Styles** pane, view the `@scope` at-rules. Click the rule declaration to edit it. -->
Abra [esta página de demonstração](https://codepen.io/miriamsuzanne/details/ZErXZVY) e inspecione o hiperlink dentro do elemento `<div class=”dark-theme”>`. No painel **Estilos**, veja as regras do `@scope`. Clique na declaração de regra para editá-la.

{% Aside %}
<!-- The CSS `@scope` is currently under development. To test this feature, enable the **Experimental Web Platform features** flag via `chrome://flags/#enable-experimental-web-platform-features`. -->
O CSS `@scope` está atualmente em desenvolvimento. Para testar esse recurso, ative o sinalizador **Recursos da Plataforma Web Experimental** em `chrome://flags/#enable-experimental-web-platform-features`.
{% endAside %}

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/LnkBUWoEl11HGiAD4ag7.png", alt="@scope em regras no painel Estilos", width="800", height="464" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/8b2309caa9ea358bc07d4d48eb976cc3dc6884cd #}

Issue relacionada: [1337777](https://crbug.com/1337777)


<!-- ## Source map improvements {: #sourcemaps } -->
## Melhorias no Source map  {: #sourcemaps }
<!-- Here are a few fixes on source maps to improve the overall debugging experience: -->
Aqui estão algumas correções nos source maps para melhorar a experiência geral de depuração:
<!-- - DevTools now properly resolves source map identifiers with punctuation. Some modern minifiers (for example, [esbuild](https://esbuild.github.io/)) produce sourcemaps that merge identifiers with subsequent punctuation (comma, parentheses, semicolon).  -->
- O DevTools agora resolve corretamente os identificadores do source map  com pontuação. Alguns minifiers modernos (por exemplo, [esbuild](https://esbuild.github.io/)) produzemsourcemap  que mesclam identificadores com pontuação subsequente (vírgula, parênteses, ponto e vírgula).
<!-- - DevTools now resolves source map names for constructors with a `super` call. -->
- DevTools agora resolve nomes de source map  para construtores com uma chamada  de método `super`.

  {% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/6djFfkrtPzXuNYq5m8Vk.png", alt="ALT_TEXT_HERE", width="800", height="441" %}
<!-- - Fixed source map URL indexing for duplicate canonical URLs. Previously, breakpoints were not activated in some files because of duplicate canonical URLs. -->
- Indexação de URL do source map corrigida para URLs canônicos duplicados. Anteriormente, os breakpoints não eram ativados em alguns arquivos devido a URLs canônicos duplicados.

Issue relacionada: [1335338](https://crbug.com/1335338), [1333411](https://crbug.com/1333411)


<!-- ## Miscellaneous highlights {: #misc } -->
## Outras mudanças {: #misc }
<!-- These are some noteworthy fixes in this release: -->
Estas são algumas correções dignas de nota nesta versão:
<!-- - Properly remove a local storage key value pair from the table in the **Application** > **Local Storage** pane when it is deleted. ([1339280](https://crbug.com/1339280)) -->
- Remoção correta de um par de valores de chave de armazenamento local da tabela no painel **Aplicativo** > **Armazenamento local** quando ele for excluído. ([1339280](https://crbug.com/1339280))
<!-- - The color previews are now correctly displayed when viewing CSS files in the **Sources** panel. Previously, their positions were misplaced. ([1340062](https://crbug.com/1340062)) -->
- As visualizações de cores agora são exibidas corretamente ao visualizar arquivos CSS no painel **Fontes**. Anteriormente, suas posições eram equivocadas. ([1340062](https://crbug.com/1340062))
<!-- - Consistently display the CSS flex and grid items in the **Layout** pane, as well as display them as badges in the **Elements** panel. Previously, the flex and grid items were randomly missing in both places. ([1340441](https://crbug.com/1340441), [1273992](https://crbug.com/1273992)) -->
- Exiba consistentemente os itens de grade e flex CSS no painel **Layout**, bem como exiba-os como emblemas no painel **Elementos**. Anteriormente, os itens flex e grid estavam ausentes aleatoriamente em ambos os lugares. ([1340441](https://crbug.com/1340441), [1273992](https://crbug.com/1273992))
<!-- - A new **Creator Ad Script** link is available for [ad frames](https://chromium.googlesource.com/chromium/src/+/master/docs/ad_tagging.md#adtracker) if DevTools found the script that caused the frame to be labeled as an ad. You can open a frame via **Application** > **Frames**. ([1217041](https://crbug.com/1217041)) -->
- Um novo link **Creator Ad Script** está disponível para [ad frames](https://chromium.googlesource.com/chromium/src/+/master/docs/ad_tagging.md#adtracker) se o DevTools encontrar o script que fez com que o frame fosse rotulado como um anúncio. Você pode abrir um frame em **Aplicativo** > **Frames**. ([1217041](https://crbug.com/1217041))

{% Partial 'devtools/reach-out.md' %}
{% Partial 'devtools/whats-new.md' %}
