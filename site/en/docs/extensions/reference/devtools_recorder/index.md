---
api: devtools.recorder
---

See [DevTools APIs summary][1] for general introduction to using Developer Tools APIs.

## Overview

`devtools.recorder` API is a preview feature that allows you to extend the [Recorder panel](/docs/devtools/recorder/) in Chrome DevTools.
Starting from Chrome M105, you can extend the export functionality. Starting from Chrome M112, you can extend the replay button.

## Customizing the export feature

To register an extension plugin, use the `registerRecorderExtensionPlugin` function. This function requires a plugin instance, a `name` and a `mediaType` as parameters. The plugin instance must implement two methods: `stringify` and `stringifyStep`.

The `name` provided by the extension shows up in the **Export** menu in the **Recorder** panel.

Depending on the export context, when the user clicks the export option provided by the extension,
the **Recorder** panel invokes one of the two functions:

- `stringify` that receives an [entire user flow recording][2]
- `stringifyStep`  that receives a [single recorded step][3]

The [`mediaType`][4] parameter allows the extension to specify the kind of output it generates with the
`stringify` and `stringifyStep` functions. For example, `application/javascript` if the result is a JavaScript
program.

## Export plugin example

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

## Customizing the replay button

Customization of the replay button also required the use of the `registerRecorderExtensionPlugin` function. The plugin instance must implement the `replay` method to customize the replay feature.
If the Recorder panel detects the `replay` method on the plugin instance, it will show a button to replay a recording using this plugin in the Recorder panel. Once clicked, the Recorder panel will forward
the current recording object as the first argument to the `replay` method.

At this point, the extension can show a RecorderView to handle the replay or use any other extension APIs to process the replay request. You can create a new view by invoking `chrome.devtools.recorder.createView`.

## Replay plugin example 

The following code implements an extension plugin that creates a dummy Recorder view and displays it upon a replay request:

```js
const view = await chrome.devtools.recorder.createView(
  /* name= */ 'ExtensionName',
  /* pagePath= */ 'Replay.html'
);

let latestRecording;

view.onShown.addListener(() => {
  // Recorder has shown the view. Send additional data to the view if needed.
  chrome.runtime.sendMessage(JSON.stringify(latestRecording));
});

view.onHidden.addListener(() => {
  // Recorder has hidden the view.
});

export class RecorderPlugin {
  replay(recording) {
    // Share the data with the view.
    latestRecording = recording;
    // Request to show the view.
    view.show();
  }
}

chrome.devtools.recorder.registerRecorderExtensionPlugin(
  new RecorderPlugin(),
  /* name=*/ 'CoffeeTest'
);
```

Find [a complete extension example][5] on GitHub.

[1]: /docs/extensions/mv3/devtools
[2]: https://github.com/puppeteer/replay/blob/main/src/Schema.ts#L245
[3]: https://github.com/puppeteer/replay/blob/main/src/Schema.ts#L243
[4]: https://www.iana.org/assignments/media-types/media-types.xhtml
[5]: https://github.com/puppeteer/replay/tree/main/examples/chrome-extension-replay