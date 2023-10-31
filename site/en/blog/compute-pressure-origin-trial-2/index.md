---
layout: 'layouts/blog-post.njk'
title: 'Announcing the second Compute Pressure origin trial'
description: >
  A new origin trial from Chrome that allows web developers to monitor compute
  pressure.
authors:
  - kenchris
  - arskama
date: 2023-05-30
hero: image/FNkVSAX8UDTTQWQkKftSgGe9clO2/H9cVTFMj4cYmoIfGYQqd.jpg
alt: A pressure gauge and pipes.
tags:
  - chrome-115
  - origin-trials
  - capabilities
---

Over the last year, Intel has been collaborating with Google and other parties
on the Compute Pressure API. In Chrome&nbsp;115, you can register for an
[origin trial](/origintrials/#/view_trial/1196831600973709313) to help test
this new API, and this post explains the problems the API has been designed to
solve, and shows how to use it.

{% Aside %} The Compute Pressure API was in origin trial from Chrome&nbsp;92 to
Chrome&nbsp;94. Since this first origin trial, many [changes] have been made to
the API. The existing [article](/docs/web-platform/compute-pressure/) on the
Compute Pressure API is updated with more details. {% endAside %}

## The problem

The web is becoming a key application platform, with new capabilities making
applications such as video conferencing not just possible, but a delightful
experience for users. Web-based experiences load instantly, they are accessible
from anywhere, and need no up-front installation.

Users want fast-loading and responsive applications. They also want to get as
much as possible out of their battery life, and silent devices that are not hot
to touch. These things can sometimes be hard to achieve when also creating
advanced experiences as smooth animations and background video blurring use a
lot of processing power, pushing hardware to its limits and draining batteries.

In addition, there are a huge variety of devices being used to access web
applications. A five-year old laptop will have very different capabilities to a
brand new desktop computer, even when running the same browser version.

Developers often opt to develop for the lowest common denominator, avoiding
using some features that would tax older or less capable devices. However, if it
were possible to optimize the experience for users who have capable equipment
and are in the right environment to benefit from it, why not do it? As an
example, when joining a video call from your phone, just seeing the current
speaker is likely the best experience. On a desktop however, it would be nice to
see everyone on the call, and the hardware is usually up to the task. To achieve
this, you need live hardware telemetry, without sacrificing the users' privacy,
that can be used for scheduling tasks and progressively turning on and off
features to ensure a smooth user experience. This is where the Compute Pressure
API can help.

## What is the Compute Pressure API?

The Compute Pressure API offers high-level states that represent the pressure on
the system. These high-level states ensure a good balance between privacy (not
sharing too much specific information that could identify a user) and
information that developers can easily reason about. Additionally, it allows the
implementation to use the right underlying hardware metrics to ensure that users
can take advantage of all the processing power available to them as long as the
system is not under unmanageable stress.

Modern CPUs, for instance, are designed to run fine at 100% utilization in most
situations, on a single core or across all cores, so an API that hardcodes 80%
utilization as being critical could result in developers under-utilizing the
hardware's capabilities and offering a suboptimal user experience. On the other
hand, a system might not have proper cooling, or the ambient temperature might
be very high as in the summer, and the system might be throttling even before
reaching high CPU utilization. The current API works on global CPU pressure, but
we plan to experiment with enabling CPU pressure per page across the main thread
and workers.

Compute pressure has the following states:

- **Nominal:** Current workloads are causing minimal pressure, allowing the
  system to run at a lower clock frequency to preserve power.
- **Fair:** The system is doing fine; everything is smooth, and it can take on
  additional work without issues.
- **Serious:** There is some serious pressure on the system, but it is
  manageable, and the system is doing well, but could be getting close to its
  limits:
  - Clock speed (depending on AC or DC power) is consistently high.
  - Thermals are high but still manageable and not causing throttling.

At this point if you add more work the system may move into a critical state.

- **Critical:** The system is now about to reach its limits, but it hasn't
  reached the limit yet. Critical doesn't mean that the system is being actively
  throttled, but this state is not sustainable for the long run and might result
  in throttling if the workload remains the same. This signal is the last call
  for the web application to lighten its workload.

## Enable the Compute Pressure API

By default, the Compute Pressure API is not enabled in Chrome, but it can be
experimented with in Chrome&nbsp;115 by explicitly enabling the functionality.
You can activate it locally by enabling the
[`enable-experimental-web-platform-features` flag](/docs/web-platform/chrome-flags/#chromeflags).

To enable it for all visitors to your app, an
[origin trial](/origintrials/#/view_trial/1196831600973709313) is currently
underway and set to end in Chrome&nbsp;118 ({% ChromeDate '115' %}). To
participate in the trial, sign up and include a meta element with the origin
trial token in either the HTML or HTTP header. For more information, refer to
the [Get started with origin trials](/docs/web-platform/origin-trials/) post.

## Observe compute pressure

The following code snippet illustrates how to monitor and act on changes of
compute pressure:

```js
// The `records` parameter is a sequence of records between two
// consecutive callbacks. Currently it contains ten entries, but
// this is an implementation detail.
function callback(records) {
  const lastRecord = records.pop();
  console.log(`Current pressure ${lastRecord.state}`);
  if (lastRecord.state === 'critical') {
    // Reduce workers load by 4.
  } else if (lastRecord.state === 'serious') {
    // Reduce workers load by 2.
  } else {
    // Do not reduce.
  }
}

const observer = new PressureObserver(callback, {
  // Sample rate in Hertz.
  sampleRate: 1,
});
observer.observe('cpu');
```

The following code snippet illustrates how to use the Compute Pressure API from
an iframe:

```html
<iframe src="https://mysite.com/" allow="compute-pressure">
  <script>
    // Use Compute Pressure API.
  </script>
</iframe>
```

## Platform support

The Compute Pressure API is available in Chrome&nbsp;115 on Linux, ChromeOS,
macOS, and Windows.

{% Aside %} While due to resource constraints Android support is currently not
supported during the origin trial phase, it's planned to support the operating
system in the future. {% endAside %}

## Demo

Try the demo embedded below to see how the compute pressure state changes based
on some artificial pressure.

<iframe style="border:solid 1px; height:1100px; width:100%;" src="https://w3c.github.io/compute-pressure/demo/" allow="compute-pressure"></iframe>

In case your browser doesn't support the API, the video below shows a recording
of the demo.

{% YouTube id='6hsgWSF-kuw'%}

## Feedback

Developer feedback is really important at this stage, so please
[file issues on GitHub](https://github.com/w3c/compute-pressure/issues/) with
suggestions and questions.

## Useful links

- [Public explainer][explainer]
- [Specifications][specs]
- [Chromium tracking bug][cr-bug]
- [ChromeStatus.com entry][cr-status]
- [TAG Review](https://github.com/w3ctag/design-reviews/issues/795)
- [Intent to Experiment][i2e]
- [Compute Pressure API Demo][demo] | [Compute Pressure API Demo
  source][demo-source]

## Acknowledgements

The hero image was created by Robert Anasch on
[Unsplash](https://unsplash.com/photos/-C7IKRBZHrg).
This article was reviewed by [Rachel Andrew](/authors/rachelandrew/) and [Thomas Steiner](/authors/thomassteiner).

[specs]: https://w3c.github.io/compute-pressure/
[demo]: https://w3c.github.io/compute-pressure/demo/
[demo-source]: https://github.com/w3c/compute-pressure/tree/main/demo
[explainer]: https://github.com/w3c/compute-pressure#readme
[cr-bug]: https://bugs.chromium.org/p/chromium/issues/detail?id=1067627
[cr-status]: https://chromestatus.com/feature/5597608644968448
[i2e]: https://groups.google.com/a/chromium.org/g/blink-dev/c/QfJ4pngu3gc
[changes]: https://github.com/w3c/compute-pressure/blob/main/CHANGES.md
[article]: /docs/web-platform/compute-pressure/
