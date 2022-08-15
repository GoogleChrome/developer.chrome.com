---
layout: 'layouts/doc-post.njk'
title: 'The Getting Started Collection'
subhead: 'Welcome to the Getting Started Guides.'
description: 'Welcome to the Getting Started Guides.'
date: 2022-08-20
# updated: 2022-06-13
---


Welcome to the Getting Started guides collection! The purpose of this page is to describe each article and how you can contribute to this collection.

## Begin your journey

The following articles will kick-start your Chrome extension development journey:

### Extension development concepts {: #concepts }

Extensions 101
: Briefly covers some fundamental concepts of Chrome Extension development like web technologies used,  frequently used files, etc. It also highlights important guidelines to be aware of when designing and distributing an extension in the Chrome Web Store. 

Development Basics
: Introduces the extension development workflow by creating a "Hello, Extensions" example. It walks through loading the extension during development, locating logs and errors, choosing a project structure, and using Typescript.

### Beginner tutorials {: #tutorials }

The following step-by-step tutorials cover some common Chrome extension use-cases. In addition, using these extensions will improve your experience with the extension documentation.

Reading time
:  It’s nice to know how much time we need to spend reading an article. Reading time teaches you how to insert an element containing the estimated reading time on every page.

Focus Mode
: Removing extra clutter from a page allows our minds to concentrate on the most relevant information. Focus Mode changes the style of the page to help you better digest the content of extension documentation pages.

Tabs Manager
: Do you have multiple tabs on different windows? Tabs Manager uses an extension popup to display a list of all the open extension documentation pages. It can also gather them all into one neat group. 

Each tutorial includes the following sections:

- What the extension does.
- What you will learn.
- What you need to know before starting.
- Step-by-step instructions. 
- How to load and test the extension.

In addition, If you are up for a challenge, we include a few ways to refactor or add additional features to the extension.

## Share your feedback

We are excited to hear from you! Here are four ways you can contribute to the new Getting Started collection:

### Improve the tutorials
If you see something wrong or unclear, please open an issue in our documentation Github repository.

### Request a beginner tutorial
<!-- TODO: Create a process for requesting a new tutorial: a github issue template? Currently there is a new content issue template, but may need to be adapted or create one for new extension content?
Tentative -->
- Create issue on Github repo
- Answer the following questions:
  - What would the extension do?
  - What should the tutorial teach? Which Chrome APIs are covered?
  - What's the level of this tutorial? Beginner or Advanced

### Share a code sample
<!-- TODO: Create a contributions guideline for the extension sample repo -->

You can submit a code sample to the extensions samples repo and follow these guidelines:
- Clone the repo.
- Create a project folder inside the tutorials folder with the name of the extension.
- Format the code with eslint-google.
- Add the copyright comment at the top of each file.
- Add a readme.MD that explains what the extension does, a screenshot, and the Chrome APIs it uses.

### Write a tutorial
<!-- TODO: Create a process for submitting a new tutorial: a github issue template? Currently there is a new content issue template, but may need to be adapted or create one for new extension content? -->
Tentative
- Begin by creating a code sample and submit for code review
- Follow these guidelines to create a new document.
- Fill out each section found in the extension tutorial template. TODO: Create a page in the handbook with the tutorial template
- Take screenshots and add placeholders for each one. Submit the images on the PR.
- Follow the Google Style Guidelines.

We hope the new Getting Started collection helps you feel confident and supported as you embark on your extension development journey.

