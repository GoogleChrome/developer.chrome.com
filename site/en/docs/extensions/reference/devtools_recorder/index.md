---
api: devtools.recorder
---

See [DevTools APIs summary][1] for general introduction to using Developer Tools APIs.

## Overview

`devtools.recorder` API is a preview feature that allows you to extend the [Recorder panel](/docs/devtools/recorder/) in Chrome DevTools.
Currently, you can extend only the export feature.

To register an extension plugin, use the `registerRecorderExtensionPlugin` function. This function requires a plugin instance, a `name` and a `mediaType` as parameters. The plugin instance must implement two methods: `stringify` and `stringifyStep`.

The `name` provided by the extension shows up in the **Export** menu in the **Recorder** panel.

Depending on the export context, when the user clicks the export option provided by the extension,
the **Recorder** panel invokes one of the two functions:

- `stringify` that receives an [entire user flow recording][2]
- `stringifyStep`  that receives a [single recorded step][3]

The [`mediaType`][4] parameter allows the extension to specify the kind of output it generates with the
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
