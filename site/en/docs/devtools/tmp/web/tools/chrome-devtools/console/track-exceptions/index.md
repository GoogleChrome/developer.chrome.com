---
layout: "layouts/doc-post.njk"
title: "Exception and Error Handling"
authors:
  - megginkearney
  - flaviocopes
date: 2015-04-13
updated: 2020-07-10
description: "Chrome DevTools provides tools to help you fix web pages throwing exceptions and debug errors in your JavaScript."
---

!!!.aside.aside--warning

This page is deprecated.

!!!

Chrome DevTools provides tools to help you fix web pages throwing exceptions and debug errors in
your JavaScript.

Page exceptions and JavaScript errors are actually quite useful - if you can get to the details
behind them. When a page throws an exception or a script produces an error, the Console provides
specific, reliable information to help you locate and correct the problem.

In the Console you can track exceptions and trace the execution path that led to them, explicitly or
implicitly catch them (or ignore them), and even set error handlers to automatically collect and
process exception data.

## TL;DR {: #tldr }

- Turn on Pause on Exceptions to debug the code context when the exception triggered.
- Print current JavaScript call stack using `console.trace`.
- Place assertions in your code and throw exceptions using `console.assert()`.
- Log errors happening in the browser using `window.onerror`.

## Track exceptions {: #track_exceptions }

When something goes wrong, open the DevTools console (`Ctrl+Shift+J` / `Cmd+Option+J`) to view the
JavaScript error messages. Each message has a link to the file name with the line number you can
navigate to.

An example of an exception:
{% Img src="image/admin/3Dmm0wAHO6zCFF2J4F6M.jpg", alt="Exception example", width="800", height="345" %}

### View exception stack trace {: #view_exception_stack_trace }

It's not always obvious which execution path lead to an error. Complete JavaScript call stacks
accompany exceptions in the console. Expand these console messages to see the stack frames and
navigate to the corresponding locations in the code:

{% Img src="image/admin/ksn0ZRTY6gTp6ayL5OsC.jpg", alt="Exception stack trace", width="800", height="495" %}

### Pause on JavaScript exceptions {: #pause_on_javascript_exceptions }

The next time an exception is thrown, pause JavaScript execution and inspect its call stack, scope
variables, and state of your app. A tri-state stop button at the bottom of the Scripts panel enables
you to switch among different exception handling modes:
{% Img src="image/admin/XTxxlHNkmrUTP2U6Nkdw.png", alt="Pause button", width="24", height="20" %}

Choose to either pause on all exceptions or only on the uncaught ones or you can ignore exceptions
altogether.

{% Img src="image/admin/xCmNmd5AfJsR0s3RlNTB.jpg", alt="Pause execution", width="800", height="317" %}

## Print stack traces {: #print_stack_traces }

Better understand how your web page behaves by printing log messages to the console. Make the log
entries more informative by including associated stack traces. There are several ways of doing that.

### Error.stack {: #errorstack }

Each Error object has a string property named stack that contains the stack trace:

{% Img src="image/admin/tGYJ6nZnaWJ9n6Hz4PA2.jpg", alt="Error.stack example", width="665", height="454" %}

### console.trace() {: #consoletrace }

Instrument your code with [`console.trace()`][1] calls that print current JavaScript call stacks:

{% Img src="image/admin/BW2bUApaMUTaSxrsGppS.jpg", alt="console.trace() example", width="800", height="473" %}

### console.assert() {: #consoleassert }

Place assertions in your JavaScript code by calling [`console.assert()`][2] with the error condition
as the first parameter. When this expression evaluates to false, you will see a corresponding
console record:

{% Img src="image/admin/oEVpZWlOhcgfwZQTjvj1.jpg", alt="console.assert() example", width="800", height="495" %}

## How to examine stack trace to find triggers {: #how_to_examine_stack_trace_to_find_triggers }

Let's see how to use the tools you've just learned about, and find the real cause of an error.
Here's a simple HTML page that includes two scripts:

{% Img src="image/admin/mufGpW3JtKnESRnc8JsA.png", alt="Example code", width="554", height="550" %}

When the user clicks on the page, the paragraph changes its inner text, and the `callLibMethod()`
function provided by `lib.js` is called.

This function prints a `console.log`, and then calls `console.slog`, a method not provided by the
Console API. This should trigger an error.

When the page is run and you click on it, this error is triggered:

{% Img src="image/admin/rk4smGIzlRJoofaq4OHo.png", alt="Error triggered", width="749", height="139" %}

Click the arrow to can expand the error message:

{% Img src="image/admin/lAMeZLn7NAE7lOdH70O4.png", alt="Error message expanded", width="561", height="191" %}

The Console tells you the error was triggered in `lib.js`, line 4, which was called by `script.js`
in the `addEventListener` callback, an anonymous function, in line 3.

This is a very simple example, but even the most complicated log trace debugging follows the same
process.

## Handle runtime exceptions using window.onerror {: #handle_runtime_exceptions_using_windowonerror }

Chrome exposes the `window.onerror` handler function, called whenever an error happens in the
JavaScript code execution. Whenever a JavaScript exception is thrown in the window context and is
not caught by a try/catch block, the function is invoked with the exception's message, the URL of
the file where the exception was thrown, and the line number in that file, passed as three arguments
in that order.

You may find it useful to set an error handler that would collect information about uncaught
exceptions and report it back to your server using an AJAX POST call, for example. In this way, you
can log all the errors happening in the user's browser, and be notified about them.

Example of using `window.onerror`:

{% Img src="image/admin/2tiXcRaAhY5LRqCrueA2.jpg", alt="Example of window.onerror handler", width="786", height="373" %}

[1]:
  https://developers.google.com/web/tools/chrome-devtools/console/console-reference#consoletraceobject
[2]:
  https://developers.google.com/web/tools/chrome-devtools/console/console-reference#consoleassertexpression-object
