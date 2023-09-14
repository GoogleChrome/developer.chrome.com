## Detect features {: #feature-detection}

As with all web features, you should check they are reporting as available in
the browser before attempting to use them. You can do this by checking for the
existence of the relevant API in the right location:

```js
if (document.featurePolicy.allowsFeature('attribution-reporting')) {
  // Attribution Reporting enabled
}

if ('runAdAuction' in navigator) {
  // Protected Audience API enabled
}

if ('browsingTopics' in document) {
  // Topics enabled
}

if ('HTMLFencedFrameElement' in window) {
  // Fenced Frames enabled
}

if ('sharedStorage' in window) {
  // Shared Storage enabled
}

if (window?.sharedStorage?.selectURL instanceof Function) {
  // optionally check specifically for the selectURL function in Shared Storage
}
```