---
layout: 'layouts/doc-post.njk'
title: Trust Tokens
subhead: Trust Tokens es una nueva API cuya finalidad es combatir los fraudes y distinguir a los bots de los humanos reales, sin la necesidad de efectuar un seguimiento pasivo.
description: La API Trust Tokens permite que la confianza de un usuario en un contexto se transmita a otro contexto, sin la necesidad de identificar al usuario o relacionar la identidad que hay entre ambos contextos. La API permite que se emitan tokens criptográficos desde un origen hacia un usuario en el que se confía. Entonces, los tokens son almacenados por el navegador del usuario. De esta forma, el navegador puede usar los tokens en otros contextos para evaluar la autenticidad del usuario.
date: 2021-05-18
updated: 2021-08-18
authors:
  - samdutton
---

## Estado de la implementación

- [En la prueba de origen](https://web.dev/origin-trials/) Chrome 84 a 94.
- [Regístrese para la prueba](/origintrials/#/view_trial/2479231594867458049).
- [Demostración](https://trust-token-demo.glitch.me/).
- [Integración con las Chrome DevTools](https://developers.google.com/web/updates/2021/01/devtools?utm_source=devtools#trust-token).
- [Estado de la plataforma Chrome](https://www.chromestatus.com/feature/5078049450098688).

## ¿Qué son los Trust Tokens?

{% YouTube id='bXB1Iwq6Eq4' %}

Trust Tokens permite que la confianza en la autenticidad de un usuario se transmita de un contexto a otro, con la finalidad de que los sitios web puedan combatir los fraudes y distinguir a los bots de los humanos reales, sin la necesidad de efectuar un seguimiento pasivo.

- El sitio web **emisor** puede expedir tokens al navegador web de un usuario que demuestre ser confiable, por ejemplo, mediante el uso continuo de la cuenta, al completar una transacción o al obtener una puntuación aceptable en el [reCAPTCHA](https://developers.google.com/recaptcha).
- El sitio web que **responde** puede confirmar que no se trata de un usuario falso al verificar si cuenta con los tokens de un emisor de confianza para quien emite la respuesta, y luego podrá canjear los tokens en caso de ser necesario.

Los Trust tokens están cifrados, de modo que no es posible identificar a un individuo o relacionarlo con las instancias que son confiables, o no lo son, para descubrir la identidad del usuario.

{% Aside 'caution' %} Los Trust Tokens no sustituyen al reCAPTCHA ni a otros mecanismos que permiten determinar si un usuario es quien dice ser.

Los Trust Tokens son una forma de **transmitir** confianza en un usuario, no de **establecer** confianza en un usuario. {% endAside %}

## ¿Por qué necesitamos a los Trust Tokens?

La web necesita formas de establecer y transmitir señales de confianza que demuestren que un usuario es quien dice ser, y no un bot que finge ser un humano o un tercero malintencionado con la intención de defraudar a una persona o servicio real. La protección contra el fraude es particularmente importante para los publicistas, los proveedores de anuncios y las [Redes de distribución de contenido o CDN](https://www.cloudflare.com/en-gb/learning/cdn/what-is-a-cdn/).

Desafortunadamente, muchos de los mecanismos que existen actualmente para evaluar y transmitir la confiabilidad (por ejemplo, para determinar si la interacción con un sitio proviene de un ser humano real) aprovechan las técnicas que también se utilizan para la toma de huellas dactilares. Los mecanismos para transmitir confianza deben preservar la privacidad, permitiendo que la confianza se propague a través de los sitios sin la necesidad de realizar un seguimiento del usuario de forma individual.

Con la API de Trust Tokens, un sitio web puede emitir tokens criptográficos a un usuario en el que confía, los cuales posteriormente pueden utilizarse en otro lugar. Los tokens se almacenan de forma segura en el navegador del usuario y luego se pueden canjear en otros contextos para confirmar la autenticidad del usuario. Esto permite que la confianza de un usuario en un sitio web (como un sitio de redes sociales o un servicio de correo electrónico) se transmita a otro sitio web (como un editor o una tienda en línea) sin que sea necesario identificar al usuario o relacionar ambas identidades entre los sitios.

{% Aside 'key-term' %} La [toma de huellas dactilares](https://w3c.github.io/fingerprinting-guidance/#passive) permite a los sitios identificar y hacer un seguimiento de los usuarios de forma individual al obtener información sobre su dispositivo, sistema operativo y configuración del navegador (como las preferencias del idioma, el [agente de usuario](https://developer.mozilla.org/docs/Web/API/NavigatorID/userAgent) y las fuentes que están disponibles) o los cambios efectuados en el estado del dispositivo. Esto se puede hacer en el servidor comprobando los encabezados de las solicitudes o en el cliente a través de JavaScript.

La toma de huellas dactilares utiliza mecanismos que los usuarios no conocen y que tampoco pueden controlar. Sitios como [Panopticlick](https://panopticlick.eff.org/) y [amiunique.org](https://amiunique.org/) muestran cómo se puede combinar la información proveniente de las huellas digitales para identificarlo como individuo. {% endAside %}

## ¿Cómo funcionan los Trust Tokens?

En este ejemplo, el sitio web de un editor quiere verificar si un usuario es un ser humano real, y no un bot, antes de mostrar un anuncio.

1. Un usuario visita un sitio web (conocido como **emisor** ) y realiza acciones que llevan al sitio a creer que el usuario es un ser humano real, como hacer compras, usar una cuenta de correo electrónico o completar con éxito un reCAPTCHA.
2. El sitio del emisor utiliza la API de JavaScript, Trust Tokens, para activar una solicitud de tokens de confianza para el navegador del usuario.
3. El sitio del emisor responde con datos del token.
4. El navegador del usuario almacena de forma segura los datos que provienen del token de confianza.
5. El usuario visita un sitio web diferente (como un editor de noticias) que quiere verificar si el usuario es un ser humano real: por ejemplo, cuando muestra anuncios.
6. El sitio utiliza la API de Trust Tokens para verificar si el navegador del usuario tiene almacenados tokens de confianza para los emisores en quienes confía el sitio.
7. Se encuentran tokens de confianza para el emisor que el usuario visitó anteriormente.
8. El sitio del editor solicita al emisor que canjee los tokens de confianza.
9. El sitio del emisor responde con un Registro de redención.
10. El sitio del editor hace una solicitud a una plataforma publicitaria, incluido el Registro de redención, para demostrar que el emisor confía en que el usuario es un ser humano real.
11. La plataforma publicitaria proporciona los datos necesarios para mostrar un anuncio.
12. El sitio del editor muestra el anuncio.
13. Esto se cuenta como una impresión en la visualización del anuncio.

{% Aside %} Para obtener más detalles sobre las llamadas de JavaScript que se mencionaron en este ejemplo, consulte el [Ejemplo acerca del uso de la API](https://web.dev/trust-tokens/#sample-api-usage). {% endAside %}

---

## Participe y comparta sus comentarios

- **Prueba de origen**: regístrese y participe en la [prueba de origen de Chrome](/origintrials/#/view_trial/2479231594867458049).
- **Demostración**: pruebe la [distribución y el desempeño](https://trust-token-demo.glitch.me/) de Trust token.
- **GitHub**: lea la [propuesta](https://github.com/WICG/trust-token-api), [realice preguntas y siga la discusión](https://github.com/WICG/trust-token-api/issues).
- **W3C**: discuta los casos de uso en la industria con el [grupo Improving Web Advertising Business](https://www.w3.org/community/web-adv/participants).
- **IETF**: proporcione información técnica para el protocolo subyacente en el [grupo de trabajo IETF Privacy Pass](https://datatracker.ietf.org/wg/privacypass/about/).
- **Soporte para desarrolladores**: haga preguntas y únase a las discusiones en el [repositorio de soporte para desarrolladores de Privacy Sandbox](https://github.com/GoogleChromeLabs/privacy-sandbox-dev-support).

## Obtener más información

- [Explicación técnica sobre la API Trust Token](https://github.com/dvorak42/trust-token-api)
- [Introducción a los Trust Tokens](https://web.dev/trust-tokens/): descripción general para los desarrolladores web
- [Introducción a las pruebas de origen de Chrome](https://web.dev/origin-trials)
- [Conociendo a detalle la iniciativa de Google, Privacy Sandbox](https://web.dev/digging-into-the-privacy-sandbox)
