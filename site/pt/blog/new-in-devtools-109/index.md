---
layout: 'layouts/blog-post.njk'
title: 'O que há de novo no DevTools (Chrome 109)'
authors:
  - jecelynyeen
date: 2023-01-15
description: 'Opções de cópia de uma etapa no gravador, nomes reais das funções nas gravações de performance e muito mais.'
hero: 'image/dPDCek3EhZgLQPGtEG3y0fTn4v82/Me4Bc5gTnsFtKLNWviUy.png'
alt: ''
tags:
  - new-in-devtools
  - devtools
  - chrome-109
---

*Tradução realizada por [Lucas Santos](https://lsantos.dev). Revisão por [Alvaro Camillo Neto](https://www.linkedin.com/in/alvarocamillont/).*

{% Partial 'devtools/banner.md' %}

<!-- Translation instructions:
  1. Remove the "draft: true" tag above when submitting PR
  2. Provide translations under each of the English commented original content
  3. Translate the "description" tag above
  4. Translate all the <img> alt text
  5. Update the sites/pt/_partials/devtools/whats-new.md file -->


<!-- ## Recorder: Copy as options for steps, in-page replay, step’s context menu {: #recorder } -->
## Gravador: opção "copiar como" para etapas, reprodução na página, no menu de contexto da etapa {: #recorder }

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/uCqjrGj716ZbDJ4N37dl.png", alt="Novas opções de cópia na página do gravador.", width="800", height="615" %}

<!-- Open an existing user flow in the **Recorder**. Previously, when you replayed the user flow, DevTools would always start the replay by navigating to or reloading the page. -->
Abra um fluxo de usuário existente no **Gravador**. Anteriormente, quando você repetia o fluxo do usuário, o DevTools sempre iniciava a reprodução navegando ou recarregando a página.

<!-- With the latest updates, the **Recorder** shows the navigation step separately. You can right-click and remove it to perform in-page replay!  -->
Com as atualizações mais recentes, o **Gravador** mostra a etapa de navegação separadamente. Você pode clicar com o botão direito do mouse e removê-lo para executar a reprodução na página!

<!-- Apart from that, you can right-click a step and copy it to the clipboard in the **Recorder* panel instead of exporting the whole user flow. It works with [extensions](https://goo.gle/recorder-extension) too. For example, try to copy a step as a [Nightwatch Test](https://bit.ly/nightwatch-recorder) script. With this feature, you can update any existing script with ease. -->
Além disso, você pode clicar com o botão direito do mouse em uma etapa e copiá-la para a área de transferência no painel **Gravador** em vez de exportar todo o fluxo do usuário. Funciona com [extensões](https://goo.gle/recorder-extension) também. Por exemplo, tente copiar uma etapa como um script de testes do [Nightwatch](https://bit.ly/nightwatch-recorder). Com esse recurso, você pode atualizar qualquer script existente com facilidade.

<!-- Previously, you could access the step menu only through the 3-dot button. You can now right-click anywhere on the step to access the menu. -->
Anteriormente, você podia acessar o menu de etapas apenas por meio do botão dos 3 pontos. Agora você pode clicar com o botão direito do mouse em qualquer lugar na etapa para acessar o menu.

Issues relacionadas: [1322313](https://crbug.com/1322313), [1351649](https://crbug.com/1351649), [1322313](https://crbug.com/1322313), [1339767](https://crbug.com/1339767)

<!-- ## Show actual function names in performance’s recordings {: #performance } -->
## Mostra os nomes das funções reais nas gravações da performance {: #performance }

<!-- The **Performance** panel now shows the actual function names and their sources in the trace if there’s a sourcemap. -->
O painel **Desempenho** agora mostra os nomes das funções reais e suas origens no rastreamento, se houver um sourcemap.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/9pHMVM1ARXrlyLoTziVA.png", alt="Mostrar a comparação antes e depois da exibição dos nomes das funções no painel Desempenho.", width="800", height="509" %}

<!-- In this example, a source file is minified during production. For example, the `sayHi` function is minified as `n`, and the `takeABreak` function is minified as `o` in this [demo](https://clinquant-mousse-2f2396.netlify.app/). -->
Neste exemplo, um código fonte é reduzido durante a produção. Por exemplo, a função `sayHi` é minificada como `n`, e a função `takeABreak` é minificada como `o` nesta [demonstração](https://clinquant-mousse-2f2396.netlify.app/).

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/ywER8cdQUNYrdAaBJTKT.png", alt="Mostrar arquivos antes e depois da minificação.", width="800", height="392" %}

<!-- Previously, when you recorded a trace in the **Performance** panel, the trace only showed you the minified function names. This made it harder to debug.  -->
Anteriormente, quando você gravava um trace no painel **Desempenho**, o trace mostrava apenas os nomes de função reduzidos. Isso dificultava o debug.

<!-- With the latest changes, DevTools now reads the source map and shows the actual function names and source location.  -->
Com as alterações mais recentes, o DevTools agora lê o sourcemap e mostra os nomes reais das funções e a localização da original.

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/4be8b5bcc00889ca35a455aa093ec242dce8ce6c #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/24d850860bda04864069e6c0d4dab32c8f53bc7f  #}

Issues relacionadas: [1364601](https://crbug.com/1364601), [1364601](https://crbug.com/1364601)


<!-- ## New keyboard shortcuts in the Console & Sources panel {: #keyboard-shortcuts } -->
## Novos atalhos de teclado no painel Console e fontes {: #keyboard-shortcuts }

<!-- You can switch between tabs in the **Sources** panel using: -->
<!-- On MacOS, <kbd>Function</kbd> + <kbd>Command</kbd> + <kbd>Arrow up</kbd> and <kbd>down</kbd> -->
<!-- On Windows and Linux, <kbd>Control</kbd> + <kbd>Page up</kbd> or <kbd>down</kbd> -->
Você pode alternar entre as guias no painel **Fontes** usando:
No MacOS, <kbd>Function</kbd> + <kbd>Command</kbd> + <kbd>Seta para cima</kbd> e <kbd>Seta para baixo</kbd>
No Windows e Linux, <kbd>Control</kbd> + <kbd>Page up</kbd> ou <kbd>Page Down</kbd>

<!-- Moreover, you can navigate the autocomplete suggestions with <kbd>Ctrl</kbd> + <kbd>N</kbd> and <kbd>Ctrl + P</kbd> on MacOS, similar to [Emacs](https://www.gnu.org/software/emacs/). For example, you can type `window.` in the `Console` and use these shortcuts to navigate. -->
Além disso, você pode navegar pelas sugestões de preenchimento automático com <kbd>Ctrl</kbd> + <kbd>N</kbd> e <kbd>Ctrl + P</kbd> no MacOS, semelhante ao [Emacs](https:// www.gnu.org/software/emacs/). Por exemplo, você pode digitar `window.` no `Console` e usar esses atalhos para navegar.

<!-- On top of that, DevTools now accepts <kbd>Arrow Right</kbd> for autocompletion only at the end of line. For example, an autocomplete dialog shows when you are editing something in the middle of the code. When you press the <kbd>Arrow Right</kbd> key, most likely, you want to set the cursor to the next position instead of autocomplete. This UX change better aligns with your authoring workflow. -->
Além disso, o DevTools agora aceita <kbd>Seta para a direita</kbd> para preenchimento automático apenas no final da linha. Por exemplo, uma caixa de diálogo de preenchimento automático é exibida quando você está editando algo no meio do código. Quando você pressiona a tecla <kbd>Seta para a direita</kbd>, provavelmente deseja definir o cursor para a próxima posição em vez do preenchimento automático. Essa mudança de UX se alinha melhor com seu fluxo de trabalho.

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/686acb9789020a511405a53a13ad754a7e928c99 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/09c3ceaa1605b29d1074d0cf310958bdb823149d #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/6468c740419d01d4e13c9ad914001959e78ca782 #}

Issues relacionadas: [1167965](https://crbug.com/1167965), [1172535](https://crbug.com/1172535),  [1371585](https://crbug.com/1371585). [1369503](https://crbug.com/1369503)


<!-- ## Improved JavaScript debugging {: #debugging } -->
## Depuração de JavaScript aprimorada {: #debugging }

<!-- These are some JavaScript debugging improvements in this release: -->
Estas são algumas melhorias de depuração de JavaScript nesta versão:

<!-- - `new.target` is a meta-property that lets you detect whether a function or constructor was called using the new operator. You can now log `new.target` in the **Console** to check its value during debugging. Previously, it would return errors when you entered `new.target`. -->
- `new.target` é uma meta-propriedade que permite detectar se uma função ou construtor foi chamado usando o operador new. Agora você pode registrar `new.target` no **Console** para verificar seu valor durante a depuração. Anteriormente, ele retornaria erros quando você digitasse `new.target`.
   {% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/hKOEn03BZN2IUmWJ1Hho.png", alt="Mostrar antes e depois da comparação da depuração com new.target.", width="800", height="499" %}  
<!-- - A `WeakRef` object lets you hold a weak reference to another object, without preventing that object from getting garbage-collected. DevTools now shows an inline preview for the value and evaluates the weak reference directly in the console during debugging. Previously, you had to explicitly call “deref” on them to resolve it. -->
- Um objeto `WeakRef` permite que você mantenha uma referência fraca a outro objeto, sem impedir que esse objeto seja coletado pelo garbage collector. O DevTools agora mostra uma visualização em linha para o valor e realiza um eval na referência fraca diretamente no console durante a depuração. Anteriormente, você tinha que chamar explicitamente “deref” para resolvê-lo.
   {% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/M7DP4bI7pA07oY7M21wF.png", alt="Mostrar antes e depois da comparação da avaliação WeakRef durante a depuração.", width="800", height="453" %}  
<!-- - Fixed inline preview for shadowed variable. Previously, the display value was incorrect.  -->
- Visualização inline corrigida para variável sombreada. Anteriormente, o valor de exibição estava incorreto.
   {% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/XHL8pnBxhZ65ni7zYV0Q.png", alt="Mostrar antes e depois da visualização em linha de comparação para a variável sombreada.", width="800", height="519" %} 
<!-- - Deobfuscate variable names in `Generator` and `async` functions in the **Scope** pane in the **Sources** panel. -->
- Desofuscação de nomes de variáveis nas funções `Generator` e `async` no painel **Escopo** no painel **Fontes**.

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/8bec401b1934ca55f9d742ee68f72cca4de47931 #}
{# https://chromium.googlesource.com/v8/v8/+/b2892b5f24b7b97ad930356a9376b8a9b2a1d360 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/5b92fd6fc20ab07c9791f374e0e41c54863c7ad3 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/17e5e4392d054dc0a3af46eefff7caef6b4ce975 #}

Issues relacionadas: [1267690](https://crbug.com/1267690), [1246863](https://crbug.com/1246863) [1371322](https://crbug.com/1371322), [1311637](https://crbug.com/1311637)


<!-- ## Miscellaneous highlights {: #misc } -->
## Outros destaques {: #misc }

<!-- These are some noteworthy fixes in this release: -->
Estas são algumas correções dignas de nota nesta versão:

<!-- - Support more hints for inactive CSS properties in the **Styles** pane - inline height and width, flex and grid properties. ([1373597](https://crbug.com/1373597), [1178508](https://crbug.com/1178508), [1178508](https://crbug.com/1178508),[1178508](https://crbug.com/1178508)) -->
- Suporte a mais dicas para propriedades CSS inativas no painel **Estilos** - altura e largura inline, propriedades flex e de grid. ([1373597](https://crbug.com/1373597), [1178508](https://crbug.com/1178508), [1178508](https://crbug.com/1178508),[1178508]( https://crbug.com/1178508))
<!-- - Fixed syntax highlighting. It was not working properly since the recent [code editor](https://codemirror.net/) upgrade in DevTools. ([1290182](https://crbug.com//1290182)) -->
- Correção do realce da sintaxe. Não estava funcionando corretamente desde a recente atualização do [editor de código](https://codemirror.net/) no DevTools. ([1290182](https://crbug.com//1290182))
<!-- - Capture input change events properly after on blur event in the **Recorder**. ([1378488](https://crbug.com/1378488)) -->
- Capture eventos de alteração de entrada corretamente após um evento de desfoque no **Gravador**. ([1378488](https://crbug.com/1378488))
<!-- - Update Puppeteer replay script on export for better debugging experience in the **Recorder**. ([1351649](https://crbug.com/1351649)) -->
- Possibilidade de atualizar o script de repetição do Puppeteer na exportação para uma melhor experiência de depuração no **Gravador**. ([1351649](https://crbug.com/1351649))
<!-- - Support record and replay in the **Recorder** for remote debugging. ([1185727](https://crbug.com/1185727))  -->
- Suporte para gravação e reprodução no **Gravador** para depuração remota. ([1185727](https://crbug.com/1185727))
<!-- - Fixed parsing of special CSS variable names in `var()`. Previously, DevTools didn't support parsing variables with escaped characters like `var(--fo\ o)`. , ([1378992](https://crbug.com/1378992)) -->
- Corrigida a análise de nomes de variáveis CSS especiais em `var()`. Anteriormente, o DevTools não suportava a análise de variáveis com caracteres de escape como `var(--fo\ o)`. , ([1378992](https://crbug.com/1378992))

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/d7bbaba2b82bb3b8c90e8d47c1f36fba2182c5e5 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/2767a58a7b4d306ce737c342d57e0fa330d8b08f  #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/b42002b898216e97acf94627d5d3d745a1ba1252 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/c0cdc185928246ca5b7e320763f8c942c8a1d2db  #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/55382b27eff3539c8aba42ea501eb8de4f7ba57c #}


<!-- ## [Experimental] Enhanced UX in managing breakpoints -->
## [Experimental] UX aprimorado no gerenciamento de breakpoints

{% Aside %}
<!-- To enable the experiment, check **Enable re-designed Breakpoint Sidebar Pane in the Sources Panel** under **Settings** > **Experiments**. -->
Para habilitar o experimento, marque **Enable re-designed Breakpoint Sidebar Pane in the Sources Panel** em **Configurações** > **Experimentos**.
{% endAside %}

<!-- The current **Breakpoints** pane provides little visual aid in overseeing all breakpoints. On top of that, frequently used actions are hidden behind the context menu. -->
O painel **Breakpoints** atual fornece pouca ajuda visual para ver todos os pontos de interrupção. Além disso, as ações usadas com frequência estão ocultas atrás do menu de contexto.

<!-- This experimental UX redesign aims at bringing structure into the **Breakpoints** pane and allow developers to have quick access to commonly used features, in particular editing and removing breakpoints. -->
Este redesenho experimental de UX visa trazer estrutura para o painel **Breakpoints** e permitir que os desenvolvedores tenham acesso rápido aos recursos comumente usados, em particular edição e remoção de pontos de interrupção.

<!-- These are some highlights: -->
Estes são alguns destaques:
<!-- - Both pause options are in the **Breakpoints** pane and labeled with text to make it more self-explanatory. -->
<!-- - Breakpoints are grouped by file, ordered by line/column number, and collapsible.** -->
<!-- - New options to remove and edit breakpoint when hovering over a breakpoint or file name in the **Breakpoint** pane. -->
- Ambas as opções de pausa estão no painel **Breakpoints** e rotuladas com texto para torná-lo mais auto-explicativo.
- Os breakpoints são agrupados por arquivo, ordenados por número de linha/coluna e recolhíveis.**
- Novas opções para remover e editar o breakpoint ao passar o mouse sobre um deles ou no nome do arquivo no painel **Breakpoint**.

<!-- Read the full changes in our [RFC (closed)](https://github.com/ChromeDevTools/rfcs/discussions/3) and leave your feedback [here](https://crbug.com/1394686). -->
Leia as alterações completas em nosso [RFC (fechado)](https://github.com/ChromeDevTools/rfcs/discussions/3) e deixe seu feedback [aqui](https://crbug.com/1394686).

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/ytfyl8qK5rkHQRTS3sXf.png", alt="Mostrar o painel Breakpoint antes e depois da reformulação.", width="800", height="684" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/f2140378e0bb1687b263c226de01b741487ff324 #}
Issues relacionadas: [1346231](https://crbug.com/1346231), [1324904](https://crbug.com/1324904) 


<!-- ## [Experimental] Automatic in-place pretty print -->
## [Experimental] Formatação automática (pretty print) no mesmo painel

{% Aside %}
<!-- To enable the experiment, check **Automatically pretty print in the Sources panel** under **Settings** > **Experiments**. -->
Para ativar o experimento, marque **Automatically pretty print in the Sources** em **Configurações** > **Experimentos**.
{% endAside %}

<!-- The **Sources** panel now automatically pretty print minified source files in-place. You can click on the **pretty print button `{ }` to underdo it. -->
O painel **Fontes** agora mostra automaticamente arquivos de origem reduzidos no próprio painel. Você pode clicar no botão **pretty print** `{ }` para fazer isso.

<!-- Previously, the **Sources** panel shows minified content by default. Developers need to click on the pretty print button manually to format the content. On top of that, the pretty printed content is not displayed in the same file, but in another `::formatted` tab. -->
Anteriormente, o painel **Fontes** mostrava conteúdo minificado por padrão. Devs precisam clicar no botão de formatação manualmente para formatar o conteúdo. Além disso, o conteúdo formatado não é exibido no mesmo arquivo, mas em outra guia `::formatted`.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/twp21SJIisjYpnCWRbWi.png", alt="Mostra um arquivo minificado antes e depois da formatação automática na mesma aba.", width="800", height="501" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/0c96e7f4cdaf2009e5223553cabb606099f85569 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/6ea8fee1935d3c56dfea1edaa752af09579fffcc #}

Issues relacionadas: [1164184](https://crbug.com/1164184)




{% Partial 'devtools/reach-out.md' %}
{% Partial 'devtools/whats-new.md' %}
