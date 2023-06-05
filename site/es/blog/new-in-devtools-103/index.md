---
layout: 'layouts/blog-post.njk'
title: 'Qué hay de nuevo en DevTools (Chrome 103)'
authors:
  - jecelynyeen
date: 2022-06-14
updated: 2022-06-14
description: "Captura de eventos de doble-click y clic derecho en el panel Grabación, nuevas opciones para medir el flujo de usuario en Lighthouse y más."
hero: 'image/dPDCek3EhZgLQPGtEG3y0fTn4v82/Q9pEKY4SizIKKYpJJriL.jpg'
alt: ''
tags:
  - new-in-devtools
  - devtools
  - chrome-103
---

_Gracias  por la traducción [Miguel Ángel](https://midu.dev) y [Carlos Caballero](https://carloscaballero.io) por la revisión._

{% Partial 'devtools/banner.md' %}

{% YouTube id='LyMts4yfQu8' %}

<!-- ## Capture double-click and right-click events in the Recorder panel {: #recorder } -->
## Captura de eventos de doble-click y clic derecho en el panel Grabación {: #recorder }

<!-- The **Recorder** panel can now capture double-click and right-click events. -->
El panel **Grabación** puede capturar ahora eventos de doble-click y clic derecho.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/qsleBCUrr2twMujW0R94.png", alt="Captura de eventos de doble-click y clic derecho en el panel Grabación", width="800", height="572" %}

<!-- In this [example](https://jec.fish/demo/dbl-right-click), start a [recording](/docs/devtools/recorder/#record) and try to perform the following steps:  -->
En este [ejemplo](https://jec.fish/demo/dbl-right-click), comience una grabación e intente realizar los siguientes pasos:

<!-- - Double-click the card to enlarge it
- Right-click the card and select an action from the context menu -->
- Doble-clic en la tarjeta para ampliarla
- Clic derecho en la tarjeta y seleccione una acción del menú contextual

<!-- To understand how **Recorder** captured these events, expand the steps: -->
Para entender como la **Grabadora** capturó estos eventos, expanda los pasos:

<!-- - **Double-click** is captured as `type: doubleClick`.
- **Right-click** event is captured as `type: click` but with the `button` property is set to `secondary`. The `button` value of a normal mouse click is `primary`. -->
- **Doble-clic** se captura como `type: doubleClick`.
- El evento de **Clic derecho** se captura como `type: click` pero con la propiedad `button` establecida a `secondary`. El valor `button` de un clic normal del ratón es `primary`.

Chromium issues: [1300839](https://crbug.com/1300839), [1322879](https://crbug.com/1322879), [1299701](https://crbug.com/1299701), [1323688](https://crbug.com/1323688)


<!-- ## New timespan and snapshot mode in the Lighthouse panel {: #lighthouse } -->
## Nuevos modos de tiempo e instantánea en el panel Lighthouse {: #lighthouse }

<!-- You can now use **Lighthouse** to measure your website’s performance beyond page load. -->
Ahora puedes usar **Lighthouse** para medir el rendimiento de su sitio web más allá del tiempo de carga de página.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/3GGcCxlOGrnXLMfp0t9y.png", alt="Nuevos modos de tiempo e instantánea en el panel Lighthouse", width="800", height="507" %}

<!-- The **Lighthouse** panel now supports 3 modes of user flow measurement:  -->
El panel **Lighthouse** ahora soporta 3 modos de medida de flujo de usuario:

<!-- - [Navigation](https://github.com/GoogleChrome/lighthouse/blob/master/docs/user-flows.md#navigation) reports analyze a single page load. Navigation is the most common report type. All Lighthouse reports before the current version are navigation reports.
- [Timespans](https://github.com/GoogleChrome/lighthouse/blob/master/docs/user-flows.md#timespan) reports analyze an arbitrary time period, typically containing user interactions.
- [Snapshots](https://github.com/GoogleChrome/lighthouse/blob/master/docs/user-flows.md#snapshot) reports analyze the page in a particular state, typically after the user has interacted with it. -->
- Los reportes de [Navegación](https://github.com/GoogleChrome/lighthouse/blob/master/docs/user-flows.md#navigation) analizan una sola carga de página. La navegación es el tipo de reporte más común. Todos los reportes de Lighthouse antes de la versión actual son reportes de navegación.
- Los reportes de [Tiempo](https://github.com/GoogleChrome/lighthouse/blob/master/docs/user-flows.md#timespan) analizan un periodo arbitrario de tiempo, que normalmente contiene interacciones de usuario.
- Los reportes de [Instantánea](https://github.com/GoogleChrome/lighthouse/blob/master/docs/user-flows.md#snapshot) analizan la página en un estado particular, que normalmente se produce después de que el usuario interactúa con ella.

<!-- For example, let’s measure the performance of adding items to cart on this [demo page](https://coffee-cart.netlify.app/). Select the **Timespan** mode and click **Start timespan**. Scroll and add a few items to the cart. Once you are done, click on **End timespan** to generate a Lighthouse report of the user interactions. -->
Por ejemplo, veamos el rendimiento de añadir elementos al carrito en esta [página de demostración](https://coffee-cart.netlify.app/). Seleccione el modo **Tiempo** y haga clic en **Iniciar tiempo**. Desplácese y añada algunos elementos al carrito. Una vez haya terminado, haga clic en **Finalizar tiempo** para generar un reporte de Lighthouse de las interacciones de usuario.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/pq9Vg8xOUzplWAlXGJEa.png", alt="Modo tiempo", width="800", height="549" %}

<!-- See [User flows in Lighthouse](https://github.com/GoogleChrome/lighthouse/blob/master/docs/user-flows.md) to learn about the unique use cases, benefits, and limitations of each mode.  -->
Vea [flujos de usuario en Lighthouse](https://github.com/GoogleChrome/lighthouse/blob/master/docs/user-flows.md) para aprender sobre los casos de uso únicos, los beneficios y las limitaciones de cada modo.

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/70d4a90431dc6c881209f605411ce0bd2272d6d1 #}

Chromium issue: [1291284](https://crbug.com/1291284)


<!-- ## Performance Insights updates {: #performance } -->
## Actualizaciones en Consejos de Rendimiento {: #performance } -->

<!-- ### Improved zoom control in the Performance Insights panel {: #zoom } -->
### Mejora en el control de zoom en el panel de Consejos de Rendimiento {: #zoom }

<!-- DevTools will now zoom in based on your mouse cursor rather than the playhead position.With the latest cursor-based zoom, you can move your mouse to anywhere in the track, and [zoom in](/docs/devtools/performance-insights/#navigate) to the desired area right away.  -->
DevTools ahora ampliará según el cursor de su ratón en vez de la posición de la reproducción. Con la última ampliación basada en el cursor, puede mover el ratón en cualquier parte en la pista, y [ampliar](/docs/devtools/performance-insights/#navigate) hasta el área deseada inmediatamente.

{% Video src="video/dPDCek3EhZgLQPGtEG3y0fTn4v82/U8d1PjOFZuGkyOXHQ5Z8.mp4", autoplay=true, loop=true, class="screenshot" %}

<!-- See [Performance Insights](/docs/devtools/performance-insights/) to learn how to get actionable insights and improve your website’s performance with the panel. -->
Vea [Consejos de Rendimiento](/docs/devtools/performance-insights/) para aprender cómo obtener consejos accionables y mejorar el rendimiento de su sitio web con el panel.

Chromium issue: [1313382](https://crbug.com/1313382)


<!-- ### Confirm to delete a performance recording {: #delete } -->
### Confirmar para eliminar de una grabación de rendimiento {: #delete }

<!-- DevTools now shows a confirmation dialog before [deleting a performance recording](/docs/devtools/performance-insights/#delete). -->
DevTools ahora muestra un diálogo de confirmación antes de [eliminar una grabación de rendimiento](/docs/devtools/performance-insights/#delete).

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/DaoCroAA60WmMLpuVU9P.png", alt="Confirmar para eliminar de una grabación de rendimiento", width="800", height="549" %}

Chromium issue: [1318087](https://crbug.com/1318087)


<!-- ## Reorder panes in the Elements panel {: #reorder-pane } -->
## Reordene los paneles en el panel de elementos {: #reorder-pane }

<!-- You can now reorder panes in the **Elements** panel based on your preference. -->
Ahora puede reordenar los paneles en el panel de elementos según su preferencia.

<!-- For example, when you open DevTools on a narrow screen, the [Accessibility](/docs/devtools/accessibility/reference/#pane) pane is hidden under the **Show more** button. If you frequently debug accessibility issues, you can now drag the pane to the front for easier access. -->
Por ejemplo, cuando abra DevTools en una pantalla estrecha, el panel de [Accesibilidad](/docs/devtools/accessibility/reference/#pane) está oculto bajo el botón **Mostrar más**. Si usted depura frecuentemente problemas de accesibilidad, puede arrastrar el panel hacia delante para un acceso más fácil.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/hcaQzMTxecNyw4RY0PMX.png", alt="Reordene los paneles en el panel de elementos", width="800", height="616" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend.git/+/10d76932286c4b001eb4c4a13d8bf401f4ee46a7 #}

Chromium issue: [1146146](https://crbug.com/1146146)


<!-- ## Picking a color outside of the browser {: #color } -->
## Eligiendo un color fuera del navegador {: #color }

<!-- DevTools now supports picking a color outside of the browser. Previously, you could only pick a color within the browser. -->
DevTools ahora soporta elegir un color fuera del navegador. Previamente, sólo podía elegir un color dentro del navegador.

<!-- In the **Styles** pane, click on any color preview to open a color picker. Use the eyedropper to pick color from anywhere. -->
En el panel **Estilos**, haga clic en cualquier previsualización de color para abrir un selector de color. Use el selector para elegir color desde cualquier parte.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/JAp1UdPCnWNduuNadLVz.png", alt="Eligiendo un color fuera del navegador", width="800", height="450", class="screenshot" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend.git/+/bbb56c21faaa6c68493a351e3f3e213acb5b76fa #}

Chromium issue: [1245191](https://crbug.com/1245191)


<!-- ## Improved inline value preview during debugging {: #inline-preview } -->
## Mejorada previsualización de valor en línea durante la depuración {: #inline-preview }

<!-- The debugger now shows the inline values preview correctly. -->
El depurador ahora muestra la previsualización de valores en línea correctamente.

<!-- In this example, the `double` function has an input parameter  `a` and a variable `x`. Put a breakpoint at the `return` line and run the code. The inline preview shows values `a` and `x` correctly. Previously, the debugger did not show the value `x` in the inline preview. -->
En este ejemplo, la función `double` tiene como parámetro de entrada `a` y una variable `x`. Ponga un punto de ruptura en la línea de retorno y ejecute el código. La previsualización en línea muestra los valores `a` y `x` correctamente. Previamente, el depurador no mostraba el valor `x` en la previsualización en línea.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/XMHyRsyK24fWLK7o72K7.png", alt="Mejorada previsualización de valor en línea durante la depuración", width="800", height="534" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/8e1a99324bde8d093e32ede5c8d1bf50110fac66 #}

Chromium issue: [1316340](https://crbug.com/1316340)


<!-- ## Support large blobs for virtual authenticators {: #webauthn } -->
## Soporte para grandes bloques para autenticadores virtuales {: #webauthn }

<!-- The [WebAuthn](/docs/devtools/webauthn/) tab now has the new **Supports large blob** checkbox for virtual authenticators. -->
La pestaña [WebAuthn](/docs/devtools/webauthn/) ahora tiene la nueva casilla de verificación **Soporta gran bloque** para autenticadores virtuales.

<!-- This checkbox is disabled by default. You can enable it only for the authenticators with `ctap2` protocol that support resident keys. -->
Esta casilla está desactivada por defecto. La puede activar sólo para los autenticadores con el protocolo `ctap2` que soportan claves residentes.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/m58oDW2ZwCMxX6zoUoJM.png", alt="Soporte para grandes bloques para autenticadores virtuales", width="800", height="601" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/519350816e99a82142712b2e5b6781984a77e39c #}

Chromium issue: [1321803](https://crbug.com/1321803)


<!-- ## New keyboard shortcuts in the Sources panel {: #shortcuts } -->
## Nuevos atajos de teclado en el panel Fuentes {: #shortcuts }

<!-- Two new keyboard shortcuts are now available in the  **Sources** panel: -->
Dos nuevos atajos de teclado están disponibles en el panel **Fuentes**:

<!-- - Toggle **navigation** sidebar (left) with <kbd>Control / Command</kbd> + <kbd>Shift</kbd> + <kbd>Y</kbd>
- Toggle **debugger** sidebar (right) with <kbd>Control / Command</kbd> + <kbd>Shift</kbd> + <kbd>H</kbd> -->
- Alterne la barra lateral **navegación** (izquierda) con <kbd>Control / Comando</kbd> + <kbd>Mayúscula</kbd> + <kbd>Y</kbd>
- Alterne la barra lateral **depurador** (derecha) con <kbd>Control / Comando</kbd> + <kbd>Mayúscula</kbd> + <kbd>H</kbd>

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/1PacYBEm9DoSeW7iai8M.png", alt="Nuevos atajos de teclado en el panel Fuentes", width="800", height="494" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/029ac9db0b7e7d08945bcf7a16b407bde50183a1 #}

Chromium issues: [1226363](https://crbug.com/1226363)


<!-- ## Source maps improvements {: #sourcemaps } -->
## Mejoras en los source maps {: #sourcemaps }

<!-- Previously, developers experience random failure during: -->
Previamente, la experiencia de los desarrolladores se veía afectada de forma aleatoria por:

<!-- - Debugging with [Codepen](https://codepen.io/) example
- Identifying source location of performance issues in a [Codepen](https://codepen.io/) example
- Missing **Component** tab when [React DevTools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi) is enabled -->
- Depurar con un ejemplo [Codepen](https://codepen.io/)
- Identificar la ubicación de origen de un problema de rendimiento en un ejemplo [Codepen](https://codepen.io/)
- Falta de la pestaña **Componente** cuando [React DevTools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi) está habilitado

<!-- Here are a few fixes on source maps to improve the overall debugging experience: -->
Aquí hay algunos arreglos en los source maps para mejorar la experiencia general de depuración:

<!-- - Correct mapping between location and offset for inline scripts and source location
- Use fallback information for frame’s text location
- Properly resolve relative urls with frame's URL   -->
- Mapeado correcto entre la ubicación y el desplazamiento de la ubicación de origen para los scripts en línea
- Uso de información de respaldo para la ubicación de texto del marco
- Resuelve urls relativas con la URL del marco correctamente

{# https://chromium.googlesource.com/v8/v8/+/d821a6a373ecf086a2ef0d233ace7f3431e47732 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/9d3d33e0bde8357d58a3c4981dd016e9b9c553f3 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/04a58f2837c1ec9e78bd722bbe81e9cd7ab38727 #}

Chromium issues: [1319828](https://crbug.com/1319828), [1318635](https://crbug.com/1318635), [1305475](https://crbug.com/1305475)

{% Partial 'devtools/reach-out.md' %}
{% Partial 'devtools/whats-new.md' %}
