---
title: Nuevo en Chrome 117
description: >
  Chrome 117 ya está disponible! Con tres nuevas funciones de CSS que facilitan la creación de animaciones fluidas de entrada y salida, agrupación de arreglos para calcular conjuntos de datos de orden superior, DevTools facilita las alternativas locales y mucho más.
layout: 'layouts/blog-post.njk'
date: 2023-09-12
authors:
  - ajara
hero: 'image/SeARmcA1EicLXagFnVOe0ou9cqK2/msCTpRahj6qrF4R4m5y3.png'
alt: >
  New in Chrome hero logo
tags:
  - new-in-chrome
  - chrome-117
---

{% YouTube id='MOQpPiyoolM' %}

Esto es lo que necesitas saber:

* [Tres nuevas funciones CSS](#exit-entry-animations) facilitan la creación de animaciones fluidas de entrada y salida.
*Calcule conjuntos de datos de orden superior con [agrupación de matrices] (#array-grouping).
*DevTools facilita las [alternativas locales](#local-overrides).
* Y hay mucho [más](#más).

Yo soy Adriana Jara. Profundicemos y veamos las novedades para los desarrolladores en Chrome 117.

## Nuevas funciones de CSS para animaciones de entrada y salida. {: #exit-entry-animations}

Estas tres nuevas características de CSS completan el conjunto para agregar fácilmente animaciones de entrada y salida.
Y animar de manera fluida desde y hacia la capa superior elementos descartables, como `<dialog>` y `<popover>`

La primera característica es "transition-behavior". Para transicionar propiedades discretas , como `display` ,utilice el valor `allow-discrete` para `transition-behavior`

```css
.card {
  transition: opacity 0.25s, display 0.25s;
  transition-behavior: allow-discrete; /* Note: be sure to write this after the shorthand */
}

.card.fade-out {
  opacity: 0;
  display: none;
}
```


Luego, la regla `@starting-style` se usa para animar los efectos de entrada desde `display: none` y hasta la capa superior. Utilice `@starting-style` para aplicar un estilo que el navegador pueda buscar antes de que el elemento se abra en la página.

```css
/*  0. BEFORE-OPEN STATE   */
/*  Starting point for the transition */
@starting-style {
  .item {
    opacity: 0;
    height: 0;
  }
}

/*  1. IS-OPEN STATE   */
/*  The state at which the element is open + transition logic */
.item {
  height: 3rem;
  display: grid;
  overflow: hidden;
  transition: opacity 0.5s, transform 0.5s, height 0.5s, display 0.5s allow-discrete;
}

/*  2. EXITING STATE   */
/*  While it is deleting, before DOM removal in JS, apply this
    transformation for height, opacity, and a transform which
    skews the element and moves it to the left before setting
    it to display: none */
.is-deleting {
  opacity: 0;
  height: 0;
  display: none;
  transform: skewX(50deg) translateX(-25vw);
}
```

Finalmente, para desvanecer un `<popover>` o un `<dialog>` de la capa superior, agregue la propiedad `overlay` a su lista de transiciones. Incluya `overlay` en la transición o animación para animar la superposición junto con el resto de las funciones y asegúrese de que permanezca en la capa superior al animar. Esto se verá mucho más suave.

```css
[open] {
  transition: opacity 1s, display 1s allow-discrete;
}
```

<figure>
  {% Video
    src="video/HodOHWjMnbNw56hvNASHWSgZyAf2/kPZ5Ds1LJQ72ZAiMcaJX.mp4",
    autoplay="true",
    loop="true",
    muted="true",
    controls="true"
  %}
</figure>

```css
[open] {
  transition: opacity 1s, display 1s allow-discrete, overlay 1s allow-discrete;
}
```

<figure>
  {% Video
    src="video/HodOHWjMnbNw56hvNASHWSgZyAf2/6kjtLdvlpz8ObkcbG2jV.mp4",
    autoplay="true",
    loop="true",
    muted="true",
    controls="true"
  %}
</figure>

Consulte [Cuatro nuevas funciones CSS para animaciones de entrada y salida fluidas](/blog/entry-exit-animations/) para obtener detalles sobre cómo utilizar estas funciones para mejorar su experiencia de usuario con movimiento.

## Array grouping {: #array-grouping }

En programación, la agrupación de matrices es una operación extremadamente común, la vemos con mayor frecuencia cuando usamos la cláusula `GROUP BY` de SQL y la programación MapReduce (que se considera mejor como map-group-reduce).

 La capacidad de combinar datos en grupos permite a los desarrolladores calcular conjuntos de datos de orden superior.
Por ejemplo, la edad promedio de una cohorte,o valores LCP diarios para una página web.

 La agrupación de matrices permite estos escenarios agregando los métodos estáticos `Object.groupBy` y `Map.groupBy`.

`groupBy` llama una función de devolución de llamada proporcionada una vez para cada elemento en un iterable. La función de devolución de llamada debe devolver una cadena o símbolo que indique el grupo del elemento asociado.

En el siguienteejemplo, de la [documentación de MDN](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object/groupBy), hay una gama de productos con el `grupoPor` método utilizadoregresar ellos agrupados por su tipo.

```js
const inventario = [
  { nombre: "espárragos", tipo: "verduras", cantidad: 5 },
  { nombre: "plátanos", tipo: "fruta", cantidad: 0 },
  { nombre: "cabra", tipo: "carne", cantidad: 23 },
  { nombre: "cerezas", tipo: "fruta", cantidad: 5 },
  { nombre: "pescado", tipo: "carne", cantidad: 22 },
];

const result = Object.groupBy(inventario, ({ tipo }) => tipo);

/* El resultado es:
{
  verduras: [
    { nombre: 'espárragos', tipo: 'verduras', cantidad: 5 },
  ],
  fruta: [
    { nombre: "plátanos", tipo: "fruta", cantidad: 0 },
    { nombre: "cerezas", tipo: "fruta", cantidad: 5 }
  ],
  carne: [
    { nombre: "cabra", tipo: "carne", cantidad: 23 },
    { nombre: "pescado", tipo: "carne", cantidad: 22 }
  ]
}
*/

```
Para obtener más detalles, consulte la [documentación `groupBy`] (https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object/groupBy).

## Cambios locales optimizadas en DevTools. {: #local-overrides }

La función [cambios locales](/docs/devtools/overrides/) ahora está optimizada, por lo que puede simular fácilmente encabezados de respuesta y contenido web de recursos remotos desde el panel **Red** sin acceso a ellos.

Para anular el contenido web, abra el panel **Red**, haga clic con el botón derecho en una solicitud y seleccione **Anular contenido**.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/BRExqF6iUJioa9YkiUeV.png", alt="Las opciones de anulación en el menú desplegable de una solicitud.", width="800", height="685" %}

Si tiene cambios locales configuradas pero deshabilitadas, DevTools las habilita. Si aún no los ha configurado, DevTools se lo indica en la barra de acciones en la parte superior. Seleccione una carpeta para almacenar los cambios y permita que DevTools acceda a ella.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/cuNvCVUAVtICozqgThQi.png", alt="Seleccione una carpeta y permita el acceso a ella en la barra de acciones en la parte superior.", width="800", height="507" %}

Una vez configuradas las anulaciones, DevTools lo lleva a **Fuentes** > **Anulaciones** > **Editor** para permitirle [anular contenido web](/docs/devtools/overrides/#make-changes) .

Tenga en cuenta que los recursos alternativos se indican con {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/s81rU6SgdmbseeBDGbPl.png", alt="Saved.", width="17", height="20" %} en el panel de **Red**. Pase el cursor sobre el ícono para ver qué se anula.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/hekOD6lUKKXipZ6qFT3D.png", alt="Un ícono de cambios al lado de una solicitud en el panel Red.", width="800", height="493" %}

Consulte [las novedades de DevTools](/blog/new-in-devtools-117/) para obtener todos los detalles y más información sobre DevTools en Chrome 117.

## ¡Y más! {: #más }

Por supuesto que hay mucho más.

* El tan esperado valor [`subgrid`](https://developer.mozilla.org/docs/Web/CSS/CSS_grid_layout/Subgrid) para `grid-template-columns` y `grid-template-rows` ya está implementado en Chrome.

* Hay una [deprecation trial `WebSQL`](/blog/deprecating-web-sql/) y una prueba de desarrollador para el [deprecation del evento `unload`](/blog/deprecating-unload/).

* La [API `notRestoredReasons`](/docs/web-platform/bfcache-notRestoredreasons/) para bfcache, mencionado en el [vídeo para Chrome 116](https://youtu.be/JHwWUsMKYdk?si=sAzRp5hb5n9fQHxf&t=105), debería lanzarse en esta versión.

## Otras lecturas

Esto cubre sólo algunos aspectos destacados clave. Consulte los enlaces a continuación para
cambios adicionales en Chrome 117.

* [Novedades de Chrome DevTools (117)](/blog/new-in-devtools-117/)
* [Desuso y eliminaciones de Chrome 117](/blog/deps-rems-117/)
* [Actualizaciones de ChromeStatus.com para Chrome 117](https://chromestatus.com/features#milestone%3D117)
* [Lista de cambios del repositorio fuente de Chromium](https://chromium.googlesource.com/chromium/src/+log/116.0.5845.171..117.0.5938.57)
* [Calendario de lanzamientos de Chrome](https://chromiumdash.appspot.com/schedule)

## Suscríbete

Para mantenerse actualizado, [suscríbase](https://goo.gl/6FP1a5) al
[Canal de YouTube para desarrolladores de Chrome](https://www.youtube.com/user/ChromeDevelopers/),
y recibirás una notificación por correo electrónico cada vez que lancemos un nuevo vídeo.

Yo soy Adriana Jara, y tan pronto como se lance Chrome 117, estaré aquí para contarles que hay de nuevo en Chrome.
