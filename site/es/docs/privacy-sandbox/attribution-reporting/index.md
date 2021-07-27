---
layout: layouts / doc-post.njk
title: Informes de atribución
subhead: |2

  Mida cuándo la acción del usuario (como un clic en un anuncio o una vista) genera una conversión, sin utilizar identificadores de sitios cruzados.
description: |2

  La API de informes de atribución permite medir cuándo la acción del usuario (como un clic en un anuncio o una vista) conduce a una conversión, sin utilizar identificadores entre sitios.
date: '2021-05-18'
updated: '2021-05-18'
authors:
  - maudn
  - samdutton
---

{% Aparte de 'precaución'%} La API de informes de atribución se conocía anteriormente como API de medición de conversiones. {% endAside%}

## Estado de implementación

- Una primera implementación de esta API está disponible en una [prueba de origen](https://web.dev/origin-trials/) , desde Chrome 86 a 91. [Regístrese para esta prueba de origen](https://developer.chrome.com/origintrials/#/view_trial/3411476717733150721) o [vea la demostración para la primera implementación de esta API](https://goo.gle/demo-event-level-conversion-measurement-api) . Esta primera implementación solo admite la medición de clics, pero las implementaciones futuras admitirán más funciones.
- Después de Chrome 91, estará disponible otra prueba de origen para la próxima iteración de esta API.
- [Estado de la plataforma Chrome](https://www.chromestatus.com/feature/6412002824028160)

## Glosario

{% Aside%} También puede consultar el [glosario completo de la zona de pruebas de privacidad](/docs/privacy-sandbox/glossary/) . {% endAside%}

- **Plataformas de Adtech** : empresas que proporcionan software y herramientas para permitir que las marcas o agencias orienten, entreguen y analicen su publicidad digital.
- **Anunciantes** : empresas que pagan por publicidad.
- **Editores** : empresas que muestran anuncios en sus sitios web.
- **Conversión de clic** : conversión que se atribuye a un clic en un anuncio.
- **Conversión** posimpresión: conversión que se atribuye a una impresión de anuncio (si el usuario no interactúa con el anuncio, luego convierte).

## Quién necesita conocer esta API: plataformas de adtech, anunciantes y editores

- **Es probable que las plataformas de Adtech** , como **[las plataformas del lado de la demanda,](https://en.wikipedia.org/wiki/Demand-side_platform)** estén interesadas en utilizar esta API para admitir la funcionalidad que actualmente se basa en cookies de terceros.
- **Los anunciantes y editores que se basan en un código personalizado para la medición de la atribución de conversiones o publicidad** pueden estar igualmente interesados en utilizar esta API para reemplazar las técnicas existentes.
- **Los anunciantes y editores que dependen de las plataformas de adtech para la medición de la publicidad o la conversión** no necesitan usar la API directamente, pero la [justificación de esta API](#why-is-this-api-needed) puede ser de interés, especialmente si trabaja con plataformas de adtech que pueden integrar la API.

{% Aside%} Puede haber casos de uso que no estén relacionados con los anuncios. [¡Participe](#engage) para compartir su caso de uso! {% endAside%}

## ¿Por qué se necesita esta API? {: # why-is-this-api-need}

Para medir la eficacia de las campañas publicitarias, los anunciantes y los editores deben saber cuándo un clic en un anuncio o una vista genera una conversión, como una compra o un registro. Hoy en día, la medición de la atribución de conversiones de anuncios a menudo se basa en [cookies de terceros](https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies#Third-party_cookies) . **Pero los navegadores están restringiendo el acceso a estos.**

Esta API está siendo diseñada e iterada con el fin de abordar de una manera que preserve la privacidad los casos de uso de atribución que fueron resueltos por cookies de terceros.

{% Aside%} **¿Cómo se compara la API de informes de atribución con las cookies de terceros?**

- A diferencia de las cookies de terceros, está **diseñado específicamente** para medir conversiones.
- Es **más privado** : dificulta reconocer a un usuario en dos sitios de nivel superior diferentes, por ejemplo, para vincular perfiles de usuario del lado del editor y del lado del anunciante. {% endAside%}

## ¿Cómo funciona la API de informes de atribución y cuáles son sus características?

{% Aside%} Esta API se está incubando y desarrollando al aire libre. Está sujeto a cambios. Sus comentarios son bienvenidos. Vea [cómo participar](#engage) . {% endAside%}

La API de informes de atribución permite medir dos eventos que están vinculados entre sí: un evento en el sitio web de un editor, como un usuario que ve o hace clic en un anuncio, con una conversión posterior en el sitio de un anunciante.

Esta API admite la medición de la atribución de conversiones por clic (disponible en la primera implementación de esta API, prueba de origen) y la medición de atribuciones posimpresión ( [consulte el explicador público](https://github.com/WICG/conversion-measurement-api/blob/main/event_attribution_reporting.md) ).

La API ofrece dos tipos de informes de atribución que se pueden utilizar para diferentes casos de uso:

- **Los informes a nivel de evento** asocian un clic o una vista en un anuncio en particular (en el lado del anuncio) con datos en el lado de la conversión. Para preservar la privacidad del usuario al evitar la unión de la identidad del usuario entre sitios, los datos del lado de la conversión son muy limitados y ruidosos. Como protección adicional de la privacidad, los informes no se envían de inmediato.
- **Los informes agregados** no están vinculados con un evento específico en el lado del anuncio. Estos informes proporcionan datos de conversión más completos y de mayor fidelidad que los informes a nivel de evento. Una combinación de técnicas de privacidad a través de la criptografía, la distribución de la confianza y la privacidad diferencial ayudan a reducir el riesgo de unión de identidades entre sitios. Ambos tipos de informes se pueden utilizar simultáneamente. Son complementarios. Otras funciones diseñadas en esta API incluyen [informes de atribución multidispositivo](https://github.com/WICG/conversion-measurement-api/blob/main/cross_device.md) e [informes de atribución de aplicación a web](https://github.com/WICG/conversion-measurement-api/blob/main/app_to_web.md) .

## Participa y comparte comentarios {: #engage}

- **Prueba de origen** : [regístrese para la primera prueba de origen (solo haga clic)](https://developer.chrome.com/origintrials/#/view_trial/3411476717733150721) o [vea la primera demostración (solo haga clic)](https://goo.gle/demo-event-level-conversion-measurement-api) .
- Para estar atento a la próxima implementación de esta API que ofrecerá más funciones y estará disponible para la experimentación en Chrome (prueba de origen), únase a la [lista de correo para desarrolladores](https://groups.google.com/u/1/a/chromium.org/g/attribution-reporting-api-dev) .
- **GitHub** : lea la [propuesta](https://github.com/WICG/conversion-measurement-api/) , [plantee preguntas y siga la discusión](https://github.com/WICG/conversion-measurement-api/issues) .
- **W3C** : discuta casos de uso de la industria en el [Grupo empresarial de mejora de la publicidad web](https://www.w3.org/community/web-adv/participants) y únase al [Grupo de la comunidad de privacidad](https://www.w3.org/community/privacycg/) para debatir sobre la API de WebKit / Safari.
- **Soporte para desarrolladores** : haga preguntas y únase a discusiones en el [repositorio de soporte para desarrolladores de Privacy Sandbox](https://github.com/GoogleChromeLabs/privacy-sandbox-dev-support) .

## Saber más

- [Una forma más privada de medir las conversiones de anuncios](https://web.dev/conversion-measurement/) : descripción general de la primera iteración de esta API para desarrolladores web
- [Una forma más privada de medir las conversiones de anuncios - Video](https://www.youtube.com/watch?v=jcDfOoWwZcM) : demostración de la primera iteración de esta API (solo clics)
- [Uso de la API de medición de conversiones de eventos](https://web.dev/using-conversion-measurement/) : cómo experimentar con la primera iteración de esta API para desarrolladores web
- Explicaciones técnicas de la API: [informes a nivel de evento, clics](https://github.com/WICG/conversion-measurement-api/) , [informes a nivel de evento, vistas](https://github.com/WICG/conversion-measurement-api/blob/main/event_attribution_reporting.md) , [informes agregados (tanto clics como vistas)](https://github.com/WICG/conversion-measurement-api/blob/main/AGGREGATE.md) ,
- [Profundizando en la zona de pruebas de privacidad](https://web.dev/digging-into-the-privacy-sandbox)
