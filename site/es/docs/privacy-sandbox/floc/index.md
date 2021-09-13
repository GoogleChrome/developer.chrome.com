---
layout: 'layouts/doc-post.njk'
title: FLoC
subhead: Permita que los sitios adivinen sus intereses sin que puedan identificarlo de manera única.
description: FLoC permite la publicidad basada en intereses de una manera que preserva la privacidad. A medida que un usuario se mueve por la web, su navegador se asigna a una "cohorte de intereses" junto con la de miles de personas que tienen un historial de navegación similar. Esto se hace sin compartir el historial de navegación personal con el proveedor del navegador o con cualquier otra persona.
date: 2021-05-18
updated: 2021-08-18
authors:
  - samdutton
---

## Estado de la implementación

- Initial [origin trial](https://web.dev/origin-trials) now closed.
- [Demostración](https://floc.glitch.me).
- [Intent to Experiment](https://groups.google.com/a/chromium.org/g/blink-dev/c/MmijXrmwrJs) en [Blink](https://www.chromium.org/blink).

## ¿Por qué necesitamos a FLoC?

A muchas personas les preocupan las implicaciones relacionadas con la privacidad de la publicidad personalizada, que actualmente se basa en técnicas como las cookies de seguimiento y la toma de huellas dactilares del dispositivo, las cuales pueden revelar su historial de navegación a través de los sitios web a los anunciantes o plataformas publicitarias. La propuesta de FLoC tiene como objetivo permitir la selección de anuncios de una manera que proteja mejor la privacidad.

## ¿Cuál es la propuesta de FLoC?

FLoC proporciona un mecanismo para seleccionar anuncios y otros tipos de contenido basado en los intereses, que permite preservar la privacidad.

A medida que un usuario se mueve por la web, su navegador utiliza el algoritmo de FLoC para calcular su "cohorte de intereses", que será la misma para miles de navegadores con un historial de navegación reciente similar. El navegador recalcula su cohorte periódicamente, en el dispositivo del usuario, sin compartir los datos de navegación personales con el proveedor del navegador o con cualquier otra persona.

Los anunciantes (sitios que pagan por anunciar sus productos) pueden incluir código en sus propios sitios web para recopilar y proporcionar información de la cohorte a sus plataformas de tecnología publicitaria (empresas que proporcionan software y herramientas para enviar publicidad). Por ejemplo, una plataforma de tecnología publicitaria podría aprender de una tienda de zapatos en línea que los navegadores de las cohortes 1101 y 1354 parecen interesados en el equipo de senderismo que hay en la tienda. A partir de otros anunciantes, la plataforma de tecnología publicitaria se entera de otros intereses de esas cohortes.

Posteriormente, la plataforma publicitaria puede usar estos datos para seleccionar los anuncios que sean relevantes cuando el navegador de alguna de esas cohortes visite la página de un sitio que muestre anuncios, como un sitio web de noticias.

## ¿Para qué se puede utilizar FLoC?

- Mostrar anuncios a personas cuyos navegadores pertenecen a una cohorte que se ha observado visita con frecuencia el sitio web de un anunciante o tiene interés en temas importantes.
- Utilizar modelos de aprendizaje automático para predecir la probabilidad de que un usuario se convierta en función de su cohorte, con el fin de informar sobre el comportamiento de las ofertas en las subastas de anuncios.
- Recomendar contenido a los usuarios. Por ejemplo, supongamos que un sitio de noticias observa que su página de podcasts deportivos se ha vuelto especialmente popular entre los visitantes de las cohortes 1234 y 14159. De esta forma, ellos pueden recomendar ese contenido a otros visitantes de esas cohortes.

## ¿Cómo funciona FLoC?

[¿Qué es FLoC?](https://web.dev/floc/#how-does-floc-work) proporciona una explicación simple, paso a paso, de cómo funciona FloC.

En el siguiente diagrama se muestra un ejemplo sobre las diferentes funciones implicadas en la selección y publicación de un anuncio relevante mediante el uso de FLoC.

{% Img src="image/80mq7dk16vVEg8BBhsVe42n6zn82/oH6SuZegrVJMbkTsl9mq.png", alt="Diagrama en el que se muestran, paso a paso, las diferentes funciones implicadas en la selección y publicación de un anuncio relevante mediante el uso de FLoC: el servicio de FLoC, navegador, anunciantes, editor (para analizar las cohortes), tecnología para hacer anuncios, publicista (para mostrar los anuncios)", width="800", height="359" %}

---

## Participe y comparta sus comentarios

- **GitHub**: lea la [propuesta](https://github.com/WICG/floc), [realice preguntas y siga la discusión](https://github.com/WICG/floc/issues).
- **W3C**: discuta los casos de uso en la industria con el [grupo Improving Web Advertising Business](https://www.w3.org/community/web-adv/participants).
- **Soporte para desarrolladores**: haga preguntas y únase a las discusiones en el [repositorio de soporte para desarrolladores de Privacy Sandbox](https://github.com/GoogleChromeLabs/privacy-sandbox-dev-support).

## Obtener más información

- [¿Qué es FLoC?](https://www.web.dev)
- [Explicación técnica sobre la API de FLoC](https://github.com/WICG/floc)
- [Conociendo a detalle la iniciativa de Google, Privacy Sandbox](https://web.dev/digging-into-the-privacy-sandbox)
