---
layout: "layouts/doc-post.njk"
title: "Sensors: Emulate device sensors"
authors:
  - kaycebasques
  - sofiayem
date: 2018-12-18
updated: 2023-01-03
description: "Use the Sensors tab to override geolocation, simulate device orientation, force touch, and emulate idle state."
tags:
  - emulate
  - test
---

{% YouTube id='7ma_ZyfrgYM' %}

Use the **Sensors** tab to emulate sensor input of any device:

- [Override geolocation](#geolocation).
- [Simulate orientation](#orientation).
- [Force touch](#touch).
- [Emulate idle detector state](#idle).

{% Aside 'gotchas' %}
To emulate a viewport of a mobile device and throttle the network and CPU, see [Device Mode](/docs/devtools/device-mode/).
{% endAside %}

## Open the Sensors tab {: #open-sensors }

1.  Depending on your operating system, press the following to open the Command Menu:

    - On MacOS, <kbd>Command</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd>
    - On Windows, Linux, or ChromeOS, <kbd>Control</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd>

    {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/6035bGpBX27LK8A0KNjh.png", alt="Using the Command Menu to open the Sensors tab.", width="800", height="399" %}

1.  Type `sensors`, select **Show Sensors**, and press <kbd>Enter</kbd>. The **Sensors** tab opens up at the bottom of your DevTools window.

## Override geolocation {: #geolocation }

Many websites take advantage of [user location][5] in order to provide a more relevant experience for their users. For example, a weather website might show the local forecast for a user's area, once the user has granted the website permission to access their location.

If you're building a UI that changes depending on where the user is located, you probably want to make sure that the site behaves correctly in different places around the world.

To override your geolocation, [open the **Sensors** tab](#open-sensors) and, from the **Geolocation** list select one of the following:

- One of the preset cities, like **Tokyo**.
- **Custom location** to enter custom longitude and latitude coordinates.
- Select **Location unavailable** to see how your site behaves when the user's location is not available.

{% Img src="image/admin/GLnD87xLckOcCq7Uxi8P.png", alt="Selecting 'Tokyo' from the 'Geolocation' list.", width="800", height="670" %}

## Simulate device orientation {: #orientation }

To simulate different [device orientations][1], [open the **Sensors** tab](#open-sensors), and, from the **Orientation** list, select one of the following:

- One of the preset orientations, like **Portrait upside down**.
- **Custom orientation** to provide your own exact orientation.

{% Img src="image/admin/y5lnWi2Sa77ADlcTea2h.png", alt="Selecting 'Portrait upside down' from the 'Orientation' list.", width="800", height="663" %}

After selecting **Custom orientation** the **alpha**, **beta**, and **gamma** fields are
enabled. See [Alpha][2], [Beta][3], and [Gamma][4] to understand how these axes work.

You can also set a custom orientation by dragging the **Orientation Model**. Hold
<kbd>Shift</kbd> before dragging to rotate along the **alpha** axis.

{% Img src="image/admin/Dq2YzD2HbRXAyyrSHDun.png", alt="The Orientation Model.", width="800", height="648" %}

## Force touch {: #touch }

To test touch events on your website, you can force touch instead of click even if you're testing on a device without a touch screen.

To trigger touch events with your pointer:

1. [Open the **Sensors** tab](#open-sensors).
1. Under the **Touch** drop-down list, select **Force touch**.
   {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/aOVp4dObnNiISmub1K9H.png", alt="Forcing touch instead of click.", width="800", height="441" %}
1. Click **Reload DevTools** in the prompt at the top.

## Emulate idle detector state {: #idle }

The [Idle Detection API](/articles/idle-detection/) lets you detect inactive users and react on idle state changes. With DevTools, you can emulate idle state changes for both the user state and screen state instead of waiting for the actual idle state to change.

To emulate idle states:

1. [Open the **Sensors** tab](#open-sensors). For this tutorial, you can try it on this [demo page](https://idle-detection.glitch.me/).

1. Enable the checkbox next to *Ephemeral* and, in the prompt, grant the demo page the idle detection permission. Then, reload the page.

   {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/1ymZFoBUlCOuksgUirQj.png", alt="Granting the idle detection permission on a demo page.", width="800", height="440" %}

1. Under the **Emulate Idle detector State** drop-down, select one of the following:

   - No idle emulation
   - User active, screen unlocked
   - User active, screen locked
   - User idle, screen unlocked
   - User idle, screen locked

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/VVIvEubB2xO35NcYYSEF.png", alt="Selecting an idle and locked state on a demo page.", width="800", height="395" %}

In this example, DevTools emulates an **User idle, screen locked** state and, in this case, the demo page starts the 10 second countdown to clear the canvas.


[1]: https://web.dev/device-orientation/
[2]: https://web.dev/device-orientation/#alpha
[3]: https://web.dev/device-orientation/#beta
[4]: https://web.dev/device-orientation/#gamma
[5]: https://web.dev/user-location/
