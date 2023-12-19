---
title: Nuevo en Chrome 119
description: >
   ¡Chrome 119 ya está disponible! Con una actualización del límite superior de fecha de vencimiento para las cookies que ya están almacenadas. CSS tiene nuevas pseudoclases, sintaxis de color relativa, Fenced Freame tiene mejoras como macros de tamaño de anuncio,y hay mucho más.
layout: 'layouts/blog-post.njk'
date: 2023-10-31
authors:
  - ajara
hero: 'image/SeARmcA1EicLXagFnVOe0ou9cqK2/O86Q55IqPgegjOhrABT6.jpeg'
alt: >
  New in Chrome hero logo
tags:
  - new-in-chrome
  - chrome-119
---

{% YouTube id='WK5fHV3Bm6M' %}

Esto es lo que necesitas saber:

*Hay una [actualización a la fecha de vencimiento](#cookies-expiration) límite superior para las cookies que ya están almacenadas.
* [CSS tiene nuevos pseudo-clases](#css-updates), sintaxis de color relativa y más.
* [Se agregaron mejoras en Fenced Frames](#fenced-frames-improvements) como macros de tamaño de anuncio y otras.
* Y hay mucho [más](#more).

Soy Adriana Jara. Profundicemos y veamos las novedades para los desarrolladores en Chrome 119.

## Fecha de caducidad de las cookies. {: #cookies-expiration}

Desde Chrome 104, las cookies recién creadas o las actualizadas con una fecha de vencimiento tienen esa fecha limitada a no más de 400 días en el futuro. Este mismo límite ahora se aplicará retroactivamente a las cookies que ya estén almacenadas.

Las fechas de vencimiento de estas cookies tendrán un límite de no más de 400 días después de la primera vez que Chrome 119+ se inicia y realiza una migración una única vez de la base de datos. Los usuarios no sentirán el impacto de este cambio hasta al menos 400 días después del lanzamiento de Chrome 119, y luego solo para las cookies existentes que no se hayan actualizado en ese período.

Puede leer más sobre [la recomendación de fecha de vencimiento](https://httpwg.org/http-extensions/draft-ietf-httpbis-rfc6265bis.html#name-the-expires-attribute) y aquí les recordamos que las cookies de terceros quedarán obsoletas [en un futuro próximo](https://privacysandbox.com/news/the-next-stages-of-privacy-sandbox-general-availability) y [a guía para prepararse para la desactivación](/docs/privacy-sandbox/third-party-cookie-phase-out).

## Actualizaciones de CSS {: #css-updates }

Para CSS tenemos tres actualizaciones:

Número uno: el nuevo [`:user-invalid`]()https://developer.mozilla.org/docs/Web/CSS/:user-invalid y [`:user-valid`](https://developer .mozilla.org/docs/Web/CSS/:user-valid) pseudoclases que representan un elemento con entrada incorrecta o correcta, respectivamente, pero solo después de que el usuario haya interactuado significativamente con él. Son similares a `:valid` y `:invalid`, pseudo-clases pero con la restricción adicional de que las nuevas pseudoclases solo coinciden después de que el usuario haya interactuado con el elemento.

Número dos: la [sintaxis de color relativa](/blog/css-relative-color-syntax/) permite a los desarrolladores definir colores modificando los parámetros de otros colores.

Por ejemplo: `oklab(from magenta calc(l * 0.8) a b);` da como resultado una Oklab magenta que es un 80% más ligera.

Y número 3: `clip-path` ahora admite más valores.

La propiedad [`clip-path`](https://developer.mozilla.org/docs/Web/CSS/clip-path) crea una región de recorte que establece qué parte de un elemento debe mostrarse. Se muestran las partes que están dentro de la región, mientras que las que están fuera están ocultas.

Ahora puedes usar los valores de [`<geometry-box>`](https://developer.mozilla.org/docs/Web/CSS/clip-path#geometry-box) para controlar el cuadro de referencia del clip, haciendo que `clip-path` sea más fácil de usar. Estos valores de cuadro se pueden usar junto con formas básicas (por ejemplo, `clip-path: circle(50%) margin-box`), o se pueden usar solos para recortar al cuadro especificado (por ejemplo,` clip-path: content-box`).

También puedes usar las funciones [`xywh()`](https://developer.mozilla.org/docs/Web/CSS/basic-shape/xywh) y [`rect()`](https://developer .mozilla.org/docs/Web/CSS/basic-shape/rect) que facilitan la especificación de clips rectangulares o rectangulares redondeados.


## Mejoras en Fenced Frames{: #mejoras-en los marcos-cercados }

Un [Fenced Frame](/docs/privacy-sandbox/fenced-frame/) es un elemento HTML para contenido incrustado, similar a un iframe. A diferencia de los iframes, los Fenced Frames restringen la comunicación con su contexto de incrustación para permitir que el marco acceda a datos entre sitios sin compartirlos con el contexto de incrustación.

En esta versión, Fenced Frames agregó una opción de formato adicional para las macros de tamaño de anuncio de [Protected Audience](/docs/privacy-sandbox/protected-audience). Ahora, en la API de Protected Audience, una función de suscripción le permite establecer una macro del tamaño del anuncio que gana la subasta en la URL del anuncio, por ejemplo:
`https://ad.com?width={/%AD_WIDTH%}&height={/%AD_HEIGHT%}`

Además, ahora se enviarán beacons automáticas a todas las URL registradas. Anteriormente, solo recibían beacons automáticas, los destinos específicos que llamaban [`setReportEventDataForAutomaticBeacons()`](https://github.com/WICG/turtledove/blob/main/Fenced_Frames_Ads_Reporting.md#api-to-populate-event-data-for-reservedtop_navigation) incluso si ese destino llamaba [`registerAdBeacon()`](https://github.com/WICG/turtledove/blob/main/Fenced_Frames_Ads_Reporting.md#registeradbeacon) en su worklet.

Ahora, cualquier destino que llame a `registerAdBeacon()` para `reserved.top_navigation` obtendrá una beacon automática, pero solo los destinos especificados en `setReportEventDataForAutomaticBeacons()` obtendrán datos de beacon automática junto con la beacon.

## ¡Y más! {: #more }

Por supuesto que hay mucho más.

* [`WebSQL` se eliminó por completo](/blog/deprecating-web-sql/) a partir de Chrome 119. Una prueba de origen inverso permite a los desarrolladores continuar usando WebSQL hasta Chrome 123.

* Ahora la opción [`monitorTypeSurfaces`](/docs/web-platform/screen-sharing-controls/#monitorTypeSurfaces) se puede usar para evitar que el usuario comparta una pantalla completa, con [`getDisplayMedia()`](https: //developer.mozilla.org/docs/Web/API/MediaDevices/getDisplayMedia)

* Hay [una prueba de origen](/origintrials/#/view_trial/106960491150049281) que agrega un parámetro a windowFeatures de `fullscreen` a la API de JavaScript `window.open()` para permitir que la persona que llama abra una ventana emergente directamente en pantalla completa.

## Otras lecturas

Esto cubre sólo algunos aspectos destacados clave. Consulte los enlaces a continuación para
cambios adicionales en Chrome 119.

* [Novedades de Chrome DevTools (119)](/blog/new-in-devtools-119/)
* [Desuso y eliminaciones de Chrome 119](/blog/deps-rems-119/)
* [Actualizaciones de ChromeStatus.com para Chrome 119](https://chromestatus.com/features#milestone%3D119)
* [Lista de cambios del repositorio fuente de Chromium](https://chromium.googlesource.com/chromium/src/+log/118.0.5993.116..119.0.6045.63)
* [Calendario de lanzamientos de Chrome](https://chromiumdash.appspot.com/schedule)

## Suscríbete

Para mantenerse actualizado, [suscríbase](https://goo.gl/6FP1a5) al
[Canal de YouTube para desarrolladores de Chrome](https://www.youtube.com/user/ChromeDevelopers/),
y recibirás una notificación por correo electrónico cada vez que lancemos un nuevo vídeo.

Hola, soy Adriana Jara, y tan pronto como se lance Chrome 120, estaré aquí para
¡Contarles que hay de nuevo en Chrome!