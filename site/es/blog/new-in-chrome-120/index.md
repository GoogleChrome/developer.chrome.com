---
title: Nuevo en Chrome 120
description: >
   ¡Chrome 120 ya está disponible!Con la API CloseWatcher para permitir una experiencia consistente al manejar solicitudes de cierre, una implementación fácil de un patrón de acordeón usando el elemento details, los informes de violación de la política de permisos ya están disponibles y hay mucho más.
layout: 'layouts/blog-post.njk'
date: 2023-12-05
authors:
  - ajara
hero: 'image/SeARmcA1EicLXagFnVOe0ou9cqK2/x1r942xIGh8P7YqRffrj.png'
alt: >
  New in Chrome hero logo
tags:
  - new-in-chrome
  - chrome-120
---

{% YouTube id='oqCsXbsuvM0' %}

Esto es lo que necesitas saber:

* La [API CloseWatcher](#close-watcher) permite una experiencia consistente al manejar solicitudes de cierre.
* Implemente fácilmente un patrón de acordeón usando el [`<details>` elemento](#details-name).
* Los [informes de infracción de la política de permisos](#policy-violation-reports) ya están disponibles.
* Y hay mucho [más](#more).

Yo soy Adriana Jara. Profundicemos y veamos las novedades para los desarrolladores en Chrome 120.

## API CloseWatcher. {: #close-watcher}

Una característica importante de los componentes modal o popover es que son fáciles de cerrar, con un mecanismo consistente para hacerlo. Esos mecanismos se denominan solicitudes de cierre y suelen ser los `ESC` en plataformas de escritorio y el gesto o botón atrás en Android.

Los desarrolladores web no tenían una buena manera de manejar solicitudes cercanas de sus propios componentes. Esto es especialmente problemático en dispositivos Android, donde proporcionar un comportamiento de cierre simple para el gesto hacia atrás es bastante complejo.

Chrome 120 trae la solución con CloseWatcher, una nueva API para escuchar y responder directamente a solicitudes de cierre. También incluye actualizaciones de [`<dialog>`](https://developer.mozilla.org/docs/Web/HTML/Element/dialog) y [`popover=""`](https://developer.mozilla .org/docs/Web/API/Popover_API) para utilizar la nueva funcionalidad de solicitud de cierre, para que respondan al botón Atrás de Android.

Consulta [la demostración de la API CloseWatcher](https://close-watcher-demo.glitch.me/) para probar la API.

## Atributo name para `<details>` {: #details-name }

El atributo `name` para [`<details>`](https://developer.mozilla.org/docs/Web/HTML/Element/details) facilita la implementación del patrón de acordeón utilizando una secuencia de elementos HTML `<details>`.

Múltiples elementos `<details>` que tienen el mismo atributo `name`  forman un grupo. Con esta configuración se puede abrir como máximo un elemento de ese grupo a la vez.

A continuación se muestra un ejemplo con un grupo que comparte el nombre "cookies":

```html
<details>
  <summary>Chispas de chocolate</summary>
  Yum yum chispas de chocolate.
</details>
<details>
  <summary>Snickerdoodle</summary>
   Yum yum snickerdoodle.
</details>
<details>
  <summary>Maicenitas</summary>
   Yum yum Maicenitas
</details>
<details>
  <summary>Galletas de azúcar</summary>
   Yum yum galletas de azúcar
</details>
```

## Informes de violación de la política de permisos {: #policy-violation-reports }

Los informes de infracción de políticas de permisos ahora están disponibles; estos informes integran el [API de política de permisos](https://developer.mozilla.org/docs/Web/HTTP/Permissions_Policy) que permite a los desarrolladores controlar las funciones del navegador disponibles para una página, sus iframes,y subrecursos, declarando un conjunto de políticas para que el navegador las aplique con el [API de informes](https://developer.mozilla.org/docs/Web/API/Reporting_API). La API de informes proporciona un mecanismo de generación de informes genérico que las aplicaciones web pueden utilizar para hacer que los informes estén disponibles en función de varias características de la plataforma.

Esta integración de la API de política de permisos y la API de informes permite a los desarrolladores web configurar endpoints  a los que se enviarán informes de violación de la política de permisos, lo que permite a los propietarios de sitios ver cuándo se solicitan funciones no permitidas para sus páginas en vivo.

[Controlar las funciones del navegador con la Política de permisos](/articles/permissions-policy/) incluye más detalles de implementación.


## ¡Y más! {: #more }

Por supuesto que hay mucho más.

* El [implementación relajada de anidamiento de CSS](/blog/css-nesting-relaxed-syntax-update/) permite que las reglas de estilo anidadas comiencen con un elemento, en lugar de estar envueltas con `is()` o requerir un signo `&` delante.

* Con la acción [`enterpictureinpicture`](https://developer.mozilla.org/docs/Web/API/HTMLVideoElement/enterpictureinpicture_event) en la API de sesión de medios, los sitios web pueden registrar un controlador de acciones que se puede utilizar para abrir una ventana Imagen en imagen o Imagen en imagen de documento.

* Y un recordatorio de que Chrome está trabajando para desaprobar las cookies de terceros. En enero comienza un experimento que podría afectar su sitio web,por lo que es importante que consultes [Preparación para el fin de las cookies de terceros](/blog/cookie-countdown-2023oct/) para conocer los pasos de auditoría y mitigación.

## Otras lecturas

Esto cubre sólo algunos aspectos destacados clave. Consulte los enlaces a continuación para
Cambios adicionales en Chrome 120.

* [Novedades de Chrome DevTools (120)](/blog/new-in-devtools-120/)
* [Desuso y eliminaciones de Chrome 120](/blog/deps-rems-120/)
* [Actualizaciones de ChromeStatus.com para Chrome 120](https://chromestatus.com/features#milestone%3D120)
* [Lista de cambios del repositorio fuente de Chromium](https://chromium.googlesource.com/chromium/src/+log/119.0.6045.203..120.0.6099.63)
* [Calendario de lanzamientos de Chrome](https://chromiumdash.appspot.com/schedule)

## Suscríbete

Para mantenerse actualizado, [suscríbase](https://goo.gl/6FP1a5) al
[Canal de YouTube para desarrolladores de Chrome](https://www.youtube.com/user/ChromeDevelopers/),
y recibirás una notificación por correo electrónico cada vez que lancemos un nuevo vídeo.

Yo soy Adriana Jara, nuestro equipo te desea felices fiestas y tan pronto como se lance Chrome 121, estaré aquí para contarte las novedades de Chrome.
