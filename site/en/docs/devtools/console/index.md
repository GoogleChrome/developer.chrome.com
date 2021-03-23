---
layout: "layouts/doc-post.njk"
title: "Console overview"
authors:
  - kaycebasques
date: 2019-04-18
#updated: YYYY-MM-DD
description:
  "The main uses of the Chrome DevTools Console are logging messages and running JavaScript."
---

This page explains how the Chrome DevTools Console makes it easier to develop web pages. The Console
has 2 main uses: [viewing logged messages][1] and [running JavaScript][2].

## Viewing logged messages {: #view }

Web developers often log messages to the Console to make sure that their JavaScript is working as
expected. To log a message, you insert an expression like `console.log('Hello, Console!')` into your
JavaScript. When the browser executes your JavaScript and sees an expression like that, it knows
that it's supposed to log the message to the Console. For example, suppose that you're in the
process of writing the HTML and JavaScript for a page:

```html
<!doctype html>
<html>
  <head>
    <title>Console Demo</title>
  </head>
  <body>
    <h1>Hello, World!</h1>
    <script>
      console.log('Loading!');
      const h1 = document.querySelector('h1');
      console.log(h1.textContent);
      console.assert(document.querySelector('h2'), 'h2 not found!');
      const artists = [
        {
          first: 'René',
          last: 'Magritte'
        },
        {
          first: 'Chaim',
          last: 'Soutine'
        },
        {
          first: 'Henri',
          last: 'Matisse'
        }
      ];
      console.table(artists);
      setTimeout(() => {
        h1.textContent = 'Hello, Console!';
        console.log(h1.textContent);
      }, 3000);
    </script>
  </body>
</html>
```

**Figure 1** shows what the Console looks like after loading the page and waiting 3 seconds. Try to
figure out which lines of code caused the browser to log the messages.

{% Img src="image/admin/dpOohQpnFAKdK0JpVvuv.png", alt="The Console panel.", width="800", height="437" %}

**Figure 1**. The Console panel.

Web developers log messages for 2 general reasons:

- Making sure that code is executing in the right order.
- Inspecting the values of variables at a certain moment in time.

See [Get Started With Logging Messages][3] to get hands-on experience with logging. See the [Console
API Reference][4] to browse the full list of `console` methods. The main difference between the
methods is how they display the data that you're logging.

## Running JavaScript {: #javascript }

The Console is also a [REPL][5]. You can run JavaScript in the Console to interact with the page
that you're inspecting. For example, **Figure 2** shows the Console next to the DevTools homepage,
and **Figure 3** shows that same page after using the Console to change the page's title.

{% Img src="image/admin/HsESeWdYC1Yck5qTtzkj.png", alt="The Console panel next to the DevTools homepage.", width="800", height="507" %}

**Figure 2**. The Console panel next to the DevTools homepage.

{% Img src="image/admin/Diu3Bq4TbPWb9Y5gr7HX.png", alt="Using the Console to change the page's title.", width="800", height="507" %}

**Figure 3**. Using the Console to change the page's title.

Modifying the page from the Console is possible because the Console has full access to the page's
[`window`][6]. DevTools has a few convenience functions that make it easier to inspect a page. For
example, suppose that your JavaScript contains a function called `hideModal`. Running
`debug(hideModal)` pauses your code on the first line of `hideModal` the next time that it's called.
See [Console Utilities API Reference][7] to see the full list of utility functions.

When you run JavaScript you don't have to interact with the page. You can use the Console to try out
new code that's not related to the page. For example, suppose you just learned about the built-in
JavaScript Array method [`map()`][8], and you want to experiment with it. The Console is a good
place to try out the function.

See [Get Started With Running JavaScript][9] to get hands-on experience with running JavaScript in
the Console.

[1]: #view
[2]: #javascript
[3]: /docs/devtools/console/log
[4]: /docs/devtools/console/api
[5]: https://en.wikipedia.org/wiki/Read%E2%80%93eval%E2%80%93print_loop
[6]: https://developer.mozilla.org/en-US/docs/Web/API/Window
[7]: /docs/devtools/console/utilities#debug
[8]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map
[9]: /docs/devtools/console/javascript
