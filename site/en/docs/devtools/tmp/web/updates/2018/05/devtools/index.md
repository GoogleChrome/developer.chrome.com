---
layout: "layouts/doc-post.njk"
title: "What's New In DevTools (Chrome 68)"
authors:
  - kaycebasques
date: 2018-05-21
updated: 2019-09-19
description: "Eager evaluation, argument hints, function autocompletion, Lighthouse 3.0, and more."
---

New to DevTools in Chrome 68:

- [Eager Evaluation][1]. As you type expressions, the Console previews the result.
- [Argument hints][2]. As you type functions, the Console shows you the expected arguments for that
  function.
- [Function autocompletion][3]. After typing a function call such as `document.querySelector('p')`,
  the Console shows you the functions and properties that the return value supports.
- [ES2017 keywords in the Console][4]. Keywords such as `await` are now available in the Console's
  autocomplete UI.
- [Lighthouse 3.0 in the Audits panel][5]. Faster, more consistent audits, a new UI, and new audits.
- [`BigInt` support][6]. Try out JavaScript's new arbitrary-precision integer in the Console.
- [Adding property paths to the Watch pane][7]. Add properties from the Scope pane to the Watch
  pane.
- ["Show timestamps" moved to Settings][8].

!!!.aside.aside--note

**Note:** Check what version of Chrome you're running at `chrome://version`. If you're running an
earlier version, these features won't exist. If you're running a later version, these features may
have changed. Chrome auto-updates to a new major version about every 6 weeks.

!!!

Read on, or watch the video version of the release notes, below.

{% YouTube id="br4JZ5qz\_20" %}

## Assistive Console {: #console }

Chrome 68 ships with a few new Console features related to autocompletion and previewing.

### Eager Evaluation {: #eagerevaluation }

When you type an expression in the Console, the Console can now show a preview of the result of that
expression below your cursor.

![The Console is printing the result of the sort() operation before it has been
            explicitly executed.](/web/updates/images/2018/05/eagereval.png)

**Figure 1**. The Console is printing the result of the `sort()` operation before it has been
explicitly executed

To enable Eager Evaluation:

1.  Open the **Console**.
2.  Open **Console Settings** ![Console
Settings](/web/updates/images/2018/05/settings.png).
3.  Enable the **Eager evaluation** checkbox.

DevTools does not eager evaluate if the expression causes [side effects][9].

### Argument hints {: #hints }

As you're typing out functions, the Console now shows you the arguments that the function expects.

{% Img src="image/admin/5c1WCwmfD4i6a835ilvv.png", alt="Argument hints in the Console.", width="800", height="951" %}

**Figure 2**. Various examples of argument hints in the Console

Notes:

- A question mark before an arg, such as `?options`, represents an [optional][10] arg.
- An ellipsis before an arg, such as `...items`, represents a [spread][11].
- Some functions, such as `CSS.supports()`, accept multiple argument signatures.

### Autocomplete after function executions {: #autocomplete }

!!!.aside.aside--note

**Note:** This feature depends on [Eager Evaluation][12], which needs to be enabled from **Console
Settings** {% Img src="image/admin/le64GLKlj72gyFGlOt8z.png", alt="Console Settings", width="36", height="36" %}.

!!!

After enabling Eager Evaluation, the Console now also shows you which properties and functions are
available after you type out a function.

![After running document.querySelector('p'), the Console can now show you the available
            properties and functions for that element.](/web/updates/images/2018/05/autocomplete.png)

**Figure 3**. The top screenshot represents the old behavior, and the bottom screenshot represents
the new behavior that supports function autocompletion

### ES2017 keywords in autocomplete {: #keywords }

ES2017 keywords, such as `await`, are now available in the Console's autocomplete UI.

{% Img src="image/admin/a386VKlJGY81qaQk5xHG.png", alt="The Console now suggests 'await' in its autocomplete UI.", width="800", height="461" %}

**Figure 4**. The Console now suggests `await` in its autocomplete UI

## Faster, more reliable audits, a new UI, and new audits {: #lh3 }

Chrome 68 ships with Lighthouse 3.0. The next sections are a roundup of some of the biggest changes.
See [Announcing Lighthouse 3.0][13] for the full story.

### Faster, more reliable audits {: #lantern }

Lighthouse 3.0 has a new internal auditing engine, codenamed Lantern, which completes your audits
faster, and with less variance between runs.

### New UI {: #ui }

Lighthouse 3.0 also brings a new UI, thanks to a collaboration between the Lighthouse and Chrome UX
(Research & Design) teams.

{% Img src="image/admin/pl2otqSS0e37W0i2kwlz.png", alt="The new report UI in Lighthouse 3.0.", width="800", height="996" %}

**Figure 5**. The new report UI in Lighthouse 3.0

### New audits {: #audits }

Lighthouse 3.0 also ships with 4 new audits:

- First Contentful Paint
- robots.txt is not valid
- Use video formats for animated content
- Avoid multiple, costly round trips to any origin

## BigInt support {: #bigint }

!!!.aside.aside--note

**Note:** This isn't a DevTools features per se, but it is a new JavaScript capability that you can
try out in the Console.

!!!

Chrome 68 supports a new numeric primitive called [`BigInt`][14]. `BigInt` lets you represent
integers with arbitrary precision. Try it out in the Console:

{% Img src="image/admin/DDJt3uIWbO5V1ZQSblye.png", alt="An example of BigInt in the Console.", width="800", height="564" %}

**Figure 6**. An example of `BigInt` in the Console

## Add property path to watch {: #watch }

While paused on a breakpoint, right-click a property in the Scope pane and select **Add property
path to watch** to add that property to the Watch pane.

{% Img src="image/admin/Go7V8YiZD5n1vJUwlg7a.png", alt="An example of Add property path to watch.", width="800", height="557" %}

**Figure 7**. An example of **Add property path to watch**

## "Show timestamps" moved to settings {: #timestamps }

The **Show timestamps** checkbox previously in **Console Settings**
![Console Settings](/web/updates/images/2018/05/settings.png) has moved to [Settings][15].

- [CSS and JS code coverage][16]
- [Full-page screenshots][17]
- [Block requests][18]
- [Step over async await][19]
- [Unified Command Menu][20]

[1]: #eagerevaluation
[2]: #hints
[3]: #autocomplete
[4]: #keywords
[5]: #lh3
[6]: #bigint
[7]: #watch
[8]: #timestamps
[9]: https://stackoverflow.com/a/8129277/1669860
[10]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Default_parameters
[11]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
[12]: #eagerevaluation
[13]: /web/updates/2018/05/lighthouse3
[14]: /web/updates/2018/05/bigint
[15]: /web/tools/chrome-devtools/ui#settings
[16]: /web/updates/2017/04/devtools-release-notes#coverage
[17]: /web/updates/2017/04/devtools-release-notes#screenshots
[18]: /web/updates/2017/04/devtools-release-notes#block-requests
[19]: /web/updates/2017/04/devtools-release-notes#async
[20]: /web/updates/2017/04/devtools-release-notes#command-menu
