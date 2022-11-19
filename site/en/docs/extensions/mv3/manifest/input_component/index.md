---
layout: "layouts/doc-post.njk"
title: "Manifest - input_component"
date: 2022-10-28
updated: 
description: Reference documentation for the input_component property of manifest.json.
---

An optional Manifest key enabling the use of the  [`input.ime` API](/docs/extensions/reference/input_ime/) (Input Method Editor) for use with ChromeOS. This allows your extension to handle keystrokes, set the composition, and open assistive windows. Developers must also declare the `"input"` permission in the extension's `"permissions"` array. 