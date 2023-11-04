---
api: declarativeContent
---

{% Aside %}

To transition from page action to action, see [Emulating pageActions with
declarativeContent][emulating-page-actions]

{% endAside %}

## Usage

{% Aside 'key-term' %}

An [extension's _action_][api-action] controls the extension's toolbar icon.

{% endAside %}

The Declarative Content API allows you to enable your extension's action depending on the URL of a
web page, or if a CSS selector matches an element on the page, without needing to 
add [host permissions][docs-host-perm] or inject a [content script][docs-content-scripts]. 

Use the [activeTab][docs-activetab] permission to interact with a page after the user clicks on the
extension's action.

## Rules

Rules consists of conditions and actions. If any of the conditions is fulfilled, all actions are
executed. The actions are [`setIcon`][type-set-icon] and [`showAction`][type-show-action].

The [`PageStateMatcher`][type-page-state-matcher] matches web pages if and only if all listed
criteria are met. It can match a [page url][section-pageurl], a [css compound selector][section-css]
or the [bookmarked state][section-bookmarked] of a page. The following rule enables
the extension's action on Google pages when a password field is present:

```js
let rule1 = {
  conditions: [
    new chrome.declarativeContent.PageStateMatcher({
      pageUrl: { hostSuffix: '.google.com', schemes: ['https'] },
      css: ["input[type='password']"]
    })
  ],
  actions: [ new chrome.declarativeContent.ShowAction() ]
};

```

{% Aside 'success' %}

All conditions and actions are created via a constructor as shown in the example above.

{% endAside %}

To also enable the extension's action for Google sites with a video, you can add a second
condition, as each condition is sufficient to trigger all specified actions:

```js
let rule2 = {
  conditions: [
    new chrome.declarativeContent.PageStateMatcher({
      pageUrl: { hostSuffix: '.google.com', schemes: ['https'] },
      css: ["input[type='password']"]
    }),
    new chrome.declarativeContent.PageStateMatcher({
      css: ["video"]
    })
  ],
  actions: [ new chrome.declarativeContent.ShowAction() ]
};
```

The [`onPageChanged`][event-onpagechanged] event tests whether any rule has at least one fulfilled
condition and executes the actions. Rules persist across browsing sessions; therefore, during
extension installation time you should first use [`removeRules`][docs-removing-rules] to clear
previously installed rules and then use [`addRules`][docs-adding-rules] to register new ones.

```js
chrome.runtime.onInstalled.addListener(function(details) {
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([rule2]);
  });
});
```

{% Aside %}

You should always register or unregister rules in bulk because each of these operations recreates
internal data structures. This re-creation is computationally expensive but facilitates a faster
matching algorithm.

{% endAside %}

With the [activeTab][docs-activetab] permission, your extension will not display any permission
warnings and when the user clicks the extension action, it will only run on relevant pages.

## Page URL Matching {: #page-url}

The [`PageStateMatcher.pageurl`][type-matcher-url] matches when the URL criteria are fulfilled. The
most common criteria are a concatenation of either host, path, or url, followed by Contains, Equals, Prefix, or
Suffix. The following table contains a few examples:

| Criteria                                  | Matches                         |
|-------------------------------------------|---------------------------------|
| `{ hostSuffix: 'google.com' }`            | All Google URLs                 |
| `{ pathPrefix: '/docs/extensions'` }      | Extension docs URLs             |
| `{ urlContains: 'developer.chrome.com'` } | All chrome developers docs URLs |

All criteria are case sensitive. For a complete list of criteria, see [UrlFilter][type-urlfilter].

## CSS Matching {: #css}

[`PageStateMatcher.css`][type-matcher-css] conditions must be _[compound selectors][w3-compound]_,
meaning that you can't include [combinators][mdn-combinators] like whitespace or "`>`" in your
selectors. This helps Chrome match the selectors more efficiently.

<table>
  <tbody>
    <tr>
      <th>Compound Selectors (OK)</th>
      <th>Complex Selectors (Not OK)</th>
    </tr>
    <tr>
      <td><code>a</code></td>
      <td><code>div p</code></td>
    </tr>
    <tr>
      <td><code>iframe.special[src^='http']</code></td>
      <td><code>p&gt;span.highlight</code></td>
    </tr>
    <tr>
      <td><code>ns|*</code></td>
      <td><code>p + ol</code></td>
    </tr>
    <tr>
      <td><code>#abcd:checked</code></td>
      <td><code>p::first-line</code></td>
    </tr>
  </tbody>
</table>

CSS conditions only match displayed elements: if an element that matches your selector is
`display:none` or one of its parent elements is `display:none`, it doesn't cause the condition to
match. Elements styled with `visibility:hidden`, positioned off-screen, or hidden by other elements
can still make your condition match.

## Bookmarked State Matching {: #bookmarked}

The [`PageStateMatcher.isBookmarked`][type-matcher-bookmarked] condition allows matching of the
bookmarked state of the current URL in the user's profile. To make use of this condition the
"bookmarks" permission must be declared in the extension [manifest][docs-manifest].

[api-action]: /docs/extensions/reference/action/
[api-declarative]: /docs/extensions/reference/events/#declarative-event-handlers
[docs-activetab]: /docs/extensions/mv3/manifest/activeTab/
[docs-adding-rules]: /docs/extensions/reference/events#adding-rules
[docs-content-scripts]: /docs/extensions/mv3/content_scripts
[docs-host-perm]: /docs/extensions/mv3/declare_permissions#host-permissions
[docs-manifest]: /docs/extensions/mv3/manifest/
[docs-removing-rules]: /docs/extensions/reference/events#removing-rules
[emulating-page-actions]: /docs/extensions/reference/action/#emulating-pageactions-with-declarativecontent
[event-onpagechanged]: #event-onPageChanged
[mdn-combinators]: https://developer.mozilla.org/docs/Web/CSS/CSS_Selectors#combinators
[section-bookmarked]: #bookmarked
[section-css]: #css
[section-pageurl]: #page-url
[type-event]: /docs/extensions/reference/events/#type-Event
[type-matcher-bookmarked]: #property-PageStateMatcher-isBookmarked
[type-matcher-css]: #property-PageStateMatcher-css
[type-matcher-url]: #property-PageStateMatcher-pageUrl
[type-page-state-matcher]: #type-PageStateMatcher
[type-set-icon]: #type-SetIcon
[type-show-action]: #type-ShowAction
[type-urlfilter]: /docs/extensions/reference/events/#type-UrlFilter
[w3-compound]: https://www.w3.org/TR/selectors4/#compound
