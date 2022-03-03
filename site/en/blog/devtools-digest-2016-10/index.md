---
# Required
layout: 'layouts/blog-post.njk'

# Required
title: DevTools Digest, October 2016

# Required
description: >
  New Console features, updates on the context selector bug, and the new UC Browser user agent.

# Optional
# How to add a new author
# https://developer.chrome.com/docs/handbook/how-to/add-an-author/
authors:
  - kaycebasques

# Required
date: 2016-10-21

# Optional
# Include an updated date when you update your post
updated: 2016-10-21

# Optional
# How to add a new tag
# https://developer.chrome.com/docs/handbook/how-to/add-a-tag/
tags:
  - devtools



---


Hey hey, [Kayce](//twitter.com/kaycebasques) here, back again for
another digest to update you on what's new in DevTools since last month.

[crbug]: //bugs.chromium.org/p/chromium/issues/list?can=1&q=component%3APlatform%3EDevTools+-status%3AUnconfirmed+-status%3AUntriaged++-status%3AAvailable+-status%3AAssigned+-status%3AStarted+-status%3AExternalDependency+-status%3ADuplicate+-status%3AWontFix+-status%3AArchived+&sort=-modified&colspec=ID+Pri+M+Stars+ReleaseBlock+Component+Status+Owner+Summary+OS+Modified&x=m&y=releaseblock&cells=ids

## New features in the Console

In Chrome 56, which is currently in Canary, the DevTools Console is powered by
[CodeMirror](//codemirror.net/). This enables a whole bunch of new
features, like:

**Syntax highlighting as you type**. Previously, DevTools could only
highlight syntax after a code block had been evaluated.

**Matching parenthesis / bracket / brace highlighting**. If you've got
an extra parenthesis, bracket, or brace, DevTools highlights it red.

<figure>
{% Img src="image/T4FyVKpzu4WKF1kBNvXepbi08t52/a5bHLVJITaUu0O8YtFRe.png", alt="mismatched parenthesis", width="386", height="42" %}
</figure>


Matching parentheses, brackets, or braces are highlighted grey when your
cursor is next to one of them.

<figure>
{% Img src="image/T4FyVKpzu4WKF1kBNvXepbi08t52/ftvuwZm7R3DAWmnraS1K.png", alt="matched parentheses", width="392", height="86" %}
</figure>

**Smart return**. When you type out a multi-line code block, DevTools
now knows whether to create a new line or execute your code each time you
press <kbd>Enter</kbd>. For example, suppose you want to
evaluate the following `for` loop in the Console:

```js
for (var i = 0; i < 5; i++) {
  console.log(i);
}
```

In the past, hitting <kbd>Enter</kbd> after typing out the first line would
have caused DevTools to evaluate the line, causing an error.
To continue the code block to a new line, you would have had to held 
<kbd>Shift</kbd> before pressing <kbd>Enter</kbd>. In contrast, now
DevTools just automatically continues the code block on a new line after
you hit <kbd>Enter</kbd>, as you expect it would.

**Multiple cursors**. Hold <kbd>Command</kbd> (Mac) or
<kbd>Control</kbd>+<kbd>Alt</kbd> (Windows, Linux) and then click.

<figure>
{% Img src="image/T4FyVKpzu4WKF1kBNvXepbi08t52/d46zSA5I8MLbzkcnXLwk.gif", alt="multiple cursors", width="483", height="309" %}
</figure>

## Canary now highlights non-top contexts red

If you've worked in the Console lately, you might have been bitten by a
nasty little bug that was setting the [execution context
selector](https://developers.google.com/web/tools/chrome-devtools/console/#execution-context) to values
other than `top`.

That bug should be now be fixed in Stable, but, just to be safe, the DevTools
in Canary (Chrome 56) now warns you that you're not in the `top` context by
highlighting the selector red.

<figure>
{% Img src="image/T4FyVKpzu4WKF1kBNvXepbi08t52/1Hf44oN5eJLm6UKULfSe.png", alt="non-top context highlighted red", width="764", height="210" %}
</figure>

## New user agent: UC Browser

You can now select UC Browser for iOS, Android, or Windows Phone from
the **Network conditions** [drawer
tab](https://developers.google.com/web/tools/chrome-devtools/settings#drawer-tabs).


<figure>
{% Img src="image/T4FyVKpzu4WKF1kBNvXepbi08t52/irkSQQKynJSSUFKG7r4R.png", alt="UC Browser user agent", width="556", height="425" %}
</figure>


## Sharing is caring

As always, we'd love to hear your feedback or ideas on anything DevTools
related.

* Ping us at [ChromeDevTools](//twitter.com/chromedevtools) on Twitter
  for brief questions or feedback, or to share new ideas.
* For longer discussions, the [mailing list](//groups.google.com/forum/#!forum/google-chrome-developer-tools/topics) or [Stack Overflow](http://stackoverflow.com/questions/tagged/google-chrome-devtools) are your best bets.
* For anything docs related, [open an issue](//github.com/google/WebFundamentals/issues/new) on our docs repo.
* You can always go straight to the team to file a bug or request a feature
  on [Crbug](//bugs.chromium.org/p/chromium/issues/list).

Until next month,

Kayce

