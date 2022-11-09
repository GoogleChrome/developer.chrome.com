---
layout: 'layouts/doc-post.njk'
title: 'Manifest file format'
date: 2012-09-18
updated: 2022-11-08
description: An overview of the manifest.json properties of a Chrome Extension.
---

Every extension requires a [JSON][mdn-json]\-formatted file, named `manifest.json`, that provides
important information. This file must be located in the extension's root directory.

## Field summary {: #overview }

The following code shows the supported manifest keys. For additional usage information and code samples, visit the link of each key.

<pre
  class="language-json"
><code class="language-json"><span class="token punctuation">{</span>
  <span class="token comment">// Required</span>
  <span class="token property">"<a href="/docs/extensions/mv3/manifest/manifest_version">manifest_version</a>"</span><span class="token operator">:</span> <span class="token number">3</span><span class="token punctuation">,</span>
  <span class="token property">"<a href="/docs/extensions/mv3/manifest/name">name</a>"</span><span class="token operator">:</span> <span class="token string">"My Extension"</span><span class="token punctuation">,</span>
  <span class="token property">"<a href="/docs/extensions/mv3/manifest/version">version</a>"</span><span class="token operator">:</span> <span class="token string">"1.0.1"</span><span class="token punctuation">,</span>

  <span class="token comment">// Recommended</span>
  <span class="token property">"<a href="/docs/extensions/reference/action">action</a>"</span><span class="token operator">:</span> <span class="token punctuation">{</span>...<span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token property">"<a href="/docs/extensions/mv3/manifest/default_locale">default_locale</a>"</span><span class="token operator">:</span> <span class="token string">"en"</span><span class="token punctuation">,</span>
  <span class="token property">"<a href="/docs/extensions/mv3/manifest/description">description</a>"</span><span class="token operator">:</span> <span class="token string">"A plain text description"</span><span class="token punctuation">,</span>
  <span class="token property">"<a href="/docs/extensions/mv3/manifest/icons">icons</a>"</span><span class="token operator">:</span> <span class="token punctuation">{</span>...<span class="token punctuation">}</span><span class="token punctuation">,</span>

  <span class="token comment">// Optional</span>
  <span class="token property">"<a href="/docs/extensions/mv3/manifest/author">author</a>"</span><span class="token operator">:</span> <span class="token string">"developer@example.com"</span><span class="token punctuation">,</span>  
  <span class="token property">"<a href="/docs/extensions/mv3/manifest/automation">automation</a>"</span><span class="token operator">:</span> <span class="token punctuation">{</span>...<span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token property">"<a href="/docs/extensions/mv3/service_workers/#manifest">background</a>"</span><span class="token operator">:</span> <span class="token punctuation">{</span>...<span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token property">"<a href="/docs/extensions/mv3/settings_override">chrome_settings_overrides</a>"</span><span class="token operator">:</span> <span class="token punctuation">{</span>...<span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token property">"<a href="/docs/extensions/mv3/override">chrome_url_overrides</a>"</span><span class="token operator">:</span> <span class="token punctuation">{</span>...<span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token property">"<a href="/docs/extensions/reference/commands">commands</a>"</span><span class="token operator">:</span> <span class="token punctuation">{</span>...<span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token property">"<a href="/docs/extensions/mv3/content_scripts">content_scripts</a>"</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">{</span>...<span class="token punctuation">}</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token property">"<a href="/docs/extensions/mv3/manifest/content_security_policy">content_security_policy</a>"</span><span class="token operator">:</span> <span class="token punctuation">{</span>...<span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token property">"<a href="/docs/extensions/mv3/manifest/cross_origin_embedder_policy">cross_origin_embedder_policy</a>"</span><span class="token operator">:</span> <span class="token punctuation">{</span>...<span class="token punctuation">}</span><span class="token punctuation"><span class="token punctuation">,</span>
  <span class="token property">"<a href="/docs/extensions/mv3/manifest/cross_origin_opener_policy">cross_origin_opener_policy</a>"</span><span class="token operator">:</span> <span class="token punctuation">{</span>...<span class="token punctuation">}</span><span class="token punctuation"><span class="token punctuation">,</span>
  <span class="token property">"<a href="/docs/extensions/reference/declarativeNetRequest">declarative_net_request"</span><span class="token operator">:</span> <span class="token punctuation">{</span>...<span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token property">"<a href="/docs/extensions/mv3/devtools">devtools_page</a>"</span><span class="token operator">:</span> <span class="token string">"devtools.html"</span><span class="token punctuation">,</span>
  <span class="token property">"<a href="/docs/extensions/mv3/manifest/event_rules">event_rules</a>"</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">{</span>...<span class="token punctuation">}</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token property">"<a href="/docs/extensions/mv3/manifest/externally_connectable">externally_connectable</a>"</span><span class="token operator">:</span> <span class="token punctuation">{</span>...<span class="token punctuation">}</span><span class="token punctuation"></span><span class="token punctuation">,</span>
  <span class="token property">"<a href="/docs/extensions/reference/fileBrowserHandler">file_browser_handlers</a>"</span><span class="token operator">:</span> <span class="token punctuation">[</span>...<span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token property">"<a href="/docs/extensions/reference/fileSystemProvider">file_system_provider_capabilities</a>"</span><span class="token operator">:</span> <span class="token punctuation">{</span>...<span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token property">"<a href="/docs/extensions/mv3/manifest/homepage_url">homepage_url</a>"</span><span class="token operator">:</span> <span class="token string">"https://path/to/homepage"</span><span class="token punctuation">,</span>
  <span class="token property">"<a href="/docs/extensions/reference/permissions">host_permissions</a>"</span><span class="token operator">:</span> <span class="token punctuation">[</span>...<span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token property">"<a href="/docs/extensions/mv2/shared_modules">import</a>"</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">{</span><span class="token property">"id"</span><span class="token operator">:</span> <span class="token string">"aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"</span><span class="token punctuation">}</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token property">"<a href="/docs/extensions/mv3/manifest/incognito">incognito</a>"</span><span class="token operator">:</span> <span class="token string">"spanning, split, or not_allowed"</span><span class="token punctuation">,</span>
  <span class="token property">"<a href="/docs/extensions/mv3/manifest/input_components">input_components</a>"</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">{</span>...<span class="token punctuation">}</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token property">"<a href="/docs/extensions/mv3/manifest/key">key</a>"</span><span class="token operator">:</span> <span class="token string">"publicKey"</span><span class="token punctuation">,</span>
  // TODO: Get an example from Ian
  <span class="token property">"<a href="/docs/extensions/mv3/manifest/minimum_chrome_version">minimum_chrome_version</a>"</span><span class="token operator">:</span> <span class="token string">"106"</span><span class="token punctuation">,</span>
  <span class="token property">"<a href="/docs/extensions/mv3/manifest/nacl_modules">nacl_modules</a>"</span><span class="token operator">:</span> <span class="token punctuation">[</span>...<span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token property">"<a href="/docs/extensions/mv3/manifest/oauth2">oauth2</a>"</span><span class="token operator">:</span> <span class="token punctuation">{</span>...<span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token property">"<a href="/docs/extensions/mv3/manifest/offline_enabled">offline_enabled</a>"</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
  <span class="token property">"<a href="/docs/extensions/reference/omnibox">omnibox</a>"</span><span class="token operator">:</span> <span class="token punctuation">{</span>...<span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token property">"<a href="/docs/extensions/reference/permissions/#step-2-declare-optional-permissions-in-the-manifest">optional_host_permissions</a>"</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">"..."</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token property">"<a href="/docs/extensions/reference/permissions/#step-2-declare-optional-permissions-in-the-manifest">optional_permissions</a>"</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">"tabs"</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token property">"<a href="/docs/extensions/mv3/options">options_page</a>"</span><span class="token operator">:</span> <span class="token string">"options.html"</span><span class="token punctuation">,</span>
  <span class="token property">"<a href="/docs/extensions/mv3/options/#embedded_options">options_ui</a>"</span><span class="token operator">:</span> <span class="token punctuation">{</span>...<span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token property">"<a href="/docs/extensions/mv3/declare_permissions/">permissions</a>"</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">"tabs"</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
  // TODO: Add example of the string
  <span class="token property">"<a href="/docs/extensions/mv3/manifest/replacement_web_app">replacement_web_app</a>"</span><span class="token operator">:</span> <span class="token string">"https://path/to/homepage"</span><span class="token punctuation">,</span>
  <span class="token property">"<a href="/docs/extensions/mv3/manifest/requirements">requirements</a>"</span><span class="token operator">:</span> <span class="token punctuation">{</span>...<span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token property">"<a href="/docs/extensions/mv3/manifest/sandbox">sandbox</a>"</span><span class="token operator">:</span> <span class="token punctuation">[</span>...<span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token property">"<a href="/docs/extensions/mv3/manifest/name#short_name">short_name</a>"</span><span class="token operator">:</span> <span class="token string">"Short Name"</span><span class="token punctuation">,</span>
  <span class="token property">"<a href="/docs/extensions/mv3/manifest/storage">storage</a>"</span><span class="token operator">:</span> <span class="token punctuation">{</span>...<span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token property">"<a href="/docs/extensions/reference/ttsEngine">tts_engine</a>"</span><span class="token operator">:</span> <span class="token punctuation">{</span>...<span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token property">"<a href="/docs/extensions/mv3/linux_hosting/#update_url">update_url</a>"</span><span class="token operator">:</span> <span class="token string">"https://path/to/updateInfo.xml"</span><span class="token punctuation">,</span>
  <span class="token property">"<a href="/docs/extensions/mv3/manifest/version#version_name">version_name</a>"</span><span class="token operator">:</span> <span class="token string">"1.0 beta"</span><span class="token punctuation">,</span>
  <span class="token property">"<a href="/docs/extensions/mv3/manifest/web_accessible_resources">web_accessible_resources</a>"</span><span class="token operator">:</span> <span class="token punctuation">[</span>...<span class="token punctuation">]</span>
<span class="token punctuation">}</span></code></pre>


[mdn-json]: https://developer.mozilla.org/docs/Glossary/JSON
