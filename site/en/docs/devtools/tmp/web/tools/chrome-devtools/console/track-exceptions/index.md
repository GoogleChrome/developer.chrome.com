---
layout: "layouts/doc-post.njk"
title: "Exception and Error Handling"
authors:
  - megginkearney
,  - flaviocopes
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

### TL;DR {: #tldr }

- Turn on Pause on Exceptions to debug the code context when the exception triggered.
- Print current JavaScript call stack using `console.trace`.
- Place assertions in your code and throw exceptions using `console.assert()`.
- Log errors happening in the browser using `window.onerror`.

## Track exceptions {: #track_exceptions }

When something goes wrong, open the DevTools console (`Ctrl+Shift+J` / `Cmd+Option+J`) to view the
JavaScript error messages. Each message has a link to the file name with the line number you can
navigate to.

An example of an exception:
![Exception example](/web/tools/chrome-devtools/console/images/track-exceptions-tracking-exceptions.jpg)

### View exception stack trace {: #view_exception_stack_trace }

It's not always obvious which execution path lead to an error. Complete JavaScript call stacks
accompany exceptions in the console. Expand these console messages to see the stack frames and
navigate to the corresponding locations in the code:

![Exception stack trace](/web/tools/chrome-devtools/console/images/track-exceptions-exception-stack-trace.jpg)

### Pause on JavaScript exceptions {: #pause_on_javascript_exceptions }

The next time an exception is thrown, pause JavaScript execution and inspect its call stack, scope
variables, and state of your app. A tri-state stop button at the bottom of the Scripts panel enables
you to switch among different exception handling modes:
![Pause button](/web/tools/chrome-devtools/console/images/track-exceptions-pause-gray.png)

Choose to either pause on all exceptions or only on the uncaught ones or you can ignore exceptions
altogether.

![Pause execution](/web/tools/chrome-devtools/console/images/track-exceptions-pause-execution.jpg)

## Print stack traces {: #print_stack_traces }

Better understand how your web page behaves by printing log messages to the console. Make the log
entries more informative by including associated stack traces. There are several ways of doing that.

### Error.stack {: #errorstack }

Each Error object has a string property named stack that contains the stack trace:

![Error.stack example](/web/tools/chrome-devtools/console/images/track-exceptions-error-stack.jpg)

### console.trace() {: #consoletrace }

Instrument your code with [`console.trace()`][1] calls that print current JavaScript call stacks:

![console.trace() example](/web/tools/chrome-devtools/console/images/track-exceptions-console-trace.jpg)

### console.assert() {: #consoleassert }

Place assertions in your JavaScript code by calling [`console.assert()`][2] with the error condition
as the first parameter. When this expression evaluates to false, you will see a corresponding
console record:

![console.assert() example](/web/tools/chrome-devtools/console/images/track-exceptions-console-assert.jpg)

## How to examine stack trace to find triggers {: #how_to_examine_stack_trace_to_find_triggers }

Let's see how to use the tools you've just learned about, and find the real cause of an error.
Here's a simple HTML page that includes two scripts:

![Example code](/web/tools/chrome-devtools/console/images/track-exceptions-example-code.png)

When the user clicks on the page, the paragraph changes its inner text, and the `callLibMethod()`
function provided by `lib.js` is called.

This function prints a `console.log`, and then calls `console.slog`, a method not provided by the
Console API. This should trigger an error.

When the page is run and you click on it, this error is triggered:

![Error triggered](/web/tools/chrome-devtools/console/images/track-exceptions-example-error-triggered.png)

Click the arrow to can expand the error message:

![Error message expanded](/web/tools/chrome-devtools/console/images/track-exceptions-example-error-message-expanded.png)

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

![Example of window.onerror handler](/web/tools/chrome-devtools/console/images/runtime-exceptions-window-onerror.jpg)

[1]:
  https://developers.google.com/web/tools/chrome-devtools/console/console-reference#consoletraceobject
[2]:
  https://developers.google.com/web/tools/chrome-devtools/console/console-reference#consoleassertexpression-object
