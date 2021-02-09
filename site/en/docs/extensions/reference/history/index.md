---
api: history
---

## Manifest

You must declare the "history" permission in the [extension manifest][1] to use the history API. For
example:

```json
{
  "name": "My extension",
  ...
  "permissions": [
    "history"
  ],
  ...
}
```

## Transition types

The history API uses a _transition type_ to describe how the browser navigated to a particular URL
on a particular visit. For example, if a user visits a page by clicking a link on another page, the
transition type is "link".

The following table describes each transition type.

<table><tbody><tr><th>Transition type</th><th>Description</th></tr><tr id="tt_link"><td>"link"</td><td>The user got to this page by clicking a link on another page.</td></tr><tr id="tt_typed"><td>"typed"</td><td>The user got this page by typing the URL in the address bar. Also used for other explicit navigation actions. See also <a href="#tt_generated">generated</a>, which is used for cases where the user selected a choice that didn't look at all like a URL.</td></tr><tr id="tt_auto_bookmark"><td>"auto_bookmark"</td><td>The user got to this page through a suggestion in the UI—for example, through a menu item.</td></tr><tr id="tt_auto_subframe"><td>"auto_subframe"</td><td>Subframe navigation. This is any content that is automatically loaded in a non-top-level frame. For example, if a page consists of several frames containing ads, those ad URLs have this transition type. The user may not even realize the content in these pages is a separate frame, and so may not care about the URL (see also <a href="#tt_manual_subframe">manual_subframe</a>).</td></tr><tr id="tt_manual_subframe"><td>"manual_subframe"</td><td>For subframe navigations that are explicitly requested by the user and generate new navigation entries in the back/forward list. An explicitly requested frame is probably more important than an automatically loaded frame because the user probably cares about the fact that the requested frame was loaded.</td></tr><tr id="tt_generated"><td>"generated"</td><td>The user got to this page by typing in the address bar and selecting an entry that did not look like a URL. For example, a match might have the URL of a Google search result page, but it might appear to the user as "Search Google for ...". These are not quite the same as <a href="#tt_typed">typed</a> navigations because the user didn't type or see the destination URL. See also <a href="#tt_keyword">keyword</a>.</td></tr><tr id="tt_auto_toplevel"><td>"auto_toplevel"</td><td>The page was specified in the command line or is the start page.</td></tr><tr id="tt_form_submit"><td>"form_submit"</td><td>The user filled out values in a form and submitted it. Note that in some situations—such as when a form uses script to submit contents—submitting a form does not result in this transition type.</td></tr><tr id="tt_reload"><td>"reload"</td><td>The user reloaded the page, either by clicking the reload button or by pressing Enter in the address bar. Session restore and Reopen closed tab use this transition type, too.</td></tr><tr id="tt_keyword"><td>"keyword"</td><td>The URL was generated from a replaceable keyword other than the default search provider. See also <a href="#tt_keyword_generated">keyword_generated</a>.</td></tr><tr id="tt_keyword_generated"><td>"keyword_generated"</td><td>Corresponds to a visit generated for a keyword. See also <a href="#tt_keyword">keyword</a>.</td></tr></tbody></table>

## Examples

For examples of using this API, see the [history sample directory][8] and the [history API test
directory][9]. For other examples and for help in viewing the source code, see [Samples][10].

[1]: /docs/extensions/mv2/tabs
[2]: #tt_generated
[3]: #tt_manual_subframe
[4]: #tt_typed
[5]: #tt_keyword
[6]: #tt_keyword_generated
[7]: #tt_keyword
[8]: https://github.com/GoogleChrome/chrome-extensions-samples/tree/master/mv2-archive/api/history/
[9]: https://chromium.googlesource.com/chromium/src/+/master/chrome/test/data/extensions/api_test/history/
[10]: /docs/extensions/mv2/samples
