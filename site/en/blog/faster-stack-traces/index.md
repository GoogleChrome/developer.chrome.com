---
title: "How we sped up Chrome DevTools stack traces by 10x"
description: >
  How we sped up Chrome DevTools stack traces by 10x.
layout: "layouts/blog-post.njk"
authors:
  - bmeurer
date: 2021-05-06
hero: 'image/dPDCek3EhZgLQPGtEG3y0fTn4v82/gKVcHgK3j3V1YUuaCLVS.jpg'
alt: ''
tags:
  - devtools-engineering
  - devtools
---

{% Partial 'devtools/banner.md' %}

Web developers have come to expect little to no performance impact when debugging their code. However, this expectation is by no means universal. A C++ developer would never expect a debug build of their application to reach production performance, and in early years of Chrome, simply opening DevTools significantly impacted the performance of the page.

The fact that this performance degradation is no longer felt is the result of years of investment in debugging capabilities of [DevTools](/docs/devtools/) and [V8](https://v8.dev). Nevertheless, we will **never be able to reduce the performance overhead of DevTools to zero**. Setting breakpoints, stepping through the code, collecting stack traces, capturing a performance trace, etc. all impact execution speed to a varying degree. After all, [observing something changes it](https://en.wikipedia.org/wiki/Observer_effect_(physics)).

But of course the overhead of DevTools - like any debugger - should be reasonable. Recently we've seen a significant increase in the number of reports that in certain cases, DevTools would slow down the application to a degree that it's not usable anymore. Below you can see a side-by-side comparison from the report [chromium:1069425](https://crbug.com/1069425), illustrating the performance overhead of literally just having DevTools open.

{% Video src="video/dPDCek3EhZgLQPGtEG3y0fTn4v82/Ls9sUztVbIkZpx14o4M4.mp4", autoplay="true", muted="true", loop="true" %}

As you can see from the video the slowdown is in the order of *5-10x*, which is clearly not acceptable. The first step was to understand where all the time goes and what causes this massive slowdown when DevTools was open. Using [Linux perf](https://perf.wiki.kernel.org/index.php/Main_Page) on the Chrome Renderer process revealed the following distribution of overall renderer execution time:

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/jgZNxWbXkDiJpFLIMxrp.svg", alt="Chrome Renderer execution time", width="800", height="212" %}

While we had somewhat expected to see something related to collecting stack traces, we wouldn't have expected that about **90%** of the overall execution time goes to symbolizing stack frames. Symbolization here refers to the act of resolving function names and concrete source positions - line and column numbers in scripts - from raw stack frames.

## Method name inference
What was even more surprising was the fact that almost all the time goes to the `JSStackFrame::GetMethodName()` function in V8 - although we knew from [previous investigations](https://docs.google.com/document/d/1BWjI_pCpat2eXkMy8PwJNN-T9-v6EPzUntQvpPvt9Ak) that `JSStackFrame::GetMethodName()` is no stranger in the land of performance problems. This function tries to compute the name of the method for frames that are considered method invocations (frames that represent function invocations of the form `obj.func()` rather than `func()`). A quick look into the code revealed that it works by performing a full traversal of the object and its prototype chain and looking for

1. data properties whose `value` are the `func` closure, or
2. accessor properties where either `get` or `set` equals the `func` closure.

Now while by itself this doesn't sound particularly cheap, it also doesn't sound like it'd explain this horrible slowdown. So we started digging into the example reported in [chromium:1069425](https://crbug.com/1069425), and we found that the stack traces were collected for async tasks as well as for log messages originating from `classes.js` - a 10MiB JavaScript file. A closer look revealed that this was basically a Java runtime plus application code compiled to JavaScript. The stack traces contained several frames with methods being invoked on an object `A` so we thought it might be worth understanding what kind of object we're dealing with.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/1I3mDj4h97Hqism28Rcc.png", alt="stack traces of an object", width="800", height="429" %}

Apparently the Java to JavaScript compiler generated a single object with a whopping *82,203 functions* on it - this was clearly starting to become interesting. Next we went back to V8's `JSStackFrame::GetMethodName()` in order to understand whether there's some low hanging fruit that we could pick there.

1. It works by first looking up the `"name"` of the function as a property on the object and if it's found, checks that the property value matches the function.
2. If the function has no name or the object doesn't have a matching property, it falls back to a reverse lookup by traversing all properties of the object and its prototypes.

In our example, all functions are anonymous and have empty `"name"` properties.

```js
A.SDV = function() {
   // ...
};
```

The first finding was that the reverse lookup was split into two steps (performed for the object itself and each object in its prototype chain):

1. Extract the names of all enumerable properties, and
2. Perform a generic property lookup for each name, testing whether the resulting property value matches the closure we were looking for.

That looked like a fairly low hanging fruit, since extracting the names requires walking through all the properties already. Instead of doing the two passes - O(N) for the name extraction and O(N log(N)) for the tests - we could do everything in a single pass and directly check the property values. That made the whole function around *2-10x* faster.

The second finding was even more interesting. While the functions were technically anonymous functions, the V8 engine nevertheless had recorded what we call an _inferred name_ for them. For function literals that appear on the right hand side of assignments in the form `obj.foo = function() {...}` the V8 parser memorizes `"obj.foo"` as _inferred name_ for the function literal. So in our case that means, while we didn't have the proper name that we could just look up, we did have something close enough: For the `A.SDV = function() {...}` example above, we had the `"A.SDV"` as inferred name, and we could derive the property name from the inferred name by looking for the last dot, and then go hunting for the property `"SDV"` on the object. That did the trick in almost all cases, replacing an expensive full traversal with a single property lookup. These two improvements landed as part of [this CL](https://crrev.com/c/2676635), and significantly reduced the slowdown for the example reported in [chromium:1069425](https://crbug.com/1069425).

## Error.stack
We could have called it a day here. But there was something fishy going on, since DevTools doesn't ever use the method name for stack frames. In fact the [`v8::StackFrame` class](https://source.chromium.org/chromium/chromium/src/+/master:v8/include/v8.h;l=2302-2383;drc=84e0835ce79dd1e5383b4fd18f2d18ea666f72bb) in the C++ API doesn't even expose a way to get to the method name. So it seemed wrong that we would end up calling `JSStackFrame::GetMethodName()` in the first place. Instead the only place where we use (and expose) the method name is in the [JavaScript stack trace API](https://v8.dev/docs/stack-trace-api). To understand this use, consider the following simple example `error-methodname.js`:

```js
function foo() {
    console.log((new Error).stack);
}

var object = {bar: foo};
object.bar();
```

Here we have a function `foo` that is installed under the name `"bar"` on `object`. Running this snippet in Chromium yields the following output:

```bash
Error
    at Object.foo [as bar] (error-methodname.js:2)
    at error-methodname.js:6
```

Here we see the method name lookup at play: The topmost stack frame is shown to call the function `foo` on an instance of `Object` via the method named `bar`. So the non-standard `error.stack` property makes heavy use of `JSStackFrame::GetMethodName()` and in fact our performance tests also indicate that our changes made things significantly faster.


{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/sbIfujQlHRBBAx4KQvs2.svg", alt="Speed-up on StackTrace micro benchmarks", width="800", height="600" %}

But back on the topic of Chrome DevTools, the fact that the method name is computed even though `error.stack` is not used doesn't look right. There's some history here that helps us: Traditionally V8 had two distinct mechanisms in place to collect and represent a stack trace for the two different APIs described above (the C++ `v8::StackFrame` API and the JavaScript stack trace API). Having two different ways to do (roughly) the same was error-prone and often led to inconsistencies and bugs, so in late 2018 we kicked off a project to settle on a single bottleneck for stack trace capturing.

That project was a great success and drastically reduced the number of issues related to stack trace collection. Most of the information provided via the non-standard `error.stack` property had also been computed lazily and only when it was really needed, but as part of the refactoring we applied the same trick to `v8::StackFrame` objects. All information about the stack frame is computed the first time any method was invoked on it.

This generally improves performance, but unfortunately it turned out to be somewhat contrary to how these C++ API objects are used in Chromium and DevTools. In particular since we had introduced a new `v8::internal::StackFrameInfo` class, which held all the information about a stack frame that was either exposed via `v8::StackFrame` or via `error.stack`, we'd always compute the super-set of the information provided by both APIs, which meant that for usages of `v8::StackFrame` (and in particular for DevTools) we would also compute the method name, as soon as any information about a stack frame is requested. It turns out that DevTools always immediately requests source and script information. 

Based on that realization, we were able to [refactor and drastically simplify stack frame representation](https://crrev.com/c/2689183) and make it even more lazy, so that uses throughout V8 and Chromium now only pay the cost for computing the information that they are asking for. This gave a massive performance boost for the DevTools and other Chromium use cases, which only need a fraction of the information about stack frames (essentially just script name and source location in the form of line and column offset), and opened the door for more performance improvements.


## Function names
With the above mentioned refactorings out of the way, the overhead of symbolization (the time spent in `v8_inspector::V8Debugger::symbolize`) was reduced to around **15%** of overall execution time, and we could see more clearly where V8 was spending time when (collecting and) symbolizing stack frames for consumption in DevTools.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/JmgFJmRhHt5G6AcURlDn.svg", alt="Symbolization cost", width="800", height="494" %}

The first thing that stood out was the cumulative cost for computing line and column number. The expensive part here is actually computing the character offset within the script (based on the bytecode offset that we get from V8), and it turned out that due to our refactoring above we did that twice, once when computing the line number and another time when computing the column number. [Caching the source position](https://crrev.com/c/2695386) on `v8::internal::StackFrameInfo` instances helped to quickly resolve this and completely eliminated `v8::internal::StackFrameInfo::GetColumnNumber` from any profiles.

The more interesting finding for us was that `v8::StackFrame::GetFunctionName` was surprisingly high in all the profiles we looked at. Digging deeper here we realized that it was unnecessarily costly to compute the name we'd show for the function in the stack frame in DevTools,

1. first looking for the [non-standard `"displayName"` property](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Function/displayName) and if that yielded a data property with a string value, we'd use that,
2. otherwise falling back to looking for the [standard `"name"` property](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Function/name) and again checking if that yields a data property whose value is a string,
3. and eventually falling back to an internal debug name that's inferred by the V8 parser and stored on the function literal.

The `"displayName"` property was added as a work-around for the `"name"` property on `Function` instances being read-only and non-configurable in JavaScript, but was never standardized and didn't see wide-spread use, since the browser developer tools added function name inference that does the job in 99.9% of the cases. On top of that ES2015 made the `"name"` property on `Function` instances configurable, completely removing the need for a special `"displayName"` property. Since the negative lookup for `"displayName"` is quite costly and not really necessary (ES2015 was released over five years ago), we decided to [remove support for the non-standard `fn.displayName` property](https://bit.ly/devtools-function-displayName-removal) from V8 (and DevTools).

With the negative lookup of `"displayName"` out of the way, half of the cost of `v8::StackFrame::GetFunctionName` was removed. The other half goes to the generic `"name"` property lookup. Fortunately we already had some logic in place to avoid costly lookups of `"name"` property on (untouched) `Function` instances, which we introduced in V8 a while ago to make [`Function.prototype.bind()`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_objects/Function/bind) itself faster. We [ported the necessary checks](https://crrev.com/c/2695593) which allow us to skip the costly generic lookup in the first place, with the result that `v8::StackFrame::GetFunctionName` doesn't show up in any profiles we've considered anymore.
## Conclusion
With the above improvements, we've significantly reduced the overhead of DevTools in terms of stack traces.

{% Video src="video/dPDCek3EhZgLQPGtEG3y0fTn4v82/r8HDWdZo2ykpJ1xflDH8.mp4", autoplay="true", muted="true", loop="true" %}

We know there are still various possible improvements - for example the overhead when using `MutationObserver`s is still noticeable, as reported in [chromium:1077657](https://crbug.com/1077657) - but for the time being, we've addressed the major pain points, and we might come back in the future to further streamline the debugging performance.

{% Partial 'devtools/reach-out.md' %}
{% Partial 'devtools/engineering-blog.md' %}