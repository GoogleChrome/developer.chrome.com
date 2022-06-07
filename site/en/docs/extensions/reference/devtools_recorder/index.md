---
api: devtools.recorder
title: chrome.devtools.recorder
---

See [DevTools APIs summary][1] for general introduction to using Developer Tools APIs.

## Overview

`devtools.recorder` API is a preview feature that allows extending the Recorder panel in Chrome DevTools.
Currently, it's only possible to extend the export feature.

`devtools.recorder` allows registering an extension plugin using `registerRecorderExtensionPlugin`.
`registerRecorderExtensionPlugin` requires a plugin instance that implements `stringify` and
`stringifyStep` functions, a `name` parameter and a `mediaType` parameter.

The `name` provided by the extension shows up in the Export menu in the Recorder panel. When the user
clicks on the export option provided by the extension, the Recorder panel invokes either the
`stringify` function or the `stringifyStep` function depending on the context of the export. The `stringify`
function receives an [entire user flow recording][2] and the `stringifyStep` receives a [single recorded step][3].

The [`mediaType`][4] parameters allows the extension to specify what kind of output it generates with the
`stringify` and `stringifyStep` functions. For example, `application/javascript` if the result is a JavaScript
program.


## Examples

The following code implements an extension plugin that stringifes a recording using `JSON.stringify`:

```js
class MyPlugin {
  stringify(recording) {
    return Promise.resolve(JSON.stringify(recording));
  }
  stringifyStep(step) {
    return Promise.resolve(JSON.stringify(step));
  }
}

chrome.devtools.recorder.registerRecorderExtensionPlugin(
  new MyPlugin(),
  /*name=*/'MyPlugin',
  /*mediaType=*/'application/json'
);
```

[1]: /docs/extensions/mv3/devtools
[2]: https://github.com/puppeteer/replay/blob/main/src/Schema.ts#L245
[3]: https://github.com/puppeteer/replay/blob/main/src/Schema.ts#L243
[4]: https://www.iana.org/assignments/media-types/media-types.xhtml
