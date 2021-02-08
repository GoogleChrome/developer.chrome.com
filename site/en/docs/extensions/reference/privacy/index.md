---
api: privacy
---

{% Aside %}

The [Chrome Privacy Whitepaper][1] gives background detail regarding the features which this API can
control.

{% endAside %}

## Manifest

You must declare the "privacy" permission in your extension's [manifest][2] to use the API. For
example:

```json
{
  "name": "My extension",
  ...
  "permissions": [
    "privacy"
  ],
  ...
}
```

## Usage

Reading the current value of a Chrome setting is straightforward. You'll first need to find the
property you're interested in, then you'll call `get()` on that object in order to retrieve its
current value and your extension's level of control. For example, to determine if Chrome's Autofill
feature is enabled, you'd write:

```js
chrome.privacy.services.autofillEnabled.get({}, function(details) {
  if (details.value) {
    console.log('Autofill is on!');
  } else {
    console.log('Autofill is off!');
  }
});
```

Changing the value of a setting is a little bit more complex, simply because you first must verify
that your extension can control the setting. The user won't see any change to their settings if your
extension toggles a setting that is either locked to a specific value by enterprise policies
(`levelOfControl` will be set to "not_controllable"), or if another extension is controlling the
value (`levelOfControl` will be set to "controlled_by_other_extensions"). The `set()` call will
succeed, but the setting will be immediately overridden. As this might be confusing, it is advisable
to warn the user when the settings they've chosen aren't practically applied.

{% Aside %}

Full details about extensions' ability to control `ChromeSetting`s can be found under
[`chrome.types.ChromeSetting`][3].

{% endAside %}

This means that you ought to use the `get()` method to determine your level of access, and then only
call `set()` if your extension can grab control over the setting (in fact if your extension can't
control the setting it's probably a good idea to visually disable the functionality to reduce user
confusion):

```js
chrome.privacy.services.autofillEnabled.get({}, function(details) {
  if (details.levelOfControl === 'controllable_by_this_extension') {
    chrome.privacy.services.autofillEnabled.set({ value: true }, function() {
      if (chrome.runtime.lastError === undefined) {
        console.log("Hooray, it worked!");
      } else {
        console.log("Sadness!", chrome.runtime.lastError);
      }
    });
  }
});
```

If you're interested in changes to a setting's value, add a listener to its `onChange` event. Among
other uses, this will allow you to warn the user if a more recently installed extension grabs
control of a setting, or if enterprise policy overrides your control. To listen for changes to
Autofill's status, for example, the following code would suffice:

```js
chrome.privacy.services.autofillEnabled.onChange.addListener(
  function (details) {
    // The new value is stored in `details.value`, the new level of control
    // in `details.levelOfControl`, and `details.incognitoSpecific` will be
    // `true` if the value is specific to Incognito mode.
  }
);
```

## Examples

For example code, see the [Privacy API samples][4].

[1]: https://www.google.com/intl/en/landing/chrome/google-chrome-privacy-whitepaper.pdf
[2]: /docs/extensions/mv2/tabs
[3]: /docs/extensions/types#ChromeSetting
[4]: /docs/extensions/mv2/samples#search:privacy
