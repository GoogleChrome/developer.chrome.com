---
layout: 'layouts/blog-post.njk'
title: 'Qué hay de nuevo en DevTools (Chrome 100)'
authors:
  - jecelynyeen
date: 2022-03-08
updated: 2022-03-08
description: 'Vea y edite @supports en las reglas, cambie el nombre y personalice el selector de grabación, y más.'
hero: 'image/dPDCek3EhZgLQPGtEG3y0fTn4v82/lXsPoyGD9RpuMf4jckFi.jpg'
alt: ''
tags:
  - new-in-devtools
  - devtools
  - chrome-100
---

_Gracias [Carlos Caballero](https://carloscaballero.io) por la traducción y [Miguel Ángel](https://midu.dev) por la revisión._

{% Partial 'devtools/banner.md' %}

{% YouTube id='DAD72grzDDc' %}

<!-- start: translation instructions -->
<!-- 1. Remove the "draft: true" tag above when submitting PR -->
<!-- 2. Provide translations under each of the English commented original content -->
<!-- 3. Translate the "description" tag above -->
<!-- 4. Translate all the <img> alt text -->
<!-- 5. Update the whats-new.md file -->
<!-- end: translation instructions -->

<!-- ## Chrome 100  {: #m100 } -->
## Chrome 100  {: #m100 }

<!-- Here's to the 100th Chrome version! Chrome DevTools will continue to provide reliable tools for developers to build on the web. Take a moment to click around in the **What's New** tab to celebrate the milestones. -->

¡Aquí está la versión número 100 de Chrome! Chrome DevTools continuará proporcionando herramientas confiables para que los desarrolladores construyan en la web. Tómese un momento para hacer clic en la pestaña **Novedades** para celebrar los hitos.

<!-- As usual, you can watch the latest [What's New in DevTools video](https://goo.gle/devtools-youtube) by clicking on the image. -->

Como de costumbre, puede ver el último [video de Novedades en DevTools](https://goo.gle/devtools-youtube) haciendo clic en la imagen.

{% Video src="video/dPDCek3EhZgLQPGtEG3y0fTn4v82/u8sn7ubuxjJoyPgbfNJs.mp4", class="screenshot", autoplay=true, controls=true, loop=true, muted=true %}


<!-- ## View and edit @supports at rules in the Styles pane {: #supports } -->

## Ver y editar reglas @supports en el panel Estilos {: #supports }


<!-- You can now view and edit the CSS `@supports` at-rules in the **Styles** pane. These changes make it easier to experiment with the at-rules in real time. -->

Ahora puede ver y editar las reglas-`at` `@supports` en el panel **Estilos**. Estos cambios facilitan la experimentación con las reglas-`at` en tiempo real.

<!-- Open this [demo page](https://jec.fish/demo/at-support), [inspect](/docs/devtools/dom/#inspect) the `<div class="box">` element, view the `@supports` at-rules in the **Styles** pane. Click on the rule's declaration to edit it.  -->

Abra esta [página de demostración](https://jec.fish/demo/at-support), [inspeccione](/docs/devtools/dom/#inspect) el elemento `<div class="box">`, vea las reglas-`at` `@support` en el panel **Estilos**. Haga clic en la declaración de la regla para editarla.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/vnokX5Hswmbvlb5weusO.png", alt="Ver y editar @supports en las reglas", width="800", height="502" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/5c17e46caa5be1d8c769146baecc91e0d740f7fd #}

Chromium issues: [1222574](https://crbug.com/1222574), [1222573](https://crbug.com/1222573)


<!-- ## Recorder panel improvements {: #recorder } -->
## Mejoras en el panel de la grabadora {: #recorder }

<!-- ### Support common selectors by default {: #selector } -->

### Admite selectores comunes de forma predeterminada {: #selector }

<!-- When determining an unique selector during recording, the [Recorder](/docs/devtools/recorder/) panel now automatically prefers elements with the following attributes: -->

Al determinar un selector único durante la grabación, ahora el panel [Grabadora](/docs/devtools/recorder/) prefiere automáticamente los elementos con los siguientes atributos:

- data-testid
- data-test
- data-qa
- data-cy
- data-test-id
- data-qa-id
- data-testing

<!-- The attributes above are common selectors used in test automation.  -->

Los atributos anteriores son selectores comunes utilizados en la automatización de pruebas.

<!-- For example, [start a new recording](/docs/devtools/recorder/#record) with this [demo page](https://jec.fish/demo/recorder). Fill in an email address and observe the selector value. -->

Por ejemplo, [inicie una nueva grabación](/docs/devtools/recorder/#record) con esta [página de demostración](https://jec.fish/demo/recorder). Complete una dirección de correo electrónico y observe el valor del selector.


<!-- Since the email element has `data-testid` defined, it's used as the selector automatically instead of the `id` or `class` attributes. -->

Dado que el elemento de correo electrónico tiene definido `data-testid`, se usa como selector automáticamente en lugar de los atributos `id` o `class`.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/4diI81kpscXznWLrB6a9.png", alt="Soporta selectores comunes de forma predeterminada", width="800", height="585" %}


<!-- ### Customize the recording's selector {: #customize-selector } -->

### Personaliza el selector de grabaciones {: #customize-selector }


<!-- You can customize the selector of a recording if you are not using the [common selectors](/docs/devtools/recorder/#selector). -->

Puede personalizar el selector de una grabación si no utiliza los [selectores comunes](/docs/devtools/recorder/#selector).


<!-- For example, this [demo page](https://jec.fish/demo/recorder) uses the `data-automate` attribute as the selector. [Start a new recording](/docs/devtools/recorder/#record) and enter the `data-automate` as the selector attribute. Fill in an email address and observe the selector value (`[data-automate=email-address]`). -->

Por ejemplo, esta [página de demostración](https://jec.fish/demo/recorder) usa el atributo `data-automate` como selector. [Inicie una nueva grabación](/docs/devtools/recorder/#record) e ingrese `data-automate` como el atributo del selector. Complete una dirección de correo electrónico y observe el valor del selector (`[data-automate=email-address]`).

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/2PPPt9tOC2ZEz1l9F9AK.png", alt="Personaliza el selector de grabaciones", width="800", height="524" %}

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/X8r52vWEu6aC8QHFuknp.png", alt="El resultado de la selección del selector personalizado", width="800", height="579" %}


<!-- ### Rename a recording {: #recorder-rename } -->

### Cambiar el nombre de una grabación {: #recorder-rename }


<!-- You can now rename a recording in the [Recorder](/docs/devtools/recorder/) panel with the edit button (pencil icon) next to the recording's title. -->

Ahora puede cambiar el nombre de una grabación en el panel [Grabadora](/docs/devtools/recorder/) con el botón de edición (icono de lápiz) junto al título de la grabación.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/Pn9Xsrq9lnStmtjpe0jt.png", alt="Cambiar el nombre de una grabación", width="800", height="502" %}


<!-- ## Preview class/function properties on hover {: #properties } -->

## Vista previa de propiedades de clase/función al pasar el mouse {: #properties }

<!-- You can now hover over a class or function in the **Sources** panel during debugging to preview its properties. Previously, it only showed the function name and a link to its location in the source code. -->

Ahora puede pasar el cursor sobre una clase o función en el panel **Fuentes** durante la depuración para obtener una vista previa de sus propiedades. Anteriormente, solo mostraba el nombre de la función y un enlace a su ubicación en el código fuente.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/BZzL6QMheyd31VGqhA8W.png", alt="Vista previa de propiedades de clase/función al pasar el mouse", width="800", height="502" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/0a585b3883ad39f2f83fa5ab9c7731270d3a2974 ​#}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/96fb7872ce01eb3fde267e39987a82ce3d3f3e21 #}

Chromium issue: [1049947](https://crbug.com/1049947)


<!-- ## Partially presented frames in the Performance panel {: #perf } -->

## Fotogramas presentados parcialmente en el panel Rendimiento {: #perf }


<!-- Performance recording now displays a new frame category "Partially presented frames" in the **Frames** timeline.  -->

La grabación de rendimiento ahora muestra una nueva categoría de fotogramas "Fotogramas presentados parcialmente" en la línea de tiempo de **Fotogramas**.

<!-- Previously, the **Frames** timeline visualizes any frames with delayed main-thread work as "dropped frames". However, there are cases where some frames may still produce visual updates (e.g. scrolling) driven by the compositor thread. -->

Anteriormente, la línea de tiempo de **Fotogramas** visualizaba cualquier fotograma con trabajo retrasado en el subproceso principal como "fotogramas perdidos". Sin embargo, hay casos en los que algunos cuadros aún pueden producir actualizaciones visuales (por ejemplo, desplazamiento) impulsadas por el hilo del compositor.

<!-- This leads to user confusion because the screenshots of these "Dropped frames" are still reflecting visual updates.  -->

Esto genera confusión en el usuario porque las capturas de pantalla de estos "fotogramas eliminados" aún reflejan actualizaciones visuales.

<!-- The new "Partially presented frames" aims to indicate more intuitively that although some content is not presented timely in the frame, but the issue is not so severe as to block visual updates altogether. -->

Los nuevos "Fotogramas presentados parcialmente" tienen como objetivo indicar de manera más intuitiva que, aunque parte del contenido no se presenta a tiempo en el fotograma, el problema no es tan grave como para bloquear las actualizaciones visuales por completo.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/QcqjnFhMz1Bxd5dkmduj.png", alt="Fotogramas presentados parcialmente en el panel Rendimiento", width="800", height="531" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/a06c2e7c1abeb92be9cfc6b3bf9d6edf6d742e01 #}

Chromium issue: [1261130](https://crbug.com/1261130)

<!-- ## Miscellaneous highlights {: #misc } -->

## Destacados varios {: #misc }

<!-- These are some noteworthy fixes in this release: -->

Estas son algunas correcciones notables en esta versión:

<!-- - Updated iPhone user agent strings for [emulated devices](/docs/devtools/device-mode/#device). All iPhone versions after 5 have a user-agent string with iPhone OS 13_2_3. ([1289553](https://crbug.com/1289553)) -->

 - Actualizadas las cadenas de caracteres de `user agent` en iPhone para [dispositivos emulados](/docs/devtools/device-mode/#device). Todas las versiones de iPhone posteriores a la 5 tienen una cadena de `user agent` con iPhone OS 13_2_3. ([1289553](https://crbug.com/1289553))

<!-- - You can now save [snippet](/docs/devtools/javascript/snippets/) as a JavaScript file directly. Previously, you needed to append `.js` file extension manually. ([1137218](https://crbug.com/1137218)) -->

- Ahora puede guardar [fragmento de código fuente](/docs/devtools/javascript/snippets/) como un archivo JavaScript directamente. Anteriormente, necesitaba agregar la extensión de archivo `.js` manualmente. ([1137218](https://crbug.com/1137218))


<!-- - The **Sources** panel now correctly displays scope variable names when debugging with source map. Previously, the **Sources** panel displays minified scope variable names despite source map being provided. ([1294682](https://crbug.com/1294682))  -->

- El panel **Fuentes** ahora muestra correctamente los nombres de las variables del ámbito al depurar con el mapa fuente. Anteriormente, el panel **Fuentes** mostraba nombres de variables del ámbito minimizados a pesar de que se proporcionaba un mapa fuente. ([1294682](https://crbug.com/1294682))

<!-- - The **Sources** panel now restores scroll position correctly on page load. Previously, the position was not restored correctly causing inconvenience in debugging. ([1294422](https://crbug.com/1294422))  -->

- El panel **Fuentes** ahora restaura la posición de desplazamiento correctamente al cargar la página. Anteriormente, la posición no se restauraba correctamente, lo que generaba inconvenientes en la depuración. ([1294422](https://crbug.com/1294422))

{% Partial 'devtools/reach-out.md' %}
{% Partial 'devtools/whats-new.md' %}
