---
layout: "layouts/doc-post.njk"
title: "Ignore List"
authors:
  - sofiayem
date: 2023-02-16
#updated: YYYY-MM-DD
description: "Ignore List tab reference."
---

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/9gzXiTYY0nZzBxGI6KrV.svg", alt="Settings.", width="24", height="24" %} [**Settings**](/docs/devtools/settings/#open) > **Ignore List** lets you configure the list of scripts the [debugger](/docs/devtools/javascript/) ignores.

To enable or disable all ignore listing for the debugger:

1. [Open Settings](/docs/devtools/settings/#open).
1. In the **Ignore List** tab, check or clear {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/9gzXiTYY0nZzBxGI6KrV.svg", alt="Settings.", width="24", height="24" %} **Settings** > {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/hmp8j3HiLMCcqPArD9yt.svg", alt="Checkbox.", width="22", height="22" %} **Enable Ignore Listing**. This is the main switch for all ignore-listing capabilities.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/bissqX3mFMWLW6A1M4kp.png", alt="The Enable Ignore Listing checkbox.", width="800", height="548" %}

With ignore-listing enabled, you can further customize the list of scripts to ignore.

## Ignore Chrome Extensions scripts  {: #skip-extensions }

When using the **Sources** panel of Chrome DevTools to [step through code](/docs/devtools/javascript#code-stepping), sometimes you pause on code that you don't recognize. You're probably paused on the code of one of the Chrome Extensions that you've installed.

In {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/9gzXiTYY0nZzBxGI6KrV.svg", alt="Settings.", width="24", height="24" %} **Settings** > **Ignore List**, enable two checkboxes:

- {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/hmp8j3HiLMCcqPArD9yt.svg", alt="Checkbox.", width="22", height="22" %} **Enable Ignore Listing**
  - {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/hmp8j3HiLMCcqPArD9yt.svg", alt="Checkbox.", width="22", height="22" %} **Add content scripts to ignore list**.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/61Ez8rtic95aCrG0WhPi.png", alt="Settings DevTools to ignore extensions code.", width="800", height="525" %}

## Ignore known third-party scripts {: #skip-third-party }

To make the debugger skip known third-party scripts, check {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/9gzXiTYY0nZzBxGI6KrV.svg", alt="Settings.", width="22", height="22" %} **Settings** > **Ignore List** > {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/hmp8j3HiLMCcqPArD9yt.svg", alt="Checkbox.", width="22", height="22" %} **Automatically add known third-party scripts to ignore list**.

DevTools adds third-party scripts to the ignore list based on the [x_google_ignoreList](/articles/x-google-ignore-list/) property in source maps. Frameworks and bundlers need to supply this information.

For example, frameworks like Angular and Nuxt support this feature. 

## Ignore a custom list of scripts {: #custom-ignore-pattern }

To ignore a single script or a custom pattern of scripts:

1.  Check {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/9gzXiTYY0nZzBxGI6KrV.svg", alt="Settings.", width="22", height="22" %} **Settings** > **Ignore List** > {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/hmp8j3HiLMCcqPArD9yt.svg", alt="Checkbox.", width="22", height="22" %} **Enable Ignore Listing**.
1.  In the **Custom exclusion rules** section, click **Add pattern**.
    {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/SToKXhMb1doVUojwzzaV.png", alt="Adding a custom pattern to the Ignore List.", width="800", height="587" %}
1.  Specify the script name or a RegEx pattern of script names to ignore.
1.  Click **Add** to save changes.

## Manage a custom list of ignored scripts {: #manage-custom-ignore-list }

To enable or disable ignoring of a specific script or pattern of script names, in {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/9gzXiTYY0nZzBxGI6KrV.svg", alt="Settings.", width="22", height="22" %} **Settings** > **Ignore List** > **Custom exclusion rules**, check or clear the {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/hmp8j3HiLMCcqPArD9yt.svg", alt="Checkbox.", width="22", height="22" %} checkbox next to the script or pattern.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/0DZDXRV7SOgWGrzUEM7X.png", alt="A custom ignore list with a pattern or script names enabled.", width="800", height="569" %}

To edit or remove a script or a pattern of script names, click {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/JJEyylF1sToNKTtoFm4Q.svg", alt="Edit.", width="22", height="22" %} or {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/YxQ6ggkbUKxxxqHiaUz4.svg", alt="Delete.", width="22", height="22" %} buttons that appear on hover.

