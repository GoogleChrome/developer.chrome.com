---
layout: layouts/doc-post.njk
title: ¿Qué es Privacy Sandbox?
subhead: Privacy Sandbox es una serie de propuestas para satisfacer los casos de uso de sitios cruzados sin cookies de terceros u otros mecanismos de seguimiento.
description: "Qué contiene, cómo participar y para qué sirve."
date: 2021-05-18
updated: 2021-07-29
authors:
  - samdutton
---

{% YouTube id='WnCKlNE52tc' %}

## ¿Por qué necesitamos de Privacy Sandbox?

La iniciativa Privacy Sandbox tiene dos objetivos principales:

- Desarrollar soluciones de reemplazo para admitir casos de uso web y modelos empresariales sin permitir que los usuarios sean rastreados entre sitios y evitando el rastreo entre sitios de los que los usuarios no son conscientes.
- Eliminar gradualmente el soporte para cookies de terceros cuando se hayan implementado nuevas soluciones.

## ¿En qué consisten las propuestas de Privacy Sandbox?

Chrome y otras partes interesadas del ecosistema han ofrecido más de 30 propuestas hasta la fecha, las cuales se pueden encontrar en <a href="https://github.com/w3c/web-advertising#ideas-and-proposals-links-outside-this-repo" data-md-type=" link ">recursos públicos de los grupos del W3C</a>. Estas propuestas abarcan una amplia variedad de casos de uso y requisitos.

A continuación se enumeran las principales propuestas desarrolladas por el equipo de Chrome.

### Contenido y anuncios relevantes

- [**FLoC**](/docs/privacy-sandbox/floc): selección de anuncios y contenidos basada en intereses que preservan la privacidad: "anuncios relevantes".
- [**FLEDGE**](/docs/privacy-sandbox/fledge): selección de anuncios para remarketing. Descendiente de [TURTLEDOVE](https://github.com/WICG/turtledove).

### Evaluación y atribución

- [**Informe de atribuciones**](/docs/privacy-sandbox/attribution-reporting): correlaciona los clics o las visualizaciones de los anuncios con las conversiones. Anteriormente conocida como API para evaluar conversiones de eventos. Habilita dos tipos de informes: a nivel de evento y de grupo.

### Protecciones propias

- [**Cambios en las cookies del mismo sitio**](https://web.dev/samesite-cookies-explained/): aseguran los sitios marcando explícitamente sus cookies entre sitios.
- [**Conjuntos propios**](/docs/privacy-sandbox/first-party-sets): permiten que los nombres de dominio relacionados, propiedad de la misma entidad, se declaren como pertenecientes a la primera parte.

### Detección de fraudes

- [**Trust Tokens**](/docs/privacy-sandbox/trust-tokens): transmite la confianza en un usuario de un contexto a otro, para ayudar a combatir el fraude y distinguir los bots de los humanos.

### Limitar la recopilación de datos

- [**Presupuesto de privacidad**](https://www.youtube.com/watch?v=0STgfjSA6T8): permite que los sitios web obtengan información sobre el navegador o el dispositivo de un usuario, pero permite que el navegador establezca una cuota sobre la cantidad total de información a la que puede acceder un sitio, de modo que no se pueda identificar al usuario.
- [**Consejos para el cliente Usuario-agente**](https://web.dev/user-agent-client-hints/): La cadena [Usuario-agente](https://developer.mozilla.org/docs/Web/HTTP/Headers/User-Agent) (UA) es una importante superficie pasiva de [huellas digitales](https://w3c.github.io/fingerprinting-guidance/#passive), además de ser difícil de procesar. Las sugerencias del cliente permiten que los desarrolladores soliciten activamente solo la información que necesitan sobre el dispositivo o las condiciones del usuario, en vez de que necesiten analizar estos datos a partir de la cadena Usuario-agente.
- [**Gnatcatcher**](https://github.com/bslassey/ip-blindness): Limita la capacidad de identificar usuarios individuales accediendo a su dirección IP. La propuesta tiene dos partes: [<strong data-md="">Willful IP Blindness</strong>](https://github.com/bslassey/ip-blindness/blob/master/willful_ip_blindness.md) proporciona una forma para que los sitios web informen a los navegadores que no están conectando las direcciones IP con los usuarios, y <a href="https://github.com/bslassey/ip-blindness/blob/master/near_path_nat.md" data-md-type=" link "><strong data-md-type=" double_emphasis ">Near-path NAT</strong></a> permite que grupos de usuarios envíen su tráfico a través del mismo servidor privatizador, ocultando de forma efectiva sus direcciones IP del host de un sitio. Gnatcatcher también garantiza que los sitios que necesiten acceder a las direcciones IP con fines legítimos, como la prevención de abusos, puedan hacerlo, sujetos a certificación y auditoría.

### Identidad

- [**WebID**](https://github.com/WICG/WebID): admite la identidad federada (en la que un usuario puede iniciar sesión en un sitio web a través de un servicio de terceros) sin compartir la dirección de correo electrónico del usuario u otra información de identificación con el servicio de terceros o el sitio web, a menos que el usuario lo acepte explícitamente. WebID permite el inicio de sesión federado sin el uso de redirecciones, ventanas emergentes o cookies de terceros que pueden utilizarse para identificar y rastrear a los usuarios en distintos sitios.

## ¿Quién está trabajando en la Privacy Sandbox?

A principios de 2021 había:

- Más de 30 propuestas de Privacy Sandbox ofrecidas por Chrome y otros.
- Más de 400 participantes que se unieron a los grupos del W3C para brindar aportaciones, incluyendo el [Grupo empresarial de mejora de la publicidad web](https://www.w3.org/community/web-adv/participants) y el [Grupo de la comunidad privada](https://www.w3.org/community/privacycg/participants).
- Cinco implementaciones de la API disponibles para probar en Chrome.

## ¿Cuándo se implementarán las API?

La página [Estado de implementación](/docs/privacy-sandbox/status/) de este sitio ofrece actualizaciones del progreso de las API individuales.

---

## Participe y comparta sus comentarios

- **GitHub**: lea la explicación de la propuesta en GitHub y plantee preguntas o comentarios en la pestaña Problemas para la explicación. <br>[Los enlaces para las explicaciones](#explainers) se proporcionan a continuación.
- **W3C**: los casos de uso se pueden discutir y los comentarios de la industria se pueden compartir en el W3C <a href="https://www.w3.org/community/web-adv/" data-md-type=" link ">Grupo empresarial de mejora de la publicidad web</a>, el [Grupo de la comunidad privada](https://www.w3.org/community/privacycg/participants) y el [Grupo de la comunidad de la incubadora web](https://github.com/WICG).
- **Soporte para desarrolladores**: haga preguntas y únase a las discusiones en el <a href="https://github.com/GoogleChromeLabs/privacy-sandbox-dev-support">repositorio de soporte para desarrolladores de Privacy Sandbox</a>.

## Obtener más información

### Explicación de la propuesta de Privacy Sandbox {: #explainers }

La explicación de la propuesta de la API necesitan comentarios, en particular para sugerir casos de uso que faltan y formas más privadas de lograr sus objetivos. Puede hacer comentarios o hacer preguntas en la pestaña Problemas para cada explicación.

- [Presupuesto de privacidad](https://github.com/bslassey/privacy-budget)
- [Trust Tokens](https://github.com/dvorak42/trust-token-api)
- [Conjuntos propios](https://github.com/privacycg/first-party-sets)
- [Gnatcatcher](https://github.com/bslassey/ip-blindness)
- [API de informes grupales](https://github.com/csharrison/aggregate-reporting-api)
- [Informes de atribuciones](https://github.com/csharrison/conversion-measurement-api)
- [FLoC](https://github.com/jkarlin/floc)
- [FLEDGE](https://github.com/michaelkleber/turtledove)

### Artículos y videos para desarrolladores web

- [Conociendo a detalle la iniciativa de Google, Privacy Sandbox](https://web.dev/digging-into-the-privacy-sandbox)
- [Explicación de las cookies de SameSite](https://web.dev/samesite-cookies-explained/)
- [Introducción a los Trust Tokens](https://web.dev/trust-tokens)
- [Una forma más privada de evaluar las conversiones de los anuncios](https://web.dev/conversion-measurement/)
- [¿Qué es FLoC?](https://web.dev/floc/)
- [Presentación del presupuesto de privacidad](https://www.youtube.com/watch?v=0STgfjSA6T8)

### Principios y conceptos en los que se basan las propuestas

- [Un modelo de privacidad potencial para la web](https://github.com/michaelkleber/privacy-model) establece los principios básicos en los que se basan las API.
- [Privacy Sandbox](https://www.chromium.org/Home/chromium-privacy/privacy-sandbox)
- Visión general de Privacy Sandbox: [Cómo crear una web más privada](https://www.blog.google/products/chrome/building-a-more-private-web/)
- Blog de IA de Google: [Aprendizaje federado: aprendizaje automático colaborativo sin información de capacitación centralizada](https://ai.googleblog.com/2017/04/federated-learning-collaborative.html)
- [El futuro de las cookies de terceros](https://blog.chromium.org/2019/10/developers-get-ready-for-new.html)
