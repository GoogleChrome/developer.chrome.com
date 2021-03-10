---
layout: "layouts/doc-post.njk"
title: "Console API reference"
authors:
  - kaycebasques
date: 2016-03-21
#updated: YYYY-MM-DD
description: "Use the Console API to write messages to the Console."
---

Use the Console API to write messages to the Console from your JavaScript. See [Get Started With
Logging Messages To The Console][1] for an interactive introduction to the topic. See [Console
Utilities API Reference][2] if you're looking for the convenience methods like `debug(function)` or
`monitorEvents(node)` which are only available from the Console.

## console.assert(expression, object) {: #assert }

[Log level][3]: `Error`

Writes an [error][4] to the console when `expression` evaluates to `false`.

```js
const x = 5;
const y = 3;
const reason = 'x is expected to be less than y';
console.assert(x < y, {x, y, reason});
```

{% Img src="image/admin/cS62AuHJfLVVaDYf3OEL.png", alt="The result of the console.assert() example above.", width="800", height="447" %}

**Figure 1**. The result of the `console.assert()` example above.

## console.clear() {: #clear }

Clears the console.

```js
console.clear();
```

If [**Preserve Log**][5] is enabled, `console.clear()` is disabled.

See also: [Clear the Console][6]

## console.count(\[label\]) {: #count }

[Log level][7]: `Info`

Writes the number of times that `count()` has been invoked at the same line and with the same
`label`. Call [`console.countReset([label])`][8] to reset the count.

```js
console.count();
console.count('coffee');
console.count();
console.count();
```

{% Img src="image/admin/XNCvcoyyu8TabN0K1pjL.png", alt="The result of the console.count() example above.", width="800", height="507" %}

**Figure 2**. The result of the `console.count()` example above.

## console.countReset(\[label\]) {: #countreset }

Resets a count.

```js
console.countReset();
console.countReset('coffee');
```

## console.debug(object \[, object, ...\]) {: #debug }

[Log level][9]: `Verbose`

Identical to [`console.log(object [, object, ...])`][10] except different log level.

```js
console.debug('debug');
```

{% Img src="image/admin/GuN0auKEMAdVW9j8wW7J.png", alt="The result of the console.debug() example above.", width="800", height="526" %}

**Figure 3**. The result of the `console.debug()` example above.

## console.dir(object) {: #dir }

[Log level][11]: `Info`

Prints a JSON representation of the specified object.

```js
console.dir(document.head);
```

{% Img src="image/admin/2aLQxuFHsyzYIuBzz5Mp.png", alt="The result of the console.dir() example above.", width="800", height="590" %}

**Figure 4**. The result of the `console.dir()` example above.

## console.dirxml(node) {: #dirxml }

[Log level][12]: `Info`

Prints an XML representation of the descendants of `node`.

```js
console.dirxml(document);
```

{% Img src="image/admin/JIDSgSq8UQf7YIt6w1vw.png", alt="The result of the console.dirxml() example above.", width="800", height="561" %}

**Figure 5**. The result of the `console.dirxml()` example above.

## console.error(object \[, object, ...\]) {: #error }

[Log level][13]: `Error`

Prints `object` to the Console, formats it as an error, and includes a stack trace.

```js
console.error("I'm sorry, Dave. I'm afraid I can't do that.");
```

{% Img src="image/admin/Pfsjy00hVaI53iAhOhNt.png", alt="The result of the console.error() example above.", width="800", height="550" %}

**Figure 6**. The result of the `console.error()` example above.

## console.group(label) {: #group }

Visually groups messages together until `console.groupEnd(label)` is called. Use
`console.groupCollapsed(label)` to collapse the group when it's initially logged to the Console.

```js
const label = 'Adolescent Irradiated Espionage Tortoises';
console.group(label);
console.info('Leo');
console.info('Mike');
console.info('Don');
console.info('Raph');
console.groupEnd(label);
```

{% Img src="image/admin/nXx5Fyu0l3p3jm3ooD77.png", alt="The result of the console.group() example above.", width="800", height="513" %}

**Figure 7**. The result of the `console.group()` example above.

## console.groupCollapsed(label) {: #groupcollapsed }

Same as [`console.group(label)`][14], except the group is initially collapsed when it's logged to
the Console.

## console.groupEnd(label) {: #groupend }

Stops visually grouping messages. See [`console.group`][15].

## console.info(object \[, object, ...\]) {: #info }

[Log level][16]: `Info`

Identical to [`console.log(object [, object, ...])`][17].

```js
console.info('info');
```

{% Img src="image/admin/tIWshweM0G6hiTKzhfCw.png", alt="The result of the console.info() example above.", width="800", height="477" %}

**Figure 8**. The result of the `console.info()` example above.

## console.log(object \[, object, ...\]) {: #log }

[Log level][18]: `Info`

Prints a message to the Console.

```js
console.log('log');
```

{% Img src="image/admin/4NsJDaAjDpipnzkmkfDU.png", alt="The result of the console.log() example above.", width="800", height="477" %}

**Figure 9**. The result of the `console.log()` example above.

## console.table(array) {: #table }

[Log level][19]: `Info`

Logs an array of objects as a table.

```js
console.table([
  {
    first: 'René',
    last: 'Magritte',
  },
  {
    first: 'Chaim',
    last: 'Soutine',
    birthday: '18930113',
  },
  {
    first: 'Henri',
    last: 'Matisse',
  }
]);
```

{% Img src="image/admin/RDdME5SuTCjNFtXKxTUh.png", alt="The result of the console.table() example above.", width="800", height="488" %}

**Figure 10**. The result of the `console.table()` example above.

## console.time(\[label\]) {: #time }

Starts a new timer. Call `console.timeEnd([label])` to stop the timer and print the elapsed time to
the Console.

```js
console.time();
for (var i = 0; i < 100000; i++) {
  let square = i ** 2;
}
console.timeEnd();
```

{% Img src="image/admin/9yLfjQpQZ9fBNdRCI7U1.png", alt="The result of the console.time() example above.", width="800", height="514" %}

**Figure 11**. The result of the `console.time()` example above.

## console.timeEnd(\[label\]) {: #timeend }

[Log level][20]: `Info`

Stops a timer. See [`console.time()`][21].

## console.trace() {: #trace }

[Log level][22]: `Info`

Prints a stack trace to the Console.

```js
const first = () => { second(); };
const second = () => { third(); };
const third = () => { fourth(); };
const fourth = () => { console.trace(); };
first();
```

{% Img src="image/admin/uO2xhv9WrEjpUHpT3lLN.png", alt="The result of the console.trace() example above.", width="800", height="498" %}

**Figure 12**. The result of the `console.trace()` example above.

## console.warn(object \[, object, ...\]) {: #warn }

[Log level][23]: `Warning`

Prints a warning to the Console.

```js
console.warn('warn');
```

{% Img src="image/admin/CsGNmsnQn4GnJRaR339w.png", alt="The result of the console.warn() example above.", width="800", height="481" %}

**Figure 13**. The result of the `console.warn()` example above.

[1]: /docs/devtools/console/log
[2]: /docs/devtools/console/utilities
[3]: /docs/devtools/console/reference#level
[4]: #error
[5]: /docs/devtools/console/reference#persist
[6]: /docs/devtools/console/reference#clear
[7]: /docs/devtools/console/reference#level
[8]: #countreset
[9]: /docs/devtools/console/reference#level
[10]: #log
[11]: /docs/devtools/console/reference#level
[12]: /docs/devtools/console/reference#level
[13]: /docs/devtools/console/reference#level
[14]: #group
[15]: #group
[16]: /docs/devtools/console/reference#level
[17]: #log
[18]: /docs/devtools/console/reference#level
[19]: /docs/devtools/console/reference#level
[20]: /docs/devtools/console/reference#level
[21]: #time
[22]: /docs/devtools/console/reference#level
[23]: /docs/devtools/console/reference#level
