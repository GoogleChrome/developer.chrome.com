---
layout: 'layouts/doc-post.njk'
title: 'La API de Topics'
subhead: >
  Enable interest-based advertising, without having to resort to tracking the sites a user visits.
description: >
 A proposal for a mechanism to enable interest-based advertising without having to resort to tracking the sites a user visits.
date: 2022-02-14
updated: 2022-02-14
authors:
  - samdutton
---

## Estado de implementación

En este documento, se describe una propuesta nueva para la publicidad basada en intereses: la API de
Topics. 

-  La [propuesta de la API de Topics](https://github.com/jkarlin/topics) se debatió [en
   público](https://github.com/jkarlin/topics/issues). 
-  Esta propuesta necesita tus comentarios. Si tienes comentarios, crea una entrada en el
   [repositorio de explicación de temas](https://github.com/jkarlin/topics) o participa en debates
   en el 
   [grupo de ubicaciones de la empresa para mejorar la publicidad web](https://www.w3.org/community/web-adv/participants).
   La explicación tiene algunas [preguntas abiertas](https://github.com/jkarlin/topics/issues) que
   todavía necesitan una definición más detallada.
-  La API aún no se implementó en ningún navegador.
-  [El cronograma de Privacy Sandbox](http://privacysandbox.com/timeline) muestra los tiempos de
   implementación para la API de Topics y otras propuestas de Privacy Sandbox.

## ¿Por qué necesitamos esta API?

La API de Topics es un mecanismo propuesto por
[Privacy Sandbox](/docs/privacy-sandbox/overview/) a fin de permitir la
publicidad basada en intereses, sin necesidad de realizar un seguimiento de los sitios que visita un
usuario.    

{% Aside %}

La **publicidad basada en intereses (IBA)** es una forma de publicidad personalizada en la que
se seleccionan anuncios para los usuarios en función de sus intereses, inferidos a partir de los
sitios que visitaron recientemente. Esto es diferente de la publicidad contextual, que tiene
como objetivo coincidir con el contenido de las páginas que visita el usuario.   
La IBA puede ayudar a los anunciantes a llegar a los clientes potenciales y a financiar sitios
web que, de otro modo, no podrían monetizar las visitas a su sitio fácilmente solo con la
publicidad contextual. La IBA también puede complementar la información contextual de la página
actual a fin de encontrar un anuncio adecuado para el visitante.  

{% endAside %}

La API de Topics propone una forma de mostrar temas que podrían interesarle al usuario en ese
momento en función de su actividad de navegación reciente. Estos temas pueden complementar la
información contextual a fin de seleccionar anuncios adecuados.  
La API de Topics tiene tres tareas principales:

-  Asignar nombres de host del sitio web a los temas de interés. Por ejemplo, un sitio web de
   yoga puede clasificarse como relacionado a "Ejercicio". 
-  Calcular los temas principales de un usuario en función de su actividad de navegación reciente. 
-  Proporcionar una API de JavaScript para mostrar temas que actualmente son de interés para el
   usuario, a fin de permitir la selección de anuncios adecuados. 

La API de Topics puede ayudar a facilitar controles sólidos de usuario, ya que se basa en temas
reconocibles y de alto nivel. Chrome planea ofrecer a los usuarios la opción de quitar temas
individuales y mostrarles los temas almacenados en el navegador. 

## ¿Cómo se organizan y seleccionan los temas?

Se seleccionan los temas de una
[taxonomía](https://github.com/jkarlin/topics/blob/main/taxonomy_v1.md): una lista de elementos como
"Música country", "Maquillaje y cosméticos" o "Cocina vegetariana". Al principio, Chrome
seleccionaría estos temas para pruebas, pero con el objetivo de que la taxonomía de temas se
convierta en un recurso mantenido por colaboradores de confianza del ecosistema. La taxonomía debe
proporcionar un conjunto de temas que sea lo suficientemente pequeño (en la actualidad, se proponen
alrededor de 350, aunque se espera que la cantidad final de temas esté entre unos cientos y unos
miles) para que se asocien muchos navegadores a cada tema. Para evitar categorías sensibles, estos
temas deben ser públicos, estar seleccionados por humanos y mantenerse actualizados. La taxonomía
inicial propuesta para las pruebas de Chrome fue seleccionada por humanos
[a fin de excluir categorías que se suelen considerar sensibles](#sensitive-topics),
como la etnia o la orientación sexual.  
  
La API de Topics propone usar el
[aprendizaje automático](https://royalsociety.org/topics-policy/projects/machine-learning/what-is-machine-learning-infographic/)
para inferir temas a partir de nombres de host. Inicialmente, el proveedor del navegador o un
tercero de confianza entrenará el modelo clasificador para esto con nombres de host y temas
seleccionados por humanos. El modelo se distribuiría con el navegador, por lo que se desarrollará
abiertamente y estará disponible libremente. El navegador del dispositivo del usuario podrá usar el
modelo para calcular los temas más populares del usuario en función de los [nombres de
host](https://web.dev/same-site-same-origin/#origin) de los sitios visitados recientemente.   

En el siguiente diagrama, se muestra un ejemplo simplificado que muestra cómo la API de Topics,
podría ayudar a una plataforma de AdTech a seleccionar un anuncio adecuado. En este ejemplo, se
supone que el navegador del usuario ya tiene un modelo para asignar nombres de host de sitios web a
temas.

{% Img src="image/80mq7dk16vVEg8BBhsVe42n6zn82/u9e1VvzblNVHCfyk1hRY.png",
  alt="Diagram showing the stages in the Topics API lifecycle, from a user visiting websites to an ad
  being displayed.", width="800", height="275" %}

El ciclo de vida de la API de Topics:
[ver una versión más grande](https://wd.imgix.net/image/80mq7dk16vVEg8BBhsVe42n6zn82/u9e1VvzblNVHCfyk1hRY.png?auto=format&w=1600)

## ¿Cómo funciona la API de Topics?

{% Aside %}

La propuesta de la API de Topics se encuentra en la
[fase de debate inicial](/docs/privacy-sandbox/cds21-update/#discussion)
para recopilar comentarios del ecosistema y tomar medidas al respecto.   

El diseño de la API no es definitivo. Los detalles que se mencionan a continuación cambiarán a
medida que avancen los debates.  

{% endAside %}

Un mecanismo para facilitar la publicidad basada en intereses, como la API de Topics, debe
garantizar que los temas de interés que proporciona estén actualizados.  

{: #epoch}

Con la propuesta de la API de Topics, el navegador inferirá emas para un usuario en función de su
actividad de navegación durante un período, conocido como _época_ (actualmente, se propone una
semana). El tema seleccionado para cada época se elegirá de forma aleatoria de los cinco temas
principales del usuario para ese período. Para mejorar aún más la privacidad y garantizar que todos
los temas estén representados, existe una probabilidad del 5% de que el tema se elija de forma
aleatoria de todos los temas posibles en la taxonomía.  

La API de Topics JavaScript tiene un método: `document.browsingTopics()`. Esto muestra una array
de hasta tres temas, uno para cada una de las tres épocas más recientes, en orden aleatorio.   
La explicación de temas propone que cada objeto de tema de la array que muestra
`document.browsingTopics()` tenga tres propiedades:

-  `id`: la ID del tema en la taxonomía
-  `taxonomyVersion`: el conjunto de temas que usa el navegador actualmente
-  `classifierVersion`: el clasificador de aprendizaje automático que se usa para inferir los
   temas del sitio a partir de nombres de host  

{% Aside %}

Actualmente, el diseño de la API de Topics se está debatiendo como una
[explicación](https://github.com/jkarlin/topics), que es solo el primer paso del proceso de
estandarización. La API no está finalizada.   
Los parámetros que se describen en este artículo y los detalles de la API (como el tamaño de la
taxonomía, la cantidad de temas calculados por semana y la cantidad de temas que se muestran por
llamada) están sujetos a cambios a medida que incorporamos comentarios del ecosistema e iteramos
en la API

{% endAside %}

{: #observed-topics}

### Los llamadores de API solo reciben los temas que hayan observado

Un objetivo de diseño de la API de Topics es habilitar la publicidad basada en intereses sin
compartir la información con más entidades de las que actualmente son posibles con las cookies de
terceros. La API de Topics propone que los temas solo se muestren a los llamadores de API que ya los
hayan observado anteriormente en un plazo determinado.  

{: #caller}

{% Aside 'key-term' %}

Un llamador de la API de Topics es la entidad que _llama_ al método de JavaScript
`document.browsingTopics()` y que utilizará los temas que muestra el método para seleccionar
anuncios relevantes. Por lo general, una llamada a `document.browsingTopics()` proviene del código incluido en un
sitio de un tercero, por ejemplo, una plataforma de AdTech. El navegador determina al llamador a
partir del sitio del documento actual. Por lo tanto, si eres un tercero en una página, asegúrate
de llamar a la API desde un iframe que posea tu sitio.  

Para que `document.browsingTopics()` muestre uno o más temas, el método debe llamarse con el
código del mismo origen que el código del sitio donde se observaron esos temas.  

{% endAside %}

Se dice que un llamador de API _observó_ un tema para un usuario si llamó al método
`document.browsingTopics()` con el código incluido en un sitio que la API de Topics asignó a ese
tema. Por ejemplo: 

1. La API de Topics asigna el nombre de host `knitting.example` a los temas, incluido "Telas y
   artes textiles".
1. El código de `adtech.example` está incluido en las páginas de `knitting.example`.
1. Un usuario visita `knitting.example`.
1. El código `adtech.example` llama al método `document.browsingTopics(). `
1. Uno de los temas que el navegador infirió para knitting.example es "Telas y artes textiles".
1. Se dice que `adtech.example` observó el tema "Telas y artes textiles" para ese usuario.

El método `document.browsingTopics()` de la API solo proporcionará temas que el llamador ya haya
observado en las tres
[épocas](#epoch)
más recientes. De esta manera, se evita que la información sobre el usuario se comparta con más
entidades que las tecnologías que reemplaza la API (incluidas las cookies de terceros).   

La cantidad de temas que muestra `document.browsingTopics()` depende de la cantidad de temas que el
[llamador de API](#caller)
observó anteriormente y la cantidad de temas que el usuario tiene disponibles (como la cantidad de
semanas de datos acumulados). Se pueden mostrar de cero a tres temas.

### ¿Cómo se vería la API de Topics JavaScript?

El siguiente código es un ejemplo básico de un uso posible de la API (para simplificar el caso, no
habrá errores).  

{% Aside 'warning' %}

Este fragmento de código se utiliza solo para mostrar cómo podría ser una API de Topics
JavaScript. El diseño de la API está sujeto a cambios, y este código no funcionará en ningún
navegador en este momento.  

{% endAside %}

```javascript
// Get the array of top topics for this user.
const topics = await document.browsingTopics();

// Request an ad creative.
const response = await fetch('https://ads.example/get-creative', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(topics)
})

// Get the JSON from the response.
const creative = await response.json();

// Display ad.
```

### ¿De qué manera la API de Topics decide qué llamadores pueden ver qué tema?

Los llamadores de API solo reciben temas que han observado recientemente, y los temas de un usuario
se actualizan una vez por cada época. Esto significa que la API proporciona un período de
implementación en el que un llamador determinado puede recibir ciertos temas.  
En la siguiente tabla, se muestra un ejemplo (más pequeño que un caso real) de un historial de
navegación hipotético de un usuario en una época determinada. Se muestran los temas asociados a los
sitios que visitó el usuario y la API que los
[llamadores](#caller)
presentan en cada sitio (entidades que llaman al método `document.browsingTopics()` en el código de
JavaScript incluido en el sitio).

<table>
<thead>
<tr>
<th style="text-align: left;"><strong>Sitio</strong></th>
<th style="text-align: left;"><strong>Temas</strong></th>
<th style="text-align: left;"><strong>Llamadores de API en el sitio</strong></th>
</tr>
</thead>
<tbody>
<tr>
<td>yoga.example</td>
<td>Entrenamiento</td>
<td>adtech1.example adtech2.example</td>
</tr>
<tr>
<td>knitting.example</td>
<td>Manualidades</td>
<td>adtech1.example</td>
</tr>
<tr>
<td>hiking-holiday.example</td>
<td>Entrenamiento, <br>
Viajes y transporte</td>
<td>adtech2.example</td>
</tr>
<tr>
<td>diy-clothing.example</td>
<td>Manualidades, Moda y estilo</td>
<td>[none]</td>
</tr>
</tbody>
</table>

Al final de la época (que actualmente es de una semana), la API de Topics genera los temas
principales del navegador para la semana.

-  adtech1.example ahora puede recibir los temas "Entrenamiento" y "Manualidades", ya que los
   observó en yoga.example y knitting.example. 
-  adtech1.example no puede recibir el tema "Viajes y transporte" para este usuario, ya que no
   está presente en ningún sitio que el usuario visitó recientemente y que esté asociado a ese tema.
-  adtech2.example vio los temas "Entrenamiento" y "Viajes y transporte", pero no vio el tema
   "Manualidades".

El usuario visitó diy-clothing.example, que tiene el tema "moda", pero no hay llamadas a la API de
Topics en ese sitio, lo que significa que la API no mostrará el tema "moda" para ningún llamador.  
En la segunda semana, el usuario visita otro sitio:

<table>
<thead>
<tr>
<th style="text-align: left;"><strong>Sitio</strong></th>
<th style="text-align: left;"><strong>Temas</strong></th>
<th style="text-align: left;"><strong>Llamadores de API en el sitio</strong></th>
</tr>
</thead>
<tbody>
<tr>
<td>sewing.example</td>
<td>Manualidades</td>
<td>adtech2.example</td>
</tr>
</tbody>
</table>

Además, se agrega el código de adtech2.example a diy-clothing.example:

<table>
<thead>
<tr>
<th style="text-align: left;"><strong>Sitio</strong></th>
<th style="text-align: left;"><strong>Temas</strong></th>
<th style="text-align: left;"><strong>Llamadores de API en el sitio</strong></th>
</tr>
</thead>
<tbody>
<tr>
<td>diy-clothing.example</td>
<td>Manualidades, Moda y estilo</td>
<td>adtech2.example</td>
</tr>
</tbody>
</table>

Esto significa que, además de "Entrenamiento" y "Viajes y transporte" de la semana 1,
adtech2.example ahora podrá recibir los temas "Manualidades" y "Moda y estilo", pero recién en la
siguiente época, la semana 3. De esta manera, se garantiza que los terceros no puedan obtener más
información sobre el pasado de un usuario (en este caso, un interés en la moda) como sí podrían
hacerlo con las cookies.  

Después de otras dos semanas, podrían quitarse "Entrenamiento" y "Viajes y transporte" de la lista
de temas aptos de adtech2.example si el usuario no visita ningún sitio con esos temas que incluyan
el código de adtech2.example.

### ¿De qué manera la API infiere los temas de un sitio?

La explicación de la API de Topics propone que los temas derivan de un [modelo de
clasificación](https://github.com/jkarlin/topics#:~:text=classifier) que asigna los [nombres de
host](https://web.dev/same-site-same-origin/#origin) del sitio web a cero o más temas.   
Si se analizara más información (como las URL completas o el contenido de las páginas), podrían
habilitarse anuncios más relevantes, pero también podría verse afectada la privacidad.   

El modelo de clasificación para asignar nombres de host a temas estaría disponible de forma pública,
y la explicación sugiere que sería posible ver los temas de un sitio a través de las herramientas
para desarrolladores de los navegadores. El modelo de asignación se actualizaría de forma periódica;
aún no se determinó la frecuencia de esta acción.

### ¿Cómo se seleccionan los cinco temas principales del usuario?

La API muestra un tema para cada época, hasta un máximo de tres. Si se muestran tres, se incluyen
temas para la época actual y las dos anteriores. 

1. Al final de cada época, el navegador compila una lista de páginas que cumplen con los
   siguientes criterios: 
   1. El usuario visitó la página durante la época.
   1. La página incluye un código que llama a `document.browsingTopics()` 
   1. Se habilitó la API (p. ej., no la bloqueó el usuario ni un
      [encabezado de respuesta](https://developer.mozilla.org/docs/Web/HTTP/Headers/Feature-Policy)).

1. En el dispositivo del usuario, el navegador usa el modelo de clasificación que proporciona la
   API de Topics para asignar el nombre de host de cada página a una lista de temas.
1. El navegador acumula la lista de temas.
1. El navegador genera una lista de los cinco temas principales, ordenados por frecuencia.

El método `document.browsingTopics()` muestra un tema aleatorio de los cinco principales para cada
época, con un 5% de probabilidades de que cualquiera de estos se elija de forma aleatoria a partir
de la taxonomía completa de temas.  
En Chrome, los usuarios también podrían quitar temas individuales o borrar su historial de
navegación para reducir la cantidad de temas que muestra la API. Los usuarios también pueden
inhabilitar la API: consulta la sección
[Inhabilitación del usuario](#opt-out).

## ¿Cómo aborda la API de Topics las inquietudes con las FLoC?

La prueba de origen de las [FLoC](https://github.com/WICG/floc) en 2021 recibió una gran variedad de
comentarios de los colaboradores de Adtech y del ecosistema web. En particular, hubo inquietudes
respecto de que las cohortes de las FLoC podrían usarse como plataformas de creación de huellas
digitales para identificar usuarios o que podrían revelar la asociación de un usuario con una
categoría sensible. También se realizaron llamadas con el objetivo de que las FLoC fueran más
transparentes y comprensibles para los usuarios.   

La API de Topics se diseñó teniendo en cuenta estos comentarios para explorar otras formas de
respaldar la publicidad basada en intereses, con transparencia mejorada, garantías de privacidad más
sólida y un enfoque diferente para las categorías sensibles.

### Reduce la creación de huellas digitales

La API de Topics propone varios mecanismos para ayudar a garantizar que sea difícil volver a
identificar una cantidad significativa de usuarios en varios sitios solo con la API de Topics: 

-  La taxonomía de Topics proporciona un conjunto de temas aproximados (la primera taxonomía
   tiene alrededor de 350 en total), es decir que cada tema probablemente tenga una gran cantidad
   de usuarios (según la cantidad total de usuarios que tenga el navegador en cuestión). De hecho,
   hay una cantidad mínima garantizada de usuarios por tema, porque el 5 % de las veces, el tema
   que se muestra es aleatorio.
-  Se muestran los cinco primeros temas del usuario de manera aleatoria.
-  El 5 % de las veces, se proporciona un tema aleatorio de un conjunto completo de temas.
-  Si un usuario visita con frecuencia el mismo sitio (por ejemplo, todas las semanas), el código
   que se ejecuta en el sitio solo puede aprender como máximo un tema nuevo por semana.
-  Cada sitio recibirá temas distintos para el mismo usuario en la misma época. Solo hay una
   probabilidad de una en cinco de que el tema que se muestra para un usuario en un sitio coincida
   con el de otro sitio. Esto hace que sea más difícil determinar si se trata del mismo usuario.
-  Los temas se actualizan para un usuario una vez por semana, lo que limita la frecuencia con la
   que se puede compartir la información. 
-  Solo se mostrará un tema para un llamador de API que
   [anteriormente observó el mismo tema](#observed-topics)
   para el mismo usuario recientemente. Este modelo ayuda a limitar el potencial de las entidades
   para obtener (o compartir) información sobre los intereses de los usuarios que no han observado
   de primera mano. 

{: #sensitive-topics}

### Temas sensibles

La [taxonomía](https://github.com/jkarlin/topics/blob/main/taxonomy_v1.md) de Topics será de
carácter público y seleccionada por humanos para evitar categorías sensibles.   
Además, los sitios y los usuarios pueden
[inhabilitar](#opt-out)
la API de Topics. 

{% Aside %}

Tal como lo describe la explicación de la propuesta de Topics: "Las cookies de terceros pueden usarse para registrar todo sobre los usuarios, desde las URL exactas que visite hasta el contenido preciso de esas páginas. Esto puede incluir material sensible ilimitado. La API de Topics, por otro lado, está restringida a una taxonomía de temas seleccionada por humanos. Esto no quiere decir que los demás aspectos no se puedan correlacionar de manera estadística con los temas de esa taxonomía. Eso es posible. Pero, cuando se comparan ambos métodos, Topics es una mejora clara con respecto a las cookies".

{% endAside %}


### Transparencia y controles de usuario

Los usuarios deben poder comprender el propósito de la API de Topics, reconocer lo que se dice sobre
ellos, saber cuándo la API está en uso y recibir controles para habilitarla o inhabilitarla.  
La taxonomía legible de la API permite que las personas conozcan y controlen los temas que se les
pueden sugerir en su navegador. Pueden quitar temas sobre los que no desean ver anuncios y puede
haber UX para informar al usuario sobre la API y cómo habilitarla o inhabilitarla. Chrome
proporcionará información y parámetros de configuración para la API de Topics en
chrome://settings/privacySandbox. Además, los temas no están disponibles para los llamadores de API
en modo Incógnito y los temas se borran junto con el historial de navegación. 

{: #opt-out}


### Inhabilitación del sitio

Solo los sitios que incluyan códigos que llaman a la API de Topics se incluirán en el historial de
navegación apto para los cálculos de frecuencia de tema y los llamadores de la API
[solo recibirán los temas que observaron.](#observed-topics)
En otras palabras, los sitios no son aptos para los cálculos de frecuencia de temas sin que el sitio
o un servicio incorporado realice una acción para llamar a la API.  
La explicación de Topics también propone que los sitios puedan bloquear el cálculo de temas de sus
visitantes a través del siguiente encabezado
[Permissions-Policy](https://developer.mozilla.org/docs/Web/HTTP/Headers/Feature-Policy):

```text  
Permissions-Policy: browsing-topics=()
````

{% Aside %}

La política de permisos existente `interest-cohort=()` de las FLoC también prohibirá el cálculo de temas.

{% endAside %}

### Inhabilitación de usuarios

La explicación de la API de Topics [propone](https://github.com/jkarlin/topics#:~:text=empty) que la
lista de temas que se muestre esté vacía si se cumplen las siguientes condiciones:

-  El usuario inhabilita la API de Topics a través de la configuración del navegador en
   chrome://settings/privacySandbox.
-  El usuario borró sus temas (en la configuración del navegador, en
   chrome://settings/privacySandbox) o [borró las
   cookies](https://support.google.com/accounts/answer/32050).
-  El navegador está en modo Incógnito.

En la explicación, se proporcionan
[más detalles sobre los objetivos de privacidad](https://github.com/jkarlin/topics#:~:text=privacy%20goals)
y la forma en que la API busca cumplirlos.

---

## Interactúa y envía comentarios

-  **GitHub**: Lee la [explicación de la propuesta](https://github.com/jkarlin/topics), haz
   preguntas y únete al debate sobre las [entradas del repositorio de
   propuestas](https://github.com/jkarlin/topics/issues).
-  **W3C**: Analiza los casos de uso del sector en el
   [grupo de ubicaciones de la empresa para mejorar la publicidad web](https://www.w3.org/community/web-adv/participants).
-  **Anuncios de la API de Topics**: únete a la lista de distribución o consúltala en [groups.google.com/a/chromium.org/g/topics-api-annnounce](https://groups.google.com/a/chromium.org/g/topics-api-annnounce)
-  **Asistencia para desarrolladores de Privacy Sandbox**: Haz preguntas y únete al debate del
   [repositorio de asistencia para desarrolladores de Privacy Sandbox](https://github.com/GoogleChromeLabs/privacy-sandbox-dev-support).

## Obtén más información

-  [Explicación técnica de la API de Topics](https://github.com/jkarlin/topics)
-  [Profundización en Privacy Sandbox](https://web.dev/digging-into-the-privacy-sandbox)
  
