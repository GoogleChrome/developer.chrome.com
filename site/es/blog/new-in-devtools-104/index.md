---
layout: 'layouts/blog-post.njk'
title: 'Qué hay de nuevo en DevTools (Chrome 104)'
authors:
  - jecelynyeen
date: 2022-07-13
updated: 2022-07-13
description: "Reiniciar el frame durante la depuración, opciones de reproducción lenta en el panel Grabador y más."
hero: 'image/dPDCek3EhZgLQPGtEG3y0fTn4v82/9Ao1OaeKd2KqBwL1JyE7.jpg'
alt: ''
tags:
  - new-in-devtools
  - devtools
  - chrome-104
---

_Gracias  por la traducción [Carlos Caballero](https://carloscaballero.io) y  por la revisión [Miguel Ángel](https://midu.dev)._

{% Partial 'devtools/banner.md' %}

{% YouTube id='4RXWfw7Xg_Y' %}
<!-- start: translation instructions -->
<!-- + 1. Remove the "draft: true" tag above when submitting PR -->
<!-- + 2. Provide translations under each of the English commented original content -->
<!-- + 3. Translate the "description" tag above -->
<!-- + 4. Translate all the <img> alt text -->
<!-- + 5. Update the whats-new.md file -->

<!-- ## Restart frame during debugging {: #restart-frame } -->
## Reiniciar el marco durante la depuración {: #restart-frame }

<!-- The **Restart frame** feature is back! You can re-run the preceding code when paused somewhere in a function. Previously, this feature was deprecated and removed in Chrome 92 due to stability issues.  -->
¡Vuelve la función **Reiniciar marco**! Puede volver a ejecutar el código anterior cuando esté en pausa en cualquier lugar de una función. Anteriormente, esta función quedó obsoleta y se eliminó en Chrome 92 debido a problemas de estabilidad.

<!-- In this [example](https://jec.fish/), the debugger initially paused at the breakpoint (line 343) near the end of the `toggleColorScheme` function. To restart the debugging from the beginning of the `toggleColorScheme` function, expand the **Call stack** section in the **Debugger** pane, right click on `toggleColorScheme` and select **Restart frame**.  -->
En este [ejemplo](https://jec.fish/), el depurador inicialmente se detuvo en el punto de interrupción (línea 343) cerca del final de la función `toggleColorScheme`. Para reiniciar la depuración desde el principio de la función `toggleColorScheme`, expanda la sección **Pila de llamadas** en el panel **Depurador**, haga clic derecho en `toggleColorScheme` y seleccione **Reiniciar marco**



{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/uBcTkuIaoHHTgJCiGNED.png", alt="Reiniciar el marco durante la depuración", width="800", height="499" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/7f6749f5cbbfc7d3c89cb2b6b3557d0ff33536ad #}

Chromium issue: [1303521](https://crbug.com/1303521)


<!-- ## Slow replay options in the Recorder panel {: #recorder } -->
## Opciones de reproducción lenta en el panel Grabador {: #recorder }

<!-- You can now replay user flows at a slower speed — slow, very slow, and extremely slow. These options let you better observe each step replay on screen. -->
Ahora puede reproducir flujos de usuario a una velocidad más lenta: lenta, muy lenta y extremadamente lenta. Estas opciones le permiten observar mejor la repetición de cada paso en la pantalla.

<!-- [Open](/docs/devtools/recorder/#open) the **Recorder** panel and [start a new recording](/docs/devtools/recorder/#record). Once the recording is done, click on the **Replay** dropdown button. Select a speed to start a replay. -->
[Abrir](/docs/devtools/recorder/#open) el panel **Grabadora** e [iniciar una nueva grabación](/docs/devtools/recorder/#record). Una vez finalizada la grabación, haga clic en el botón desplegable **Reproducir**. Seleccione una velocidad para iniciar una repetición.


{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/yLIIMlaew0EWfEYdDbXJ.png", alt="Opciones de reproducción lenta en el panel Grabador", width="800", height="486" %}

Chromium issue: [1306756](https://crbug.com/1306756)


<!-- ## Build an extension for the Recorder panel {: #recorder-extension } -->
## Cree una extensión para el panel de la grabadora {: #recorder-extension }

<!-- You can now build or install a Chrome extension to export replay scripts in your favorite format. See [Recorder extension API](/docs/extensions/reference/devtools_recorder/) documentation to learn how to build one. -->
Ahora puede crear o instalar una extensión de Chrome para exportar secuencias de comandos de reproducción en su formato favorito. Consulte la documentación de [API de extensión de grabadora](/docs/extensions/reference/devtools_recorder/) para obtener información sobre cómo crear una.


<!-- To install a demo extension, follow [these steps](https://github.com/puppeteer/replay#create-a-chrome-extension-for-recorder-available-from-chrome-104-onwards) outlined in the documentation.  -->
Para instalar una extensión de demostración, siga [estos pasos](https://github.com/puppeteer/replay#create-a-chrome-extension-for-recorder-disponible-from-chrome-104-onwards) descritos en la documentación.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/xRO1d79tBe0ILcBoD0oh.png", alt="extensión personalizada para el panel Grabador", width="800", height="486" %}

Chromium issue: [1325751](https://crbug.com/1325751)


<!-- ## Group files by Authored / Deployed in the Sources panel {: #authored-deployed } -->
# Agrupar archivos por Autoría/Implementación en el panel Fuentes {: #autoría-implementación}

<!-- Enable the new **Group files by Authored / Deployed** option to organize your files in the Sources panel. When developing web applications with frameworks (for example, React, Angular), it can be difficult to navigate the source files due to the minified files generated by the build tools (for example, Webpack, Vite).  -->
Habilite la nueva opción **Agrupar archivos por Autor/Implementado** para organizar sus archivos en el panel Fuentes. Al desarrollar aplicaciones web con marcos (por ejemplo, React, Angular), puede resultar difícil navegar por los archivos de origen debido a los archivos minimizados generados por las herramientas de compilación (por ejemplo, Webpack, Vite).


<!-- With this checkbox, you can group files into 2 categories for quicker file search: -->
Con esta casilla de verificación, puede agrupar archivos en 2 categorías para una búsqueda de archivos más rápida:

<!-- - **Authored**. Similar to the source files you view in your IDE. DevTools generates these files based on source maps (provided by your build tools).
- **Deployed**. The actual files that the browser reads. Usually these files are minified. -->
- **Autor**. Similar a los archivos fuente que ve en su IDE. DevTools genera estos archivos en función de los mapas de origen (proporcionados por sus herramientas de compilación).
- **Desplegada**. Los archivos reales que lee el navegador. Por lo general, estos archivos se minimizan.

<!-- Try it yourself with this [React demo](https://reactjs.org/)! -->
¡Pruébelo usted mismo con esta [demostración de React](https://reactjs.org/)!

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/5E1qbkl0Gx1REx7FdqEr.png", alt="Agrupar archivos por Autoría/Implementación en el panel Orígenes", width="800", height="521" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/6bc65d0595702fc826ca87e2cfe519a134b62d90 #}

Chromium issue: [960909](https://crbug.com/960909)


<!-- ## New User Timings track in the Performance insights panel {: #performance } -->
## Nueva pista de tiempos de usuario en el panel de información de rendimiento {: #rendimiento}


<!-- Visualize `performance.measure()` marks in your recording with the new **User Timings** track in the **Performance insights** panel. -->
Visualice las marcas `performance.measure()` en su grabación con la nueva pista **User Timings** en el panel **Performance insights**.

<!-- For example, this [web page](https://jec.fish/demo/perf-measure) uses the [`performance.measure()`](https://web.dev/usertiming/#calculating-measurements-with-measure()) method to calculate the elapsed time of text loading. -->
Por ejemplo, esta [página web](https://jec.fish/demo/perf-measure) utiliza [`performance.measure()`](https://web.dev/usertiming/#calculating-measurements- with-measure()) método para calcular el tiempo transcurrido de carga de texto.

<!-- When you start [measuring the page load](/docs/devtools/performance-insights/#record), the **User Timings** track shows in the recording. Click on the timings item to view its details on the side pane. -->
Cuando comienzas a [medir la carga de la página](/docs/devtools/performance-insights/#record), la pista **Tiempos de usuario** se muestra en la grabación. Haga clic en el elemento de tiempos para ver sus detalles en el panel lateral.


{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/nxPCp6UaiGWJCWWx4Laa.png", alt="Seguimiento de tiempos de usuario en el panel de información de rendimiento", width="800", height="499" %}

Chromium issue: [1322808](https://crbug.com/1322808)


<!-- ## Reveal assigned slot of an element {: #slot } -->
## Revelar el slot asignado de un elemento

<!-- Slotted elements in the **Elements** panel have a new `slot` badge. When debugging layout issues, use this feature to identify the element which affects the node's layout quicker.  -->
Los elementos que tienen asignado un slot en el panel **Elementos** tienen una nueva insignia `slot`. Al depurar problemas de diseño, use esta característica para identificar el elemento que afecta el diseño del nodo más rápido.


<!-- This [example](https://mdn.github.io/web-components-examples/slotted-pseudo-element/) contains cards with a few named slots. Inspect the `person-occupation` slot of a card, click the `slot` badge next to it to reveal its assigned slot. -->
Este [ejemplo](https://mdn.github.io/web-components-examples/slotted-pseudo-element/) contiene tarjetas con algunos `slots` con nombre. Inspeccione el `slot` de "ocupación de persona" de una tarjeta, haga clic en la insignia de "slot" junto a ella para revelar su slot asignado.

<!-- [Learn](https://developer.mozilla.org/docs/Web/Web_Components/Using_templates_and_slots) how to use [<template>](https://developer.mozilla.org/docs/Web/HTML/Element/template) and [<slot>](https://developer.mozilla.org/docs/Web/HTML/Element/slot) elements to create a flexible template that can then be used to populate the shadow DOM of a web component. -->
[Aprende](https://developer.mozilla.org/docs/Web/Web_Components/Using_templates_and_slots) cómo usar [<template>](https://developer.mozilla.org/docs/Web/HTML/Element/template ) y [<slot>](https://developer.mozilla.org/docs/Web/HTML/Element/slot) elementos para crear una plantilla flexible que luego se puede usar para completar el DOM oculto de un componente web.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/7uQGHp9WoMCG1RIAkgIF.png", alt="Revelar el slot asignado de un elemento", width="800", height="486" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/164e238dabefc08018318a981131eedf2e81736b #}

Chromium issue: [1018906](https://crbug.com/1018906)


<!-- ## Simulate hardware concurrency for Performance recordings {: #simulate } -->
## Simule la concurrencia de hardware en las grabaciones de rendimiento {: #simulate }

<!-- The new **Hardware concurrency** setting in the **Performance** panel allows developers to configure the value reported by `navigator.hardwareConcurrency`. -->
La nueva configuración de **Simultaneidad de hardware** en el panel **Rendimiento** permite a los desarrolladores configurar el valor informado por `navigator.hardwareConcurrency`.

<!-- Some applications use `navigator.hardwareConcurrency` to control the degree of parallelism of their application, for example, to control Emscripten pthread pool size. With this feature, developers can test their application performance with different core counts. -->
Algunas aplicaciones usan `navigator.hardwareConcurrency` para controlar el grado de paralelismo de su aplicación, por ejemplo, para controlar el tamaño del conjunto de subprocesos de Emscripten. Con esta función, los desarrolladores pueden probar el rendimiento de su aplicación con diferentes recuentos de núcleos.


{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/PyykGRv29FZbBKJAwWOW.png", alt="Simule la concurrencia de hardware para grabaciones de rendimiento", width="800", height="536" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/b26de259d74a45e700d989ad9178c5e3a8b73145 #}

Chromium issue: [1297439](https://crbug.com/1297439)


<!-- ## Preview non-color value when autocompleting CSS variables {: #css-var } -->
## Vista previa del valor sin color al autocompletar variables CSS


<!-- When autocompleting CSS variables, DevTools now populates the non-color variable with a meaningful value so that you can preview what kind of change the value will have on the node. -->
Al completar automáticamente las variables CSS, DevTools ahora completa la variable sin color con un valor significativo para que pueda obtener una vista previa de qué tipo de cambio tendrá el valor en el nodo.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/V4slwNtX9HwLPdAyr8JF.png", alt="Vista previa del valor sin color al autocompletar variables CSS", width="800", height="431" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/977cc58cb5654a2b68142ef8ac1b3f9ac2822694 #}

Chromium issue: [1285091](https://crbug.com/1285091)


<!-- ## Identify blocking frames in the Back/forward cache pane {: #bfcache } -->
## Identifique los marcos de bloqueo en el panel de caché Atrás/Adelante {: #bfcache }


<!-- The [Back/forward cache](/docs/devtools/application/back-forward-cache/) pane in the **Application** panel has new **frames** section to help you identify blocking frames that may be preventing the page from being eligible for bfcache. -->
El panel [Caché atrás/adelante](/docs/devtools/application/back-forward-cache/) en el panel **Aplicación** tiene una nueva sección de **marcos** para ayudarlo a identificar los marcos de bloqueo que pueden estar impidiendo que la página sea elegible para bfcache.


{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/UaRYEoYYoXhjSIn9seYK.png", alt="Identifique los marcos de bloqueo en el panel de caché Atrás/Adelante", width="800", height="486" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/897799b24fff0639d483111dd2d957288ba2bd06 #}

Chromium issue: [1288158](https://crbug.com/1288158)


<!-- ## Improved autocomplete suggestions for JavaScript objects {: #autocomplete } -->
## Sugerencias de autocompletado mejoradas para objetos de JavaScript{: #autocomplete }

<!-- The the autocompletion for JavaScript object properties now display based on this order: -->
Las propiedades de autocompletado para objetos de JavaScript ahora se muestran según este orden:

<!-- 1. Own enumerable properties
2. Own non-enumerable properties
3. Inherited enumerable properties
4. Inherited non-enumerable properties -->
1. Propiedades enumerables propias
2. Propiedades no enumerables propias
3. Propiedades enumerables heredadas
4. Propiedades no enumerables heredadas

<!-- Previously, developers found it harder to find relevant properties because the suggestion only favored own properties over inherited properties, and all inherited properties were given equal priority. -->
Anteriormente, a los desarrolladores les resultaba más difícil encontrar propiedades relevantes porque la sugerencia solo favorecía las propiedades propias sobre las propiedades heredadas, y todas las propiedades heredadas tenían la misma prioridad.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/IvFTcOWrBOTTMRHqn8u4.png", alt="Sugerencias de autocompletado mejoradas para objetos de JavaScript", width="800", height="563" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/cee5205ae93c95b1dce49e220b9ebfa8c998d5a6 #}

Chromium issue: [1299241](https://crbug.com/1299241)


<!-- ## Source maps improvements {: #sourcemaps } -->
## Mejoras en los mapas de origen {: #sourcemaps }

<!-- Here are a few fixes on source maps to improve the overall debugging experience: -->
 Aquí hay algunas correcciones en los mapas de origen para mejorar la experiencia general de depuración:

<!-- - Breakpoints now work in inline `<script>` with sourceURL annotations. -->
- Los puntos de interrupción ahora funcionan en `<script>` en línea con anotaciones sourceURL.

<!-- - The debugger now resolves block scoped variables in the **Scope** view with source maps. -->
- El depurador ahora resuelve las variables de ámbito de bloque en la vista **Alcance** con mapas de origen.


  {% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/gv9cGnDMF7OVlXPWntII.png", alt="Resuelve variables de ámbito de bloque", width="800", height="532" %}
<!-- - The debugger now resolves variables in arrow functions in the **Scope** view with source maps. -->
- El depurador ahora resuelve variables en funciones de flecha en la vista **Alcance** con mapas de origen.


  {% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/CZk0xjwMQAqknkW5G4Xf.png", alt="Resuelve variables en funciones de flecha", width="800", height="479" %}

Chromium issues: [1329113](https://crbug.com/1329113), [1322115](https://crbug.com/1322115)


<!-- ## Miscellaneous highlights {: #misc } -->
## Destacados varios {: #misc }


<!-- These are some noteworthy fixes in this release: -->
Estas son algunas correcciones notables en esta versión:

<!-- - Fixed the **Auto-completion** setting for the **Sources** panel. Previously, the auto-complete always on even the setting is disabled. ([1323286](https://crbug.com/1323286)) -->
- Se corrigió la configuración de **Autocompletar** para el panel de **Fuentes**. Anteriormente, la función de autocompletar siempre estaba activada, incluso si la configuración estaba deshabilitada. ([1323286](https://crbug.com/1323286))


<!-- - Updated the **Manifest** tab in the **Application** panel to parse the latest color scheme format. ([1318305](https://crbug.com/1318305)) -->
- Se actualizó la pestaña **Manifiesto** en el panel **Aplicación** para analizar el último formato de combinación de colores. ([1318305](https://crbug.com/1318305))

<!-- - Improved the suggestions for the `<script async>` rendering blocking issues in the **Performance insights** panel. Previously,  DevTools suggested to `add async attribute to the script tag` even though the script is already marked as async. ([1334096](https://crbug.com/1334096)) -->
- Se mejoraron las sugerencias para los problemas de bloqueo de representación de `<script async>` en el panel **Perspectivas de rendimiento**. Anteriormente, DevTools sugirió "agregar un atributo asíncrono a la etiqueta del script" aunque el script ya esté marcado como asíncrono. ([1334096](https://crbug.com/1334096))

<!-- - The **Performance insights** panel now detects iframes as potential causes for layout shifts. You can view the iframe details in the **Details** pane. ([1328873](https://crbug.com/1328873)) -->
- El panel **Perspectivas de rendimiento** ahora detecta iframes como posibles causas de cambios de diseño. Puede ver los detalles del iframe en el panel **Detalles**. ([1328873](https://crbug.com/1328873))

<!-- - When [open file](/docs/devtools/resources/#open) in the **Command menu**, the authored files (files generated by source maps) are now ranked higher so they appear above similarly named deployed scripts. ([1312929](https://crbug.com/1312929))  -->

- Cuando [abrir archivo](/docs/devtools/resources/#open) en el **Menú de comandos**, los archivos creados (archivos generados por mapas de origen) ahora se clasifican más alto para que aparezcan encima de los scripts implementados con nombres similares. ([1312929](https://crbug.com/1312929))

{% Partial 'devtools/reach-out.md' %}
{% Partial 'devtools/whats-new.md' %}
