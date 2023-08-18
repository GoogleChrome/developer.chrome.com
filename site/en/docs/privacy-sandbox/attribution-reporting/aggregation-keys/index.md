---
layout: 'layouts/doc-post.njk'
title: 'All about aggregation keys'
subhead: >
  What aggregation keys are and how they're used.
description: >
  What aggregation keys are and how they're used.
date: 2022-12-15
updated: 2023-08-25
authors:
  - maudn
---


Output
![image](insert_image_url_here)

## How does using summary reports differ from using cookie-based measurement techniques?

The Attribution Reporting API differs from cookie-based measurement techniques in [several ways](https://docs.google.com/document/d/1lvrKd5Vv7SYLMGZb0Fz7bpGNEl0LOx9i1waAHw2sUg8/edit#heading=h.ktl1cq7bdlk). This will impact your approach to measurement for all types of reports (event-level reports and aggregatable/summary reports). 

Additionally, aggregatable/summary reports have a few specificities that have two concrete implications for you:

-   Define metrics up front
-   Account for noise

### Define metrics up front

With today's cookie-based measurement systems, ad view or click and conversion data are captured in real time, stored at a user level, and merged and analyzed later. Metrics can be defined after data has been collected.

With the Attribution Reporting API's aggregatable/summary reports, in order to preserve user privacy, not every single data point of an ad engagement and subsequent conversion can be measured. Therefore, the API user—typically, an adtech company—must define up-front before ad-serving time what information to measure.

### Account for noise

Noise added to metrics can impact the accuracy of your measurement data in minimal or significant ways, and should be taken into account as you prepare to use the API.** **

See details in [Understand noise](https://docs.google.com/document/d/1bU0a_njpDcRd9vDR0AJjwJjrf3Or8vAzyfuK8JZDEfo/edit#heading=h.kj4nmyyptm5).

## Essential notions

Now that we've introduced summary reports and how they compare to cookie-based techniques, we can dive into the specifics—but before we do so, you need to become familiar with a few essential notions for this API.

### Context

To introduce these essential notions, we'll use the following example:

As an adtech company running campaigns in multiple locations for various product categories, you're looking to help advertisers answer the following questions:

1.  How many ***purchases*** of each *product category* did each of my *campaigns* in each *geographic region* generate?
1.  How much ***revenue*** for each *product category* did each of my *campaigns* in each *geographic region* generate?

While many adtech companies encourage advertisers to configure a variety of conversion types, focusing on the most important conversions such as purchases is a good way to ensure that summary results are detailed and accurate for these important events.

You will need to think of what questions you are looking to answer before data is collected.

### Dimensions, keys and values

#### Dimensions

To answer the questions outlined above, you want to track the following *dimensions*:

-   Ad campaign ID
-   Geography ID: the geographic region where the ad was served
-   Product category

While the Campaign ID and the Geography ID dimensions are known when the ad is served at *ad-serving time*, the Product category will be known from a trigger event, when the user completes a conversion, that is, at *conversion time*.

{% Aside %}
For this example and in the rest of this document, we'll display dimensions as follows:

- Dimensions known at ad-serving time on a green background.
- Dimensions known at conversion time on a <u>yellow background and underlined.
{% endAside %}

With this, the dimensions you want to track for this example look as follows:

{% Img src="image/RtQlPaM9wdhEJGVKR8boMPkWf443/7H0FNCjZM9zr3VE48Q2G.png", alt="ALT_TEXT_HERE", width="498", height="55" %}

#### Aggregation keys (buckets): definition

Aggregation key and bucket refer to the same thing.<br>
The term _aggregation key_ is used in the browser APIs used to configure reports.<br>
The term _bucket_ is used in the aggregatable and summary reports, and in the aggregation service APIs.

An *aggregation key* (*key* for short) is a piece of data that represents the values of the dimensions being tracked. Data is later aggregated along each aggregation key.

For example, let's assume you're tracking the dimensions Product category, Geography ID and Campaign ID.

When a user located in Geography ID 7 sees an ad for Campaign ID 12, and later converts by purchasing a product of Product category 25, you may set an aggregation key that looks as follows:

{% Img src="image/RtQlPaM9wdhEJGVKR8boMPkWf443/dmpyjw7KIcunQemDqs8i.png", alt="ALT_TEXT_HERE", width="495", height="125" %}

You'll see later that an aggregation key does not look *exactly* like this in practice, but for now let's focus on the information contained in the key.

#### Aggregatable values: definition

To answer your questions with the dimensions we've outlined, you want to know, across many users and many keys:

-   The number of purchases (the purchase count). Once aggregated and made available in a summary report, this will be the total purchase count (*summary value*).
-   The revenue for each purchase (the purchase value). Once aggregated and made available in a summary report, this will be the total revenue (*summary value*).

Each of these—the purchase count for one conversion and the purchase value for one conversion—is an *aggregatable value*. You can think of aggregatable values as the values of your measurement goals.

<table class="with-heading-tint">
	<thead>
		<tr><th rowspan="2">Question</th>
			<th rowspan="2">Aggregatable value = Measurement goal
			</th></tr>
		</thead>
		<tbody>
			<tr>
                <td>How many 
					<strong>purchases</strong>…</td>
				<td>
					<strong>Purchase count</strong></td>
			</tr>
			<tr>
				<td>How much <strong>revenue</strong>…</td>
				<td><strong>Purchase value</strong></td>
			</tr>
		</tbody>
	</table>

When a user located in Geography ID 7 sees an ad for Campaign ID 12, and later converts by purchasing a product of Product category 25 for $120, you may set an aggregation key and aggregatable values that look as follows:

{% Img src="image/RtQlPaM9wdhEJGVKR8boMPkWf443/b5Mu1k7bH5wg3aAFrAGs.png", alt="ALT_TEXT_HERE", width="658", height="251" %}

Aggregatable values are summed per key across many users to generate aggregated insights, in the form of summary values in summary reports.

![image](insert_image_url_here)

Aggregatable values are summed to generate aggregated insights for your measurement goals.

*This diagram omits decryption and represents a simplified example without noise applied. In the next section, we will outline this example with noise.

### From {aggregation key, aggregatable value} pairs to reports

#### Aggregatable reports

When a user clicks or views an ad and later converts, you instruct the browser to store an {aggregation key, aggregatable value} pair.

<table class="with-heading-tint">
  <thead>
    <tr>
      <th>In the <a href="https://github.com/WICG/conversion-measurement-api/blob/main/AGGREGATE.md">explainer</a>, an {aggregation key, aggregatable value} pair is also called a <em>histogram contribution</em>: it represents how this conversion—and the dimensions and values associated with it—<em>contributes</em> to the summary report.</th>
    </tr>
  </thead>
  <tbody>
  </tbody>
</table>

In our example, when a user clicks or views an ad and later converts, you would instruct the browser to generate two contributions (one per measurement goal).

![image](insert_image_url_here)

You'll see later in this document that an {aggregation key, aggregatable value} aggregatable report does not look *exactly* like this—but for now let's focus on the information contained in the report.

When you instruct the browser to generate two contributions, the browser generates an aggregatable report (if it can [match](https://docs.google.com/document/d/1lvrKd5Vv7SYLMGZb0Fz7bpGNEl0LOx9i1waAHw2sUg8/edit#heading=h.z3eyiewn6zcw) the conversion with a previous view or click).

An aggregatable report contains:

-   The contribution(s) you've configured.
-   Metadata about the click/view event and the conversion event: the site where the conversion occurred, and more. [See all the fields in an aggregatable report](https://github.com/WICG/conversion-measurement-api/blob/main/AGGREGATE.md#aggregatable-reports).

![image](insert_image_url_here)

Aggregatable reports are JSON-formatted and include among others a *payload* field that will be used as a data input for the final summary report.

The payload contains a list of contributions, each one being an {aggregation key, aggregatable value} pair:

-   *bucket*: the aggregation key, encoded as a bytestring.
-   *value*: the aggregatable value for that measurement goal, encoded as a bytestring.

{% Aside %}
Aggregation key and bucketrefer to the same thing.

The term aggregation key is used in the browser APIs to configure reports.

The term bucket is used in the aggregatable and summary reports, and in the aggregation service APIs.
{% endAside %}

Example:

```json
{
  "data": [
    {
      "bucket": "111001001",
      "value": "11111010000",
    }
  ],
  "operation": "histogram"
}
```

In practice, aggregatable reports are encoded in a way that will make buckets and values look different than stated above (that is, a bucket may look like `\u0000\u0000\x80\u0000`). <em>Bucket</em> and <em>value</em> are both bytestrings.

#### Summary reports

Aggregatable reports are aggregated across many browsers/devices (users) as follows:

-   An adtech requests summary reports for a given set of keys, and a given set of aggregatable reports that come from many different browsers (users).
-   Aggregatable reports are decrypted by the aggregation service.
-   For each key, the aggregatable values from the aggregatable reports are summed.
-   Noise is added to the summary value.

![image](insert_image_url_here)

The result is a summary report that contains a set of {aggregation key, summary value} pairs.

A summary report contains a JSON dictionary-style set of key-value pairs. Each pair contains:

-   *bucket*: the aggregation key, encoded as a bytestring.
-   *value*: the summary value in decimal for a given measurement goal, summed up from all available aggregatable reports, with an added level of noise.

Example:

```json
[
{"bucket": "111001001", "value": "2558500"}, 
{"bucket": "111101001", "value": "3256211"}, 
{...}
]
```

In practice, summary reports are encoded in a way that will make buckets and values look different than stated above (that is, a bucket may look like `\u0000\u0000\x80\u0000`). <em>Bucket</em> and <em>value</em> are both bytestrings. 

### Aggregation keys in practice

Aggregation keys are defined by an adtech company, typically in two steps: when an ad is clicked or viewed, and when a user converts.

{% Aside }
Bucket and aggregation key refer to the same thing.
{% endAside %}

#### Key structure

We'll use the term *key structure* to designate the set of dimensions encoded into a key.

Example:

Campaign ID x GeoID x Product category is a key structure.

{% Img src="image/RtQlPaM9wdhEJGVKR8boMPkWf443/6xi8Qd9BrECKS4eGBTxI.png", alt="Key structure.", width="539", height="57" %}

#### Key types

Aggregatable values are summed for a given key across multiple users/browsers.

But we've seen that aggregatable values can track different measurement goals, such as a purchase value or a purchase count.

You want to ensure that the aggregation service will sum aggregatable values of the same type.

To do so, within each key, encode a piece of data that tells you what the summary value represents— the measurement goal this key is referring to.

One way to do that is  to create an additional dimension for your key that represents the *measurement goal type*.

Using our earlier example above, this *measurement goal type* would have two different possible values:

-   **Purchase count** is the first type of measurement goal.
-   **Purchase value** is the second type of measurement goal.

![image](insert_image_url_here)

If you had *n* measurement goals, the measurement goal type would have *n* different types of values.

With this, you can think of a key's dimensions as a metric. For example, "the number of **purchases** of a certain product per campaign per geography".

#### Key size, dimension size

The maximum key size is defined in bits—the number of zeros and ones in binary to create the full key. The API allows for a key length of **128 bits**. 

This size allows for very granular keys, but more granular keys are more likely to lead to more noisy values—more details in [Understand noise](/docs/privacy-sandbox/attribution-reporting/understanding-noise/).

As introduced earlier, dimensions are encoded into the aggregation key.

Each dimension has a certain *cardinality*—that is, the number of distinct values the dimension can take. Depending on its cardinality, each dimension needs to be represented by a certain number of bits. With n bits, it is possible to express **2n** distinct options.

Example: 

A Country dimension may have a cardinality of 200, as there are about 200 countries in the world. How many bits are needed to encode this dimension?

7 bits would only store **27** =128 distinct options < 200. This is not enough.

8 bits would store **28** =256 distinct options > 200. This is enough, so you can pick n=8 bits to encode this dimension.

#### Key encoding

When you set keys in the browser, they should be encoded in hexadecimal. 

In summary reports, keys will appear in binary (and be named *buckets*).

<table class="with-heading-tint">
  <thead>
    <tr>
      <th>Hexadecimal data is typically prefixed with 0x ("x" for hexadecimal).<br>
Example: 0x19 means "19 in hexadecimal", that is 25 in decimal (not 19).<br>
<br>
Binary numbers are typically prefixed with 0b<em> </em>("b" for binary), to differentiate them from decimal numbers.<br>
Example: 0b11001 means "11001 in binary", that is 25 in decimal (not 11,001).</th>
    </tr>
  </thead>
  <tbody>
  </tbody>
</table>

#### Set two keys pieces for a full key

Let's assume you use a key to track the following dimensions:

-   Campaign ID
-   Geography ID
-   Product category

While the Campaign ID and the Geography ID dimensions are known when the ad is served—at *ad-serving time*—, the product category will be known from a trigger event, when the user completes a conversion—at *conversion time*. 

In practice, this means you will set a key in two steps:

1.  You set one part of the key—Campaign ID x Geography ID—at click/view time.
1.  You set the second part of the key—Product category—at conversion time.

These different parts of the keys are called*** **key pieces*.

A key is calculated by taking the **XOR (|)** of its key pieces.

![image](insert_image_url_here)

Example:

-   Source-side key piece = `0x159`
-   Trigger-side key piece = `0x400`
-   Key = `0x159`** | `**0x400` = `0x559`

#### Aligning key pieces

With two 64-bit key pieces extended to 128 bits using carefully placed 64-bits fillers/offsets (the sixteen zeros), XOR-ing key pieces is equivalent to concatenating them, which is easier to reason with and verify:

-   Source-side key piece = `0x**a7e297e7c8c8d054**0000000000000000`
-   Trigger-side key piece = `0x0000000000000000**674fbe308a597271`**
-   Key =
    -   `0x**a7e297e7c8c8d054**0000000000000000`** | `**0x0000000000000000**674fbe308a597271`** =
    -   `0x**a7e297e7c8c8d054674fbe308a597271`**

#### Multiple keys per ad click or view

In practice, you may set multiple keys per attribution source event (ad click or view). 

For example, you may set:

-   A key that tracks Geography ID x Campaign ID.
-   Another key that tracks Creative Type x Campaign ID.

Take a look at [Strategy B](https://docs.google.com/document/d/1bU0a_njpDcRd9vDR0AJjwJjrf3Or8vAzyfuK8JZDEfo/edit#heading=h.ks4scs8lgie2) for another example.

#### Encoding dimensions into keys

When requesting summary reports, you need to tell the aggregation service what metrics you want to access, by requesting summary reports for a certain set of aggregation keys.

Summary reports contain raw {key, summary value} pairs, and no additional information about the key.

This means that:

-   When setting keys as the user views/clicks an ad and later converts, you need to reliably set keys based on the values of the dimensions they represent.
-   When defining the keys you want to request summary reports for, you need to reliably generate or access on the fly the same keys as the keys set when the user viewed/clicked an ad and converted, based on the values of the dimensions you want to see aggregated data for.

#### Encoding dimensions into keys, approach 1: key structure maps

To encode dimensions into keys, you can create and maintain a *key structure map *ahead of time, upon defining your keys (before ad-serving time). 

A *key structure map* represents each of your dimensions and their position in the key.

In practice, creating and maintaining key structure maps means you have to implement and maintain decoder logic. If you're looking for a method that doesn't require you to do that, consider using a [hash-based approach](#heading=h.6q2omygul77r) instead.

Example:

Let's assume that you plan on tracking both purchases and purchase values for specific campaigns, geographic regions, and products.

The product category, geography ID, and campaign ID need to be dimensions in your keys. Additionally, because you want to track two different measurement goals—purchase count and purchase value—you need to add one dimension within your key that keeps track of the [key type](#heading=h.ezh88ewhh5h4). This will allow you to define what the aggregatable value actually represents upon receiving {key, aggregatable value} pairs in summary reports.

With this, your key has the following dimensions:

-   Product category
-   Measurement goal type
-   Geography ID
-   Campaign ID

Now, looking at each dimension, let's consider for your use case that you need to track the following:

-   29 different products categories.
-   8 different geographic regions: North America, Central America, South America, Europe, Africa, Asia, Caribbean, and Oceania.
-   16 different campaigns.

Let's look at how many bits you would need to encode each dimension within your key:

-   Product category: 5 bits (2**5** = 32 > 29)
-   Measurement goal type: 1 bit. The measurement goal is either purchase count or purchase value, that means two distinct possibilities; therefore, one bit is sufficient to store this.
-   Geography ID: 3 bits (2**3** = 8). You would also define a dimension map for the Geography ID, in order to know what geographic regions each binary value represents. Your dimension map for your Geography ID dimension may look as follows:
<table class="with-heading-tint">
  <thead>
    <tr>
      <th></th>
      <th>Binary value in the key</th>
      <th>Geography</th>
    </tr>
  </thead>
  <tbody>
    <tr>
     <td>8 values in total</td>
      <td><p><pre>
000
</pre></p></td>
      <td>North America</td>
    </tr>
    <tr>
      <td><p><pre>
001
</pre></p></td>
      <td>Central America</td>
    </tr>
    <tr>
      <td><p><pre>
010
</pre></p></td>
      <td>South America</td>
    </tr>
    <tr>
      <td><p><pre>
011
</pre></p></td>
      <td>Europe</td>
    </tr>
    <tr>
      <td><p><pre>
100
</pre></p></td>
      <td>Africa</td>
    </tr>
    <tr>
      <td><p><pre>
101
</pre></p></td>
      <td>Asia</td>
    </tr>
    <tr>
      <td><p><pre>
110
</pre></p></td>
      <td>Caribbean</td>
    </tr>
    <tr>
      <td><p><pre>
111
</pre></p></td>
      <td>Oceania</td>
    </tr>
  </tbody>
</table>

-   Campaign ID: 4 bits (2**4** = 16)

Keys following this structure would be **13-bit long **(5 + 1 + 3 + 4).

With this, the key structure map for these keys would look as follows:

{% Img src="image/RtQlPaM9wdhEJGVKR8boMPkWf443/rja74M29VmZIaii9epxl.png", alt="Key structure map.", width="709", height="261" %}

The order of the dimensions within the key is up to you.

To illustrate how dimensions make up a key structure, we'll be using a binary representation, which is why the Campaign ID (first bits) is the rightmost one, and the product category (last bits) is the leftmost one.

Within each dimension, the most significant bit—the one that carries the greatest numerical value—is the leftmost bit. The least significant bit—the one that carries the smallest numerical value—is the rightmost bit.

Let's see how you would use a key structure map to decode a key.

Let's take 0b1100100111100 as an arbitrary example key, and let's assume you have a way to know that this key follows the key structure map above.

According to the key structure map, this key would decode into:

```
11001 0 011 1100
```

Namely:

-   Product category = Bits 8-12 = `0b11001` (binary) = 25 (decimal)

> ⇒ Product category = 25

-   Measurement goal type = Bit 7 = `0b0` (binary)

> ⇒ Measurement goal type = Purchase count (if as per your dimension map, 0 means "purchase count" and 1 means "purchase value".)

-   Geo ID = Bits 4-6 = `0b011` (binary)

> ⇒ Geo ID = Europe (as per the dimension map above))

-   Campaign ID = Bits 0-3 = `0b1100` (binary) = 12 (decimal)

> ⇒ Campaign ID = 12

So the key 0b1100100111100 represents the number of purchases of Product category 25, for the Campaign ID 12 launched in Europe.

#### Encoding dimensions into keys, approach 2: hash function

With this technique, you rely on a hashing function to dynamically generate keys in a consistent and reliable way.

There's no need to create or maintain key structure maps.

This works as follows:
<ol>
<li>Select a hashing algorithm.</li>
<li>At ad-serving time, generate a string that includes all the dimensions you want to track, and their values. To generate the source-side key piece, hash this string and consider adding a 64-bit suffix of zeros (to [align](#heading=h.2xob5s4sb398) it with the trigger-side key piece and make XOR easier to reason about).<br>
Source-side key piece:

<pre><64-bit hex hash("COUNT, campaignID=12, geoID=7"))>
  <64-bit 00000000…>
</pre>

Note that COUNT encodes the same thing as measurementGoalType=0 in the key structure map approach. COUNT is a bit leaner and more explicit.</li>
<li>
At conversion time, generate a string that includes all the dimensions you want to track, and their values. To generate a trigger-side key piece, hash this string and add a 64-bit prefix of zeros:

<br>Trigger-side key piece:
      
<pre><64-bit 00000000…>
       <64-bit hex hash("productCategory=25")>
</pre>

The browser XORs these key pieces to generate a key.<br>
128-bit aggregation key:

<pre><64-bit hex source-side key piece hash>
       <64-bit hex source-side key piece hash>
</pre>
</li>
<li>Later, when you're ready to request a summary report for this key, generate it on the fly. 
Based on the dimensions you're interested in, generate a source-side and trigger-side key piece as you did earlier.<br>
Source-side key piece:

<pre><64-bit hex hash("COUNT, campaignID=12, geoID=7"))>
  <64-bit 00000000…>
</pre>

Trigger-side key piece:<br>

<pre><64-bit 00000000…>
  <64-bit hex hash("productCategory=25")>
</pre>

trigger-side key piece=
<code>toHex(hash("productCategory=25"))</code>
<br>
Just like the browser, XOR these key pieces to generate the same key the browser has generated earlier.
 <br>128-bit aggregation key:

<pre><64-bit source-side key piece hash>
  <64-bit source-side key piece hash>
</pre>
</li>
</ol>

A few practical tips if you're using this hash-based approach:

-   **Ensure you're always using the same ordering of the dimensions**. This ensures that your hashes can be reliably regenerated. ("COUNT, CampaignID=12, GeoID=7" will not generate the same hash as "COUNT, GeoID=7, CampaignID=12"). One straightforward way to achieve this is to sort dimensions alphanumerically. This is what we'll be doing in the [example](https://docs.google.com/document/d/1bU0a_njpDcRd9vDR0AJjwJjrf3Or8vAzyfuK8JZDEfo/edit#heading=h.i6ovl4dm1npa), except for the fact that we'll always make COUNT or VALUE the first item in the dimension—this is a choice for readability, as COUNT or VALUE encodes information that's slightly different conceptually than all other dimensions.
-   **Keep track of the set of dimensions you're using in keys. **You want to avoid generating keys based on a set of dimensions that you've never used.
-   **Hash collisions are rare** if a suitable hash function is used, but checking against previously used hashes (which should be stored to interpret the results from the aggregation service) can avoid introducing new keys that collide with older keys.

See how to use hash-based keys in practice in the [example](https://docs.google.com/document/d/1bU0a_njpDcRd9vDR0AJjwJjrf3Or8vAzyfuK8JZDEfo/edit#heading=h.i6ovl4dm1npa).

### Aggregatable values in practice

The adtech company sets aggregatable values when a user converts.

#### Contribution budget

To protect user privacy, individual users' contributions must have an upper limit.

In practice, this works as follows: across all aggregatable values associated with a single source (ad click or view), no value can be higher than a certain *contribution budget*. 

We'll refer to it as `CONTRIBUTION_BUDGET`.

<table class="with-heading-tint">
  <thead>
    <tr>
      <th>In the <a href="https://github.com/WICG/conversion-measurement-api/blob/main/AGGREGATE.md">explainer</a>, this is referred to as the <em>L1 budget</em>.<br>
L1 budget = <code>CONTRIBUTION_BUDGET</code>.</th>
    </tr>
  </thead>
  <tbody>
  </tbody>
</table>

For the current origin trial (started in Chrome 101), `CONTRIBUTION_BUDGET` = 216 = 65,536.

The value of the contribution budget is arbitrary. What's important is that **you can** **use this budget to maximize signal-to-noise ratio on the summary values**.

The contribution budget applies across all metrics on a single source event (ad click or view event). The sum of all aggregatable values associated with the conversion(s) attributed to a given ad click or view (source) should be under the budget.

The contribution budget is a hard cap. Once the contribution budget is reached, no additional values are recorded.

This has a few practical implications, for example:

-   For the same ad click or view (source), the sum of all aggregatable values across all conversions should be at most 65,536 (`CONTRIBUTION_BUDGET`). If, for a given ad click or view, all the contribution budget is spent on the first five conversions, and a sixth conversion happens, that one won't generate a report.
-   For a single conversion event (trigger), the adtech company can register an aggregatable value of at most 65,536 (`CONTRIBUTION_BUDGET`). If the aggregatable value for that single conversion exceeds this budget, the aggregatable report is not created.
-   For a single conversion event (trigger), the adtech company can register multiple aggregatable values, and their sum should be at most 65,536 (`CONTRIBUTION_BUDGET`). If the sum of all aggregatable values for that single conversion exceeds this budget, the aggregatable report is not created.

#### Practical implications of the contribution budget

This has a few practical implications:

-   **Ensure your values are strictly within the contribution budget  to not lose any information**, since the budget is a hard cap.
-   **Allocate the contribution budget across metrics**. Because the budget is common to all metrics for a given source, if more than one metric is tracked, you should share the budget across these metrics.

Example: If you're tracking two metrics—for example, the purchase value and the purchase count—you would split the contribution budget across these two metrics. More details in the [example](https://docs.google.com/document/d/1bU0a_njpDcRd9vDR0AJjwJjrf3Or8vAzyfuK8JZDEfo/edit#heading=h.i6ovl4dm1npa).

-   **Adjust aggregatable values to minimize the impact of noise.** Because the contribution budget impacts noise, adjusting the aggregatable values to this budget will allow you to improve signal-to-noise ratio. Read the details in [Scale up to contribution budget](https://docs.google.com/document/d/1bU0a_njpDcRd9vDR0AJjwJjrf3Or8vAzyfuK8JZDEfo/edit#heading=h.683u7t2q1xk2).







### Translate goals into keys

With your measurement goals and metrics, you have a number of options for your
key strategy. Let's focus on two of these strategies:

-   Strategy A: one granular key structure
-   Strategy B: two coarse key structures

#### Strategy A: one deep tree (one granular key structure)

In strategy A, you use one granular key structure, that includes all the
dimensions you need:

{% Img src="image/RtQlPaM9wdhEJGVKR8boMPkWf443/L0ToNPnSf4W1hR2jQDpq.png", alt="ALT_TEXT_HERE", width="674", height="65" %}

All your keys use this structure. \
You split this key structure into two key types to support two measurement
goals.

-   Key type 0: measurement goal type = 0, which you decide to define as a
    **purchase count**
-   Key type 1: measurement goal type = 1, which you decide to define as a
    **purchase value**

Summary reports look as follows:

![image](untitleddocume--cns7y67lqht.png)

You can think of strategy A as a "one deep tree" strategy:

-   Each summary value in summary reports is associated to all of the
    dimensions you're tracking.
-   You can roll up these summary values alongside each of these dimensions,
    so these rollups can go as deep as the numbers of dimensions you have.

With strategy A, you would answer your questions as follows:

<table class="with-heading-tint">
  <thead>
    <tr>
      <th>Question</th>
      <th>Answer</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><ol>
<li>Which product categories are the most valuable in each region?</li>
</ol>
</td>
      <td>Sum the summary purchase counts and values that are in the summary
reports, across all campaigns.<br>
This gives you the purchase count and value per Geo ID x Product
category. <br>
For each region, compare the purchase value and count of different
product categories.</td>
    </tr>
    <tr>
      <td><ol>
<li>Which campaign strategies are the most effective in each region?
</li>
</ol>
</td>
      <td>Sum the summary purchase counts and values that are in the summary
reports, across all product categories.<br>
This gives you the purchase count and value per Campaign ID x Geo ID.
<br>
For each region, compare the purchase value and count for different
campaigns.</td>
    </tr>
  </tbody>
</table>

With strategy A, you can also directly answer this third question:\
"How much revenue for each product did each of my campaigns in each geographic
region generate?".

Note: even though the summary values will be noisy, you can evaluate when
differences in the value measured between each campaign are not due to noise
alone.
[See how](https://docs.google.com/document/d/1bU0a_njpDcRd9vDR0AJjwJjrf3Or8vAzyfuK8JZDEfo/edit#heading=h.clgo7qot9chl).

#### Strategy B: two shallow trees (two coarse key structures)

In strategy B, you use two coarse key structures, each including a subset of
the dimensions you need:

{% Img src="image/RtQlPaM9wdhEJGVKR8boMPkWf443/kEqEHcELeAnAikMbWj2Y.png", alt="ALT_TEXT_HERE", width="556", height="202" %}

You split each of these key structures into two key types to support two
measurement goals.

-   Measurement goal type = 0, which you decide to define as a **purchase
    count**.
-   Measurement goal type = 1, which you decide to define as a **purchase
    value.**

You end up with four key types:

-   Key type I-0: Key structure I, purchase count
-   Key type I-1: Key structure I, purchase value
-   Key type II-0: Key structure II, purchase count
-   Key type II-1: Key structure II, purchase value

Summary reports look as follows:

![image](untitleddocume--xly3b64r6r.png)

You can think of strategy B as a "two shallow trees" strategy:

-   The summary values in summary reports map to one of two small sets of
    dimensions.
-   You can roll up these summary values alongside each of the dimensions in
    these sets—this means that these rollups aren't as deep as in option A,
    since there are less dimensions to roll up against.

With strategy B, you would answer your questions as follows:

<table class="with-heading-tint">
  <thead>
    <tr>
      <th>Question</th>
      <th>Answer</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><ol>
<li>Which product categories are the most valuable in each region?</li>
</ol>
</td>
      <td>Directly access the summary purchase counts and values that are in
the summary reports.</td>
    </tr>
    <tr>
      <td><ol>
<li>Which campaign strategies are the most effective in each region?
</li>
</ol>
</td>
      <td>Directly access the summary purchase counts and values that are in
the summary reports.</td>
    </tr>
  </tbody>
</table>

#### Decision: Strategy A

Strategy A is simpler: all data follows the same key structure, which also
means you only have one key structure to maintain.

However, with strategy A, you need to sum the summary values you receive in
summary reports to answer some of your questions. Each of these summary values
is noisy. By summing up that data, you're also
[summing the noise](https://docs.google.com/document/d/1bU0a_njpDcRd9vDR0AJjwJjrf3Or8vAzyfuK8JZDEfo/edit#heading=h.ppa32mheejb).
This isn't the case with strategy B, where summary values exposed in the summary
reports already give you the information you need. This means that strategy B
will likely lead to less impactful noise than strategy A.

How should you determine which strategy to use? For existing advertisers or
campaigns, you might rely on historical data to determine whether the volume of
conversions is more suitable for strategy A vs strategy B. However, for new
advertisers or campaigns, you may decide to:

-   Collect a **month** worth of data with the granular keys (Strategy A).
    Because you're extending the duration of data collection, summary values
    will be higher and noise will be relatively lower.
-   Assess with reasonable accuracy the **weekly** conversion count and
    purchase value.

<table class="with-heading-tint">
  <thead>
    <tr>
      <th>Do not rely on report counts or data available only via debug reports
as a source of truth in your designs. In the future, the data
available in debug reports will change and noisy reports will be
generated alongside real reports, so these signals should be used
only to validate your implementation and testing strategy.</th>
    </tr>
  </thead>
  <tbody>
  </tbody>
</table>

In this example, let's assume that the weekly purchase count and purchase value
are high enough that strategy A would lead to a noise percentage that you deem
acceptable for your use case.

With this, because strategy A is simpler and leads to noise impacts that don't
affect your ability to make decisions, you decide to go with strategy A.

### Select a hashing algorithm

You decide to adopt a
[hash-based approach](https://docs.google.com/document/d/1bU0a_njpDcRd9vDR0AJjwJjrf3Or8vAzyfuK8JZDEfo/edit#heading=h.6q2omygul77r)
to generate your keys. To do so, you need to select a hashing algorithm to
support that approach.

Let's assume that you've selected SHA-256. You could also use a simpler, less
secure algorithm, such as MD5.

### In the browser: set keys and values

Now that you've decided on a key structure and on a hashing algorithm, you're
ready to register keys and values when users click or view ads and subsequently
convert.

Below is an overview of the headers you will set to register keys and values in
the browser:

![image](untitleddocume--z2365jmh08.png)

![image](untitleddocume--jtezejkfxp.png)

#### Set source-side key pieces

When a user clicks or views an ad, set the aggregation keys in the
`Attribution-Reporting-Register-Aggregatable-Source` header.\
At this stage, for each key, you can only set the part of the key— the
[key piece](https://docs.google.com/document/d/1bU0a_njpDcRd9vDR0AJjwJjrf3Or8vAzyfuK8JZDEfo/edit#heading=h.2xob5s4sb398)—that
is known at ad-serving time.

Let's generate the key pieces:

<table class="with-heading-tint">
  <thead>
    <tr>
      <th><br>
Source-side key piece for the key ID…</th>
      <th><br>
String containing the dimension values you want to se</th>
      <th><br>
Hash of this string as hexa, trimmed to the first 64 bits (64/4*
= 16 characters)</th>
      <th><br>
Hexa hash with appended zeros to <a
href="https://docs.google.com/document/d/1bU0a_njpDcRd9vDR0AJjwJjrf3Or8vAzyfuK8JZDEfo/edit#heading=h.6q2omygul77r">simplify
XOR'ing</a>.<br>
This is the source-side key piece.</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><p><pre>
key_purchaseCount
</pre></p></td>
      <td><p><pre>
COUNT, CampaignID=12, GeoID=7
</pre></p></td>
      <td><p><pre>
0x3cf867903fbb73ec
</pre></p></td>
      <td><p><pre>
0x3cf867903fbb73ec0000000000000000
</pre></p></td>
    </tr>
    <tr>
      <td><p><pre>
key_purchaseValue
</pre></p></td>
      <td><p><pre>
VALUE, CampaignID=12, GeoID=7
</pre></p></td>
      <td><p><pre>
0x245265f432f16e73
</pre></p></td>
      <td><p><pre>
0x245265f432f16e730000000000000000
</pre></p></td>
    </tr>
  </tbody>
</table>

*Each hexadecimal digit represents four bits (binary digits).

Let's now set the key pieces:

<table class="with-heading-tint">
  <thead>
    <tr>
      <th><p><pre>
// Upon receiving the request from the publisher site
</pre></p>

<p><pre>
res.set(
</pre></p>

<p><pre>
  "Attribution-Reporting-Register-Aggregatable-Source",
</pre></p>

<p><pre>
  JSON.stringify(
</pre></p>

<p><pre>
[{
</pre></p>

<p><pre>
  "id": "key_purchaseCount",
</pre></p>

<p><pre>
  "key_piece": "0x3cf867903fbb73ec0000000000000000"
</pre></p>

<p><pre>
}, {
</pre></p>

<p><pre>
  "id": "key_purchaseValue",
</pre></p>

<p><pre>
  "key_piece": "0x245265f432f16e730000000000000000"
</pre></p>

<p><pre>
}]
</pre></p>

<p><pre>
))
</pre></p></th>
    </tr>
  </thead>
  <tbody>
  </tbody>
</table>

Note that key IDs will **not** appear in the final reports. They're only used
when setting keys in the browser, so that source-side and trigger-side key
pieces can be mapped with each other and combined into a full key.

#### Optional: event-level reports

If you need to use event-level reports alongside aggregatable reports—for
example, if you're planning on using event-level reports to run models on which
specific types of ads tend to lead to the most purchases—ensure that for a given
source, the event-level data (source event ID and trigger data) and the
aggregation key can be matched.

#### A user converts

When a user converts, a pixel request is typically sent to the adtech server.
Upon receiving this request:

-   Set the conversion-side (trigger-side) key pieces to complete the key.
    You will set these key pieces via the header`
    Attribution-Reporting-Register-Aggregatable-Trigger-Data`.
-   Set the aggregatable value for that conversion, via the header
    `Attribution-Reporting-Register-Aggregatable-Values`.

#### Set trigger-side key pieces to complete the key

Let's generate the key pieces:

<table class="with-heading-tint">
  <thead>
    <tr>
      <th><br>
Trigger-side key piece for the key ID…</th>
      <th><br>
String containing the dimension values you want to set</th>
      <th><br>
Hash of this string as hexa, trimmed to the first 64 bits (64/4*
= 16 characters)</th>
      <th><br>
Hexa hash with appended zeros to <a
href="https://docs.google.com/document/d/1bU0a_njpDcRd9vDR0AJjwJjrf3Or8vAzyfuK8JZDEfo/edit#heading=h.6q2omygul77r">simplify
XOR'ing</a>.<br>
This is the source-side key piece.</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><p><pre>
key_purchaseCount
</pre></p></td>
      <td><p><pre>
ProductCategory=25
</pre></p></td>
      <td><p><pre>
0x1c7ce88c4904bbe2
</pre></p></td>
      <td><p><pre>
0x0000000000000000f9e491fe37e55a0c
</pre></p></td>
    </tr>
    <tr>
      <td><p><pre>
key_purchaseValue
</pre></p></td>
      <td><p><pre>
(same)
</pre></p></td>
      <td><p><pre>
(same)
</pre></p></td>
      <td><p><pre>
(same)
</pre></p></td>
    </tr>
  </tbody>
</table>

*Each hexadecimal digit represents four bits (binary digits).

Let's now set the key pieces:

<table class="with-heading-tint">
  <thead>
    <tr>
      <th><p><pre>
// Upon receiving the pixel request from the advertiser site
</pre></p>

<p><pre>
res.set(
</pre></p>

<p><pre>
    "Attribution-Reporting-Register-Aggregatable-Trigger-Data",
</pre></p>

<p><pre>
    JSON.stringify(
</pre></p>

<p><pre>
[
</pre></p>

<p><pre>
// Each dictionary independently adds pieces to multiple source keys
</pre></p>

<p><pre>
{ "key_piece": "0x0000000000000000f9e491fe37e55a0c",
</pre></p>

<p><pre>
  "source_keys": ["key_purchaseCount", "key_purchaseValue"]},
</pre></p>

<p><pre>
]
</pre></p>

<br>
<p><pre>
))
</pre></p></th>
    </tr>
  </thead>
  <tbody>
  </tbody>
</table>

Note how you're adding the same key piece to several keys, by listing several
key IDs in `source_keys`—the key piece will be added to both keys.\

#### Set aggregatable values

Before you set the aggregatable values, you need to scale them up in order to
reduce noise.

Let's assume one purchase was made for product type 25 for **$52**.

You will **not** set these directly as aggregatable values:

-   `~~key_purchaseCount`: 1 conversion~~
-   ~~`key_purchaseValue`: $52~~

Instead, before you register these aggregatable values, you need to
[scale](https://docs.google.com/document/d/1bU0a_njpDcRd9vDR0AJjwJjrf3Or8vAzyfuK8JZDEfo/edit#heading=h.683u7t2q1xk2)
them in order to minimize noise.

You have two goals to spend your contribution budget against, so you might
decide to split the contribution budget by two.\
With this, each goal is allocated a maximum of` CONTRIBUTION_BUDGET`/2
(=65,536/2=32,768).

Let's assume the maximum purchase value for a single user, based on purchase
history across all users of the site, is **$1,500**. There may be outliers, for
example very few users who spent over that sum, but you may decide to ignore
these outliers).\
Your scaling factor for the purchase value should be:\
((`CONTRIBUTION_BUDGET`/2) / 1,500) = 32,768/1,500 = **21.8 **~ 22

Your scaling factor for purchase count is 32,768/1 = **32,768**, since you
decided to track at most one purchase per ad click or view (source event).

With these, you can know set these values:

-   `key_purchaseCount`: 1*32,768 = 32,768
-   `key_purchaseValue`: 52*22 = 1,144

In practice, you'd set them as follows, using the dedicated header
Attribution-Reporting-Register-Aggregatable-Values:

<table class="with-heading-tint">
  <thead>
    <tr>
      <th><p><pre>
// Instruct the browser to schedule-send a report
</pre></p>

<p><pre>
res.set(
</pre></p>

<p><pre>
    "Attribution-Reporting-Register-Aggregatable-Values",
</pre></p>

<p><pre>
    JSON.stringify(
</pre></p>

<p><pre>
{
</pre></p>

<p><pre>
    "key_purchaseCount": 32768,
</pre></p>

<p><pre>
    "key_purchaseValue": 1144,
</pre></p>

<p><pre>
      }
</pre></p>

<p><pre>
))
</pre></p></th>
    </tr>
  </thead>
  <tbody>
  </tbody>
</table>

### The aggregatable report is generated

The browser matches the conversion to a previous view or click and generates an
aggregatable report, which includes the encrypted payload next to report
metadata.

Below is an example of the data that could be found within the payload of the
aggregatable report, if it was readable in clear:

<table class="with-heading-tint">
  <thead>
    <tr>
      <th><p><pre>
[ {
</pre></p>

<p><pre>
  key: 0x3cf867903fbb73ecf9e491fe37e55a0c, // = source-side key piece XOR conversion-side key piece for the key key_purchaseCount
</pre></p>

<p><pre>
  value: 32768 // the scaled value for 1 conversion, in the context of [CONTRIBUTION_BUDGET/2]
</pre></p>

<p><pre>
}, {
</pre></p>

<p><pre>
  key: 0x245265f432f16e73f9e491fe37e55a0c, // source-side key piece XOR conversion-side key piece for the key key_purchaseValue
</pre></p>

<p><pre>
  value: 1144 // the scaled value for $52, in the context of [CONTRIBUTION_BUDGET/2]
</pre></p>

<p><pre>
}]
</pre></p></th>
    </tr>
  </thead>
  <tbody>
  </tbody>
</table>

Here, you can see two separate contributions within one single aggregatable
report.

### Request a summary report

-   Batch aggregatable reports. Follow the advice offered in
    [Batching](https://docs.google.com/document/d/1bU0a_njpDcRd9vDR0AJjwJjrf3Or8vAzyfuK8JZDEfo/edit#heading=h.7j8g6q2v8b22).
-   Generate the keys you want to see data for. For example, to see summary
    data for COUNT (total number of purchases) and VALUE (total purchase value)
    for the Campaign ID 12 x Geography ID 7 x Product category 25:
    -   Generate the source-side key piece, as you did when [setting it
        in the browser](#heading=h.e8vaqt4q0qqn).
    -   Generate the trigger-side key piece, as you did when [setting it
        in the browser](#heading=h.pfgfpg3jwaqn).

    <table class="with-heading-tint">
  <thead>
    <tr>
      <th>Metric you're looking to request (for Campaign ID 12 x Geography ID 7
x Product category 25)<br>
    </th>
      <th>Source-side key piece<br>
    </th>
      <th>Trigger-side key piece<br>
    </th>
      <th>Key to request to the aggregation service<br>
= <br>
Source-side key piece<br>
XOR <br>
Trigger-side key piece<br>
    </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Total purchase count (COUNT)<br>
    </td>
      <td><p><pre>
0x3cf867903fbb73ec0000000000000000
</pre></p>

    </td>
      <td><p><pre>
0x0000000000000000f9e491fe37e55a0c
</pre></p>

    </td>
      <td><p><pre>
0x3cf867903fbb73ecf9e491fe37e55a0c
</pre></p>

    </td>
    </tr>
    <tr>
      <td>Total purchase value (VALUE)<br>
    </td>
      <td><p><pre>
0x245265f432f16e730000000000000000
</pre></p>

    </td>
      <td><p><pre>
0x0000000000000000f9e491fe37e55a0c
</pre></p>

    </td>
      <td><p><pre>
0x245265f432f16e73f9e491fe37e55a0c
</pre></p>

    </td>
    </tr>
  </tbody>
    </table>

-   Request summary data to the aggregation service for these keys.

### Handle the summary report

Ultimately, you receive a summary report that may look as follows:

<table class="with-heading-tint">
  <thead>
    <tr>
      <th><p><pre>
[
</pre></p>

<p><pre>
{"bucket": "00111100111110000110011110010000001111111011101101110011111011001111100111100100100100011111111000110111111001010101101000001100", "value": "2558500"},
</pre></p>

<p><pre>
{"bucket": "00100100010100100110010111110100001100101111000101101110011100111111100111100100100100011111111000110111111001010101101000001100", "value": "687060"},
</pre></p>

<p><pre>
…
</pre></p>

<p><pre>
]
</pre></p></th>
    </tr>
  </thead>
  <tbody>
  </tbody>
</table>

The first bucket is the COUNT key in binary. The second bucket is the VALUE key
in binary.\
Note that while the keys are heterogeneous (COUNT vs VALUE), they're contained
in the same report.

<table class="with-heading-tint">
  <thead>
    <tr>
      <th>In practice, summary reports are encoded in a way that will make
buckets and values look different than stated above (e.g. a bucket
may look like \u0000\u0000\x80\u0000). <em>Bucket</em> and
<em>value</em> are both bytestrings. <a
href="https://github.com/google/trusted-execution-aggregation-service/blob/main/COLLECTING.md#produce-a-summary-report-locally">An
example can be found here</a>.</th>
    </tr>
  </thead>
  <tbody>
  </tbody>
</table>

#### Scale down the values

-   2,558,500 refers to the number of purchases for this key, scaled up by
    your previously calculated scaling factor. The scaling factor for the
    purchase count was 32,768. Divide 2,558,500 by the goal's contribution
    budget: 2,558,500/32,768 = 156.15 purchases.
-   687,060 → 687,060/22 = $31,230 total purchase value.

As a result, the summary reports gives you the following insights:

<table class="with-heading-tint">
  <thead>
    <tr>
      <th><p><pre>
Within the reporting time period, campaign #12 run in Europe drove about 156 purchases (± noise) for the product category #25.
</pre></p></th>
    </tr>
  </thead>
  <tbody>
  </tbody>
</table>

<table class="with-heading-tint">
  <thead>
    <tr>
      <th><p><pre>
Within the reporting time period, campaign #12 run in Europe drove $31,230 of purchases (± noise) for the product category #25.
</pre></p></th>
    </tr>
  </thead>
  <tbody>
  </tbody>
</table>
