---
title: Nuevo en Chrome 111
description: >
  ¡Chrome 111 ya está disponible! Crea transiciones pulidas en tu aplicación de una sola página (SPA) con la API View Transitions y lleva los colores al siguiente nivel con soporte para CSS color level 4. Descubra nuevas herramientas en el panel de estilo para aprovechar al máximo la nueva funcionalidad de color, y hay mucho más .
layout: 'layouts/blog-post.njk'
date: 2023-03-07
authors:
  - ajara
hero: 'image/SeARmcA1EicLXagFnVOe0ou9cqK2/djvT3JKbPBugDOsCUsFY.png'
alt: >
  New in Chrome hero logo
tags:
  - new-in-chrome
  - chrome-111
---

{% YouTube id='cscwgzz85Og' %}

Esto es lo que necesitas saber:

* Crea transiciones elegantes en su aplicación de una sola página (SPA) con [View Transitions API](#view-transitions-api).
* Lleve los colores al siguiente nivel con soporte para [CSS Color Level 4] (#css-color-level4).
* Descubra [nuevas herramientas] (#devtools-color) en el panel de estilo para aprovechar al máximo la nueva funcionalidad de color.
* Y [mucho más](#more).

Soy Adriana Jara. Vamos un poco más allá y descubramos qué hay de nuevo para los desarrolladores en Chrome 111.
## View Transitions API. {: #ver-transiciones-api}
Crear transiciones fluidas en la web es una tarea compleja.
La API View Transitions está aquí para simplificar la creación de transiciones elegantes ya que, toma capturas instantáneas de las vistas y permite que el DOM cambie sin superposición entre estados.

<figure>
  {% Video
    playsinline="true",
    src="video/CZmpGM8Eo1dFe0KNhEO9SGO8Ok23/hgnJfPFUbGlucFegEEtl.mp4",
    class="video-full-demo",
    loop="true",
    autoplay="true",
    muted="true",
    controls="true"
  %}
  <figcaption>Transiciones creadas usando la View Transition API. <a href="https://http203-playlist.netlify.app/">Usa el sitio de prueba</a>–Requiere Chrome 111+.</figcaption>
</figure>

La transición predeterminada es un `cross-fade`, el siguiente fragmento implementa esta experiencia.

```js
function spaNavigate(data) {
  // Alternativa para browsers que no implementan esta API:
  if (!document.startViewTransition) {
    updateTheDOMSomehow(data);
    return;
  }

  // Con una transición:
  document.startViewTransition(() => updateTheDOMSomehow(data));
}
```


Cuando se llama a `.startViewTransition()`, la API captura el estado actual de la página.

Una vez que se completa, se llama la `callback` que se pasó `.startViewTransition()`. Ahí es donde se actualiza el DOM. Luego, la API captura el nuevo estado de la página.

Ten en cuenta que la API está disponible para aplicaciones de una sola página (SPA), pero también se está implementando la funcionalidad para otros modelos.

Hay muchos detalles sobre esta API, [este artículo](/docs/web-platform/view-transitions/) contiene ejemplos y detalles para crear sus propias transiciones personalizadas, , también puedes explorar [La documentación de View Transitions en MDN](https://developer.mozilla.org/docs/Web/API/View_Transitions_API).

## Nivel de color CSS 4.{:#css-color-nivel4 }

Con el nivel de color 4 de CSS, CSS ahora es compatible con pantallas de alta definición, especificando colores de gamas HD al tiempo que ofrece espacios de color con especializaciones.

En pocas palabras, ¡significa un 50 % más de colores para elegir! Y pensabas que 16 millones de colores sonaba como mucho. Yo también pensaba lo mismo.

<figure>
  {% Video
    src="video/vS06HQ1YTsbMKSFTIPl2iogUQP73/swYaLIEXuDRZ2VO8SCLH.mp4",
    autoplay="true",
    loop="true",
    muted="true",
    controls="true"
  %}

  <figcaption>
    A series of images are shown transitioning between wide and narrow color
    gamuts, illustrating color vividness and its effects.<br>
    <a href="https://ciechanow.ski/color-spaces/#:~:text=you%20can%20drag%20the%20slider%20to%20see%20how%20the%20extent%20of%20the%20chromaticity%20triangle%20corresponds%20to%20the%20representable%20colors.">Try it for yourself</a>
  </figcaption>
</figure>

La implementación incluye la función [`color()`](https://developer.mozilla.org/docs/Web/CSS/color_value/color); se puede utilizar para cualquier espacio de color que especifique colores con canales R, G y B. `color()` toma primero un parámetro de espacio de color, luego una serie de valores de canal para RGB y, opcionalmente, un `alpha`.

Estos son algunos ejemplos del uso de la función de color con diferentes espacios de color.

```css
.valid-css-color-función-colores {
  --srgb: color(srgb 1 1 1);
  --srgb-lineal: color(srgb-lineal 100% 100% 100% / 50%);
  --display-p3: color(display-p3 1 1 1);
  --rec2020: color(rec2020 0 0 0);
  --a98-rgb: color(a98-rgb 1 1 1 / 25%);
  --profoto: color(profoto-rgb 0% 0% 0%);
  --xyz: color(xyz 1 1 1);
}
```

Consulte [este artículo](/articles/high-definition-css-color-guide/) para obtener más documentación para aprovechar al máximo los colores de alta definición mediante CSS.

## Nuevas herramientas de desarrollo de color.{:#devtools-color }

Devtools tiene nuevas características para facilitar la especificación CSS color level 4.

El panel **Estilos** ahora admite los 12 nuevos espacios de color y las 7 nuevas gamas de colores descritas en la especificación. Estos son ejemplos de definiciones de color CSS con color(), lch(), oklab() y color-mix().

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/dA8VCKaSZhNb9gzlAUT9.png", alt="Ejemplos de definiciones de color CSS.", width="800", height="509" %}

Al usar `color-mix()`, que permite mezclar un porcentaje de un color con otro, puede ver el resultado de color final en el pane **Calculado**
{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/3VkOGbbb5qLVvo1A1qSa.png", alt="resultado de color-mix en el panel Calculado", width="800", height="487" %}

Además, el selector de color es compatible con todos los nuevos espacios de color con más funciones. Por ejemplo, haga clic en la muestra de color de color (display-p3 1 0 1). Verás que se ha agregado una línea límite de gama, que distingue entre las gamas sRGB y display-p3 para una comprensión más clara de la gama de colores seleccionada.
{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/bL6uw8VV4cGuDd9hmAjX.png", alt="Línea límite de una gama.", width="800", height="657" %}

El selector de color también admite la conversión de colores entre formatos de color.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/uoz3yaPPdVs6T2ASnQ62.png", alt="Convertir colores entre formatos de color.", width="800", height="460" %}

Consulte [esta publicación](/blog/new-in-devtools-111/) para obtener más información sobre la depuración de colores y otras características nuevas en devtools.


## ¡Y más! {: #more }

Por supuesto que hay mucho más.

* CSS agregó funciones trigonométricas, unidades de fuente raíz adicionales y [extendió el pseudoselector n-ésimo hijo] (/articles/css-nth-child-of-s/).
* La [API Document Picture-in-Picture](/docs/web-platform/document-picture-in-picture/) está en origen trial
* Las acciones `previousslide` y `nextslide` ahora forman parte de [Media Session API] (https://web.dev/media-session). Consulta la demostración [aquí](https://googlechrome.github.io/samples/media-session/slides.html).

## Otras lecturas

Este artículo cubre sólo algunos aspectos destacados clave. Compruebe los enlaces a continuación para cambios adicionales en Chrome 111.

* [Novedades de Chrome DevTools (111)](/blog/new-in-devtools-111/)
* [Desactivación y eliminación de Chrome 111](/blog/deps-rems-111/)
* [Actualizaciones de ChromeStatus.com para Chrome 111](https://www.chromestatus.com/features#milestone%3D108)
*[Lista de cambios del repositorio fuente de Chromium](https://chromium.googlesource.com/chromium/src/+log/110.0.5481.186..111.0.5563.53)
* [Calendario de lanzamiento de Chrome](https://chromiumdash.appspot.com/schedule)

## Suscríbete

Para mantenerse actualizado, [suscríbase](https://goo.gl/6FP1a5) al
[canal de YouTube para desarrolladores de Chrome](https://www.youtube.com/user/ChromeDevelopers/),
y recibirás una notificación por correo electrónico cada vez que lancemos un nuevo video.

Soy Adriana Jara, y tan pronto como se lance Chrome 112, estaré aquí para
¡Cuéntanos qué hay de nuevo en Chrome!
