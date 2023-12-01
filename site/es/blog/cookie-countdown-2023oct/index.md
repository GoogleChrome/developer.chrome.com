---
layout: 'layouts/blog-post.njk'
title: Prepárate para el fin de las cookies de terceros
authors:
  - rowan_m
description: >
  Si tu sitio utiliza cookies de terceros, es hora de tomar las medidas necesarias dado que nos acercamos a su desactivación. Chrome planea deshabilitar las cookies de terceros para el 1 % de los usuarios a partir del primer trimestre de 2024 para facilitar las pruebas y luego aumentar hasta el 100 % de los usuarios a partir del tercer trimestre de 2024. En esta serie Cookie Countdown, te guiaremos a través del cronograma y las acciones inmediatas que debes tomar para garantizar que tus sitios estén preparados.
date: 2023-10-11
thumbnail: 'image/VWw0b3pM7jdugTkwI6Y81n6f5Yc2/XeTqWn3za0aUZVGb2kUM.jpg'
alt: >
  Prepárate para el fin de las cookies de terceros
tags:
  - privacy
  - cookie-countdown
---

Si tu sitio utiliza cookies de terceros, es hora de tomar las medidas necesarias dado que nos acercamos a su desactivación. Chrome planea deshabilitar las cookies de terceros para el 1% de los usuarios a partir del primer trimestre de 2024 para facilitar las pruebas, y luego aumentar hasta el 100% de los usuarios a partir del tercer trimestre de 2024. El aumento hasta el 100% de los usuarios está sujeto a abordar cualquier inquietud de competencia restante de la [Autoridad de Mercados y Competencia del Reino Unido (CMA, por sus siglas en inglés)] (https://www.gov.uk/cma-cases/investigation-into-googles-privacy-sandbox-browser-changes).

Nuestro objetivo con Privacy Sandbox es reducir el seguimiento inadvertido a través de diferentes sitios y al mismo tiempo habilitar la funcionalidad que mantiene el acceso gratuito fa los contenidos y servicios en línea para todos. Desaprobar y eliminar las cookies de terceros resume el desafío, ya el mecanismo de cookies habilita funciones críticas para el inicio de sesión, la protección contra el fraude, la publicidad y, en general, la capacidad de incorporar contenido enriquecido de terceros en sus sitios, pero al mismo tiempo el mecanismo también es el facilitador clave del seguimiento a través de diferentes sitios.

En nuestro importante hito anterior, lanzamos una gama de API que brindan una alternativa centrada en la privacidad al status quo actual para casos de uso como identidad, publicidad y detección de fraude. Con las alternativas implementadas, ahora podemos comenzar a eliminar gradualmente las cookies de terceros.

En esta [serie de Cuenta regresiva de cookies (cookie countdown)](/tags/cookie-countdown/), te guiaremos a través del cronograma y las acciones inmediatas que puedes tomar para garantizar que tus sitios estén preparados.


## 1 % de desactivación de cookies de terceros y pruebas facilitadas por Chrome {: #chrome-testing }

En el [cronograma de privacysandbox.com](https://privacysandbox.com/open-web/#the-privacy-sandbox-timeline) puedes ver dos hitos que se aproximan en el cuarto trimestre de 2023 y el primer trimestre de 2024 como parte de las [pruebas facilitadas por Chrome](/docs/privacy-sandbox/chrome-testing/). Esta prueba es principalmente para organizaciones que prueban las API de medición y relevancia de Privacy Sandbox; sin embargo, como parte de esto, deshabilitaremos las cookies de terceros para el 1% de los usuarios de Chrome Stable.

{% Img src="image/VWw0b3pM7jdugTkwI6Y81n6f5Yc2/Fl3J3HIW22U710lVSgtu.png", alt="Cronograma para la eliminación de cookies de terceros. Como parte de las pruebas facilitadas por Chrome, la prueba de participación con el modo de etiquetas comienza en el cuarto trimestre de 2023 y el 1% El modo de desuso de 3PC comienza en el primer trimestre de 2024. Ambos continúan hasta mediados del tercer trimestre de 2024, cuando comienza la eliminación gradual de las cookies de terceros.", width="800", height="276" %}

Esto significa que desde principios de 2024, puede esperar ver una mayor proporción de usuarios de Chrome en su sitio con las cookies de terceros deshabilitadas, incluso si tu sitio no participa activamente en las pruebas facilitadas por Chrome. Este período de prueba continúa hasta el tercer trimestre de 2024 cuando, después de [consultar con la CMA](https://www.gov.uk/cma-cases/investigation-into-googles-privacy-sandbox-browser-changes) y sujeto a la resolución de si tiene alguna inquietud sobre la competencia, planeamos comenzar a deshabilitar las cookies de terceros para todos los usuarios de Chrome.

## Prepárate para la eliminación gradual de las cookies de terceros

Hemos dividido el proceso en estos pasos clave, con detalles a continuación, para garantizar que estés preparado para que tu sitio se ejecute sin cookies de terceros:

1. [Audita el uso de cookies de terceros](#audit).
2. [Realiza pruebas para encontrar errores](#test).
3. Para las cookies entre sitios que almacenan datos por sitio, como una inserción, considere [`partitioned` con CHIPS](#partitioned).
4. Para cookies entre sitios en un pequeño grupo de sitios vinculados significativamente, considere [Conjuntos de sitios web relacionados](#rws).
5. Para otros casos de uso de cookies de terceros, [migrar a las API web relevantes](#migrate).


## 1. Audita tu uso de cookies de terceros {: #audit}

Las cookies de terceros se pueden identificar por su valor `SameSite=None`. Debes buscar en tu código instancias en las que se configuró el atributo `SameSite` con este valor. Si anteriormente se realizaron cambios para agregar `SameSite=None` a tus cookies alrededor de 2020, esos cambios pueden proporcionar un buen punto de partida.

El panel Chrome DevTools Network muestra las cookies configuradas y enviadas en las solicitudes. En el panel de la Aplicación puedes ver el encabezado Cookies en Almacenamiento. Puedes explorar las cookies almacenadas para cada sitio al que se accede como parte de la carga de la página. Puede ordenar por la columna "SameSite" para agrupar todas las cookies configuradas como "None".

{% Img src="image/VWw0b3pM7jdugTkwI6Y81n6f5Yc2/xYNwixxMkPfMmlMmKY4L.png", alt="Pestaña Problemas de DevTools que muestra una advertencia para SameSite=None cookies.", width="800", height="403" %}

Desde Chrome 118, la [pestaña Problemas de DevTools](/docs/devtools/issues/) muestra una advertencia sobre el cambio importante: "Las cookies enviadas en el contexto entre sitios se bloquearán en futuras versiones de Chrome". La advertencia enumera las cookies potencialmente afectadas para la página actual.

{% Aside %}

Estamos creando una extensión DevTools para facilitar el análisis del uso de cookies durante las sesiones de navegación. Esto proporcionará vías de depuración para cookies y funciones de Privacy Sandbox, con puntos de acceso para aprender y comprender los diferentes aspectos de la iniciativa Privacy Sandbox.
**¡Mantente atento a nuestro lanzamiento preliminar en noviembre de 2023!**

{% endAside %}

Si identificas cookies establecidas por terceros, tienes que consultar con esos proveedores para ver si tienen planes para eliminar gradualmente las cookies de terceros. Por ejemplo, es posible que necesites actualizar una versión de una biblioteca que estás utilizando, cambiar una opción de configuración en el servicio o no realizar ninguna acción si el tercero está manejando los cambios necesarios por sí mismo.


## 2. Realiza pruebas para encontrar errores {: #test }

Puedes iniciar Chrome usando el [indicador de línea de comando](/docs/web-platform/chrome-flags) `--test-third-party-cookie-phaseout` o desde Chrome 118, habilitar `chrome://flags/ #test-third-party-cookie-phaseout`. Esto configura Chrome para que bloquee las cookies de terceros y garantice que las nuevas funciones y mitigaciones estén activas para simular mejor el estado después de la eliminación gradual.

También puedes intentar navegar con las cookies de terceros bloqueadas a través de `chrome://settings/cookies`, pero ten en cuenta que la bandera garantiza que las funcionalidades nuevas que son alternativas para el uso de cookies también estén habilitadas. Bloquear las cookies de terceros es una buena manera de detectar problemas, pero no necesariamente demuestra que estén solucionados.

Si mantienes un conjunto de pruebas activo para tus sitios, entonces debes realizar dos ejecuciones en paralelo: una con Chrome en la configuración habitual y otra con la misma versión de Chrome iniciada con la bandera de `--test-third-party-cookie-phaseout` . Cualquier error de prueba en la segunda ejecución y no en la primera es un buen candidato para investigar las dependencias de cookies de terceros. Asegurate de [reportar los problemas](#report-issues) que encuentres.

Una vez que hayas identificado las cookies con problemas y comprendas los casos de uso para ellas, puedes trabajar con las siguientes opciones para elegir la solución necesaria.


## 3. Utilice cookies `partitioned` (particionadas) con CHIPS {: #partitioned }

Cuando tu cookie de terceros se utiliza en un contexto integrado 1:1 con el sitio de nivel superior, puede considerar usar el atributo "partitioned" como parte de las cookies con estado de partición independiente (CHIPS, por sus siglas en inglés) para permitir el acceso entre sitios con una cookie separada utilizada para cada sitio.

{% Img src="image/VWw0b3pM7jdugTkwI6Y81n6f5Yc2/5JLh0cCChr0bKOzp6XxP.png", alt="El atributo Partitioned permite configurar una cookie fav_store separada por sitio de nivel superior.", width="800", height="359" %}

Para implementar CHIPS, agrega el atributo `Partitioned` a tu encabezado `Set-Cookie`:

Al configurar "Partitioned", el sitio opta por almacenar la cookie en una partición de cookies separada dividida por sitio de nivel superior. En el ejemplo anterior, la cookie proviene de `store-finder.site`, que aloja un mapa de tiendas que permite al usuario guardar su tienda favorita. Al usar CHIPS, cuando `brand-a.site` incorpora `store-finder.site`, el valor de la cookie `fav_store` es `123`. Luego, cuando `brand-b.site` también incruste `store-finder.site`, configurarán y enviarán su propia instancia particionada de la cookie `fav_store`, por ejemplo con el valor `456`.

Esto significa que los servicios integrados aún pueden guardar el estado, pero no tienen almacenamiento compartido entre sitios que permitiría el seguimiento a través de distintos sitios.

**Posibles casos de uso:** inserciones de chat de terceros, inserciones de mapas de terceros, inserciones de pagos de terceros, equilibrio de carga de CDN de subrecursos, proveedores de CMS “headless”, dominios de espacio aislados para ofrecer contenido de usuario que no es de confianza, CDN de terceros que utilizan cookies para control de acceso, llamadas API de terceros que requieren cookies en las solicitudes, anuncios integrados con alcance estatal por editor.

**[Más información sobre CHIPS](/docs/privacy-sandbox/chips/)**


## 4. Utiliza conjuntos de sitios web relacionados {: #rws }

Cuando tu cookie de terceros solo se utiliza en una pequeña cantidad de sitios relacionados, puede considerar usar [Conjuntos de sitios web relacionados](/blog/related-website-sets/) (RWS) para permitir el acceso entre sitios para esas cookie dentro del contexto de esos sitios definidos.

Para implementar RWS, deberás [definir y enviar](https://github.com/GoogleChrome/first-party-sets/blob/main/RWS-Submission_Guidelines.md) el grupo de sitios para el conjunto. Para garantizar que los sitios estén relacionados significativamente, la política para un conjunto válido requiere agrupar esos sitios por: sitios asociados con una relación visible entre sí (por ejemplo, variantes de la oferta de productos de una empresa), dominios de servicio (por ejemplo, API, CDN) o dominios con código de país (por ejemplo, \*.uk, \*.jp).

{% Img src="image/VWw0b3pM7jdugTkwI6Y81n6f5Yc2/es7ld9MfMP8sowe7PZzC.png", alt="Los conjuntos de sitios web relacionados permiten el acceso a cookies dentro del contexto de los sitios declarados, pero no a través de otros sitios de terceros.", width="800", height ="359" %}

Los sitios pueden usar la API de acceso al almacenamiento para solicitar acceso a cookies entre sitios usando `requestStorageAccess()` o delegar el acceso usando `requestStorageAccessFor()`. Cuando los sitios están dentro del mismo conjunto, el navegador otorgará acceso automáticamente y las cookies entre sitios estarán disponibles.

Esto significa que los grupos de sitios relacionados aún pueden hacer uso de cookies entre sitios en un contexto limitado, pero no corren el riesgo de compartir cookies de terceros entre sitios no relacionados de una manera que permita el seguimiento entre sitios.

**Posibles casos de uso:** dominios específicos de aplicaciones, dominios específicos de marcas, dominios específicos de países, dominios de espacio aislado para ofrecer contenido de usuario que no es de confianza, dominios de servicios para API, CDN.

**[Más información sobre RWS](/blog/ related-website-sets/)**


## 5. Migrar a las API web relevantes {: #migrate }

CHIPS y RWS permiten tipos específicos de acceso a cookies entre sitios manteniendo la privacidad del usuario; sin embargo, los otros casos de uso de cookies de terceros deben migrar a alternativas centradas en la privacidad.

Privacy Sandbox proporciona una variedad de API diseñadas específicamente para casos de uso específicos sin necesidad de cookies de terceros:

* **[Federated Credential Management (FedCM)](/docs/privacy-sandbox/fedcm/)** habilita servicios de identidad federados que permiten a los usuarios iniciar sesión en sitios y servicios.
* **[Private State Tokens](/docs/privacy-sandbox/private-state-tokens/)** habilita la lucha contra el fraude y el correo no deseado mediante el intercambio de información limitada y no identificable entre sitios.
* **[Topics](/docs/privacy-sandbox/topics/overview/)** permite publicidad basada en intereses y personalización de contenido.
* **[Protected Audience](/docs/privacy-sandbox/protected-audience/)** permite el remarketing y las audiencias personalizadas.
* **[Informes de atribución](/docs/privacy-sandbox/attribution-reporting/)** permite medir las impresiones y conversiones de anuncios.

Además, Chrome admite la **[API de acceso al almacenamiento](https://developer.mozilla.org/docs/Web/API/Storage_Access_API/Using)** (SAA) para su uso en iframes con interacción del usuario. SAA ya es [compatible con Edge, Firefox y Safari](https://developer.mozilla.org/docs/Web/API/Storage_Access_API#browser_compatibility). Creemos que logra un buen equilibrio entre mantener la privacidad del usuario y al mismo tiempo permitir una funcionalidad crítica entre sitios con el beneficio de la compatibilidad entre navegadores.

Ten en cuenta que la API de acceso al almacenamiento mostrará un mensaje de permiso del navegador a los usuarios. Para brindar una experiencia de usuario óptima, solo avisaremos al usuario si el sitio que llama a `requestStorageAccess()` ha interactuado con la página incrustada y ha visitado previamente el sitio de terceros en un contexto de nivel superior. Una concesión exitosa permitirá el acceso a cookies entre sitios para ese sitio durante 30 días. Los casos de uso potenciales son incrustaciones autenticadas entre sitios, como widgets de comentarios de redes sociales, proveedores de pagos y servicios de video suscritos.

Si todavía tiene casos de uso de cookies de terceros que no están cubiertos por estas opciones, debe [informarnos del problema](#report-issues) y considerar si existen implementaciones alternativas que no dependan de la funcionalidad que pueda habilitar seguimiento inadvertido entre sitios.

## Soporte empresarial

Chrome administrado por empresas siempre tiene requisitos únicos en comparación con el uso general de la web y nos aseguraremos de que los administradores empresariales tengan controles adecuados sobre la desactivación de cookies de terceros en sus navegadores.

Como ocurre con la mayoría de los experimentos de Chrome, la mayoría de los usuarios finales empresariales quedarán excluidos automáticamente de la desactivación del 1 % de cookies de terceros. Para los pocos que puedan verse afectados, los administradores empresariales pueden establecer la [política de bloqueo de cookies de terceros](https://chromeenterprise.google/policies/#BlockThirdPartyCookies) en "falso" para desactivar sus navegadores administrados antes del experimento y dar tiempo para realizar cambios necesarios para no confiar en esta política ni en cookies de terceros. Puede leer más en las [notas de la versión de Chrome Enterprise](https://support.google.com/chrome/a/answer/7679408?sjid=16745203858910744446-EU#upChromeBrsrBB117).

También pretendemos proporcionar más informes y herramientas para ayudar a identificar el uso de cookies de terceros en sitios empresariales. Tenemos menos visibilidad de los navegadores empresariales en las métricas de uso de Chrome, lo que significa que es especialmente importante para las empresas [probar si hay errores](#test) e [informarnos de problemas](#report-issues).

Las integraciones de SaaS empresarial podrán utilizar la prueba de obsolescencia de terceros que se describe a continuación.


## Solicita tiempo adicional con la prueba de obsolescencia de terceros para casos de uso no publicitarios

Al igual que al deshabilitar otras funciones anteriormente en la Web, entendemos que hay casos en los que los sitios necesitan más tiempo para realizar los cambios necesarios. Cuando se trata de cambios relacionados con la privacidad como este, también tenemos que equilibrarlos con los mejores intereses de las personas que utilizan la web.

Planeamos ofrecer una [prueba de desactivación](/docs/web-platform/origin-trials/#deprecation-trials) para proporcionar una manera para que los sitios o servicios utilizados en un contexto entre sitios se registren para tener acceso a cookies de terceros durante un período de tiempo limitado.

{% Aside 'key-term' %}

Las pruebas de desactivación son un tipo de [prueba de origen](/docs/web-platform/origin-trials/#deprecation-trials) que permiten volver a habilitar temporalmente una función.

{% endAside %}

Compartiremos más detalles a medida que avancen los planes, pero comenzaremos con algunos principios clave:

* Será una prueba de desactivación de cookies de [terceros](/docs/web-platform/third-party-origin-trials/) que permitirá a las inserciones de terceros optar por continuar usando cookies de terceros temporalmente.
* El registro requerirá un proceso de revisión para garantizar que la prueba de desuso solo se use para funciones que afectan en gran medida los recorridos críticos de los usuarios y los registros se considerarán caso por caso.
* No interferirá con las [pruebas publicitarias previstas para principios de 2024, según lo descrito por la CMA](https://www.gov.uk/cma-cases/investigation-into-googles-privacy-sandbox-browser-changes#industry-testing). Como tal, esto significa que los casos de uso de publicidad no se considerarán para la prueba de desactivación.

**Siguiente paso:** Publicaremos una [Intención](https://goo.gle/blink-intents) en la [lista de correo de blink-dev](https://groups.google.com/a/chromium .org/g/blink-dev) con más detalles este mes y continuaremos actualizando la documentación aquí.


## Preservar las experiencias de usuario críticas

Las cookies entre sitios han sido una parte fundamental de la web durante más de un cuarto de siglo. Esto hace que cualquier cambio, especialmente un cambio radical, sea un proceso complejo que requiere un enfoque coordinado e incremental. Si bien los atributos de cookies adicionales y las nuevas API centradas en la privacidad representan la mayoría de los casos de uso, existen escenarios específicos en los que queremos asegurarnos de no interrumpir la experiencia de las personas que utilizan esos sitios.

Principalmente, se trata de flujos de autenticación o pago en los que un sitio de nivel superior abre una ventana emergente o redirige a un sitio de terceros para una operación y luego regresa al sitio de nivel superior, utilizando una cookie en el retorno o en el contexto incrustado. Tenemos la intención de proporcionar un conjunto temporal de heurísticas para identificar estos escenarios y permitir cookies de terceros durante un período de tiempo limitado, brindando a los sitios una ventana más larga para implementar los cambios necesarios.

**Siguiente paso:** Publicaremos una [Intención](https://goo.gle/blink-intents) en la [lista de correo de blink-dev](https://groups.google.com/a/chromium .org/g/blink-dev) con más detalles este mes y continuaremos actualizando la documentación aquí.


## Reportar problemas con cookies de terceros y obtener ayuda {: #report-issues }

Queremos asegurarnos de capturar los diversos escenarios en los que los sitios fallan sin cookies de terceros para asegurarnos de haber brindado guías, herramientas y funcionalidad para permitir que los sitios migren fuera de sus dependencias de cookies de terceros. Si tu sitio o un servicio del que depende no funciona con las cookies de terceros deshabilitadas, por favor envialo a nuestro rastreador de fallas en [goo.gle/report-3pc-broken](https://goo.gle/report-3pc-broken).

Si tienes preguntas sobre el proceso de desactivación y el plan de Chrome, puedes [plantear un nuevo problema usando la etiqueta "third-party cookie deprecation"](https://github.com/GoogleChromeLabs/privacy-sandbox-dev-support/issues /new/choose) en nuestro repositorio de soporte para desarrolladores.
