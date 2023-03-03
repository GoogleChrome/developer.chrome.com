---
layout: 'layouts/doc-post.njk'
title: 'Topics API: developer guide'
subhead: >
  Try out the Topics demo, and learn about the API and how to run Topics with flags or participate in an origin trial.
description: >
  Try out the Topics demo, and learn about the API and how to run Topics with flags or participate in an origin trial.
date: 2022-01-25
updated: 2022-02-01
authors:
  - samdutton
---

## Test topic inference in a colab

A colab—or colaboratory—is a data analysis tool that combines code, output, and descriptive text into one collaborative document. You can run the [Topics Model Execution Demo colab](https://colab.research.google.com/drive/1hIVoz8bRCTpllYvads51MV7YS3zi3prn) to test how the Topics classifier model infers topics of interest to the user, from the hostnames of pages they visit.

1.  From the **Classifier** tab of the `chrome://topics-internals` page get the directory path for the `.tflite` file used by the Topics API. The [override list](/docs/privacy-sandbox/topics/#manually-curated) `.pb.gz` file is in the same directory.

![image](insert_image_url_here)

1.  Open the [colab](https://colab.research.google.com/drive/1hIVoz8bRCTpllYvads51MV7YS3zi3prn) and click on the folder icon.

![image](insert_image_url_here)

1.  Click the Upload icon and upload `model.tflite` and `override_list.pb.gz` from your computer to the colab.

![image](insert_image_url_here)

You can then run all the colab steps, by selecting **Run all** from the **Runtime** menu.

![image](insert_image_url_here)

This does the following:

1.  Install the Python packages used by the colab.
1.  Install the `tflite` libraries and the Topics taxonomy.
1.  Define the taxonomy.
1.  Run each of the Model Execution Demo steps to show how classification works for two example domains.

You'll see a green tick next to each step that completes successfully. (Each step can also be run individually, by clicking the Play button next to it.)

For each of the domains defined, you can see the topic scores inferred by the classifier. Try listing different domains to see how they compare.

Caution

For some domains you may notice a difference in topic inference, between the colab and the `chrome://topics-internals` Classifier.

This is because the colab only uses the classifier model to infer topics, whereas `chrome://topics-internals` uses Chrome's Topics implementation, which uses a [manually-curated list of topics](/docs/privacy-sandbox/topics/#manually-curated) (rather than the classifier model) for the top 10,000 sites.