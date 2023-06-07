---
api: alarms
---

## Examples

The following examples show how to use and respond to an alarm. To try this API,
install the [Alarm API example][sample-example] from the [chrome-extension-samples][repo-samples]
repository.

### Set an alarm

The following example sets an alarm in the service worker when the extension is installed, but not when it, Chrome or any shared module is updated.

{% Label %}service-worker.js:{% endLabel %}

```javascript
chrome.runtime.onInstalled.addListener(({ reason }) => {
  if (reason !== chrome.runtime.OnInstalledReason.INSTALL) {
    return;
  }

  // Create an alarm so we have something to look at in the demo
  chrome.alarms.create('demo-default-alarm', {
    delayInMinutes: 1,
    periodInMinutes: 1
  });
});
```

### Respond to an alarm

The following example sets san icon based on the name of the alarm that went off.

{% Label %}service-worker.js or other extension script:{% endLabel %}

```javascript
chrome.alarms.onAlarm.addListener((alarm) => {
  chrome.action.setIcon({
    path: getIconPath(alarm.name),
  });
});
```

[repo-samples]: https://github.com/GoogleChrome/chrome-extensions-samples
[sample-example]; https://github.com/GoogleChrome/chrome-extensions-samples/tree/main/api-samples/alarms