---
layout: 'layouts/blog-post.njk'
title: 'Qué hay de nuevo en DevTools (Chrome 101)'
authors:
  - jecelynyeen
date: 2022-04-12
updated: 2022-04-12
description: "Importar y exportar flujos de usuario como JSON, soporte colors hwb(), ver capas de cascada en el panel de Estilos y más."
hero: 'image/dPDCek3EhZgLQPGtEG3y0fTn4v82/w81Vw6R82MT2oWpeAxSh.jpg'
alt: ''
tags:
  - new-in-devtools
  - devtools
  - chrome-101
---

_Gracias [Miguel Ángel](https://midu.dev) por la traducción y [Carlos Caballero](https://carloscaballero.io) por la revisión._

{% Partial 'devtools/banner.md' %}

{% YouTube id='u9GRAliBrM8' %}

<!-- ## Import and export recorded user flows as a JSON file {: #recorder } -->
## Importar y exportar como JSON flujos de usuario grabados {: #recorder }

<!-- The [Recorder](/docs/devtools/recorder) panel now supports importing and exporting user flow recordings as a JSON file. This addition makes it easier to share user flows and can be useful for bug reporting. -->
El panel [Grabadora](/docs/devtools/recorder) ahora permite importar y exportar grabaciones de flujos de usuario como un archivo JSON. Esta adición hace que sea más fácil compartir flujos de usuario y puede ser útil para informes de errores.

<!-- For example, download this [JSON file](https://storage.googleapis.com/web-dev-uploads/file/dPDCek3EhZgLQPGtEG3y0fTn4v82/vzQbv2rUfTz2DEmx06Gv.json). You can import it with the import button and [replay the user flow](/docs/devtools/recorder/#replay). -->
Por ejemplo, descargue este [archivo JSON](https://storage.googleapis.com/web-dev-uploads/file/dPDCek3EhZgLQPGtEG3y0fTn4v82/vzQbv2rUfTz2DEmx06Gv.json). Puede importarlo con el botón importar y [reproducir el flujo de usuario](/docs/devtools/recorder/#replay).

{% Video src="video/dPDCek3EhZgLQPGtEG3y0fTn4v82/Jy7NEDZs6XJb90EWqETj.mp4", class="screenshot", autoplay=true, controls=true, loop=true, muted=true %}

<!-- Apart from that, you can export the recording as well. After [recording a user flow](/docs/devtools/recorder/#record), click on the export button. There are 3 export options: -->
Además de esto, puede exportar también la grabación. Después de [grabar un flujo de usuario](/docs/devtools/recorder/#record), haga clic en el botón exportar. Hay 3 opciones de exportación:

<!-- - **Export as a JSON file**. Download the recording as a JSON file. -->
- **Exportar como un archivo JSON**. Descargue la grabación como un archivo JSON.
<!-- - **Export as a @puppeteer/replay script**. Download the recording as a [Puppeteer Replay](https://github.com/puppeteer/replay) script.  -->
- **Exportar como un script de @puppeteer/replay**. Descargue la grabación como un script de [Puppeteer Replay](https://github.com/puppeteer/replay).
<!-- - **Export as a Puppeteer script** . Download the recording as [Puppeteer](https://pptr.dev/) script. -->
- **Exportar como un script de Puppeteer**. Descargue la grabación como un script de [Puppeteer](https://pptr.dev/).

<!-- Consult [the documentation](/docs/devtools/recorder) to learn more about the differences between these options. -->
Consulte [la documentación](/docs/devtools/recorder/#export-flows) para obtener más información sobre las diferencias entre estas opciones.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/mcbKR5hpCNXUmdGp4UDP.png", alt="Opciones de exportación en el panel Grabadora", width="800", height="556" %}

Chromium issue: [1257499](https://crbug.com/1257499)

<!-- ## View cascade layers in the Styles pane {: #layer } -->
## Ver capas de cascada en el panel de Estilos {: #layer }

<!-- [Cascade layers](/blog/cascade-layers/) enable more explicit control of your CSS files to prevent style-specificity conflicts. This is particularly useful for large codebases, design systems, and when managing third party styles in applications. -->
Las [Capas de Cascada](/blog/cascade-layers/) permiten un control más explícito de sus archivos CSS para evitar conflictos de especificidad en sus estilos. Esto es particularmente útil para grandes bases de código, sistemas de diseño y al gestionar estilos de terceros en aplicaciones.

<!-- In this [example](https://jec.fish/demo/cascade-layer), there are 3 cascade layers defined: `page`, `component` and `base`. In the **Styles** pane, you can view each layer and its styles. -->
En este [ejemplo](https://jec.fish/demo/cascade-layer), hay 3 capas de cascada definidas: `page`, `component` y `base`. En el panel de **Estilos**, puede ver cada capa y sus estilos.

<!-- Click on the layer name to view the layer order. The `page` layer has the highest specificity, therefore the `box` background is green.  -->
Haga clic en el nombre de la capa para ver el orden de la capa. La capa `page` tiene la más alta especificidad, por lo que el fondo `box` es verde.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/A0yHsGUcqVCIO3fzKhEz.png", alt="Ver capas de cascada en el panel de Estilos", width="800", height="490" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/52f5be82ff6ba59343ba65ab7d8e215e46d44d3b #}

Chromium issue: [1240596](https://crbug.com/1240596)


<!-- ## Support for the hwb() color function {: #hwb } -->
## Soporte para la función de color hwb() {: #hwb }

<!-- You can now view and edit [HWB color format](https://drafts.csswg.org/css-color/#the-hwb-notation) in DevTools. -->
Ahora puede ver y editar el [formato de color HWB](https://drafts.csswg.org/css-color/#the-hwb-notation) en DevTools.

<!-- In the **Styles** pane, hold the **Shift** key and click on any color preview to change the color format. The HWB color format is added. -->
En el panel **Estilos**, mantenga la tecla **Shift** y haga clic en cualquier vista previa de color para cambiar el formato de color. El formato de color HWB se agregará.

<!-- Alternatively, you can change the color format to HWB in the [color picker](/docs/devtools/css/reference/#color-picker). -->
Alternativamente, puede cambiar el formato de color a HWB en el [selector de color](/docs/devtools/css/reference/#color-picker).

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/jW7PXLu6Q5myiKLrsoD3.png", alt="Función de color hwb()", width="800", height="508" %}


<!-- ## Improved the display of private properties {: #private-props } -->
## Mejorada la visualización de las propiedades privadas {: #private-props }

<!-- DevTools now properly evaluates and displays private accessors. Previously, you couldn't expand classes with private accessors in the **Console** and the **Sources** panel. -->
DevTools ahora evalúa y muestra correctamente los accesores privados. Anteriormente, no se podían expandir las clases con accesos privados en la **Consola** y en el panel de **Fuentes**.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/LKir8oYFgNvRZSXMhXa7.png", alt="Propiedades privadas en la Consola", width="800", height="498" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/78b2ae5c5baa825c88917098ef57b595d3c94aa0 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/fdc72aa79313d8ec9e7a04461588bcc27aae1535 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/3d369648ae956e799f7337e798bf3453f1c4c440 #}

Chromium issues: [1296855](https://crbug.com/1296855), [https://crbug.com/1303407](1303407)


<!-- ## Miscellaneous highlights {: #misc } -->
## Varios aspectos destacados {: #misc }

<!-- These are some noteworthy fixes in this release: -->
Existen algunas correcciones destacadas en esta versión:

<!-- - The [Back/forward cache](/blog/new-in-devtools-98/#bfcache) now displays the extension ID which blocked [bfcache](https://web.dev/bfcache/) when present.( [1284548](https://crbug.com/1284548)) -->
- La [caché de retroceso/avance](/blog/new-in-devtools-98/#bfcache) ahora muestra el ID de la extensión que bloqueó [bfcache](https://web.dev/bfcache/) cuando está presente. ([1284548](https://crbug.com/1284548))
<!-- - Fixed autocompletion support for array-like objects, CSS class names, `map.get` and HTML tags. ([1297101](https://crbug.com/1297101), [1297491](https://crbug.com/1297491), [1293807](https://crbug.com/1293807), [1296983](https://crbug.com/1296983)) -->
- Corregido el soporte de autocompletado para objetos tipo array, nombres de clase CSS, `map.get` y etiquetas HTML. ([1297101](https://crbug.com/1297101), [1297491](https://crbug.com/1297491), [1293807](https://crbug.com/1293807), [1296983](https://crbug.com/1296983))
<!-- - Fixed incorrect highlights when double-clicking on words and undoing autocomplete. ([1298437](https://crbug.com/1298437), [1298667](https://crbug.com/1298667)) -->
- Corregido el resaltado incorrecto al hacer doble clic en palabras y deshacer el autocompletado. ([1298437](https://crbug.com/1298437), [1298667](https://crbug.com/1298667))
<!-- - Fixed comment keyboard shortcut in the **Sources** panel. ([1296535](https://crbug.com/1296535)) -->
- Corregido el atajo de teclado para comentarios en el panel **Fuentes**. ([1296535](https://crbug.com/1296535))
<!-- - Re-enable support for using **Alt** (Options) key for multi selection in the **Sources** panel. ([1304070](https://crbug.com/1304070)) -->
- Re-habilitado el soporte para usar la tecla **Alt** (Opciones) para la selección múltiple en el panel **Fuentes**. ([1304070](https://crbug.com/1304070))


<!-- ## [Experimental] New timespan and snapshot mode in the Lighthouse panel {: #lighthouse } -->
## [Experimental] Nuevos modos tiempo de espera e instantánea en el panel Lighthouse {: #lighthouse }

{% Aside %}
<!-- To enable the experiment, enable the **Use Lighthouse panel with timespan and snapshot modes** checkbox under **Settings** > **Experiments**. -->
- Para activar el experimento, habilite la casilla **Usar el panel Lighthouse con el modo de tiempo y instantánea** en **Ajustes** > **Experimentos**.
{% endAside %}

<!-- Apart from the existing **navigation** mode, the **Lighthouse** panel now support two more modes on measuring user flows - **timespan** and **snapshot**. -->
Además del modo de navegación existente, el panel **Lighthouse** ahora soporta dos modos de medida de flujos de usuario - **tiempo de espera** e **instantánea**.

<!-- For example, you can use the **timespan** reports to analyze user interactions. Open this [demo](https://coffee-cart.netlify.app/) page. Select the **Timespan** mode and click on **Start timespan**. On the page, click on a coffee and end the timespan. Read the report to find out the [Total Blocking Time](https://web.dev/tbt/) and [Cumulative Layout Shift](https://web.dev/cls/) that were caused by the interaction. -->
Por ejemplo, puede usar los informes de **tiempo de espera** para analizar las interacciones de usuario. Abra esta página [demo](https://coffee-cart.netlify.app/). Seleccione el modo de **Tiempo de Espera** y haga clic en **Iniciar tiempo de bloqueo**. En la página, haga clic en un café y termine el tiempo de bloqueo. Lea el informe para encontrar el [Tiempo de bloqueo total](https://web.dev/tbt/) y [Desplazamiento acumulado del diseño](https://web.dev/cls/) que fueron causados por la interacción.

<!-- Each mode has its own unique use cases, benefits, and limitations. Please refer to the [Lighthouse documentation](https://github.com/GoogleChrome/lighthouse/blob/master/docs/user-flows.md) for more information. -->
Cada modo tiene sus propios casos de uso, beneficios y limitaciones. Por favor, consulte la [documentación de Lighthouse](https://github.com/GoogleChrome/lighthouse/blob/master/docs/user-flows.md) para más información.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/loe3f6KaR9UdYe57oQ7r.png", alt="Los modos de Instantánea y Tiempo de Espera en el panel de Lighthouse", width="800", height="488" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/4d17e989f0f5bad0f9d4d5badff16fd6da09ae33 #}

Chromium issue: [772558](https://crbug.com/772558)

{% Partial 'devtools/reach-out.md' %}
{% Partial 'devtools/whats-new.md' %}
