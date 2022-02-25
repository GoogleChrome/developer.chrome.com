---
layout: 'layouts/doc-post.njk'
title: FLEDGE
subhead: Una solución para casos de uso de remarketing, diseñada para que no pueda utilizarse por terceros para rastrear el comportamiento de navegación de los usuarios en distintos sitios.
description: FLEDGE satisface los casos de uso de remarketing, pero está diseñada para que no pueda utilizarse por terceros para rastrear el comportamiento de navegación de los usuarios en distintos sitios. La API permite que el navegador realice "subastas" en el dispositivo para elegir los anuncios relevantes proporcionados por los sitios web que el usuario haya visitado anteriormente.
date: 2021-05-18
updated: 2021-05-18
authors:
  - samdutton
---

<!--lint disable no-smart-quotes-->

## Estado de la implementación

- Se está examinando la [propuesta de la API](https://github.com/WICG/turtledove/blob/master/FLEDGE.md) con [WICG](https://www.w3.org/community/wicg/) y los grupos de interés.
- [Intención de crear prototipos](https://groups.google.com/a/chromium.org/g/blink-dev/c/w9hm8eQCmNI) en [Blink](https://www.chromium.org/blink).

{% Aside %}
FLEDGE es un descendiente de [TURTLEDOVE](https://github.com/WICG/turtledove).
{% endAside %}

## ¿Por qué necesitamos a FLEDGE?

Entender los intereses del usuario puede permitir que los anuncios sean más relevantes, a diferencia simplemente de elegir anuncios basados en el contenido del sitio (selección contextual) o utilizando la información que el usuario proporcionó al sitio en el que aparece el anuncio (selección a partir de los datos de origen). Tradicionalmente, las plataformas publicitarias conocen los intereses de los usuarios mediante el seguimiento de su comportamiento en los distintos sitios. Necesitamos una forma de presentar anuncios relevantes a los usuarios sin la necesidad de efectuar un seguimiento entre diversos sitios.

FLEDGE satisface los casos de uso de [remarketing](/privacy-sandbox/glossary/#remarketing), pero está diseñada para que no pueda utilizarse por terceros para rastrear el comportamiento de navegación de los usuarios. La API permite que el navegador realice "subastas" en el dispositivo para elegir los anuncios relevantes proporcionados por los sitios web que el usuario haya visitado anteriormente.

Con FLEDGE:

- El navegador del usuario, y no el anunciante o la plataforma de tecnología publicitaria, almacena los grupos de interés definidos por el anunciante a los que está asociado el navegador del usuario.
- El navegador del usuario combina los datos del grupo de interés con los datos del comprador/vendedor de anuncios y la lógica comercial para realizar una "subasta" para seleccionar un anuncio. Esta subasta de anuncios se realiza se realiza de forma local en el dispositivo del usuario, en vez de compartir los datos con un tercero.
- Se pueden seleccionar anuncios para un grupo de interés, pero un anunciante no puede combinar los datos del grupo de interés con otra información sobre un usuario, en particular, la identidad de una persona o las páginas que visita. Un anunciante no puede saber cuáles son las páginas que consulta el usuario en el sitio de un editor.
- Los sitios web y las redes publicitarias utilizadas por esos sitios no pueden conocer los intereses publicitarios o los grupos de interés de sus visitantes: la selección de anuncios se realiza en el navegador del usuario.

En otras palabras, FLEDGE mantiene privados sus intereses y su actividad de navegación. Por ejemplo, si visita una zapatería en línea y muestra interés por el calzado deportivo, y luego visita un sitio de noticias que muestra anuncios (un editor), el anunciante (la zapatería) no se entera de las páginas que está viendo en el sitio de noticias y el editor (el sitio de noticias) no conoce su interés por el calzado deportivo.

## ¿Cómo funciona FLEDGE?

Cuando un usuario visita la página de un sitio en la que desea anunciar sus productos o servicios (un anunciante), el sitio puede solicitar al navegador del usuario que lo asocie con grupos de interés específicos durante un periodo de tiempo determinado (por ejemplo, 30 días).

El grupo de interés podría ser exclusivo del sitio web del anunciante, de modo que funcione como una lista de remarketing. Otra posibilidad es que varios sitios web se pongan de acuerdo para asignar usuarios al mismo grupo de interés, por ejemplo, si los sitios están asociados o pertenecen a la misma red publicitaria. Periódicamente, el navegador del usuario obtiene anuncios designados para grupos de interés, junto con un código que proporciona instrucciones de los anunciantes sobre cuándo un anuncio asociado a un grupo de interés debe tener derecho a participar en una subasta en el dispositivo, por ejemplo, solo en el inventario con anuncios cerca de la parte superior de la página. Cuando el usuario visita el sitio de un editor que está configurado para aceptar anuncios mediante la API FLEDGE y para mostrar anuncios de una red publicitaria utilizada por un sitio del anunciante que el usuario visitó anteriormente, el código de la red publicitaria en la página solicita al navegador que se ejecute un código de "subasta" para seleccionar un anuncio. Se muestra el anuncio "ganador".

1. Un usuario visita una página de un sitio en el que desea anunciar sus productos, como una tienda en línea.
2. El sitio web del anunciante (o la tecnología publicitaria que utiliza) solicita al navegador del usuario que se una a un "grupo de interés" publicitario llamando a joinAdInterestGroup(), y le proporciona los datos que incluyen anuncios relevantes para la navegación del usuario, el nombre de host de la plataforma publicitaria y las URL necesarias para acceder a la lógica y las señales de participación en una subasta.
3. El usuario visita un sitio, por ejemplo un editor de noticias, que muestra anuncios y está configurado para aceptar anuncios seleccionados mediante FLEDGE.
4. El navegador del usuario realiza una "subasta" para elegir un anuncio para el inventario (espacios publicitarios) que puede aceptar anuncios seleccionados por FLEDGE. El "vendedor" en esta subasta puede ser el propio sitio o un tercero que actúe en su nombre, como una plataforma de ofertas. Los "compradores" son terceros que participan en una subasta mediante el inventario de publicidad del sitio, como las plataformas de demanda que actúan en nombre de los anunciantes. El vendedor en esta subasta de anuncios tiene tres tareas:<br> • Elegir cuáles son los compradores que pueden participar.<br> • Elegir cuál es la oferta más deseable, basándose en el precio y los metadatos de cada oferta.<br> • Informar el resultado de la subasta.<br>
5. El vendedor inicia la subasta de anuncios llamando a runAdAuction(), con datos que incluyen el nombre del host del vendedor, señales de los compradores y del vendedor, y una URL para la decisión lógica de la subasta.
6. La subasta devuelve datos sobre el anuncio ganador. El sitio del editor no puede acceder a los datos, excepto para mostrar el anuncio en un frame cerrado.
7. Se muestra el anuncio.

---

## Participe y comparta sus comentarios

- **GitHub**: lea la [propuesta](https://github.com/WICG/turtledove/blob/master/FLEDGE.md), [realice preguntas y siga la discusión](https://github.com/WICG/turtledove/issues).
- **W3C**: discuta los casos de uso en la industria con el [grupo Improving Web Advertising Business](https://www.w3.org/community/web-adv/participants).
- **Soporte para desarrolladores**: haga preguntas y únase a las discusiones en el [repositorio de soporte para desarrolladores de Privacy Sandbox](https://github.com/GoogleChromeLabs/privacy-sandbox-dev-support).

## Obtener más información

- [Explicación técnica sobre la API de FLEDGE](https://github.com/WICG/turtledove/blob/master/FLEDGE.md)
- [Conociendo a detalle la iniciativa de Google, Privacy Sandbox](https://web.dev/digging-into-the-privacy-sandbox)
