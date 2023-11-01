---
# Required
layout: 'layouts/blog-post.njk'
title: Long Animation Frames API
description: |
  Learn about the Long Animation Frames API (LoAF) proposal which is the next iteration of the Long Tasks API and allows measuring frame update delays with attribution
authors:
  - tunetheweb
  - nrosenthal
date: 2023-08-22
#updated: 2023-08-22
hero: image/W3z1f5ZkBJSgL1V1IfloTIctbIF3/bQjxz9V8QoQMnP2tpczn.jpg
alt: A clock on the frame of St Pancras station
tags:
  - performance
  - origin-trials
  - chrome-116
---

The [Long Animation Frames API](https://github.com/w3c/longtasks/blob/main/loaf-explainer.md) (LoAF - pronounced Lo-Af) is a new proposal from the Chrome team to update the [Long Tasks API](https://w3c.github.io/longtasks/) to provide a better understanding of slow user interface (UI) updates. This can be useful to identify slow animation frames which are likely to affect the pending [Interaction to Next Paint (INP)](https://web.dev/articles/inp) Core Web Vital metric which measures responsiveness, or to identify other UI jank which affects [smoothness](https://web.dev/articles/smoothness).

The LoAF API is available as [an origin trial from Chrome 116](/origintrials/#/view_trial/3935020174414970881) for developers to experiment with and provide feedback on.

## The Long Tasks API

The Long Animation Frames API is an alternative to the Long Tasks API which has been available in Chrome for some time now (since Chrome 58). As its name suggests, the Long Task API allows you to monitor for long tasks, which are tasks that occupy the main thread for 50 milliseconds or longer. Long tasks can be monitored using the [`PerformanceLongTaskTiming`](https://developer.mozilla.org/docs/Web/API/PerformanceLongTaskTiming) interface, with a [`PeformanceObserver`](https://developer.mozilla.org/docs/Web/API/PerformanceObserver):

```js
const observer = new PerformanceObserver((list) => {
  console.log(list.getEntries());
});

observer.observe({ type: 'longtask', buffered: true });
```

Long tasks are likely to cause responsiveness issues. If a user tries to interact with a page—for example, click a button, or open a menu—but the main thread is already dealing with a long task, then the [user's interaction is delayed](https://web.dev/articles/optimize-input-delay#what_is_input_delay) waiting for that task to be completed.

To improve responsiveness, it is often advised to [break up long tasks](https://web.dev/articles/optimize-long-tasks). If each long task is instead broken up into a series of multiple, smaller tasks, it may allow more important tasks to be executed in between them to avoid significant delays in responding to interactions.

So when trying to improve responsiveness, the first effort is often to run a performance trace and look at long tasks. This could be through a lab-based auditing tool like Lighthouse (which has an **Avoid long main-thread tasks** audit), or by [looking at long tasks in Chrome DevTools](https://web.dev/articles/long-tasks-devtools).

Lab-based testing is [often a poor starting place for identifying responsiveness issues](https://web.dev/articles/diagnose-slow-interactions-in-the-lab), as these tools may not include interactions—when they do, they are a small subset of likely interactions. Ideally, you would measure causes of slow interactions in the field.

### Shortcomings of the Long Tasks API

Measuring long tasks in the field using the Performance Observer above is only somewhat useful. In reality, it doesn't give that much information beyond the fact that a long task happened, and how long it took.

Real User Monitoring (RUM) tools often use this to trend the number or duration of long tasks or identifying which pages they happen on—but without the underlying details of what caused the long task, this is only of limited use. The Long Tasks API only has a [basic attribution model](https://developer.mozilla.org/docs/Web/API/TaskAttributionTiming), which at best only tells you the container the long task happened in (the top-level document or an `<iframe>`), but not the script or function which called it, as shown by a typical entry below:

```json
{
  "name": "unknown",
  "entryType": "longtask",
  "startTime": 31.799999997019768,
  "duration": 136,
  "attribution": [
    {
      "name": "unknown",
      "entryType": "taskattribution",
      "startTime": 0,
      "duration": 0,
      "containerType": "window",
      "containerSrc": "",
      "containerId": "",
      "containerName": ""
    }
  ]
}
```

The Long Tasks API is also an incomplete view, since it may also exclude some important tasks. Some updates—like rendering—happen in separate tasks that ideally should be included together with the preceding execution that caused that update to accurately measure the "total work" for that interaction. For more details of the limitations of relying on tasks, see [the "Where long tasks fall short" section of the API's explainer](https://github.com/w3c/longtasks/blob/main/loaf-explainer.md#where-long-tasks-fall-short).

The final issue is that measuring long tasks only reports on individual tasks that take longer than the 50 millisecond limit. An animation frame could be made up of several tasks below this 50 millisecond limit, yet collectively still block the browser's ability to render.

## The Long Animation Frames API

The [Long Animation Frames API](https://github.com/w3c/longtasks/blob/main/loaf-explainer.md) (LoAF) is a new API that seeks to address some of the shortcomings of the Long Tasks API to enable developers to get more actionable insights to help address responsiveness problems and improve INP.

Good responsiveness means that a page responds quickly to interactions made with it. That involves being able to paint any updates needed by the user in a timely manner, and avoiding blocking these updates from happening. For INP, [it is recommended to respond in 200 milliseconds or less](https://web.dev/articles/inp#what_is_a_good_inp_score), but for other updates (for example, animations) even that may be too long.

The Long Animation Frames API is an alternative approach to measuring blocking work. Rather than measuring the individual _tasks_, the Long Animation Frames API—as its name suggests—measures _long animation frames_. A long animation frame is when a rendering update is delayed beyond 50 milliseconds (the same as the Long Tasks API's threshold).

Long animation frames can be observed in a similar way as long tasks with a `PerformanceObserver`, but looking at `long-animation-frame` type instead:

```js
const observer = new PerformanceObserver((list) => {
  console.log(list.getEntries());
});

observer.observe({ type: 'long-animation-frame', buffered: true });
```

Previous long animation frames can also be queried from the [Performance Timeline](https://www.w3.org/TR/performance-timeline/#performance-timeline) like so:

```js
const loafs = performance.getEntriesByType('long-animation-frame');
```

However, there is [a `maxBufferSize` for performance entries](https://w3c.github.io/timing-entrytypes-registry/#registry) after which older entries are dropped. The `long-animation-frame` buffer size is currently set to 200, the same as for `long-tasks`.

### Advantages of looking at frames instead of tasks

The key advantage of looking at this from a frame perspective rather than a tasks perspective, is that a long animation can be made up of any number of tasks that cumulatively resulted in a long animation frame. This addresses the final point above, where the sum of many smaller, render-blocking tasks before an animation frame may not be surfaced by the  Long Tasks API.

A further advantage of this alternative view on long tasks, is the ability to provide timing breakdowns of the entire frame. Rather than just including a `startTime` and a `duration`, like the Long Tasks API, LoAF includes a much more detailed breakdown of the various parts of the frame duration including:

- `startTime`: the start time of the long animation frame relative to the navigation start time.
- `duration`: the duration of the long animation frame.
- `renderStart`: the start time of the rendering cycle, which includes `requestAnimationFrame` callbacks, style and layout calculation, resize observer and intersection observer callbacks.
- `styleAndLayoutStart`: the beginning of the time period spent in style and layout calculations.
- `desiredRenderStart`: the time the animation frame was queued.
- `presentationTime`:  the implementation-specific time when the frame was actually presented. (Note: this is not implemented yet.)
- `firstUIEventTimestamp`: the time of the first UI event (mouse/keyboard and so on) to be handled during the course of this frame.
- `blockingDuration`: the duration in milliseconds for which the animation frame was being blocked.

These timestamps allow the long animation frame to be divided into timings:

<table>
  <thead>
    <tr>
      <th>Timing</th>
      <th>Calculation</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Start Time</td>
      <td><code>startTime</code></td>
    </tr>
    <tr>
      <td>End Time</td>
      <td><code>startTime + duration</code></td>
    </tr>
    <tr>
      <td>Delay</td>
      <td><code>desiredRenderStart ? Math.max(0,startTime - desiredRenderStart) : 0;</code></td>
    </tr>
    <tr>
      <td>Deferred duration</td>
      <td><code>Math.max(0, desiredRenderStart - startTime)</code></td>
    </tr>
    <tr>
      <td>Render duration</td>
      <td><code>styleAndLayoutStart - renderStart</code></td>
    </tr>
    <tr>
      <td>Work duration</td>
      <td><code>renderStart ? renderStart - startTime : duration;</code></td>
    </tr>
    <tr>
      <td>Style and Layout duration</td>
      <td><code>styleAndLayoutStart ? (startTime + duration) - styleAndLayoutStart : 0;</code></td>
    </tr>
  </tbody>
</table>

For more details on these individual timings, [refer to the explainer](https://github.com/w3c/longtasks/blob/main/loaf-explainer.md#how-a-loaf-entry-might-look-like), which provides fine-grained detail as to which activity is contributing to a long animation frame.

### Better attribution

The `long-animation-frame` entry type includes better attribution data of each script that contributed to a long animation frame. Similar to the Long Tasks API, this will be provided in an array of attribution entries, each of which details:

- A meaningful `name`, indicating how the script was called (for example, `'IMG#id.onload'`, `'Window.requestAnimationFrame'`, or `'Response.json.then'`).
- The `type` for of the script entry point:
    -  `user-callback`: A known callback registered from a web platform API (for example, `setTimeout`, `requestAnimationFrame`).
    -  `event-listener`: A listener to a platform event (for example, `click`, `load, keyup`).
    -  `resolve-promise`: Handler of a platform promise (for example, `fetch()`. Note that in the case of promises,all the handlers of the same promises are mixed together as one "script")`.`
    -  `reject-promise`: as per above, but for the reject.
    -  `classic-script`: Script evaluation (for example, `<script> or import()`)
    -  `module-script`: same as above, but for module scripts.
- Separate timing data for that script:
    -  `startTime`:  time the entry function was invoked.
    -  `executionStart`: the time after compilation.
    -  `duration`: the duration between `startTime` and when the subsequent microtask queue has finished processing.
    -  `forcedStyleAndLayoutDuration`: the total time spent processing forced layout/style inside this function (see [thrashing](https://web.dev/articles/avoid-large-complex-layouts-and-layout-thrashing#avoid_layout_thrashing)).
    -  `desiredExecutionStart`: the time when the callback was queued.
- `sourceLocation`:  the script resource name and character position.
- `windowAttribution`:  the container (the top-level document, or an `<iframe>`) the long animation frame occurred in.
- `window`:  a reference to the same-origin window.

This allows developers to know exactly how each script in the long animation frame was called, down to the character position in the calling script giving the exact location in a JavaScript resource that resulted in the long animation frame.

{% Aside 'important' %}
  Note the script this will be the script _entry point_, rather than necessarily the precise location in the script that took up the most time. For example, if an event handler calls a library, which calls a function which is slow, the event handler will be reported in the LoAF entry, not the library nor the function.
{% endAside %}

### Example of a `long-animation-frame` performance entry

A complete `long-animation-frame` performance entry example, containing a single script, is shown below:

```json
{
  "name": "long-animation-frame",
  "entryType": "long-animation-frame",
  "startTime": 11802.400000000373,
  "duration": 60,
  "navigationId": "b429c2e4-7e65-4f68-8a96-72772911d28a",
  "renderStart": 11858.800000000745,
  "styleAndLayoutStart": 11858.800000000745,
  "desiredRenderStart": 11846.699999999255,
  "firstUIEventTimestamp": 11801.099999999627,
  "blockingDuration": 0,
  "scripts": [
    {
      "name": "DOMWindow.onclick",
      "entryType": "script",
      "startTime": 11803.199999999255,
      "duration": 45,
      "navigationId": "b429c2e4-7e65-4f68-8a96-72772911d28a",
      "type": "event-listener",
      "windowAttribution": "self",
      "executionStart": 11803.199999999255,
      "desiredExecutionStart": 11801.099999999627,
      "forcedStyleAndLayoutDuration": 0,
      "pauseDuration": 0,
      "sourceLocation": "https://web.dev/js/index-ffde4443.js:17796"
    }
  ]
}
```

As can be seen, this gives an unprecedented amount of data for websites to be able to understand the cause of laggy rendering updates.

## Enabling the Long Animation Frames API

The Long Animation Frames API is available in Chrome behind the Experimental Web Platform Features flag and can be enabled at: `chrome://flags/#enable-experimental-web-platform-features`.

This feature is also [entering an origin trial from Chrome 116](/origintrials/#/view_trial/3935020174414970881), which allows developers to enable the feature for visitors to their sites to collect data from real users. See [Get started with origin trials](/en/docs/web-platform/origin-trials/) for more information on origin trials.

## Using the Long Animation Frames API in the field

Tools like Lighthouse—while useful for discovering and reproducing issues—are lab tools that may miss important aspects of the user experience that only field data can provide. The Long Animation Frames API can be used in the field to gather important contextual data for user interactions that the Long Tasks API could not. This can help you to surface and reproduce issues with interactivity that you might not have otherwise discovered.

Some suggested strategies are listed next, but the Chrome team is keen to hear feedback on this API and how developers and RUM providers would see themselves using the information the API provides.

### Feature detecting Long Animation Frames API support

You can use the following code to test if the API is supported:

```js
if (PerformanceObserver.supportedEntryTypes.includes('long-animation-frame')) {
  // Monitor LoAFs
}
```

### Reporting long animation data back to an analytics endpoint

As shown, the LoAF performance entry includes valuable information. One strategy would be to monitor all LoAFs and beacon the ones above a certain threshold back to an analytics endpoint for later analysis:

```js
const REPORTING_THRESHOLD_MS = 150;

const observer = new PerformanceObserver(list => {
  for (const entry of list.getEntries()) {
    if (entry.duration > REPORTING_THRESHOLD_MS) {
      // Example here logs to console, but could also report back to analytics
      console.log(entry);
    }
  }
});
observer.observe({ type: 'long-animation-frame', buffered: true });
```

As the long animation frame entries can be quite large, developers should decide what data from the entry should be sent to analytics. For example, the summary times of the entry and perhaps the script names, or some other minimum set of other contextual data that may be deemed necessary.

### Observing the worst long animation frames

Sites may wish to collect data on the longest animation frame (or frames), to reduce the volume of data that needs to be beaconed. So no matter how many long animation frames a page experiences, only data for the worst one, five, or however many long animation frames absolutely necessary is beaconed back.

```js
MAX_LOAFS_TO_CONSIDER = 10;
let longestBlockingLoAFs = [];

const observer = new PerformanceObserver(list => {
  longestBlockingLoAFs = longestBlockingLoAFs.concat(list.getEntries()).sort(
    (a, b) => b.blockingDuration - a.blockingDuration
  ).slice(0, MAX_LOAFS_TO_CONSIDER);
});
observer.observe({ type: 'long-animation-frame', buffered: true });
```

At the appropriate time ([ideally on the `visibilitychange` event](/articles/page-lifecycle-api/#:~:text=it%27s%20always%20better%20to%20rely%20on%20the%20visibilitychange%20event%20to%20determine%20when%20a%20session%20ends)) beacon back to analytics. For local testing you can use `console.table` periodically:

```js
console.table(longestBlockingLoAFs);
```

### Linking to the longest INP interaction

As an extension of the above, the LoAF frame(s) corresponding to the INP entry could be used as attribution data to give further details on how to improve INP.

There is [currently no direct API to link an INP entry with its related LoAF entry or entries](https://github.com/w3c/longtasks/issues/115), though it is possible to do so in code by comparing the start and end times of each (see [this example script](https://gist.github.com/noamr/316bd48157ab35e4f632a8c2583281b7)).

### Reporting long animation frames with interactions

An alternative approach that requires less code would be to always send the largest (or top X largest) LoAF entries where an interaction occurred during the frame (which can be detected by the presence of a `firstUIEventTimestamp` value). In most cases this will include the INP interaction for a given visit, and in rare cases when it doesn't it still surfaces long interactions that are important to fix, as they may be the INP interaction for other users.

The following code logs all LoAF entries greater than 150 milliseconds where an interaction occurred during the frame. The 150 is chosen here because it is slightly less than the 200 millisecond "good" INP threshold. You could choose a higher or lower value depending on your needs.

```js
const REPORTING_THRESHOLD_MS = 150;

const observer = new PerformanceObserver(list => {
    for (const entry of list.getEntries()) {
      if (entry.duration > REPORTING_THRESHOLD_MS &&
        entry.firstUIEventTimestamp > 0
      ) {
        // Example here logs to console, but could also report back to analytics
        console.log(entry);
      }
    }
});
observer.observe({ type: 'long-animation-frame', buffered: true });
```

### Identifying common patterns in long animation frames

An alternative strategy would be to look at common scripts appearing the most in long animation frame entries. Data could be reported back at a script and/or character position level to identify repeat offenders.

This may work particularly well for customizable platforms where themes or plugins causing performance issues could be more easily identified across a number of sites.

The execution time of common scripts—or third-party origins—in long animation frames could be summed up and reported back to identify common contributors to long animation frames across a site or a collection of sites.

```js
const observer = new PerformanceObserver(list => {
  const allScripts = list.getEntries().flatMap(entry => entry.scripts);
  const scriptNames = [...new Set(allScripts.map(script => script.name))];
  const scriptsByName = scriptNames.map(name => ([name,
      allScripts.filter(script => script.name === name)
  ]));
  const processedScripts = scriptsByName.map(([name, scripts]) => ({
    name,
    count: scripts.length,
    totalDuration: scripts.reduce((subtotal, script) => subtotal + script.duration, 0)
  }));
  processedScripts.sort((a, b) => b.totalDuration - a.totalDuration);
  // Example here logs to console, but could also report back to analytics
  console.table(processedScripts);
});

observer.observe({type: 'long-animation-frame', buffered: true});
```

And example of this output is shown below:

<figure>
  {% Img src="image/W3z1f5ZkBJSgL1V1IfloTIctbIF3/wBGFND4u3dgkt2HyEZP2.png", alt="A screenshot of example DevTools output of scripts order by duration, consisting of a table with columns for the index, the name of the script, the count, and the total duration.", width="800", height="149" %}
</figure>

## Using the Long Animation Frames API in tooling

The API could also allow additional developer tooling for local debugging. While some tooling like Lighthouse and Chrome DevTools have been able to gather much of this data using lower-level tracing details, having this higher-level API could allow other tools to  access this data.

### Surfacing long animation frames data in DevTools

You can surface long animation frames in DevTools using the [`performance.measure()`](https://developer.mozilla.org/docs/Web/API/Performance/measure) API, which are then displayed [in the DevTools user timings track](/docs/devtools/performance-insights/#timings) in performance traces to show where to focus your efforts for performance improvements:

```js
const observer = new PerformanceObserver((list) => {
  for (const entry of list.getEntries()) {
    performance.measure('LoAF', {
      start: entry.startTime,
      end: entry.startTime + entry.duration,
    });
  }
});

observer.observe({ type: 'long-animation-frame', buffered: true });
```

If this API proves useful in the long term, it will likely be incorporated into DevTools itself, but the above code snippet allows it to be surfaced there in the meantime.

### Using long animation frames data in other developer tooling

The [Web Vitals extension has shown the value in logging summary debug information](https://web.dev/articles/debug-cwvs-with-web-vitals-extension) to diagnose performance issues. Should this proposal prove useful and the API is launched, tools like that could more easily surface data to help make developers aware of where to concentrate their efforts. Similarly, this could be added to the [web vitals JavaScript library](https://github.com/GoogleChrome/web-vitals) in the future.

### Using long animation frames data in automated testing tools

Similarly automated testing tools, perhaps in CI/CD pipelines, could surface details on potential performance issues by measuring long animation frames while running various test suites.

## FAQ

Below are some of the frequently asked questions on this API:

### Why not just extend or iterate on the Long Tasks API?

This is an alternative look at reporting a similar—but ultimately different—measurement of potential responsiveness issues. It's important to ensure sites relying on the existing Long Tasks API continue to function to avoid disrupting existing use cases.

While the Long Tasks API may benefit from some of the features of LoAF (such as a better attribution model), we believe that focusing on frames rather than tasks offers many benefits that make this a fundamentally different proposal to the existing Long Tasks API.

### Will this replace the Long Tasks API?

The Long Animation Frames API proposal is at the experimentation stage. We are inviting developers to try the API, and subsequently comment on it to test its usefulness. At this time, there are no plans to deprecate the Long Tasks API.

## Feedback wanted

The Chrome team is seeking feedback on the API shape to ensure it's easy to use and meets developers needs before we aim to standardize and release it for general use

Feedback can be provided at the [Long Task GitHub Issues list](https://github.com/w3c/longtasks/issues), or bugs in Chrome's implementation of the API can be filed in [Chrome's issue tracker](https://bugs.chromium.org/p/chromium/issues/entry?template=Defect&components=Blink%3EPerformanceAPIs).

## Conclusion

The Long Animation Frames API is an exciting proposal with many potential advantages over the existing Long Tasks API.

It could prove to be a key tool for addressing responsiveness issues as measured by INP. INP is a challenging metric to optimize and this API is one way the Chrome team is seeking to make identifying and addressing issues easier for developers.

The scope of the Long Animation Frames API extends beyond just INP though, and it can help identify other causes of slow updates which can affect the overall smoothness of a website's user experience.

## Acknowledgements

_Hero image by [Henry Be](https://unsplash.com/@henry_be) on [Unsplash](https://unsplash.com/photos/MWP9cxS4uCg)._
