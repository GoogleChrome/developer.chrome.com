---
layout: layouts/doc-post.njk
title: "Introduction à la création de rapports sur l'attribution (mesure des conversions)"
subhead: "Introduction et concepts clés pour comprendre l'API Attribution Reporting."
date: 2021-08-09
updated: 2021-08-09
authors:
  - maudn
---

{% Aside %}
 Cette API est une proposition et se développera au fil du temps. Cet article de blog décrit son état actuel et sera mis à jour au fur et à mesure de l'évolution de l'API. {% endAside %}

Mises à jour :

- Début 2021 : des rapports agrégés et des mesures d'affichage sont ajoutés à la proposition.
- Début 2021 : l'API est renommée "Attribution Reporting API".

{% Aside 'caution' %}

- Cet article se concentre sur les cas d'utilisation liés à la publicité, mais l'API Attribution Reporting peut également être utilisée pour des cas d'utilisation qui ne le sont pas.
- Les cas d'utilisation liés à la publicité de cette API se concentrent sur le lien entre les clics sur les annonces ou les vues et les conversions (mesure de la conversion).<br> {% endAside %}

## Introduction

L'API Attribution Reporting permet de mesurer quand un **clic sur une annonce ou une vue** entraîne une **conversion** sur un site d'annonceur, comme une vente ou une inscription. L'API ne repose pas sur des cookies ou des mécanismes tiers pouvant être utilisés pour identifier les utilisateurs individuels sur les sites.

Cette proposition est développée de manière ouverte. La proposition et les discussions se trouvent dans le [référentiel GitHub WICG](https://github.com/WICG/conversion-measurement-api).

{% Aside %}<br> Cette API fait partie de Privacy Sandbox, une série de propositions visant à répondre aux cas d'utilisation de tiers sans cookies tiers ou autres mécanismes de suivi intersites. Consultez les [propositions de Privacy Sandbox](https://developers.chrome.com/docs/privacy-sandbox).<br> {% endAside %}

## Pourquoi cette API est-elle nécessaire ?

Aujourd'hui, la mesure des conversions publicitaires repose souvent sur des [cookies tiers](https://developer.mozilla.org/docs/Web/HTTP/Cookies#Third-party_cookies). Les navigateurs restreignent l'accès aux cookies tiers, car ils peuvent être utilisés pour effectuer le suivi des utilisateurs sur tous les sites et entraver la confidentialité des utilisateurs. Cette API permet ces mesures de manière à préserver la confidentialité, sans cookies tiers.

## Qui doit avoir connaissance de cette API ?

- Les plates-formes de technologie publicitaire (adtech), telles que les [plates-formes côté demande](https://en.wikipedia.org/wiki/Demand-side_platform) (Demand Side Platform, DSP) ou les [plates-formes de gestion de données](https://en.wikipedia.org/wiki/Data_management_platform) (Data Management Platform, DMP) peuvent utiliser cette API pour prendre en charge des fonctionnalités qui reposent actuellement sur des cookies tiers.
- Les annonceurs et les éditeurs qui s'appuient sur un code personnalisé pour la publicité ou la mesure des conversions peuvent utiliser cette API pour remplacer les techniques existantes.
- Les annonceurs et les éditeurs qui s'appuient sur des plates-formes de technologie publicitaire pour mesurer les conversions n'ont pas besoin d'utiliser l'API directement, mais peuvent être intéressés à la comprendre s'ils travaillent avec des plates-formes de technologie publicitaire pouvant intégrer l'API.

## Déboguer les erreurs d'API avec les outils pour les développeurs Chrome

[Disponible à partir de Chrome 93](/blog/new-in-devtools-93/#attribution-reporting). Les erreurs de l'API Attribution Reporting sont désormais signalées dans les [outils pour les développeurs](/docs/devtools) sous l'onglet [Issues](/docs/devtools/issues/).

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/bkEGVEv5kKc9M6qBUmLz.png", alt="Erreurs de l'API Attribution Reporting dans l'onglet Issues", width="800", height="501" %}

## Participer

{% Aside %}<br> **Votre participation est nécessaire !** Cette API peut avoir besoin de prendre en charge une grande variété de cas d'utilisation de mesure de conversion et d'optimisation. La contribution de l'écosystème est vitale pour garantir que les solutions permettant de prendre en charge ces cas d'utilisation soient discutées ouvertement. {% endAside %}

Pour participer, rejoignez la discussion et essayez l'API. Faire les deux est optimal, mais vous pouvez participer à la discussion, que vous ayez ou non testé l'API.

### Rejoindre le débat

- [Participez aux réunions bimensuelles](https://github.com/WICG/conversion-measurement-api/issues/80) (toutes les deux semaines). Dans ces appels, les participants discutent des propositions de conception d'API et de la manière dont l'API pourrait prendre en charge divers cas d'utilisation de mesure. Vous pouvez [ajouter des sujets](https://docs.google.com/document/d/1zUSm9nX2nUsCa_fbI96UJoRCEr3eAPwWLU7HmClhIJk/edit) à l'ordre du jour de la prochaine réunion à tout moment. Tout le monde est le bienvenu pour participer à ces discussions, assurez-vous seulement de [rejoindre le référentiel WICG](https://www.w3.org/community/wicg/).
- [Ouvrez un ticket](https://github.com/WICG/conversion-measurement-api/issues/new) pour poser des questions, proposer des fonctionnalités ou discuter de cas d'utilisation. Si vous ne savez pas comment formuler votre problème, consultez des exemples comme [ce problème](https://github.com/WICG/conversion-measurement-api/issues/147) et [ce problème](https://github.com/WICG/conversion-measurement-api/issues/68). Vous pouvez également rejoindre la conversation dans [les problèmes existants](https://github.com/WICG/conversion-measurement-api/issues).

### Tester l'API

{% Aside 'caution' %}

Si vous testez l'API dans Chrome, vous aurez accès à toutes les fonctionnalités **actuellement** implémentées. Toutes les fonctionnalités discutées dans le [référentiel](https://github.com/WICG/conversion-measurement-api/) et les [réunions](https://github.com/WICG/conversion-measurement-api/issues/80) ne sont pas implémentées dans la phase d'évaluation de Chrome. Consultez l'état actuel de la fonctionnalité dans [État](#status). Les fonctionnalités disponibles pour l'expérimentation sont également un sous-ensemble de ce qui sera finalement pris en charge par l'API, et sont susceptibles de changer à mesure que l'API est développée de manière ouverte et que les commentaires de l'écosystème sont collectés.

{% endAside %}

#### Expérimentez localement ou avec une démo

1. Pour activer l'API localement dans votre navigateur, activez l'indicateur `#enable-experimental-web-platform-features`. Un indicateur Chrome est une bouton qui permet d'indiquer à votre navigateur d'activer ou de désactiver certaines fonctionnalités expérimentales. Pour activer cet indicateur, collez `chrome://flags/#enable-experimental-web-platform-features` dans la barre de recherche de Chrome et cliquez sur **Activer**.
2. Exécutez la [démo](#demo) localement (ou testez la [démo en direct](#demo)).
3. [Dupliquez le code de démonstration](#demo) et personnalisez-le, ou créez votre propre démo à partir de zéro.

#### Expérimentez avec des utilisateurs finaux sur un site déployé

1. Activez l'API pour les utilisateurs finaux en vous inscrivant à une [phase d'évaluation](/blog/origin-trials/) si disponible. Cela vous permet d'accéder aux fonctionnalités expérimentales et de créer des fonctionnalités que vous pouvez essayer pendant une durée limitée. Notez que les [phases d'évaluation tiers](/blog/third-party-origin-trials/) permettent à des acteurs tiers tels que des fournisseurs de services de publicité et de mesure de tester une API sur plusieurs sites. **Pour voir les phases d'évaluation actuellement disponibles pour cette API, rendez-vous sur [État](#status)**. Pour être informé des futures phases d'évaluation, rejoignez la [liste de diffusion Attribution Reporting pour les développeurs](https://groups.google.com/u/1/a/chromium.org/g/attribution-reporting-api-dev).

2. Intégrez l'API dans vos sites et systèmes.

{% Aside %}<br> Si vous avez des questions sur l'implémentation, rejoignez la [liste de diffusion Attribution Reporting pour les développeurs](https://groups.google.com/u/1/a/chromium.org/g/attribution-reporting-api-dev).

Si vous avez des questions techniques générales sur votre cas d'utilisation, envisagez d'ouvrir un ticket sur le [référentiel d'assistance au développement Privacy Sandbox](https://github.com/GoogleChromeLabs/privacy-sandbox-dev-support).<br> {% endAside %}

## Démo

Il est possible de tester quelques démos.

- Rapports basés sur les événements, clics uniquement :

    - [Démo en direct](https://goo.gle/sppi-devrel-eventlevel).
    - [Code source](https://github.com/GoogleChromeLabs/trust-safety-demo/tree/main/attribution-reporting) de cette démo, que vous pouvez [dupliquer et personnaliser](https://github.com/GoogleChromeLabs/trust-safety-demo/tree/main/attribution-reporting#fork-and-customize) selon vos besoins.

## Cas d'utilisation et fonctionnalités

{% Aside %}

Cette API est un travail en cours et évoluera au fil du temps, en fonction des commentaires et des contributions de l'écosystème.

Toutes les fonctionnalités prises en charge par cette API sont des propositions. **Chacune de ces propositions est ouverte à la discussion et aux commentaires**, y compris celles pour lesquelles une implémentation initiale du navigateur est prête.

Cette API est incubée et développée de manière ouverte. [Pensez à participer](#participate) à la discussion.

{% endAside %}

Cette API permet aux sites de mesurer les conversions dans les cas suivants :

- **Clics** sur une annonce et **vues**.
- Annonces dans un **iframe tiers** , telles que les annonces sur un site d'éditeur qui utilise un fournisseur de technologie publicitaire tiers.
- Annonces dans un **contexte propriétaire**, telles que des annonces sur un réseau social ou une page de résultats de moteur de recherche, ou un éditeur diffusant ses propres annonces.

Un **modèle d'attribution** flexible est pris en charge. Consultez les détails dans [État](#status).

Cette API donne accès à différents types d'insights via deux types de rapports qui peuvent être envoyés à un annonceur ou à un fournisseur de technologie publicitaire tiers. Ces deux types de rapports peuvent être utilisés simultanément : ils sont complémentaires.

Les **rapports basés sur les événements** associent un clic sur une annonce ou une vue à des données de conversion approximatives.

<figure>{% Img src="image/O2RNUyVSLubjvENAT3e7JSdqSOx1/8PZhfv4UXYxt2vTKRNI2.png", alt="rapport basé sur les événements", width="400", height="180" %}<figcaption>Exemple de rapport basé sur les événements : un clic sur l'ID 200400600 sur <code>news.example</code> (associé à l'ID utilisateur Bob_Doe sur <code>news.example</code>) a conduit à un achat sur <code>shop.example</code>.</figcaption></figure>

Les rapports basés sur les événements sont adaptés aux cas suivants :

- Cas d'utilisation d'**optimisation** : les rapports basés sur les événements aident à répondre à des questions telles que *"Comment améliorer mon retour sur investissement ?"*. En particulier, ils peuvent être utilisés pour optimiser l'emplacement des annonces, car un identifiant unique pour le côté annonce peut être mis à disposition dans les rapports. Les rapports basés sur les événements peuvent fournir des données d'entraînement pour les modèles d'apprentissage automatique.
- Cas d'utilisation de **rapports approximatifs** : lorsque très peu d'informations sont nécessaires sur la conversion. La limitation actuelle est de 3 bits de données de conversion pour les clics, ce qui signifie qu'une conversion peut se voir attribuer l'une des huit catégories et 1 bit pour les vues. L'encodage de données granulaires de conversion, telles qu'un prix ou une durée de conversion spécifique, n'est donc pas pris en charge dans les rapports basés sur les événements.
- Cas d'utilisation de **détection de fraude** : les données de certains rapports peuvent être utiles pour la détection et l'analyse de la fraude publicitaire, en vous permettant de comprendre les modèles qui peuvent être utilisés pour identifier les activités de spam ou non valides.

Les **rapports agrégés**, en revanche, offrent des données de conversion plus détaillées et plus de flexibilité pour associer les données de clic/d'affichage et les données de conversion.

<figure>{% Img src="image/O2RNUyVSLubjvENAT3e7JSdqSOx1/TxgT3W5pNEZhWgDSYIY3.png", alt="rapport global", width="400", height="180"%}<figcaption>Exemple d'insights issus de rapports agrégés : l'ID de campagne 1234567 sur <code>news.example</code> a généré 518 conversions sur <code>shoes.example</code>, et une dépense totale de 38 174 $. La moitié des conversions provenaient d'utilisateurs de New York, aux États-Unis.</figcaption></figure>

Les rapports agrégés sont les mieux adaptés pour **signaler** des cas d'utilisation. Ils aident à répondre à des questions telles que *"Quel est mon retour sur investissement ?"*.<br> L'utilisation de rapports agrégés pour les cas d'utilisation d'**optimisation**, par exemple pour optimiser une valeur d'achat qui n'est pas prise en charge par les rapports basés sur les événements car les données de conversion sont trop approximatives, est un domaine de recherche active. Consultez les [questions ouvertes](#open-questions).

{% Details %}<br> {% DetailsSummary 'h3' %}<br> Pourquoi deux types de rapports sont-ils nécessaires ?<br> {% endDetailsSummary %}

Les rapports basés sur les événements ne proposent que des données de conversion approximatives afin de préserver la confidentialité des utilisateurs.

Mais ces données approximatives peuvent ne pas être suffisantes pour mesurer l'efficacité d'une campagne. Les spécialistes du marketing peuvent avoir besoin d'obtenir des informations sur les conversions, telles que la valeur d'achat, les données démographiques agrégées côté annonceur pour les utilisateurs qui ont effectué une conversion, les catégories de produits achetés, si les utilisateurs ayant effectué une conversion sont des nouveaux clients ou des récurrents, le contenu des paniers, etc.

C'est pourquoi les rapports agrégés ont été conçus.<br> {% endDetails %}

Les autres fonctionnalités proposées dans cette API sont l'[attribution app-to-web](https://github.com/WICG/conversion-measurement-api/blob/main/app_to_web.md) (voir ou cliquer sur une annonce dans une application et effectuer une conversion sur le Web) et l'[attribution multi-appareils](https://github.com/WICG/conversion-measurement-api/blob/main/cross_device.md) (voir ou cliquer sur une annonce sur mobile et effectuer une conversion sur ordinateur).

{% Aside %}<br> Dans un futur sans cookies tiers, cette API serait combinée à d'autres API publicitaires préservant la confidentialité afin de couvrir les cas d'utilisation de bout en bout :

- Remarketing : voir [FLEDGE](/docs/privacy-sandbox/fledge/)
- Sélection d'annonces basées sur les centres d'intérêt : voir [FLoC](/docs/privacy-sandbox/floc/)

{% endAside %}

## État

**🕙 Dernière mise à jour : août 2021**

États :

- `🤿 Under exploration` (en cours d'exploration) : cette idée est aux premiers stades de discussion.
- `🥚 Proposal` (proposition) : un premier design est prêt et en incubation publique.
- `🏗️ Under development (BROWSER_NAME)` (en cours de développement): la fonctionnalité est en cours d'implémentation dans BROWSER_NAME.
- `🧪 Experiment (BROWSER_NAME)` (tests) : une version de test est disponible dans BROWSER_NAME. Dans Chrome, une version de test s'appelle une phase d'évaluation.
- `🚀 Stable (BROWSER_NAME)` : la fonctionnalité est livrée par défaut dans BROWSER_NAME.

{% Aside %}<br> [Phase d'évaluation actuelle](/origintrials/#/view_trial/3411476717733150721) (test Chrome) {% endAside %}

{% Aside 'caution' %}<br> Des phases d'évaluation multiples (expériences) seront effectuées. Chaque version est utilisée pour améliorer et ajuster l'API en fonction des commentaires de l'écosystème. {% endAside %}

<table class="simple width-full fixed-table with-heading-tint">
<thead><tr>
    <th style="text-align: left;">Proposition</th>
    <th style="text-align: left;">Statut</th>
</tr></thead>
<tbody>
    <tr>
    <td>Rapports basés sur les événements pour les clics<br> <a href="https://github.com/WICG/conversion-measurement-api/blob/main/event_attribution_reporting_clicks.md">Explication</a>
</td>
    <td><code>🧪 Experiment (Chrome)</code></td>
    </tr>
    <tr>
    <td>Rapports basés sur les événements pour les vues<br> <a href="https://github.com/WICG/conversion-measurement-api/blob/main/event_attribution_reporting_views.md">Explication</a>
</td>
    <td><code>🏗️ Under development (Chrome)</code></td>
    </tr>
    <tr>
    <td>Rapports agrégés pour les clics et les vues<br> <a href="https://github.com/WICG/conversion-measurement-api/blob/main/AGGREGATE.md">Explication</a>
</td>
    <td><code>🥚 Proposal</code></td>
    </tr>
    <tr>
    <td>Parcours de conversion : multi-appareils<br> <a href="https://github.com/WICG/conversion-measurement-api/blob/main/cross_device.md">Explication</a>
</td>
    <td><code>🥚 Proposal</code></td>
    </tr>
    <tr>
    <td>Parcours de conversion : app-to-web<br> <a href="https://github.com/WICG/conversion-measurement-api/blob/main/app_to_web.md">Explication</a>
</td>
    <td><code>🥚 Proposal</code></td>
    </tr>
    <tr>
    <td>Modèle d'attribution : dernier clic<br> <a href="https://github.com/WICG/conversion-measurement-api/blob/main/event_attribution_reporting_clicks.md#multiple-sources-for-the-same-trigger-multi-touch">Explication</a>
</td>
    <td><code>🧪 Experiment (Chrome)</code></td>
    </tr>
    <tr>
    <td>Modèle d'attribution : basé sur les priorités<br> <a href="https://github.com/WICG/conversion-measurement-api/blob/main/event_attribution_reporting_views.md#controlling-which-attribution-source-to-triggerd">Explication</a>
</td>
    <td><code>🏗️ Under development (Chrome)</code></td>
    </tr>
    <tr>
    <td>Modèle d'attribution : flexible</td>
    <td><code>🤿 Under exploration</code></td>
    </tr>
</tbody>
</table>

{% Details %}
 {% DetailsSummary 'h3' %}
 À propos des modèles d'attribution
 {% endDetailsSummary %}

Avec le modèle basé sur la priorité, le navigateur peut associer une priorité à chaque source d'attribution. Cela peut être utilisé pour :

- Décider si un clic ou une vue était la cause la plus probable de la conversion (un clic est généralement considéré comme un signal plus direct de l'intérêt de l'utilisateur).
- Définir un **modèle d'attribution** **au premier contact**, en définissant `attributionsourcepriority` comme étant relative au temps.
- Définir un **modèle d'attribution linéaire** (probabiliste), en choisissant la priorité uniformément au hasard.

D'autres modèles d'attribution pourraient être pris en charge à l'avenir. Dans les rapports agrégés, le [schéma basé sur les worklets](https://github.com/WICG/conversion-measurement-api/blob/main/AGGREGATE.md#attribution-trigger-registration) permet éventuellement des options d'attribution plus flexibles, notamment en spécifiant un crédit partiel pour plusieurs sources d'attribution précédentes.

{% endDetails %}

## Prise en charge du navigateur

- Firefox et Edge [n'ont pas partagé de signaux](https://chromestatus.com/feature/6412002824028160).
- Safari/Webkit ne [prend pas en charge](https://chromestatus.com/feature/6412002824028160) et propose une API différente pour mesurer les conversions publicitaires, appelée [Private Click Measurement](https://developer.apple.com/videos/play/wwdc2021/10033/).

Bien que les deux API soient différentes, Chrome et WebKit travaillent ensemble de manière ouverte pour simplifier l'expérience des développeurs, par exemple en s'alignant sur les noms d'attributs et sur la [structure JSON pour les rapports](https://github.com/privacycg/private-click-measurement/issues/30).

{% Details %}<br> {% DetailsSummary 'h3' %}<br> Différences entre l'API proposée par Chrome et l'API proposée par WebKit<br> {% endDetailsSummary %}<br> L'ensemble de fonctionnalités de l'API Attribution Reporting proposé par Chrome est différent de celui de l'API Private Click Measurement proposée par Safari/WebKit.<br> Notamment, avec l'API Attribution Reporting proposée par Chrome :

- La mesure après affichage est prise en charge.
- Des rapports basés sur les événements peuvent être fournis.
- Les liens d'annonces dans un contexte propriétaire (comme des annonces sur un réseau social ou une page de résultats de moteur de recherche, ou un éditeur diffusant ses propres annonces) **et** des liens d'annonces dans un iFrame tiers (comme des annonces sur un site d'éditeur qui utilise un fournisseur de technologie publicitaire tiers) sont pris en charge.
- Les tiers, tels que les plates-formes de technologie publicitaire, peuvent recevoir des rapports au nom des éditeurs et des annonceurs.

{% endDetails %}

## Fonctionnement

### Rapports basés sur les événements

<figure>{% Img src="image/O2RNUyVSLubjvENAT3e7JSdqSOx1/bdnt0qHKdPJJYzxU03Xm.png", alt="rapport basé sur les événements", width="800", height="521" %}<figcaption> Les rapports basés sur les événements sont générés comme suit : le navigateur fait correspondre les clics ou les vues ("événements de source d'attribution") avec les données de conversion ("données de déclenchement d'attribution") définies par une technologie publicitaire. Ensuite, le navigateur envoie les rapports résultants à un point de terminaison prédéfini, avec un certain délai et du bruit.</figcaption></figure>

{% Details %}<br> {% DetailsSummary 'h3' %}<br> Fonctionnement en détail : rapports basés sur les événements<br> {% endDetailsSummary %}<br> Les liens d'annonces peuvent être configurés avec des attributs spécifiques aux conversions publicitaires :

- Données personnalisées à associer à un clic sur une annonce (ou à une vue) du côté de l'éditeur, par exemple un ID de clic ou un ID de campagne.
- Le site pour lequel une conversion est attendue pour cette annonce.
- Point de terminaison de rapport qui doit être informé des conversions réussies, c'est-à-dire recevoir les rapports.
- Date limite à laquelle les conversions ne peuvent plus être comptabilisées pour cette annonce.

Remarque : il est également possible d'enregistrer une source d'attribution pour les navigations [initiées par `window.open()`](https://github.com/WICG/conversion-measurement-api/blob/main/event_attribution_reporting_clicks.md#registering-attribution-sources-for-windowopen-navigations) ou pour les vues, via une [API JavaScript](https://github.com/WICG/conversion-measurement-api/blob/main/event_attribution_reporting_views.md#registering-attribution-sources-with-javascript).

Lorsque l'utilisateur clique ou voit une annonce spécialement configurée, le navigateur sur l'appareil local de l'utilisateur enregistre cet événement, ainsi que les données de configuration d'attribution qui ont été spécifiées.

Ensuite, l'utilisateur visite le site web de l'annonceur et effectue une action que l'annonceur ou son fournisseur de technologie publicitaire identifie comme une conversion, par exemple un achat. Lorsque cela se produit, l'annonceur ou le fournisseur de technologie publicitaire déclenche une attribution : il demande au navigateur d'enregistrer une conversion avec une certaine valeur `trigger-data`, et le clic sur l'annonce (ou la vue) et l'événement de conversion sont mis en correspondance par le navigateur de l'utilisateur.

Pour finir, le navigateur planifie un rapport à envoyer au point de terminaison spécifié du côté de l'annonce. Ce rapport comprend :

- Les données personnalisées côté annonce qui ont été associées au clic sur une annonce ou à une vue qui a conduit à cette conversion.
- Les données personnalisées côté conversion, avec un peu de bruit.

Si plusieurs conversions sont enregistrées pour un clic sur une annonce donné (ou une vue), les rapports correspondants sont planifiés pour être envoyés. Un seul rapport peut être envoyé pour les vues et jusqu'à trois rapports pour les clics.

Les rapports sont envoyés par le navigateur après un délai de plusieurs jours ou parfois semaines après une conversion.

{% endDetails %}

### Rapports agrégés

<figure>{% Img src="image/O2RNUyVSLubjvENAT3e7JSdqSOx1/HAl0ppkoxoGCtttWDk2A.png", alt="ALT_TEXT_HERE", width="800", height="1140" %}<figcaption> Les rapports agrégés sont générés comme suit : le navigateur met en correspondance les clics ou les vues détaillés ("événements de source d'attribution") avec des données de conversion détaillées ("données de déclenchement d'attribution") définies par une technologie publicitaire. Le code défini par technologie publicitaire s'exécute dans un worklet pour définir les contributions qui seront envoyées par le navigateur afin d'être utilisées pour calculer des rapports agrégés. Les services d'agrégation sont responsables du calcul privé des rapports agrégés pour la technologie publicitaire.</figcaption></figure>

{% Details %}<br> {% DetailsSummary 'h3' %}<br> Fonctionnement en détail : rapports agrégés<br> {% endDetailsSummary %}

Les liens d'annonces peuvent être configurés avec des attributs spécifiques aux conversions publicitaires.

Lorsque l'utilisateur clique ou voit une annonce spécialement configurée, le navigateur sur l'appareil local de l'utilisateur enregistre cet événement, ainsi que les données de configuration d'attribution qui ont été spécifiées.

Le code défini par technologie publicitaire est ensuite exécuté dans un worklet pour définir les contributions, à savoir les jointures des données côté annonce et côté conversion.

Ces contributions (rapports bruts) sont envoyées chiffrées à un serveur de technologie publicitaire, puis à des services d'agrégation qui calculeront les rapports agrégés de manière [privée](#privacy).

Notez que les rapports agrégés ne sont pas retardés dans la même mesure que les rapports basés sur les événements.

{% endDetails %}

## Confidentialité

### Aperçu

Prenons l'exemple d'une personne nommée Bob. Bob voit une annonce en lisant les actualités sur `news.com`. Une semaine plus tard, Bob achète des chaussures sur `shoes.example`.

Aujourd'hui, cette conversion serait suivie par un cookie tiers utilisé comme **identifiant intersites**. Avec les cookies tiers, une entreprise de technologie publicitaire peut accéder à de nombreux détails sur l'activité de Bob sur `news.example` **et** `shoes.example`, et fusionner ces informations pour créer un profil détaillé de Bob. Une entreprise de technologie publicitaire peut ainsi découvrir la localisation de Bob, ses habitudes de navigation et ses thèmes préférés sur `news.com`, **{nbsp}ainsi que** ses achats, son activité et ses informations de carte de crédit sur `shoes.com`. Cette jointure intersites est utile pour mesurer les conversions publicitaires, mais cela entrave la confidentialité des utilisateurs : l'activité de Bob est suivie sur des sites avec un niveau d'informations élevées.

D'autre part, l'API Attribution Reporting permet aux agences de publicité d'obtenir des informations sur les conversions **sans suivre l'activité d'un individu sur les sites**. Une petite quantité d'informations est jointe entre les sites, assez pour mesurer les conversions, mais pas assez pour suivre en détail l'activité de Bob sur les sites. L'activité de Bob sur `news.example` et sur `shoes.example` reste distincte.

{% Img src="image/O2RNUyVSLubjvENAT3e7JSdqSOx1/aurePszyAGz9Osu3G0XN.jpg", alt="Diagramme : vue côte à côte du web d'aujourd'hui (identité jointe) et du web de demain (identité partitionnée)", width="800", height= "314" %}

### En détail

<figure>{% Img src="image/O2RNUyVSLubjvENAT3e7JSdqSOx1/UMXwDWt4RSo98PTS0Wvd.png", alt="ALT_TEXT_HERE", width="800", height="1237" %}<figcaption>Contrairement aux cookies tiers, l'API Attribution Reporting fournit des informations sans identifiants intersites afin de préserver le partitionnement des identités par site.<br> Les rapports basés sur les événements associent un identifiant côté annonce avec seulement une petite quantité de données côté conversion. Ils fournissent donc des informations intersites sur une conversion, mais les informations côté conversion sont trop approximatives pour joindre l'identité de l'utilisateur sur tous les sites.<br> Les rapports agrégés fournissent des informations détaillées, mais uniquement à un niveau agrégé. En raison des techniques de confidentialité différentielles, du calcul privé et de la cryptographie, les rapports agrégés ne peuvent pas être utilisés pour suivre l'activité d'un utilisateur individuel sur plusieurs sites.<br> Des protections supplémentaires de la confidentialité, telles que des limitations de débit, sont imposées à la fois aux rapports basés sur les événements et aux rapports agrégés.</figcaption></figure>

{% Details %}<br> {% DetailsSummary 'h3' %}<br> En détail : rapports basés sur les événements et confidentialité {% endDetailsSummary %}

Les rapports basés sur les événements fournissent des informations sur les conversions sans suivre les utilisateurs sur les sites, grâce aux mécanismes de confidentialité suivants :

- Aucun identifiant intersites n'est utilisé et aucune activité de navigation intersites détaillée ne quitte l'appareil. Les rapports basés sur les événements associent 64 bits d'informations du côté annonce (`news.example`) avec seulement 1 bit ou 3 bits du côté conversion (`shop.example`). Des informations de 64 bits **sont suffisantes pour être mises en correspondance avec un ID utilisateur individuel, mais ces 64 bits ne peuvent être associés qu'à très peu d'informations intersites** : 1 bit ou 3 bits, qui ne sont pas suffisants pour contenir un identifiant. Remarque : les 64 bits côté annonce ne sont pas des informations nouvelles. Un ID utilisateur peut déjà être disponible du côté annonce aujourd'hui. `news.example` ou `adtech.example` connaît déjà l'activité de certains utilisateurs sur `news.example`.

- Des protections supplémentaires sont appliquées pour éviter les abus et le suivi intersites :

    - Les rapports sont envoyés avec un **délai**.
    - Les données de conversion sont **bruitées** : un certain pourcentage du temps (5 % dans Chrome), les vraies données de conversion sont remplacées par une valeur aléatoire.
    - Le nombre de rapports de conversion attribués est limité par clic ou vue.

{% Aside %}<br> Il est possible de récupérer le véritable nombre de conversions tout en préservant la confidentialité. Consultez l'[exemple de script](https://github.com/WICG/conversion-measurement-api/blob/main/noise_corrector.py). {% endAside %}

{% endDetails %}

{% Details %}<br> {% DetailsSummary 'h3' %}<br> En détail : rapports agrégés et confidentialité {% endDetailsSummary %}

Les rapports agrégés associent un événement de clic ou de vue détaillé à des données de conversion détaillées. Cependant, ils fournissent des informations sur les conversions sans suivre les utilisateurs sur les sites grâce aux mécanismes de confidentialité suivants :

- Aucun identifiant intersites n'est utilisé.

- Chaque attribution peut apporter plusieurs contributions à un rapport agrégé résultant, et un utilisateur donné peut déclencher plusieurs attributions pour un clic (ou une vue) et une conversion particuliers. Mais les contributions que tout utilisateur peut apporter dans une fenêtre de temps donnée sont limitées.

- Les données sont agrégées jusqu'au niveau de nombreux événements (de nombreux utilisateurs) et aucun événement individuel ne peut être observé avec précision. La [confidentialité différentielle](https://en.wikipedia.org/wiki/Differential_privacy) est utilisée pour maintenir les données de sortie inutilisables pour associer l'identité de l'utilisateur entre les sites : lors de l'exploration des données agrégées, à mesure que le niveau de détail augmente, le bruit relatif sur ces données augmente également. Cela conduit à une erreur relative plus importante et garantit qu'aucun événement individuel (ou utilisateur) ne peut être observé avec précision. D'un autre côté, les tranches de données qui agrègent beaucoup d'événements et d'utilisateurs sont plus précises pour préserver l'utilité.

- Les rapports bruts qui associent un événement de clic ou de vue détaillé à des données de conversion détaillées sont chiffrés et ne sont pas lisibles par l'entreprise de technologie publicitaire. Les données agrégées sont ensuite calculées à partir de ces rapports de manière privée via un serveur de confiance. Quelques options de calcul sont à l'étude :

    - Calculs multi-parties sécurisés (MPC) : la confiance est répartie sur plusieurs serveurs. Chaque serveur obtient une tranche de données qui n'a pas de sens individuellement. Une fois que chaque assistant a exécuté des calculs, la sortie de ces assistants est combinée pour former un résultat significatif.
    - Calculs sur un serveur unique : un serveur d'aide calcule la sortie. Cette option est moins sécurisée et moins privée, mais elle est plus facile à mettre en place. Ainsi, elle peut permettre à des acteurs de l'écosystème plus divers d'expérimenter cette API et de fournir des retours d'information. **Cette option n'est pas destinée à être une solution à long terme**. Avec un préavis et un temps de migration suffisants, elle sera supprimée au fur et à mesure de l'intégration des retours d'informations de l'écosystème et de la maturation de cette API, au profit d'approches plus sûres, comme MPC ou un serveur unique sécurisé.
    - Calculs sécurisé sur un serveur unique! : un unique serveur, mais avec des propriétés de calcul confidentielles similaires (mais pas équivalentes) à l'approche MPC.
    - À long terme, les serveurs devront traiter les données exclusivement avec des calculs multi-parties sécurisés (serveur unique sécurisé ou multi-parties sécurisé).

- Des protections supplémentaires sont appliquées pour éviter les abus et le suivi intersites :

    - Les rapports sont envoyés avec des délais aléatoires.
    - Les requêtes sur différentes tranches de données sont à débit limité.

{% endDetails %}

## Sites et contrôle des utilisateurs

- Les utilisateurs peuvent se désinscrire via les paramètres utilisateur sur `chrome://settings/privacySandbox`.
- Par défaut, la fonctionnalité est activée dans les contextes de niveau supérieur. Les tiers arbitraires ne peuvent pas utiliser l'API à l'insu de l'éditeur, car l'API Attribution Reporting doit être activée dans les iFrames enfants via une [politique d'autorisation](https://developer.mozilla.org/docs/Web/HTTP/Headers/Feature-Policy).

## Questions ouvertes

Un certain nombre de questions restent ouvertes et seront résolues au fur et à mesure que l'API est développée de manière ouverte. Nous vous invitons à [participer](#participate) à ces discussions. En particulier :

- Quelle est la bonne quantité de bruit pour préserver la confidentialité et l'utilité ?
- Comment prendre en charge les modèles d'attribution personnalisés ?
- Comment optimiser les données de conversion qui ont un certain niveau de détail, comme une valeur d'achat ?
- Qu'est-ce qui sera considéré comme un serveur de confiance ? Une solution en cours d'évaluation consiste à effectuer des audits Open Source réguliers. [Participez à la discussion](https://github.com/WICG/conversion-measurement-api/issues/116).
- Comment offrir plus de flexibilité en matière de création de rapports, par exemple en prenant en charge la délégation à un plus grand nombre de points de terminaison de création de rapports ? [Participez à la discussion](https://github.com/WICG/conversion-measurement-api/issues/96).
- Comment empêcher la fraude, par exemple via l'authentification à l'aide d'informations d'identification anonymes ? [Participez à la discussion](https://github.com/WICG/conversion-measurement-api/labels/anti-fraud%20%2F%20auth).
- Si vous envisagez d'utiliser cette API pour des cas d'utilisation non publicitaires : qu'est-ce qui manque, comment l'API pourrait-elle être améliorée ? [Ouvrir un ticket](https://github.com/WICG/conversion-measurement-api/issues)
- Comment les responsables de l'implémentation peuvent-ils personnaliser les paramètres de confidentialité ? [Participez à la discussion](https://github.com/WICG/conversion-measurement-api/issues/99).

{% Aside %}<br> Cette API combine plusieurs techniques de confidentialité afin d'atteindre la **confidentialité et l'utilité**. Cela signifie que la limitation des données à 3 bits (ou 1 bit pour les vues) et les autres mécanismes de confidentialité utilisés par cette API sont un moyen pour atteindre un objectif. Ils sont sujets à changement. S'il existe des moyens pour les entreprises de technologie publicitaire d'obtenir des données plus utiles pour leurs cas d'utilisation tout en obtenant de solides garanties de confidentialité, cette API évoluera en conséquence. {% endAside %}
