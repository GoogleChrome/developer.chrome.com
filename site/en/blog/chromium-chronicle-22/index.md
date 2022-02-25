---
title: "The Chromium Chronicle #22: Know Thy (Depot) Tools"
description: >
  Depot Tools is a collection of tools built on top of Git to simplify the
  workflow of developers contributing to the Chromium codebase and related
  projects.
layout: 'layouts/blog-post.njk'
date: 2021-06-28
hero: 'image/0g2WvpbGRGdVs0aAPc6ObG7gkud2/hgu6uTktp2ipmuODZZhP.jpg'
alt: >
  Chromium Chronicle image
tags:
  - chromium-chronicle
---

**Episode 22:** by Edward Lesmes in San Francisco, CA (June, 2021)<br>
[Previous episodes](/tags/chromium-chronicle/)

Depot Tools is a collection of tools built on top of Git to simplify the
workflow of developers contributing to the Chromium codebase and related
projects. It contains tools to **get the code, upload changes for review,
keep your checkout up to date**, and more!

## Get the code

Run `fetch chromium` in an empty directory. The `fetch` command can also be
used to get the code for other repositories like v8, or webrtc. See
`fetch help` for a full list.

## Upload a change for review

Each CL corresponds to a single branch in git, so start by running
`git new-branch <branch_name>` to create a new branch. Commit as many
changes as you like to this branch and run `git cl upload` when it's ready
for review.

`git cl issue` will let you know what CL your branch is associated with.
Use `git cl issue <issue>` to change it.

## Keep your checkout up to date

Run `git rebase-update` periodically to sync local branches to their
upstream, and `gclient sync` to update `third_party` repos and run
pre-compile hooks.

## Manage multiple CLs

* `git cl status` will show CLs associated with local branches and their
  status (unsent, lgtm, closed, etc).
* `git freeze` and `git thaw` work like `git stash`, but keep track of the
  branch associated with the stashed changes.
* `git map` will show you the history of all of your branches,
  and `git map-branches` will show you the upstream relationships between
  all your branches.
* `git new-branch --upstream_current <branch_name>` creates a new branch on
  top of an existing branch. Use `git rebase-update` to rebase a dependent
  branch after making changes to the base branch.

## Keep working on an existing CL on a different machine

Run `git cl patch <issue_url>` to cherry-pick an existing CL on top of the
current branch. Note that it will associate the current branch with the
patched CL. Use `git cl patch <issue_url> --reapply` to discard local
changes and reapply the issue.

## And more

Check out the [depot tools tutorial][dt_tutorial] and explore the help
messages for each command to discover all the cool features, and let us
know at if you have any [issues][dt_bug]!

[dt_tutorial]: https://commondatastorage.googleapis.com/chrome-infra-docs/flat/depot_tools/docs/html/depot_tools_tutorial.html#_setting_up
[dt_bug]: https://bugs.chromium.org/p/chromium/issues/entry?components=Infra%3ESDK
