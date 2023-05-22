---
title: "The Chromium Chronicle #32: Mind the patch gap"
description: >
  Learn how Chromium developers can reduce the chance of n-day exploitation.
layout: 'layouts/blog-post.njk'
date: 2023-02-03
hero: 'image/0g2WvpbGRGdVs0aAPc6ObG7gkud2/hgu6uTktp2ipmuODZZhP.jpg'
alt: >
  The Chromium Chronicle
tags:
  - chromium-chronicle
---

**Episode 32:** by Amy Ressler in Mountain View, USA (February, 2023)<br>
[Previous episodes](/tags/chromium-chronicle/)

So you've just fixed a security bug in Chrome! Congratulations and thank you for making Chrome more secure for all users. But wait, your work is not done just yet. Only you can help mind the patch gap.

## What's the patch gap?

The _patch gap_ is the critical time between when you land the security fix and when the fix is shipped to users in a Stable channel update of Chrome.   

When you land a fix in Chromium, that fix is publicly available to anyone that monitors our source code repositories—including bad actors and exploit brokers. 

{% Img src="image/kheDArv5csY6rvQUJDbWRscckLr1/d8CqZbOXm1MJVLiquKNc.png", alt="The stages between a fix being landed and shipped, which are described as the patch gap.", width="800", height="185" %}

Bad actors work quickly to take advantage of that time between the landed changelist (CL) and users having access to that patch in a stable channel update, reverse engineering the CL to develop an exploit to leverage or sell for use against potential victims. This is called _n-day exploitation_.   

While we can't completely remove the potential of n-day exploitation, reducing the time between the fix being landed and that fix shipping in a Stable channel update of Chrome makes life much harder for those bad actors and greatly reduces the potential for n-day exploitation.   

## How can you help prevent n-day exploitation?

Mind the patch gap and do the following things.

### Update security bugs to Status=Fixed quickly

As soon as you have landed the CL with the security fix, update it to `Status=Fixed`. 

This allows the Sheriffbot automation to [update the bug](https://bugs.chromium.org/p/chromium/issues/detail?id=1369882#c19) with the appropriate merge request labels based on security severity and impact. 

### Provide full details about stability or compatibility issues 

Provide these details [in response](https://bugs.chromium.org/p/chromium/issues/detail?id=1369871#c16) to the Sheriffbot merge questionnaire. Only consider avoiding back merging if there is risk to Chrome.

A security bug that has been around for a long time is not a valid reason to avoid backmerging. It's just become cheaper and much easier to exploit as an n-day.

### Land merges as soon as they are approved

Our best defence is to ship quickly.

### Don't attempt to hide or obfuscate code or commit messages

N-day attackers are smart and will work around this. 

### Reach out to the security team 

If you have any questions or concerns, contact the [security team](mailto:chrome-security@google.com) for help. 

Thank you for minding the patch, because only you can help prevent n-day exploitation. 

