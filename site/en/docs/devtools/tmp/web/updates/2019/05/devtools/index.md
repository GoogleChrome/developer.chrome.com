---
layout: "layouts/doc-post.njk"
title: "What's New In DevTools (Chrome 76)"
authors:
  - kaycebasques
date: 2019-05-28
updated: 2019-07-15
description: "Autocomplete with CSS values, a new UI for network settings, and more."
---

Hello! Here's what's new in [Chrome DevTools][1] in Chrome 76.

{% youtube id="GLUB2yzk0ZQ" %}

## Autocomplete with CSS values {: #values }

When adding style declarations to a DOM node sometimes the declaration value is easier to remember
than the declaration name. For example, when making a `<p>` node bold, the value `bold` might be
easier to remember than the name `font-weight`. The Style pane's autocomplete UI now supports CSS
values. If you remember what keyword value you want, but can't remember the property name, try
typing the value and autocomplete should help you find the name you're looking for.

![After typing 'bold' the Styles pane autocompletes to 'font-weight: bold'.](/web/updates/images/2019/05/values.png)

Figure 1. After typing `bold` the Styles pane autocompletes to `font-weight: bold`.

Send feedback on this new feature to [Chromium issue #931145][2].

## A new UI for network settings {: #settings }

The Network panel previously had a usability issue where options like the throttling menu were
unreachable when the DevTools window was narrow. To fix this issue and de-clutter the Network panel,
a few lesser-used options have been moved behind the new **Network Settings**
![Network Settings](/web/tools/chrome-devtools/images/shared/settings.png) pane.

![Network Settings.](/web/updates/images/2019/05/settings.png)

Figure 2. Network Settings.

The following options have moved to **Network Settings**: **Use Large Request Rows**, **Group By
Frame**, **Show Overview**, **Capture Screenshots**. Figure 3 maps the old locations to the new
ones.

![Mapping the old locations to the new.](/web/updates/images/2019/05/mapping.png)

Figure 3. Mapping the old locations to the new.

Send feedback on this UI change to [Chromium issue #892969][3].

## WebSocket messages in HAR exports {: #websocket }

When [exporting a HAR file from the Network panel][4] to share network logs with your colleagues,
your HAR file now includes WebSocket messages. The `_webSocketMessages` property begins with an
underscore to indicate that it's a custom field.

```
...
"_webSocketMessages": [
  {
    "type": "send",
    "time": 1558730482.5071473,
    "opcode": 1,
    "data": "Hello, WebSockets!"
  },
  {
    "type": "receive",
    "time": 1558730482.5883863,
    "opcode": 1,
    "data": "Hello, WebSockets!"
  }
]
...
```

Send feedback on this new feature to [Chromium issue #496006][5].

## HAR import and export buttons {: #HAR }

Share network logs with colleagues more easily with the new **Export All As HAR With Content**
![Export](/web/tools/chrome-devtools/images/shared/export.png) and **Import HAR File**
![Import](/web/tools/chrome-devtools/images/shared/import.png) buttons. HAR importing and exporting
have existed in DevTools for a while. The more discoverable buttons are the new change.

![The new HAR buttons.](/web/updates/images/2019/05/har-buttons.png)

Figure 4. The new HAR buttons.

Send feedback on this UI change to [Chromium issue #904585][6].

## Real-time total memory usage {: #memory }

The Memory panel now shows total memory usage in real-time.

![Real-time total memory usage.](/web/updates/images/2019/05/memory.png)

Figure 5. The bottom of the Memory panel shows that the page is using **43.4 MB** of memory in
total. **209 KB/s** indicates that total memory usage is increasing 209 KB per second.

See also the [Performance Monitor][7] for tracking memory usage in real-time.

Send feedback on this new feature to [Chromium issue #958177][8].

## Service worker registration port numbers {: #ports }

The **Service Workers** pane now includes port numbers in its titles to make it easier to keep track
of which service worker you're debugging.

![Service worker ports.](/web/updates/images/2019/05/sw-ports.png)

Figure 6. Service worker ports.

Send feedback on this UI change to [Chromium issue #601286][9].

## Inspect Background Fetch and Background Sync events {: #background }

Use the new **Background Services** section of the **Application** panel to monitor [Background
Fetch][10] and [Background Sync][11] events. Given that Background Fetch and Background Sync events
occur in the... well... background, it wouldn't be very useful if DevTools only recorded Background
Fetch and Background Sync events while DevTools was open. So, once you start recording, Background
Fetch and Background Sync events will continue to be recorded, even after you close the tab, and
even after you close Chrome.

Go to the **Application** panel, open the **Background Fetch** or **Background Sync** tab, then
click **Record** ![Record](/web/tools/chrome-devtools/images/shared/record.png) to start logging
events. Click an event to view more information about it.

![The Background Fetch pane.](/web/updates/images/2019/05/fetch.png)

Figure 7. The Background Fetch pane. [Demo][12] by [Maxim Salnikov][13].

![The Background Sync pane.](/web/updates/images/2019/05/sync.png)

Figure 8. The Background Sync pane.

Send feedback on these new features to [Chromium issue #927726][14].

## Puppeteer for Firefox {: #puppeteer }

!!!.aside.aside--note

Puppeteer is a high-level Node API for automating Chromium. We mention Puppeteer in the DevTools
release notes because Puppeteer was started by the DevTools team and because you might be able to
use it to automate tasks that were previously only possible in DevTools.

!!!

Puppeteer for Firefox is a new experimental project that enables you to automate Firefox with the
Puppeteer API. In other words, you can now automate Firefox and Chromium with the same Node API, as
demonstrated in the video below.

{% youtube id="YSni7t2ktMA" %}

After running `node example.js`, Firefox opens and the text `page` is inserted into the search box
on Puppeteer's documentation site. Then the same task is repeated in Chromium.

Check out the Puppeteer talk by [Joel][15] and [Andrey][16] from Google I/O 2019 to learn more about
Puppeteer and Puppeteer for Firefox. The Firefox announcement happens around 4:05.

{% youtube id="MbnATLCuKI4" %}

[1]: /web/tools/chrome-devtools
[2]: https://crbug.com/931145
[3]: https://crbug.com/892969
[4]: #HAR
[5]: https://crbug.com/496006
[6]: https://crbug.com/904585
[7]: /web/updates/2017/11/devtools-release-notes#perf-monitor
[8]: https://crbug.com/958177
[9]: https://crbug.com/601286
[10]:
  https://medium.com/google-developer-experts/background-fetch-api-get-ready-to-use-it-69cca522cd8f
[11]: /web/updates/2015/12/background-sync
[12]: https://background-fetch.glitch.me
[13]: https://twitter.com/webmaxru
[14]: https://crbug.com/927726
[15]: https://twitter.com/joeleinbinder
[16]: https://twitter.com/aslushnikov
