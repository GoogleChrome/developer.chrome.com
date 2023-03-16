---
layout: 'layouts/blog-post.njk'
title: Page Lifecycle API
date: 2018-07-24
updated: 2022-11-18
authors:
  - philipwalton
description: The Page Lifecycle API brings app lifecycle features common on mobile operating systems to the web. Browsers are now able to safely freeze and discard background pages to conserve resources, and developers can safely handle these interventions without affecting the user experience.
---

<!-- Temporary styles, but this page is broken without them. -->
<style>
table td, table th {vertical-align:top;text-align: left;}
table td > *+* {margin-top: 1em;}
.language-js .token.comment {color: #727272;}
</style>

Modern browsers today will sometimes suspend pages or discard them entirely when
system resources are constrained. In the future, browsers want to do this
proactively, so they consume less power and memory. The [Page Lifecycle
API](https://wicg.github.io/page-lifecycle/spec.html), shipping in Chrome 68,
provides lifecycle hooks so your pages can safely handle these browser
interventions without affecting the user experience. Take a look at the API to
see whether you should be implementing these features in your application.

## Background

Application lifecycle is a key way that modern operating systems manage
resources. On Android, iOS, and recent Windows versions, apps can be started and
stopped at any time by the OS. This allows these platforms to streamline and
reallocate resources where they best benefit the user.

On the web, there has historically been no such lifecycle, and apps can be kept
alive indefinitely. With large numbers of web pages running, critical system
resources such as memory, CPU, battery, and network can be oversubscribed,
leading to a bad end-user experience.

While the web platform has long had events that related to lifecycle states
&mdash; like [`load`](https://developer.mozilla.org/docs/Web/Events/load),
[`unload`](https://developer.mozilla.org/docs/Web/Events/unload), and
[`visibilitychange`](https://developer.mozilla.org/docs/Web/Events/visibilitychange)
&mdash; these events only allow developers
to respond to user-initiated lifecycle state changes. For the web to work
reliably on low-powered devices (and be more resource conscious in general on
all platforms) browsers need a way to proactively reclaim and re-allocate system
resources.

In fact, browsers today already do [take active measures to conserve
resources](https://developer.mozilla.org/docs/Web/API/Page_Visibility_API#Policies_in_place_to_aid_background_page_performance)
for pages in background tabs, and many browsers (especially Chrome) would like
to do a lot more of this &mdash; to lessen their overall resource footprint.

The problem is developers currently have no way to prepare for these types of
system-initiated interventions or even know that they're happening. This means
browsers need to be conservative or risk breaking web pages.

The [Page Lifecycle API](https://wicg.github.io/page-lifecycle/spec.html)
attempts to solve this problem by:

- Introducing and standardizing the concept of lifecycle states on the web.
- Defining new, system-initiated states that allow browsers to limit the
  resources that can be consumed by hidden or inactive tabs.
- Creating new APIs and events that allow web developers to respond to
  transitions to and from these new system-initiated states.

This solution provides the predictability web developers need to build
applications resilient to system interventions, and it allows browsers to more
aggressively optimize system resources, ultimately benefiting all web users.

The rest of this post will introduce the new Page Lifecycle features shipping in
Chrome 68 and explore how they relate to all the existing web platform states
and events. It will also give recommendations and best-practices for the types
of work developers should (and should not) be doing in each state.

## Overview of Page Lifecycle states and events

All Page Lifecycle states are discrete and mutually exclusive, meaning a page
can only be in one state at a time. And most changes to a page's lifecycle state
are generally observable via DOM events (see [developer recommendations for each
state](#developer-recommendations-for-each-state) for the exceptions).

Perhaps the easiest way to explain the Page Lifecycle states &mdash; as well as
the events that signal transitions between them &mdash; is with a diagram:

<figure>
  <a href="https://wd.imgix.net/image/eqprBhZUGfb8WYnumQ9ljAxRrA72/KCIeOsJ0lCWMthBSSBrn.svg">
    {% Img
      src="image/eqprBhZUGfb8WYnumQ9ljAxRrA72/KCIeOsJ0lCWMthBSSBrn.svg",
      alt="Page Lifecycle API state and event flow. A visual representation of the state and event flow described throughout this document.",
      width="800",
      height="400"
    %}
  </a>
</figure>

### States

The following table explains each state in detail. It also lists the possible
states that can come before and after as well as the events developers can
use to observe changes.

<table>
  <thead>
    <tr>
      <th>State</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong id="state-active">Active</strong></td>
      <td>
        <p>A page is in the <i>active</i> state if it is visible and has
        input focus.</p>
        <p>
          <strong>Possible previous states:</strong><br>
          <a href="#state-passive">passive</a>
            <em>(via the <a href="#event-focus"><code>focus</code></a> event)</em><br>
        </p>
        <p>
          <strong>Possible next states:</strong><br>
          <a href="#state-passive">passive</a>
            <em>(via the<a href="#event-blur"> <code>blur</code></a> event)</em>
        </p>
      </td>
    </tr>
    <tr>
      <td><strong id="state-passive">Passive</strong></td>
      <td>
        <p>A page is in the <i>passive</i> state if it is visible and does
        not have input focus.</p>
        <p>
          <strong>Possible previous states:</strong><br>
          <a href="#state-active">active</a>
            <em>(via the <a href="#event-blur"><code>blur</code></a> event)</em><br>
          <a href="#state-hidden">hidden</a>
            <em>(via the <a href="#event-visibilitychange">
            <code>visibilitychange</code></a> event)</em>
        </p>
        <p>
          <strong>Possible next states:</strong><br>
          <a href="#state-active">active</a>
            <em>(via the <a href="#event-focus"><code>focus</code></a> event)</em><br>
          <a href="#state-hidden">hidden</a>
            <em>(via the <a href="#event-visibilitychange">
            <code>visibilitychange</code></a> event)</em>
        </p>
      </td>
    </tr>
    <tr>
      <td><strong id="state-hidden">Hidden</strong></td>
      <td>
        <p>A page is in the <i>hidden</i> state if it is not visible (and has not
        been frozen, discarded, or terminated).</p>
        <p>
          <strong>Possible previous states:</strong><br>
          <a href="#state-passive">passive</a>
            <em>(via the <a href="#event-visibilitychange">
            <code>visibilitychange</code></a> event)</em><br>
        </p>
        <p>
          <strong>Possible next states:</strong><br>
          <a href="#state-passive">passive</a>
            <em>(via the <a href="#event-visibilitychange">
            <code>visibilitychange</code></a> event)</em><br>
          <a href="#state-frozen">frozen</a>
            <em>(via the <a href="#event-freeze"><code>freeze</code></a> event)</em><br>
          <a href="#state-discarded">discarded</a>
            <em>(no events fired)</em><br>
          <a href="#state-terminated">terminated</a>
            <em>(no events fired)</em>
        </p>
      </td>
    </tr>
    <tr>
      <td><strong id="state-frozen">Frozen</strong></td>
      <td>
        <p>In the <i>frozen</i> state the browser suspends execution of
        <a href="https://wicg.github.io/page-lifecycle/spec.html#html-task-source-dfn">
        freezable</a>
        <a href="https://html.spec.whatwg.org/multipage/webappapis.html#queue-a-task">
        tasks</a> in the page's
        <a href="https://html.spec.whatwg.org/multipage/webappapis.html#task-queue">
        task queues</a> until the page is unfrozen. This means things like
        JavaScript timers and fetch callbacks do not run. Already-running
        tasks can finish (most importantly the <a href="#event-freeze">
        <code>freeze</code></a> callback), but they may be limited in what they
        can do and how long they can run.</p>
        <p>Browsers freeze pages as a way to preserve CPU/battery/data usage; they
        also do it as a way to enable faster
        <a href="#back-forward-cache">
        back/forward navigations</a> &mdash; avoiding the need for a full page
        reload.</p>
        <p>
          <strong>Possible previous states:</strong><br>
          <a href="#state-hidden">hidden</a>
            <em>(via the <a href="#event-freeze"><code>freeze</code></a> event)
        </p>
        <p>
          <strong>Possible next states:</strong><br>
          <a href="#state-active">active</a>
            <em>(via the <a href="#event-resume"><code>resume</code></a> event, then the
            <a href="#event-pageshow"><code>pageshow</code></a> event)</em><br>
          <a href="#state-passive">passive</a>
            <em>(via the <a href="#event-resume"><code>resume</code></a> event, then the
            <a href="#event-pageshow"><code>pageshow</code></a> event)</em><br>
          <a href="#state-hidden">hidden</a>
            <em>(via the <a href="#event-resume"><code>resume</code></a> event)</em><br>
          <a href="#state-discarded">discarded</a>
            <em>(no events fired)</em><br>
        </p>
      </td>
    </tr>
    <tr>
      <td><strong id="state-terminated">Terminated</strong></td>
      <td>
        <p>A page is in the <i>terminated</i> state once it has started being
        unloaded and cleared from memory by the browser. No
        <a href="https://html.spec.whatwg.org/multipage/webappapis.html#queue-a-task">
        new tasks</a> can start in this state, and in-progress tasks may be
        killed if they run too long.</p>
        <p>
          <strong>Possible previous states:</strong><br>
          <a href="#state-hidden">hidden</a>
            <em>(via the <a href="#event-pagehide"><code>pagehide</code></a> event)</em>
        </p>
        <p>
          <strong>Possible next states:</strong><br>
          NONE
        </p>
      </td>
    </tr>
    <tr>
      <td><strong id="state-discarded">Discarded</strong></td>
      <td>
        <p>A page is in the <i>discarded</i> state when it is unloaded by the
        browser in order to conserve resources. No tasks, event callbacks, or
        JavaScript of any kind can run in this state, as discards typically
        occur under resource constraints, where starting new processes is
        impossible.</p>
        <p>In the <i>discarded</i> state the tab itself
        (<a href="#prevent-freeze-discard">including the tab title and favicon
        </a>) is usually visible to the user even though the page is gone.</p>
        <p>
          <strong>Possible previous states:</strong><br>
          <a href="#state-frozen">hidden</a>
            <em>(no events fired)</em><br>
          <a href="#state-frozen">frozen</a>
            <em>(no events fired)</em>
        </p>
        <p>
          <strong>Possible next states:</strong><br>
          NONE
        </p>
      </td>
    </tr>
  </tbody>
</table>

### Events

Browsers dispatch a lot of events, but only a small portion of them signal a
possible change in Page Lifecycle state. The table below outlines all events
that pertain to lifecycle and lists what states they may transition to and from.

<table class="blue">
  <thead>
    <tr>
      <th>Name</th>
      <th>Details</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <a id="event-focus"
          href="https://developer.mozilla.org/docs/Web/Events/focus">
          <code>focus</code>
        </a>
      </td>
      <td>
        <p>A DOM element has received focus.</p>
        <p>
          <em><strong>Note:</strong> a <code>focus</code> event does not
          necessarily signal a state change. It only signals a state change if
          the page did not previously have input focus.</em>
        </p>
        <p>
          <strong>Possible previous states:</strong><br>
          <a href="#state-passive">passive</a>
        </p>
        <p>
          <strong>Possible current states:</strong><br>
          <a href="#state-active">active</a>
        </p>
      </td>
    </tr>
    <tr>
      <td>
        <a id="event-blur"
          href="https://developer.mozilla.org/docs/Web/Events/blur">
          <code>blur</code>
        </a>
      </td>
      <td>
        <p>A DOM element has lost focus.</p>
        <p>
          <em><strong>Note:</strong> a <code>blur</code> event does not
          necessarily signal a state change. It only signals a state change if
          the page no longer has input focus (i.e. the page did not just switch
          focus from one element to another).
        </p>
        <p>
          <strong>Possible previous states:</strong><br>
          <a href="#state-active">active</a>
        </p>
        <p>
          <strong>Possible current states:</strong><br>
          <a href="#state-passive">passive</a>
        </p>
      </td>
    </tr>
    <tr>
      <td>
        <a id="event-visibilitychange"
          href="https://developer.mozilla.org/docs/Web/Events/visibilitychange">
          <code>visibilitychange</code>
        </a>
      </td>
      <td>
        <p>The document's
        <a href="https://developer.mozilla.org/docs/Web/API/Document/visibilityState">
        <code>visibilityState</code></a> value has changed. This can
        happen when a user navigates to a new page, switches tabs, closes a tab,
        minimizes or closes the browser, or switches apps on mobile operating
        systems.</p>
        <p>
          <strong>Possible previous states:</strong><br>
          <a href="#state-passive">passive</a><br>
          <a href="#state-hidden">hidden</a>
        </p>
        <p>
          <strong>Possible current states:</strong><br>
          <a href="#state-passive">passive</a><br>
          <a href="#state-hidden">hidden</a>
        </p>
      </td>
    </tr>
    <tr>
      <td>
        <a href="https://wicg.github.io/page-lifecycle/spec.html#sec-api">
          <code>freeze</code>
        </a>
        <strong style="color:red">*</strong>
      </td>
      <td>
        <p>The page has just been frozen. Any
        <a href="https://wicg.github.io/page-lifecycle/spec.html#html-task-source-dfn">
        freezable</a> task in the page's task queues will not be started.</p>
        <p>
          <strong>Possible previous states:</strong><br>
          <a href="#state-hidden">hidden</a>
        </p>
        <p>
          <strong>Possible current states:</strong><br>
          <a href="#state-frozen">frozen</a>
        </p>
      </td>
    </tr>
    <tr>
      <td>
        <a href="https://wicg.github.io/page-lifecycle/spec.html#sec-api">
          <code>resume</code>
        </a>
        <strong style="color:red">*</strong>
      </td>
      <td>
        <p>The browser has resumed a <i>frozen</i> page.</p>
        <p>
          <strong>Possible previous states:</strong><br>
          <a href="#state-frozen">frozen</a>
        </p>
        <p>
          <strong>Possible current states:</strong><br>
          <a href="#state-active">active</a>
            <em>(if followed by the
            <a href="https://developer.mozilla.org/docs/Web/Events/pageshow">
            <code>pageshow</code></a> event)</em><br>
          <a href="#state-passive">passive</a>
            <em>(if followed by the
            <a href="https://developer.mozilla.org/docs/Web/Events/pageshow">
            <code>pageshow</code></a> event)</em><br>
          <a href="#state-hidden">hidden</a>
        </p>
      </td>
    </tr>
    <tr>
      <td>
        <a id="event-pageshow"
          href="https://developer.mozilla.org/docs/Web/Events/pageshow">
          <code>pageshow</code>
        </a>
      </td>
      <td>
        <p>A session history entry is being traversed to.</p>
        <p>This could be either a brand new page load or a page taken from the
          <a href="#back-forward-cache">back/forward cache</a>. If the page
          was taken from the back/forward cache, the event's
          <code>persisted</code> property is <code>true</code>, otherwise it is
          <code>false</code>.
        </p>
        <p>
          <strong>Possible previous states:</strong><br>
          <a href="#state-frozen">frozen</a>
            <em>(a <a href="#event-resume"><code>resume</code></a>
            event would have also fired)</em>
        </p>
        <p>
          <strong>Possible current states:</strong><br>
          <a href="#state-active">active</a><br>
          <a href="#state-passive">passive</a><br>
          <a href="#state-hidden">hidden</a>
        </p>
    </td>
    </tr>
    <tr>
      <td>
        <a id="event-pagehide"
          href="https://developer.mozilla.org/docs/Web/Events/pagehide">
          <code>pagehide</code>
        </a>
      </td>
      <td>
        <p>A session history entry is being traversed from.</p>
        <p>If the user is navigating to another page and the browser is able to add
        the current page to the <a href="#back-forward-cache">back/forward
        cache</a> to be reused later, the event's <code>persisted</code> property
        is <code>true</code>. When <code>true</code>, the page is entering the
        <i>frozen</i> state, otherwise it is entering the <i>terminated</i> state.</p>
        <p>
          <strong>Possible previous states:</strong><br>
          <a href="#state-hidden">hidden</a>
        </p>
        <p>
          <strong>Possible current states:</strong><br>
          <a href="#state-frozen">frozen</a>
            <em>(<code>event.persisted</code> is true, <a href="#event-freeze">
            <code>freeze</code></a> event follows)</em><br>
          <a href="#state-terminated">terminated</a>
            <em>(<code>event.persisted</code> is false,
            <a href="https://developer.mozilla.org/docs/Web/Events/unload">
            <code>unload</code></a> event follows)</em>
        </p>
      </td>
    </tr>
    <tr>
      <td>
        <a id="event-beforeunload"
          href="https://developer.mozilla.org/docs/Web/Events/beforeunload">
          <code>beforeunload</code>
        </a>
      </td>
      <td>
        <p>The window, the document and its resources are about to be unloaded.
        The document is still visible and the event is still cancelable at this
        point.</p>
        <p>
          <em><strong>Important:</strong> the <code>beforeunload</code> event
          should only be used to alert the user of unsaved changes. Once those
          changes are saved, the event should be removed. It should never be
          added unconditionally to the page, as doing so can hurt performance in
          some cases. See the <a href="#legacy-lifecycle-apis-to-avoid">legacy
          APIs section</a> for details.</em>
        </p>
        <p>
          <strong>Possible previous states:</strong><br>
          <a href="#state-hidden">hidden</a>
        </p>
        <p>
          <strong>Possible current states:</strong><br>
          <a href="#state-terminated">terminated</a><br>
        </p>
    </td>
    </tr>
    <tr>
      <td>
        <a id="event-unload"
          href="https://developer.mozilla.org/docs/Web/Events/unload">
          <code>unload</code>
        </a>
      </td>
      <td>
        <p>The page is being unloaded.</p>
        <p>
          <em><strong>Warning:</strong>
          using the <code>unload</code> event is never recommended because it's
          unreliable and can hurt performance in some cases. See the
          <a href="#legacy-lifecycle-apis-to-avoid">legacy APIs section</a>
          for more details.</em>
        </p>
        <p>
          <strong>Possible previous states:</strong><br>
          <a href="#state-hidden">hidden</a>
        </p>
        <p>
          <strong>Possible current states:</strong><br>
          <a href="#state-terminated">terminated</a>
        </p>
      </td>
    </tr>
  </tbody>
</table>

<strong style="color:red">*</strong> Indicates a new event defined by the Page Lifecycle API

### New features added in Chrome 68

The chart above shows two states that are system-initiated rather than
user-initiated: [frozen](#state-frozen) and [discarded](#state-discarded).
As mentioned above, browsers today already occasionally freeze and discard
hidden tabs (at their discretion), but developers have no way of knowing when
this is happening.

In Chrome 68, developers can now observe when a hidden tab is frozen and
unfrozen by listening for the [`freeze`](https://wicg.github.io/page-lifecycle/spec.html#sec-api)
and [`resume`](#event-resume) events on `document`.

```js
document.addEventListener('freeze', (event) => {
  // The page is now frozen.
});

document.addEventListener('resume', (event) => {
  // The page has been unfrozen.
});
```

In Chrome 68 the `document` object also now includes a
[`wasDiscarded`](https://wicg.github.io/page-lifecycle/spec.html#sec-api)
property. To determine whether a page was discarded while in a hidden
tab, you can inspect the value of this property at page load time (note:
discarded pages must be reloaded to use again).

```js
if (document.wasDiscarded) {
  // Page was previously discarded by the browser while in a hidden tab.
}
```

For advice on what things are important to do in the `freeze` and `resume`
events, as well as how to handle and prepare for pages being discarded, see
[developer recommendations for each state](#developer-recommendations-for-each-state).

The next several sections offer an overview of how these new features fit into
the existing web platform states and events.

## Observing Page Lifecycle states in code

In the [active](#state-active), [passive](#state-passive), and [hidden](#state-hidden)
states, it's possible to run JavaScript code that determines the current
Page Lifecycle state from existing web platform APIs.

```js
const getState = () => {
  if (document.visibilityState === 'hidden') {
    return 'hidden';
  }
  if (document.hasFocus()) {
    return 'active';
  }
  return 'passive';
};
```

The [frozen](#state-frozen) and [terminated](#state-terminated) states, on the
other hand, can only be detected in their respective event listener
([`freeze`](#event-freeze) and [`pagehide`](#event-pagehide)) as the state is
changing.

### Observing state changes

Building on the `getState()` function defined above, you can observe all Page
Lifecycle state changes with the following code.

```js
// Stores the initial state using the `getState()` function (defined above).
let state = getState();

// Accepts a next state and, if there's been a state change, logs the
// change to the console. It also updates the `state` value defined above.
const logStateChange = (nextState) => {
  const prevState = state;
  if (nextState !== prevState) {
    console.log(`State change: ${prevState} >>> ${nextState}`);
    state = nextState;
  }
};

// Options used for all event listeners.
const opts = {capture: true};

// These lifecycle events can all use the same listener to observe state
// changes (they call the `getState()` function to determine the next state).
['pageshow', 'focus', 'blur', 'visibilitychange', 'resume'].forEach((type) => {
  window.addEventListener(type, () => logStateChange(getState(), opts);
});

// The next two listeners, on the other hand, can determine the next
// state from the event itself.
window.addEventListener('freeze', () => {
  // In the freeze event, the next state is always frozen.
  logStateChange('frozen');
}, opts);

window.addEventListener('pagehide', (event) => {
  // If the event's persisted property is `true` the page is about
  // to enter the back/forward cache, which is also in the frozen state.
  // If the event's persisted property is not `true` the page is
  // about to be unloaded.
  logStateChange(event.persisted ? 'frozen' : 'terminated');
}, opts);
```

The above code does three things:

- Sets the initial state using the `getState()` function.
- Defines a function that accepts a next state and, if there's a change,
  logs the state changes to the console.
- Adds
  [capturing](https://developer.mozilla.org/docs/Web/API/EventTarget/addEventListener#capture)
  event listeners for all necessary lifecycle events, which in turn call
  `logStateChange()`, passing in the next state.

One thing to note about the above code is that all the event listeners are added
to `window` and they all pass
[`{capture: true}`](https://developer.mozilla.org/docs/Web/API/EventTarget/addEventListener#Syntax).
There are a few reasons for this:

- Not all Page Lifecycle events have the same target. `pagehide`, and
  `pageshow` are fired on `window`; `visibilitychange`, `freeze`, and
  `resume` are fired on `document`, and `focus` and `blur` are fired on their
  respective DOM elements.
- Most of these events do not bubble, which means it's impossible to add
  non-capturing event listeners to a common ancestor element and observe all
  of them.
- The capture phase executes before the target or bubble phases, so adding
  listeners there helps ensure they run before other code can cancel them.

## Developer recommendations for each state

As developers, it's important to both understand Page Lifecycle states _and_
know how to observe them in code because the type of work you should (and should
not) be doing depends largely on what state your page is in.

For example, it clearly doesn't make sense to display a transient notification
to the user if the page is in the hidden state. While this example is pretty
obvious, there are other recommendations that aren't so obvious that are worth
enumerating.

<table class="pink">
  <tr>
    <th>State</th>
    <th>Developer recommendations</th>
  </tr>
  <tr>
    <td><strong><code id="advice-active">Active</code></strong></td>
    <td>
      <p>The <i>active</i> state is the most critical time for the user and thus
      the most important time for your page to be
      <a href="https://developers.google.com/web/updates/2018/05/first-input-delay">
      responsive to user input</a>.</p>
      <p>Any non-UI work that may block the main thread should be deprioritized
      to <a href="https://developers.google.com/web/updates/2015/08/using-requestidlecallback">
      idle periods</a> or <a
      href="https://developers.google.com/web/fundamentals/performance/rendering/optimize-javascript-execution#reduce_complexity_or_use_web_workers">
      offloaded to a web worker</a>.</p>
    </td>
  </tr>
  <tr>
    <td><strong><code id="advice-passive">Passive</code></strong></td>
    <td>
      <p>In the <i>passive</i> state the user is not interacting with the page,
      but they can still see it. This means UI updates and animations should still
      be smooth, but the timing of when these updates occur is less critical.</p>
      <p>When the page changes from <i>active</i> to <i>passive</i>, it's a
      good time to persist unsaved application state.</p>
    </td>
  </tr>
  <tr>
    <td><strong><code id="advice-hidden">Hidden</code></strong></td>
    <td>
      <p>When the page changes from <i>passive</i> to <i>hidden</i>, it's
      possible the user will not interact with it again until it's reloaded.</p>
      <p>The transition to <i>hidden</i> is also often the last state change
      that's reliably observable by developers (this is especially true on
      mobile, as users can close tabs or the browser app itself, and the
      <code>beforeunload</code>, <code>pagehide</code>, and <code>unload</code>
      events are not fired in those cases).</p>
      <p>This means you should treat the <i>hidden</i> state as the likely end to the
      user's session. In other words, persist any unsaved application state
      and send any unsent analytics data.</p>
      <p>You should also stop making UI updates (since they won't be seen
      by the user), and you should stop any tasks that a user wouldn't want
      running in the background.</p>
    </td>
  </tr>
  <tr>
    <td><strong><code id="advice-frozen">Frozen</code></strong></td>
    <td>
      <p>In the <i>frozen</i> state,
      <a href="https://html.spec.whatwg.org/multipage/webappapis.html#queue-a-task">
      freezable tasks</a> in the
      <a href="https://html.spec.whatwg.org/multipage/webappapis.html#task-queue">
      task queues</a> are suspended until the page is unfrozen &mdash; which may
      never happen (e.g. if the page is discarded).</p>
      <p>This means when the page changes from <i>hidden</i> to <i>frozen</i>
      it's essential that you stop any timers or tear down any connections that,
      if frozen, could affect other open tabs in the same origin, or affect the
      browser's ability to put the page in the <a href="#back-forward-cache">
      back/forward cache</a>.<p>
      <p>In particular, it's important that you:</p>
      <ul>
        <li>Close all open
          <a href="https://developer.mozilla.org/docs/Web/API/IndexedDB_API">
          IndexedDB</a> connections.</li>
        <li>Close open
          <a href="https://developer.mozilla.org/docs/Web/API/Broadcast_Channel_API">
          BroadcastChannel</a> connections.</li>
        <li>Close active <a href="https://developer.mozilla.org/docs/Web/API/WebRTC_API">
          WebRTC</a> connections.</li>
        <li>Stop any network polling or close any open
          <a href="https://developer.mozilla.org/docs/Web/API/WebSockets_API">
          Web Socket</a> connections.</li>
        <li>Release any held <a href="https://github.com/inexorabletash/web-locks">
          Web Locks</a>.</li>
      </ul>
      <p>You should also persist any dynamic view state (e.g. scroll position
      in an infinite list view) to
      <a href="https://developer.mozilla.org/docs/Web/API/Window/sessionStorage">
      <code>sessionStorage</code></a> (or
      <a href="#save-data-to-indexeddb-before-freezing">IndexedDB via
      <code>commit()</code></a>) that you'd want restored if the page were
      discarded and reloaded later.</p>
      <p>If the page transitions from <i>frozen</i> back to <i>hidden</i>,
      you can reopen any closed connections or restart any polling you
      stopped when the page was initially frozen.</p>
    </td>
  </tr>
  <tr>
    <td><strong><code id="advice-terminated">Terminated</code></strong></td>
    <td>
      <p>You generally do not need to take any action when a page transitions
      to the <i>terminated</i> state.</p>
      <p>Since pages being unloaded as a result of user action always go
      through the <i>hidden</i> state before entering the <i>terminated</i>
      state, the <i>hidden</i> state is where session-ending logic (e.g.
      persisting application state and reporting to analytics) should be
      performed.</p>
      <p>Also (as mentioned in the <a href="#advice-hidden">recommendations for
      the <i>hidden</i> state</a>), it's very important for developers to realize
      that the transition to the <i>terminated</i> state cannot be reliably
      detected in many cases (especially on mobile), so developers who depend
      on termination events (e.g. <code>beforeunload</code>,
      <code>pagehide</code>, and <code>unload</code>) are likely losing data.</p>
   </td>
  </tr>
  <tr>
    <td><strong><code id="advice-discarded">Discarded</code></strong></td>
    <td>
      <p>The <i>discarded</i> state is not observable by developers at the
      time a page is being discarded. This is because pages are typically
      discarded under resource constraints, and unfreezing a page just to allow
      script to run in response to a discard event is simply not possible in
      most cases.</p>
      <p>As a result, you should prepare for the possibility of a discard in
      the change from <i>hidden</i> to <i>frozen</i>, and then you can
      react to the restoration of a discarded page at page load time by
      checking <code>document.wasDiscarded</code>.
    </td>
  </tr>
</table>

Once again, since reliability and ordering of lifecycle events is not
consistently implemented in all browsers, the easiest way to follow the advice
in the table above is to use
[PageLifecycle.js](https://github.com/GoogleChromeLabs/page-lifecycle).

## Legacy lifecycle APIs to avoid

### The unload event

{% Aside 'warning' %}
Never use the `unload` event on modern browsers.
{% endAside %}

Many developers treat the `unload` event as a guaranteed callback and use it as
an end-of-session signal to save state and send analytics data, but doing this
is **extremely unreliable**, especially on mobile! The `unload` event does not
fire in many typical unload situations, including closing a tab from the tab
switcher on mobile or closing the browser app from the app switcher.

For this reason, it's always better to rely on the
[`visibilitychange`](#event-visibilitychange) event to determine when a session
ends, and consider the hidden state the
[last reliable time to save app and user data](#advice-hidden).

Furthermore, the mere presence of a registered `unload` event handler (via
either `onunload` or `addEventListener()`) can prevent browsers from being able
to put pages in the [back/forward cache](#back-forward-cache) for faster
back and forward loads.

In all modern browsers, it's recommended to always use the
[`pagehide`](#event-pagehide) event to detect possible page unloads (a.k.a the
[terminated](#state-terminated) state) rather than the `unload` event. If you
need to support Internet Explorer versions 10 and lower, you should feature
detect the `pagehide` event and only use `unload` if the browser doesn't support
`pagehide`:

```js
const terminationEvent = 'onpagehide' in self ? 'pagehide' : 'unload';

window.addEventListener(terminationEvent, (event) => {
  // Note: if the browser is able to cache the page, `event.persisted`
  // is `true`, and the state is frozen rather than terminated.
});
```

### The beforeunload event

{% Aside 'caution' %}
Never add a `beforeunload` listener unconditionally or use it as an
end-of-session signal. Only add it when a user has unsaved work, and remove
it as soon as that work has been saved.
{% endAside %}

The `beforeunload` event has a similar problem to the `unload` event, in that
when present it prevents browsers from caching the page in their
[back/forward cache](#back-forward-cache).

The difference between `beforeunload` and `unload`, though, is that there are
legitimate uses of `beforeunload`. For instance, when you want to warn the user
that they have unsaved changes they'll lose if they continue unloading the page.

Since there are valid reasons to use `beforeunload` but using it prevents pages
from being added to the back/forward cache, it's recommended that you _only_
add `beforeunload` listeners when a user has unsaved changes and then remove
them immediately after the unsaved changes are saved.

In other words, don't do this (since it adds a `beforeunload` listener
unconditionally):

```js
addEventListener('beforeunload', (event) => {
  // A function that returns `true` if the page has unsaved changes.
  if (pageHasUnsavedChanges()) {
    event.preventDefault();
    return (event.returnValue = 'Are you sure you want to exit?');
  }
});
```

Instead do this (since it only adds the `beforeunload` listener when it's
needed, and removes it when it's not):

```js
const beforeUnloadListener = (event) => {
  event.preventDefault();
  return (event.returnValue = 'Are you sure you want to exit?');
};

// A function that invokes a callback when the page has unsaved changes.
onPageHasUnsavedChanges(() => {
  addEventListener('beforeunload', beforeUnloadListener);
});

// A function that invokes a callback when the page's unsaved changes are resolved.
onAllChangesSaved(() => {
  removeEventListener('beforeunload', beforeUnloadListener);
});
```

## FAQs

**Why isn't there a "loading" state?**

The Page Lifecycle API defines states to be discrete and mutually exclusive.
Since a page can be loaded in either the active, passive, or hidden state, and
since it can change states—or even be terminated—before it finishes loading, a
separate loading state does not make sense within this paradigm.

**My page does important work when it's hidden, how can I stop it from being frozen or discarded?**

There are lots of legitimate reasons web pages shouldn't be frozen while running
in the hidden state. The most obvious example is an app that plays music.

There are also situations where it would be risky for Chrome to discard a page,
like if it contains a form with unsubmitted user input, or if it has a
`beforeunload` handler that warns when the page is unloading.

For the moment, Chrome is going to be conservative when discarding pages and
only do so when it's confident it won't affect users. For example, pages that
have been observed to do any of the following while in the hidden state will not
be discarded unless under extreme resource constraints:

- Playing audio
- Using WebRTC
- Updating the table title or favicon
- Showing alerts
- Sending push notifications

For the current list features used to determine whether a tab can be safely
frozen or discarded, see: [Heuristics for Freezing &amp; Discarding](https://docs.google.com/document/d/1QJpuBTdllLVflMJSov0tlFX3e3yfSfd_-al2IBavbQM/edit?usp=sharing)
in Chrome.

{% Aside %}
In the case of pages that update the title or favicon to alert users of unread
notifications, we currently have a
[proposal to enable
these kinds of updates from service worker](https://github.com/WICG/page-lifecycle/issues/24), which would allow Chrome to
freeze or discard the page but still show changes to the tab title or favicon.
{% endAside %}

<strong id="back-forward-cache">What is the back/forward cache?<strong>

The [back/forward cache](https://web.dev/bfcache/) is a term used to describe a
navigation optimization some browsers implement that makes using the back and
forward buttons faster.

When a user navigates away from a page, these browsers freeze a version of that
page so that it can be quickly resumed in case the user navigates back using
the back or forward buttons. Remember that adding a `beforeunload` or `unload`
event handler [prevents this optimization from being
possible](#legacy-lifecycle-apis-to-avoid).

For all intents and purposes, this freezing is functionally the same as
the freezing browsers perform to conserve CPU/battery; for that reason it's
considered part of the [frozen](#state-frozen) lifecycle state.

**If I can't run asynchronous APIs in the frozen or terminated states, how can I save data to IndexedDB?**

In frozen and terminated states,
[freezable tasks](https://wicg.github.io/page-lifecycle/spec.html#html-task-source-dfn)
in a page's [task queues](https://html.spec.whatwg.org/multipage/webappapis.html#task-queue)
are suspended, which means asynchronous and callback-based APIs such as IndexedDB
cannot be reliably used.

In the future, we will [add a `commit()` method to
`IDBTransaction`](https://github.com/w3c/IndexedDB/pull/242) objects, which will
give developers a way to perform what are effectively write-only transactions
that don't require callbacks. In other words, if the developer is just writing
data to IndexedDB and not performing a complex transaction consisting of reads
and writes, the `commit()` method will be able to finish before task queues are
suspended (assuming the IndexedDB database is already open).

For code that needs to work today, however, developers have two options:

- **Use Session Storage:** [Session Storage](https://developer.mozilla.org/docs/Web/API/Window/sessionStorage)
  is synchronous and is persisted across page discards.
- **Use IndexedDB from your service worker:** a service worker can store data in
  IndexedDB after the page has been terminated or discarded. In the `freeze` or
  `pagehide` event listener you can send data to your service worker via
  [`postMessage()`](https://googlechrome.github.io/samples/service-worker/post-message/),
  and the service worker can handle saving the data.

{% Aside %}
While the second option above will work, it's not ideal in situations where
the device is freezing or discarding the page due to memory pressure since
the browser may have to wake up the service worker process, which will put
more strain on the system.
{% endAside %}

## Testing your app in the frozen and discarded states

To test how your app behaves in the frozen and discarded states, you can visit
[chrome://discards](chrome://discards) to actually freeze or discard any of your
open tabs.

<figure>
  <a href="https://wd.imgix.net/image/eqprBhZUGfb8WYnumQ9ljAxRrA72/3XJWjEWVr0g36h8H1eJr.png">
    {% Img src="image/eqprBhZUGfb8WYnumQ9ljAxRrA72/3XJWjEWVr0g36h8H1eJr.png", alt="Chrome Discards UI", width="800", height="142" %}
  </a>
</figure>

This allows you to ensure your page correctly handles the `freeze` and `resume`
events as well as the `document.wasDiscarded` flag when pages are reloaded after
a discard.

## Summary

Developers who want to respect the system resources of their user's devices
should build their apps with Page Lifecycle states in mind. It's critical that
web pages are not consuming excessive system resources in situations that the
user wouldn't expect

The more developers start implementing the new Page Lifecycle APIs, the safer it
will be for browsers to freeze and discard pages that aren't being used. This
means browsers will consume less memory, CPU, battery, and network resources,
which is a win for users.
