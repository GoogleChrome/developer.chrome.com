---
title:  Nuevo en Chrome 116
description: >
  ¡Chrome 116 ya está disponible! Use Document Picture in Picture API para aumentar la productividad del usuario, mejore el rendimiento al verificar la propiedad notRestoredReasons para optimizar el uso de bfcache, ahora es más fácil depurar las hojas de estilo que faltan en DevTools, y hay mucho más.
layout: 'layouts/blog-post.njk'
date: 2023-08-15
authors:
  - ajara
hero: 'image/SeARmcA1EicLXagFnVOe0ou9cqK2/D40mYqd8kvfXSy2IxbVv.png'
alt: >
  New in Chrome hero logo
tags:
  - new-in-chrome
  - chrome-116
---

{% YouTube id='JHwWUsMKYdk' %}

Esto es lo que necesita saber:

* Use la [Document Picture in Picture API] (#document-picture-in-picture) para aumentar la productividad del usuario.
* Mejore el rendimiento al verificar la propiedad [notRestoredReasons](#not-restored-reasons) para optimizar el uso de bfcache.
* Ahora es más fácil [depurar hojas de estilo faltantes](#missing-stylesheets-debug) en DevTools
* Y hay mucho [más](#más).

Soy Adriana Jara. Profundicemos y veamos qué hay de nuevo para los desarrolladores en Chrome 116.

## Document Picture in Picture API. {: #documento-imagen-en-imagen}
La Document Picture in Picture API hace posible abrir una ventana siempre visible que puede contener HTML arbitrario.

<figure>
  {% Img src="image/vvhSqZboQoZZN9wBvoXq72wzGAf1/Eaaypsy6NZ9UljxtJ2fV.png", alt="Una ventana Picture-in-Picture que reproduce el video del tráiler de Sintel.", width="800", height="499" %}
  <figcaption>Una ventana Picture-in-Picture creada con Document Picture-in-Picture API (<a href="https://document-picture-in-picture-api.glitch.me/">demo</a >).</figcaption>
</figure>

La ventana Picture-in-Picture en Document Picture-in-Picture API es similar a una ventana en blanco del mismo origen abierta usando `window.open()`, con algunas diferencias:

* La ventana Picture-in-Picture flota sobre otras ventanas.
* La ventana Picture-in-Picture nunca sobrevive a la ventana que la abre.
* No se puede navegar por la ventana Picture-in-Picture.
* El sitio web no puede configurar la posición de la ventana Picture-in-Picture.

El siguiente HTML configura un reproductor de video personalizado y un elemento de botón para abrir el reproductor de video en una ventana Picture-in-Picture.

```html
<div id="playerContainer">
  <div id="player">
    <video id="video"></video>
  </div>
</div>
<button id="pipButton">Open Picture-in-Picture window</button>
```

El siguiente JavaScript llama a `documentPictureInPicture.requestWindow()` cuando el usuario hace clic en el botón para abrir una ventana Picture-in-Picture en blanco. La promesa devuelta se resuelve con un objeto JavaScript de ventana Picture-in-Picture. El reproductor de video se mueve a esa ventana usando `append()`.

```js
pipButton.addEventListener('click', async () => {
  const player = document.querySelector("#player");

  // Abrir una ventana Picture-in-Picture.
  const pipWindow = await documentPictureInPicture.requestWindow();

  // Mover el reproductor a la ventana Picture-in-Picture.
  pipWindow.document.body.append(player);
});
```

Consulte [Picture in Picture para cualquier elemento](/docs/web-platform/document-picture-in-picture/) para obtener más detalles y ejemplos.

## Propiedad `notRestoredReasons`. {: #not-restored-reasons }

Los navegadores modernos proporcionan una función de optimización para la navegación del historial llamada [caché de retroceso/adelante] (https://web.dev/articles/bfcache) o bfcache. Permite una experiencia de carga instantánea cuando los usuarios regresan a una página que ya han visitado.

Mire este video de bfcache en acción para comprender la velocidad que puede aportar a las navegaciones:

{% YouTube 'cuPsdRckkF0' %}

Las páginas pueden bloquearse para que no ingresen a bfcache o pueden ser desalojadas mientras están en bfcache por diferentes razones, algunas requeridas por una especificación y otras específicas de las implementaciones del navegador.

Anteriormente, los desarrolladores no tenían forma de averiguar por qué se bloqueó el uso de bfcache en sus páginas en el campo, aunque hay una prueba en Chrome DevTools.

Para habilitar el monitoreo en el campo, la clase `PerformanceNavigationTiming` se ha ampliado para incluir una propiedad `notRestoredReasons`.

Esta devuelve un objeto que contiene información relacionada sobre todos los frames presentes en el documento:

* Detalles como el ID y el nombre del frame, para ayudar a identificarlos en el HTML.

* Si se les bloqueó el uso de bfcache.

* Motivos por los que se les bloqueó el uso de bfcache.

Esto permite a los desarrolladores tomar medidas para hacer que esas páginas sean compatibles con bfcache, mejorando así el rendimiento del sitio.

Consulte [notRestoredReasons API](/docs/web-platform/bfcache-notrestoredreasons/) para ver el ejemplo de código y averiguar los motivos por los que su sitio podría no estar usando bfcache, para que no se pierda un aumento de rendimiento.

## DevTools faltan mejoras en la depuración de hojas de estilo. {: #missing-stylesheets-debug}

DevTools obtuvo una serie de mejoras para identificar y depurar problemas con hojas de estilo faltantes.

Primero: el árbol **Fuentes > Página** ahora muestra solo las hojas de estilo implementadas y cargadas correctamente para minimizar la confusión.

Además, **Fuentes > Editor** ahora subraya y muestra información sobre herramientas de error en línea junto a declaraciones fallidas, `@import`, `url()` y `href`.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/uv386cOgFWeWnf6ItxOS.png", alt="Declaraciones subrayadas con información sobre herramientas en el panel Fuentes.", width="800", height="446" %}

- La **Consola**, además de enlaces a solicitudes fallidas, ahora proporciona enlaces a la línea exacta que hace referencia a una hoja de estilo que no se pudo cargar.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/acQGKJmqR7JtA4e9UaIq.png", alt="La Consola proporciona enlaces a las líneas exactas con declaraciones problemáticas.", width="800", height="574" %}

El **panel de red** completa constantemente la columna **Iniciador** con enlaces a la línea exacta que hace referencia a una hoja de estilo que no se pudo cargar.

El panel de **Problemas** enumera todos los problemas de carga de las hojas de estilo, incluidas las URL rotas, las solicitudes fallidas y las declaraciones `@import` fuera de lugar.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/JlcKWWo8z99LqXiHFk53.png", alt="El panel Problemas con enlaces a fuentes y solicitudes.", width="800", height="668" %}

Consulte [Novedades de DevTools](/blog/new-in-devtools-116/) para obtener todos los detalles y más información sobre DevTools en Chrome 116.

## ¡Y más! {: #más }

Por supuesto que hay mucho más.

* [Motion path](https://developer.mozilla.org/docs/Web/CSS/CSS_motion_path) permite a los autores posicionar cualquier objeto gráfico y animarlo a lo largo de una ruta especificada por el desarrollador.
* Las propiedades `display` y `content-visibility` ahora están disponibles en keyframe animations, lo que permite agregar animaciones de salida únicamente en CSS.
* La fetch API ahora se puede usar con [Bring Your Own Buffer Readers] (https://developer.mozilla.org/docs/Web/API/ReadableStreamBYOBReader), lo que reduce la sobrecarga de recolección de basura y las copias, y mejora la capacidad de respuesta. para los usuarios

## Otras lecturas

Esto cubre solo algunos aspectos destacados clave. Compruebe los enlaces a continuación para
cambios adicionales en Chrome 116.

* [Novedades de Chrome DevTools (116)](/blog/new-in-devtools-116/)
* [Desactivación y eliminación de Chrome 116](/blog/deps-rems-116/)
* [Actualizaciones de ChromeStatus.com para Chrome 116](https://chromestatus.com/features#milestone%3D116)
* [Lista de cambios del repositorio fuente de Chromium](https://chromium.googlesource.com/chromium/src/+log/115.0.5790.181..116.0.5845.87)
* [Calendario de lanzamiento de Chrome](https://chromiumdash.appspot.com/schedule)

## Suscríbete

Para mantenerse actualizado, [suscríbase](https://goo.gl/6FP1a5) al
[canal de YouTube para desarrolladores de Chrome](https://www.youtube.com/user/ChromeDevelopers/),
y recibirás una notificación por correo electrónico cada vez que lancemos un nuevo video.

Yo soy Adriana Jara, y tan pronto como se lance Chrome 117, estaré aquí para
¡Contarles qué hay de nuevo en Chrome!
