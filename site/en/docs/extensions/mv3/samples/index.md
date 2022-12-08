---
layout: "layouts/doc-post.njk"
title: "Samples"
seoTitle: "Chrome Extension examples"
date: 2022-12-12
# updated: 2021-07-22
description: Intro to extension examples GitHub repository 
---

## Overview {: #overview }

We aim to provide examples of extensions that address various use cases and call appropriate Chrome
APIs. Use these to learn how extensions work or as a starting point for building your own
extensions. These extension examples are available on the [Extensions sample GitHub
repository][gh-samples].

## Categories {: #categories }

The examples are currently located under the following directories:

api/
: Includes extensions that demonstrate the capabilities of a specific API. For example: the action API extension showcases all the 

examples/
: a complete extension that implements all the basic features for a given purpose. For example:

cookbooks/
: extensions that demonstrate a single feature or pattern. For example

tutorials/
: this folder contains examples of how to build an extension over a series of steps. For example: Tabs manager, Focus Mode, Reading Time

💡 Tip to find a particular use of a Chrome API in the repository

## How to test the examples {: #testing }

To test these examples in your local machine, follow these steps

1. Clone the repository
1. Navigate to the directory of the extension you want to try.
1. [Load your extension locally][dev-basics-locally]

Each extension example includes a `readMe.MD` with detailed instructions on how the extension works.
Read it carefully; some extensions run when you click on the extension icon, and others run automatically but only run specific sites. 

💡 **TIP**: Extensions cannot run on chrome://extensions, so make sure you navigate to another page before testing an extension. 

## How to collaborate {: #collaborating }




[gh-samples]: https://github.com/GoogleChrome/chrome-extensions-samples
[dev-basics-locally]: /docs/extensions/mv3/getstarted/development-basics/