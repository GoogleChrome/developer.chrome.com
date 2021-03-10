---
layout: "layouts/doc-post.njk"
title: "Run JavaScript in the Console"
authors:
  - kaycebasques
date: 2018-04-18
#updated: YYYY-MM-DD
description: "Learn how to run JavaScript in the Console."
---

This interactive tutorial shows you how to run JavaScript in the [Chrome DevTools][1] Console. See
[Get Started With Logging Messages][2] to learn how to log messages to the Console. See [Get Started
With Debugging JavaScript][3] to learn how to pause JavaScript code and step through it one line at
a time.

{% Img src="image/admin/niTYZhvjmKcUZpMZmuOV.png", alt="The Console.", width="800", height="463" %}

**Figure 1**. The **Console**.

## Overview {: #overview }

The **Console** is a [REPL][4], which stands for Read, Evaluate, Print, and Loop. It reads the
JavaScript that you type into it, evaluates your code, prints out the result of your
[expression][5], and then loops back to the first step.

## Set up DevTools {: #setup }

This tutorial is designed so that you can open up the demo and try all the workflows yourself. When
you physically follow along, you're more likely to remember the workflows later.

1.  Press Command+Option+J (Mac) or Control+Shift+J (Windows, Linux, Chrome OS) to open the
    **Console**, right here on this very page.

    {% Img src="image/admin/5aHOGjzCHY5tHEnye4lU.png", alt="This tutorial on the left, and DevTools on the right.", width="800", height="480" %}

    **Figure 2**. This tutorial on the left, and DevTools on the right.

## View and change the page's JavaScript or DOM {: #page }

When building or debugging a page, it's often useful to run statements in the **Console** in order
to change how the page looks or runs.

1.  Notice the text in the button below.

    <button id="hello">Hello, World!</button>

2.  Type `document.getElementById('hello').textContent = 'Hello, Console!'` in the **Console** and
    then press Enter to evaluate the expression. Notice how the text inside the button changes.

    {% Img src="image/admin/7AFYFztno8K9z7C7rXZm.png", alt="How the Console looks after evaluating the expression above.", width="800", height="463" %}

    **Figure 3**. How the Console looks after evaluating the expression above.

    Below the code that you evaluated you see `"Hello, Console!"`. Recall the 4 steps of REPL: read,
    evaluate, print, loop. After evaluating your code, a REPL prints the result of the expression.
    So `"Hello, Console!"` must be the result of evaluating
    `document.getElementById('hello').textContent = 'Hello, Console!'`.

## Run arbitrary JavaScript that's not related to the page {: #playground }

Sometimes, you just want a code playground where you can test some code, or try out new JavaScript
features you're not familiar with. The Console is a perfect place for these kinds of experiments.

1.  Type `5 + 15` in the Console and press Enter to evaluate the expression. The Console prints out
    the result of the expression below your code. **Figure 4** below shows how your Console should
    look after evaluating this expression.
2.  Type the following code into the **Console**. Try typing it out, character-by-character, rather
    than copy-pasting it.

    ```js
    function add(a, b=20) {
      return a + b;
    }
    ```

    See [define default values for function arguments][6] if you're unfamiliar with the `b=20`
    syntax.

3.  Now, call the function that you just defined.

    ```js
    add(25);
    ```

    {% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/3V5mx06Kehe06nGL3csv.png", alt="How the Console looks after evaluating the expressions above.", width="800", height="463" %}

    **Figure 4**. How the Console looks after evaluating the expressions above.

    `add(25)` evaluates to `45` because when the `add` function is called without a second argument,
    `b` defaults to `20`.

## Next steps {: #next }

See [Run JavaScript][7] to explore more features related to running JavaScript in the Console.

DevTools lets you pause a script in the middle of its execution. While you're paused, you can use
the **Console** to view and change the page's `window` or `DOM` at that moment in time. This makes
for a powerful debugging workflow. See [Get Started With Debugging JavaScript][8] for an interactive
tutorial.

The **Console** also has a set of convenience functions that make it easier to interact with a page.
For example:

- Rather than typing `document.querySelector()` to select an element, you can type `$()`. This
  syntax is inspired by jQuery, but it's not actually jQuery. It's just an alias for
  `document.querySelector()`.
- `debug(function)` effectively sets a breakpoint on the first line of that function.
- `keys(object)` returns an array containing the keys of the specified object.

See [Console Utilities API Reference][9] to explore all the convenience functions.

[1]: /docs/devtools
[2]: /docs/devtools/console/log
[3]: /docs/devtools/javascript
[4]: https://en.wikipedia.org/wiki/Read%E2%80%93eval%E2%80%93print_loop
[5]: http://2ality.com/2012/09/expressions-vs-statements.html
[6]: http://es6-features.org/#DefaultParameterValues
[7]: /docs/devtools/console/reference#js
[8]: /docs/devtools/javascript
[9]: /docs/devtools/console/utilities
