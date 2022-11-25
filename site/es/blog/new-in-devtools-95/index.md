---
layout: "layouts/blog-post.njk"
title: "Qué hay de nuevo en DevTools (Chrome 95)"
authors:
  - jecelynyeen
date: 2021-09-20
updated: 2021-09-20
description:
  "Nuevas herramientas para cambiar medidas en CSS, oculta problemas en la pestaña Problemas, mejora la visualización de propiedades y mucho más."
hero: 'image/dPDCek3EhZgLQPGtEG3y0fTn4v82/B7R4ll1Ts0HdQ4lTS1Fy.jpg'
alt: ''
tags:
  - new-in-devtools
  - devtools
  - chrome-95
---

<!-- start: translation instructions -->
<!-- Remove the "draft: true" tag above when submitting PR -->
<!-- Provide translations under each of the English commented original content -->
<!-- Remember to translate the "description" tag above -->
<!-- Remember to translate all the <img> alt text -->
<!-- end: translation instructions -->

*Gracias [Miguel Ángel](https://midu.dev) por la traducción y [Carlos Caballero](https://carloscaballero.io) por la revisión.*

{% Partial 'devtools/banner.md' %}

{% YouTube id="T_Ppg7ghrWM" %}

<!-- ## New CSS length authoring tools {: #length } -->
## Nuevas herramientas para cambiar medidas en CSS {: #length }

<!-- DevTools added an easier yet flexible way to update lengths in CSS! -->
¡DevTools ha añadido una forma fácil pero flexible de cambiar medidas en CSS!

<!-- In the **Styles** pane, look for any CSS property with length (e.g. `height`, `padding`). -->
En la pestaña **Estilos**, busca cualquier propiedad CSS con medida (por ejemplo, `height`, `padding`).

<!-- Hover over the unit type, and notice the unit type is underlined. Click on it to select a unit type from the dropdown. -->
Pasa el ratón por encima de la unidad y nota que la unidad está subrayada. Haz clic en ella para seleccionar una unidad desde el desplegable.

{% Video src="video/dPDCek3EhZgLQPGtEG3y0fTn4v82/vWiU9o1DxsOpWXM0SrBa.mp4", autoplay="true", muted="true", loop="true", class="screenshot" %}

<!-- Hover over the unit value, and your mouse pointer is changed to horizontal cursor. Drag horizontally to increase or decrease the value. To adjust the value by 10, hold the <kbd>Shift</kbd> key when dragging. -->
Si sitúas el ratón sobre el valor de la unidad, el puntero cambiará a un cursor horizontal. Arrastra horizontalmente para aumentar o disminuir el valor. Para ajustar el valor en 10, mantén pulsada la tecla <kbd>Mayúsculas</kbd> al arrastrar.

{% Video src="video/dPDCek3EhZgLQPGtEG3y0fTn4v82/nbvRDPyARJmdTeB9ajOq.mp4", autoplay="true", muted="true", loop="true",class="screenshot" %}

<!-- You can still edit the unit value as text — just click on the value and start editing. -->
Todavía puedes editar el valor de la unidad como texto — sólo haz clic en el valor y empieza a editar.

{% Video src="video/dPDCek3EhZgLQPGtEG3y0fTn4v82/hBk2t2DCX7aI5yBX4J8h.mp4", autoplay="true", muted="true", loop="true", class="screenshot" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/20932ec7ffa980023548e6f9d010ba11d0a3eab7 #}

Chromium issues: [1126178](https://crbug.com/1126178), [1172993](https://crbug.com/1172993)


<!-- ## Hide issues in the Issues tab {: #hide-issues } -->
## Oculta problemas en la pestaña Problemas {: #hide-issues }

<!-- You can now hide specific issues in the Issues tab to focus only on those issues that matter to you. -->
Ahora puedes ocultar problemas específicos en la pestaña *Problemas* para concentrarte sólo en aquellos problemas que te interesan.

<!-- In the [Issues tab](/docs/devtools/issues/), hover over on an issue you would like to hide. Click on **More options**  &nbsp; {% Img src="image/admin/4sdCQbpBaG4MpoHB1J08.png", alt="More", width="4", height="20" %} &nbsp; > **Hide issues like this**. -->
En la pestaña Problemas, desliza el puntero del ratón sobre un problema que quieres ocultar. Haz clic en **Más opciones**  &nbsp; {% Img src="image/admin/4sdCQbpBaG4MpoHB1J08.png", alt="Más", width="4", height="20" %} &nbsp; > **Oculta problemas como este**.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/Uw3mxGGK5CNoUflHgS7p.png", alt="Menú de ocultar problemas", width="800", height="488" %}

<!-- All hidden issues will be added under the **Hidden issues** pane. Expand the pane. You can unhide all hidden issues or a selected one.  -->
Todos los problemas ocultos se añadirán a la pestaña *Problemas ocultos*. Expande la pestaña. Puedes mostrar todos los problemas ocultos o uno seleccionado.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/dnPfPGkxpkcSZRIHqGDA.png", alt="Pestaña de Problemas Ocultos", width="800", height="488" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/f7a70504f3ad5a63b5f5b83411ff5f6cc31a765 #}

Chromium issue: [1175722](https://crbug.com/1175722)


<!-- ## Improved the display of properties {: #properties } -->
## Mejora la visualización de propiedades {: #properties }

<!-- DevTools improve the display of properties by: -->
DevTools mejora la visualización de propiedades:

<!-- - Always bold and sort own properties first in the **Console**, **Sources** panel and **Properties** pane. -->
- Siempre en negrita y ordena las propiedades propias primero en el panel **Consola**, **Fuentes** y **Propiedades**.

<!-- - Flatten the properties display in the **Properties** pane. -->
- Aplana la visualización de propiedades en la pestaña **Propiedades**.

<!-- For example, the snippet below creates an [`URL`](https://developer.mozilla.org/docs/Web/API/URL) object `link` with 2 own properties: `user` and `access`, and updates the value of an inherited property `search`. -->

Por ejemplo, el fragmento de código siguiente crea un objeto [`URL`](https://developer.mozilla.org/docs/Web/API/URL) `link` con 2 propiedades propias: `user` y `access`, y actualiza el valor de una propiedad heredada `search`.

```js
/* example.js */

const link = new URL('https://goo.gle/devtools-blog');

link.user = { id: 1, name: 'Jane Doe' };
link.access = 'admin';
link.search = `?access=${link.access}`;
```

<!-- Try logging `link` in the **Console**. Own properties are now bold and sorted first. These changes make it easier to spot custom properties, especially for [Web APIs](https://developer.mozilla.org/docs/Web/API) (e.g. `URL`) with many inherited properties. -->

Intenta registrar `link` en la **Consola**. Las propiedades propias están en negrita y ordenadas primero. Estos cambios hacen más fácil identificar propiedades personalizadas, especialmente para [API Web](https://developer.mozilla.org/docs/Web/API) (e.g. `URL`) con muchas propiedades heredadas.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/Ngjx6YRQsH3Fhl6DUZYl.png", alt="Las propiedades propias están en negritas y ordenadas primero.", width="800", height="561" %}

<!-- Apart from these changes, the properties in the  **Properties** pane are also flattened now for better DOM properties debugging experience, especially for [Web components](https://www.webcomponents.org/introduction).  -->

Además de estos cambios, las propiedades de la pestaña **Propiedades** también se aplanan para una mejor experiencia de depuración de propiedades del DOM, especialmente para [componentes Web](https://www.webcomponents.org/introduction).

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/hIQGKlYkWKJzljHZaaM9.png", alt="Propiedades aplanadas", width="800", height="449" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/7d0366422cffa5f2837de834f0faa88a925fe701 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/a4d7dd0d62baba5718a713b5cd364669a21236b3 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/54ea0986cb59f71242ed62d3dd6405cc65f623a4 #}

Chromium issues: [1076820](https://crbug.com/1076820), [1119900](https://crbug.com/1119900)


<!-- ## Lighthouse 8.4 in the Lighthouse panel {: #lighthouse } -->
## Lighthouse 8.4 en el panel Lighthouse {: #lighthouse }

<!-- The **Lighthouse** panel is now running Lighthouse 8.4. Lighthouse will now detect if the [Largest Containful Paint (LCP)](https://web.dev/lcp) element was a lazy-loaded image and recommend removing the `loading` attribute from it. -->

El panel **Lighthouse** está usando Lighthouse 8.4. Lighthouse detectará ahora si el elemento [Largest Containful Paint (LCP)](https://web.dev/lcp) era una imagen con carga diferida y recomendará eliminar el atributo `loading` de ella.

<!-- Check out the [What’s new in Lighthouse 8.4](/blog/lighthouse-8-4/) for more details on the updates. -->
Revisa las [Novedades de Lighthouse 8.4](/blog/lighthouse-8-4/) para más detalles sobre los cambios.

{% Img src="image/MtjnObpuceYe3ijODN3a79WrxLU2/u9nepJj3wgpMgoNxSaDZ.png", alt="La auditoría del LCP con carga diferida en el reporte de Lighthouse", width="800", height="502", class="screenshot" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/649a979e4de2cf38430e46e7198b11ba8a830388 #}

Chromium issue: [772558](https://crbug.com/772558)

<!-- ## Sort snippets in the Sources panel {: #snippets } -->
## Ordena los fragmentos en el panel Fuentes {: #snippets }

Los [fragmentos de código](/docs/devtools/javascript/snippets/) en la pestaña **Fragmentos** bajo el panel **Fuentes** están ordenados ahora alfabéticamente. Antes no lo estaba.

Utiliza la característica de fragmentos para ejecutar comandos más rápido. ¡Mira este vídeo para ver un [ejemplo](https://youtu.be/NOal2gTzftI?t=176)!

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/54ea0986cb59f71242ed62d3dd6405cc65f623a4 #}

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/knb78RG6NCETitMbNoyV.png", alt="Ordena los fragmentos de código en el panel Fragmentos", width="800", height="475" %}

Chromium issue: [1243976](https://crbug.com/1243976)

<!-- ## New links to translated release notes and report a translation bug {: #localized } -->
## Nuevos enlaces a las notas de la versión traducida y reporta un error de traducción {: #localized }

<!-- You can now click to read the DevTools release notes in 6 other languages - [Russian](/ru/blog/new-in-devtools-95), [Chinese](/zh/blog/new-in-devtools-95), [Spanish](/es/blog/new-in-devtools-95), [Japanese](/ja/blog/new-in-devtools-95), [Portuguese](/pt/blog/new-in-devtools-95) and [Korean](/ko/blog/new-in-devtools-95)  via the What’s new tab.  -->

Ahora puedes hacer clic para leer las notas de la versión de DevTools en 6 otros idiomas - [Ruso](/ru/blog/new-in-devtools-95), [Chino](/zh/blog/new-in-devtools-95), [Español](/es/blog/new-in-devtools-95), [Japonés](/ja/blog/new-in-devtools-95), [Portugués](/pt/blog/new-in-devtools-95) y [Coreano](/ko/blog/new-in-devtools-95) a través de la pestaña *¿Qué hay de nuevo?*.

<!-- Since Chrome 94, you can [set your preferred language](/blog/new-in-devtools-94/#localized) in DevTools. If you found any issues with the translations, help us improve it by [reporting a translation issue](https://goo.gle/devtools-translate) via **More options** > **Help** > **Report a translation bug**.  -->

Desde Chrome 94, puedes [establecer tu idioma preferido](/blog/new-in-devtools-94/#localized) en DevTools. Si encuentras algún problema con las traducciones, ayúdanos a mejorarlas [reportando un problema de traducción](https://goo.gle/devtools-translate) a través de **Más opciones** > **Ayuda** > **Reportar un problema de traducción**.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/Qrg4Ahf4sYseL2NQZwIl.png", alt="Nuevos enlaces a las notas de la versión traducida y la posibilidad de reportar un error de traducción", width="800", height="487" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/312e43a6c50bc29f279f9eac2f91b723b36c7ee9 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/dcd3ae13ebc5d340b2abb07e9dc99cfa74caea35 #}

Chromium issues: [1246245](https://crbug.com/1246245), [1245481](https://crbug.com/1245481)

<!-- ## Improved UI for DevTools command menu {: #command-menu } -->
## Mejorado el menú de comandos de DevTools {: #command-menu }

<!-- Did you find it hard to search for a file in the [Command Menu](/docs/devtools/command-menu/#open)? Good news for you, the **Command Menu** user interface is now enhanced!  -->
Has encontrado que es difícil buscar un archivo en el [Menú de comandos](/docs/devtools/command-menu/#open)? ¡Buenas noticias para ti, la interfaz de usuario del **Menú de comandos** se ha mejorado!

<!-- Open the **Command Menu** to search for a file with keyboard shortcut <kbd>Control</kbd>+<kbd>P</kbd> in Windows and Linux, or <kbd>Command</kbd>+<kbd>P</kbd> in MacOS. -->
Abre el **Menú de comandos** para buscar un archivo con atajo de teclado <kbd>Control</kbd>+<kbd>P</kbd> en Windows y Linux, o <kbd>Comando</kbd>+<kbd>P</kbd> en macOS.

<!-- The UI improvements of the **Command Menu** is still ongoing, stay tuned for more updates! -->
Las mejoras de la interfaz de usuario del **Menú de comandos** aún están en progreso. ¡Mantente al tanto de más actualizaciones!

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/TJT2ry3vmUW1KoFgSKQP.png", alt="Menú de comandos", width="800", height="389" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/06f6263ffb5b0a262c9954db532801fef4dbb1e5 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/93550d16d92a4835c61dc7906f16694f390e9658 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/0ad76a1ccf83a28ed0ded0a55544eef976f7c35b #}

Chromium issue: [1201997](https://crbug.com/1201997)

{% Partial 'devtools/reach-out.md' %}
{% Partial 'devtools/whats-new.md' %}
