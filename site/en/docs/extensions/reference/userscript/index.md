---
api: userScripts
---

## Using now

This is an experimental feature that is not yet available in Chrome by default. You must take extra steps to enable it for experimentation.

To enable it from a command line, use the following flag with the appropriate [command for your operating system](https://www.chromium.org/developers/how-tos/run-chromium-with-flags/).

`--enable-features="ApiUserScripts"`

## More information and feedback

You can find more information about this [feature in the explainer](https://github.com/w3c/webextensions/blob/main/proposals/user-scripts-api.md). If you have any feedback or find something that doesn't work, let us know by filing a bug.

## Manifest

To use the `chrome.userScripts` API, you need to specify a `"manifest_version"` of `3` or higher. The manifest must include the `"userScripts"` permission and `"host_permissions"` for sites you want to run scripts on.

```json/9-15
{
  "name": "User script test extension",
  "version": "0.1",
  "manifest_version": 3,
  "description": "Tests a variety of user scripts API calls for registering an user script.",
  "background": {
    "service_worker": "service-worker.js"
  },
  "minimum_chrome_version": "118",
  "permissions": [
    "userScripts"
  ],
  "host_permissions": [
    "*://requested.com/*"
  ]
}
```

## Concepts and Usage

A user script is a bit of code injected into a web page to modify its appearance or behavior. Scripts are either created by users or downloaded from a script repository using a type of extension called a user script manager.

### Basic usage

The following example shows a basic call to `register()`. The first argument to register() as an array of objects defining the scripts to be registered. There are more options than are shown here. You can read about them below.
