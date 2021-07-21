---
layout: "layouts/doc-post.njk"
title: "View and debug media players information"
authors:
  - jecelynyeen
date: 2020-08-20
#updated: YYYY-MM-DD
description: "Use the Media Panel to view information and debug the media players per browser tab."
---

Use the Media Panel in Chrome DevTools to view information and debug the media players per browser
tab.

## Open the Media panel {: #open }

The **Media** panel is the main place in DevTools for inspecting the media player of a page.

1.  [Open DevTools][1].
2.  Click the **More Options** {% Img src="image/admin/uZG8peUteB4Wn1DWFf1Z.png", alt="More", width="6", height="26" %} > **More
    tools** > **Media** to open the Media panel.

{% Img src="image/admin/6z5Pp8PAlCIZuh8H5lnE.png", alt="Media panel", width="800", height="493" %}

## View media players information {: #view }

1.  Visit a page with a media player, such as [https://youtu.be/e1gAyQuIFQo][2].
2.  You can now see a media player under the **Players** menu.
3.  Click on the player. The **Properties** tab displays the properties of the media player.
    {% Img src="image/admin/f5CJZqAX9Qi9BEuACLbG.png", alt="Media properties", width="800", height="493" %}
4.  Click on the **Events** tab to view all the media player events.
    {% Img src="image/admin/UK9Hnri3TaQ5d0nkn74i.png", alt="Media events", width="800", height="493" %}
5.  Click on the **Messages** tab to view the media player message logs. You can filter the messages
    by log level or string.
    {% Img src="image/admin/lit6DawILZzmXik2QyHf.png", alt="Media messages", width="800", height="493" %}
6.  The **Timeline** tab is where you can view the media playback and buffer status live.

### Remote debugging {: #remote-debug }

You can view the media players information on an Android device from your Windows, Mac, or Linux
computer.

1.  Follow [these steps][3] to set up remote debugging.
2.  Now you can view the media players information remotely.

{% Img src="image/admin/U8IdDPrM8dgG3COfgUZo.png", alt="Remote debugging", width="800", height="493" %}

## Hide and show media players {: #hide-show }

Sometimes there might be more than one media player on a page, or you might use the same browser tab
browsing different pages, each with media players.

You can choose to show or hide each media player for easier debugging experience.

1.  Browse to several different video pages using the same browser tab.
2.  Right click on one of the media players. You can choose to hide the selected player by select
    **Hide player** or select **Hide all others** to hide all the other players.

{% Img src="image/admin/eREb7QUvFbVbouC1LYmS.png", alt="Hide media players", width="800", height="455" %}

## Export media player information {: #export }

1.  Right click on one of the media players.
2.  Select **Save player info** to download the player info as json.

{% Img src="image/admin/CPXXN0ZjMVLgIXOjvoQ3.png", alt="Export media information", width="800", height="455" %}

[1]: /docs/devtools/open
[2]: https://youtu.be/e1gAyQuIFQo
[3]: /docs/devtools/remote-debugging
