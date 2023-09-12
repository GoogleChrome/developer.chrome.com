---
layout: 'layouts/doc-post.njk'
title: What are Chrome flags?
subhead: Activate additional debugging tools, or try out new or experimental features.
description: Enable additional debugging tools or try out new or experimental features in Chrome. 
date: 2023-02-08
authors:
- samdutton
---

Chrome flags are a way to activate browser features that are not available by default.

{% YouTube
id='K-T3Zz6qv7w'
%}

For example, Chrome wanted to allow users to try [picture-in-picture](/blog/watch-video-using-picture-in-picture/) video functionality, before rolling it out to everyone.

{% Img src="image/80mq7dk16vVEg8BBhsVe42n6zn82/KdaFOBbnf6k7MOEW1RRb.png",  
  alt="Chrome picture-in-picture allows users to keep watching a video from one tab, while working
in another tab.", width="533", height="300", params={style:'border: 1px solid black'} %}

The feature was made available behind a flag, so any user to try it out and give feedback. The code
and design were tested and polished based on the feedback, so now you can use picture-in-picture by
default in Chrome—and it works really well.


## Understand the risks

**Most Chrome users will never need to use Chrome flags**.

If you do set Chrome flags, you need to be careful. By activating or deactivating features, you
could lose data or compromise your security or privacy—and features you toggle with a flag may stop
working or be removed without notice.

If you're an enterprise IT admin, you should not use Chrome flags in production. You might want to
take a look at [enterprise policies](https://chromeenterprise.google/policies/) instead. 

### ...and proceed with caution

Having said all that, if you're a web developer who needs to try out new technology—or just a
curious geek—then getting to know Chrome flags can be really worthwhile.

There are a large number of flags for many different types of features. Some flags affect the way
Chrome looks or works, and some activate new functionality such as CSS features or JavaScript APIs.
The availability of flags depends on which version of Chrome you're running.

{% Aside 'important' %}
Make sure to test your site in Chrome Stable without any flags set: as the majority of your users
will experience it.
{% endAside %}

There are two ways to set Chrome flags:
- From the `chrome://flags` page.
- By opening Chrome from the command line in a terminal.

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
API](/docs/privacy-sandbox/topics/) activated and [epoch
length](/docs/privacy-sandbox/topics/overview/#epoch) set to 15 seconds, use the
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

Also be aware that `chrome://flags` might not show the flag settings you've used from the
command line. Instead, take a look at `chrome://version`. From the **Command Line** section,
you can check what flags are enabled in your browser.

{% Img src="image/80mq7dk16vVEg8BBhsVe42n6zn82/iWCWmsz0Y7wmc8FQA7Is.png", alt="chrome://version page
in Chrome Canary, Command Line section highlighted.", width="800", height="445" %}

This example matches the example above, that runs Chrome from the command line with flags.

## Two other ways to try out experimental features

You can enable a range of experimental features that don't have their own flag, by toggling the
`chrome://flags#enable-experimental-web-platform-features` flag. Documentation for new features will
explain when this is an option.

In [Chrome Beta](https://www.google.com/intl/en_uk/chrome/beta/) you can try out featured
experiments and give feedback, by toggling **Experiment** settings and relaunching the browser.
[Test experimental features in Chrome](https://support.google.com/chrome/answer/10612145?hl=en-GB)
provides more detail.

{% Img src="image/80mq7dk16vVEg8BBhsVe42n6zn82/UstQP25xQaPlbih6Ok23.png",
  alt="Screenshot of Experiments UI in Chrome Beta, showing Tab scrolling options.",
  width="800", height="417" %}

## Which features get a flag?

Not all experimental features get their own Chrome flag:
* Some features only become available when they ship in Chrome Canary, and can't be activated by a
flag before that. This is quite rare.
* For 'smaller' features that require no more than 1–2 quarters of work, experimental availability
is provided by enabling the following flag: <br>
`chrome://flags#enable-experimental-web-platform-features`<br>
This activates multiple minor features.
* Major features are made available for experimentation with flags specific to the feature, via `chrome://flags` or command line switches.

## What about Chrome settings?

Chrome settings and Chrome flags serve different purposes.

Chrome flags enable the user to activate or deactivate experimental features, whereas the controls
available from the `chrome://settings` page allow the user to customize their experience for features
that are available by default.

## What about origin trials?

[Origin trials](/docs/web-platform/origin-trials/) are a way for
developers to test a new or experimental web platform feature at scale, and give feedback to the web
standards community before the feature is made available to all users.

Features undergoing an origin trial are activated on all pages that provide a valid token for that
trial. This allow website owners to activate an experimental feature for all their users, without
requiring users to change browser settings or set flags. By comparison, Chrome flags allow
individual users to activate or deactivate an experimental feature, on all websites they visit.
[Getting started with Chrome's origin trials](/docs/web-platform/origin-trials/)
provides more detail.

## Find out more 

- The chromium.org website explains
[how to set flags from the command line](https://www.chromium.org/developers/how-tos/run-chromium-with-flags/),
for mobile and desktop on different platforms.
- Learn about
[features, flags, switches, and other patterns](https://chromium.googlesource.com/chromium/src/+/main/docs/configuration.md)
for browser experimentation.
- The
[List of Chromium Command Line Switches](https://peter.sh/experiments/chromium-command-line-switches/)
is automatically updated with all available flags and, last time we checked, there were more
than 1400 of them!
- [Chromium Flag Updates](https://twitter.com/ChromiumFlags) is a bot that tweets changes to the [chrome/browser/flag-metadata.json](https://chromium.googlesource.com/chromium/src/+/master/chrome/browser/flag-metadata.json) file.
- There are even more flags available to configure individual JavaScript API features. You can
find out more about them from API documentation and proposal explainers.
- [Experimental features in Firefox](https://developer.mozilla.org/docs/Mozilla/Firefox/Experimental_features)
