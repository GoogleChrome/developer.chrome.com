---
layout: "layouts/doc-post.njk"
title: "Devices"
authors:
  - sofiayem
date: 2023-02-16
#updated: YYYY-MM-DD
description: "Devices tab reference."
---

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/9gzXiTYY0nZzBxGI6KrV.svg", alt="Settings.", width="24", height="24" %} [**Settings**](/docs/devtools/settings/#open) > **Devices** list devices and their dimensions. You can select these devices from the **Dimensions** drop-down list in [device mode](/docs/devtools/device-mode/#device).

## Add a device to the Devices list {: #add-device }

To add a device to the list:

1. [Open Settings](/docs/devtools/settings/#open).
1. In the **Device** tab, enable the checkbox next to a device you want to add.

   {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/81OxvjyGhfLMe1UZFJQX.png", alt="A list of enabled devices in the Devices tab.", width="800", height="606" %}

## Add a custom device {: #add-custom-device }

If you don't see a device you want to test, add a custom one:

1. [Open Settings](/docs/devtools/settings/#open).
1. In the **Device** tab, click **Add custom device**.
1. Specify the device details, for example, as shown on the screenshot:

   {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/saf99v91L29TNeFEAKev.png", alt="Pixel 7 Pro device details.", width="800", height="1039" %}

   {% Aside 'gotchas' %}
   For more information on what to specify, see [User-Agent Client Hints](https://web.dev/user-agent-client-hints/).
   {% endAside %}

1. Click **Save**. Your device is enabled by default and you can select it from the **Dimensions** drop-down list in [device mode](/docs/devtools/device-mode/#device).

To edit or remove a custom device you added, click {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/JJEyylF1sToNKTtoFm4Q.svg", alt="Edit.", width="22", height="22" %} or {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/YxQ6ggkbUKxxxqHiaUz4.svg", alt="Delete.", width="22", height="22" %} buttons that appear on hover.
