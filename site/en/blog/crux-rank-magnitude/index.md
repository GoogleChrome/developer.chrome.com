---
# Required
layout: 'layouts/blog-post.njk'

# Required
title: Adding Rank Magnitude to the CrUX Report in BigQuery


# Required
description: >
  Adding Rank Magnitude to the CrUX Report in BigQuery.

# Optional
# How to add a new author
# https://developer.chrome.com/docs/handbook/how-to/add-an-author/
authors:
  - johannes
  - tunetheweb

# Required
date: 2021-03-09

# Optional
# Include an updated date when you update your post
updated: 2022-11-08

# Optional
# How to add a new tag
# https://developer.chrome.com/docs/handbook/how-to/add-a-tag/
#tags:


---

Starting with the [February 2021 dataset](/docs/crux/release-notes/#202101), we’re adding an experimental metric to the [CrUX report in BigQuery](/docs/crux/bigquery/) which distinguishes the popularity of origins by orders of magnitude: The top 1k origins, top 10k, top 100k, top 1M, ...

Let’s see how this looks in practice:

```sql
SELECT
  experimental.popularity.rank AS rank_magnitude,
  COUNT(DISTINCT origin) AS num_origins
FROM
  `chrome-ux-report.all.202102`
GROUP BY
  rank_magnitude
ORDER BY
  rank_magnitude
```


<table>
  <thead>
    <tr>
      <th>Row</th>
      <th>rank_magnitude</th>
      <th>num_origins</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="text-align: right;">1</td>
      <td style="text-align: right;">1,000</td>
      <td style="text-align: right;">1,000</td>
    </tr>
    <tr>
      <td style="text-align: right;">2</td>
      <td style="text-align: right;">10,000</td>
      <td style="text-align: right;">9,000</td>
    </tr>
    <tr>
      <td style="text-align: right;">3</td>
      <td style="text-align: right;">100,000</td>
      <td style="text-align: right;">90,000</td>
    </tr>
    <tr>
      <td style="text-align: right;">4</td>
      <td style="text-align: right;">1,000,000</td>
      <td style="text-align: right;">900,000</td>
    </tr>
    <tr>
      <td style="text-align: right;">15</td>
      <td style="text-align: right;">10,000,000</td>
      <td style="text-align: right;">7,264,371</td>
    </tr>
  </tbody>
</table>

For the February 2021 global data set, we get 5 buckets. As expected, in row 1,
we see that there are 1000 origins with rank magnitude 1000 - the 1k most
popular origins by our metric. Row 2 may look surprising, indicating that there
are only 9k origins in the top 10k set; this is because the origins in row 1 are
also part of the top 10k set. To select the top 10k origins, one needs to
specify experimental.popularity.rank <= 10000 when querying.

The dataset also contains country specific rank magnitude. For example, this
query lists the 10k origins that are most popular in Germany.


```sql
SELECT DISTINCT origin
FROM `chrome-ux-report.country_de.202102`
WHERE experimental.popularity.rank <= 10000
```

To touch on the potential of our new popularity metric, let’s see how popularity
segments of the web differ with respect to the [first contentful paint metric
(FCP)](https://web.dev/first-contentful-paint/). For the purpose of this query,
we consider 1 second a fast user experience.

```sql
SELECT
  SUM(fcp.density)/count(distinct origin)
FROM
  `chrome-ux-report.all.202102`,
  UNNEST(first_contentful_paint.histogram.bin) AS fcp
WHERE
  fcp.start < 1000 AND experimental.popularity.rank <= 1000
```

For the origins with experimental.popularity.rank <= 1000, the query sums all
histogram bucket densities for FCP metric values smaller than 1000ms and divides
it by the number of origins - that is, it calculates the average percentage of
fast FCP loads for the 1k most popular origins. In this query, all origins have
equal weight, so arguably this is not perfect. But let’s see whether the result
is sensitive to changing the rank magnitude, by altering the where clause to
specify experimental.popularity.rank <= 10000. We do this for 10k, 100k, and so
on:

<table>
  <thead>
    <tr>
      <th>Rank magnitude of origins</th>
      <th>Percentage of FCP < 1s, averaged over origins</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="text-align: right;">1.000 </td>
      <td style="text-align: right;">53.6%</td>
    </tr>
    <tr>
      <td style="text-align: right;">10,000</td>
      <td style="text-align: right;">49.6%</td>
    </tr>
    <tr>
      <td style="text-align: right;">100,000</td>
      <td style="text-align: right;">45.9%</td>
    </tr>
    <tr>
      <td style="text-align: right;">1,000,000 </td>
      <td style="text-align: right;">43.2% </td>
    </tr>
    <tr>
      <td style="text-align: right;">10,000,000</td>
      <td style="text-align: right;">39.9%</td>
    </tr>
  </tbody>
</table>

This indicates that a faster user experience on the web is correlated with being more popular.

In the [October 2022 dataset](/docs/crux/release-notes/#202210) this was further split out by half-rank steps. Rerunning the first query for this dataset shows the half-steps and the number of origins in each rank magnitude::

```sql
SELECT
  experimental.popularity.rank AS rank_magnitude,
  COUNT(DISTINCT origin) AS num_origins
FROM
  `chrome-ux-report.all.202210`
GROUP BY
  rank_magnitude
ORDER BY
  rank_magnitude
```

<table>
  <thead>
    <tr>
      <th>Row</th>
      <th>rank_magnitude</th>
      <th>num_origins</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="text-align: right;">1</td>
      <td style="text-align: right;">1,000</td>
      <td style="text-align: right;">1,000</td>
    </tr>
    <tr>
      <td style="text-align: right;">2</td>
      <td style="text-align: right;">5,000</td>
      <td style="text-align: right;">4,000</td>
    </tr>
    <tr>
      <td style="text-align: right;">3</td>
      <td style="text-align: right;">10,000</td>
      <td style="text-align: right;">5,000</td>
    </tr>
    <tr>
      <td style="text-align: right;">4</td>
      <td style="text-align: right;">50,000</td>
      <td style="text-align: right;">40,000</td>
    </tr>
    <tr>
      <td style="text-align: right;">5</td>
      <td style="text-align: right;">100,000</td>
      <td style="text-align: right;">50,000</td>
    </tr>
    <tr>
      <td style="text-align: right;">6</td>
      <td style="text-align: right;">500,000</td>
      <td style="text-align: right;">400,000</td>
    </tr>
    <tr>
      <td style="text-align: right;">7</td>
      <td style="text-align: right;">1,000,000</td>
      <td style="text-align: right;">500,000</td>
    </tr>
    <tr>
      <td style="text-align: right;">8</td>
      <td style="text-align: right;">5,000,000</td>
      <td style="text-align: right;">4,000,000</td>
    </tr>
    <tr>
      <td style="text-align: right;">9</td>
      <td style="text-align: right;">10,000,000</td>
      <td style="text-align: right;">5,000,000</td>
    </tr>
    <tr>
      <td style="text-align: right;">10</td>
      <td style="text-align: right;">50,000,000</td>
      <td style="text-align: right;">7,637,195</td>
    </tr>
  </tbody>
</table>


Learn more about [using CrUX on BigQuery](/docs/crux/bigquery/) and [browse the CrUX Cookbook](https://github.com/GoogleChrome/CrUX/tree/main/sql) for more example queries. Share your queries if you like, and let us know what you find.

