---
api: alarms
---

## Manifest {: #manifest }

To use the `chrome.alarms` API, declare the `"alarms"` permission in the [manifest][doc-manifest]:

```json
{
  "name": "My extension",
  ...
  "permissions": [
    "alarms"
  ],
  ...
}
```

## Concepts and usage

### Device sleep

The behavior of alarms when a device goes to sleep is currently undefined. An alarm will never fire
early but may fire significantly later than expected if a device went to sleep after an alarm was
scheduled.

### Persistence

Alarms generally persist until an extension is updated. However, this is not guaranteed, and alarms
may be cleared when the browser is restarted. Consequently, consider setting a value in storage
when an alarm is created, and then ensure it exists each time your service worker starts up. For example:

```js
const STORAGE_KEY = "user-preference-alarm-enabled";

async function checkAlarmState() {
  const { alarmEnabled } = await chrome.storage.get(STORAGE_KEY);

  if (alarmEnabled) {
    const alarm = await chrome.alarms.get("my-alarm");

    if (!alarm) {
      await chrome.alarms.create({ periodInMinutes: 1 });
    }
  }
}

checkAlarmState();
```


## Examples

The following examples show how to use and respond to an alarm. To try this API,
install the [Alarm API example][sample-example] from the [chrome-extension-samples][repo-samples]
repository.

### Set an alarm {: #set-alarm }

The following example sets an alarm in the service worker when the extension is installed:

{% Label %}service-worker.js:{% endLabel %}

```js
chrome.runtime.onInstalled.addListener(async ({ reason }) => {
  if (reason !== 'install') {
    return;
  }

  // Create an alarm so we have something to look at in the demo
  await chrome.alarms.create('demo-default-alarm', {
    delayInMinutes: 1,
    periodInMinutes: 1
  });
});
```

{% Aside %}

**Chrome 120:** Starting in Chrome 120, the minimum alarm interval has been reduced from 1 minute to 30 seconds. For an alarm to trigger in 30 seconds, set `periodInMinutes: 0.5`. 

**Chrome 117:** Starting in Chrome 117, the number of active alarms is limited to 500. Once this limit is reached, `chrome.alarms.create()` will fail. When using a callback, [`chrome.runtime.lastError`][last-error] will be set. When using promises, the promise will be rejected.

{% endAside %}

### Respond to an alarm {: #respond-alarm }

The following example sets the [action toolbar icon][action-icon] based on the name of the alarm that went off.

{% Label %}service-worker.js:{% endLabel %}

```js
chrome.alarms.onAlarm.addListener((alarm) => {
  chrome.action.setIcon({
    path: getIconPath(alarm.name),
  });
});
```

[repo-samples]: https://github.com/GoogleChrome/chrome-extensions-samples
[sample-example]: https://github.com/GoogleChrome/chrome-extensions-samples/tree/main/api-samples/alarms
[action-icon]: /docs/extensions/reference/action/#icon
[doc-manifest]: /docs/extensions/mv3/manifest/
[last-error]: /docs/extensions/reference/runtime/#property-lastError
