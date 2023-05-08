---
title: "Implementing CSP and Trusted Types debugging in Chrome DevTools"
description: >
  How we implement Content Security Policy and Trusted Types issues debugging in Chrome DevTools.
layout: "layouts/blog-post.njk"
authors:
  - kateryna
  - alcastano
date: 2021-11-01
hero: 'image/dPDCek3EhZgLQPGtEG3y0fTn4v82/9Ou6xcKgElq9nEW3KrGM.jpg'
alt: ''
tags:
  - devtools-engineering
  - devtools
---

{% Partial 'devtools/banner.md' %}

This blog post is about the implementation of DevTools support for debugging Content Security Policy (CSP) issues with the help of the [recently introduced **Issues** tab](/blog/issues-tab/).

The implementation work was done in the course of 2 internships:
1. During the first one, we built the general reporting framework and designed the issue messages for 3 CSP violation issues.
2. During the second one, we added Trusted Type issues alongside some specialized DevTools features for Trusted Types debugging.

## What is a Content Security Policy?

[Content Security Policy (CSP)]( https://web.dev/strict-csp/) allows to restrict certain behaviors in a website to increase security. For example, CSP can be used to disallow inline scripts or to disallow [`eval`](https://tc39.es/ecma262/#sec-eval-x), both of which reduce the attack surface for [Cross-Site Scripting (XSS)](https://owasp.org/www-community/attacks/xss/) attacks. For a detailed introduction to CSP, read [here](https://web.dev/csp/).

A particularly new CSP is the [Trusted Types(TT)](https://web.dev/trusted-types/) policy, which enables a dynamic analysis that can systematically prevent a large class of injection attacks on websites. To achieve this, TT supports a website in policing its JavaScript code to only allow certain types of things to be assigned to DOM sinks such as innerHTML.

A website can activate a content security policy by including a particular HTTP header. For example, the header
`content-security-policy: require-trusted-types-for 'script'; trusted-types default`
activates the TT policy for a page.

Each policy can operate in one of these modes:

- **enforced mode** - where every policy violation is an error,
- **report-only mode** - which reports the error message as a warning, but doesn't cause a failure in the web page.


## Implementing Content Security Policy Issues in the **Issues** tab

The goal of this work was to improve the debugging experience for CSP issues. When considering new issues, the DevTools team roughly follows this process:

1. **Defining user stories**. Identify a set of user stories in the DevTools front-end that covers how a web developer would need to investigate the problem.
2. **Front-end implementation**. Based on the user stories, identify which pieces of information are required for investigation of the issue in the front-end (e.g. a related request, the name of a cookie, a line in a script or html file, etc).
3. **Issue detection**. Identify the places in the browser where the issue can be detected in Chrome and instrument the place to report an issue including the relevant information from step (2).
4. **Save and display the issues**. Store the issues in an appropriate place and make them available to DevTools once is opened
5. **Designing the issues text**. Come up with an explanatory text that helps the web developer understand, and more importantly fix the problem


### Step 1: defining user stories for CSP Issues

Before we started our implementation work, we created a [design document](https://docs.google.com/document/d/1hmC2R-f2_024I3urdEpKm34V5tSWeIk8MuRts7rggso/) with user stories to better understand what we needed to do. For example, we wrote down the following user story:

----

As a developer, who just realized that some part of my website are blocked, I want to:-
- ...find out if CSP is a reason for blocked iframes / images on my website
- ...learn which CSP directive causes the blockage of a certain resource
- ...know how to change the CSP of my website to allow display of currently blocked resources / execution of currently blocked js.

----

To explore this user story, we created some simple example web pages that exhibited the CSP violations we were interested in, and explored the example pages to get familiar with the process ourselves.
Here are some of the example web pages (open the demo with the **Issues** tab open):

- [CSP issues](https://csp-issues.glitch.me/)
- [Trusted Types violations](https://tt-enforced.glitch.me/)
- [Trusted Types violations - report only mode](https://tt-report-only.glitch.me/)

Using this process, we learned that the source location was the most important piece of information for debugging CSP issues. We also found it useful to quickly find the associated iframe and request in case a resource was blocked, and that a direct link to the HTML element in the **Elements** panel of DevTools could also be useful.

### Step 2: front-end implementation

We turned this insight into the first draft of the information that we wanted to make available to DevTools via the [Chrome DevTools Protocol (CDP)](https://chromedevtools.github.io/devtools-protocol/):

Below is the excerpt from [third_party/blink/public/devtools_protocol/browser_protocol.pdl](https://source.chromium.org/chromium/chromium/src/+/master:third_party/blink/public/devtools_protocol/browser_protocol.pdl;l=652;drc=be78fe5cf948ee4863e72c9240a1b6f9f7430fde)

 ```java
 type ContentSecurityPolicyIssueDetails extends object
   properties
     # The url not included in allowed sources.
     optional string blockedURL
     # Specific directive that is violated, causing the CSP issue.
     string violatedDirective
     boolean isReportOnly
     ContentSecurityPolicyViolationType contentSecurityPolicyViolationType
     optional AffectedFrame frameAncestor
     optional SourceCodeLocation sourceCodeLocation
     optional DOM.BackendNodeId violatingNodeId
 ```

The definition above essentially encodes a JSON data-structure. It is written in a simple language called PDL (protocol data language). PDL is used for two purposes. First, we use PDL to generate the TypeScript definitions the DevTools front-end relies on. For example, the above PDL definition generates the following TypeScript interface:

```typescript
export interface ContentSecurityPolicyIssueDetails {
  /**
  * The url not included in allowed sources.
  */
  blockedURL?: string;
  /**
  * Specific directive that is violated, causing the CSP issue.
  */
  violatedDirective: string;
  isReportOnly: boolean;
  contentSecurityPolicyViolationType: ContentSecurityPolicyViolationType;
  frameAncestor?: AffectedFrame;
  sourceCodeLocation?: SourceCodeLocation;
  violatingNodeId?: DOM.BackendNodeId;
}
```

Secondly, and probably more importantly, we generate a C++ library from the definition that handles generating and sending these data structures from the C++ Chromium back-end to the DevTools front-end. Using that library, a `ContentSecurityPolicyIssueDetails` object can be created using the following piece of C++ code:

```cpp
protocol::Audits::ContentSecurityPolicyIssueDetails::create()
  .setViolatedDirective(d->violated_directive)
  .setIsReportOnly(d->is_report_only)
  .setContentSecurityPolicyViolationType(BuildViolationType(
      d->content_security_policy_violation_type)))
  .build();
```

Once we had settled on which information we wanted to make available, we needed to explore where to get this information from Chromium.


### Step 3: issue detection

To make the information available to the Chrome DevTools Protocol (CDP) in the format described in the last section, we needed to find the place where the information was actually available in the back-end. Fortunately, the CSP code already had a bottle-neck used for report-only mode, where we could hook into: [`ContentSecurityPolicy::ReportViolation`](https://source.chromium.org/chromium/chromium/src/+/master:third_party/blink/renderer/core/frame/csp/content_security_policy.cc;l=1128;drc=c7101018b828047f762bab9f0f129cdd53e03180) reports issues to an (optional) reporting end-point that can be configured in the [CSP HTTP header](https://developer.mozilla.org/docs/Web/HTTP/Headers/Content-Security-Policy/report-to). Most of the information we wanted to report was already available, so no big changes in the back-end were necessary for our instrumentation to work.


### Step 4: save and display the issues

A small complication is the fact that we also wanted to report issues that occurred before DevTools was opened, similar to how console messages are handled. This means that we don't report issues straight away to the front-end, but use a storage that is populated with issues independently of whether DevTools is open or not. Once DevTools is opened (or, for that matter any other CDP client is attached), all previously recorded issues can be replayed from the storage.

This concluded the back-end work, and we now needed to focus on how to surface the issue in the front-end.


### Step 5: designing the issues text
Designing the issues text is a process that involves several teams besides our own, for example, we often rely on insight from the team that implements a feature (in this case that would be the CSP team) and of course the DevRel team, which designs how web developers are supposed to deal with a certain type of problem. The issue text usually goes through some refinement until it is finished.

Usually the DevTools team will start with a rough draft of what they imagine:

```md

## Header
Content Security Policy: include all sources of your resources in content security policy header to improve the functioning of your site

## General information
Even though some sources are included in the content security policy header, some resources accessed by your site like images, stylesheets or scripts originate from sources not included in content security policy directives.

Usage of content from not included sources is restricted to strengthen the security of your entire site.

## Specific information

### VIOLATED DIRECTIVES
`img-src 'self'`

### BLOCKED URLs
https://imgur.com/JuXCo1p.jpg

## Specific information
https://web.dev/strict-csp/

```

After iteration, we then arrived at:

{% Img src="image/OEs9sSlbxePTYhSctRsJ9kgrqPy1/MfDONbPHl6Fl0IXKUT72.png", alt="ALT_TEXT_HERE", width="800", height="377" %}

As you can see, involving the feature team and DevRel makes the description a lot more clear and precise!

CSP issues on your page can also be discovered in the [tab specifically dedicated to CSP violations](/blog/new-in-devtools-89/#csp).


## Debugging Trusted Types problems

Working with TT at large scale can be challenging without the right developer tools.


### Improved console printing

When we are working with Trusted Objects, we would like to display at least the same amount of information as for the non-trusted counterpart. Unfortunately, currently when displaying a Trusted Object no information about the wrapped object is displayed.

It is because the value that is displayed in the console is taken from calling `.valueOf()` on the object by default. However, in the case of Trusted Type, the returned value is not very useful. Instead, we would like to have something similar to what you get when calling `.toString()`. To achieve this, we need to modify V8 and Blink to introduce special handling for trusted type objects.

Although due to historical reasons this custom handling was done in V8, such an approach has important disadvantages. There are many objects that require custom displaying but whose type is the same at the JS level. Since V8 is pure JS, it cannot distinguish concepts that correspond to a Web API such as a Trusted Type. For that reason, V8 has to ask its embedder (Blink) for help to distinguish them.

Hence, moving that part of the code to Blink or any embedder sounds like a logical choice. Apart from the exposed issue, there are many other benefits:

- Each embedder can have its own description generation
- It is way easier to generate the description through the Blink API
- Blink has access to the original definition of the object. Thus if we use `.toString()` to generate the description, there is no risk that `.toString()` might be redefined.


### Break-on-violation (in report-only mode)

Currently, the [only way of debugging TT violations](/blog/new-in-devtools-89/#trusted-types) is by setting breakpoints on JS exceptions. Since enforced TT violations will trigger an exception, this feature can be somehow useful. However, in real world scenarios you need a more fine-grained control over TT violations. In particular, we would like to break only on TT violations (not other exceptions), break also in report-only mode and distinguish between the different types of TT violations.

DevTools already has support for a wide variety of breakpoints so the architecture is quite extensible. Adding a new breakpoint type requires changes in the backend (Blink), CDP and the frontend.
We should introduce a new CDP command, let's call it `setBreakOnTTViolation`. This command will be used by the frontend to tell the backend on what sort of TT violations it should break. The backend, in particular `InspectorDOMDebuggerAgent`, will provide a "probe", `onTTViolation()` that will be called every time a TT violation occurs. Then, `InspectorDOMDebuggerAgent` will check if that violation should trigger a breakpoint, and if that is the case it will send a message to the frontend to pause the execution.


## What’s done and what’s next?

Since the issues described here were introduced, the **Issues** tab has undergone quite some changes:

- Its [interconnectedness](/blog/new-in-devtools-89/#trusted-type-link) with other panels in DevTools has been improved.
- Reporting of a number of further problems has moved to the **Issues** tab: [low-contrast](/blog/new-in-devtools-90/#low-contrast), [trusted web-activity](/blog/new-in-devtools-90/#twa), [quirks mode](/blog/new-in-devtools-92/#quirks-mode), [attribution reporting API](/blog/new-in-devtools-93/#attribution-reporting) and
[CORS-related issues](/blog/new-in-devtools-93/#cors) among others.
- An opportunity to [hide issues](/blog/new-in-devtools-94/#hide-issues) was introduced

Moving forward, we plan to use the **Issues** tab to surface more problems, which will make it possible to unload the Console of the unreadable error-message flow in the long run.

{% Partial 'devtools/reach-out.md' %}
{% Partial 'devtools/engineering-blog.md' %}
