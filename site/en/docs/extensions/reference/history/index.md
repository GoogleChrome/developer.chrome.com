---
api: history
has_warning: This permission <a href="/docs/extensions/mv3/permission_warnings/#permissions_with_warnings">triggers a warning</a>.
---

To interact with the user's browser history, use the history API.

## Manifest

To use the history API, declare the `"history"` permission in the [extension manifest][1]. For
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

## Concepts and Usage

### Transition types

The history API uses transition types to describe how the browser navigated to a particular URL
on a particular visit. For example, if a user visits a page by clicking a link on another page, the
transition type is "link".

The following are all available transition types:

`"link"`
: The user got to this page by clicking a link on another page.

`"typed"`
: The user got this page by typing the URL in the address bar. This is also used for other explicit navigation actions. 

`"auto_bookmark"`
: The user got to this page through a suggestion in the UI, for example, through a menu item.

`"auto_subframe"`
: The user got to this page through subframe navigation that they didn't request, such as through an ad loading in a frame on the previous page. These don't always generate new navigation entries in the back and forward menus. <!--This is my understanding of auto vs manual subframes. What am I missing?-->

`"manual_subframe"`
: The user got to this page by selecting something in a subframe.

`"generated"`
: The user got to this page by typing in the address bar and selecting an entry that didn't look like a URL, such as a Google search suggestion. For example, a match might have the URL of a Google search result page, but it might appear to the user as "Search Google for ...". These are different from typed navigations because the user didn't type or see the destination URL. They're also related to keyword navigations.

`"auto_toplevel"`
: The page was specified in the command line or is the start page.

`"form_submit"`
: The user got to this page by filling out values in a form and submitting the form. Not all form submissions use this transition type. <!--For example, forms that use scripts to submit their contents use what type?-->

`"reload"`
: The user reloaded the page, either by clicking the reload button or by pressing Enter in the address bar. Session restore and Reopen closed tab also use this transition type.

`"keyword"`
: The URL for this page was generated from a replaceable keyword other than the default search provider.

`"keyword_generated"`
: Corresponds to a visit generated for a keyword. <!--How are keyword, keyword_generated, and generated different?-->

## Examples

To try this API, install the [history API example](https://github.com/GoogleChrome/chrome-extensions-samples/tree/main/api-samples/history) from the [chrome-extension-samples](https://github.com/GoogleChrome/chrome-extensions-samples/tree/main/api-samples)
repository.

[1]: /docs/extensions/mv3/manifest
