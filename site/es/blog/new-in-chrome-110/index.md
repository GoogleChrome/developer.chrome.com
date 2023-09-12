---
layout: "layouts/blog-post.njk"
title: "Qué hay de nuevo en Chrome 110"
description: >
  "¡Chrome 110 ya está llegando! Agregue un estilo personalizado a sus elementos de picture-in-picture con la nueva :picture-in-picture pseudo-class, configure el comportamiento de inicio de su aplicación web con launch_handler, use el atributo credentialless en iframes para incrustar contenido de terceros que no establezca una política de incrustación de origen cruzado y mucho más."
date: 2023-02-07
authors:
  - ajara
hero: 'image/SeARmcA1EicLXagFnVOe0ou9cqK2/jJI6JaytfRglmVkUULRm.png'
alt: >
  New in Chrome hero logo
tags:
  - new-in-chrome
  - chrome-110
---

{% YouTube id='036w1MUoAa0' %}

Esto es lo que necesita saber:

* Agregue un estilo personalizado a sus elementos de imagen en imagen con la nueva `:picture-in-picture` [pseudo-class] (#pip).
* Configure el comportamiento de inicio de su aplicación web con [launch_handler](#launch-handler) en su manifest.
* use el [atributo `credentialless`](#credentialless) en iframes para incrustar contenido de terceros que no establece una política de incrustación de origen cruzado
* Y hay mucho [más](#más).

Soy Adriana Jara. Veamos qué hay de nuevo para los desarrolladores en Chrome 110.


## pseudo-clase :picture-in-picture. {:#pip}
Con la [Picture in Picture API](https://developer.mozilla.org/docs/Web/API/Picture-in-Picture_API), los sitios web pueden crear una ventana de video flotante, siempre en la parte superior para que los usuarios continúen consumiendo videos, mientras interactúan con otro contenido.

Ahora con la pseudo-clase de CSS [`:picture-in- picture`](https://developer.mozilla.org/docs/Web/CSS/:picture-in-picture) puede agregar estilos a los elementos para mejorar estas experiencias.

El fragmento a continuación muestra cómo usar la clase de :picture-in-picture para agregar un mensaje al contenedor de video que le recuerda al usuario que el video ahora se está reproduciendo en otro lugar.

```css
#video-container:has(video:picture-in-picture)::before {
  bottom: 36px;
  color: #ddd;
  content: 'Video is now playing in a Picture-in-Picture window';
  position: absolute;
  right: 36px;
}
```

Usamos la pseudo-clase de nuevo en el elemento de video, para hacer que el elemento sea transparente para mostrar el mensaje correctamente.

Juega con [el ejemplo](https://googlechrome.github.io/samples/picture-in-picture/) y mejora tus experiencias de video de imagen en imagen.

## Miembro del Manifiest launch_handler.{:#launch-handler }

La [Launch Handler API](/docs/web-platform/launch-handler/) le permite controlar cómo se inicia su aplicación web Por ejemplo, si utiliza una ventana existente o una nueva, y si la ventana elegida navega a la URL de inicio.

Veamos un ejemplo: en entornos de escritorio, si instalas una aplicación y luego la visitas en el navegador, hay un botón para pasar a la ventana de la aplicación independiente.
Previamente, el único comportamiento posible era iniciar la aplicación en una nueva ventana.

Ahora, usando el [miembro `launch_handler` del manifest](/docs/web-platform/launch-handler/#the-launch_handler-manifest-member) las aplicaciones web pueden personalizar su comportamiento de lanzamiento.

Por ejemplo, el fragmento a continuación hace que todos los inicios de esta aplicación web se centren en una ventana de aplicación existente y naveguen hasta ella (si existe) en lugar de abrir siempre una nueva ventana.

```json
{
 "launch_handler": {
   "client_mode": "navegar-nuevo"
 }
}

```


## `credentialless` iframes.{:#credentialless }
Uno de los mayores desafíos con el aislamiento de origen cruzado es que todos los iframes de origen cruzado deben implementar [COEP](https://developer.mozilla.org/docs/Web/HTTP/Headers/Cross-Origin-Embedder-Policy) y [CORP](https://developer.mozilla.org/docs/Web/HTTP/Headers/Cross-Origin-Resource-Policy). Un iframe sin esos encabezados no serán cargados por el navegador.

El atributo `credentialless` ayuda a insertar iframes de terceros que no configuran estos encabezados.

Con `credentialless`, el iframe se carga desde un contexto diferente y vacío. En particular, se carga sin cookies. El iframe comienza con un cookie jar vacío.

Asimismo, las API de almacenamiento, como LocalStorage, CacheStorage, etc., cargan y almacenan datos en la nueva partición efímera. Todo este almacenamiento se borra una vez que se descarga el documento de nivel superior. Esto permite eliminar la restricción COEP.

Encuentre más información en [este artículo](/blog/iframe-credentialless/) para usar de forma segura `credentialless` para cargar contenido de terceros en sus iframes.

## ¡Y más! {: #más }

Ay, por supuesto, hay mucho más.

Web SQL ahora se elimina en contextos no seguros.

La propiedad de CSS [`initial-letter`](https://developer.mozilla.org/docs/Web/CSS/initial-letter) proporciona una manera de establecer el número de líneas en las que debe hundirse una letra inicial en las siguientes líneas de texto

FileSystemHandle ahora incluye un [método `remove()`](https://developer.mozilla.org/docs/Web/API/FileSystemHandle/remove)

## Lectura adicional

Esto cubre sólo algunos aspectos destacados. Compruebe los enlaces a continuación para cambios adicionales en Chrome 110.

* [Novedades de Chrome DevTools (110)](/blog/new-in-devtools-110/)
* [Desactivación y eliminación en Chrome 110](/blog/deps-rems-110/)
* [Actualizaciones de ChromeStatus.com para Chrome 110](https://www.chromestatus.com/features#milestone%3D108)
*[Lista de cambios del repositorio fuente de Chromium](https://chromium.googlesource.com/chromium/src/+log/109.0.5414.128..110.0.5481.9)
* [Calendario de lanzamiento de Chrome](https://chromiumdash.appspot.com/schedule)

## Suscríbete

Para mantenerse actualizado, [suscríbase](https://goo.gl/6FP1a5) al
[canal de YouTube para desarrolladores de Chrome](https://www.youtube.com/user/ChromeDevelopers/),
y recibirás una notificación por correo electrónico cada vez que lancemos un nuevo video.

Soy Adriana Jara, y tan pronto como se lance Chrome 111, estaré aquí para
¡Contarles qué hay de nuevo en Chrome!
