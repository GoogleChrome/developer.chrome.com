---
layout: 'layouts/doc-post.njk'
title: Overview
seoTitle: Lighthouse overview
description: |
  Learn how to set up Lighthouse to audit your web apps.
date: 2016-09-27
updated: 2022-05-24
---

[Lighthouse](https://github.com/GoogleChrome/lighthouse) is an open-source, automated tool for improving the quality of web pages. You can run it against any web page, public or requiring authentication. It has audits for performance, accessibility, progressive web apps, SEO, and more.

<figure>
  {% Img src="image/MtjnObpuceYe3ijODN3a79WrxLU2/QXJ5lmcjHEFLTHg5B4o8.svg", class="float-right", alt="Lighthouse logo", width="150", height="150" %}
</figure>

You can run Lighthouse in Chrome DevTools, from the command line, or as a Node module. You give Lighthouse a URL to audit, it runs a series of audits against the page,
and then it generates a report on how well the page did. From there, use the failing audits as indicators on how to improve the page. Each audit has a reference doc explaining why
the audit is important, as well as how to fix it.

You can also use [Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci/blob/main/docs/getting-started.md) to prevent regressions on your sites.

Check out the video below from Google I/O to learn more about how to use and contribute to Lighthouse.

<figure>
  {% YouTube id="mLjxXPHuIJo" %}
</figure>

## Get started {: #get-started }

Choose the Lighthouse workflow that suits you best:

* [In Chrome DevTools](#devtools). Easily audit pages that require authentication, and read your reports in a user-friendly format.
* [From the command line](#cli). Automate your Lighthouse runs via shell scripts.
* [As a Node module](#programmatic). Integrate Lighthouse into your continuous integration systems.
* [From a web UI](#psi). Run Lighthouse and link to reports without installing a thing.

{% Aside %}
The CLI and Node workflows require you to have an instance of Google Chrome installed on your machine.
{% endAside %}

### Run Lighthouse in Chrome DevTools {: #devtools }

Lighthouse has its own panel in Chrome DevTools. To run a report:

1. Download [Google Chrome for Desktop][desktop].
1. In Google Chrome, go to the URL you want to audit. You can audit any URL on the web.
1. [Open Chrome DevTools](/docs/devtools/open/).
1. Click the **Lighthouse** tab.

     <figure>
       {% Img src="image/MtjnObpuceYe3ijODN3a79WrxLU2/8fwyTKT8jE02hESwaSZy.png", alt="The Lighthouse panel of Chrome DevTools", width="800", height="524" %}
       <figcaption>
         To the left is the viewport of the page that will be audited. To the right is the <b>Lighthouse</b> panel of Chrome DevTools, which is powered by Lighthouse
       </figcaption>
     </figure>

1. Click **Analyze page load**. DevTools shows you a list of audit categories. Leave them all enabled.
1. Click **Run audit**. After 30 to 60 seconds, Lighthouse gives you a report on the page.

     <figure>
       {% Img src="image/MtjnObpuceYe3ijODN3a79WrxLU2/IYRw9kB2rqEsnAj48IJ9.png", alt="A Lighthouse report in Chrome DevTools", width="800", height="524" %}
       <figcaption>
         A Lighthouse report in Chrome DevTools
       </figcaption>
     </figure>

### Install and run the Node command line tool {: #cli }

To install the Node module:

1. Download [Google Chrome for Desktop][desktop].
1. Install the current [Long-Term Support](https://github.com/nodejs/Release) version of [Node](https://nodejs.org).
1. Install Lighthouse. The `-g` flag installs it as a global module.

```shell
npm install -g lighthouse
```

To run an audit:

```shell
lighthouse <url>
```

To see all the options:

```shell
lighthouse --help
```

#### Run the Node module programmatically {: #programmatic }

See [Using programmatically](https://github.com/GoogleChrome/lighthouse/blob/master/docs/readme.md#using-programmatically) for an example of running Lighthouse programmatically, as a Node module.

### Run PageSpeed Insights {: #psi }

To run Lighthouse on PageSpeed Insights:

1. Navigate to [PageSpeed Insights](https://pagespeed.web.dev/).
1. Enter a web page URL.
1. Click **Analyze**.

     <figure>
       {% Img src="image/MtjnObpuceYe3ijODN3a79WrxLU2/n4UGfIn0foQuAq6IQwNQ.png", alt="The PageSpeed Insights UI", width="800", height="657" %}
       <figcaption>
         The PageSpeed Insights UI
       </figcaption>
     </figure>

### Run Lighthouse as a Chrome Extension {: #extension }

{% Aside 'caution' %}
Unless you have a specific reason, you should use the [Chrome DevTools workflow](#devtools) rather than this Chrome Extension workflow. The DevTools workflow allows for testing local sites and authenticated pages, while the extension does not.
{% endAside %}

To install the extension:

1. Download [Google Chrome for Desktop][desktop].
1. Install the [Lighthouse
   Chrome Extension](https://chrome.google.com/webstore/detail/lighthouse/blipmdconlkpinefehnmjammfjpmpbjk) from the Chrome Webstore.

To run an audit:

1. In Chrome, go to the page you want to audit.
1. Click the {% Img src="image/MtjnObpuceYe3ijODN3a79WrxLU2/w7RtkdkOvvOt2Z1RebHL.svg", alt="Lighthouse extension icion", width="24", height="24" %} Lighthouse. It should be next to the Chrome address bar. If not, open Chrome's extension menu and access it from there. After clicking, the Lighthouse menu expands.

     <figure>
       {% Img src="image/MtjnObpuceYe3ijODN3a79WrxLU2/uXhSoI1FesKIunnVU4Xq.png", alt="The Lighthouse extension", width="800", height="783" %}
       <figcaption>
         The Lighthouse extension panel
       </figcaption>
     </figure>

1. Click **Generate report**. Lighthouse runs its audits against the currently-focused page, then opens up a new tab with a report of the results.

     <figure>
       {% Img src="image/MtjnObpuceYe3ijODN3a79WrxLU2/BP0wv7UPlZw2YSNkalAt.png", alt="The Lighthouse extension report", width="800", height="783" %}
       <figcaption>
         A Lighthouse report from the extension
       </figcaption>
     </figure>

## Share and view reports online {: #report-viewer }

Use the [Lighthouse Viewer](https://googlechrome.github.io/lighthouse/viewer/) to view and share reports online.

<figure>
  {% Img src="image/MtjnObpuceYe3ijODN3a79WrxLU2/3X1B62nzU8SQyY6hWzYo.png", alt="The Lighthouse Viewer", width="800", height="578" %}
  <figcaption>
    The Lighthouse Viewer
  </figcaption>
</figure>

### Share reports as JSON {: #json }

The Lighthouse Viewer needs the JSON output of a Lighthouse report. The list below explains how to get the JSON output, depending on what Lighthouse workflow you're using:

* **Lighthouse report**. Open the top-right {% Img src="image/MtjnObpuceYe3ijODN3a79WrxLU2/IkQvYAlLERcWD3CgBTRb.svg", alt="Menu icon", width="24", height="24" %} menu and click {% Img src="image/MtjnObpuceYe3ijODN3a79WrxLU2/5Vy45RXMx3K1b7xM5JZH.svg", alt="Save as JSON button", width="24", height="24" %} **Save as JSON**
* **Command line**. Run:
   ```shell
   lighthouse --output json --output-path <path/for/output.json>
   ```

To view the report data:

1. Open the [Lighthouse Viewer](https://googlechrome.github.io/lighthouse/viewer/).
1. Drag the JSON file onto the viewer, or click anywhere in the Viewer to open your file navigator and select the file.

### Share reports as GitHub Gists {: #gists }

If you don't want to manually pass around JSON files, you can also share your reports as secret GitHub gists. One benefit of gists is free version control.

To export a report as a gist from the report:

1. (If already on the viewer, skip this step) Open the top-right {% Img src="image/MtjnObpuceYe3ijODN3a79WrxLU2/IkQvYAlLERcWD3CgBTRb.svg", alt="Menu icon", width="24", height="24" %} menu, then click {% Img src="image/MtjnObpuceYe3ijODN3a79WrxLU2/aGQOmcH5nFDGkcw4iqp5.svg", alt="Open in viewer button", width="24", height="24" %} **Open In Viewer**. The report opens in the Viewer, located at `https://googlechrome.github.io/lighthouse/viewer/`.
1. In the Viewer, open the top-right {% Img src="image/MtjnObpuceYe3ijODN3a79WrxLU2/IkQvYAlLERcWD3CgBTRb.svg", alt="Menu icon", width="24", height="24" %} menu, then click {% Img src="image/MtjnObpuceYe3ijODN3a79WrxLU2/aGQOmcH5nFDGkcw4iqp5.svg", alt="Open in viewer button", width="24", height="24" %} **Save as Gist**. The first time you do this, a popup asks permission to access your basic GitHub data, and to read and write to your gists.

To export a report as a gist from the CLI version of Lighthouse, [manually create a gist](https://gist.github.com/) and copy-paste the report's JSON output into the gist. The gist filename containing the JSON output must end in `.lighthouse.report.json`. See [Share reports as JSON](#json) for an example of how to generate JSON output from the command line tool.

To view a report that's been saved as a gist:

* Add `?gist=<ID>` to the Viewer's URL, where `<ID>` is the ID of the gist.
    ```text
    https://googlechrome.github.io/lighthouse/viewer/?gist=<ID>
    ```
* Open the [Viewer](https://googlechrome.github.io/lighthouse/viewer/), and paste the URL of a gist into it.

## Lighthouse extensibility {: #extensibility }

Lighthouse aims to provide guidance that is relevant and actionable for all web developers. To this end, there are two features available that allow you to tailor Lighthouse to your specific needs.

### Stack Packs

Developers use many different technologies (backend/CMS/JavaScript frameworks) to build their web pages. Instead of only surfacing general recommendations, Lighthouse is now able to provide more relevant and actionable advice depending on the tools used.

"Stack Packs" allow Lighthouse to detect what platform your site is built on and display specific stack-based recommendations. These recommendations are defined and curated by experts from the community.

To contribute a Stack Pack, review the [Contributing Guidelines](https://github.com/GoogleChrome/lighthouse-stack-packs/blob/master/CONTRIBUTING.md).

### Lighthouse Plugins

Lighthouse Plugins allow domain experts to extend the functionality of Lighthouse for their community's specific needs. You are now able to leverage the data that Lighthouse collects to create new audits. At its core, a Lighthouse plugin is a node module that implements a set of checks that will be run by Lighthouse and added to the report as a new category.

For more information about how to create your own plugin, check out our [Plugin Handbook](https://github.com/GoogleChrome/lighthouse/blob/master/docs/plugins.md) in the Lighthouse GitHub repo.

## Integrate Lighthouse {: #integrate }

If you are a company or an individual who is integrating Lighthouse as part of the products / services you're offering, first things first - we're so excited you are! We want as many people as possible to use Lighthouse, and this [Guidelines and Brand Assets for Integrating Lighthouse](https://docs.google.com/document/d/e/2PACX-1vRWKW9RiB3suYt1KqgBJhwLnvV-AiFne8iAudADtwK-LWLNParYsFts92InHNtB_BV5x-xtSVcnTO2n/pub) is meant to make it straightforward for you to show that Lighthouse is under the hood while protecting our brand.

## Contribute to Lighthouse {: #contribute }

Lighthouse is open source and [contributions are welcome](https://github.com/GoogleChrome/lighthouse/blob/master/CONTRIBUTING.md)! Check out the repository's [issue tracker](https://github.com/GoogleChrome/lighthouse/issues) to find [bugs that you can fix](https://github.com/GoogleChrome/lighthouse/labels/good%20first%20issue), or audits that you can create or improve upon. The issues tracker is also a good place to discuss performance metrics, ideas for new audits, or anything else related to Lighthouse.

[desktop]: https://www.google.com/chrome/browser/desktop/
