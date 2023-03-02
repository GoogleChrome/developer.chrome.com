---
layout: 'layouts/blog-post.njk'
title: "Qué hay de nuevo en DevTools (Chrome 110)"
authors:
  - jecelynyeen
date: 2023-02-13
description: 'Borrar el panel de Rendimiento al recargar, ver y resaltar el código en la Grabadora, y más.'
hero: 'image/dPDCek3EhZgLQPGtEG3y0fTn4v82/OWVZZ0I0ryefamwCQNTj.png'
alt: ''
tags:
  - new-in-devtools
  - devtools
  - chrome-110
---

*Gracias por la traducción [Carlos Caballero](https://carloscaballero.io) y [Miguel Ángel](https://midu.dev) por la revisión .*

{% Partial 'devtools/banner.md' %}

<!-- Translation instructions:
  1. Remove the "draft: true" tag above when submitting PR
  2. Provide translations under each of the English commented original content
  3. Translate the "description" tag above
  4. Translate all the <img> alt text
  5. Update the sites/es/_partials/devtools/whats-new.md file -->


<!-- ## Clearing Performance Panel on reload {: #perf } -->
## Borrado del Panel Rendimiento al recargar {: #perf }

<!-- The **Performance** panel now clears both the screenshot and trace when you click the **Start profiling and reload page** button. -->
Ahora el panel **Rendimiento** borra tanto la captura de pantalla como el seguimiento cuando hace clic en el botón **Comenzar a crear perfiles y volver a cargar la página**.

<!-- Previously, the **Performance** panel displayed a timeline with screenshots from previous recordings. This made it difficult to see when the actual measurement started. The panel now always navigates to the `about:blank` page first to guarantee that the recording begins with a blank trace. This aligns with the **Performance Insights** panel which already did the same. -->
Anteriormente, el panel **Rendimiento** mostraba una línea de tiempo con capturas de pantalla de grabaciones anteriores. Esto hizo que fuera difícil ver cuándo comenzó la medición real. El panel ahora siempre navega primero a la página `about:blank` para garantizar que la grabación comience con un rastro en blanco. Esto se alinea con el panel **Performance Insights** que ya hizo lo mismo.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/JVXCt6hKIxMtf0tCLWwh.png", alt="Borrado del panel de rendimiento al recargar.", width="800", height="548" %}


{# https://chromium.googlesource.com/devtools/devtools-frontend/+/0a301d29d165f17a6eceb1adf91bff0c1c2e07eb #}

Chromium issues: [1101268](https://crbug.com/1101268), [1382044](https://crbug.com/1382044)


<!-- ## Recorder updates {: #recorder } -->
 ## Actualizaciones de la Grabadora {: #recorder }

<!-- ### View and highlight the code of your user flow in the Recorder {: #recorder-code } -->
### Vea y resalte el código de su flujo de usuario en el Grabador {: #recorder-code }

<!-- The **Recorder** now offers split code view, making it easier to view your user flow code. To access the code view, open a user flow and click **Show Code**.  -->
La **Grabadora** ahora ofrece una vista de código dividido, lo que facilita la visualización de su código de flujo de usuario. Para acceder a la vista de código, abra un flujo de usuario y haga clic en **Mostrar código**.

<!-- The  **Recorder**  highlights the corresponding code as you hover over each step on the left, making it easy to track your flow. You can change the code format using the dropdown, which lets you switch between formats such as [Nightwatch Test](https://bit.ly/nightwatch-recorder) script. -->
La **Grabadora** resalta el código correspondiente a medida que pasa el `mouse` sobre cada paso a la izquierda, lo que facilita el seguimiento de su flujo. Puede cambiar el formato del código usando el menú desplegable, que le permite cambiar entre formatos como el script [Nightwatch Test](https://bit.ly/nightwatch-recorder).

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/ZxNNmun9Yfqs97JCAn7C.png", alt="Vista de código en la grabadora.", width="800", height="542" %}

Chromium issue: [1385489](https://crbug.com/1385489)


<!-- ### Customize selector types of a recording {: #recorder-selector } -->
### Personalizar los tipos de selector de una grabación {: #recorder-selector }

<!-- You can create recordings that capture only the selector types that matter to you. With the new option to customize selector types when creating a new recording, you can include or exclude selectors such as XPath, ensuring you capture only the selectors you want in your user flows. -->
Puede crear grabaciones que capturen solo los tipos de selector que le interesen. Con la nueva opción para personalizar los tipos de selector al crear una nueva grabación, puede incluir o excluir selectores como XPath, asegurándose de capturar solo los selectores que desea en sus flujos de usuario.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/5t2TOY9VA2Uq08Dq2ZhM.png", alt="Nueva opción para personalizar los tipos de selector.", width="800", height="645" %}

Chromium issue: [1384431](https://crbug.com/1384431)


<!-- ### Edit user flow while recording {: #recorder-edit } -->
### Edite el flujo de usuario mientras graba {: #recorder-edit }

<!-- The **Recorder** now allows editing during recording, providing you with the flexibility to make changes in real-time. You no longer need to end the recording to make adjustments. -->
La **Grabadora** ahora permite editar durante la grabación, brindándole la flexibilidad para realizar cambios en tiempo real. Ya no necesita finalizar la grabación para realizar ajustes.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/1a2S1lizzJ5acRMgjtwH.png", alt="Edición durante la grabación del flujo de usuario.", width="800", height="619" %}

Chromium issue: [1381971](https://crbug.com/1381971)


<!-- ## Automatic in-place pretty print {: #pretty-print } -->
## Formateo automático in-situ {: #pretty-print }

<!-- The **Sources** panel now automatically pretty prints minified source files in place. You can click on the **pretty print** button `{ }` to undo it. -->
El panel **Fuentes** ahora formatea automáticamente los archivos fuente minimizados in-situ. Puede hacer clic en el botón **formateo automático** `{ }` para deshacerlo.

<!-- Previously, the **Sources** panel showed minified content by default. To format the content, you had to click the pretty print button manually. On top of that, the pretty-printed content wasn’t displayed in the same tab, but in another `::formatted` tab. -->
Anteriormente, el panel **Fuentes** mostraba contenido minimizado de forma predeterminada. Para formatear el contenido, tenía que hacer clic en el botón de formateo manualmente. Además de eso, el contenido formateado no se mostraba en la misma pestaña, sino en otra pestaña `::formateada`.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/twp21SJIisjYpnCWRbWi.png", alt="Muestre un archivo minimizado antes y después del formateo automático in-situd.", width="800", height="501" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/3ae70742a7fce9657d8fcd578a182635e619cad5 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/0b9c42efb6065c8a697eaf3acd656cb87e3d4f54 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/b6bddcbabb2d977b620758ac20785675053a4db9  #}

Chromium issues: [1383453](https://crbug.com/1383453), [1382752](https://crbug.com/1382752), [1382397](https://crbug.com/1382397)


<!-- ## Better syntax highlight and inline preview for Vue, SCSS and more {: #highlight } -->
## Mejor resaltado de sintaxis y vista previa en línea para Vue, SCSS y más {: #highlight }

<!-- The **Sources** panel enhanced the syntax highlighting for several widely-used file formats, enabling you to read code more easily and recognize its structure, including Vue, JSX, Dart, LESS, SCSS, SASS, and inline CSS. -->
El panel **Fuentes** mejoró el resaltado de sintaxis para varios formatos de archivo ampliamente utilizados, lo que le permite leer el código más fácilmente y reconocer su estructura, incluyendo Vue, JSX, Dart, LESS, SCSS, SASS y CSS en línea.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/92SB2J5N6ImqJlOY3tIB.png", alt="Resaltado de sintaxis en Vue.", width="800", height="550" %}

<!-- In addition, DevTools also improved the inline preview for Vue, inline HTML, and TSX. Hover over a variable to preview its value.  -->
Además, DevTools también mejoró la vista previa en línea para Vue, HTML en línea y TSX. Pase el cursor sobre una variable para obtener una vista previa de su valor.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/uLxVoWz3yyxYvOkgCq7t.png", alt="Vista previa en línea para Vue.", width="800", height="700" %}

<!-- Apart from that, DevTools now shows the sourcemap of a stylesheet in the **Sources** panel. For instance, when you open a SCSS file, you can access the related CSS file by clicking on the sourcemap link. -->
Aparte de eso, DevTools ahora muestra el mapa fuente de una hoja de estilo en el panel **Fuentes**. Por ejemplo, cuando abre un archivo SCSS, puede acceder al archivo CSS relacionado haciendo clic en el enlace del mapa fuente.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/bK6TMGR8c6285bUlrIbx.png", alt="Enlace de mapa fuente para SASS.", width="800", height="745" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/c9af6b86b85bf23f9ed07d68b2d58b45910426de #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/4f330a0d5cef6e74b5b73f258e55cc0960769bca #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/9ec6a8092e7b45fc403d571982d1b214181d9695 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/5a02aca17849514b1e2bc828f78aedece5161dfa #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/c0928e31ba0ed2e81456f0109d323dd09768cfe1 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/992cc762b6790a7bd1a0d5c12ed0169270ac7dd0 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/f2bc726458c3d6507be9a4b56845b789c7ce653e #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/b77b77646c6257ab80893f5d1b5d9607a969c0e5 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/6f1ab763383c7641644f7fd4f88c49465a70ed01 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/11bdafdbbd9bd153aea84b1fe03db4dff89d3aa9 #}

Chromium issues: [1385374](https://crbug.com/1385374), [1385632](https://crbug.com/1385632), [1385281](https://crbug.com/1385281), [1385269](https://crbug.com/1385269), [1383892](https://crbug.com/1383892), [1361862](https://crbug.com/1361862), [1383451](https://crbug.com/1383451), [1392106](https://crbug.com/1392106), [1149734](https://crbug.com/1149734)


<!-- ## Ergonomic and consistent Autocomplete in the Console {: #console } -->
## Autocompletar ergonómico y consistente en la Consola {: #console }

<!-- DevTools enhances the autocompletion experience by implementing the following changes: -->
DevTools mejora la experiencia de autocompletado al implementar los siguientes cambios:

<!-- - `Tab` is always used for autocompletion. -->
- `Tab` siempre se usa para autocompletar.
<!-- - The behavior of `Arrow right` and `Enter` varies based on context. -->
- El comportamiento de `Flecha derecha` y `Enter` varía según el contexto.
<!-- - The autocompletion experience is consistent across text editors, in the **Console**, **Sources**, and **Elements** panels  -->
- La experiencia de autocompletado es uniforme en todos los editores de texto, en los paneles **Consola**, **Fuentes** y **Elementos**

<!-- For example, here is what happens when you type `cons` in the **Console**: -->
Por ejemplo, esto es lo que sucede cuando escribe `cons` en la **Consola**:

<!-- - The **Console** displays a list of autocomplete suggestions, with a subtle dotted border around the top option indicating that navigation has not yet begun. -->
- La **Consola** muestra una lista de sugerencias de autocompletar, con un sutil borde punteado alrededor de la opción superior que indica que la navegación aún no ha comenzado.

  {% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/kSTUPmkQK3HzE7BElmAK.png", alt="Borde punteado alrededor de la opción superior de autocompletar.", width="800", height="580" %}

<!-- - The **Console** executes the line when you press `Enter`. Previously, it would automatically complete the line with the top suggestion. To auto-complete, press either `Tab` or `Arrow Right`. -->
- La **Consola** ejecuta la línea cuando presionas `Enter`. Anteriormente, completaba automáticamente la línea con la sugerencia superior. Para completar automáticamente, presione 'Tab' o 'Flecha derecha'.
  {% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/7SZ8AM51vI7WEIovjUDX.png", alt="Ejecuta la línea en Enter.", width="800", height="549" %}

<!-- - The **Console** highlights the selected option as you navigate through the suggestion list using the `Arrow up` and `Arrow down` shortcuts. -->
- La **Consola** resalta la opción seleccionada a medida que navega por la lista de sugerencias utilizando los accesos directos `Flecha arriba` y `Flecha abajo`.
  {% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/XxjZu5GrFnPEUZhoQN0i.png", alt="Aspectos destacados durante la navegación de sugerencias.", width="800", height="580" %}

<!-- - To auto-complete with the selected option during navigation, use the keyboard keys `Tab`, `Enter`, or `Arrow Right`. -->
- Para completar automáticamente con la opción seleccionada durante la navegación, use las teclas del teclado `Tab`, `Enter` o `Flecha derecha`.
  {% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/YU89q0lRFsocpdXS6ZMO.png", alt="Autocompletar con la opción seleccionada durante la navegación.", width="800", height="360" %}

<!-- - When editing in the middle of code, for example, when the cursor is between `n` and `s`, use `Tab` for autocompletion, `Enter` to execute the line, and `Arrow Right` to move the cursor forward. -->
- Al editar en medio del código, por ejemplo, cuando el cursor está entre `n` y `s`, use `Tab` para autocompletar, `Enter` para ejecutar la línea y `Flecha derecha` para mover el cursor hacia adelante .
  {% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/4jiMQ2btaT4MX7Y3VqgH.png", alt="Editing in the middle of code.", width="800", height="549" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/00103b19eec2ba086c608b79ff34b696fe07bb62 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/89f259ddb6c36f486108e0dc9ccb4d4125a04917 #}

Chromium issues: [1399436](https://crbug.com/1399436), [1276960](https://crbug.com/1276960)


<!-- ## Miscellaneous highlights {: #misc } -->
## Varios destacados {: #misc }

<!-- These are some noteworthy fixes in this release: -->
Estas son algunas correcciones notables en esta versión:

<!-- - A regression issue in DevTools, where it failed to stop at the `debugger` statement in inline scripts, has been resolved. ([1385374](https://crbug.com/1385374)) -->
- Se resolvió un problema de regresión en DevTools, donde no se detenía en la instrucción `debugger` en los scripts en línea. ([1385374](https://crbug.com/1385374))
<!-- - A new **Console** setting that allows you to expand or collapse `console.trace()` messages by default. Toggle the settings via **Settings** > **Preferences** >  **Expand console.trace() messages by default**. ([1139616](https://crbug.com/1139616)) -->
- Una nueva configuración de **Consola** que le permite expandir o colapsar los mensajes `console.trace()` de manera predeterminada. Cambie la configuración a través de **Configuración** > **Preferencias** > **Expandir mensajes de console.trace() de forma predeterminada**. ([1139616](https://crbug.com/1139616))
<!-- - The [Snippets](/docs/devtools/javascript/snippets/) pane in the **Sources** panel supports enhanced autocomplete, similar to the **Console**. ([772949](https://crbug.com/772949))  -->
- El panel [Fragmentos](/docs/devtools/javascript/snippets/) en el panel **Fuentes** admite el autocompletado mejorado, similar a la **Consola**. ([772949](https://crbug.com/772949))
  {% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/thkb1CYO0yYiGHll7Yp8.png", alt="Autocompletar en Fragmentos.", width="800", height="417" %}


{% Partial 'devtools/reach-out.md' %}
{% Partial 'devtools/whats-new.md' %}
