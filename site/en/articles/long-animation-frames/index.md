---
## Required
layout: 'layouts/blog-post.njk'
title: Long Animation Frames API
description: |
  Learn about the Long Animation Frames API (LoAF) proposal which is the next iteration of the Long Tasks API and allows measuring frame update delays with attribution
authors:
  - tunetheweb
date: 2023-08-15
##updated: 2023-08-??
hero: image/W3z1f5ZkBJSgL1V1IfloTIctbIF3/uYTX08MvUTagNuuo4rrn.jpg
alt: A loaf of bread
tags:
  - performance
  - origin-trials
  - chrome-116
---

The [Long Animation Frames API](https://github.com/w3c/longtasks/blob/main/loaf-explainer.md) (or LoAF) is a new proposal from the Chrome team to update the [Long Tasks API](https://w3c.github.io/longtasks/) to provide better understanding of slow user interface (UI) updates. This can be useful to identify slow animation frame updates which are likely to affect the pending [Interaction to Next Paint (INP)](https://web.dev/inp/) Core Web Vital metric which measures responsiveness, or to identify other UI jank which affects [smoothness](https://web.dev/smoothness/). The API is available as an origin trail from Chrome 116 for developers to provide feedback on.

## The Long Tasks API

The Long Tasks API allows you to monitor for **long tasks**, or tasks that occupy the main thread for 50ms. This can be monitored using the [PerformanceLongTaskTiming](https://developer.mozilla.org/docs/Web/API/PerformanceLongTaskTiming) interface, with a `PeformanceObserver`:

```js
const observer = new PerformanceObserver((list) => {
   console.log(list.getEntries());
});

observer.observe({ type: "longtask", buffered: true });
```

Long tasks are likely to cause responsiveness issues. If a user tries to interact with a page—for example, click a button, or open a menu—but the main thread is already dealing with a long task, then the [user’s interaction is delayed](https://web.dev/optimize-inp/#identify-and-reduce-input-delay) waiting for that task to be completed.

To improve responsiveness, it is often advised to [break up long tasks](https://web.dev/optimize-long-tasks/). If each long task is instead broken up into a series of multiple, smaller tasks, it may allow more important tasks to be executed in between them to avoid the site feeling unresponsive.

So when trying to improve responsiveness, the first effort is often to run a performance trace and look at long tasks. This could be through a lab-based auditing tool like Lighthouse (which has an **Avoid long main-thread tasks** audit), or by [looking at long tasks in Chrome DevTools](https://web.dev/long-tasks-devtools/).

Lab-based testing is [often a poor starting place for identifying responsiveness issues](https://web.dev/diagnose-slow-interactions-in-the-lab/), as these tools typically do not include interactions—when they do, they are a small subset of likely interactions. Ideally you would track causes of slow interactions in the field.

### Shortcomings of the Long Tasks API

Measuring long tasks in the field using the Performance Observer above is only somewhat useful. In reality, it doesn’t give that much information beyond the fact that a long task happened and how long it took.

Real User Monitoring (RUM) tools often track this, and can be used to trend the number or duration of long tasks or identifying which pages these happen on—but without the underlying details of what caused the long task, this is only of limited use. The Long Tasks API only has a [basic attribution model](https://developer.mozilla.org/docs/Web/API/TaskAttributionTiming), which at best only tells you the container the long task happened in (the main frame, or an iframe), but not the script or function which called it, as shown by a typical entry below:

```js
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

The Long Tasks API is also an incomplete view, since it may exclude some important tasks. Some updates—like rendering—happen in separate tasks that ideally should be included together with the preceding execution that caused that update to accurately measure the “total work” for that interaction. For more details of the limitations of relying on tasks, see [the “Where long tasks fall short” section of the new API’s explainer](https://github.com/w3c/longtasks/blob/main/loaf-explainer.md#where-long-tasks-fall-short).

The final issue is that measuring long tasks only reports on individual tasks that take longer than the 50 millisecond limit. An animation frame could be made up of several tasks below this 50 millisecond limit, yet collectively still block the browser’s ability to render.

## The Long Animation Frames API

The [Long Animation Frames API](https://github.com/w3c/longtasks/blob/main/loaf-explainer.md) (LoAF) is a new API that seeks to address some of the shortcomings of the Long Tasks API to enable developers to get more actionable insights to help address responsiveness problems and improve INP.

The Long Animation Frames API is an alternative approach to measuring blocking work. Rather than measuring the individual **tasks**, the Long Animation Frames API—as its name suggests—instead measures **long animation frames**. A long animation frame is when a rendering update is delayed beyond 50 milliseconds (the same as the Long Tasks API’s threshold).

It can be called in the similar way as long tasks with a `PerformanceObserver` looking at `long-animation-frame` types:

```js
const observer = new PerformanceObserver((list) => {
   console.log(list.getEntries());
});
observer.observe({ type: "long-animation-frame", buffered: true });
```

### Advantages of looking at frames instead of tasks

The key advantage of looking at this from a frame perspective, rather than a tasks perspective is that a long animation can be made up of any number of tasks that cumulatively resulted in a long animation frame. This addresses the final point above, where the sum of many smaller, render-blocking tasks before an animation frame may escape the notice of the Long Tasks API.

A further advantage of this alternative view on long tasks, is the ability to provide timing breakdowns of the entire frame. Rather than just including a `startTime` and a `duration`, like the Long Tasks API, LoAF includes a much more detailed breakdown of the various parts of the frame duration including:

- `startTime`: the start time of the long animation frame relative to the navigation start time.
- `duration`: the duration of the long animation frame.
- `renderStart`: the rendering start time including requestAnimationFrame callbacks, style and layout calculation, resize observer and intersection observer callbacks.
- `styleAndLayoutStart`: beginning of the time period spent in style and layout calculations.
- `desiredRenderStart`: the time the animation frame was queued.
- `presentationTime`:  the implementation-specific time when the frame was actually presented.
- `firstUIEventTimestamp`:  time of the first UI event (mouse/keyboard etc.) to be handled during the course of this frame.
- `blockingDuration`:  the duration in milliseconds that the animation frame was being blocked in practice.

For more details on these individual timings, [refer to the explainer](https://github.com/w3c/longtasks/blob/main/loaf-explainer.md#how-a-loaf-entry-might-look-like), which provides fine grained detail as to which each activity is contributing to the resulting long animation frame.

### Better attribution

The `long-animation-frame` entry type includes better attribution data of each script that contributed to a long animation frame. Similar to the Long Tasks API, this will be provided in an array of attribution entries, each of which details:

- A meaningful `name`, indicating how the script was called.
- The `type` (`user-callback`, `event-listener`, `classic-script`…etc.)
- Separate timing data for that script:
    - `startTime`:  when the function was invoked.
    - `executionStart`: the time after compilation.
    - `duration`: the duration between startTime and when the subsequent microtask queue has finished processing.
    - `forcedStyleAndLayoutDuration`: total time spent in forced layout/style inside this function.
    - `desiredExecutionStart`: the time when the callback was queued.
- `sourceLocation`:  the script resource name and character position.
- `windowAttribution`:  similar information to Long Tasks API as to which container (the main frame, or an iframe) this happens in.
- `window`:  a reference to the same origin window.

This allows developers to know exactly how each script in the long animation frame was called, down to the character position in the calling script giving the exact location in a JavaScript resource that resulted in the extended frame.

### Example of a Long Animation Frame performance entry

A complete LoAF performance entry example, containing two scripts, is shown below:

```js
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

The Long Animation Frames API is available in Chrome behind the Experimental Web Platform Features flag and can be enabled at: `chrome://flags/#enable-experimental-web-platform-features` for developers wishing to experiment with this API.

This feature is also [entering an origin trial from Chrome 116](/origintrials/#/view_trial/3935020174414970881), which allows developers to enable the feature for visitors to their sites to collect data from real users. See [Get started with origin trials](/en/docs/web-platform/origin-trials/) for more information on origin trials.

## Using the Long Animation Frames API in the field

Tools like Lighthouse—while useful for discovering and reproducing issues—are lab tools that may miss important aspects of the user experience that only field data can provide. The Long Animation Frames API can be used in the field to gather important contextual data for user interactions that the Long Tasks API could not. This can help you surface problems you might not have otherwise discovered.

Some suggested strategies are listed next, but the Chrome team is keen to hear feedback on this API and how developers and RUM providers would see themselves using the information the API provides.

### Returning all data back to an analytics endpoint

As shown, the LoAF performance entry includes valuable information. One (perhaps naïve) strategy would be to log all LoAFs and beacon them back to an analytics end point for later analysis:

```js
const observer = new PerformanceObserver((list) => {
  for (const entry of list.getEntries()) {
    sendtoAnalytics(entry);
  }
});
observer.observe({ type: "long-animation-frame", buffered: true });
```

Depending on the number of long animation frames, and the volume of visitors, this could lead to a large volume of data, so this strategy is perhaps best used for more optimized sites where long animation frames are a relative rarity.

This strategy may however make more sense on a sample subset of users, or on pages with particular responsiveness issues that are proving difficult to track down.

### Returning the worst long animation frames

Sites may wish to collect data on the longest animation frame (or frames) and send this data back, in order to reduce the volume of data that needs to be beaconed. So no matter how many long animation frames a page experiences, only data for the worst one, five, or however many long animation frames is beaconed back.


```js
MAX_LOAFS_TO_CONSIDER = 10;

const observer = new PerformanceObserver(() => {
    const sortedByBlockingDuration =
      performance.getEntriesByType("long-animation-frame").sort(
        (a, b) => b.blockingDuration - a.blockingDuration
      );

  // Example here logs to console, but could also report back to analytics
  console.table(sortedByBlockingDuration.slice(0, MAX_LOAFS_TO_CONSIDER));
});

observer.observe({ type: "long-animation-frame", buffered: true });
```

### Correlating with INP

As an extension of the above, the LoAF frame corresponding to the INP entry could be used as attribution data to give further details on how to improve this INP.

As there is no direct link between INP entries and LoAF entries, this requires correlating both performance entries using the start and end times (see [this example script](https://gist.github.com/noamr/2d4e2bdd48661fa39e32283efecaf418)).

This does however risk only getting actionable insights on the worst interaction, when there may be many more interactions that are only slightly better. Perhaps with enough visitors, all interactions that need to be optimized will be surfaced, but other strategies may allow that to happen more easily.

INP is often non-deterministic in nature as an interaction’s performance is heavily influenced by what else is going on at the time of the interaction. A more holistic approach of looking at the worst long animation frames overall and tackling them, rather than only the long animation frame associated with the INP, may be a better way to tackle responsiveness issues. This should ultimately lead to a better INP metric, and a more stable one going forward.

### Identifying common patterns in LoAFs

An alternative strategy would be to look at common root causes and try to do some client side processing to identify common causes, in either timings, or the scripts. Data could be reported back at a script and/or character-position level to identify repeat offenders.

This may work particularly well for customizable platforms where themes, or plugins causing performance issues could be more easily identified across a number of sites.

The execution time of common scripts, or third-party origins, in long animation frames could be summed up and reported back to identify common contributors to long animation frames across the site or a collection of sites.

```js
let loafScripts = []

const observer = new PerformanceObserver((list) => {
  list.getEntries().forEach((entry) => {
    entry.scripts.forEach((loafScript) => {
      const scriptEntry = loafScripts.filter(function(loafScriptEntry) {
        return loafScriptEntry.name === loafScript.name;
      })[0];
      if (scriptEntry) {
        scriptEntry.duration += loafScript.duration;
        scriptEntry.forcedStyleAndLayoutDuration +=
            loafScript.forcedStyleAndLayoutDuration;
        scriptEntry.pauseDuration += loafScript.pauseDuration;
      } else {
        loafScripts.push({
          name: loafScript.name,
          windowAttribution: loafScript.windowAttribution,
          type: loafScript.type,
          duration: loafScript.duration,
          forcedStyleAndLayoutDuration:
                loafScript.forcedStyleAndLayoutDuration,
          pauseDuration: loafScript.pauseDuration,
        });
      }
    });
  });
  loafScripts.sort((a, b) => b.duration - a.duration);
  // Example here logs to console, but could also report back to analytics
  console.table(Object.values(loafScripts));
});
observer.observe({ type: "long-animation-frame", buffered: true });
```

## Using Long Animation Frames API in tooling

The API could also allow additional developer tooling for local debugging. While some tooling like Lighthouse, and Chrome DevTools have been able to gather much of this data using lower-level tracing details, having this higher level API could allow other tools to get access to this data.

### Using long animation frames data in extensions

The [Web Vitals extension has shown the value in logging summary debug information](https://web.dev/debug-cwvs-with-web-vitals-extension/) to diagnose performance issues. Should this proposal prove useful and the API is launched, tools like that could more easily surface data to help make developers aware of where to concentrate their efforts.

### Surfacing long animation frames data in DevTools

You can surface long animation frame in DevTools using the <code>[performance.measure()](https://developer.mozilla.org/docs/Web/API/Performance/measure)</code> API which are then displayed [in DevTools user timings track](/docs/devtools/performance-insights/#timings) for performance traces to show where to concentrate on for performance improvements:

```js
const observer = new PerformanceObserver((list) => {
  for (const entry of list.getEntries()) {
    performance.measure("LoAF", {
      start: entry.startTime,
      end: entry.startTime + entry.duration,
    });
  }
});

observer.observe({ type: "long-animation-frame", buffered: true });
```

### Using long animation frames data in automated testing tools

Similarly automated testing tools, perhaps in CI/CD pipelines, could surface details on potential performance issues by measuring Long Animation frames while running various test suites.

## FAQ

Below are some of the frequently asked questions on this API:

### Why not just measure the INP interaction?

As [detailed above, this is one potential strategy](#correlating-with-inp). However, using the API to gather a more holistic view of the overall responsive issues on your site may make addressing INP issues quicker rather than trying to tackle only the worst issue at a time.

### Why not just extend or iterate the Long Tasks API?

This is an alternative look at reporting a similar, but different, measurement of potential responsiveness issues. It's important to ensure sites relying on the existing Long Tasks API continue to function to avoid disrupting existing use cases.

While the Long Tasks API may benefit from some of the features of LoAF (such as a better attribution model), we believe that focusing on frames rather than tasks offers many benefits that make this a fundamentally different proposal to the existing Long Tasks API.

### Will this replace the Long Tasks API?

The Long Animation Frames API proposal is at the experimentation stage where we are inviting developers to try, and comment on the API to test out its usefulness. At this time there are no plans to deprecate the Long Tasks API.

## Feedback wanted

The Chrome team is seeking feedback on the API shape to ensure it’s easy to use and meets developers needs, before we aim to release this for general use, and also standardize this.

Feedback can be provided at the [Long Task GitHub Issues list](https://github.com/w3c/longtasks/issues), or bugs in Chrome’s implementation of the API can be filed in [Chrome’s issue tracker](https://crbug.com/new).

## Conclusion

The Long Animation Frames API is an exciting proposal with many potential advantages over the existing Long Tasks API.

It could prove to be a key tool in our belt for addressing responsiveness issues as measured by the INP pending Core Web Vital. INP is a challenging metric to optimize and this API is one way the Chrome team is seeking to make identifying, and addressing issues easier for developers.

The scope of the Long Animation Frames API extends beyond just INP though, and it can help identify other causes of slow updates, which can affect the overall smoothness of a website’s experience.

## Acknowledgements

_Hero image by [Tommaso Urli](https://unsplash.com/@tunnuz) on [Unsplash](https://unsplash.com/photos/hzScL4ufC6k)._
