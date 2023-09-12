---
layout: "layouts/blog-post.njk"
title: "O que há de novo no DevTools (Chrome 106)"
authors:
  - jecelynyeen
date: 2022-09-16
updated: 2022-09-16
description: "Melhorias no suporte para debugging na Web moderna, Detalhes dos tempos de LCP no Performance Insights e mais."
hero: 'image/dPDCek3EhZgLQPGtEG3y0fTn4v82/nqkHxM9zJ21eiM59X0Ho.jpg'
alt: ''
tags:
  - new-in-devtools
  - devtools
  - chrome-106
---

*Tradução realizada por [Lucas Santos](https://lsantos.dev). Revisão por [Alvaro Camillo Neto](https://www.linkedin.com/in/alvarocamillont/).*

{% Partial 'devtools/banner.md' %}

{% YouTube id='5gBqTXctxO8' %}

<!-- start: translation instructions -->
<!-- + 1. Remove the "draft: true" tag above when submitting PR -->
<!-- + 2. Provide translations under each of the English commented original content -->
<!-- + 3. Translate the "description" tag above -->
<!-- + 4. Translate all the <img> alt text -->
<!-- + 5. Update the whats-new.md file -->

<!-- ## Group files by Authored / Deployed in the Sources panel {: #authored } -->
## Agrupamento de arquivos por Original / Publicado no painel de fontes {: #authored }

<!-- The **Group files by Authored / Deployed** is now shown under the 3-dot menu. Previously, it showed directly on the navigation pane. -->
O **Agrupamento de arquivos por Original / Publicado** mudou de lugar e está localizado no menu com os três pontos (`...`). Anteriormente, ele era mostrado diretamente no painel de navegação.

<!-- Open this [demo](https://ng-devtools.netlify.app/). Enable the **Group files by Authored / Deployed** setting to view your original source code (Authored) first and navigate to them quicker. -->
Abra essa [demo](https://ng-devtools.netlify.app/). Ative a configuração **Agrupamento de arquivos por Original / Publicado** para ver o seu código fonte original (Criado) primeiro e navegar para ele mais rápido

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/HI12Jz3K7CCy0cm01jBk.png", alt="Agrupamento de arquivos por Original / Publicado", width="800", height="405" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/73c559d02676e4329645120e657416e7f15de42b #}

Issue no Chromium: [1352488](https://crbug.com/1352488)


<!-- ## Improved stack traces {: #stack-traces } -->
## Melhoria de stack traces {: #stack-traces }

<!-- ### Linked stack traces for asynchronous operations  {: #async } -->
### Stack traces completos para operações assíncronas {: #async }

<!-- When some operations are scheduled to happen asynchronously, the stack traces in DevTools now tell the “full story” of the operation. Previously, it tells only part of the story. -->
Quando alguma operação está agendada para acontecer de forma assíncrona, os stack traces no DevTools vão mostrar a "história completa" da operação. Anteriormente, só era mostrado parte do que aconteceu.

<!-- For example, open this [demo](https://ng-devtools.netlify.app/) and click on the increment button. Expand the error message in **Console**. In our source code, the operation includes an async `timeout` operation. -->
Por exemplo, abra essa [demo](https://ng-devtools.netlify.app/) e clique no botão de incremento. Expanda a mensagem de erro no **Console**. No nosso código fonte, a operação inclui um `timeout` assíncrono.

```js
// application.component.ts

async increment() {
    await Promise.resolve().then(() => timeout(100));
    …
}
```

<!-- Previously, the stack trace only showed the timeout operation. It did not show the “root cause” of the operation.  -->
Anteriormente, o stack trace só mostrava a operação de timeout. Ele não mostrava também a "causa raiz" da operação.

<!-- With the latest changes, DevTools now shows the operation originates from the `onClick` event in the button component, then the `increment` function, followed by the timeout operation. -->
Com essa última alteração, o DevTools agora mostra que a operação se origina a partir do evento `onClick` no componente do botão, depois na função `increment`, seguida da operação de timeout.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/2jAETpw8QWzsg1Wqk0Ya.png", alt="Stack traces completos para operações assíncronas", width="800", height="442" %}

<!-- Behind the scenes, DevTools introduced a new “Async Stack Tagging” feature. You can tell the whole story of the operation by linking both parts of the async code together with the new `console.createTask()` method. See [Modern debugging in DevTools](/blog/devtools-modern-web-debugging/#linked-stack-traces) to learn more.  -->
Por baixo dos panos, o DevTools introduziu uma funcionalidade chamada "Async Stack Tagging". Você pode contar toda a história de uma operação através de um link entre as duas partes do código assíncrono juntas usando o novo método `console.createTask()`. Veja [Debugging modernizado com o DevTools](/blog/devtools-modern-web-debugging/#linked-stack-traces) para saber mais.

<!-- Does it sound complicated? Not at all. Most of the time, the framework you are using handles the scheduling and async execution. In that case, it is up to the framework to implement the API, you don’t need to worry about it. (e.g. Angular implemented these [changes](https://chromium-review.googlesource.com/c/v8/v8/+/3776678)) -->
Parece complicado? Nem um pouco! Na maioria do tempo, o framework que você está usando vai lidar com a parte de executar e agendar operações assíncronas. Nesse caso, é trabalho do framework implementar a API, você não precisa se preocupar. (Por exemplo, o Angular implementou essas mudanças [aqui](https://chromium-review.googlesource.com/c/v8/v8/+/3776678)).

{# https://chromium.googlesource.com/v8/v8/+/c53c20fe64b5b21f5a4838ebcfdb96357189fc76 #}

Issue do Chromium: [1334585](https://crbug.com1334585)


<!-- ### Automatically ignore known third-party scripts {: #auto-ignore } -->
### Ignorar os scripts de terceiros conhecidos automaticamente {: #auto-ignore }

<!-- Identify issues in your code quicker during debugging because DevTools now automatically adds known third-party scripts to the ignore list. -->
Identifique problemas no seu código mais rapidamente durante o debug porque o DevTools agora adiciona automaticamente todos os scripts de terceiros que são conhecidos à sua lista de ignorados.

<!-- Open this [demo](https://ng-devtools.netlify.app/) and click on the increment button. Expand the error message in **Console**. The stack trace shows only your code (e.g. `app.component.ts` `button.component.ts`). Click **Show more frames** to view the full stack trace. -->
Abra essa [demo](https://ng-devtools.netlify.app/) e clique no botão de incremento. Expanda a mensagem de erro no *Console*. O stack trace vai mostrar apenas o seu código (`app.component.ts`, `button.component.ts`). Clique em **Mostrar mais frames** para ver o stack trace completo.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/GQ9B11tKBcFc1BxQYW9z.png", alt="Ignorar os scripts de terceiros conhecidos automaticamente", width="800", height="425" %}

<!-- Previously, the stack trace included third-party scripts like `zone.js` and `core.mjs`. These are not your source code, they are generated by bundlers (e.g. webpack) or frameworks (e.g. Angular). It took a longer time to identify the root cause of an error.  -->
Anteriormente, o stack trace incluía também os scripts de terceiros como `zone.js` e `core.mjs`. Esses scripts não são parte do seu código fonte, eles são gerados por bundlers como o Webpack ou frameworks como o Angular. Com eles no meio do caminho, era mais demorado para identificar a causa raiz de um erro.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/GQ9B11tKBcFc1BxQYW9z.png", alt="Ignorar os scripts de terceiros conhecidos automaticamente", width="800", height="425" %}

<!-- Behind the scenes, DevTools ignores third-party scripts based on the new `x_google_ignoreList` property in source maps. Frameworks and bundlers need to supply this information. See [Case Study: Better Angular Debugging with DevTools](/blog/devtools-better-angular-debugging/#x_google_ignorelist-in-angular).  -->
Por baixo do capô, o DevTools ignora esses scripts baseados na nova propriedade `x_google_ignoreList` nos source maps. Os frameworks e bundlers precisam prover essa informação. Veja o [Estudo de caso: Melhor debug com Angular e DevTools](/blog/devtools-better-angular-debugging/#x_google_ignorelist-in-angular).

<!-- Optionally, if you prefer to always view full stack traces, you can disable the setting via **Settings** > **Ignore list** > **Automatically add known third-party scripts to ignore list**. -->
Opcionalmente, se você preferir sempre ver os stack traces completos, você pode desabilitar essa cofiguração através do caminho **Configurações** > **Lista de ignorados** > **Adicionar scripts de terceiros conhecidos na lista automaticamente**

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/elkhLqA0KV8pWYFgKk8g.png", alt="Configuração para adicionar scripts de terceiros conhecidos à lista automaticamente", width="800", height="516" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/e09e489c2b1233ab424d562abc22f297c6322878 #}

Issue do Chromium: [1323199](https://crbug.com/1323199)


<!-- ## Improved call stack during debugging  {: #call-stack } -->
## Melhorias no call stack durante o debugging {: #call-stack }

<!-- With the **Automatically add known third-party scripts to ignore list** setting, the call stack now shows only frames that are relevant to your code. -->
Com a configuração **Adicionar scripts de terceiros conhecidos na lista automaticamente**, a call stack agora só vai mostrar frames que forem relevantes para o seu código.

<!-- Open this [demo](https://ng-devtools.netlify.app/) and set a breakpoint at the `increment()` function in `app.component.ts`. Click the increment button on the page to trigger the breakpoint. The call stack shows only frames from your code (e.g.  `app.component.ts` and `button.component.ts`).  -->
Abra essa [demo](https://ng-devtools.netlify.app/) e crie um breakpoint na função `increment()` dentro de `app.component.ts`. Clique no botão de incremento para ativar esse breakpoint. A call stack agora só mostra os frames do seu código (`app.component.ts` e `button.component.ts`).

<!-- To view all frames, enable **Show ignore-listed frames**. Previously, DevTools displayed all frames by default.  -->
Para ver todos os frames, ative a configuração **Mostrar frames na lista de ignorados**. Anteriormente, o DevTools mostrava todos os frames por padrão.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/PdjPrBAV7TXn8FHcRR6R.png", alt="Melhorias no call stack durante o debugging", width="800", height="601" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/73c559d02676e4329645120e657416e7f15de42b #}

Issue do Chromium: [1352488](https://crbug.com/1352488)


<!-- ## Hiding ignore-listed sources in the Sources panel {: #ignore-nav } -->
## Escondendo fontes na lista de ignorados do painel de Fontes {: #ignore-nav }

<!-- Enable **hide ignore-listed sources** to hide irrelevant files in the **Navigation** pane. This way, you can focus only on your code. -->
Ative a opção **esconder fontes ignoradas** para esconder arquivos irrelevantes no painel **Navegação**. Dessa forma você pode focar só no seu código.

<!-- Open this [demo](https://ng-devtools.netlify.app/). In the **Sources** panel. The `node_modules` and `webpack` are the third-party scripts. Click on the 3-dot menu and select **hide ignore-listed sources** to hide them from the pane. -->
Abra essa [demo](https://ng-devtools.netlify.app/). No painel **Fontes**, os scripts `node_modules` e `webpack` são scripts de terceiros, fora do seu código fonte. Clique no menu com os três pontos e selecione **esconder fontes ignoradas** para escondê-los no painel.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/Y4KSjl9zJQdnAhTvtnXm.png", alt="Escondendo fontes na lista de ignorados do painel de Fontes", width="800", height="449" %}

Issue do Chromium: [1352488](https://crbug.com/1352488)


<!-- ## Hiding ignore-listed files in the Command Menu {: #ignore-search } -->
## Escondendo arquivos ignorados no Command Menu {: #ignore-search }

<!-- With the **hide ignore-listed sources** setting, you can find your file quicker with the [Command Menu](/docs/devtools/command-menu/). Previously, searching files in the **Command Menu** returns third-party files that might not be relevant to you. -->
Com a configuração **esconder fontes ignoradas**, você pode encontrar seus arquivos mais rapidamente com o [Command Menu](/docs/devtools/command-menu/). Anteriormente, buscar arquivos com o **Command menu** retornava também arquivos de terceiros que poderiam não ser relevantes para você.

<!-- For example, enable the **hide ignore-listed sources** setting and click on the 3-dot menu. Select **Open file**. Type “ton” to search for button components. Previously, the results include files from `node_modules`, one of the `node_modules` files even shown up as the first result.  -->
Por exemplo, ative a opção **esconder fontes ignoradas** e clique no menu com três pontos. Selecione **Abrir arquivo**. Digite **ton** para procurar por componentes do tipo "button". Anteriormente, os resultados incluíam arquivos do script `node_modules`, um deles inclusive era mostrado como primeiro resultado.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/vi0yhKte5KN511F57FQM.png", alt="Escondendo arquivos ignorados no Command Menu", width="800", height="425" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/9144105ce3efd70babe74c19e808616864be631b #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/c010ce7baa6930cb633372b5d8024a18b3f7ed66 #}

Issue do Chromium: [1336604](https://crbug.com/1336604)

<!-- ## New Interactions track in the Performance panel  {: #performance } -->
## Nova trilha de interações no painel de performance {: #performance }

<!-- Use the new **Interactions** track in the **Performance** panel to visualize interactions and track down potential responsiveness issues.  -->
Use a nova trilha **interações** no painel **Performance** para visualizar as interações e acompanhar potenciais problemas de responsividade.

<!-- For example, [start a performance recording](/docs/devtools/evaluate-performance/#record on this [demo page](https://coffee-cart.netlify.app/?ad=1). Click on a coffee and stop recording. Two interactions show in the **Interactions** track. Both interactions have the same IDs, indicating the interactions are triggered from the same user interaction. -->
Por exemplo, [inicie uma nova gravação de performace](/docs/devtools/evaluate-performance/#record) nessa [demo](https://coffee-cart.netlify.app/?ad=1). Clique em qualquer café e pare a gravação. Duas interações vão ser mostradas na trilha de **Interações**. Ambas vão ter o mesmo ID, indicando que elas foram iniciadas pela mesma interação de usuário.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/LpHJbSGra2ZCHpy3ns7q.png", alt="Nova trilha de interações no painel de performance", width="800", height="489" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/6d97228951a6c8884b3ac4b712e966e79f2bdc3c #}

Issue do Chromium: [1347390](https://crbug.com/1347390)


<!-- ## LCP timings breakdown in the Performance Insights panel {: #insights } -->
## Detalhamento de tempos de LCP no painel de Performance Insights {: #insights }

<!-- The **Performance Insights** panel now shows the [timings breakdown](https://web.dev/optimize-lcp/#lcp-breakdown)  of the [Largest Containful Paint (LCP)](/docs/devtools/performance-insights/#largest-contentful-paint). Use these timings information to understand and identify an opportunity to improve LCP performance. -->

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/hU6RmoRjFskL8P2ZAB9l.png", alt="Detalhamento de tempos de LCP no painel de Performance Insights", width="800", height="523" %}

{# https://chrome-internal.googlesource.com/devtools/devtools-internal/+/883542a3727a5bc1415ffee7c7bc7f7218d9e2a5 #}

Issue do Chromium: [1351735](https://crbug.com/1351735)


<!-- ## Auto-generate default name for recordings in the Recorder panel {: #recorder } -->
## Nomes padrão auto-gerados para as gravações do painel do Gravador {: #recorder }

<!-- The **Recorder** panel now automatically generates a name for new recordings. -->
O painel do **Gravador** agora automaticamente gera um nome para novas gravações.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/0TMJgVqyk7AeoWIR6Vee.png", alt="Nomes padrão auto-gerados para as gravações do painel do Gravador", width="800", height="565" %}

{# https://chrome-internal.googlesource.com/devtools/devtools-internal/+/fbf1466b00d1ff2c36fce81fde1b21f33b689a76 #}

Issue do Chromium: [1351383](https://crbug.com/1351383)


<!-- ## Miscellaneous highlights {: #misc } -->
## Outras novidades {: #misc }

<!-- - Previously, [Recorder extensions](/docs/devtools/recorder/reference/#extension-troubleshooting) don’t show up in the **Recorder** panel from time to time. ([1351416](https://crbug.com/1351416)) -->
- Anteriormente, [Extensões do Gravador](/docs/devtools/recorder/reference/#extension-troubleshooting) não eram mostradas no painel do mesmo de tempos em tempos ([1351416](https://crbug.com/1351416))
<!-- - The **Styles** pane now displays a color picker for the [SVG `<stop>`](https://developer.mozilla.org/docs/Web/SVG/Element/stop) element’s `stop-color` property. ([1351096](https://crbug.com/1351096)) -->
- O painel **Estilos** agora mostra um seletor de cores para a propriedade `stop-color` da tag [`<stop>` do SVG](https://developer.mozilla.org/docs/Web/SVG/Element/stop). ([1351096](https://crbug.com/1351096))
<!-- - Identify script causing [layout](https://web.dev/avoid-large-complex-layouts-and-layout-thrashing/) as the potential root causes for layout shifts in the **Performance Insights** panel. ([1343019](https://crbug.com/1343019)) -->
- Identifique scripts causando [layout thrashing](https://web.dev/avoid-large-complex-layouts-and-layout-thrashing/) como uma potencial causa para mudanças de layout no painel de **Performance Insights**. ([1343019](https://crbug.com/1343019))
<!-- - Display critical path for LCP web fonts in the **Performance Insights** panel. ([1350390](https://crbug.com/1350390)) -->
- O caminho crítico para fontes LCP agora é mostrado no painel **Performance Insights**. ([1350390](https://crbug.com/1350390))

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/50a84ca8e5b556e27bb285477f21a99f0ccb7050 #}
{# https://chrome-internal.googlesource.com/devtools/devtools-internal/+/2687a701a67e543faeff3f936f215534bf8221bf #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/1f6ef0d58292665e06eded4059d8714a2e487e8a #}
{# https://chrome-internal.googlesource.com/devtools/devtools-internal/+/fe7254c9a51f964b2a106becc1b22f38033b9f50 #}


{% Partial 'devtools/reach-out.md' %}
{% Partial 'devtools/whats-new.md' %}
