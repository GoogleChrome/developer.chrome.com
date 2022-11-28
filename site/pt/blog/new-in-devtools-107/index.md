---
layout: 'layouts/blog-post.njk'
title: 'O que há de novo no DevTools (Chrome 107)'
authors:
  - jecelynyeen
date: 2022-09-20
description: 'Personalize atalhos de teclado, highlight de objetos C/C++ no Inspetor de Memória muito mais.'
hero: 'image/dPDCek3EhZgLQPGtEG3y0fTn4v82/YP4wAJ8mRPNFX6cVOwSc.png'
alt: ''
tags:
  - new-in-devtools
  - devtools
  - chrome-107

---

*Tradução realizada por [Alvaro Camillo Neto](https://www.linkedin.com/in/alvarocamillont/) . Revisão por [Lucas Santos](https://lsantos.dev).*

{% Partial 'devtools/banner.md' %}

{% YouTube id='1uwv6HbR8HU' %}

<!-- Translation instructions:
  1. Remove the "draft: true" tag above when submitting PR
  2. Provide translations under each of the English commented original content
  3. Translate the "description" tag above
  4. Translate all the <img> alt text
  5. Update the whats-new.md file -->

<!-- Content starts here -->

<!-- ## Customize keyboard shortcuts in DevTools {: #shortcuts } -->
## Personalize atalhos de teclado no DevTools {: #shortcuts } 
<!-- You can now customize keyboard shortcuts for your favorite commands in DevTools. -->
Agora você pode personalizar atalhos de teclado para seus comandos favoritos no DevTools.
<!-- Go to **Settings** > **Shortcuts**, hover over a command and click the **Edit** button (pen icon) to customize the keyboard shortcut. You can create chords (a.k.a multi-key press shortcuts) as well.  -->
Vá para **Configurações** > **Atalhos**, passe o cursor sobre um comando e clique no botão **Editar** (ícone de caneta) para personalizar o atalho de teclado. Você também pode criar chords (também conhecidos como atalhos para pressionar várias teclas).

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/973EfWpxwGOdEF1nN1vv.png", alt="Personalize atalhos de teclado no DevTools.", width="800", height="516" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/d061128ff63a97ab2c6c0d2b5e655e6fcbed829c #}

Issues no Chromium: [1335274](https://crbug.com/1335274), [174309](https://crbug.com/174309)


<!-- ## Toggle light and dark themes with keyboard shortcut {: #toggle-themes } -->
## Alternar temas claros e escuros com atalho de teclado {: #toggle-themes }
<!-- Configure a keyboard shortcut to toggle [light and dark themes](/docs/devtools/rendering/emulate-css/#emulate-css-media-feature-prefers-color-scheme) conveniently. By default, the action doesn’t map to any keyboard shortcut. -->
Configure um atalho de teclado para alternar [temas claros e escuros](/docs/devtools/rendering/emulate-css/#emulate-css-media-feature-prefers-color-scheme) convenientemente. Por padrão, a ação não mapeia para nenhum atalho de teclado.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/7oGdE2eRsgwokWXW9XvA.png", alt="Alterne os temas claros e escuros com atalho de teclado.", width="800", height="576" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/4853b34457f43e41ae9cebc7dfc97c0b734f463a #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/029ac9db0b7e7d08945bcf7a16b407bde50183a1 #}

Issues no Chromium: [1280398](https://crbug.com/1280398), [1226363](https://crbug.com/1226363)


<!-- ## Highlight C/C++ objects in the Memory Inspector {: #memory } -->
## Highlight de objetos C/C++ no Inspetor de Memória {: #memory }
<!-- The [Memory Inspector](/docs/devtools/memory-inspector/) highlights all the bytes of a C/C++ memory object. -->
O [Inspetor de Memória](/docs/devtools/memory-inspector/) destaca todos os bytes de um objeto de memória C/C++.
<!-- Recognizing an object’s bytes among the surrounding WebAssembly memory was a pain point. You have to know the object’s size and count bytes from the object’s start. -->
Reconhecer os bytes de um objeto entre a memória do WebAssembly era um ponto problemático. Você precisava saber o tamanho do objeto e contar bytes desde o início do objeto.
<!-- With this feature,  it helps you tell them apart from the surrounding memory. See [Extending the Memory Inspector for C/C++ debugging](/blog/memory-inspector-extended-cpp/) to learn more about the changes. -->
Com esse recurso, ele ajuda você a diferenciá-los da memória circundante. Consulte [Estendendo o Inspetor de Memória para depuração C/C++](/blog/memory-inspector-extended-cpp/) para saber mais sobre as alterações.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/zqOv2zJTc8ucoeDmQiTo.png", alt="Highlight de objetos C/C++ no Inspetor de Memória.", width="800", height="527" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/d5f3befb47eaaa373d697b42dec6f179baf9d42c #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/c4e6bdb4321cbc0b783647e855a616096beaabfd #}

Issue no Chromium: [1336568](https://crbug.com/1336568)


<!-- ## Support full initiator information for HAR import {: #har } -->
## Suporte a informações completas do Initiator para importação HAR {: #har }
<!-- Full **Initiator** information is available now for [HAR import](/docs/devtools/network/reference/#save-as-har). Previously, the **Network** panel only shows partial initiator information during import. -->
Informações completas do **Initiator** estão disponíveis agora para [importação HAR](/docs/devtools/network/reference/#save-as-har). Anteriormente, o painel **Rede** mostrava apenas informações parciais do iniciador durante a importação.
<!-- The initiator information helps developers to trace the origin of a network request and identify network-related issues.  -->
As informações do initiator ajudam os desenvolvedores a rastrear a origem de uma solicitação de rede e identificar problemas relacionados à rede.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/cthh3ZrpDwo4LJiaY4Uo.png", alt="Suporte a informações completas do Initiator para importação HAR.", width="800", height="376" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/3a659b0711f52a2e200395b85f16ed9f266d1571 #}

Issue no Chromium: [1343185](https://crbug.com/1343185)



<!-- ## Start DOM search after pressing `Enter` {: #search-type } -->
## Inicie a pesquisa DOM depois de pressionar `Enter` {: #search-type }
<!-- You can now disable the **Search as you type** setting to always start DOM search after pressing <kbd>Enter</kbd>.  -->
Agora você pode desativar a configuração **Pesquisar enquanto digita** para sempre iniciar a pesquisa DOM depois de pressionar <kbd>Enter</kbd>.
<!-- In the **Elements** panel, toggle the search bar with <kbd>Control</kbd> or <kbd>Command</kbd> + <kbd>F</kbd>. As you type a query in the search textbox, the DOM tree will jump to the first matching element and highlight it by default.  -->
No painel **Elementos**, alterne a barra de pesquisa com <kbd>Control</kbd> ou <kbd>Comando</kbd> + <kbd>F</kbd>. À medida que você digita uma consulta na caixa de texto de pesquisa, a árvore DOM salta para o primeiro elemento correspondente e o destaca por padrão.
<!-- For users, especially testers who always work with lengthy search queries, this behavior is not ideal. The DOM tree might jump multiple times as you type in a lengthy search query (e.g. `//div[@id="example"]`). This behavior creates unnecessary motion. -->
Para usuários, especialmente testadores que sempre trabalham com longas consultas de pesquisa, esse comportamento não é o ideal. A árvore DOM pode pular várias vezes enquanto você digita uma consulta de pesquisa longa (por exemplo, `//div[@id="example"]`). Esse comportamento cria movimento desnecessário.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/KgTTYf8XaKkHQ2udJc33.png", alt="Pesquisa no DOM.", width="800", height="505" %}

<!-- Go to **Settings** > **Preferences**, disable **Search as you type**. With this change, the search will start only after you press <kbd>Enter</kbd>. -->
Vá para **Configurações** > **Preferências**, desative **Pesquisar enquanto digita**. Com esta mudança, a busca começará somente depois que você pressionar <kbd>Enter</kbd>.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/HBLiQ5e60g5urU8UT5J7.png", alt="Configuração da pesquisa enquanto digita.", width="800", height="449" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/b4643a4703b4a26945d1446eedc907ac81373e23 #}

Issue no Chromium: [1344526](https://crbug.com/1344526)


<!-- ## Display `start` and `end` icons for `align-content` CSS flexbox properties {: #flexbox } -->
## Exibir ícones `start` e `end` para propriedades flexbox CSS `align-content` {: #flexbox }
<!-- In the **Styles** pane, edit the `align-content` properties in a CSS class with `display: flex` or `display: inline-flex`. The `start` and `end` show in the auto-complete dropdown with icons. -->
No painel **Estilos**, edite as propriedades `align-content` em uma classe CSS com `display: flex` ou `display: inline-flex`. O `start` e o `end` são exibidos no menu suspenso de preenchimento automático com ícones.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/fo10I2mt6bQ357itnYhl.png", alt="propriedades do flexbox do align-content.", width="800", height="424" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/ce2b426818106768d4e6d907cc1f4cd3b9636ca6 #}

Issue no Chromium: [1139945](https://crbug.com/1139945)


<!-- ## Miscellaneous highlights {: #misc } -->
 ## Destaques diversos {: #misc }
<!-- - Display correct message counts in the **Console** sidebar. Previously, the counts didn't refresh when clearing console messages. ([1343311](https://crbug.com/1343311)) -->
 - Exiba as contagens de mensagens corretas na barra lateral do **Console**. Anteriormente, as contagens não eram atualizadas ao limpar as mensagens do console. ([1343311](https://crbug.com/1343311))

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/5dd8494912fa43dfe998c9764ceb1e1763784617 #}


{% Partial 'devtools/reach-out.md' %}
{% Partial 'devtools/whats-new.md' %}
