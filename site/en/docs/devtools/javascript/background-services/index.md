---
layout: "layouts/doc-post.njk"
title: "Debug background services"
authors:
  - kaycebasques
date: 2019-09-15
#updated: YYYY-MM-DD
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

{% Img src="image/admin/ZG5sVS5QkS30tRGieBoo.png", alt="Viewing the details of an event in the Push Messaging pane.", width="800", height="389" %}

Figure 1. Viewing the details of an event in the Push Messaging pane.

## Background Fetch {: #fetch }

The [Background Fetch][6] API enables a [service worker][7] to reliably download large resources,
like movies or podcasts, as a background service. To log Background Fetch event for 3 days, even
when DevTools is not open:

1.  [Open DevTools][8].
2.  Open the **Application** panel.
3.  Open the **Background Fetch** pane.

    {% Img src="image/admin/DXdZs4q3sjqAmiQv1O6M.png", alt="The Background Fetch pane.", width="800", height="591" %}

    Figure 2. The Background Fetch pane.

4.  Click **Record** {% Img src="image/admin/jvgbyEZPbYfaxB255rCm.png", alt="Record", width="24", height="24" %}. After
    triggering some Background Fetch activity, DevTools logs the events to the table.

    {% Img src="image/admin/1rpEuNKslwetMvtD8c6c.png", alt="A log of events in the Background Fetch pane.", width="800", height="478" %}

    Figure 3. A log of events in the Background Fetch pane.

5.  Click an event to view its details in the space below the table.

    {% Img src="image/admin/q192DLorZyny4WEIkyRB.png", alt="Viewing the details of an event in the Background Fetch pane.", width="800", height="478" %}

    Figure 4. Viewing the details of an event in the Background Fetch pane.

## Background Sync {: #sync }

The [Background Sync][9] API enables an offline [service worker][10] to send data to a server once
it has re-established a reliable internet connection. To log Background Sync events for 3 days, even
when DevTools is not open:

1.  [Open DevTools][11].
2.  Open the **Application** panel.
3.  Open the **Background Sync** pane.

    {% Img src="image/admin/IApG84NTEtNfo8cu74HC.png", alt="The Background Sync pane.", width="800", height="591" %}

    Figure 5. The Background Sync pane.

4.  Click **Record** {% Img src="image/admin/jvgbyEZPbYfaxB255rCm.png", alt="Record", width="24", height="24" %}. After
    triggering some Background Sync activity, DevTools logs the events to the table.

    {% Img src="image/admin/tdWi9XbJMOiF8FEihe0X.png", alt="A log of events in the Background Sync pane.", width="800", height="424" %}

    Figure 6. A log of events in the Background Sync pane.

5.  Click an event to view its details in the space below the table.

    {% Img src="image/admin/jmRJkVcRWWI3hdz2NMnK.png", alt="Viewing the details of an event in the Background Sync pane.", width="800", height="424" %}

    Figure 7. Viewing the details of an event in the Background Sync pane.

## Notifications {: #notifications }

After a [service worker][12] has received a [Push Message][13] from a server, the service worker
uses the [Notifications][14] API to display the data to a user. To log Notifications for 3 days,
even when DevTools is not open:

1.  [Open DevTools][15].
2.  Open the **Application** panel.
3.  Open the **Notifications** pane.

    {% Img src="image/admin/PdFuiQdA7Ky6Fxvi4Bl0.png", alt="The Notifications pane.", width="800", height="424" %}

    Figure 8. The Notifications pane.

4.  Click **Record** {% Img src="image/admin/jvgbyEZPbYfaxB255rCm.png", alt="Record", width="24", height="24" %}. After
    triggering some Notifications activity, DevTools logs the events to the table.

    {% Img src="image/admin/TGjY2BFbfsOWXuGdxvxW.png", alt="A log of events in the Notifications pane.", width="800", height="424" %}

    Figure 9. A log of events in the Notifications pane.

5.  Click an event to view its details in the space below the table.

    {% Img src="image/admin/WeqtSllDCAA8laqB1HXJ.png", alt="Viewing the details of an event in the Notifications pane.", width="800", height="424" %}

    Figure 10. Viewing the details of an event in the Notifications pane.

## Push Messages {: #push }

To display a push notification to a user, a [service worker][16] must first use the [Push
Message][17] API to receive data from a server. When the service worker is ready to display the
notification, it uses the [Notifications][18] API. To log Push Messages for 3 days, even when
DevTools is not open:

1.  [Open DevTools][19].
2.  Open the **Application** panel.
3.  Open the **Push Messaging** pane.

    {% Img src="image/admin/aovnBdkC3HsGTvJK3dvc.png", alt="The Push Messaging pane.", width="800", height="424" %}

    Figure 11. The Push Messaging pane.

4.  Click **Record** {% Img src="image/admin/jvgbyEZPbYfaxB255rCm.png", alt="Record", width="24", height="24" %}. After
    triggering some Push Message activity, DevTools logs the events to the table.

    {% Img src="image/admin/cpKYRm8ioL77xOpKg7To.png", alt="A log of events in the Push Messaging pane.", width="800", height="389" %}

    Figure 12. A log of events in the Push Messaging pane.

5.  Click an event to view its details in the space below the table.

    {% Img src="image/admin/ZG5sVS5QkS30tRGieBoo.png", alt="Viewing the details of an event in the Push Messaging pane.", width="800", height="389" %}

    Figure 13. Viewing the details of an event in the Push Messaging pane.

[1]: https://en.wikipedia.org/wiki/Background_process
[2]: #fetch
[3]: #sync
[4]: #notifications
[5]: #push
[6]: https://developers.google.com/web/updates/2018/12/background-fetch
[7]: https://web.dev/service-workers-cache-storage/
[8]: /docs/devtools/open
[9]: https://developers.google.com/web/updates/2015/12/background-sync
[10]: https://web.dev/service-workers-cache-storage/
[11]: /docs/devtools/open
[12]: https://web.dev/service-workers-cache-storage/
[13]: https://developer.mozilla.org/en-US/docs/Web/API/Push_API
[14]: https://developer.mozilla.org/en-US/docs/Web/API/Notifications_API
[15]: /docs/devtools/open
[16]: https://web.dev/service-workers-cache-storage/
[17]: https://developer.mozilla.org/en-US/docs/Web/API/Push_API
[18]: https://developer.mozilla.org/en-US/docs/Web/API/Notifications_API
[19]: /docs/devtools/open
