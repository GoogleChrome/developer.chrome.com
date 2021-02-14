---
layout: "layouts/doc-post.njk"
title: "Run Commands With The Chrome DevTools Command Menu"
authors:
  - kaycebasques
date: 2019-04-09
updated: 2020-07-10
description: "A guide on how to open the Command Menu, run commands, see other actions, and more."
---

The Command Menu provides a fast way to navigate the Chrome DevTools UI and accomplish common tasks,
such as [disabling JavaScript][1]. You may be familiar with a similar feature in Visual Studio Code
called the [Command Palette][2], which was the original inspiration for the Command Menu.

![Using the Command Menu to disable JavaScript.](/web/tools/chrome-devtools/javascript/imgs/disable-javascript.png)

**Figure 1**. Using the Command Menu to disable JavaScript.

## Open the Command Menu {: #open }

Press <kbd>Control</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd> or
<kbd>Command</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd> (Mac). Or, click **Customize And Control DevTools**
![Customize And Controls DevTools](/web/tools/chrome-devtools/images/shared/main-menu.png) and then
select **Run Command**.

![Run Command.](/web/tools/chrome-devtools/command-menu/imgs/runcommand.png)

**Figure 2**. Run Command.

## See other available actions {: #help }

If you use the workflow outlined in [Open the Command Menu][3], the Command Menu opens with a `>`
character prepended to the Command Menu text box.

![The command character.](/web/tools/chrome-devtools/command-menu/imgs/commandcharacter.png)

**Figure 3**. The command character.

Delete the `>` character and type `?` to see other actions that are available from the Command Menu.

![Other available actions.](/web/tools/chrome-devtools/command-menu/imgs/actions.png)

**Figure 4**. Other available actions.

[1]: /web/tools/chrome-devtools/javascript/disable
[2]: https://code.visualstudio.com/docs/getstarted/userinterface#_command-palette
[3]: #open
