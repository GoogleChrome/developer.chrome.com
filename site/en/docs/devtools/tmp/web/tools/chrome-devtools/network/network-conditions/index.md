---
layout: "layouts/doc-post.njk"
title: "Optimize Performance Under Varying Network Conditions"
authors:
  - megginkearney
  - jonathangarbee
date: 2015-04-13
updated: 2020-07-10
description: "It’s easy to overlook the network conditions your users will face on mobile. Use DevTools to emulate different network conditions. Fix any load time issues and your users will thank you."
---

!!!.aside.aside--note

**Note:** This page is deprecated. At the top of each section, there's a link to an up-to-date page
where you can find similar information.

!!!

It's easy to overlook the network conditions your users will face on mobile. Use DevTools to emulate
different network conditions. Fix any load time issues and your users will thank you.

## TL;DR {: #tldr }

- Without affecting traffic to other tabs, evaluate your site''s performance using the Chrome
  DevTools network emulator.
- Use custom profiles that are specific to your audiences network conditions.

## Emulate network connectivity {: #emulate_network_connectivity }

!!!.aside.aside--note

**Note:** This page is deprecated. See [Simulate network throttling][1] for up-to-date information.

!!!

Network conditioning allows you to test your site on a variety of network connections, including
Edge, 3G, and even offline. It throttles the maximum download and upload throughput (rate of data
transfer). Latency manipulation enforces a minimum delay in connection round-trip time (RTT).

Network Conditioning is turned on through the Network panel. Select a connection from the dropdown
to apply network throttling and latency manipulation.

{% Img src="image/admin/hZEMOFLM0jJ58u0PwTSn.png", alt="Select Network Throttle", width="777", height="327" %}

**Tip**: You can also set network throttles via the [Network conditions][2] drawer.

When a Throttle is enabled the panel indicator will show a warning icon. This is to remind you that
throttling is enabled when you are in other panels.

{% Img src="image/admin/1LjQ7mKyGxHJQK2qkchV.png", alt="Network Panel Selector With Warning Indicator", width="773", height="177" %}

## Custom throttles {: #custom_throttles }

!!!.aside.aside--note

**Note:** This page is deprecated. See [Simulate network throttling][3] for up-to-date information.

!!!

DevTools provides a solid foundation of default conditions. You may need to add custom conditions to
cover your audiences primary conditions.

To add a condition open the dropdown to apply a condition. Under the **custom** header find and
select the **Add...** option. This will open the DevTools settings dialog with the "Throttling" tab
open.

{% Img src="image/admin/gS3cf5Jxj34IcTEzQTT3.png", alt="Throttle Settings Index", width="775", height="667" %}

First, click the **Add custom profile** button. This opens an inline form to supply the profiles
conditions. Accurately fill the form out then press the **Add** button when it meets your needs.

{% Img src="image/admin/qsOQLikFF9LTe05nER5Y.png", alt="Throttle Settings Add Custom Throttle", width="777", height="665" %}

You may modify an existing custom profile by hovering the entry. On hover the **Edit** and
**Delete** icons are shown to the right of the entry.

{% Img src="image/admin/r42Rnl6AjtsaORHp9sye.png", alt="Throttle Settings Modify Custom Entry", width="778", height="221" %}

Now you may close the settings dialog. Your new custom profiles will be shown under the **custom**
header to select a condition.

## Open the network conditions drawer {: #network-conditions }

!!!.aside.aside--note

**Note:** This page is deprecated. See [Network Conditions drawer][4] for up-to-date information.

!!!

You can access network functions while other DevTools panels are open with the **Network
conditions** drawer.

{% Img src="image/admin/GVyF4Ey3YVnMTi0kMpou.png", alt="the network conditions drawer", width="800", height="404" %}

Access the drawer from the DevTools main menu (**Main Menu** > **More Tools** > **Network
Conditions**).

{% Img src="image/admin/T7aIZLEOJdfxVom2IvId.png", alt="opening the network conditions drawer", width="706", height="419" %}

[1]: /web/tools/chrome-devtools/network/reference#throttling
[2]: #network-conditions
[3]: /web/tools/chrome-devtools/network/reference#throttling
[4]: /web/tools/chrome-devtools/network/reference#network-conditions
