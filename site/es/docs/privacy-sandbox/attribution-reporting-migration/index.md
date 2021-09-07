---
layout: 'layouts/doc-post.njk'
title: 'Guía de migración (Chrome 92): Desde la API Conversion Measurement hasta la API Attribution Reporting'
subhead: La API Conversion Measurement está cambiando en Chrome 92.
date: 2021-06-22
updated: 2021-06-22
authors:
  - maudn
---

{% Aside %} Si tiene preguntas o necesita ayuda durante su migración, únase a la [lista de correo](https://groups.google.com/u/1/a/chromium.org/g/attribution-reporting-api-dev) y haga su pregunta. {% endAside %}

## ¿Qué está cambiando?

Tras los [cambios de propuesta en la API](https://github.com/WICG/conversion-measurement-api) durante los primeros meses del 2021, la implementación de la API en Chrome está evolucionando. Estos serán los cambios:

- El nombre de la API y el nombre de la política de funciones.
- Los nombres de los atributos HTML y `.well-known` en URL conocidas.
- El formato de los informes. Los informes ahora se envían como JSON en el cuerpo de la solicitud.
- El contenido de los informes: `credit` fue eliminado, junto con los informes que habrían tenido 0 créditos.

Lo que permanece sin cambios en Chrome 92 es el conjunto de funciones compatibles: informes al nivel de los eventos, solo para clics. **Espere más actualizaciones sobre este tema**. Después de este cambio, también se lanzarán otras actualizaciones y funciones en las futuras versiones de Chrome.

{% Aside %} Para recibir actualizaciones sobre las pruebas de origen de esta API y las próximas funciones, suscríbase en la [lista de correo](https://groups.google.com/u/1/a/chromium.org/g/attribution-reporting-api-dev). {% endAside %}

## ¿Cuándo entrarán en vigor estos cambios?

Estos cambios entrarán en vigor a partir de [Chrome 92](https://chromestatus.com/features/schedule), de forma estable el 20 de julio del 2021. La versión Beta de Chrome 92 se lanzó el 3 de junio del 2021.

## ¿Qué debería hacer?

{% Aside %} Habrá más cambios en las futuras versiones de la API. Estas utilizarán el nuevo nombre que se adoptó en Chrome 92. {% endAside %}

Si está ejecutando una prueba de origen o implementó una demostración para esta API, tiene dos opciones:

- **Opción 1 (recomendada)** : migre su código ahora o en las próximas semanas, idealmente hágalo antes de la mitad de julio del 2021. De esta manera, su código base estará listo para los cambios se produzcan en el futuro y seguirá funcionando para los clientes de Chrome más recientes.
- **Opción 2** : Espere a que se publiquen más actualizaciones y funciones en las futuras versiones de Chrome y realice todas las modificaciones que sean necesarias en el código al mismo tiempo.

## Migración

### Ejemplo de migración

Puede ver un ejemplo de migración para una pequeña aplicación de demostración en esta [solicitud de retiro (borrador)](https://github.com/GoogleChromeLabs/trust-safety-demo/pull/4/files).

### Actualice el código para la política de las funciones

<table class="simple width-full fixed-table with-heading-tint">
<thead><tr>
<th style="text-align: left;">Código heredado</th>
<th style="text-align: left;">Nuevo código</th>
</tr></thead>
<tbody><tr>
<td><code>allow='conversion-measurement'</code></td>
<td><code>allow='attribution-reporting'</code></td>
</tr></tbody>
</table>

### Actualice su código para la detección de funciones

<table class="simple width-full fixed-table with-heading-tint">
<thead><tr>
<th style="text-align: left;">Código heredado</th>
<th style="text-align: left;">Nuevo código</th>
</tr></thead>
<tbody><tr>
<td><code>document.featurePolicy.features()<br>.includes('conversion-measurement')</code></td>
<td><code>document.featurePolicy.features()<br>.includes('attribution-reporting')</code></td>
</tr></tbody>
</table>

### Actualice los atributos HTML

<table class="simple width-full fixed-table with-heading-tint">
<thead><tr>
<th style="text-align: left;">Código heredado</th>
<th style="text-align: left;">Nuevo código</th>
</tr></thead>
<tbody>
<tr>
<td><code>conversiondestination</code></td>
<td><code>attributiondestination</code></td>
</tr>
<tr>
<td><code>impressiondata</code></td>
<td><code>attributionsourceeventid</code></td>
</tr>
<tr>
<td><code>impressionexpiry</code></td>
<td><code>attributionexpiry</code></td>
</tr>
<tr>
<td><code>reportingorigin</code></td>
<td><code>attributionreportto</code></td>
</tr>
</tbody>
</table>

### Actualice los argumentos de `window.open()`

Es posible registrar una fuente de atribución para las navegaciones que se iniciaron por `window.open()` . Actualice estas llamadas si está utilizando `window.open()` para registrar las fuentes de atribución.

Su nuevo código debería verse de la siguiente manera (este cambio de nombre sigue al cambio de nombre de los [atributos HTML](#update-the-html-attributes) ):

```javascript
window.open(
  'https://dest.example',
  '_blank',
  'attributionsourceeventid=1234,attributiondestination=https://dest.example,attributionreportto=https://reporter.example,attributionexpiry=604800000'
);
```

### Actualice la URL y el parámetro de su llamada de registro

<table class="simple width-full fixed-table with-heading-tint w-table--top-align">
<thead><tr>
<th style="text-align: left;">Código heredado</th>
<th style="text-align: left;">Nuevo código</th>
</tr></thead>
<tbody><tr>
<td><code>.well-known/register-conversion?conversion-data={DATA}</code></td>
<td><code>.well-known/attribution-reporting/trigger-attribution?trigger-data={DATA}</code></td>
</tr></tbody>
</table>

### Actualice el código de su endpoint para realizar informes

<table class="simple width-full fixed-table with-heading-tint">
<thead><tr>
<th></th>
<th style="text-align: left;">Código heredado</th>
<th style="text-align: left;">Nuevo código</th>
</tr></thead>
<tbody><tr>
<td>Solicitudes que se esperan del navegador</td>
<td><code>.well-known/register-conversion?impression-data=&conversion-data={DATA}&attribution-credit=100</code></td>
<td>
<code>.well-known/attribution-reporting/trigger-attribution</td> </tr> <tr> <td>Incoming reports</td> <td>Sent as URL parameters.</td> <td>Sent as JSON in the request body.<br> <br> The report data is included <strong>in the request body as a JSON object</strong> with the following keys:<br> <code>source_event_id</code>: antes <code>impression-data</code>, el conjunto de datos de 64 bits del evento en la fuente de atribución.<br> <code>trigger_data</code>: antes <code>conversion-data</code>, el conjunto de datos de 3 bits en el redireccionamiento del activador de la atribución.<br><br> ⚠️ <code>credit</code> fue eliminado.</td>
</tr></tbody>
</table>
