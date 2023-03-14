---
layout: "layouts/blog-post.njk"
title: Help choose the syntax for CSS Nesting
authors:
  - bramus
  - argyle
description: >
  The CSS Working Group is continuing a debate over the best way to define nesting in CSS. If you are someone who writes CSS, we’d like your help.
date: 2022-12-16
tags:
  - css
hero: image/vS06HQ1YTsbMKSFTIPl2iogUQP73/ZrMGmOcY6AH5J2tAblyO.jpg
alt: >
  A bird nest with a couple of blue eggs inside, surrounded by lush greenery.
---

After we ran [the previous survey to help choose the syntax for CSS Nesting](/blog/help-css-nesting), the CSS Working Group continued debate over the best way to define nesting in CSS. During the discussions new syntax ideas were suggested. To help the Working Group choose between any of these syntaxes, there is a new survey.

## The Options

Based on [the results of the previous survey](/blog/help-css-nesting-results), options one and two are no longer being considered. Two new options (four and five) have been added.

### Option 5: Top-level nesting container

Introduces a top-level `@nest` rule that contains a `& { … }` block with declarations and multiple nested style rules.

```css
@nest selector {
  & {
    property: value;
  }
  nested-selector {
    property: value;
  }
}
```

### Option 4: Postfix proposal

An extra code block containing the nested rules is inserted after main rule which contains the declarations.

```css
selector {
  property: value;
} {
  nested-selector {
    property: value;
  }
}
```

### Option 3: Non-letter start proposal

Every nested rule to be unambiguous on its own, by requiring it to start with a non-symbol. You can write `& div` or `:is(div)` if you need to start a selector with a type selector.

```css
selector {
  property: value;
  & nested-selector {
    property: value;
  }
}
```

While the snippets above are only used to demonstrate the basics of each proposal, there are many more examples included along with the new survey.

## Cast your vote

To cast your vote head over to [https://webkit.org/blog/13607/](https://webkit.org/blog/13607/). Voting requires no registration, choose “Option 5”, “Option 4”, or “Option 3” and hit Submit.

<a class="material-button button-filled color-bg bg-primary" href="https://webkit.org/blog/13607/">Cast your vote!</a>
