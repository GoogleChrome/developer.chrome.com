---
layout: 'layouts/doc-post.njk'
title: "¿Ya está listo?"
subhead: Estado de implementación en las API de Privacy Sandbox.
description: Estado de implementación en las API de Privacy Sandbox. Última actualización 2021-05-18.
date: 2021-05-18
updated: 2021-08-18
authors:
  - samdutton
---

{% Aside 'caution' %} Puede haber varios periodos en la prueba de origen para cada API. {% endAside %}

## Informes de atribuciones

*Anteriormente conocido como Evaluación de las conversiones.*

- [Prueba de origen actual](https://web.dev/origin-trials/): desde Chrome 86, [ahora ampliado](https://groups.google.com/u/1/a/chromium.org/g/attribution-reporting-api-dev/c/ZKf9T8sRqAM) a Chrome 93.
- [Regístrese para la prueba de origen](/origintrials/#/view_trial/3411476717733150721).
- [Demostración](https://goo.gle/demo-event-level-conversion-measurement-api).
- [Estado de la plataforma Chrome](https://www.chromestatus.com/features/6412002824028160).
- [El estado de Blink](https://groups.google.com/a/chromium.org/g/blink-dev/search?q=conversion%20measurement).
- [GitHub](https://github.com/WICG/conversion-measurement-api/): consulte los [problemas](https://github.com/WICG/conversion-measurement-api/issues) para conocer las preguntas y la discusión sobre la API.

### Estado: detalles

Ver [Estado](/docs/privacy-sandbox/attribution-reporting-introduction/#status).

### Todos los recursos

- [Informes de atribuciones (evaluación de las conversiones)](/docs/privacy-sandbox/attribution-reporting)
- [Introducción a los Informes de atribuciones (evaluación de las conversiones)](/docs/privacy-sandbox/attribution-reporting-introduction)
- [Explicaciones técnicas sobre la API](https://github.com/WICG/conversion-measurement-api/)
- (⚠️ obsoleto) [Una forma más privada de medir las conversiones de los anuncios](https://web.dev/conversion-measurement/): descripción general de la primera iteración de esta API para desarrolladores web
- (⚠️ obsoleto) [Una forma más privada de medir las conversiones de los anuncios - Video](https://www.youtube.com/watch?v=jcDfOoWwZcM): demostración de la primera iteración de esta API (solo clics)
- (⚠️ obsoleto) [Uso de la API para Evaluar conversiones de eventos](https://web.dev/using-conversion-measurement/): cómo experimentar con la primera iteración de esta API para desarrolladores web
- [Conociendo a detalle la iniciativa de Google, Privacy Sandbox](https://web.dev/digging-into-the-privacy-sandbox)

## Los Trust Tokens

- [Prueba de origen actual](https://web.dev/origin-trials/): desde Chrome 84, [ahora ampliada](https://groups.google.com/a/chromium.org/g/blink-dev/c/-W90wVkS0Ks/m/Jfh5-ZWpAQAJ) a Chrome 94.
- [Regístrese para la prueba de origen](/origintrials/#/view_trial/2479231594867458049).
- [Demostración](https://trust-token-demo.glitch.me/).
- [Estado de la plataforma Chrome](https://www.chromestatus.com/feature/5078049450098688).
- [El estado de Blink](https://groups.google.com/a/chromium.org/g/blink-dev/search?q=trust%tokens).
- [GitHub](https://github.com/WICG/trust-token-api): consulte los [problemas](https://github.com/WICG/trust-token-api/issues) para conocer las preguntas y la discusión sobre la API.
- [Integración con las Chrome DevTools](https://developers.google.com/web/updates/2021/01/devtools?utm_source=devtools#trust-token).
- Obtener más información: [Introducción a los Trust Tokens](https://web.dev/trust-tokens/).

## Conjuntos propios

- [Prueba de origen actual](https://web.dev/origin-trials/): Chrome 84 a 91.
- [Regístrese para la prueba de origen](/origintrials/#/view_trial/988540118207823873).
- [Estado de la plataforma Chrome](https://chromestatus.com/feature/5640066519007232).
- [El estado de Blink](https://groups.google.com/a/chromium.org/g/blink-dev/search?q=first-party%20sets).
- [Propuesta de la API](https://github.com/privacycg/first-party-sets): consulte los [problemas](hhttps://github.com/privacycg/first-party-sets/issues) para conocer las preguntas y la discusión sobre la API.
- Obtener más información: [Los proyectos de Chromium: Conjuntos propios](https://www.chromium.org/updates/first-party-sets).

## FLoC

- La prueba de origen inicial ya está cerrada. Consulte el [Objetivo del experimento](https://groups.google.com/a/chromium.org/g/blink-dev/c/MmijXrmwrJs) para efectuar las actualizaciones.
- [Demostración](https://floc.glitch.me/).
- [El estado de Blink](https://groups.google.com/a/chromium.org/g/blink-dev/search?q=floc).
- Se está examinando la [propuesta de la API](https://github.com/WICG/floc) con [WICG](https://www.w3.org/community/wicg/) y los grupos de interés.
- [GitHub](https://github.com/WICG/floc): consulte los [problemas](https://github.com/WICG/floc/issues) para conocer las preguntas y la discusión sobre la API.
- [Estado de la plataforma Chrome](https://www.chromestatus.com/features/5710139774468096).
- Obtener más información: [¿Qué es FLoC?](https://web.dev/floc/)

## FLEDGE

Es un descendiente de [TURTLEDOVE](https://github.com/WICG/turtledove).

- [Se tiene la intención de crear prototipos](https://groups.google.com/a/chromium.org/g/blink-dev/c/w9hm8eQCmNI/m/LqT59250CAAJ).
- [El estado de Blink](https://groups.google.com/a/chromium.org/g/blink-dev/search?q=fledge).
- Se está examinando la [propuesta de la API](https://github.com/WICG/turtledove/blob/main/FLEDGE.md) con [WICG](https://www.w3.org/community/wicg/) y los grupos de interés.
- [GitHub](https://github.com/WICG/turtledove/blob/main/FLEDGE.md): consulte los [problemas de TURTLEDOVE](https://github.com/WICG/turtledove/issues) para conocer las preguntas y la discusión sobre la API.

<br>

---

## Obtener más información

### Blink, Chromium y Chrome

- [Fecha de lanzamiento de Chrome](https://www.chromestatus.com/features/schedule)
- [Proceso para lanzar nuevas funciones en Chromium](https://www.chromium.org/blink/launching-features)
- [Se tiene la intención de brindar una explicación: desmitificando el proceso de envío en Blink](https://www.youtube.com/watch?time_continue=291&v=y3EZx_b-7tk)
- [blink-dev](https://groups.google.com/a/chromium.org/g/blink-dev/): estado de la implementación y discusión sobre las características de Blink, y el motor de renderizado que utiliza Chromium.
- [Búsqueda de códigos en Chromium](https://source.chromium.org/).

### Pruebas de origen

- [Introducción a las pruebas de origen de Chrome](https://web.dev/origin-trials/)
- [¿Qué son las pruebas de origen de terceros?](https://web.dev/third-party-origin-trials)
- [Diagnóstico de los problemas en las pruebas de origen de Chrome](/blog/origin-trial-troubleshooting/)
- [Guía de las pruebas de origen para desarrolladores web](https://github.com/GoogleChrome/OriginTrials/blob/gh-pages/developer-guide.md)
- [Explicación de la pruebas de origen](https://github.com/GoogleChrome/OriginTrials/blob/gh-pages/explainer.md)
- [Ejecución de una prueba de origen](https://www.chromium.org/blink/origin-trials/running-an-origin-trial)
