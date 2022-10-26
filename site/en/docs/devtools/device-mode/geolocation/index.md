---
layout: "layouts/doc-post.njk"
title: "Override geolocation"
authors:
  - kaycebasques
  - sofiayem
date: 2018-12-18
updated: 2022-20-26
description: "Open the Sensors tab and select coordinates from the Geolocation list."
tags:
  - emulate
  - test
---

Many websites take advantage of [user location][1] in order to provide a more relevant experience
for their users. For example, a weather website might show the local forecast for a user's area,
once the user has granted the website permission to access their location.

If you're building a UI that changes depending on where the user is located, you probably want to
make sure that the site behaves correctly in different places around the world.

## Override geolocation {: #override }

To override your geolocation in Chrome DevTools:

1. [Open Chrome in incognito mode](https://support.google.com/chrome/answer/95464) for a clean testing environment.
1. [Open DevTools](/docs/devtools/open/) on the page you want to test. This tutorial uses the [weather snippet in Google Search](https://www.google.com/search?q=weather).
1. Open the [Command Menu](/docs/devtools/command-menu/) with the following shortcut:

   - <kbd>Command</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd> on a Mac
   - <kbd>Control</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd> on Windows or Linux

1. Type `sensors`, select **Show Sensors**, and press <kbd>Enter</kbd>.

   {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/GSvjqTkeG42dNRB9ldGE.png", alt="Selecting Show Sensors from the Command Menu search results.", width="800", height="688" %}

   The **Sensors** tab opens at the bottom of your DevTools window.

1. In the **Location** section, select a city from the drop-down list.
1. {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/sX65QEDYhwBFHCM24BtV.svg", alt="Refresh.", width="24", height="24" %} Refresh the page and observe how the weather snippet changes its locale, temperature unit, and location.

   {% Video src="video/NJdAV9UgKuN8AhoaPBquL7giZQo1/US9qtZTdhcSWyuGICNre.mp4", autoplay="false", controls="true", muted="true", class="screenshot" %}

To see how your site behaves when the user's location is not available, select **Location unavailable** from the same drop-down list.

## Add a custom geolocation point {: #add-custom }

To set a custom geolocation point:

1. Use Google Maps to find out the desired latitude and longitude:
   1. Place a point anywhere in Google Maps.
   1. Copy the latitude and longitude from the panel on the right.
   {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/IB5IVt21ZkkruwXiKaZz.png", alt="The latitude and longitude of a geolocation point in Google Maps.", width="800", height="596" %}
1. From the **Sensors** > **Location** drop-down list, select **Other** and specify the desired latitude and longitude. Optionally, you can specify the timezone and locale.

   {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/vnVkXionPEp4tSpVklOc.png", alt="The weather snippet for a custom geolocation point.", width="800", height="774" %}

   In the example above, the geolocation is set to a point somewhere at King's Cross in London but the locale is set to `de-De`, so the snippet shows you local London's weather with the UI in German.

If you use a custom override frequently, click **Manage** to set it up as a preset in {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/9gzXiTYY0nZzBxGI6KrV.svg", alt="Settings.", width="24", height="24" %} **Settings** > [**Locations**](/docs/devtools/settings/#locations).

[1]: https://developers.google.com/web/fundamentals/native-hardware/user-location
