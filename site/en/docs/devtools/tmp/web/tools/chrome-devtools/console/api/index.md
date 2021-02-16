---
layout: "layouts/doc-post.njk"
title: "Console API Reference"
authors:
  - kaycebasques
date: 2016-03-21
updated: 2020-07-10
description: "Use the Console API to write messages to the Console."
---

Use the Console API to write messages to the Console from your JavaScript. See [Get Started With
Logging Messages To The Console][1] for an interactive introduction to the topic. See [Console
Utilities API Reference][2] if you're looking for the convenience methods like `debug(function)` or
`monitorEvents(node)` which are only available from the Console.

## console.assert(expression, object) {: #assert }

[Log level][3]: `Error`

Writes an [error][4] to the console when `expression` evaluates to `false`.

```
const x = 5;
const y = 3;
const reason = 'x is expected to be less than y';
console.assert(x < y, {x, y, reason});
```

![The result of the console.assert() example above.](/web/tools/chrome-devtools/console/images/assert.png)

**Figure 1**. The result of the `console.assert()` example above.

## console.clear() {: #clear }

Clears the console.

```
console.clear();
```

If [**Preserve Log**][5] is enabled, `console.clear()` is disabled.

See also: [Clear the Console][6]

## console.count(\[label\]) {: #count }

[Log level][7]: `Info`

Writes the number of times that `count()` has been invoked at the same line and with the same
`label`. Call [`console.countReset([label])`][8] to reset the count.

```
console.count();
console.count('coffee');
console.count();
console.count();
```

![The result of the console.count() example above.](/web/tools/chrome-devtools/console/images/count.png)

**Figure 2**. The result of the `console.count()` example above.

## console.countReset(\[label\]) {: #countreset }

Resets a count.

```
console.countReset();
console.countReset('coffee');
```

## console.debug(object \[, object, ...\]) {: #debug }

[Log level][9]: `Verbose`

Identical to [`console.log(object [, object, ...])`][10] except different log level.

```
console.debug('debug');
```

![The result of the console.debug() example above.](/web/tools/chrome-devtools/console/images/debug.png)

**Figure 3**. The result of the `console.debug()` example above.

## console.dir(object) {: #dir }

[Log level][11]: `Info`

Prints a JSON representation of the specified object.

```
console.dir(document.head);
```

![The result of the console.dir() example above.](/web/tools/chrome-devtools/console/images/dir.png)

**Figure 4**. The result of the `console.dir()` example above.

## console.dirxml(node) {: #dirxml }

[Log level][12]: `Info`

Prints an XML representation of the descendants of `node`.

```
console.dirxml(document);
```

![The result of the console.dirxml() example above.](/web/tools/chrome-devtools/console/images/dirxml.png)

**Figure 5**. The result of the `console.dirxml()` example above.

## console.error(object \[, object, ...\]) {: #error }

[Log level][13]: `Error`

Prints `object` to the Console, formats it as an error, and includes a stack trace.

```
console.error("I'm sorry, Dave. I'm afraid I can't do that.");
```

![The result of the console.error() example above.](/web/tools/chrome-devtools/console/images/error.png)

**Figure 6**. The result of the `console.error()` example above.

## console.group(label) {: #group }

Visually groups messages together until `console.groupEnd(label)` is called. Use
`console.groupCollapsed(label)` to collapse the group when it's initially logged to the Console.

```
const label = 'Adolescent Irradiated Espionage Tortoises';
console.group(label);
console.info('Leo');
console.info('Mike');
console.info('Don');
console.info('Raph');
console.groupEnd(label);
```

![The result of the console.group() example above.](/web/tools/chrome-devtools/console/images/group.png)

**Figure 7**. The result of the `console.group()` example above.

## console.groupCollapsed(label) {: #groupcollapsed }

Same as [`console.group(label)`][14], except the group is initially collapsed when it's logged to
the Console.

## console.groupEnd(label) {: #groupend }

Stops visually grouping messages. See [`console.group`][15].

## console.info(object \[, object, ...\]) {: #info }

[Log level][16]: `Info`

Identical to [`console.log(object [, object, ...])`][17].

```
console.info('info');
```

![The result of the console.info() example above.](/web/tools/chrome-devtools/console/images/info.png)

**Figure 8**. The result of the `console.info()` example above.

## console.log(object \[, object, ...\]) {: #log }

[Log level][18]: `Info`

Prints a message to the Console.

```
console.log('log');
```

![The result of the console.log() example above.](/web/tools/chrome-devtools/console/images/log.png)

**Figure 9**. The result of the `console.log()` example above.

## console.table(array) {: #table }

[Log level][19]: `Info`

Logs an array of objects as a table.

```
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

![The result of the console.table() example above.](/web/tools/chrome-devtools/console/images/table.png)

**Figure 10**. The result of the `console.table()` example above.

## console.time(\[label\]) {: #time }

Starts a new timer. Call `console.timeEnd([label])` to stop the timer and print the elapsed time to
the Console.

```
console.time();
for (var i = 0; i < 100000; i++) {
  let square = i ** 2;
}
console.timeEnd();
```

![The result of the console.time() example above.](/web/tools/chrome-devtools/console/images/time.png)

**Figure 11**. The result of the `console.time()` example above.

## console.timeEnd(\[label\]) {: #timeend }

[Log level][20]: `Info`

Stops a timer. See [`console.time()`][21].

## console.trace() {: #trace }

[Log level][22]: `Info`

Prints a stack trace to the Console.

```
const first = () => { second(); };
const second = () => { third(); };
const third = () => { fourth(); };
const fourth = () => { console.trace(); };
first();
```

![The result of the console.trace() example above.](/web/tools/chrome-devtools/console/images/trace.png)

**Figure 12**. The result of the `console.trace()` example above.

## console.warn(object \[, object, ...\]) {: #warn }

[Log level][23]: `Warning`

Prints a warning to the Console.

```
console.warn('warn');
```

![The result of the console.warn() example above.](/web/tools/chrome-devtools/console/images/warn.png)

**Figure 13**. The result of the `console.warn()` example above.

[1]: /web/tools/chrome-devtools/console/log
[2]: /web/tools/chrome-devtools/console/utilities
[3]: /web/tools/chrome-devtools/console/reference#level
[4]: #error
[5]: /web/tools/chrome-devtools/console/reference#persist
[6]: /web/tools/chrome-devtools/console/reference#clear
[7]: /web/tools/chrome-devtools/console/reference#level
[8]: #countreset
[9]: /web/tools/chrome-devtools/console/reference#level
[10]: #log
[11]: /web/tools/chrome-devtools/console/reference#level
[12]: /web/tools/chrome-devtools/console/reference#level
[13]: /web/tools/chrome-devtools/console/reference#level
[14]: #group
[15]: #group
[16]: /web/tools/chrome-devtools/console/reference#level
[17]: #log
[18]: /web/tools/chrome-devtools/console/reference#level
[19]: /web/tools/chrome-devtools/console/reference#level
[20]: /web/tools/chrome-devtools/console/reference#level
[21]: #time
[22]: /web/tools/chrome-devtools/console/reference#level
[23]: /web/tools/chrome-devtools/console/reference#level
