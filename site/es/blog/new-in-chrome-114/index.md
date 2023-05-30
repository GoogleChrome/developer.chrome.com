---
title: Nuevo en Chrome 114
description: >
 ¡Chrome 114 ya está disponible! Con ajuste de text-wrap: balance para mejorar los diseños de texto, las cookies que tienen un estado particionado independiente están aquí, la nueva API Popover hace que los popovers sean más fáciles que nunca y hay mucho más.
layout: 'layouts/blog-post.njk'
date: 2023-05-30
authors:
  - ajara
hero: 'image/SeARmcA1EicLXagFnVOe0ou9cqK2/hY1Jhm9rglpkrvoegKyu.jpg'
alt: >
  New in Chrome hero logo
tags:
  - new-in-chrome
  - chrome-114
---

{% YouTube id='qqTnAWL7-v0' %}

Esto es lo que necesitas saber:

* CSS [`text-wrap: balance`] (#text-wrap-balance) está disponible para mejorar los diseños de texto.
* Las cookies divididas por sitio de nivel superior ([CHIPS](#chips)) están aquí.
* Los popovers son más fáciles que nunca con el nuevo [Popover API](#popover-api).
* Y hay mucho [más](#more).

Yo soy Adriana Jara. Profundicemos y veamos qué hay de nuevo para los desarrolladores en Chrome 114.
## `text-wrap: balance`. {: #text-wrap-balance}
Puedes usar `text-wrap: balance` para mejorar los diseños de texto. La animación a continuación muestra la diferencia que puedes hacer con esta línea.

<figure>
{% Video
    src="video/vS06HQ1YTsbMKSFTIPl2iogUQP73/qJKWQGssebOIDGVBtLpo.mp4",
    autoplay="true",
    loop="true",
    muted="true",
    controls="true"
  %}

  <figcaption>
    <a href="https://codepen.io/web-dot-dev/pen/KKxjpQm">
      Pruebe una demostración
    </a>
  </figcaption>
</figure>

Como desarrollador, no conoces el tamaño final, el tamaño de fuente o incluso el idioma del texto. Todas ellas variables necesarias para un tratamiento eficaz del ajuste de texto. Dado que el navegador sí conoce todos los factores, con `text-wrap:balance` puedes solicitar al navegador que descubra la mejor solución de ajuste de línea equilibrada

{% Img src="image/vS06HQ1YTsbMKSFTIPl2iogUQP73/lnGFtchLIPk9RnHSurHg.png", alt="Los dos anteriores ejemplos se muestran juntos, uno está marcado como desequilibrado y el otro como equilibrado.", width="800", height="371" %}

El bloque de texto equilibrado es más agradable a la vista de un lector ya que  llama mejor la atención y, en general, es más fácil de leer.

Equilibrar los titulares será y debería ser el principal caso de uso para `text-wrap: balance` . Ya que hay un costo de rendimiento para equilibrar el texto, entonces para mitigar el costo solo funciona para un máximo de cuatro líneas.

Consulte [este artículo](/blog/css-text-wrap-balance/) con ejemplos y más detalles para mejorar sus diseños de texto.

## CHIPS: Cookies con estado particionado independiente.{:#chips }

[CHIPS (cookies con estado particionado independiente, por sus siglas en inglés)](/docs/privacy-sandbox/chips/), permite optar por cookies de terceros particionados por el sitio de nivel superior utilizando el nuevo atributo de cookie `Partitioned`.

Antes de CHIPS, cuando un usuario visitaba el sitio A, el sitio C incrustado podía establecer una cookie en la máquina del usuario. Si el usuario luego visita el sitio B que también incrusta el sitio C, el sitio C podría acceder a la misma cookie que se configuró en el sitio A. Esto permite que el sitio C recopile la actividad de navegación de un usuario en el sitio A, B y cada sitio en el que está incrustado.

{% Img src="image/vgdbNJBYHma2o62ZqYmcnkq3j0o1/4eKoilhldt8qdmiEvEDo.jpg", alt="Diagrama con sitios y storage sin particionar.", width="800", height="450" %}

Si bien el seguimiento entre sitios es un problema, existen necesidades válidas de cookies entre sitios que se pueden lograr preservando la privacidad con la partición de cookies.

Con CHIPS, cuando un usuario visita el sitio A y el contenido incrustado del sitio C establece una cookie con el atributo `Partitioned`, la cookie se guarda en un contenedor particionado solo para las cookies que establece el sitio C cuando está incrustado en el sitio A. El navegador solo enviaría esa cookie cuando el sitio de nivel superior es A.

{% Img src="image/vgdbNJBYHma2o62ZqYmcnkq3j0o1/Myb2Km4gEVROgCi5NZFQ.png", alt="Diagrama mostrando sitios y almacenamiento particionado", width="800", height="393" %}

Cuando el usuario visita un nuevo sitio, por ejemplo, el sitio B, el sitio C no recibiría la cookie que se configuró cuando C se incrustó en el sitio A.

Consulta [este artículo](/docs/privacy-sandbox/third-party-cookie-phase-out/) para obtener más detalles sobre el proceso para eliminar gradualmente las cookies de terceros.

## Popover API.{:#popover-api }

Con [Popover API](https://developer.mozilla.org/docs/Web/API/Popover_API) es más fácil crear elementos de interfaz de usuario (UI) transitorios que se muestran encima de todas las demás UI de aplicaciones web.

Estos incluyen elementos interactivos para el usuario como menús de acción, sugerencias de elementos de formulario, selectores de contenido y IU de enseñanza.

El nuevo atributo popover permite mostrar cualquier elemento en la [capa superior](/blog/top-layer-devtools/) automáticamente. Esto significa que el desarrollador ya no tiene que preocuparse por el posicionamiento, el apilamiento de elementos, el enfoque o las interacciones del teclado.

Esto es similar al elemento [`<dialog>`](https://developer.mozilla.org/docs/Web/HTML/Element/dialog), pero tiene varias diferencias importantes, incluido el comportamiento de fácil descarte, gestión de interacción popover y soporte de eventos, y la falta de un modo "modal".

Consulte [este artículo](/blog/introducing-popover-api) para obtener más información.

## ¡Y más! {: #more }

Por supuesto que hay mucho más.

*Devtools le permite pausar y depurar código C y C++ en aplicaciones WebAssembly con [compatibilidad con DWARF](/blog/new-in-devtools-114/#wasm).
*La opción `exclusionFilters` en [`navigator.bluetooth.requestDevice()`](https://developer.mozilla.org/docs/Web/API/Bluetooth/requestDevice) permite a los desarrolladores web excluir algunos dispositivos del selector del navegador..
* Hay un origin trial  para [Blackground Blur API](/origintrials/#/view_trial/2228155915641552897).

## Otras lecturas

Esto cubre solo algunos aspectos destacados clave. Compruebe los enlaces a continuación para
cambios adicionales en Chrome 114.

* [Novedades de Chrome DevTools (114)](/blog/new-in-devtools-114/)
* [Desactivación y eliminación de Chrome 114](/blog/deps-rems-114/)
* [Actualizaciones de ChromeStatus.com para Chrome 114](https://chromestatus.com/features#milestone%3D114)
* [Lista de cambios del repositorio fuente de Chromium](https://chromium.googlesource.com/chromium/src/+log/113.0.5672.177..114.0.5735.53)
* [Calendario de lanzamiento de Chrome](https://chromiumdash.appspot.com/schedule)

## Suscríbete

Para mantenerse actualizado, [suscríbase](https://goo.gl/6FP1a5) al
[canal de YouTube para desarrolladores de Chrome](https://www.youtube.com/user/ChromeDevelopers/),
y recibirás una notificación por correo electrónico cada vez que lancemos un nuevo video.

Yo soy Adriana Jara, y tan pronto como se lance Chrome 114, estaré aquí para
contarles qué hay de nuevo en Chrome.