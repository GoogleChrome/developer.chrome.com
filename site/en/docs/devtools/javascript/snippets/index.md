---
layout: "layouts/doc-post.njk"
title: "Run snippets of JavaScript"
authors:
  - kaycebasques
  - sofiayem
date: 2015-10-12
updated: 2022-10-20
description:
  "Snippets are small scripts that you can author and execute within the Sources panel of Chrome
  DevTools. You can access and run them from any page. When you run a snippet, it executes from the
  context of the currently open page."
tags:
  - javascript
  - prototype-fixes
---

If you find yourself running the same code in the [**Console**][1] repeatedly, consider saving the code as a snippet instead. Snippets have access to the page's JavaScript context. They are an alternative to [bookmarklets][3].

You can author snippets in the [**Sources** panel][2] and run them on any page and in incognito mode.

{% Aside %}
DevTools stores snippets as your local preferences. DevTools doesn't [sync](/docs/devtools/customize/#sync) snippets with settings and they can't be accessed via the file system.
{% endAside %}

For example, the screenshot below shows the DevTools documentation homepage on the left and some snippet source code in the **Sources** > **Snippets** pane on the right.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/TYnLVgJrfZtcqjP9eEyT.png", alt="The DevTools documentation homepage before running the snippet. The Run button is highlighted.", width="800", height="483" %}

Here's the snippet source code that [logs some message](/docs/devtools/console/log/) and replaces the homepage's HTML body with a `<p>` element that contains the message:

```js
console.log('Hello, Snippets!');
document.body.innerHTML = '';
const p = document.createElement('p');
p.textContent = 'Hello, Snippets!';
document.body.appendChild(p);
```

When you click the {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/MaSHbLXzcTFbxhx9K8hX.svg", alt="Run.", width="24", height="24" %} **Run** button, the [**Console** drawer](/docs/devtools/console/) pops up to display the `Hello, Snippets!` message that the snippet logs, and the page's content changes.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/vsJ9UtrJHaBTXASCJmVl.png", alt="The homepage after running the snippet.", width="800", height="483" %}

## Open the Snippets pane {: #open }

The **Snippets** pane lists your snippets. To edit a snippet, open it in one of two ways:

- Navigate to **Sources** > {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/XJkvYrQpjC40JNYnoNAw.svg", alt="More tabs.", width="24", height="24" %} **More tabs** > **Snippets**.

  {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/a6oQMn9OhKw0QYVjKgcl.png", alt="The More tabs menu on the Sources pane.", width="800", height="455" %}

- From the [**Command Menu**](/docs/devtools/command-menu/):

  1. Press <kbd>Control</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd> (Windows/Linux) or <kbd>Command</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd> (Mac) to open the **Command Menu**.
  1. Start typing `Snippets`, select **Show Snippets**, and press <kbd>Enter</kbd>.

  {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/qdz4GlZKxgo3OGsMBNVW.png", alt="Selecting Show Snippets from the Command Menu.", width="800", height="455" %}

The **Sources** > **Snippets** pane shows you a list of snippets you saved, empty in this example.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/anW1OzkdZIl1UGTvZHEC.png", alt="An empty Snippets pane.", width="800", height="397" %}

## Create snippets {: #create }

You can create snippets in the **Snippets** pane or by running the corresponding command from the **Command Menu** anywhere in DevTools.

The **Snippets** pane sorts your snippets in alphabetical order.

### Create a snippet in the Sources panel {: #create-sources }

1.  [Open the **Snippets** pane][5].
2.  Click {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/YihNsXarRhDgEi9rOT4H.svg", alt="New snippet.", width="24", height="24" %} **New snippet**.
3.  Enter a name for your snippet and press <kbd>Enter</kbd> to save.

    {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/oCTjWAPob5VqxI0GWkz6.png", alt="Naming a snippet.", width="800", height="397" %}

### Create a snippet from the Command Menu {: #create-command-menu }

1. Focus your cursor anywhere inside of DevTools.
1. Press <kbd>Control</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd> (Windows/Linux) or <kbd>Command</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd> (Mac) to open the **Command Menu**.
1. Start typing `Snippet`, select **Create new snippet**, then press <kbd>Enter</kbd> to run the command.

    {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/S3sUv9Fyh9FFBKVCFvOH.png", alt="Selecting Create new snippet from the Command Menu.", width="800", height="397" %}

See [Rename snippets][6] if you'd like to give your new snippet a custom name.

## Edit snippets {: #edit }

1.  [Open the **Snippets** pane][7].
1.  In the **Snippets** pane, click the name of the snippet that you want to edit. The **Sources** panel opens it in the **Code Editor**.

    {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/T3NLtPKuEraxm4QvUdWw.png", alt="A snippet opened in the Code Editor.", width="800", height="334" %}

1.  Use the **Code Editor** to edit code in your snippet. An asterisk next to the snippet name means that you haven't saved your changes yet.

    {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/NZemthHxlUVsPhuHEGLl.png", alt="An asterisk next to the snippet name that indicates unsaved code.", width="800", height="334" %}

1.   Press <kbd>Control</kbd>+<kbd>S</kbd> (Windows/Linux) or <kbd>Command</kbd>+<kbd>S</kbd> (Mac) to save.

## Run snippets {: #run }

Similar to creating a snippet, you can run it both in the **Snippets** pane and from the **Command Menu**.

### Run a snippet in the Sources panel {: #run-sources }

1.  [Open the **Snippets** pane][8].
1.  Click the name of the snippet you want to run. The **Sources** panel opens it in the **Code Editor**.
1.  Click {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/MaSHbLXzcTFbxhx9K8hX.svg", alt="Run.", width="24", height="24" %} **Run** in the action bar at the bottom of the editor,
    or press <kbd>Control</kbd>+<kbd>Enter</kbd> (Windows/Linux) or <kbd>Command</kbd>+<kbd>Enter</kbd> (Mac).

    {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/Ng3ZidWcXAaxLmR6MtDy.png", alt="The Run button.", width="800", height="334" %}

### Run a snippet from the Command Menu {: #run-command-menu }

1.  Focus your cursor anywhere inside of DevTools.
1.  Press <kbd>Control</kbd>+<kbd>O</kbd> (Windows/Linux) or <kbd>Command</kbd>+<kbd>O</kbd> (Mac) to open the **Command Menu**.
1.  Type the `!` character followed by the name of the snippet that you want to run.

    {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/jWa8jF8Tn1JxiTJmOq4j.png", alt="Running a snippet from the Open Menu.", width="800", height="346" %}

1.  Press <kbd>Enter</kbd> to run the snippet.

## Rename snippets {: #rename }

1.  [Open the **Snippets** pane][9].
1.  Right-click the snippet name and select **Rename**.

## Delete snippets {: #delete }

1.  [Open the **Snippets** pane][10].
1.  Right-click the snippet name and select **Remove**.

[1]: /docs/devtools/console
[2]: /docs/devtools/javascript/sources
[3]: https://en.wikipedia.org/wiki/Bookmarklet
[5]: #open
[6]: #rename
[7]: #open
[8]: #open
[9]: #open
[10]: #open
