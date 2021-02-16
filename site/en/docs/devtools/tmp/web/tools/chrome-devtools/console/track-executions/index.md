---
layout: "layouts/doc-post.njk"
title: "Measure and count executions"
authors:
  - megginkearney
  - flaviocopes
  - pbakaus
date: 2015-04-13
updated: 2020-07-10
description: "Take advantage of the Console API to measure execution times and count statement executions."
---

!!!.aside.aside--warning

This page is deprecated.

!!!

Take advantage of the Console API to measure execution times and count statement executions.

## TL;DR {: #tldr }

- Use `console.time()` and `console.timeEnd()` to track time elapsed between code execution points.
- Use `console.count()` to count how many times the same string is passed to a function.

## Measure execution times {: #measure_execution_times }

The [`time()`][1] method starts a new timer and is very useful to measure how long something took.
Pass a string to the method to give the marker a name.

When you want to stop the timer, call [`timeEnd()`][2] and pass it the same string passed to the
initializer.

The console then logs the label and time elapsed when the `timeEnd()` method fires.

### Basic example {: #basic_example }

Here, we measure the initialization of a million new Arrays:

```js
console.time("Array initialize");
var array= new Array(1000000);
for (var i = array.length - 1; i >= 0; i--) {
    array[i] = new Object();
};
console.timeEnd("Array initialize");
```

Which outputs the following in the Console:
{% Img src="image/admin/R9EZaXdVVNekxacYFAlg.png", alt="Time elapsed", width="800", height="147" %}

### Timers on the Timeline {: #timers_on_the_timeline }

When a [Timeline][3] recording is taking place during a `time()` operation, it annotates the
timeline as well. Use it when you want to trace what your application does and where it comes from.

How an annotation on the timeline looks from `time()`:

{% Img src="image/admin/8fFyWajZEKi7rA7JjHJM.png", alt="Time annotation on timeline", width="800", height="392" %}

### Marking the Timeline {: #marking_the_timeline }

_Note: The `timeStamp()` method only functions while a Timeline recording is in progress._

The [Timeline panel][4] provides a complete overview of where the engine spends time. You can add a
mark to the timeline from the console with the [`timeStamp()`][5]. This is a simple way to correlate
events in your application with other events.

The `timeStamp()` annotates the Timeline in the following places:

- A yellow vertical line in the Timeline's summary and details view.
- It adds a record to the list of events.

The following example code:

```js
function AddResult(name, result) {
    console.timeStamp("Adding result");
    var text = name + ': ' + result;
    var results = document.getElementById("results");
    results.innerHTML += (text + "<br>");
}
```

Results in the following Timeline timestamps:

{% Img src="image/admin/xNFqZmelqrEX7ecbYNdq.png", alt="Timestamps in the timeline", width="800", height="470" %}

## Counting statement executions {: #counting_statement_executions }

Use the `count()` method to log a provided string along with the number of times the same string has
been provided. When the exact statement is given to `count()` on the same line, the number is
incremented.

Example code of using `count()` with some dynamic content:

```js
function login(user) {
    console.count("Login called for user " + user);
}

users = [ // by last name since we have too many Pauls.
    'Irish',
    'Bakaus',
    'Kinlan'
];

users.forEach(function(element, index, array) {
    login(element);
});

login(users[0]);
```

Output of the code sample:

{% Img src="image/admin/M2HKTeq7Q3sgGDTl9NWb.png", alt="console.count() example output", width="544", height="216" %}

[1]:
  https://developers.google.com/web/tools/chrome-devtools/console/console-reference#consoletimelabel
[2]:
  https://developers.google.com/web/tools/chrome-devtools/console/console-reference#consoletimeendlabel
[3]: /web/tools/chrome-devtools/profile/evaluate-performance/timeline-tool
[4]: /web/tools/chrome-devtools/profile/evaluate-performance/timeline-tool
[5]:
  https://developers.google.com/web/tools/chrome-devtools/console/console-reference#consoletimestamplabel
