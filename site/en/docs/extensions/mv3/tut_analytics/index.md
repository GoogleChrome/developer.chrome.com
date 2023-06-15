---
layout: "layouts/doc-post.njk"
title: "Use Google Analytics 4"
seoTitle: "How to use Google Analytics 4 in your Chrome Extension"
date: 2012-09-18
updated: 2023-05-23
description: >
    Step-by-step instructions on how to track usage of your Extension with Google Analytics 4.
---

This tutorial demonstrates how to track the usage of your extension using Google Analytics. You can find a [working Google Analytics 4 sample on Github](https://github.com/GoogleChrome/chrome-extensions-samples/tree/main/functional-samples/tutorial.google-analytics), where [google-analytics.js](https://github.com/GoogleChrome/chrome-extensions-samples/blob/main/functional-samples/tutorial.google-analytics/scripts/google-analytics.js) includes all the Google Analytics related code.

## Requirements {: #toc-requirements }
This tutorial assumes you are familiar with writing Chrome extensions. If you need information on how to write an extension, please read the [Getting Started tutorial](/docs/extensions/mv3/getstarted).

You must also set up a [Google Analytics 4 account](http://www.google.com/analytics) to track your extension. Note that when setting up the account, you can use any value in the Website's URL field, as your extension will not have an URL of its own.

## Using the Google Analytics Measurement Protocol {: #measurement-protocol }

Since Manifest V3, Chrome Extensions are [not allowed to execute remote hosted code](/docs/extensions/mv3/intro/mv3-overview/#remotely-hosted-code). This means you have to use the [Google Analytics Measurement Protocol](https://developers.google.com/analytics/devguides/collection/protocol/ga4) for tracking extension events. The Measurement Protocol lets you send events directly to Google Analytics servers via HTTP requests. A benefit of this approach is that it lets you send analytics events from everywhere in your extension, including your service worker.

{% Aside 'caution' %}
Using the Measurement Protocol means that some information, such as geolocation, will not be included.
{% endAside %}

### Setup API credentials 
The first step is to obtain an `api_secret` and `measurement_id`. Follow the [Measurement Protocol documentation](https://developers.google.com/analytics/devguides/collection/protocol/ga4) for how to get these for your Analytics Account. 

### Generating a `client_id`
The second step is to generate a unique identifier for a specific device/user, the `client_id`. The id should stay the same, as long as the extension is installed on a user’s browser. It can be an arbitrary string, but should be unique to the client. You can generate one by calling [`self.crypto.randomUUID()`](https://developer.mozilla.org/docs/Web/API/Crypto/randomUUID). Store the `client_id` in [`chrome.storage.local`](/docs/extensions/reference/storage/#storage-areas) to make sure it stays the same as long as the extension is installed. 

Using `chrome.storage.local` requires the `storage` permission in your manifest file:

{% Label %}manifest.json:{% endLabel %}

```json
{
  …
  "permissions": ["storage"],
  …
}
```

Then you can use `chrome.storage.local` to store the `client_id`:

```js
async function getOrCreateClientId() {
  const result = await chrome.storage.local.get("clientId");
  let clientId = result.clientId;
  if (!clientId) {
    // Generate a unique client ID, the actual value is not relevant
    clientId = self.crypto.randomUUID();
    await chrome.storage.local.set({ clientId });
  }
  return clientId;
}
```

### Sending an analytics event
With the API credentials and the `client_id`, you can send an event to Google Analytics via a [`fetch`](https://developer.mozilla.org/docs/Web/API/fetch) request:


```js
const GA_ENDPOINT = "https://www.google-analytics.com/mp/collect";
const MEASUREMENT_ID = `G-...`;
const API_SECRET = `...`;

fetch(
  `${GA_ENDPOINT}?measurement_id=${MEASUREMENT_ID}&api_secret=${API_SECRET}`,
  {
    method: "POST",
    body: JSON.stringify({
      client_id: getOrCreateClientId(),
      events: [
        {
          name: "button_clicked",
          params: {
            id: "my-button",
          },
        },
      ],
    }),
  }
);
```


This will send a `button_clicked` event which will appear in your [Google Analytics events report](https://support.google.com/analytics/answer/9322688). If you want to see your events in the [Google Analytics Realtime Report](https://support.google.com/analytics/answer/1638635), you need to provide two additional parameters: `session_id` and `engagement_time_msec`. 

### Setting `session_id` and `engagement_time_msec` (recommended)
Both `session_id` and `engagement_time_msec` are [recommended parameters when using the Google Analytics Measurement Protocol](https://developers.google.com/analytics/devguides/collection/protocol/ga4/sending-events?client_type=gtag#recommended_parameters_for_reports) as they are required for user activity to display in standard reports like Realtime.

A `session_id` describes a period of time, during which a user continuously interacts with your extension. By default, a session ends after 30 minutes of user inactivity. There is no limit to how long a session can last. 

In Chrome Extensions, unlike in normal websites, there is no clear notion of a user session. Hence, you have to define what a user session means in your extension. For example, every new user interaction might be a new session. In that case, you can simply generate a new session id with every event (i.e. using a timestamp).  

The following example demonstrates an approach that will timeout a new session after 30 minutes of no events being reported (this time can be customized to better suit your extension’s user behavior). The example uses [`chrome.storage.session`](/docs/extensions/reference/storage/#storage-areas) to store the active session while the browser is running. Together with the session we store the last time an event was fired. This way we can tell if the active session has expired:


```js
const SESSION_EXPIRATION_IN_MIN = 30;

async function getOrCreateSessionId() {
  // Store session in memory storage
  let {sessionData} = await chrome.storage.session.get("sessionData");
  // Check if session exists and is still valid
  const currentTimeInMs = Date.now();
  if (sessionData && sessionData.timestamp) {
    // Calculate how long ago the session was last updated
    const durationInMin = (currentTimeInMs - sessionData.timestamp) / 60000;
    // Check if last update lays past the session expiration threshold
    if (durationInMin > SESSION_EXPIRATION_IN_MIN) {
      // Delete old session id to start a new session
      sessionData = null;
    } else {
      // Update timestamp to keep session alive
      sessionData.timestamp = currentTimeInMs;
      await chrome.storage.session.set({ sessionData });
    }
  }
  if (!sessionData) {
    // Create and store a new session
    sessionData = {
      session_id: currentTimeInMs.toString(),
      timestamp: currentTimeInMs.toString(),
    };
    await chrome.storage.session.set({ sessionData });
  }
  return sessionData.session_id;
}
```


The following example adds `session_id` and `engagement_time_msec` to the previous button click event request. For `engagement_time_msec` you can provide a default value of `100 ms`. 

```js
const GA_ENDPOINT = "https://www.google-analytics.com/mp/collect";
const MEASUREMENT_ID = `G-...`;
const API_SECRET = `...`;
const DEFAULT_ENGAGEMENT_TIME_IN_MSEC = 100;

fetch(
`${GA_ENDPOINT}?measurement_id=${MEASUREMENT_ID}&api_secret=${API_SECRET}`,
  {
    method: "POST",
    body: JSON.stringify({
      client_id: getOrCreateClientId(),
      events: [
        {
          name: "button_clicked",
          params: {
            session_id: await this.getOrCreateSessionId(),
            engagement_time_msec" DEFAULT_ENGAGEMENT_TIME_IN_MSEC,
            id: "my-button",
          },
        },
      ],
    }),
  }
);
```

The event will be displayed as follows in the Google Analytics real-time report.

{% Img src="image/6hHqS5auVgWhN0cQNQztaJx5w4M2/AQqSJb9VqalWfrQ6xSXM.png", alt="Realtime events in Google Analytics. ", width="396", height="414" %}


## Tracking page views in tabs, popup and sidepanel  {: #toc-tracking-pageviews }
The Google Analytics Measurement Protocol supports a special `page_view` event for tracking page views. Use this to track users visiting your popup pages, tab pages or sidepanel. The `page_view` event also requires the `page_title` and `page_location` parameters. The following example fires a page view event at the document [`load`](https://developer.mozilla.org/docs/Web/API/Window/load_event) event for an extension popup.:

{% Label %}popup.js:{% endLabel %}

```js
window.addEventListener("load", () => {
  ${GA_ENDPOINT}?measurement_id=${MEASUREMENT_ID}&api_secret=${API_SECRET}`,
  {
    method: "POST",
    body: JSON.stringify({
      client_id: getOrCreateClientId(),
      events: [
        {
          name: "page_view",
          params: {
            session_id: await this.getOrCreateSessionId(),
            engagement_time_msec" DEFAULT_ENGAGEMENT_TIME_IN_MSEC,
            page_title: document.title, 
            page_location: document.location.href
          },
        },
      ],
    }),
  }
});
```

The `popup.js` script needs to be imported in your popup’s html file and should run before any other script is executed:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Analytics Demo Popup</title>
    <script src="./popup.js" type="module"></script>
  </head>
  <body>
    <h1>Analytics Demo</h1>
  </body>
</html>
```

The popup view will be displayed like any other page view in the Google Analytics Realtime report:

{% Img src="image/6hHqS5auVgWhN0cQNQztaJx5w4M2/m3yzbQtQ0QRBnxEelfZJ.png", alt="Page view event as it is displayed in the Google Analytics Realtime dashboard.", width="400", height="449" %}

## Tracking analytics events in Service Workers  {: #toc-tracking-sw-events }
Using the Google Analytics Measurement Protocol has the added benefit of making it possible to track analytics events in Extension Service Workers. For example, by listening to the [`unhandledrejection event`](https://developer.mozilla.org/docs/Web/API/Window/unhandledrejection_event) in your service worker, you can log any uncaught exceptions in your service worker to Google Analytics, which can greatly help debugging problems your users might report. 

{% Label %}service-worker.js:{% endLabel %}

```js
addEventListener("unhandledrejection", async (event) => {
  `${GA_ENDPOINT}?measurement_id=${MEASUREMENT_ID}&api_secret=${API_SECRET}`,
  {
    method: "POST",
    body: JSON.stringify({
      client_id: getOrCreateClientId(),
      events: [
        {
          // Note: 'error' is a reserved event name and cannot be used
          // see https://developers.google.com/analytics/devguides/collection/protocol/ga4/reference?client_type=gtag#reserved_names
          name: "extension_error",
          params: {
            session_id: await this.getOrCreateSessionId(),
            engagement_time_msec" DEFAULT_ENGAGEMENT_TIME_IN_MSEC,
            message: error.message,
            stack: error.stack,
          },
        },
      ],
    }),
  }
});
```

{% Aside 'caution' %}
Logging exceptions might accidentally leak personal information. Depending on your extension it might be necessary to remove any information from the stack trace that should not be sent to Google Analytics.
{% endAside %}

You can now see the error event in your Google Analytics reports:

{% Img src="image/6hHqS5auVgWhN0cQNQztaJx5w4M2/bjSdrCinS6ZVn2GlbD0v.png", alt="Error event as it is displayed in the Google Analytics events dashboard.", width="800", height="377" %}

## Debugging

Google Analytics provides two helpful features for debugging analytics events into your extension: 

1. A [special debugging endpoint](https://developers.google.com/analytics/devguides/collection/protocol/v1/validating-hits)  `https://www.google-analytics.com**/debug**/mp/collect` that will report any errors in your event definitions. 
1.  The [Google Analytics Realtime Report](https://support.google.com/analytics/answer/1638635) that will display events as they come in.

