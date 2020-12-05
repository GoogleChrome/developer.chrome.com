---
api: tts
---

## Overview

Chrome provides native support for speech on Windows (using SAPI 5), Mac OS X, and Chrome OS, using
speech synthesis capabilities provided by the operating system. On all platforms, the user can
install extensions that register themselves as alternative speech engines.

## Generating speech

Call `speak()` from your extension or Chrome App to speak. For example:

```js
chrome.tts.speak('Hello, world.');
```

To stop speaking immediately, just call `stop()`:

```js
chrome.tts.stop();
```

You can provide options that control various properties of the speech, such as its rate, pitch, and
more. For example:

```js
chrome.tts.speak('Hello, world.', {'rate': 2.0});
```

It's also a good idea to specify the language so that a synthesizer supporting that language (and
regional dialect, if applicable) is chosen.

```js
chrome.tts.speak('Hello, world.', {'lang': 'en-US', 'rate': 2.0});
```

By default, each call to `speak()` interrupts any ongoing speech and speaks immediately. To
determine if a call would be interrupting anything, you can call `isSpeaking()`. In addition, you
can use the `enqueue` option to cause this utterance to be added to a queue of utterances that will
be spoken when the current utterance has finished.

```js
chrome.tts.speak('Speak this first.');
chrome.tts.speak(
    'Speak this next, when the first sentence is done.', {'enqueue': true});
```

A complete description of all options can be found in the [`tts.speak`][1] below. Not all speech
engines will support all options.

To catch errors and make sure you're calling `speak()` correctly, pass a callback function that
takes no arguments. Inside the callback, check [`runtime.lastError`][2] to see if there were any
errors.

```js
chrome.tts.speak(
  utterance,
  options,
  function() {
    if (chrome.runtime.lastError) {
      console.log('Error: ' + chrome.runtime.lastError.message);
    }
  }
);
```

The callback returns right away, before the engine has started generating speech. The purpose of the
callback is to alert you to syntax errors in your use of the TTS API, not to catch all possible
errors that might occur in the process of synthesizing and outputting speech. To catch these errors
too, you need to use an event listener, described below.

## Listening to events

To get more real-time information about the status of synthesized speech, pass an event listener in
the options to `speak()`, like this:

```js
chrome.tts.speak(
  utterance,
  {
    onEvent: function(event) {
      console.log('Event ' + event.type + ' at position ' + event.charIndex);
      if (event.type == 'error') {
        console.log('Error: ' + event.errorMessage);
      }
    }
  },
  callback
);
```

Each event includes an event type, the character index of the current speech relative to the
utterance, and for error events, an optional error message. The event types are:

- `'start'`: The engine has started speaking the utterance.
- `'word'`: A word boundary was reached. Use `event.charIndex` to determine the current speech
  position.
- `'sentence'`: A sentence boundary was reached. Use `event.charIndex` to determine the current
  speech position.
- `'marker'`: An SSML marker was reached. Use `event.charIndex` to determine the current speech
  position.
- `'end'`: The engine has finished speaking the utterance.
- `'interrupted'`: This utterance was interrupted by another call to `speak()` or `stop()` and did
  not finish.
- `'cancelled'`: This utterance was queued, but then cancelled by another call to `speak()` or
  `stop()` and never began to speak at all.
- `'error'`: An engine-specific error occurred and this utterance cannot be spoken. Check
  `event.errorMessage` for details.

Four of the event types—`'end'`, `'interrupted'`, `'cancelled'`, and `'error'`—are _final_. After
one of those events is received, this utterance will no longer speak and no new events from this
utterance will be received.

Some voices may not support all event types, and some voices may not send any events at all. If you
do not want to use a voice unless it sends certain events, pass the events you require in the
`requiredEventTypes` member of the options object, or use `getVoices()` to choose a voice that meets
your requirements. Both are documented below.

## SSML markup

Utterances used in this API may include markup using the [Speech Synthesis Markup Language
(SSML)][3]. If you use SSML, the first argument to `speak()` should be a complete SSML document with
an XML header and a top-level `<speak>` tag, not a document fragment.

For example:

```js
chrome.tts.speak(
  '<?xml version="1.0"?>' +
  '<speak>' +
  '  The <emphasis>second</emphasis> ' +
  '  word of this sentence was emphasized.' +
  '</speak>'
);
```

Not all speech engines will support all SSML tags, and some may not support SSML at all, but all
engines are required to ignore any SSML they don't support and to still speak the underlying text.

## Choosing a voice

By default, Chrome chooses the most appropriate voice for each utterance you want to speak, based on
the language. On most Windows, Mac OS X, and Chrome OS systems, speech synthesis provided by the
operating system should be able to speak any text in at least one language. Some users may have a
variety of voices available, though, from their operating system and from speech engines implemented
by other Chrome extensions. In those cases, you can implement custom code to choose the appropriate
voice, or to present the user with a list of choices.

To get a list of all voices, call `getVoices()` and pass it a function that receives an array of
`TtsVoice` objects as its argument:

```js
chrome.tts.getVoices(
  function(voices) {
    for (var i = 0; i < voices.length; i++) {
      console.log('Voice ' + i + ':');
      console.log('  name: ' + voices[i].voiceName);
      console.log('  lang: ' + voices[i].lang);
      console.log('  extension id: ' + voices[i].extensionId);
      console.log('  event types: ' + voices[i].eventTypes);
    }
  }
);
```

[1]: #method-speak
[2]: /docs/extensions/runtime#property-lastError
[3]: https://www.w3.org/TR/speech-synthesis
