The Privacy Sandbox team welcomes all feedback regarding the design,
implementation and effectiveness of the Topics API. You can join the discussion
and raise questions in the [issues for the Topics proposal](https://github.com/patcg-individual-drafts/topics/issues) on GitHub. You can also provide feedback via the
[Privacy Sandbox feedback form](https://docs.google.com/forms/d/e/1FAIpQLSePSeywmcwuxLFsttajiv7NOhND1WoYtKgNJYxw_AGR8LR1Dg/viewform).

Here are some specific areas where the Chrome team is seeking input from
testers and other stakeholders.

## Topics taxonomy

The [initial taxonomy](https://github.com/patcg-individual-drafts/topics/blob/main/taxonomy_v1.md)
for the web version of Topics includes around 350 topics across categories such
as "Arts & Entertainment," "Home & Garden," and "Travel & Transportation."
Although the list is human-curated to exclude explicitly sensitive topics, we
acknowledge that some topics may have unintended correlations to
sensitive topics. The eventual goal is for the taxonomy to be sourced from an
external party that incorporates feedback and ideas from across the ecosystem.

Some stakeholders have raised concerns that the taxonomy may not be granular
enough; some have suggested the taxonomy should account for regional and
country-level variations.

- [**What taxonomy should be used?**](https://github.com/patcg-individual-drafts/topics/issues/3)
Who should create and maintain it?
- [**What standard might be used to determine sensitive categories?**](https://github.com/patcg-individual-drafts/topics/issues/4) Further discussion [on the Topics explainer repo](https://github.com/patcg-individual-drafts/topics/issues/78).

## Website classification

Topics are inferred by Chrome, using a classifier model that maps site hostnames to topics. The
public can inspect the classifier—either by downloading it locally, using
[the Topics colab](https://colab.sandbox.google.com/drive/1hIVoz8bRCTpllYvads51MV7YS3zi3prn?usp=sharing),
or utilizing `chrome://topics-internals`. Some stakeholders have shared individual examples of
"miscategorized sites." Others have suggested that categorization at the hostname level does not
effectively assign topics for sites with diverse sets of content.

- [**Should sites be able to provide their own topics?**](https://github.com/patcg-individual-drafts/topics/issues/1) Further discussion [here](https://github.com/patcg-individual-drafts/topics/issues/50).
- [**What should happen if a site disagrees with the topics assigned to it by the browser?**](https://github.com/patcg-individual-drafts/topics/issues/2)
- [**Should the classifier consider additional data beyond hostname (for example, page URL, page content)?**](https://github.com/patcg-individual-drafts/topics/issues/17)

## Topics ranking

The top five topics for an [epoch](/docs/privacy-sandbox/topics-api/#how-does-the-topics-api-work)
are selected based on frequency. That is, the browser selects the five topics that appeared most
frequently in a user's browsing history for a given week. Some stakeholders have shared alternative
approaches to calculating the top topics, including variables such as inverse document frequency
(also known as TF-IDFA), a notion of commercial value by topics, and the frequency of advertising
landing pages on the web.

- [**What other variables should be considered when choosing the user's top topics?**](https://github.com/patcg-individual-drafts/topics/issues/42) How should those variables be weighted?