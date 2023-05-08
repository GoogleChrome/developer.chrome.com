---
layout: 'layouts/blog-post.njk'
title: 'Qué hay de nuevo en DevTools (Chrome 106)'
authors:
  - jecelynyeen
date: 2022-09-16
updated: 2022-09-16
description: "Mejor soporte para la depuración web moderna, desglose de tiempos de LCP en la Perspetiva de Rendimiento y más."
hero: 'image/dPDCek3EhZgLQPGtEG3y0fTn4v82/VAFNe8Jt9AyXwMPdYkil.jpg'
alt: ''
tags:
  - new-in-devtools
  - devtools
  - chrome-106
---

_Gracias  por la traducción [Carlos Caballero](https://carloscaballero.io) y por la revisión [Miguel Ángel](https://midu.dev)._

{% Partial 'devtools/banner.md' %}

{% YouTube id='5gBqTXctxO8' %}

<!-- start: translation instructions -->
<!-- + 1. Remove the "draft: true" tag above when submitting PR -->
<!-- + 2. Provide translations under each of the English commented original content -->
<!-- + 3. Translate the "description" tag above -->
<!-- + 4. Translate all the <img> alt text -->
<!-- + 5. Update the whats-new.md file -->

<!-- ## Group files by Authored / Deployed in the Sources panel {: #authored } -->
## Agrupar archivos por Autoría/Desplegado en el panel Fuentes {: #authored }


<!-- The **Group files by Authored / Deployed** is now shown under the 3-dot menu. Previously, it showed directly on the navigation pane. -->
Ahora, los **archivos agrupados por autor/despliegue** se muestran en el menú de 3 puntos. Anteriormente, se mostraban directamente en el panel de navegación.

<!-- Open this [demo](https://ng-devtools.netlify.app/). Enable the **Group files by Authored / Deployed** setting to view your original source code (Authored) first and navigate to them quicker. -->
Abra esta [demo](https://ng-devtools.netlify.app/). Habilite la opción **Agrupar archivos por Autor/Implementación** para ver su código fuente original (por autor) primero y navegar más rápido.


{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/HI12Jz3K7CCy0cm01jBk.png", alt="Agrupar archivos por Autor/Implementación", width="800", height="405" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/73c559d02676e4329645120e657416e7f15de42b #}

Chromium bug: [1352488](https://crbug.com/1352488)


<!-- ## Improved stack traces {: #stack-traces } -->
## Rastreos de pila mejorados {: #stack-traces }


<!-- ### Linked stack traces for asynchronous operations  {: #async } -->
 ###  Rastreos de pila vinculados para operaciones asincrónicas  {: #async }


<!-- When some operations are scheduled to happen asynchronously, the stack traces in DevTools now tell the “full story” of the operation. Previously, it tells only part of the story. -->
Cuando algunas operaciones están programadas para que sucedan de forma asincrónica, los seguimientos de la pila en DevTools ahora cuentan la "historia completa" de la operación. Anteriormente, solo contaba una parte de la historia.

<!-- For example, open this [demo](https://ng-devtools.netlify.app/) and click on the increment button. Expand the error message in **Console**. In our source code, the operation includes an async `timeout` operation. -->
Por ejemplo, abra esta [demo](https://ng-devtools.netlify.app/) y haga clic en el botón `increment`. Expanda el mensaje de error en la **Consola**. En nuestro código fuente, la operación incluye una operación asíncrona de `timeout`.


```js
// application.component.ts

async increment() {
    await Promise.resolve().then(() => timeout(100));
    …
}
```

<!-- Previously, the stack trace only showed the timeout operation. It did not show the “root cause” of the operation.  -->
Anteriormente, el seguimiento de la pila solo mostraba la operación de `timeout`. No mostraba la "causa raíz" de la operación.

<!-- With the latest changes, DevTools now shows the operation originates from the `onClick` event in the button component, then the `increment` function, followed by the timeout operation. -->
Con los últimos cambios, DevTools ahora muestra que la operación se origina en el evento `onClick` en el componente del botón, luego se ejecuta la función `increment`, seguida de la operación de `timeout`.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/2jAETpw8QWzsg1Wqk0Ya.png", alt="Linked stack traces for asynchronous operations", width="800", height="442" %}

<!-- Behind the scenes, DevTools introduced a new “Async Stack Tagging” feature. You can tell the whole story of the operation by linking both parts of the async code together with the new `console.createTask()` method. See [Modern debugging in DevTools](/blog/devtools-modern-web-debugging/#linked-stack-traces) to learn more.  -->
Detrás de escena, DevTools introdujo una nueva característica "Etiquetado de pila asíncrona". Puede contar la historia completa de la operación vinculando ambas partes del código asíncrono con el nuevo método `console.createTask()`. Consulte [Depuración moderna en DevTools](/blog/devtools-modern-web-debugging/#linked-stack-traces) para obtener más información.

<!-- Does it sound complicated? Not at all. Most of the time, the framework you are using handles the scheduling and async execution. In that case, it is up to the framework to implement the API, you don’t need to worry about it. (e.g. Angular implemented these [changes](https://chromium-review.googlesource.com/c/v8/v8/+/3776678)) -->
¿Suena complicado? Para nada. La mayoría de las veces, el framework que estás utilizando maneja la planificación y la ejecución asíncrona. En ese caso, depende del framework la implementación de la API, no necesita preocuparse por eso. (por ejemplo, Angular implementó estos [cambios](https://chromium-review.googlesource.com/c/v8/v8/+/3776678))

{# https://chromium.googlesource.com/v8/v8/+/c53c20fe64b5b21f5a4838ebcfdb96357189fc76 #}

Chromium bug: [1334585](https://crbug.com1334585)


<!-- ### Automatically ignore known third-party scripts {: #auto-ignore } -->
### Ignorar automáticamente los scripts de terceros conocidos {: #auto-ignore }

<!-- Identify issues in your code quicker during debugging because DevTools now automatically adds known third-party scripts to the ignore list. -->
Identifique problemas en su código rápidamente durante la depuración, ya que, DevTools ahora agrega automáticamente scripts de terceros conocidos a la lista de ignorados.

<!-- Open this [demo](https://ng-devtools.netlify.app/) and click on the increment button. Expand the error message in **Console**. The stack trace shows only your code (e.g. `app.component.ts` `button.component.ts`). Click **Show more frames** to view the full stack trace. -->
Abra esta [demo](https://ng-devtools.netlify.app/) y haga clic en el botón de `increment`. Expanda el mensaje de error en la **Consola**. El seguimiento de la pila muestra solo su código (por ejemplo, `app.component.ts`, `button.component.ts`). Haga clic en **Mostrar más fotogramas** para ver el seguimiento completo de la pila.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/GQ9B11tKBcFc1BxQYW9z.png", alt="Ignorar automáticamente los scripts de terceros conocidos en el seguimiento de la pila", width="800", height="425" %}

<!-- Previously, the stack trace included third-party scripts like `zone.js` and `core.mjs`. These are not your source code, they are generated by bundlers (e.g. webpack) or frameworks (e.g. Angular). It took a longer time to identify the root cause of an error.  -->
Anteriormente, el seguimiento de la pila incluía scripts de terceros como `zone.js` y `core.mjs`. Estos no son su código fuente, son generados por paquetes (por ejemplo, webpack) o frameworks (por ejemplo, Angular). Llevó más tiempo identificar la causa raíz de un error.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/GQ9B11tKBcFc1BxQYW9z.png", alt="Automatically ignore known third-party scripts in the stack trace", width="800", height="425" %}

<!-- Behind the scenes, DevTools ignores third-party scripts based on the new `x_google_ignoreList` property in source maps. Frameworks and bundlers need to supply this information. See [Case Study: Better Angular Debugging with DevTools](/blog/devtools-better-angular-debugging/#x_google_ignorelist-in-angular).  -->
Detrás de escena, DevTools ignora los scripts de terceros basados en la nueva propiedad `x_google_ignoreList` en los mapas de origen. Los frameworks y los bundlers deben proporcionar esta información. Consulte [Estudio de caso: Mejor depuración angular con DevTools](/blog/devtools-better-angular-debugging/#x_google_ignorelist-in-angular).

<!-- Optionally, if you prefer to always view full stack traces, you can disable the setting via **Settings** > **Ignore list** > **Automatically add known third-party scripts to ignore list**. -->
Opcionalmente, si prefiere ver siempre los seguimientos de la pila completa, puede desactivar la configuración a través de **Configuración** > **Lista de ignorados** > **Agregar automáticamente scripts de terceros conocidos a la lista de ignorados**.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/elkhLqA0KV8pWYFgKk8g.png", alt="Configuración para agregar automáticamente scripts de terceros conocidos a la lista de ignorados", width="800", height="516" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/e09e489c2b1233ab424d562abc22f297c6322878 #}

Chromium bug: [1323199](https://crbug.com/1323199)


<!-- ## Improved call stack during debugging  {: #call-stack } -->
## Pila de llamadas mejorada durante la depuración {: #call-stack }

<!-- With the **Automatically add known third-party scripts to ignore list** setting, the call stack now shows only frames that are relevant to your code. -->
Con la configuración **Agregar automáticamente scripts de terceros conocidos para ignorar la lista**, la pila de llamadas ahora muestra solo los marcos que son relevantes para su código.

<!-- Open this [demo](https://ng-devtools.netlify.app/) and set a breakpoint at the `increment()` function in `app.component.ts`. Click the increment button on the page to trigger the breakpoint. The call stack shows only frames from your code (e.g.  `app.component.ts` and `button.component.ts`).  -->
Abra esta [demo](https://ng-devtools.netlify.app/) y establezca un punto de interrupción en la función `increment()` en `app.component.ts`. Haga clic en el botón de `increment` en la página para activar el punto de interrupción. La pila de llamadas muestra solo frameworks de su código (por ejemplo, `app.component.ts` y `button.component.ts`).

<!-- To view all frames, enable **Show ignore-listed frames**. Previously, DevTools displayed all frames by default.  -->
Para ver todos los fotogramas, habilite **Mostrar fotogramas ignorados**. Anteriormente, DevTools mostraba todos los fotogramas de forma predeterminada.


{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/PdjPrBAV7TXn8FHcRR6R.png", alt="Pila de llamadas mejorada durante la depuración", width="800", height="601" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/73c559d02676e4329645120e657416e7f15de42b #}

Chromium bug: [1352488](https://crbug.com/1352488)


<!-- ## Hiding ignore-listed sources in the Sources panel {: #ignore-nav } -->
## Hiding ignore-listed sources in the Sources panel {: #ignore-nav }
Ocultar fuentes ignoradas en el panel Fuentes

<!-- Enable **hide ignore-listed sources** to hide irrelevant files in the **Navigation** pane. This way, you can focus only on your code. -->
Habilite **ocultar fuentes ignoradas** para ocultar archivos irrelevantes en el panel de **Navegación**. De esta manera, puede concentrarse solo en su código.

<!-- Open this [demo](https://ng-devtools.netlify.app/). In the **Sources** panel. The `node_modules` and `webpack` are the third-party scripts. Click on the 3-dot menu and select **hide ignore-listed sources** to hide them from the pane. -->
Abra esta [demo](https://ng-devtools.netlify.app/). En el panel **Fuentes**. `node_modules` y `webpack` son scripts de terceros. Haga clic en el menú de 3 puntos y seleccione **ocultar fuentes ignoradas** para ocultarlas del panel.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/Y4KSjl9zJQdnAhTvtnXm.png", alt="Ocultar fuentes ignoradas en el panel Fuentes", width="800", height="449" %}

Chromium bug: [1352488](https://crbug.com/1352488)


<!-- ## Hiding ignore-listed files in the Command Menu {: #ignore-search } -->
## Ocultar archivos ignorados en el menú de comandos {: #ignore-search }

<!-- With the **hide ignore-listed sources** setting, you can find your file quicker with the [Command Menu](/docs/devtools/command-menu/). Previously, searching files in the **Command Menu** returns third-party files that might not be relevant to you. -->
Con la opción **ocultar fuentes ignoradas**, puede encontrar su archivo más rápido con el [Menú de comandos](/docs/devtools/command-menu/). Anteriormente, buscar archivos en el **Menú de comandos** retonaba archivos de terceros que podrían no ser relevantes para usted.

<!-- For example, enable the **hide ignore-listed sources** setting and click on the 3-dot menu. Select **Open file**. Type “ton” to search for button components. Previously, the results include files from `node_modules`, one of the `node_modules` files even shown up as the first result.  -->
Por ejemplo, habilite la configuración **ocultar fuentes ignoradas** y haga clic en el menú de 3 puntos. Seleccione **Abrir archivo**. Escriba "ton" para buscar componentes de botón. Anteriormente, los resultados incluían archivos de `node_modules`, uno de los archivos `node_modules` incluso se mostraba como el primer resultado.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/vi0yhKte5KN511F57FQM.png", alt="Ocultar archivos ignorados en el menú de comandos", width="800", height="425" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/9144105ce3efd70babe74c19e808616864be631b #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/c010ce7baa6930cb633372b5d8024a18b3f7ed66 #}

Chromium bug: [1336604](https://crbug.com/1336604)


<!-- ## New Interactions track in the Performance panel  {: #performance } -->
## Nueva pista de interacciones en el panel Rendimiento  {: #performance }

<!-- Use the new **Interactions** track in the **Performance** panel to visualize interactions and track down potential responsiveness issues.  -->
Use la nueva pista **Interacciones** en el panel **Rendimiento** para visualizar las interacciones y rastrear posibles problemas de capacidad de respuesta.

<!-- For example, [start a performance recording](/docs/devtools/evaluate-performance/#record ) on this [demo page](https://coffee-cart.netlify.app/?ad=1). Click on a coffee and stop recording. Two interactions show in the **Interactions** track. Both interactions have the same IDs, indicating the interactions are triggered from the same user interaction. -->
Por ejemplo, [inicie una grabación de rendimiento](/docs/devtools/evaluate-performance/#record) en esta [página de demostración](https://coffee-cart.netlify.app/?ad=1). Haz clic en un café y deja de grabar. Se muestran dos interacciones en la pista **Interacciones**. Ambas interacciones tienen los mismos ID, lo que indica que las interacciones se activan a partir de la misma interacción del usuario.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/LpHJbSGra2ZCHpy3ns7q.png", alt="Pista de interacciones en el panel Rendimiento", width="800", height="489" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/6d97228951a6c8884b3ac4b712e966e79f2bdc3c #}

Chromium bug: [1347390](https://crbug.com/1347390)


<!-- ## LCP timings breakdown in the Performance Insights panel {: #insights } -->
## Desglose de tiempos de LCP en el panel de pespectiva de rendimiento {: #insights }

<!-- The **Performance Insights** panel now shows the [timings breakdown](https://web.dev/optimize-lcp/#lcp-breakdown)  of the [Largest Containful Paint (LCP)](/docs/devtools/performance-insights/#largest-contentful-paint). Use these timings information to understand and identify an opportunity to improve LCP performance. -->


{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/hU6RmoRjFskL8P2ZAB9l.png", alt="Desglose de tiempos de LCP en el panel Perspectiva de Rendimiento", width="800", height="523" %}

{# https://chrome-internal.googlesource.com/devtools/devtools-internal/+/883542a3727a5bc1415ffee7c7bc7f7218d9e2a5 #}

Chromium bug: [1351735](https://crbug.com/1351735)


<!-- ## Auto-generate default name for recordings in the Recorder panel {: #recorder } -->
## Generar automáticamente el nombre predeterminado para las grabaciones en el panel Grabadora {: #recorder }


<!-- The **Recorder** panel now automatically generates a name for new recordings. -->
El panel **Recorder** ahora genera automáticamente un nombre para las nuevas grabaciones.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/0TMJgVqyk7AeoWIR6Vee.png", alt="Nombre predeterminado para las grabaciones en el panel Recorder", width="800", height="565" %}

{# https://chrome-internal.googlesource.com/devtools/devtools-internal/+/fbf1466b00d1ff2c36fce81fde1b21f33b689a76 #}

Chromium bug: [1351383](https://crbug.com/1351383)


<!-- ## Miscellaneous highlights {: #misc } -->
## Destacados varios {: #misc }

<!-- - Previously, [Recorder extensions](/docs/devtools/recorder/reference/#extension-troubleshooting) don’t show up in the **Recorder** panel from time to time. ([1351416](https://crbug.com/1351416)) -->
- Anteriormente, [Las extensiones para  el panel **Recorder**](/docs/devtools/recorder/reference/#extension-troubleshooting) no aparecían en el panel de vez en cuando. ([1351416](https://crbug.com/1351416))

<!-- - The **Styles** pane now displays a color picker for the [SVG `<stop>`](https://developer.mozilla.org/docs/Web/SVG/Element/stop) element’s `stop-color` property. ([1351096](https://crbug.com/1351096)) -->
- El panel **Estilos** ahora muestra un selector de color para la propiedad `stop-color` del elemento [SVG `<stop>`](https://developer.mozilla.org/docs/Web/SVG/Element/stop) . ([1351096](https://crbug.com/1351096))

<!-- - Identify script causing [layout](https://web.dev/avoid-large-complex-layouts-and-layout-thrashing/) as the potential root causes for layout shifts in the **Performance Insights** panel. ([1343019](https://crbug.com/1343019)) -->
- Identifique el script que está provocando la ejecución de [layout](https://web.dev/avoid-large-complex-layouts-and-layout-thrashing/) como una posible causa fundamental de cambios de diseño con el panel **Performance Insights**. ([1343019](https://crbug.com/1343019))

<!-- - Display critical path for LCP web fonts in the **Performance Insights** panel. ([1350390](https://crbug.com/1350390)) -->
- Se muestra la ruta crítica para las fuentes web LCP en el panel **Performance Insights**. ([1350390](https://crbug.com/1350390))

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/50a84ca8e5b556e27bb285477f21a99f0ccb7050 #}
{# https://chrome-internal.googlesource.com/devtools/devtools-internal/+/2687a701a67e543faeff3f936f215534bf8221bf #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/1f6ef0d58292665e06eded4059d8714a2e487e8a #}
{# https://chrome-internal.googlesource.com/devtools/devtools-internal/+/fe7254c9a51f964b2a106becc1b22f38033b9f50 #}


{% Partial 'devtools/reach-out.md' %}
{% Partial 'devtools/whats-new.md' %}
