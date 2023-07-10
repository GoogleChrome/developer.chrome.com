---
layout: "layouts/blog-post.njk"
title: "O que há de novo no DevTools (Chrome 98)"
authors:
  - jecelynyeen
date: 2022-01-13
updated: 2022-01-13
description:
  "Árvore de acessibilidade da página, alterações mais precisas na guia Alterações, e mais."
hero: 'image/dPDCek3EhZgLQPGtEG3y0fTn4v82/ko8jGKESqaHtmmPh0faC.jpg'
alt: ''
tags:
  - new-in-devtools
  - devtools
  - chrome-98
---

*Tradução realizada por [Alvaro Camillo Neto](https://www.linkedin.com/in/alvarocamillont/). Revisão por [Lucas Santos](https://lsantos.dev)*

{% Partial 'devtools/banner.md' %}

{% YouTube id='YqkIS88VulM' %}

<!-- start: translation instructions -->
<!-- 1. Remove the "draft: true" tag above when submitting PR -->
<!-- 2. Provide translations under each of the English commented original content -->
<!-- 3. Translate the "description" tag above -->
<!-- 4. Translate all the <img> alt text -->
<!-- 5. Update the whats-new.md file -->
<!-- end: translation instructions -->

<!-- ## Preview feature: Full-page accessibility tree {: #a11y-tree } -->
## Prévia de funcionalidade: Árvore de acessibilidade da página {: #a11y-tree } 
<!-- The new **Full-page accessibility tree** makes it easier for you to get an overview of the full-page [accessibility tree](/blog/full-accessibility-tree/#what-is-the-accessibility-tree) and help you better understand how your web content is exposed to assistive technology.  -->
A nova  **Árvore de acessibilidade da página** facilita a obtenção de uma visão geral da [árvore de acessibilidade](/blog/full-accessibility-tree/#what-is-the-accessibility-tree) da página e irá ajudar a entender melhor como seu conteúdo da web é exposto à tecnologia assistiva.
<!-- In the **Elements** panel, open the **Accessibility** pane and select **Enable full-page accessibility tree** checkbox. Then, reload DevTools and you will see a new accessibility button in the **Elements** panel. -->
No painel **Elementos**, abra o painel **Acessibilidade** e marque a caixa de seleção **Ativar árvore de acessibilidade da página**. Em seguida, recarregue o DevTools e você verá um novo botão de acessibilidade no painel **Elementos**.
<!-- Click on it to toggle to the **Full-page accessibility tree** view. You can expand nodes or click to see details in the  **Accessibility** pane. -->
Clique nele para alternar para a visualização **Árvore de acessibilidade da página**. Você pode expandir os nós ou clicar para ver os detalhes no painel **Acessibilidade**.
<!-- Previously, the accessibility tree was available in the **Accessibility** pane. The view is limited, it only enables you to explore a single node and its ancestors. -->
Anteriormente, a árvore de acessibilidade estava disponível no painel **Acessibilidade**. A visualização era limitada, apenas permitindo explorar um único nó e seus ancestrais.
<!-- Our team is still actively working on this preview feature. We are looking for your [feedback](https://goo.gle/devtools-a11y-tree-feedback) for further enhancements! -->
Nossa equipe ainda está trabalhando ativamente neste recurso de visualização. Queremos seu [feedback](https://goo.gle/devtools-a11y-tree-feedback) para mais melhorias!

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/o4BY07JabERFd6OieU8b.png", alt="Árvore de acessibilidade da página", width="800", height="505" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/847a06a6535111826f898175b210dbe0948277a0 #}

Issue Relacionada: [887173](https://crbug.com/887173)


<!-- ## More precise changes in the Changes tab {: #changes }  -->
## Alterações mais precisas na guia Alterações {: #changes } 
<!-- The code changes in the **Changes** tab is pretty-printed automatically.  -->
As alterações de código na guia **Alterações** são impressas automaticamente.
<!-- Previously, it was hard to trace the actual changes of minified source code because all the code is shown in a single line.  -->
Anteriormente, era difícil rastrear as mudanças reais do código-fonte minificado porque todo o código era mostrado em uma única linha.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/aup2bT490dkvuBu3o4DS.png", alt="Guia Alterações", width="800", height="450" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/4382b533525c65fbdb1785eda2babf035ad8bcb8 #}

Issues Relacionadas: [1238818](https://crbug.com/1238818), [1268754](https://crbug.com/1268754) , [1086491](https://crbug.com/1086491)


<!-- ## Set longer timeout for user flow recording {: #recorder-timeout } -->
## Defina um tempo limite mais longo para a gravação do fluxo do usuário {: #recorder-timeout }
<!-- You can now adjust the **Timeout** settings in the [Recorder](/docs/devtools/recorder/) for all steps or a specific step. This is useful especially for pages with slow network requests and lengthy animation. -->
Agora você pode ajustar as configurações de **Tempo limite** no [Gravador](/docs/devtools/recorder/) para todas as etapas ou uma etapa específica. Isso é útil especialmente para páginas com solicitações de rede lentas e animações longas.
<!-- For example, I [recorded a user flow](/docs/devtools/recorder/#record) on this [demo page](https://jec.fish/demo/pup-slow-result) to load and click on the menu item. However, the loading of the menu items is slow (it takes 6 seconds). The [replay](/docs/devtools/recorder/#replay) of this user flow failed because it exceeds 5 seconds  (the default timeout). -->
Por exemplo, foi [gravado um fluxo de usuário](/docs/devtools/recorder/#record) nesta [página de demonstração](https://jec.fish/demo/pup-slow-result) para carregar e clicar no item do menu. No entanto, o carregamento dos itens do menu é lento (demora 6 segundos). O [replay](/docs/devtools/recorder/#replay) deste fluxo de usuário falhou porque excede 5 segundos (o tempo limite padrão).
<!-- We can use the new **Timeout** settings to fix this. Expand the step which we click on the menu item. [Edit the step](/docs/devtools/recorder/#edit-steps) by  **Add timeout** and set it to **6000** milliseconds (equal to 6s). -->
Podemos usar as novas configurações de **Tempo limite** para corrigir isso. Expanda a etapa em que clicamos no item de menu. [Edite a etapa](/docs/devtools/recorder/#edit-steps) **Adicione tempo limite** e defina-o como **6000** milissegundos (igual a 6s).
<!-- Optionally, you can adjust the **Timeout** in the **Replay settings** for all the steps. Expand the **Replay settings** and edit the **Timeout** value.  -->
Opcionalmente, você pode ajustar o **Tempo limite** nas **Configurações de repetição** para todas as etapas. Expanda as **Configurações de repetição** e edite o valor de **Tempo limite**.
{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/y7RDpIp3pd2n6Vnxc5Du.png", alt="Configurações de tempo limite para gravação de fluxo do usuário", width="800", height="530" %}

Issue Relacionada: [1257499](https://crbug.com/1257499)


<!-- ## Ensure your pages are cacheable with the Back/forward cache tab {: #bfcache } -->
## Verifique se suas páginas podem ser armazenadas em cache com a guia Cache Voltar/Avançar {: #bfcache } 
<!-- [Back/forward cache (or bfcache)](https://web.dev/bfcache/) is a browser optimization that enables instant back and forward navigation.  -->
[Cache de retorno/avanço (ou bfcache)](https://web.dev/bfcache/) é uma otimização do navegador que permite a navegação instantânea de retorno e avanço.
<!-- The new **Back/forward cache** tab can help you test your pages to ensure they're optimized for bfcache, and identify any issues that may be preventing them from being eligible. -->
A nova guia **Cache de retorno/avanço** pode ajudar você a testar suas páginas para garantir que elas sejam otimizadas para bfcache e identificar quaisquer problemas que possam estar impedindo que elas sejam qualificadas.
<!-- To test a particular page, navigate to it in Chrome and then in DevTools go to **Application** > **Back-forward Cache**. Next, click the **Test back/forward cache** button and DevTools will attempt to navigate away and back to determine whether the page could be restored from bfcache. -->
Para testar uma página específica, navegue até ela no Chrome e, em DevTools, vá para **Aplicação** > **Cache de retorno/avanço**. Em seguida, clique no botão **Testar cache de retorno/avanço** e o DevTools tentará navegar para fora e para trás para determinar se a página pode ser restaurada do bfcache.
<!-- As web developers, it's critical to know how to optimize your pages for bfcache across all browsers because it will significantly improve the browsing experience for users—especially those with slower networks or devices.  -->
Como desenvolvedores da web, é fundamental saber como otimizar suas páginas para bfcache em todos os navegadores, pois isso melhorará significativamente a experiência de navegação dos usuários, especialmente aqueles com redes ou dispositivos mais lentos.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/4OrWjuRgG1bB0AupcMmS.png", alt="Cache de retorno/avanço", width="800", height="516" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/f4b1333582da2410e5bc8715998b96a83b924625 #}

Issue Relacionada: [1110752](https://crbug.com/1110752)


<!-- ## New Properties pane filter {: #properties } -->
## Novo filtro do painel Propriedades {: #properties }
<!-- If you want to focus on a specific property in the **Properties** pane, you can now type that property name or value in the new **Filter** textbox.  -->
Se quiser se concentrar em uma propriedade específica no painel **Propriedades**, digite o nome ou valor dessa propriedade na nova caixa de texto **Filtro**.
<!-- By default, properties whose value is `null` or `undefined` are not shown. Enable the **Show all** checkbox to view all properties.  -->
Por padrão, as propriedades cujo valor é `null` ou `undefined` não são mostradas. Ative a caixa de seleção **Mostrar tudo** para visualizar todas as propriedades.
<!-- These enhancements allow you to get to the properties you care for quicker and thus improve your productivity! -->
Estas melhorias permitem chegar mais rapidamente às propriedades de que está analisando e, assim, melhorar a sua produtividade!

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/ewmNloO4ohRxlWRNuEW1.png", alt="Filtro do painel Propriedades", width="800", height="505" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/0980f52facf75b6c03e14472d13fe27968d4732b #}  
  
Issue Relacionada: [1269674](https://crbug.com/1269674)


<!-- ## Emulate the CSS forced-colors media feature {: #forced-colors } -->
## Emular o recurso de mídia CSS cores forçadas  {: #forced-colors } 

<!-- The [forced-colors](https://drafts.csswg.org/mediaqueries-5/#forced-colors) CSS media feature is used to detect if the user agent has enabled a forced colors mode (e.g. Windows High Contrast mode) where it enforces a user-chosen limited color palette on the page.  -->
O recurso de mídia CSS [cores forçadas](https://drafts.csswg.org/mediaqueries-5/#forced-colors) é usado para detectar se o agente do usuário ativou um modo de cores forçadas (por exemplo, modo de alto contraste do Windows) onde impõe uma paleta de cores limitada escolhida pelo usuário na página.
<!-- Open the [Command Menu](/docs/devtools/command-menu/), run the **Show Rendering** command, and then set the **Emulate CSS media feature forced-colors** dropdown. -->
Abra o [Menu de comando](/docs/devtools/command-menu/), execute o comando **Mostrar renderização** e defina a lista suspensa **Emular cores forçadas do recurso de mídia CSS**.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/75qGjkzfbXfOEJUhML5i.png", alt="Recurso de mídia de cores forçadas CSS", width="800", height="623" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/db79deee160cda92eda91775a27773611dce8188 #}

Issue Relacionada: [1130859](https://crbug.com/1130859)

<!-- ## Show rulers on hover command {: #show-rulers } -->
## Mostrar réguas no comando hover {: #show-rulers }
<!-- You can now open the [Command Menu](/docs/devtools/command-menu/) and run the **Show rulers on hover** command. The page rulers make it easier to measure the width and height of an element. -->
Agora você pode abrir o [Menu de comando](/docs/devtools/command-menu/) e execute o comando **Mostrar réguas ao passar o cursor**. As réguas de página facilitam a medição da largura e altura de um elemento.
<!-- Previously, you can only enable the page rulers via **Settings** > **Show rulers** checkbox. -->
Anteriormente, você só poderia ativar as réguas de página por meio da caixa de seleção **Configurações** > **Mostrar réguas**.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/FLF6RWO2bm5SMksdayLv.png", alt="Mostrar réguas no comando hover", width="800", height="591" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/5bb8330e0f0a1c90f4a932e35aa5521826c8beea #}

Issue Relacionada: [1270562](https://crbug.com/1270562)


<!-- ## Support `row-reverse` and `column-reverse` in the Flexbox editor {: #flexbox-editor } -->
## Suporte `row-reverse` e `column-reverse` no editor Flexbox {: #flexbox-editor }
<!-- The [Flexbox editor](/blog/new-in-devtools-90/#flexbox) added two new buttons to support `row-reverse` and `column-reverse` in `flex-direction`.  -->
O [editor Flexbox](/blog/new-in-devtools-90/#flexbox) adicionou dois novos botões para suportar `row-reverse` e `column-reverse` em `flex-direction`.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/JHI4frP4MqaydXk19sq2.png", alt="Editor Flexbox", width="800", height="546" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/7c98a6cdc296887350418746b42b2b0a474e7f27 #}

Issue Relacionada: [1263866](https://crbug.com/1263866)


<!-- ## New keyboard shortcuts to replay XHR and expand all search results {: #shortcuts } -->
## Novos atalhos de teclado para reproduzir XHR e expandir todos os resultados da pesquisa {: #shortcuts }
<!-- ### Keyboard shortcuts to replay XHR in the Network panel {: #replay-xhr } -->
### Atalhos de teclado para reproduzir XHR no painel Rede {: #replay-xhr }
<!-- Select a XHR request in the **Network** panel and press **R** on the keyboard to replay the XHR. Previously, you can only replay the XHR via the context menu (right click > **Replay XHR**) -->
Selecione uma solicitação de XHR no painel **Rede** e pressione **R** no teclado para reproduzir o XHR. Anteriormente, você só podia reproduzir o XHR através do menu de contexto (clique com o botão direito do mouse > **Replay XHR**)

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/M3s35wS3A0OoKMeubzMx.png", alt="Replay XHR", width="800", height="530" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/ee4a6138511d69a549677c31b563484e25855d1f #}

Issue Relacionada: [1050021](https://crbug.com/1050021)

 
<!-- ### Keyboard shortcut to expand all search results {: #toggle-search-result } -->
### Keyboard shortcut to expand all search results {: #toggle-search-result }

Atalho de teclado para expandir todos os resultados da pesquisa
<!-- A new shortcut is added in the **Search** tab allowing you to expand and collapse all the search results. Previously, you could only expand and collapse the search results by clicking on one file at a time. -->
Um novo atalho é adicionado à guia **Pesquisar**, permitindo expandir e recolher todos os resultados da pesquisa. Anteriormente, você só podia expandir e recolher os resultados da pesquisa clicando em um arquivo por vez.
<!-- Open the search tab via **Esc** > **3-dot** menu > **Search**. Enter a search string (e.g. function) and press **Enter** to see the list of search results. Focus on the search results and use the following shortcut to expand/collapse the search files: -->
Abra a guia de pesquisa no menu **Esc** > **3 pontos** > **Pesquisar**. Insira uma string de pesquisa (por exemplo, função) e pressione **Enter** para ver a lista de resultados da pesquisa. Analise nos resultados da pesquisa e use o seguinte atalho para expandir/recolher os arquivos de pesquisa:

- **Windows / Linux** - `Ctrl` + `Shift` + `{` or `}`
- **MacOS** - `Cmd` + `Options` + `{` or `}`

<!-- Go to the [keyboard shortcuts](/docs/devtools/shortcuts/) for reference of keyboard shortcuts in Chrome DevTools. -->
Acesse os [atalhos de teclado](/docs/devtools/shortcuts/) para referência de atalhos de teclado no Chrome DevTools.

{% Video src="video/dPDCek3EhZgLQPGtEG3y0fTn4v82/v11XfQLwp7w9qIk440QP.mp4", autoplay="true", muted="false", loop="true",  class="screenshot" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/9cbd6c9453ca55edb0f155068830b1ad69c5136e #}

Issue Relacionada: [1255073](https://crbug.com/1255073)


## Lighthouse 9 no painel Lighthouse {: #lighthouse }

<!-- The **Lighthouse** panel is now running Lighthouse 9. Lighthouse will now list all the elements sharing the same id. -->
O painel **Lighthouse** agora está executando o Lighthouse 9. O Lighthouse agora listará todos os elementos que compartilham o mesmo id.
<!-- Non-unique element id is a common accessibility problem. For instance, the id referenced in an `aria-labelledby` attribute is used on [multiple elements](https://web.dev/duplicate-id-aria/).  -->
ID de elemento não exclusivo é um problema de acessibilidade comum. Por exemplo, o id referenciado em um atributo `aria-labelledby` é usado em [vários elementos](https://web.dev/duplicate-id-aria/).

<!-- Check out the [What’s new in Lighthouse 9.0](/blog/lighthouse-9-0/) for more details on the updates. -->
Confira [O que há de novo no Lighthouse 9.0](/blog/lighthouse-9-0/) para mais detalhes sobre as atualizações.

​{% Img src="image/MtjnObpuceYe3ijODN3a79WrxLU2/gZI1flmYHuUpF637Idzy.png", alt="Uma auditoria do Lighthouse para 'Todos os elementos focalizáveis devem ter um 'id' exclusivo, mostrando dois elementos, ambos com o mesmo 'id'", width="800", height="380", class="screenshot" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/93a4454b7c558d6ca748c718167bc4aa592eaf63 #}

Issue Relacionada: [772558](https://crbug.com/772558)

<!-- ## Improved Sources panel {: #sources } -->
## Painel de fontes melhorado {: #sources }
<!-- Loads of stability improvements in the **Sources** panel as we upgraded it to use [CodeMirror 6](https://codemirror.net/6/). Here are few notable improvements: -->
Muitas melhorias de estabilidade no painel **Sources** conforme atualizamos para usar o [CodeMirror 6](https://codemirror.net/6/). Aqui estão algumas melhorias notáveis:

<!-- - Significantly faster when opening large files (e.g. WASM, JavaScript)
- No more random scrolling when stepping through code
- Improved auto-complete suggestions for editable sources (e.g. snippets, local override)  -->
- Significativamente mais rápido ao abrir arquivos grandes (por exemplo, WASM, JavaScript)
- Não há mais rolagem aleatória ao percorrer o código
- Sugestões de preenchimento automático aprimoradas para fontes editáveis (por exemplo, snippets, substituição local)

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/c1ab112d9002d5c3b3bb70cf2839bac182f0cdb5 #}

Issue Relacionada: [1241848](https://crbug.com/1241848) 

<!-- ## Miscellaneous highlights {: #misc } -->
## Destaques diversos {: #misc }
<!-- These are some noteworthy fixes in this release: -->
Estas são algumas correções dignas de nota nesta versão:
<!-- - Properly displaying the waterfall diagram of network requests. Previously, the style was broken. ([1275501](https://crbug.com/1275501))
- The code highlight was broken when searching in documents with very long lines in the **Sources** panel. It’s now fixed. ([1275496](https://crbug.com/1275496))
- No more duplicate **Payload** tab in network requests. ([1273972](https://crbug.com/1273972)) 
- Fixed the missing layout shifts details in the **Summary** section of the **Performance** panel. ([1259606](https://crbug.com/1259606))
- Support arbitrary characters (e.g. `,`, `.`),  in **Network Search** queries. ([1267196](https://crbug.com/1267196)) -->
- Exibindo corretamente o diagrama em cascata de solicitações de rede. Anteriormente, o estilo estava quebrado. ([1275501](https://crbug.com/1275501))
- O destaque do código foi quebrado ao pesquisar em documentos com linhas muito longas no painel **Fontes**. Agora está corrigido. ([1275496](https://crbug.com/1275496))
- Não há mais guia duplicada **Carga** nas solicitações de rede. ([1273972](https://crbug.com/1273972))
- Corrigidos os detalhes de mudanças de layout ausentes na seção **Resumo** do painel **Desempenho**. ([1259606](https://crbug.com/1259606))
- Suporta caracteres arbitrários (por exemplo, `,`, `.`), em consultas de **Pesquisa de rede**. ([1267196](https://crbug.com/1267196))

<!-- ### [Experimental] Endpoints in the Reporting API pane {: #reporting-api } -->
### [Experimental] Endpoints no painel API de relatórios {: #reporting-api }

{% Aside %}
<!-- To enable the experiment, check the **Enable Reporting API panel in the Application panel** checkbox under **Settings** > **Experiments**. -->
Para ativar a experiência, marque a caixa de seleção **Ativar painel da API de relatórios no painel do aplicativo** em **Configurações** > **Experiências**.
{% endAside %}

<!-- The experimental **Reporting API** pane was introduced in [Chrome 96](/blog/new-in-devtools-96/#reporting-api) to help you monitor the reports generated on your page and their status. -->
O painel experimental **API de relatórios** foi introduzido no [Chrome 96](/blog/new-in-devtools-96/#reporting-api) para ajudar você a monitorar os relatórios gerados em sua página e o status deles.
<!-- The **Endpoints** section is now available. It gives you an overview of all the endpoints configured in the `Reporting-Endpoints` header. -->
A seção **Endpoints** já está disponível. Ele fornece uma visão geral de todos os endpoints configurados no cabeçalho `Reporting-Endpoints`.
<!-- Learn to use the [Reporting API](https://web.dev/reporting-api/) to monitor security violations, deprecated API calls, and more. -->
Aprenda a usar a [API de relatórios](https://web.dev/reporting-api/) para monitorar violações de segurança, chamadas de API obsoletas e muito mais.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/D1fUz4zuS1xwDbszgft1.png", alt="Painel API de relatórios", width="800", height="560" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/a831b26b7ecde579144a42a4faaa7b639789bf3c #} 

Issue Relacionada: [1200732](https://crbug.com/1200732)

{% Partial 'devtools/reach-out.md' %}
{% Partial 'devtools/whats-new.md' %}
