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

To customize the replay button in the **Recorder**, use the `registerRecorderExtensionPlugin` function. The plugin must implement the `replay` method for the customization to take effect. 
If the method is detected, a replay button will appear in the **Recorder**. 
Upon clicking the button, the current recording object will be passed as the first argument to the `replay` method.

At this point, the extension can display a `RecorderView` for handling the replay or use other extension APIs to process the replay request. To create a new `RecorderView`, invoke `chrome.devtools.recorder.createView`.

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
