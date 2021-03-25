---
layout: "layouts/doc-post.njk"
title: "Run Snippets of JavaScript"
authors:
  - kaycebasques
date: 2015-10-12
#updated: YYYY-MM-DD
description:
  "Snippets are small scripts that you can author and execute within the Sources panel of Chrome
  DevTools. You can access and run them from any page. When you run a Snippet, it executes from the
  context of the currently open page."
---

If you find yourself running the same code in the [**Console**][1] repeatedly, consider saving the
code as a Snippet instead. Snippets are scripts that you author in the [**Sources** panel][2]. They
have access to the page's JavaScript context, and you can run them on any page. Snippets are an
alternative to [bookmarklets][3]. Firefox DevTools has a feature similar to Snippets called
[Scratchpad][4].

For example, **Figure 1** shows the DevTools homepage on the left and some Snippet source code on
the right.

{% Img src="image/admin/EWQszqRC7ElFmBEL7F7N.png", alt="How the page looks before running the Snippet.", width="800", height="514" %}

**Figure 1**. How the page looks before running the Snippet.

Here's the Snippet source code from **Figure 1**:

```js
console.log('Hello, Snippets!');
document.body.innerHTML = '';
var p = document.createElement('p');
p.textContent = 'Hello, Snippets!';
document.body.appendChild(p);
```

**Figure 2** shows how the page looks after running the Snippet. The **Console Drawer** pops up to
display the `Hello, Snippets!` message that the Snippet logs, and the page's content changes
completely.

{% Img src="image/admin/0LdPF6MB3EzkAu04pXYs.png", alt="How the page looks after running the Snippet.", width="800", height="514" %}

**Figure 2**. How the page looks after running the Snippet.

## Open the Snippets pane {: #open }

The **Snippets** pane lists your Snippets. When you want to edit a Snippet, you need to open it from
the **Snippets** pane.

{% Img src="image/admin/P9yNZWUJKt2hUUYsDy1v.png", alt="The Snippets pane.", width="800", height="573" %}

**Figure 3**. The **Snippets** pane.

### Open the Snippets pane with a mouse {: #openmouse }

1.  Click the **Sources** tab to open the **Sources** panel. The **Page** pane usually opens by
    default.

    {% Img src="image/admin/rloloE1a9afaWUDo4Typ.png", alt="The Sources panel with the Page pane open on the left.", width="800", height="589" %}

    **Figure 4**. The **Sources** panel with the **Page** pane open on the left.

2.  Click the **Snippets** tab to open the **Snippets** pane. You might need to click **More Tabs**
    {% Img src="image/admin/kXITLxKrpFwp1ir6Tl3b.png", alt="More Tabs", width="18", height="16" %} in order to access the
    **Snippets** option.

### Open the Snippets pane with the Command Menu {: #opencommandmenu }

1.  Focus your cursor somewhere inside of DevTools.
2.  Press Control+Shift+P or Command+Shift+P (Mac) to open the Command Menu.
3.  Start typing `Snippets`, select **Show Snippets**, and then press Enter to run the command.

    {% Img src="image/admin/6zVZHNVXNXxMP2SziTMa.png", alt="The Show Snippets command.", width="800", height="573" %}

    **Figure 5**. The **Show Snippets** command.

## Create Snippets {: #create }

### Create a Snippet through the Sources panel {: #createsources }

1.  [Open the **Snippets** pane][5].
2.  Click **New snippet**.
3.  Enter a name for your Snippet then press Enter to save.

    {% Img src="image/admin/QCPp5Bcgm7Ns4pgYKGpS.png", alt="Naming a Snippet.", width="800", height="573" %}

    **Figure 6**. Naming a Snippet.

### Create a Snippet through the Command Menu {: #createcommandmenu }

1.  Focus your cursor somewhere inside of DevTools.
2.  Press Control+Shift+P or Command+Shift+P (Mac) to open the Command Menu.
3.  Start typing `Snippet`, select **Create new snippet**, then press Enter to run the command.

    {% Img src="image/admin/THzXr6JqYkTv6lv83iSN.png", alt="The command for creating a new Snippet.", width="800", height="573" %}

    **Figure 7**. The command for creating a new Snippet.

See [Rename Snippets][6] if you'd like to give your new Snippet a custom name.

## Edit Snippets {: #edit }

1.  [Open the **Snippets** pane][7].
2.  In the **Snippets** pane click the name of the Snippet that you want to edit in order to open it
    in the **Code Editor**.

    {% Img src="image/admin/XEIt2GZsfU8MtZJqeDRv.png", alt="The Code Editor.", width="800", height="573" %}

    **Figure 8**. The **Code Editor**.

3.  Use the **Code Editor** to add JavaScript to your Snippet.
4.  When there's an asterisk next to the name of your Snippet it means you have unsaved code. Press
    Control+S or Command+S (Mac) to save.

    {% Img src="image/admin/Nz3usljhLTIN0SAvYHAs.png", alt="An asterisk next to the Snippet name, which indicates unsaved code.", width="800", height="573" %}

    **Figure 9**. An asterisk next to the Snippet name, which indicates unsaved code.

## Run Snippets {: #run }

### Run a Snippet from the Sources panel {: #runsources }

1.  [Open the **Snippets** pane][8].
2.  Click the name of the Snippet that you want to run. The Snippet opens in the **Code Editor**.
3.  Click **Run Snippet** {% Img src="image/admin/uz8qSHNEFlBv9yiK7re1.png", alt="Run Snippet", width="20", height="20" %},
    or press Control+Enter or Command+Enter (Mac).

### Run a Snippet with the Command Menu {: #runcommandmenu }

1.  Focus your cursor somewhere inside of DevTools.
2.  Press Control+O or Command+O (Mac) to open the Command Menu.
3.  Type the `!` character followed by the name of the Snippet that you want to run.

    {% Img src="image/admin/Ua8t4kX7zmVps6tntHOT.png", alt="Running a Snippet from the Command Menu.", width="800", height="603" %}

    **Figure 10**. Running a Snippet from the Command Menu.

4.  Press Enter to run the Snippet.

## Rename Snippets {: #rename }

1.  [Open the **Snippets** pane][9].
2.  Right-click the Snippet name and select **Rename**.

## Delete Snippets {: #delete }

1.  [Open the **Snippets** pane][10].
2.  Right-click the Snippet name and select **Remove**.

[1]: /docs/devtools/console
[2]: /docs/devtools/sources
[3]: https://en.wikipedia.org/wiki/Bookmarklet
[4]: https://developer.mozilla.org/en-US/docs/Tools/Scratchpad
[5]: #open
[6]: #rename
[7]: #open
[8]: #open
[9]: #open
[10]: #open
