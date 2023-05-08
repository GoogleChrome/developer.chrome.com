---
layout: "layouts/blog-post.njk"
title: "O que há de novo no DevTools (Chrome 96)"
authors:
  - jecelynyeen
date: 2021-10-25
updated: 2021-10-25
description:
  "Novo painel de visão geral CSS, emule o recurso de prefers-contrast para CSS media, emule o recurso Auto Dark Theme do Chrome e mais."
hero: 'image/dPDCek3EhZgLQPGtEG3y0fTn4v82/pBsoiFhGUXyAybmAbROh.jpg'
alt: ''
tags:
  - new-in-devtools
  - devtools
  - chrome-96
---

<!-- start: translation instructions -->
<!-- Remove the "draft: true" tag above when submitting PR -->
<!-- Provide translations under each of the English commented original content -->
<!-- Remember to translate the "description" tag above -->
<!-- Remember to translate all the <img> alt text -->
<!-- Remember to update the whats-new.md file as well -->
<!-- end: translation instructions -->

*Tradução realizada por [Alvaro Camillo Neto](https://www.linkedin.com/in/alvarocamillont/).*

{% Partial 'devtools/banner.md' %}

{% YouTube id='3CXbhnaFNEw' %}

<!-- ## Preview feature: New CSS Overview panel {: #css-overview } -->
## Prévia de funcionalidade: novo painel de visão geral CSS  {: #css-overview }
<!-- Use the new **CSS Overview** panel to identify potential CSS improvements on your page.
[Open the **CSS Overview** panel](/docs/devtools/css-overview#open), then click on **Capture overview** to generate a report of your page’s CSS. -->

Use o novo painel **Visão geral CSS** para identificar possíveis melhorias de CSS em sua página.
[Abra o painel **Visão geral CSS**](/docs/devtools/css-overview#open) e clique em **Capture visão geral** para gerar um relatório do CSS da sua página.

<!-- You can further drill down on the information. For example, click on a color in the **Colors** section to view the list of elements that apply the same color. Click on an element to open the element in the **Elements** panel. -->
Você pode expandir as informações. Por exemplo, clique em uma cor na seção **Cores** para visualizar a lista de elementos que aplicam a mesma cor. Clique em um elemento para abri-lo no painel **Elementos**.

<!-- The **CSS Overview** panel is a preview feature. Our team is still actively working on it and we are looking for your [feedback](https://goo.gle/css-overview-feedback) for further enhancements. -->
O painel **Visão geral CSS** é um recurso em desenvolvimento. Nossa equipe ainda está trabalhando ativamente nele e estamos atentos aos seus [comentários](https://goo.gle/css-overview-feedback) para mais melhorias.

<!-- Read [this article](/docs/devtools/css-overview) to learn more on the **CSS Overview** panel. -->
Leia [este artigo](/docs/devtools/css-overview) para saber mais no painel **Visão geral CSS**.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/fXXPihV3bTl82WDJGX51.png", alt="Painel Visão Geral CSS", width="800", height="509" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/ef26abc89035075bbdb08f1b26c1b8fd942ffc04 #}

Issue relacionada: [1254557](https://crbug.com/1254557)

## Experiência de edição e cópia de comprimento de CSS foi restaurada e aprimorada {: #length }

As funcionalidades de **copiar CSS** e **editar como texto** foram restauradas para as propriedades CSS com comprimento. Essas funcionalidades foram retiradas na última versão.

{% Video src="video/dPDCek3EhZgLQPGtEG3y0fTn4v82/3zxmVrRNd767L9zPDvU8.mp4", autoplay="true", muted="true", loop="true", class="screenshot" %}

Além disso, você pode arrastar para ajustar o valor da unidade e atualizar o tipo de unidade por meio do menu suspenso. Este recurso  complementar não deve impactar a edição primária como texto.

{% Video src="video/dPDCek3EhZgLQPGtEG3y0fTn4v82/YkvFZGBllRecee2EAzYf.mp4", autoplay="true", muted="true", loop="true", class="screenshot"  %}

Por favor, reporte via [goo.gle/length-feedback](https://goo.gle/length-feedback) se você encontrar algum problema.

Você pode desativá-lo por meio das **Configurações** > **Experimentos** > **Enable CSS length authoring tools in the Styles pane** caixa de seleção.

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/0042092ccbcdfb5b113c28b9a58c2cf1219b10c4 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/c8f39d4c60841439ebf75d1a2d8fdfe50e1355a9 #}

Issues relacionadas: [1259088](https://crbug.com/1259088), [1172993](https://crbug.com/1172993)


<!-- ## Rendering tab updates  -->
## Atualizações da guia de renderização
<!-- ### Emulate the CSS prefers-contrast media feature {: #prefers-contrast } -->

### Emule o recurso de prefers-contrast para CSS media {: #prefers-contrast }
{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/47fsHvVLiVC9J0eWY9wD.png", alt="Emule o recurso de prefers-contrast para CSS media", width="800", height="483" %}

<!-- The [prefers-contrast](https://www.chromestatus.com/feature/5646323212615680) media feature is used to detect if the user has requested more or less contrast in the page. -->
O recurso [prefers-contrast](https://www.chromestatus.com/feature/5646323212615680) é usado para detectar se o usuário solicitou mais ou menos contraste na página.

<!-- Open the [Command Menu](/docs/devtools/command-menu/), run the **Show Rendering** command, and then set the **Emulate CSS media feature prefers-contrast** dropdown. -->
Abra o [Menu de comandos](/docs/devtools/command-menu/), execute o comando **Mostrar renderização** e, em seguida, marque na lista suspensa **Emular o recurso prefers-contrast**.

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/22cec8dbfa7b46c8b633e3555212556ec6f78df9 #}

Issue relacionada: [1139777](https://crbug.com/1139777)


<!-- ### Emulate the Chrome’s Auto Dark Theme feature  {: #auto-dark-mode } -->
### Emule o recurso Auto Dark Theme do Chrome {: #auto-dark-mode }
<!-- Use DevTools to emulate auto dark theme to easily see how your page looks when Chrome’s [Auto Dark Theme](/blog/auto-dark-theme/) is enabled. -->
Use DevTools para emular o Auto Dark Theme e ver facilmente como sua página fica quando o [Dark Theme do Chrome](/blog/auto-dark-theme/) for ativado.

<!-- Chrome 96 introduces an [Origin Trial](/blog/origin-trials/) for [Auto Dark Theme](/blog/auto-dark-theme/) on Android. With this feature, the browser applies an automatically generated dark theme to light themed sites, when the user has opted into dark themes in the Operating System.  -->
O Chrome 96 apresenta um [Origin Trial](/blog/origin-Trial/) para [Auto Dark Theme](/blog/auto-dark-theme/) no Android. Com esse recurso, o navegador aplica um tema escuro gerado automaticamente a sites com temas claros, quando o usuário opta por esse tipo de tema no sistema operacional.

<!-- Open the [Command Menu](/docs/devtools/command-menu/), run the **Show Rendering** command, and then set the **Emulate auto dark mode** dropdown. -->
Abra o [Menu de comandos](/docs/devtools/command-menu/), execute o comando **Mostrar renderização** e defina o menu suspenso **Emular o modo auto dark**.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/QHS8kupNsTXnKD7HomYy.png", alt="Emular o recurso Auto Dark Theme do Chrome", width="800", height="483" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/0d7e03ffa64ba8432ec9db3e067abeb60cd53d7e #}

Issue relacionada: [1243309](https://crbug.com/1243309)


<!-- ## Copy declarations as JavaScript in the Styles pane {: #copy-as-js } -->
## Copie as declarações como JavaScript no painel Estilos {: #copy-as-js } 
<!-- Two new options are added in the context menu  for you to easily copy CSS rules as JavaScript properties. These shortcuts options are handy especially for developers who are working with [CSS-in-JS](/blog/css-in-js/#what-is-css-in-js)  libraries. -->
Duas novas opções foram adicionadas ao menu de contexto para que você copie facilmente as regras CSS como propriedades JavaScript. Essas opções de atalhos são úteis especialmente para desenvolvedores que estão trabalhando com bibliotecas [CSS-in-JS](/blog/css-in-js/#what-is-css-in-js).

<!-- In the **Styles** pane, right click on a CSS rule. You can select **Copy declaration as JS** to copy a single rule or **Copy all declarations as JS** to copy all rules. -->
No painel **Estilos**, clique com o botão direito em uma regra CSS. Você pode selecionar **Copiar declaração como JS** para copiar uma única regra ou **Copiar todas as declarações como JS** para copiar todas as regras.

<!-- For instance, the example below will copy `padding-left: '1.5rem'` to the clipboard. -->
Por exemplo, o exemplo abaixo irá copiar `padding-left: '1.5rem'` para a área de transferência.

<!-- {% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/M4mKimxhUs6f4hc0wMuO.png", alt="Copiar declaração como JavaScript", width="800", height="469" %} -->

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/ca17a55104e6baf8d4ab360b484111bfa93c9b7f #}

Issue relacionada: [1253635](https://crbug.com/1253635)


<!-- ## New Payload tab in the Network panel {: #payload } -->
## Nova guia Payload no painel Rede {: #payload } 
<!-- Use the new **Payload** tab in the **Network** panel when you inspect a network request with payload. Previously, the payload information is available under the **Headers** tab. -->
Use a nova guia **Payload** no painel **Rede** ao inspecionar uma solicitação de rede com payload. Anteriormente, as informações de payload estavam disponíveis na guia **Headers**.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/1DTIW7zoIqf3VE2WMJmX.png", alt="Guia Payload no painel Rede", width="800", height="488" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/eae72f667aa10a1a8316fbf8b2ac03ff514bb4da #}

Issue relacionada: [1214030](https://crbug.com/1214030)


<!-- ## Improved the display of properties in the Properties pane {: #properties } -->
## Melhoria na exibição de propriedades no painel Propriedades {: #properties }
<!-- The **Properties** pane now shows only relevant properties instead of showing all properties of the instance. DOM prototypes and methods are now removed. -->
O painel **Propriedades** agora mostra apenas propriedades relevantes em vez de mostrar todas as propriedades da instância. Os prototypes e métodos DOM foram removidos.

<!-- Together with the **Properties** pane [enhancements](/blog/new-in-devtools-95/#properties) in Chrome 95, you can now locate the relevant properties easier. -->
Junto com as [melhorias](/blog/new-in-devtools-95/#properties) do painel **Propriedades**  no Chrome 95, agora você pode localizar as propriedades relevantes com mais facilidade.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/hs4KfBZOBeyWHF42Xsuq.png", alt="A exibição de propriedades no painel Propriedades", width="800", height="387" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/f1574e9b550317c481a943fec059d84bfb863564 #}

Issue relacionada: [1226262](https://crbug.com/1226262) 


<!-- ## Console updates -->
## Atualizações de console
<!-- ### Option to hide CORS errors in the Console {: #hide-cors-errors } -->
### Opção para ocultar erros CORS no console {: #hide-cors-errors }
<!-- You can hide CORS errors in the **Console**. As the CORS errors are now reported in the Issues tab, hiding CORS errors in the **Console** can help reduce the clutters. -->
Você pode ocultar erros CORS no **Console**. Como os erros do CORS agora são relatados na guia Problemas, ocultar os erros do CORS no **Console** pode ajudar a melhorar seu foco.

<!-- In the **Console**, click on the **Settings** icon and uncheck the **Show CORS errors in console** checkbox. -->
No **Console**, clique no ícone **Configurações** e desmarque a caixa de seleção **Mostrar erros CORS no console**.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/m3ZzZI5VkYSYCfCLDHUi.png", alt="Opção para ocultar erros CORS no console", width="800", height="502" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/82873eeb1c1430790ad3a2cd2a698135bd6eb3de #}

Issue relacionada: [1251176](https://crbug.com/1251176)


<!-- ### Proper `Intl` objects preview and evaluation in the Console {: #intl } -->
### Visualização e avaliação adequadas de objetos `Intl` no Console {: #intl }

<!-- The [Intl](https://tc39.es/ecma402/#intl-object) objects have proper preview now and are evaluated eagerly in the Console. Previously, the `Intl` objects were not evaluated eagerly. -->
Os objetos [Intl](https://tc39.es/ecma402/#intl-object) têm uma visualização adequada agora e são avaliados previamente no Console. Anteriormente, os objetos `Intl` não eram avaliados previamente.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/ZxGQoDdnilseKTFsxdbC.png", alt="Intl objects in the Console", width="800", height="559" %}

{# https://chromium-review.googlesource.com/c/v8/v8/+/3196175 #}

Issue relacionada: [1073804](https://crbug.com/1073804)


<!-- ### Consistent async stack traces {: #async } -->
### Consistência em stack traces assíncronos {: #async }
<!-- DevTools now reports `async` stack traces for `async` functions to be consistent with other async tasks.  -->
DevTools agora relata stack traces `async` para funções `async` para serem consistentes com outras tarefas assíncronas.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/wuKo84nrDzbhwCnIVU2n.png", alt="stack traces assíncronos", width="800", height="427" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/b2a04e234f25602d1b7e7ff7bd0d39bde3f2c1ec  #}

Issue relacionada: [1254259](https://crbug.com/1254259)


<!-- ### Retain the Console sidebar {: #console-sidebar } -->
### Mantida a barra lateral do console {: #console-sidebar } 
<!-- The Console sidebar is here to stay. In Chrome 94, we announced the [upcoming deprecation of the Console sidebar](/blog/new-in-devtools-94/#deprecated) and ask developers for feedback and concerns. -->
A barra lateral do Console veio para ficar. No Chrome 94, anunciamos a [próxima descontinuação da barra lateral do Console](/blog/new-in-devtools-94/#deprecated) e pedimos feedback e preocupações aos desenvolvedores.
<!-- We have now got enough feedback from the deprecation notice and we will work on improving the sidebar rather than removing it. -->
Agora temos feedback suficiente do aviso de depreciação e trabalharemos para melhorar a barra lateral em vez de removê-la.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/XIsLjvBFSeaTN5BtEgmU.png", alt="Barra lateral do console", width="800", height="502" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/b0650096c934bf60c21d51ae8a51c94e8f907d38 #}

Issues relacionadas: [1232937](https://crbug.com/1232937), [1255586](https://crbug.com/1255586)


<!-- ## Deprecated Application cache pane in the Application panel {: #app-cache } -->
## Obsolescência do Painel de cache no painel do Aplicativo {: #app-cache }
<!-- The [Application cache](/docs/devtools/storage/applicationcache/) pane in the Application panel is now removed as the support for [AppCache](https://web.dev/appcache-removal/) is removed from Chrome and other Chromium-based browsers. -->
O painel [Cache do aplicativo](/docs/devtools/storage/applicationcache/) no painel do aplicativo foi removido pois o suporte para [AppCache](https://web.dev/appcache-removal/) foi removido do Chrome e de outros navegadores baseados em Chromium.

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/de4d15e955d6145674e3885cde8a5a70f1269b79 #}

Issue relacionada: [1084190](https://crbug.com/1084190) 


<!-- ## [Experimental] New Reporting API pane in the Application panel {: #reporting-api } -->
## [Experimental] Novo painel da API de relatórios no painel do aplicativo {: #reporting-api }

{% Aside %}
<!-- To enable the experiment, check the **Enable Reporting API panel in the Application panel** checkbox under **Settings** > **Experiments**. -->
Para ativar o recurso experimental, marque a caixa de seleção **Ativar painel API de relatórios no painel do aplicativo** em **Configurações** > **Experimentos**.
{% endAside %}

<!-- The [Reporting API](https://web.dev/reporting-api/) is designed to help you monitor security violations of your page, deprecated API calls, and more.  -->
A [API de relatórios](https://web.dev/reporting-api/) foi projetada para ajudá-lo a monitorar violações de segurança de sua página, chamadas de API obsoletas e muito mais.
<!-- With this experiment enabled, you can now view the reports status in the new **Reporting API** pane in the **Application** panel.  -->
Com esse experimento habilitado, agora você pode visualizar o status dos relatórios no novo painel **API de relatórios** no painel **Aplicativo**.

Observe que a seção **Endpoints** ainda está em desenvolvimento ativo (não mostrando endpoints de relatório por enquanto).

<!-- Learn more about the **Reporting API** with [this article](https://web.dev/reporting-api/). -->
Saiba mais sobre a **API de relatórios** com [este artigo](https://web.dev/reporting-api/).

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/hbwFqi9aNDOj70FhLXsn.png", alt="Painel de API de relatórios no painel do aplicativo", width="800", height="476" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/c0516bfc7d4cee077452d31b1550ea1d3c594705 #}

Issue relacionada: [1205856](https://crbug.com/1205856)

{% Partial 'devtools/reach-out.md' %}
{% Partial 'devtools/whats-new.md' %}
