---
layout: "layouts/doc-post.njk"
title: "Debug background services"
authors:
  - kaycebasques
  - sofiayem
date: 2019-09-15
#updated: YYYY-MM-DD
description:
  "How to debug Background Fetch, Background Sync, Notifications, Push Messages, and view reports with Chrome
  DevTools."
tags:
  - javascript
---

The **Background Services** section of Chrome DevTools is a collection of tools for the JavaScript
APIs that enables your website to send and receive updates even when a user does not have your
website open. A background service is functionally similar to a [background process][1]. Chrome
DevTools considers each of the following APIs to be a background service:

- [Background Fetch][2]
- [Background Sync][3]
- [Notifications][4]
- [Push Messages][5]

Chrome DevTools can log fetch, sync, and notification events for three days, even when DevTools is not open. This can help you make sure that events are being sent and received as expected.

You can also inspect the details of each event.

{% Img src="image/admin/ZG5sVS5QkS30tRGieBoo.png", alt="Viewing the details of an event in the Push Messaging pane.", width="800", height="389" %}

Figure 1. Viewing the details of an event in the Push Messaging pane.

In addition to background service events, DevTools can show you [reports](https://web.dev/reporting-api/) that Chrome already sent or is about to send via the [Reporting API][20].

Whenever your site's policies are violated, Chrome generates reports and sends them in batches with a delay even if the user has already left your site. For more information on policies you can set up, see [Use cases and report types](https://web.dev/reporting-api/#use-cases-and-report-types).

## Background Fetch {: #fetch }

The [Background Fetch][6] API enables a [service worker][7] to reliably download large resources,
like movies or podcasts, as a background service. To log Background Fetch event for three days, even
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
it has re-established a reliable internet connection. To log Background Sync events for three days, even
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
uses the [Notifications][14] API to display the data to a user. To log Notifications for three days,
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
notification, it uses the [Notifications][18] API. To log Push Messages for three days, even when
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

## (Experimental) Reporting API {: #reporting-api }

Some errors happen only in production. You never see them locally or during development because real users, networks, and devices change the game.

For example, say your new site relies on third-party software that uses `document.write()` to load critical scripts. New users all over the world open your site but they might have slower connections than you tested with. Unknown to you, your site starts breaking for them because [Chrome intervenes against](https://web.dev/no-document-write/) `document.write()` on slow networks.

Alternatively, you might want to keep an eye on deprecated or soon-to-be-deprecated APIs your code base may be using.

The **Reporting API** is designed to help you monitor deprecated API calls, security violations of your page, and more. You can set up reporting as described in [Monitor your web application with the Reporting API](https://web.dev/reporting-api/#using-the-reporting-api).

{% Aside %}
**Note**: This is an experimental feature available in Chrome 96 and newer.
{% endAside %}

To view the reports generated by a page:

1. Type or paste `chrome://flags/#enable-experimental-web-platform-features` in Chrome's URL bar.
1. Next to **Experimental Web Platform features**, click **Enabled** and restart Chrome.
1. Open **DevTools** > **Settings** > **Experiments**.
1. Check **Enable Reporting API panel in the Application panel** and reload DevTools.
1. Open **Application** > **Background Services** > **Reporting API** and reload your page.

   {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/ajygmfGudWXWRIwVgm8M.png", alt="Reports listed in the Reporting API", width="800", height="513" %}

The **Reporting API** tab is divided into three parts:

- The **Reports** table with the following information on each report:
   - **URL** that caused the report generation
   - Violation **Type**
   - [Report **Status**](#report-status)
   - **Destination** endpoint
   - **Generated at** timestamp
   - Report **Body**
- The **Report body** preview section. To preview a report body, click on a report in the table above.
- The **Endpoints** section with an overview of all the endpoints configured in the `Reporting-Endpoints` header.

### Report status {: #report-status }

The **Status** column tells you whether Chrome sent the report successfully, is about to send it, or failed.

<div>
  <table>
    <thead>
      <tr>
        <th>Status</th>
        <th>Description</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><code>Success</code></td>
        <td>The browser has sent the report and the endpoint replied with a success code (<code>200</code> or another success response code <code>2xx</code>).</td>
      </tr>
      <tr>
        <td><code>Pending</code></td>
        <td>The browser is currently making an attempt to send the report.</td>
      </tr>
      <tr>
        <td><code>Queued</code></td>
        <td>The report has been generated and the browser is not currently trying to send it. A report appears as <code>Queued</code> in one of these two cases:
        <ul>
          <li>The report is new and the browser is waiting to see if more reports arrive before trying to send it.</li>
          <li>The report is not new; the browser has already tried to send this report and has failed, and is waiting before trying again.</li>
        </ul>
        </td>
        </tr>
        <tr>
        <td><code>MarkedForRemoval</code></td>
        <td>After retrying for a while (<code>Queued</code>), the browser has stopped trying to send the report and will soon remove it from its list of reports to send.</td>
        </tr>
        </tbody>

  </table>
</div>

Reports are removed after a while, whether or not they're successfully sent.

{% Aside 'gotchas' %} The `Queued` status isn't always informative, because it doesn't precisely indicate whether sending has failed or has not been attempted yet. Using [short reporting delays](https://web.dev/reporting-api/#save-time) helps: a report that remains `Queued` in that case likely indicates that sending is failing. {% endAside %}

[1]: https://en.wikipedia.org/wiki/Background_process
[2]: #fetch
[3]: #sync
[4]: #notifications
[5]: #push
[6]: /blog/background-fetch
[7]: https://web.dev/service-workers-cache-storage/
[8]: /docs/devtools/open
[9]: /blog/background-sync
[10]: https://web.dev/service-workers-cache-storage/
[11]: /docs/devtools/open
[12]: https://web.dev/service-workers-cache-storage/
[13]: https://developer.mozilla.org/docs/Web/API/Push_API
[14]: https://developer.mozilla.org/docs/Web/API/Notifications_API
[15]: /docs/devtools/open
[16]: https://web.dev/service-workers-cache-storage/
[17]: https://developer.mozilla.org/docs/Web/API/Push_API
[18]: https://developer.mozilla.org/docs/Web/API/Notifications_API
[19]: /docs/devtools/open
[20]: #reporting-api
