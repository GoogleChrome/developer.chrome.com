---
layout: "layouts/doc-post.njk"
title: "Diagnose and Log to Console"
authors:
  - pbakaus
  - megginkearney
  - flaviocopes
date: 2015-04-13
updated: 2020-07-10
description: "Console logging is a powerful way to inspect what your page or application does. Let&#39;s start with console.log() and explore other advanced usage."
---

!!!.aside.aside--warning

This page is deprecated.

!!!

Console logging is a powerful way to inspect what your page or application does. Let's start with
console.log() and explore other advanced usage.

## TL;DR {: #tldr }

- Use [console.log()][1] for basic logging
- Use [console.error()][2] and [console.warn()][3] for eye-catching stuff
- Use [console.group()][4] and [console.groupEnd()][5] to group related messages and avoid clutter
- Use [console.assert()][6] to show conditional error messages

## Writing to the console {: #writing_to_the_console }

Use the [console.log()][7] method for any basic logging to the console. It takes one or more
expressions as parameters and writes their current values to the console, concatenating multiple
parameters into a space-delimited line.

Executing this line of code in your JavaScript:

```js
console.log("Node count:", a.childNodes.length, "and the current time is:", Date.now());
```

Will output this in the Console:
{% Img src="image/admin/pwWQ9y5zdiEqQGGzCilY.png", alt="Log Multiple", width="800", height="145" %}

## Autocompleting commands {: #autocomplete }

When you type in the Console, the Console automatically displays an autocomplete dropdown menu of
relevant methods that match the text that you have already typed. This includes previous commands
that you executed.

{% Img src="image/admin/q1Jk3l0Kt9XdDomLWCL8.png", alt="example of autocomplete", width="800", height="769" %}

## Organizing Console output {: #organizing }

### Group messages together {: #group_messages_together }

You can group related output together with the group commands. The [`console.group()`][8] command
takes a single string parameter to set the name of the group. After calling it in your JavaScript,
the console will begin to group all subsequent output together.

To end the grouping you only need to call [`console.groupEnd()`][9] when you're done.

Example input:

```js
var user = "jsmith", authenticated = false;
console.group("Authentication phase");
console.log("Authenticating user '%s'", user);
// authentication code here...
if (!authenticated) {
    console.log("User '%s' not authenticated.", user)
}
console.groupEnd();
```

Example output:
{% Img src="image/admin/j2QgLIGrjVG7zrICvTV7.png", alt="Simple console group output", width="800", height="183" %}

#### Nested groups {: #nested_groups }

Log groups may also nest within each other. This is useful to see a large group in smaller pieces at
a time.

This example shows a log group for the authentication phase of a login process:

```js
var user = "jsmith", authenticated = true, authorized = true;
// Top-level group
console.group("Authenticating user '%s'", user);
if (authenticated) {
    console.log("User '%s' was authenticated", user);
    // Start nested group
    console.group("Authorizing user '%s'", user);
    if (authorized) {
        console.log("User '%s' was authorized.", user);
    }
    // End nested group
    console.groupEnd();
}
// End top-level group
console.groupEnd();
console.log("A group-less log trace.");
```

And here's the nested groups output in the console:
{% Img src="image/admin/diMvCAsFDsQKdJyjG0ch.png", alt="Simple console group output", width="800", height="223" %}

#### Auto-collapsing groups {: #auto-collapsing_groups }

When using groups heavily, it can be very useful to not see everything as it happens. For these
times you can automatically collapse groups by calling [`console.groupCollapsed()`][10] instead of
`console.group()`:

```js
console.groupCollapsed("Authenticating user '%s'", user);
if (authenticated) {
    ...
}
console.groupEnd();
```

groupCollapsed() output:
{% Img src="image/admin/0E09ohyas3O6fgaZ9Fnn.png", alt="Initially collapsed group", width="800", height="164" %}

## Errors and warnings {: #errors_and_warnings }

Errors and warnings act the same way as normal logging. The only difference is `error()` and
`warn()` have styles to bring attention to them.

### console.error() {: #consoleerror }

The [`console.error()`][11] method displays a red icon along with red message text:

```js
function connectToServer() {
    console.error("Error: %s (%i)", "Server is  not responding",500);
}
connectToServer();
```

turns into

{% Img src="image/admin/k0eARpgPxTUgnVPshAF3.png", alt="Error example output", width="800", height="226" %}

### console.warn() {: #consolewarn }

The [`console.warn()`][12] method displays a yellow warning icon with the message text:

```js
if(a.childNodes.length < 3 ) {
    console.warn('Warning! Too few nodes (%d)', a.childNodes.length);
}
```

turns into

{% Img src="image/admin/RdU6itMGeX0foYrb1WbT.png", alt="Warn example", width="800", height="142" %}

## Assertions {: #assertions }

The [`console.assert()`][13] method conditionally displays an error string (its second parameter)
only if its first parameter evaluates to `false`.

### A simple assertion and how it displays {: #a_simple_assertion_and_how_it_displays }

The following code will cause an error message in the console only if the number of child nodes
belonging to the `list` element is greater than 500.

```js
console.assert(list.childNodes.length <= 500, "Node count is > 500");
```

How an assertion failure displays in the console:
{% Img src="image/admin/zIZbyTOS1WYXeqQJ9qOW.png", alt="Assertion failed", width="800", height="142" %}

## String substitution and formatting {: #string_substitution_and_formatting }

The first parameter passed to any of the logging methods may contain one or more format specifiers.
A format specifier consists of a `%` symbol followed by a letter that indicates the formatting that
applies to the value. The parameters following the string apply to the placeholders in order.

The following example uses the string and digit formatters to insert values into the output string.
You will see "Sam has 100 points" in the console.

```js
console.log("%s has %d points", "Sam", 100);
```

The full list of format specifiers is:

<table><thead><tr><th>Specifier</th><th style="text-align: left">Output</th></tr></thead><tbody><tr><td>%s</td><td style="text-align: left">Formats the value as a string</td></tr><tr><td>%i or %d</td><td style="text-align: left">Formats the value as an integer</td></tr><tr><td>%f</td><td style="text-align: left">Formats the value as a floating point value</td></tr><tr><td>%o</td><td style="text-align: left">Formats the value as an expandable DOM element. As seen in the Elements panel</td></tr><tr><td>%O</td><td style="text-align: left">Formats the value as an expandable JavaScript object</td></tr><tr><td>%c</td><td style="text-align: left">Applies CSS style rules to the output string as specified by the second parameter</td></tr></tbody></table>

This example uses the digit specifier to format the value of `document.childNodes.length`. It also
uses the floating point specifier to format the value of `Date.now()`.

The code:

```js
console.log("Node count: %d, and the time is %f.", document.childNodes.length, Date.now());
```

The output of the previous code sample:
![Example substitution output](/web/tools/chrome-devtools/console/images/console-write-log-multiple.png)

### Styling console output with CSS {: #styling_console_output_with_css }

The CSS format specifier allows you to customize the display in the console. Start the string with
the specifier and give the style you wish to apply as the second parameter.

Try this code:

```js
console.log("%cThis will be formatted with large, blue text", "color: blue; font-size: x-large");
```

..to make your log output large and blue:

{% Img src="image/admin/sDAr9UIoHr1mbFga8NBS.png", alt="Formatted string", width="800", height="236" %}

### Formatting DOM elements as JavaScript objects {: #formatting_dom_elements_as_javascript_objects }

By default, DOM elements are logged into the console as representation of their HTML, but sometimes
you want to access the DOM element as JavaScript object and inspect its properties. You can use the
`%O` string specifier to do that (see above), or use `console.dir` to achieve the same:

{% Img src="image/admin/loRrwjLCDtEOqfTC93Dd.png", alt="Logging an element using dir()", width="800", height="324" %}

[1]: /web/tools/chrome-devtools/console/console-reference#log
[2]: /web/tools/chrome-devtools/debug/console/console-reference#error
[3]: /web/tools/chrome-devtools/debug/console/console-reference#warn
[4]: /web/tools/chrome-devtools/debug/console/console-reference#group
[5]: /web/tools/chrome-devtools/debug/console/console-reference#groupend
[6]: /web/tools/chrome-devtools/debug/console/console-reference#assert
[7]: /web/tools/chrome-devtools/debug/console/console-reference#consolelogobject--object-
[8]:
  https://developers.google.com/web/tools/chrome-devtools/console/console-reference#consolegroupobject-object-
[9]:
  https://developers.google.com/web/tools/chrome-devtools/console/console-reference#consolegroupend
[10]:
  https://developers.google.com/web/tools/chrome-devtools/console/console-reference#consolegroupcollapsedobject-object-
[11]:
  https://developers.google.com/web/tools/chrome-devtools/console/console-reference#consoleerrorobject--object-
[12]:
  https://developers.google.com/web/tools/chrome-devtools/console/console-reference#consolewarnobject--object-
[13]:
  https://developers.google.com/web/tools/chrome-devtools/console/console-reference#consoleassertexpression-object
