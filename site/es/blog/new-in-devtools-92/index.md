---
layout: "layouts/blog-post.njk"
title: "Qué hay de nuevo en DevTools (Chrome 92)"
authors:
  - jecelynyeen
date: 2021-07-26
updated: 2021-07-26
description:
  "Editor de CSS Grid, Soporte para la redeclaración de const en la consola, Visor de orden de los elementos y más."
hero: 'image/dPDCek3EhZgLQPGtEG3y0fTn4v82/cNkvli3QcoNTlZiuJfHk.jpg'
alt: ''
tags:
  - new-in-devtools
  - devtools
  - chrome-92
---

*Traducción cedida por [Miguel Ángel](https://twitter.com/midudev).*

{% Partial 'devtools/banner.md' %}

{% YouTube id="2baY3JpCxpo" %}

## Editor de CSS Grid {: #grid-editor }

¡Cuánto tiempo esperando esta función! Ahora puedes **previsualizar el resultado de la declaración de Grid en CSS** y editarla desde un nuevo editor en el inspector de elementos.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/mV9Ac7QAD8vVPoiqmii6.png", alt="Editor de CSS Grid", width="800", height="486" %}

Cuando un elemento HTML de la página tiene un `display: grid` o `display: inline-grid` aplicado a él, verás que aparece un icono al lado de la declaración en el panel de *Styles*.

Haz clic en ese icono para abrir el editor de CSS Grid. Desde ahí puedes previsualizar un cambio en la declaración del Grid (por ejemplo, puedes ver cómo quedaría el `justify-content: space-around`) y aplicar los cambios con solo un clic.

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/dbd631539c7eeac02ea68a37096ce3bc7d9487d9 #}

Chromium issue: [1203241](https://crbug.com/1203241)

## Soporte para la redeclaración de `const` en la consola {: #const-redeclaration }

La pestaña de *Consola*  ahora soporta la redeclaración de variables `const`, sumándose así a las redeclaraciones de [`let` y `class` que ya existían.](/blog/new-in-devtools-80/#redeclarations).

Esto permite a los desarrolladores hacer un copiado y pegado de código en la consola de DevTools para ver cómo funciona o experimentar, hacer pequeños cambios en el código y repetir el proceso sin necesidad de refrescar la página. Anteriormente, DevTools mostraban un error de sintaxis al intentar redeclarar una variable `const` en la consola.

Veamos un ejemplo. La redeclaración de `const` se admite en scripts REPL separados (mira el ejemplo de la variable `a` más abajo). Ten en cuenta que lo siguiente no se soporta por diseño:

- `const` declaradas en scripts de la página no se pueden redeclarar en scripts REPL.
- `const` no se puede redeclarar en el mismo script REPL (mira el ejemplo de la variable `b`).

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/tJCPlokvxw6OWyCAmocM.png", alt="Redeclaraciones de constantes", width="800", height="496" %}

{# https://chromium.googlesource.com/v8/v8/+/0acdf36510e72d5dac5777d893e77716235b7c39 #}

Chromium issue: [1076427](https://crbug.com/1076427)

## Visor de orden de los elementos {: #source-order }

Ahora puedes ver el orden de los elementos de la página en tu pantalla para mejorar la inspección de la accesibilidad.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/2QoBtjGjFxgDAkKaO3y2.png", alt="Visor de orden del código", width="800", height="515" %}

El orden del contenido en un documento HTML es muy importante para el SEO y la accesibildad. Las nuevas funcionalidades de CSS permite a los desarrolladores crear contenido que parezca muy diferente en el orden en pantalla que como está plasmado en el documento HTML. Este es un problema de accesibilidad muy grande ya que un usuario que usa un lector de pantallas puede tener una diferente, y seguramente confusa, experiencia que un usuario que usa un navegador.

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/7f83e4b0190ed2dbc32feef6d8b0315279ad7d07 #}

Chromium issue: [1094406](https://crbug.com/1094406)

## Nuevos accesos directos a los detalles de un iframe {: #frame-details }

Ahora puedes ver los detalles de un `iframe` al hacer clic con el botón secundario en un elemento `iframe` y seleccionar la opción **Show frame details**.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/YdENg6wjsgPNyMODdOHC.png", alt="Show frame details", width="800", height="486" %}

Esto te llevará a una nueva vista con todos los detalles en el panel de `Application`, donde puedes examinar todos los detalles del documento, como seguridad, estado de isolación, política de permisos y poder depurar posibles problemas.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/hEsg9Mc95n7w2tPrv6KH.png", alt="Detalles de la vista Frame", width="800", height="516" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/30ba780ff36307473aee2e2c959287ea8d0b3bd7 #}

Chromium issue: [1192084](https://crbug.com/1192084)

## Mejor soporte para depurar CORS {: #cors }

Los errores de *Cross-origin resource sharing (CORS)* ahora aparecen en la pestaña de *Issues* y, además, se muestran las diferentes razones por las que se producen los errores. Puedes hacer click en cada *Issue* para ver el detalle de las potenciales causas y las soluciones.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/UpiZQCNnlENB8ZluzeFt.png", alt="Problemas de CORS en la pestaña Issues", width="800", height="490" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/2ca000670d62477dfb0a6a83e038b6caecc1e322 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/2ad8fc07dbe879162b4cb65ca800a2c10e6a73fc #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/bec4aa4eb52f9cf75077d165d2ceba12ebf5ab95 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/db2f1f97aa230de89ac5f80ec8e361f90d8efdd1 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/b9d0e036f6998109673be71a2dc76fb246c8de3b #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/1531610a58453da982acaa1d445c0e8952dbf004 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/541a6b4f7d3627296484d1483ef85e1d10a835f1 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/6b3a0affa984c37720361127a21ff7a936a8b820 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/9149c7abd583c45cf0df83bf445c5b0ae7fa65b9 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/80736dbaf8cb5f06215a5843f326a32ac7ca3a99 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/0404498fbfe3e99ba69a4e99f09715baceecd99d #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/eeb37658907bbc78b70f7712bb48f7a77d152663 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/3aa8ba4983bd6cf65673c4c1908992e5ab81d6fc #}

Chromium issue: [1141824](https://crbug.com/1141824)

## Actualizaciones en el panel de Network {: #network }

### Renombrar etiqueta XHR por Fetch/XHR {: #fetch-xhr }

La etiqueta XHR ha sido renombrada a **Fetch/XHR**. Este cambio ahora deja más claro que este filtro incluye tanto las peticiones de red realizadas con [`XMLHttpRequest`](https://xhr.spec.whatwg.org/) como con [`Fetch API`](https://fetch.spec.whatwg.org/).

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/I0QOVTO52JRpl0jJO6Zt.png", alt="Etiqueta Fetch/XHR", width="800", height="516" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/274ace4270fd5c3004c6b594e1b009c545318e0e #}

Chromium issue: [1201398](https://crbug.com/1201398)

### Filtra los recursos de tipo Wasm en el panel de *Network* {: #wasm }

Ahora puedes filtrar los recursos de red de Web Assembly usando el botón *Wasm* en el panel de *Network*.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/vuTMcfCjDWFfVtDN6Dpf.png", alt="Filtro para Wasm", width="800", height="515" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/db3b40161aeb0856d33e0e4545b2b5bd8e79fb86 #}

Chromium issue: [1103638](https://crbug.com/1103638)

### User-Agent Client Hints por dispositivo en la pestaña de condiciones  {: #sec-ua-ch }

Ahora los [User-Agent Client Hints](https://web.dev/user-agent-client-hints) son aplicados por dispositivo en el campo User Agent debajo de la pestaña de **Network Conditions**.

**Los User-Agent Client Hints son una nueva expansión de la Client Hints API.** Esto permite a los desarrolladores a acceder a información sobre el navegador del usuario y su dispositivo preservando la privacidad del usuario y de una forma mucho más ergonómica.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/iMlkTtV9OUdfujSWdHnR.png", alt="User-Agent Client Hints para dispositivos en la pestaña Network", width="800", height="532" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/b2b0c3b6c6e093649c35b6824004284ca4c2bd4a #}

Chromium issue: [1174299](https://crbug.com/1174299)

## Reporta problemas con el modo Quirks en la pestaña de Issues {: #quirks-mode }

DevTools ahora reporta los posibles problemas con el [modo Quirks](https://quirks.spec.whatwg.org/) y el [modo Limited-Quirks](https://dom.spec.whatwg.org/#concept-document-limited-quirks).

El modo Quirks y Limited-Quirks son modos de navegadores antiguos cuando todavía los estándares web no fueron establecidos. Estos modos emulan la era pre-standard para como se comportaba el diseño en el navegador y en ocasiones causan efectos visuales inesperados.

Cuando depuras problemas de diseño, los desarrolladores pueden pensar que son causados por CSS que han producido o errores en el HTML, mientras que el problema en realidad está en el modo de compatibilidad en que la página se encuentra. Ahora DevTools proporciona sugerencias para solucionarlo.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/XqtqSZPa1S1YnmeIt0ee.png", alt="Reporta los problemas del modo Quirks en la pestaña Issues", width="800", height="490" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/79d5f4274f21bb78e2ce572d118c2bd5bf1cfa82 #}

Chromium issue: [622660](https://crbug.com/622660)

## Incluye las intersecciones computadas en el panel de Performance {: #computed-intersections }

DevTools ahora te muestra el coste de las **intersecciones computadas** en la pila de JavaScript. Este cambio te puede ayudar a identificar los eventos de [Intersection Observer](https://web.dev/intersectionobserver-v2/) y depurar cualquier problema potencial de rendimiento.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/Nx3K0Lpst0lICGbtpzsW.png", alt="Interseciones computadas en el panel de Performance", width="800", height="496" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/03f91c46e7920e768eba5192b7f902e916b9cac3 #}

Chromium issue: [1199137](https://crbug.com/1199137)

## Lighthouse 7.5 en el panel de Lighthouse {: #lighthouse }

El panel de Lighthouse ahora está ejecutando Lighthouse 7.5. La advertencia de "falta un `width` y `height` explícito" ha sido eliminado en imágenes que usan la propiedad `aspect-ratio` en CSS. Previamente, Lighthouse mostraba siempre esta advertencia si tu imagen no tenía definidos `width` y `height`.

Puedes ver todos los cambios de Lighthouse en sus [nota de lanzamiento](https://github.com/GoogleChrome/lighthouse/releases/tag/v7.5.0).

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/4cef9324af0e4560421beb138313458d5ae6fb0b #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/d17898e62fe19b9f47b25f1568b57fce951c6d10 #}

Chromium issue: [772558](https://crbug.com/772558)

## "Restart frame" queda obsoleto en el menú contextual de la pila de llamada {: #restart-frame }

La opción **Restart frame** queda obsoleta. Esta característica requiere más desarrollo para que funcione correctamente ya que actualmente está rota y falla frecuentemente.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/Alvnt4FkoEFoP0SkdKgi.png", alt="El menú contextual Restart frame ha quedado obsoleto", width="800", height="486" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/4494098b6840f608347c1edf3c048691056eada4 #}

Chromium issue: [1203606](https://crbug.com/1203606)

## [Experimental] Monitor de protocolo {: #protocol-monitor }

{% Aside %}

Para activar este experimento, activa la casilla **Protocol Monitor** en **Settings > Experiments**.

{% endAside %}

Chrome DevTools usa el [Chrome DevTools Protocol (CDP)](https://chromedevtools.github.io/devtools-protocol/) para instrumentalizar, inspeccionar, depurar y analizar el comportamiento de Chrome. El **monitor de Protocolo** te provee una forma de ver todas las peticiones CDP y las respuestas realizadas por DevTools.

Dos nuevas funcionalidades han sido añadidas para facilitar las pruebas de CDP:

- Un nuevo botón **Save** que te permite guardar las respuestas CDP en un archivo JSON.
- Un nuevo campo que te permite enviar un comando CDP directamente.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/mRVrHC9WEet7cwA7QAeV.png", alt="Protocol monitor", width="800", height="496" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/40fcb9a9aae81ac1df2c19dee467ab3a4cf4088b #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/006e20c4226a7b2e5fde4026191b1eaf05bf8b8e #}

Chromium issues: [1204004](https://crbug.com/1204004), [1204466](https://crbug.com/1204466)

## [Experimental] Grabadora de Puppeteer {: #puppeteer-recorder }

{% Aside %}

Para activar este experimento, activa la casilla **Recorder** en **Settings > Experiments**.

{% endAside %}

[La grabadora de Puppeteer](/blog/new-in-devtools-89/#record) ahora genera una lista de pasos basada en tu interacción con el navegador, donde antes DevTools generaba directamente un script de Puppeteer. Un nuevo botón **Export** ha sido añadido que te permite exportar los pasos como un script de Puppeteer.

Después de grabar los pasos, puedes usar el botón **Replay** para reproducir los pasos. [Sigue las instrucciones](/blog/new-in-devtools-89/#record) para aprender cómo empezar a utilizar este nuevo modo de grabación.

Ten en cuenta que este experimento está en sus primeras etapas de desarrollo. Hay planes para mejorar y expandir esta funcionalidad de grabación con el tiempo.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/kh1Z4jcWxbO6rYCSoIPn.png", alt="Grabadora de Puppeteer", width="800", height="557" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/b36b600405ef18131b89edf85cca816c955c1590 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/a2ffe4a8d202e56d640c2f8744c905354e2bca8e #}

Chromium issue: [1199787](https://crbug.com/1199787)

{% Partial 'devtools/reach-out.md' %}
{% Partial 'devtools/whats-new.md' %}