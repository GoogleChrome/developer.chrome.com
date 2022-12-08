---
layout: 'layouts/doc-post.njk'
title: What are Chrome flags?
subhead: Activate additional debugging tools, or try out new or experimental features.
description: Enable additional debugging tools or try out new or experimental features in Chrome. 
date: 2022-10-28
authors:
- samdutton
---

{% YouTube
id='K-T3Zz6qv7w' 
%}

Chrome flags are a way to activate browser features that are not available by default.

For example, Chrome wanted to allow users to try [picture-in-picture](https://developer.chrome.com/blog/watch-video-using-picture-in-picture/) video functionality, before rolling it out to everyone.

{% Img src="image/80mq7dk16vVEg8BBhsVe42n6zn82/KdaFOBbnf6k7MOEW1RRb.png",  
  alt="Chrome picture-in-picture allows users to keep watching a video from one tab, while working
in another tab.", width="800", height="450" %}

The feature was made available behind a flag, so any user to try it out and give feedback. The code
and design were tested and polished based on the feedback, so now you can use picture-in-picture by
default in Chrome—and it works really well.


## Understand the risks...

**Most Chrome users will never need to use Chrome flags**.

If you do set Chrome flags, you need to be careful. By activating or deactivating features, you
could lose data or compromise your security or privacy—and features 'behind a flag' may stop
working or be removed without notice.

If you're an enterprise IT admin, you should not use Chrome flags in production. You might want to
take a look at [enterprise policies](https://chromeenterprise.google/policies/) instead. 

## ...and proceed with caution

Having said all that—if you're a web developer, or you're just a curious geek who likes trying out
new technology, then getting to know Chrome flags can be really worthwhile.

There are a large number of flags for many different types of features. Some flags affect the way
Chrome looks or works, and some activate new features, such as new CSS features or JavaScript APIs.
The availability of flags depends on which version of Chrome you're running.

{% Aside 'important' %}
Make sure to test your site as the majority of users will experience it: in Chrome Stable without
any flags set.   
{% endAside %}

There are two ways to set Chrome flags:
-  From the `chrome://flags` page.
-  By opening Chrome from the command line in a terminal.

## chrome://flags

To set a flag from the `chrome://flags` page in Chrome, you need to find the flag, toggle the setting
for the flag, then relaunch the browser.
For example, to activate Chrome's heads-up display for performance metrics:

1. Search for the feature.  
  
{% Img src="image/80mq7dk16vVEg8BBhsVe42n6zn82/WHsSed0nysQJ1FtCwnbo.png", alt="chrome://flags page
with HUD flag set to default.", width="800", height="509" %}

2. Set the value to **Enabled**.

{% Img src="image/80mq7dk16vVEg8BBhsVe42n6zn82/9JEV7AMGLQQZvr3i79ij.png", alt="chrome://flags page
with HUD flag enabled.", width="800", height="499" %}

3. Relaunch Chrome.

{% Img src="image/80mq7dk16vVEg8BBhsVe42n6zn82/NHJLNtGrAcHh3JxXvT6F.png", alt="Once you've updated a
flag, Chrome will prompt you to relaunch the browser..", width="800", height="509" %}

Now you can use the heads-up display that shows technical information about web page performance.  
  
{% Img src="image/80mq7dk16vVEg8BBhsVe42n6zn82/tQNuu0Fd2BYpuAi2U5NL.png", alt="Chrome page with
heads-up display activated.", width="800", height="494" %}

{% Aside %}
If you make changes to `chrome://flags`, all the flags you've changed are listed first on the
page.
{% endAside %}

## Command-line flags

If you're a web developer, you may want to set flags by opening Chrome from the command line in a
terminal. You run the command to open Chrome, and add the flags you want to set. There are a lot
more Chrome settings you can configure from the command line than what's available on the
`chrome://flags` page. 

For example, to run Chrome Canary from a terminal on a Mac, with the [Topics
API](https://developer.chrome.com/docs/privacy-sandbox/topics/) activated and [epoch
length](https://developer.chrome.com/docs/privacy-sandbox/topics/#epoch) set to 15 seconds, use the
following command:

``` text
/Applications/Google\ Chrome\ Canary.app/Contents/MacOS/Google\ Chrome\ Canary
--enable-features=BrowsingTopics:time_period_per_epoch/15s,PrivacySandboxAdsAPIsOverride,PrivacySandboxSettings3,OverridePrivacySandboxSettingsLocalTesting  
```

That's just one example! There are hundreds of other flags for activating, deactivating and
configuring less well-known features.

### Beware of flag conflicts 

It's possible that the flags you set could conflict with each other. In particular, the defaults for
a `chrome://flags` setting might, in some cases, override your command line configurations. So—if
the flags you set running Chrome from the command line don't work as expected, you should check your
`chrome://flags` page.  

Also be aware that the `chrome://flags` page might not show the flag settings you've used from the
command line. Instead, take a look at the `chrome://version` page. From the **Command Line** section
of the page, you can check what flags are in play.

{% Img src="image/80mq7dk16vVEg8BBhsVe42n6zn82/iWCWmsz0Y7wmc8FQA7Is.png", alt="chrome://version page
in Chrome Canary, Command Line section highlighted", width="800", height="445" %}

This example matches the example above, that runs Chrome from the command line with flags.

## Two other ways to try out experimental features

From Chrome Beta, you can try out and give feedback on featured experiments by toggling
**Experiment** settings and relaunching the browser.

{% Img src="image/80mq7dk16vVEg8BBhsVe42n6zn82/UstQP25xQaPlbih6Ok23.png",
  alt="Screenshot of Experiments UI in Chrome Beta, showing Tab scrolling options",
  width="800", height="417" %}

[Test experimental features in Chrome](https://support.google.com/chrome/answer/10612145?hl=en-GB)
provides more detail.

You can also enable the `chrome://flags#enable-experimental-web-platform-features` flag. This
activates a range of experimental features that don't have individual flags. Documentation for new
features will explain when this is an option.

## Do all features get a flag?

Not all new features get an individual Chrome flag.

There are three alternative scenarios:
* No experimental availability until the feature ships. This is quite rare.
* Experimental availability using `chrome://flags#enable-experimental-web-platform-features`.
Generally the case for 'smaller' features (that require no more than 1–2 quarters of work).
* Experimental availability using a flag specific to the feature via chrome://flags or command line
switches. This is more common for major features.

## What about Chrome settings?

Chrome settings and Chrome flags serve different purposes.

Chrome flags enable the user to activate or deactivate experimental features, whereas the controls
available from the `chrome://settings` page allow the user to customize their experience of features
that are available by default.

## What about origin trials?

[Origin trials](https://developer.chrome.com/docs/web-platform/origin-trials/) are a way for
developers to test a new or experimental web platform feature, and give feedback to the web
standards community, before the feature is made available to all users. Features undergoing an
origin trial are activated on all pages that provide a valid trial token.

Origin trials allow website owners to get the browser to activate an experimental feature by default
for all their users, without requiring users to change browser settings. By comparison, Chrome
flags are allow individual users to activate or deactivate an experimental feature, on all websites
they visit. [Getting started with Chrome's origin trials](https://developer.chrome.com/docs/web-platform/origin-trials/) provides more detail.

## Find out more 

-  The chromium.org website explains
    [how to set flags from the command line](https://www.chromium.org/developers/how-tos/run-chromium-with-flags/),
    for mobile and desktop on different platforms. 
-  Learn about
    [features, flags, switches, and other patterns](https://chromium.googlesource.com/chromium/src/+/main/docs/configuration.md)
    for browser experimentation.
-  The
    [List of Chromium Command Line Switches](https://peter.sh/experiments/chromium-command-line-switches/)
    is automatically updated with all available flags and, last time we checked, there were more
    than 1400 of them!
-  There are even more flags available to configure individual JavaScript API features. You can
    find out more about them from API documentation and proposal explainers.
-  [Experimental features in Firefox](https://developer.mozilla.org/en-US/docs/Mozilla/Firefox/Experimental_features)
-  [Links to flag docs for other browsers.]