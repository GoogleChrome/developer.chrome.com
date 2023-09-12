---
layout: "layouts/blog-post.njk"
title: "Find form issues with Chrome DevTools"
authors:
  - samdutton
date: 2023-05-10
description: "The Chrome DevTools team is building additional new features to help find form issues and debug Autofill. These features are at an early stage of design and implementation, and we need your testing and feedback."
subhead: "The Chrome DevTools team is building additional new features to help you find form issues and debug Autofill."
hero: "image/80mq7dk16vVEg8BBhsVe42n6zn82/Hb9WLYcJTy5XUa3NZTIx.png"
thumbnail: "image/80mq7dk16vVEg8BBhsVe42n6zn82/1NsMvhn3ESqYfLwTvwsY.png"
alt: "Chrome DevTools, displaying information about issues for form autofill: in this case, a label with an empty for attribute."
tags:
  - devtools
---

In Chrome Canary we're testing new features in DevTools that aim to help developers understand how
form Autofill works, and why it sometimes fails:

* How does browser Autofill map stored values to form fields?
* What criteria are used by Autofill to fill a form field?
* Which fields didn't get filled by Autofill?
* Why does a form field not get filled by Autofill?

This article outlines the new features in Chrome DevTools, and explains how you can test them and
provide feedback.

{% YouTube id='Rb-LALxgsfY' %}

## What is Autofill?

Chrome helps users manage address, payment and login information, by securely storing sets of data
and offering to fill in form fields without the user needing to enter text. That's known as
Autofill.

Chrome offers to save Autofill data when you submit a form. On mobile:

{% Img src="image/80mq7dk16vVEg8BBhsVe42n6zn82/7fpYUMmMB4FeyV5MaWFY.png", alt="Three Android
screenshots: an address form in Chrome, Chrome Autofill offering to save the address, then showing
dialog for editing the new Autofill entry.", width="800", height="482" %}

Subsequently, Chrome offers to autofill forms with the data that was saved.

On mobile:

{% Video src="video/80mq7dk16vVEg8BBhsVe42n6zn82/dP3gzXuJPPuoKteHy3Hj.mp4", width="800",
height="450", poster="image/80mq7dk16vVEg8BBhsVe42n6zn82/yjaspkVkQAW6mJKnhnR4.png" %}

On desktop:

{% Img src="image/80mq7dk16vVEg8BBhsVe42n6zn82/yqxrI14mvmSqtlikSpbO.png",
  alt="Chrome offering to autofill an address form on desktop", width="800", height="1023" %}

You can manage your Autofill data in Chrome settings.

On mobile:

{% Img src="image/80mq7dk16vVEg8BBhsVe42n6zn82/q2KAZuvUYRzW5I7MqxRb.png", alt="Chrome settings on
Android: editing an address", width="800", height="736" %}

On desktop:

{% Img src="image/80mq7dk16vVEg8BBhsVe42n6zn82/VODRnZPsRbTi2c1DZzuG.png",
alt="chrome://settings/addresses page, showing two sample addresses", width="800", height="511" %}

You might also have seen Chrome offer suggestions for input fields that are not related to address,
credit card, or login data. In addition to offering Autofill for  _sets_ of structured data such as
address and payment details, Chrome helps users avoid re-entering data for _single_ form fields that
can't be handled by Autofill. When a form has a field with a name attribute that Chrome has
encountered before, Chrome can suggest values so you don't need to re-enter data.

Here's a simple example:

{% Video src="video/80mq7dk16vVEg8BBhsVe42n6zn82/uFbqgaZpXqWY3QGYrG4x.mp4", width="800",
height="450" %}

{% Img src="image/80mq7dk16vVEg8BBhsVe42n6zn82/ZIvdwtNCacIYaQ29XH8R.png", alt="Chrome offering
suggestions for unstructured data in a single form field", width="800", height="490" %}

Chrome DevTools shows that the form field here doesn't have attributes that are meaningful to the
browser. Instead, it's just a `name` attribute of `n300`.

{% Img src="image/80mq7dk16vVEg8BBhsVe42n6zn82/IGVcerAd9GMHuaOHa37D.png", alt="Chrome DevTools
showing information about the unstructured data in a form, as shown in the previous example: a
single input that only has the attributes type=text and name=n300.", width="800", height="489" %}

The field doesn't correspond to a value in a set of structured data that would make it appropriate
for Chrome Autofill, but Chrome can still help the user if it encounters a field with this name in
the future.

## Test new Chrome DevTools Autofill features

Chrome is testing new capabilities for the DevTools **Issues** panel, to help debug Autofill
glitches.

{% Aside %}
These features are at an early stage of design and implementation, and we need your help to make
sure we get them right! We welcome [feedback](#feedback).
{% endAside %}

You can try out these new capabilities in Chrome Canary. Check {% Img
src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/9gzXiTYY0nZzBxGI6KrV.svg", alt="Settings.", width="24",
height="24" %} Settings > Experiments > {% Img
src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/hmp8j3HiLMCcqPArD9yt.svg", alt="Checkbox.", width="22",
height="22" %}  **Highlights a violating node or attribute in the Elements panel DOM tree** in
DevTools and reload DevTools when prompted.

{% Img src="image/80mq7dk16vVEg8BBhsVe42n6zn82/YDAbZMCk66QQfPap0c8g.png", alt="Chrome DevTools
settings page, showing 'Highlights a violating node ...'", width="800", height="355" %}

Alternatively, you can run Chrome Canary from the command line with the
`AutofillEnableDevtoolsIssues` flag:

- Windows:
  ```shell
  start chrome --restart --flag-switches-begin --enable-features=AutofillEnableDevtoolsIssues
  ```
- Mac:
  ``` shell
  open -a "Google Chrome Canary" --args --restart --flag-switches-begin --enable-features=AutofillEnableDevtoolsIssues
  ```

{% Aside %}
Whenever you're regularly running Chrome with flags, you might want to set an alias for that
command, like this on a Mac:
``` text
alias ca='open -a "Google Chrome Canary" --args --restart --flag-switches-begin
--enable-features=AutofillEnableDevtoolsIssues'
```
{% endAside %}

To check for problems, open the DevTools **Issues** panel on a page that has a form.
[form-problems.glitch.me](form-problems.glitch.me) is a good place to start.

{% Video src="video/80mq7dk16vVEg8BBhsVe42n6zn82/3XO1fnPLodqZcMRDeAfz.mp4", width="800",
height="450" %}

{% Img src="image/80mq7dk16vVEg8BBhsVe42n6zn82/wdj3ougc8qyBd03SfSaq.png", alt="Chrome DevTools
showing an issue with the for attribute of a form element.", width="800", height="513" %}

As you can see, this form is a mess! There are:

* Input fields without an `id` or `name` attribute.
* Elements with duplicate IDs.
* A `<label>` with a `for` attribute that doesn't match an element ID.
* A field with an empty `autocomplete` attribute.

Hover over a highlighted element in the DOM tree and click **View issue** to learn more.

{% Img src="image/80mq7dk16vVEg8BBhsVe42n6zn82/zzcgmJCvGW9KNeES8HBH.png", alt="Expanded issue in
Chrome DevTools: Incorrect use of label for attribute.", width="800", height="513" %}

Click **Violating node** to view the affected resources for each issue. This form has eight labels
with a `for` attribute that doesn't match the `id` of a form field.

## Use DevTools to improve form accessibility

DevTools can also highlight Autofill accessibility problems, such as a form field that doesn't have
either an `aria-labelledby` attribute or an associated `<label>`.

{% Img src="image/80mq7dk16vVEg8BBhsVe42n6zn82/ytfty5tjDGh7lPfpSEFj.png", alt="Chrome DevTools
Accessibility panel, showing that a label was found for an input element in a form.", width="800",
height="513" %}

In this example, an `<input>` element has a matching label. This means that assistive devices can
announce the purpose of the element. However, in the following example, no matching label or
`aria-labelledby` attribute was found.

{% Img src="image/80mq7dk16vVEg8BBhsVe42n6zn82/smyF0wXvUmnaHmXYtZVO.png", alt="Chrome DevTools
Accessibility panel, showing that no matching label, or aria-labelledby attribute, was found for an
input element in a form.", width="800", height="513" %}

<!-- The Chrome team is also working on a dedicated Autofill tab in the Elements panel in DevTools.

{% Img src="image/80mq7dk16vVEg8BBhsVe42n6zn82/YCQxWmtavrEOZZ4tYYEI.png", alt="Autofill panel,
showing the format for an address in India.", width="800", height="494" %} -->

## Provide feedback on the new Autofill features in DevTools {: #feedback }

Use the following options to discuss the new features and changes in the post, or anything else
related to DevTools:

* Submit a suggestion or feedback to us via the
[umbrella bug on crbug.com](https://bugs.chromium.org/p/chromium/issues/detail?id=1442954).
* Report an issue from DevTools: **More options** > **Help** > **Report a DevTools issue**.
* Tweet at [@ChromeDevTools](https://twitter.com/intent/tweet?text=@ChromeDevTools).

## Find out more

* [Learn Forms](https://web.dev/learn/forms): A course about HTML forms to help you improve
    your web developer expertise. Ideal for anyone new to forms and Autofill.
* [web.dev/tags/forms](https://web.dev/tags/forms/): Guidance, best practice and codelabs, for
    payment, login, and address forms.
