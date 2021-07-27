---
layout: layouts / doc-post.njk
title: Conjuntos de primera
subhead: |2

  Permitir que los nombres de dominio relacionados que sean propiedad y estén operados por la misma entidad se declaren pertenecientes a la misma primera parte.
description: |2

  First-Party Sets permite que los nombres de dominio relacionados que son propiedad de la misma entidad y operados por ella se declaren pertenecientes a la misma primera parte.
date: '2021-05-18'
updated: '2021-05-18'
authors:
  - samdutton
---

<!--lint disable no-smart-quotes-->

## Estado de implementación

- [En prueba de origen](https://web.dev/origin-trials/) Chrome 89 a 93.
- [Regístrese para la prueba de origen](https://developer.chrome.com/origintrials/#/view_trial/988540118207823873) .
- [Estado de la plataforma Chrome](https://chromestatus.com/feature/5640066519007232) .
- [Proyectos de cromo](https://www.chromium.org/updates/first-party-sets) .

## ¿Por qué necesitamos sets de primera?

Las páginas web están compuestas por contenido de múltiples [orígenes](/docs/privacy-sandbox/glossary#origin) . Parte del contenido es propio y proviene del sitio de nivel superior que está visitando el usuario. Otro contenido puede provenir de terceros, como anuncios, medios integrados o recursos compartidos, como bibliotecas JavaScript de [CDN](https://www.cloudflare.com/en-gb/learning/cdn/what-is-a-cdn/) . Los terceros también pueden querer correlacionar la actividad del usuario en diferentes sitios mediante el uso de mecanismos como las [cookies](/docs/privacy-sandbox/glossary#origin) .

Los navegadores están proponiendo modelos de privacidad que restringen el acceso a la identidad del usuario dentro de un contexto entre sitios. Sin embargo, muchas organizaciones tienen sitios relacionados con diferentes nombres de dominio, como dominios para diferentes países ( `example.com` y `example.co.uk` , por ejemplo). Debería ser posible permitir que los nombres de dominio relacionados con una relación adecuada, tal vez propiedad común, se declaren pertenecientes a la misma primera parte, de modo que los navegadores traten esos dominios como primera parte en situaciones en las que la primera y la tercera parte reciben un trato diferente.

Cualquier solución también debería evitar el abuso del sistema. Por ejemplo, no debería ser posible declarar organizaciones que incluyan sitios no relacionados con diferentes propietarios para obtener privilegios propios.

## ¿Cómo funcionan los sets propios?

Un sitio web puede declarar que es miembro (o propietario) de un conjunto de dominios web al proporcionar un archivo de manifiesto que define su relación con los otros dominios: un archivo JSON en una dirección `.well-known/first-party-set` .

Suponga que `a.example` , `b.example` y `c.example` desean formar un conjunto propio propiedad de `a.example` . Los sitios luego servirían los siguientes recursos:

```json
// https: //a.example/.well-known/first-party-set
{
"propietario": "un.example",
"miembros": ["b.example", "c.example"],
...
}

// https: //b.example/.well-known/first-party-set
{
"propietario": "un.example"
}

// https: //c.example/.well-known/first-party-set
{
"propietario": "un.example"
}
```

El dominio propietario aloja un archivo de manifiesto que enumera sus dominios miembros. Un navegador puede pedirle al sitio web de un miembro que especifique su propietario y luego verificar el manifiesto del propietario para verificar la relación.

Se espera que las políticas del navegador eviten el abuso o el uso indebido. Por ejemplo, los conjuntos propios no deben permitir el intercambio de información del usuario entre sitios no relacionados o la agrupación de sitios que no pertenecen a la misma entidad. Una forma posible de que un sitio se registre podría ser que el sitio envíe su grupo de dominios propuesto a un rastreador público (como un repositorio de GitHub dedicado) junto con la información necesaria para satisfacer la política del navegador. La verificación del control del propietario sobre los dominios miembros también puede requerir que se `.well-known` un desafío en una URL conocida en cada uno de los dominios del conjunto.

La propuesta complementaria a First-Party Sets es el `SameParty` cookie SameParty. La especificación del `SameParty` en una cookie indica al navegador que incluya la cookie cuando su contexto es parte del mismo conjunto propio que el contexto de nivel superior.

Por ejemplo, para el conjunto propio descrito anteriormente, un ejemplo puede establecer la siguiente cookie:

`Set-Cookie: sesión = 123; Seguro; SameSite = Lax; SameParty`

Esto significa que cuando un visitante de b.example o c.example realiza una solicitud a a.example, la `session` se incluye en esa solicitud.

---

## Participar y compartir comentarios

- **Prueba de origen** : regístrese y participe en la [prueba de origen de Chrome](https://developer.chrome.com/origintrials/#/view_trial/988540118207823873) .
- **GitHub** : lea la [propuesta](https://github.com/privacycg/first-party-sets) , [plantee preguntas y siga la discusión](https://github.com/privacycg/first-party-sets/issues) .
- **Soporte para desarrolladores** : haga preguntas y únase a discusiones en el [repositorio de soporte para desarrolladores de Privacy Sandbox](https://github.com/GoogleChromeLabs/privacy-sandbox-dev-support) .

## Saber más

- [Explicación técnica de First-Party Sets](https://github.com/privacycg/first-party-sets)
- [Estado de la plataforma Chrome](https://chromestatus.com/feature/5640066519007232) .
- [Proyectos de cromo](https://www.chromium.org/updates/first-party-sets) .
