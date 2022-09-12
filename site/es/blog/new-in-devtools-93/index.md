---
layout: "layouts/blog-post.njk"
title: "Qué hay de nuevo en DevTools (Chrome 93)"
authors:
  - jecelynyeen
date: 2021-07-28
updated: 2021-07-28
description:
  "Consultas de contenedores CSS editables, previsualización de paquetes web, mejor manejo de cadenas de texto en la Consola y más."
hero: 'image/dPDCek3EhZgLQPGtEG3y0fTn4v82/mQKfpWjFiRKd6kgzQzJA.jpg'
alt: ''
tags:
  - new-in-devtools
  - devtools
  - chrome-93
---

*Gracias [Miguel Ángel](https://midu.dev) por la traducción y [Carlos Caballero](https://carloscaballero.io) por la revisión.*

{% Partial 'devtools/banner.md' %}

{% YouTube id="1VaPAnUGRz8" %}

## Consultas de contenedores CSS editables en el panel de Estilos {: #container-queries }

Ahora puedes ver y editar las [consultas de contenedores CSS](https://web.dev/new-responsive/#responsive-to-the-container) en el panel de **Estilos**.


Las consultas de contenedor (*container queries*) ofrecen una manera mucho más dinámica de realizar diseños adaptables. La regla `@container` funciona de una forma similar a las consultas de medios (*media queries*). Sin embargo, en lugar de consultar el tamaño de la ventana y la información del agente del usuario, `@container` consulta el contenedor ascendiente que cumple cierto criterio.

En el panel de **Elementos**, haz clic en el elemento del DOM que tenga la regla `@container`, DevTools ahora muestra la información de `@container` en el panel de **Estilos**. Clica en él para editar su tamaño. El panel **Estilos** también muestra la información correspondiente al contenedor. Coloca el puntero del mouse encima para resaltar el elemento contenedor en la página y revisa el tamaño del contenedor. Haz clic en él para seleccionar el elemento contenedor.

Actualmente la característica de consultas de contenedor es experimental. Por favor, activa la opción `#enable-container-queries` en `chrome://flags` para probarlo.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/3NzGBpukHQfUZUKUpUgf.png", alt="Consultas a contenedores CSS en el panel de Estilos", width="800", height="554" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/46cdd9cd019f088e1134abe84dbc7d53ac60585a #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/a7e1eac63bee3728b41ae440f2ec250559e9c667 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/ef157dab2ccf321941548a51d350f9383a78d283 #}

Chromium issue: [1146422](https://crbug.com/1146422)


## Previsualización de paquetes Web en el panel de Red {: #web-bundle }

[Un paquete Web](https://web.dev/web-bundles/) es un formato de encapsulación de uno o más recursos HTTP en un sólo fichero. Ahora puedes previsualizar el contenido de tu paquete web en el panel de **Red**.

Actualmente la característica de paquete web es experimental. Por favor, activa la opción `#enable-experimental-web-platform-features` en `chrome://flags` para probarlo.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/PEv1mNA14K18t5P3N6Yj.png", alt="Previsualización paquete web", width="800", height="492" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/e7672c40f2febc80786632c188b6029b2f2ac7b7 #}

Chromium issue: [1182537](https://crbug.com/1182537)


## Depuración de la API de Informes de Atribución {: #attribution-reporting }

Los errores de la API de Informes de Atribución ahora son notificados en la pestaña **Problemas**.

[Informes de Atribución](/docs/privacy-sandbox/attribution-reporting/) es una nueva API que te ayuda a medir cuando una acción de usuario (como un clic a un anuncio o una visualización) conduce a una conversión, sin necesidad de usar identificadores de sitios cruzados.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/bkEGVEv5kKc9M6qBUmLz.png", alt="Errores de la API de Informes de Atribución en el panel Problemas", width="800", height="501" %}

Chromium issue: [1190735](https://crbug.com/1190735)


## Mejor manejo de cadenas de texto en la Consola {: #string }

Nuevo menú contextual en la **Consola** que te permite copiar cualquier cadena de texto como contenido, un literal de JavaScript o un literal JSON.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/O5uMSgkHrQ2mQDSjmg3A.png", alt="Nuevo menú contextual en la Consola", width="800", height="477" %}

En Chrome 90, DevTools actualizó la **Consola** para que siempre [formatease la salida de las cadenas de texto como literales JSON válidos](/blog/new-in-devtools-90/#double-quotes). Hemos recibido retroalimentación de equipos de desarrollo que este cambio puede ser confuso ya que sienten que la cantidad de secuencias de escape es excesiva y hace la salida illegible.

La **Consola** ahora formatea la salida de la cadena de texto como un literal JavaScript válido y, además, te proporciona 3 opciones para copiar las cadenas. La opción **Copiar como literal JavaScript** va a añadir las secuencias de escape a los carácteres especiales y envolverá las cadenas de texto en comillas simples, dobles o comillas invertidas dependiendo del contenido de la cadena. En su lugar, la opción **Copiar cadena como contenido** copia el contenido de la cadena tal cuál se encuentra (incluyendo nuevas líneas y otros carácteres especiales) al portapapeles. Finalmente, **Copiar como literal JSON** formatea la cadena como un JSON literal válido y lo copia al portapapeles.

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/9242d13569e9fe67ac01e75d28fa2b6e6bf310d2 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/5715a7b9800532d8b28e2c9fa2d3c1e220ba54a8 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/29236e333a856ae5a952fe4182545b1e2bde5539 #}

Chromium issue: [1208389](https://crbug.com/1208389)


## Mejoras en la depuración de CORS {: #cors }

Los errores relacionados CORS de TypeErrors en la **Consola** ahora están enlazados al panel **Red** y la pestaña **Problemas**.

Haz clic en los dos nuevos iconos al lado de los mensajes de error relacionados con CORS para ver la petición en la red o entender el mensaje de error con más detalle y recibir soluciones potenciales en la pestaña **Problemas**.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/VzoUggSoM0FnkDlIFPhq.png", alt="Iconos al lado de los mensajes de error relacionados con CORS", width="800", height="485" %}

Chromium issue: [1213393](https://crbug.com/1213393)


## Lighthouse 8.1 {: #lighthouse }

El panel de **Lighthouse** ahora usa Lighthouse 8.1.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/wENi9RXYMxdhm3zI4NVu.png", alt="Lighthouse", width="800", height="628" %}

Si tu sitio expone mapas de código fuente (*source maps*) a Lighthouse, revisa el botón **Ver mapa de árbol** para ver un desglose del JavaScript que has enviado, filtrable por tamaño y cobertura al ser cargado.

El reporte también incluye una nueva métrica para filtrar (Revisa la captura de pantalla sobre el filtro **Mostrar auditorías relevantas a**). Selecciona una métrica para enfocarte en las oportunidades y diagnósticos más relevantes para mejorar esa métrica.

La **Categoría de Rendimiento** tiene algunos cambios de puntuación para alinearse con otras herramientas de rendimiento y reflejar mejor el estado de la web.

Revisa las [notas de lanzamiento](https://github.com/GoogleChrome/lighthouse/releases) para una lista entera de cambios.

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/62b16561e433f4aa1645826923222699ac4bad38 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/16d96a25f24c934ef4dcbbc7b827015abdd228a1 #}

Chromium issue: [772558](https://crbug.com/772558)


## Muestra una nueva nota URL en el panel de Manifiesto {: #new-note-url }

El panel **Manifiesto** ahora muestra una [nueva nota URL](https://wicg.github.io/manifest-incubations/index.html#dfn-note_taking).

Actualmente en ChromeOS (CrOS), Aplicaciones Chrome y Aplicaciones Android que declaran la capacidad "nueva-nota" pueden ser seleccionados como una aplicación para tomar notas en la configuración de *Stylus* (se muestra si el dispositivo CrOS ha sido usado con un *stylus*). Cuando se selecciona la aplicación de tomar notas, la aplicación puede ser lanzada desde el botón "Crear Nota" de la paleta del *stylus*. Añadir un campo `new-note-url` en el manifiesto de la aplicación es parte de los esfuerzos por añadir una funcionalidad equivalente en las aplicaciones web.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/2Cwggroar7pNesfAQi4K.png", alt="Nueva nota URL en el panel de Manifiesto", width="800", height="477" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/51f8aaf568db256f3390c37393d294c82017565e #}

Chromium issue: [1185678](https://crbug.com/1185678)


## Se arreglaron los selectores CSS coincidentes {: #matching-selectors }

DevTools ha arreglado los selectores CSS coincidentes, que no funcionaban en el último lanzamiento.

Los selectores separados por coma en el panel de **Estilos** tienen colores diferentes dependiendo si coinciden con el nodo de DOM seleccionado:

- Una porción que no coincide se muestra con un gris claro.
- Un selector que coincide se muestra en negro.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/O7CoHBrKA9cVKci1SM0M.png", alt="Selectores CSS coincidentes", width="800", height="477" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/123eac3c8ceeb2e788aa4756d3104db0265f9ad3 #}

Chromium issue: [1219153](https://crbug.com/1219153)


## Mostrando las respuestas JSON con formato legible {: #pretty-print-json }

Ahora puedes ver las respuestas JSON en el panel de **Red** en un formato legible.

Abre la respuesta JSON en el panel de **Red**, haz clic en el botón `{}` para formatear el código.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/x2NKXwJPzjycjeD7cLH6.png", alt="Muestra el código JSON con un formato legible", width="800", height="523" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/250c88b4d02da283cd0a96204b1592f59fda2fcb #}

Chromium bug: [998674](https://crbug.com/998674)

{% Partial 'devtools/reach-out.md' %}
{% Partial 'devtools/whats-new.md' %}
