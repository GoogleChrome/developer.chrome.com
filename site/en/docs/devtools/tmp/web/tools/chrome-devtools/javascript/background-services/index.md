---
layout: "layouts/doc-post.njk"
title: "Debug Background Services With Chrome DevTools"
authors:
  - kaycebasques
date: 2019-09-15
updated: 2020-07-10
description:
  "How to debug Background Fetch, Background Sync, Notifications, and Push Messages with Chrome
  DevTools."
---

The **Background Services** section of Chrome DevTools is a collection of tools for the JavaScript
APIs that enables your website to send and receive updates even when a user does not have your
website open. A background service is functionally similar to a [background process][1]. Chrome
DevTools considers each of the following APIs to be a background service:

- [Background Fetch][2]
- [Background Sync][3]
- [Notifications][4]
- [Push Messages][5]

Chrome DevTools can log background service events for 3 days, even when DevTools is not open. This
can help you make sure that events are being sent and received as expected. You can also inspect the
details of each event.

![Viewing the details of an event in the Push Messaging pane.](/web/tools/chrome-devtools/javascript/imgs/pushdetails.png)

Figure 1. Viewing the details of an event in the Push Messaging pane.

## Background Fetch {: #fetch }

The [Background Fetch][6] API enables a [service worker][7] to reliably download large resources,
like movies or podcasts, as a background service. To log Background Fetch event for 3 days, even
when DevTools is not open:

1.  [Open DevTools][8].
2.  Open the **Application** panel.
3.  Open the **Background Fetch** pane.

    ![The Background Fetch pane.](/web/tools/chrome-devtools/javascript/imgs/fetchempty.png)

    Figure 2. The Background Fetch pane.

4.  Click **Record** ![Record](/web/tools/chrome-devtools/images/shared/record.png). After
    triggering some Background Fetch activity, DevTools logs the events to the table.

    ![A log of events in the Background Fetch pane.](/web/tools/chrome-devtools/javascript/imgs/fetchlog.png)

    Figure 3. A log of events in the Background Fetch pane.

5.  Click an event to view its details in the space below the table.

    ![Viewing the details of an event in the Background Fetch pane.](/web/tools/chrome-devtools/javascript/imgs/fetchdetails.png)

    Figure 4. Viewing the details of an event in the Background Fetch pane.

## Background Sync {: #sync }

The [Background Sync][9] API enables an offline [service worker][10] to send data to a server once
it has re-established a reliable internet connection. To log Background Sync events for 3 days, even
when DevTools is not open:

1.  [Open DevTools][11].
2.  Open the **Application** panel.
3.  Open the **Background Sync** pane.

    ![The Background Sync pane.](/web/tools/chrome-devtools/javascript/imgs/syncempty.png)

    Figure 5. The Background Sync pane.

4.  Click **Record** ![Record](/web/tools/chrome-devtools/images/shared/record.png). After
    triggering some Background Sync activity, DevTools logs the events to the table.

    ![A log of events in the Background Sync pane.](/web/tools/chrome-devtools/javascript/imgs/synclog.png)

    Figure 6. A log of events in the Background Sync pane.

5.  Click an event to view its details in the space below the table.

    ![Viewing the details of an event in the Background Sync pane.](/web/tools/chrome-devtools/javascript/imgs/syncdetails.png)

    Figure 7. Viewing the details of an event in the Background Sync pane.

## Notifications {: #notifications }

After a [service worker][12] has received a [Push Message][13] from a server, the service worker
uses the [Notifications][14] API to display the data to a user. To log Notifications for 3 days,
even when DevTools is not open:

1.  [Open DevTools][15].
2.  Open the **Application** panel.
3.  Open the **Notifications** pane.

    ![The Notifications pane.](/web/tools/chrome-devtools/javascript/imgs/notificationsempty.png)

    Figure 8. The Notifications pane.

4.  Click **Record** ![Record](/web/tools/chrome-devtools/images/shared/record.png). After
    triggering some Notifications activity, DevTools logs the events to the table.

    ![A log of events in the Notifications pane.](/web/tools/chrome-devtools/javascript/imgs/notificationslog.png)

    Figure 9. A log of events in the Notifications pane.

5.  Click an event to view its details in the space below the table.

    ![Viewing the details of an event in the Notifications pane.](/web/tools/chrome-devtools/javascript/imgs/notificationsdetails.png)

    Figure 10. Viewing the details of an event in the Notifications pane.

## Push Messages {: #push }

To display a push notification to a user, a [service worker][16] must first use the [Push
Message][17] API to receive data from a server. When the service worker is ready to display the
notification, it uses the [Notifications][18] API. To log Push Messages for 3 days, even when
DevTools is not open:

1.  [Open DevTools][19].
2.  Open the **Application** panel.
3.  Open the **Push Messaging** pane.

    ![The Push Messaging pane.](/web/tools/chrome-devtools/javascript/imgs/pushempty.png)

    Figure 11. The Push Messaging pane.

4.  Click **Record** ![Record](/web/tools/chrome-devtools/images/shared/record.png). After
    triggering some Push Message activity, DevTools logs the events to the table.

    ![A log of events in the Push Messaging pane.](/web/tools/chrome-devtools/javascript/imgs/pushlog.png)

    Figure 12. A log of events in the Push Messaging pane.

5.  Click an event to view its details in the space below the table.

    ![Viewing the details of an event in the Push Messaging pane.](/web/tools/chrome-devtools/javascript/imgs/pushdetails.png)

    Figure 13. Viewing the details of an event in the Push Messaging pane.

[1]: https://en.wikipedia.org/wiki/Background_process
[2]: #fetch
[3]: #sync
[4]: #notifications
[5]: #push
[6]: /web/updates/2018/12/background-fetch
[7]: https://web.dev/service-workers-cache-storage/
[8]: /web/tools/chrome-devtools/open
[9]: /web/updates/2015/12/background-sync
[10]: https://web.dev/service-workers-cache-storage/
[11]: /web/tools/chrome-devtools/open
[12]: https://web.dev/service-workers-cache-storage/
[13]: https://developer.mozilla.org/en-US/docs/Web/API/Push_API
[14]: https://developer.mozilla.org/en-US/docs/Web/API/Notifications_API
[15]: /web/tools/chrome-devtools/open
[16]: https://web.dev/service-workers-cache-storage/
[17]: https://developer.mozilla.org/en-US/docs/Web/API/Push_API
[18]: https://developer.mozilla.org/en-US/docs/Web/API/Notifications_API
[19]: /web/tools/chrome-devtools/open
