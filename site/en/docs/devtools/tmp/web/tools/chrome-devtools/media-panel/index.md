---
layout: "layouts/doc-post.njk"
title: "View and Debug Media Players Information"
authors:
  - jecelynyeen
date: 2020-08-20
updated: 2020-08-25
description: "Use the Media Panel to view information and debug the media players per browser tab."
---

Use the Media Panel in Chrome DevTools to view information and debug the media players per browser
tab.

## Open the Media panel {: #open }

The **Media** panel is the main place in DevTools for inspecting the media player of a page.

1.  [Open DevTools][1].
2.  Click the **More Options** ![More](/web/tools/chrome-devtools/images/shared/more.png) > **More
    tools** > **Media** to open the Media panel.

![Media panel](/web/tools/chrome-devtools/media-panel/images/01-empty.png)

## View media players information {: #view }

1.  Visit a page with a media player, such as [https://youtu.be/e1gAyQuIFQo][2].
2.  You can now see a media player under the **Players** menu.
3.  Click on the player. The **Properties** tab displays the properties of the media player.
    ![Media properties](/web/tools/chrome-devtools/media-panel/images/02-view.png)
4.  Click on the **Events** tab to view all the media player events.
    ![Media events](/web/tools/chrome-devtools/media-panel/images/03-events.png)
5.  Click on the **Messages** tab to view the media player message logs. You can filter the messages
    by log level or string.
    ![Media messages](/web/tools/chrome-devtools/media-panel/images/04-messages.png)
6.  The **Timeline** tab is where you can view the media playback and buffer status live.

### Remote debugging {: #remote-debug }

You can view the media players information on an Android device from your Windows, Mac, or Linux
computer.

1.  Follow [these steps][3] to set up remote debugging.
2.  Now you can view the media players information remotely.

![Remote debugging](/web/tools/chrome-devtools/media-panel/images/06-remote-debug.png)

## Hide and show media players {: #hide-show }

Sometimes there might be more than one media player on a page, or you might use the same browser tab
browsing different pages, each with media players.

You can choose to show or hide each media player for easier debugging experience.

1.  Browse to several different video pages using the same browser tab.
2.  Right click on one of the media players. You can choose to hide the selected player by select
    **Hide player** or select **Hide all others** to hide all the other players.

![Hide media players](/web/tools/chrome-devtools/media-panel/images/07-hide-show.png)

## Export media player information {: #export }

1.  Right click on one of the media players.
2.  Select **Save player info** to download the player info as json.

![Export media information](/web/tools/chrome-devtools/media-panel/images/08-save.png)

[1]: /web/tools/chrome-devtools/open
[2]: https://youtu.be/e1gAyQuIFQo
[3]: /web/tools/chrome-devtools/remote-debugging
