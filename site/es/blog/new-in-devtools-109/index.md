---
layout: 'layouts/blog-post.njk'
title: "Qué hay de nuevo en DevTools (Chrome 109)"
authors:
  - jecelynyeen
date: 2023-01-15
description: 'Copiar paso como script en el Recorder, nombres reales de funciones en las grabaciones de rendimiento y más.'
hero: 'image/dPDCek3EhZgLQPGtEG3y0fTn4v82/gB8inOWRBVNn2KFN6PWL.png'
alt: ''
tags:
  - new-in-devtools
  - devtools
  - chrome-109
---

*Gracias por la traducción [Miguel Ángel](https://midu.dev) y por la revisión [Carlos Caballero](https://carloscaballero.io).*

{% Partial 'devtools/banner.md' %}

<!-- ## Recorder: Copy as options for steps, in-page replay, step’s context menu {: #recorder } -->
## Recorder: Copia como opciones para los pasos, reproducción en la página, menú contextual del paso {: #recorder }

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/uCqjrGj716ZbDJ4N37dl.png", alt="Nuevas opciones de copia en el panel Recorder", width="800", height="615" %}

<!-- Open an existing user flow in the **Recorder**. Previously, when you replayed the user flow, DevTools would always start the replay by navigating to or reloading the page. -->
Abre un flujo de usuario existente en el **Recorder**. Anteriormente, cuando reproducías el flujo de usuario, DevTools siempre comenzaba la reproducción navegando o recargando la página.

<!-- With the latest updates, the **Recorder** shows the navigation step separately. You can right-click and remove it to perform in-page replay!  -->
Con las últimas actualizaciones, el **Recorder** muestra el paso de navegación por separado. ¡Puedes hacer clic derecho y eliminarlo para realizar una reproducción en la página!

<!-- Apart from that, you can right-click a step and copy it to the clipboard in the **Recorder* panel instead of exporting the whole user flow. It works with [extensions](https://goo.gle/recorder-extension) too. For example, try to copy a step as a [Nightwatch Test](https://bit.ly/nightwatch-recorder) script. With this feature, you can update any existing script with ease. -->
Además de esto, puedes hacer clic derecho en un paso y copiarlo al portapapeles en el panel **Recorder** en lugar de exportar todo el flujo de usuario. También funciona con [extensiones](https://goo.gle/recorder-extension). Por ejemplo, intenta copiar un paso como un script de [Nightwatch Test](https://bit.ly/nightwatch-recorder). Con esta función, puedes actualizar cualquier script existente con facilidad.

<!-- Previously, you could access the step menu only through the 3-dot button. You can now right-click anywhere on the step to access the menu. -->
Anteriormente, solo podía acceder al menú de pasos a través del botón de 3 puntos. Ahora puede hacer clic derecho en cualquier parte del paso para acceder al menú.

Chromium issues: [1322313](https://crbug.com/1322313), [1351649](https://crbug.com/1351649), [1322313](https://crbug.com/1322313), [1339767](https://crbug.com/1339767)

<!-- ## Show actual function names in performance’s recordings {: #performance } -->
## Muestra los nombres reales de las funciones en las grabaciones de rendimiento {: #performance }

<!-- The **Performance** panel now shows the actual function names and their sources in the trace if there’s a source map. -->
El panel **Performance** ahora muestra los nombres reales de las funciones y sus fuentes en la traza si hay un *source map*.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/9pHMVM1ARXrlyLoTziVA.png", alt="Comparativa del antes y el después de mostrar los nombres de las funciones en el panel Performance.", width="800", height="509" %}

<!-- In this example, a source file is minified during production. For example, the `sayHi` function is minified as `n`, and the `takeABreak` function is minified as `o` in this [demo](https://clinquant-mousse-2f2396.netlify.app/). -->
En este ejemplo, el código de un fichero es minificado para producción. Por ejemplo, la función `sayHi` es minificada como `n`, y la función `takeABreak` es minificada como `o` en esta [demo](https://clinquant-mousse-2f2396.netlify.app/).

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/ywER8cdQUNYrdAaBJTKT.png", alt="Muestra archivos antes y después de la minificación.", width="800", height="392" %}

<!-- Previously, when you recorded a trace in the **Performance** panel, the trace only showed you the minified function names. This made it harder to debug.  -->
Anteriormente, cuando grababa una traza en el panel **Performance**, la traza solo te mostraba los nombres de las funciones minificadas. Esto hacía más difícil la depuración.

<!-- With the latest changes, DevTools now reads the source map and shows the actual function names and source location.  -->
Con los últimos cambios, DevTools ahora lee el *source map* y muestra los nombres reales de las funciones y la ubicación del código fuente.

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/4be8b5bcc00889ca35a455aa093ec242dce8ce6c #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/24d850860bda04864069e6c0d4dab32c8f53bc7f  #}

Chromium issues: [1364601](https://crbug.com/1364601), [1364601](https://crbug.com/1364601)

<!-- ## New keyboard shortcuts in the Console & Sources panel {: #keyboard-shortcuts } -->
## Nuevos atajos de teclado en el panel Consola y Fuentes {: #keyboard-shortcuts }

<!-- You can switch between tabs in the **Sources** panel using: -->
<!-- On MacOS, <kbd>Function</kbd> + <kbd>Command</kbd> + <kbd>Arrow up</kbd> and <kbd>down</kbd> -->
<!-- On Windows and Linux, <kbd>Control</kbd> + <kbd>Page up</kbd> or <kbd>down</kbd> -->
Ahora puedes cambiar entre pestañas en el panel **Fuentes** usando:
En MacOS, <kbd>Function</kbd> + <kbd>Command</kbd> + <kbd>Arrow Up</kbd> y <kbd>Down</kbd>
En Windows y Linux, <kbd>Control</kbd> + <kbd>Page up</kbd> o <kbd>Down</kbd>

<!-- Moreover, you can navigate the autocomplete suggestions with <kbd>Ctrl</kbd> + <kbd>N</kbd> and <kbd>Ctrl + P</kbd> on MacOS, similar to [Emacs](https://www.gnu.org/software/emacs/). For example, you can type `window.` in the `Console` and use these shortcuts to navigate. -->
Además, puedes navegar por las sugerencias de autocompletado con <kbd>Ctrl</kbd> + <kbd>N</kbd> y <kbd>Ctrl + P</kbd> en MacOS, similar a [Emacs](https://www.gnu.org/software/emacs/). Por ejemplo, puedes escribir `window.` en la `Consola` y usar estos atajos para navegar.

<!-- On top of that, DevTools now accepts <kbd>Arrow Right</kbd> for autocompletion only at the end of line. For example, an autocomplete dialog shows when you are editing something in the middle of the code. When you press the <kbd>Arrow Right</kbd> key, most likely, you want to set the cursor to the next position instead of autocomplete. This UX change better aligns with your authoring workflow. -->
Encima de eso, DevTools ahora acepta <kbd>Arrow Right</kbd> para autocompletar solo al final de la línea. Por ejemplo, un diálogo de autocompletado aparece cuando está editando algo en medio del código. Cuando presiona la tecla <kbd>Arrow Right</kbd>, lo más probable es que quieras colocar el cursor en la siguiente posición en lugar de autocompletar. Este cambio de UX se alinea mejor con su flujo de trabajo como autor.

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/686acb9789020a511405a53a13ad754a7e928c99 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/09c3ceaa1605b29d1074d0cf310958bdb823149d #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/6468c740419d01d4e13c9ad914001959e78ca782 #}

Chromium issue: [1167965](https://crbug.com/1167965), [1172535](https://crbug.com/1172535),  [1371585](https://crbug.com/1371585). [1369503](https://crbug.com/1369503)

<!-- ## Improved JavaScript debugging {: #debugging } -->
## Mejoras en la depuración de JavaScript {: #debugging }

<!-- These are some JavaScript debugging improvements in this release: -->
En esta versión, se han realizado algunas mejoras en la depuración de JavaScript:

<!-- - `new.target` is a meta-property that lets you detect whether a function or constructor was called using the new operator. You can now log `new.target` in the **Console** to check its value during debugging. Previously, it would return errors when you entered `new.target`. -->
- `new.target` es una meta-propiedad que te permite detectar si una función o constructor ha sido llamada usando el operador new. Ahora puedes registrar `new.target` en la **Consola** para verificar su valor durante la depuración. Anteriormente, devolvería errores cuando ingresaba `new.target`.

  {% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/hKOEn03BZN2IUmWJ1Hho.png", alt="Muestra la comparación del antes y el después de evaluar new.target mientras depuraba.", width="800", height="499" %}

<!-- - A `WeakRef` object lets you hold a weak reference to another object, without preventing that object from getting garbage-collected. DevTools now shows an inline preview for the value and evaluates the weak reference directly in the console during debugging. Previously, you had to explicitly call “deref” on them to resolve it. -->
- Un objeto `WeakRef` te permite mantener una referencia débil a otro objeto, sin impedir que ese objeto se recolecte como basura. DevTools ahora muestra una vista previa en línea para el valor y evalúa la referencia débil directamente en la consola durante la depuración. Anteriormente, debía sllamar explícitamente a "deref" en ellos para resolverlo.
   {% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/M7DP4bI7pA07oY7M21wF.png", alt="Muestra una comparación del antes y el después de evaluar WeakRef durante la depuración.", width="800", height="453" %}
<!-- - Fixed inline preview for shadowed variable. Previously, the display value was incorrect.  -->
- Corregida la vista previa en línea para la variable *shadowed*. Anteriormente, el valor de visualización era incorrecto.
   {% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/XHL8pnBxhZ65ni7zYV0Q.png", alt="Muestra el antes y el después de la vista previa en línea de una variable shadowed.", width="800", height="519" %}
<!-- - Deobfuscate variable names in `Generator` and `async` functions in the **Scope** pane in the **Sources** panel. -->
- Desofuscar los nombres de las variables en las funciones `Generator` y `async` en el panel **Scope** del panel **Sources**.

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/8bec401b1934ca55f9d742ee68f72cca4de47931 #}
{# https://chromium.googlesource.com/v8/v8/+/b2892b5f24b7b97ad930356a9376b8a9b2a1d360 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/5b92fd6fc20ab07c9791f374e0e41c54863c7ad3 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/17e5e4392d054dc0a3af46eefff7caef6b4ce975 #}

Chromium issues: [1267690](https://crbug.com/1267690), [1246863](https://crbug.com/1246863) [1371322](https://crbug.com/1371322), [1311637](https://crbug.com/1311637)

<!-- ## Miscellaneous highlights {: #misc } -->
## Otros aspectos destacados {: #misc }

<!-- These are some noteworthy fixes in this release: -->
Estos son algunos arreglos destacados en esta versión:
<!-- - Support more hints for inactive CSS properties in the **Styles** pane - inline height and width, flex and grid properties. ([1373597](https://crbug.com/1373597), [1178508](https://crbug.com/1178508), [1178508](https://crbug.com/1178508),[1178508](https://crbug.com/1178508)) -->
- Soporte para más sugerencias para propiedades CSS inactivas en el panel **Styles** - altura y anchura en línea, propiedades flex y grid. ([1373597](https://crbug.com/1373597), [1178508](https://crbug.com/1178508), [1178508](https://crbug.com/1178508),[1178508](https://crbug.com/1178508))
<!-- - Fixed syntax highlighting. It was not working properly since the recent [code editor](https://codemirror.net/) upgrade in DevTools. ([1290182](https://crbug.com//1290182)) -->
- Corregido el resaltado de sintaxis. No funcionaba correctamente desde la reciente actualización del [editor de código](https://codemirror.net/) en DevTools. ([1290182](https://crbug.com//1290182))
<!-- - Capture input change events properly after on blur event in the **Recorder**. ([1378488](https://crbug.com/1378488)) -->
- Captura de eventos de cambio de entrada correctamente después del evento de pérdida de foco en el **Recorder**. ([1378488](https://crbug.com/1378488))
<!-- - Update Puppeteer replay script on export for better debugging experience in the **Recorder**. ([1351649](https://crbug.com/1351649)) -->
- Actualizar el script de reproducción de Puppeteer exportado para una mejor experiencia de depuración en el **Recorder**. ([1351649](https://crbug.com/1351649))
<!-- - Support record and replay in the **Recorder** for remote debugging. ([1185727](https://crbug.com/1185727))  -->
- Soporte para grabar y reproducir en el **Recorder** para la depuración remota. ([1185727](https://crbug.com/1185727))
<!-- - Fixed parsing of special CSS variable names in `var()`. Previously, DevTools didn't support parsing variables with escaped characters like `var(--fo\ o)`. , ([1378992](https://crbug.com/1378992)) -->
- Corregido el análisis de nombres de variables CSS especiales en `var()`. Anteriormente, DevTools no admitía el análisis de variables con caracteres escapados como `var(--fo\ o)`. , ([1378992](https://crbug.com/1378992))

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/d7bbaba2b82bb3b8c90e8d47c1f36fba2182c5e5 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/2767a58a7b4d306ce737c342d57e0fa330d8b08f  #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/b42002b898216e97acf94627d5d3d745a1ba1252 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/c0cdc185928246ca5b7e320763f8c942c8a1d2db  #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/55382b27eff3539c8aba42ea501eb8de4f7ba57c #}

<!-- ## [Experimental] Enhanced UX in managing breakpoints -->
## [Experimental] Mejorada la UX para la gestión de puntos de interrupción

{% Aside %}
<!-- To enable the experiment, check **Enable re-designed Breakpoint Sidebar Pane in the Sources Panel** under **Settings** > **Experiments**. -->
Para habilitar el experimento, marque **Enable re-designed Breakpoint Sidebar Pane in the Sources Panel** en **Settings** > **Experiments**.
{% endAside %}

<!-- The current **Breakpoints** pane provides little visual aid in overseeing all breakpoints. On top of that, frequently used actions are hidden behind the context menu. -->
Los paneles actuales de **Breakpoints** proporcionan poca ayuda visual para supervisar todos los puntos de interrupción. Además, las acciones más utilizadas están ocultas detrás del menú contextual.

<!-- This experimental UX redesign aims at bringing structure into the **Breakpoints** pane and allow developers to have quick access to commonly used features, in particular editing and removing breakpoints. -->
Este rediseño experimental de la UX  tiene como objetivo dar estructura al panel **Breakpoints** y permitir a los desarrolladores tener un acceso rápido a las funciones más utilizadas, en particular la edición y eliminación de puntos de interrupción.
<!-- These are some highlights: -->
Estos son algunos puntos destacados:
<!-- - Both pause options are in the **Breakpoints** pane and labeled with text to make it more self-explanatory. -->
- Ambas opciones de pausa están en el panel **Breakpoints** y están etiquetadas con texto para que sea más autoexplicativo.
<!-- - Breakpoints are grouped by file, ordered by line/column number, and collapsible.** -->
- Los puntos de interrupción se agrupan por archivo, ordenados por número de línea/columna y colapsables.**
<!-- - New options to remove and edit breakpoint when hovering over a breakpoint or file name in the **Breakpoint** pane. -->
- Nuevas opciones para eliminar y editar el punto de interrupción al pasar el ratón sobre un punto de interrupción o nombre de archivo en el panel **Breakpoint**.

<!-- Read the full changes in our [RFC (closed)](https://github.com/ChromeDevTools/rfcs/discussions/3) and leave your feedback [here](https://crbug.com/1394686). -->
Lea los cambios completos en nuestro [RFC (cerrado)](https://github.com/ChromeDevTools/rfcs/discussions/3) y deje su comentario [aquí](https://crbug.com/1394686).

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/ytfyl8qK5rkHQRTS3sXf.png", alt="Muestra el panel de Breakpoint antes y después del rediseño.", width="800", height="684" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/f2140378e0bb1687b263c226de01b741487ff324 #}
Chromium issues: [1346231](https://crbug.com/1346231), [1324904](https://crbug.com/1324904)

<!-- ## [Experimental] Automatic in-place pretty print -->
## [Experimental] Formatea automáticamente el código para una mejor lectura

{% Aside %}
<!-- To enable the experiment, check **Automatically pretty print in the Sources panel** under **Settings** > **Experiments**. -->
Para habilitar el experimento, marque **Automatically pretty print in the Sources panel** en **Settings** > **Experiments**.
{% endAside %}

<!-- The **Sources** panel now automatically pretty print minified source files in-place. You can click on the **pretty print button `{ }` to underdo it. -->
El panel **Sources** ahora formatea automáticamente los archivos de código minificado en el mismo lugar. Puedes hacer clic en el botón *pretty print* `{ }` para deshacerlo.
<!-- Previously, the **Sources** panel shows minified content by default. Developers need to click on the pretty print button manually to format the content. On top of that, the pretty printed content is not displayed in the same file, but in another `::formatted` tab. -->
Anteriormente, el panel **Sources** mostraba el contenido minificado de forma predeterminada. Los desarrolladores debían hacer clic en el botón *pretty print* manualmente para formatear el contenido. Además, el contenido formateado no se mostraba en el mismo archivo, sino en otra pestaña `::formatted`.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/twp21SJIisjYpnCWRbWi.png", alt="Muestra el archivo minificado antes y después del formato automático del archivo en el mismo lugar.", width="800", height="501" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/0c96e7f4cdaf2009e5223553cabb606099f85569 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/6ea8fee1935d3c56dfea1edaa752af09579fffcc #}

Chromium issue: [1164184](https://crbug.com/1164184)

{% Partial 'devtools/reach-out.md' %}
{% Partial 'devtools/whats-new.md' %}
