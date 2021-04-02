---
layout: "layouts/blog-post.njk"
title: "What's New In DevTools (Chrome 70)"
authors:
  - kaycebasques
date: 2018-08-29
#updated: YYYY-MM-DD
description:
  "Live Expressions in the Console, highlight DOM nodes during Eager Evaluation, and more."
hero: 'image/dPDCek3EhZgLQPGtEG3y0fTn4v82/THn7nAwsJpBAbaFeRKgU.jpg'
alt: ''
tags:
  - new-in-devtools
  - devtools
  - chrome-70
---

Welcome back! It's been about 12 weeks since our last update, which was for Chrome 68. We skipped
Chrome 69 because we didn't have enough new features or UI changes to warrant a post.

New features and major changes coming to DevTools in Chrome 70 include:

- [Live Expressions in the Console][1].
- [Highlight DOM nodes during Eager Evaluation][2].
- [Performance panel optimizations][3].
- [More reliable debugging][4].
- [Enable network throttling from the Command Menu][5].
- [Autocomplete Conditional Breakpoints][6].
- [Break on `AudioContext` events][7].
- [Debug Node.js apps with ndb][8].
- [Bonus tip: Measure real world user interactions with the User Timing API][9].

Read on, or watch the video version of this doc:

{% YouTube id="LJq8vg8ktdQ" %}

## Live Expressions in the Console {: #watch }

Pin a Live Expression to the top of your Console when you want to monitor its value in real-time.

1.  Click **Create Live Expression**
    {% Img src="image/admin/I2koUa4iploELZN4Rs8N.png", alt="Create Live Expression", width="33", height="23" %}. The Live
    Expression UI opens.

    {% Img src="image/admin/SZdCaRdB0m9KOBaKzC0w.png", alt="The Live Expression UI", width="800", height="516" %}

    **Figure 1**. The Live Expression UI

2.  Type the expression that you want to monitor.

    {% Img src="image/admin/zgB9xFL6x4NRg79TLjJX.png", alt="Typing Date.now() into the Live Expression UI.", width="800", height="516" %}

    **Figure 2**. Typing `Date.now()` into the Live Expression UI

3.  Click outside of the Live Expression UI to save your expression.

    {% Img src="image/admin/IE8bIVdTjaGBPqKd4euz.png", alt="A saved Live Expression.", width="800", height="516" %}

    **Figure 3**. A saved Live Expression

Live Expression values update every 250 milliseconds.

## Highlight DOM nodes during Eager Evaluation {: #nodes }

Type an expression that evaluates to a DOM node in the Console and [Eager Evaluation][10] now
highlights that node in the viewport.

{% Aside %}

**Note:** **The highlighted node only updates when you type**. It does not update on an interval.
For example, if you type `document.activeElement`, which tracks the element in focus, and then tab
through the page, DevTools will still be highlighting the node that was active when you originally
typed out the expression.

{% endAside %}

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/2Wo3pu6seuEnkWaMBZrS.png", alt="After typing document.activeElement in the Console a node is highlighted in the viewport.", width="800", height="784" %}

**Figure 4**. Since the current expression evaluates to a node, that node is highlighted in the
viewport

Here are some expressions you may find useful:

- `document.activeElement` for highlighting the node that currently has focus.
- `document.querySelector(s)` for highlighting an arbitrary node, where `s` is a CSS selector. This
  is equivalent to hovering over a node in the [DOM Tree][11].
- [`$0`][12] for highlighting whatever node is currently selected in the DOM Tree.
- `$0.parentElement` to highlight the parent of the currently-selected node.

## Performance panel optimizations {: #performance }

When profiling a large page, the Performance panel previously took tens of seconds to process and
visualize the data. Clicking on a event to learn more about it in the Summary tab also sometimes
took multiple seconds to load. Processing and visualizing is faster in Chrome 70.

{% Img src="image/admin/nymZOf5a8pVh6FgTYU9t.png", alt="Processing and loading Performance data.", width="800", height="638" %}

**Figure 5**. Processing and loading Performance data

## More reliable debugging {: #debugging }

Chrome 70 fixes some bugs that were causing breakpoints to disappear or not get triggered.

It also fixes bugs related to sourcemaps. Some TypeScript users would instruct DevTools to blackbox
a certain TypeScript file while stepping through code, and instead DevTools would blackbox the
entire bundled JavaScript file. These fixes also address an issue that was causing the Sources panel
to generally run slowly.

## Enable network throttling from the Command Menu {: #throttling }

You can now set network throttling to fast 3G or slow 3G from the [Command Menu][13].

{% Img src="image/admin/IcmXceEt6IOkJgJ4FIkH.png", alt="Network throttling commands in the Command Menu.", width="800", height="467" %}

**Figure 6**. Network throttling commands in the Command Menu

## Autocomplete Conditional Breakpoints {: #autocomplete }

Use the Autocomplete UI to type out your [Conditional Breakpoint][14] expressions faster.

{% Img src="image/admin/9yFogzZSqY04KLMP4d8J.png", alt="The Autocomplete UI", width="800", height="638" %}

**Figure 7**. The Autocomplete UI

**Did you know?** The Autocomplete UI is possible thanks to [CodeMirror][15], which also powers the
Console.

## Break on AudioContext events {: #audiocontext }

Use the [Event Listener Breakpoints][16] pane to pause on the first line of an `AudioContext`
lifecycle event handler.

[AudioContext][17] is part of the Web Audio API, which you can use to process and synthesize audio.

{% Img src="image/admin/BLgPmE3bubvc3nfPMLkg.png", alt="AudioContext events in the Event Listener Breakpoints pane.", width="800", height="648" %}

**Figure 8**. AudioContext events in the Event Listener Breakpoints pane

## Debug Node.js apps with ndb {: #ndb }

{% Aside %}

**Note:** ndb is an experimental project from Google Chrome Labs.

{% endAside %}

ndb is a new debugger for Node.js applications. On top of the [usual debugging features that you get
through DevTools][18], ndb also offers:

- Detecting and attaching to child processes.
- Placing breakpoints before modules are required.
- Editing files within the DevTools UI.
- Blackboxing all scripts outside of the current working directory by default.

{% Img src="image/admin/P6mBnxfW1xelxoTbdVWK.png", alt="The ndb UI.", width="800", height="432" %}

**Figure 9**. The ndb UI

Check out [ndb's README][19] to learn more.

## Bonus tip: Measure real world user interactions with the User Timing API {: #bonus }

Want to measure how long it takes real users to complete critical journeys on your pages? Consider
instrumenting your code with the [User Timing API][20].

For example, suppose you wanted to measure how long a user spends on your homepage before clicking
your [call-to-action][21] (CTA) button. First, you would mark the beginning of the journey in an
event handler associated to a page load event, such as `DOMContentLoaded`:

```js
document.addEventListener('DOMContentLoaded', () => {
  window.performance.mark('start');
});
```

Then, you would mark the end of the journey and calculate its duration when the button is clicked:

```js
document.querySelector('#CTA').addEventListener('click', () => {
  window.performance.mark('end');
  window.performance.measure('CTA', 'start', 'end');
});
```

You can also extract your measurements, making it easy to send them to your analytics service to
collect anonymous, aggregated data:

```js
const CTA = window.performance.getEntriesByName('CTA')[0].duration;
```

DevTools automatically marks up your User Timing measurements in the **User Timing** section of your
Performance recordings.

{% Img src="image/admin/7dzjqyjRXEFZVoFTVwUq.png", alt="The User Timing section.", width="800", height="689" %}

**Figure 10**. The User Timing section

This also comes in handy when debugging or optimizing code. For example, if you want to optimize a
certain phase of your lifecycle, call `window.performance.mark()` at the beginning and end of your
lifecycle function. React does this in development mode.

[1]: #watch
[2]: #nodes
[3]: #performance
[4]: #debugging
[5]: #throttling
[6]: #autocomplete
[7]: #audiocontext
[8]: #ndb
[9]: #bonus
[10]: /blog/new-in-devtools-68#eagerevaluation
[11]: /docs/devtools/css/reference#select
[12]: /docs/devtools/console/utilities#dom
[13]: /docs/devtools/command-menu/
[14]: /docs/devtools/javascript/breakpoints#conditional-loc
[15]: https://codemirror.net/
[16]: /docs/devtools/javascript/breakpoints#event-listeners
[17]: https://developer.mozilla.org/en-US/docs/Web/API/AudioContext
[18]: https://medium.com/@paul_irish/debugging-node-js-nightlies-with-chrome-devtools-7c4a1b95ae27
[19]: https://github.com/GoogleChromeLabs/ndb/blob/master/README.md
[20]: https://developer.mozilla.org/en-US/docs/Web/API/User_Timing_API
[21]: https://en.wikipedia.org/wiki/Call_to_action_(marketing)
