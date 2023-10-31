---
layout: "layouts/blog-post.njk"
title: "Qué hay de nuevo en DevTools (Chrome 94)"
authors:
  - jecelynyeen
date: 2021-08-24
updated: 2021-08-24
description:
  "Usa DevTools en tu idioma preferido, nuevos dispositivos Nest Hub, nueva insignia de consultas de contenedor CSS y más novedades."
hero: 'image/dPDCek3EhZgLQPGtEG3y0fTn4v82/GzZ1YTEeHlnhUrbPBzmr.jpg'
alt: ''
tags:
  - new-in-devtools
  - devtools
  - chrome-94
---

*Gracias [Carlos Caballero](https://carloscaballero.io) por la traducción y [Miguel Ángel](https://midu.dev) por la revisión.*

{% Partial 'devtools/banner.md' %}

{% YouTube id="N9Jiou61WH4" %}


## Utiliza DevTools en tu idioma preferido {: #localized }

Chrome DevTools ahora soporta más de 80 idiomas, lo que permite que lo puedas utilizar en tu idioma preferido.

Ve a [Configuración](/docs/devtools/customize/#settings), a continuación selecciona tu idioma preferido siguiendo la ruta  **Configuración avanzada** > **Idioma** y finalmente, reinicia las DevTools.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/vqO0Xvjei3KxTds87PJc.png", alt="Cambia el idioma en Configuración > Preferencias", width="800", height="519" %}

{# https://chromium.googlesource.com/chromium/src/+/58abfbcdddae27fb43c17f43dbcc197f2570b5a5 #}

Chromium issue: [1163928](https://crbug.com/1163928)


## Nest Hub en la lista de dispositivos {: #nest-hub }

Ahora puedes simular las dimensiones físicas de Nest Hub y Nest Hub Max utilizando el [modo dispositivo](/docs/devtools/device-mode/).

Clic [Toggle Device Toolbar](/docs/devtools/device-mode/#viewport) &nbsp; {% Img src="image/admin/9FiBHFCzfPgP8sy6LMx7.png", alt="Toggle Device Toolbar", width="20", height="22" %} &nbsp;, selecciona Nest Hub o Nest Hub Max en la lista de dispositivos. 

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/KytKWMiC4cbFfVUOBzlm.png", alt="Nest Hub en el modo dispositivo", width="800", height="549" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/d13f911f7d98751cce659898936511b5ccda96cd #}

Chromium issue: [1223525](https://crbug.com/1223525)


## Pruebas de origen en la vista de detalle de Frame {: #origin-trials }

Ahora se puede obtener información sobre los [pruebas de origen](/blog/origin-trials/) en la vista de detalles de frame debajo del panel de Aplicación

[Pruebas de origen](/blog/origin-trials/) permite el acceso a funcionalidades nuevas o experimentales, para construir una funcionalidad que los usuarios puedan probar durante un tiempo limitado antes de que dicha funcionalidad esté disponible para todo el mundo.

Abre una página con prueba de origen (por ejemplo [demo page](https://mediastreamtrack.glitch.me)). En el panel **Applicación**, desplazate hacia la sección **Fotogramas/Marcos** y selecciona el fotograma/marco top.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/VICXjdGL5Rz09TAPg1sW.png", alt="Pruebas de origen en la vista de detalle de Frame", width="800", height="465" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/2086be5df61ea71f633c3fbab277b01470c534ce #}

Chromium issue: [607555](https://crbug.com/607555)


## Nueva insignia de consultas de contenedor CSS {: #container-queries }

Una nueva insignia **container** se agrega junto a los elementos del contenedor (los elementos ancestros que coinciden con los criterios de las reglas at `@container`). Haga clic en la insignia para alternar la visualización del contenedor elegido y todos sus descendientes en la página.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/0plPq2cHZV5gV8zm9VlP.png", alt="Insignia de consultas de contenedor CSS", width="800", height="488" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/6f2632929afd7f74a2f1bf6fd83bb1d8818c3234 #}

Chromium issue: [1146422](https://crbug.com/1146422)


## Nuevo checkbox para invertir los filtros del panel de Red {: #invert-network-filter }

Utiliza el nuevo checkbox **Invertir** para invertir los filtros en el panel de Red.

Por ejemplo, puedes escribir "status-code: 404" para filtrar las peticiones de la red con `status` 404. Habilita el checkbox **Invertir** para negar el filtro (se muestran todas las peticiones de la red las cuales no tienen el `status` 404).

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/xx1ju91Mu3qflyG6E40W.png", alt="Invertir los filtros de la red", width="800", height="474" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/66878d6044df77ba6264a576483bf5aae6b5f3d9 #}

Chromium issue: [1054464](https://crbug.com/1054464)


## Eliminación próxima (`deprecated`) de la barra lateral de la Consola {: #deprecated }

La barra lateral de la consola será eliminada en favor de mover los filtros de UI a la barra de herramientas. ¿Tiene alguna duda o comentario? Háganoslo saber a través de este [issue tracker](https://crbug.com/1232937).

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/CzC2HCaiCcdPgbLykyc8.png", alt="Mensaje de aviso de próxima eliminación de la barra lateral de la consola.", width="800", height="474" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/f34c62f543c29ffd4be95c4e93b453aa34644897 #}

Chromium issue: [1232937](https://crbug.com/1232937)


## Mostrar cabecera `Set-Cookie` sin procesar en la pestaña Problemas y el panel Red {: #raw-cookies }

DevTools ahora muestra la cabecera `Set-Cookie` sin procesar (`raw`) en la pestaña **Problemas**.

Anteriormente, DevTools no mostraba cookies con formato incorrecto (cabecera "Set-Cookie" incorrecta) en el panel Red. Con el nuevo filtro `response-header-set-cookie` agregado al panel **Red**, los usuarios pueden filtrar la respuesta de la cabecera `Set-Cookie` antes de ser procesada. DevTools vinculará la cabecera sin procesar `Set-Cookie` en la pestaña **Problemas** al panel **Red**.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/PbozcNJRd6rTME5hhqIq.png", alt="Cabecera `Set-Cookie` sin procesar en la pestaña Problemas y el panel Red", width="800", height="563" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/6dedde59f9d64290756a826f73dfe24cf382a470 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/27aa364d1b194a7a778e7649e1f144abbed5957f #}

Chromium issue: [1179186](https://crbug.com/1179186)


## Visualización coherente de los descriptores de acceso nativos como propiedades propias en la consola {: #native-accessors }

La **Consola** ahora muestra los descriptores de acceso nativos como sus propias propiedades de manera coherente.

Por ejemplo, al evaluar la expresión `new Int8Array([1, 2, 3])` en la **Consola**, los descriptores de acceso nativos como `length`,`byteOffset` no se mostraban en la vista previa. Con esta última actualización, los descriptores de acceso nativos se muestran en la vista previa y los valores se evalúan por adelantado cuando se expanden.


{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/VcUiEcUXdWc00Q8595n6.png", alt="Visualización coherente de los descriptores de acceso nativos como propiedades propias en la consola", width="800", height="459" %}

{# https://chromium.googlesource.com/v8/v8/+/ce8cef36aa7f386937a6b7bf1907e93b69cad1bd #}

Chromium issues: [1076820](https://crbug.com/1076820), ​​[1199247](https://crbug.com/1199247)


## Pila de error más adecuada para scripts en línea con #sourceURL {: #inline-script }

DevTools ahora resuelve correctamente los scripts en línea con #sourceURL y muestra la pila de errores adecuada para la depuración.

Anteriormente, DevTools mostraba una ubicación incorrecta para los scripts en línea con #sourceURL, en relación con el documento próximo en lugar de con respecto a la etiqueta de apertura `<script>`.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/XVUY8XxbGZW74kPsGkOZ.png", alt="Pila de error más adecuada para scripts en línea con #sourceURL", width="800", height="425" %}

{# https://chromium.googlesource.com/v8/v8/+/c2f30c2b3f637c2339e8b9672c5c59a21b7d1095 #}

Chromium issues: [1183990](https://crbug.com/1183990), ​​[578269](https://crbug.com/578269)

## Cambiar el formato de color en el panel Computado {: #color-unit }

Ahora puede cambiar el formato de color de cualquier elemento en el panel Computado con <kbd>Mayús</kbd> + clic en la vista previa del color.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/IhOkF5do9P8Ovlr7YsdX.png", alt="Mayús+Clic la vista previa del color para cambiar el formato de color", width="800", height="474" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/97143f7586d540e53a2e40ced7f106181e5c9ce3 #}

Chromium issue: [1226371](https://crbug.com/1226371)

## Sustitución de tooltips personalizados por tooltips nativos en HTML {: #tooltip }

DevTools ahora adopta `tooltips` nativos de HTML en todos los componentes. DevTools ha tenido una implementación personalizada de información en los `tooltips` durante mucho tiempo debido a la falta de estilo de los `tooltips` nativos de HTML.

Desafortunadamente, mantener una implementación personalizada de `tooltips` es complicado y frecuentemente nos encontramos con complicados `bugs`.

Después de volver a ponderar los beneficios de las implementaciones personalizadas, encontramos que los `tooltips` nativos de HTML son suficientes para DevTools y la adopción de `tooltips` nativos evita una gran variedad de problemas para nuestros usuarios.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/bOFfHPAwX3qiVcgANPmh.png", alt="DevTools tooltip", width="800", height="452" %}

{# https://chromium-review.googlesource.com/c/devtools/devtools-frontend/+/3008794 #}

Chromium issue: [1223391](https://crbug.com/1223391)


## [Experimental] Ocultar problemas en la pestaña de Problemas {: #hide-issues }

{% Aside %}
Para habilitar esta característica experimental, marca el checkbox **Habilitar ocultar menú de problemas** que se encuentra en  **Configuración** > **Experimental**.
{% endAside %}

Habilita el **menú ocultar problemas** experimental para ocultar problemas en la pestaña **Problemas**. De este modo, puede centrarse en los problemas que le importan.

En la pestaña **Issue**, sitúe el ratón en un problema, haga click en el menú de problemas &nbsp; {% Img src="image/admin/4sdCQbpBaG4MpoHB1J08.png", alt="Más", width="4", height="20" %} &nbsp; a la derecha, seleccione **Ocultar problemas como estes** para ocultarlo.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/GGJzvwvMYSrkirU44STQ.png", alt="Menú contextual experimental para ocultar problemas", width="800", height="494" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/0200fc96fecec0e209e84c21359ab53393860978 #}

Chromium issue: [1175722](https://crbug.com/1175722)

{% Partial 'devtools/reach-out.md' %}
{% Partial 'devtools/whats-new.md' %}
