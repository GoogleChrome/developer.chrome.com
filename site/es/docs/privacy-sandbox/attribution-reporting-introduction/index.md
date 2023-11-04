---
layout: 'layouts/doc-post.njk'
title: Introducción a los informes de atribuciones (evaluación de conversiones)
subhead: Introducción y conceptos clave para comprender la API de los informes de atribuciones.
date: 2021-08-09
updated: 2021-08-09
authors:
  - maudn
---

{% Aside %}
Esta API es una propuesta y se ampliará con el tiempo. En esta entrada del blog se describe su estado actual, y se actualizará conforme la API evolucione.
{% endAside %}

Actualizaciones:

- A principios del 2021: se agregan a la propuesta los informes de agrupación y la evaluación de la visualización.
- A principios del 2021: la API se renombra como "API de informes de atribuciones".

{% Aside 'caution' %}

- Esta publicación se centra en los casos de uso de la publicidad, pero la API para informes de atribuciones también puede ofrecer casos de uso que no están relacionados con la publicidad.
- Los casos de uso publicitario de esta API se centran en vincular los clics o las visualizaciones de los anuncios con las conversiones (Evaluación de las conversiones). {% endAside %}

## Introducción

La API de informes de atribución permite medir cuándo un **clic o visualización de un anuncio** conduce a una **conversión** en el sitio de un anunciante, como una venta o un registro. La API no depende de cookies de terceros ni de mecanismos que puedan utilizarse para identificar a usuarios individuales en distintos sitios.

Esta propuesta se está incubando en código abierto. La propuesta y las discusiones se encuentran en el [repositorio GitHub de WICG](https://github.com/WICG/conversion-measurement-api).

{% Aside %}
Esta API forma parte de Privacy Sandbox, que es una serie de propuestas para satisfacer los casos de uso de terceros sin cookies de terceros u otros mecanismos de seguimiento entre sitios. Consulte las [propuestas de Privacy Sandbox](https://developers.chrome.com/docs/privacy-sandbox).
{% endAside %}

## ¿Por qué se necesita esta API?

Hoy en día, la evaluación de conversiones publicitarias depende a menudo de las [cookies de terceros](https://developer.mozilla.org/docs/Web/HTTP/Cookies#Third-party_cookies). Los navegadores restringen el acceso a las cookies de terceros porque pueden utilizarse para rastrear a los usuarios en distintos sitios y obstaculizar su privacidad. Esta API permite realizar esas evaluaciones preservando la privacidad, sin cookies de terceros.

## ¿Quién debe conocer esta API?

- Las plataformas de tecnología para hacer anuncios como [las plataformas del lado de la demanda](https://en.wikipedia.org/wiki/Demand-side_platform) (DSP) o las [plataformas de administración de datos](https://en.wikipedia.org/wiki/Data_management_platform) (DMP), pueden utilizar esta API para admitir la función que actualmente depende de las cookies de terceros.
- Los anunciantes y editores que dependen de un código personalizado para evaluar conversiones o publicidad pueden utilizar esta API para reemplazar las técnicas existentes.
- Los anunciantes y editores que dependen de las plataformas de tecnología para hacer anuncios para evaluar conversiones no necesitan utilizar la API directamente, pero pueden estar interesados en comprenderla si están trabajando con plataformas de tecnología para hacer anuncios que pueden integrar la API.

## Debug the API errors with Chrome DevTools

[Available from Chrome 93](/blog/new-in-devtools-93/#attribution-reporting). Attribution Reporting API errors are now reported in [DevTools](/docs/devtools) under the [Issues tab](/docs/devtools/issues/).

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/bkEGVEv5kKc9M6qBUmLz.png", alt="Attribution Reporting API errors in the Issues tab", width="800", height="501" %}

## Participe

{% Aside %}
**¡Se necesita su participación!** Es posible que esta API deba admitir una amplia variedad de casos de uso de optimización y evaluación de conversiones. La información del ecosistema es vital para garantizar que las soluciones respalden estos casos de uso se discutan abiertamente.
{% endAside %}

Para participar, únase al debate y pruebe la API. Lo mejor es hacer ambas cosas, pero puede participar en el debate tanto si o como si no ha probado la API.

### Únase a la discusión

- [Únase a las reuniones quincenales](https://github.com/WICG/conversion-measurement-api/issues/80) (cada dos semanas). En estas convocatorias, los participantes discuten las propuestas de diseño de la API y cómo esta podría dar soporte a diversos casos de uso de las evaluaciones. Puede [agregar temas](https://docs.google.com/document/d/1zUSm9nX2nUsCa_fbI96UJoRCEr3eAPwWLU7HmClhIJk/edit) a la agenda de la próxima reunión en cualquier momento. Todo el mundo es bienvenido a unirse a estas discusiones, solo asegúrese de [unirse al WICG](https://www.w3.org/community/wicg/).
- [Abra un problema](https://github.com/WICG/conversion-measurement-api/issues/new) para hacer preguntas, proponer funciones o discutir casos de uso. Si no está seguro de cómo formular su problema, consulte ejemplos como [este problema](https://github.com/WICG/conversion-measurement-api/issues/147) y [este problema](https://github.com/WICG/conversion-measurement-api/issues/68). También puede unirse a la conversación sobre [problemas existentes](https://github.com/WICG/conversion-measurement-api/issues).

### Pruebe la API

{% Aside 'caution' %}

Si está experimentando con la API en Chrome, tendrá acceso a todas las funciones que están implementadas **actualmente.** No todas las funciones discutidas en el [repositorio](https://github.com/WICG/conversion-measurement-api/) y la [reunión](https://github.com/WICG/conversion-measurement-api/issues/80) se implementan en la prueba de origen de Chrome. Consulte el estado actual de las funciones en [Estado](#status). Las funciones disponibles para la experimentación también son un subconjunto de lo que finalmente será compatible con la API, y están sujetas a cambios a conforme la API se incuba en código abierto y se recopilan los comentarios del ecosistema.

{% endAside %}

#### Experimente localmente o con una demostración

1. Para habilitar la API localmente en su navegador, active la marca `#enable-experimental-web-platform-features`. Una marca de Chrome es un interruptor que le dice a su navegador que habilite ciertas funciones experimentales. Para activar esa marca, pegue `chrome://flags/#enable-experimental-web-platform-features` en la barra de búsqueda de Chrome y haga clic en **Habilitar**.
2. Ejecute la [demostración](#demo) localmente (o pruebe la [demostración en vivo](#demo) ).
3. [Bifurque el código de demostración](#demo) y personalícelo, o cree su propia demostración desde cero.

#### Experimente con usuarios finales en un sitio implementado

1. Habilite la API para los usuarios finales registrándose en una [prueba de origen](/blog/origin-trials/) si está disponible. Una prueba de origen le da acceso a una función experimental, para crear funciones que puede probar durante un tiempo limitado. Tenga en cuenta que las [pruebas de origen de terceros](/blog/third-party-origin-trials/) hacen posible que los terceros, como proveedores de servicios de publicidad y de medición, probar una API en varios sitios. **Para ver las pruebas de origen disponibles actualmente para esta API, diríjase a [Estado](#status)**. Para estar informado de futuras pruebas de origen, únase a la [lista de distribución de informes de atribuciones para desarrolladores](https://groups.google.com/u/1/a/chromium.org/g/attribution-reporting-api-dev).

2. Integre la API en sus sitios y sistemas.

{% Aside %}
Si tiene preguntas sobre la implementación, únase a la [lista de distribución de informes de atribuciones para desarrolladores](https://groups.google.com/u/1/a/chromium.org/g/attribution-reporting-api-dev) y pregunte.

Si tiene preguntas técnicas generales sobre su caso de uso, considere abrir un problema en el [repositorio de soporte para desarrolladores de Privacy Sandbox](https://github.com/GoogleChromeLabs/privacy-sandbox-dev-support).
{% endAside %}

## Demostración

Algunas demostraciones están disponibles para que las pruebe.

- Informes a nivel de evento, solo de clics:

    - [Demostración en vivo](https://goo.gle/sppi-devrel-eventlevel) .
    - [Código fuente](https://github.com/GoogleChromeLabs/trust-safety-demo/tree/main/attribution-reporting) para esta demostración, que puede [bifurcar y personalizar](https://github.com/GoogleChromeLabs/trust-safety-demo/tree/main/attribution-reporting#fork-and-customize) según sea necesario.

## Casos de uso y funciones

{% Aside %}

Esta API es un trabajo en progreso y evolucionará con el tiempo, dependiendo de las sugerencias y comentarios del ecosistema.

Todas las funciones que admite esta API son propuestas. **Cada una de estas propuestas está abierta a discusión y comentarios**, incluyendo aquellas que tienen lista una implementación inicial en el navegador.

Esta API se está incubando y desarrollando en código abierto. [Considere la posibilidad de participar](#participate) en la discusión.

{% endAside %}

Esta API permite que los sitios web midan las conversiones en los siguientes casos:

- **Clics** y **visualizaciones** de anuncios.
- Anuncios en un iframe **de terceros**, como anuncios en un sitio editorial que utiliza un proveedor de tecnología publicitaria de terceros.
- Anuncios en un contexto **original**, como los anuncios en una red social o una página de resultados de motores de búsqueda, o un editor que proporcione sus propios anuncios.

Se admite un **modelo de atribución flexible**. Consulte los detalles en [Estado](#status).

Esta API brinda acceso a diferentes tipos de información a través de dos tipos de informes que se pueden enviar a un anunciante o un proveedor de tecnología publicitaria externo. Estos dos tipos de informes se pueden utilizar simultáneamente, son complementarios.

Los **informes a nivel de evento** asocian un clic en un anuncio o una visualización con datos de conversión aproximados.

<figure>{% Img src="image/O2RNUyVSLubjvENAT3e7JSdqSOx1/8PZhfv4UXYxt2vTKRNI2.png", alt="informe a nivel de evento", width="400", height="180" %} <figcaption>Ejemplo de informe a nivel de evento: el ID de clic 200400600 en <code>news.example</code> (adjunto al ID de usuario Bob_Doe en <code>news.example</code>) generó una compra en <code>shop.example</code>.</figcaption></figure>

Los informes a nivel de evento son adecuados para:

- Casos de uso de **optimización**. Los informes a nivel de evento ayudan a responder preguntas como *"¿Cómo puedo mejorar mi retorno de la inversión?"*. En particular, se pueden utilizar para optimizar la ubicación del anuncio, ya que en los informes se puede poner a disposición una ID única para el lado del anuncio. Los informes a nivel de eventos pueden proporcionar datos de entrenamiento para modelos de aprendizaje automático.
- **Informe aproximado** de casos de uso en los que se necesita muy poca información sobre la conversión. La limitación actual es de 3 bits de datos de conversión para los clics, lo que significa que a una conversión se le puede asignar una de las ocho categorías, y 1 bit para las visualizaciones. Por lo tanto, la codificación de datos granulares del lado de la conversión, como un precio específico o el tiempo de conversión, no es compatible con los informes a nivel de evento.
- Casos de uso de **detección de fraude**. Los datos de algunos informes pueden ser útiles para la detección y el análisis de fraudes publicitarios, ya que le permiten comprender los patrones que se pueden utilizar para identificar actividades no válidas o spam.

Por otro lado, los **informes agrupados** ofrecen datos de conversión más detallados y más flexibilidad para unir los datos de clics/visualizaciones y los datos de conversiones.

<figure>{% Img src="image/O2RNUyVSLubjvENAT3e7JSdqSOx1/TxgT3W5pNEZhWgDSYIY3.png", alt="aggregate report", width="400", height="180" %} <figcaption>Ejemplo de estadísticas de informes agrupados: CampaignID 1234567 en <code>news.example</code> generó 518 conversiones en <code>shoes.example</code> y una inversión total de $3,8174. La mitad de las conversiones procedían de usuarios de Nueva York, EE. UU.</figcaption></figure>

Los informes agregados son los más adecuados para los casos de uso de **informes**. Ayudan a responder a preguntas como *"¿Cuál es el rendimiento de mi inversión?"*.<br> El uso de informes agrupados para casos de uso de **optimización**, por ejemplo, para optimizar un valor de compra, lo que no es compatible con los informes a nivel de evento porque los datos de conversión son demasiado aproximados, es un área de investigación activa. Consulte [Preguntas abiertas](#open-questions).

{% Details %}
{% DetailsSummary 'h3' %}¿Por qué se necesitan dos tipos de informes?
{% endDetailsSummary %}

Los informes a nivel de evento solo ofrecen datos de conversión aproximados para preservar la privacidad del usuario.

Pero estos datos aproximados pueden no ser suficientes para medir la eficacia de la campaña. Los responsables de marketing pueden necesitar conocer detalles sobre las conversiones, como el valor de la compra, los datos demográficos agregados del lado del anunciante para los usuarios que realizaron la conversión, las categorías de los productos que se compraron, si los usuarios convertidos son clientes nuevos o recurrentes, el contenido de los carritos, etc.

Por eso se diseñaron los informes agrupados. {% endDetails %}

Otras funciones propuestas en esta API son la [atribución de la aplicación en la web](https://github.com/WICG/conversion-measurement-api/blob/main/app_to_web.md) (consulte o haga clic en un anuncio de una aplicación y convertir en la web) y la [atribución entre dispositivos](https://github.com/WICG/conversion-measurement-api/blob/main/cross_device.md) (consulte o haga clic en un anuncio del dispositivo móvil y convertir en un equipo de escritorio).

{% Aside %} En un futuro sin cookies de terceros, esta API se combinaría con otras API de anuncios que preservan la privacidad para cubrir casos de uso de un extremo a otro:

- Remarketing: consulte [FLEDGE](/docs/privacy-sandbox/fledge/)
- Selección de anuncios basada en intereses: consulte [FLoC](/docs/privacy-sandbox/floc/)

{% endAside %}

## Estado

**🕙 Última actualización: agosto del 2021**

Estados:

- `🤿 Under exploration`: esta idea se encuentra en las primeras etapas de discusión.
- `🥚 Proposal`: un diseño inicial está listo y en incubación pública.
- `🏗️ Under development (BROWSER_NAME)`: la función se está implementando en BROWSER_NAME.
- `🧪 Experiment (BROWSER_NAME)`: hay un experimento disponible en BROWSER_NAME. En Chrome, un experimento se denomina prueba de origen.
- `🚀 Stable (BROWSER_NAME)`: la función se envía de forma predeterminada en BROWSER_NAME.

{% Aside %} [Prueba de origen actual](/origintrials/#/view_trial/3411476717733150721) (experimento de Chrome 🧪) {% endAside %}

{% Aside 'caution' %} Se realizarán varias pruebas de origen (experimentos). Cada ronda se utiliza para mejorar y ajustar la API con base en los comentarios del ecosistema. {% endAside %}

<table class="simple width-full fixed-table with-heading-tint">
<thead><tr>
    <th style="text-align: left;">Propuesta</th>
    <th style="text-align: left;">Estado</th>
</tr></thead>
<tbody>
    <tr>
    <td>Informes a nivel de evento para clics<br> <a href="https://github.com/WICG/conversion-measurement-api/blob/main/event_attribution_reporting_clicks.md">Explicador</a>
</td>
    <td><code>🧪 Experiment (Chrome)</code></td>
    </tr>
    <tr>
    <td>Informes a nivel de evento para visualizaciones<br> <a href="https://github.com/WICG/conversion-measurement-api/blob/main/event_attribution_reporting_views.md">Explicador</a>
</td>
    <td><code>🏗️ Under development (Chrome)</code></td>
    </tr>
    <tr>
    <td>Informes agrupados de clics y visualizaciones<br> <a href="https://github.com/WICG/conversion-measurement-api/blob/main/AGGREGATE.md">Explicador</a>
</td>
    <td><code>🥚 Proposal</code></td>
    </tr>
    <tr>
    <td>Viaje de conversión: multidispositivo<br> <a href="https://github.com/WICG/conversion-measurement-api/blob/main/cross_device.md">Explicador</a>
</td>
    <td><code>🥚 Proposal</code></td>
    </tr>
    <tr>
    <td>Viaje de conversión: aplicación a la web<br> <a href="https://github.com/WICG/conversion-measurement-api/blob/main/app_to_web.md">Explicador</a>
</td>
    <td><code>🥚 Proposal</code></td>
    </tr>
    <tr>
    <td>Modelo de atribución: último clic<br> <a href="https://github.com/WICG/conversion-measurement-api/blob/main/event_attribution_reporting_clicks.md#multiple-sources-for-the-same-trigger-multi-touch">Explicador</a>
</td>
    <td><code>🧪 Experiment (Chrome)</code></td>
    </tr>
    <tr>
    <td>Modelo de atribución: basado en prioridades<br> <a href="https://github.com/WICG/conversion-measurement-api/blob/main/event_attribution_reporting_views.md#controlling-which-attribution-source-to-triggerd">Explicador</a>
</td>
    <td><code>🏗️ Under development (Chrome)</code></td>
    </tr>
    <tr>
    <td>Modelo de atribución: flexible</td>
    <td><code>🤿 Under exploration</code></td>
    </tr>
</tbody>
</table>

{% Details %} {% DetailsSummary 'h3' %} Sobre de los modelos de atribuciones {% endDetailsSummary %}

Con el modelo basado en prioridades, el navegador puede asociar una prioridad con cada fuente de atribución. Esto se puede utilizar para:

- Decida si la causa más probable de la conversión fue un clic o una visualización (un clic suele considerarse una señal más directa del interés del usuario).
- Establezca un modelo de **atribución** de **primer toque**, estableciendo `attributionsourcepriority` para que se relacione con el tiempo.
- Establezca un modelo de **atribución lineal** (probabilísticamente), eligiendo la prioridad de manera uniforme al azar.

Es posible que en el futuro se admitan otros modelos de atribución. En los informes agrupados, el [esquema basado en worklet](https://github.com/WICG/conversion-measurement-api/blob/main/AGGREGATE.md#attribution-trigger-registration) posiblemente permita opciones de atribución más flexibles, incluyendo la especificación de créditos parciales para múltiples fuentes de atribución anteriores.

{% endDetails %}

## Compatibilidad con los navegadores

- Firefox y Edge [no han compartido señales](https://chromestatus.com/feature/6412002824028160) .
- Safari/Webkit es [negativo](https://chromestatus.com/feature/6412002824028160) y propuso una API diferente para medir las conversiones de anuncios, llamada [Evaluación de clics privados](https://developer.apple.com/videos/play/wwdc2021/10033/).

Aunque las dos API son diferentes, Chrome y WebKit están trabajando juntos en código abierto para simplificar la experiencia del desarrollador, por ejemplo, alineando los nombres de los atributos y en la [estructura JSON para los informes](https://github.com/privacycg/private-click-measurement/issues/30).

{% Details %} {% DetailsSummary 'h3' %} Diferencias entre la API propuesta por Chrome y la API propuesta por WebKit {% endDetailsSummary %} El conjunto de funciones de la API para Informes de atribuciones propuesto por Chrome es diferente al de la API de evaluación de clics privados propuesta por Safari/WebKit. En particular, con la API de informes de atribución propuesta por Chrome:

- Se admite la evaluación de las visualizaciones.
- Se pueden proporcionar informes a nivel de evento.
- Tanto los enlaces de anuncios en un contexto propio (como los anuncios en una red social o la página de resultados de un motor de búsqueda, o un editor que publica sus propios anuncios) **y** enlaces de anuncios en un iframe de terceros (como los anuncios en el sitio de un editor que utiliza un proveedor de tecnología publicitaria de terceros) son compatibles.
- Los terceros, como las plataformas de tecnología para hacer anuncios, pueden recibir informes en nombre de los editores y anunciantes.

{% endDetails %}

## Cómo funciona

### Informes a nivel de evento

<figure>{% Img src="image/O2RNUyVSLubjvENAT3e7JSdqSOx1/bdnt0qHKdPJJYzxU03Xm.png", alt= "informe a nivel de evento", width="800", height="521" %} <figcaption>Los informes a nivel de evento se generan de la siguiente manera: el navegador hace coincidir los clics o las visualizaciones ("eventos de origen de atribuciones") con los datos de conversión ("datos de activación de atribuciones") definidos por una tecnología para hacer anuncios. Más tarde, el navegador envía los informes que resulten a un endpoint predefinido, con cierto retraso y ruido.</figcaption></figure>

{% Details %} {% DetailsSummary 'h3' %} Cómo funciona en detalle: informes a nivel de evento {% endDetailsSummary %} Los enlaces de anuncios se pueden configurar con atributos que son específicos de las conversiones de anuncios:

- Datos personalizados para adjuntar a un clic (o visualización) en un anuncio del lado del editor, por ejemplo, un ID de clic o un ID de campaña.
- El sitio para el que se espera una conversión para este anuncio.
- El endpoint de informes que debe ser notificado de las conversiones exitosas, es decir, recibir los informes.
- La fecha límite en la que las conversiones ya no se pueden contabilizar para este anuncio.

Nota: también es posible registrar una fuente de atribuciones para las navegaciones [iniciadas por `window.open()`](https://github.com/WICG/conversion-measurement-api/blob/main/event_attribution_reporting_clicks.md#registering-attribution-sources-for-windowopen-navigations) o, para las visualizaciones, a través de una [API de JavaScript](https://github.com/WICG/conversion-measurement-api/blob/main/event_attribution_reporting_views.md#registering-attribution-sources-with-javascript).

Cuando el usuario hace clic o ve un anuncio especialmente configurado, el navegador -en el dispositivo local del usuario- registra este evento, junto con los datos de configuración de las atribuciones que se especificaron.

Posteriormente, el usuario visita el sitio web del anunciante y realiza una acción que el anunciante o su proveedor de tecnología publicitaria clasifica como una conversión, como una compra. Cuando esto sucede, el anunciante o proveedor de tecnología publicitaria activa una atribución: le pide al navegador que registre una conversión con un valor determinado de {código0}trigger-data{/código0}, y el navegador del usuario hace coincidir el clic (o la visualización) en el anuncio y el evento de conversión.

El navegador finalmente programa un informe que se enviará al endpoint especificado en el lado del anuncio. Este informe incluye:

- Datos personalizados del lado del anuncio que se adjuntaron al dar clic en el anuncio o a la visualización que generó esta conversión.
- Datos personalizados del lado de la conversión, con algo de ruido.

Si se registran varias conversiones para un clic (o una visualización) de un anuncio, se programa el envío de los informes correspondientes. Se puede enviar un único informe para las visualizaciones y hasta tres informes para los clics.

Los informes se envían por el navegador después de un retraso (días o a veces semanas después de una conversión).

{% endDetails %}

### Informes agrupados

<figure>{% Img src="image/O2RNUyVSLubjvENAT3e7JSdqSOx1/HAl0ppkoxoGCtttWDk2A.png", alt="ALT_TEXT_HERE", width="800", height="1140" %} <figcaption>Los informes agrupados se generan de la siguiente manera: el navegador hace coincidir los clics o las visualizaciones detalladas ("eventos de origen de atribuciones") con los datos de conversión detallados ("datos de activación de atribuciones") definidos por una tecnología para hacer anuncios. El código definido por la tecnología para hacer anuncios se ejecuta en un worklet para definir las contribuciones que enviará el navegador con el fin de que se utilicen para calcular los informes agrupados. Los servicios de agrupación se encargan de calcular de forma privada los informes agrupados para la tecnología para hacer anuncios.</figcaption></figure>

{% Details %} {% DetailsSummary 'h3' %} Cómo funciona en detalle: informes agrupados {% endDetailsSummary %}

Los enlaces de los anuncios se pueden configurar con atributos específicos para las conversiones de los anuncios.

Cuando el usuario hace clic o ve un anuncio especialmente configurado, el navegador -en el dispositivo local del usuario- registra este evento, junto con los datos de configuración de las atribuciones que se especificaron.

Entonces, el código definido por la tecnología para hacer anuncios se ejecuta dentro de un worklet para definir las contribuciones, es decir, uniones de datos del lado de la publicidad y del lado de la conversión.

Estas contribuciones (informes sin procesar) se envían cifradas a un servidor de tecnología para hacer anuncios y luego a los servicios de agrupación que calcularán los informes agrupados de forma [privada](#privacy).

Tenga en cuenta que los informes agrupados no se retrasan en la misma medida que los informes a nivel de evento.

{% endDetails %}

## Privacidad

### Resumen general

Tomemos una persona llamada Bob. Bob ve un anuncio mientras lee las noticias en `news.com`. Una semana después, Bob compra unos zapatos en `shoes.example`.

Hoy en día, esta conversión sería rastreada por una cookie de terceros utilizada como **identificador entre sitios**. Con las cookies de terceros, una empresa de tecnología publicitaria puede acceder a muchos detalles sobre la actividad de Bob en `news.example` **y** en `shoes.example`, y fusionar esta información para construir un perfil detallado de Bob. Una empresa de tecnología publicitaria puede acabar conociendo la ubicación de Bob, sus hábitos de navegación y sus lecturas preferidas en `news.com`, **así como** las compras, la actividad y la información de la tarjeta de crédito en `shoes.com`. Esta unión entre sitios es útil para medir las conversiones de los anuncios. Pero obstaculiza la privacidad del usuario: la actividad de Bob se rastrea en todos los sitios con un alto nivel de detalle.

Por otro lado, la API de informes de atribución permite a las empresas de publicidad obtener información sobre las conversiones **sin rastrear la actividad de un individuo en los distintos sitios**. Una pequeña cantidad de información se une a través de los sitios, lo suficiente para medir las conversiones, pero no lo suficiente para seguir la actividad de Bob a través de los sitios en detalle. La actividad de Bob en `news.example` y `shoes.example` permanece separada.

{% Img src="image/O2RNUyVSLubjvENAT3e7JSdqSOx1/aurePszyAGz9Osu3G0XN.jpg", alt="Diagrama: vista paralela de la web de hoy (identidad unida) y de la web de mañana (identidad dividida)", width="800", height="314" %}

### En detalle

<figure>{% Img src="image/O2RNUyVSLubjvENAT3e7JSdqSOx1/UMXwDWt4RSo98PTS0Wvd.png", alt="ALT_TEXT_HERE", width="800", height="1237" %} <figcaption>A diferencia de las cookies de terceros, la API de informes de atribución proporciona información sin identificadores entre sitios para preservar la partición de identidad por sitio.<br> Los informes a nivel de evento vinculan un identificador del lado del anuncio con solo una pequeña cantidad de datos del lado de la conversión. Por lo tanto, brindan información entre sitios sobre una conversión, pero la información del lado de la conversión es demasiado aproximada para unir la identidad del usuario entre sitios.<br> Los informes agrupados brindan información detallada, pero solo a un nivel agregado; Debido a las técnicas de privacidad diferencial, el cálculo privado y la criptografía, los informes agrupados no se pueden utilizar para rastrear la actividad de un usuario individual entre sitios.<br> Se imponen protecciones de privacidad adicionales, como limitaciones de tarifas, tanto en los informes a nivel de eventos como en los agrupados.</figcaption></figure>

{% Details %} {% DetailsSummary 'h3' %} En detalle: informes a nivel de eventos y privacidad {% endDetailsSummary %}

Los informes a nivel de evento proporcionan información sobre la conversión sin rastrear a los usuarios entre sitios, rastreando los siguientes mecanismos de privacidad:

- No se utiliza ningún identificador entre sitios y ninguna actividad detallada de navegación entre sitios sale del dispositivo. Los informes a nivel de evento asocian 64 bits de información en el lado del anuncio (`news.example`) con solo 1 bit o 3 bits en el lado de la conversión (`shop.example`). Los 64 bits **son información suficiente para ser mapeados a un identificador de usuario individual, pero estos 64 bits solo se pueden vincular con muy poca información entre sitios:** 1 bit o 3 bits, que no son suficientes para contener un identificador. Nota: los 64 bits del lado del anuncio no son información nueva. Un ID de usuario ya puede estar disponible en el lado del anuncio hoy. `news.example` o `adtech.example` ya conocen la actividad de un determinado usuario en `news.example`.

- Se aplican protecciones adicionales para evitar el abuso y el rastreo entre sitios:

    - Los informes se envían con un **retraso**.
    - Los datos de conversión son **ruido**: un cierto porcentaje de las veces (5% en Chrome), los datos de conversión reales se sustituyen por un valor aleatorio.
    - El número de informes de conversión atribuidos está limitado por clic o visualización.

{% Aside %} Es posible recuperar el verdadero recuento de conversiones de forma que se preserve la privacidad. Consulte el [script de ejemplo](https://github.com/WICG/conversion-measurement-api/blob/main/noise_corrector.py). {% endAside %}

{% endDetails %}

{% Details %} {% DetailsSummary 'h3' %} En detalle: informes agrupados y privacidad {% endDetailsSummary %}

Los informes agrupados asocian un evento de clic o visualización detallada con datos de conversión detallados. Sin embargo, proporcionan información sobre la conversión sin rastrear a los usuarios entre sitios siguiendo los siguientes mecanismos de privacidad:

- No se utiliza ningún identificador entre sitios.

- Cada atribución puede realizar varias contribuciones a un informe agrupado resultante, y un usuario determinado puede activar varias atribuciones para un clic (o visualización) y una conversión en particular. Pero las contribuciones que cualquier usuario puede hacer en una ventana de tiempo determinada son limitadas.

- Los datos se agrupan hasta el nivel de muchos eventos (muchos usuarios) y no se pueden observar eventos individuales con precisión. [La privacidad diferencial](https://en.wikipedia.org/wiki/Differential_privacy) se utiliza para mantener los datos de salida inutilizables para vincular la identidad de los usuarios entre sitios: cuando se profundiza en los datos agrupados, conforme aumenta el nivel de detalle, el ruido relativo en esos datos también aumenta. Esto conduce a un error relativo mayor y garantiza que no se puedan observar con precisión eventos individuales (o usuarios). Por otro lado, los fragmentos de datos que agregan muchos eventos y usuarios son más precisos para preservar su utilidad.

- Los informes sin procesar que asocian un evento de clic o visualización detallada con datos de conversión detallados están cifrados y no son legibles por la empresa de tecnología para hacer anuncios. A continuación, los datos agrupados se calculan a partir de estos informes de forma privada a través de un servidor de confianza. Se están considerando algunas opciones de cálculo:

    - El cálculo seguro de múltiples partes (MPC). La confianza se distribuye en varios servidores. Cada servidor recibe una porción de los datos que no tienen sentido por sí mismos. Una vez que cada ayudante ha ejecutado los cálculos, la salida de estos ayudantes se combina para formar un conjunto significativo.
    - Cálculo de un solo servidor. Un servidor auxiliar calcula la salida. Esta opción es menos segura y menos privada. Pero es más fácil de configurar, lo que significa que puede permitir que los actores del ecosistema más diversos experimenten con esta API y proporcionen comentarios. **Esta opción no pretende ser una solución a largo plazo**. Con suficiente antelación y tiempo de migración, se desestimará conforme se integren los comentarios del ecosistema y a medida que esta API madure, a favor de los enfoques más seguros, MPC o servidor único seguro.
    - Cálculo seguro de un solo servidor. Un solo servidor, pero con propiedades informáticas confidenciales que son similares (pero no equivalentes) a MPC.
    - A largo plazo, los servidores necesitarán procesar datos exclusivamente con cálculo seguro de múltiples partes (servidor único seguro o multipartito seguro).

- Se aplican protecciones adicionales para evitar el abuso y el rastreo entre sitios:

    - Los informes se envían con retrasos aleatorios.
    - Las consultas sobre diferentes segmentos de datos tienen una velocidad limitada.

{% endDetails %}

## Sitios y control de usuarios

- Los usuarios pueden optar por no participar a través de la configuración del usuario en `chrome://settings/privacySandbox`.
- De forma predeterminada, la función está habilitada en contextos de nivel superior. Los terceros arbitrarios no pueden utilizar la API sin el conocimiento de un editor, porque la API para informes de atribuciones debe estar habilitada en los iframes secundarios a través de una [Política de permisos](https://developer.mozilla.org/docs/Web/HTTP/Headers/Feature-Policy).

## Preguntas abiertas

Hay una serie de cuestiones que permanecen abiertas y que se resolverán a medida que la API se vaya incubando en código abierto. Le animamos a que [participe](#participate) en estas discusiones. En particular:

- ¿Cuál es la cantidad adecuada de ruido para preservar la privacidad y la utilidad?
- ¿Cómo admitir modelos de atribución personalizados?
- ¿Cómo optimizar cualquier dato del lado de la conversión que tenga un cierto nivel de detalle, como el valor de la compra?
- ¿Qué calificará como servidor de confianza? Una solución que se está evaluando es realizar auditorías periódicas de código abierto. [Únase a la discusión](https://github.com/WICG/conversion-measurement-api/issues/116).
- ¿Cómo ofrecer una mayor flexibilidad en la elaboración de informes, por ejemplo, admitir la delegación en más endpoints de información? [Únase a la discusión](https://github.com/WICG/conversion-measurement-api/issues/96).
- ¿Cómo prevenir el fraude, por ejemplo, mediante la autenticación con credenciales anónimas? [Únase a la discusión](https://github.com/WICG/conversion-measurement-api/labels/anti-fraud%20%2F%20auth).
- Si está pensando en utilizar esta API para casos de uso no publicitarios: lo que falta, ¿cómo podría mejorarse la API? [Abra un problema](https://github.com/WICG/conversion-measurement-api/issues)
- ¿Cómo pueden los implementadores personalizar la configuración de privacidad? [Únase a la discusión](https://github.com/WICG/conversion-measurement-api/issues/99).

{% Aside %} Esta API combina múltiples técnicas de privacidad para lograr **privacidad y utilidad**. Esto significa que la limitación de datos de 3 bits (o 1 bit para las visualizaciones) y otros mecanismos de privacidad utilizados por esta API son un medio para lograr un fin. Están sujetos a cambios. Si hay formas para que las empresas de tecnología para hacer anuncios obtengan datos más útiles para sus casos de uso al tiempo que logran sólidas garantías de privacidad, esta API evolucionará en consecuencia. {% endAside %}
