---
layout: "layouts/blog-post.njk"
title: "Qué hay de nuevo en DevTools (Chrome 96)"
authors:
  - jecelynyeen
date: 2021-10-25
updated: 2021-10-25
description:
  "Nuevo panel de Descripción General de CSS, emule la función multimedia CSS de contraste, emula la función de tema oscuro automático de Chrome y mucho más."
hero: 'image/dPDCek3EhZgLQPGtEG3y0fTn4v82/nGhNBHKztHdRnnNLikve.jpg'
alt: ''
tags:
  - new-in-devtools
  - devtools
  - chrome-96

---

*Gracias [Carlos Caballero](https://carloscaballero.io) por la traducción y [Miguel Ángel](https://midu.dev) por la revisión.*

{% Partial 'devtools/banner.md' %}

{% YouTube id='3CXbhnaFNEw' %}

## Función de vista previa: Nuevo panel de Descripción General de CSS {: #css-overview }

Utilice el nuevo panel **Descripción General de CSS / Resumen de CSS** para identificar posibles mejoras de CSS en su página.
[Abra el panel **Descripción general de CSS / Resumen de CSS**](/docs/devtools/css-overview#open), luego haga clic en **Capture overview** para generar un informe del CSS de su página.

Puede profundizar más en la información. Por ejemplo, haga clic en un color en la sección **Colores** para ver la lista de elementos que aplican el mismo color. Haga clic en un elemento para abrir el elemento en el panel **Elementos**.

El panel **Descripción General de CSS** es una función de vista previa. Nuestro equipo todavía está trabajando activamente en él y estamos buscando sus [comentarios](https://goo.gle/css-overview-feedback) para obtener más mejoras.

Lea [este artículo](/docs/devtools/css-overview) para obtener más información sobre el panel de **Descripción General de CSS / Resumen de CSS**.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/fXXPihV3bTl82WDJGX51.png", alt="Panel de Descripción General de CSS", width="800", height="509" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/ef26abc89035075bbdb08f1b26c1b8fd942ffc04 #}

Chromium issue: [1254557](https://crbug.com/1254557)

## Recuperada y mejorada las acciones de copiar y editar propiedades CSS con logintud {: #length } 

Las acciones de **copiar CSS** y **editar como texto** se restauran para las propiedades CSS con longitud. Estas características dejaron de funcionar en la última versión.

{% Video src="video/dPDCek3EhZgLQPGtEG3y0fTn4v82/3zxmVrRNd767L9zPDvU8.mp4", autoplay="true", muted="true", loop="true", class="screenshot" %} 

Además, puede arrastrar para ajustar el valor de la unidad y actualizar el tipo de unidad a través del menú desplegable. Esta funcionalidad no debería afectar a la experiencia de usuario en la acción principal editar como texto.

{% Video src="video/dPDCek3EhZgLQPGtEG3y0fTn4v82/YkvFZGBllRecee2EAzYf.mp4", autoplay="true", muted="true", loop="true", class="screenshot"  %}

Informe a través de [goo.gle/length-feedback](https://goo.gle/length-feedback) si encuentra algún problema.

Puede deshabilitar esta característica vía **Configuración** > **Experimentos** > **Enable CSS length authoring tools in the Styles pane**.

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/0042092ccbcdfb5b113c28b9a58c2cf1219b10c4 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/c8f39d4c60841439ebf75d1a2d8fdfe50e1355a9 #}

Chromium issues: [1259088](https://crbug.com/1259088), [1172993](https://crbug.com/1172993)

## Actualizaciones de la pestaña de Renderizado

### Emule la función multimedia CSS de contraste {: # prefers-contrast }

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/47fsHvVLiVC9J0eWY9wD.png", alt="Emule la función multimedia CSS de constraste", width="800", height="483" %}

La función multimedia [prefers-contrast](https://www.chromestatus.com/feature/5646323212615680) se utiliza para detectar si el usuario ha solicitado más o menos contraste en la página.

Abra el [Menú de comandos](/docs/devtools/command-menu/), ejecute el comando **Mostrar renderizado / Mostrar la renderización** y luego configure el menú desplegable **Emular la función multimedia CSS prefers-contrast**

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/22cec8dbfa7b46c8b633e3555212556ec6f78df9 #}

Chromium issue: [1139777](https://crbug.com/1139777)


### Emula la función de tema oscuro automático de Chrome {: #auto-dark-mode }

Use DevTools para emular el tema oscuro automático para ver fácilmente cómo se ve su página cuando el [Tema oscuro automático](/blog/auto-dark-theme/) de Chrome está habilitado.

Chrome 96 presenta una [Prueba de origen](/blog/origin-trial/) para [Tema oscuro automático](/blog/auto-dark-theme/) en Android. Con esta función, el navegador aplica un tema oscuro generado automáticamente a sitios con temas claros, cuando el usuario ha optado por temas oscuros en el sistema operativo.

Abra el [Menú de comandos](/docs/devtools/command-menu/), ejecute el comando **Mostrar renderizado / Mostrar la renderización** y luego configure el menú desplegable **Emular modo oscuro automático**.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/QHS8kupNsTXnKD7HomYy.png", alt="Emula la función de tema oscuro automático de Chrome", width="800", height="483" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/0d7e03ffa64ba8432ec9db3e067abeb60cd53d7e #}

Chromium issue: [1243309](https://crbug.com/1243309)


## Copiar declaraciones como JavaScript en el panel Estilos {: #copy-as-js }

Se agregan dos nuevas opciones en el menú contextual para que pueda copiar fácilmente las reglas CSS como propiedades de JavaScript. Estas opciones de atajos son útiles especialmente para los desarrolladores que están trabajando con bibliotecas [CSS-in-JS](/blog/css-in-js/#what-is-css-in-js).

En el panel **Estilos**, haga clic con el botón derecho en una regla CSS. Puede seleccionar **Copiar declaración como JS** para copiar una sola regla o **Copiar todas las declaraciones como JS** para copiar todas las reglas.

Por ejemplo, el siguiente ejemplo copiará `padding-left: '1.5rem'` al portapapeles.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/M4mKimxhUs6f4hc0wMuO.png", alt="Copiar declaraciones como JavaScript", width="800", height="469" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/ca17a55104e6baf8d4ab360b484111bfa93c9b7f #}

Chromium issue: [1253635](https://crbug.com/1253635)


## Nueva pestaña de Payload en el panel Red {: #payload }

Utilice la nueva pestaña **Payload** en el panel **Red** cuando inspeccione una solicitud de red con payload. Anteriormente, la información del payload estaba disponible en la pestaña **Encabezados**.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/1DTIW7zoIqf3VE2WMJmX.png", alt="Pestaña Payload en el panel Red", width="800", height="488" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/eae72f667aa10a1a8316fbf8b2ac03ff514bb4da #}

Chromium issue: [1214030](https://crbug.com/1214030)

## Mejoras en la visualización de propiedades en el panel Propiedades {: #properties }

El panel **Propiedades** ahora muestra solo las propiedades relevantes en lugar de mostrar todas las propiedades de la instancia. Los prototipos y métodos DOM ahora se eliminan.

Junto con las mejoras del panel [**Propiedades**](/blog/new-in-devtools-95/#properties) en Chrome 95, puede localizar las propiedades relevantes más fácilmente.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/hs4KfBZOBeyWHF42Xsuq.png", alt="La visualización de propiedades en el panel Propiedades", width="800", height="387" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/f1574e9b550317c481a943fec059d84bfb863564 #}

Chromium issue: [1226262](https://crbug.com/1226262)


## Actualizaciones de la consola

### Opción para ocultar errores CORS en la consola {: #hide-cors-errors }

Puede ocultar los errores de CORS en la **Consola**. Como los errores de CORS ahora se informan en la pestaña Problemas, ocultar los errores de CORS en la **Consola** puede ayudar a reducir el desorden.

En **Consola**, haz clic en el ícono **Configuración** y desmarca la casilla de verificación **Mostrar errores de CORS en la consola**.


{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/m3ZzZI5VkYSYCfCLDHUi.png", alt="Opción para ocultar errores CORS en la consola", width="800", height="502" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/82873eeb1c1430790ad3a2cd2a698135bd6eb3de #}

Chromium issue: [1251176](https://crbug.com/1251176)


### Vista previa y evaluación adecuadas de los objetos `Intl` en la consola {: #intl }

Los objetos [Intl](https://tc39.es/ecma402/#intl-object) ahora tienen una vista previa adecuada y se evalúan con anticipación en la consola. Anteriormente, los objetos `Intl` no se evaluaban con anticipación.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/ZxGQoDdnilseKTFsxdbC.png", alt="Objetos Intl en la Consola", width="800", height="559" %}

{# https://chromium-review.googlesource.com/c/v8/v8/+/3196175 #}

Chromium issue: [1073804](https://crbug.com/1073804)

### Trazas de la pila asíncrona consistentes {: #async }

DevTools ahora informa de las trazas de las pilas `async` para que las funciones `async` sean consistentes con otras tareas asincrónicas.


{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/wuKo84nrDzbhwCnIVU2n.png", alt="Trazas de la pila asíncrona", width="800", height="427" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/b2a04e234f25602d1b7e7ff7bd0d39bde3f2c1ec  #}

Chromium issue: [1254259](https://crbug.com/1254259)


### Mantener la barra lateral de la consola {: #console-sidebar }

La barra lateral de la consola volverá a quedarse. En Chrome 94, anunciamos la [desactivación de la barra lateral de la consola](/blog/new-in-devtools-94/#deprecated) y pedimos a los desarrolladores comentarios y opiniones.

Ahora tenemos suficientes comentarios sobre el aviso de desactivación y trabajaremos para mejorar la barra lateral en lugar de eliminarla.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/XIsLjvBFSeaTN5BtEgmU.png", alt="Console sidebar", width="800", height="502" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/b0650096c934bf60c21d51ae8a51c94e8f907d38 #}

Chromium issues: [1232937](https://crbug.com/1232937), [1255586](https://crbug.com/1255586)

## Panel de caché de la aplicación en desuso (deprecated) en el panel de la aplicación  {: #app-cache } -->

El panel [Caché de la aplicación](/docs/devtools/storage/applicationcache/) en el panel de Aplicación se eliminó pues el soporte para [AppCache](https://web.dev/appcache-removal/) se ha eliminado de Chrome y otros navegadores basados ​​en Chromium.

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/de4d15e955d6145674e3885cde8a5a70f1269b79 #}

Chromium issue: [1084190](https://crbug.com/1084190)


## [Experimental] Nuevo panel de la API de informes en el panel de la aplicación {: #reporting-api }

{% Aside %}
Para habilitar esta característica experimental, marque la casilla de verificación **Enable Reporting API panel in the Application panel** que encontrará en la siguiente ruta **Configuración** > **Experimentos**.
{% endAside %}

La [API de informes](https://web.dev/reporting-api/) está diseñada para ayudarlo a monitorear las violaciones de seguridad de su página, las llamadas a API obsoletas y más.

Con este experimento habilitado, ahora puede ver el estado de los informes en el nuevo panel **API de informes** en el panel **Aplicación**.

Tenga en cuenta que la sección **Endpoints** se encuentra actualmente en desarrollo activo (no muestra ningún informe de endpoints por ahora).

Obtenga más información sobre la **API de informes** con [este artículo](https://web.dev/reporting-api/).


{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/hbwFqi9aNDOj70FhLXsn.png", alt="Panel de la API de informes en el panel de la aplicación", width="800", height="476" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/c0516bfc7d4cee077452d31b1550ea1d3c594705 #}

Chromium issue: [1205856](https://crbug.com/1205856)

{% Partial 'devtools/reach-out.md' %}
{% Partial 'devtools/whats-new.md' %}

