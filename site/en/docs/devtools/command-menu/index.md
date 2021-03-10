---
layout: "layouts/doc-post.njk"
title: "Run commands in the Command Menu"
authors:
  - kaycebasques
date: 2019-04-09
#updated: YYYY-MM-DD
description: "A guide on how to open the Command Menu, run commands, see other actions, and more."
---

The Command Menu provides a fast way to navigate the Chrome DevTools UI and accomplish common tasks,
such as [disabling JavaScript][1]. You may be familiar with a similar feature in Visual Studio Code
called the [Command Palette][2], which was the original inspiration for the Command Menu.

{% Img src="image/admin/ExYtEd6A9uv9cmfGi2Kj.png", alt="Using the Command Menu to disable JavaScript.", width="800", height="464" %}

**Figure 1**. Using the Command Menu to disable JavaScript.

## Open the Command Menu {: #open }

Press <kbd>Control</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd> or
<kbd>Command</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd> (Mac). Or, click **Customize And Control DevTools**
{% Img src="image/admin/m1Eh4SVSkWc43wVZc6xD.png", alt="Customize And Controls DevTools", width="6", height="26" %} and then
select **Run Command**.

{% Img src="image/admin/zvMtw02eegZb1WUyCrdb.png", alt="Run Command.", width="800", height="501" %}

**Figure 2**. Run Command.

## See other available actions {: #help }

If you use the workflow outlined in [Open the Command Menu][3], the Command Menu opens with a `>`
character prepended to the Command Menu text box.

{% Img src="image/admin/y4BzzMFKYfzJoig93U7f.png", alt="The command character.", width="800", height="604" %}

**Figure 3**. The command character.

Delete the `>` character and type `?` to see other actions that are available from the Command Menu.

{% Img src="image/admin/wodnAlfrSLHGBacKazHs.png", alt="Other available actions.", width="800", height="480" %}

**Figure 4**. Other available actions.

[1]: /docs/devtools/javascript/disable
[2]: https://code.visualstudio.com/docs/getstarted/userinterface#_command-palette
[3]: #open
