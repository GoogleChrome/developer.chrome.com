---
layout: 'layouts/doc-post.njk'
title: 'Troubleshoot FLEDGE'
subhead: >
  Troubleshoot worklets and observe FLEDGE events.
description: >
  Troubleshoot worklets and observe FLEDGE events.
date: 2022-10-29
authors:
  - samdutton
  - alexandrawhite
---

From Chrome Canary 98.0.4718.0, it's possible to debug FLEDGE and FLEDGE
worklets in Chrome DevTools.

Read the [developer guide](/blog/fledge-api) for the full life cycle of FLEDGE. 
Not a developer? Refer to the
[FLEDGE API overview](/docs/privacy-sandbox/fledge).

## FLEDGE worklets {: #debugging }

The first step is to set breakpoints via a new category in the
**Event Listener Breakpoints** pane in the **Sources** panel.

{% Img
  src="image/80mq7dk16vVEg8BBhsVe42n6zn82/x0jhCIMB8L8tV9bcpkPi.png",
  alt="DevTools in Chrome Canary, highlighting the Event Listener Breakpoints pane in the Sources panel. The Bidder Bidding Phase Start is selected under ad auction worklet.",
  width="800", height="549"
%}

When a breakpoint triggers, execution is paused before the first statement at
the top-level of the worklet script. You can use regular breakpoints or step
commands to get to the bidding/scoring/reporting function itself.

Live worklet scripts will also show up under the Threads panel.

<figure>
{% Img src="image/80mq7dk16vVEg8BBhsVe42n6zn82/yJYTFRRcPmVse2teuc7u.png",
alt="Screenshot of DevTools in Chrome Canary, highlighting the Threads pane in the Sources panel, showing the current worklet script that has been paused.", width="800", height="537" %}
</figure>

Since some worklets may run in parallel, multiple threads may end up in the
"paused" state. You can use the thread list to switch between threads, and
resume or inspect them more closely as appropriate.

### Observe events

From the Application panel in Chrome DevTools, you can observe FLEDGE interest
group and auction events.

If you visit the [FLEDGE demo shopping site](https://shopping-fledge-demo.glitch.me/advertiser/shopping.html)
in a browser with FLEDGE enabled, DevTools will display information about the `join` event.

<figure>
{% Img
  src="image/80mq7dk16vVEg8BBhsVe42n6zn82/3jI5bJh8XKiZP5WHMBYl.png",
  alt="The DevTools Application panel displaying information about a FLEDGE interest group join event.", width="800", height="402"
%}
</figure>

Now, if you visit the
[FLEDGE demo publisher site](https://publisher-fledge-demo.glitch.me/publisher/index.html?fencedframe)
in a browser with FLEDGE enabled, DevTools displays information about the `bid`
and `win` events.

{% Img
  src="image/80mq7dk16vVEg8BBhsVe42n6zn82/wMvNrY9GrcD2p3Q6wTsw.png",
  alt="The DevTools Application panel in Chrome Canary, showing information about FLEDGE auction bid and win events.", width="800", height="482"
%}

{% Aside %}
You'll need to refresh the page to see FLEDGE events if DevTools wasn't open
when you navigated to the site.
{% endAside %}

## All FLEDGE API references

{% Partial 'privacy-sandbox/fledge-api-reference.njk' %}

{% Partial 'privacy-sandbox/fledge-api-next.njk' %}
