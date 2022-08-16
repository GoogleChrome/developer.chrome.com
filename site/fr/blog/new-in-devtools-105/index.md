---
layout: "layouts/blog-post.njk"
title: "Quoi de nouveau dans DevTools (Chrome 105)"
authors:
  - jecelynyeen
date: 2022-08-12
updated: 2022-08-12
description: "Prise en charge pas à pas de la relecture et des évènements du passage de la souris dans l'enregistrement, LCP dans le volet Performance insights et plus encore"
hero: 'image/dPDCek3EhZgLQPGtEG3y0fTn4v82/CV693oOk6vAi1SodRYBK.jpg'
alt: ''
tags:
  - new-in-devtools
  - devtools
  - chrome-105
---

{% include 'partials/devtools/fr/banner.md' %}

<!-- ## Step-by-step replay in the Recorder {: #recorder } -->
## Rejouer un enregistrement pas à pas dans "Recorder" {: #recorder }

<!-- You can now set a breakpoint and replay a user flow step by step in the **Recorder** volet. -->
Vous pouvez maintenant définir un point d'arrêt et rejouer le flux utilisateur pas à pas dans le volet "**Recorder**".

<!-- To set a breakpoint, click on the blue dot next to a step. Replay your user flow, the replay will pause before executing the step. From here, you can continue the replay, execute a step, or cancel the replay. -->
Pour définir un point d'arrêt, cliquez sur le point bleu à coté de l'étape. Rejouez le flux utilisateur, la relecture se mettra en pause avant d'exécuter l'étape. A partir de ce point vous pouvez continuer la relecture, exécuter l'étape ou annuler la relecture.

<!-- With this feature, you can fully visualize and debug your user flow with ease. -->
Avec cette fonctionnalité, vous pouvez entièrement visualiser et déboguer votre flux utilisateur en tout simplicité.

<!-- See [Recorder features reference](/docs/devtools/recorder/reference/) for more information.-->
Voir [Référence sur la fonctionnalité d'enregistrement](/docs/devtools/recorder/reference/) pour plus d'informations.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/5RqFNkPTbtEXSC4KovNF.png", alt="Relecture pas à pas dans Recorder", width="800", height="547" %}

Chromium issue: [1257499](https://crbug.com/1257499)


<!-- ## Support mouse over event in the Recorder volet {: #recorder-hover } -->
## Support de l'évènement survol dans le volet "Recorder" {: #record-hover }

<!-- The **Recorder** now supports adding a mouse over (hover) step manually in a recording -->
"**Recorder**" prend désormais en charge l'ajout manuel d'une étape de survol de la souris dans un enregistrement.

<!-- [This demo](https://jec.fyi/demo/menu-hover) shows a pop up menu on hover. Try to record a user flow and click a menu item. -->
[Cette démonstration](https://jec.fyi/demo/menu-hover) affiche un menu contextuel au survol de la souris. Essayez d'enregistrer un flux utilisateur et de cliquez sur un élément du menu.

<!-- If you replay the user flow now, it will fail because the **Recorder** doesn’t capture mouse over events automatically during recording. To resolve this, [add a step manually](/docs/devtools/recorder/reference/#add-and-remove-steps) to hover over the selector before clicking the menu item. -->
Si vous rejouez maintenant le flux utilisateur, il échouera car "**Recorder**" n'a pas capturé automatiquement l'évènement de survol de la souris pendant l'enregistrement. Pour résoudre ce problème, [ajoutez manuellement une étape](/docs/devtools/recorder/reference/#add-and-remove-steps) pour survoler le sélecteur avant de cliquer sur l'élément du menu.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/GY1ZkqEU3zbGmhEKoblN.png", alt="Support de l'évènement survol de la souris dans Recorder", width="800", height="488" %}

Chromium issue: [1257499](https://crbug.com/1257499)


<!-- ## Largest Contentful Paint (LCP) in the Performance insights volet {: #lcp } -->
## "Largest Contentful Paint" (LCP) dans le volet "Performance insights" {: #lcp }

<!-- LCP is an important, user-centric metric for measuring [perceived load speed](https://web.dev/user-centric-performance-metrics/#types-of-metrics). You can now find out the critical paths and root causes of a [Largest Contentful Paint (LCP)](https://web.dev/lcp/). -->
LCP est une mesure importante, centrée sur l'utilisateur mesurant la [vitesse de chargement perçue](https://web.dev/user-centric-performance-metrics/#types-of-metrics). Vous pouvez désormais découvrir les chemins critiques et les causes principales d'un ["Largest Contentful Paint" (LCP)](https://web.dev/lcp/).

<!-- In a [performance recording](/docs/devtools/performance-insights/#record), click on the LCP badge in the **Timeline**. In the **Details** pane, you can view the LCP score, learn how to fix resources that slow down the LCP and see the critical path for the LCP resource. -->
Dans l'[enregistrement des performances](/docs/devtools/performance-insights/#record), dans la **chronologie** cliquez sur le badge LCP. Dans le volet **Détails** vous pouvez voir le score du LCP, apprendre comment résoudre les ressources qui ralentissent le LCP et voir les chemins critiques pour le LCP.

<!-- See [Performance Insights](/docs/devtools/performance-insights/) to learn how to get actionable insights and improve your website’s performance with the volet. -->
Voir ["Performance Insights"](/docs/devtools/performance-insights/) pour apprendre comment obtenir des informations utiles et améliorer les performances de votre site grâce à ce volet.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/NZZJ1FzXxqj2U2NR0U53.png", alt="LCP dans le volet performance insights", width="800", height="751" %}

Chromium issue: [1326481](https://crbug.com/1326481)


<!-- ## Identify flashes of text (FOIT, FOUT) as potential root causes for layout shifts {: #foit-fout } -->
## Identifier les flashs de textes (FOIT, FOUT) comme potentielles causes de décalage de mise en page {: #foit-fout }

<!-- The **Performance insights** volet now detects [flash of invisible text (FOIT) and flash of unstyled text (FOUT)](https://web.dev/preload-optional-fonts/#font-rendering) as potential root causes for layout shifts.-->
Le volet "**Performance insights**" détecte désormais [le flash de text invisible (FOIT) et le flash de texte non stylisé (FOUT)](https://web.dev/preload-optional-fonts/#font-rendering) comme potentielles causes de décalage de mise en page.

<!-- To view the potential root causes of a layout shift, click on a screenshot in the **Layout shifts** track. -->
Pour voir les potentielles causes de décalage de mise en page, cliquez sur une capture d'écran dans la chronologie de la modification de la mise en page.

<!-- See [Optimize WebFont loading and rendering](https://web.dev/optimize-webfont-loading/) to learn the technique to prevent layout shifts. -->
Voir [Optimisation du chargement et rendu des "WebFonts"](https://web.dev/optimize-webfont-loading/) pour apprendre les techniques qui permettent d'éviter les changements de mise en page.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/AMN5oD5hlKhPhnq98sIB.png", alt="FOUT dans le volet Performance Insights", width="800", height="497" %}

Chromium issues: [1334628](https://crbug.com/1334628), [1328873](https://crbug.com/1328873)


<!-- ## Protocol handlers in the Manifest pane {: #manifest } -->
## Gestionnaires de protocoles dans le volet "Manifest" {: #manifest }

<!-- You can now use DevTools to test the [URL protocol handler registration](https://web.dev/url-protocol-handler/) for [Progressive Web Apps (PWA)](https://web.dev/learn/pwa/). -->
Vous pouvez désormais utiliser "DevTools" pour tester l'[enregistrement du gestionnaire de protocoles URL](https://web.dev/url-protocol-handler/) pour une [Progressive Web Apps (PWA)](https://web.dev/learn/pwa/).

<!-- The URL protocol handler registration lets installed PWAs handle links that use a specific protocol (e.g. [`magnet`](https://wikipedia.org/wiki/Magnet_URI_scheme), `web+example`) for a more integrated experience.-->
L'enregistrement du gestionnaire de protocoles URL permet aux PWAs installées de gérer les liens utilisant un protocole spécifique (e.g[`magnet`](https://wikipedia.org/wiki/Magnet_URI_scheme), `web+example`) pour une expérience plus immersive.

<!-- Navigate to the **Protocol Handlers** section via the **Application** > **Manifest** pane. You can view and test all the available protocols here. -->
Naviguez vers la section "**Protocol Handlers**" via le volet **Application** > **Manifest**. Ici, vous pouvez voir et tester tous les protocoles disponibles.

<!-- For example, install [this demo PWA](https://protocol-handler.glitch.me/). In the **Protocol Handlers** section, type “americano” and click **Test protocol** to open the coffee page in the PWA. -->
Par exemple, installez [cette PWA de démonstration](https://protocol-handler.glitch.me/). Dans la section "**Protocol Handlers**", tapez "americano" et cliquez sur "**Test protocol**" pour ouvrir la page café dans la PWA.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/DuH2YwkYGPpYjnUKln8m.png", alt="Gestionnaire de protocoles dans le volet Manifest", width="800", height="402" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/cc2291cce5c5d199540334d01fcfe27207bc5962 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/1aa36584d580ed5aa2caf7a8533f2c89b16ab66b #}

Chromium issues: [1300613](https://crbug.com/1300613)


<!-- ## Top layer badge in the Elements volet {: #top-layer } -->
## Badge "Top Layer" dans le volet "Elements" {: #top-layer }

<!-- Use the [top layer badge](/blog/top-layer-devtools/#top-layer-support-design-in-devtools) to understand the concept of the top layer and visualize how the top layer content changes. -->
Utilisez [le badge "top layer"](/blog/top-layer-devtools/#top-layer-support-design-in-devtools) pour comprendre ce concept et visualiser comment le contenue "top layer" change.

<!--- The [`<dialog>` element](https://web.dev/building-a-dialog-component/) has recently become stable across browsers. When you open a dialog, it is put into a [top layer](/blog/top-layer-devtools/). Top level content renders on top of all the other content. -->
L'[élément `<dialog>`](https://web.dev/building-a-dialog-component/) est récemment devenu stable sur tous les navigateurs. Lors de l'ouverture d'une modale, celle-ci est est placée dans le ["top layer"](/blog/top-layer-devtools/). Le contenue "top layer" est placé au-dessus de tous les autres.

<!-- In this [demo](https://jec.fyi/demo/dialog), click **Open dialog**. -->
Dans cette [démonstration](https://jec.fyi/demo/dialog), cliquez sur "**Open dialog**".

<!-- To help visualize the top layer elements, DevTools adds a top layer container (`#top-layer`) to the DOM tree. It resides after the closing `</html>` tag. -->
Pour vous aidez à visualisez les éléments "top layer", **DevTools** ajoute un conteneur  "top layer" au DOM. Ce conteneur se trouve après la balise de fermeture `</html>`.

<!-- To jump from the top layer container element to the top layer tree element, click the **reveal** button next to the element or its backdrop in the top layer container. -->
Pour aller du conteneur "top layer" à l'élément "top layer" dans l'arbre des éléments, cliquez sur le bouton "**reveal**" à coté de l'élément ou dans le "backdrop" du conteneur "top layer".

<!-- Next to the top layer tree element (for example, the dialog element), click the **top-layer** badge to jump to the top layer container.-->
Près de l'élément "top layer" dans l'arbre des éléments (par exemple un élément "dialog"), cliquez sur le badge "**top layer**" pour aller directement au conteneur de l'élément "top layer".

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/pGMsiKw0IhplBMd4hZCv.png", alt="Badge top layer dans le volet Elements", width="800", height="538" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/a8d58fa6e258423aef2b00ead3aea563629eef43 #}

Chromium issue: [1313690](https://crbug.com/1313690)


<!-- ## Attach Wasm debugging information at runtime {: #wasm } -->
## Attacher les informations du débogage WASM au moment de l'exécution {: #wasm }

<!-- You can now attach DWARF debugging information for wasm during runtime. Previously, the **Sources** volet only supported attaching sourcemaps to JavaScript and Wasm files. -->
Vous pouvez désormais attacher des informations de débogage DWARF durant une exécution wasm. Précédemment, le volet "**Sources**" supportait uniquement les fichiers "sourcesmaps" liés aux fichiers Javascript et Wasm.

<!-- Open a Wasm file in the **Sources** volet. Right-click in the editor and select **Add DWARF debugging info…**  to attach debugging information on demand. -->
Ouvrez un fichier Wasm dans le volet "**Sources**". Clique droit dans l'éditeur, dans le menu contextuel, sélectionnez "**Add DWARF debugging info…**" pour attacher les informations de débogage à la demande.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/i5DMV6DFNGRYkrXyBtlg.png", alt="ALT_TEXT_ICI", width="800", height="559" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/112d6ec238ea3b1cb12f1cabc5b988afc74022db  #}

Chromium issue: [1341255](https://crbug.com/1341255)


## Prise en charge de l'édition direct pendant le débogage {: #live-edit }

<!-- You can now edit the top-most function on the stack without restarting the debugger. -->
Vous pouvez désormais éditer la fonction la plus élevée dans la pile d'exécution JavaScript sans redémarrer le débogage.

<!-- In Chrome 104, DevTools brings back the [restart frame](/blog/new-in-devtools-104/) feature. However, you weren't able to edit the function you are currently paused in. It is common for developers to break in a function and then edit that function while paused. -->
Dans la version 104 de Chrome, "DevTools" apporte de nouveau la fonctionnalité [rejouer la fonction](/blog/new-in-devtools-104/). Cependant vous ne pouviez pas éditer la fonction courante en débogue. Il est fréquent pour les développeurs de mettre un point d'arrêt dans une fonction et d'éditer celle-ci durant le débogue.

<!-- With this update, the debugger automatically restarts the function with the following restrictions:

- Only the top-most function can be edited while paused
- No recursive call on the same function further down the stack -->

Avec cette mise à jour, le débogeur redémarrera automatiquement la fonction avec les restrictions suivantes:

- Uniquement la fonction la plus élevée peut-être éditer durant le débogue
- Pas d'appel récursif sur cette fonction plus loin dans la pile d'exécution Javascript

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/0PG2PnQUh5bnpIulyj7m.png", alt="Edition direct pendant le débogage", width="800", height="560" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/b41deeb8b0b228ea4628a49e79a7ce4d8ab32ffa #}

Chromium issue: [1334484](https://crbug.com/1334484)


<!-- ## View and edit @scope at rules in the Styles pane {: #scope } -->
## Voir et éditer la règle "@scope" dans le volet "Styles" {: #scope}

<!--You can now view and edit the [CSS `@scope` at-rules](https://drafts.csswg.org/css-cascade-6/#scope-atrule) in the **Styles** pane. -->
Vous pouvez désormais voir et éditer la [règle CSS `@scope`](https://drafts.csswg.org/css-cascade-6/#scope-atrule) dans le volet "**Styles**".

<!-- The `@scope` at rules is part of the [CSS Cascading and Inheritance Level 6 specification](https://drafts.csswg.org/css-cascade-6/). These rules allow developers to scope style rules in CSS. -->
La règle `@scope` fait partie de la [spécification cascade CSS et héritage niveau 6](https://drafts.csswg.org/css-cascade-6/). Ces règles permettent aux développeurs de cloisonner les règles en CSS.

<!-- Open [this demo page](https://codepen.io/miriamsuzanne/details/ZErXZVY) and inspect the hyperlink within the `<div class=”dark-theme”>` element. In the **Styles** pane, view the `@scope` at-rules. Click the rule declaration to edit it. -->
Ouvrez [cette page de démonstration](https://codepen.io/miriamsuzanne/details/ZErXZVY) et inspectez les hyperliens se trouvant dans l'élément `<div class=”dark-theme”>`. Dans le volet "**Styles**", regardez la règle `@scope`. Cliquez sur la déclaration de la règle et éditez là.

{% Aside %}
<!-- The CSS `@scope` is currently under development. To test this feature, enable the **Experimental Web Platform features** flag via `chrome://flags/#enable-experimental-web-platform-features`. -->
La règle CSS `@scope` est encore en développement. Pour essayer cette fonctionnalité, autorisez le flag "**Experimental Web Platform features**"  à l'adresse suivante `chrome://flags/#enable-experimental-web-platform-features`.
{% endAside %}

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/LnkBUWoEl11HGiAD4ag7.png", alt="Règle CSS @scope dans le volet Styles", width="800", height="464" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/8b2309caa9ea358bc07d4d48eb976cc3dc6884cd #}

Chromium issue: [1337777](https://crbug.com/1337777)


<!-- ## Sourcemap improvements {: #sourcemaps } -->
## Amélioration "sourcemap" {: #sourcemaps }

<!-- Here are a few fixes on sourcemaps to improve the overall debugging experience:

- DevTools now properly resolves sourcemap identifiers with punctuation. Some modern minifiers (for example, [esbuild](https://esbuild.github.io/)) produce sourcemaps that merge identifiers
with subsequent punctuation (comma, parentheses, semicolon).
- DevTools now resolves sourcemap names for constructors with a `super` call.
  {% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/6djFfkrtPzXuNYq5m8Vk.png", alt="ALT_TEXT_HERE", width="800", height="441" %}
- Fixed source map URL indexing for duplicate canonical URLs. Previously, breakpoints were not activated in some files because of duplicate canonical URLs. -->

Voici quelques résolutions de bogs sur les "sourcemaps" permettant d'améliorer l'expérience de débogage:

- "DevTools" résout désormais correctement les identifiants "sourcemaps" avec ponctuation. Certains nouveaux "minifier" (par exemple,  [esbuild](https://esbuild.github.io/)) produisent des "sourcemaps" qui fusionnent des identifiants avec des ponctuations ultérieures (point, parenthèses et point-virgules)
- "Devtools" résout désormais les noms des "sourcemaps" pour les constructeurs appelés avec `super`.
- Correction de l'indexation des URLs des fichiers de mapping pour les URLs canoniques dupliquées. Précédemment, les point d'arrêts n'étaient pas activés dûs à la duplication des URLs canoniques.

Chromium issue: [1335338](https://crbug.com/1335338), [1333411](https://crbug.com/1333411)


<!-- ## Miscellaneous highlights {: #misc } -->
## Divers points {: #misc }

<!-- These are some noteworthy fixes in this release:

- Properly remove a local storage key value pair from the table in the **Application** > **Local Storage** pane when it is deleted. ([1339280](https://crbug.com/1339280))
- The color previews are now correctly displayed when viewing CSS files in the **Sources** volet. Previously, their positions were misplaced. ([1340062](https://crbug.com/1340062))
- Consistently display the CSS flex and grid items in the **Layout** pane, as well as display them as badges in the **Elements** volet. Previously, the flex and grid items were randomly missing in both places. ([1340441](https://crbug.com/1340441), [1273992](https://crbug.com/1273992))
- A new **Creator Ad Script** link is available for [ad frames](https://chromium.googlesource.com/chromium/src/+/master/docs/ad_tagging.md#adtracker) if DevTools found the script that caused the frame to be labeled as an ad. You can open a frame via **Application** > **Frames**. ([1217041](https://crbug.com/1217041)) -->

Voici quelques corrections notables dans cette version:

- Suppression correcte d'une paire clé/valeur de la table "local storage" dans le volet **Application** > **Local Storage**.
([1339280](https://crbug.com/1339280))
- Les aperçus de couleurs s'affichent désormais correctement lors de l'affichage des fichiers CSS dans le panneau **Sources**. Auparavant, leurs positions étaient mal placées. ([1340062](https://crbug.com/1340062))
- Affichage correcte des éléments CSS Flex et grid dans le volet **Layout** et affichage correct sous forme de badge de ces éléments dans le volet "**Elements**". Auparavant, les éléments flex et grid étaient absents de manière aléatoire à ces deux endroits. ([1340441](https://crbug.com/1340441), [1273992](https://crbug.com/1273992))
- Un nouveau lien "**Creator Ad Script**" est disponible pour les ["ad frames"](https://chromium.googlesource.com/chromium/src/+/master/docs/ad_tagging.md#adtracker) si "DevTools" trouve le script à l'origine de la "frame" étant considéré comme un "ad". Vous pouvez ouvrir une "frame" via le volet **Application** > **Frames**.

{% include 'partials/devtools/fr/reach-out.md' %}
{% include 'partials/devtools/fr/whats-new.md' %}
