---
layout: "layouts/doc-post.njk"
title: "Watch JavaScript values in real-time with Live Expressions"
authors:
  - kaycebasques
  - sofiayem
date: 2019-04-18
updated: 2022-05-24
description:
  "If you find yourself typing the same JavaScript expressions into the Console repeatedly, try Live
  Expressions instead."
tags:
  - javascript
---

If you find yourself typing the same JavaScript expression in the Console repeatedly, you might find
it easier to create a **Live Expression**. With **Live Expressions**, you type an expression once and
then pin it to the top of your Console. The value of the expression updates in near real-time.

## Create a live expression {: #create }

To pin an expression to the top of the **Console**:

1.  [Open the Console][1].
1.  Click {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/QVucttGri69wXWeE42qz.svg", alt="Create Live Expression.", width="20", height="20" %} **Create Live Expression**. The **Live Expression** text box appears.

1. Type your expression in the text box. For example, you can use a live expression to [track element focus](docs/devtools/accessibility/focus/).

   {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/bOxIhY85dGCJ1xXkJVrC.png", alt="Typing document.activeElement into the Live Expression text box.", width="800", height="402" %}

    {% Aside 'gotchas' %}
    To type a multi-line expression, start the new line by pressing <kbd>Shift</kbd>+<kbd>Enter</kbd>.
    {% endAside %}

1.  Press <kbd>Enter</kbd> to save the expression, or click outside of the **Live Expression** text box.

The value below the pinned expression is its result. The result updates every 250 milliseconds.

## Add multiple expressions {: #add-multiple }

To pin multiple expressions in parallel, click the {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/QVucttGri69wXWeE42qz.svg", alt="Create a live expression.", width="20", height="20" %} **Create Live Expression** button as many times as you need.

You can only see several pinned expressions at a time but you can scroll the expressions list to view all of them.

<div class="elevation--3", style="margin-left: 50px; margin-right: 50px">{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/HZoX7b9tedqcQwUDNm4I.gif", alt="Scroll the pinned expressions list.", width="600", height="488" %}</div>

## Remove expressions {: #remove-expressions }

To remove an expression, click the {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/0G3yI9F8BnkrEXyLf5EJ.svg", alt="The Close button.", width="20", height="20" %}**Close** button next to it.

[1]: /docs/devtools/console/reference#open
