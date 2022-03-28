---
api: declarativeContent
---

{% Aside %}

To transition from pageaction to action, see [Emulating pageActions with declarativeContent][emulating-page-actions]

{% endAside %}

## Usage

The Declarative Content API allows you to enable your extension's [action][api-action] depending on
the URL of a web page and the CSS selectors its content matches, without needing to add [host
permission][docs-host-perm] or inject a [content script][docs-content-scripts]. 

Use the [activeTab][docs-activetab] permission to interact with a page after the user clicks on the
toolbar icon.

## Rules

As a [declarative API][api-declarative], this API lets you register rules on the
[`onPageChanged`][event-onpagechanged] event object which take an action
([`ShowAction`][type-show-action] and [`SetIcon`][type-set-icon]) when a set of conditions,
represented as a `PageStateMatcher`, are met.

The [`PageStateMatcher`][type-page-state-matcher] matches web pages if and only if all listed
criteria are met. For example, the following rule uses [pageUrl][type-page-url] to enable the action
for pages on "https://www.google.com/" when a password field is present:

```js

var rule1 = {
  conditions: [
    new chrome.declarativeContent.PageStateMatcher({
      pageUrl: { hostEquals: 'www.google.com', schemes: ['https'] },
      css: ["input[type='password']"]
    })
  ],
  actions: [ new chrome.declarativeContent.ShowAction() ]
};

```

{% Aside %}

All conditions and actions are created via a constructor as shown in the example above.

{% endAside %}

In order to also enable the toolbar icon for sites with a video, you can add a second condition, as
each condition is sufficient to trigger all specified actions:

```js
var rule2 = {
  conditions: [
    new chrome.declarativeContent.PageStateMatcher({
      pageUrl: { hostEquals: 'www.google.com', schemes: ['https'] },
      css: ["input[type='password']"]
    }),
    new chrome.declarativeContent.PageStateMatcher({
      css: ["video"]
    })
  ],
  actions: [ new chrome.declarativeContent.ShowAction() ]
};
```

[Added rules][docs-adding-rules] are saved across browser restarts, so register them as follows:

```js
chrome.runtime.onInstalled.addListener(function(details) {
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([rule2]);
  });
});
```

{% Aside %}

You should always register or unregister rules in bulk rather than individually because each of
these operations recreates internal data structures. This re-creation is computationally expensive
but facilitates a faster matching algorithm.

{% endAside %}

Combine the above rule with the [activeTab][api-action] permission to create an extension that
doesn't need any install-time permissions but can invite the user to click the toolbar icon on
relevant pages.

## CSS Matching

[`PageStateMatcher.css`][section-matcher-css] conditions must be _[compound
selectors][w3-compound]_, meaning that you can't include [combinators][mdn-combinators] like
whitespace or "`>`" in your selectors. This helps Chrome match the selectors more efficiently.

<table><tbody><tr><th>Compound Selectors (OK)</th><th>Complex Selectors (Not OK)</th></tr><tr><td><code>a</code></td><td><code>div p</code></td></tr><tr><td><code>iframe.special[src^='http']</code></td><td><code>p&gt;span.highlight</code></td></tr><tr><td><code>ns|*</code></td><td><code>p + ol</code></td></tr><tr><td><code>#abcd:checked</code></td><td><code>p::first-line</code></td></tr></tbody></table>

CSS conditions only match displayed elements: if an element that matches your selector is
`display:none` or one of its parent elements is `display:none`, it doesn't cause the condition to
match. Elements styled with `visibility:hidden`, positioned off-screen, or hidden by other elements
can still make your condition match.

## Bookmarked State Matching

The [`PageStateMatcher.isBookmarked`][property-is-bookmarked] condition allows matching of the
bookmarked state of the current URL in the user's profile. To make use of this condition the
"bookmarks" permission must be declared in the extension [manifest][docs-manifest]

[api-action]: /docs/extensions/reference/action/
[api-declarative]: /docs/extensions/reference/events/#declarative-event-handlers
[docs-activetab]: /docs/extensions/mv3/manifest/activeTab/
[docs-adding-rules]: /docs/extensions/events#addingrules
[docs-content-scripts]: /docs/extensions/mv3/content_scripts
[docs-host-perm]: /docs/extensions/mv3/declare_permissions#host-permissions
[docs-manifest]: /docs/extensions/mv3/manifest/
[emulating-page-actions]: /docs/extensions/reference/action/#emulating-pageactions-with-declarativecontent
[event-onpagechanged]: #event-onPageChanged
[mdn-combinators]: https://developer.mozilla.org/docs/Web/CSS/CSS_Selectors#combinators
[property-is-bookmarked]: #property-PageStateMatcher-isBookmarked
[section-matcher-css]: #property-PageStateMatcher-css
[type-event]: /docs/extensions/reference/events/#type-Event
[type-page-state-matcher]: #type-PageStateMatcher
[type-page-url]: #property-PageStateMatcher-pageUrl
[type-set-icon]: #type-SetIcon
[type-show-action]: #type-ShowAction
[w3-compound]: https://www.w3.org/TR/selectors4/#compound