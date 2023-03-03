---
layout: 'layouts/doc-post.njk'
title: 'Test topic inference in a colab'
subhead: >
  Try out the Topics demo, and learn about the API and how to run Topics with flags or participate in an origin trial.
description: >
  Try out the Topics demo, and learn about the API and how to run Topics with flags or participate in an origin trial.
date: 2022-01-25
updated: 2022-02-01
authors:
  - samdutton
---


A colab—or colaboratory—is a data analysis tool that combines code, output, and descriptive text into one collaborative document. You can run the [Topics Model Execution Demo colab](https://colab.research.google.com/drive/1hIVoz8bRCTpllYvads51MV7YS3zi3prn) to test how the Topics classifier model infers topics of interest to the user, from the hostnames of pages they visit.

1. From the *Classifier* tab of the `chrome://topics-internals` page get the directory path for the `.tflite` file used by the Topics API. The [override list](/docs/privacy-sandbox/topics/#manually-curated) `.pb.gz` file is in the same directory.

    {% Img src="image/80mq7dk16vVEg8BBhsVe42n6zn82/txujKqPgnQdbwmTfdPZT.png",
  alt="chrome://topics-internal page with Classifier panel selected and tflite file path highlighted.",
  width="800", height="696" %}

1. Open the [colab](https://colab.research.google.com/drive/1hIVoz8bRCTpllYvads51MV7YS3zi3prn) and click on the folder icon.

    {% Img src="image/80mq7dk16vVEg8BBhsVe42n6zn82/FcBRhBOyLm2EEU1J4ET0.png",
  alt="Topics API colab.", width="800", height="605" %}

1. Click the Upload icon and upload `model.tflite` and `override_list.pb.gz` from your computer to the colab.

    {% Img src="image/80mq7dk16vVEg8BBhsVe42n6zn82/8PiaYhdpKUx5hyMNcVwG.png",
  alt="Topics API colab file upload.", width="800", height="402" %}

1. You can then run all the colab steps, by selecting **Run all** from the **Runtime** menu.

    {% Img src="image/80mq7dk16vVEg8BBhsVe42n6zn82/gP8GmUH2xiwbEz27LbjO.png",
  alt="Topics API colab page, 'Run all' selected form the Runtime menu.", width="800", height="605" %}

This does the following:

1.  Installs the Python packages used by the colab.
1.  Installs the `tflite` libraries and the Topics taxonomy.
1.  Defines the taxonomy.
1.  Runs each of the Model Execution Demo steps to show how classification works for two example domains.

You'll see a green tick next to each step that completes successfully. (Each step can also be run individually, by clicking the **Play** button next to it.)

For each of the domains defined, you can see the topic scores inferred by the classifier. Try listing different domains to see how they compare.

{% Aside 'caution' %}
For some domains you may notice a difference in topic inference, between the colab and the `chrome://topics-internals` Classifier.

This is because the colab only uses the classifier model to infer topics, whereas
`chrome://topics-internals` uses Chrome's Topics implementation, which uses a
[manually-curated list of topics](/docs/privacy-sandbox/topics/#manually-curated) (rather than the classifier model) for the top
10,000 sites. <!-- will need to link to topic-classification page -->
{% endAside %}

