---
title: "DevTools architecture refresh: migrating DevTools to TypeScript"
description: >
  How we migrate Chrome DevTools from the Closure Compiler type checker to TypeScript.
layout: "layouts/blog-post.njk"
authors:
  - tvanderlippe
date: 2021-04-08
hero: 'image/dPDCek3EhZgLQPGtEG3y0fTn4v82/lE6LiflFe58FOUlg1rMV.jpg'
alt: ''
tags:
  - devtools-engineering
  - devtools
---

<!-- lint disable no-smart-quotes -->

Following up on our [migration to JavaScript modules](/blog/migrating-to-js-modules/) and [migration to Web Components](/blog/migrating-to-web-components/), today we are continuing our blog post series on **the changes we are making to Devtools' architecture and how it is built**.
(If you have not seen it already, we posted a video on our work of [Upgrading DevTools’ architecture to the modern web](https://www.youtube.com/watch?v=BHogHiiyuQk), with 14 tips on how to make improvements to your web projects.)

{% YouTube id='BHogHiiyuQk' %}

In this post, we will describe our 13-month journey moving away from the [Closure Compiler type checker](https://developers.google.com/closure/compiler/) to [TypeScript](https://www.typescriptlang.org/).

## Introduction

Given the size of the DevTools codebase and the need for providing confidence to the engineers working on it, **using a type checker is a necessity**.
To that end, [DevTools adopted the Closure Compiler](https://chromium.googlesource.com/chromium/src/+/93dc1fd8bd0b4842252bf3b50a9dc868c0e99d48) back in 2013.
Adopting Closure enabled DevTools engineers to make changes with confidence; the Closure compiler would perform type checks to ensure that all system integrations were well-typed.

However, as time passed, alternative type checkers became popular in modern web development.
Two notable examples are [TypeScript](https://www.typescriptlang.org/) and [Flow](https://flow.org/).
Moreover, TypeScript became [an official programming language](http://blog.angularjs.org/2017/04/official-languages-at-google.html) at Google.
While these new type checkers increased in popularity, we also noticed that we were shipping regressions that should have been caught by a type checker.
Therefore, we decided to re-evaluate our choice of type checker and figure out the next steps for development on DevTools.

### Evaluating type checkers

Since DevTools was already using a type checker, the question for us to answer was:

> Do we keep on using Closure Compiler or migrate to a new type checker?

To answer this question, we had to evaluate the type checkers on several characteristics.
Since our usage of a type checker focuses on engineer confidence, the most important aspect for us is type correctness.
In other words: **How reliable is a type checker at discovering real issues?**

Our evaluation focused on the regressions we had shipped and determining what the root causes of them would be.
The assumption here is that, because we were using the Closure Compiler already, Closure would not have caught these issues.
Thus, we would have to determine whether any other type checker would have been able to.

### Type correctness in TypeScript

Since TypeScript was an officially supported programming language at Google and quickly increasing in popularity, we decided to evaluate TypeScript first.
TypeScript was an interesting choice, as the TypeScript team itself uses DevTools as [one of their test projects](https://github.com/microsoft/TypeScript/blob/646f5b3c4e151a2c3da9760a483cb49c923a9d04/tests/cases/user/chrome-devtools-frontend/) to track their compatibility with JavaScript type-checking on.
Their [baseline reference test output](https://raw.githubusercontent.com/microsoft/TypeScript/646f5b3c4e151a2c3da9760a483cb49c923a9d04/tests/baselines/reference/user/chrome-devtools-frontend.log) had shown that TypeScript was catching a large amount of type issues - issues that the Closure compiler wasn’t necessarily detecting. Many of these issues were likely to be the root cause of regressions that we were shipping; this, in turn, made us believe that TypeScript could be a viable option for DevTools.

[During our migration to JavaScript modules](/blog/migrating-to-js-modules/), we had already discovered that Closure Compiler was uncovering more issues than it had previously. Moving to a standard module format had increased Closure’s ability to understand our codebase and therefore increased the effectiveness of type checkers.
However, the TypeScript team was using a baseline version of DevTools that predated the JavaScript modules migration.
Therefore, we had to figure out if the migration to JavaScript modules had also reduced the amount of errors the TypeScript compiler would catch.

## Evaluating TypeScript

DevTools has existed for over decade, in which it has grown to a considerably sized and feature-rich web application.
At the time of writing this blog post, DevTools contains approximately 150,000 lines of first-party JavaScript code.
When we ran the TypeScript compiler on our source code, the sheer volume of errors was overwhelming.
We were able to figure out that while the TypeScript compiler was emitting fewer errors related to code resolution (~2,000 errors), there were still a further 6,000 errors present in our codebase related to type compatibility.

This showed that while TypeScript was able to understand how to resolve types, it found a significant amount of type incompatibilities in our codebase.
A manual analysis of these errors had shown that TypeScript was (most of the time) correct.
The reason TypeScript was able to detect these and Closure was not was because often the Closure compiler would deduce a type to be an `Any`, whereas TypeScript would perform type inference based on assignments and infer a more accurate type.
As such, **TypeScript was indeed better at understanding the structure of our objects and discovered problematic usages**.

One important catch to this, is that the usage of the Closure compiler in DevTools included the frequent usage of `@unrestricted`.
Annotating a class with `@unrestricted` effectively turns off the strict property checks of the Closure compiler for that specific class, which means that a developer can augment a class definition at will without type safety.
We couldn't find any historical context as to why the usage of `@unrestricted` was prevalent in the DevTools codebase, but it had resulted in running Closure compiler in a less safe mode of operation for large portions of the codebase.

A cross-analysis of our regressions with the type errors TypeScript discovered also showed an overlap, which led us to believe TypeScript could have prevented these issues (provided that the types themselves were correct).

## Making `any` call

At this point, we had to decide between improving our Closure Compiler usage or migrating to TypeScript.
(Since Flow was not supported either at Google or in Chromium, we had to forego that option.)
Based on discussions with, and recommendations from, Google engineers working on the JavaScript/TypeScript tooling, we opted to choose the TypeScript compiler.
(We also recently published a blog post on [migrating Puppeteer to TypeScript](/blog/puppeteer-typescript/).)

The primary reasons for the TypeScript compiler were the improved type correctness, while other advantages included support from TypeScript teams internally at Google and the features of the TypeScript language, such as `interfaces` (as opposed to `typedefs` in JSDoc).

Choosing the TypeScript compiler meant that we had to significantly invest in the DevTools codebase and its internal architecture. As such, we estimated that we needed at least one year for migrating to TypeScript (targeted at Q3 2020).

## Performing the migration

The biggest question that remained: how are we going to migrate to TypeScript?
We have 150,000 lines of code and we can't migrate that in one go.
We also knew that running TypeScript on our codebase would uncover thousands of errors.

We evaluated multiple options:

1. **Obtain all TypeScript errors and compare them to a "golden" output**.
This approach would be similar to what the TypeScript team has. The biggest downside of this approach is the high occurrence of merge conflicts, since dozens of engineers work in the same codebase.
2. **Set all problematic types to `any`.** This would essentially make TypeScript suppress errors. We did not choose this option, as our goal for the migration was type correctness which suppression would undermine.
3. **Fix all TypeScript errors manually.** This would involve fixing thousands of errors, which is time-consuming.

Despite the large expected effort, we opted for option 3.
There were additional reasons why we chose this option: for example, it allowed us to audit **all** code and do a once-in-a-decade review of all functionality, including its implementation.
From a business perspective, we weren't providing new value, but rather maintaining the status quo. This made it more difficult to justify option 3 as the correct choice.

However, by adopting TypeScript, we strongly believed we could **prevent** future problems, particularly around regressions. As such, the argument was less "we are adding new business value", and more "we are ensuring we don't lose obtained business value".

## JavaScript support of the TypeScript compiler

After securing buy-in and developing [a plan to run both the Closure and TypeScript compiler on the same JavaScript code](https://docs.google.com/document/d/1qpa5QSSHrvvo_w73GV0hOJRug4N0_9JfFDw01d-NaCE/edit?usp=sharing), we started with some small files.
Our approach was mostly bottom-up: start with the core code and move our way up the architecture until we reach the high-level panels.

We were able to parallelize our work by pre-emptively adding `@ts-nocheck` to every single file in DevTools. The process of "fixing TypeScript" would be to remove the `@ts-nocheck` annotation and resolve any errors that TypeScript would find. This meant that we were confident that each file had been checked and that as many type issues as possible had been resolved.

In general, this approach worked with few issues.
We ran into several bugs in the TypeScript compiler, but most of them were obscure:

1. An optional parameter with a function type which returns `any` is treated as required: [#38551](https://github.com/microsoft/TypeScript/issues/38551)
2. A property assignment to a static method of a class breaks declaration: [#38553](https://github.com/microsoft/TypeScript/issues/38553)
3. The declaration of a subclass with a no-args constructor and a super-class with an args constructor omits the child constructor: [#41397](https://github.com/microsoft/TypeScript/issues/41397)

These bugs highlight that, for the 99% case, the TypeScript compiler is a solid foundation to build upon.
Yes, these obscure bugs would sometimes cause issues for DevTools, but most of the time they were obscure enough that we could easily work around them.

The only issue that had caused some confusion was the non-deterministic output of `.tsbuildinfo` files: [#37156](https://github.com/microsoft/TypeScript/issues/37156).
At Chromium, we require that any two builds of the same Chromium commit result in the exact same output.
Unfortunately, our Chromium build engineers discovered that the `.tsbuildinfo` output was non-deterministic: [crbug.com/1054494](https://bugs.chromium.org/p/chromium/issues/detail?id=1054494).
To workaround this issue, we had to monkey-patch the `.tsbuildinfo` file (which essentially contains JSON) and post-process it to return a deterministic output: [https://crrev.com/c/2091448](https://chromium-review.googlesource.com/c/devtools/devtools-frontend/+/2091448)
Luckily, the TypeScript team resolved the upstream issue and we were soon able to remove our workaround. Thank you to the TypeScript team for being receptive to bug reports and fixing these issues promptly!

Overall, we are pleased with the (type) correctness of the TypeScript compiler.
We hope that Devtools as a large open-source JavaScript project has helped solidify JavaScript support in TypeScript.

## Analyzing the aftermath

We were able to make good progress in resolving these type errors and slowly increasing the amount of code checked by TypeScript.
However, in August 2020 (9 months into this migration) we did a check-in and discovered we would not hit our deadline with our current pace.
One of our engineers built an analysis graph to show the progress of "TypeScriptification" (the name we gave to this migration).

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/vxsdG9lI4YjuWi8ibZr9.png", alt="TypeScript Migration progress", width="800", height="639" %}

*TypeScript Migration progress - Tracking lines of code remaining that need migrating*

Estimations when we would hit zero lines remaining ranged from July 2021 to December 2021, almost a year past our deadline.
After discussions with management and other engineers, we agreed to increase the amount of engineers working on migrating to TypeScript compiler support.
This was possible as we designed the migration to be parallelizable such that multiple engineers working on multiple different files wouldn’t conflict with each other.

At this point, the TypeScriptification process became a team-wide effort.
With the additional help, we were able to finish our migration at the end of November 2020, 13 months after starting, and over a year before our initial estimate predicted.

In total, there were **771 changelists (similar to a Pull Request) submitted by 18 engineers**.
Our tracking bug ([https://crbug.com/1011811](https://bugs.chromium.org/p/chromium/issues/detail?id=1011811)) has over 1200 comments (almost all of them automated posts from changelists).
[Our tracking sheet](https://docs.google.com/spreadsheets/d/1QebRQuI0oTwMb2A6VddiuYD7WeUWd0QUkUMf5eMFQUg/preview#gid=0) had over 500 rows for all files-to-be-typescriptified, their assignee and in which changelist they were “Typescriptified”.

### Mitigating the impact of the TypeScript compiler’s performance

The biggest problem we are currently dealing with today is the slow performance of the TypeScript compiler. Given the number of engineers building Chromium and DevTools, this bottleneck is costly. Sadly, we were not able to identify this risk prior to our migration, and it was only at the point where we had migrated the majority of files to TypeScript that we discovered a noticeable increase in time spent across Chromium builds: [https://crbug.com/1139220](https://bugs.chromium.org/p/chromium/issues/detail?id=1139220)

We have [reported this issue](https://github.com/microsoft/TypeScript/issues/40721) upstream to the Microsoft TypeScript compiler team, but sadly they determined this behavior as intentional.
We hope they will reconsider this issue, but in the meantime we are working on mitigating the slow performance impact on the Chromium side as much as possible.

Sadly, the solutions that are available to us today are not always suitable for non-Googler contributors. Since the open-source contributions to Chromium are very important (especially those from the Microsoft Edge team), we are actively looking for alternatives that will work for all contributors. However, at this moment in time we have not figured out a suitable alternative solution.

## Current state of TypeScript in DevTools

At this moment, we have removed the Closure compiler type checker from our codebase and solely rely on the TypeScript compiler. We are able to write TypeScript-authored files and make use of TypeScript-specific features (such as interfaces, generics, etc...), which helps us on a daily basis. We have increased confidence that the TypeScript compiler will catch type errors and regressions, which is what we’d hoped would happen when we first started work on this migration. This migration, like so many, was slow, nuanced, and oftentimes challenging, but as we yield the benefits, we believe it was worth it.
