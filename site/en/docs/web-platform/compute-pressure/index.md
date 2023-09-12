---
layout: 'layouts/doc-post.njk'
title: Compute Pressure API
description: >
  Compute Pressure offers high-level states that represent the pressure on the system. It allows
  the implementation to use the right underlying hardware metrics to ensure that users can take
  advantage of all the processing power available to them as long as the system is not under
  unmanageable stress.

subhead: >
  Get informed about your system compute pressure.
date: 2021-06-07
updated: 2023-05-17
authors:
  - jeffposnick
  - kenchris
  - arskama
tags:
  - api
  - performance
  - monitoring
  - capabilities
---

  The Compute Pressure API offers high-level states that represent the pressure on the system.
  It allows the implementation to use the right underlying hardware metrics to ensure that users
  can take advantage of all the processing power available to them as long as the system is not
  under unmanageable stress.

## Current status

<div class="table-wrapper scrollbar">

| Step                                     | Status                              |
| ---------------------------------------- | ----------------------------------  |
| 1. Create explainer                      | [Complete][explainer]               |
| 2. Create initial draft of specification | [Complete][specs]                   |
| 3. Gather feedback & iterate on design   | [In progress](#feedback)            |
| 4. Origin trial                          | [**Started**][ot]                   |
| 5. Launch                                | Not started                         |

</div>

### Try out the Compute Pressure API

To experiment with the Compute Pressure API locally, read this [page][how-to].

### Register for the origin trial

Starting in Chrome 115, the Compute Pressure API is available as an [origin trial](/docs/web-platform/origin-trials/).
It is expected to end in Chrome 118 (January&nbsp;5, 2024). [Register here][ot].

## Use-Cases

The primary use cases enhanced by the current Compute Pressure API are video conferencing and
video games.

These popular real-time applications are classified as _soft_. That is, the quality of service
degrades if the system is exercised beyond certain states, but does not lead to a total system
failure. These soft real-time applications greatly benefit from being able to adapt their workloads
based on CPU consumption/pressure.

Specifically, the first version of this API aims to enable the following adaptation decisions.

### Video conferencing
  - Adjust the number of video feeds shown simultaneously during calls with many participants.
  - Reduce the quality of video processing (video resolution, frames per second).
  - Skip non-essential video processing, such as some camera filters.
  - Disable non-essential audio processing, such as WebRTC noise suppression.
  - Turn quality-versus-speed and size-versus-speed knobs towards “speed” in video and audio
    encoding (in WebRTC, WebCodecs, or software encoding).

### Video games
  - Use lower-quality assets to compose the game’s video (3D models, textures, shaders) and audio
    (voices, sound effects).
  - Disable effects that result in less realistic non-essential details (water, cloth, fire
    animations, skin luminance, glare effects or physical simulations that don’t impact gameplay).
  - Tweak quality-versus-speed knobs in the game’s rendering engine (shadows quality, texture
    filtering, view distance).

Technically these can be accomplished by knowing thermal (for example, is the system being
passively cooled) and CPU pressure states for the main thread and workers the site is using.
System thermal state is a global state and can be affected by apps and sites other than the
observing site.

## Interfaces

The Compute Pressure API can be run in the following contexts:
- Window or main thread
- Dedicated Worker
- Shared Worker

The Compute Pressure API defines two new interfaces.

`PressureObserver`: An object to observe the compute pressure of any number of sources at a
predefined sample rate. First iteration in Chromium exposes `"cpu"` as `source`. See section about
[parameters](#parameters)  for more details. Each observer can asynchronously observe pressure
changes trends in a system.

`PressureRecord`: Describes the pressure trend at a specific moment of transition. Objects of this
type can only be obtained in two ways: as an input to your PressureObserver callback, or by calling
the `takeRecords()` method on the `PressureObserver` instance.

### PressureObserver

When an `PressureObserver` object is created, it's configured to watch the pressure of supported
sources, at a given sample rate. The supported sources can be individually observed or unobserved
at any time during the lifetime of the `PressureObserver` object. The sample rate cannot be changed
after the creation of the object.

#### Constructor

`PressureObserver(callback, options)`: Creates a new `PressureObserver` object which will invoke a
specified callback function when it detects that a change in the values of the source being
observed has happened.

The constructor takes a mandatory [callback](#callback) function and optional [options](#options), as parameters.

##### Callback {: #callback }

`callback()`: The callback is called with an array of unread `PressureRecord` objects.

##### Options {: #options }

`PressureObserverOptions`: Contains the sample rate,`sampleRate` in Hz, at which the user requests
updates.

#### Methods

`PressureObserver.observe(source)`: Tells the 'PressureObserver' which source to observe.


`PressureObserver.unobserve(source)`: Tells the 'PressureObserver' to stop observing a source.


`PressureObserver.disconnect()`: Tells the 'PressureObserver' to stop observing all sources.


`PressureObserver.takeRecords()`: Returns a sequence of [records](#records), since the last callback invocation.


`static PressureObserver.supportedSources()` (read only): Returns supported source types by the hardware.

##### Parameters {: #parameters }

`source`: The source to be observed, for example `"cpu"`. This must be one of the [supported source
types](https://w3c.github.io/compute-pressure/#dfn-supported-source-types).

In the current version of Compute Pressure, only `"cpu"` is supported.

### PressureRecord {: #records }

The `PressureRecord` interface of the Compute Pressure API describes the pressure trend of a
source at a specific moment of transition.

#### Instance Properties

`PressureRecord.source` (Read-only): Returns a string representing the origin source from which the
record is coming.

`PressureRecord.state` (Read-only): Returns a string representing the pressure state recorded.

`PressureRecord.time` (Read-only): Returns a number representing a high resolution timestamp.

##Feedback {: #feedback }

The Compute Pressure team wants to hear about your experiences using the Compute Pressure API.
 Please provide your feedback and file issues on [GitHub][issues].

## Examples

### Is the Compute Pressure API supported?

```js
if ('PressureObserver' in globalThis) {
  // The Compute Pressure API is supported.
}
```
### Creating a pressure observer

Create the pressure observer by calling its constructor with a callback function to be run whenever
there is a pressure update:

```js
const observer = new PressureObserver(
  (records) => { /* ... */ },
  { sampleRate: 0.5 }
);
```

A sample rate, `sampleRate`, of 0.5 Hz, means that there will be updates at most every two seconds.

If the sample rate requested cannot be served by the system. The system will provide samples at 
the best suitable rate that exists. For example if the rate of 2 Hz is requested, but the system
can only provide samples at maximum 1 Hz, 1 Hz will be selected.

### Using a pressure observer

There is only one way to start a pressure observer. For each source call
`observer.observe(source)`.

```js
observer.observe("cpu");
```

In this example the `"cpu"` is the pressure source we are interested in. For now, it is the only
source available. In the future, there may be other sources such as `"gpu"`, `"power"` or `"thermals"`.

To stop observing a source, use the `unobserve()` method, as in the following example:

```js
observer.unobserve("cpu");
```

In order to unobserve all sources at once, use the `disconnect()` method, as in the following example:

```js
observer.disconnect();
```
### Retrieving pressure records

Pressure records can be retrieved with a callback function, which will be invoked every time a
change is happening in the pressure state.

```js
function callback(records) {
  const lastRecord = records[records.length - 1];
  console.log(`Current pressure ${lastRecord.state}`);
  if (lastRecord.state === "critical") {
    // Reduce workers load by 4.
  } else if (lastRecord.state === "serious") {
    // Reduce workers load by 2.
  } else {
    // Do not reduce.
  }
}

const observer = new PressureObserver(callback, { sampleRate: 1 });
await observer.observe("cpu");
```
The user can also force the reading of `PressureRecord` by calling the `takeRecords()` method.

The `takeRecords()` method of the `PressureObserver` interface returns an array of
`PressureRecords` objects stored in the pressure observer, emptying it out.

The most common use case for this is to immediately fetch all pending pressure records, not yet
processed by the observer's callback function, prior to disconnecting the observer, so that any
pending records can be processed when shutting down the observer.

Calling this method clears the pending records list, so the callback will not be run.

```js
const observer = new PressureObserver(
  (records) => { /* Do something with records. */ },
  { sampleRate: 1 }
);

await observer.observe("cpu");

setTimeout(() => {
  // Forced records reading.
  const records = observer.takeRecords();
  observer.disconnect();
  // Do something with last records if any.
}, 2000);

```

### Tell us about the API design
Is there anything about the API that does not work as you expected? Do you see any missing method
or property for your usage of the API? File a spec issue or comment on an existing one in the
corresponding [GitHub repo][issues].

### Report a problem with the implementation
Did you find a bug with Chromium's implementation? Or is the implementation different from the
spec?
File a bug at [new.crbug.com](https://new.crbug.com). Be sure to include as much detail as you can, simple instructions
for reproducing, and enter [Blink>PerformanceAPIs>ComputePressure][blink-component] in the **Components** box.

## Helpful links {: #helpful }
- [Specifications][specs]
- [Public explainer][explainer]
- [Compute Pressure API Demo][demo] | [Compute Pressure API Demo source][demo-source]
- [Chromium tracking bug][cr-bug]
- [ChromeStatus.com entry][cr-status]
- Blink Component: [`Blink>PerformanceAPIs>ComputePressure`][blink-component]
- [TAG Review](https://github.com/w3ctag/design-reviews/issues/795)
- [Ready For Trial][dev-trial]
- [HOWTO page][how-to]
- [Intent to Experiment][intent]

[specs]: https://w3c.github.io/compute-pressure/
[issues]: https://github.com/w3c/compute-pressure/issues
[demo]:  https://w3c.github.io/compute-pressure/demo/
[demo-source]: https://github.com/w3c/compute-pressure/tree/main/demo
[explainer]: https://github.com/w3c/compute-pressure#readme
[cr-bug]: https://bugs.chromium.org/p/chromium/issues/detail?id=1067627
[cr-status]: https://chromestatus.com/feature/5597608644968448
[blink-component]: https://bugs.chromium.org/p/chromium/issues/list?q=component:Blink%3EPerformanceAPIs%3EComputePressure
[dev-trial]: https://groups.google.com/a/chromium.org/g/blink-dev/c/-1ciwdn23J4/m/CuCT52x3DgAJ
[intent]: https://groups.google.com/a/chromium.org/g/blink-dev/c/QfJ4pngu3gc
[how-to]: https://github.com/w3c/compute-pressure/blob/main/HOWTO.md
[ot]: https://developer.chrome.com/origintrials/#/view_trial/1196831600973709313
