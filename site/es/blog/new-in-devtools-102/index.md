---
layout: 'layouts/blog-post.njk'
title: 'Qué hay de nuevo en DevTools (Chrome 102)'
authors:
  - jecelynyeen
date: 2022-04-12
updated: 2022-04-12
description: "Nuevo panel de información de rendimiento, accesos directos para emular temas claros/oscuros y más."
hero: 'image/dPDCek3EhZgLQPGtEG3y0fTn4v82/4CYWnER9C02aV3UBOVkN.jpg'
alt: ''
tags:
  - new-in-devtools
  - devtools
  - chrome-102
---

_Gracias  por la traducción [Carlos Caballero](https://carloscaballero.io) y [Miguel Ángel](https://midu.dev) por la revisión._

{% Partial 'devtools/banner.md' %}


{% YouTube id='0V_ph7PA_aw' %}

<!-- start: translation instructions -->
<!-- + 1. Remove the "draft: true" tag above when submitting PR -->
<!-- + 2. Provide translations under each of the English commented original content -->
<!-- + 3. Translate the "description" tag above -->
<!-- + 4. Translate all the <img> alt text -->
<!-- + 5. Update the whats-new.md file -->
<!-- end: translation instructions -->

<!-- ## Preview feature: New Performance insights panel {: #perf } -->

<!-- Use the **Performance insights** panel to get actionable and use-case-driven insights on your website's performance. -->

<!-- [Open the panel](/docs/devtools/performance-insights/#open) and start a new recording based on your use case. For example, let’s measure the page load of this [demo page](https://coffee-cart.netlify.app/?ad=1). -->

## Función de vista previa: nuevo panel de información de rendimiento {: #perf }

Use el panel **Performance Insights** para obtener información procesable y basada en casos de uso sobre el rendimiento de su sitio web.

[Abra el panel](/docs/devtools/performance-insights/#open) e inicie una nueva grabación según su caso de uso. Por ejemplo, midamos la carga de la página de esta [página de demostración](https://coffee-cart.netlify.app/?ad=1).

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/EjgH5CD6FHnzoEhDEWxu.png", alt="Nuevo panel de información sobre el rendimiento", width="800", height="585" %}

<!-- Once the recording is complete, you get the performance insights on the  **Insights** pane. Click on each insight item (for example, Render blocking request, layout shift) to understand the issue and potential fixes.  -->

<!-- Go to the **Performance insights** panel [documentation](/docs/devtools/performance-insights/) to learn more with the step-by-step tutorial.  -->

<!-- This is a preview feature to help web developers (especially non-performance experts) to identify and fix potential performance issues. Our team is actively working on this feature and we are looking for your [feedback](https://crbug.com/1270700) for further enhancements. -->

Una vez que se completa la grabación, se obtiene información sobre el rendimiento en el panel **Insights**. Haga clic en cada elemento de información (por ejemplo, solicitudes de red que bloquean el renderizado, cambio de diseño) para comprender el problema y las posibles soluciones.


Vaya al panel de **Perspectivas de rendimiento** [documentación](/docs/devtools/performance-insights/) para obtener más información con el tutorial paso a paso.

Esta es una función de vista previa para ayudar a los desarrolladores web (especialmente a los expertos en rendimiento) a identificar y solucionar posibles problemas de rendimiento. Nuestro equipo está trabajando activamente en esta función y esperamos sus [comentarios](https://crbug.com/1270700) para realizar más mejoras.

Chromium issue: [1270700](https://crbug.com/1270700)


<!-- ## New shortcuts to emulate light and dark themes {: #emulation } -->

<!-- You can now emulate the light and dark themes quicker (CSS media feature [prefers-color-scheme](https://web.dev/prefers-color-scheme/#the-prefers-color-scheme-media-query)) with the new shortcuts in the **Styles** pane. -->

<!-- Previously, it took more steps to [emulate themes](/docs/devtools/rendering/emulate-css/) in the **Rendering** tab.   -->

## Nuevos atajos para emular temas claros y oscuros {: #emulation }

Ahora puede emular los temas claros y oscuros rápidamente (característica multimedia CSS [prefiere-color-scheme](https://web.dev/prefers-color-scheme/#the-prefers-color-scheme-media-query)) con los nuevos accesos directos en el panel **Estilos**.

Anteriormente, se necesitaban más pasos para [emular temas](/docs/devtools/rendering/emulate-css/) en la pestaña **Rendering**.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/dCbNHwE5ICGNXRUws1zz.png", alt="Nuevos atajos para emular temas claros y oscuros", width="800", height="488" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/34c39bcabca71195024f1312ec29eecf464a633d #}

Chromium issue: [1314299](https://crbug.com/1314299)


<!-- ## Improve security on the Network Preview tab {: #network-preview } -->

<!-- DevTools now apply the Content Security Policy (CSP) in the **Preview** tab in the **Network** panel. -->

<!-- For example, the first screenshot shows a page that contains [mixed content](https://web.dev/what-is-mixed-content/). The page loads over a secure HTTPS connection, but the stylesheet loads over an insecure HTTP connection. -->

<!-- The browser blocked the stylesheet request by default. However, when you opened the page via the **Preview** tab in the **Network** panel, the stylesheet was not blocked previously (hence the background turned into red). It is now blocked as you would expect (second screenshot). -->

## Seguridad mejorada en la pestaña Vista previa de la red {: #network-preview }

DevTools ahora aplica la Política de seguridad de contenido (CSP) en la pestaña **Vista previa** en el panel **Red**.

Por ejemplo, la primera captura de pantalla muestra una página que contiene [contenido mixto](https://web.dev/what-is-mixed-content/). La página se carga a través de una conexión HTTPS segura, pero la hoja de estilo se carga a través de una conexión HTTP no segura.

El navegador bloqueó la solicitud de la hoja de estilo de forma predeterminada. Sin embargo, cuando abrió la página a través de la pestaña **Vista previa** en el panel **Red**, la hoja de estilo no estaba bloqueada previamente (por lo tanto, el fondo se volvió rojo). Este está bloqueado como era de esperar (segunda captura de pantalla).

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/jxqxoJYqWXGzj4V9aJaX.png", alt="v", width="800", height="488" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/95bce20a2490b59a36d5da04c5f81d8c38230a39 #}

Chromium issue: [833147](https://crbug.com/833147)


<!-- ## Improved reloading at breakpoint {: #debugger } -->

<!-- The debugger now terminates script execution when reloading at breakpoint. -->

<!-- For example, the script got into an endless loop previously when setting and reloading at the `ReactDOM` breakpoint in this [React demo](https://react-stuck.glitch.me/). The **Sources** panel broke due to the endless loop.  -->

<!-- Continuing to execute JavaScript is causing a lot of trouble for developers and might leave the renderer in a broken state. This change aligns the debugging behavior with other browsers like Firefox. -->

## Recarga mejorada en el punto de interrupción {: #debugger }

El depurador finaliza la ejecución del script cuando se recarga en el punto de interrupción.

Por ejemplo, el `script` entró en un bucle infinito cuando se configuraba y recargaba en el punto de ruptura de `ReactDOM` en esta [demo de React] (https://react-stuck.glitch.me/). El panel de **Fuentes** se rompió debido al bucle infinito.

Continuar ejecutando JavaScript está causando muchos problemas a los desarrolladores y podría dejar el renderizador en un estado defectuoso. Este cambio alinea el comportamiento de depuración con otros navegadores como Firefox.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/QBv59pX5TE9c7iJAB3Xu.png", alt="Recarga mejorada en el punto de interrupción", width="800", height="566" %}

{# https://chromium.googlesource.com/chromium/src/+/ea207cee9bbd9b6731228d94778b23138373ec97 #}

Chromium issues: [1014415](https://crbug.com/1014415), [1004038](https://crbug.com/1004038), [1112863](https://crbug.com/1112863), [1134899](https://crbug.com/1134899)


<!-- ## Console updates  {: #console } -->

<!-- ### Handle script execution errors in the Console {: #errors } -->

<!-- Errors during script evaluation in the Console now generate proper error events that trigger the `window.onerror` handler and are dispatched as `"error"` events on the window object. -->

## Actualizaciones de la consola  {: #console }

### Manejar errores de ejecución de scripts en la Consola {: #errors }

Los errores durante la evaluación del script en la consola ahora generan eventos de error adecuados que activan el controlador `window.onerror` y se distribuyen como eventos `"error"` en el objeto de la ventana.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/gBtY4zD39SPizfcCGJJW.png", alt="Manejar errores de ejecución de scripts en la Consola", width="800", height="487" %}

{# https://chromium.googlesource.com/v8/v8/+/56cfdd68c731c53d016326b890b56b5c30098998 #}

Chromium issue: [1295750](https://crbug.com/1295750)


<!-- ### Commit live expression with Enter {: #live-expression } -->

<!-- Once you finish typing a [live expression](/blog/new-in-devtools-70/#watch), you can click `Enter` to commit it. Previously, hitting Enter resulted in adding new lines. This is inconsistent with other parts of the DevTools.  -->

<!-- To add a new line in the **live expression** editor, use `Shift` + `Enter` instead. -->

### Confirmar expresión en vivo con Enter {: #live-expression }

Una vez que termine de escribir una [expresión en vivo](/blog/new-in-devtools-70/#watch), puede hacer clic en 'Enter' para confirmarla. Anteriormente, al presionar Enter se agregaban nuevas líneas. Esto es inconsistente con otras partes de DevTools.

Para agregar una nueva línea en el editor de **expresiones en vivo**, use `Shift` + `Enter`.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/yB7m2052mYzgsRgjIMvs.png", alt="Confirmar expresión en vivo con Enter", width="800", height="541" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/f6f73b8d9eedbc5b6006e61c3be0d843188eac55 #}

Chromium issue: [1260744](https://crbug.com/1260744)

<!-- ## Cancel user flow recording at the start {: #recorder } -->

<!-- You can cancel the recording during the start of user flow recording. Previously, there was no option to cancel the recording. -->

## Cancelar registro de flujo de usuario al inicio {: #recorder }

Puede cancelar la grabación durante el inicio de la grabación del flujo de usuario. Anteriormente, no había opción para cancelar la grabación.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/3vhz3UrjLd9lJKcYw2FU.png", alt="Cancelar registro de flujo de usuario al inicio", width="800", height="488" %}

Chromium issue: [1257499](https://crbug.com/1257499)


<!-- ## Display inherited highlight pseudo-elements in the Styles pane {: #pseudo } -->

<!-- View the inherited highlight pseudo-elements  (e.g. `::selection`, `::spelling-error`, `::grammar-error`, and `::highlight`) in the **Styles** pane. Previously, these rules were not displayed. -->

<!-- As mentioned in the [specification](https://drafts.csswg.org/css-pseudo-4/#highlight-cascade), when multiple styles conflict, cascade determines the winning style. This new feature helps you understand the inheritance and priority of the rules. -->

## Mostrar pseudoelementos resaltados heredados en el panel Estilos {: #pseudo }

Vea los pseudoelementos heredados resaltados (por ejemplo, `::selection`, `::spelling-error`, `::grammar-error` y `::highlight`) en el panel **Estilos**. Anteriormente, estas reglas no se mostraban.

Como se menciona en la [especificación](https://drafts.csswg.org/css-pseudo-4/#highlight-cascade), cuando varios estilos entran en conflicto, la cascada determina el estilo ganador. Esta nueva función ayuda a comprender la herencia y la prioridad de las reglas.

{% Aside %}
<!-- At the moment, you need to run Chrome with the `--enable-blink-features=HighlightInheritance` flag to enable this feature. -->

Por el momento, debe ejecutar Chrome con el flag `--enable-blink-features=HighlightInheritance` para habilitar esta función.
{% endAside %}

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/fD8vohg49HvBPW53GV2Q.png", alt="Mostrar pseudoelementos heredados resaltados en el panel Estilos", width="800", height="529" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/bfe1683fe8b2eaa9ea2960dedca2e4a0bbc73546 #}

Chromium issue: [1024156](https://crbug.com/1024156)


<!-- ## Miscellaneous highlights {: #misc } -->

<!-- These are some noteworthy fixes in this release: -->

<!-- - The **Properties** pane now displays accessor properties with value by default. It was hidden mistakenly previously. ([1309087](https://crbug.com/1309087))
- The **Styles** pane now properly shows the overridden `@support` rules as strikethrough. Previously, the rules weren’t strikethrough. ([1298025](https://crbug.com/1298025))
- Fixed the CSS formatting logic in the **Sources** panel that caused multiple blank lines when editing CSS. ([1309588](https://crbug.com/1309588))
- Cap the **Expand recursively** option of an object in the **Console** to maximum 100 so it does not go on forever for circular objects. ([1272450](https://crbug.com/1272450)) -->

## Destacados varios {: #misc }

Estas son algunas correcciones notables en esta versión:

- El panel **Propiedades** ahora muestra las propiedades del accesor con valor de forma predeterminada. Anteriormente se ocultó por error. ([1309087](https://crbug.com/1309087))
- El panel **Estilos** ahora muestra correctamente las reglas anuladas de `@support` como tachadas. Anteriormente, las reglas no estaban tachadas. ([1298025](https://crbug.com/1298025))
- Se corrigió la lógica de formato de CSS en el panel **Fuentes** que causaba múltiples líneas en blanco al editar CSS. ([1309588](https://crbug.com/1309588))
- Limitación en la opción **Expandir recursivamente** de un objeto en la **Consola** a un máximo de 100 para evitar bucles innfinitos en los objetos circulares. ([1272450](https://crbug.com/1272450))

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/d4240f8bc96a3ebd2dc2a5b316fd41c24e20fb3c #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/cf09d1de8a0277dbaa9e2000a8d2fcca69e7128e #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/6616b9f0cd3e9f1138fb0f409fbe91206d5c8640 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/9751653723e15073588f985ba53ba5204475b8c5 #}


<!-- ## [Experimental] Copy CSS changes {: #copy } -->

## [Experimental] Copiar cambios de CSS {: #copy }


{% Aside %}
<!-- To enable the experiment, check **Sync CSS changes in the Styles pane** under **Settings** > **Experiments**. -->

Para habilitar el experimento, marque **Sincronizar cambios de CSS en el panel Estilos** en **Configuración** > **Experimentos**.
{% endAside %}

<!-- With this experiment, the **Styles** pane highlights your CSS changes in green. You can hover over the changed rules and click on the new copy button next to it to copy it. -->

<!-- Apart from that, you can copy all CSS changes across declarations by right-clicking on any rule, and selecting **Copy all CSS changes**. -->

<!-- A new **Copy** button is added to the [Changes](/docs/devtools/changes/) tab as well to help you keep track and copy your CSS changes with ease! -->

Con este experimento, el panel **Estilos** resalta sus cambios de CSS en verde. Puede pasar el cursor sobre las reglas modificadas y hacer clic en el nuevo botón de copia junto a él para copiarlo.

Aparte de eso, puede copiar todos los cambios de CSS en las declaraciones haciendo clic derecho en cualquier regla y seleccionando **Copiar todos los cambios de CSS**.

¡También se agregó un nuevo botón **Copiar** a la pestaña [Cambios](/docs/devtools/changes/) para ayudarlo a realizar un seguimiento y copiar sus cambios de CSS con facilidad!

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/7PYMKJNBguswcas6jbpu.png", alt="Copiar cambios de CSS", width="800", height="488", class="screenshot" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/afe5698f1cd20304d2763574ef8e9faf6a4a6db1 #}
{# ​​https://chromium.googlesource.com/devtools/devtools-frontend/+/5de1d6140cad945783f3ca54055134f4a7db42a1 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/573dfc1cca09e49177ece3898c9ba9619c386f06 #}

Chromium issue: [1268754](https://crbug.com/1268754)


<!-- ## [Experimental] Picking color outside of browser {: #color-picker } -->

## [Experimental] Selección de color fuera del navegador{: #color-picker }


{% Aside %}
<!-- To enable the experiment, check **Enable color picking outside the browser window** under **Settings** > **Experiments**. -->
Para habilitar el experimento, marque **Habilitar selección de color fuera de la ventana del navegador** en **Configuración** > **Experimentos**.
{% endAside %}

<!-- Enable this experiment to pick a color outside of the browser with the color picker. Previously, you could only pick a color within the browser. -->

<!-- In the **Styles** pane, click on any color preview to open the color picker. Use the eyedropper to pick color from anywhere.  -->

Habilite este experimento para elegir un color fuera del navegador con el selector de color. Anteriormente, solo podía elegir un color dentro del navegador.

En el panel **Estilos**, haga clic en cualquier vista previa de color para abrir el selector de color. Usa el cuentagotas para elegir el color de cualquier lugar.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/h3xLPNl1QdvyuzZpNuqW.png", alt="Elegir color fuera del navegador", width="800", height="450" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/1a73be9f3cb75fdd57578224b71396fbf68f8637 #}

Chromium issue: [1245191](https://crbug.com/1245191)


{% Partial 'devtools/reach-out.md' %}
{% Partial 'devtools/whats-new.md' %}
