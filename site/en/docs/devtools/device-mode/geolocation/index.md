---
layout: "layouts/doc-post.njk"
title: "Override geolocation"
authors:
  - kaycebasques
date: 2018-12-18
#updated: YYYY-MM-DD
description: "Open the Sensors tab and select coordinates from the Geolocation list."
---

Many websites take advantage of [user location][1] in order to provide a more relevant experience
for their users. For example, a weather website might show the local forecast for a user's area,
once the user has granted the website permission to access their location.

If you're building a UI that changes depending on where the user is located, you probably want to
make sure that the site behaves correctly in different places around the world. To override your
geolocation in Chrome DevTools:

1.  Press <kbd>Command</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd> (Mac) or
    <kbd>Control</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd> (Windows, Linux, Chrome OS) to open the
    **Command Menu**.

    {% Img src="image/admin/Ok1tHKMMQkTppz0aYqjk.png", alt="The Command Menu.", width="800", height="632" %}

    **Figure 1**. The Command Menu

2.  Type `sensors`, select **Show Sensors**, and press <kbd>Enter</kbd>. The **Sensors** tab opens
    up at the bottom of your DevTools window.
3.  From the **Geolocation** list select one of the preset cities, like **Tokyo**, or select
    **Custom location** to enter custom longitude and latitude coordinates, or select **Location
    unavailable** to see how your site behaves when the user's location is not available.

    {% Img src="image/admin/GLnD87xLckOcCq7Uxi8P.png", alt="Selecting 'Tokyo' from the 'Geolocation' list.", width="800", height="670" %}

    **Figure 2**. Selecting **Tokyo** from the **Geolocation** list

[1]: https://developers.google.com/web/fundamentals/native-hardware/user-location
