---
layout: 'layouts/blog-post.njk'
title: 'Qué hay de nuevo en DevTools (Chrome 105)'
authors:
  - jecelynyeen
date: 2022-08-12
updated: 2022-08-12
description: 'Soporte de repetición paso a paso y de eventos "mouse over" (hover) en el panel Recorder, LCP en el panel Performance Insights y más.'
hero: 'image/dPDCek3EhZgLQPGtEG3y0fTn4v82/QCPLdRlFAqZuqPQG27yT.jpg'
alt: ''
tags:
  - new-in-devtools
  - devtools
  - chrome-105
---

_Gracias  por la traducción [Miguel Ángel](https://midu.dev) y por la revisión [Carlos Caballero](https://carloscaballero.io)._

{% Partial 'devtools/banner.md' %}
{% YouTube id='bHw_56RiVsg' %}

<!-- start: translation instructions -->
<!-- + 1. Remove the "draft: true" tag above when submitting PR -->
<!-- + 2. Provide translations under each of the English commented original content -->
<!-- + 3. Translate the "description" tag above -->
<!-- + 4. Translate all the <img> alt text -->
<!-- + 5. Update the whats-new.md file -->


<!-- ## Step-by-step replay in the Recorder {: #recorder } -->
## Reproducción paso a paso en la grabadora {: #recorder }

<!-- You can now set a breakpoint and replay a user flow step by step in the **Recorder** panel. -->
Ahora puede establecer un punto de interrupción y reproducir un flujo de usuario paso a paso en el panel de **Recorder**.

<!-- To set a breakpoint, click on the blue dot next to a step. Replay your user flow, the replay will pause before executing the step. From here, you can continue the replay, execute a step, or cancel the replay. -->
Para establecer un punto de interrupción, haga clic en el punto azul al lado de un paso. Reprodúzca su flujo de usuario, la reproducción se detendrá antes de ejecutar el paso. Desde aquí, puede continuar la reproducción, ejecutar un paso o cancelar la reproducción.

<!-- With this feature, you can fully visualize and debug your user flow with ease. -->
Con esta función, puede visualizar y depurar fácilmente su flujo de usuario.

<!-- See [Recorder features reference](/docs/devtools/recorder/reference/) for more information. -->
Visite [la referencia de características del panel Recorder](/docs/devtools/recorder/reference/) para más información.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/5RqFNkPTbtEXSC4KovNF.png", alt="Reproducción paso a paso en la grabadora", width="800", height="547" %}

Chromium issue: [1257499](https://crbug.com/1257499)

<!-- ## Support mouse over event in the Recorder panel {: #recorder-hover } -->
## Soporte de eventos de ratón en el panel Recorder {: #recorder-hover }

<!-- The **Recorder** now supports adding a mouse over (hover) step manually in a recording.  -->
**Recorder** ahora soporta añadir un paso de pasar el ratón por encima (hover) manualmente en una grabación.

<!-- [This demo](https://jec.fish/demo/menu-hover) shows a pop up menu on hover. Try to record a user flow and click a menu item. -->
[Esta demo](https://jec.fish/demo/menu-hover) muestra un menu flotante al pasar el ratón por encima. Intente grabar un flujo de usuario y haga clic en un elemento del menú.

<!-- If you replay the user flow now, it will fail because the **Recorder** doesn’t capture mouse over events automatically during recording. To resolve this, [add a step manually](/docs/devtools/recorder/reference/#add-and-remove-steps) to hover over the selector before clicking the menu item.  -->
Si reproduce el flujo de usuario ahora, fallará porque **Recorder** no captura automáticamente los eventos de ratón al grabar. Para resolver esto, [añada un paso manualmente](/docs/devtools/recorder/reference/#add-and-remove-steps) para pasar el ratón por encima del selector antes de hacer clic en el elemento del menú.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/GY1ZkqEU3zbGmhEKoblN.png", alt="Soporte de eventos de ratón en la Grabadora", width="800", height="488" %}

Chromium issue: [1257499](https://crbug.com/1257499)

<!-- ## Largest Contentful Paint (LCP) in the Performance insights panel {: #lcp } -->
## Largest Contentful Paint (LCP) en el panel Performance Insights {: #lcp }

<!-- LCP is an important, user-centric metric for measuring [perceived load speed](https://web.dev/user-centric-performance-metrics/#types-of-metrics). You can now find out the critical paths and root causes of a [Largest Contentful Paint (LCP)](https://web.dev/lcp/). -->
LCP es una métrica importante, centrada en el usuario, para medir [velocidad de carga percibida](https://web.dev/user-centric-performance-metrics/#types-of-metrics). Ahora puede conocer los caminos críticos y las causas raíz de un [Largest Contentful Paint (LCP)](https://web.dev/lcp/).

<!-- In a [performance recording](/docs/devtools/performance-insights/#record), click on the LCP badge in the **Timeline**. In the **Details** pane, you can view the LCP score, learn how to fix resources that slow down the LCP and see the critical path for the LCP resource. -->
En una grabación de rendimiento, haga clic en el sello LCP en la **Línea de tiempo**. En el panel de detalles, puede ver la puntuación del LCP, aprender cómo arreglar recursos que ralentizan el LCP y ver el camino crítico para el recurso LCP.

<!-- See [Performance Insights](/docs/devtools/performance-insights/) to learn how to get actionable insights and improve your website’s performance with the panel. -->
Vea [el panel Performance Insights](/docs/devtools/performance-insights) para saber cómo conseguir ideas accionables y mejorar el rendimiento de su sitio con el panel.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/NZZJ1FzXxqj2U2NR0U53.png", alt="LCP en el panel de percepción de rendimiento", width="800", height="751" %}

Chromium issue: [1326481](https://crbug.com/1326481)


<!-- ## Identify flashes of text (FOIT, FOUT) as potential root causes for layout shifts {: #foit-fout } -->
## Identificar parpadeos de texto (FOIT, FOUT) como causas potenciales de desplazamientos de diseño {: #foit-fout }

<!-- The **Performance insights** panel now detects [flash of invisible text (FOIT) and flash of unstyled text (FOUT)](https://web.dev/preload-optional-fonts/#font-rendering) as potential root causes for layout shifts. -->
El [panel Performance Insights](/docs/devtools/performance-insights/) ahora detecta [parpadeos de texto invisible (FOIT) y parpadeos de texto sin estilos (FOUT)](https://web.dev/preload-optional-fonts/#font-rendering) como causas potenciales de desplazamientos de diseño.

<!-- To view the potential root causes of a layout shift, click on a screenshot in the **Layout shifts** track. -->
Para ver las causas principales de un desplazamiento de diseño, haga clic en una captura de pantalla en la pista de **Desplazamientos de diseño**.

<!-- See [Optimize WebFont loading and rendering](https://web.dev/optimize-webfont-loading/) to learn the technique to prevent layout shifts.  -->
Vea [Optimizar carga de fuentes web y pintado](https://web.dev/optimize-webfont-loading/) para aprender la técnica para evitar desplazamientos de diseño.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/AMN5oD5hlKhPhnq98sIB.png", alt="FOUT en el panel Performance Insights", width="800", height="497" %}

Chromium issues: [1334628](https://crbug.com/1334628), [1328873](https://crbug.com/1328873)

<!-- ## Protocol handlers in the Manifest pane {: #manifest } -->
## Controladores de protocolo en el panel de Manifiesto {: #manifest }

<!-- You can now use DevTools to test the [URL protocol handler registration](https://web.dev/url-protocol-handler/) for [Progressive Web Apps (PWA)](https://web.dev/learn/pwa/). -->
Ahora puede usar DevTools para probar el [registro de controlador de protocolo de URL](https://web.dev/url-protocol-handler/) para [Aplicaciones Web Progresivas (PWA)](https://web.dev/learn/pwa/).

<!-- The URL protocol handler registration lets installed PWAs handle links that use a specific protocol (e.g. [`magnet`](https://wikipedia.org/wiki/Magnet_URI_scheme), `web+example`) for a more integrated experience. -->
El registro de controladores para el protocolo URL permite a las PWAs instaladas manejar enlaces que usen un protocolo específico (por ejemplo, [`magnet`](https://wikipedia.org/wiki/Magnet_URI_scheme), `web+example`) para una experiencia más integrada.

<!-- Navigate to the **Protocol Handlers** section via the **Application** > **Manifest** pane. You can view and test all the available protocols here. -->
Navegue a la sección de **Controladores de Protocolo** a través del panel **Aplicación** > **Manifiesto**. Puede ver y probar todos los protocolos disponibles aquí.

<!-- For example, install [this demo PWA](https://protocol-handler.glitch.me/). In the **Protocol Handlers** section, type “americano” and click **Test protocol** to open the coffee page in the PWA.  -->
Por ejemplo, instale [esta PWA de demostración](https://protocol-handler.glitch.me/). En la sección **Controladores de Protocolo**, escriba “americano” y haga clic en **Probar protocolo** para abrir la página de café en la PWA.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/DuH2YwkYGPpYjnUKln8m.png", alt="Controladores de protocolo en el panel de Manifiesto", width="800", height="402" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/cc2291cce5c5d199540334d01fcfe27207bc5962 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/1aa36584d580ed5aa2caf7a8533f2c89b16ab66b #}

Chromium issues: [1300613](https://crbug.com/1300613)


<!-- ## Top layer badge in the Elements panel {: #top-layer } -->
## Insignia de capa superior en el panel de Elementos {: #top-layer }

<!-- Use the [top layer badge](/blog/top-layer-devtools/#top-layer-support-design-in-devtools) to understand the concept of the top layer and visualize how the top layer content changes.  -->
Use la [insignia de capa superior](/blog/top-layer-devtools/#top-layer-support-design-in-devtools) para entender el concepto de la capa superior y visualizar cómo cambia el contenido de la capa superior.

<!-- The [`<dialog>` element](https://web.dev/building-a-dialog-component/) has recently become stable across browsers. When you open a dialog, it is put into a [top layer](/blog/top-layer-devtools/). Top level content renders on top of all the other content.  -->
El [elemento `<dialog>`](https://web.dev/building-a-dialog-component/) se volvió estable recientemente en todos los navegadores. Cuando abre un diálogo, se pone en una [capa superior](/blog/top-layer-devtools/). El contenido de nivel superior es pintado encima de todo el contenido.

<!-- In this [demo](https://jec.fish/demo/dialog), click **Open dialog**.  -->
En esta [demo](https://jec.fish/demo/dialog), haga clic en **Open dialog**.

<!-- To help visualize the top layer elements, DevTools adds a top layer container (`#top-layer`) to the DOM tree. It resides after the closing `</html>` tag.   -->
Para ayudar a visualizar los elementos de la capa superior, DevTools agrega un contenedor de capa superior (`#top-layer`) al árbol del DOM. Reside después de la etiqueta de cierre `</html>`.

<!-- To jump from the top layer container element to the top layer tree element, click the **reveal** button next to the element or its backdrop in the top layer container. -->
Para saltar del elemento del contenedor de la capa superior al elemento del árbol de la capa superior, haga clic en el botón **revelar** al lado del elemento o en el fondo del elemento en el contenedor de la capa superior.

<!-- Next to the top layer tree element (for example, the dialog element), click the **top-layer** badge to jump to the top layer container. -->
Al lado del elemento del árbol de la capa superior (por ejemplo, el elemento de diálogo), haga clic en la insignia **capa superior** para saltar al contenedor de la capa superior.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/pGMsiKw0IhplBMd4hZCv.png", alt="Insigna de capa superior en el panel de Elementos", width="800", height="538" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/a8d58fa6e258423aef2b00ead3aea563629eef43 #}

Chromium issue: [1313690](https://crbug.com/1313690)


<!-- ## Attach Wasm debugging information at runtime {: #wasm } -->
## Enlazar información de depuración de WASM al momento de ejecutar {: #wasm }

<!-- You can now attach DWARF debugging information for wasm during runtime. Previously, the **Sources** panel only supported attaching source maps to JavaScript and Wasm files. -->
Ahora puede enlazar la información de depuración DWARF para WASM durante el tiempo de ejecución. Antes, el panel **Fuentes** solo admitía enlazar mapas de origen a archivos JavaScript y WASM.

<!-- Open a Wasm file in the **Sources** panel. Right-click in the editor and select **Add DWARF debugging info…**  to attach debugging information on demand.  -->
Abra el archivo Wasm en el panel de **Fuentes**. Haga clic derecho en el editor y seleccione **Añadir información de depuración DWARF** para enlazar la información de depuración bajo demanda.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/i5DMV6DFNGRYkrXyBtlg.png", alt="Enlazar información de depuración de WASM al momento de ejecutar", width="800", height="559" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/112d6ec238ea3b1cb12f1cabc5b988afc74022db  #}

Chromium issue: [1341255](https://crbug.com/1341255)


<!-- ## Support live edit during debugging {: #live-edit } -->
## Soporte para edición en vivo durante la depuración {: #live-edit }

<!-- You can now edit the top-most function on the stack without restarting the debugger. -->
Ahora puede editar la función superior de la pila sin reiniciar el depurador.

<!-- In Chrome 104, DevTools brings back the [restart frame](/blog/new-in-devtools-104/) feature. However, you weren't able to edit the function you are currently paused in. It is common for developers to break in a function and then edit that function while paused.  -->
En Chrome 104, DevTools devuelve la función de [reiniciar frame](/blog/new-in-devtools-104/). Sin embargo, no se podía editar la función en la que estaba detenido. Es común para los desarrolladores que hagan una pausa en una función y luego editar esa función mientras está detenido.
<!-- With this update, the debugger automatically restarts the function with the following restrictions: -->
Con esta actualización, el depurador reinicia automáticamente la función con las siguientes restricciones:
<!-- - Only the top-most function can be edited while paused -->
- Solo la función superior puede ser editada mientras está detenido.
<!-- - No recursive call on the same function further down the stack -->
- No hay llamadas recursivas en la misma función más abajo en la pila.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/0PG2PnQUh5bnpIulyj7m.png", alt="Edición en vivo durante la depuración", width="800", height="560" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/b41deeb8b0b228ea4628a49e79a7ce4d8ab32ffa #}

Chromium issue: [1334484](https://crbug.com/1334484)


<!-- ## View and edit @scope at rules in the Styles pane {: #scope } -->
## Ver y editar las reglas de @scope en el panel de Estilos {: #scope }

<!-- You can now view and edit the [CSS `@scope` at-rules](https://drafts.csswg.org/css-cascade-6/#scope-atrule) in the **Styles** pane.  -->
Ahora puede ver y editar las [reglas de CSS `@scope`](https://drafts.csswg.org/css-cascade-6/#scope-atrule) en el panel de **Estilos**.

<!-- The `@scope` at rules is part of the [CSS Cascading and Inheritance Level 6 specification](https://drafts.csswg.org/css-cascade-6/). These rules allow developers to scope style rules in CSS. -->
Las reglas de `@scope` son parte de la [especificación de nivel de cascada y herencia de CSS Cascading and Inheritance Level 6](https://drafts.csswg.org/css-cascade-6/). Estas reglas permiten a los desarrolladores limitar las reglas de estilo en CSS.

<!-- Open [this demo page](https://codepen.io/miriamsuzanne/details/ZErXZVY) and inspect the hyperlink within the `<div class=”dark-theme”>` element. In the **Styles** pane, view the `@scope` at-rules. Click the rule declaration to edit it. -->
Abra [esta página de demostración](https://codepen.io/miriamsuzanne/details/ZErXZVY) e inspeccione el enlace dentro del elemento `<div class=”dark-theme”>`. En el panel de **Estilos**, vea las reglas de `@scope`. Haga clic en la declaración de la regla para editarla.

{% Aside %}

<!-- The CSS `@scope` is currently under development. To test this feature, enable the **Experimental Web Platform features** flag via `chrome://flags/#enable-experimental-web-platform-features`. -->
La regla de CSS `@scope` está actualmente en desarrollo. Para probar esta característica, active la opción **Experimental Web Platform features** mediante `chrome://flags/#enable-experimental-web-platform-features`.

{% endAside %}

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/LnkBUWoEl11HGiAD4ag7.png", alt="Reglas @scope en el panel de Estilos", width="800", height="464" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/8b2309caa9ea358bc07d4d48eb976cc3dc6884cd #}

Chromium issue: [1337777](https://crbug.com/1337777)


<!-- ## Source map improvements {: #sourcemaps } -->
## Mejoras en los mapas de código fuente {: #sourcemaps }

<!-- Here are a few fixes on source maps to improve the overall debugging experience: -->
Aquí hay algunos arreglos en los mapas de código fuente que mejoran la experiencia de depuración general:

<!-- - DevTools now properly resolves source map identifiers with punctuation. Some modern minifiers (for example, [esbuild](https://esbuild.github.io/)) produce sourcemaps that merge identifiers with subsequent punctuation (comma, parentheses, semicolon).  -->
- DevTools ahora resuelve correctamente los identificadores de mapas de código fuente con signos de puntuación. Algunos *minificadores* modernos (por ejemplo, [esbuild](https://esbuild.github.io/)) producen mapas de código fuente que fusionan identificadores con signos de puntuación (coma, paréntesis, punto y coma).
<!-- - DevTools now resolves source map names for constructors with a `super` call. -->
- DevTools ahora resuelve correctamente los nombres de mapas de código fuente para los constructores con una llamada a `super`.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/6djFfkrtPzXuNYq5m8Vk.png", alt="Devtools resuelve correctamente los nombres de mapas de código fuente", width="800", height="441" %}

<!-- - Fixed source map URL indexing for duplicate canonical URLs. Previously, breakpoints were not activated in some files because of duplicate canonical URLs. -->
- Se arregló el índice de URL de mapa de código fuente para URLs duplicadas. Antes, los puntos de ruptura no se activaban en algunos archivos porque tenían URLs duplicadas.

Chromium issue: [1335338](https://crbug.com/1335338), [1333411](https://crbug.com/1333411)

<!-- ## Miscellaneous highlights {: #misc } -->
## Otros detalles destacados {: #misc }
<!-- These are some noteworthy fixes in this release: -->
Estos son algunos arreglos destacados en esta versión:
<!-- - Properly remove a local storage key value pair from the table in the **Application** > **Local Storage** pane when it is deleted. ([1339280](https://crbug.com/1339280)) -->
- Borra correctamente un par de clave-valor de almacenamiento local de la tabla en el panel de **Aplicación** > **Almacenamiento local** cuando se elimina. ([1339280](https://crbug.com/1339280))
<!-- - The color previews are now correctly displayed when viewing CSS files in the **Sources** panel. Previously, their positions were misplaced. ([1340062](https://crbug.com/1340062)) -->
- Las vistas previas de color ahora se muestran correctamente cuando se vean archivos CSS en el panel de **Fuentes**. Antes, su posición estaba mal colocada. ([1340062](https://crbug.com/1340062))
<!-- - Consistently display the CSS flex and grid items in the **Layout** pane, as well as display them as badges in the **Elements** panel. Previously, the flex and grid items were randomly missing in both places. ([1340441](https://crbug.com/1340441), [1273992](https://crbug.com/1273992)) -->
- Muestra consistentemente los elementos flex y grid en el panel de **Diseño**, así como los muestra como insignias en el panel de **Elementos**. Antes, los elementos flex y grid faltaban de forma aleatoria en ambos lugares. ([1340441](https://crbug.com/1340441), [1273992](https://crbug.com/1273992))
<!-- - A new **Creator Ad Script** link is available for [ad frames](https://chromium.googlesource.com/chromium/src/+/master/docs/ad_tagging.md#adtracker) if DevTools found the script that caused the frame to be labeled as an ad. You can open a frame via **Application** > **Frames**. ([1217041](https://crbug.com/1217041)) -->
- Un nuevo enlace de **Script de anunciante** está disponible para los ([marcos de anuncios](https://chromium.googlesource.com/chromium/src/+/master/docs/ad_tagging.md#adtracker) si DevTools encontró el script que causó que el marco fuera etiquetado como un anuncio). Puede abrir un marco mediante **Aplicación** > **Marcos**. ([1217041](https://crbug.com/1217041))

{% Partial 'devtools/reach-out.md' %}
{% Partial 'devtools/whats-new.md' %}
