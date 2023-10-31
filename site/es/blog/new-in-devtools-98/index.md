---
layout: 'layouts/blog-post.njk'
title: 'Qué hay de nuevo en DevTools (Chrome 98)'
authors:
  - jecelynyeen
date: 2022-01-13
updated: 2022-01-13
description: 'Árbol de accesibilidad de página completa, cambios más precisos en la pestaña cambios, y más novedades.'
hero: 'image/dPDCek3EhZgLQPGtEG3y0fTn4v82/Mw5b9AiYmZVqguYAoBQB.jpg'
alt: ''
tags:
  - new-in-devtools
  - devtools
  - chrome-98
---

_Gracias [Carlos Caballero](https://carloscaballero.io) por la traducción y [Miguel Ángel](https://midu.dev) por la revisión._

{% Partial 'devtools/banner.md' %}

{% YouTube id='YqkIS88VulM' %}

<!-- start: translation instructions -->
<!-- 1. Remove the "draft: true" tag above when submitting PR -->
<!-- 2. Provide translations under each of the English commented original content -->
<!-- 3. Translate the "description" tag above -->
<!-- 4. Translate all the <img> alt text -->
<!-- 5. Update the whats-new.md file -->
<!-- end: translation instructions -->

<!-- ## Preview feature: Full-page accessibility tree {: #a11y-tree } -->

## Función en vista previa: Árbol de accesibilidad de página completa {: #a11y-tree }

<!-- The new **Full-page accessibility tree** makes it easier for you to get an overview of the full-page [accessibility tree](/blog/full-accessibility-tree/#what-is-the-accessibility-tree) and help you better understand how your web content is exposed to assistive technology.  -->

El nuevo **arbol de accesibilidad de página completa** hace más fácil obtener una visión del [árbol de accesibilidad](/blog/full-accessibility-tree/#what-is-the-accessibility-tree) y te ayuda a una mejor comprensión de cómo el contenido de tu web es expuesto a la tecnología de asistencia.

<!-- In the **Elements** panel, open the **Accessibility** pane and select **Enable full-page accessibility tree** checkbox. Then, reload DevTools and you will see a new accessibility button in the **Elements** panel. -->

En el panel **Elementos**, abre el panel **Accessibilidad** y selecciona la casilla **Enable full-page accessibility tree**. A continuación, recarga DevTools y verás un nuevo botón de accesibilidad en el panel **Elementos**.

<!-- Click on it to toggle to the **Full-page accessibility tree** view. You can expand nodes or click to see details in the  **Accessibility** pane. -->

Clic en este botón para activar/desactivar la vista de **árbol de accesibilidad de pantalla completa**. Puede expandir nodos o cliquear para ver detalles en el panel de **Accesibilidad**.

<!-- Previously, the accessibility tree was available in the **Accessibility** pane. The view is limited, it only enables you to explore a single node and its ancestors. -->

Anteriormente, el árbol de accesibilidad estaba disponible en el panel de **Accesibilidad**. La vista es limitada, solo le permite explorar un único nodo y sus ancestros.

<!-- Our team is still actively working on this preview feature. We are looking for your [feedback](https://goo.gle/devtools-a11y-tree-feedback) for further enhancements! -->

Nuestro equipo está aún trabajando activamente en esta novedad. ¡Estamos buscando tu [feedback](https://goo.gle/devtools-a11y-tree-feedback) para futuras mejoras!

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/o4BY07JabERFd6OieU8b.png", alt="Árbol de accesibilidad de pantalla completa", width="800", height="505" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/847a06a6535111826f898175b210dbe0948277a0 #}

Chromium issue: [887173](https://crbug.com/887173)

<!-- ## More precise changes in the Changes tab {: #changes }  -->

## Cambios más precisos en la pestaña Cambios {: #changes }

<!-- The code changes in the **Changes** tab is pretty-printed automatically.  -->

Los cambios de código en la pestaña **Cambios** se imprimen desplegados automáticamente.

<!-- Previously, it was hard to trace the actual changes of minified source code because all the code is shown in a single line.  -->

Anteriormente, era difícil rastrear los cambios reales del código fuente minificado porque el código se muestra en una sola línea.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/aup2bT490dkvuBu3o4DS.png", alt="Pestaña Cambios", width="800", height="450" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/4382b533525c65fbdb1785eda2babf035ad8bcb8 #}

Chromium issues: [1238818](https://crbug.com/1238818), [1268754](https://crbug.com/1268754) , [1086491](https://crbug.com/1086491)

<!-- ## Set longer timeout for user flow recording {: #recorder-timeout } -->

## Establecer un tiempo de espera más largo para la grabación del flujo de usuario {: #recorder-timeout }

<!-- You can now adjust the **Timeout** settings in the [Recorder](/docs/devtools/recorder/) for all steps or a specific step. This is useful especially for pages with slow network requests and lengthy animation. -->

Ahora puede ajustar la configuración de **Tiempo de espera** (_timeout_) en el panel [Recorder](/docs/devtools/recorder/) para todos los pasos o para un paso específico. Esto es útil especialmente para páginas con solicitudes de red lentas y animación prolongada.

<!-- For example, I [recorded a user flow](/docs/devtools/recorder/#record) on this [demo page](https://jec.fish/demo/pup-slow-result) to load and click on the menu item. However, the loading of the menu items is slow (it takes 6 seconds). The [replay](/docs/devtools/recorder/#replay) of this user flow failed because it exceeds 5 seconds  (the default timeout). -->

Por ejemplo, [registré un flujo de usuario](/docs/devtools/recorder/#record) en esta [página de demostración](https://jec.fish/demo/pup-slow-result) para cargar y hacer clic en la opción del menú. Sin embargo, la carga de los elementos del menú es lenta (esta tarda 6 segundos). La [reproducción](/docs/devtools/recorder/#replay) de este flujo de usuario falló porque supera los 5 segundos (el tiempo de espera predeterminado).

<!-- We can use the new **Timeout** settings to fix this. Expand the step which we click on the menu item. [Edit the step](/docs/devtools/recorder/#edit-steps) by  **Add timeout** and set it to **6000** milliseconds (equal to 6s). -->

Podemos usar la nueva configuración de **Tiempo de espera** para arreglar esto. Expanda el paso en el que hacemos clic en el elemento del menú. [Edite el paso](/docs/devtools/recorder/#edit-steps) mediante **Add timeout** y configúrelo en **6000** milisegundos (igual a 6s).


<!-- Optionally, you can adjust the **Timeout** in the **Replay settings** for all the steps. Expand the **Replay settings** and edit the **Timeout** value.  -->

Opcionalmente, puede ajustar el **Tiempo de espera** en **Replay settings** para todos los pasos. Expanda la configuración de reproducción (**Replay settings**) y edite el valor de **Timeout**.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/y7RDpIp3pd2n6Vnxc5Du.png", alt="Configuración de tiempo de espera para la grabación de flujo de usuario", width="800", height="530" %}

Chromium issue: [1257499](https://crbug.com/1257499)

<!-- ## Ensure your pages are cacheable with the Back/forward cache tab {: #bfcache } -->

## Asegúrese de que sus páginas se puedan almacenar en caché con la pestaña de caché Atrás/adelante {: #bfcache }

<!-- [Back/forward cache (or bfcache)](https://web.dev/bfcache/) is a browser optimization that enables instant back and forward navigation.  -->

[Caché Atrás/adelante (o bfcache)](https://web.dev/bfcache/) es una optimización del navegador que permite la navegación instantánea hacia atrás y hacia adelante.

<!-- The new **Back/forward cache** tab can help you test your pages to ensure they're optimized for bfcache, and identify any issues that may be preventing them from being eligible. -->

La nueva pestaña **Caché atrás/adelante** puede ayudarle a probar sus páginas para asegurarse de que estén optimizadas para bfcache e identificar cualquier problema que pueda estar impidiendo que sean elegibles.

<!-- To test a particular page, navigate to it in Chrome and then in DevTools go to **Application** > **Back-forward Cache**. Next, click the **Test back/forward cache** button and DevTools will attempt to navigate away and back to determine whether the page could be restored from bfcache. -->

Para probar una página en particular, navegue hasta ella en Chrome y luego, en DevTools, vaya a **Aplicación** > **Caché de páginas completas**. A continuación, haga clic en el botón **Realizar prueba** y DevTools intentará navegar hacia adelante y hacia atrás para determinar si la página se puede restaurar desde bfcache.

<!-- As web developers, it's critical to know how to optimize your pages for bfcache across all browsers because it will significantly improve the browsing experience for users—especially those with slower networks or devices.  -->

Como desarrolladores web, es fundamental saber cómo optimizar sus páginas para bfcache en todos los navegadores porque mejorará significativamente la experiencia de navegación de los usuarios, especialmente aquellos con redes o dispositivos más lentos.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/4OrWjuRgG1bB0AupcMmS.png", alt="Pestaña de caché atrás/adelante", width="800", height="516" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/f4b1333582da2410e5bc8715998b96a83b924625 #}

Chromium issue: [1110752](https://crbug.com/1110752)

<!-- ## New Properties pane filter {: #properties } -->

## Nuevo filtro de panel de propiedades {: #properties }

<!-- If you want to focus on a specific property in the **Properties** pane, you can now type that property name or value in the new **Filter** textbox.  -->

Si desea enfocarse en una propiedad específica en el panel **Propiedades**, ahora puede escribir el nombre o el valor de esa propiedad en el nuevo cuadro de texto **Filter**

<!-- By default, properties whose value is `null` or `undefined` are not shown. Enable the **Show all** checkbox to view all properties.  -->

Por defecto, las propiedades cuyo valor son `null` o `undefined` no se muestran. Active la casilla de verificación **Show All** para ver todas las propiedades.

<!-- These enhancements allow you to get to the properties you care for quicker and thus improve your productivity! -->

¡Estas mejoras le permiten llegar a las propiedades que le interesan más rápido y, por lo tanto, mejorar su productividad!

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/ewmNloO4ohRxlWRNuEW1.png", alt="Filtro del panel de propiedades", width="800", height="505" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/0980f52facf75b6c03e14472d13fe27968d4732b #}

Chromium issue: [1269674](https://crbug.com/1269674)

<!-- ## Emulate the CSS forced-colors media feature {: #forced-colors } -->

## Emular la característica de medios de colores forzados de CSS {: #forced-colors }

<!-- The [forced-colors](https://drafts.csswg.org/mediaqueries-5/#forced-colors) CSS media feature is used to detect if the user agent has enabled a forced colors mode (e.g. Windows High Contrast mode) where it enforces a user-chosen limited color palette on the page.  -->

La función de medios CSS [colores forzados](https://drafts.csswg.org/mediaqueries-5/#forced-colors) se usa para detectar si el agente de usuario ha habilitado un modo de colores forzados (por ejemplo, el modo de alto contraste de Windows) donde impone una paleta de colores limitada elegida por el usuario en la página.

<!-- Open the [Command Menu](/docs/devtools/command-menu/), run the **Show Rendering** command, and then set the **Emulate CSS media feature forced-colors** dropdown. -->

Abra el [Menú de comandos](/docs/devtools/command-menu/), ejecute el comando **Mostrar renderizado** y luego configure el menú desplegable **Emular función multimedia CSS forced-colors**.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/75qGjkzfbXfOEJUhML5i.png", alt="Emular función multimedia de CSS forced-colors", width="800", height="623" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/db79deee160cda92eda91775a27773611dce8188 #}

Chromium issue: [1130859](https://crbug.com/1130859)

<!-- ## Show rulers on hover command {: #show-rulers } -->

## Mostrar reglas con el comando hover {: #show-rulers }

<!-- You can now open the [Command Menu](/docs/devtools/command-menu/) and run the **Show rulers on hover** command. The page rulers make it easier to measure the width and height of an element. -->

Ahora puede abrir el [Menú de comandos](/docs/devtools/command-menu/) y ejecutar el comando **Show rulers on hover**. Las reglas de página facilitan la medición del ancho y el alto de un elemento.

<!-- Previously, you can only enable the page rulers via **Settings** > **Show rulers** checkbox. -->

Anteriormente, solo podía habilitar las reglas de página a través de la casilla de verificación **Preferencias** > **Show rulers on hover**.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/FLF6RWO2bm5SMksdayLv.png", alt="Mostrar reglas con el comando hover", width="800", height="591" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/5bb8330e0f0a1c90f4a932e35aa5521826c8beea #}

Chromium issue: [1270562](https://crbug.com/1270562)

<!-- ## Support `row-reverse` and `column-reverse` in the Flexbox editor {: #flexbox-editor } -->

## Soporte para `row-reverse` y `column-reverse` en el editor Flexbox {: #flexbox-editor }

<!-- The [Flexbox editor](/blog/new-in-devtools-90/#flexbox) added two new buttons to support `row-reverse` and `column-reverse` in `flex-direction`.  -->

El [editor Flexbox](/blog/new-in-devtools-90/#flexbox) agregó dos nuevos botones para admitir `row-reverse` y `column-reverse` en `flex-direction`.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/JHI4frP4MqaydXk19sq2.png", alt="Editor de flexbox", width="800", height="546" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/7c98a6cdc296887350418746b42b2b0a474e7f27 #}

Chromium issue: [1263866](https://crbug.com/1263866)

<!-- ## New keyboard shortcuts to replay XHR and expand all search results {: #shortcuts } -->

## Nuevos atajos de teclado para reproducir XHR y expandir todos los resultados de búsqueda {: #shortcuts }

<!-- ### Keyboard shortcuts to replay XHR in the Network panel {: #replay-xhr } -->

### Atajos de teclado para repetir XHR en el panel Red {: #replay-xhr }

<!-- Select a XHR request in the **Network** panel and press **R** on the keyboard to replay the XHR. Previously, you can only replay the XHR via the context menu (right click > **Replay XHR**) -->

Seleccione una solicitud XHR en el panel **Red** y presione **R** en el teclado para repetir el XHR. Anteriormente, solo podía repetir el XHR a través del menú contextual (clic con el botón derecho > **Repetir XHR**)

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/M3s35wS3A0OoKMeubzMx.png", alt="Repetir XHR", width="800", height="530" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/ee4a6138511d69a549677c31b563484e25855d1f #}

Chromium issue: [1050021](https://crbug.com/1050021)

<!-- ### Keyboard shortcut to expand all search results {: #toggle-search-result } -->

### Atajo de teclado para expandir todos los resultados de búsqueda {: #toggle-search-result }

<!-- A new shortcut is added in the **Search** tab allowing you to expand and collapse all the search results. Previously, you could only expand and collapse the search results by clicking on one file at a time. -->

Se agregó un nuevo acceso directo en la pestaña **Buscar** que le permite expandir y contraer todos los resultados de búsqueda. Anteriormente, solo podía expandir y contraer los resultados de la búsqueda haciendo clic en un archivo a la vez.

<!-- Open the search tab via **Esc** > **3-dot** menu > **Search**. Enter a search string (e.g. function) and press **Enter** to see the list of search results. Focus on the search results and use the following shortcut to expand/collapse the search files: -->

Abra la pestaña de búsqueda a través de **Esc** > Menú de **3 puntos** > **Buscar**. Ingrese una cadena de búsqueda (por ejemplo, `function`) y presione **Entrar** para ver la lista de resultados de búsqueda. Enfóquese en los resultados de la búsqueda y use el siguiente atajo para expandir/contraer los archivos de búsqueda:

- **Windows / Linux** - `Ctrl` + `Shift` + `{` or `}`
- **MacOS** - `Cmd` + `Options` + `{` or `}`

<!-- Go to the [keyboard shortcuts](/docs/devtools/shortcuts/) for reference of keyboard shortcuts in Chrome DevTools. -->

Vaya a los [atajos de teclado](/docs/devtools/shortcuts/) para consultar los atajos de teclado en Chrome DevTools.

{% Video src="video/dPDCek3EhZgLQPGtEG3y0fTn4v82/v11XfQLwp7w9qIk440QP.mp4", autoplay="true", muted="false", loop="true",  class="screenshot" %}

## Lighthouse 9 {: #lighthouse }

<!-- The **Lighthouse** panel is now running Lighthouse 9. Lighthouse will now list all the elements sharing the same id. -->

El panel **Lighthouse** ahora ejecuta Lighthouse 9. Lighthouse ahora enumerará todos los elementos que comparten la misma identificación.

<!-- Non-unique element id is a common accessibility problem. For instance, the id referenced in an `aria-labelledby` attribute is used on [multiple elements](https://web.dev/duplicate-id-aria/).  -->

La identificación de elemento no único es un problema de accesibilidad común. Por ejemplo, la identificación a la que se hace referencia en un atributo `aria-labelledby` se usa en [múltiples elementos](https://web.dev/duplicate-id-aria/).

<!-- Check out the [What's new in Lighthouse 9.0](/blog/lighthouse-9-0/) for more details on the updates. -->

Consulte [Novedades de Lighthouse 9.0](/blog/lighthouse-9-0/) para obtener más detalles sobre las actualizaciones.

{% Img src="image/MtjnObpuceYe3ijODN3a79WrxLU2/gZI1flmYHuUpF637Idzy.png", alt="A Lighthouse audit for 'All focusable elements must have a unique `id`', showing two elements, both with the same `id`", width="800", height="380", class="screenshot" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/93a4454b7c558d6ca748c718167bc4aa592eaf63 #}

Chromium issue: [772558](https://crbug.com/772558)

<!-- ## Improved Sources panel {: #sources } -->
## Panel Fuentes mejorado {: #sources }

<!-- Loads of stability improvements in the **Sources** panel as we upgraded it to use [CodeMirror 6](https://codemirror.net/6/). Here are few notable improvements: -->

Muchas mejoras de estabilidad en el panel **Fuentes** a medida que lo actualizamos para usar [CodeMirror 6](https://codemirror.net/6/). Aquí hay algunas mejoras notables:

<!-- - Significantly faster when opening large files (e.g. WASM, JavaScript)
- No more random scrolling when stepping through code
- Improved auto-complete suggestions for editable sources (e.g. snippets, local override)  -->

- Significativamente más rápido al abrir archivos grandes (por ejemplo, WASM, JavaScript)
- No más desplazamiento aleatorio al recorrer el código
- Sugerencias de autocompletado mejoradas para códigos editables (por ejemplo, `snippets`, sobreescribir valores locales)

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/c1ab112d9002d5c3b3bb70cf2839bac182f0cdb5 #}

Chromium issue: [1241848](https://crbug.com/1241848)

<!-- ## Miscellaneous highlights {: #misc } -->

## Destacados varios {: #misc }

<!-- These are some noteworthy fixes in this release: -->

Estas son algunas correcciones notables en esta versión:

<!-- - Properly displaying the waterfall diagram of network requests. Previously, the style was broken. ([1275501](https://crbug.com/1275501))
- The code highlight was broken when searching in documents with very long lines in the **Sources** panel. It's now fixed. ([1275496](https://crbug.com/1275496))
- No more duplicate **Payload** tab in network requests. ([1273972](https://crbug.com/1273972))
- Fixed the missing layout shifts details in the **Summary** section of the **Performance** panel. ([1259606](https://crbug.com/1259606))
- Support arbitrary characters (e.g. `,`, `.`),  in **Network Search** queries. ([1267196](https://crbug.com/1267196)) -->

- Visualización adecuada del diagrama de cascada de las solicitudes de red. Anteriormente, el estilo estaba roto. ([1275501](https://crbug.com/1275501))
- El resaltado del código se rompía al buscar en documentos con líneas muy largas en el panel **Fuentes**. Ahora está arreglado. ([1275496](https://crbug.com/1275496))
- No más pestañas duplicadas de **Payload** en las solicitudes de red. ([1273972](https://crbug.com/1273972))
- Se corrigieron los detalles de los cambios de diseño que faltaban en la sección **Resumen** del panel **Rendimiento**. ([1259606](https://crbug.com/1259606))
- Admite caracteres arbitrarios (por ejemplo, `,`, `.`), en consultas de **Búsqueda de red**. ([1267196](https://crbug.com/1267196))

<!-- ### [Experimental] Endpoints in the Reporting API pane {: #reporting-api } -->

### [Experimental] Endpoints en el panel de informes de API {: #reporting-api }

{% Aside %}
<!-- To enable the experiment, check the **Enable Reporting API panel in the Application panel** checkbox under **Settings** > **Experiments**. -->
Para habilitar el experimento, marque la casilla de verificación **Enable Reporting API panel in the Application panel** en **Configuración** > **Experimentos**.
{% endAside %}

<!-- The experimental **Reporting API** pane was introduced in [Chrome 96](/blog/new-in-devtools-96/#reporting-api) to help you monitor the reports generated on your page and their status. -->

El panel experimental **API Reporting** se introdujo en [Chrome 96](/blog/new-in-devtools-96/#reporting-api) para ayudarlo a monitorear los informes generados en su página y su estado.

<!-- The **Endpoints** section is now available. It gives you an overview of all the endpoints configured in the `Reporting-Endpoints` header. -->

La sección **Endpoints** ya está disponible. Le brinda una descripción general de todos los `endpoints` configurados en el encabezado `Reporting-Endpoints`.

<!-- Learn to use the [Reporting API](https://web.dev/reporting-api/) to monitor security violations, deprecated API calls, and more. -->

Aprenda a usar la [API de informes](https://web.dev/reporting-api/) para monitorear violaciones de seguridad, llamadas a API obsoletas y más.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/D1fUz4zuS1xwDbszgft1.png", alt="Panel de informes de API", width="800", height="560" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/a831b26b7ecde579144a42a4faaa7b639789bf3c #}

Chromium issue: [1200732](https://crbug.com/1200732)

{% Partial 'devtools/reach-out.md' %}
{% Partial 'devtools/whats-new.md' %}
