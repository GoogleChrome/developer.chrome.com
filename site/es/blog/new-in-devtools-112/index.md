---
layout: 'layouts/blog-post.njk'
title: "Qué hay de nuevo en DevTools (Chrome 112)"
authors:
  - jecelynyeen
date: 2023-03-09
description: ""
hero: 'image/dPDCek3EhZgLQPGtEG3y0fTn4v82/GW5JgGha6aT2shvuONTv.png'
alt: 'Personalización de la reproducción de la grabadora, documentación de CSS, scripts irrelevantes en la lista de ignorados, depuración mejorada de puntos de registro y más.'
tags:
  - new-in-devtools
  - devtools
  - chrome-112
draft: false
---

*Gracias por la traducción [Carlos Caballero](https://carloscaballero.io) y por la revisión [Miguel Ángel](https://midu.dev)*

{% Partial 'devtools/banner.md' %}

<!-- Translation instructions:
  1. Remove the "draft: true" tag above when submitting PR
  2. Provide translations under each of the English commented original content
  3. Translate the "description" tag above
  4. Translate all the <img> alt text
  5. Update the sites/es/_partials/devtools/whats-new.md file -->


<!-- ## Recorder updates {: #recorder } -->
## Actualizaciones de la grabadora {: #recorder }

<!-- ### Replay extensions support {: #replay-extensions } -->
### Compatibilidad con extensiones de reproducción {: #replay-extensions }

<!-- The **Recorder** introduces support for custom replay options that you can embed into DevTools with an extension. -->
La **Grabadora** admite opciones de reproducción personalizadas que puedes integrar en DevTools con una extensión.

<!-- Try out the [example extension](https://github.com/puppeteer/replay/tree/main/examples/chrome-extension-replay). Select the new custom replay option to open the custom replay UI. -->
Pruebe la [extensión de ejemplo](https://github.com/puppeteer/replay/tree/main/examples/chrome-extension-replay). Seleccione la nueva opción de reproducción personalizada para abrir la interfaz de usuario de reproducción personalizada.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/CAQFVtHyds7ByB0YMZht.png", alt="Interfaz de usuario de reproducción personalizada.", width="800", height="563" %}

<!-- To customize the **Recorder** to your needs and integrate it with your tools, consider developing your own extension: explore the [chrome.devtools.recorder API](/docs/extensions/reference/devtools_recorder/) and check out more [extension examples](https://github.com/puppeteer/replay/tree/main/examples/). -->
Para personalizar la **Grabadora** según sus necesidades e integrarla con sus herramientas, considere desarrollar su propia extensión: explore la [API chrome.devtools.recorder](/docs/extensions/reference/devtools_recorder/) y vea más [ejemplos de extensión](https://github.com/puppeteer/replay/tree/main/examples/).

{# https://chrome-internal.googlesource.com/devtools/devtools-internal/+/c2102177581f1c74d38502f469d99b20c1835b1c #}
{# https://chrome-internal.googlesource.com/devtools/devtools-internal/+/e304e064dbead1d684b5c61f4fb308b101b4a66b #}

Chromium issue: [1400243](https://crbug.com/1400243).

<!-- ### Record with pierce selectors {: #pierce-selectors } -->
### Grabar con selectores *pierce*  {: #pierce-selectors }

<!-- In addition to [custom, CSS, ARIA, text, and XPath selectors](/docs/devtools/recorder/reference/#selector), you can now record using [pierce selectors](https://pptr.dev/guides/query-selectors#pierce-selectors-pierce). These selectors behave like CSS ones but can also pierce through shadow roots. -->
Además de [selectores personalizados, CSS, ARIA, texto y XPath](/docs/devtools/recorder/reference/#selector), ahora puede grabar usando [Pierce](https://pptr.dev/guides/query-selectors#pierce-selectors-pierce). Estos selectores se comportan como los de CSS, pero también pueden navegar a través de los nodos ocultos.


<!-- Start a new recording on a page with [shadow DOM](https://web.dev/shadowdom-v1/) and check {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/hmp8j3HiLMCcqPArD9yt.svg", alt="Checkbox.", width="22", height="22" %} **Pierce** in **Selector types to record**. Record your interaction with elements in the shadow DOM and inspect the corresponding step. -->
Inicie una nueva grabación en una página con [shadow DOM](https://web.dev/shadowdom-v1/) y marque {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/hmp8j3HiLMCcqPArD9yt.svg", alt="Checkbox.", width="22", height="22" %} **Pierce** en **Tipos de selector para grabar**. Registre su interacción con los elementos en el shadow DOM e inspeccione el paso correspondiente.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/Spqbf2DG3Fr0D2sc1kgC.png", alt="Configuración de la grabadora para usar selectores Pierce; Selector Pierce en acción.", width="800", height="534" %}

{# https://chrome-internal.googlesource.com/devtools/devtools-internal/+/a3968d1c01dd4d1a00b9aa13c50bfdc66995879e #}

Chromium issue: [1411188](https://crbug.com/1411188).

<!-- ### Export as a Puppeteer script with Lighthouse analysis {: #puppeteer-lighthouse } -->
### Exportar como script de Puppeteer con análisis de Lighthouse {: #puppeteer-lighthouse }


<!-- The **Recorder** introduces a new export option: **Puppeteer (including Lighthouse analysis)**. With [Puppeteer](/docs/puppeteer/), you can automate and control Chrome. With [Lighthouse](/docs/lighthouse/), you can capture and improve your website's performance. -->
La **Grabadora** presenta una nueva opción de exportación: **Puppeteer (incluyendo el análisis de Lighthouse)**. Con [Puppeteer](/docs/puppeteer/), puede automatizar y controlar Chrome. Con [Lighthouse](/docs/lighthouse/), puede capturar y mejorar el rendimiento de su sitio web.

<!-- Open your recording, click {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/4dU9UXvsinS4zbgjd8rK.svg", alt="Export.", width="20", height="20" %} **Export**, select the new option, and save the `.js` file. -->
Abra su grabación, haga clic en {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/4dU9UXvsinS4zbgjd8rK.svg", alt="Exportar.", width="20", height="20" %} **Exportar**, seleccione la nueva opción y guarde el archivo `.js`.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/ko6OD4tgGwUxqCJScYr9.png", alt="Exportar a Puppeteer (incluyendo análisis de Lighthouse).", width="800", height="584" %}

<!-- [Run the Puppeteer script](/docs/puppeteer/get-started/) to get a Lighthouse report in a `flow.report.html` file. -->
[Ejecutar el script de Puppeteer](/docs/puppeteer/get-started/) para obtener un reporte de Lighthouse en un fichero i`flow.report.html`.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/pfvZ3QX0XhhbDBxpsyBF.png", alt="El reporte Lighthouse abierto en Chrome.", width="800", height="690" %}

{# https://chrome-internal.googlesource.com/devtools/devtools-internal/+/fcaf72d9134e54140cab41c011b7520dd168a340 #}

<!-- ### Get extensions {: #get-extensions } -->
### Obtener extensiones {: #get-extensions }

<!-- Explore options to customize your recorder experience, for example, with custom export options. Get extensions for the **Recorder** by clicking the {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/4dU9UXvsinS4zbgjd8rK.svg", alt="Export.", width="20", height="20" %} **Export** > **Get extensions** in a recording. -->
Explore opciones para personalizar su experiencia con la grabadora, por ejemplo, con opciones de exportación personalizadas. Obtenga extensiones para la **Grabadora** haciendo clic en {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/4dU9UXvsinS4zbgjd8rK.svg", alt="Exportar.", width="20", height="20" %} **Exportar** > **Obtener extensiones** en una grabación.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/vwgXoxR0FyArbCHvdvEY.png", alt="La opción obtener extensiones en el menú desplegable exportar.", width="800", height="649" %}

<!-- Feel free to [add your own extension](https://github.com/GoogleChrome/developer.chrome.com/edit/main/site/en/docs/devtools/recorder/extensions/index.md) to the list of [Recorder Extensions](/docs/devtools/recorder/extensions/). We look forward to seeing yours on the list! -->
No dude en [añadir su propia extensión](https://github.com/GoogleChrome/developer.chrome.com/edit/main/site/en/docs/devtools/recorder/extensions/index.md) a la lista de [Extensiones de la Grabadora](/docs/devtools/recorder/extensions/). ¡Esperamos ver el tuyo en la lista!

{# https://chrome-internal.googlesource.com/devtools/devtools-internal/+/21e3d3275c47df8b79c72d1a3e8f9d26cc11fc04 #}
{# https://chrome-internal.googlesource.com/devtools/devtools-internal/+/b6d02827539eb54869cbb75d3705782bfd2c95ae #}

Chromium issues: [1417104](https://crbug.com/1417104), [1413168](https://crbug.com/1413168).

<!-- ## Elements > Styles updates {: #elements-styles } -->
## Elementos > Actualizaciones de estilos {: #elements-styles }
<!-- ### CSS documentation {: #css } -->
### Documentación CSS {: #css }

<!-- How many times a day do you look up documentation on CSS properties? The **Elements** > **Styles** pane now shows you a short description when you hover over a property. -->
¿Cuántas veces al día busca documentación sobre propiedades CSS? El panel **Elementos** > **Estilos** ahora le muestra una breve descripción cuando pasa el cursor sobre una propiedad.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/v0joPkQg0NiMauy0bwwB.png", alt="El tooltip de documentación acerca de una propiedad CSS.", width="800", height="651" %}

<!-- The tooltip also has a **Learn more** link that takes you to an [MDN CSS Reference](https://developer.mozilla.org/docs/Web/CSS/Reference) on this property. -->
El tooltip también tiene un enlace **Más información** que lo lleva a una [Referencia de CSS de MDN](https://developer.mozilla.org/docs/Web/CSS/Reference) en esta propiedad.

<!-- If you know CSS well, you might find the tooltips bothersome. To turn them all off, check {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/hmp8j3HiLMCcqPArD9yt.svg", alt="Checkbox.", width="22", height="22" %} **Don't show**. -->
Si conoce bien CSS, es posible que la información mostrada en el tooltip le resulte molesta. Para desactivarlos, marca {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/hmp8j3HiLMCcqPArD9yt.svg", alt="Checkbox.", width="22", height="22" %} **No mostrar**

<!-- To turn them back on, check {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/9gzXiTYY0nZzBxGI6KrV.svg", alt="Settings.", width="24", height="24" %} [**Settings** > **Preferences** > **Elements**](/docs/devtools/settings/preferences/#elements) > {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/hmp8j3HiLMCcqPArD9yt.svg", alt="Checkbox.", width="22", height="22" %} **Show CSS documentation tooltip**. -->
Para volver a activarlos, marca {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/9gzXiTYY0nZzBxGI6KrV.svg", alt="Configuración.", width="24", height="24" %} [**Configuración** > * *Preferencias** > **Elementos**](/docs/devtools/settings/preferences/#elements) > {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/hmp8j3HiLMCcqPArD9yt.svg", alt="Checkbox.", width=" 22", height="22" %} **Mostrar información sobre herramientas de la documentación de CSS**.

{% Aside %}
<!-- DevTools pulls the descriptions for tooltips from [VS Code Custom Data](https://github.com/microsoft/vscode-custom-data). -->
DevTools extrae las descripciones de [Datos personalizados de VS Code] (https://github.com/microsoft/vscode-custom-data) para mostrarlas en los tooltips.
{% endAside %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/f5266ee227449dbbc3bc599df1b38cdb36cae4cb #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/d4748c98971bfff697f209fe11de892a5b93aca6 #}

Chromium issue: [1401107](https://crbug.com/1401107).

<!-- ### CSS nesting support {: #nesting } -->
### Soporte de anidamiento de CSS {: #nesting }

<!-- The **Elements** > **Styles** pane now recognizes [CSS Nesting](/articles/css-nesting/) syntax and applies nested styles to the right elements. -->
El panel **Elementos** > **Estilos** ahora reconoce la sintaxis [CSS anidados](/articles/css-nesting/) y aplica estilos anidados a los elementos correctos.

{% Video src="video/NJdAV9UgKuN8AhoaPBquL7giZQo1/Wog2uOaJTV84OtXcHpYH.mp4", autoplay="true", muted="true", loop="true", controls="true", class="screenshot" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/f1ed9b6180cb75fcfd43dfac95ac9a40c35e03df #}

Chromium issue: [1172985](https://crbug.com/1172985).

<!-- ## Marking logpoints and conditional breakpoints in the Console {: #logpoint } -->
## Marcado de puntos de registro y puntos de interrupción condicionales en la Consola {: #logpoint }

<!-- Further improving the [enhanced breakpoint UX](/blog/new-in-devtools-111/#breakpoint-redesign), the **Console** now marks messages triggered by breakpoints: -->
Mejorando la [UX de los puntos de interrupción](/blog/new-in-devtools-111/#breakpoint-redesign), la **Consola** ahora marca los mensajes activados por los puntos de interrupción:

<!-- - `console.*` calls in [conditional breakpoints](/docs/devtools/javascript/breakpoints/#conditional-loc) with an orange question mark `?` -->
- Llamadas `console.*` en [puntos de interrupción condicionales](/docs/devtools/javascript/breakpoints/#conditional-loc) con un signo de interrogación naranja `?`
<!-- - [Logpoint](/docs/devtools/javascript/breakpoints/#log-loc) messages with pink two dots `..` -->
- Mensajes [Logpoint](/docs/devtools/javascript/breakpoints/#log-loc) con dos puntos rosas `..`

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/5udIX9W4LFcDb3H6DuDp.png", alt="Cambios en la forma en que la consola ahora muestra los mensajes activados por puntos de interrupción: con íconos y un enlace de origen adecuado.", width="800", height="566" %}

<!-- The **Console** now gives you proper anchor links to breakpoints in source files instead of `VM<number>` scripts that Chrome creates to run any piece of Javascript on [V8](https://v8.dev/). -->
La **Consola** ahora le brinda enlaces de anclaje adecuados a los puntos de interrupción en los archivos de origen en lugar de las secuencias de comandos `VM<number>` que Chrome crea para ejecutar cualquier pieza de Javascript en [V8](https://v8.dev/).

<!-- Click the link next to the breakpoint message to jump directly to the breakpoint editor. -->
Haga clic en el enlace junto al mensaje de punto de interrupción para ir directamente al editor de punto de interrupción.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/8lAz0lb168HXKvhscP2Q.png", alt="El vínculo ancla junto a un mensaje de punto de registro que abre el editor de punto de interrupción.", width="800", height="811" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/c845a441b0fe05c22f88cdb23463edee2b5985b7 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/9762db476cd7414d3ce351f32a0564421f66901f #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/42448cc63567ac407fd2088597da83aff17c5b55 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/4739f48e50d41025aba3c2af94e61cc3069aa563 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/bb0e41ed3c30bd988c49a76f0cf084f58c0bddc2 #}

Chromium issue: [1027458](https://crbug.com/1027458).

<!-- ## Ignore irrelevant scripts during debugging {: #ignore-list } -->
## Ignorar scripts irrelevantes durante la depuración {: #ignore-list }

<!-- To help you focus on the most important parts of your code, you can now add irrelevant scripts to the **Ignore List** right from the file tree on the **Sources** > **Page** pane. -->
Para ayudarle a concentrarse en las partes más importantes de su código, ahora puede agregar secuencias de comandos irrelevantes a la **Lista de ignorados** directamente desde el árbol de ficheros en el panel **Fuentes** > **Página**.

<!-- Right-click any script or folder and select one of the ignore-related options. You may see options to add or remove the script or folder to and from the list. The [Debugger ignores scripts](/docs/devtools/javascript/reference/#show-ignore-listed-frames) added to the list and omits them in the call stack.  -->
Haga clic derecho en cualquier script o directorio y seleccione una de las opciones relacionadas con ignorar. Es posible que vea opciones para agregar o eliminar el script o el directorio de la lista. El [Depurador ignora los scripts](/docs/devtools/javascript/reference/#show-ignore-listed-frames) agregados a la lista y los omite en la pila de llamadas.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/RrL7ZmzMjfhtH4gUW3ST.png", alt="Menús contextuales de un directorio y script con opciones relacionadas con ignorar.", width="800", height="521" %}

<!-- All ignore-listed scripts and folders are grayed out in the file tree. -->
Todos los scripts y directorios que se ignoran aparecen atenuados en el árbol de archivos.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/DRI11RoakrLnwLZPOJPO.png", alt="Los directorios y scripts de la lista de ignorados están atenuados, puede ocultarlos con una opción experimental en el menú desplegable 'Más opciones' .", width="800", height="542" %}

<!-- If you select an ignored script, the **Configure** button takes you to  -->
Si selecciona un script ignorado, el botón **Configurar** lo lleva a
{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/9gzXiTYY0nZzBxGI6KrV.svg", alt="Configuración.", width="24", height="24" %} [**Configuración** > **Lista de ignorados**]( /docs/devtools/settings/ignore-list/). También puede ocultar fuentes ignoradas del árbol de archivos con {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/N5Lkpdwpaz4YqRGFr2Ks.svg", alt="Menú de tres puntos.", width="24", height="24" %} > [**Ocultar fuentes ignoradas**](/docs/devtools/javascript/reference/#hide-ignore-listed) {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/XfSWf04g2cwpnFcmp40m.svg", alt="Experimental.", ancho="20", altura="20" %}.

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/e95d2f3fd27301945a1a095bae4bbcad57326cd8 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/736762eda6a6f30d0e9c383998624e53ee04a6e2 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/2257f7bca42753d744b56f5b99b461a6f0494131 #}

Chromium issue: [883325](https://crbug.com/883325).

<!-- ## JavaScript Profiler deprecation started {: #js-profiler-deprecation } -->
## Comenzó la obsolescencia de JavaScript Profiler{: #js-profiler-deprecation }

<!-- As early as [Chrome 58](/blog/devtools-javascript-cpu-profile-migration-2/), the DevTools team planned to eventually deprecate the **JavaScript Profiler** and have Node.js and Deno developers use the **Performance** panel for profiling JavaScript CPU performance. -->
Ya en [Chrome 58](/blog/devtools-javascript-cpu-profile-migration-2/), el equipo de DevTools planeó dejar obsoleto el **JavaScript Profiler** y hacer que los desarrolladores de Node.js y Deno usen el **Panel de rendimiento** para perfilar el rendimiento de la CPU de JavaScript.

<!-- This DevTools version (112) starts the [four-phase **JavaScript Profiler** deprecation](https://github.com/ChromeDevTools/rfcs/discussions/2#discussioncomment-5189668). The **JavaScript Profiler** panel now shows the corresponding warning banner. -->
Esta versión de DevTools (112) inicia la [obsolescencia de **JavaScript Profiler** de cuatro fases](https://github.com/ChromeDevTools/rfcs/discussions/2#discussioncomment-5189668). El panel **JavaScript Profiler** ahora muestra el banner de advertencia correspondiente.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/v4S5YWGdBV3nbc3OkGZ3.png", alt="Banner de obsolescencia en la parte superior de Profiler.", width="800", height="712" %}

<!-- Instead of the **Profiler**, use the [**Performance**](/docs/devtools/performance/reference/#main) panel to profile CPU. -->
En lugar del **Perfilador**, use el panel [**Rendimiento**](/docs/devtools/performance/reference/#main) para perfilar la CPU.

<!-- Learn more and provide feedback in the corresponding [RFC](https://github.com/ChromeDevTools/rfcs/discussions/2) and [crbug.com/1354548](https://crbug.com/1354548).  -->
Obtenga más información y proporcione comentarios en el [RFC](https://github.com/ChromeDevTools/rfcs/discussions/2) y [crbug.com/1354548](https://crbug.com/1354548) correspondientes.

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/71244f613a27289936b979fe515346137d0190f8 #}

Chromium issue: [1417647](https://crbug.com/1417647).

<!-- ## Emulate reduced contrast {: #reduced-contrast } -->
## Emular contraste reducido {: #reduced-contrast }

<!-- The [**Rendering**](/docs/devtools/rendering/#open-rendering) tab adds a new option to the [Emulate vision deficiencies](/docs/devtools/rendering/apply-effects/#emulate-vision-deficiencies) list—**Reduced contrast**. With this option, you can discover how your website looks to people with reduced contrast sensitivity. -->
La pestaña [**Rendering**](/docs/devtools/rendering/#open-rendering) agrega una nueva opción a [Emular deficiencias de visión](/docs/devtools/rendering/apply-effects/#emulate-vision-deficiencies) lista—**Contraste reducido**. Con esta opción, puede descubrir cómo se ve su sitio web para las personas con sensibilidad de contraste reducida.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/7qrlmuO7R47l5mytvoeQ.png", alt="La opción de contraste reducido en Renderizado > Emular deficiencias de visión.", width="800", height="574" %}

<!-- Note that the list options have been updated to tell you what color insensitivity the options represent. -->
Tenga en cuenta que las opciones de la lista se han actualizado para indicarle qué insensibilidad al color representan las opciones.

<!-- With DevTools, you can find and fix all contrast issues at once. For more information, see [Make your website more readable](/docs/devtools/accessibility/contrast/). -->
Con DevTools, puede encontrar y solucionar todos los problemas de contraste a la vez. Para obtener más información, consulte [Haga que su sitio web sea más legible](/docs/devtools/accessibility/contrast/).

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/0eaaa173c9e2cd357c99f7a275fe1819b86f0b9a #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/768af28f8cf64e10d23b10556b59dc0770cc14b6  #}

Chromium issues: [1412719](https://crbug.com/1412719), [1412721](https://crbug.com/1412721).

<!-- ## Lighthouse 10 {: #lighthouse } -->
## Lighthouse 10 {: #lighthouse }

<!-- The **Lighthouse** panel now runs [Lighthouse 10.0.1](/blog/lighthouse-10-0/). For more details, see [What's new in Lighthouse 10.0.1](/blog/lighthouse-10-0/). -->
El panel **Lighthouse** ahora ejecuta [Lighthouse 10.0.1](/blog/lighthouse-10-0/). Para obtener más detalles, consulte [Novedades de Lighthouse 10.0.1](/blog/lighthouse-10-0/)

<!-- **Lighthouse** > {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/9gzXiTYY0nZzBxGI6KrV.svg", alt="Settings.", width="24", height="24" %} > {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/ZtDyFg7cjkxacORB3GQn.svg", alt="Empty checkbox.", width="24", height="24" %} **Legacy navigation** is now disabled by default. This option uses legacy [Lighthouse configuration](https://github.com/GoogleChrome/lighthouse/blob/main/docs/configuration.md) in navigation mode. -->
**Lighthouse** > {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/9gzXiTYY0nZzBxGI6KrV.svg", alt="Configuración.", width="24", height="24" %} > {% Img src="image/ NJdAV9UgKuN8AhoaPBquL7giZQo1/ZtDyFg7cjkxacORB3GQn.svg", alt="Casilla de verificación vacía.", width="24", height="24" %} **La navegación legacy** ahora está deshabilitada de manera predeterminada. Esta opción utiliza la [configuración de Lighthouse] legacy (https://github.com/GoogleChrome/lighthouse/blob/main/docs/configuration.md) en el modo de navegación.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/mYuX9d2TFaJuWBOYGN5R.png", alt="Navegación legacy deshabilitada.", width="800", height="548" %}

<!-- Lighthouse 10 now uses Moto G Power as the [default emulation device](https://github.com/GoogleChrome/lighthouse/pull/14674). DevTools added this device to {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/9gzXiTYY0nZzBxGI6KrV.svg", alt="Settings.", width="24", height="24" %} [**Settings** > **Devices**](/docs/devtools/settings/devices/). -->
Lighthouse 10 ahora usa Moto G Power como [dispositivo de emulación predeterminado] (https://github.com/GoogleChrome/lighthouse/pull/14674). DevTools agregó este dispositivo a {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/9gzXiTYY0nZzBxGI6KrV.svg", alt="Configuración.", width="24", height="24" %} [**Configuración** > **Dispositivos**](/docs/devtools/settings/devices/).

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/GpqmLAiuNasdRsfisVS7.png", alt="Moto G Power en la lista de Dispositivos.", width="800", height="488" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/d5f9f7b395e2965356dfcaed026b5a1d141c19c6 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/de6c4e5973980ad98d7d1699faa4e1059f102c4d #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/8a6ca7d24e2fa33c6adfef22ee708f489657dee2 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/24e50e4e50bc6e19930df75385c316ba866e9588 #}

Chromium issue: [772558](https://crbug.com/772558).

<!-- ## Miscellaneous highlights {: #misc } -->
## Destacados varios {: #misc }
<!-- These are some noteworthy fixes in this release: -->
Estas son algunas correcciones notables en esta versión:

<!-- - The [**Sources** > **Breakpoints**](/docs/devtools/javascript/breakpoints/#manage-loc) pane now shows differentiating file paths next to ambiguous file names ([1403924](crbug.com/1403924)). -->
- El panel [**Fuentes** > **Puntos de ruptura**](/docs/devtools/javascript/breakpoints/#manage-loc) ahora muestra rutas de ficheros diferenciadas junto a nombres de ficheros ambiguos ([1403924](crbug.com/ 1403924)).
<!-- - The [**Main** section](/docs/devtools/performance/reference/#main) in the flame chart of the **Performance** panel now designates `CpuProfiler::StartProfiling` as `Profiler Overhead` ([1358602](https://crbug.com/1358602)). -->
- La [sección **Principal**](/docs/devtools/performance/reference/#main) en el gráfico de llamas del panel **Rendimiento** ahora designa `CpuProfiler::StartProfiling` como `Profiler Overhead` ([1358602](https://crbug.com/1358602)).
<!-- - DevTools improved autocompletion: -->
- DevTools mejoró el autocompletado:
<!--   - **Sources**: Consistent completions of any word ([1320204](https://crbug.com/1320204)). -->
    - **Fuentes**: Terminaciones consistentes de cualquier palabra ([1320204](https://crbug.com/1320204)).
<!--   - **Console**: `Arrow down` selects the first suggestion and suggestions get `Tab` hints ([1276960](https://crbug.com/1276960)). -->
    - **Consola**: `Flecha hacia abajo` selecciona la primera sugerencia y las sugerencias son obtenidas de las sugerencias de `Tab` ([1276960](https://crbug.com/1276960)).
<!-- - DevTools added an [event listener breakpoint](/docs/devtools/javascript/breakpoints/#event-listeners) to let you pause when you open a [Document Picture-in-Picture window](https://wicg.github.io/document-picture-in-picture/#dom-documentpictureinpicture-onenter) ([1315352](https://crbug.com/1315352)). -->
    - DevTools agregó un [punto de interrupción de event listener](/docs/devtools/javascript/breakpoints/#event-listeners) para permitirle hacer una pausa cuando abre una [ventana de imagen en imagen](https://wicg.github.io/document-picture-in-picture/#dom-documentpictureinpicture-onenter) ([1315352](https://crbug.com/1315352)).
<!-- - DevTools set up a workaround that properly displays Vue2 webpack artifacts as JavaScript ([1416562](https://crbug.com/1416562)). -->
    - DevTools configuró una solución alternativa que muestra correctamente los artefactos del paquete web de Vue2 como JavaScript ([1416562](https://crbug.com/1416562)).
<!-- - A [**Console** setting](/docs/devtools/settings/preferences/#console) gets a better name: Automatically expand console.trace() messages. ([1139616](https://crbug.com/1139616)). -->
    - Una [**configuración de consola**](/docs/devtools/settings/preferences/#console) recibe un mejor nombre: expandir automáticamente los mensajes de console.trace(). ([1139616](https://crbug.com/1139616)).


{% Partial 'devtools/reach-out.md' %}
{% Partial 'devtools/whats-new.md' %}

