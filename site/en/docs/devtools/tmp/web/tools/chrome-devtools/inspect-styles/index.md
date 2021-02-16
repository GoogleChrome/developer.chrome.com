---
layout: "layouts/doc-post.njk"
title: "Inspect and Edit Pages and Styles"
authors:
  - megginkearney
,  - kaycebasques
date: 2015-04-13
updated: 2020-12-14
description: "Inspect and edit the HTML and CSS of your pages."
---

!!!.aside.aside--caution

This page is deprecated.

!!!

Inspect and live-edit the HTML and CSS of a page using the Chrome DevTools Elements panel.

{% Img src="image/admin/Sou6Tb9tOkeInPK5vvCJ.png", alt="Chrome DevTools Elements panel", width="800", height="464" %}

## TL;DR {: #tldr }

- Inspect and edit on the fly any element in the DOM tree in the Elements panel.
- View and change the CSS rules applied to any selected element in the Styles pane.
- View and edit a selected element's box model in the Computed pane.
- View any changes made to your page locally in the Sources panel.

## Live-edit a DOM node {: #live-edit_a_dom_node }

To live-edit a DOM node, simply double-click a [selected element][1] and make changes:

The DOM tree view shows the current state of the tree; it may not match the HTML that was originally
loaded for different reasons. For example, you can modify the DOM tree using JavaScript; the browser
engine can try to correct invalid author markup and produce an unexpected DOM.

## Live-edit a style {: #live-edit_a_style }

Live-edit style property names and values in the **Styles** pane. All styles are editable, except
the ones that are greyed out (as is the case with user agent stylesheets).

To edit a name or value, click on it, make your changes, and press <kbd class="kbd">Tab</kbd> or
<kbd class="kbd">Enter</kbd> to save the change.

{% Img src="image/admin/6WQzmOQxDEOtXUcgPnQF.png", alt="edit property name", width="800", height="521" %}

By default, your CSS modifications are not permanent, changes are lost when you reload the page. Set
up [persistent authoring][2] if you want to persist your changes between page loads.

## Examine and edit box model parameters {: #examine_and_edit_box_model_parameters }

Examine and edit the current element's box model parameters using the **Computed pane**. All values
in the box model are editable, just click on them.

{% Img src="image/admin/KvIRoQVzjJBGrCaOc0Jf.png", alt="Computed pane", width="800", height="521" %}

The concentric rectangles contain the **top**, **bottom**, **left**, **right** values for the
current element's **padding**, **border**, and **margin** properties.

For non-statically positioned elements, a **position** rectangle is also displayed, containing the
values of the **top**, **right**, **bottom**, and **left** properties.

{% Img src="image/admin/YA77pJ1CQjXQnH4TUuiO.png", alt="non-static computed element", width="800", height="500" %}

For `position: fixed` and `position: absolute` elements, the central field contains the actual
**offsetWidth × offsetHeight** pixel dimensions of the selected element. All values can be modified
by double-clicking them, like property values in the Styles pane. The changes are not, however,
guaranteed to take effect, as this is subject to the concrete element positioning specifics.

{% Img src="image/admin/z5iNK3n0b3dGv2eMI0DI.png", alt="fixed computed element", width="800", height="500" %}

## View local changes {: #view_local_changes }

To view a history of live-edits made to your page:

1.  In the **Styles** pane, click on the file that you modified. DevTools takes you to the
    **Sources** panel.
2.  Right-click on the file.
3.  Select **Local modifications**.

To explore the changes made:

- Expand top-level file names to view the time
  {% Img src="image/admin/nf0kHeWeH6at5ZXNsSK9.png", alt="time modification occurred", width="81", height="13" %} a
  modification occurred.
- Expand second-level items to view a [diff][3] (before and after) corresponding to the
  modification. A line with a pink background signifies a removal while a line with a green
  background signifies an addition.

## Undo changes {: #undo_changes }

If you haven't [set up persistent authoring][4], any time you reload the page, all live-edits are
lost.

Assuming you've set up persistent authoring, to undo changes:

- Use <kbd class="kbd">Ctrl</kbd>+<kbd class="kbd">Z</kbd> (Windows) or
  <kbd class="kbd">Cmd</kbd>+<kbd class="kbd">Z</kbd> (Mac) to quickly undo minor changes to the DOM
  or styles via the Elements panel.
- To undo all local modifications made to a file, open the **Sources** panel and select **revert**
  next to the filename.

[1]: #inspect-an-element
[2]: /web/tools/setup/setup-workflow
[3]: https://en.wikipedia.org/wiki/Diff
[4]: /web/tools/setup/setup-workflow
