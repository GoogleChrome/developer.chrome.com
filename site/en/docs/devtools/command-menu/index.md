---
layout: "layouts/doc-post.njk"
title: "Run commands in the Command Menu"
authors:
  - kaycebasques
  - sofiayem
date: 2019-04-09
updated: 2022-09-21
description: "A guide on how to open the Command Menu, run commands, open files, see other actions, and more."
---

{% YouTube id='xHusjrb_34A', startTime=33 %}

The Command Menu provides a fast way to navigate the Chrome DevTools UI and accomplish common tasks,
such as [disabling JavaScript][1]. You may be familiar with a similar feature in Visual Studio Code
called the [Command Palette][2], which was the original inspiration for the Command Menu.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/31z4kKSuDRYiAhU3P4Ek.png", alt="The Command Menu.", width="800", height="585" %}

## Open the Command Menu {: #open }

To open the **Command Menu**:

- Press <kbd>Control</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd> (Windows / Linux) or <kbd>Command</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd> (Mac).
- Click {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/9gzXiTYY0nZzBxGI6KrV.svg", alt="Customize and control DevTools.", width="24", height="24" %} **Customize and control DevTools** and then select **Run command**.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/w028xC4ctg5PFvNOww2o.png", alt="Run command.", width="800", height="495" %}

## Open files {: open-files }

If you use the workflow outlined in [Open the Command Menu][3], the Command Menu opens with a `Run >` prepended in the text box.

To open a file instead, delete the `>` character and start typing a file name.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/qp9YQQrcrs5khp3mRaHw.png", alt="Open.", width="800", height="535" %}

The `Run` prepend changes to `Open` and DevTools searches for relevant files instead.

Alternatively, you can go straight to the **Open File** menu in one of the following ways:

- Press <kbd>Control</kbd>+<kbd>P</kbd> (Windows / Linux) or <kbd>Command</kbd>+<kbd>P</kbd> (Mac).
- Click {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/9gzXiTYY0nZzBxGI6KrV.svg", alt="Customize and control DevTools.", width="24", height="24" %} **Customize and control DevTools** and then select **Open file**.

### Open ignore-listed files {: show-ignore-listed }

{% Aside %}
**Note**: This is a {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/XfSWf04g2cwpnFcmp40m.svg", alt="Experimental.", width="20", height="20" %} preview feature available in Chrome from version 106.
{% endAside %}

By default, DevTools hides the files of known third-parties. To open such files from the menu, disable the [Hide ignore-listed sources](/docs/devtools/javascript/reference/#hide-ignore-listed) option in the **Sources** panel.

## See other available actions {: #help }

To see other actions available from the **Command Menu**, delete the `>` character and type `?`.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/bXm6Q6IBmGnbire4m7Mh.png", alt="Other actions.", width="800", height="535" %}

[1]: /docs/devtools/javascript/disable
[2]: https://code.visualstudio.com/docs/getstarted/userinterface#_command-palette
[3]: #open
