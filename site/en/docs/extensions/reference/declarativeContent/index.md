---
api: declarativeContent
---

## Usage

The Declarative Content API allows you to show your extension's [page action][1] depending on the
URL of a web page and the CSS selectors its content matches, without needing to take a [host
permission][2] or inject a [content script][3]. Use the [activeTab][4] permission in order to be
able to interact with a page after the user clicks on your page action.

If you need more precise control over when your page action appears or you need to change its
appearance to match the current tab before the user clicks on it, you'll have to keep using the
[pageAction][5] API.

## Rules

As a [declarative API][6], this API lets you register rules on the [`onPageChanged`][7] [event][8]
object which take an action ([`ShowPageAction`][9] and [`SetIcon`][10]) when a set of conditions,
represented as a [`PageStateMatcher`][11], are met.

The [`PageStateMatcher`][12] matches web pages if and only if all listed criteria are met. The
following rule would show a page action for pages on "https://www.google.com/" when a password field
is present on it:

```js
var rule1 = {
  conditions: [
    new chrome.declarativeContent.PageStateMatcher({
      pageUrl: { hostEquals: 'www.google.com', schemes: ['https'] },
      css: ["input[type='password']"]
    })
  ],
  actions: [ new chrome.declarativeContent.ShowPageAction() ]
};
```

{% Aside %}

**Note:** All conditions and actions are created via a constructor as shown in the example above.

{% endAside %}

In order to also show a page action for sites with a video, you can add a second condition, as each
condition is sufficient to trigger all specified actions:

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
  actions: [ new chrome.declarativeContent.ShowPageAction() ]
};
```

[Added rules][27] are saved across browser restarts, so register them as follows:

```js
chrome.runtime.onInstalled.addListener(function(details) {
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([rule2]);
  });
});
```

{% Aside %}

**Note:** You should always register or unregister rules in bulk rather than individually because
each of these operations recreates internal data structures. This re-creation is computationally
expensive but facilitates a faster matching algorithm.

{% endAside %}

Combine the above rule with the [activeTab][33] permission to create an extension that doesn't need
any install-time permissions but can invite the user to click its page action on relevant pages and
can run on those pages when the user clicks the page action.

## CSS Matching

[`PageStateMatcher.css`][34] conditions must be _[compound selectors][35]_, meaning that you can't
include [combinators][36] like whitespace or "`>`" in your selectors. This helps Chrome match the
selectors more efficiently.

<table><tbody><tr><th>Compound Selectors (OK)</th><th>Complex Selectors (Not OK)</th></tr><tr><td><code>a</code></td><td><code>div p</code></td></tr><tr><td><code>iframe.special[src^='http']</code></td><td><code>p&gt;span.highlight</code></td></tr><tr><td><code>ns|*</code></td><td><code>p + ol</code></td></tr><tr><td><code>#abcd:checked</code></td><td><code>p::first-line</code></td></tr></tbody></table>

CSS conditions only match displayed elements: if an element that matches your selector is
`display:none` or one of its parent elements is `display:none`, it doesn't cause the condition to
match. Elements styled with `visibility:hidden`, positioned off-screen, or hidden by other elements
can still make your condition match.

## Bookmarked State Matching

The [`PageStateMatcher.isBookmarked`][37] condition allows matching of the bookmarked state of the
current URL in the user's profile. To make use of this condition the "bookmarks" permission must be
declared in the [extension manifest][38]

[1]: /docs/extensions/pageAction
[2]: /docs/extensions/mv2/declare_permissions#host-permissions
[3]: /docs/extensions/mv2/content_scripts
[4]: /docs/extensions/activeTab
[5]: /docs/extensions/pageAction
[6]: /docs/extensions/events#declarative
[7]: #event-onPageChanged
[8]: /docs/extensions/events#type-Event
[9]: #type-ShowPageAction
[10]: #type-SetIcon
[11]: #type-PageStateMatcher
[12]: #type-PageStateMatcher
[13]: #type-PageStateMatcher
[14]: #property-PageStateMatcher-pageUrl
[15]: /docs/extensions/events#property-UrlFilter-hostEquals
[16]: /docs/extensions/events#property-UrlFilter-schemes
[17]: #property-PageStateMatcher-css
[18]: #type-ShowPageAction
[19]: #type-PageStateMatcher
[20]: #property-PageStateMatcher-pageUrl
[21]: /docs/extensions/events#property-UrlFilter-hostEquals
[22]: /docs/extensions/events#property-UrlFilter-schemes
[23]: #property-PageStateMatcher-css
[24]: #type-PageStateMatcher
[25]: #property-PageStateMatcher-css
[26]: #type-ShowPageAction
[27]: /docs/extensions/events#addingrules
[28]: /docs/extensions/runtime#event-onInstalled
[29]: #event-onPageChanged
[30]: /docs/extensions/events#removingrules
[31]: #event-onPageChanged
[32]: /docs/extensions/events#addingrules
[33]: /docs/extensions/activeTab
[34]: #property-PageStateMatcher-css
[35]: https://www.w3.org/TR/selectors4/#compound
[36]: https://www.w3.org/community/webed/wiki/CSS/Selectors#Combinators
[37]: #property-PageStateMatcher-isBookmarked
[38]: /docs/extensions/mv2/tabs
