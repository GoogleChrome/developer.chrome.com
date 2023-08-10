---
layout: 'layouts/doc-post.njk'
title: Replace remotely hosted code
subhead: 'Alternatives to remotely hosted code in Manifest V3'
description: 'Different ways to migrate remotely hosted code to Manifest V3.'
date: 2023-08-04
---

{% Partial 'extensions/mv3-support.md' %}

This section provides an overview of different strategies for migrating MV2 extensions relying on remotely hosted code to Manifest V3.

Manifest V3 removes the ability for an extension to use [remotely hosted code][1], as remotely hosted code presented a security risk by allowing unreviewed code to be executed in extensions. With this change, an extension can only execute JavaScript that is included within its package and subject to review by the Chrome Web Store.

## What is still possible? {: what-is-possible }

There are still a few special cases in which executing remotely hosted code and using <code>[eval()][2]</code> is still possible:

-   [Evaluate JavaScript in a sandboxed iframe][3].
-   [Inject remote hosted stylesheets into a web page using insertCSS][4]
-   For extensions using `chrome.devtools`: [inspectWindow.eval][5] allows executing JavaScript in the context of the inspected page.
-   Debugger extensions can use [chrome.debugger.sendCommand][6] to execute JavaScript in a debug target.

In these cases, moving your remote hosted code to Manifest V3 requires no additional steps.

## Use cases requiring migration {: use-cases }

The following use cases previously relying on remote hosted code will require workarounds when migrating to Manifest V3:

-   Using remote hosted third-party JavaScript (e.g. Google Analytics JS).
-   Using a third-party library that relies on `eval` / `new Function(...)` (e.g. templating).
-   Add / modify extension functionality without a new store submission.
-   Updating filtering / blocking lists at runtime.

In the rest of this guide we will discuss different migration strategies for these use cases.

## Using remote hosted third-party JavaScript {: remote-hosted-js }

In MV2 extensions it is possible to include remote hosted third-party JavaScript in content scripts, popups or background pages. For example, using Google Analytics in a pop up works by including the official Google tag via a `script` tag:

This is no longer supported in Manifest V3 extensions and requires additional migration steps. There are different workarounds available for embedding third-party JavaScript into your extension:

-   **Bundle third-party JS into your extension:** If you are using a popular framework like React or Bootstrap which you were previously loading from an external server, you can download the minified files, add them to your project and import them locally. In some cases, libraries, such as Firebase, will fetch additional code on a by need basis at runtime. In this case, you have to download all possible dynamic imports at build time. Here is an [example script that bundles Firebase using Rollup.js][7].
-   **Embed third party JS in a sandboxed iframe:** some third-party libraries might rely on the use of `eval` or `new Function(...)` which is not supported in Manifest V3 extensions. These operations are still supported in sandboxed iframes. For example, if you need a third party library for rendering your popup HTML, you could run the external script inside a sandboxed iframe inside your popup. Inside the iframe you can still execute arbitrary JavaScript. For more details read the [guide on sandboxed iframes][3]. However, this approach does not work if the third party code requires access to your popup’s DOM.
-   **Move functionality to your server:** communicating with remote servers is allowed. If functionality needs to change often, moving client-side functionality to your server can be a feasible workaround.
-   **Look for other workarounds.** If the previous approaches don’t help with your use case you might have to either find an alternative solution (i.e. migrate to a different library) or find other ways to use the library's functionality. For example, in the case of Google Analytics, you can switch to the Google measurement protocol instead of using the official remote hosted JavaScript version as described in our [Google Analytics 4 guide][8].

{% Aside 'warning' %}
If our reviewers are unable to determine the full functionality of your extension during the review process, the Chrome Web Store team may reject your submission or remove it from the store.
{% endAside %}

## Add/modify extension functionality at runtime without a new store submission {: dynamic-functionality }

One of the design goals of Manifest V3 is to reduce security risks for users by being able to review all the functionality provided by an extension. The Chrome Web Store’s review team must be able to easily discern the full functionality of an extension from its submitted code. For more details see the [Chrome Web Store policy for Manifest V3][9].

As a consequence, some things that were possible in Manifest V2 are no longer possible in Manifest V3. For example, launching a new UI feature in a popup without a Chrome Web Store submission is no longer possible. However, you can disable the new UI feature, but include it in your Chrome Web Store submission. Then you can dynamically enable the new UI using a remote configuration file and a feature toggle. 

The key point is this: any potential behavior changes must be discernible from your extensions code. For example, A/B testing via remote configuration is still possible as long as feature A and feature B are already present in the code submitted to the Chrome Web Store.

There are a few options available for modifying extension behavior at runtime:

-   **Remote configuration:** by downloading a static config file (e.g. a JSON file) and caching the configuration locally. The extension then uses this cached configuration to decide if specific features should be enabled.
-   **Moving logic to a remote server:** application logic which needs to change frequently can alternatively be moved to a remote web service that your extension can call. This provides the ability to keep code private and change the code on demand while avoiding the extra overhead of resubmitting to the Chrome Web Store. Cloud based computing services such as [Cloud Functions for Firebase][10] or [AWS Lambda][11] are good ways to do this.

A general rule of thumb is: the easier you make it for Chrome Web Store reviewers to understand what your code is doing the more likely it is that valid use cases will not be accidentally flagged.

[1]: /docs/extensions/migrating/improve-security/#remove-remote-code

[2]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/eval?retiredLocale=de

[3]: /docs/extensions/mv3/sandboxingEval/

[4]: /docs/extensions/reference/scripting/#method-insertCSS

[5]: /docs/extensions/reference/devtools_inspectedWindow/

[6]: /docs/extensions/reference/debugger/#method-sendCommand

[7]: https://gist.github.com/patrickkettner/8c1a91b1b8f9502b3b67d874e7024a7b

[8]: /docs/extensions/mv3/tut_analytics/

[9]: /docs/webstore/program-policies/mv3-requirements/

[10]: https://firebase.google.com/docs/functions

[11]: https://aws.amazon.com/lambda/
