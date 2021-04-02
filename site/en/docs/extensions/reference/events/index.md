---
api: events
---

## Manifest

*
* No manifest, no methods, this is just a namespace for event types.
*


An `Event` is an object that allows you to be notified when something interesting happens. Here's an
example of using the `chrome.alarms.onAlarm` event to be notified whenever an alarm has elapsed:

```js
chrome.alarms.onAlarm.addListener(function(alarm) {
  appendToLog('alarms.onAlarm --'
              + ' name: '          + alarm.name
              + ' scheduledTime: ' + alarm.scheduledTime);
});
```

{% Aside %}
See [Using chrome.events][howto-events] for an expanded explanation of how to use this
API.
{% endAside %}

[howto-events][/docs/extensions/api-howto/events]
