---
layout: layouts/doc-post.njk
title: "C'est déjà prêt ?"
subhead: "État d'implémentation des API Privacy Sandbox."
description: "État d'implémentation des API Privacy Sandbox. Dernière mise à jour le 2021-05-18."
date: 2021-05-18
updated: 2021-08-18
authors:
  - samdutton
---

{% Aside 'caution' %} Il peut y avoir plusieurs périodes de phases d'évaluation distinctes pour chaque API. {% endAside %}

## API Attribution Reporting

*Anciennement API Conversion Measurement.*

- [Phase d'évaluation actuelle](https://web.dev/origin-trials/) : à partir de Chrome 86, [maintenant étendu](https://groups.google.com/u/1/a/chromium.org/g/attribution-reporting-api-dev/c/ZKf9T8sRqAM) à Chrome 93.
- [Inscrivez-vous à la phase d'évaluation](/origintrials/#/view_trial/3411476717733150721).
- [Démo](https://goo.gle/demo-event-level-conversion-measurement-api).
- [État de la plate-forme Chrome](https://www.chromestatus.com/features/6412002824028160).
- [État Blink](https://groups.google.com/a/chromium.org/g/blink-dev/search?q=conversion%20measurement).
- [GitHub](https://github.com/WICG/conversion-measurement-api/) : consultez les [problèmes](https://github.com/WICG/conversion-measurement-api/issues) pour les questions et discussions sur l'API.

### État : détails

Consultez [État](/docs/privacy-sandbox/attribution-reporting-introduction/#status).

### Toutes les ressources

- [Rapports sur l'attribution (mesure des conversions)](/docs/privacy-sandbox/attribution-reporting)
- [Introduction à la création de rapports sur l'attribution (mesure des conversions)](/docs/privacy-sandbox/attribution-reporting-introduction)
- [Explicateurs techniques API](https://github.com/WICG/conversion-measurement-api/)
- (⚠️ obsolète) [Une façon plus privée de mesurer les conversions publicitaires](https://web.dev/conversion-measurement/) : aperçu de la première itération de cette API pour les développeurs web
- (⚠️ obsolète) [Une façon plus privée de mesurer les conversions publicitaires - Vidéo](https://www.youtube.com/watch?v=jcDfOoWwZcM) : démo de la première itération de cette API (clics uniquement)
- (⚠️ obsolète) [Utilisation de l'API Event Conversion Measurement](https://web.dev/using-conversion-measurement/) : comment expérimenter la première itération de cette API pour les développeurs web
- [Explications détaillées de Privacy Sandbox](https://web.dev/digging-into-the-privacy-sandbox)

## Jetons de confiance (Trust Tokens)

- [Phase d'évaluation actuelle](https://web.dev/origin-trials/) : à partir de Chrome 84, [maintenant étendu](https://groups.google.com/a/chromium.org/g/blink-dev/c/-W90wVkS0Ks/m/Jfh5-ZWpAQAJ) à Chrome 94.
- [Inscrivez-vous à la phase d'évaluation](/origintrials/#/view_trial/2479231594867458049).
- [Démo](https://trust-token-demo.glitch.me/).
- [État de la plate-forme Chrome](https://www.chromestatus.com/feature/5078049450098688).
- [État Blink](https://groups.google.com/a/chromium.org/g/blink-dev/search?q=trust%tokens).
- [GitHub](https://github.com/WICG/trust-token-api) : consultez les [problèmes](https://github.com/WICG/trust-token-api/issues) pour les questions et discussions sur l'API.
- [Intégration des outils pour les développeurs Chrome](https://developers.google.com/web/updates/2021/01/devtools?utm_source=devtools#trust-token).
- En savoir plus : [Premiers pas avec les jetons de confiance](https://web.dev/trust-tokens/)

## Ensembles propriétaires

- [Phase d'évaluation actuelle](https://web.dev/origin-trials/) : Chrome 89 à 93.
- [Inscrivez-vous à la phase d'évaluation](/origintrials/#/view_trial/988540118207823873).
- [État de la plate-forme Chrome](https://chromestatus.com/feature/5640066519007232).
- [État Blink](https://groups.google.com/a/chromium.org/g/blink-dev/search?q=first-party%20sets).
- [Proposition d'API](https://github.com/privacycg/first-party-sets) : consultez les [problèmes](hhttps://github.com/privacycg/first-party-sets/issues) pour les questions et discussions sur l'API.
- En savoir plus : [Les projets Chromium : ensembles propriétaires](https://www.chromium.org/updates/first-party-sets).

## FLoC

- [La phase d'évaluation](https://web.dev/origin-trials) initiale est maintenant terminée. Consultez les [intentions d'expérimentation](https://groups.google.com/a/chromium.org/g/blink-dev/c/MmijXrmwrJs) pour être tenu informé.
- [Démo](https://floc.glitch.me/) de la version initiale (phase d'évaluation maintenant terminée).
- [État Blink](https://groups.google.com/a/chromium.org/g/blink-dev/search?q=floc).
- [La proposition d'API](https://github.com/WICG/floc) fait actuellement l'objet de discussions au sein du [WICG](https://www.w3.org/community/wicg/) et des groupes d'intérêt.
- [GitHub](https://github.com/WICG/floc) : consultez les [problèmes](https://github.com/WICG/floc/issues) pour les questions et discussions sur l'API.
- [État de la plate-forme Chrome](https://www.chromestatus.com/features/5710139774468096).
- En savoir plus : [Qu'est-ce que la méthode FLoC ?](https://web.dev/floc/)

## FLEDGE

Descendant de [TURTLEDOVE](https://github.com/WICG/turtledove).

- [Intention de prototype](https://groups.google.com/a/chromium.org/g/blink-dev/c/w9hm8eQCmNI/m/LqT59250CAAJ).
- [État Blink](https://groups.google.com/a/chromium.org/g/blink-dev/search?q=fledge).
- [La proposition d'API](https://github.com/WICG/turtledove/blob/main/FLEDGE.md) fait actuellement l'objet de discussions au sein du [WICG](https://www.w3.org/community/wicg/) et des groupes d'intérêt.
- [GitHub](https://github.com/WICG/turtledove/blob/main/FLEDGE.md) : consultez les [problèmes TURTLEDOVE](https://github.com/WICG/turtledove/issues) pour les questions et discussions sur l'API.

<br>

---

## En savoir plus

### Blink, Chromium et Chrome

- [Calendrier de sortie de Chrome](https://www.chromestatus.com/features/schedule).
- [Processus de lancement de nouvelles fonctionnalités dans Chromium](https://www.chromium.org/blink/launching-features).
- [Intention d'expliquer : démystifier le processus d'expédition Blink](https://www.youtube.com/watch?time_continue=291&v=y3EZx_b-7tk).
- [blink-dev](https://groups.google.com/a/chromium.org/g/blink-dev/) : état de l'implémentation et discussion des fonctionnalités de Blink, le moteur de rendu utilisé par Chromium.
- [Recherche de code Chromium](https://source.chromium.org/).

### Phases d'évaluation

- [Premiers pas avec les phases d'évaluation de Chrome](https://web.dev/origin-trials/)
- [Que sont les phases d'évaluation tierce ?](https://web.dev/third-party-origin-trials)
- [Dépannage des phases d'évaluation de Chrome](/blog/origin-trial-troubleshooting/)
- [Guide sur les phases d'évaluation pour les développeurs web](https://github.com/GoogleChrome/OriginTrials/blob/gh-pages/developer-guide.md)
- [Explication des phases d'évaluation](https://github.com/GoogleChrome/OriginTrials/blob/gh-pages/explainer.md)
- [Exécution d'une phase d'évaluation](https://www.chromium.org/blink/origin-trials/running-an-origin-trial)
