---
layout: 'layouts/doc-post.njk'
title: Glosario de Privacy Sandbox
subhead: Los artículos y la documentación de Privacy Sandbox asumen que se tiene cierto conocimiento sobre los conceptos relacionados con la privacidad, la publicidad y el desarrollo web. En este glosario se explican los términos clave.
description: Explicaciones sencillas de conceptos clave.
date: 2021-05-18
updated: 2021-05-18
authors:
  - samdutton
---

{% Aside %}

[¡Háganos saber](https://github.com/GoogleChrome/developer.chrome.com/issues/new?assignees=&labels=feature+request&template=feature_request.md&title=) si omitimos algo!

{% endAside %}

## Plataforma publicitaria (AdTech) {: #adtech }

Es una empresa que brinda sus servicios para enviar anuncios.

## Anunciante {: #advertiser }

Es una empresa que paga por anunciar sus productos.

## Atribución {: #attribution }

Es una identificación de las acciones que realiza el usuario y que contribuyen a un resultado. Por ejemplo: La correlación entre el número de clics o las vistas a un anuncio con las [conversiones](#conversion).

## Blink {: #blink }

Es el [motor de renderizado](https://en.wikipedia.org/wiki/Browser_engine) que se utiliza en Chrome, y el cual se desarrolló como parte del proyecto [Chromium.](#chromium)

## Chromium {: #chromium }

Es un proyecto de código abierto para el navegador web. Chrome, Microsoft Edge, Opera y otros navegadores se basan en Chromium.

## Tasa de clics (CTR) {: #ctr }

Es la proporción de usuarios que hacen clic en un anuncio después de haberlo visto. (Ver también [Impresión](#impression)).

## Conversión de clics (CTC) {: #ctc }

Es una conversión que se atribuye a un anuncio en el cual "se hizo clic".

## Conversión

Es la culminación de algún objetivo que se deseaba tras la acción de un usuario. Por ejemplo, la compra de un producto o la suscripción a un boletín informativo después de hacer clic en un anuncio que está vinculado con el sitio del anunciante.

## Cookies

El sitio web puede pedirle a un navegador web que almacene una pequeña parte de información textual (llamada cookie) en la computadora del usuario. Los sitios web pueden utilizar cookies para guardar la información de un usuario (o una referencia a los datos que se almacenaron en los servidores backend del sitio web) conforme el usuario se desplaza por la web. Por ejemplo: una tienda en línea puede conservar la información del carrito de compras incluso si el usuario no inició sesión, o el sitio puede registrar la actividad de navegación del usuario en su sitio. También consulte [Cookie de origen](#first-party-cookie) y [Cookie de terceros](#third-party-cookie).

## Privacidad diferencial {: #diferencial-privacy }

Técnicas para permitir el intercambio de información sobre un conjunto de datos, y cuya finalidad es poner en evidencia patrones de comportamiento sin revelar información privada sobre los individuos o si estos pertenecen a dicho conjunto de datos.

## Dominio

Consulte los repositorios [Dominio de nivel superior](#tld) y [eTLD](#etld).

## eTLD, eTLD+1 {: #etld }

**Los dominios de nivel superior efectivos** se definen mediante la [Lista de sufijos públicos](https://publicsuffix.org/list/). Por ejemplo:

```text
co.uk
github.io
glitch.me
```

Los TLD efectivos son aquellos que permiten que foo.appspot.com sea un sitio diferente de bar.appspot.com. En este caso, el dominio de nivel superior efectivo (**eTLD**) es appspot.com, y el nombre completo del **sitio** (foo.appspot.com, bar.appspot.com) es conocido como **eTLD+1**.

Consulte también el repositorio [Dominio de nivel superior](#tld).

## Entropía

Es una medida del grado en que un dato revela la identidad personal.

La entropía de los datos se mide en bits. Entre más revelan los datos la identidad, mayor es su valor de entropía.

Los datos pueden combinarse para identificar a un individuo, aunque podría ser difícil determinar si los nuevos datos aumentan la entropía. Por ejemplo, saber que una persona es de Australia no reduce la entropía si ya se sabe que la persona es de Kangaroo Island.

## Identidad federada (también conocida como inicio de sesión federado)

Una plataforma de terceros para permitir que un usuario inicie sesión en un sitio web, sin requerir que el sitio implemente su propio servicio de identidad.

## Toma de huellas digitales {: #fingerprinting }

Técnicas para identificar y rastrear el comportamiento de usuarios individuales. La toma de huellas dactilares utiliza mecanismos que los usuarios no conocen y que no pueden controlar. Sitios como [Panopticlick](https://panopticlick.eff.org) y [amiunique.org](https://amiunique.org/) muestran cómo se pueden combinar los datos de huellas digitales para identificarlo como individuo.

## Superficie para huellas dactilares {: #fingerprinting-surface }

Es algo que pueda usarse (probablemente en combinación con otras superficies) para identificar a un usuario o dispositivo en particular. Por ejemplo, el método de JavaScript `navigator.userAgent()` y el encabezado de la solicitud HTTP `User-Agent` brindan acceso a una superficie para huellas dactilares (la cadena user agent).

## Origen {: #first-party }

Son los recursos del sitio que está visitando. Por ejemplo, la página que lee está en el sitio developer.chrome.com e incluye los recursos que se solicitaron de ese sitio. Las solicitudes de esos recursos de origen se denominan "solicitudes de origen" y las [cookies](#cookie) que provienen de developer.chrome.com y se almacenan mientras visita este sitio se denominan [cookies de origen](#first-party-cookie). Consulte también [Terceros](#third-party).

## Cookie de origen {: #first-party-cookie }

Es la [cookie](#cookie) que se almacena por un sitio web mientras el usuario está en el mismo sitio. Por ejemplo: una tienda en línea puede pedirle al navegador que almacene una cookie a fin de conservar la información del carrito de compras para un usuario que no inició sesión. Consulte también [Cookies de terceros](#third-party-cookie).

## Impresión {: #impression }

- Es el número de visualizaciones de un anuncio (consulte también [Tasa de clics](#ctr)).
- Un espacio publicitario: es un rectángulo vacío en una página web donde se puede mostrar un anuncio. Los espacios publicitarios conforman un [inventario](#inventory).

## Inventario {: #inventory }

Son los espacios publicitarios que están disponibles en un sitio: los rectángulos vacíos donde se pueden mostrar los anuncios.

## k-anonimato

Es una medida de anonimato dentro de un conjunto de datos. Si tiene la medida *k*-anonimato, no podrá distinguirse de *k-1* otras personas en el conjunto de datos. En otras palabras, *k* individuos tienen la misma información (incluyéndolo a usted).

## Nonce

Es un número arbitrario que se utiliza una sola vez en la comunicación criptográfica.

## Origen

Se refiere al origen de una solicitud, incluido el esquema y el nombre del servidor, pero sin información sobre la ruta. Por ejemplo: `https://developer.chrome.com`

## Prueba de origen {: #origin-trial }

Las pruebas de origen brindan acceso a una función nueva o experimental, esto con el fin de crear funciones que los usuarios pueden probar durante un tiempo limitado antes de que la función esté disponible para todos. Cuando Chrome ofrece una prueba de origen para una función, [es posible registrar un origen](#origin) para la prueba a fin de habilitar la función para todos los usuarios en ese origen, sin requerir que los usuarios cambien ninguna marca o cambien a una versión alternativa de Chrome (aunque es posible que necesiten hacerlo). potenciar). Las pruebas de origen permiten a los desarrolladores crear demostraciones y prototipos utilizando nuevas funciones. Estas pruebas también ayudan a los ingenieros de Chrome a comprender cómo se utilizan las nuevas funciones y cómo pueden interactuar con otras tecnologías web. Para obtener más información, consulta: [Introducción a las pruebas de origen de Chrome](https://web.dev/origin-trials/).

## Superficie pasiva {: #passive-surface }

Algunas de las superficies para huellas digitales, como las cadenas user agent, las direcciones IP y los encabezados accept-language, están disponibles para todos los sitios web, independientemente de que el sitio las solicite o no. Eso significa que las superficies pasivas pueden consumir fácilmente los recursos para la privacidad de un sitio.

La iniciativa Privacy Sandbox propone reemplazar las superficies pasivas con formas activas de obtener información específica, por ejemplo, usando Client Hints una sola vez para obtener el idioma del usuario en vez de tener un encabezado accept-language para cada respuesta que se envía a cada servidor.

## Editor

En el contexto de Privacy Sandbox, es un sitio que muestra anuncios.

## Alcance

Consiste en el número total de personas que ven un anuncio (o quienes visitan la página web que muestra el anuncio).

## Remarketing

Su objetivo es llegar a personas en otros sitios que visitaron previamente su sitio. Por ejemplo, una tienda en línea podría mostrar anuncios para una venta de juguetes a las personas que antes vieron juguetes en ese sitio.

## Sitio

Consulte los repositorios [Dominio de nivel superior](#tld) y [eTLD](#etld).

## Superficie

Consulte [Superficie para huellas dactilares](#fingerprinting-surface) y [Superficie pasiva](#passive-surface).

## Terceros {: #third-party }

Son los recursos que se proporcionan desde un dominio diferente al del sitio web que se está visitando. Por ejemplo, el sitio web foo.com podría usar código analítico de google-analytics.com (a través de JavaScript), fuentes de use.typekit.net (mediante un elemento de enlace) y un video de vimeo.com (en un iframe). Consulte también [Origen](#first-party).

## Cookie de terceros {: #third-party-cookie }

Es la [cookie](#cookie) que se almacena por un servicio de terceros. Por ejemplo, un sitio web de videos puede incluir el botón **Ver más tarde** en el reproductor incorporado, esto con la finalidad de permitir que un usuario agregue un video a su lista de deseos sin forzarlo a navegar en el sitio de videos. Consulte también [Cookie de origen](#first-party-cookie).

## Dominio de nivel superior (TLD) {: #tld }

Los dominios de nivel superior como .com y .org se incluyen en la [Root Zone Database](https://www.iana.org/domains/root/db).

Tenga en cuenta que algunos "sitios" en realidad únicamente son subdominios. Por ejemplo, translate.google.com y maps.google.com solo son subdominios de google.com (que es el [eTLD + 1](#etld)).

## .well-known

Puede ser útil agregar redireccionamientos a un sitio web desde URL estandarizadas. Por ejemplo, los administradores de contraseñas pueden facilitar a los usuarios la actualización de contraseñas si un sitio web establece una redirección desde `/.well-known/change-password` a la página que se utiliza para cambiar las contraseñas del sitio. Además, podría ser conveniente tener acceso a las políticas u otro tipo de información sobre un host *antes* de realizar una solicitud. Por ejemplo, robots.txt le dice a los rastreadores web cuáles son las páginas que deben visitar y cuáles deben ignorar. En IETF [RFC8615](https://tools.ietf.org/html/rfc8615) se describe una forma estandarizada para hacer que los metadatos de todo el sitio sean accesibles en las ubicaciones estándar de un subdirectorio /.well-known/. Puede consultar una lista de ellos en [iana.org/assignments/well-known-uris/well-known-uris.xhtml](https://www.iana.org/assignments/well-known-uris/well-known-uris.xhtml).
