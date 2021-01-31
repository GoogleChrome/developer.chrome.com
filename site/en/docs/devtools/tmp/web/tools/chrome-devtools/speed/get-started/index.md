---
layout: "layouts/doc-post.njk"
title: "Optimize Website Speed With Chrome DevTools"
authors:
  - kaycebasques
date: 2018-06-18
updated: 2020-07-10
description: "Learn how to use Chrome DevTools to find ways to make your websites load faster."
---

## Goal of tutorial {: #goal_of_tutorial }

This tutorial teaches you how to use Chrome DevTools to find ways to make your websites load faster.

Read on, or watch the video version of this tutorial:

{% youtube id="5fLW5Q5ODiE" %}

## Prerequisites {: #prerequisites }

- You should have basic web development experience, similar to what's taught in this [Introduction
  to Web Development class][1].
- You don't need to know anything about load performance. You'll learn about it in this tutorial!

## Introduction {: #intro }

This is Tony. Tony is very famous in cat society. He has built a website so that his fans can learn
what his favorite foods are. His fans love the site, but Tony keeps hearing complaints that the site
loads slowly. Tony has asked you to help him speed the site up.

![Tony the cat.](/web/tools/chrome-devtools/speed/imgs/tony.jpg)

**Figure 1**. Tony the cat

## Step 1: Audit the site {: #audit }

Whenever you set out to improve a site's load performance, **always start with an audit**. The audit
has 2 important functions:

- It creates a **baseline** for you to measure subsequent changes against.
- It gives you **actionable tips** on what changes will have the most impact.

### Set up {: #setup }

But first, you need to set up the site so that you can make changes to it later:

1.  Go to `chrome://version` to check what version of Chrome you're using. This tutorial was made
    with Chrome 68. If you're using an earlier or later version, some features may look different or
    not be available. You should be able to complete the tutorial still, just keep in mind that your
    UI may look different than the screenshots.
2.  [Open the source code for the site][2]. This tab will be referred to as the _editor tab_.

    ![The editor tab.](/web/tools/chrome-devtools/speed/imgs/editor.png)

    **Figure 2**. The editor tab

3.  Click **tony**. A menu appears.

    ![The menu that appears after clicking 'tony'.](/web/tools/chrome-devtools/speed/imgs/menu.png)

    **Figure 3**. The menu that appears after clicking **tony**

4.  Click **Remix This**. The name of the project changes from **tony** to some randomly-generated
    name. You now have your own editable copy of the code. Later on, you'll make changes to this
    code.
5.  Click **Show Live**. The demo opens in a new tab. This tab will be referred to as the _demo
    tab_. It may take a while for the site to load.

    ![The demo tab.](/web/tools/chrome-devtools/speed/imgs/demo.png)

    **Figure 4**. The demo tab

6.  Press Command+Option+J (Mac) Control+Shift+J (Windows, Linux, Chrome OS). Chrome DevTools opens
    up alongside the demo.

    ![DevTools and the demo.](/web/tools/chrome-devtools/speed/imgs/devtools.png)

    **Figure 5**. DevTools and the demo

For the rest of the screenshots in this tutorial, DevTools will be shown as a separate window. You
can do this by pressing Command+Shift+P (Mac) or Control+Shift+P (Windows, Linux, Chrome OS) to open
the Command Menu, typing `Undock`, and then selecting **Undock into separate window**.

![Undocked DevTools.](/web/tools/chrome-devtools/speed/imgs/undocked.png)

**Figure 6**. Undocked DevTools

### Establish a baseline {: #baseline }

The baseline is a record of how the site performed before you made any performance improvements.

1.  Click the **Audits** tab. It may be hidden behind the **More Panels**
    ![More Panels](/web/tools/chrome-devtools/speed/imgs/more-panels.png) button. There's a
    Lighthouse on this panel because the project that powers the Audits panel is called
    [Lighthouse][3].

    ![The Audits panel.](/web/tools/chrome-devtools/speed/imgs/audits.png)

    **Figure 7**. The Audits panel

2.  Match your audit configuration settings to those in **Figure 7**. Here's an explanation of the
    different options:

    - **Device**. Setting to **Mobile** changes the user agent string and simulates a mobile
      viewport. Setting to **Desktop** pretty much just disables the **Mobile** changes.
    - **Audits**. Disabling a category prevents the Audits panel from running those audits, and
      excludes those audits from your report. You can leave the other categories enabled, if you
      want to see the types of recommendations they provide. Disabling categories slightly speeds up
      the auditing process.
    - **Throttling**. Setting to **Simulated Fast 3G, 4x CPU Slowdown** simulates the typical
      conditions of browsing on a mobile device. It's called "simulated" because the Audits panel
      doesn't actually throttle during the auditing process. Instead, it just extrapolates how long
      the page would take to load under mobile conditions. The **Applied...** setting, on the other
      hand, actually throttles your CPU and network, with the tradeoff of a longer auditing process.
    - **Clear Storage**. Enabling this checkbox clears all storage associated with the page before
      every audit. Leave this setting on if you want to audit how first-time visitors experience
      your site. Disable this setting when you want the repeat-visit experience.

3.  Click **Run Audits**. After 10 to 30 seconds, the Audits panel shows you a report of the site's
    performance.

    ![An Audits panel report of the site's performance.](/web/tools/chrome-devtools/speed/imgs/report.png)

    **Figure 8**. The Audits panel's report of the site's performance

#### Handling report errors {: #errors }

If you ever get an error in your Audits panel report, try running the demo tab from an [incognito
window][4] with no other tabs open. This ensures that you're running Chrome from a clean state.
Chrome Extensions in particular often interfere with the auditing process.

![A report that errored.](/web/tools/chrome-devtools/speed/imgs/error.png)

**Figure 9**. A report that errored

### Understand your report {: #report }

The number at the top of your report is the overall performance score for the site. Later, as you
make changes to the code, you should see this number rise. A higher score means better performance.

![The overall performance score.](/web/tools/chrome-devtools/speed/imgs/overall.png)

**Figure 10**. The overall performance score

The **Metrics** section provides quantitative measurements of the site's performance. Each metric
provides insight into a different aspect of the performance. For example, **First Contentful Paint**
tells you when content is first painted to the screen, which is an important milestone in the user's
perception of the page load, whereas **Time To Interactive** marks the point at which the page
appears ready enough to handle user interactions.

![The Metrics section.](/web/tools/chrome-devtools/speed/imgs/metrics.png)

**Figure 11**. The Metrics section

Hover over a metric to see a description of it, and click **Learn More** to read documentation about
it.

![Hovering over the First Meaningful Paint metric.](/web/tools/chrome-devtools/speed/imgs/fmp.png)

**Figure 12**. Hovering over the First Meaningful Paint metric

Below Metrics is a collection of screenshots that show you how the page looked as it loaded.

![Screenshots of how the page looked while loading.](/web/tools/chrome-devtools/speed/imgs/screenshots.png)

**Figure 13**. Screenshots of how the page looked while loading

The **Opportunities** section provides specific tips on how to improve this particular page's load
performance.

![The Opportunities section.](/web/tools/chrome-devtools/speed/imgs/opportunities.png)

**Figure 14**. The Opportunities section

Click an opportunity to learn more about it.

![More information about the text compression opportunity.](/web/tools/chrome-devtools/speed/imgs/compression.png)

**Figure 15**. More information about the text compression opportunity

Click **Learn More** to see documentation about why an opportunity is important, and specific
recommendations on how to fix it.

![Documentation for the text compression opportunity.](/web/tools/chrome-devtools/speed/imgs/reference.png)

**Figure 16**. Documentation for the text compression opportunity

The **Diagnostics** section provides more information about factors that contribute to the page's
load time.

![The Diagnostics section](/web/tools/chrome-devtools/speed/imgs/diagnostics.png)

**Figure 17**. The Diagnostics section

The **Passed Audits** section shows you what the site is doing correctly. Click to expand the
section.

![The Passed Audits section.](/web/tools/chrome-devtools/speed/imgs/passed.png)

**Figure 18**. The Passed Audits section

## Step 2: Experiment {: #experiment }

The Opportunities section of your audit report gives you tips on how to improve the page's
performance. In this section, you implement the recommended changes to the codebase, auditing the
site after each change to measure how it affects site speed.

### Enable text compression {: #compression }

Your report says that enabling text compression is one of the top opportunities for improving the
page's performance.

Text compression is when you reduce, or compress, the size of a text file before sending it over the
network. Kind of like how you might zip a folder before emailing it to reduce its size.

Before you enable compression, here are a couple of ways you can manually check whether text
resources are compressed.

1.  Click the **Network** tab.

    ![The Network panel.](/web/tools/chrome-devtools/speed/imgs/network.png)

    **Figure 19**. The Network panel

2.  Click **Use Large Request Rows**
    ![Use Large Request Rows](/web/tools/chrome-devtools/network-performance/imgs/large-resource-rows-button.png).
    The height of the rows in the table of network requests increases.

    ![Large rows in the network requests table.](/web/tools/chrome-devtools/speed/imgs/largerows.png)

    **Figure 20**. Large rows in the network requests table

3.  If you don't see the **Size** column in the table of network requests, click the table header
    and then select **Size**.

Each **Size** cell shows two values. The top value is the size of the downloaded resource. The
bottom value is the size of the uncompressed resource. If the two values are the same, then the
resource is not being compressed when it's sent over the network. For example, in **Figure 20** the
top and bottom values for `bundle.js` are both `1.4 MB`.

You can also check for compression by inspecting a resource's HTTP headers:

1.  Click **bundle.js**.
2.  Click the **Headers** tab.

    ![The Headers tab.](/web/tools/chrome-devtools/speed/imgs/headers.png)

    **Figure 21**. The Headers tab

3.  Search the **Response Headers** section for a `content-encoding` header. You shouldn't see one,
    meaning that `bundle.js` was not compressed. When a resource _is_ compressed, this header is
    usually set to `gzip`, `deflate`, or `br`. See [Directives][5] for an explanation of these
    values.

Enough with the explanations. Time to make some changes! Enable text compression by adding a couple
of lines of code:

1.  In the editor tab, click **server.js**.

    ![Editing server.js.](/web/tools/chrome-devtools/speed/imgs/server.png)

    **Figure 22**. Editing `server.js`

2.  Add the following code to **server.js**. Make sure to put `app.use(compression())` before
    `app.use(express.static('build'))`.

    ... const fs = require('fs'); const compression = require('compression');
    app.use(compression()); app.use(express.static('build')); ...

    !!!.aside.aside--note

    **Note**: Usually, you'd have to install the `compression` package via something like
    `npm i -S compression`, but this has already been done for you.

    !!!

3.  Wait for Glitch to deploy the new build of the site. The fancy animation that you see next to
    **Logs** and **Show** means that the site is getting rebuilt and redeployed. The change is ready
    when you see **Show Live** again.

    ![The animation that indicates that the site is getting built.](/web/tools/chrome-devtools/speed/imgs/building.png)

    **Figure 23**. The animation that indicates that the site is getting built

Use the workflows that you learned earlier to manually check that the compression is working:

1.  Go back to the demo tab and reload the page. The **Size** column should now show 2 different
    values for text resources like `bundle.js`. In **Figure 24** the top value of `261 KB` for
    `bundle.js` is the size of the file that was sent over the network, and the bottom value of
    `1.4 MB` is the uncompressed file size.

    ![The Size column now shows 2 different values for text resources.](/web/tools/chrome-devtools/speed/imgs/requests.png)

    **Figure 24**. The Size column now shows 2 different values for text resources

2.  The **Response Headers** section for `bundle.js` should now include a `content-encoding: gzip`
    header.

    ![The Response Headers section now contains a content-encoding header.](/web/tools/chrome-devtools/speed/imgs/gzip.png)

    **Figure 25**. The Response Headers section now contains a `content-encoding` header

Audit the page again to measure what kind of impact text compression has on the page's load
performance:

1.  Click the **Audits** tab.
2.  Click **Perform an audit**
    ![Perform an audit](/web/tools/chrome-devtools/speed/imgs/perform.png).
3.  Leave the settings the same as before.
4.  Click **Run audit**.

    ![An Audits report after enabling text compression.](/web/tools/chrome-devtools/speed/imgs/report2.png)

    **Figure 26**. An Audits report after enabling text compression

Woohoo! That looks like progress. Your overall performance score should have increased, meaning that
the site is getting faster.

#### Text compression in the real world {: #real-world-compression }

Most servers really do have simple fixes like this for enabling compression! Just do a search on how
to configure whatever server you use to compress text.

### Resize images {: #images }

Your new report says that properly sizing images is another big opportunity.

Resizing images helps speed up load time by reducing the file size of images. If your user is
viewing your images on a mobile device screen that's 500-pixels-wide, there's really no point in
sending a 1500-pixel-wide image. Ideally, you'd send a 500-pixel-wided image, at most.

1.  In your report, click **Properly size images** to see what images should be resized. It looks
    like all 4 images are bigger than necessary.

    ![Details about the 'properly size images' opportunity.](/web/tools/chrome-devtools/speed/imgs/resize.png)

    **Figure 27**. Details about the _Properly size images_ opportunity

2.  Back in the editor tab, open `src/model.js`.
3.  Replace `const dir = 'big'` with `const dir = 'small'`. This directory contains copies of the
    same images which have been resized.
4.  Audit the page again to see how this change affects load performance.

    ![An Audits report after resizing images.](/web/tools/chrome-devtools/speed/imgs/report3.png)

    **Figure 28**. An Audits report after resizing images

Looks like the change only has a minor affect on the overall performance score. However, one thing
that the score doesn't show clearly is how much network data you're saving your users. The total
size of the old photos was around 5.3 megabytes, whereas now it's only about 0.18 megabytes.

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

    ![More information about the 'reduce render-blocking resources' opportunity.](/web/tools/chrome-devtools/speed/imgs/render.png)

    **Figure 29**. More information about the _Reduce render-blocking resources_ opportunity

2.  Press Command+Shift+P (Mac) or Control+Shift+P (Windows, Linux, Chrome OS) to open the Command
    Menu, start typing `Coverage`, and then select **Show Coverage**.

    ![Opening the Command Menu from the Audits panel.](/web/tools/chrome-devtools/speed/imgs/commandmenu.png)

    **Figure 30**. Opening the Command Menu from the Audits panel

    ![The Coverage tab.](/web/tools/chrome-devtools/speed/imgs/coverage.png)

    **Figure 31**. The Coverage tab

3.  Click **Reload** ![Reload](/web/tools/chrome-devtools/speed/imgs/reload.png). The Coverage tab
    provides an overview of how much of the code in `bundle.js`, `jquery.js`, and `lodash.js` is
    being executed while the page loads. **Figure 32** says that about 76% and 30% of the jQuery and
    Lodash files aren't used, respectively.

    ![The Coverage report.](/web/tools/chrome-devtools/speed/imgs/coveragereport.png)

    **Figure 32**. The Coverage report

4.  Click the **jquery.js** row. DevTools opens the file in the Sources panel. A line of code was
    executed if it has a green bar next to it. A red bar means it was not executed, and is
    definitely not needed on page load.

    ![Viewing the jQuery file in the Sources panel.](/web/tools/chrome-devtools/speed/imgs/jquery.png)

    **Figure 33**. Viewing the jQuery file in the Sources panel

5.  Scroll through the jQuery code a bit. Some of the lines that get "executed" are actually just
    comments. Running this code through a minifier that strips comments is another way to reduce the
    size of this file.

In short, when you're working with your own code, the Coverage tab can help you analyze your code,
line-by-line, and only ship the code that's needed for page load.

Are the `jquery.js` and `lodash.js` files even needed to load the page? The Request Blocking tab can
show you what happens when resources aren't available.

1.  Click the **Network** tab.
2.  Press Command+Shift+P (Mac) or Control+Shift+P (Windows, Linux, Chrome OS) to open the Command
    Menu again.
3.  Start typing `blocking` and then select **Show Request Blocking**.

    ![The Request Blocking tab.](/web/tools/chrome-devtools/speed/imgs/blocking.png)

    **Figure 34**. The Request Blocking tab

4.  Click **Add Pattern** ![Add Pattern](/web/tools/chrome-devtools/speed/imgs/addpattern.png), type
    `/libs/*`, and then press Enter to confirm.

    ![Adding a pattern to block any request to the 'libs' directory.](/web/tools/chrome-devtools/speed/imgs/libs.png)

    **Figure 35**. Adding a pattern to block any request to the `libs` directory

5.  Reload the page. The jQuery and Lodash requests are red, meaning that they were blocked. The
    page still loads and is interactive, so it looks like these resources aren't needed whatsoever!

    ![The Network panel shows that the requests have been blocked.](/web/tools/chrome-devtools/speed/imgs/blockedlibs.png)

    **Figure 36**. The Network panel shows that the requests have been blocked

6.  Click **Remove all patterns**
    ![Remove all patterns](/web/tools/chrome-devtools/speed/imgs/remove.png) to delete the `/libs/*`
    blocking pattern.

In general, the Request Blocking tab is useful for simulating how your page behaves when any given
resource isn't available.

Now, remove the references to these files from the code and audit the page again:

1.  Back in the editor tab, open `template.html`.
2.  Delete `<script src="/libs/lodash.js">` and `<script src="/libs/jquery.js"></script>`.
3.  Wait for the site to re-build and re-deploy.
4.  Audit the page again from the **Audits** panel. Your overall score should have improved again.

    ![An Audits report after removing the render-blocking resources.](/web/tools/chrome-devtools/speed/imgs/report4.png)

    **Figure 37**. An Audits report after removing the render-blocking resources

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

Your latest report shows some minor potential savings in the Opportunities section, but if you look
down in the Diagnostics section, it looks like the biggest bottleneck is too much main thread
activity.

The main thread is where the browser does most of the work needed to display a page, such as parsing
and executing HTML, CSS, and JavaScript.

The goal is to use the Performance panel to analyze what work the main thread is doing while the
page loads, and find ways to defer or remove unnecessary work.

1.  Click the **Performance** tab.
2.  Click **Capture Settings**
    ![Capture Settings](/web/tools/chrome-devtools/speed/imgs/capture.png).
3.  Set **Network** to **Slow 3G** and **CPU** to **6x slowdown**. Mobile devices typically have
    more hardware constraints than laptops or desktops, so these settings let you experience the
    page load as if you were using a less powerful device.
4.  Click **Reload** ![Reload](/web/tools/chrome-devtools/speed/imgs/reload.png). DevTools reloads
    the page and then produces a visualization of all it had to do in order to load the page. This
    visualization will be referred to as the _trace_.

    ![The Performance panel's trace of the page load.](/web/tools/chrome-devtools/speed/imgs/performance.png)

    **Figure 38**. The Performance panel's trace of the page load

The trace shows activity chronologically, from left to right. The FPS, CPU, and NET charts at the
top give you an overview of frames per second, CPU activity, and network activity. The wall of
yellow that you see in **Figure 39** means that the CPU was completely busy with scripting activity.
This is a clue that you may be able to speed up page load by doing less JavaScript work.

![The Overview section of the trace.](/web/tools/chrome-devtools/speed/imgs/overview.png)

**Figure 39**. The Overview section of the trace

Investigate the trace to find ways to do less JavaScript work:

1.  Click the **User Timing** section to expand it. Based on the fact that there seems to be a bunch
    of [User Timing][11] measures from React, it seems like Tony's app is using the development mode
    of React. Switching to the production mode of React will probably yield some easy performance
    wins.

    ![The User Timing section.](/web/tools/chrome-devtools/speed/imgs/usertiming.png)

    **Figure 40**. The User Timing section

2.  Click **User Timing** again to collapse that section.
3.  Browse the **Main** section. This section shows a chronological log of main thread activity,
    from left to right. The y-axis (top to bottom) shows why events occurred. For example, in
    **Figure 41**, the `Evaluate Script` event caused the `(anonymous)` function to execute, which
    caused `../rbd/pnpm-volume/...` to execute, which caused `__webpack__require__` to execute, and
    so on.

    ![The Main section](/web/tools/chrome-devtools/speed/imgs/main.png)

    **Figure 41**. The Main section

4.  Scroll down to the bottom of the **Main** section. When you use a framework, most of the upper
    activity is caused by the framework, which is usually out of your control. The activity caused
    by your app is usually at the bottom. In this app, it seems like a function called `App` is
    causing a lot of calls to a `mineBitcoin` function. It sounds like Tony might be using the
    devices of his fans to mine cryptocurrency...

    ![Hovering over the mineBitcoin activity.](/web/tools/chrome-devtools/speed/imgs/mine.png)

    **Figure 42**. Hovering over the `mineBitcoin` activity

    !!!.aside.aside--note

    **Note:** Although the calls that your framework makes are usually out of your control,
    sometimes you may structure your app in a way that causes the framework to run inefficiently.
    Restructuring your app to use the framework efficiently can be a way to do less main thread
    work. However, this requires a deep understanding of how your framework works, and what kind of
    changes you can make in your own code in order to use the framework more efficiently.

    !!!

5.  Expand the **Bottom-Up** section. This tab breaks down what activities took up the most time. If
    you don't see anything in the Bottom-Up section, click the label for **Main** section. The
    Bottom-Up section only shows information for whatever activity, or group of activity, you have
    currently selected. For example, if you clicked on one of the `mineBitcoin` activities, the
    Bottom-Up section is only going to show information for that one activity.

    ![The Bottom-Up tab.](/web/tools/chrome-devtools/speed/imgs/bottomup.png)

    **Figure 43**. The Bottom-Up tab

The **Self Time** column shows you how much time was spent directly in each activity. For example,
**Figure 43** shows that about 57% of main thread time was spent on the `mineBitcoin` function.

Time to see whether using production mode and reducing JavaScript activity will speed up the page
load. Start with production mode:

1.  In the editor tab, open `webpack.config.js`.
2.  Change `"mode":"development"` to `"mode":"production"`.
3.  Wait for the new build to deploy.
4.  Audit the page again.

    ![An Audits report after configuring webpack to use production mode.](/web/tools/chrome-devtools/speed/imgs/report5.png)

    **Figure 44**. An Audits report after configuring webpack to use production mode

Reduce JavaScript activity by removing the call to `mineBitcoin`:

1.  In the editor tab, open `src/App.jsx`.
2.  Comment out the call to `this.mineBitcoin(1500)` in the `constructor`.
3.  Wait for the new build to deploy.
4.  Audit the page again.

    ![An Audits report after removing unnecessary JavaScript work.](/web/tools/chrome-devtools/speed/imgs/report6.png)

    **Figure 45**. An Audits report after removing unnecessary JavaScript work

Looks like that last change caused a massive jump in performance!

!!!.aside.aside--note

**Note:** This section provided a rather brief introduction to the Performance panel. See
[Performance Analysis Reference][12] to learn more about how you can use it to analyze page
performance.

!!!

#### Doing less main thread work in the real world {: #real-world-main-thread }

In general, the Performance panel is the most common way to understand what activity your site does
as it loads, and find ways to remove unnecessary activity.

If you'd prefer an approach that feels more like `console.log()`, the [User Timing][13] API lets you
arbitrarily mark up certain phases of your app lifecycle, in order to track how long each of those
phases takes.

## A special thank you from Tony {: #thanks }

Tony's fans love how fast the site feels now, and Tony is very thankful for your help. Click
**Receive Gift** below to receive a special gift from Tony.

## Summary {: #summary }

- Whenever you set out to optimize a site's load performance, always start with an audit. The audit
  establishes a baseline, and gives you tips on how to improve.
- Make one change at a time, and audit the page after each change in order to see how that isolated
  change affects performance.

## Next steps {: #next-steps }

- Run audits on your own site! If you need help interpreting your report, or finding ways to improve
  your load performance, check out [Feedback][14] for ways to get help from the DevTools community.
  Stack Overflow, the mailing list, or Twitter are probably best for these types of questions.
- Please leave [feedback][15] on this tutorial. I really do use the data to make better tutorials
  for you.

- File bugs on this doc in the [Web Fundamentals][16] repository.
- File bug reports on DevTools at [Chromium Bugs][17].
- Discuss features and changes on the [Mailing List][18]. Please don't use the mailing list for
  support questions. Use Stack Overflow, instead.
- Get general help on how to use DevTools on [Stack Overflow][19]. Please don't file bugs on Stack
  Overflow. Use Chromium Bugs, instead.
- Tweet us at [@ChromeDevTools][20].

[1]: https://www.coursera.org/learn/web-development#syllabus
[2]: https://glitch.com/edit/#!/tony
[3]: /web/tools/lighthouse
[4]: https://support.google.com/chrome/answer/95464
[5]: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Encoding#Directives
[6]: /web/fundamentals/design-and-ux/responsive/images#relative_sized_images
[7]: https://images.guide/
[8]: /web/fundamentals/performance/critical-rendering-path
[9]:
  /web/fundamentals/performance/optimizing-content-efficiency/loading-third-party-javascript#use_async_or_defer
[10]: https://webpack.js.org/guides/tree-shaking/
[11]: https://developer.mozilla.org/en-US/docs/Web/API/User_Timing_API
[12]: /web/tools/chrome-devtools/evaluate-performance/reference
[13]: https://developer.mozilla.org/en-US/docs/Web/API/User_Timing_API
[14]: #feedback
[15]: #feedback
[16]: https://github.com/google/webfundamentals/issues/new
[17]: https://crbug.com
[18]: https://groups.google.com/forum/#!forum/google-chrome-developer-tools
[19]: https://stackoverflow.com/questions/tagged/google-chrome-devtools
[20]: https://twitter.com/chromedevtools
