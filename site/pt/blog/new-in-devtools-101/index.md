---
layout: "layouts/blog-post.njk"
title: "O que há de novo no DevTools (Chrome 101)"
authors:
  - jecelynyeen
date: 2022-04-12
updated: 2022-04-12
description: "Importar e exportar fluxo de usuário como JSON, suporte a cores hwb(), visualize cascade layers no painel Estilos e muito mais."
hero: 'image/dPDCek3EhZgLQPGtEG3y0fTn4v82/IXUYe6fpLmv4pyawdwuS.jpg'
alt: ''
tags:
  - new-in-devtools
  - devtools
  - chrome-101
---

*Tradução realizada por [Alvaro Camillo Neto](https://www.linkedin.com/in/alvarocamillont/). Revisão por [Lucas Santos](https://lsantos.dev)*

{% Partial 'devtools/banner.md' %}

{% YouTube id='u9GRAliBrM8' %}

<!-- ## Import and export recorded user flows as a JSON file  {: #recorder } -->
## Importe e exporte fluxos de usuário gravados como um arquivo JSON  {: #recorder }
<!-- The [Recorder](/docs/devtools/recorder) panel now supports importing and exporting user flow recordings as a JSON file. This addition makes it easier to share user flows and can be useful for bug reporting. -->
O painel [Recorder](/docs/devtools/recorder) agora oferece suporte à importação e exportação de gravações de fluxo do usuário como um arquivo JSON. Essa adição facilita o compartilhamento de fluxos de usuários e pode ser útil para relatórios de bugs.
<!-- For example, download this [JSON file](https://storage.googleapis.com/web-dev-uploads/file/dPDCek3EhZgLQPGtEG3y0fTn4v82/vzQbv2rUfTz2DEmx06Gv.json). You can import it with the import button and [replay the user flow](/docs/devtools/recorder/#replay). -->
Por exemplo, baixe este [arquivo JSON](https://storage.googleapis.com/web-dev-uploads/file/dPDCek3EhZgLQPGtEG3y0fTn4v82/vzQbv2rUfTz2DEmx06Gv.json). Você pode importá-lo com o botão de importação e [reproduzir o fluxo do usuário](/docs/devtools/recorder/#replay).

{% Video src="video/dPDCek3EhZgLQPGtEG3y0fTn4v82/Jy7NEDZs6XJb90EWqETj.mp4", class="screenshot", autoplay=true, controls=true, loop=true, muted=true %}

<!-- Apart from that, you can export the recording as well. After [recording a user flow](/docs/devtools/recorder/#record), click on the export button. There are 3 export options: -->
Além disso, você também pode exportar a gravação. Após [gravar um fluxo de usuário](/docs/devtools/recorder/#record), clique no botão de exportação. Existem 3 opções de exportação:
<!-- - **Export as a JSON file**. Download the recording as a JSON file. -->
<!-- - **Export as a @puppeteer/replay script**. Download the recording as a [Puppeteer Replay](https://github.com/puppeteer/replay) script.  -->
<!-- - **Export as a Puppeteer script** . Download the recording as [Puppeteer](https://pptr.dev/) script. -->
**Exportar como arquivo JSON**. Faça o download da gravação como um arquivo JSON.
**Exportar como script @puppeteer/replay**. Faça o download da gravação como um script de [Puppeteer Replay](https://github.com/puppeteer/replay).
**Exportar como script de Puppeteer** . Faça o download da gravação como script [Puppeteer](https://pptr.dev/).

<!-- Consult [the documentation](/docs/devtools/recorder/#export-flows) to learn more about the differences between these options. -->
Consulte [a documentação](/docs/devtools/recorder/#export-flows) para saber mais sobre as diferenças entre essas opções.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/mcbKR5hpCNXUmdGp4UDP.png", alt="Opções de exportação no painel Gravador", width="800", height="556" %}

Issue relacionada: [1257499](https://crbug.com/1257499)


<!-- ## View cascade layers in the Styles pane {: #layer } -->
## Visualize cascade layers no painel Estilos {: #layer }
<!-- [Cascade layers](/blog/cascade-layers/) enable more explicit control of your CSS files to prevent style-specificity conflicts. This is particularly useful for large codebases, design systems, and when managing third party styles in applications. -->
[Cascade Layers](/blog/cascade-layers/) permitem um controle mais explícito de seus arquivos CSS para evitar conflitos de especificidade de estilo. Isso é particularmente útil para grandes bases de código, sistemas de design e ao gerenciar estilos de terceiros em aplicativos.
<!-- In this [example](https://jec.fish/demo/cascade-layer), there are 3 cascade layers defined: `page`, `component` and `base`. In the **Styles** pane, you can view each layer and its styles. -->
Neste [exemplo](https://jec.fish/demo/cascade-layer), existem 3 camadas em cascata definidas: `page`, `component` e `base`. No painel **Estilos**, você pode visualizar cada camada e seus estilos.
<!-- Click on the layer name to view the layer order. The `page` layer has the highest specificity, therefore the `box` background is green.  -->
Clique no nome da camada para ver a ordem das camadas. A camada `page` tem a maior especificidade, portanto o fundo `box` é verde.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/A0yHsGUcqVCIO3fzKhEz.png", alt="Visualização cascade layers no painel Estilos", width="800", height="490" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/52f5be82ff6ba59343ba65ab7d8e215e46d44d3b #}

Issue relacionada: [1240596](https://crbug.com/1240596)


<!-- ## Support for the hwb() color function {: #hwb } -->
## Suporte para a função de cor hwb() {: #hwb }
<!-- You can now view and edit [HWB color format](https://drafts.csswg.org/css-color/#the-hwb-notation) in DevTools. -->
Agora você pode visualizar e editar [formato de cor HWB](https://drafts.csswg.org/css-color/#the-hwb-notation) no DevTools.
<!-- In the **Styles** pane, hold the **Shift** key and click on any color preview to change the color format. The HWB color format is added. -->
No painel **Estilos**, mantenha pressionada a tecla **Shift** e clique em qualquer visualização de cor para alterar o formato da cor. O formato de cores HWB foi adicionado.
<!-- Alternatively, you can change the color format to HWB in the [color picker](/docs/devtools/css/reference/#color-picker). -->
Como alternativa, você pode alterar o formato da cor para HWB no [seletor de cores](/docs/devtools/css/reference/#color-picker).

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/jW7PXLu6Q5myiKLrsoD3.png", alt="função de cor hwb()", width="800", height="508" %}


<!-- ## Improved the display of private properties {: #private-props } -->
## Melhoria na exibição de propriedades privadas {: #private-props }
<!-- DevTools now properly evaluates and displays private accessors. Previously, you couldn't expand classes with private accessors in the **Console** and the **Sources** panel. -->
O DevTools agora avalia e exibe corretamente as propriedades privadas. Anteriormente, não era possível expandir classes com propriedades privadas no painel **Console** e **Fontes**.
{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/LKir8oYFgNvRZSXMhXa7.png", alt="propriedades privadas no console", width="800", height="498" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/78b2ae5c5baa825c88917098ef57b595d3c94aa0 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/fdc72aa79313d8ec9e7a04461588bcc27aae1535 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/3d369648ae956e799f7337e798bf3453f1c4c440 #}

Issues relacionadas: [1296855](https://crbug.com/1296855), [https://crbug.com/1303407](1303407)


<!-- ## Miscellaneous highlights {: #misc } -->
## Destaques diversos {: #misc }
<!-- These are some noteworthy fixes in this release: -->
Estas são algumas correções notáveis nesta versão:
<!-- - The [Back/forward cache](/blog/new-in-devtools-98/#bfcache) now displays the extension ID which blocked [bfcache](https://web.dev/bfcache/) when present.( [1284548](https://crbug.com/1284548)) -->
<!-- - Fixed autocompletion support for array-like objects, CSS class names, `map.get` and HTML tags. ([1297101](https://crbug.com/1297101), [1297491](https://crbug.com/1297491), [1293807](https://crbug.com/1293807), [1296983](https://crbug.com/1296983)) -->
<!-- - Fixed incorrect highlights when double-clicking on words and undoing autocomplete. ([1298437](https://crbug.com/1298437), [1298667](https://crbug.com/1298667)) -->
<!-- - Fixed comment keyboard shortcut in the **Sources** panel. ([1296535](https://crbug.com/1296535)) -->
<!-- - Re-enable support for using **Alt** (Options) key for multi selection in the **Sources** panel. ([1304070](https://crbug.com/1304070)) -->
- O [cache de retorno/avanço](/blog/new-in-devtools-98/#bfcache) agora exibe o ID da extensão que bloqueou o [bfcache](https://web.dev/bfcache/) quando presente.([1284548](https://crbug.com/1284548))
- Corrigido suporte de autocompletar para objetos do tipo array, nomes de classe CSS, `map.get` e tags HTML. ([1297101](https://crbug.com/1297101), [1297491](https://crbug.com/1297491), [1293807](https://crbug.com/1293807), [1296983]( https://crbug.com/1296983))
- Corrigido destaques incorretos ao clicar duas vezes nas palavras e desfazer o preenchimento automático. ([1298437](https://crbug.com/1298437), [1298667](https://crbug.com/1298667))
- Correção do atalho de teclado para comentários no painel **Fontes**. ([1296535](https://crbug.com/1296535))
- Reativado o suporte para usar a tecla **Alt** (Opções) para seleção múltipla no painel **Fontes**. ([1304070](https://crbug.com/1304070))

<!-- ## [Experimental] New timespan and snapshot mode in the Lighthouse panel {: #lighthouse } -->
## [Experimental] Novos modos timespan e snapshot no painel Lighthouse {: #lighthouse }

{% Aside %}
<!-- To enable the experiment, enable the **Use Lighthouse panel with timespan and snapshot modes** checkbox under **Settings** > **Experiments**. -->
Para ativar o experimento, ative a caixa de seleção **Usar painel Lighthouse com modos de intervalo de tempo e instantâneo** em **Configurações** > **Experimentos**.
{% endAside %}

<!-- Apart from the existing **navigation** mode, the **Lighthouse** panel now support two more modes on measuring user flows - **timespan** and **snapshot**. -->
Além do modo de **navegação** existente, o painel **Lighthouse** agora oferece suporte a mais dois modos de medição de fluxos de usuários - **timespan** e **snapshot**.
<!-- For example, you can use the **timespan** reports to analyze user interactions. Open this [demo](https://coffee-cart.netlify.app/) page. Select the **Timespan** mode and click on **Start timespan**. On the page, click on a coffee and end the timespan. Read the report to find out the [Total Blocking Time](https://web.dev/tbt/) and [Cumulative Layout Shift](https://web.dev/cls/) that were caused by the interaction. -->
Por exemplo, você pode usar os relatórios de **timespan** para analisar as interações do usuário. Abra esta página [demo](https://coffee-cart.netlify.app/). Selecione o modo **Timespan** e clique em **Começar timespan**. Na página, clique em um café e encerre o intervalo de tempo. Leia o relatório para descobrir o [Total Blocking Time](https://web.dev/tbt/) e [Cumulative Layout Shift](https://web.dev/cls/) que foram causados pela interação.

<!-- Each mode has its own unique use cases, benefits, and limitations. Please refer to the [Lighthouse documentation](https://github.com/GoogleChrome/lighthouse/blob/master/docs/user-flows.md) for more information. -->
Cada modo tem seus próprios casos de uso, benefícios e limitações. Consulte a [documentação do Lighthouse](https://github.com/GoogleChrome/lighthouse/blob/master/docs/user-flows.md) para obter mais informações.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/loe3f6KaR9UdYe57oQ7r.png", alt="Modos Timespan e snapshot no painel do Lighthouse", width="800", height="488" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/4d17e989f0f5bad0f9d4d5badff16fd6da09ae33 #}

Issue relacionada: [772558](https://crbug.com/772558)

{% Partial 'devtools/reach-out.md' %}
{% Partial 'devtools/whats-new.md' %}
