---
layout: "layouts/doc-post.njk"
title: "Edit and save files with Workspaces"
authors:
  - kaycebasques
  - sofiayem
date: 2018-04-10
updated: 2022-10-31
description: "Learn how to save changes made within DevTools to disk."
tags:
  - prototype-fixes
  - html
  - css
  - javascript
---

**Goal**: This tutorial provides hands-on practice in setting up and using Workspaces so that you
can use Workspaces in your own projects. Workspaces enable you to save changes that you make within
DevTools to source code that's stored on your computer.

{% Aside "caution" %}

**Prerequisites**: Before beginning this tutorial, you should know how to:

- [Use HTML, CSS, and JavaScript to build a web page][1].
- [Use DevTools to make basic changes to CSS][2].
- [Run a local HTTP web server][3].

{% endAside %}

## Overview {: #overview }

Workspaces enable you to save a change that you make in Devtools to a local copy of the same file on
your computer. For example, suppose:

- You have the source code for your site on your desktop.
- You're running a local web server from the source code directory, so that the site is accessible
  at `localhost:8080`.
- You've got `localhost:8080` open in Google Chrome, and you're using DevTools to change the site's
  CSS.

With Workspaces enabled, the CSS changes that you make within DevTools are saved to the source code
on your desktop.

## Limitations {: #limitations }

If you're using a modern framework, it probably transforms your source code from a format that's
easy for you to maintain into a format that's optimized to run as quickly as possible. Workspaces is
usually able to map the optimized code back to your original source code with the help of [source
maps][4].

The DevTools community works to support the capabilities provided by source maps across a [variety of frameworks and tools](/docs/devtools/javascript/source-maps/#use_a_supported_preprocessor).
If you run into issues while using Workspaces with your framework of choice, or you get it working
after some custom configuration, please [start a thread in the mailing list][5] or [ask a question
on Stack Overflow][6] to share your knowledge with the rest of the DevTools community.

## Related feature: Local Overrides {: #overrides }

[Local overrides][7] is another DevTools feature that is similar to Workspaces. Use local overrides
when you want to experiment with changes to a page, and you need to see those changes across page
loads, but you don't care about mapping your changes to the page's source code.

## Step 1: Setup {: #setup }

Complete this tutorial to get hands-on experience with Workspaces.

### Set up the demo {: #demo }

1.  [Open the demo][8]. In the bottom-left of the editor, click the button labelled **Tools**.
3.  Under **Tools**, select **Import / Export** > **Download Project**.
4.  Close the tab.
5.  Unzip the source code and move the unzipped `app` directory to your desktop. For the rest of
    this tutorial this directory will be referred to as `~/Desktop/app`.
6.  Start a local web server in `~/Desktop/app`. Below is some sample code for starting up
    `SimpleHTTPServer`, but you can use whatever server you prefer.

    ```bash
    cd ~/Desktop/app
    # If your Python version is 3.X
    # On Windows, try "python -m http.server" or "py -3 -m http.server"
    python3 -m http.server
    # If your Python version is 2.X
    python -m SimpleHTTPServer
    ```

7.  Open a tab in Google Chrome and go to locally-hosted version of the site. You should be able to
    access it via a URL like `localhost:8000`. The exact [port number][9] may be different.

    {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/gDXphnuEPJLv62W8MFri.png", alt="The locally-hosted demo page opened in Chrome.", width="800", height="486" %}

### Set up DevTools {: #devtools }

1.  [Open DevTools](/docs/devtools/open/) on the locally-hosted demo page.

2.  Navigate to the **Sources** > **Filesystem** tab and click {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/YihNsXarRhDgEi9rOT4H.svg", alt="Add.", width="22", height="22" %} **Add folder to workspace**.

    {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/74PqTOnc9AsmZ5uc6tlJ.png", alt="The Filesystem tab.", width="800", height="494" %}

5.  Select the `~/Desktop/app` folder you downloaded and unpacked in the previous step.
6.  In the prompt at the top, click **Allow** to give DevTools permission to read and write to the directory.

    {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/P46nSsDzgX5ypexrHf7h.png", alt="The Allow button in the prompt.", width="800", height="420" %}

In the **Filesystem** tab, there is now a green dot next to `index.html`, `script.js`, and `styles.css`. These green dots mean that DevTools has established a mapping between the network resources of the page, and the files in `~/Desktop/app`.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/hIACerOOovvni75V55rt.png", alt="The Filesystem tab now shows a mapping between the local files and the network ones.", width="800", height="420" %}

## Step 2: Save a CSS change to disk {: #css }

1.  Open `~/Desktop/app/styles.css` in a text editor. Notice how the `color` property of `h1`
    elements is set to `fuchsia`.

    {% Img src="image/admin/aYtE6OhxyFc6D6Ur0eXY.png", alt="Viewing styles.css in a text editor.", width="800", height="551" %}

2.  Close the text editor.
3.  Back in DevTools, click the **Elements** tab.
4.  Change the value of the `color` property of the `<h1>` element to your favorite color. To do so:

    1. Click the `<h1>` element in the **DOM Tree**.
    1. In the **Styles** pane, find the `h1 { color: fuchsia }` CSS rule and change the color to your favorite. In this example, the color is set to green.

    {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/0x7L1W3PrlYbpoSB03Xx.png", alt="Setting the color property of the h1 element to green.", width="800", height="500" %}

    The green dot {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/juauf8mjfnBBWVxNsQnV.png", alt="The green dot.", width="22", height="28" %} next to `styles.css:1` in the **Styles** pane means that any change you make is mapped to `~/Desktop/app/styles.css`.

5.  Open `~/Desktop/app/styles.css` in a text editor again. The `color` property is now set to your
    favorite color.
6.  {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/sX65QEDYhwBFHCM24BtV.svg", alt="Reload.", width="22", height="22" %} Reload the page. The color of the `<h1>` element is still set to your favorite color. This works
    because when you made the change, DevTools saved the change to disk. And then, when you reloaded
    the page, your local server served the modified copy of the file from disk.

## Step 3: Save an HTML change to disk {: #html }

### Try changing HTML from the Elements panel {: #elements }

{% Aside "warning" %}

**Warning:** The workflow that you're about to try doesn't work. You're trying it now so that you
don't waste time later trying to figure out why it's not working.

{% endAside %}

1.  Open the **Elements** tab.
2.  Double click the text content of the `h1` element, which says `Workspaces Demo`, and replace it
    with `I ❤️ Cake`.

    {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/CUzulgirliDxvZkOJ8Hb.png", alt="Attempting to change HTML from the DOM Tree of the Elements panel.", width="800", height="500" %}

3.  Open `~/Desktop/app/index.html` in a text editor. The change that you just made isn't there.
4.  {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/sX65QEDYhwBFHCM24BtV.svg", alt="Reload.", width="22", height="22" %} Reload the page. The page reverts to its original title.

#### Optional: Why it doesn't work {: #why }

{% Aside %}

**Note:** This section describes why the workflow from [Try changing HTML from the Elements
panel][10] doesn't work. You can skip this section if you don't care why.

{% endAside %}

- The tree of nodes that you see on the **Elements** panel represents the page's [DOM][11].
- To display a page, a browser fetches HTML over the network, parses the HTML, and then converts it
  into a tree of DOM nodes.
- If the page has any JavaScript, that JavaScript may add, delete, or change DOM nodes. CSS can
  change the DOM, too, via the [`content`][12] property.
- The browser eventually uses the DOM to determine what content it should present to browser users.
- Therefore, the final state of the page that users see may be very different from the HTML that the
  browser fetched.
- This makes it difficult for DevTools to resolve where a change made in the **Elements** panel
  should be saved, because the DOM is affected by HTML, JavaScript, and CSS.

In short, the **DOM Tree** `!==` HTML.

### Change HTML from the Sources panel {: #sources }

If you want to save a change to the page's HTML, do it via the **Sources** panel.

1.  Navigate to **Sources** > **Page**.
3.  Click **(index)**. The HTML for the page opens.
4.  Replace `<h1>Workspaces Demo</h1>` with `<h1>I ❤️ Cake</h1>`.
5.  Press <kbd>Command</kbd>+<kbd>S</kbd> (Mac) or <kbd>Control</kbd>+<kbd>S</kbd> (Windows, Linux, ChromeOS) to save the change.
6.  {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/sX65QEDYhwBFHCM24BtV.svg", alt="Reload.", width="22", height="22" %} Reload the page. The `<h1>` element is still displaying the new text.

    {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/wuvTZyzSgykLYFcuiIjo.png", alt="Changing HTML from the Sources panel.", width="800", height="492" %}

7.  Open `~/Desktop/app/index.html`. The `<h1>` element contains the new text.

## Step 4: Save a JavaScript change to disk {: #js }

The **Sources** panel is also the place to make changes to JavaScript. But sometimes you need to
access other panels, such as the **Elements** panel or the **Console** panel, while making changes
to your site. There's a way to have the **Sources** panel open alongside other panels.

1.  Open the **Elements** tab.
2.  Press <kbd>Command</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd> (Mac) or <kbd>Control</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd> (Windows, Linux, ChromeOS). The **Command Menu**
    opens.
3.  Type `QS`, then select **Show Quick Source**. At the bottom of your DevTools window there is now
    a **Quick Source** tab.

    {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/W7Y2Y4sENDGbMcrBXPIe.png", alt="Opening the Quick Source tab via Command Menu.", width="800", height="462" %}

    The tab is displaying the contents of `index.html`, which is the last
    file you edited in the **Sources** panel. The **Quick Source** tab gives you the editor from the
    **Sources** panel, so that you can edit files while having other panels open.

4.  Press <kbd>Command</kbd>+<kbd>P</kbd> (Mac) or <kbd>Control</kbd>+<kbd>P</kbd> (Windows, Linux, ChromeOS) to open the **Open File** dialog.

5.  Type `script`, then select **app/script.js**.

    {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/6fAqf85los5PkCG8mpKb.png", alt="Opening script.js via the Open File dialog.", width="800", height="561" %}

6.  Notice the `Save Changes To Disk With Workspaces` link in the demo. It's styled regularly.
7.  Add the following code to the bottom of **script.js** via the **Quick Source** tab.

    ```js
    document.querySelector('a').style = 'font-style:italic';
    ```

8.  Press <kbd>Command</kbd>+<kbd>S</kbd> (Mac) or <kbd>Control</kbd>+<kbd>S</kbd> (Windows, Linux, ChromeOS) to save the change.
9.  {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/sX65QEDYhwBFHCM24BtV.svg", alt="Reload.", width="22", height="22" %} Reload the page. The link on the page is now italic.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/gij4b7QfoipdLJI0uMXP.png", alt="The link on the page is now italic.", width="800", height="473" %}

## Next steps {: #next-steps }

{% Aside "success" %}
Congratulations! You now know how to save to sources the changes you make in DevTools to your locally hosted website.
{% endAside %}

You can set up multiple folders as **Workspaces**. All such folders are listed in {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/9gzXiTYY0nZzBxGI6KrV.svg", alt="Settings.", width="24", height="24" %} [**Settings** > **Workspace**](/docs/devtools/settings/#workspace).

Next, learn how to use DevTools to [change CSS](/docs/devtools/css/) and [debug JavaScript](/docs/devtools/javascript/).

[1]: https://developer.mozilla.org/docs/Learn/Getting_started_with_the_web
[2]: /docs/devtools/css
[3]: https://developer.mozilla.org/docs/Learn/Common_questions/set_up_a_local_testing_server#Running_a_simple_local_HTTP_server
[4]: https://web.dev/source-maps/
[5]: https://groups.google.com/forum/#!forum/google-chrome-developer-tools
[6]: https://stackoverflow.com/questions/ask?tags=google-chrome-devtools
[7]: /docs/devtools/overrides/
[8]: https://glitch.com/edit/#!/remix/workspaces
[9]: https://en.wikipedia.org/wiki/Port_(computer_networking)#Use_in_URLs
[10]: #elements
[11]: https://developer.mozilla.org/docs/Web/API/Document_Object_Model/Introduction
[12]: https://developer.mozilla.org/docs/Web/CSS/content
[13]: https://groups.google.com/forum/#!forum/google-chrome-developer-tools
[14]: https://stackoverflow.com/questions/ask?tags=google-chrome-devtools
[15]: https://groups.google.com/forum/#!forum/google-chrome-developer-tools
[16]: https://twitter.com/chromedevtools
