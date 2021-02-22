---
api: events
---

An `Event` is an object that allows you to be notified when something interesting happens. Here's an
example of using the `chrome.alarms.onAlarm` event to be notified whenever an alarm has elapsed:

```js
chrome.alarms.onAlarm.addListener(function(alarm) {
  appendToLog('alarms.onAlarm --'
              + ' name: '          + alarm.name
              + ' scheduledTime: ' + alarm.scheduledTime);
});
```

As the example shows, you register for notification using `addListener()`. The argument to
`addListener()` is always a function that you define to handle the event, but the parameters to the
function depend on which event you're handling. Checking the documentation for [`alarms.onAlarm`][1],
you can see that the function has a single parameter: an [`alarms.Alarm`][2] object that has details
about the elapsed alarm.

Example APIs using Events: [alarms][3], [i18n][4], [identity][5], [runtime][6]. Most [chrome
APIs][7] do.

## Declarative Event Handlers

The declarative event handlers provide a means to define rules consisting of declarative conditions
and actions. Conditions are evaluated in the browser rather than the JavaScript engine which reduces
roundtrip latencies and allows for very high efficiency.

Declarative event handlers are used for example in the [Declarative Web Request API][8] and
[Declarative Content API][9]. This page describes the underlying concepts of all declarative event
handlers.

### Rules

The simplest possible rule consists of one or more conditions and one or more actions:

```js
var rule = {
  conditions: [ /* my conditions */ ],
  actions: [ /* my actions */ ]
};
```

If any of the conditions is fulfilled, all actions are executed.

In addition to conditions and actions you may give each rule an identifier, which simplifies
unregistering previously registered rules, and a priority to define precedences among rules.
Priorities are only considered if rules conflict each other or need to be executed in a specific
order. Actions are executed in descending order of the priority of their rules.

```js
var rule = {
  id: "my rule",  // optional, will be generated if not set.
  priority: 100,  // optional, defaults to 100.
  conditions: [ /* my conditions */ ],
  actions: [ /* my actions */ ]
};
```

### Event objects

Event objects may support rules. These event objects don't call a callback function when
events happen but test whether any registered rule has at least one fulfilled condition and execute
the actions associated with this rule. Event objects supporting the declarative API have three
relevant methods: [`events.Event.addRules`][11], [`events.Event.removeRules`][12], and
[`events.Event.getRules`][13].

### Adding rules

To add rules call the `addRules()` function of the event object. It takes an array of rule instances
as its first parameter and a callback function that is called on completion.

```js
var rule_list = [rule1, rule2, ...];
function addRules(rule_list, function callback(details) {...});
```

If the rules were inserted successfully, the `details` parameter contains an array of inserted rules
appearing in the same order as in the passed `rule_list` where the optional parameters `id` and
`priority` were filled with the generated values. If any rule is invalid, e.g., because it contained
an invalid condition or action, none of the rules are added and the [runtime.lastError][14] variable
is set when the callback function is called. Each rule in `rule_list` must contain a unique
identifier that is not currently used by another rule or an empty identifier.

{% Aside %}

**Note:** Rules are persistent across browsing sessions. Therefore, you should install rules during
extension installation time using the [`runtime.onInstalled`][15] event. Note that this event is
also triggered when an extension is updated. Therefore, you should first clear previously installed
rules and then register new rules.

{% endAside %}

### Removing rules

To remove rules call the `removeRules()` function. It accepts an optional array of rule identifiers
as its first parameter and a callback function as its second parameter.

```js
var rule_ids = ["id1", "id2", ...];
function removeRules(rule_ids, function callback() {...});
```

If `rule_ids` is an array of identifiers, all rules having identifiers listed in the array are
removed. If `rule_ids` lists an identifier, that is unknown, this identifier is silently ignored. If
`rule_ids` is `undefined`, all registered rules of this extension are removed. The `callback()`
function is called when the rules were removed.

### Retrieving rules

To retrieve a list of currently registered rules, call the `getRules()` function. It accepts an
optional array of rule identifiers with the same semantics as `removeRules` and a callback function.

```js
var rule_ids = ["id1", "id2", ...];
function getRules(rule_ids, function callback(details) {...});
```

The `details` parameter passed to the `callback()` function refers to an array of rules including
filled optional parameters.

### Performance

To achieve maximum performance, you should keep the following guidelines in mind:

- Register and unregister rules in bulk. After each registration or unregistration, Chrome needs to
  update internal data structures. This update is an expensive operation.

  Instead of

  ```js
  var rule1 = {...};
  var rule2 = {...};
  chrome.declarativeWebRequest.onRequest.addRules([rule1]);
  chrome.declarativeWebRequest.onRequest.addRules([rule2]);
  ```

  prefer to write

  ```js
  var rule1 = {...};
  var rule2 = {...};
  chrome.declarativeWebRequest.onRequest.addRules([rule1, rule2]);
  ```

- Prefer substring matching over matching using regular expressions in a [events.UrlFilter][16].
  Substring based matching is extremely fast.

  Instead of

  ```js
  var match = new chrome.declarativeWebRequest.RequestMatcher({
      url: {urlMatches: "example.com/[^?]*foo" } });
  ```

  prefer to write

  ```js
  var match = new chrome.declarativeWebRequest.RequestMatcher({
      url: {hostSuffix: "example.com", pathContains: "foo"} });
  ```

- If you have many rules that all share the same actions, you may merge the rules into one because
  rules trigger their actions as soon as a single condition is fulfilled. This speeds up the
  matching and reduces memory consumption for duplicate action sets.

  Instead of

  ```js
  var condition1 = new chrome.declarativeWebRequest.RequestMatcher({
      url: { hostSuffix: 'example.com' } });
  var condition2 = new chrome.declarativeWebRequest.RequestMatcher({
      url: { hostSuffix: 'foobar.com' } });
  var rule1 = { conditions: [condition1],
                actions: [new chrome.declarativeWebRequest.CancelRequest()]};
  var rule2 = { conditions: [condition2],
                actions: [new chrome.declarativeWebRequest.CancelRequest()]};
  chrome.declarativeWebRequest.onRequest.addRules([rule1, rule2]);
  ```

  prefer to write

  ```js
  var rule = { conditions: [condition1, condition2],
                actions: [new chrome.declarativeWebRequest.CancelRequest()]};
  chrome.declarativeWebRequest.onRequest.addRules([rule]);
  ```

## Filtered events {: #filtered }

Filtered events are a mechanism that allows listeners to specify a subset of events that they are
interested in. A listener that makes use of a filter won't be invoked for events that don't pass the
filter, which makes the listening code more declarative and efficient - an [event page][17] page
need not be woken up to handle events it doesn't care about.

Filtered events are intended to allow a transition from manual filtering code like this:

```js
chrome.webNavigation.onCommitted.addListener(function(e) {
  if (hasHostSuffix(e.url, 'google.com') ||
      hasHostSuffix(e.url, 'google.com.au')) {
    // ...
  }
});
```

into this:

```js
chrome.webNavigation.onCommitted.addListener(function(e) {
  // ...
}, {url: [{hostSuffix: 'google.com'},
          {hostSuffix: 'google.com.au'}]});
```

Events support specific filters that are meaningful to that event. The list of filters that an event
supports will be listed in the documentation for that event in the "filters" section.

When matching URLs (as in the example above), event filters support the same URL matching
capabilities as expressible with a [`events.UrlFilter`][18], except for scheme and port matching.

[1]: /docs/extensions/reference/alarms#event-onAlarm
[2]: /docs/extensions/reference/alarms#type-Alarm
[3]: /docs/extensions/reference/alarms
[4]: /docs/extensions/reference/i18n
[5]: /docs/extensions/reference/identity
[6]: /docs/extensions/reference/runtime
[7]: /docs/extensions/reference
[8]: /docs/extensions/reference/declarativeWebRequest
[9]: /docs/extensions/reference/declarativeContent
[10]: /docs/extensions/reference/events
[11]: #method-Event-addRules
[12]: #method-Event-removeRules
[13]: #method-Event-getRules
[14]: /docs/extensions/reference/runtime#property-lastError
[15]: /docs/extensions/reference/runtime#event-onInstalled
[16]: #type-UrlFilter
[17]: /docs/extensions/mv2/event_pages
[18]: #type-UrlFilter
