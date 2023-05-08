---
layout: "layouts/doc-post.njk"
title: "Lighthouse: Optimize website speed"
authors:
  - kaycebasques
  - sofiayem
date: 2018-06-18
updated: 2023-03-15
description: "Learn how to use Chrome DevTools to find ways to make your websites load faster."
tags:
  - get-started
  - performance
---

## Goal of tutorial {: #goal_of_tutorial }

This tutorial teaches you how to use Chrome DevTools to find ways to make your websites load faster.

Read on, or watch the video version of this tutorial:

{% YouTube id="5fLW5Q5ODiE" %}

{% Aside 'important' %}
This video was made with Chrome 68. Most of it is still true but some features have been updated.
For example, the **Audits** panel is now called **Lighthouse**, and it has a different look but all of the same options are still there.
For more information, see [What's new in Lighthouse](/tags/new-in-lighthouse/).
{% endAside %}

## Prerequisites {: #prerequisites }

- You should have basic web development experience, similar to what's taught in this [Introduction
  to Web Development class][1].
- You don't need to know anything about load performance. You'll learn about it in this tutorial!

## Introduction {: #intro }

This is Tony. Tony is very famous in cat society. He has built a [website](https://tony.glitch.me/) so that his fans can learn
what his favorite foods are. His fans love the site, but Tony keeps hearing complaints that the site
loads slowly. Tony has asked you to help him speed the site up.

<figure>
{% Img src="image/admin/TLlf3OH689gZcCLnEY67.jpg", alt="Tony the cat.", width="800", height="600" %}
  <figcaption>
    Tony the cat.
  </figcaption>
</figure>

## Step 1: Audit the site {: #audit }

Whenever you set out to improve a site's load performance, **always start with an audit**. The audit
has two important functions:

- It creates a **baseline** for you to measure subsequent changes against.
- It gives you **actionable tips** on what changes will have the most impact.

### Set up {: #setup }

But first, you need to set up a new working environment for [Tony's website](https://glitch.com/edit/#!/tony) so that you can make changes to it later:

1. [Remix the website's project on Glitch][2]. Your new project opens in a tab. This tab will be referred to as the _editor tab_.

   {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/vNL328lOu6idOm4AKNdP.png", alt="The original source and the editor tab after clicking Remix.", width="800", height="466" %}

   The name of the project changes from **tony** to some randomly-generated name. You now have your own editable copy of the code. Later on, you'll make changes to this code.

1. At the bottom of the editor tab, click **Preview** > **Preview in a new window**. The demo opens in a new tab. This tab will be referred to as the _demo tab_. It may take a while for the site to load.

   {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/dX6kVyYogDqrDVcM4WzJ.png", alt="The demo tab.", width="800", height="614" %}

1. [Open DevTools](/docs/devtools/open) alongside the demo.

   {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/IgZOUlF1RxARqEGoKjKF.png", alt="DevTools and the demo.", width="800", height="535" %}

{% Aside 'important' %}
For the rest of the screenshots in this tutorial, DevTools is shown in a [separate window](/docs/devtools/customize/#placement).
{% endAside %}

### Establish a baseline {: #baseline }

The baseline is a record of how the site performed before you made any performance improvements.

1.  Open the **Lighthouse** panel. It may be hidden behind {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/V93Xxk8HvmByCBGzMdW4.svg", alt="More panels.", width="20", height="20" %} **More panels**.
   
    {% Aside %}
    This panel is powered by its namesake—[**Lighthouse**](/docs/lighthouse), an automated tool for improving the quality of your web apps.
    {% endAside %}

    {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/4zA1JQLNurO4o8WyAy9T.png", alt="The Lighthouse panel.", width="800", height="830" %}

2.  Match your Lighthouse report configuration settings to those on the screenshot. Here's an explanation of the
    different options:

    - {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/hmp8j3HiLMCcqPArD9yt.svg", alt="Checkbox.", width="24", height="24" %} **Clear Storage**. Enabling this checkbox clears all storage associated with the page before every audit. Leave this setting on if you want to audit how first-time visitors experience your site. Disable this setting when you want the repeat-visit experience.
    - **Simulated throttling (default)** {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/C8J2TiWeNKJhQn3eEauv.svg", alt="Drop-down.", width="20", height="20" %}. This option simulates the typical conditions of browsing on a mobile device. It's called "simulated" because Lighthouse doesn't actually throttle during the auditing process. Instead, it just extrapolates how long the page would take to load under mobile conditions. The **DevTools throttling (advanced)** setting, on the other hand, actually throttles your CPU and network, with the tradeoff of a longer auditing process.
    - **Mode** > {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/ljri3HPj5aVym9qgMfkx.svg", alt="Radio button checked.", width="20", height="20" %} **Navigation (Default)**. This mode analyses a single page load and that's what we need in this tutorial. For more information, see [The three modes](https://github.com/GoogleChrome/lighthouse/blob/HEAD/docs/user-flows.md#the-three-modes-navigation-timespan-snapshot).
    - **Device** > {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/ljri3HPj5aVym9qgMfkx.svg", alt="Radio button checked.", width="20", height="20" %} **Mobile**. The mobile option changes the user agent string and simulates a mobile
      viewport. The desktop option pretty much just disables the mobile changes.
    - **Categories** > {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/hmp8j3HiLMCcqPArD9yt.svg", alt="Checkbox.", width="24", height="24" %} **Performance**. A single enabled category makes Lighthouse generate a report only with the corresponding set of audits. You can leave the other categories enabled, if you want to see the types of recommendations they provide. Disabling irrelevant categories slightly speeds up the auditing process.

3.  Click **Analyze page load**. After 10 to 30 seconds, the **Lighthouse** panel shows you a report of the site's
    performance.

    {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/CvzyCerAE3dyr2mPdHgm.png", alt="A Lighthouse report of the site's performance.", width="800", height="918" %}

#### Handling report errors {: #errors }

If you ever get an error in your Lighthouse report, try running the demo tab from an [incognito
window][4] with no other tabs open. This ensures that you're running Chrome from a clean state.
Chrome Extensions in particular often interfere with the auditing process.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/qw1Qx8ijvLy1FziWKo7v.png", alt="A report with an error.", width="800", height="787" %}

### Understand your report {: #report }

The number at the top of your report is the overall performance score for the site. Later, as you
make changes to the code, you should see this number rise. A higher score means better performance.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/2oZzGYcMuQTwdCigBOCu.png", alt="The overall performance score.", width="800", height="612" %}

#### Metrics {: #metrics }

Scroll down to the **Metrics** section and click **Expand view**. To read documentation on a metric, click **Learn more...**.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/fhK91fGcQEPIkuhYbj7r.png", alt="The Metrics section.", width="800", height="712" %}

This section provides quantitative measurements of the site's performance.
Each metric provides insight into a different aspect of the performance. For example, **First Contentful Paint**
tells you when content is first painted to the screen, which is an important milestone in the user's
perception of the page load, whereas **Time To Interactive** marks the point at which the page
appears ready enough to handle user interactions.

#### Screenshots {: #screenshots }

Next is a collection of screenshots that show you how the page looked as it loaded.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/xpsXdrm5FAT5VphFQf42.png", alt="Screenshots of how the page looked while loading.", width="800", height="889" %}

#### Opportunities {: #opportunities }

Next is the **Opportunities** section that provides specific tips on how to improve this particular page's load
performance.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/UDstrdYONbJ7bGMiWPOl.png", alt="The Opportunities section.", width="800", height="800" %}

Click an opportunity to learn more about it.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/QgCxFrXCcAFaPtUNcobY.png", alt="More information about the text compression opportunity.", width="800", height="833" %}

Click **Learn more...** to see documentation about why an opportunity is important, and specific
recommendations on how to fix it.

#### Diagnostics {: #diagnostics }

The **Diagnostics** section provides more information about factors that contribute to the page's
load time.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/YrQNNIO2VcL2CA484gJW.png", alt="The Diagnostics section.", width="800", height="677" %}

#### Passed audits {: #passed-audits }

The **Passed audits** section shows you what the site is doing correctly. Click to expand the
section.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/E0r6FOmGToQqo1JCHVEt.png", alt="The Passed audits section.", width="800", height="685" %}

## Step 2: Experiment {: #experiment }

The **Opportunities** section of your Lighthouse report gives you tips on how to improve the page's
performance. In this section, you implement the recommended changes to the codebase, auditing the
site after each change to measure how it affects site speed.

### Enable text compression {: #compression }

Your report says that enabling text compression is one of the top opportunities for improving the
page's performance.

Text compression is when you reduce, or compress, the size of a text file before sending it over the
network. Kind of like how you might zip a folder before emailing it to reduce its size.

Before you enable compression, here are a couple of ways you can manually check whether text
resources are compressed.

Open the **Network** panel and check {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/9gzXiTYY0nZzBxGI6KrV.svg", alt="Settings.", width="24", height="24" %} **Settings** > {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/hmp8j3HiLMCcqPArD9yt.svg", alt="Checkbox.", width="22", height="22" %} [**Use large request rows**](/docs/devtools/network/reference/#uncompressed).

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/nNsmXoPqFVHDLiB0ubNJ.png", alt="The Size column in the Network panel showing large request rows.", width="800", height="669" %}

{% Aside 'important' %}
If you don't see the **Size** column in the table of network requests, right-click the table header and select **Size**.
{% endAside %}

Each **Size** cell shows two values. The top value is the size of the downloaded resource. The
bottom value is the size of the uncompressed resource. If the two values are the same, then the
resource is not being compressed when it's sent over the network. In this example, the
top and bottom values for `bundle.js` are both `1.4 MB`.

You can also check for compression by inspecting a resource's HTTP headers:

1.  Click **bundle.js** and open the **Headers** tab.

    {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/PxVuojBXc56hcnIurfMf.png", alt="The Headers tab.", width="800", height="624" %}

1.  Search the **Response Headers** section for a `content-encoding` header. You shouldn't see one,
    meaning that `bundle.js` was not compressed. When a resource _is_ compressed, this header is
    usually set to `gzip`, `deflate`, or `br`. See [Directives][5] for an explanation of these
    values.

Enough with the explanations. Time to make some changes! Enable text compression by adding a couple
of lines of code:

1. In the editor tab, open **server.js** and add the following two (highlighted) lines:

   ```js/2-4
   ...
   const fs = require('fs');
   const compression = require('compression'); 

   app.use(compression());
   app.use(express.static('build'));
   ...
   ```
1. Make sure to put `app.use(compression())` before `app.use(express.static('build'))`.

   {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/lMHWtiX9c0isp9Ycy5gd.png", alt="Editing server.js.", width="800", height="498" %}

   {% Aside %}
   **Note**: Usually, you'd have to install the `compression` package via something like `npm i -S compression`, but this has already been done for you.
   {% endAside %}

3.  Wait for Glitch to deploy the new build of the site. A happy emoji in the bottom left corner indicates a successful deployment.

Use the workflows that you learned earlier to manually check that the compression is working:

1. Go back to the demo tab and reload the page.

   The **Size** column should now show two different values for text resources like `bundle.js`. The top value of `269 KB` for `bundle.js` is the size of the file that was sent over the network, and the bottom value of `1.4 MB` is the uncompressed file size.

   {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/feaqTS50BT1JlFSXLFLr.png", alt="The Size column now shows two different values for text resources.", width="800", height="572" %}

1. The **Response Headers** section for `bundle.js` should now include a `content-encoding: gzip` header.

   {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/XA7T3Nq1GGlctovKWDJ4.png", alt="The Response Headers section now contains a content-encoding header.", width="800", height="641" %}

Run the Lighthouse report on the page again to measure the impact the text compression has on the page's load
performance:

1. Open the **Lighthouse** panel and click {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/YihNsXarRhDgEi9rOT4H.svg", alt="Add.", width="24", height="24" %} **Perform an audit...** on the action bar at the top.

   {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/gHLiRXOQu16Z7C2Shekj.png", alt="The Perform an audit button.", width="800", height="612" %}

1. Leave the settings the same as before and click **Analyze page load**.

   {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/q3QUuwMcVKxgtoVKXobK.png", alt="A Lighthouse report after enabling text compression.", width="800", height="609" %}

Woohoo! That looks like progress. Your overall performance score should have increased, meaning that the site is getting faster.

#### Text compression in the real world {: #real-world-compression }

Most servers really do have simple fixes like this for enabling compression! Just do a search on how
to configure whatever server you use to compress text.

### Resize images {: #images }

Your new report says that properly sizing images is another big opportunity.

Resizing images helps speed up load time by reducing the file size of images. If your user is
viewing your images on a mobile device screen that's 500-pixels-wide, there's really no point in
sending a 1500-pixel-wide image. Ideally, you'd send a 500-pixel-wide image, at most.

1. In your report, click **Properly size images** to see what images should be resized. It looks like all 4 images are bigger than necessary.

   {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/BfnbGrzVWejznp4fx1pz.png", alt="Details about the 'properly size images' opportunity", width="800", height="578" %}

1. Back in the editor tab, open `src/model.js`.
1. Replace `const dir = 'big'` with `const dir = 'small'`. This directory contains copies of the same images which have been resized.
1. Audit the page again to see how this change affects load performance.

   {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/IEOT5AR8E802u94FzSqx.png", alt="A Lighthouse report after resizing images.", width="800", height="606" %}

Looks like the change only has a minor affect on the overall performance score. However, one thing
that the score doesn't show clearly is how much network data you're saving your users. The total
size of the old photos was around 6.1 MB, whereas now it's only about 633 kB.
You can check this on the status bar at the bottom of the **Network** panel.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/tHb1AzPxKPHqpK5Ta5G9.png", alt="Amount of data transferred before and after resizing images.", width="800", height="504" %}

#### Resizing images in the real world {: #real-world-resizing }

For a small app, doing a one-off resize like this may be good enough. But for a large app, this
obviously isn't scalable. Here are some strategies for managing images in large apps:

- Resize images during your build process.
- Create multiple sizes of each image during the build process and then use `srcset` in your code.
  At runtime, the browser takes care of choosing what size is best for the device it's running on.
  See [Relative-sized images][6].
- Use an image CDN that lets you dynamically resize an image when you request it.
- At the very least, optimize each image. This can often create huge savings. Optimization is when
  you run an image through a special program that reduces the size of the image file. See [Essential
  Image Optimization][7] for more tips.

### Eliminate render-blocking resources {: #render }

Your latest report says that eliminating render-blocking resources is now the biggest opportunity.

A render-blocking resource is an external JavaScript or CSS file that the browser must download,
parse, and execute before it can show the page. The goal is to only run the core CSS and JavaScript
code that is required to display the page properly.

The first task, then, is to find code that doesn't need to be executed on page load.

1.  Click **Eliminate render-blocking resources** to see the resources that are blocking:
    `lodash.js` and `jquery.js`.

    {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/qIwOLr4ToqMYvDC9Gz5C.png", alt="More information about the 'reduce render-blocking resources' opportunity.", width="800", height="729" %}

1.  Depending on your operating system, press the following to [open the Command Menu](/docs/devtools/command-menu/#ope):

    - On Mac, <kbd>Command</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd>
    - On Windows, Linux, or ChromeOS, <kbd>Control</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd>

1.  Start typing `Coverage` and select **Show Coverage**.

    {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/weuz6NdR0mufsgCMf0E6.png", alt="Opening the Command Menu from the Lighthouse panel.", width="800", height="508" %}

    [The **Coverage** tab](/docs/devtools/coverage/) opens in the **Drawer**.

    {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/Pjwv19SbL16QGDoDdQ97.png", alt="The Coverage tab.", width="800", height="654" %}

1.  Click {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/sX65QEDYhwBFHCM24BtV.svg", alt="Reload.", width="22", height="22" %} **Reload**. The **Coverage** tab provides an overview of how much of the code in `bundle.js`, `jquery.js`, and `lodash.js` is being executed while the page loads.

    {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/wBN9y0nBe5zulsFT7uTx.png", alt="The Coverage report.", width="800", height="611" %}

    This screenshot says that about 74% and 30% of the jQuery and Lodash files aren't used, respectively.

1.  Click the **jquery.js** row. DevTools opens the file in the **Sources** panel. A line of code was
    executed if it has a green bar next to it. A red bar next to a line of code means it was not executed, and is
    definitely not needed on page load.

    {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/EzmNiqgdBYxLSS0F6APM.png", alt="Viewing the jQuery file in the Sources panel.", width="800", height="660" %}

1.  Scroll through the jQuery code a bit. Some of the lines that get "executed" are actually just
    comments. Running this code through a minifier that strips comments is another way to reduce the
    size of this file.

In short, when you're working with your own code, the **Coverage** tab can help you analyze your code,
line-by-line, and only ship the code that's needed for page load.

Are the `jquery.js` and `lodash.js` files even needed to load the page? The **Request Blocking** tab can
show you what happens when resources aren't available.

1.  Click the **Network** tab and [open the **Command Menu** again](/docs/devtools/command-menu/#open).
1.  Start typing `blocking` and then select **Show Request Blocking**. The **Request Blocking** tab opens.

    {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/kYQ5X5AMm8bRBcqr4ylT.png", alt="The Request Blocking tab.", width="800", height="585" %}

1.  Click {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/YihNsXarRhDgEi9rOT4H.svg", alt="Add.", width="24", height="24" %} **Add Pattern**, type `/libs/*` in the textbox, and press <kbd>Enter</kbd> to confirm.

    {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/S7L1CsLkI7DAg7X24YtD.png", alt="Adding a pattern to block any request to the 'libs' directory.", width="800", height="556" %}

1.  Reload the page. The jQuery and Lodash requests are red, meaning that they were blocked. The
    page still loads and is interactive, so it looks like these resources aren't needed whatsoever!

    {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/B7IpHXkLQdInfffZ2FcO.png", alt="The Network panel shows that the requests have been blocked.", width="800", height="556" %}

1.  Click {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/Nh5W7S7oEdlTcjarzxKC.svg", alt="Remove.", width="22", height="22" %} **Remove all patterns** to delete the `/libs/*` blocking pattern.

In general, the **Request Blocking** tab is useful for simulating how your page behaves when any given
resource isn't available.

Now, remove the references to these files from the code and audit the page again:

1.  Back in the editor tab, open `template.html`.
2.  Delete the corresponding `<script>` tags:

    ```js//3-4
    <head>
        ...
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <script src="/libs/lodash.js"></script>
        <script src="/libs/jquery.js"></script>
        <title>Tony's Favorite Foods</title>
    </head>
    ```

3.  Wait for the site to re-build and re-deploy.
4.  Audit the page again from the **Lighthouse** panel. Your overall score should have improved again.

    {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/PPWlXU4Wml8zFwVjdfsU.png", alt="A Lighthouse report after removing the render-blocking resources.", width="800", height="614" %}

#### Optimizing the Critical Rendering Path in the real-world {: #crp }

The [Critical Rendering Path][8] refers to the code that you need to load a page. In general, you
can speed up page load by only shipping critical code during the page load, and then lazy-loading
everything else.

- It's unlikely that you'll find scripts that you can remove outright, but you will often find that
  many scripts don't need to be requested during the page load, and can instead be requested
  asynchronously. See [Using async or defer][9].
- If you're using a framework, check if it has a production mode. This mode may use a feature such
  as [tree shaking][10] in order to eliminate unnecessary code that is blocking the critical render.

### Do less main thread work {: #main }

Your latest report shows some minor potential savings in the **Opportunities** section, but if you scroll
down to the **Diagnostics** section, it looks like the biggest bottleneck is too much main thread
activity.

The main thread is where the browser does most of the work needed to display a page, such as parsing
and executing HTML, CSS, and JavaScript.

{% Aside %}
**Note:** This section provides a rather brief introduction to the Performance panel. See
[Performance features reference][12] to learn more about how you can use it to analyze page
performance.
{% endAside %}

The goal is to use the **Performance** panel to analyze what work the main thread is doing while the
page loads, and find ways to defer or remove unnecessary work.

1. Open **Performance** > {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/9gzXiTYY0nZzBxGI6KrV.svg", alt="Settings.", width="24", height="24" %} **Capture Settings** and set **Network** to **Slow 3G** and **CPU** to **6x slowdown**.

   {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/0yh9DC4HsvPFKYcjNSWi.png", alt="Settings CPU and network throttling in the Performance panel", width="800", height="416" %}

   Mobile devices typically have more hardware constraints than laptops or desktops, so these settings let you experience the page load as if you were using a less powerful device.
1. Click {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/sX65QEDYhwBFHCM24BtV.svg", alt="Reload.", width="22", height="22" %} **Reload**.
   DevTools reloads the page and then produces a visualization of all it had to do in order to load the page. This visualization will be referred to as the _trace_.

   {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/oSnPlb5GpIZIY1jjr1aa.png", alt="The Performance panel's trace of the page load.", width="800", height="577" %}

The trace shows activity chronologically, from left to right. The FPS, CPU, and NET charts at the
top give you an overview of frames per second, CPU activity, and network activity.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/xfGEi6BAKBqnqdHUVnOX.png", alt="The Overview section of the trace.", width="800", height="443" %}

The wall of yellow that you see in the **Overview** section means that the CPU was completely busy with scripting activity.
This is a clue that you may be able to speed up page load by doing less JavaScript work.

Investigate the trace to find ways to do less JavaScript work:

1.  Click the **Timings** section to expand it.

    {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/egPNqylDWyGLRKhqHGh9.png", alt="The Timings section.", width="800", height="500" %}

    There is a bunch of [User Timing][11] measures from React, it seems like Tony's app is using the development mode of React. Switching to the production mode of React will probably yield some easy performance wins.

1.  Click **Timings** again to collapse that section.
1.  Browse the **Main** section. This section shows a chronological log of main thread activity,
    from left to right. The y-axis (top to bottom) shows why events occurred.

    {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/DbX2VPBm6wLZ0G4l2K6L.png", alt="The Main section.", width="800", height="500" %}

    In this example, the `Evaluate Script` event caused the `(anonymous)` function to execute, which caused `__webpack__require__` to execute, which caused `./src/index.jsx` to execute, and so on.

1.  Scroll down to the bottom of the **Main** section. When you use a framework, most of the upper
    activity is caused by the framework, which is usually out of your control. The activity caused
    by your app is usually at the bottom.

    {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/yfrefJPKh6TljAaO8iXl.png", alt="The mineBitcoin activity.", width="800", height="443" %}

    In this app, it seems like a function called `App` is causing a lot of calls to a `mineBitcoin` function. It sounds like Tony might be using the devices of his fans to mine cryptocurrency...

    {% Aside %}
    **Note:** Although the calls that your framework makes are usually out of your control,
    sometimes you may structure your app in a way that causes the framework to run inefficiently.
    Restructuring your app to use the framework efficiently can be a way to do less main thread
    work. However, this requires a deep understanding of how your framework works, and what kind of
    changes you can make in your own code in order to use the framework more efficiently.
    {% endAside %}

1.  Open the **Bottom-Up** tab at the bottom. This tab breaks down what activities took up the most time. If you don't see anything in the **Bottom-Up** section, click the label for **Main** section.

    {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/RsybUenV27IbQfzwsezE.png", alt="The Bottom-Up tab.", width="800", height="594" %}

    The **Bottom-Up** section only shows information for whatever activity, or group of activity, you have
    currently selected. For example, if you clicked on one of the `mineBitcoin` activities, the
    **Bottom-Up** section is only going to show information for that one activity.

    The **Self Time** column shows you how much time was spent directly in each activity. In this case, about 82% of main thread time was spent on the `mineBitcoin` function.

Time to see whether using production mode and reducing JavaScript activity will speed up the page
load. Start with production mode:

1.  In the editor tab, open `webpack.config.js`.
2.  Change `"mode":"development"` to `"mode":"production"`.
3.  Wait for the new build to deploy.
4.  Audit the page again.

    {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/ChupOjK8HHF9i9PFFrUX.png", alt="A Lighthouse report after configuring webpack to use production mode.", width="800", height="640" %}

Reduce JavaScript activity by removing the call to `mineBitcoin`:

1.  In the editor tab, open `src/App.jsx`.
2.  Comment out the call to `this.mineBitcoin(1500)` in the `constructor`.
3.  Wait for the new build to deploy.
4.  Audit the page again.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/Ug3mIDzuacvZwGSt6StX.png", alt="A Lighthouse report after removing unnecessary JavaScript work.", width="800", height="692" %}

As always, there still are things to do, for example, reduce the [Largest Contentful Paint](/docs/lighthouse/performance/lighthouse-largest-contentful-paint/) and [Cumulative Layout Shift](https://web.dev/cls/) metrics.

{% Aside 'success' %}
But it looks like the last change caused a massive jump in performance!
{% endAside %}

#### Doing less main thread work in the real world {: #real-world-main-thread }

In general, the **Performance** panel is the most common way to understand what activity your site does
as it loads, and find ways to remove unnecessary activity.

If you'd prefer an approach that feels more like `console.log()`, the [User Timing][13] API lets you
arbitrarily mark up certain phases of your app lifecycle, in order to track how long each of those
phases takes.

## Summary {: #summary }

- Whenever you set out to optimize a site's load performance, always start with an audit. The audit
  establishes a baseline, and gives you tips on how to improve.
- Make one change at a time, and audit the page after each change in order to see how that isolated
  change affects performance.

## Next steps {: #next-steps }

Run audits on your own site! If you need help interpreting your report or finding ways to improve your load performance, check out all the ways to get help from the DevTools community:

- File bugs on this doc in the [developer.chrome.com][16] repository.
- File bug reports on DevTools at [Chromium Bugs][17].
- Discuss features and changes on the [Mailing List][18]. Please don't use the mailing list for
  support questions. Use Stack Overflow, instead.
- Get general help on how to use DevTools on [Stack Overflow][19]. Please don't file bugs on Stack
  Overflow. Use Chromium Bugs, instead.
- Tweet us at [@ChromeDevTools][20].

[1]: https://www.coursera.org/learn/web-development#syllabus
[2]: https://glitch.com/edit/#!/remix/tony
[3]: /docs/lighthouse/overview/
[4]: https://support.google.com/chrome/answer/95464
[5]: https://developer.mozilla.org/docs/Web/HTTP/Headers/Content-Encoding#Directives
[6]: https://developers.google.com/web/fundamentals/design-and-ux/responsive/images#relative_sized_images
[7]: https://images.guide/
[8]: https://developers.google.com/web/fundamentals/performance/critical-rendering-path
[9]:
  https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/loading-third-party-javascript#use_async_or_defer
[10]: https://webpack.js.org/guides/tree-shaking/
[11]: https://developer.mozilla.org/docs/Web/API/User_Timing_API
[12]: /docs/devtools/evaluate-performance/reference
[13]: https://developer.mozilla.org/docs/Web/API/User_Timing_API
[16]: https://github.com/GoogleChrome/developer.chrome.com/issues/new/choose
[17]: https://crbug.com
[18]: https://groups.google.com/forum/#!forum/google-chrome-developer-tools
[19]: https://stackoverflow.com/questions/tagged/google-chrome-devtools
[20]: https://twitter.com/chromedevtools
