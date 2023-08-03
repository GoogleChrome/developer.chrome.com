---
layout: "layouts/doc-post.njk"
title: "Manifest file format"
seoTitle: "Manifest V2 file format [Deprecated]"
date: 2012-09-18
updated: 2018-04-26
description: An overview of the manifest.json properties that you can use in your Chrome Extension.
---

{% Partial 'extensions/mv2-legacy-page.md' %}

Every extension has a [JSON][1]\-formatted manifest file, named `manifest.json`, that provides
important information.

## Field summary {: #overview }

The following code shows the supported manifest fields for Extensions, with links to the page that
discusses each field.

<pre class="language-json"><code class="language-json"><span class="token punctuation">{</span>
  <span class="token comment">// Required</span>
  <span class="token property">"<a href="/docs/extensions/mv2/manifest/manifest_version">manifest_version</a>"</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
  <span class="token property">"<a href="/docs/extensions/mv2/manifest/name">name</a>"</span><span class="token operator">:</span> <span class="token string">"My Extension"</span><span class="token punctuation">,</span>
  <span class="token property">"<a href="/docs/extensions/mv2/manifest/version">version</a>"</span><span class="token operator">:</span> <span class="token string">"versionString"</span><span class="token punctuation">,</span>

  <span class="token comment">// Recommended</span>
  <span class="token property">"<a href="/docs/extensions/mv2/manifest/default_locale">default_locale</a>"</span><span class="token operator">:</span> <span class="token string">"en"</span><span class="token punctuation">,</span>
  <span class="token property">"<a href="/docs/extensions/mv2/manifest/description">description</a>"</span><span class="token operator">:</span> <span class="token string">"A plain text description"</span><span class="token punctuation">,</span>
  <span class="token property">"<a href="/docs/extensions/mv2/manifest/icons">icons</a>"</span><span class="token operator">:</span> <span class="token punctuation">{</span>...<span class="token punctuation">}</span><span class="token punctuation">,</span>

  <span class="token comment">// Pick one (or none)</span>
  <span class="token property">"<a href="/docs/extensions/reference/browserAction">browser_action</a>"</span><span class="token operator">:</span> <span class="token punctuation">{</span>...<span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token property">"<a href="/docs/extensions/reference/pageAction">page_action</a>"</span><span class="token operator">:</span> <span class="token punctuation">{</span>...<span class="token punctuation">}</span><span class="token punctuation">,</span>

  <span class="token comment">// Optional</span>
  <span class="token property">"action"</span><span class="token operator">:</span> ...<span class="token punctuation">,</span>
  <span class="token property">"author"</span><span class="token operator">:</span> ...<span class="token punctuation">,</span>
  <span class="token property">"automation"</span><span class="token operator">:</span> ...<span class="token punctuation">,</span>
  <span class="token property">"<a href="/docs/extensions/mv2/background_pages">background</a>"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token comment">// Recommended</span>
    <span class="token property">"persistent"</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
    <span class="token comment">// Optional</span>
    <span class="token property">"service_worker"</span><span class="token operator">:</span> ...
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token property">"<a href="/docs/extensions/mv2/settings_override">chrome_settings_overrides</a>"</span><span class="token operator">:</span> <span class="token punctuation">{</span>...<span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token property">"<a href="/docs/extensions/mv2/override">chrome_url_overrides</a>"</span><span class="token operator">:</span> <span class="token punctuation">{</span>...<span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token property">"<a href="/docs/extensions/reference/commands">commands</a>"</span><span class="token operator">:</span> <span class="token punctuation">{</span>...<span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token property">"content_capabilities"</span><span class="token operator">:</span> ...<span class="token punctuation">,</span>
  <span class="token property">"<a href="/docs/extensions/mv2/content_scripts">content_scripts</a>"</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">{</span>...<span class="token punctuation">}</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token property">"<a href="/docs/apps/contentSecurityPolicy">content_security_policy</a>"</span><span class="token operator">:</span> <span class="token string">"policyString"</span><span class="token punctuation">,</span>
  <span class="token property">"converted_from_user_script"</span><span class="token operator">:</span> ...<span class="token punctuation">,</span>
  <span class="token property">"<a href="/docs/extensions/mv2/manifest/cross_origin_embedder_policy">cross_origin_embedder_policy</a>"</span><span class="token operator">:</span> <span class="token string">{"value": "require-corp"}</span><span class="token punctuation">,</span>
  <span class="token property">"<a href="/docs/extensions/mv2/manifest/cross_origin_opener_policy">cross_origin_opener_policy</a>"</span><span class="token operator">:</span> <span class="token string">{"value": "same-origin"}</span><span class="token punctuation">,</span>
  <span class="token property">"current_locale"</span><span class="token operator">:</span> ...<span class="token punctuation">,</span>
  <span class="token property">"declarative_net_request"</span><span class="token operator">:</span> ...<span class="token punctuation">,</span>
  <span class="token property">"<a href="/docs/extensions/mv2/devtools/#devtools-page">devtools_page</a>"</span><span class="token operator">:</span> <span class="token string">"devtools.html"</span><span class="token punctuation">,</span>
  <span class="token property">"differential_fingerprint"</span><span class="token operator">:</span> ...<span class="token punctuation">,</span>
  <span class="token property">"<a href="/docs/extensions/mv2/manifest/event_rules">event_rules</a>"</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">{</span>...<span class="token punctuation">}</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token property">"<a href="/docs/extensions/mv2/manifest/externally_connectable">externally_connectable</a>"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">"matches"</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">"*://*.example.com/*"</span><span class="token punctuation">]</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token property">"<a href="/docs/extensions/reference/fileBrowserHandler">file_browser_handlers</a>"</span><span class="token operator">:</span> <span class="token punctuation">[</span>...<span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token property">"<a href="/docs/extensions/reference/fileSystemProvider">file_system_provider_capabilities</a>"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">"configurable"</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
    <span class="token property">"multiple_mounts"</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
    <span class="token property">"source"</span><span class="token operator">:</span> <span class="token string">"network"</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token property">"homepage_url</a>"</span><span class="token operator">:</span> <span class="token string">"http://path/to/homepage"</span><span class="token punctuation">,</span>
  <span class="token property">"host_permissions"</span><span class="token operator">:</span> ...<span class="token punctuation">,</span>
  <span class="token property">"<a href="/docs/extensions/mv2/shared_modules">import</a>"</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">{</span><span class="token property">"id"</span><span class="token operator">:</span> <span class="token string">"aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"</span><span class="token punctuation">}</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token property">"<a href="/docs/extensions/mv2/manifest/incognito">incognito</a>"</span><span class="token operator">:</span> <span class="token string">"spanning, split, or not_allowed"</span><span class="token punctuation">,</span>
  <span class="token property">"input_components"</span><span class="token operator">:</span> ...<span class="token punctuation">,</span>
  <span class="token property">"<a href="/docs/extensions/mv2/manifest/key">key</a>"</span><span class="token operator">:</span> <span class="token string">"publicKey"</span><span class="token punctuation">,</span>
  <span class="token property">"minimum_chrome_version"</span><span class="token operator">:</span> <span class="token string">"versionString"</span><span class="token punctuation">,</span>
  <span class="token property">"<a href="/docs/extensions/mv2/manifest/nacl_modules">nacl_modules</a>"</span><span class="token operator">:</span> <span class="token punctuation">[</span>...<span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token property">"natively_connectable"</span><span class="token operator">:</span> ...<span class="token punctuation">,</span>
  <span class="token property">"oauth2"</span><span class="token operator">:</span> ...<span class="token punctuation">,</span>
  <span class="token property">"<a href="/docs/extensions/mv2/manifest/offline_enabled">offline_enabled</a>"</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
  <span class="token property">"<a href="/docs/extensions/reference/omnibox">omnibox</a>"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">"keyword"</span><span class="token operator">:</span> <span class="token string">"aString"</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token property">"<a href="/docs/extensions/reference/permissions">optional_permissions</a>"</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">"tabs"</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token property">"<a href="/docs/extensions/mv2/options">options_page</a>"</span><span class="token operator">:</span> <span class="token string">"options.html"</span><span class="token punctuation">,</span>
  <span class="token property">"<a href="/docs/extensions/mv2/options">options_ui</a>"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">"chrome_style"</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
    <span class="token property">"page"</span><span class="token operator">:</span> <span class="token string">"options.html"</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token property">"<a href="/docs/extensions/reference/permissions">permissions</a>"</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">"tabs"</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token property">"platforms"</span><span class="token operator">:</span> ...<span class="token punctuation">,</span>
  <span class="token property">"replacement_web_app"</span><span class="token operator">:</span> ...<span class="token punctuation">,</span>
  <span class="token property">"<a href="/docs/extensions/mv2/manifest/requirements">requirements</a>"</span><span class="token operator">:</span> <span class="token punctuation">{</span>...<span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token property">"<a href="/docs/extensions/mv2/manifest/sandbox">sandbox</a>"</span><span class="token operator">:</span> <span class="token punctuation">[</span>...<span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token property">"<a href="/docs/extensions/mv2/manifest/name">short_name</a>"</span><span class="token operator">:</span> <span class="token string">"Short Name"</span><span class="token punctuation">,</span>
  <span class="token property">"<a href="/docs/extensions/mv2/manifest/storage">storage</a>"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">"managed_schema"</span><span class="token operator">:</span> <span class="token string">"schema.json"</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token property">"system_indicator"</span><span class="token operator">:</span> ...<span class="token punctuation">,</span>
  <span class="token property">"<a href="/docs/extensions/reference/ttsEngine/">tts_engine</a>"</span><span class="token operator">:</span> <span class="token punctuation">{</span>...<span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token property">"<a href="/docs/extensions/mv2/hosting">update_url</a>"</span><span class="token operator">:</span> <span class="token string">"http://path/to/updateInfo.xml"</span><span class="token punctuation">,</span>
  <span class="token property">"<a href="/docs/extensions/mv2/manifest/version">version_name</a>"</span><span class="token operator">:</span> ...<span class="token punctuation">,</span>
  <span class="token property">"<a href="/docs/extensions/mv2/manifest/web_accessible_resources">web_accessible_resources</a>"</span><span class="token operator">:</span> <span class="token punctuation">[</span>...<span class="token punctuation">]</span>
<span class="token punctuation">}</span></code></pre>

[1]: https://www.json.org
