---
layout: "layouts/doc-post.njk"
title: "Additional Requirements for Manifest V3"
date: 2022-11-01
---

1. Extensions using Manifest V3 must meet additional requirements related to the extension's code. Specifically, the full functionality of an extension must be easily discernible from its submitted code. This means that the logic of how each extension operates should be self contained. The extension may reference and load data and other information sources that are external to the extension, but these external resources must not contain any logic. Some common violations include:

    1. Including a &lt;script&gt; tag that points to a resource that is not within the extension's package

    1. Using JavaScript's [`eval()`][eval] method or other mechanisms to execute a string fetched from a remote source

    1. Building an interpreter to run complex commands fetched from a remote source, even if those commands are fetched as data

1. Communicating with remote servers for certain purposes is still allowed. For instance:

    1. Syncing user account data with a remote server

    1. Fetching a remote configuration file for A/B testing or determining enabled features, where all logic for the functionality is contained within the extension package

    1. Fetching remote resources that are not used to evaluate logic, such as images

    1. Performing server-side operations with data (such as for the purposes of encryption with a private key)

1. If our reviewers are unable to determine the full functionality of your extension during the review process, we may reject your submission or remove it from the store.

[eval]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/eval
