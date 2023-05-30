---
layout: 'layouts/blog-post.njk'
title: "O que há de novo no DevTools (Chrome 110)"
authors:
  - jecelynyeen
date: 2023-02-13
description: 'Limpeza do painel Desempenho ao recarregar, visualização e realce do código no Gravador e mais.'
hero: 'image/dPDCek3EhZgLQPGtEG3y0fTn4v82/hRuoks9YzxwX2pvyzuLl.png'
alt: ''
tags:
  - new-in-devtools
  - devtools
  - chrome-110
---

*Tradução realizada por [Alvaro Camillo Neto](https://www.linkedin.com/in/alvarocamillont/) . Revisão por [Lucas Santos](https://lsantos.dev).*

{% Partial 'devtools/banner.md' %}
{% YouTube id='CrSmjooOEiE' %}

<!-- Translation instructions:
  1. Remove the "draft: true" tag above when submitting PR
  2. Provide translations under each of the English commented original content
  3. Translate the "description" tag above
  4. Translate all the <img> alt text
  5. Update the sites/es/_partials/devtools/whats-new.md file -->


<!-- ## Clearing Performance Panel on reload {: #perf } -->
## Limpeza do painel Desempenho ao recarregar {: #perf } 
<!-- The **Performance** panel now clears both the screenshot and trace when you click the **Start profiling and reload page** button. -->
O painel **Desempenho** agora limpa a captura de tela e o rastreamento quando você clica no botão **Iniciar criação de perfil e recarregar a página**.
<!-- Previously, the **Performance** panel displayed a timeline with screenshots from previous recordings. This made it difficult to see when the actual measurement started. The panel now always navigates to the `about:blank` page first to guarantee that the recording begins with a blank trace. This aligns with the **Performance Insights** panel which already did the same. -->
Anteriormente, o painel **Desempenho** exibia uma linha do tempo com capturas de tela de gravações anteriores. Isso tornou difícil ver quando a medição real começou. O painel agora sempre navega primeiro para a página `about:blank` para garantir que a gravação comece com um trace em branco. Isso se alinha com o painel **Performance Insights**, que já faz o mesmo.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/JVXCt6hKIxMtf0tCLWwh.png", alt="Limpeza do painel Desempenho ao recarregar.", width="800", height="548" %}


{# https://chromium.googlesource.com/devtools/devtools-frontend/+/0a301d29d165f17a6eceb1adf91bff0c1c2e07eb #}

Issues relacionadas: [1101268](https://crbug.com/1101268), [1382044](https://crbug.com/1382044)


<!-- ## Recorder updates {: #recorder } -->
## Atualizações do Gravador {: #recorder }
<!-- ### View and highlight the code of your user flow in the Recorder {: #recorder-code } -->
### Visualização e realce do código do fluxo de usuário no Gravador {: #recorder-code }
<!-- The **Recorder** now offers split code view, making it easier to view your user flow code. To access the code view, open a user flow and click **Show Code**.  -->
O **Gravador** agora oferece visualização de código com tela dividida, facilitando a visualização do código de fluxo do usuário. Para acessar a visualização do código, abra um fluxo de usuário e clique em **Mostrar código**.
<!-- The  **Recorder**  highlights the corresponding code as you hover over each step on the left, making it easy to track your flow. You can change the code format using the dropdown, which lets you switch between formats such as [Nightwatch Test](https://bit.ly/nightwatch-recorder) script. -->
O **Gravador** destaca o código correspondente conforme você passa o mouse sobre cada etapa à esquerda, facilitando o acompanhamento do seu fluxo. Você pode alterar o formato do código usando o menu suspenso, que permite alternar entre formatos como o script [Nightwatch Test](https://bit.ly/nightwatch-recorder).

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/ZxNNmun9Yfqs97JCAn7C.png", alt="Visualização de código no Gravador.", width="800", height="542" %}

Issue relacionada: [1385489](https://crbug.com/1385489)


<!-- ### Customize selector types of a recording {: #recorder-selector } -->
### Personalize os tipos de seletor de uma gravação {: #recorder-selector }
<!-- You can create recordings that capture only the selector types that matter to you. With the new option to customize selector types when creating a new recording, you can include or exclude selectors such as XPath, ensuring you capture only the selectors you want in your user flows. -->
Você pode criar gravações que capturam apenas os tipos de seletor que são importantes para você. Com a nova opção de personalizar os tipos de seletor ao criar uma nova gravação, você pode incluir ou excluir seletores como XPath, garantindo a captura apenas dos seletores que deseja em seus fluxos de usuário.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/5t2TOY9VA2Uq08Dq2ZhM.png", alt="Nova opção para personalizar os tipos de seletor.", width="800", height="645" %}

Issue relacionada: [1384431](https://crbug.com/1384431)


<!-- ### Edit user flow while recording {: #recorder-edit } -->
### Edite o fluxo do usuário durante a gravação {: #recorder-edit }
<!-- The **Recorder** now allows editing during recording, providing you with the flexibility to make changes in real-time. You no longer need to end the recording to make adjustments. -->
O **Gravador** agora permite a edição durante a gravação, oferecendo flexibilidade para fazer alterações em tempo real. Você não precisa mais terminar a gravação para fazer ajustes.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/1a2S1lizzJ5acRMgjtwH.png", alt="Edição durante a gravação do fluxo do usuário.", width="800", height="619" %}

Issue relacionada: [1381971](https://crbug.com/1381971)


<!-- ## Automatic in-place pretty print {: #pretty-print } -->
## Formatação automática na mesma aba {: #pretty-print }
<!-- The **Sources** panel now automatically pretty prints minified source files in place. You can click on the **pretty print** button `{ }` to undo it. -->
O painel **Sources** agora mostra automaticamente arquivos fonte minificados no local. Você pode clicar no botão **pretty print** `{ }` para desfazê-lo.
<!-- Previously, the **Sources** panel showed minified content by default. To format the content, you had to click the pretty print button manually. On top of that, the pretty-printed content wasn’t displayed in the same tab, but in another `::formatted` tab. -->
Anteriormente, o painel **Sources** mostrava conteúdo minificado por padrão. Para formatar o conteúdo, você tinha que clicar no botão de formatar manualmente. Além disso, o conteúdo formatado não era exibido na mesma aba, mas em outra aba `::formatted`.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/twp21SJIisjYpnCWRbWi.png", alt="Mostra um arquivo minimizado antes e depois da formatação automática no local.", width="800", height="501" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/3ae70742a7fce9657d8fcd578a182635e619cad5 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/0b9c42efb6065c8a697eaf3acd656cb87e3d4f54 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/b6bddcbabb2d977b620758ac20785675053a4db9  #}

Issues relacionadas: [1383453](https://crbug.com/1383453), [1382752](https://crbug.com/1382752), [1382397](https://crbug.com/1382397) 


<!-- ## Better syntax highlight and inline preview for Vue, SCSS and more {: #highlight } -->
## Melhor destaque de sintaxe e visualização inline para Vue, SCSS e outros {: #highlight }
<!-- The **Sources** panel enhanced the syntax highlighting for several widely-used file formats, enabling you to read code more easily and recognize its structure, including Vue, JSX, Dart, LESS, SCSS, SASS, and inline CSS. -->
O painel **Sources** aprimorou o realce de sintaxe para vários formatos de arquivo amplamente usados, permitindo que você leia o código com mais facilidade e reconheça sua estrutura, incluindo Vue, JSX, Dart, LESS, SCSS, SASS e CSS embutido.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/92SB2J5N6ImqJlOY3tIB.png", alt="Destaque de sintaxe no Vue.", width="800", height="550" %}

<!-- In addition, DevTools also improved the inline preview for Vue, inline HTML, and TSX. Hover over a variable to preview its value.  -->
Além disso, o DevTools também melhorou a visualização inline para Vue, HTML inline e TSX. Passe o mouse sobre uma variável para visualizar seu valor.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/uLxVoWz3yyxYvOkgCq7t.png", alt="Pré-visualização Inline para Vue.", width="800", height="700" %}

<!-- Apart from that, DevTools now shows the sourcemap of a stylesheet in the **Sources** panel. For instance, when you open a SCSS file, you can access the related CSS file by clicking on the sourcemap link. -->
Além disso, o DevTools agora mostra o arquivo fonte de origem de uma folha de estilo no painel **Sources**. Por exemplo, quando você abre um arquivo SCSS, pode acessar o arquivo CSS relacionado clicando no link sourcemap.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/bK6TMGR8c6285bUlrIbx.png", alt="Link do sourcemap para SASS.", width="800", height="745" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/c9af6b86b85bf23f9ed07d68b2d58b45910426de #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/4f330a0d5cef6e74b5b73f258e55cc0960769bca #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/9ec6a8092e7b45fc403d571982d1b214181d9695 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/5a02aca17849514b1e2bc828f78aedece5161dfa #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/c0928e31ba0ed2e81456f0109d323dd09768cfe1 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/992cc762b6790a7bd1a0d5c12ed0169270ac7dd0 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/f2bc726458c3d6507be9a4b56845b789c7ce653e #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/b77b77646c6257ab80893f5d1b5d9607a969c0e5 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/6f1ab763383c7641644f7fd4f88c49465a70ed01 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/11bdafdbbd9bd153aea84b1fe03db4dff89d3aa9 #}

Issues relacionadas: [1385374](https://crbug.com/1385374), [1385632](https://crbug.com/1385632), [1385281](https://crbug.com/1385281), [1385269](https://crbug.com/1385269), [1383892](https://crbug.com/1383892), [1361862](https://crbug.com/1361862), [1383451](https://crbug.com/1383451), [1392106](https://crbug.com/1392106), [1149734](https://crbug.com/1149734)


<!-- ## Ergonomic and consistent Autocomplete in the Console {: #console } -->
## Autocomplete ergonômico e consistente no console {: #console }
<!-- DevTools enhances the autocompletion experience by implementing the following changes: -->
O DevTools aprimorou a experiência de autocomplete implementando as seguintes alterações:
<!-- - `Tab` is always used for autocompletion. -->
- `Tab` é sempre usado para autocomplete.
<!-- - The behavior of `Arrow right` and `Enter` varies based on context. -->
- O comportamento de `Seta para a direita` e `Enter` varia de acordo com o contexto.
<!-- - The autocompletion experience is consistent across text editors, in the **Console**, **Sources**, and **Elements** panels  -->
- A experiência de autocomplete é consistente em todos os editores de texto, nos painéis **Console**, **Sources** e **Elements**
<!-- For example, here is what happens when you type `cons` in the **Console**: -->
Por exemplo, aqui está o que acontece quando você digita `cons` no **Console**:
<!-- - The **Console** displays a list of autocomplete suggestions, with a subtle dotted border around the top option indicating that navigation has not yet begun. -->
- O **Console** exibe uma lista de sugestões de preenchimento automático, com uma borda pontilhada sutil ao redor da opção superior, indicando que a navegação ainda não começou.
  {% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/kSTUPmkQK3HzE7BElmAK.png", alt="Borda pontilhada ao redor da opção de preenchimento automático superior.", width="800", height="580" %}

<!-- - The **Console** executes the line when you press `Enter`. Previously, it would automatically complete the line with the top suggestion. To auto-complete, press either `Tab` or `Arrow Right`. -->
- O **Console** executa a linha quando você pressiona `Enter`. Anteriormente, completava automaticamente a linha com a sugestão superior. Para completar automaticamente, pressione `Tab` ou `Seta para a direita`.
  {% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/7SZ8AM51vI7WEIovjUDX.png", alt="Executa a linha em Enter.", width="800", height="549" %}

<!-- - The **Console** highlights the selected option as you navigate through the suggestion list using the `Arrow up` and `Arrow down` shortcuts. -->
- O **Console** destaca a opção selecionada conforme você navega pela lista de sugestões usando os atalhos `Seta para cima` e `Seta para baixo`.
  {% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/XxjZu5GrFnPEUZhoQN0i.png", alt="Destaques durante a navegação de sugestões.", width="800", height="580" %}

<!-- - To auto-complete with the selected option during navigation, use the keyboard keys `Tab`, `Enter`, or `Arrow Right`. -->
- Para preencher automaticamente com a opção selecionada durante a navegação, use as teclas do teclado `Tab`, `Enter` ou `Seta para a direita`.
  {% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/YU89q0lRFsocpdXS6ZMO.png", alt="Preenchimento automático com a opção selecionada durante a navegação.", width="800", height="360" %}

<!-- - When editing in the middle of code, for example, when the cursor is between `n` and `s`, use `Tab` for autocompletion, `Enter` to execute the line, and `Arrow Right` to move the cursor forward. -->
- Ao editar no meio do código, por exemplo, quando o cursor estiver entre `n` e `s`, use `Tab` para preenchimento automático, `Enter` para executar a linha e `Seta para a direita` para mover o cursor para frente .
  {% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/4jiMQ2btaT4MX7Y3VqgH.png", alt="Edição no meio do código.", width="800", height="549" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/00103b19eec2ba086c608b79ff34b696fe07bb62 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/89f259ddb6c36f486108e0dc9ccb4d4125a04917 #}

Issues relacionadas: [1399436](https://crbug.com/1399436), [1276960](https://crbug.com/1276960)


<!-- ## Miscellaneous highlights {: #misc } -->
## Outros destaques {: #misc }
<!-- These are some noteworthy fixes in this release: -->
Estas são algumas correções dignas de nota nesta versão:

<!-- - A regression issue in DevTools, where it failed to stop at the `debugger` statement in inline scripts, has been resolved. ([1385374](https://crbug.com/1385374)) -->
- Um problema de regressão no DevTools, onde, ao parar na instrução `debugger` em scripts embutidos, gerava uma falha foi resolvido. ([1385374](https://crbug.com/1385374))
<!-- - A new **Console** setting that allows you to expand or collapse `console.trace()` messages by default. Toggle the settings via **Settings** > **Preferences** >  **Expand console.trace() messages by default**. ([1139616](https://crbug.com/1139616)) -->
- Uma nova configuração do **Console** que permite expandir ou recolher mensagens `console.trace()` por padrão. Alterne as configurações em **Configurações** > **Preferências** > **Expandir mensagens console.trace() por padrão**. ([1139616](https://crbug.com/1139616))
<!-- - The [Snippets](/docs/devtools/javascript/snippets/) pane in the **Sources** panel supports enhanced autocomplete, similar to the **Console**. ([772949](https://crbug.com/772949))  -->
- O painel [Snippets](/docs/devtools/javascript/snippets/) no painel **Sources** oferece suporte ao preenchimento automático aprimorado, semelhante ao **Console**. ([772949](https://crbug.com/772949))
  {% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/thkb1CYO0yYiGHll7Yp8.png", alt="Preenchimento automático em Snippets.", width="800", height="417" %}


{% Partial 'devtools/reach-out.md' %}
{% Partial 'devtools/whats-new.md' %}
