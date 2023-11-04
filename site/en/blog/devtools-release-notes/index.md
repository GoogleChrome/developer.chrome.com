---
layout: 'layouts/blog-post.njk'
title:  What's new in DevTools (Chrome 58)
description: >
     New features and changes coming to DevTools in Chrome 58.
authors:
  - kaycebasques
date: 2017-03-06
updated: 2018-10-23
---

Welcome to the first installment of the DevTools release notes! From here on
out, the first time you open a new version of Chrome, DevTools opens the
**What's New** drawer with a link to the release notes for that version.

## Highlights

* The Timeline panel has been renamed to the Performance panel.
* The Profiles panel has been renamed to the Memory panel.
* Cookie values are now editable.
* DevTools now automatically pauses before out-of-memory errors.

## New features

### Editable cookies 

Double-click on a cell in the **Cookies** tab to edit that value.

<figure>
    {% Img src="image/T4FyVKpzu4WKF1kBNvXepbi08t52/A7JFFeVfhvHpAOnyOJFX.png", alt="Editing a cookie.", width="800", height="523" %}
  <figcaption>
    <b>Figure 1</b>. Editing a cookie
  </figcaption>
</figure>

Thanks to [kdzwinel](https://twitter.com/kdzwinel) for the contribution!

### Inspectable and editable CSS variables in the Styles pane

You can now inspect and edit CSS variables in the Styles pane. See [CSS
Variables Demo][css vars] to try it out yourself.

[css vars]: https://googlechrome.github.io/devtools-samples/author/css-vars

### Out-of-memory breakpoints

When an app allocates a lot of memory in a short amount of time, DevTools now
automatically pauses and increases the heap limit. This enables you to inspect
the heap, execute commands on the Console to free up memory, and continue
debugging the issue. See [One Small Step For Chrome, One Giant Heap For
V8][heap] for more information.

<figure>
  {% Img src="image/T4FyVKpzu4WKF1kBNvXepbi08t52/UEBwL73H2UHOKfIFNhgn.png", alt="Paused on an out-of-memory breakpoint", width="800", height="577" %}
  <figcaption>
    <b>Figure 2</b>. Paused on an out-of-memory breakpoint
  </figcaption>
</figure>

[heap]: https://v8.dev/blog/heap-size-limit

### Breakpoints on canvas creation

You can now create [event listener breakpoints][event-listener-breakpoint]
that are triggered whenever a new canvas context is created.

<figure>
  {% Img src="image/T4FyVKpzu4WKF1kBNvXepbi08t52/G9slpKlyZK0BSPEHe2Br.png", alt="Canvas creation breakpoints via the Create canvas
    context checkbox in the Event Listener Breakpoints pane", width="800", height="585" %}
  <figcaption>
    <b>Figure 3</b>. Canvas creation breakpoints via the <b>Create canvas
    context</b> checkbox in the <b>Event Listener Breakpoints</b> pane
  </figcaption>
</figure>

[event-listener-breakpoint]: https://developers.google.com/web/tools/chrome-devtools/javascript/breakpoints#event-listeners

### Start time stats in the Timing tab

At the top of the Timing tab, you can now see when a request was queued and
started.

<figure>
  {% Img src="image/T4FyVKpzu4WKF1kBNvXepbi08t52/Hs95cwVcMxw6dM4Kb7f2.svg", alt="Start time stats in the Timing tab.", width="242", height="150" %}
  <figcaption>
    <b>Figure 4</b>. Start time stats in the Timing tab
  </figcaption>
</figure>

### Server stats in the Timing tab

You can now insert custom server statistics into the Timing tab. See
[Demo of server timing values][server] for an example.

[server]: https://gist.github.com/paulirish/a76ac17fc211b019e538c09d8d827691

<figure>
  {% Img src="image/T4FyVKpzu4WKF1kBNvXepbi08t52/3SQM9qEYYdfXq5OGfSh1.svg", alt="Server stats in the Timing tab", width="220", height="150" %}
  <figcaption>
    <b>Figure 5</b>. Server stats in the <b>Timing</b> tab
  </figcaption>
</figure>

Thanks to [sroussey](https://twitter.com/sroussey) for the contribution!

## Changes

### The Timeline panel is now the Performance panel

The Timeline panel has been renamed to the Performance panel, to better
reflect its purpose.

### The Profiles panel is now the Memory panel

The Profiles panel has been renamed to the Memory panel, to better
reflect its purpose.

### The CPU Profiler is behind a hidden panel

Now that the Profiles panel is called the Memory panel, it doesn't really
make sense to have the CPU profiler on that panel anymore. Furthermore,
the long-term goal is to get all users profiling from the Performance panel.
In the meantime, you can still access the old CPU profiler from
[**Settings**][settings] > **More Tools** > **JavaScript Profiler**.

See [Chrome DevTools: JavaScript CPU Profiling in Chrome 58][migration]
to learn how to profile CPU in the Performance panel.

[settings]: https://developers.google.com/web/tools/chrome-devtools/ui#settings
[migration]: https://developers.google.com/web/updates/2016/12/devtools-javascript-cpu-profile-migration

### New Console UI

The Console panel and drawer have undergone some UI changes. Some unpopular features
have been moved to more hidden locations, and popular features are now more
easily accessible.

* Click **Console Settings** ![Console Settings][console settings]{:.devtools-inline} to
  access settings for customizing the Console's behavior.
* **Preserve log** is now hidden in **Console Settings**.
* The **Filters** button and pane is gone. Use the dropdown menu instead.
* The text box for filtering logs is now always shown. It was previously
  hidden in the Filters pane.
* The filtering text box automatically accepts RegEx, so the
  **Regex** checkbox is gone.
* The **Hide violations** checkbox is gone. Set the logging level dropdown to
  **Verbose** to see violations.
* Unchecking the **Show all messages** checkbox in the old UI is equivalent
  to checking the **Selected context only** checkbox in **Console Settings**
  in the new UI.

<figure>
  {% Img src="image/T4FyVKpzu4WKF1kBNvXepbi08t52/C2gTGQer3lTnHyJJcaLX.png", alt="The new Console UI", width="800", height="515" %}
  <figcaption>
    <b>Figure 6</b>. The new Console UI
  </figcaption>
</figure>

[console settings]: https://developers.google.com/web/updates/images/2017/03/console-settings.png

### WebGL event listener breakpoints have moved 

The WebGL [event listener breakpoints][event-listener-breakpoint]
have moved from the **WebGL** category to the **Canvas** category. The
**WebGL** category has been removed.

