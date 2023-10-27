---
layout: 'layouts/doc-post.njk'
title:  'Prepárate para la eliminación gradual de las cookies de terceros'
subhead: >
  Aprende cómo auditar tu código para buscar cookies de terceros y qué medidas puedes tomar para asegurarte de que está todo listo para el fin de las cookies de terceros.
description: >
  Aprende cómo auditar tu código para buscar cookies de terceros y qué medidas puedes tomar para asegurarte de que está todo listo para el fin de las cookies de terceros.
date: 2023-05-17
updated: 2023-10-11
authors:
  - mihajlija
---

Las cookies de terceros son el mecanismo principal que permite el seguimiento entre sitios, seguimiento, en algunos casos, no aprobado explícitamente por el usuario.  Varios de los principales navegadores ya han impuesto restricciones a las cookies de terceros de alguna manera o están planeando hacerlo. Las cookies de terceros también permiten muchos casos de uso válidos, como gestionar el estado del contenido incrustado (embedding) o permitir sesiones de usuario en varios sitios.

Como parte del proyecto [Privacy Sandbox](https://privacysandbox.com/), Chrome está eliminando gradualmente la compatibilidad con cookies de terceros y proponiendo nuevas funciones para las cookies junto con APIs especialmente diseñadas para seguir admitiendo casos de uso legítimos y al mismo tiempo preservar privacidad del usuario. La eliminación será gradual [a partir de mediados de 2024](https://privacysandbox.com/open-web/#the-privacy-sandbox-timeline).

Para prepararte para el futuro sin seguimiento entre sitios, audita el uso de cookies y planifica las acciones necesarias si tu sitio se ve afectado.

## Prepárese para la eliminación gradual de las cookies de terceros

Hemos dividido el proceso en estos pasos clave, con detalles a continuación, para garantizar que estés preparado para que tu sitio se ejecute sin cookies de terceros:

1. [Audita el uso de cookies de terceros](#audit).
2. [Haz pruebas en busca de errores](#test).
3. Para las cookies entre sitios que almacenan datos por sitio, como una inserción(embed), considere [`Partitioned` cookies (cookies particionadas) con CHIPS](#paritioned).
4. Para cookies entre sitios en un pequeño grupo de sitios vinculados significativamente, considere [Conjuntos de sitios web relacionados](#rws).
5. Para otros casos de uso de cookies de terceros, [migrar a las API web relevantes](#migrate).


## 1. Audita el uso de cookies de terceros {: #audit}

Las cookies de terceros se pueden identificar por su valor `SameSite=None`. Debes buscar en tu código instancias en las que se configuró el atributo `SameSite` con este valor. Si anteriormente se realizaron cambios para agregar `SameSite=None` a tus cookies, alrededor de 2020, esos cambios pueden proporcionar un buen punto de partida.

El panel Chrome DevTools Network muestra las cookies configuradas y enviadas en las solicitudes. En el panel de la Aplicación puede ver el encabezado Cookies en Almacenamiento. Puedes explorar las cookies almacenadas para cada sitio al que se accede como parte de la carga de la página. Puedes ordenar por la columna "SameSite" para agrupar todas las cookies "None".

{% Img src="image/VWw0b3pM7jdugTkwI6Y81n6f5Yc2/xYNwixxMkPfMmlMmKY4L.png", alt="Pestaña Problemas de DevTools que muestra una advertencia para SameSite=None cookies.", width="800", height="403" %}

Desde Chrome 118, la [pestaña Problemas de DevTools](/docs/devtools/issues/) muestra el problema de cambio importante: "Las cookies enviadas en el contexto entre sitios se bloquearán en futuras versiones de Chrome". El problema enumera las cookies potencialmente afectadas para la página actual.

{% Aside %}

Estamos creando una extensión DevTools para facilitar el análisis del uso de cookies durante las sesiones de navegación. Esto proporcionará vías de depuración para cookies y funciones de Privacy Sandbox, con puntos de acceso para aprender y comprender los diferentes aspectos de la iniciativa Privacy Sandbox.
**¡Mantente atento a nuestro lanzamiento preliminar en noviembre de 2023!**

{% endAside %}

Si identificas cookies establecidas por terceros, debes consultar con esos proveedores para ver si tienen planes para eliminar gradualmente las cookies de terceros. Por ejemplo, es posible que necesites actualizar una versión de una biblioteca (library) que estás utilizando, cambiar una opción de configuración en el servicio o no realizar ninguna acción si el tercero está manejando los cambios necesarios por sí mismo.

### Mejora tus cookies propias

Si su cookie nunca se usa en un sitio de terceros, por ejemplo, si configura una cookie para administrar la sesión en tu sitio y nunca se usa en un iframe entre sitios, esa cookie siempre se usa en un contexto propio.

{% Img src="image/vgdbNJBYHma2o62ZqYmcnkq3j0o1/ArhVqaVr6O2X0mE0YYxp.png", alt="Diagrama que muestra una cookie de origen.", width="800", height="653" %}

Para identificar sus cookies propias o del mismo sitio (first party), busca:

- Cookies configuradas sin ningún atributo `SameSite`.
    -  `Set-Cookie: cookie-name=value;`
- Cookies con `SameSite` configuradas como `Lax` o `Strict`.
      - `Set-Cookie: cookie-name=value; SameSite=Lax;`
      - `Set-Cookie: cookie-name=value; SameSite=Strict;`

{% Aside 'important' %}
En este caso, su cookie no debería verse afectada por la eliminación gradual de las cookies de terceros.

Si no ha configurado explícitamente el atributo `SameSite` con un valor apropiado en su cookie de origen, debe hacerlo para garantizar un comportamiento coherente en todos los navegadores.

{% endAside %}

Hay una serie de otros valores predeterminados sensatos para otros atributos de cookies de origen en la receta de mejores prácticas:

```text
Set-Cookie:
__Host-cookiename=value;
Secure;
Path=/;
HttpOnly;
Max-Age=7776000;
SameSite=Lax
```

Para obtener más detalles, consulte [Recetas para cookies propias](https://web.dev/first-party-cookie-recipes).

### Comprende tus cookies de terceros

Las cookies que se envían en contextos entre sitios, como iframes o solicitudes de subrecursos, generalmente se denominan cookies de terceros.
{% Img src="image/vgdbNJBYHma2o62ZqYmcnkq3j0o1/NJLl1qG9AN8tD9GwR2jp.png", alt="Diagrama que muestra una cookie de terceros.", width="800", height="646" %}

[Algunos casos de uso de cookies de terceros](https://web.dev/articles/samesite-cookie-recipes#use_cases_for_cross_site_or_third_party_cookies) incluyen:

- Contenido incrustado compartido desde otros sitios, como vídeos, mapas, ejemplos de código y publicaciones sociales.
- Widgets de servicios externos como pagos, calendarios, reservas y funcionalidad de reservas.
- Widgets como botones sociales o servicios antifraude.
- Recursos remotos en una página, como etiquetas `<img>` o `<script>`, que dependen de que las cookies se envíen con una solicitud (comúnmente utilizadas para rastrear píxeles y personalizar contenido).

[En 2019, los navegadores cambiaron el comportamiento de las cookies, restringiéndolas al acceso de origen de forma predeterminada](https://web.dev/articles/samesite-cookies-explained#changes_to_the_default_behavior_ without_samesite). Cualquier cookie utilizada hoy en contextos entre sitios debe configurarse con el atributo `SameSite=None`.

```text
Set-Cookie: cookie-name=value; SameSite=None; Secure
```

{% Aside 'important' %}
Asegúrese de revisar sus cookies y tener una lista de aquellas configuradas con `SameSite=None`. Estas son las cookies respecto de las cuales deberá tomar medidas para garantizar que sigan funcionando correctamente.
{% endAside %}

## 2. Haz pruebas en busca de errores {: #test }

Puedes iniciar Chrome usando `--test-third-party-cookie-phaseout` [como un indicador de línea de comando](/docs/web-platform/chrome-flags) o desde Chrome 118, puedes habilitar `chrome://flags/#test-third-party-cookie-phaseout`. Esto configurará Chrome para que bloquee las cookies de terceros y garantice que las nuevas funciones y mitigaciones estén activas para simular mejor el estado después de la eliminación gradual.

También puedes intentar navegar con las cookies de terceros bloqueadas a través de `chrome://settings/cookies`, pero ten en cuenta que la bandera garantiza que la funcionalidad nueva y actualizada también esté habilitada. Bloquear las cookies de terceros es una buena manera de detectar problemas, pero no necesariamente valida que los haya solucionado.

Si mantienes un conjunto de pruebas activo para tus sitios, entonces debes realizar dos ejecuciones en paralelo: una con Chrome en la configuración habitual y otra con la misma versión de Chrome iniciada con `--test-third-party-cookie-phaseout`. Cualquier error de prueba en la segunda ejecución y no en la primera es un buen candidato para investigar las dependencias de cookies de terceros. Asegurate de [reportar los problemas](#report-issues) que encuentre.

Una vez que hayas identificado las cookies con problemas y comprenda los casos de uso para ellas, puedes trabajar con las siguientes opciones para elegir la solución necesaria.


## 3. Utilice cookies `partitioned`(particionadas) con CHIPS {: #partitioned }

Cuando su cookie de terceros se utiliza en un contexto integrado 1:1 con el sitio de nivel superior, puedes considerar usar el atributo "partitioned" como parte de las cookies con estado de partición independiente (CHIPS, por sus siglas en inglés) para permitir el acceso entre sitios. con una cookie separada utilizada por sitio.

{% Img src="image/VWw0b3pM7jdugTkwI6Y81n6f5Yc2/5JLh0cCChr0bKOzp6XxP.png", alt="El atributo partitioned permite configurar una cookie fav_store separada por sitio de nivel superior.", width="800", height="359" %}

Para implementar CHIPS, agrega el atributo `Partitioned` a tu encabezado `Set-Cookie`:

Al configurar "Partitioned", el sitio opta por almacenar la cookie en un recipiente de cookies separado dividido por sitio de nivel superior. En el ejemplo anterior, la cookie proviene de `store-finder.site`, que aloja un mapa de tiendas que permite al usuario guardar su tienda favorita. Al usar CHIPS, cuando `brand-a.site` incorpora `store-finder.site`, el valor de la cookie `fav_store` es `123`. Luego, cuando `brand-b.site` también incruste `store-finder.site`, configurarán y enviarán su propia instancia particionada de la cookie `fav_store`, por ejemplo con el valor `456`.

Esto significa que los servicios integrados aún pueden guardar el estado, pero no tienen almacenamiento compartido entre sitios que permitiría el seguimiento entre sitios.

**Posibles casos de uso:** inserciones de chat de terceros, inserciones de mapas de terceros, inserciones de pagos de terceros, equilibrio de carga de CDN de subrecursos, proveedores de CMS sin cabeza, dominios de espacio aislado para ofrecer contenido de usuario que no es de confianza, CDN de terceros que utilizan cookies para control de acceso, llamadas API de terceros que requieren cookies en las solicitudes, anuncios integrados con alcance estatal por editor.

**[Más información sobre CHIPS](/docs/privacy-sandbox/chips/)**


## 4. Utilice conjuntos de sitios web relacionados {: #rws }

Cuando su cookie de terceros sólo se utiliza en una pequeña cantidad de sitios relacionados, puede considerar usar [Conjuntos de sitios web relacionados](/en/blog/related-website-sets/) (RWS) para permitir el acceso entre sitios para esa cookie dentro del contexto de esos sitios definidos.

Para implementar RWS, deberá [definir y enviar](https://github.com/GoogleChrome/first-party-sets/blob/main/RWS-Submission_Guidelines.md) el grupo de sitios para el conjunto. Para garantizar que los sitios están relacionados significativamente, la política para un conjunto válido requiere agrupar esos sitios por: sitios asociados con una relación visible entre sí (por ejemplo, variantes de la oferta de productos de una empresa), dominios de servicio (por ejemplo, API, CDN) o dominios con código de país (por ejemplo, \*.uk, \*.jp).

{% Img src="image/VWw0b3pM7jdugTkwI6Y81n6f5Yc2/es7ld9MfMP8sowe7PZzC.png", alt="Los conjuntos de sitios web relacionados permiten el acceso a cookies dentro del contexto de los sitios declarados, pero no a través de otros sitios de terceros.", width="800", height ="359" %}

Los sitios pueden usar la API de acceso al almacenamiento para solicitar acceso a cookies entre sitios usando `requestStorageAccess()` o delegar el acceso usando `requestStorageAccessFor()`. Cuando los sitios están dentro del mismo conjunto, el navegador otorgará acceso automáticamente y las cookies entre sitios estarán disponibles.

Esto significa que los grupos de sitios relacionados aún pueden hacer uso de cookies entre sitios en un contexto limitado, pero no corren el riesgo de compartir cookies de terceros entre sitios no relacionados de una manera que permita el seguimiento entre sitios.

**Posibles casos de uso:** dominios específicos de aplicaciones, dominios específicos de marcas, dominios específicos de países, dominios de espacio aislado para ofrecer contenido de usuario que no es de confianza, dominios de servicios para API, CDN.

**[Más información sobre RWS](/blog/related-website-sets/)**


## 5. Migrar a las API web relevantes {: #migrate }

CHIPS y RWS permiten tipos específicos de acceso a cookies entre sitios manteniendo la privacidad del usuario; sin embargo, los otros casos de uso de cookies de terceros deben migrar a alternativas centradas en la privacidad.

Privacy Sandbox proporciona una variedad de API diseñadas específicamente para casos de uso específicos sin necesidad de cookies de terceros:

* **[Federated Credential Management (FedCM)](/docs/privacy-sandbox/fedcm/)** habilita servicios de identidad federados que permiten a los usuarios iniciar sesión en sitios y servicios.
* **[Private State Tokens](/docs/privacy-sandbox/private-state-tokens/)** habilita la lucha contra el fraude y el correo no deseado mediante el intercambio de información limitada y no identificable entre sitios.
* **[Topics](/docs/privacy-sandbox/topics/overview/)** permite publicidad basada en intereses y personalización de contenido.
* **[Protected Audience](/docs/privacy-sandbox/protected-audience/)** permite el remarketing y las audiencias personalizadas.
* **[Informes de atribución](/docs/privacy-sandbox/attribution-reporting/)** permite medir las impresiones y conversiones de anuncios.

Además, Chrome admite la **[API de acceso al almacenamiento](https://developer.mozilla.org/docs/Web/API/Storage_Access_API/Using)** (SAA) para su uso en iframes con interacción del usuario. SAA ya es [compatible con Edge, Firefox y Safari](https://developer.mozilla.org/docs/Web/API/Storage_Access_API#browser_compatibility). Creemos que logra un buen equilibrio entre mantener la privacidad del usuario y al mismo tiempo permitir una funcionalidad crítica entre sitios con el beneficio de la compatibilidad entre navegadores.

Tenga en cuenta que la API de acceso al almacenamiento mostrará un mensaje de permiso del navegador a los usuarios. Para brindar una experiencia de usuario óptima, solo avisaremos al usuario si el sitio que llama a `requestStorageAccess()` ha interactuado con la página incrustada y ha visitado previamente el sitio de terceros en un contexto de nivel superior. Una concesión exitosa permitirá el acceso a cookies entre sitios para ese sitio durante 30 días. Los casos de uso potenciales son incrustaciones autenticadas entre sitios, como widgets de comentarios de redes sociales, proveedores de pagos y servicios de video suscritos.

Si todavía tiene casos de uso de cookies de terceros que no están cubiertos por estas opciones, debe [informarnos del problema](#report-issues) y considerar si existen implementaciones alternativas que no dependan de la funcionalidad que pueda habilitar la interacción cruzada. -seguimiento del sitio.


## Soporte empresarial

Chrome administrado por empresas siempre tiene requisitos únicos en comparación con el uso general de la web y nos aseguraremos de que los administradores empresariales tengan controles adecuados sobre la desactivación de cookies de terceros en sus navegadores.

Como ocurre con la mayoría de los experimentos de Chrome, la mayoría de los usuarios finales empresariales quedarán excluidos automáticamente de la desactivación del 1 % de cookies de terceros. Para los pocos que puedan verse afectados, los administradores empresariales pueden establecer la [política de bloqueo de cookies de terceros](https://chromeenterprise.google/policies/#BlockThirdPartyCookies) en "falso" para desactivar sus navegadores administrados antes del experimento y dar tiempo para realizar cambios necesarios para no confiar en esta política ni en cookies de terceros. Puede leer más en las [notas de la versión de Chrome Enterprise](https://support.google.com/chrome/a/answer/7679408?sjid=16745203858910744446-EU#upChromeBrsrBB117).

También pretendemos proporcionar más informes y herramientas para ayudar a identificar el uso de cookies de terceros en sitios empresariales. Tenemos menos visibilidad de los navegadores empresariales en las métricas de uso de Chrome, lo que significa que es especialmente importante para las empresas [hagan pruebas para encontrar errores](#test) e [informarnos de problemas](#report-issues).

Las integraciones de SaaS empresarial podrán utilizar la prueba de obsolescencia de terceros que se describe a continuación.


## Solicite tiempo adicional con la prueba de obsolescencia de terceros para casos de uso no publicitarios

Al igual que con muchas desaprobaciones anteriores en la Web, entendemos que hay casos en los que los sitios necesitan más tiempo para realizar los cambios necesarios. Cuando se trata de cambios relacionados con la privacidad como este, también tenemos que equilibrarlos con los mejores intereses de las personas que utilizan la web.

Planeamos ofrecer una [prueba de desactivación](/docs/web-platform/origin-trials/#deprecation-trials) para proporcionar una manera para que los sitios o servicios utilizados en un contexto entre sitios se registren para tener acceso continuo a cookies de terceros durante un período de tiempo limitado.

{% Aside 'key-term' %}

Las pruebas de desactivación son un tipo de [prueba de origen](/docs/web-platform/origin-trials/#deprecation-trials) que permiten volver a habilitar temporalmente una función.

{% endAside %}

Compartiremos más detalles a medida que avancen los planes, pero comenzaremos con algunos principios clave:

* Será una prueba de desactivación de [terceros](/docs/web-platform/third-party-origin-trials/) que permitirá a las inserciones de terceros optar por continuar usando cookies de terceros temporalmente.
* El registro requerirá un proceso de revisión para garantizar que la prueba de desuso solo se use para funciones que afectan en gran medida los recorridos críticos de los usuarios y los registros se considerarán caso por caso.
* No interferirá con las [pruebas publicitarias previstas para principios de 2024, según lo descrito por la CMA](https://www.gov.uk/cma-cases/investigation-into-googles-privacy-sandbox-browser- cambios#industry-testing). Como tal, esto significa que los casos de uso de publicidad no se considerarán para la prueba de desactivación.

**Siguiente paso:** Publicaremos una [Intención](https://goo.gle/blink-intents) en la [lista de correo de blink-dev](https://groups.google.com/a/chromium .org/g/blink-dev) con más detalles este mes y continuaremos actualizando la documentación aquí.


## Preservar las experiencias de usuario críticas

Las cookies entre sitios han sido una parte fundamental de la web durante más de un cuarto de siglo. Esto hace que cualquier cambio, especialmente un cambio radical, sea un proceso complejo que requiere un enfoque coordinado e incremental. Si bien los atributos de cookies adicionales y las nuevas API centradas en la privacidad representan la mayoría de los casos de uso, existen escenarios específicos en los que queremos asegurarnos de no interrumpir la experiencia de las personas que utilizan esos sitios.

Principalmente, se trata de flujos de autenticación o pago en los que un sitio de nivel superior abre una ventana emergente o redirige a un sitio de terceros para una operación y luego regresa al sitio de nivel superior, utilizando una cookie en ese viaje de retorno o en el contexto incrustado. Tenemos la intención de proporcionar un conjunto temporal de heurísticas para identificar estos escenarios y permitir cookies de terceros durante un período de tiempo limitado, brindando a los sitios una ventana más larga para implementar los cambios necesarios.

**Siguiente paso:** Publicaremos una [Intención](https://goo.gle/blink-intents) en la [lista de correo de blink-dev](https://groups.google.com/a/chromium .org/g/blink-dev) con más detalles este mes y continuaremos actualizando la documentación aquí.


## Informar problemas con cookies de terceros y obtener ayuda {: #report-issues }

Queremos asegurarnos de capturar los diversos escenarios en los que los sitios fallan sin cookies de terceros para asegurarnos de haber brindado orientación, herramientas y funcionalidad para permitir que los sitios migren fuera de sus dependencias de cookies de terceros. Si su sitio o un servicio del que depende no funciona con las cookies de terceros deshabilitadas, puede enviarlo a nuestro registro de errores en [goo.gle/report-3pc-broken](https://goo.gle/report-3pc-broken).

Si tienes preguntas sobre el proceso de desactivación y el plan de Chrome, puedes [plantear un nuevo problema usando la etiqueta "third-party cookie deprecation"](https://github.com/GoogleChromeLabs/privacy-sandbox-dev-support/issues/new/choose) en nuestro repositorio de soporte para desarrolladores.