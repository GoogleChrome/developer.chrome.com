---
layout: layouts/doc-post.njk
title: Ensembles propriétaires
subhead: "Autoriser les noms de domaine liés détenus et exploités par la même entité à se déclarer comme tels."
description: "Les ensembles propriétaires permettent aux noms de domaine associés détenus et exploités par la même entité de se déclarer comme tels."
date: 2021-05-18
updated: 2021-08-12
authors:
  - samdutton
---

<!--lint disable no-smart-quotes-->

## État de mise en œuvre

- [En essai d'origine](https://web.dev/origin-trials/) Chrome 89 à 93.
- [S'inscrire à un essai d'origine](/origintrials/#/view_trial/988540118207823873).
- [État de la plate-forme Chrome](https://chromestatus.com/feature/5640066519007232).
- [Projets Chromium](https://www.chromium.org/updates/first-party-sets).

## Pourquoi avons-nous besoin d'ensembles propriétaires ?

{% YouTube id='cNJ8mZ-J3F8' %}

Les pages Web sont composées de contenus d'[origines](/docs/privacy-sandbox/glossary#origin) multiples. Certains contenus sont propriétaires et proviennent du site de premier niveau que l'utilisateur visite. D'autres contenus peuvent provenir de tiers, comme les annonces, les médias intégrés ou les ressources partagées telles que les bibliothèques JavaScript des [CDN](https://www.cloudflare.com/en-gb/learning/cdn/what-is-a-cdn/). Des tiers peuvent également vouloir corréler l'activité des utilisateurs sur différents sites en utilisant des mécanismes comme les [cookies](/docs/privacy-sandbox/glossary#origin).

Les navigateurs proposent des modèles de confidentialité qui restreignent l'accès à l'identité de l'utilisateur dans un contexte intersites. De nombreuses organisations comptent cependant plusieurs sites associés avec des noms de domaine différents, comme des domaines pour différents pays (`exemple.com` et `example.fr`, par exemple). Il devrait être possible d'autoriser les noms de domaine correspondant à une relation donnée, comme une propriété commune, à se déclarer comme appartenant à la même entité, de sorte que les navigateurs traitent ces domaines comme tels dans les situations où l'entité propriétaire et le tiers sont traités différemment.

Toute solution devrait également empêcher les abus du système. Il ne devrait par exemple pas être possible de déclarer des organisations qui comprennent des sites indépendants avec des propriétaires différents, afin d'obtenir des privilèges d'entités propriétaires.

## Comment fonctionnent les ensembles propriétaires ?

Un site Web peut déclarer qu'il est membre (ou propriétaire) d'un ensemble de domaines Web en fournissant un fichier manifeste qui définit sa relation avec les autres domaines : un fichier JSON à une adresse `.well-known/first-party-set`.

Supposons que `a.example` , `b.example` et `c.example` souhaitent former un ensemble propriétaire appartenant à `a.example`. Les sites fourniraient alors les ressources suivantes :

```json
// https://a.example/.well-known/first-party-set
{
  "owner": "a.example",
  "members": ["b.example", "c.example"],
  ...
}

// https://b.example/.well-known/first-party-set
{
	"owner": "a.example"
}

// https://c.example/.well-known/first-party-set
{
	"owner": "a.example"
}
```

Le domaine propriétaire héberge un fichier manifeste qui répertorie ses domaines membres. Un navigateur peut demander à un site Web membre de spécifier son propriétaire, puis vérifier le manifeste du propriétaire pour vérifier la relation.

Les politiques du navigateur sont censées empêcher les utilisations abusives ou malveillantes. Par exemple, les ensembles propriétaires ne doivent pas permettre l'échange d'informations sur les utilisateurs entre des sites non liés, ou le regroupement de sites qui n'appartiennent pas à la même entité. Un moyen possible pour un site de participer pourrait être de soumettre son groupe de domaines proposé à un tracker public (comme un référentiel GitHub dédié) avec les informations nécessaires pour satisfaire la politique du navigateur. La vérification du contrôle du propriétaire sur les domaines membres peut également nécessiter un challenge `.well-known` sur chacun des domaines de l'ensemble.

La proposition complémentaire aux ensembles propriétaires est l'attribut de cookie `SameParty`. La spécification de l'attribut `SameParty` sur un cookie indique au navigateur d'inclure le cookie lorsque son contexte fait partie du même ensemble propriétaire que le contexte de premier niveau.

Par exemple, pour l'ensemble propriétaire décrit ci-dessus, a.example peut définir le cookie suivant :

`Set-Cookie: session=123; Secure; SameSite=Lax; SameParty`

Cela signifie que lorsqu'un visiteur sur b.example ou c.example fait une demande à a.example, le cookie de `session` est inclus dans cette demande.

---

## Interagir et donner son avis

- **Essai d'origine** : inscrivez-vous et participez à l'[essai d'origine de Chrome](/origintrials/#/view_trial/988540118207823873).
- **GitHub** : lisez la [proposition](https://github.com/privacycg/first-party-sets), [posez des questions et suivez la discussion](https://github.com/privacycg/first-party-sets/issues).
- **Assistance aux développeurs** : posez des questions et participez aux discussions dans le [référentiel d'assistance aux développeurs Privacy Sandbox](https://github.com/GoogleChromeLabs/privacy-sandbox-dev-support).

## En savoir plus

- [Explication technique des ensembles propriétaires](https://github.com/privacycg/first-party-sets)
- [État de la plate-forme Chrome](https://chromestatus.com/feature/5640066519007232).
- [Projets Chromium](https://www.chromium.org/updates/first-party-sets).
