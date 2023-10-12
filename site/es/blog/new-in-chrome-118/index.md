---
title: Nuevo en Chrome
description: >
  ¡Chrome 118 ya está disponible! Declara estilos específicos dentro de un componente con la regla css @scope. Utiliza nuevas funciones de medios: scripting y prefers-reduced-transparency. DevTools tiene mejoras en el panel Fuentes y mucho más.
layout: 'layouts/blog-post.njk'
date: 2023-10-10
authors:
  - ajara
hero: 'image/kheDArv5csY6rvQUJDbWRscckLr1/Fykb6HbizvuTjzhXB8IW.png'
alt: >
  New in Chrome hero logo
tags:
  - new-in-chrome
  - chrome-118
---

{% YouTube id='zx8OZtKe6hA' %}

Esto es lo que necesitas saber:

* Declarar estilos específicos dentro de un componente con la [regla css `@scope`](#css-scope).
* Hay dos nuevas funciones de medios: [`scripting` y `prefers-reduced-transparency`](#new-media-queries).
* DevTools tiene mejoras en el [panel **Fuentes**](#sources-panel-devtools).

* Y hay mucho [más](#more).

Yo soy Adriana Jara. Profundicemos y veamos las novedades para los desarrolladores en Chrome 118.

## Regla CSS `@scope`. {: #css-scope}

La regla `@scope` te permite aplicar reglas de estilo a una raíz de` @scope` determinada y diseñar elementos de acuerdo con la proximidad de esa raíz de `@scope`.

Con `@scope` puedes sobrescribir estilos basados ​​en la proximidad, lo cual es diferente de los estilos CSS habituales que se aplican basándose únicamente en el orden y la especificidad del origen. En el siguiente ejemplo, hay dos temas.

```html
<div class="lightpink-theme">
  <a href="#">Soy rosado claro!</a>
  <div class="pink-theme">
    <a href="#">Un rosado diferente!</a>
  </div>
</div>
```

sin`@scope`, el estilo aplicado es el último declarado.

{% Compare 'worse', 'Sin @scope' %}
```css
.pink-theme a { color: hotpink; }
.lightpink-theme a { color: lightpink; }
```
{% endCompare %}

{% Img src="image/SeARmcA1EicLXagFnVOe0ou9cqK2/N1ZbDIild8BHXJ3GjIey.jpg", alt="Dos enlaces, el primero dice '¡Soy rosa claro!', el segundo dice 'Rosa diferente', ambos enlaces son en realidad rosa claro, debajo del el texto del enlace lee las fuentes estilo aplicadas según el orden de declaración (en inglés).", width="800", height="700" %}

Con `@scope` puedes tener elementos anidados y el estilo que se aplica es el del ancestro más cercano.

{% Compare 'better', 'Con @scope' %}
```css
@scope (.pink-theme) {
    a {
        color: hotpink;
    }
}

@scope (.lightpink-theme){
    a {
        color: lightpink;
    }
}
```
{% endCompare %}

{% Img src="image/SeARmcA1EicLXagFnVOe0ou9cqK2/9svylwmK9QHQJUgAMNkj.jpg", alt="Dos enlaces, el primero dice '¡Soy rosa claro!', el segundo dice 'Rosa diferente', el segundo enlace es de un rosa más oscuro, debajo de los vinculos hay texto que dice con el estilo ancestro más cercano y tiene una marca de verificación verde al lado (en inglés).", width="800", height="694" %}

Scope también le evita tener que escribir nombres de clases largos y complicados, y facilita la gestión de proyectos más grandes al evitar conflictos de nombres.

{% Compare 'worse', 'Sin @scope' %}
```html
<div class="first-container">
  <h1 class="first-container__main-title"> I'm the main title</h1>
</div>
<div class="second-container">
  <h1 class="second-container__main-title"> I'm the main title, but somewhere else</h1>
</div>
```

```css
.first-container__main-title {
  color: grey;
}

.second-container__main-title {
  color: mediumturquoise;
}
```
{% endCompare %}



{% Compare 'better', 'Con @scope' %}
```html
<div class="first-container">
  <h1 class="main-title"> I'm the main title</h1>
</div>
<div class="second-container">
  <h1 class="main-title"> I'm the main title, but somewhere else</h1>
</div>
```

```css
@scope(.first-container){
  .main-title {
   color: grey;
  }
}
@scope(.second-container){
  .main-title {
   color: mediumturquoise;
  }
}
```
{% endCompare %}



Con `@scope` también puedes diseñar un componente sin aplicar el estilo a ciertas cosas que están anidadas en su interior. En cierto modo, puede tener "agujeros" donde no se aplica el estilo del scope.

Como en el siguiente ejemplo, podríamos aplicar estilo al texto y excluir controles o viceversa.

{% Img src="image/SeARmcA1EicLXagFnVOe0ou9cqK2/2OcZt7BEhhMH2dW9earg.jpg", alt="representación del html anterior, con las palabras dentro del scope junto al primer y tercer div y la palabra excluida junto al segundo y cuarto div.", width="800", height="648" %}

```html
<div class="component">
  <div class="purple">
    <h1>Drink water</h1>
    <p class="purple">hydration is important</p>
  </div>
  <div class="click-here">
    <p>not in scope</p>
    <button>click here</button>
  </div>

  <div class="purple">
    <h1 class="purple">Exercise</h1>
    <p class="purple">move it move it</p>
  </div>

  <div class="link-here">
    <p>Excluded from scope</p>
    <a href="#"> link here </a>
  </div>
</div>
```

```css
@scope (.component) to (.click-here, .link-here) {
  div {
    color: purple;
    text-align: center;
    font-family: sans-serif;
  }
}
```

Consulte la documentación de [`@scope`](https://developer.mozilla.org/docs/Web/CSS/:scope) para obtener más información.

## Funciones de medios `scripting` y `prefers-reduced-transparency` {: #new-media-queries }

Utilizamos consultas de medios (media queries) para proporcionar experiencias de usuario que se adapten a las preferencias del usuario y a las condiciones del dispositivo. Esta versión de Chrome agrega dos nuevos valores que se pueden usar para adaptar la experiencia del usuario: `scripting` y `prefers-reduced-transparency`

Podemos dar por sentada la presencia de scripting cuando nuestros usuarios acceden a la web, sin embargo, el scripting no siempre está habilitado. Ahora, utilizando la función `scripting`, puedes detectar si las secuencias de comandos están disponibles y aplicar estilos particulares para cada caso, los valores disponibles son : `enabled`,` initial-only` o `none`


```css
@media (scripting: none) {
  .script-none {
    color: red;
  }
}
```

Otro valor que puede probar con consultas de medios es "prefiere transparencia reducida", que permite a los desarrolladores adaptar el contenido web a las preferencias seleccionadas por el usuario para una transparencia reducida en el sistema operativo, como la configuración Reducir transparencia en macOS. Las opciones válidas son `reduce` o `no-preference`.

```css
.translucent {
  opacity: 0.4;
}

@media (prefers-reduced-transparency) {
  .translucent {
    opacity: 0.8;
  }
}
```

Y puedes comprobar cómo se ve con DevTools:

{% Video src="video/NJdAV9UgKuN8AhoaPBquL7giZQo1/Xh60t9y0KnAIdwoUnbX5.mp4", autoplay="false", loop="true", muted="true", controls="true", class="screenshot", width="800", height="533" %}

Para obtener más información, consulte la documentación de [scripting](https://developer.mozilla.org/docs/Web/CSS/@media/scripting) y [prefers-reduced-transparency](https://developer.mozilla.org/docs /Web/CSS/@media/prefers-reduced-transparency).

## Mejoras en el panel de Fuentes en DevTools {: #sources-panel-devtools }

DevTools tiene las siguientes mejoras en el panel **Fuentes**: la característica [espacio de trabajo (workspace)](/docs/devtools/workspaces/) mejoró la coherencia, en particular al cambiar el nombre del panel **Fuentes** > **Sistema de archivos** a **Espacio de trabajo(workspace)** junto con otros textos de la interfaz de usuario, [**Fuentes** > **Espacio de trabajo**](/docs/devtools/workspaces/) también le permite sincronizar los cambios que realiza en DevTools directamente con sus archivos fuente.

{% Video src="video/NJdAV9UgKuN8AhoaPBquL7giZQo1/1T78X6ldgLhiH6iJgAMk.mp4", width="800", height="436", autoplay="false", loop="true", muted="true", controls="true", class="screenshot" %}

Además, ahora puede reordenar los paneles en el lado izquierdo del panel **Fuentes** arrastrando y soltando, y el panel **Fuentes** ahora puede imprimir JavaScript en línea dentro de los siguientes tipos de secuencias de comandos: [`module`] (https://developer.mozilla.org/docs/Web/JavaScript/Guide/Modules), [`importmap`](https://developer.mozilla.org/docs/Web/HTML/Element/script/type/ importmap), [`speculationrules`](/blog/debugging-speculation-rules/) y resalta la sintaxis de los tipos de script `importmap` y `speculationrules`, los cuales contienen JSON.


{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/yZYe1CF5ObuLu7zVjcot.png", alt="Antes y después de la impresión bonita y resaltado de sintaxis del tipo de script de reglas de especulación.
", width="800", height="395" %}

Consulte [Novedades de DevTools](/blog/new-in-devtools-118/) para obtener más información sobre las actualizaciones de Chrome 118 DevTools.

## ¡Y más! {: #more }

Por supuesto que hay mucho más.

* [WebUSB API](/articles/usb/) ahora está expuesta a [Service Workers registrados por extensiones del navegador](/docs/extensions/mv3/service_workers/) lo que permite a los desarrolladores usar la API al responder a eventos de extensiones.

* Para ayudar a los desarrolladores a reducir la fricción en los flujos de solicitudes de pago, estamos eliminando el requisito de activación del usuario en "Solicitud de pago" y "Confirmación de pago seguro".

* [El ciclo de lanzamiento de Chrome se está acortando](/blog/faster-chrome-releases-round2/), las versiones estables se lanzarán cada tres semanas, comenzando con Chrome 119 que estará aquí en tres semanas.

## Otras lecturas

Esto cubre sólo algunos aspectos destacados clave. Consulte los enlaces a continuación para
cambios adicionales en Chrome 118.

* [Novedades de Chrome DevTools (118)](/blog/new-in-devtools-118/)
* [Deprecations y eliminaciones de Chrome 118](/blog/deps-rems-118/)
* [Actualizaciones de ChromeStatus.com para Chrome 118](https://chromestatus.com/features#milestone%3D118)
* [Lista de cambios del repositorio fuente de Chromium](https://chromium.googlesource.com/chromium/src/+log/116.0.5845.171..118.0.5938.57)
* [Calendario de lanzamientos de Chrome](https://chromiumdash.appspot.com/schedule)

## Suscríbete

Para mantenerse actualizado, [suscríbase](https://goo.gl/6FP1a5) al
[Canal de YouTube para desarrolladores de Chrome](https://www.youtube.com/user/ChromeDevelopers/),
y recibirás una notificación por correo electrónico cada vez que lancemos un nuevo vídeo.

Yo soy Adriana Jara, y tan pronto como se lance Chrome 119, estaré aquí para
contarles que hay de nuevo en Chrome!