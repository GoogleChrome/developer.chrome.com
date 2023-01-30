---
layout: 'layouts/blog-post.njk'
title: Longer extension service worker lifetimes
description: >
  Extension service workers can now stay alive as long as they're receiving events. This increases the reliability of extension services workers, but has a pitfall you should avoid. 
subhead: >
  Extension service workers can now stay alive as long as they're receiving events. This increases the reliability of extension services workers, but has a pitfall you should avoid.
date: 2023-01-27
authors:
  - joemedley
tags:
  - extensions-news
  - chrome110
hero: image/sQ51XsLqKMgSQMCZjIN0B7hlBO02/iND6W98T4Ve3pWoj4Xq5.jpeg
alt: >
  A picture of an hourglass.
---

Starting in Chrome 110 (in beta as of February 7, 2023), extension service workers stay alive as long as they're receiving events. This corrects a timing problem in the previous implementation of extension service workers. It was possible for timeouts to occur when new events were in the event queue and for the timeouts to truncate asynchronous work. This improvement removes the hard five-minute maximum lifetime for extension service workers. 

This article describes how these behaviors have changed.

## Background

Extension service workers mostly behave like web service workers, but in addition to [service worker events](https://developer.mozilla.org/docs/Web/API/ServiceWorkerGlobalScope#events), extension service workers can also listen to extension events. While normal service worker events extend the service worker's lifetime, before the release of 110 only a few extension platform events kept an extension service worker alive.

Normally, Chromium terminates a service worker after one of the following conditions is met:

* The service worker has not received an event for over thirty seconds and there are no outstanding long running tasks in progress. If a service worker received an event during that time, the idle timer was removed.
* A long running task has taken over five minutes to complete and no events have been received in the past thirty seconds.

New service worker events received before the idle timer or long running task timer expire would reset the timers and extend the service worker's lifetime.

Unfortunately, this behavior did not apply to extension events. Extension events could wake an extension service worker, and keep it alive until the event completes, but it could not extend the thirty second idle timer. This effectively meant that extension service workers could be terminated any time after the last extension event completed, even if the browser had just dispatched a new event to the extension.

## What's changed

As of Chrome 110, all events reset the lidle timer and the idle timeout will not occur if there are pending events. In other words, assuming there are no unexpected interruptions, extension service workers will now stay alive as long as they are actively processing events.

While this change removes the five minute limit on extension service worker lifetimes, you are still strongly encouraged to design your extensions to be event-based and guard against unexpected termination. Not only should you refrain from keeping your extensions alive indefinitely (which we consider an anti-pattern), you should test your extensions to ensure that they're not doing this unintentionally.

In a future release, we may change how specific events are processed to prevent keeping service workers alive indefinitely, but without shutting down long-running work. In the meantime, make sure your extensions yield when possible and prepare for termination by persisting extension states. 

<p>Photo by <a href="https://unsplash.com/@pguerreiro?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Paula Guerreiro</a> on <a href="https://unsplash.com/photos/W2atfIRHDIk?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a></p>
  
