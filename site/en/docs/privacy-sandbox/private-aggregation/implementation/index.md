---
layout: 'layouts/doc-post.njk'
title: 'Shared Storage and Private Aggregation Implementation Quickstart'
subhead: >
  Learn how to integrate Shared Storage and Private Aggregation and how they work together to produce aggregatable reports.
description: >
  Learn how to integrate Shared Storage and Private Aggregation and how they work together to produce aggregatable reports.
updated: 2023-10-19
authors:
  - kevinkiklee
---

This document is a quickstart guide for using
Shared Storage and Private Aggregation. This combines Shared Storage and Private
Aggregation as Shared Storage stores the values and Private Aggregation creates
the aggregatable report.

**Target Audience:** AdTech and Measurements Companies

## Try the demo

Try out the live [demo](https://shared-storage-demo.web.app/). Follow the steps in the demo instructions to enable the Privacy Sandbox
APIs.

Opening Chrome DevTools will help you visualize the results of different use
cases.

Use cases available for demo:

-   Private Aggregation
    -   Unique Reach Measurement
    -   Demographics measurement
    -   K+ frequency measurement
-   General Usage
    -   Measure hover-over event inside fenced frames
    -   Top level navigation
    -   Controlling where 3rd party can write

### How to view Shared Storage

To view what is stored in Shared Storage, use Chrome DevTools. Stored data can
be found in `Application -> Shared Storage`.

{% Img src="image/RtQlPaM9wdhEJGVKR8boMPkWf443/wDOc1Bt5ClCICP0Pm98S.png", alt="ALT_TEXT_HERE", width="800", height="462" %}

### View reports for Private Aggregation

To view the aggregatable reports sent, navigate to
`chrome://private-aggregation-internals`. When debug mode is enabled, a report
will be immediately sent to
`[[YOUR_ORIGIN]]/.well-known/private-aggregation/debug/report-shared-storage`
along with the time-delayed report to be sent to
`[[YOUR_ORIGIN]]/.well-known/private-aggregation/report-shared-storage`.

To enable debugging, you can follow debugging instructions in the [Enable
debugging](#bookmark=kix.6dtq11w97pi2) section.

{% Img src="image/RtQlPaM9wdhEJGVKR8boMPkWf443/HWcqZEDSbHeun6qqaQQD.png", alt="ALT_TEXT_HERE", width="800", height="366" %}

## Shared Storage API

To prevent cross-site tracking, browsers have started partitioning all forms of
storage (i.e. local storage, cookies, etc.). There are use cases where an
unpartitioned storage is required. Shared Storage API provides unlimited write
access across different top-level sites with privacy preserving read access.
Shared Storage is restricted to the context origin (the caller of
sharedStorage).

Shared Storage has a maximum capacity per origin, with each entry limited to a
maximum amount of characters. If the limit is reached, no further inputs will be
stored. The data storage limits are outlined in the
[Shared Storage explainer](https://github.com/WICG/shared-storage#data-storage-limits).

### Invoking Shared Storage

AdTechs can write to Shared Storage via JavaScript or response headers. Reading
from Shared Storage only occurs within an isolated JavaScript environment called
a worklet.

#### Through JavaScript

AdTech can perform specific Shared Storage functions like setting, appending
and deleting values outside of a JavaScript worklet. However, specific functions
like reading Shared Storage and performing private aggregation will have to be
completed through a JavaScript worklet.

Methods that can be used outside of a JavaScript worklet can be found in the
[Proposed API Surface - Outside the worklet](https://github.com/WICG/shared-storage#outside-the-worklet).

Methods that are used in the worklet during an operation can be found in
[Proposed API Surface - In the worklet](https://github.com/WICG/shared-storage#in-the-worklet-during-an-operation).

#### Through Response Headers (available soon! (~M117))

Similar to JavaScript, only specific functions like setting, appending and
deleting values in Shared Storage can be done using response headers. To perform
Shared Storage in a response header, Shared-Storage-Writable: ?1 will have to be
included in the request header.

To initiate a request from the client, you can use the following:

1.  Fetch calls

```javascript
fetch("https://a.example/path/for/updates", {sharedStorageWritable: true});
```

1.  iframe/img html tags

```html
 <iframe src="https://a.example/path/for/updates" sharedstoragewritable></iframe>
 ```

1.  IDL attribute with an iframe/img html tags

```javascript
let iframe = document.getElementById("my-iframe");
iframe.sharedStorageWritable = true;
iframe.src = "https://a.example/path/for/updates";
```

Further information can be found in
[Shared Storage: Response Headers](https://github.com/WICG/shared-storage#from-response-headers).

### Writing to Shared Storage

#### Setting value

To write to Shared Storage, you can use the `sharedStorage.set()` call within or
outside a JavaScript worklet. If called from outside the worklet, the data will
be written to the origin of the browsing context that the call was made from. If
called from inside the worklet, the data will be written to the origin of the
browsing context that loaded the worklet.  The keys that are set will have an
expiration date of 30 days from last update.

The `ignoreIfPresent` field is optional. If present and set to `"true"`, the `key`
will not be updated if it already exists. Key expiration is renewed to 30 days
from the `set()` call even if the key is not updated.

If Shared Storage is accessed multiple times in the same page load with the
same `key`, the `value` for the `key` will be overwritten. It is advised to use the
`sharedStorage.append()` if the key needs to maintain the previous `value`.

##### Using JavaScript

Outside the worklet:

```javascript
window.sharedStorage.set('myKey', 'myValue1', { ignoreIfPresent: true });
// Shared Storage: {'myKey': 'myValue1'}

window.sharedStorage.set('myKey', 'myValue2', { ignoreIfPresent: true });
// Shared Storage: {'myKey': 'myValue1'}

window.sharedStorage.set('myKey', 'myValue2', { ignoreIfPresent: false });
// Shared Storage: {'myKey': 'myValue2'}
```

Similarly, Inside the worklet:

```javascript
sharedStorage.set('myKey', 'myValue1', { ignoreIfPresent: true });
```

##### Using Response Headers

Writing to Shared Storage can also be performed using response headers. To
write to Shared Storage, use `Shared-Storage-Write` in the response header along
with the below items.

```javascript
Shared-Storage-Write : set;key="myKey";value="myValue";ignore_if_present
```

```javascript
Shared-Storage-Write : set;key="myKey";value="myValue";ignore_if_present=?0
```

Multiple items can be comma separated and can combine `set`, `append`,
`delete`, and `clear`.

```javascript
Shared-Storage-Write : 
set;key="hello";value="world";ignore_if_present, set;key="good";value="bye"
```

#### Appending value

You can append `value` to an existing `key` using the append method. If the
`key` does not exist, this will `set` the `value` to the `key`. This can be
accomplished using JavaScript and response headers.

##### Using JavaScript

To update values of existing keys, `sharedStorage.append()` can be used. The
`sharedStorage.append()` call can also be used inside or outside of the
worklet.

```javascript
window.sharedStorage.append('myKey', 'myValue1');
// Shared Storage: {'myKey': 'myValue1'}

window.sharedStorage.append('myKey', 'myValue2');
// Shared Storage: {'myKey': 'myValue1myValue2'}

window.sharedStorage.append('anotherKey', 'hello');
// Shared Storage: {'myKey': 'myValue1myValue2', 'anotherKey': 'hello'}
```

To append inside the worklet:

```javascript
sharedStorage.append('myKey', 'myValue1');
```

##### Using Response Headers

Similar to setting a value in Shared Storage, you can use the
`Shared-Storage-Write` in the response header to pass in the key/value pair.

```javascript
Shared-Storage-Write : append;key="myKey";value="myValue2"
```

### Reading from Shared Storage

To read from Shared Storage, you will need to perform this inside a worklet.

```javascript
await sharedStorage.get('mykey');
```

Inside the worklet is the only place you can read from Shared Storage. The
origin of the browsing context that the worklet module was loaded from
determines whose Shared Storage is read from.

### Deleting from Shared Storage

Deleting from Shared Storage can be performed in JavaScript both inside or
outside the worklet and using response headers using `delete()`.

To delete all keys at once, adTech can also use `clear()`.

##### Using JavaScript

To delete from Shared Storage outside the worklet:

```javascript
window.sharedStorage.delete('myKey');
```

To delete from Shared Storage inside the worklet:

```javascript
sharedStorage.delete('myKey');
```

To delete all keys at once outside the worklet:

```javascript
window.sharedStorage.clear();
```

To delete all keys at once inside the Shared Storage worklet:

```javascript
sharedStorage.clear();
```

##### Using Response Headers

To delete values using response headers, you can also use the
`Shared-Storage-Write `in the response header to pass the key to be deleted.

```javascript
delete;key="myKey"
```

To delete all keys using response headers:

```javascript
clear;
```

### Context switching

Shared Storage data is written to the
[origin](https://web.dev/same-site-same-origin/#:~:text=%22Origin%22%20is%20a%20combination%20of,.example.com%3A443%20.)
(i.e. https://example.adtech.com) of the browsing context that the call
originated from.

When you load the third-party code with a `<script>` tag, the code will be
executed in the browsing context of the embedder. Therefore, when the
third-party code calls `sharedStorage.set()`, the data will be written to the
embedder's Shared Storage. When you load the third-party code with an iframe,
the code will receive a new browsing context, and its origin will be the origin
of the iframe. Therefore, the `sharedStorage.set()` call made from the iframe
will store the data into the Shared Storage of the iframe origin

#### First-party context

If a first party page has embedded a third-party JavaScript script tag which
calls the `sharedStorage.set()` or `sharedStorage.delete() `call, the key-value
pair will be stored in the first party context.

{% Img src="image/RtQlPaM9wdhEJGVKR8boMPkWf443/cjt7jPToJIEPjZ4aB4pL.png", alt="ALT_TEXT_HERE", width="800", height="240" %}

#### Third-party context

The key-value pair can be stored in the adTech or 3rd party context by creating
an iframe and running the `set()` or `delete()` call in the JavaScript from the
iframe.

{% Img src="image/RtQlPaM9wdhEJGVKR8boMPkWf443/cT7Lec8I04vlWl4iqbYv.png", alt="ALT_TEXT_HERE", width="800", height="222" %}

## Private Aggregation API

Shared Storage stores data or information. To be able to measure aggregatable
information stored in Shared Storage, the Private Aggregation API can be used.

To create a report, you can call `contributeToHistogram()` inside a worklet
with a bucket and value. The bucket is represented by an unsigned 128-bit
integer which must be passed into the function as a `BigInt`. The value is a
positive integer.

To protect privacy, the report's payload, which contains the bucket and value,
will be encrypted in transit, and it can only be decrypted and aggregated using
the aggregation service.

The browser will also limit the contributions a site can make to an output
query. Specifically, it will limit the total value sum of all reports from a
single site for a given browser in a given time window across all buckets to a
[contribution budget](/docs/privacy-sandbox/private-aggregation-fundamentals/#contribution-budget).
If the current budget is exceeded, a report will not be generated.

```javascript
privateAggregation.contributeToHistogram({
  bucket: BigInt(myBucket),
  value: parseInt(myBucketValue)
});
```

## Executing Shared Storage and Private Aggregation

In the Ad's iframe, load the worklet module by calling `addModule()`

To run the method that is registered in the `sharedStorageWorklet.js` worklet
file, in the same ad iframe JavaScript, use the `sharedStorage.run()` method.

```javascript
await window.sharedStorage.worklet.addModule('modules/sharedStorageWorklet.js');

await window.sharedStorage.worklet.run('shared-storage-report', {
  data: { campaignId: '1234' },
});
```

In the worklet script, you will need to create a class with an async `run`
method. And `register` this class to be run in the ad's iframe.

Inside `sharedStorageWorklet.js:`

```javascript
class SharedStorageReportOperation {
  async run(data) {

    // Other code goes here.

    bucket = getBucket(...);
    value = getValue(...);

    privateAggregation.contributeToHistogram({
      bucket: bucket,
      value: value
    });

  }
}

register('shared-storage-report',
  SharedStorageReportOperation);
```

## Tips for debugging

### Enable debugging

To enable debugging, use the below JavaScript call in the same context where
Shared Storage and Private Aggregation will be used. This will be applied for
future reports in the same context.

```javascript
privateAggregation.enableDebugMode();
```

To associate the reports with the contexts that triggered them, the API allows
setting a 64-bit unsigned integer debug keys which are passed to the JavaScript
call. Please note that the `debugKey` is a `BigInt`.

```javascript
privateAggregation.enableDebugMode({debugKey: 1234n});
```

### Debugging

#### Shared Storage

Shared Storage returns a generic error message. You can debug Shared Storage
wrapping the call with
[try-catch](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/try...catch)
blocks.

{% Img src="image/RtQlPaM9wdhEJGVKR8boMPkWf443/ANAyi8xjMVRH4DVpHpNR.png", alt="ALT_TEXT_HERE", width="800", height="58" %}

```javascript
try {
  privateAggregation.contributeToHistogram({bucket, value});
} catch (e){
  console.log(e);
}
```

#### Private Aggregation

Reports are sent to `/.well-known/private-aggregation/report-shared-storage`
and `/.well-known/private-aggregation/debug/report-shared-storage`.

Debug reports will receive a payload similar to the below. This payload defines
the `api` field as "shared-storage".

```javascript
{
   "aggregation_coordinator_identifier": "aws-cloud",
   "aggregation_service_payloads": [ {
      "debug_cleartext_payload": "omRkYXRhgaJldmFsdWVEAAAAgGZidWNrZXRQAAAAAAAAAAAAAAEfV32BFWlvcGVyYXRpb25paGlzdG9ncmFt",
      "key_id": "9bc4afa7-2934-4779-99ff-999d91b137ec",
      "payload": "bqOFO/cHCdwefU2W4FjMYRMSLoGHPWwZbgVF4aa/ji2YtwFz+jb6v2XCwQUdmvYcZSRPKosGRpKELJ0xAFv+VBYvCiv3FXP6jjAHQD+XAJUz17A39aXijk6JnEAu86+DfTSbXYn1fWhGzIG9xH/Y"
   } ],
   "debug_key": "1234",
   "shared_info": "{\"api\":\"shared-storage\",\"debug_mode\":\"enabled\",\"report_id\":\"93f86829-cdf7-4ecd-b16d-4e415a3ee063\",\"reporting_origin\":\"https://small-free-wealth.glitch.me\",\"scheduled_report_time\":\"1681319668\",\"version\":\"0.1\"}"
}
```

#### Debug Cleartext Payload

The `debug_cleartext_payload` is
[Base64](https://developer.mozilla.org/docs/Glossary/Base64)
[CBOR](https://en.wikipedia.org/wiki/CBOR) encoded. You can view the bucket and
value using the [decoder](https://shared-storage-demo.web.app/decoder/) or use
the JavaScript code found in the
[Shared Storage decoder](https://github.com/GoogleChromeLabs/shared-storage-demo/blob/main/sites/home/decoder/decoder.js).

## What to do next?

Next steps will be to get to know the APIs better. This is available in the
"[Get to know the APIs](#get-to-know-the-APIs)" section.

Once you are well acquainted with the APIs, you can proceed to start collecting
the reports which are sent to the below paths. Reports are sent as a POST call
to the below endpoints and are sent as a JSON format in the request body.

-   Debug Reports -
    `context-origin/.well-known/private-aggregation/debug/report-shared-storage`
-   Reports -
    `context-origin/.well-known/private-aggregation/report-shared-storage`

Once reports are collected, you can start testing using the
[local testing tool](https://github.com/privacysandbox/aggregation-service#set-up-local-testing)
or start setting up the
[Trusted Execution Environment for Aggregation Service](https://github.com/privacysandbox/aggregation-service#test-on-aws-with-support-for-encrypted-reports)
to be able to get the aggregated reports.

## Share your feedback

You can share your feedback with the APIs and documentations via Github.

-   [Shared Storage](https://github.com/WICG/shared-storage/issues)
-   [Private Aggregation](https://github.com/patcg-individual-drafts/private-aggregation-api/issues)

## Get to know the APIs

The following pages explain important aspects of the Shared Storage and Private Aggregation APIs.

- [Introduction to Shared Storage (Developer Chrome)](/docs/privacy-sandbox/shared-storage/)
- [Shared Storage Use Cases (Developer Chrome)](/docs/privacy-sandbox/shared-storage/#use-cases)
- [Introduction to Private Aggregation (Developer Chrome)](/docs/privacy-sandbox/private-aggregation/)
- [Shared Storage Explainer (Github)](https://github.com/WICG/shared-storage)
- [Private Aggregation Explainer (Github)](https://github.com/patcg-individual-drafts/private-aggregation-api)
- [Shared Storage and Private Aggregation Demo](https://shared-storage-demo.web.app/)