---
layout: 'layouts/doc-post.njk'
title: 'Informes de atribuciones'
subhead: Mida cuándo la acción del usuario (como un clic en un anuncio o una visualización) genera una conversión, sin utilizar identificadores de sitios cruzados.
description: La API de informes de atribuciones permite medir cuándo la acción del usuario (como un clic en un anuncio o una visualización) genera una conversión, sin utilizar identificadores de sitios cruzados.
date: 2021-05-18
updated: 2021-08-24
authors:
  - maudn
  - samdutton
---

{% Aside 'caution' %}  La API de informes de atribuciones se conocía anteriormente como API de evaluación de conversiones. {% endAside %}

## Estado de la implementación

Ver [estado](/docs/privacy-sandbox/attribution-reporting-introduction/#status) .

## Glosario

{% Aside %}

También puede consultar el [Glosario de Privacy Sandbox](/docs/privacy-sandbox/glossary/).

{% endAside %}

- **Plataformas de tecnología para hacer anuncios**: empresas que proporcionan software y herramientas para permitir que las marcas o agencias orienten, entreguen y analicen su publicidad digital.
- **Anunciantes**: empresas que pagan por la publicidad.
- **Editoriales**: empresas que muestran anuncios en sus sitios web.
- **Conversión a través de clics**: conversión que se atribuye al clic de un anuncio.
- **Conversión a través de visualizaciones**: conversión que se atribuye a la impresión de un anuncio (si el usuario no interactúa con el anuncio, después se convierte).

## Quién debe conocer esta API: plataformas de tecnología para hacer anuncios, anunciantes y editores

- Las plataformas de tecnología para hacer anuncios como [las plataformas del lado de la demanda](https://en.wikipedia.org/wiki/Demand-side_platform) (DSP) o las [plataformas de administración de datos](https://en.wikipedia.org/wiki/Data_management_platform) (DMP), pueden utilizar esta API para admitir la función que actualmente depende de las cookies de terceros.
- Los anunciantes y editores que dependen de un código personalizado para evaluar conversiones o publicidad pueden utilizar esta API para reemplazar las técnicas existentes.
- Los anunciantes y editores que dependen de las plataformas de tecnología para hacer anuncios para evaluar conversiones no necesitan utilizar la API directamente, pero pueden estar interesados en comprenderla si están trabajando con plataformas de tecnología para hacer anuncios que pueden integrar la API.

{% Aside %} Puede haber casos de uso que no estén relacionados con los anuncios. [¡Participe](#engage) para compartir su caso de uso! {% endAside %}

## ¿Por qué se necesita esta API? {: #why-is-this-api-need }

Hoy en día, la evaluación de conversiones publicitarias depende a menudo de las [cookies de terceros](https://developer.mozilla.org/docs/Web/HTTP/Cookies#Third-party_cookies). Los navegadores restringen el acceso a las cookies de terceros porque pueden utilizarse para rastrear a los usuarios en distintos sitios y obstaculizar su privacidad. Esta API permite realizar esas evaluaciones preservando la privacidad, sin cookies de terceros.

## ¿Cómo funciona la API de informes de atribuciones y cuáles son sus características?

{% Aside %} Esta API se está incubando y desarrollando en código abierto. Está sujeta a cambios. Sus comentarios son bienvenidos. Consulte [cómo participar](#engage).  {% endAside %}

La API de informes de atribuciones permite medir dos eventos que están vinculados entre sí: un evento en el sitio web de un editor, como un usuario que ve o hace clic en un anuncio, con una conversión posterior en el sitio de un anunciante.

Esta API es compatible con la evaluación de atribuciones de conversiones a través de clics (disponible en la primera implementación de esta API, actualmente en la [prueba de origen](https://web.dev/conversion-measurement/#browser-support)) y la evaluación de atribuciones a través de visualizaciones ([consulte explicación pública](https://github.com/WICG/conversion-measurement-api/blob/main/event_attribution_reporting.md)).

La API ofrece dos tipos de informes de atribuciones que se pueden utilizar para diferentes casos de uso:

- **Los informes a nivel de evento** asocian un clic a un anuncio o una visualización en particular (en el lado del anuncio) con datos en el lado de la conversión. Para preservar la privacidad del usuario evitando la unión de la identidad del usuario a través de distintos sitios, los datos del lado de la conversión son muy limitados y los datos son "ruidosos" (lo que significa que para un pequeño porcentaje de casos, se envían datos aleatorios). Como protección adicional de la privacidad, los informes no se envían de inmediato.
- **Los informes agrupados** no están vinculados a un evento específico en el lado del anuncio. Estos informes proporcionan datos de conversiones más completos y de mayor fidelidad que los informes a nivel de evento. Una combinación de técnicas de privacidad a través de la criptografía, la distribución de la confianza y la privacidad diferencial ayudan a reducir el riesgo de unión de identidades entre sitios. Ambos tipos de informes se pueden utilizar simultáneamente. Son complementarios. Otras características diseñadas en esta API incluyen [informes de atribuciones entre dispositivos](https://github.com/WICG/conversion-measurement-api/blob/main/cross_device.md) y [informes de atribuciones entre aplicaciones](https://github.com/WICG/conversion-measurement-api/blob/main/app_to_web.md).

## Participe y comparta sus comentarios {: #engage }

- **Prueba de origen**: [regístrese en la primera prueba de origen (solo haga clic)](/origintrials/#/view_trial/3411476717733150721) o [consulte la primera demostración (solo haga clic)](https://goo.gle/demo-event-level-conversion-measurement-api).
- Para estar atento a la próxima implementación de esta API que ofrecerá más funciones y estará disponible para experimentar en Chrome (prueba de origen), únase a la [lista de correos para desarrolladores](https://groups.google.com/u/1/a/chromium.org/g/attribution-reporting-api-dev).
- **GitHub**: lea la [propuesta](https://github.com/WICG/conversion-measurement-api/), [realice preguntas y siga la discusión](https://github.com/WICG/conversion-measurement-api/issues).
- **W3C**: discuta los casos de uso de la industria en el [Grupo de mejoras empresariales de la publicidad web](https://www.w3.org/community/web-adv/participants) y únase al [Grupo de la Privacidad comunitaria](https://www.w3.org/community/privacycg/) para participar en las discusiones en torno a la API de WebKit/Safari.
- **Soporte para desarrolladores**: haga preguntas y únase a las discusiones en el [repositorio de soporte para desarrolladores de Privacy Sandbox](https://github.com/GoogleChromeLabs/privacy-sandbox-dev-support).

## Obtener más información

- [Introducción a los Informes de atribuciones (Evaluación de las conversiones)](/docs/privacy-sandbox/attribution-reporting-introduction)
- [Explicaciones técnicas sobre la API](https://github.com/WICG/conversion-measurement-api/)
- (⚠️ obsoleto) [Una forma más privada de medir las conversiones de los anuncios](https://web.dev/conversion-measurement/) : descripción general de la primera iteración de esta API para desarrolladores web
- (⚠️ obsoleto) [Una forma más privada de medir las conversiones de los anuncios - Video](https://www.youtube.com/watch?v=jcDfOoWwZcM): demostración de la primera iteración de esta API (solo clics)
- (⚠️ obsoleto) [Uso de la API para Evaluar conversiones de eventos](https://web.dev/using-conversion-measurement/): cómo experimentar con la primera iteración de esta API para desarrolladores web
- [Conociendo a detalle la iniciativa de Google, Privacy Sandbox](https://web.dev/digging-into-the-privacy-sandbox)
- [Depurar la API con Chrome DevTools](/blog/new-in-devtools-93/#attribution-reporting)
