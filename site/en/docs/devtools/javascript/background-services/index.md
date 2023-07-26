---
layout: "layouts/doc-post.njk"
title: "Debug background services"
authors:
  - kaycebasques
  - sofiayem
date: 2019-09-15
updated: 2023-06-13
description:
  "View reports and debug background services, such as Background Fetch, Background Sync, Notifications, Push Messages, and more."
tags:
  - javascript
---

The **Background Services** section of Chrome DevTools is a collection of tools for the JavaScript
APIs that enables your website to send and receive updates even when a user does not have your
website open. A background service is functionally similar to a [background process][1].

The **Background Services** section lets you debug the following background services:

- [Background Fetch][2]
- [Background Sync][3]
- [Notifications][4]
- [Push Messages][5]

Chrome DevTools can log fetch, sync, and notification events for three days, even when DevTools is not open. This can help you make sure that events are being sent and received as expected.

In addition to background service events, DevTools can:

- Show you [reports](https://web.dev/reporting-api/) that Chrome already sent or is about to send via the [Reporting API][20].
- Let you debug and [test back/forward cache](/docs/devtools/application/back-forward-cache/) with a click.

## Background Fetch {: #fetch }

The [Background Fetch][6] API enables a [service worker][7] to reliably download large resources,
like movies or podcasts, as a background service. To log Background Fetch event for three days, even
when DevTools isn't open:

1. [Open DevTools][8], for example, on this [demo page](https://background-fetch.glitch.me/).
1. Navigate to **Application** > **Background Services** > **Background Fetch**, and click {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/ljri3HPj5aVym9qgMfkx.svg", alt="Record.", width="20", height="20" %} **Record**.

  {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/yyAOlwrKTFZJc5NZck1K.png", alt="The Background Fetch pane.", width="800", height="399" %}

1. On the demo page, click **Store assets locally**. This triggers some background fetch activity. DevTools logs the events to the table.

  {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/UpNTtCXYBCNIADEeVdg4.png", alt="A log of events in the Background Fetch pane.", width="800", height="426" %}

1. Click an event to view its details in the space below the table.
1. You can close DevTools and leave the recording run for up to three days. To stop recording, click {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/HojbnKGlHbrbJI1VgQW9.svg", alt="Stop.", width="20", height="20" %} **Stop**.

## Background Sync {: #sync }

The [Background Sync][9] API enables an offline [service worker][10] to send data to a server once
it has re-established a reliable internet connection. To log Background Sync events for three days, even
when DevTools isn't open:

1. [Open DevTools][11], for example, on this [demo page](https://jakearchibald.github.io/isserviceworkerready/demos/sync/).
1. Navigate to **Application** > **Background Services** > **Background Sync** and click {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/ljri3HPj5aVym9qgMfkx.svg", alt="Record.", width="20", height="20" %} **Record**.

   {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/lnaDUADXNNb2zTVM7zdR.png", alt="The Background Sync pane.", width="800", height="464" %}

1. On the demo page, click **Register background sync** to register the respective service worker and click **Allow** when prompted.

   {% Aside %}
   To learn how to debug service workers in DevTools, see [Service workers](/docs/devtools/progressive-web-apps/#service-workers).
   {% endAside %}

   Service worker registration is a background sync activity. DevTools logs the events to the table.

   {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/A79MGx9wiacYxIDjt0lP.png", alt="A log of events in the Background Sync pane.", width="800", height="415" %}

1. Click an event to view its details in the space below the table.
1. You can close DevTools and leave the recording run for up to three days. To stop recording, click {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/HojbnKGlHbrbJI1VgQW9.svg", alt="Stop.", width="20", height="20" %} **Stop**.

## (Experimental) Bounce Tracking Mitigations {: #bounce-tracking }

{% Aside %}
This is an experimental feature available from Chrome version 115.
{% endAside %}

[Bounce Tracking Mitigations](https://privacycg.github.io/nav-tracking-mitigations/#bounce-tracking-mitigations) experiment in Chrome lets you identify and delete the state of sites that appear to perform cross-site tracking using the bounce tracking technique. You can manually force tracking mitigations and see a list of sites whose states were deleted.

To force tracking mitigations:

1. [Block third-party cookies in Chrome](https://support.google.com/chrome/answer/95647?hl=en&co=GENIE.Platform%3DAndroid&sjid=2048967673261319866-EU#zippy=%2Callow-or-block-cookies). Navigate to and enable {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/N7wEDmtW9lnrSxPRupMa.svg", alt="Three-dot menu.", width="24", height="24" %} > **Settings** > {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/JbhmMshze0QJJVcmDr30.svg", alt="Security.", width="24", height="24" %} **Privacy and security** > **Cookies and other site data** > {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/gV2vW2PQXfBqvQEJ4sF0.svg", alt="Radio button checked.", width="24", height="24" %} **Block third-party cookies**.
1. In `chrome://flags`, set the **Bounce Tracking Mitigations** experiment to **Enabled With Deletion**.
1. [Open DevTools][11], for example, on [demo page](https://bounce-tracking-demo.glitch.me/), and navigate to **Application** > **Background Services** > **Bounce Tracking Mitigations**.
1. On the demo page, click a bounce link and wait (10 seconds) for Chrome to record the bounce. The **Issues** tab warns you about the upcoming state deletion.
1. Click **Force run** to delete the state immediately.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/PJ8FUFF64ogdBNyFNPuB.png", alt="Bounce Tracking Mitigations lists a state deletion.", width="800", height="701" %}

## Notifications {: #notifications }

After a [service worker][12] has received a [Push Message][13] from a server, the service worker
uses the [Notifications][14] API to display the data to a user. To log Notifications for three days,
even when DevTools isn't open:

1. [Open DevTools][15], for example, on this [demo page](https://notification-triggers.glitch.me/).
1. Navigate to **Application** > **Background Services** > **Notifications** and click {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/ljri3HPj5aVym9qgMfkx.svg", alt="Record.", width="20", height="20" %} **Record**.

   {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/S1DTjVeqwbMxdnEEI8tC.png", alt="The Notifications pane.", width="800", height="398" %}

1. On the demo page, click **Schedule Notification** and **Allow** when prompted.
1. Wait for the notification to appear. DevTools logs the notification events to the table.

   {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/OAYWGjZw9e15TIAzytvI.png", alt="A log of events in the Notifications pane.", width="800", height="398" %}

1. Click an event to view its details in the space below the table.
1. You can close DevTools and leave the recording run for up to three days. To stop recording, click {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/HojbnKGlHbrbJI1VgQW9.svg", alt="Stop.", width="20", height="20" %} **Stop**.

## Push Messaging {: #push }

To display a push notification to a user, a [service worker][16] must first use the [Push
Message][17] API to receive data from a server. When the service worker is ready to display the
notification, it uses the [Notifications][18] API. To log Push Messages for three days, even when
DevTools isn't open:

1. [Open DevTools][19], for example, on this [demo page](https://simple-push-demo.vercel.app/).
1. Navigate to **Application** > **Background Services** > **Push Messaging** and click {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/ljri3HPj5aVym9qgMfkx.svg", alt="Record.", width="20", height="20" %} **Record**.

   {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/pHNGjEaeK0U1pJHL0tbY.png", alt="The Push Messaging pane.", width="800", height="414" %}

1. On the demo page, toggle **Enable push notifications**, click **Allow** when prompted, type a message, and send it. DevTools logs push notification events to the table.

   {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/fkaGXBgWJzsYJ7sCQSUr.png", alt="A log of events in the Push Messaging pane.", width="800", height="414" %}

   {% Aside %}
   Additionally, in **Application** > [**Service Workers**](/docs/devtools/progressive-web-apps/#service-workers), you can click **Push** to send test notifications from DevTools.
   {% endAside %}

1. Click an event to view its details in the space below the table.
1. You can close DevTools and leave the recording run for up to three days. To stop recording, click {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/HojbnKGlHbrbJI1VgQW9.svg", alt="Stop.", width="20", height="20" %} **Stop**.

## Reporting API {: #reporting-api }

Some errors happen only in production. You never see them locally or during development because real users, networks, and devices change the game.

For example, say your new site relies on third-party software that uses `document.write()` to load critical scripts. New users all over the world open your site but they might have slower connections than you tested with. Unknown to you, your site starts breaking for them because [Chrome intervenes against](https://web.dev/no-document-write/) `document.write()` on slow networks. Alternatively, you might want to keep an eye on deprecated or soon-to-be-deprecated APIs your code base may be using.

The **Reporting API** is designed to help you monitor deprecated API calls, security violations of your page, and more. You can set up reporting as described in [Monitor your web application with the Reporting API](https://web.dev/reporting-api/#using-the-reporting-api).

To view the reports generated by a page:

1. Go to `chrome://flags/#enable-experimental-web-platform-features`, set **Experimental Web Platform features** to **Enabled**, and restart Chrome.
1. [Open DevTools](/docs/devtools/open/) and navigate to **Application** > **Background Services** > **Reporting API**. For example, you can check out reports on this [demo page](https://reporting-api-demo.glitch.me/page).

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

{% Aside 'important' %} The `Queued` status isn't always informative, because it doesn't precisely indicate whether sending has failed or has not been attempted yet. Using [short reporting delays](https://web.dev/reporting-api/#save-time) helps: a report that remains `Queued` in that case likely indicates that sending is failing. {% endAside %}

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
