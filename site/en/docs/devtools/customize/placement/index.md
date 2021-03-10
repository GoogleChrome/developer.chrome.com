---
layout: "layouts/doc-post.njk"
title: "Change placement: undock, dock to bottom, dock to left"
authors:
  - kaycebasques
date: 2019-05-14
#updated: YYYY-MM-DD
description:
  "How to move Chrome DevTools to the bottom or left of your viewport, or to a separate window."
---

By default DevTools is docked to the right of your viewport. You can also dock to bottom, dock to
left, or undock to a DevTools to a separate bottom.

{% Img src="image/admin/biAgcjwjxWwk4QRkTd7p.png", alt="Dock To Left.", width="800", height="482" %}

**Figure 1**. Dock To Left.

{% Img src="image/admin/FG8JOZ6NuxKkxFUKiMhv.png", alt="Dock To Bottom.", width="800", height="482" %}

**Figure 2**. Dock To Bottom.

{% Img src="image/admin/gwBTVePPU5cqahX649tB.png", alt="Undocked.", width="800", height="352" %}

**Figure 3**. Undocked.

## Change placement from the main menu {: #menu }

1.  Click **Customize And Control DevTools**
    {% Img src="image/admin/J6eHTetqRq8OA4vAFZgN.png", alt="Customize And Control DevTools", width="6", height="26" %} and
    select **Undock Into Separate Window**
    {% Img src="image/admin/32ywiTV2crhhBz4Qy24M.png", alt="Undock", width="28", height="24" %}, **Dock To Bottom**
    {% Img src="image/admin/ckt768UpO2BOngVqYbfG.png", alt="Dock To Bottom", width="28", height="24" %}, or **Dock To
    Left** {% Img src="image/admin/rrwMCjKldgIkwl7bCH1p.png", alt="Dock To Left", width="28", height="24" %}.

    {% Img src="image/admin/cV9hKMDA7oFJRWc0flr9.png", alt="Selecting Undock Into Separate Window.", width="800", height="442" %}

    **Figure 4**. Selecting **Undock Into Separate Window**.

## Change placement from the Command Menu {: #commandmenu }

1.  [Open the Command Menu][1].
2.  Run one of the following commands: `Dock To Bottom`, `Undock Into Separate Window`. Currently
    there is no command for docking to left, but you can access it from the [main menu][2].

    {% Img src="image/admin/VAHPOl8MveN1GYVP8o4C.png", alt="The undock command.", width="800", height="442" %}

    **Figure 5**. The undock command.

[1]: /docs/devtools/command-menu
[2]: #menu
