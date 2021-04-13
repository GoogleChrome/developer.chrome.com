---
api: ttsEngine
---

## Overview

An extension can register itself as a speech engine. By doing so, it can intercept some or all calls
to functions such as [`tts.speak`][1] and [`tts.stop`][2] and provide an alternate implementation.
Extensions are free to use any available web technology to provide speech, including streaming audio
from a server, HTML5 audio, Native Client, or Flash. An extension could even do something different
with the utterances, like display closed captions in a pop-up window or send them as log messages to
a remote server.

## Manifest

To implement a TTS engine, an extension must declare the "ttsEngine" permission and then declare all
voices it provides in the extension manifest, like this:

```json
{
  "name": "My TTS Engine",
  "version": "1.0",
  "permissions": ["ttsEngine"],
  "tts_engine": {
    "voices": [
      {
        "voice_name": "Alice",
        "lang": "en-US",
        "event_types": ["start", "marker", "end"]
      },
      {
        "voice_name": "Pat",
        "lang": "en-US",
        "event_types": ["end"]
      }
    ]
  },
  "background": {
    "page": "background.html",
    "persistent": false
  }
}
```

An extension can specify any number of voices.

The `voice_name` parameter is required. The name should be descriptive enough that it identifies the
name of the voice and the engine used. In the unlikely event that two extensions register voices
with the same name, a client can specify the ID of the extension that should do the synthesis.

The `lang` parameter is optional, but highly recommended. Almost always, a voice can synthesize
speech in just a single language. When an engine supports more than one language, it can easily
register a separate voice for each language. Under rare circumstances where a single voice can
handle more than one language, it's easiest to just list two separate voices and handle them using
the same logic internally. However, if you want to create a voice that will handle utterances in any
language, leave out the `lang` parameter from your extension's manifest.

Finally, the `event_types` parameter is required if the engine can send events to update the client
on the progress of speech synthesis. At a minimum, supporting the `'end'` event type to indicate
when speech is finished is highly recommended, otherwise Chrome cannot schedule queued utterances.

Once loaded, an extension can replace the list of declared voices by calling
`chrome.ttsEngine.updateVoices`. (Note that the parameters used in the programatic call to
`updateVoices` are in camel case: e.g., `voiceName`, unlike the manifest file which uses
`voice_name`.)

{% Aside %}

**Note:** If your TTS engine does not support the `'end'` event type, Chrome cannot queue utterances
because it has no way of knowing when your utterance has finished. To help mitigate this, Chrome
passes an additional boolean `enqueue` option to your engine's onSpeak handler, giving you the
option of implementing your own queueing. This is discouraged because then clients are unable to
queue utterances that should get spoken by different speech engines.

{% endAside %}

The possible event types that you can send correspond to the event types that the `speak()` method
receives:

- `'start'`: The engine has started speaking the utterance.
- `'word'`: A word boundary was reached. Use `event.charIndex` to determine the current speech
  position.
- `'sentence'`: A sentence boundary was reached. Use `event.charIndex` to determine the current
  speech position.
- `'marker'`: An SSML marker was reached. Use `event.charIndex` to determine the current speech
  position.
- `'end'`: The engine has finished speaking the utterance.
- `'error'`: An engine-specific error occurred and this utterance cannot be spoken. Pass more
  information in `event.errorMessage`.

The `'interrupted'` and `'cancelled'` events are not sent by the speech engine; they are generated
automatically by Chrome.

Text-to-speech clients can get the voice information from your extension's manifest by calling
[`tts.getVoices`][3], assuming you've registered speech event listeners as described below.

## Handling speech events

To generate speech at the request of clients, your extension must register listeners for both
`onSpeak` and `onStop`, like this:

```js
const speakListener = (utterance, options, sendTtsEvent) => {
  sendTtsEvent({type: 'start', charIndex: 0})

  // (start speaking)

  sendTtsEvent({type: 'end', charIndex: utterance.length})
};

const stopListener = () => {
  // (stop all speech)
};

chrome.ttsEngine.onSpeak.addListener(speakListener);
chrome.ttsEngine.onStop.addListener(stopListener);
```

{% Aside 'warning' %}

**Important:** If your extension does not register listeners for both `onSpeak` and `onStop`, it
will not intercept any speech calls, regardless of what is in the manifest.

{% endAside %}

The decision of whether or not to send a given speech request to an extension is based solely on
whether the extension supports the given voice parameters in its manifest and has registered
listeners for `onSpeak` and `onStop`. In other words, there's no way for an extension to receive a
speech request and dynamically decide whether to handle it.

[1]: /docs/extensions/reference/tts/#method-speak
[2]: /docs/extensions/reference/tts/#method-stop
[3]: /docs/extensions/reference/tts/#method-getVoices
