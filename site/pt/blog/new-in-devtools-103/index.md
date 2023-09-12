---
layout: "layouts/blog-post.njk"
title: "O que há de novo no DevTools (Chrome 103)"
authors:
  - jecelynyeen
date: 2022-06-14
updated: 2022-06-14
description: "Gravação de eventos de clique duplo e clique com o botão direito do mouse, novas opções para medir o fluxo de usuários no Lighthouse e muito mais."
hero: 'image/dPDCek3EhZgLQPGtEG3y0fTn4v82/0xW2IMlPQXbNCeuL9pcX.jpg'
alt: ''
tags:
  - new-in-devtools
  - devtools
  - chrome-103
---

*Tradução realizada por [Lucas Santos](https://lsantos.dev). Revisão por [Alvaro Camillo Neto](https://www.linkedin.com/in/alvarocamillont/).*

{% Partial 'devtools/banner.md' %}

{% YouTube id='LyMts4yfQu8' %}

<!-- start: translation instructions -->
<!-- + 1. Remove the "draft: true" tag above when submitting PR -->
<!-- + 2. Provide translations under each of the English commented original content -->
<!-- + 3. Translate the "description" tag above -->
<!-- + 4. Translate all the <img> alt text -->
<!-- + 5. Update the whats-new.md file -->
<!-- end: translation instructions -->

<!-- ## Capture double-click and right-click events in the Recorder panel {: #recorder } -->
## Gravação de eventos de clique duplo e clique com o botão direito do mouse {: #recorder }
<!-- The **Recorder** panel can now capture double-click and right-click events. -->
O painel **Gravação** agora pode capturar eventos de clique duplo e clique com o botão direito.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/qsleBCUrr2twMujW0R94.png", alt="Captura de eventos de clique duplo e clique com o botão direito do mouse no painel Gravação", width="800", height="572" %}

<!-- In this [example](https://jec.fish/demo/dbl-right-click), start a [recording](/docs/devtools/recorder/#record) and try to perform the following steps:  -->
Neste [exemplo](https://jec.fish/demo/dbl-click direito), inicie uma [gravação](/docs/devtools/recorder/#record) e tente executar as seguintes etapas:
<!-- - Double-click the card to enlarge it
- Right-click the card and select an action from the context menu -->
- Clique duas vezes no cartão para ampliá-lo
- Clique com o botão direito do mouse no cartão e selecione uma ação no menu de contexto
<!-- To understand how **Recorder** captured these events, expand the steps: -->
Para entender como o **Gravador** capturou esses eventos, expanda as etapas:

<!-- - **Double-click** is captured as `type: doubleClick`.
- **Right-click** event is captured as `type: click` but with the `button` property is set to `secondary`. The `button` value of a normal mouse click is `primary`. -->
- **Duplo clique** é capturado como `type: doubleClick`.
- O evento **Clique com o botão direito** é capturado como `type: click`, mas com a propriedade `button` é definida como `secondary`. O valor `button` de um clique normal do mouse é `primary`.

Issues relacionadas: [1300839](https://crbug.com/1300839), [1322879](https://crbug.com/1322879), [1299701](https://crbug.com/1299701), [1323688](https://crbug.com/1323688)


<!-- ## New timespan and snapshot mode in the Lighthouse panel {: #lighthouse } -->
## Novo intervalo de tempo e modo de instantâneo no painel Lighthouse {: #lighthouse }
<!-- You can now use **Lighthouse** to measure your website’s performance beyond page load. -->
Agora você pode usar o **Lighthouse** para avaliar o desempenho do seu site além do carregamento da página.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/3GGcCxlOGrnXLMfp0t9y.png", alt="Novo intervalo de tempo e modo de instantâneo no painel Lighthouse", width="800", height="507" %}

<!-- The **Lighthouse** panel now supports 3 modes of user flow measurement:  -->
O painel **Lighthouse** agora oferece suporte a 3 modos de medição de vazão do usuário:

<!-- - [Navigation](https://github.com/GoogleChrome/lighthouse/blob/master/docs/user-flows.md#navigation) reports analyze a single page load. Navigation is the most common report type. All Lighthouse reports before the current version are navigation reports.
- [Timespans](https://github.com/GoogleChrome/lighthouse/blob/master/docs/user-flows.md#timespan) reports analyze an arbitrary time period, typically containing user interactions.
- [Snapshots](https://github.com/GoogleChrome/lighthouse/blob/master/docs/user-flows.md#snapshot) reports analyze the page in a particular state, typically after the user has interacted with it. -->
- Os relatórios [Navigation](https://github.com/GoogleChrome/lighthouse/blob/master/docs/user-flows.md#navigation) analisam o carregamento de uma única página. A navegação é o tipo de relatório mais comum. Todos os relatórios do Lighthouse anteriores à versão atual são relatórios de navegação.
- Os relatórios [Timespans](https://github.com/GoogleChrome/lighthouse/blob/master/docs/user-flows.md#timespan) analisam um período de tempo arbitrário, geralmente contendo interações do usuário.
- Os relatórios [Snapshots](https://github.com/GoogleChrome/lighthouse/blob/master/docs/user-flows.md#snapshot) analisam a página em um estado específico, geralmente depois que o usuário interage com ela.
<!-- For example, let’s measure the performance of adding items to cart on this [demo page](https://coffee-cart.netlify.app/). Select the **Timespan** mode and click **Start timespan**. Scroll and add a few items to the cart. Once you are done, click on **End timespan** to generate a Lighthouse report of the user interactions. -->
Por exemplo, vamos medir o desempenho de adicionar itens ao carrinho nesta [página de demonstração](https://coffee-cart.netlify.app/). Selecione o modo **Timespan** e clique em **Start timespan**. Adicione alguns itens ao carrinho. Quando terminar, clique em **End timespan** para gerar um relatório do Lighthouse das interações do usuário.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/pq9Vg8xOUzplWAlXGJEa.png", alt="Modo Timespan", width="800", height="549" %}

<!-- See [User flows in Lighthouse](https://github.com/GoogleChrome/lighthouse/blob/master/docs/user-flows.md) to learn about the unique use cases, benefits, and limitations of each mode.  -->
Consulte [Fluxos do usuário no Lighthouse](https://github.com/GoogleChrome/lighthouse/blob/master/docs/user-flows.md) para saber mais sobre os casos de uso exclusivos, os benefícios e as limitações de cada modo.

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/70d4a90431dc6c881209f605411ce0bd2272d6d1 #}

Issue relacionada: [1291284](https://crbug.com/1291284)


<!-- ## Performance Insights updates {: #performance } -->
## Atualizações do Performance Insights {: #performance }
<!-- ### Improved zoom control in the Performance Insights panel {: #zoom } -->
### Controle de zoom aprimorado no painel Performance Insights {: #zoom }

<!-- DevTools will now zoom in based on your mouse cursor rather than the playhead position.With the latest cursor-based zoom, you can move your mouse to anywhere in the track, and [zoom in](/docs/devtools/performance-insights/#navigate) to the desired area right away.  -->

O DevTools agora aumentará o zoom com base no cursor do mouse em vez da posição do indicador de reprodução. Com o zoom baseado no cursor mais recente, você pode mover o mouse para qualquer lugar na faixa e [zoom in](/docs/devtools/performance-insights/#navigate) para a área desejada imediatamente.

{% Video src="video/dPDCek3EhZgLQPGtEG3y0fTn4v82/U8d1PjOFZuGkyOXHQ5Z8.mp4", autoplay=true, loop=true, class="screenshot" %}

<!-- See [Performance Insights](/docs/devtools/performance-insights/) to learn how to get actionable insights and improve your website’s performance with the panel. -->
Consulte [Performance Insights](/docs/devtools/performance-insights/) para saber como obter insights acionáveis e melhorar o desempenho do seu site com o painel.

Issue relacionada: [1313382](https://crbug.com/1313382)


<!-- ### Confirm to delete a performance recording {: #delete } -->
### Confirmação para excluir uma gravação de apresentação {: #delete }

<!-- DevTools now shows a confirmation dialog before [deleting a performance recording](/docs/devtools/performance-insights/#delete). -->
O DevTools agora mostra uma caixa de diálogo de confirmação antes de [excluir uma gravação de performance](/docs/devtools/performance-insights/#delete).

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/DaoCroAA60WmMLpuVU9P.png", alt="Confirmação para excluir uma gravação de apresentação", width="800", height="549" %}

Issue relacionada: [1318087](https://crbug.com/1318087)


<!-- ## Reorder panes in the Elements panel {: #reorder-pane } -->
## Reordenar painéis no painel Elementos {: #reorder-pane }
<!-- You can now reorder panes in the **Elements** panel based on your preference. -->
Agora você pode reordenar os painéis no painel **Elementos** com base em sua preferência.
<!-- For example, when you open DevTools on a narrow screen, the [Accessibility](/docs/devtools/accessibility/reference/#pane) pane is hidden under the **Show more** button. If you frequently debug accessibility issues, you can now drag the pane to the front for easier access. -->
Por exemplo, quando você abre o DevTools em uma tela estreita, o painel [Acessibilidade](/docs/devtools/accessibility/reference/#pane) fica oculto no botão **Mostrar mais**. Se você depura problemas de acessibilidade com frequência, agora você pode arrastar o painel para a frente para facilitar o acesso.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/hcaQzMTxecNyw4RY0PMX.png", alt="Reordenar painéis no painel Elementos", width="800", height="616" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend.git/+/10d76932286c4b001eb4c4a13d8bf401f4ee46a7 #}

Issue relacionada: [1146146](https://crbug.com/1146146)


<!-- ## Picking a color outside of the browser {: #color } -->
## Escolhendo uma cor fora do navegador {: #color }
<!-- DevTools now supports picking a color outside of the browser. Previously, you could only pick a color within the browser. -->
O DevTools agora suporta a escolha de uma cor fora do navegador. Anteriormente, você só podia escolher uma cor no navegador.

<!-- In the **Styles** pane, click on any color preview to open a color picker. Use the eyedropper to pick color from anywhere. -->
No painel **Estilos**, clique em qualquer visualização de cor para abrir um seletor de cores. Use o conta-gotas para escolher a cor de qualquer lugar.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/JAp1UdPCnWNduuNadLVz.png", alt="Escolhendo uma cor fora do navegador", width="800", height="450", class="screenshot" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend.git/+/bbb56c21faaa6c68493a351e3f3e213acb5b76fa #}

Issue relacionada: [1245191](https://crbug.com/1245191)


<!-- ## Improved inline value preview during debugging {: #inline-preview } -->
## Visualização aprimorada do valor inline durante a depuração {: #inline-preview }
<!-- The debugger now shows the inline values preview correctly. -->
O depurador agora mostra a visualização dos valores inline corretamente.
<!-- In this example, the `double` function has an input parameter  `a` and a variable `x`. Put a breakpoint at the `return` line and run the code. The inline preview shows values `a` and `x` correctly. Previously, the debugger did not show the value `x` in the inline preview. -->
Neste exemplo, a função `double` tem um parâmetro de entrada `a` e uma variável `x`. Coloque um ponto de interrupção na linha `return` e execute o código. A visualização inline mostra os valores `a` e `x` corretamente. Anteriormente, o depurador não mostrava o valor `x` na visualização inline.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/XMHyRsyK24fWLK7o72K7.png", alt="Visualização aprimorada do valor inline durante a depuração", width="800", height="534" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/8e1a99324bde8d093e32ede5c8d1bf50110fac66 #}

Issue relacionada: [1316340](https://crbug.com/1316340)


<!-- ## Support large blobs for virtual authenticators {: #webauthn } -->
## Suporte a blobs grandes para autenticadores virtuais {: #webauthn }
<!-- The [WebAuthn](/docs/devtools/webauthn/) tab now has the new **Supports large blob** checkbox for virtual authenticators. -->
A guia [WebAuthn](/docs/devtools/webauthn/) agora tem a nova caixa de seleção **Suporte a grandes blobs** para autenticadores virtuais.
<!-- This checkbox is disabled by default. You can enable it only for the authenticators with `ctap2` protocol that support resident keys. -->
Esta caixa de seleção está desabilitada por padrão. Você pode habilitá-lo apenas para os autenticadores com protocolo `ctap2` que suportam chaves residentes.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/m58oDW2ZwCMxX6zoUoJM.png", alt=" Suporte blobs grandes para autenticadores virtuais", width="800", height="601" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/519350816e99a82142712b2e5b6781984a77e39c #}

Issue relacionada: [1321803](https://crbug.com/1321803)


<!-- ## New keyboard shortcuts in the Sources panel {: #shortcuts } -->
## Novos atalhos de teclado no painel Sources {: #shortcuts }
<!-- Two new keyboard shortcuts are now available in the  **Sources** panel: -->
Dois novos atalhos de teclado agora estão disponíveis no painel **Fontes**:

<!-- - Toggle **navigation** sidebar (left) with <kbd>Control / Command</kbd> + <kbd>Shift</kbd> + <kbd>Y</kbd>
- Toggle **debugger** sidebar (right) with <kbd>Control / Command</kbd> + <kbd>Shift</kbd> + <kbd>H</kbd> -->
- Alterne a barra lateral **navegação** (esquerda) com <kbd>Control/Command</kbd> + <kbd>Shift</kbd> + <kbd>Y</kbd>
- Alterne a barra lateral **depurador** (direita) com <kbd>Control/Command</kbd> + <kbd>Shift</kbd> + <kbd>H</kbd>

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/1PacYBEm9DoSeW7iai8M.png", alt="Novos atalhos de teclado no painel Sources ", width="800", height="494" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/029ac9db0b7e7d08945bcf7a16b407bde50183a1 #}

Issues relacionadas: [1226363](https://crbug.com/1226363)


<!-- ## Sourcemaps improvements {: #sourcemaps } -->
## Melhorias nos source maps  {: #sourcemaps }
<!-- Previously, developers experience random failure during: -->
Anteriormente, os desenvolvedores apresentavam falhas aleatórias durante:

<!-- - Debugging with [Codepen](https://codepen.io/) example
- Identifying source location of performance issues in a [Codepen](https://codepen.io/) example
- Missing **Component** tab when [React DevTools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi) is enabled -->
- Exemplo de depuração com [Codepen](https://codepen.io/)
- Identificando o local de origem dos problemas de desempenho em um exemplo do [Codepen](https://codepen.io/)
- Falta a guia **Component** quando [React DevTools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi) está ativado

<!-- Here are a few fixes on source maps to improve the overall debugging experience: -->
Aqui estão algumas correções nos sourcesmaps para melhorar a experiência geral de depuração:

<!-- - Correct mapping between location and offset for inline scripts and source location
- Use fallback information for frame’s text location
- Properly resolve relative urls with frame's URL   -->

- Mapeamento correto entre localização e deslocamento para scripts embutidos e localização de origem
- Uso de informações de fallback para a localização do texto do frame
- Resolve corretamente os URLs relativos com o URL do frame

{# https://chromium.googlesource.com/v8/v8/+/d821a6a373ecf086a2ef0d233ace7f3431e47732 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/9d3d33e0bde8357d58a3c4981dd016e9b9c553f3 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/04a58f2837c1ec9e78bd722bbe81e9cd7ab38727 #}

Issues relacionadas: [1319828](https://crbug.com/1319828), [1318635](https://crbug.com/1318635), [1305475](https://crbug.com/1305475)

{% Partial 'devtools/reach-out.md' %}
{% Partial 'devtools/whats-new.md' %}
