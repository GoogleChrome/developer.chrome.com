---
layout: layouts/doc-post.njk
title: "Création de rapports sur l'attribution"
subhead: "Mesurez quand l'action de l'utilisateur (telle qu'un clic sur une annonce ou une vue) conduit à une conversion, sans utiliser d'identifiants intersites."
description: "L'API Attribution Reporting permet de mesurer à quel moment une action de l'utilisateur (telle qu'un clic sur une annonce ou une vue ) conduit à une conversion, sans utiliser d'identifiants intersites."
date: 2021-05-18
updated: 2021-09-10
authors:
  - maudn
  - samdutton
---

{% Aside 'caution' %} L'API Attribution Reporting était auparavant connue comme l'API Conversion Measurement. {% endAside %}

{% YouTube id='UGA74CIcom8' %}

## État d'implémentation

Voir [Statut](/docs/privacy-sandbox/attribution-reporting-introduction/#status) .

## Glossaire

{% Aside %}

Vous pouvez également consulter le [glossaire complet de Privacy Sandbox](/docs/privacy-sandbox/glossary/).

{% endAside %}

- **Plates-formes de technologie publicitaire** : entreprises qui fournissent des logiciels et des outils pour permettre aux marques ou aux agences de cibler, diffuser et analyser leur publicité numérique.
- **Annonceurs** : entreprises payant pour la publicité.
- **Éditeurs** : entreprises qui affichent des publicités sur leurs sites web.
- **Conversion après clic** : conversion qui est attribuée à un clic sur une annonce.
- **Conversion après affichage** : conversion attribuée à une impression d'annonce (si l'utilisateur n'interagit pas avec l'annonce, puis effectue une conversion).

## Qui doit avoir connaissance de cette API : les plates-formes de technologie publicitaire, les annonceurs et les éditeurs

- Les plates-formes de technologie publicitaire (adtech), telles que les [plates-formes côté demande](https://en.wikipedia.org/wiki/Demand-side_platform) (Demand Side Platform, DSP) ou les [plates-formes de gestion de données](https://en.wikipedia.org/wiki/Data_management_platform) (Data Management Platform, DMP) peuvent utiliser cette API pour prendre en charge des fonctionnalités qui reposent actuellement sur des cookies tiers.
- Les annonceurs et les éditeurs qui s'appuient sur un code personnalisé pour la publicité ou la mesure des conversions peuvent utiliser cette API pour remplacer les techniques existantes.
- Les annonceurs et les éditeurs qui s'appuient sur des plates-formes de technologie publicitaire pour mesurer les conversions n'ont pas besoin d'utiliser l'API directement, mais peuvent être intéressés à la comprendre s'ils travaillent avec des plates-formes de technologie publicitaire pouvant intégrer l'API.

{% Aside %} Il peut y avoir des cas d'utilisation qui ne sont pas liés aux annonces. [Participez](#engage) et partagez votre cas d'utilisation ! {% endAside %}

## Pourquoi cette API est-elle nécessaire ? {: #why-is-this-api-needed }

Aujourd'hui, la mesure des conversions publicitaires repose souvent sur des [cookies tiers](https://developer.mozilla.org/docs/Web/HTTP/Cookies#Third-party_cookies). Les navigateurs restreignent l'accès aux cookies tiers, car ils peuvent être utilisés pour effectuer le suivi des utilisateurs sur tous les sites et entraver la confidentialité des utilisateurs. Cette API permet ces mesures de manière à préserver la confidentialité, sans cookies tiers.

## Comment fonctionne l'API Attribution Reporting et quelles sont ses fonctionnalités ?

{% Aside %} Cette API est incubée et développée de manière ouverte. Elle est sujette à changement. Vos commentaires sont les bienvenus. Découvrez [comment participer à la discussion](#engage). {% endAside %}

L'API Attribution Reporting permet de mesurer deux événements associés entre eux : un événement sur le site web d'un éditeur, tel qu'un internaute qui consulte ou clique sur une annonce, avec une conversion ultérieure sur le site d'un annonceur.

Cette API prend en charge la mesure de l'attribution des conversions après clic (disponible dans la première implémentation de cette API, actuellement en [phase d'évaluation](https://web.dev/conversion-measurement/#browser-support)) et la mesure de l'attribution après affichage ([voir l'explication publique](https://github.com/WICG/conversion-measurement-api/blob/main/event_attribution_reporting_views.md)).

L'API propose deux types de rapports d'attribution pouvant être utilisés pour différents cas d'utilisation :

- Les **rapports basés sur les événements** associent un clic d'annonce ou une vue spécifique (du côté annonce) aux données du côté conversion. Pour préserver la confidentialité des utilisateurs en empêchant la fusion de l'identité des utilisateurs entre les sites, les données côté conversion sont très limitées et les données sont "bruitées" (ce qui signifie que pour un petit pourcentage de cas, des données aléatoires sont envoyées). Pour une protection supplémentaire de la confidentialité, les rapports ne sont pas envoyés immédiatement.
- Les **rapports agrégés** ne sont pas liés à un événement spécifique du côté annonce. Ces rapports fournissent des données de conversion plus détaillées et plus fidèles que les rapports basés sur les événements. Une combinaison de techniques de confidentialité à travers la cryptographie, la distribution de la confiance et la confidentialité différentielle aident à réduire le risque de fusion d'identité entre les sites. Les deux types de rapports peuvent être utilisés simultanément. Ils sont complémentaires. Les autres fonctionnalités incluses dans cette API comprennent les [rapports d'attribution multi-appareils](https://github.com/WICG/conversion-measurement-api/blob/main/cross_device.md) et les [rapports d'attribution app-to-web](https://github.com/WICG/conversion-measurement-api/blob/main/app_to_web.md).

## Participez et partagez vos commentaires {: #engage }

- **Phase d'évaluation** : [inscrivez-vous à la première phase d'évaluation (clic uniquement)](/origintrials/#/view_trial/3411476717733150721) ou [consultez la première démo (clic uniquement)](https://goo.gle/demo-event-level-conversion-measurement-api).
- Pour rester informé de la prochaine implémentation de cette API qui offrira plus de fonctionnalités et sera disponible pour expérimentation dans Chrome (phase d'évaluation), rejoignez la [liste de diffusion pour les développeurs](https://groups.google.com/u/1/a/chromium.org/g/attribution-reporting-api-dev).
- **GitHub** : lisez la [proposition](https://github.com/WICG/conversion-measurement-api/), [posez des questions et suivez la discussion](https://github.com/WICG/conversion-measurement-api/issues).
- **W3C** : discutez des cas d'utilisation de l'industrie au sein du groupe [Improving Web Advertising Business Group](https://www.w3.org/community/web-adv/participants) et rejoignez le groupe [Privacy Community Group](https://www.w3.org/community/privacycg/) pour des discussions autour de l'API WebKit/Safari.
- **Assistance aux développeurs** : posez des questions et participez aux discussions dans le [référentiel d'assistance aux développeurs Privacy Sandbox](https://github.com/GoogleChromeLabs/privacy-sandbox-dev-support).

## En savoir plus

- [Introduction à la création de rapports sur l'attribution (mesure des conversions)](/docs/privacy-sandbox/attribution-reporting-introduction)
- [Explications techniques de l'API](https://github.com/WICG/conversion-measurement-api/)
- (⚠️ obsolète) [Un moyen plus privé de mesurer les conversions publicitaires](https://web.dev/conversion-measurement/) : aperçu de la première itération de cette API pour les développeurs web
- (⚠️ obsolète) [Un moyen plus privé de mesurer les conversions publicitaires - Vidéo](https://www.youtube.com/watch?v=jcDfOoWwZcM) : démo de la première itération de cette API (clics uniquement)
- (⚠️ obsolète) [Utilisation de l'API Event Conversion Measurement](https://web.dev/using-conversion-measurement/) : comment expérimenter la première itération de cette API pour les développeurs web
- [Explications détaillées de Privacy Sandbox](https://web.dev/digging-into-the-privacy-sandbox)
- [Déboguer l'API avec les outils pour les développeurs Chrome](/blog/new-in-devtools-93/#attribution-reporting)
