/*
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// TODO: These types exist to fill a gap in TS' built-in types.

interface Entry {
}

interface DirectoryEntry extends Entry {
}

declare namespace chrome {
  /**
   * <em><strong>Note:</strong> this API is currently on hold, without concrete plans to move to stable.</em> Use the <code>chrome.declarativeWebRequest</code> API to intercept, block, or modify requests in-flight. It is significantly faster than the <a href='webRequest'><code>chrome.webRequest</code> API</a> because you can register rules that are evaluated in the browser rather than the JavaScript engine, which reduces roundtrip latencies and allows higher efficiency.
   */
  export namespace declarativeWebRequest {
    export type RequestMatcherInstanceType = "declarativeWebRequest.RequestMatcher";

    export type CancelRequestInstanceType = "declarativeWebRequest.CancelRequest";

    export type RedirectRequestInstanceType = "declarativeWebRequest.RedirectRequest";

    export type RedirectToTransparentImageInstanceType = "declarativeWebRequest.RedirectToTransparentImage";

    export type RedirectToEmptyDocumentInstanceType = "declarativeWebRequest.RedirectToEmptyDocument";

    export type RedirectByRegExInstanceType = "declarativeWebRequest.RedirectByRegEx";

    export type SetRequestHeaderInstanceType = "declarativeWebRequest.SetRequestHeader";

    export type RemoveRequestHeaderInstanceType = "declarativeWebRequest.RemoveRequestHeader";

    export type AddResponseHeaderInstanceType = "declarativeWebRequest.AddResponseHeader";

    export type RemoveResponseHeaderInstanceType = "declarativeWebRequest.RemoveResponseHeader";

    export type IgnoreRulesInstanceType = "declarativeWebRequest.IgnoreRules";

    export type SendMessageToExtensionInstanceType = "declarativeWebRequest.SendMessageToExtension";

    export type AddRequestCookieInstanceType = "declarativeWebRequest.AddRequestCookie";

    export type AddResponseCookieInstanceType = "declarativeWebRequest.AddResponseCookie";

    export type EditRequestCookieInstanceType = "declarativeWebRequest.EditRequestCookie";

    export type EditResponseCookieInstanceType = "declarativeWebRequest.EditResponseCookie";

    export type RemoveRequestCookieInstanceType = "declarativeWebRequest.RemoveRequestCookie";

    export type RemoveResponseCookieInstanceType = "declarativeWebRequest.RemoveResponseCookie";

    export type Stage = "onBeforeRequest" | "onBeforeSendHeaders" | "onHeadersReceived" | "onAuthRequired";

    /**
     * Filters request headers for various criteria. Multiple criteria are evaluated as a conjunction.
     */
    export interface HeaderFilter {
      /**
       * Matches if the header name starts with the specified string.
       */
      namePrefix?: string;

      /**
       * Matches if the header name ends with the specified string.
       */
      nameSuffix?: string;

      /**
       * Matches if the header name contains all of the specified strings.
       */
      nameContains?: string[] | string;

      /**
       * Matches if the header name is equal to the specified string.
       */
      nameEquals?: string;

      /**
       * Matches if the header value starts with the specified string.
       */
      valuePrefix?: string;

      /**
       * Matches if the header value ends with the specified string.
       */
      valueSuffix?: string;

      /**
       * Matches if the header value contains all of the specified strings.
       */
      valueContains?: string[] | string;

      /**
       * Matches if the header value is equal to the specified string.
       */
      valueEquals?: string;

    }

    /**
     * Matches network events by various criteria.
     */
    export interface RequestMatcher {
      /**
       * Matches if the conditions of the UrlFilter are fulfilled for the URL of the request.
       */
      url?: chrome.events.UrlFilter;

      /**
       * Matches if the conditions of the UrlFilter are fulfilled for the 'first party' URL of the request. The 'first party' URL of a request, when present, can be different from the request's target URL, and describes what is considered 'first party' for the sake of third-party checks for cookies.
       */
      firstPartyForCookiesUrl?: chrome.events.UrlFilter;

      /**
       * Matches if the request type of a request is contained in the list. Requests that cannot match any of the types will be filtered out.
       */
      resourceType?: chrome.webRequest.ResourceType[];

      /**
       * Matches if the MIME media type of a response (from the HTTP Content-Type header) is contained in the list.
       */
      contentType?: string[];

      /**
       * Matches if the MIME media type of a response (from the HTTP Content-Type header) is <em>not</em> contained in the list.
       */
      excludeContentType?: string[];

      /**
       * Matches if some of the request headers is matched by one of the HeaderFilters.
       */
      requestHeaders?: HeaderFilter[];

      /**
       * Matches if none of the request headers is matched by any of the HeaderFilters.
       */
      excludeRequestHeaders?: HeaderFilter[];

      /**
       * Matches if some of the response headers is matched by one of the HeaderFilters.
       */
      responseHeaders?: HeaderFilter[];

      /**
       * Matches if none of the response headers is matched by any of the HeaderFilters.
       */
      excludeResponseHeaders?: HeaderFilter[];

      /**
       * If set to true, matches requests that are subject to third-party cookie policies. If set to false, matches all other requests.
       */
      thirdPartyForCookies?: boolean;

      /**
       * Contains a list of strings describing stages. Allowed values are 'onBeforeRequest', 'onBeforeSendHeaders', 'onHeadersReceived', 'onAuthRequired'. If this attribute is present, then it limits the applicable stages to those listed. Note that the whole condition is only applicable in stages compatible with all attributes.
       */
      stages?: Stage[];

      instanceType: RequestMatcherInstanceType;

    }

    /**
     * Declarative event action that cancels a network request.
     */
    export interface CancelRequest {
      instanceType: CancelRequestInstanceType;

    }

    /**
     * Declarative event action that redirects a network request.
     */
    export interface RedirectRequest {
      instanceType: RedirectRequestInstanceType;

      /**
       * Destination to where the request is redirected.
       */
      redirectUrl: string;

    }

    /**
     * Declarative event action that redirects a network request to a transparent image.
     */
    export interface RedirectToTransparentImage {
      instanceType: RedirectToTransparentImageInstanceType;

    }

    /**
     * Declarative event action that redirects a network request to an empty document.
     */
    export interface RedirectToEmptyDocument {
      instanceType: RedirectToEmptyDocumentInstanceType;

    }

    /**
     * Redirects a request by applying a regular expression on the URL. The regular expressions use the <a href="https://github.com/google/re2/blob/master/doc/syntax.txt">RE2 syntax</a>.
     */
    export interface RedirectByRegEx {
      instanceType: RedirectByRegExInstanceType;

      /**
       * A match pattern that may contain capture groups. Capture groups are referenced in the Perl syntax ($1, $2, ...) instead of the RE2 syntax (\1, \2, ...) in order to be closer to JavaScript Regular Expressions.
       */
      from: string;

      /**
       * Destination pattern.
       */
      to: string;

    }

    /**
     * Sets the request header of the specified name to the specified value. If a header with the specified name did not exist before, a new one is created. Header name comparison is always case-insensitive. Each request header name occurs only once in each request.
     */
    export interface SetRequestHeader {
      instanceType: SetRequestHeaderInstanceType;

      /**
       * HTTP request header name.
       */
      name: string;

      /**
       * HTTP request header value.
       */
      value: string;

    }

    /**
     * Removes the request header of the specified name. Do not use SetRequestHeader and RemoveRequestHeader with the same header name on the same request. Each request header name occurs only once in each request.
     */
    export interface RemoveRequestHeader {
      instanceType: RemoveRequestHeaderInstanceType;

      /**
       * HTTP request header name (case-insensitive).
       */
      name: string;

    }

    /**
     * Adds the response header to the response of this web request. As multiple response headers may share the same name, you need to first remove and then add a new response header in order to replace one.
     */
    export interface AddResponseHeader {
      instanceType: AddResponseHeaderInstanceType;

      /**
       * HTTP response header name.
       */
      name: string;

      /**
       * HTTP response header value.
       */
      value: string;

    }

    /**
     * Removes all response headers of the specified names and values.
     */
    export interface RemoveResponseHeader {
      instanceType: RemoveResponseHeaderInstanceType;

      /**
       * HTTP request header name (case-insensitive).
       */
      name: string;

      /**
       * HTTP request header value (case-insensitive).
       */
      value?: string;

    }

    /**
     * Masks all rules that match the specified criteria.
     */
    export interface IgnoreRules {
      instanceType: IgnoreRulesInstanceType;

      /**
       * If set, rules with a lower priority than the specified value are ignored. This boundary is not persisted, it affects only rules and their actions of the same network request stage.
       */
      lowerPriorityThan?: number;

      /**
       * If set, rules with the specified tag are ignored. This ignoring is not persisted, it affects only rules and their actions of the same network request stage. Note that rules are executed in descending order of their priorities. This action affects rules of lower priority than the current rule. Rules with the same priority may or may not be ignored.
       */
      hasTag?: string;

    }

    /**
     * Triggers the $(ref:declarativeWebRequest.onMessage) event.
     */
    export interface SendMessageToExtension {
      instanceType: SendMessageToExtensionInstanceType;

      /**
       * The value that will be passed in the <code>message</code> attribute of the dictionary that is passed to the event handler.
       */
      message: string;

    }

    /**
     * A filter or specification of a cookie in HTTP Requests.
     */
    export interface RequestCookie {
      /**
       * Name of a cookie.
       */
      name?: string;

      /**
       * Value of a cookie, may be padded in double-quotes.
       */
      value?: string;

    }

    /**
     * A specification of a cookie in HTTP Responses.
     */
    export interface ResponseCookie {
      /**
       * Name of a cookie.
       */
      name?: string;

      /**
       * Value of a cookie, may be padded in double-quotes.
       */
      value?: string;

      /**
       * Value of the Expires cookie attribute.
       */
      expires?: string;

      /**
       * Value of the Max-Age cookie attribute
       */
      maxAge?: number;

      /**
       * Value of the Domain cookie attribute.
       */
      domain?: string;

      /**
       * Value of the Path cookie attribute.
       */
      path?: string;

      /**
       * Existence of the Secure cookie attribute.
       */
      secure?: string;

      /**
       * Existence of the HttpOnly cookie attribute.
       */
      httpOnly?: string;

    }

    /**
     * A filter of a cookie in HTTP Responses.
     */
    export interface FilterResponseCookie {
      /**
       * Name of a cookie.
       */
      name?: string;

      /**
       * Value of a cookie, may be padded in double-quotes.
       */
      value?: string;

      /**
       * Value of the Expires cookie attribute.
       */
      expires?: string;

      /**
       * Value of the Max-Age cookie attribute
       */
      maxAge?: number;

      /**
       * Value of the Domain cookie attribute.
       */
      domain?: string;

      /**
       * Value of the Path cookie attribute.
       */
      path?: string;

      /**
       * Existence of the Secure cookie attribute.
       */
      secure?: string;

      /**
       * Existence of the HttpOnly cookie attribute.
       */
      httpOnly?: string;

      /**
       * Inclusive upper bound on the cookie lifetime (specified in seconds after current time). Only cookies whose expiration date-time is in the interval [now, now + ageUpperBound] fulfill this criterion. Session cookies and cookies whose expiration date-time is in the past do not meet the criterion of this filter. The cookie lifetime is calculated from either 'max-age' or 'expires' cookie attributes. If both are specified, 'max-age' is used to calculate the cookie lifetime.
       */
      ageUpperBound?: number;

      /**
       * Inclusive lower bound on the cookie lifetime (specified in seconds after current time). Only cookies whose expiration date-time is set to 'now + ageLowerBound' or later fulfill this criterion. Session cookies do not meet the criterion of this filter. The cookie lifetime is calculated from either 'max-age' or 'expires' cookie attributes. If both are specified, 'max-age' is used to calculate the cookie lifetime.
       */
      ageLowerBound?: number;

      /**
       * Filters session cookies. Session cookies have no lifetime specified in any of 'max-age' or 'expires' attributes.
       */
      sessionCookie?: boolean;

    }

    /**
     * Adds a cookie to the request or overrides a cookie, in case another cookie of the same name exists already. Note that it is preferred to use the Cookies API because this is computationally less expensive.
     */
    export interface AddRequestCookie {
      instanceType: AddRequestCookieInstanceType;

      /**
       * Cookie to be added to the request. No field may be undefined.
       */
      cookie: RequestCookie;

    }

    /**
     * Adds a cookie to the response or overrides a cookie, in case another cookie of the same name exists already. Note that it is preferred to use the Cookies API because this is computationally less expensive.
     */
    export interface AddResponseCookie {
      instanceType: AddResponseCookieInstanceType;

      /**
       * Cookie to be added to the response. The name and value need to be specified.
       */
      cookie: ResponseCookie;

    }

    /**
     * Edits one or more cookies of request. Note that it is preferred to use the Cookies API because this is computationally less expensive.
     */
    export interface EditRequestCookie {
      instanceType: EditRequestCookieInstanceType;

      /**
       * Filter for cookies that will be modified. All empty entries are ignored.
       */
      filter: RequestCookie;

      /**
       * Attributes that shall be overridden in cookies that machted the filter. Attributes that are set to an empty string are removed.
       */
      modification: RequestCookie;

    }

    /**
     * Edits one or more cookies of response. Note that it is preferred to use the Cookies API because this is computationally less expensive.
     */
    export interface EditResponseCookie {
      instanceType: EditResponseCookieInstanceType;

      /**
       * Filter for cookies that will be modified. All empty entries are ignored.
       */
      filter: FilterResponseCookie;

      /**
       * Attributes that shall be overridden in cookies that machted the filter. Attributes that are set to an empty string are removed.
       */
      modification: ResponseCookie;

    }

    /**
     * Removes one or more cookies of request. Note that it is preferred to use the Cookies API because this is computationally less expensive.
     */
    export interface RemoveRequestCookie {
      instanceType: RemoveRequestCookieInstanceType;

      /**
       * Filter for cookies that will be removed. All empty entries are ignored.
       */
      filter: RequestCookie;

    }

    /**
     * Removes one or more cookies of response. Note that it is preferred to use the Cookies API because this is computationally less expensive.
     */
    export interface RemoveResponseCookie {
      instanceType: RemoveResponseCookieInstanceType;

      /**
       * Filter for cookies that will be removed. All empty entries are ignored.
       */
      filter: FilterResponseCookie;

    }

  }

  /**
   * The <code>chrome.events</code> namespace contains common types used by APIs dispatching events to notify you when something interesting happens.
   */
  export namespace events {
    /**
     * Description of a declarative rule for handling events.
     */
    export interface Rule {
      /**
       * Optional identifier that allows referencing this rule.
       */
      id?: string;

      /**
       * Tags can be used to annotate rules and perform operations on sets of rules.
       */
      tags?: string[];

      /**
       * List of conditions that can trigger the actions.
       */
      conditions: any[];

      /**
       * List of actions that are triggered if one of the conditions is fulfilled.
       */
      actions: any[];

      /**
       * Optional priority of this rule. Defaults to 100.
       */
      priority?: number;

    }

    /**
     * An object which allows the addition and removal of listeners for a Chrome event.
     */
    export interface Event {
      /**
       * Registers an event listener <em>callback</em> to an event.
       */
      addListener: (callback: () => void) => void;

      /**
       * Deregisters an event listener <em>callback</em> from an event.
       */
      removeListener: (callback: () => void) => void;

      hasListener: (callback: () => void) => boolean;

      hasListeners: () => boolean;

      /**
       * Registers rules to handle events.
       */
      addRules: (eventName: string, webViewInstanceId: number, rules: Rule[], callback?: (rules: Rule[]) => void) => void;

      /**
       * Returns currently registered rules.
       */
      getRules: (eventName: string, webViewInstanceId: number, ruleIdentifiers: string[], callback: (rules: Rule[]) => void) => void;

      /**
       * Unregisters currently registered rules.
       */
      removeRules: (eventName: string, webViewInstanceId: number, ruleIdentifiers?: string[], callback?: () => void) => void;

    }

    /**
     * Filters URLs for various criteria. See <a href='events#filtered'>event filtering</a>. All criteria are case sensitive.
     */
    export interface UrlFilter {
      /**
       * Matches if the host name of the URL contains a specified string. To test whether a host name component has a prefix 'foo', use hostContains: '.foo'. This matches 'www.foobar.com' and 'foo.com', because an implicit dot is added at the beginning of the host name. Similarly, hostContains can be used to match against component suffix ('foo.') and to exactly match against components ('.foo.'). Suffix- and exact-matching for the last components need to be done separately using hostSuffix, because no implicit dot is added at the end of the host name.
       */
      hostContains?: string;

      /**
       * Matches if the host name of the URL is equal to a specified string.
       */
      hostEquals?: string;

      /**
       * Matches if the host name of the URL starts with a specified string.
       */
      hostPrefix?: string;

      /**
       * Matches if the host name of the URL ends with a specified string.
       */
      hostSuffix?: string;

      /**
       * Matches if the path segment of the URL contains a specified string.
       */
      pathContains?: string;

      /**
       * Matches if the path segment of the URL is equal to a specified string.
       */
      pathEquals?: string;

      /**
       * Matches if the path segment of the URL starts with a specified string.
       */
      pathPrefix?: string;

      /**
       * Matches if the path segment of the URL ends with a specified string.
       */
      pathSuffix?: string;

      /**
       * Matches if the query segment of the URL contains a specified string.
       */
      queryContains?: string;

      /**
       * Matches if the query segment of the URL is equal to a specified string.
       */
      queryEquals?: string;

      /**
       * Matches if the query segment of the URL starts with a specified string.
       */
      queryPrefix?: string;

      /**
       * Matches if the query segment of the URL ends with a specified string.
       */
      querySuffix?: string;

      /**
       * Matches if the URL (without fragment identifier) contains a specified string. Port numbers are stripped from the URL if they match the default port number.
       */
      urlContains?: string;

      /**
       * Matches if the URL (without fragment identifier) is equal to a specified string. Port numbers are stripped from the URL if they match the default port number.
       */
      urlEquals?: string;

      /**
       * Matches if the URL (without fragment identifier) matches a specified regular expression. Port numbers are stripped from the URL if they match the default port number. The regular expressions use the <a href="https://github.com/google/re2/blob/master/doc/syntax.txt">RE2 syntax</a>.
       */
      urlMatches?: string;

      /**
       * Matches if the URL without query segment and fragment identifier matches a specified regular expression. Port numbers are stripped from the URL if they match the default port number. The regular expressions use the <a href="https://github.com/google/re2/blob/master/doc/syntax.txt">RE2 syntax</a>.
       */
      originAndPathMatches?: string;

      /**
       * Matches if the URL (without fragment identifier) starts with a specified string. Port numbers are stripped from the URL if they match the default port number.
       */
      urlPrefix?: string;

      /**
       * Matches if the URL (without fragment identifier) ends with a specified string. Port numbers are stripped from the URL if they match the default port number.
       */
      urlSuffix?: string;

      /**
       * Matches if the scheme of the URL is equal to any of the schemes specified in the array.
       */
      schemes?: string[];

      /**
       * Matches if the port of the URL is contained in any of the specified port lists. For example <code>[80, 443, [1000, 1200]]</code> matches all requests on port 80, 443 and in the range 1000-1200.
       */
      ports?: (number | number[])[];

    }

  }

  /**
   * The <code>chrome.extensionTypes</code> API contains type declarations for Chrome extensions.
   */
  export namespace extensionTypes {
    /**
     * The format of an image.
     */
    export type ImageFormat = "jpeg" | "png";

    /**
     * Details about the format and quality of an image.
     */
    export interface ImageDetails {
      /**
       * The format of the resulting image.  Default is <code>"jpeg"</code>.
       */
      format?: ImageFormat;

      /**
       * When format is <code>"jpeg"</code>, controls the quality of the resulting image.  This value is ignored for PNG images.  As quality is decreased, the resulting image will have more visual artifacts, and the number of bytes needed to store it will decrease.
       */
      quality?: number;

    }

    /**
     * The soonest that the JavaScript or CSS will be injected into the tab.
     */
    export type RunAt = "document_start" | "document_end" | "document_idle";

    /**
     * The <a href="https://www.w3.org/TR/css3-cascade/#cascading-origins">origin</a> of injected CSS.
     */
    export type CSSOrigin = "author" | "user";

    /**
     * Details of the script or CSS to inject. Either the code or the file property must be set, but both may not be set at the same time.
     */
    export interface InjectDetails {
      /**
       * JavaScript or CSS code to inject.<br><br><b>Warning:</b><br>Be careful using the <code>code</code> parameter. Incorrect use of it may open your extension to <a href="https://en.wikipedia.org/wiki/Cross-site_scripting">cross site scripting</a> attacks.
       */
      code?: string;

      /**
       * JavaScript or CSS file to inject.
       */
      file?: string;

      /**
       * If allFrames is <code>true</code>, implies that the JavaScript or CSS should be injected into all frames of current page. By default, it's <code>false</code> and is only injected into the top frame. If <code>true</code> and <code>frameId</code> is set, then the code is inserted in the selected frame and all of its child frames.
       */
      allFrames?: boolean;

      /**
       * The <a href='webNavigation#frame_ids'>frame</a> where the script or CSS should be injected. Defaults to 0 (the top-level frame).
       */
      frameId?: number;

      /**
       * If matchAboutBlank is true, then the code is also injected in about:blank and about:srcdoc frames if your extension has access to its parent document. Code cannot be inserted in top-level about:-frames. By default it is <code>false</code>.
       */
      matchAboutBlank?: boolean;

      /**
       * The soonest that the JavaScript or CSS will be injected into the tab. Defaults to "document_idle".
       */
      runAt?: RunAt;

      /**
       * The <a href="https://www.w3.org/TR/css3-cascade/#cascading-origins">origin</a> of the CSS to inject. This may only be specified for CSS, not JavaScript. Defaults to <code>"author"</code>.
       */
      cssOrigin?: CSSOrigin;

    }

    /**
     * Details of the CSS to remove. Either the code or the file property must be set, but both may not be set at the same time.
     */
    export interface DeleteInjectionDetails {
      /**
       * CSS code to remove.
       */
      code?: string;

      /**
       * CSS file to remove.
       */
      file?: string;

      /**
       * If allFrames is <code>true</code>, implies that the CSS should be removed from all frames of current page. By default, it's <code>false</code> and is only removed from the top frame. If <code>true</code> and <code>frameId</code> is set, then the code is removed from the selected frame and all of its child frames.
       */
      allFrames?: boolean;

      /**
       * The <a href='webNavigation#frame_ids'>frame</a> from where the CSS should be removed. Defaults to 0 (the top-level frame).
       */
      frameId?: number;

      /**
       * If matchAboutBlank is true, then the code is also removed from about:blank and about:srcdoc frames if your extension has access to its parent document. By default it is <code>false</code>.
       */
      matchAboutBlank?: boolean;

      /**
       * The <a href="https://www.w3.org/TR/css3-cascade/#cascading-origins">origin</a> of the CSS to remove. Defaults to <code>"author"</code>.
       */
      cssOrigin?: CSSOrigin;

    }

  }

  /**
   * Schemas for structured manifest entries
   */
  export namespace extensionsManifestTypes {
    /**
     * This API provides programmatic access to the user interface elements of Chrome. This includes everything in the web view, and optionally Chrome's full user interface.
     */
    export type automation = boolean | {desktop?: boolean, matches?: string[], interact?: boolean};

    /**
     * The <code>content_capabilities</code> manifest entry allows an extension to grant certain additional capabilities to web contents whose locations match a given set of URL patterns.
     */
    export interface ContentCapabilities {
      /**
       * The set of URL patterns to match against. If any of the given patterns match a URL, its contents will be granted the specified capabilities.
       */
      matches: string[];

      /**
       * The set of capabilities to grant matched contents. This is currently limited to <code>clipboardRead</code>, <code>clipboardWrite</code>, and <code>unlimitedStorage</code>.
       */
      permissions: string[];

    }

    export interface ExternallyConnectable {
      /**
       * <p>The IDs of extensions or apps that are allowed to connect. If left empty or unspecified, no extensions or apps can connect.</p><p>The wildcard <code>"*"</code> will allow all extensions and apps to connect.</p>
       */
      ids?: string[];

      /**
       * <p>The URL patterns for <em>web pages</em> that are allowed to connect. <em>This does not affect content scripts.</em> If left empty or unspecified, no web pages can connect.</p><p>Patterns cannot include wildcard domains nor subdomains of <a href="http://publicsuffix.org/list/">(effective) top level domains</a>; <code>*://google.com/*</code> and <code>http://*.chromium.org/*</code> are valid, while <code>&lt;all_urls&gt;</code>, <code>http://./*</code>, <code>*://*.com/*</code>, and even <code>http://*.appspot.com/*</code> are not.</p>
       */
      matches?: string[];

      /**
       * If <code>true</code>, messages sent via $(ref:runtime.connect) or $(ref:runtime.sendMessage) will set $(ref:runtime.MessageSender.tlsChannelId) if those methods request it to be. If <code>false</code>, $(ref:runtime.MessageSender.tlsChannelId) will never be set under any circumstance.
       */
      accepts_tls_channel_id?: boolean;

    }

    /**
     * The <code>options_ui</code> manifest property declares how the options page should be displayed.
     */
    export interface OptionsUI {
      /**
       * The path to your options page, relative to your extension's root.
       */
      page: string;

      /**
       * If <code>true</code>, a Chrome user agent stylesheet will be applied to your options page. The default value is <code>false</code>. We do not recommend you enable it as it no longer results in a consistent UI with Chrome. This option will be removed in Manifest V3.
       */
      chrome_style?: boolean;

      /**
       * <p>If <code>true</code>, your extension's options page will be opened in a new tab rather than embedded in <em>chrome://extensions</em>. The default is <code>false</code>, and we recommend that you don't change it.</p><p><strong>This is only useful to delay the inevitable deprecation of the old options UI!</strong> It will be removed soon, so try not to use it. It will break.</p>
       */
      open_in_tab?: boolean;

    }

    /**
     * <p>A single string or a list of strings representing host:port patterns.</p>
     */
    export type SocketHostPatterns = string | string[];

    /**
     * The <code>sockets</code> manifest property declares which sockets operations an app can issue.
     */
    export interface sockets {
      /**
       * The <code>udp</code> manifest property declares which sockets.udp operations an app can issue.
       */
      udp?: {bind?: SocketHostPatterns, send?: SocketHostPatterns, multicastMembership?: SocketHostPatterns};

      /**
       * The <code>tcp</code> manifest property declares which sockets.tcp operations an app can issue.
       */
      tcp?: {connect?: SocketHostPatterns};

      /**
       * The <code>tcpServer</code> manifest property declares which sockets.tcpServer operations an app can issue.
       */
      tcpServer?: {listen?: SocketHostPatterns};

    }

    /**
     * The <code>bluetooth</code> manifest property give permission to an app to use the $(ref:bluetooth) API. A list of UUIDs can be optionally specified to enable communication with devices.
     */
    export interface bluetooth {
      /**
       * The <code>uuids</code> manifest property declares the list of protocols, profiles and services that an app can communicate using.
       */
      uuids?: string[];

      /**
       * If <code>true</code>, gives permission to an app to use the $(ref:bluetoothSocket) API
       */
      socket?: boolean;

      /**
       * If <code>true</code>, gives permission to an app to use the $(ref:bluetoothLowEnergy) API
       */
      low_energy?: boolean;

      /**
       * If <code>true</code>, gives permission to an app to use the advertisement functions in the $(ref:bluetoothLowEnergy) API
       */
      peripheral?: boolean;

    }

    /**
     * The <code>usb_printers</code> manifest property lists the USB printers supported by an app implementing the $(ref:printerProvider) API.
     */
    export interface UsbPrinters {
      /**
       * A list of $(ref:usb.DeviceFilter USB device filters) matching supported devices. A device only needs to match one of the provided filters. A <code>vendorId</code> is required and only one of <code>productId</code> or <code>interfaceClass</code> may be provided.
       */
      filters: {vendorId: number, productId?: number, interfaceClass?: number, interfaceSubclass?: number, interfaceProtocol?: number}[];

    }

    /**
     * The <code>kiosk_secondary_apps</code> manifest property lists the secondary kiosk apps to be deployed by the primary kiosk app.
     */
    export type KioskSecondaryApps = {id: string, enabled_on_launch?: boolean}[];

  }

  /**
   * Use the <code>chrome.idle</code> API to detect when the machine's idle state changes.
   */
  export namespace idle {
    /**
     * Returns "locked" if the system is locked, "idle" if the user has not generated any input for a specified number of seconds, or "active" otherwise.
     */
    export function queryState(detectionIntervalInSeconds: number, callback: (newState: IdleState) => void): void;

    /**
     * Sets the interval, in seconds, used to determine when the system is in an idle state for onStateChanged events. The default interval is 60 seconds.
     */
    export function setDetectionInterval(intervalInSeconds: number): void;

    /**
     * Gets the time, in seconds, it takes until the screen is locked automatically while idle. Returns a zero duration if the screen is never locked automatically. Currently supported on Chrome OS only.
     */
    export function getAutoLockDelay(callback: (delay: number) => void): void;

    export type IdleState = "active" | "idle" | "locked";

  }

  /**
   * Dummy namepsace for the incognito manifest key.
   */
  export namespace incognito {
    export type IncognitoMode = "split" | "spanning" | "not_allowed";

  }

  /**
   * The <code>chrome.management</code> API provides ways to manage the list of extensions/apps that are installed and running. It is particularly useful for extensions that <a href='override'>override</a> the built-in New Tab page.
   */
  export namespace management {
    /**
     * Returns a list of information about installed extensions and apps.
     */
    export function getAll(callback: (result: ExtensionInfo[]) => void): void;

    /**
     * Returns information about the installed extension, app, or theme that has the given ID.
     */
    export function get(id: string, callback: (result: ExtensionInfo) => void): void;

    /**
     * Returns information about the calling extension, app, or theme. Note: This function can be used without requesting the 'management' permission in the manifest.
     */
    export function getSelf(callback: (result: ExtensionInfo) => void): void;

    /**
     * Returns a list of <a href='permission_warnings'>permission warnings</a> for the given extension id.
     */
    export function getPermissionWarningsById(id: string, callback: (permissionWarnings: string[]) => void): void;

    /**
     * Returns a list of <a href='permission_warnings'>permission warnings</a> for the given extension manifest string. Note: This function can be used without requesting the 'management' permission in the manifest.
     */
    export function getPermissionWarningsByManifest(manifestStr: string, callback: (permissionWarnings: string[]) => void): void;

    /**
     * Enables or disables an app or extension. In most cases this function must be called in the context of a user gesture (e.g. an onclick handler for a button), and may present the user with a native confirmation UI as a way of preventing abuse.
     */
    export function setEnabled(id: string, enabled: boolean, callback: () => void): void;

    /**
     * Uninstalls a currently installed app or extension.
     */
    export function uninstall(id: string, options: UninstallOptions, callback: () => void): void;

    /**
     * Uninstalls the calling extension. Note: This function can be used without requesting the 'management' permission in the manifest.
     */
    export function uninstallSelf(options: UninstallOptions, callback: () => void): void;

    /**
     * Launches an application.
     */
    export function launchApp(id: string, callback: () => void): void;

    /**
     * Display options to create shortcuts for an app. On Mac, only packaged app shortcuts can be created.
     */
    export function createAppShortcut(id: string, callback: () => void): void;

    /**
     * Set the launch type of an app.
     */
    export function setLaunchType(id: string, launchType: LaunchType, callback: () => void): void;

    /**
     * Generate an app for a URL. Returns the generated bookmark app.
     */
    export function generateAppForLink(url: string, title: string, callback: (result: ExtensionInfo) => void): void;

    /**
     * Checks if the replacement android app can be installed. Errors generated by this API are reported by setting $(ref:runtime.lastError) and executing the function's regular callback.
     */
    export function canInstallReplacementAndroidApp(callback: (result: boolean) => void): void;

    /**
     * Prompts the user to install the replacement Android app from the manifest. Errors generated by this API are reported by setting $(ref:runtime.lastError) and executing the function's regular callback.
     */
    export function installReplacementAndroidApp(callback: () => void): void;

    /**
     * Launches the replacement_web_app specified in the manifest. Prompts the user to install if not already installed.
     */
    export function installReplacementWebApp(callback: () => void): void;

    /**
     * Information about an icon belonging to an extension, app, or theme.
     */
    export interface IconInfo {
      /**
       * A number representing the width and height of the icon. Likely values include (but are not limited to) 128, 48, 24, and 16.
       */
      size: number;

      /**
       * The URL for this icon image. To display a grayscale version of the icon (to indicate that an extension is disabled, for example), append <code>?grayscale=true</code> to the URL.
       */
      url: string;

    }

    /**
     * These are all possible app launch types.
     */
    export type LaunchType = "OPEN_AS_REGULAR_TAB" | "OPEN_AS_PINNED_TAB" | "OPEN_AS_WINDOW" | "OPEN_FULL_SCREEN";

    /**
     * A reason the item is disabled.
     */
    export type ExtensionDisabledReason = "unknown" | "permissions_increase";

    /**
     * The type of this extension, app, or theme.
     */
    export type ExtensionType = "extension" | "hosted_app" | "packaged_app" | "legacy_packaged_app" | "theme" | "login_screen_extension";

    /**
     * How the extension was installed. One of<br><var>admin</var>: The extension was installed because of an administrative policy,<br><var>development</var>: The extension was loaded unpacked in developer mode,<br><var>normal</var>: The extension was installed normally via a .crx file,<br><var>sideload</var>: The extension was installed by other software on the machine,<br><var>other</var>: The extension was installed by other means.
     */
    export type ExtensionInstallType = "admin" | "development" | "normal" | "sideload" | "other";

    /**
     * Information about an installed extension, app, or theme.
     */
    export interface ExtensionInfo {
      /**
       * The extension's unique identifier.
       */
      id: string;

      /**
       * The name of this extension, app, or theme.
       */
      name: string;

      /**
       * A short version of the name of this extension, app, or theme.
       */
      shortName: string;

      /**
       * The description of this extension, app, or theme.
       */
      description: string;

      /**
       * The <a href='manifest/version'>version</a> of this extension, app, or theme.
       */
      version: string;

      /**
       * The <a href='manifest/version#version_name'>version name</a> of this extension, app, or theme if the manifest specified one.
       */
      versionName?: string;

      /**
       * Whether this extension can be disabled or uninstalled by the user.
       */
      mayDisable: boolean;

      /**
       * Whether this extension can be enabled by the user. This is only returned for extensions which are not enabled.
       */
      mayEnable?: boolean;

      /**
       * Whether it is currently enabled or disabled.
       */
      enabled: boolean;

      /**
       * A reason the item is disabled.
       */
      disabledReason?: ExtensionDisabledReason;

      /**
       * True if this is an app.
       */
      isApp: boolean;

      /**
       * The type of this extension, app, or theme.
       */
      type: ExtensionType;

      /**
       * The launch url (only present for apps).
       */
      appLaunchUrl?: string;

      /**
       * The URL of the homepage of this extension, app, or theme.
       */
      homepageUrl?: string;

      /**
       * The update URL of this extension, app, or theme.
       */
      updateUrl?: string;

      /**
       * Whether the extension, app, or theme declares that it supports offline.
       */
      offlineEnabled: boolean;

      /**
       * The url for the item's options page, if it has one.
       */
      optionsUrl: string;

      /**
       * A list of icon information. Note that this just reflects what was declared in the manifest, and the actual image at that url may be larger or smaller than what was declared, so you might consider using explicit width and height attributes on img tags referencing these images. See the <a href='manifest/icons'>manifest documentation on icons</a> for more details.
       */
      icons?: IconInfo[];

      /**
       * Returns a list of API based permissions.
       */
      permissions: string[];

      /**
       * Returns a list of host based permissions.
       */
      hostPermissions: string[];

      /**
       * How the extension was installed.
       */
      installType: ExtensionInstallType;

      /**
       * The app launch type (only present for apps).
       */
      launchType?: LaunchType;

      /**
       * The currently available launch types (only present for apps).
       */
      availableLaunchTypes?: LaunchType[];

    }

    /**
     * Information about an icon belonging to an extension, app, or theme.
     */
    export interface UninstallOptions {
      /**
       * Whether or not a confirm-uninstall dialog should prompt the user. Defaults to false for self uninstalls. If an extension uninstalls another extension, this parameter is ignored and the dialog is always shown.
       */
      showConfirmDialog?: boolean;

    }

  }

  export namespace metricsPrivate {
    /**
     * Get details about a histogram displayed at chrome://histogram.
     */
    export function getHistogram(name: string, callback: (histogram: Histogram) => void): void;

    /**
     * Returns true if the user opted in to sending crash reports.
     */
    export function getIsCrashReportingEnabled(callback: (is_enabled: boolean) => void): void;

    /**
     * Returns the group name chosen for the named trial, or the empty string if the trial does not exist or is not enabled.
     */
    export function getFieldTrial(name: string, callback: (group: string) => void): void;

    /**
     * Returns variation parameters for the named trial if available, or undefined otherwise.
     */
    export function getVariationParams(name: string, callback: (params?: {[name: string]: string}) => void): void;

    /**
     * Records an action performed by the user.
     */
    export function recordUserAction(name: string): void;

    /**
     * Records a percentage value from 1 to 100.
     */
    export function recordPercentage(metricName: string, value: number): void;

    /**
     * Records a value than can range from 1 to 1,000,000.
     */
    export function recordCount(metricName: string, value: number): void;

    /**
     * Records a value than can range from 1 to 100.
     */
    export function recordSmallCount(metricName: string, value: number): void;

    /**
     * Records a value than can range from 1 to 10,000.
     */
    export function recordMediumCount(metricName: string, value: number): void;

    /**
     * Records an elapsed time of no more than 10 seconds.  The sample value is specified in milliseconds.
     */
    export function recordTime(metricName: string, value: number): void;

    /**
     * Records an elapsed time of no more than 3 minutes.  The sample value is specified in milliseconds.
     */
    export function recordMediumTime(metricName: string, value: number): void;

    /**
     * Records an elapsed time of no more than 1 hour.  The sample value is specified in milliseconds.
     */
    export function recordLongTime(metricName: string, value: number): void;

    /**
     * Increments the count associated with the hash of |value| in the sparse histogram defined by the |metricName|.
     */
    export function recordSparseHashable(metricName: string, value: string): void;

    /**
     * Increments the count associated with |value| in the sparse histogram defined by the |metricName|.
     */
    export function recordSparseValue(metricName: string, value: number): void;

    /**
     * Adds a value to the given metric.
     */
    export function recordValue(metric: MetricType, value: number): void;

    /**
     * Records a boolean value to the given metric. Analogous to base::UmaHistogramBoolean().
     */
    export function recordBoolean(metricName: string, value: boolean): void;

    /**
     * Records an enumeration value to the given metric. Analogous to base::UmaHistogramEnumeration(). Use recordSparseValue for sparse enums or enums not starting at 0.
     */
    export function recordEnumerationValue(metricName: string, value: number, enumSize: number): void;

    /**
     * The type of metric, such as 'histogram-log' or 'histogram-linear'.
     */
    export type MetricTypeType = "histogram-log" | "histogram-linear";

    /**
     * Describes the type of metric that is to be collected.
     */
    export interface MetricType {
      /**
       * A unique name within the extension for the metric.
       */
      metricName: string;

      type: MetricTypeType;

      /**
       * The minimum sample value to be recoded.  Must be greater than zero.
       */
      min: number;

      /**
       * The maximum sample value to be recoded.
       */
      max: number;

      /**
       * The number of buckets to use when separating the recorded values.
       */
      buckets: number;

    }

    export interface HistogramBucket {
      /**
       * Minimum sample value that can be stored in this bucket (i.e. inclusive).
       */
      min: number;

      /**
       * Exclusive maximum value for samples stored this bucket.
       */
      max: number;

      /**
       * Number of samples stored in this bucket.
       */
      count: number;

    }

    export interface Histogram {
      /**
       * Sum of the all entries.
       */
      sum: number;

      /**
       * Buckets containing samples.
       */
      buckets: HistogramBucket[];

    }

  }

  /**
   * Use the <code>chrome.runtime</code> API to retrieve the background page, return details about the manifest, and listen for and respond to events in the app or extension lifecycle. You can also use this API to convert the relative path of URLs to fully-qualified URLs.
   */
  export namespace runtime {
    /**
     * This will be defined during an API method callback if there was an error
     */
    export type lastError = {message?: string} | undefined;

    /**
     * The ID of the extension/app.
     */
    export type id = string;

    /**
     * Retrieves the JavaScript 'window' object for the background page running inside the current extension/app. If the background page is an event page, the system will ensure it is loaded before calling the callback. If there is no background page, an error is set.
     */
    export function getBackgroundPage(callback: (backgroundPage?: Window) => void): void;

    /**
     * <p>Open your Extension's options page, if possible.</p><p>The precise behavior may depend on your manifest's <code><a href="optionsV2">options_ui</a></code> or <code><a href="options">options_page</a></code> key, or what Chrome happens to support at the time. For example, the page may be opened in a new tab, within chrome://extensions, within an App, or it may just focus an open options page. It will never cause the caller page to reload.</p><p>If your Extension does not declare an options page, or Chrome failed to create one for some other reason, the callback will set $(ref:lastError).</p>
     */
    export function openOptionsPage(callback: () => void): void;

    /**
     * Returns details about the app or extension from the manifest. The object returned is a serialization of the full <a href="manifest.html">manifest file</a>.
     */
    export function getManifest(): {[name: string]: any};

    /**
     * Converts a relative path within an app/extension install directory to a fully-qualified URL.
     */
    export function getURL(path: string): string;

    /**
     * Sets the URL to be visited upon uninstallation. This may be used to clean up server-side data, do analytics, and implement surveys. Maximum 255 characters.
     */
    export function setUninstallURL(url: string, callback: () => void): void;

    /**
     * Reloads the app or extension. This method is not supported in kiosk mode. For kiosk mode, use chrome.runtime.restart() method.
     */
    export function reload(): void;

    /**
     * <p>Requests an immediate update check be done for this app/extension.</p> <p><b>Important</b>: Most extensions/apps should <b>not</b> use this method, since chrome already does automatic checks every few hours, and you can listen for the $(ref:runtime.onUpdateAvailable) event without needing to call requestUpdateCheck.</p><p>This method is only appropriate to call in very limited circumstances, such as if your extension/app talks to a backend service, and the backend service has determined that the client extension/app version is very far out of date and you'd like to prompt a user to update. Most other uses of requestUpdateCheck, such as calling it unconditionally based on a repeating timer, probably only serve to waste client, network, and server resources.</p>
     */
    export function requestUpdateCheck(callback: (status: RequestUpdateCheckStatus, details?: {version: string}) => void): void;

    /**
     * Restart the ChromeOS device when the app runs in kiosk mode. Otherwise, it's no-op.
     */
    export function restart(): void;

    /**
     * Restart the ChromeOS device when the app runs in kiosk mode after the given seconds. If called again before the time ends, the reboot will be delayed. If called with a value of -1, the reboot will be cancelled. It's a no-op in non-kiosk mode. It's only allowed to be called repeatedly by the first extension to invoke this API.
     */
    export function restartAfterDelay(seconds: number, callback: () => void): void;

    /**
     * Attempts to connect to connect listeners within an extension/app (such as the background page), or other extensions/apps. This is useful for content scripts connecting to their extension processes, inter-app/extension communication, and <a href="manifest/externally_connectable.html">web messaging</a>. Note that this does not connect to any listeners in a content script. Extensions may connect to content scripts embedded in tabs via $(ref:tabs.connect).
     */
    export function connect(extensionId: string, connectInfo: {name?: string, includeTlsChannelId?: boolean}): Port;

    /**
     * Connects to a native application in the host machine. See <a href="nativeMessaging">Native Messaging</a> for more information.
     */
    export function connectNative(application: string): Port;

    /**
     * Sends a single message to event listeners within your extension/app or a different extension/app. Similar to $(ref:runtime.connect) but only sends a single message, with an optional response. If sending to your extension, the $(ref:runtime.onMessage) event will be fired in every frame of your extension (except for the sender's frame), or $(ref:runtime.onMessageExternal), if a different extension. Note that extensions cannot send messages to content scripts using this method. To send messages to content scripts, use $(ref:tabs.sendMessage).
     */
    export function sendMessage(extensionId: string, message: any, options: {includeTlsChannelId?: boolean}, responseCallback: (response: any) => void): void;

    /**
     * Sends a single message to event listeners within your extension/app or a different extension/app. Similar to $(ref:runtime.connect) but only sends a single message, with an optional response. If sending to your extension, the $(ref:runtime.onMessage) event will be fired in every frame of your extension (except for the sender's frame), or $(ref:runtime.onMessageExternal), if a different extension. Note that extensions cannot send messages to content scripts using this method. To send messages to content scripts, use $(ref:tabs.sendMessage).
     */
    export function sendMessage(message: any, options: {includeTlsChannelId?: boolean}, responseCallback: (response: any) => void): void;

    /**
     * Send a single message to a native application.
     */
    export function sendNativeMessage(application: string, message: {[name: string]: any}, responseCallback: (response: any) => void): void;

    /**
     * Returns information about the current platform.
     */
    export function getPlatformInfo(callback: (platformInfo: PlatformInfo) => void): void;

    /**
     * Returns a DirectoryEntry for the package directory.
     */
    export function getPackageDirectoryEntry(callback: (directoryEntry: DirectoryEntry) => void): void;

    /**
     * An object which allows two way communication with other pages. See <a href="messaging#connect">Long-lived connections</a> for more information.
     */
    export interface Port {
      /**
       * The name of the port, as specified in the call to $(ref:runtime.connect).
       */
      name: string;

      /**
       * Immediately disconnect the port. Calling <code>disconnect()</code> on an already-disconnected port has no effect. When a port is disconnected, no new events will be dispatched to this port.
       */
      disconnect: () => void;

      /**
       * Fired when the port is disconnected from the other end(s). $(ref:runtime.lastError) may be set if the port was disconnected by an error. If the port is closed via $(ref:Port.disconnect disconnect), then this event is <em>only</em> fired on the other end. This event is fired at most once (see also <a href="messaging#port-lifetime">Port lifetime</a>). The first and only parameter to the event handler is this disconnected port.
       */
      onDisconnect: chrome.events.Event;

      /**
       * This event is fired when $(ref:Port.postMessage postMessage) is called by the other end of the port. The first parameter is the message, the second parameter is the port that received the message.
       */
      onMessage: chrome.events.Event;

      /**
       * Send a message to the other end of the port. If the port is disconnected, an error is thrown.
       */
      postMessage: (message: any) => void;

      /**
       * This property will <b>only</b> be present on ports passed to $(ref:runtime.onConnect onConnect) / $(ref:runtime.onConnectExternal onConnectExternal) / $(ref:runtime.onConnectExternal onConnectNative) listeners.
       */
      sender?: MessageSender;

    }

    /**
     * An object containing information about the script context that sent a message or request.
     */
    export interface MessageSender {
      /**
       * The $(ref:tabs.Tab) which opened the connection, if any. This property will <strong>only</strong> be present when the connection was opened from a tab (including content scripts), and <strong>only</strong> if the receiver is an extension, not an app.
       */
      tab?: chrome.tabs.Tab;

      /**
       * The <a href='webNavigation#frame_ids'>frame</a> that opened the connection. 0 for top-level frames, positive for child frames. This will only be set when <code>tab</code> is set.
       */
      frameId?: number;

      /**
       * The guest process id of the requesting webview, if available. Only available for component extensions.
       */
      guestProcessId?: number;

      /**
       * The guest render frame routing id of the requesting webview, if available. Only available for component extensions.
       */
      guestRenderFrameRoutingId?: number;

      /**
       * The ID of the extension or app that opened the connection, if any.
       */
      id?: string;

      /**
       * The URL of the page or frame that opened the connection. If the sender is in an iframe, it will be iframe's URL not the URL of the page which hosts it.
       */
      url?: string;

      /**
       * The name of the native application that opened the connection, if any.
       */
      nativeApplication?: string;

      /**
       * The TLS channel ID of the page or frame that opened the connection, if requested by the extension or app, and if available.
       */
      tlsChannelId?: string;

      /**
       * The origin of the page or frame that opened the connection. It can vary from the url property (e.g., about:blank) or can be opaque (e.g., sandboxed iframes). This is useful for identifying if the origin can be trusted if we can't immediately tell from the URL.
       */
      origin?: string;

    }

    /**
     * The operating system chrome is running on.
     */
    export type PlatformOs = "mac" | "win" | "android" | "cros" | "linux" | "openbsd";

    /**
     * The machine's processor architecture.
     */
    export type PlatformArch = "arm" | "arm64" | "x86-32" | "x86-64" | "mips" | "mips64";

    /**
     * The native client architecture. This may be different from arch on some platforms.
     */
    export type PlatformNaclArch = "arm" | "x86-32" | "x86-64" | "mips" | "mips64";

    /**
     * An object containing information about the current platform.
     */
    export interface PlatformInfo {
      /**
       * The operating system chrome is running on.
       */
      os: PlatformOs;

      /**
       * The machine's processor architecture.
       */
      arch: PlatformArch;

      /**
       * The native client architecture. This may be different from arch on some platforms.
       */
      nacl_arch: PlatformNaclArch;

    }

    /**
     * Result of the update check.
     */
    export type RequestUpdateCheckStatus = "throttled" | "no_update" | "update_available";

    /**
     * The reason that this event is being dispatched.
     */
    export type OnInstalledReason = "install" | "update" | "chrome_update" | "shared_module_update";

    /**
     * The reason that the event is being dispatched. 'app_update' is used when the restart is needed because the application is updated to a newer version. 'os_update' is used when the restart is needed because the browser/OS is updated to a newer version. 'periodic' is used when the system runs for more than the permitted uptime set in the enterprise policy.
     */
    export type OnRestartRequiredReason = "app_update" | "os_update" | "periodic";

  }

  /**
   * Use the <code>chrome.storage</code> API to store, retrieve, and track changes to user data.
   */
  export namespace storage {
    /**
     * Items in the <code>sync</code> storage area are synced using Chrome Sync.
     */
    export var sync: StorageArea;

    /**
     * Items in the <code>local</code> storage area are local to each machine.
     */
    export var local: StorageArea;

    /**
     * Items in the <code>managed</code> storage area are set by the domain administrator, and are read-only for the extension; trying to modify this namespace results in an error.
     */
    export var managed: StorageArea;

    export interface StorageChange {
      /**
       * The old value of the item, if there was an old value.
       */
      oldValue?: any;

      /**
       * The new value of the item, if there is a new value.
       */
      newValue?: any;

    }

    export interface StorageArea {
      /**
       * Gets one or more items from storage.
       */
      get: (keys: string | string[] | null | {[name: string]: null | any}, callback: (items: {[name: string]: any}) => void) => void;

      /**
       * Gets the amount of space (in bytes) being used by one or more items.
       */
      getBytesInUse: (keys: string | string[], callback: (bytesInUse: number) => void) => void;

      /**
       * Sets multiple items.
       */
      set: (items: null | {[name: string]: null | any}, callback?: () => void) => void;

      /**
       * Removes one or more items from storage.
       */
      remove: (keys: string | string[], callback?: () => void) => void;

      /**
       * Removes all items from storage.
       */
      clear: (callback?: () => void) => void;

    }

  }

  export namespace test {
    /**
     * Gives configuration options set by the test.
     */
    export function getConfig(callback: (testConfig: {customArg?: string, ftpServer?: {port: number}, testServer?: {port: number}, testDataDirectory?: string, testWebSocketPort?: number, loginStatus?: {isLoggedIn?: boolean, isScreenLocked?: boolean}}) => void): void;

    /**
     * Notifies the browser process that test code running in the extension failed.  This is only used for internal unit testing.
     */
    export function notifyFail(message: string): void;

    /**
     * Notifies the browser process that test code running in the extension passed.  This is only used for internal unit testing.
     */
    export function notifyPass(message: string): void;

    /**
     * Logs a message during internal unit testing.
     */
    export function log(message: string): void;

    /**
     * Sends a string message to the browser process, generating a Notification that C++ test code can wait for.
     */
    export function sendMessage(message: string, callback: (response: string) => void): void;

    export function callbackAdded(): void;

    export function fail(message: any): void;

    export function succeed(message: any): void;

    /**
     * Returns an instance of the module system for the given context.
     */
    export function getModuleSystem(context: any): any;

    export function assertTrue(test: string | boolean, message: string): void;

    export function assertFalse(test: string | boolean, message: string): void;

    export function checkDeepEq(expected: any, actual: any): void;

    export function assertEq(expected: any, actual: any, message: string): void;

    export function assertNoLastError(): void;

    export function assertLastError(expectedError: string): void;

    export function assertThrows(fn: () => void, self: {[name: string]: any}, args: any[], message: string | RegExp): void;

    export function assertThrows(fn: () => void, args: any[], message: string | RegExp): void;

    export function callback(func: () => void, expectedError: string): void;

    export function listenOnce(event: any, func: () => void): void;

    export function listenForever(event: any, func: () => void): void;

    export function callbackPass(func: () => void): void;

    export function callbackFail(expectedError: string, func: () => void): void;

    export function runTests(tests: (() => void)[]): void;

    export function getApiFeatures(): void;

    export function getApiDefinitions(apiNames: string[]): void;

    export function isProcessingUserGesture(): void;

    /**
     * Runs the callback in the context of a user gesture.
     */
    export function runWithUserGesture(callback: () => void): void;

    /**
     * Sends a string message one round trip from the renderer to the browser process and back.
     */
    export function waitForRoundTrip(message: string, callback: (message: string) => void): void;

    /**
     * Sets the function to be called when an exception occurs. By default this is a function which fails the test. This is reset for every test run through $ref:test.runTests.
     */
    export function setExceptionHandler(callback: (message: string, exception: any) => void): void;

    /**
     * Returns the wake-event-page API function, which can be called to wake up the extension's event page.
     */
    export function getWakeEventPage(): () => void;

  }

  export namespace virtualKeyboardPrivate {
    /**
     * Inserts text into the currently focused text field.
     */
    export function insertText(text: string, callback: () => void): void;

    /**
     * Sends a fabricated key event to the focused input field.
     */
    export function sendKeyEvent(keyEvent: VirtualKeyboardEvent, callback: () => void): void;

    /**
     * Hides the virtual keyboard.
     */
    export function hideKeyboard(callback: () => void): void;

    /**
     * Sets the state of the hotrod virtual keyboard. This API should only be used by hotrod.
     */
    export function setHotrodKeyboard(enable: boolean): void;

    /**
     * Sets the lock state of the virtual keyboard. A locked keyboard remains visible even after a text area loses input focus.
     */
    export function lockKeyboard(lock: boolean): void;

    /**
     * Inform the system that the keyboard has loaded.
     */
    export function keyboardLoaded(callback: () => void): void;

    /**
     * Gets the virtual keyboard configuration.
     */
    export function getKeyboardConfig(callback: (config: KeyboardConfig) => void): void;

    /**
     * Opens chrome://os-settings/osLanguages page.
     */
    export function openSettings(): void;

    /**
     * Opens chrome://os-settings/osLanguages/smartInputs page.
     */
    export function openSuggestionSettings(): void;

    /**
     * Sets the virtual keyboard container behavior
     */
    export function setContainerBehavior(options: ContainerBehaviorOptions, callback: (success: boolean) => void): void;

    /**
     * Sets the virtual keyboard draggable area bounds.
     */
    export function setDraggableArea(bounds: Bounds): void;

    /**
     * Requests the virtual keyboard to change state.
     */
    export function setKeyboardState(state: KeyboardState): void;

    /**
     * Sets the areas on the screen that are blocked by the virtual keyboard.
     */
    export function setOccludedBounds(boundsList: Bounds[]): void;

    /**
     * Sets the areas on the keyboard window where events are handled. Any event outside of these areas are passed on to the window behind it.
     */
    export function setHitTestBounds(boundsList: Bounds[]): void;

    /**
     * Sets the area of the keyboard window that should not move off screen. Any area outside of this can be moved off the user's screen.
     */
    export function setAreaToRemainOnScreen(bounds: Bounds): void;

    /**
     * Sets the bounds of the keyboard window in screen coordinates.
     */
    export function setWindowBoundsInScreen(bounds: Bounds): void;

    /**
     * One of keyup or keydown.
     */
    export type VirtualKeyboardEventType = "keyup" | "keydown";

    export interface VirtualKeyboardEvent {
      type: VirtualKeyboardEventType;

      /**
       * Unicode value of the key.
       */
      charValue: number;

      /**
       * Virtual key code, which is independent of the keyboard layout or modifier state.
       */
      keyCode: number;

      /**
       * Name of the key, which is independent of modifier state.
       */
      keyName: string;

      /**
       * Flag for modifiers that are active. None = 0, Shift = 2, Control = 4, Alt = 8.
       */
      modifiers?: number;

    }

    /**
     * The value of the virtual keyboard mode to set to.
     */
    export type KeyboardMode = "FULL_WIDTH" | "FLOATING";

    /**
     * The value of the virtual keyboard state to change to.
     */
    export type KeyboardState = "ENABLED" | "DISABLED" | "AUTO";

    export interface Bounds {
      /**
       * The position of the virtual keyboard window's left edge.
       */
      left: number;

      /**
       * The position of the virtual keyboard window's top edge.
       */
      top: number;

      /**
       * The width of the virtual keyboard window.
       */
      width: number;

      /**
       * The height of the virtual keyboard window.
       */
      height: number;

    }

    export interface KeyboardConfig {
      /**
       * Virtual keyboard layout string.
       */
      layout: string;

      /**
       * Virtual keyboard is in hotrod mode.
       */
      hotrodmode: boolean;

      /**
       * True if accessibility virtual keyboard is enabled.
       */
      a11ymode: boolean;

      /**
       * List of experimental feature flags.
       */
      features: string[];

    }

    export interface ContainerBehaviorOptions {
      /**
       * The value of the virtual keyboard mode to set to.
       */
      mode: KeyboardMode;

      /**
       * The bounds of the virtual keyboard after changing mode
       */
      bounds: Bounds;

    }

  }

  /**
   * Use the <code>chrome.webRequest</code> API to observe and analyze traffic and to intercept, block, or modify requests in-flight.
   */
  export namespace webRequest {
    /**
     * The maximum number of times that <code>handlerBehaviorChanged</code> can be called per 10 minute sustained interval. <code>handlerBehaviorChanged</code> is an expensive function call that shouldn't be called often.
     */
    export var MAX_HANDLER_BEHAVIOR_CHANGED_CALLS_PER_10_MINUTES: number;

    /**
     * Needs to be called when the behavior of the webRequest handlers has changed to prevent incorrect handling due to caching. This function call is expensive. Don't call it often.
     */
    export function handlerBehaviorChanged(callback: () => void): void;

    export type ResourceType = "main_frame" | "sub_frame" | "stylesheet" | "script" | "image" | "font" | "object" | "xmlhttprequest" | "ping" | "csp_report" | "media" | "websocket" | "other";

    export type OnBeforeRequestOptions = "blocking" | "requestBody" | "extraHeaders";

    export type OnBeforeSendHeadersOptions = "requestHeaders" | "blocking" | "extraHeaders";

    export type OnSendHeadersOptions = "requestHeaders" | "extraHeaders";

    export type OnHeadersReceivedOptions = "blocking" | "responseHeaders" | "extraHeaders";

    export type OnAuthRequiredOptions = "responseHeaders" | "blocking" | "asyncBlocking" | "extraHeaders";

    export type OnResponseStartedOptions = "responseHeaders" | "extraHeaders";

    export type OnBeforeRedirectOptions = "responseHeaders" | "extraHeaders";

    export type OnCompletedOptions = "responseHeaders" | "extraHeaders";

    export type OnErrorOccurredOptions = "extraHeaders";

    /**
     * An object describing filters to apply to webRequest events.
     */
    export interface RequestFilter {
      /**
       * A list of URLs or URL patterns. Requests that cannot match any of the URLs will be filtered out.
       */
      urls: string[];

      /**
       * A list of request types. Requests that cannot match any of the types will be filtered out.
       */
      types?: ResourceType[];

      tabId?: number;

      windowId?: number;

    }

    /**
     * An array of HTTP headers. Each header is represented as a dictionary containing the keys <code>name</code> and either <code>value</code> or <code>binaryValue</code>.
     */
    export type HttpHeaders = {name: string, value?: string, binaryValue?: number[]}[];

    /**
     * Returns value for event handlers that have the 'blocking' extraInfoSpec applied. Allows the event handler to modify network requests.
     */
    export interface BlockingResponse {
      /**
       * If true, the request is cancelled. This prevents the request from being sent. This can be used as a response to the onBeforeRequest, onBeforeSendHeaders, onHeadersReceived and onAuthRequired events.
       */
      cancel?: boolean;

      /**
       * Only used as a response to the onBeforeRequest and onHeadersReceived events. If set, the original request is prevented from being sent/completed and is instead redirected to the given URL. Redirections to non-HTTP schemes such as <code>data:</code> are allowed. Redirects initiated by a redirect action use the original request method for the redirect, with one exception: If the redirect is initiated at the onHeadersReceived stage, then the redirect will be issued using the GET method. Redirects from URLs with <code>ws://</code> and <code>wss://</code> schemes are <b>ignored</b>.
       */
      redirectUrl?: string;

      /**
       * Only used as a response to the onBeforeSendHeaders event. If set, the request is made with these request headers instead.
       */
      requestHeaders?: HttpHeaders;

      /**
       * Only used as a response to the onHeadersReceived event. If set, the server is assumed to have responded with these response headers instead. Only return <code>responseHeaders</code> if you really want to modify the headers in order to limit the number of conflicts (only one extension may modify <code>responseHeaders</code> for each request).
       */
      responseHeaders?: HttpHeaders;

      /**
       * Only used as a response to the onAuthRequired event. If set, the request is made using the supplied credentials.
       */
      authCredentials?: {username: string, password: string};

    }

    /**
     * Contains data uploaded in a URL request.
     */
    export interface UploadData {
      /**
       * An ArrayBuffer with a copy of the data.
       */
      bytes?: any;

      /**
       * A string with the file's path and name.
       */
      file?: string;

    }

    /**
     * Contains data passed within form data. For urlencoded form it is stored as string if data is utf-8 string and as ArrayBuffer otherwise. For form-data it is ArrayBuffer. If form-data represents uploading file, it is string with filename, if the filename is provided.
     */
    export type FormDataItem = Blob | string;

    export type IgnoredActionType = "redirect" | "request_headers" | "response_headers" | "auth_credentials";

  }

  /**
   * Use the <code>chrome.webViewRequest</code> API to intercept, block, or modify requests in-flight. It is potentially faster than the <a href='webRequest'><code>chrome.webRequest</code> API</a> because you can register rules that are evaluated in the browser rather than the JavaScript engine, which reduces roundtrip latencies and allows higher efficiency.
   */
  export namespace webViewRequest {
  }

  /**
   * Use the <code>chrome.accessibilityFeatures</code> API to manage Chrome's accessibility features. This API relies on the <a href='types#ChromeSetting'>ChromeSetting prototype of the type API</a> for getting and setting individual accessibility features. In order to get feature states the extension must request <code>accessibilityFeatures.read</code> permission. For modifying feature state, the extension needs <code>accessibilityFeatures.modify</code> permission. Note that <code>accessibilityFeatures.modify</code> does not imply <code>accessibilityFeatures.read</code> permission.
   */
  export namespace accessibilityFeatures {
    /**
     * <p><strong>ChromeOS only.</strong></p><p>Spoken feedback (text-to-speech). The value indicates whether the feature is enabled or not. <code>get()</code> requires <code>accessibilityFeatures.read</code> permission. <code>set()</code> and <code>clear()</code> require <code>accessibilityFeatures.modify</code> permission.</p>
     */
    export var spokenFeedback: chrome.types.ChromeSetting<boolean>;

    /**
     * <p><strong>ChromeOS only.</strong></p><p>Enlarged cursor. The value indicates whether the feature is enabled or not. <code>get()</code> requires <code>accessibilityFeatures.read</code> permission. <code>set()</code> and <code>clear()</code> require <code>accessibilityFeatures.modify</code> permission.</p>
     */
    export var largeCursor: chrome.types.ChromeSetting<boolean>;

    /**
     * <p><strong>ChromeOS only.</strong></p><p>Sticky modifier keys (like shift or alt). The value indicates whether the feature is enabled or not. <code>get()</code> requires <code>accessibilityFeatures.read</code> permission. <code>set()</code> and <code>clear()</code> require <code>accessibilityFeatures.modify</code> permission.</p>
     */
    export var stickyKeys: chrome.types.ChromeSetting<boolean>;

    /**
     * <p><strong>ChromeOS only.</strong></p><p>High contrast rendering mode. The value indicates whether the feature is enabled or not. <code>get()</code> requires <code>accessibilityFeatures.read</code> permission. <code>set()</code> and <code>clear()</code> require <code>accessibilityFeatures.modify</code> permission.</p>
     */
    export var highContrast: chrome.types.ChromeSetting<boolean>;

    /**
     * <p><strong>ChromeOS only.</strong></p><p>Full screen magnification. The value indicates whether the feature is enabled or not. <code>get()</code> requires <code>accessibilityFeatures.read</code> permission. <code>set()</code> and <code>clear()</code> require <code>accessibilityFeatures.modify</code> permission.</p>
     */
    export var screenMagnifier: chrome.types.ChromeSetting<boolean>;

    /**
     * <p><strong>ChromeOS only.</strong></p><p>Auto mouse click after mouse stops moving. The value indicates whether the feature is enabled or not. <code>get()</code> requires <code>accessibilityFeatures.read</code> permission. <code>set()</code> and <code>clear()</code> require <code>accessibilityFeatures.modify</code> permission.</p>
     */
    export var autoclick: chrome.types.ChromeSetting<boolean>;

    /**
     * <p><strong>ChromeOS only.</strong></p><p>Virtual on-screen keyboard. The value indicates whether the feature is enabled or not. <code>get()</code> requires <code>accessibilityFeatures.read</code> permission. <code>set()</code> and <code>clear()</code> require <code>accessibilityFeatures.modify</code> permission.</p>
     */
    export var virtualKeyboard: chrome.types.ChromeSetting<boolean>;

    /**
     * <p><strong>ChromeOS only.</strong></p><p>Caret highlighting. The value indicates whether the feature is enabled or not. <code>get()</code> requires <code>accessibilityFeatures.read</code> permission. <code>set()</code> and <code>clear()</code> require <code>accessibilityFeatures.modify</code> permission.</p>
     */
    export var caretHighlight: chrome.types.ChromeSetting<boolean>;

    /**
     * <p><strong>ChromeOS only.</strong></p><p>Cursor highlighting. The value indicates whether the feature is enabled or not. <code>get()</code> requires <code>accessibilityFeatures.read</code> permission. <code>set()</code> and <code>clear()</code> require <code>accessibilityFeatures.modify</code> permission.</p>
     */
    export var cursorHighlight: chrome.types.ChromeSetting<boolean>;

    /**
     * <p><strong>ChromeOS only.</strong></p><p>Cursor color. The value indicates whether the feature is enabled or not, doesn't indicate the color of it. <code>get()</code> requires <code>accessibilityFeatures.read</code> permission. <code>set()</code> and <code>clear()</code> require <code>accessibilityFeatures.modify</code> permission.</p>
     */
    export var cursorColor: chrome.types.ChromeSetting<boolean>;

    /**
     * <p><strong>ChromeOS only.</strong></p><p>Docked magnifier. The value indicates whether docked magnifier feature is enabled or not. <code>get()</code> requires <code>accessibilityFeatures.read</code> permission. <code>set()</code> and <code>clear()</code> require <code>accessibilityFeatures.modify</code> permission.</p>
     */
    export var dockedMagnifier: chrome.types.ChromeSetting<boolean>;

    /**
     * <p><strong>ChromeOS only.</strong></p><p>Focus highlighting. The value indicates whether the feature is enabled or not. <code>get()</code> requires <code>accessibilityFeatures.read</code> permission. <code>set()</code> and <code>clear()</code> require <code>accessibilityFeatures.modify</code> permission.</p>
     */
    export var focusHighlight: chrome.types.ChromeSetting<boolean>;

    /**
     * <p><strong>ChromeOS only.</strong></p><p>Select-to-speak. The value indicates whether the feature is enabled or not. <code>get()</code> requires <code>accessibilityFeatures.read</code> permission. <code>set()</code> and <code>clear()</code> require <code>accessibilityFeatures.modify</code> permission.</p>
     */
    export var selectToSpeak: chrome.types.ChromeSetting<boolean>;

    /**
     * <p><strong>ChromeOS only.</strong></p><p>Switch Access. The value indicates whether the feature is enabled or not. <code>get()</code> requires <code>accessibilityFeatures.read</code> permission. <code>set()</code> and <code>clear()</code> require <code>accessibilityFeatures.modify</code> permission.</p>
     */
    export var switchAccess: chrome.types.ChromeSetting<boolean>;

    /**
     * <code>get()</code> requires <code>accessibilityFeatures.read</code> permission. <code>set()</code> and <code>clear()</code> require <code>accessibilityFeatures.modify</code> permission.
     */
    export var animationPolicy: chrome.types.ChromeSetting<"allowed" | "once" | "none">;

  }

  export namespace accessibilityPrivate {
    /**
     * Called to translate localeCodeToTranslate into human-readable string in the locale specified by displayLocaleCode
     */
    export function getDisplayNameForLocale(localeCodeToTranslate: string, displayLocaleCode: string): string;

    /**
     * Called to request battery status from Chrome OS system.
     */
    export function getBatteryDescription(callback: (batteryDescription: string) => void): void;

    /**
     * Enables or disables native accessibility support. Once disabled, it is up to the calling extension to provide accessibility for web contents.
     */
    export function setNativeAccessibilityEnabled(enabled: boolean): void;

    /**
     * Sets the given accessibility focus rings for this extension.
     */
    export function setFocusRings(focusRings: FocusRingInfo[]): void;

    /**
     * Sets the bounds of the accessibility highlight.
     */
    export function setHighlights(rects: ScreenRect[], color: string): void;

    /**
     * Sets the calling extension as a listener of all keyboard events optionally allowing the calling extension to capture/swallow the key event via DOM apis. Returns false via callback when unable to set the listener.
     */
    export function setKeyboardListener(enabled: boolean, capture: boolean): void;

    /**
     * Darkens or undarkens the screen.
     */
    export function darkenScreen(enabled: boolean): void;

    /**
     * When enabled, forwards key events to the Switch Access extension
     */
    export function forwardKeyEventsToSwitchAccess(shouldForward: boolean): void;

    /**
     * Shows the Switch Access menu next to the specified rectangle and with the given actions
     */
    export function updateSwitchAccessBubble(bubble: SwitchAccessBubble, show: boolean, anchor: ScreenRect, actions: SwitchAccessMenuAction[]): void;

    /**
     * Enables or disables point scanning in Switch Access.
     */
    export function enablePointScan(enabled: boolean): void;

    /**
     * Sets current ARC app to use native ARC support.
     */
    export function setNativeChromeVoxArcSupportForCurrentApp(enabled: boolean): void;

    /**
     * Sends a fabricated key event.
     */
    export function sendSyntheticKeyEvent(keyEvent: SyntheticKeyboardEvent): void;

    /**
     * Enables or disables mouse events in ChromeVox.
     */
    export function enableChromeVoxMouseEvents(enabled: boolean): void;

    /**
     * Sends a fabricated mouse event.
     */
    export function sendSyntheticMouseEvent(mouseEvent: SyntheticMouseEvent): void;

    /**
     * Called by the Select-to-Speak extension when Select-to-Speak has changed states, between selecting with the mouse, speaking, and inactive.
     */
    export function setSelectToSpeakState(state: SelectToSpeakState): void;

    /**
     * Called by the Accessibility Common extension when onScrollableBoundsForPointRequested has found a scrolling container. |rect| will be the bounds of the nearest scrollable ancestor of the node at the point requested using onScrollableBoundsForPointRequested.
     */
    export function handleScrollableBoundsForPointFound(rect: ScreenRect): void;

    /**
     * Called by the Accessibility Common extension to move |rect| within the magnifier viewport (e.g. when focus has changed). If |rect| is already completely within the viewport, magnifier doesn't move. If any edge of |rect| is outside the viewport (e.g. if rect is larger than or extends partially beyond the viewport), magnifier will center the overflowing dimensions of the viewport on center of |rect| (e.g. center viewport vertically if |rect| extends beyond bottom of screen).
     */
    export function moveMagnifierToRect(rect: ScreenRect): void;

    /**
     * Toggles dictation between active and inactive states.
     */
    export function toggleDictation(): void;

    /**
     * Shows or hides the virtual keyboard.
     */
    export function setVirtualKeyboardVisible(isVisible: boolean): void;

    /**
     * Opens a specified settings subpage. To open a page with url chrome://settings/manageAccessibility/tts, pass in the substring 'manageAccessibility/tts'.
     */
    export function openSettingsSubpage(subpage: string): void;

    /**
     * Performs an accelerator action.
     */
    export function performAcceleratorAction(acceleratorAction: AcceleratorAction): void;

    /**
     * Information about an alert
     */
    export interface AlertInfo {
      /**
       * The message the alert is showing.
       */
      message: string;

    }

    /**
     * Bounding rectangle in global screen coordinates.
     */
    export interface ScreenRect {
      /**
       * Left coordinate in global screen coordinates.
       */
      left: number;

      /**
       * Top coordinate in global screen coordinates.
       */
      top: number;

      /**
       * Width in pixels.
       */
      width: number;

      /**
       * Height in pixels.
       */
      height: number;

    }

    /**
     * Accessibility gestures fired by the touch exploration controller.
     */
    export type Gesture = "click" | "swipeLeft1" | "swipeUp1" | "swipeRight1" | "swipeDown1" | "swipeLeft2" | "swipeUp2" | "swipeRight2" | "swipeDown2" | "swipeLeft3" | "swipeUp3" | "swipeRight3" | "swipeDown3" | "swipeLeft4" | "swipeUp4" | "swipeRight4" | "swipeDown4" | "tap2" | "tap3" | "tap4" | "touchExplore";

    /**
     * Commands that can be triggered by switch activation.
     */
    export type SwitchAccessCommand = "select" | "next" | "previous";

    /**
     * Different Switch Access bubbles that can be shown or hidden.
     */
    export type SwitchAccessBubble = "backButton" | "menu";

    /**
     * Available actions to be shown in the Switch Access menu. Must be kept in sync with the strings in ash/system/accessibility/switch_access_menu_view.cc
     */
    export type SwitchAccessMenuAction = "copy" | "cut" | "decrement" | "dictation" | "endTextSelection" | "increment" | "jumpToBeginningOfText" | "jumpToEndOfText" | "keyboard" | "moveBackwardOneCharOfText" | "moveBackwardOneWordOfText" | "moveCursor" | "moveDownOneLineOfText" | "moveForwardOneCharOfText" | "moveForwardOneWordOfText" | "moveUpOneLineOfText" | "paste" | "pointScan" | "scrollDown" | "scrollLeft" | "scrollRight" | "scrollUp" | "select" | "settings" | "startTextSelection";

    /**
     * The event to send
     */
    export type SyntheticKeyboardEventType = "keyup" | "keydown";

    export interface SyntheticKeyboardModifiers {
      /**
       * Control modifier.
       */
      ctrl?: boolean;

      /**
       * alt modifier.
       */
      alt?: boolean;

      /**
       * search modifier.
       */
      search?: boolean;

      /**
       * shift modifier.
       */
      shift?: boolean;

    }

    export interface SyntheticKeyboardEvent {
      type: SyntheticKeyboardEventType;

      /**
       * Virtual key code, which is independent of the keyboard layout or modifier state.
       */
      keyCode: number;

      /**
       * Contains all active modifiers.
       */
      modifiers?: SyntheticKeyboardModifiers;

    }

    /**
     * The type of event to send
     */
    export type SyntheticMouseEventType = "press" | "release" | "drag" | "move" | "enter" | "exit";

    export interface SyntheticMouseEvent {
      type: SyntheticMouseEventType;

      /**
       * X coordinate for mouse event in global screen coordinates
       */
      x: number;

      /**
       * Y coordinate for mouse event in global screen coordinates
       */
      y: number;

      /**
       * True if the touch accessibility flag should be set.
       */
      touchAccessibility?: boolean;

    }

    /**
     * The state of the Select-to-Speak extension
     */
    export type SelectToSpeakState = "selecting" | "speaking" | "inactive";

    /**
     * The type of visual appearance for the focus ring.
     */
    export type FocusType = "glow" | "solid" | "dashed";

    export interface FocusRingInfo {
      /**
       * Array of rectangles to draw the accessibility focus ring around.
       */
      rects: ScreenRect[];

      /**
       * The FocusType for the ring.
       */
      type: FocusType;

      /**
       * A RGB hex-value color string (e.g. #3F8213) that describes the primary color of the focus ring.
       */
      color: string;

      /**
       * A RGB hex-value color string (e.g. #3F82E4) that describes the secondary color of the focus ring, if there is one.
       */
      secondaryColor?: string;

      /**
       * A RGB hex-value color string (e.g. #803F82E4) that describes the color drawn outside of the focus ring and over the rest of the display.
       */
      backgroundColor?: string;

      /**
       * An identifier for this focus ring, unique within the extension.
       */
      id?: string;

    }

    /**
     * A subset of accelerator actions used by accessibility.
     */
    export type AcceleratorAction = "focusPreviousPane" | "focusNextPane";

  }

  /**
   * Use actions to put icons in the main Google Chrome toolbar, to the right of the address bar. Actions can be set to take action on all pages (default_state: enabled) or only the current page (default_state: disabled). If an action is default disabled, the action appears grayed out when inactive. In addition to its <a href='action#icon'>icon</a>, an action can also have a <a href='action#tooltip'>tooltip</a>, a <a href='action#badge'>badge</a>, and a <a href='action#popups'>popup</a>.
   */
  export namespace action {
    /**
     * Sets the title of the action. This shows up in the tooltip.
     */
    export function setTitle(details: {title: string, tabId?: number}, callback: () => void): void;

    /**
     * Gets the title of the action.
     */
    export function getTitle(details: TabDetails, callback: (result: string) => void): void;

    /**
     * Sets the icon for the action. The icon can be specified either as the path to an image file or as the pixel data from a canvas element, or as dictionary of either one of those. Either the <b>path</b> or the <b>imageData</b> property must be specified.
     */
    export function setIcon(details: {imageData?: chrome.browserAction.ImageDataType | {[name: string]: any}, path?: string | {[name: string]: any}, tabId?: number}, callback: () => void): void;

    /**
     * Sets the html document to be opened as a popup when the user clicks on the action's icon.
     */
    export function setPopup(details: {tabId?: number, popup: string}, callback: () => void): void;

    /**
     * Gets the html document set as the popup for this action.
     */
    export function getPopup(details: TabDetails, callback: (result: string) => void): void;

    /**
     * Sets the badge text for the action. The badge is displayed on top of the icon.
     */
    export function setBadgeText(details: {text: string, tabId?: number}, callback: () => void): void;

    /**
     * Gets the badge text of the action. If no tab is specified, the non-tab-specific badge text is returned.
     */
    export function getBadgeText(details: TabDetails, callback: (result: string) => void): void;

    /**
     * Sets the background color for the badge.
     */
    export function setBadgeBackgroundColor(details: {color: string | chrome.browserAction.ColorArray, tabId?: number}, callback: () => void): void;

    /**
     * Gets the background color of the action.
     */
    export function getBadgeBackgroundColor(details: TabDetails, callback: (result: chrome.browserAction.ColorArray) => void): void;

    /**
     * Enables the action for a tab. By default, actions are enabled.
     */
    export function enable(tabId: number, callback: () => void): void;

    /**
     * Disables the action for a tab.
     */
    export function disable(tabId: number, callback: () => void): void;

    export interface TabDetails {
      /**
       * The ID of the tab to query state for. If no tab is specified, the non-tab-specific state is returned.
       */
      tabId?: number;

    }

  }

  export namespace activityLogPrivate {
    /**
     * Retrieves activity from the ActivityLog that matches the specified filter.
     */
    export function getExtensionActivities(filter: Filter, callback: (result: ActivityResultSet) => void): void;

    /**
     * Deletes activities in the ActivityLog database specified in the array of activity IDs.
     */
    export function deleteActivities(activityIds: string[], callback: () => void): void;

    /**
     * Deletes activities in the ActivityLog database specified by the extension ID.
     */
    export function deleteActivitiesByExtension(extensionId: string, callback: () => void): void;

    /**
     * Deletes the entire ActivityLog database.
     */
    export function deleteDatabase(): void;

    /**
     * Delete URLs in the ActivityLog database.
     */
    export function deleteUrls(urls: string[]): void;

    export type ExtensionActivityType = "api_call" | "api_event" | "content_script" | "dom_access" | "dom_event" | "web_request";

    /**
     * Exact match or any
     */
    export type ExtensionActivityFilter = "api_call" | "api_event" | "content_script" | "dom_access" | "dom_event" | "web_request" | "any";

    export type ExtensionActivityDomVerb = "getter" | "setter" | "method" | "inserted" | "xhr" | "webrequest" | "modified";

    /**
     * This corresponds to a row from the ActivityLog database. Fields will be blank if they were specified precisely in a lookup filter.
     */
    export interface ExtensionActivity {
      /**
       * An ID of a row in the ActivityLog database that corresponds to the activity. ID is set only on activities retrieved from the database.
       */
      activityId?: string;

      extensionId?: string;

      activityType: ExtensionActivityType;

      time?: number;

      apiCall?: string;

      args?: string;

      count?: number;

      pageUrl?: string;

      pageTitle?: string;

      argUrl?: string;

      other?: {prerender?: boolean, domVerb?: ExtensionActivityDomVerb, webRequest?: string, extra?: string};

    }

    /**
     * Used to specify values for a lookup.
     */
    export interface Filter {
      /**
       * Exact match
       */
      extensionId?: string;

      activityType: ExtensionActivityFilter;

      /**
       * Exact match
       */
      apiCall?: string;

      /**
       * Treated as a prefix
       */
      pageUrl?: string;

      /**
       * Treated as a prefix
       */
      argUrl?: string;

      /**
       * Used to lookup a precise day; today is 0
       */
      daysAgo?: number;

    }

    /**
     * This holds the results of a lookup, the filter of the lookup, the time of the lookup, and whether there are more results that match.
     */
    export interface ActivityResultSet {
      activities: ExtensionActivity[];

    }

  }

  export namespace app {
    /**
     * TODO
     */
    export function getIsInstalled(): boolean;

    /**
     * TODO
     */
    export function installState(callback: (state: InstallState) => void): void;

    /**
     * TODO
     */
    export function runningState(): RunningState;

    /**
     * TODO
     */
    export function getDetails(): Details;

    /**
     * TODO (it's a manifest)
     */
    export interface Details {
    }

    export interface DOMWindow {
    }

    export type InstallState = "not_installed" | "installed" | "disabled";

    export type RunningState = "running" | "cannot_run" | "ready_to_run";

  }

  export namespace bookmarkManagerPrivate {
    /**
     * Copies the given bookmarks into the clipboard.
     */
    export function copy(idList: ({0: string} & string[]), callback: () => void): void;

    /**
     * Cuts the given bookmarks into the clipboard.
     */
    export function cut(idList: ({0: string} & string[]), callback: () => void): void;

    /**
     * Pastes bookmarks from the clipboard into the parent folder after the last selected node.
     */
    export function paste(parentId: string, selectedIdList: string[], callback: () => void): void;

    /**
     * Whether there are any bookmarks that can be pasted.
     */
    export function canPaste(parentId: string, callback: (result: boolean) => void): void;

    /**
     * Sorts the children of a given folder.
     */
    export function sortChildren(parentId: string): void;

    /**
     * Begins dragging a set of bookmarks.
     */
    export function startDrag(idList: ({0: string} & string[]), dragNodeIndex: number, isFromTouch: boolean, x: number, y: number): void;

    /**
     * Performs the drop action of the drag and drop session.
     */
    export function drop(parentId: string, index: number, callback: () => void): void;

    /**
     * Retrieves a bookmark hierarchy from the given node.  If the node id is empty, it is the full tree.  If foldersOnly is true, it will only return folders, not actual bookmarks.
     */
    export function getSubtree(id: string, foldersOnly: boolean, callback: (results: chrome.bookmarks.BookmarkTreeNode[]) => void): void;

    /**
     * Recursively removes list of bookmarks nodes.
     */
    export function removeTrees(idList: ({0: string} & string[]), callback: () => void): void;

    /**
     * Performs an undo of the last change to the bookmark model.
     */
    export function undo(): void;

    /**
     * Performs a redo of last undone change to the bookmark model.
     */
    export function redo(): void;

    export interface BookmarkNodeDataElement {
      /**
       * The ID of the bookmark. This is only provided if the data is from the same profile.
       */
      id?: string;

      /**
       * The ID of the parent of the bookmark. This is only provided if the data is from the same profile.
       */
      parentId?: string;

      title: string;

      url?: string;

      children: BookmarkNodeDataElement[];

    }

    /**
     * Information about the drag and drop data for use with drag and drop events.
     */
    export interface BookmarkNodeData {
      sameProfile: boolean;

      elements: BookmarkNodeDataElement[];

    }

  }

  /**
   * Use the <code>chrome.bookmarks</code> API to create, organize, and otherwise manipulate bookmarks. Also see <a href='override'>Override Pages</a>, which you can use to create a custom Bookmark Manager page.
   */
  export namespace bookmarks {
    export var MAX_WRITE_OPERATIONS_PER_HOUR: number;

    export var MAX_SUSTAINED_WRITE_OPERATIONS_PER_MINUTE: number;

    /**
     * Retrieves the specified BookmarkTreeNode(s).
     */
    export function get(idOrIdList: string | ({0: string} & string[]), callback: (results: BookmarkTreeNode[]) => void): void;

    /**
     * Retrieves the children of the specified BookmarkTreeNode id.
     */
    export function getChildren(id: string, callback: (results: BookmarkTreeNode[]) => void): void;

    /**
     * Retrieves the recently added bookmarks.
     */
    export function getRecent(numberOfItems: number, callback: (results: BookmarkTreeNode[]) => void): void;

    /**
     * Retrieves the entire Bookmarks hierarchy.
     */
    export function getTree(callback: (results: BookmarkTreeNode[]) => void): void;

    /**
     * Retrieves part of the Bookmarks hierarchy, starting at the specified node.
     */
    export function getSubTree(id: string, callback: (results: BookmarkTreeNode[]) => void): void;

    /**
     * Searches for BookmarkTreeNodes matching the given query. Queries specified with an object produce BookmarkTreeNodes matching all specified properties.
     */
    export function search(query: string | {query?: string, url?: string, title?: string}, callback: (results: BookmarkTreeNode[]) => void): void;

    /**
     * Creates a bookmark or folder under the specified parentId.  If url is NULL or missing, it will be a folder.
     */
    export function create(bookmark: CreateDetails, callback: (result: BookmarkTreeNode) => void): void;

    /**
     * Moves the specified BookmarkTreeNode to the provided location.
     */
    export function move(id: string, destination: {parentId?: string, index?: number}, callback: (result: BookmarkTreeNode) => void): void;

    /**
     * Updates the properties of a bookmark or folder. Specify only the properties that you want to change; unspecified properties will be left unchanged.  <b>Note:</b> Currently, only 'title' and 'url' are supported.
     */
    export function update(id: string, changes: {title?: string, url?: string}, callback: (result: BookmarkTreeNode) => void): void;

    /**
     * Removes a bookmark or an empty bookmark folder.
     */
    export function remove(id: string, callback: () => void): void;

    /**
     * Recursively removes a bookmark folder.
     */
    export function removeTree(id: string, callback: () => void): void;

    /**
     * Imports bookmarks from a chrome html bookmark file
     */
    function _import(callback: () => void): void;

    export {_import as import};

    /**
     * Exports bookmarks to a chrome html bookmark file
     */
    function _export(callback: () => void): void;

    export {_export as export};

    /**
     * Indicates the reason why this node is unmodifiable. The <var>managed</var> value indicates that this node was configured by the system administrator. Omitted if the node can be modified by the user and the extension (default).
     */
    export type BookmarkTreeNodeUnmodifiable = "managed";

    /**
     * A node (either a bookmark or a folder) in the bookmark tree.  Child nodes are ordered within their parent folder.
     */
    export interface BookmarkTreeNode {
      /**
       * The unique identifier for the node. IDs are unique within the current profile, and they remain valid even after the browser is restarted.
       */
      id: string;

      /**
       * The <code>id</code> of the parent folder.  Omitted for the root node.
       */
      parentId?: string;

      /**
       * The 0-based position of this node within its parent folder.
       */
      index?: number;

      /**
       * The URL navigated to when a user clicks the bookmark. Omitted for folders.
       */
      url?: string;

      /**
       * The text displayed for the node.
       */
      title: string;

      /**
       * When this node was created, in milliseconds since the epoch (<code>new Date(dateAdded)</code>).
       */
      dateAdded?: number;

      /**
       * When the contents of this folder last changed, in milliseconds since the epoch.
       */
      dateGroupModified?: number;

      /**
       * Indicates the reason why this node is unmodifiable. The <var>managed</var> value indicates that this node was configured by the system administrator or by the custodian of a supervised user. Omitted if the node can be modified by the user and the extension (default).
       */
      unmodifiable?: BookmarkTreeNodeUnmodifiable;

      /**
       * An ordered list of children of this node.
       */
      children?: BookmarkTreeNode[];

    }

    /**
     * Object passed to the create() function.
     */
    export interface CreateDetails {
      /**
       * Defaults to the Other Bookmarks folder.
       */
      parentId?: string;

      index?: number;

      title?: string;

      url?: string;

    }

  }

  /**
   * Use browser actions to put icons in the main Google Chrome toolbar, to the right of the address bar. In addition to its <a href='browserAction#icon'>icon</a>, a browser action can have a <a href='browserAction#tooltip'>tooltip</a>, a <a href='browserAction#badge'>badge</a>, and a <a href='browserAction#popups'>popup</a>.
   */
  export namespace browserAction {
    /**
     * Sets the title of the browser action. This title appears in the tooltip.
     */
    export function setTitle(details: {title: string, tabId?: number}, callback: () => void): void;

    /**
     * Gets the title of the browser action.
     */
    export function getTitle(details: TabDetails, callback: (result: string) => void): void;

    /**
     * Sets the icon for the browser action. The icon can be specified as the path to an image file, as the pixel data from a canvas element, or as a dictionary of one of those. Either the <code>path</code> or the <code>imageData</code> property must be specified.
     */
    export function setIcon(details: {imageData?: ImageDataType | {[name: string]: any}, path?: string | {[name: string]: any}, tabId?: number}, callback: () => void): void;

    /**
     * Sets the HTML document to be opened as a popup when the user clicks the browser action icon.
     */
    export function setPopup(details: {tabId?: number, popup: string}, callback: () => void): void;

    /**
     * Gets the HTML document that is set as the popup for this browser action.
     */
    export function getPopup(details: TabDetails, callback: (result: string) => void): void;

    /**
     * Sets the badge text for the browser action. The badge is displayed on top of the icon.
     */
    export function setBadgeText(details: {text?: string, tabId?: number}, callback: () => void): void;

    /**
     * Gets the badge text of the browser action. If no tab is specified, the non-tab-specific badge text is returned.
     */
    export function getBadgeText(details: TabDetails, callback: (result: string) => void): void;

    /**
     * Sets the background color for the badge.
     */
    export function setBadgeBackgroundColor(details: {color: string | ColorArray, tabId?: number}, callback: () => void): void;

    /**
     * Gets the background color of the browser action.
     */
    export function getBadgeBackgroundColor(details: TabDetails, callback: (result: ColorArray) => void): void;

    /**
     * Enables the browser action for a tab. Defaults to enabled.
     */
    export function enable(tabId: number, callback: () => void): void;

    /**
     * Disables the browser action for a tab.
     */
    export function disable(tabId: number, callback: () => void): void;

    /**
     * Opens the extension popup window in the active window but does not grant tab permissions.
     */
    export function openPopup(callback: (popupView?: {[name: string]: any}) => void): void;

    export type ColorArray = [number, number, number, number];

    /**
     * Pixel data for an image. Must be an ImageData object; for example, from a <code>canvas</code> element.
     */
    export type ImageDataType = ImageData;

    export interface TabDetails {
      /**
       * The ID of the tab to query state for. If no tab is specified, the non-tab-specific state is returned.
       */
      tabId?: number;

    }

  }

  /**
   * Use the <code>chrome.browsingData</code> API to remove browsing data from a user's local profile.
   */
  export namespace browsingData {
    /**
     * Reports which types of data are currently selected in the 'Clear browsing data' settings UI.  Note: some of the data types included in this API are not available in the settings UI, and some UI settings control more than one data type listed here.
     */
    export function settings(callback: (result: {options: RemovalOptions, dataToRemove: DataTypeSet, dataRemovalPermitted: DataTypeSet}) => void): void;

    /**
     * Clears various types of browsing data stored in a user's profile.
     */
    export function remove(options: RemovalOptions, dataToRemove: DataTypeSet, callback: () => void): void;

    /**
     * Clears websites' appcache data.
     */
    export function removeAppcache(options: RemovalOptions, callback: () => void): void;

    /**
     * Clears the browser's cache.
     */
    export function removeCache(options: RemovalOptions, callback: () => void): void;

    /**
     * Clears websites' cache storage data.
     */
    export function removeCacheStorage(options: RemovalOptions, callback: () => void): void;

    /**
     * Clears the browser's cookies and server-bound certificates modified within a particular timeframe.
     */
    export function removeCookies(options: RemovalOptions, callback: () => void): void;

    /**
     * Clears the browser's list of downloaded files (<em>not</em> the downloaded files themselves).
     */
    export function removeDownloads(options: RemovalOptions, callback: () => void): void;

    /**
     * Clears websites' file system data.
     */
    export function removeFileSystems(options: RemovalOptions, callback: () => void): void;

    /**
     * Clears the browser's stored form data (autofill).
     */
    export function removeFormData(options: RemovalOptions, callback: () => void): void;

    /**
     * Clears the browser's history.
     */
    export function removeHistory(options: RemovalOptions, callback: () => void): void;

    /**
     * Clears websites' IndexedDB data.
     */
    export function removeIndexedDB(options: RemovalOptions, callback: () => void): void;

    /**
     * Clears websites' local storage data.
     */
    export function removeLocalStorage(options: RemovalOptions, callback: () => void): void;

    /**
     * Clears plugins' data.
     */
    export function removePluginData(options: RemovalOptions, callback: () => void): void;

    /**
     * Clears the browser's stored passwords.
     */
    export function removePasswords(options: RemovalOptions, callback: () => void): void;

    /**
     * Clears websites' service workers.
     */
    export function removeServiceWorkers(options: RemovalOptions, callback: () => void): void;

    /**
     * Clears websites' WebSQL data.
     */
    export function removeWebSQL(options: RemovalOptions, callback: () => void): void;

    /**
     * Options that determine exactly what data will be removed.
     */
    export interface RemovalOptions {
      /**
       * Remove data accumulated on or after this date, represented in milliseconds since the epoch (accessible via the <code>getTime</code> method of the JavaScript <code>Date</code> object). If absent, defaults to 0 (which would remove all browsing data).
       */
      since?: number;

      /**
       * An object whose properties specify which origin types ought to be cleared. If this object isn't specified, it defaults to clearing only "unprotected" origins. Please ensure that you <em>really</em> want to remove application data before adding 'protectedWeb' or 'extensions'.
       */
      originTypes?: {unprotectedWeb?: boolean, protectedWeb?: boolean, extension?: boolean};

      /**
       * When present, only data for origins in this list is deleted. Only supported for cookies, storage and cache. Cookies are cleared for the whole registrable domain.
       */
      origins?: string[];

      /**
       * When present, data for origins in this list is excluded from deletion. Can't be used together with <code>origins</code>. Only supported for cookies, storage and cache.  Cookies are excluded for the whole registrable domain.
       */
      excludeOrigins?: string[];

    }

    /**
     * A set of data types. Missing data types are interpreted as <code>false</code>.
     */
    export interface DataTypeSet {
      /**
       * Websites' appcaches.
       */
      appcache?: boolean;

      /**
       * The browser's cache.
       */
      cache?: boolean;

      /**
       * Cache storage
       */
      cacheStorage?: boolean;

      /**
       * The browser's cookies.
       */
      cookies?: boolean;

      /**
       * The browser's download list.
       */
      downloads?: boolean;

      /**
       * Websites' file systems.
       */
      fileSystems?: boolean;

      /**
       * The browser's stored form data.
       */
      formData?: boolean;

      /**
       * The browser's history.
       */
      history?: boolean;

      /**
       * Websites' IndexedDB data.
       */
      indexedDB?: boolean;

      /**
       * Websites' local storage data.
       */
      localStorage?: boolean;

      /**
       * Server-bound certificates.
       */
      serverBoundCertificates?: boolean;

      /**
       * Stored passwords.
       */
      passwords?: boolean;

      /**
       * Plugins' data.
       */
      pluginData?: boolean;

      /**
       * Service Workers.
       */
      serviceWorkers?: boolean;

      /**
       * Websites' WebSQL data.
       */
      webSQL?: boolean;

    }

  }

  export namespace chromeosInfoPrivate {
    /**
     * Fetches customization values for the given property names. See property names in the declaration of the returned dictionary.
     */
    export function get(propertyNames: string[], callback: (propertiesDictionary: {board?: string, customizationId?: string, homeProvider?: string, hwid?: string, initialLocale?: string, isOwner?: boolean, sessionType?: SessionType, playStoreStatus?: PlayStoreStatus, managedDeviceStatus?: ManagedDeviceStatus, deviceType?: DeviceType, stylusStatus?: StylusStatus, assistantStatus?: AssistantStatus, clientId?: string, timezone?: string, a11yLargeCursorEnabled?: boolean, a11yStickyKeysEnabled?: boolean, a11ySpokenFeedbackEnabled?: boolean, a11yHighContrastEnabled?: boolean, a11yScreenMagnifierEnabled?: boolean, a11yAutoClickEnabled?: boolean, a11yVirtualKeyboardEnabled?: boolean, a11yCaretHighlightEnabled?: boolean, a11yCursorHighlightEnabled?: boolean, a11yFocusHighlightEnabled?: boolean, a11ySelectToSpeakEnabled?: boolean, a11ySwitchAccessEnabled?: boolean, a11yCursorColorEnabled?: boolean, a11yDockedMagnifierEnabled?: boolean, sendFunctionKeys?: boolean, supportedTimezones?: string[][]}) => void): void;

    /**
     * Sets values for the given system property.
     */
    export function set(propertyName: PropertyName, propertyValue: any): void;

    /**
     * Called to request tablet mode enabled status from the Chrome OS system.
     */
    export function isTabletModeEnabled(callback: (tabletModeEnabled: boolean) => void): void;

    /**
     * Chrome OS system property name
     */
    export type PropertyName = "timezone" | "a11yLargeCursorEnabled" | "a11yStickyKeysEnabled" | "a11ySpokenFeedbackEnabled" | "a11yHighContrastEnabled" | "a11yScreenMagnifierEnabled" | "a11yAutoClickEnabled" | "a11yVirtualKeyboardEnabled" | "a11yCaretHighlightEnabled" | "a11yCursorHighlightEnabled" | "a11yFocusHighlightEnabled" | "a11ySelectToSpeakEnabled" | "a11ySwitchAccessEnabled" | "a11yCursorColorEnabled" | "a11yDockedMagnifierEnabled" | "sendFunctionKeys";

    /**
     * Current session type.
     */
    export type SessionType = "normal" | "kiosk" | "public session";

    /**
     * Status of the play store. Note: 'available' means that the device supports the playstore but it is not enabled.
     */
    export type PlayStoreStatus = "not available" | "available" | "enabled";

    /**
     * Status of enterprise enrollment.
     */
    export type ManagedDeviceStatus = "managed" | "not managed";

    /**
     * Device type.
     */
    export type DeviceType = "chromebase" | "chromebit" | "chromebook" | "chromebox" | "chromedevice";

    /**
     * Status of stylus.
     */
    export type StylusStatus = "unsupported" | "supported" | "seen";

    /**
     * Status of Google Assistant.
     */
    export type AssistantStatus = "unsupported" | "supported";

  }

  export namespace cloudPrintPrivate {
    /**
     * Setup Cloud Print Connector.
     */
    export function setupConnector(userEmail: string, robotEmail: string, credentials: string, userSettings: UserSettings): void;

    /**
     * Returns local hostname.
     */
    export function getHostName(callback: (result: string) => void): void;

    /**
     * Returns local printers.
     */
    export function getPrinters(callback: (result: string[]) => void): void;

    /**
     * Gets the Client ID used to access Google service APIs.
     */
    export function getClientId(callback: (result: string) => void): void;

    /**
     * Settings per printer.
     */
    export interface PrinterSettings {
      /**
       * Unique printer id.
       */
      name: string;

      /**
       * Whether printer is selected.
       */
      connect: boolean;

    }

    /**
     * Settings set by user.
     */
    export interface UserSettings {
      /**
       * Printer settings.
       */
      printers: PrinterSettings[];

      /**
       * Whether should printer be connected.
       */
      connectNewPrinters: boolean;

    }

  }

  export namespace commandLinePrivate {
    /**
     * Returns whether a switch is specified on the command line when launching Chrome.
     */
    export function hasSwitch(name: string, callback: (result: boolean) => void): void;

  }

  /**
   * Use the commands API to add keyboard shortcuts that trigger actions in your extension, for example, an action to open the browser action or send a command to the extension.
   */
  export namespace commands {
    /**
     * Returns all the registered extension commands for this extension and their shortcut (if active).
     */
    export function getAll(callback: (commands: Command[]) => void): void;

    export interface Command {
      /**
       * The name of the Extension Command
       */
      name?: string;

      /**
       * The Extension Command description
       */
      description?: string;

      /**
       * The shortcut active for this command, or blank if not active.
       */
      shortcut?: string;

    }

  }

  /**
   * Use the <code>chrome.contentSettings</code> API to change settings that control whether websites can use features such as cookies, JavaScript, and plugins. More generally speaking, content settings allow you to customize Chrome's behavior on a per-site basis instead of globally.
   */
  export namespace contentSettings {
    /**
     * Whether to allow cookies and other local data to be set by websites. One of<br><var>allow</var>: Accept cookies,<br><var>block</var>: Block cookies,<br><var>session_only</var>: Accept cookies only for the current session. <br>Default is <var>allow</var>.<br>The primary URL is the URL representing the cookie origin. The secondary URL is the URL of the top-level frame.
     */
    export var cookies: ContentSetting<CookiesContentSetting>;

    /**
     * Whether to show images. One of<br><var>allow</var>: Show images,<br><var>block</var>: Don't show images. <br>Default is <var>allow</var>.<br>The primary URL is the URL of the top-level frame. The secondary URL is the URL of the image.
     */
    export var images: ContentSetting<ImagesContentSetting>;

    /**
     * Whether to run JavaScript. One of<br><var>allow</var>: Run JavaScript,<br><var>block</var>: Don't run JavaScript. <br>Default is <var>allow</var>.<br>The primary URL is the URL of the top-level frame. The secondary URL is not used.
     */
    export var javascript: ContentSetting<JavascriptContentSetting>;

    /**
     * Whether to allow Geolocation. One of <br><var>allow</var>: Allow sites to track your physical location,<br><var>block</var>: Don't allow sites to track your physical location,<br><var>ask</var>: Ask before allowing sites to track your physical location. <br>Default is <var>ask</var>.<br>The primary URL is the URL of the document which requested location data. The secondary URL is the URL of the top-level frame (which may or may not differ from the requesting URL).
     */
    export var location: ContentSetting<LocationContentSetting>;

    /**
     * Whether to run plugins. One of<br><var>allow</var>: Run plugins automatically,<br><var>block</var>: Don't run plugins automatically,<br><var>detect_important_content</var>: Only run automatically those plugins that are detected as the website's main content.<br>The primary URL is the URL of the top-level frame. The secondary URL is not used.
     */
    export var plugins: ContentSetting<PluginsContentSetting>;

    /**
     * Whether to allow sites to show pop-ups. One of<br><var>allow</var>: Allow sites to show pop-ups,<br><var>block</var>: Don't allow sites to show pop-ups. <br>Default is <var>block</var>.<br>The primary URL is the URL of the top-level frame. The secondary URL is not used.
     */
    export var popups: ContentSetting<PopupsContentSetting>;

    /**
     * Whether to allow sites to show desktop notifications. One of<br><var>allow</var>: Allow sites to show desktop notifications,<br><var>block</var>: Don't allow sites to show desktop notifications,<br><var>ask</var>: Ask when a site wants to show desktop notifications. <br>Default is <var>ask</var>.<br>The primary URL is the URL of the document which wants to show the notification. The secondary URL is not used.
     */
    export var notifications: ContentSetting<NotificationsContentSetting>;

    /**
     * <i>Deprecated.</i> No longer has any effect. Fullscreen permission is now automatically granted for all sites. Value is always <var>allow</var>.
     */
    export var fullscreen: ContentSetting<FullscreenContentSetting>;

    /**
     * <i>Deprecated.</i> No longer has any effect. Mouse lock permission is now automatically granted for all sites. Value is always <var>allow</var>.
     */
    export var mouselock: ContentSetting<MouselockContentSetting>;

    /**
     * Whether to allow sites to access the microphone. One of <br><var>allow</var>: Allow sites to access the microphone,<br><var>block</var>: Don't allow sites to access the microphone,<br><var>ask</var>: Ask when a site wants to access the microphone. <br>Default is <var>ask</var>.<br>The primary URL is the URL of the document which requested microphone access. The secondary URL is not used.<br>NOTE: The 'allow' setting is not valid if both patterns are '<all_urls>'.
     */
    export var microphone: ContentSetting<MicrophoneContentSetting>;

    /**
     * Whether to allow sites to access the camera. One of <br><var>allow</var>: Allow sites to access the camera,<br><var>block</var>: Don't allow sites to access the camera,<br><var>ask</var>: Ask when a site wants to access the camera. <br>Default is <var>ask</var>.<br>The primary URL is the URL of the document which requested camera access. The secondary URL is not used.<br>NOTE: The 'allow' setting is not valid if both patterns are '<all_urls>'.
     */
    export var camera: ContentSetting<CameraContentSetting>;

    /**
     * Whether to allow sites to run plugins unsandboxed. One of <br><var>allow</var>: Allow sites to run plugins unsandboxed,<br><var>block</var>: Don't allow sites to run plugins unsandboxed,<br><var>ask</var>: Ask when a site wants to run a plugin unsandboxed. <br>Default is <var>ask</var>.<br>The primary URL is the URL of the top-level frame. The secondary URL is not used.
     */
    export var unsandboxedPlugins: ContentSetting<PpapiBrokerContentSetting>;

    /**
     * Whether to allow sites to download multiple files automatically. One of <br><var>allow</var>: Allow sites to download multiple files automatically,<br><var>block</var>: Don't allow sites to download multiple files automatically,<br><var>ask</var>: Ask when a site wants to download files automatically after the first file. <br>Default is <var>ask</var>.<br>The primary URL is the URL of the top-level frame. The secondary URL is not used.
     */
    export var automaticDownloads: ContentSetting<MultipleAutomaticDownloadsContentSetting>;

    /**
     * The only content type using resource identifiers is $(ref:contentSettings.plugins). For more information, see <a href="contentSettings#resource-identifiers">Resource Identifiers</a>.
     */
    export interface ResourceIdentifier {
      /**
       * The resource identifier for the given content type.
       */
      id: string;

      /**
       * A human readable description of the resource.
       */
      description?: string;

    }

    /**
     * The scope of the ContentSetting. One of<br><var>regular</var>: setting for regular profile (which is inherited by the incognito profile if not overridden elsewhere),<br><var>incognito_session_only</var>: setting for incognito profile that can only be set during an incognito session and is deleted when the incognito session ends (overrides regular settings).
     */
    export type Scope = "regular" | "incognito_session_only";

    export interface ContentSetting<T> {
      /**
       * Clear all content setting rules set by this extension.
       */
      clear: (details: {scope?: Scope}, callback?: () => void) => void;

      /**
       * Gets the current content setting for a given pair of URLs.
       */
      get: (details: {primaryUrl: string, secondaryUrl?: string, resourceIdentifier?: ResourceIdentifier, incognito?: boolean}, callback: (details: {setting: T}) => void) => void;

      /**
       * Applies a new content setting rule.
       */
      set: (details: {primaryPattern: string, secondaryPattern?: string, resourceIdentifier?: ResourceIdentifier, setting: T, scope?: Scope}, callback?: () => void) => void;

      getResourceIdentifiers: (callback: (resourceIdentifiers?: ResourceIdentifier[]) => void) => void;

    }

    export type CookiesContentSetting = "allow" | "block" | "session_only";

    export type ImagesContentSetting = "allow" | "block";

    export type JavascriptContentSetting = "allow" | "block";

    export type LocationContentSetting = "allow" | "block" | "ask";

    export type PluginsContentSetting = "allow" | "block" | "detect_important_content";

    export type PopupsContentSetting = "allow" | "block";

    export type NotificationsContentSetting = "allow" | "block" | "ask";

    export type FullscreenContentSetting = "allow";

    export type MouselockContentSetting = "allow";

    export type MicrophoneContentSetting = "allow" | "block" | "ask";

    export type CameraContentSetting = "allow" | "block" | "ask";

    export type PpapiBrokerContentSetting = "allow" | "block" | "ask";

    export type MultipleAutomaticDownloadsContentSetting = "allow" | "block" | "ask";

  }

  /**
   * Use the <code>chrome.contextMenus</code> API to add items to Google Chrome's context menu. You can choose what types of objects your context menu additions apply to, such as images, hyperlinks, and pages.
   */
  export namespace contextMenus {
    /**
     * The maximum number of top level extension items that can be added to an extension action context menu. Any items beyond this limit will be ignored.
     */
    export var ACTION_MENU_TOP_LEVEL_LIMIT: number;

    /**
     * Creates a new context menu item. If an error occurs during creation, it may not be detected until the creation callback fires; details will be in $(ref:runtime.lastError).
     */
    export function create(createProperties: {type?: ItemType, id?: string, title?: string, checked?: boolean, contexts?: ({0: ContextType} & ContextType[]), visible?: boolean, onclick?: (info: chrome.contextMenus.OnClickData, tab: chrome.tabs.Tab) => void, parentId?: number | string, documentUrlPatterns?: string[], targetUrlPatterns?: string[], enabled?: boolean}, callback: () => void): number | string;

    /**
     * Updates a previously created context menu item.
     */
    export function update(id: number | string, updateProperties: null | {type?: ItemType, title?: string, checked?: boolean, contexts?: ({0: ContextType} & ContextType[]), visible?: boolean, onclick?: (info: chrome.contextMenus.OnClickData, tab: chrome.tabs.Tab) => void, parentId?: number | string, documentUrlPatterns?: string[], targetUrlPatterns?: string[], enabled?: boolean}, callback: () => void): void;

    /**
     * Removes a context menu item.
     */
    export function remove(menuItemId: number | string, callback: () => void): void;

    /**
     * Removes all context menu items added by this extension.
     */
    export function removeAll(callback: () => void): void;

    /**
     * The different contexts a menu can appear in. Specifying 'all' is equivalent to the combination of all other contexts except for 'launcher'. The 'launcher' context is only supported by apps and is used to add menu items to the context menu that appears when clicking the app icon in the launcher/taskbar/dock/etc. Different platforms might put limitations on what is actually supported in a launcher context menu.
     */
    export type ContextType = "all" | "page" | "frame" | "selection" | "link" | "editable" | "image" | "video" | "audio" | "launcher" | "browser_action" | "page_action" | "action";

    /**
     * The type of menu item.
     */
    export type ItemType = "normal" | "checkbox" | "radio" | "separator";

  }

  /**
   * Use the <code>chrome.contextMenus</code> API to add items to Google Chrome's context menu. You can choose what types of objects your context menu additions apply to, such as images, hyperlinks, and pages.
   */
  export namespace contextMenus {
    /**
     * Information sent when a context menu item is clicked.
     */
    export interface OnClickData {
      /**
       * The ID of the menu item that was clicked.
       */
      menuItemId: number | string;

      /**
       * The parent ID, if any, for the item clicked.
       */
      parentMenuItemId?: number | string;

      /**
       * One of 'image', 'video', or 'audio' if the context menu was activated on one of these types of elements.
       */
      mediaType?: string;

      /**
       * If the element is a link, the URL it points to.
       */
      linkUrl?: string;

      /**
       * Will be present for elements with a 'src' URL.
       */
      srcUrl?: string;

      /**
       * The URL of the page where the menu item was clicked. This property is not set if the click occured in a context where there is no current page, such as in a launcher context menu.
       */
      pageUrl?: string;

      /**
       *  The URL of the frame of the element where the context menu was clicked, if it was in a frame.
       */
      frameUrl?: string;

      /**
       *  The <a href='webNavigation#frame_ids'>ID of the frame</a> of the element where the context menu was clicked, if it was in a frame.
       */
      frameId?: number;

      /**
       * The text for the context selection, if any.
       */
      selectionText?: string;

      /**
       * A flag indicating whether the element is editable (text input, textarea, etc.).
       */
      editable: boolean;

      /**
       * A flag indicating the state of a checkbox or radio item before it was clicked.
       */
      wasChecked?: boolean;

      /**
       * A flag indicating the state of a checkbox or radio item after it is clicked.
       */
      checked?: boolean;

    }

  }

  /**
   * Use the <code>chrome.cookies</code> API to query and modify cookies, and to be notified when they change.
   */
  export namespace cookies {
    /**
     * Retrieves information about a single cookie. If more than one cookie of the same name exists for the given URL, the one with the longest path will be returned. For cookies with the same path length, the cookie with the earliest creation time will be returned.
     */
    export function get(details: CookieDetails, callback: (cookie?: Cookie) => void): void;

    /**
     * Retrieves all cookies from a single cookie store that match the given information.  The cookies returned will be sorted, with those with the longest path first.  If multiple cookies have the same path length, those with the earliest creation time will be first.
     */
    export function getAll(details: {url?: string, name?: string, domain?: string, path?: string, secure?: boolean, session?: boolean, storeId?: string}, callback: (cookies: Cookie[]) => void): void;

    /**
     * Sets a cookie with the given cookie data; may overwrite equivalent cookies if they exist.
     */
    export function set(details: {url: string, name?: string, value?: string, domain?: string, path?: string, secure?: boolean, httpOnly?: boolean, sameSite?: SameSiteStatus, expirationDate?: number, storeId?: string}, callback: (cookie?: Cookie) => void): void;

    /**
     * Deletes a cookie by name.
     */
    export function remove(details: CookieDetails, callback: (details?: {url: string, name: string, storeId: string}) => void): void;

    /**
     * Lists all existing cookie stores.
     */
    export function getAllCookieStores(callback: (cookieStores: CookieStore[]) => void): void;

    /**
     * A cookie's 'SameSite' state (https://tools.ietf.org/html/draft-west-first-party-cookies). 'no_restriction' corresponds to a cookie set with 'SameSite=None', 'lax' to 'SameSite=Lax', and 'strict' to 'SameSite=Strict'. 'unspecified' corresponds to a cookie set without the SameSite attribute.
     */
    export type SameSiteStatus = "no_restriction" | "lax" | "strict" | "unspecified";

    /**
     * Represents information about an HTTP cookie.
     */
    export interface Cookie {
      /**
       * The name of the cookie.
       */
      name: string;

      /**
       * The value of the cookie.
       */
      value: string;

      /**
       * The domain of the cookie (e.g. "www.google.com", "example.com").
       */
      domain: string;

      /**
       * True if the cookie is a host-only cookie (i.e. a request's host must exactly match the domain of the cookie).
       */
      hostOnly: boolean;

      /**
       * The path of the cookie.
       */
      path: string;

      /**
       * True if the cookie is marked as Secure (i.e. its scope is limited to secure channels, typically HTTPS).
       */
      secure: boolean;

      /**
       * True if the cookie is marked as HttpOnly (i.e. the cookie is inaccessible to client-side scripts).
       */
      httpOnly: boolean;

      /**
       * The cookie's same-site status (i.e. whether the cookie is sent with cross-site requests).
       */
      sameSite: SameSiteStatus;

      /**
       * True if the cookie is a session cookie, as opposed to a persistent cookie with an expiration date.
       */
      session: boolean;

      /**
       * The expiration date of the cookie as the number of seconds since the UNIX epoch. Not provided for session cookies.
       */
      expirationDate?: number;

      /**
       * The ID of the cookie store containing this cookie, as provided in getAllCookieStores().
       */
      storeId: string;

    }

    /**
     * Represents a cookie store in the browser. An incognito mode window, for instance, uses a separate cookie store from a non-incognito window.
     */
    export interface CookieStore {
      /**
       * The unique identifier for the cookie store.
       */
      id: string;

      /**
       * Identifiers of all the browser tabs that share this cookie store.
       */
      tabIds: number[];

    }

    /**
     * The underlying reason behind the cookie's change. If a cookie was inserted, or removed via an explicit call to "chrome.cookies.remove", "cause" will be "explicit". If a cookie was automatically removed due to expiry, "cause" will be "expired". If a cookie was removed due to being overwritten with an already-expired expiration date, "cause" will be set to "expired_overwrite".  If a cookie was automatically removed due to garbage collection, "cause" will be "evicted".  If a cookie was automatically removed due to a "set" call that overwrote it, "cause" will be "overwrite". Plan your response accordingly.
     */
    export type OnChangedCause = "evicted" | "expired" | "explicit" | "expired_overwrite" | "overwrite";

    /**
     * Details to identify the cookie.
     */
    export interface CookieDetails {
      /**
       * The URL with which the cookie to access is associated. This argument may be a full URL, in which case any data following the URL path (e.g. the query string) is simply ignored. If host permissions for this URL are not specified in the manifest file, the API call will fail.
       */
      url: string;

      /**
       * The name of the cookie to access.
       */
      name: string;

      /**
       * The ID of the cookie store in which to look for the cookie. By default, the current execution context's cookie store will be used.
       */
      storeId?: string;

    }

  }

  export namespace dashboardPrivate {
    /**
     * Shows a permission prompt for the given extension, for installing to a different account.
     */
    export function showPermissionPromptForDelegatedInstall(details: {id: string, manifest: string, delegatedUser: string, iconUrl?: string, localizedName?: string}, callback: (result: Result) => void): void;

    /**
     * Whether the API call succeeded, or the reason for failure.
     */
    export type Result = "" | "unknown_error" | "user_cancelled" | "invalid_id" | "manifest_error" | "icon_error" | "invalid_icon_url";

  }

  /**
   * Use the <code>chrome.dataReductionProxy</code> API to control the data reduction proxy and access usage metrics. This API relies on the <a href='types#ChromeSetting'>ChromeSetting prototype of the type API</a> for getting and setting Chrome's configuration.
   */
  export namespace dataReductionProxy {
    /**
     * Flag to enable data usage reduction by sending requests via data reduction proxy. This preference's value is a boolean, defaulting to <code>false</code>.
     */
    export var spdyProxyEnabled: chrome.types.ChromeSetting<boolean>;

    /**
     * Each item contains the number uncompressed bytes through data reduction proxy per day.
     */
    export var dataReductionDailyContentLength: chrome.types.ChromeSetting<number[]>;

    /**
     * Each item contains the number of compressed bytes through data reduction proxy per day.
     */
    export var dataReductionDailyReceivedLength: chrome.types.ChromeSetting<number[]>;

    /**
     * Flag to enable collection and reporting of detailed data usage.
     */
    export var dataUsageReportingEnabled: chrome.types.ChromeSetting<boolean>;

    /**
     * Clear all data saving metrics obtained by using the data reduction proxy.
     */
    export function clearDataSavings(callback: () => void): void;

    /**
     * Get data usage history.
     */
    export function getDataUsage(getDataUsageCallback: (data_usage: {data_usage_buckets: any[]}) => void): void;

  }

  /**
   * The <code>chrome.debugger</code> API serves as an alternate transport for Chrome's <a href='https://developer.chrome.com/devtools/docs/debugger-protocol'>remote debugging protocol</a>. Use <code>chrome.debugger</code> to attach to one or more tabs to instrument network interaction, debug JavaScript, mutate the DOM and CSS, etc. Use the Debuggee <code>tabId</code> to target tabs with sendCommand and route events by <code>tabId</code> from onEvent callbacks.
   */
  namespace _debugger {
    /**
     * Attaches debugger to the given target.
     */
    export function attach(target: Debuggee, requiredVersion: string, callback: () => void): void;

    /**
     * Detaches debugger from the given target.
     */
    export function detach(target: Debuggee, callback: () => void): void;

    /**
     * Sends given command to the debugging target.
     */
    export function sendCommand(target: Debuggee, method: string, commandParams: {[name: string]: any}, callback: (result?: {[name: string]: any}) => void): void;

    /**
     * Returns the list of available debug targets.
     */
    export function getTargets(callback: (result: TargetInfo[]) => void): void;

    /**
     * Debuggee identifier. Either tabId or extensionId must be specified
     */
    export interface Debuggee {
      /**
       * The id of the tab which you intend to debug.
       */
      tabId?: number;

      /**
       * The id of the extension which you intend to debug. Attaching to an extension background page is only possible when 'silent-debugger-extension-api' flag is enabled on the target browser.
       */
      extensionId?: string;

      /**
       * The opaque id of the debug target.
       */
      targetId?: string;

    }

    /**
     * Target type.
     */
    export type TargetInfoType = "page" | "background_page" | "worker" | "other";

    /**
     * Connection termination reason.
     */
    export type DetachReason = "target_closed" | "canceled_by_user";

    /**
     * Debug target information
     */
    export interface TargetInfo {
      /**
       * Target type.
       */
      type: TargetInfoType;

      /**
       * Target id.
       */
      id: string;

      /**
       * The tab id, defined if type == 'page'.
       */
      tabId?: number;

      /**
       * The extension id, defined if type = 'background_page'.
       */
      extensionId?: string;

      /**
       * True if debugger is already attached.
       */
      attached: boolean;

      /**
       * Target page title.
       */
      title: string;

      /**
       * Target URL.
       */
      url: string;

      /**
       * Target favicon URL.
       */
      faviconUrl?: string;

    }

  }

  export {_debugger as debugger};

  /**
   * Use the <code>chrome.declarativeContent</code> API to take actions depending on the content of a page, without requiring permission to read the page's content.
   */
  export namespace declarativeContent {
    /**
     * See <a href="https://developer.mozilla.org/en-US/docs/Web/API/ImageData">https://developer.mozilla.org/en-US/docs/Web/API/ImageData</a>.
     */
    export type ImageDataType = ImageData;

    export type PageStateMatcherInstanceType = "declarativeContent.PageStateMatcher";

    export type ShowPageActionInstanceType = "declarativeContent.ShowPageAction";

    export type ShowActionInstanceType = "declarativeContent.ShowAction";

    export type SetIconInstanceType = "declarativeContent.SetIcon";

    export type RequestContentScriptInstanceType = "declarativeContent.RequestContentScript";

    /**
     * Matches the state of a web page based on various criteria.
     */
    export interface PageStateMatcher {
      /**
       * Matches if the conditions of the <code>UrlFilter</code> are fulfilled for the top-level URL of the page.
       */
      pageUrl?: chrome.events.UrlFilter;

      /**
       * Matches if all of the CSS selectors in the array match displayed elements in a frame with the same origin as the page's main frame. All selectors in this array must be <a href="http://www.w3.org/TR/selectors4/#compound">compound selectors</a> to speed up matching. Note: Listing hundreds of CSS selectors or listing CSS selectors that match hundreds of times per page can slow down web sites.
       */
      css?: string[];

      /**
       * Matches if the bookmarked state of the page is equal to the specified value. Requres the <a href='declare_permissions'>bookmarks permission</a>.
       */
      isBookmarked?: boolean;

      instanceType: PageStateMatcherInstanceType;

    }

    /**
     * Declarative event action that shows the extension's $(ref:pageAction page action) while the corresponding conditions are met. This action can be used without <a href="declare_permissions#host-permissions">host permissions</a>, but the extension must have a page action. If the extension has the <a href="activeTab.html">activeTab</a> permission, clicking the page action grants access to the active tab.
     */
    export interface ShowPageAction {
      instanceType: ShowPageActionInstanceType;

    }

    /**
     * Declarative event action that shows the extension's toolbar action ($(ref:pageAction page action) or $(ref:browserAction browser action)) while the corresponding conditions are met. This action can be used without <a href="declare_permissions#host-permissions">host permissions</a>. If the extension has the <a href="activeTab.html">activeTab</a> permission, clicking the page action grants access to the active tab.
     */
    export interface ShowAction {
      instanceType: ShowActionInstanceType;

    }

    /**
     * Declarative event action that sets the n-<abbr title="device-independent pixel">dip</abbr> square icon for the extension's $(ref:pageAction page action) or $(ref:browserAction browser action) while the corresponding conditions are met. This action can be used without <a href="declare_permissions.html#host-permissions">host permissions</a>, but the extension must have a page or browser action.<p>Exactly one of <code>imageData</code> or <code>path</code> must be specified. Both are dictionaries mapping a number of pixels to an image representation. The image representation in <code>imageData</code> is an <a href="https://developer.mozilla.org/en-US/docs/Web/API/ImageData">ImageData</a> object; for example, from a <code>canvas</code> element, while the image representation in <code>path</code> is the path to an image file relative to the extension's manifest. If <code>scale</code> screen pixels fit into a device-independent pixel, the <code>scale * n</code> icon is used. If that scale is missing, another image is resized to the required size.</p>
     */
    export interface SetIcon {
      instanceType: SetIconInstanceType;

      /**
       * Either an <code>ImageData</code> object or a dictionary {size -> ImageData} representing an icon to be set. If the icon is specified as a dictionary, the image used is chosen depending on the screen's pixel density. If the number of image pixels that fit into one screen space unit equals <code>scale</code>, then an image with size <code>scale * n</code> is selected, where <i>n</i> is the size of the icon in the UI. At least one image must be specified. Note that <code>details.imageData = foo</code> is equivalent to <code>details.imageData = {'16': foo}</code>.
       */
      imageData?: ImageDataType | {[name: string]: any};

    }

    /**
     * Declarative event action that injects a content script. <p><b>WARNING:</b> This action is still experimental and is not supported on stable builds of Chrome.</p>
     */
    export interface RequestContentScript {
      /**
       * Names of CSS files to be injected as a part of the content script.
       */
      css?: string[];

      /**
       * Names of JavaScript files to be injected as a part of the content script.
       */
      js?: string[];

      /**
       * Whether the content script runs in all frames of the matching page, or in only the top frame. Default is <code>false</code>.
       */
      allFrames?: boolean;

      /**
       * Whether to insert the content script on <code>about:blank</code> and <code>about:srcdoc</code>. Default is <code>false</code>.
       */
      matchAboutBlank?: boolean;

      instanceType: RequestContentScriptInstanceType;

    }

  }

  /**
   * Desktop Capture API that can be used to capture content of screen, individual windows or tabs.
   */
  export namespace desktopCapture {
    /**
     * Shows desktop media picker UI with the specified set of sources.
     */
    export function chooseDesktopMedia(sources: DesktopCaptureSourceType[], targetTab: chrome.tabs.Tab, callback: (streamId: string, options: {canRequestAudioTrack: boolean}) => void): number;

    /**
     * Shows desktop media picker UI with the specified set of sources.
     */
    export function chooseDesktopMedia(sources: DesktopCaptureSourceType[], callback: (streamId: string, options: {canRequestAudioTrack: boolean}) => void): number;

    /**
     * Hides desktop media picker dialog shown by chooseDesktopMedia().
     */
    export function cancelChooseDesktopMedia(desktopMediaRequestId: number): void;

    /**
     * Enum used to define set of desktop media sources used in chooseDesktopMedia().
     */
    export type DesktopCaptureSourceType = "screen" | "window" | "tab" | "audio";

  }

  /**
   * Use the <code>chrome.dom</code> API to access special DOM APIs for Extensions
   */
  export namespace dom {
    /**
     * Gets the open shadow root or the closed shadow root hosted by the specified element. If the element doesn't attach the shadow root, it will return null.
     */
    export function openOrClosedShadowRoot(element: HTMLElement): {[name: string]: any};

  }

  export namespace echoPrivate {
    /**
     * Sets the offer info in Local State.
     */
    export function setOfferInfo(id: string, offerInfo: {[name: string]: any}): void;

    /**
     * Check in Local State for the offer info.
     */
    export function getOfferInfo(id: string, callback: (result: {[name: string]: any}) => void): void;

    /**
     * Get the group or coupon code from underlying storage.
     */
    export function getRegistrationCode(type: string, callback: (result: string) => void): void;

    /**
     * Get the OOBE timestamp.
     */
    export function getOobeTimestamp(callback: (result: string) => void): void;

    /**
     * If device policy allows user to redeem offer, displays a native dialog asking user for a consent to verify device's eligibility for the offer. If the device policy forbids user to redeem offers, displays a native dialog informing user the offer redeeming is disabled.
     */
    export function getUserConsent(consentRequester: {serviceName: string, origin: string, tabId?: number}, callback: (result: boolean) => void): void;

  }

  export namespace enterprise.platformKeysPrivate {
    /**
     * Challenge a machine key.
     */
    export function challengeMachineKey(challenge: string, callback: (response: string) => void): void;

    /**
     * Challenge an user key.
     */
    export function challengeUserKey(challenge: string, registerKey: boolean, callback: (response: string) => void): void;

  }

  /**
   * The <code>chrome.extension</code> API has utilities that can be used by any extension page. It includes support for exchanging messages between an extension and its content scripts or between extensions, as described in detail in <a href='messaging'>Message Passing</a>.
   */
  export namespace extension {
    /**
     * Set for the lifetime of a callback if an ansychronous extension api has resulted in an error. If no error has occured lastError will be <var>undefined</var>.
     */
    export type lastError = {message: string} | undefined;

    /**
     * True for content scripts running inside incognito tabs, and for extension pages running inside an incognito process. The latter only applies to extensions with 'split' incognito_behavior.
     */
    export type inIncognitoContext = boolean | undefined;

    /**
     * Sends a single request to other listeners within the extension. Similar to $(ref:runtime.connect), but only sends a single request with an optional response. The $(ref:extension.onRequest) event is fired in each page of the extension.
     */
    export function sendRequest(extensionId: string, request: any, responseCallback: (response: any) => void): void;

    /**
     * Sends a single request to other listeners within the extension. Similar to $(ref:runtime.connect), but only sends a single request with an optional response. The $(ref:extension.onRequest) event is fired in each page of the extension.
     */
    export function sendRequest(request: any, responseCallback: (response: any) => void): void;

    /**
     * Converts a relative path within an extension install directory to a fully-qualified URL.
     */
    export function getURL(path: string): string;

    /**
     * Returns an array of the JavaScript 'window' objects for each of the pages running inside the current extension.
     */
    export function getViews(fetchProperties: {type?: ViewType, windowId?: number, tabId?: number}): Window[];

    /**
     * Returns the JavaScript 'window' object for the background page running inside the current extension. Returns null if the extension has no background page.
     */
    export function getBackgroundPage(): Window;

    /**
     * Returns an array of the JavaScript 'window' objects for each of the tabs running inside the current extension. If <code>windowId</code> is specified, returns only the 'window' objects of tabs attached to the specified window.
     */
    export function getExtensionTabs(windowId: number): Window[];

    /**
     * Retrieves the state of the extension's access to Incognito-mode (as determined by the user-controlled 'Allowed in Incognito' checkbox.
     */
    export function isAllowedIncognitoAccess(callback: (isAllowedAccess: boolean) => void): void;

    /**
     * Retrieves the state of the extension's access to the 'file://' scheme (as determined by the user-controlled 'Allow access to File URLs' checkbox.
     */
    export function isAllowedFileSchemeAccess(callback: (isAllowedAccess: boolean) => void): void;

    /**
     * Sets the value of the ap CGI parameter used in the extension's update URL.  This value is ignored for extensions that are hosted in the Chrome Extension Gallery.
     */
    export function setUpdateUrlData(data: string): void;

    /**
     * The type of extension view.
     */
    export type ViewType = "tab" | "popup";

  }

  /**
   * Use the <code>chrome.fileBrowserHandler</code> API to extend the Chrome OS file browser. For example, you can use this API to enable users to upload files to your website.
   */
  export namespace fileBrowserHandler {
    /**
     * Prompts user to select file path under which file should be saved. When the file is selected, file access permission required to use the file (read, write and create) are granted to the caller. The file will not actually get created during the function call, so function caller must ensure its existence before using it. The function has to be invoked with a user gesture.
     */
    export function selectFile(selectionParams: {suggestedName: string, allowedFileExtensions?: string[]}, callback: (result: {success: boolean, entry?: {[name: string]: any}}) => void): void;

    /**
     * Event details payload for fileBrowserHandler.onExecute event.
     */
    export interface FileHandlerExecuteEventDetails {
      /**
       * Array of Entry instances representing files that are targets of this action (selected in ChromeOS file browser).
       */
      entries: any[];

      /**
       * The ID of the tab that raised this event. Tab IDs are unique within a browser session.
       */
      tab_id?: number;

    }

  }

  /**
   * Use the <code>chrome.fontSettings</code> API to manage Chrome's font settings.
   */
  export namespace fontSettings {
    /**
     * Clears the font set by this extension, if any.
     */
    export function clearFont(details: {script?: ScriptCode, genericFamily: GenericFamily}, callback: () => void): void;

    /**
     * Gets the font for a given script and generic font family.
     */
    export function getFont(details: {script?: ScriptCode, genericFamily: GenericFamily}, callback: (details: {fontId: string, levelOfControl: LevelOfControl}) => void): void;

    /**
     * Sets the font for a given script and generic font family.
     */
    export function setFont(details: {script?: ScriptCode, genericFamily: GenericFamily, fontId: string}, callback: () => void): void;

    /**
     * Gets a list of fonts on the system.
     */
    export function getFontList(callback: (results: FontName[]) => void): void;

    /**
     * Clears the default font size set by this extension, if any.
     */
    export function clearDefaultFontSize(details: {}, callback: () => void): void;

    /**
     * Gets the default font size.
     */
    export function getDefaultFontSize(details: {}, callback: (details: {pixelSize: number, levelOfControl: LevelOfControl}) => void): void;

    /**
     * Sets the default font size.
     */
    export function setDefaultFontSize(details: {pixelSize: number}, callback: () => void): void;

    /**
     * Clears the default fixed font size set by this extension, if any.
     */
    export function clearDefaultFixedFontSize(details: {}, callback: () => void): void;

    /**
     * Gets the default size for fixed width fonts.
     */
    export function getDefaultFixedFontSize(details: {}, callback: (details: {pixelSize: number, levelOfControl: LevelOfControl}) => void): void;

    /**
     * Sets the default size for fixed width fonts.
     */
    export function setDefaultFixedFontSize(details: {pixelSize: number}, callback: () => void): void;

    /**
     * Clears the minimum font size set by this extension, if any.
     */
    export function clearMinimumFontSize(details: {}, callback: () => void): void;

    /**
     * Gets the minimum font size.
     */
    export function getMinimumFontSize(details: {}, callback: (details: {pixelSize: number, levelOfControl: LevelOfControl}) => void): void;

    /**
     * Sets the minimum font size.
     */
    export function setMinimumFontSize(details: {pixelSize: number}, callback: () => void): void;

    /**
     * Represents a font name.
     */
    export interface FontName {
      /**
       * The font ID.
       */
      fontId: string;

      /**
       * The display name of the font.
       */
      displayName: string;

    }

    /**
     * An ISO 15924 script code. The default, or global, script is represented by script code "Zyyy".
     */
    export type ScriptCode = "Afak" | "Arab" | "Armi" | "Armn" | "Avst" | "Bali" | "Bamu" | "Bass" | "Batk" | "Beng" | "Blis" | "Bopo" | "Brah" | "Brai" | "Bugi" | "Buhd" | "Cakm" | "Cans" | "Cari" | "Cham" | "Cher" | "Cirt" | "Copt" | "Cprt" | "Cyrl" | "Cyrs" | "Deva" | "Dsrt" | "Dupl" | "Egyd" | "Egyh" | "Egyp" | "Elba" | "Ethi" | "Geor" | "Geok" | "Glag" | "Goth" | "Gran" | "Grek" | "Gujr" | "Guru" | "Hang" | "Hani" | "Hano" | "Hans" | "Hant" | "Hebr" | "Hluw" | "Hmng" | "Hung" | "Inds" | "Ital" | "Java" | "Jpan" | "Jurc" | "Kali" | "Khar" | "Khmr" | "Khoj" | "Knda" | "Kpel" | "Kthi" | "Lana" | "Laoo" | "Latf" | "Latg" | "Latn" | "Lepc" | "Limb" | "Lina" | "Linb" | "Lisu" | "Loma" | "Lyci" | "Lydi" | "Mand" | "Mani" | "Maya" | "Mend" | "Merc" | "Mero" | "Mlym" | "Moon" | "Mong" | "Mroo" | "Mtei" | "Mymr" | "Narb" | "Nbat" | "Nkgb" | "Nkoo" | "Nshu" | "Ogam" | "Olck" | "Orkh" | "Orya" | "Osma" | "Palm" | "Perm" | "Phag" | "Phli" | "Phlp" | "Phlv" | "Phnx" | "Plrd" | "Prti" | "Rjng" | "Roro" | "Runr" | "Samr" | "Sara" | "Sarb" | "Saur" | "Sgnw" | "Shaw" | "Shrd" | "Sind" | "Sinh" | "Sora" | "Sund" | "Sylo" | "Syrc" | "Syre" | "Syrj" | "Syrn" | "Tagb" | "Takr" | "Tale" | "Talu" | "Taml" | "Tang" | "Tavt" | "Telu" | "Teng" | "Tfng" | "Tglg" | "Thaa" | "Thai" | "Tibt" | "Tirh" | "Ugar" | "Vaii" | "Visp" | "Wara" | "Wole" | "Xpeo" | "Xsux" | "Yiii" | "Zmth" | "Zsym" | "Zyyy";

    /**
     * A CSS generic font family.
     */
    export type GenericFamily = "standard" | "sansserif" | "serif" | "fixed" | "cursive" | "fantasy";

    /**
     * One of<br><var>not_controllable</var>: cannot be controlled by any extension<br><var>controlled_by_other_extensions</var>: controlled by extensions with higher precedence<br><var>controllable_by_this_extension</var>: can be controlled by this extension<br><var>controlled_by_this_extension</var>: controlled by this extension
     */
    export type LevelOfControl = "not_controllable" | "controlled_by_other_extensions" | "controllable_by_this_extension" | "controlled_by_this_extension";

  }

  /**
   * Use <code>chrome.gcm</code> to enable apps and extensions to send and receive messages through the <a href='http://developer.android.com/google/gcm/'>Google Cloud Messaging Service</a>.
   */
  export namespace gcm {
    /**
     * The maximum size (in bytes) of all key/value pairs in a message.
     */
    export var MAX_MESSAGE_SIZE: number;

    /**
     * Registers the application with GCM. The registration ID will be returned by the <code>callback</code>. If <code>register</code> is called again with the same list of <code>senderIds</code>, the same registration ID will be returned.
     */
    export function register(senderIds: ({0: string} & string[]), callback: (registrationId: string) => void): void;

    /**
     * Unregisters the application from GCM.
     */
    export function unregister(callback: () => void): void;

    /**
     * Sends a message according to its contents.
     */
    export function send(message: {destinationId: string, messageId: string, timeToLive?: number, data: {[name: string]: string}}, callback: (messageId: string) => void): void;

  }

  /**
   * Use the <code>chrome.history</code> API to interact with the browser's record of visited pages. You can add, remove, and query for URLs in the browser's history. To override the history page with your own version, see <a href='override'>Override Pages</a>.
   */
  export namespace history {
    /**
     * Searches the history for the last visit time of each page matching the query.
     */
    export function search(query: {text: string, startTime?: number, endTime?: number, maxResults?: number}, callback: (results: HistoryItem[]) => void): void;

    /**
     * Retrieves information about visits to a URL.
     */
    export function getVisits(details: UrlDetails, callback: (results: VisitItem[]) => void): void;

    /**
     * Adds a URL to the history at the current time with a <a href='#transition_types'>transition type</a> of "link".
     */
    export function addUrl(details: UrlDetails, callback: () => void): void;

    /**
     * Removes all occurrences of the given URL from the history.
     */
    export function deleteUrl(details: UrlDetails, callback: () => void): void;

    /**
     * Removes all items within the specified date range from the history.  Pages will not be removed from the history unless all visits fall within the range.
     */
    export function deleteRange(range: {startTime: number, endTime: number}, callback: () => void): void;

    /**
     * Deletes all items from the history.
     */
    export function deleteAll(callback: () => void): void;

    /**
     * The <a href='#transition_types'>transition type</a> for this visit from its referrer.
     */
    export type TransitionType = "link" | "typed" | "auto_bookmark" | "auto_subframe" | "manual_subframe" | "generated" | "auto_toplevel" | "form_submit" | "reload" | "keyword" | "keyword_generated";

    /**
     * An object encapsulating one result of a history query.
     */
    export interface HistoryItem {
      /**
       * The unique identifier for the item.
       */
      id: string;

      /**
       * The URL navigated to by a user.
       */
      url?: string;

      /**
       * The title of the page when it was last loaded.
       */
      title?: string;

      /**
       * When this page was last loaded, represented in milliseconds since the epoch.
       */
      lastVisitTime?: number;

      /**
       * The number of times the user has navigated to this page.
       */
      visitCount?: number;

      /**
       * The number of times the user has navigated to this page by typing in the address.
       */
      typedCount?: number;

    }

    /**
     * An object encapsulating one visit to a URL.
     */
    export interface VisitItem {
      /**
       * The unique identifier for the item.
       */
      id: string;

      /**
       * The unique identifier for this visit.
       */
      visitId: string;

      /**
       * When this visit occurred, represented in milliseconds since the epoch.
       */
      visitTime?: number;

      /**
       * The visit ID of the referrer.
       */
      referringVisitId: string;

      /**
       * The <a href='#transition_types'>transition type</a> for this visit from its referrer.
       */
      transition: TransitionType;

    }

    export interface UrlDetails {
      /**
       * The URL for the operation. It must be in the format as returned from a call to history.search.
       */
      url: string;

    }

  }

  /**
   * Use the <code>chrome.i18n</code> infrastructure to implement internationalization across your whole app or extension.
   */
  export namespace i18n {
    /**
     * Gets the accept-languages of the browser. This is different from the locale used by the browser; to get the locale, use $(ref:i18n.getUILanguage).
     */
    export function getAcceptLanguages(callback: (languages: LanguageCode[]) => void): void;

    /**
     * Gets the localized string for the specified message. If the message is missing, this method returns an empty string (''). If the format of the <code>getMessage()</code> call is wrong &mdash; for example, <em>messageName</em> is not a string or the <em>substitutions</em> array has more than 9 elements &mdash; this method returns <code>undefined</code>.
     */
    export function getMessage(messageName: string, substitutions: any, options: {escapeLt?: boolean}): string;

    /**
     * Gets the browser UI language of the browser. This is different from $(ref:i18n.getAcceptLanguages) which returns the preferred user languages.
     */
    export function getUILanguage(): string;

    /**
     * Detects the language of the provided text using CLD.
     */
    export function detectLanguage(text: string, callback: (result: {isReliable: boolean, languages: {language: LanguageCode, percentage: number}[]}) => void): void;

    /**
     * An ISO language code such as <code>en</code> or <code>fr</code>. For a complete list of languages supported by this method, see <a href='http://src.chromium.org/viewvc/chrome/trunk/src/third_party/cld/languages/internal/languages.cc'>kLanguageInfoTable</a>. For an unknown language, <code>und</code> will be returned, which means that [percentage] of the text is unknown to CLD
     */
    export type LanguageCode = string;

  }

  /**
   * Use the <code>chrome.input.ime</code> API to implement a custom IME for Chrome OS. This allows your extension to handle keystrokes, set the composition, and manage the candidate window.
   */
  export namespace input.ime {
    /**
     * Set the current composition. If this extension does not own the active IME, this fails.
     */
    export function setComposition(parameters: {contextID: number, text: string, selectionStart?: number, selectionEnd?: number, cursor: number, segments?: {start: number, end: number, style: UnderlineStyle}[]}, callback: (success: boolean) => void): void;

    /**
     * Clear the current composition. If this extension does not own the active IME, this fails.
     */
    export function clearComposition(parameters: {contextID: number}, callback: (success: boolean) => void): void;

    /**
     * Commits the provided text to the current input.
     */
    export function commitText(parameters: {contextID: number, text: string}, callback: (success: boolean) => void): void;

    /**
     * Sends the key events.  This function is expected to be used by virtual keyboards.  When key(s) on a virtual keyboard is pressed by a user, this function is used to propagate that event to the system.
     */
    export function sendKeyEvents(parameters: {contextID: number, keyData: KeyboardEvent[]}, callback: () => void): void;

    /**
     * Hides the input view window, which is popped up automatically by system. If the input view window is already hidden, this function will do nothing.
     */
    export function hideInputView(): void;

    /**
     * Sets the properties of the candidate window. This fails if the extension doesn't own the active IME
     */
    export function setCandidateWindowProperties(parameters: {engineID: string, properties: {visible?: boolean, cursorVisible?: boolean, vertical?: boolean, pageSize?: number, auxiliaryText?: string, auxiliaryTextVisible?: boolean, totalCandidates?: number, currentCandidateIndex?: number, windowPosition?: WindowPosition}}, callback: (success: boolean) => void): void;

    /**
     * Sets the current candidate list. This fails if this extension doesn't own the active IME
     */
    export function setCandidates(parameters: {contextID: number, candidates: {candidate: string, id: number, parentId?: number, label?: string, annotation?: string, usage?: {title: string, body: string}}[]}, callback: (success: boolean) => void): void;

    /**
     * Set the position of the cursor in the candidate window. This is a no-op if this extension does not own the active IME.
     */
    export function setCursorPosition(parameters: {contextID: number, candidateID: number}, callback: (success: boolean) => void): void;

    /**
     * Shows/Hides an assistive window with the given properties.
     */
    export function setAssistiveWindowProperties(parameters: {contextID: number, properties: AssistiveWindowProperties}, callback: (success: boolean) => void): void;

    /**
     * Highlights/Unhighlights a button in an assistive window.
     */
    export function setAssistiveWindowButtonHighlighted(parameters: {contextID: number, buttonID: AssistiveWindowButton, windowType: AssistiveWindowType, announceString?: string, highlighted: boolean}, callback: () => void): void;

    /**
     * Adds the provided menu items to the language menu when this IME is active.
     */
    export function setMenuItems(parameters: MenuParameters, callback: () => void): void;

    /**
     * Updates the state of the MenuItems specified
     */
    export function updateMenuItems(parameters: MenuParameters, callback: () => void): void;

    /**
     * Deletes the text around the caret.
     */
    export function deleteSurroundingText(parameters: {engineID: string, contextID: number, offset: number, length: number}, callback: () => void): void;

    /**
     * Indicates that the key event received by onKeyEvent is handled.  This should only be called if the onKeyEvent listener is asynchronous.
     */
    export function keyEventHandled(requestId: string, response: boolean): void;

    export type KeyboardEventType = "keyup" | "keydown";

    /**
     * See http://www.w3.org/TR/DOM-Level-3-Events/#events-KeyboardEvent
     */
    export interface KeyboardEvent {
      /**
       * One of keyup or keydown.
       */
      type: KeyboardEventType;

      /**
       * (Deprecated) The ID of the request. Use the <code>requestId</code> param from the <code>onKeyEvent</code> event instead.
       */
      requestId?: string;

      /**
       * The extension ID of the sender of this keyevent.
       */
      extensionId?: string;

      /**
       * Value of the key being pressed
       */
      key: string;

      /**
       * Value of the physical key being pressed. The value is not affected by current keyboard layout or modifier state.
       */
      code: string;

      /**
       * The deprecated HTML keyCode, which is system- and implementation-dependent numerical code signifying the unmodified identifier associated with the key pressed.
       */
      keyCode?: number;

      /**
       * Whether or not the ALT key is pressed.
       */
      altKey?: boolean;

      /**
       * Whether or not the ALTGR key is pressed.
       */
      altgrKey?: boolean;

      /**
       * Whether or not the CTRL key is pressed.
       */
      ctrlKey?: boolean;

      /**
       * Whether or not the SHIFT key is pressed.
       */
      shiftKey?: boolean;

      /**
       * Whether or not the CAPS_LOCK is enabled.
       */
      capsLock?: boolean;

    }

    /**
     * Type of value this text field edits, (Text, Number, URL, etc)
     */
    export type InputContextType = "text" | "search" | "tel" | "url" | "email" | "number" | "password" | "null";

    /**
     * The auto-capitalize type of the text field.
     */
    export type AutoCapitalizeType = "characters" | "words" | "sentences";

    /**
     * Describes an input Context
     */
    export interface InputContext {
      /**
       * This is used to specify targets of text field operations.  This ID becomes invalid as soon as onBlur is called.
       */
      contextID: number;

      /**
       * Type of value this text field edits, (Text, Number, URL, etc)
       */
      type: InputContextType;

      /**
       * Whether the text field wants auto-correct.
       */
      autoCorrect: boolean;

      /**
       * Whether the text field wants auto-complete.
       */
      autoComplete: boolean;

      /**
       * The auto-capitalize type of the text field.
       */
      autoCapitalize: AutoCapitalizeType;

      /**
       * Whether the text field wants spell-check.
       */
      spellCheck: boolean;

      /**
       * Whether text entered into the text field should be used to improve typing suggestions for the user.
       */
      shouldDoLearning: boolean;

    }

    /**
     * The type of menu item. Radio buttons between separators are considered grouped.
     */
    export type MenuItemStyle = "check" | "radio" | "separator";

    /**
     * A menu item used by an input method to interact with the user from the language menu.
     */
    export interface MenuItem {
      /**
       * String that will be passed to callbacks referencing this MenuItem.
       */
      id: string;

      /**
       * Text displayed in the menu for this item.
       */
      label?: string;

      /**
       * The type of menu item.
       */
      style?: MenuItemStyle;

      /**
       * Indicates this item is visible.
       */
      visible?: boolean;

      /**
       * Indicates this item should be drawn with a check.
       */
      checked?: boolean;

      /**
       * Indicates this item is enabled.
       */
      enabled?: boolean;

    }

    /**
     * The type of the underline to modify this segment.
     */
    export type UnderlineStyle = "underline" | "doubleUnderline" | "noUnderline";

    /**
     * Where to display the candidate window. If set to 'cursor', the window follows the cursor. If set to 'composition', the window is locked to the beginning of the composition.
     */
    export type WindowPosition = "cursor" | "composition";

    /**
     * The screen type under which the IME is activated.
     */
    export type ScreenType = "normal" | "login" | "lock" | "secondary-login";

    /**
     * Which mouse buttons was clicked.
     */
    export type MouseButton = "left" | "middle" | "right";

    /**
     * Type of assistive window.
     */
    export type AssistiveWindowType = "undo";

    /**
     * Properties of the assistive window.
     */
    export interface AssistiveWindowProperties {
      type: AssistiveWindowType;

      /**
       * Sets true to show AssistiveWindow, sets false to hide.
       */
      visible: boolean;

      /**
       * Strings for ChromeVox to announce.
       */
      announceString?: string;

    }

    /**
     * ID of buttons in assistive window.
     */
    export type AssistiveWindowButton = "undo" | "addToDictionary";

    export interface MenuParameters {
      /**
       * ID of the engine to use.
       */
      engineID: string;

      /**
       * MenuItems to add or update. They will be added in the order they exist in the array.
       */
      items: MenuItem[];

    }

  }

  export namespace inputMethodPrivate {
    /**
     * Gets configurations for input methods.
     */
    export function getInputMethodConfig(callback: (config: {isPhysicalKeyboardAutocorrectEnabled: boolean, isImeMenuActivated: boolean}) => void): void;

    /**
     * Gets all whitelisted input methods.
     */
    export function getInputMethods(callback: (inputMethods: {id: string, name: string, indicator: string}[]) => void): void;

    /**
     * Gets the current input method.
     */
    export function getCurrentInputMethod(callback: (inputMethodId: string) => void): void;

    /**
     * Sets the current input method.
     */
    export function setCurrentInputMethod(inputMethodId: string, callback: () => void): void;

    /**
     * Fetches a list of all the words currently in the dictionary.
     */
    export function fetchAllDictionaryWords(callback: (words: string[]) => void): void;

    /**
     * Adds a single word to be stored in the dictionary.
     */
    export function addWordToDictionary(word: string, callback: () => void): void;

    /**
     * Gets whether the encrypt sync is enabled.
     */
    export function getEncryptSyncEnabled(callback: (enabled: boolean) => void): void;

    /**
     * Sets the XKB layout for the given input method.
     */
    export function setXkbLayout(xkb_name: string, callback: () => void): void;

    /**
     * Commits the text currently being composed without moving the selected text range. This is a no-op if the context is incorrect.
     */
    export function finishComposingText(parameters: {contextID: number}, callback: () => void): void;

    /**
     * Sets the selection range
     */
    export function setSelectionRange(parameters: {contextID: number, selectionStart?: number, selectionEnd?: number}, callback: (success: boolean) => void): void;

    /**
     * Fires the input.ime.onMenuItemActivated event.
     */
    export function notifyImeMenuItemActivated(engineID: string, name: string): void;

    /**
     * Shows the input view window. If the input view window is already shown, this function will do nothing.
     */
    export function showInputView(callback: () => void): void;

    /**
     * Hides the input view window. If the input view window is already hidden, this function will do nothing.
     */
    export function hideInputView(callback: () => void): void;

    /**
     * Opens the options page for the input method extension. If the input method does not have options, this function will do nothing.
     */
    export function openOptionsPage(inputMethodId: string): void;

    /**
     * Gets the composition bounds
     */
    export function getCompositionBounds(callback: (boundsList: {x: number, y: number, w: number, h: number}[]) => void): void;

    /**
     * Gets the surrounding text of the current selection
     */
    export function getSurroundingText(beforeLength: number, afterLength: number, callback: (surroundingInfo: {before: string, selected: string, after: string}) => void): void;

    /**
     * Gets the current values of all settings for a particular input method
     */
    export function getSettings(engineID: string, callback: (settings?: InputMethodSettings) => void): void;

    /**
     * Sets the value of all settings for a particular input method
     */
    export function setSettings(engineID: string, settings: InputMethodSettings, callback: () => void): void;

    /**
     * (Deprecated) Set the composition range. If this extension does not own the active IME, this fails. Use setComposingRange instead.
     */
    export function setCompositionRange(parameters: {contextID: number, selectionBefore: number, selectionAfter: number, segments?: {start: number, end: number, style: UnderlineStyle}[]}, callback: (success: boolean) => void): void;

    /**
     * Sets the composing range. If this extension does not own the active IME, this fails.
     */
    export function setComposingRange(parameters: {contextID: number, start: number, end: number, segments?: {start: number, end: number, style: UnderlineStyle}[]}, callback: () => void): void;

    /**
     * Get the autocorrected word's bounds. Returns an empty range if there is no autocorrected word.
     */
    export function getAutocorrectRange(parameters: {contextID: number}, callback: (autocorrectCharacterBounds: {start: number, end: number}) => void): void;

    /**
     * Get the screen coordinates of the autocorrected word's bounds.
     */
    export function getAutocorrectCharacterBounds(parameters: {contextID: number}, callback: (autocorrectCharacterBounds: {x: number, y: number, width: number, height: number}) => void): void;

    /**
     * Set the autocorrect range and autocorrect word. If this extension does not own the active IME, this fails.
     */
    export function setAutocorrectRange(parameters: {contextID: number, autocorrectString: string, selectionStart: number, selectionEnd: number}, callback: () => void): void;

    /**
     * Resets the current engine to its initial state. Fires an OnReset event.
     */
    export function reset(): void;

    /**
     * The type of menu item. Radio buttons between separators are considered grouped.
     */
    export type MenuItemStyle = "check" | "radio" | "separator";

    /**
     * A menu item used by an input method to interact with the user from the language menu.
     */
    export interface MenuItem {
      /**
       * String that will be passed to callbacks referencing this MenuItem.
       */
      id: string;

      /**
       * Text displayed in the menu for this item.
       */
      label?: string;

      /**
       * The type of menu item.
       */
      style?: MenuItemStyle;

      /**
       * Indicates this item is visible.
       */
      visible?: boolean;

      /**
       * Indicates this item should be drawn with a check.
       */
      checked?: boolean;

      /**
       * Indicates this item is enabled.
       */
      enabled?: boolean;

    }

    /**
     * The type of the underline to modify a composition segment.
     */
    export type UnderlineStyle = "underline" | "doubleUnderline" | "noUnderline";

    /**
     * Describes how the text field was focused
     */
    export type FocusReason = "mouse" | "touch" | "pen" | "other";

    /**
     * Type of keyboard to show for this text field, (Text, Number, URL, etc) set by mode property of input tag
     */
    export type InputModeType = "noKeyboard" | "text" | "tel" | "url" | "email" | "numeric" | "decimal" | "search";

    /**
     * Type of value this text field edits, (Text, Number, URL, etc)
     */
    export type InputContextType = "text" | "search" | "tel" | "url" | "email" | "number" | "password" | "null";

    /**
     * The auto-capitalize type of the text field.
     */
    export type AutoCapitalizeType = "off" | "characters" | "words" | "sentences";

    /**
     * Describes an input Context
     */
    export interface InputContext {
      /**
       * This is used to specify targets of text field operations.  This ID becomes invalid as soon as onBlur is called.
       */
      contextID: number;

      /**
       * Type of value this text field edits, (Text, Number, URL, etc)
       */
      type: InputContextType;

      /**
       * Type of keyboard to show for this field (Text, Number, URL, etc)
       */
      mode: InputModeType;

      /**
       * Whether the text field wants auto-correct.
       */
      autoCorrect: boolean;

      /**
       * Whether the text field wants auto-complete.
       */
      autoComplete: boolean;

      /**
       * The auto-capitalize type of the text field.
       */
      autoCapitalize: AutoCapitalizeType;

      /**
       * Whether the text field wants spell-check.
       */
      spellCheck: boolean;

      /**
       * Whether text entered into the text field should be used to improve typing suggestions for the user.
       */
      shouldDoLearning: boolean;

      /**
       * How the text field was focused
       */
      focusReason: FocusReason;

      /**
       * Whether the text field has ever been a password field.
       */
      hasBeenPassword: boolean;

      /**
       * Key of the app associated with this text field if any.
       */
      appKey?: string;

    }

    /**
     * User preference settings for a specific input method. Japanese input methods are not included because they are managed separately by Mozc module.
     */
    export interface InputMethodSettings {
      /**
       * Whether to enable auto completion.
       */
      enableCompletion?: boolean;

      /**
       * Whether to auto transform double spaces to type period.
       */
      enableDoubleSpacePeriod?: boolean;

      /**
       * Whether to enable gesture typing.
       */
      enableGestureTyping?: boolean;

      /**
       * Whether to enable word prediction.
       */
      enablePrediction?: boolean;

      /**
       * Whether to enable sound on keypress.
       */
      enableSoundOnKeypress?: boolean;

      /**
       * The level of auto correction for physical keyboard (0: Off, 1: Modest, 2: Aggressive).
       */
      physicalKeyboardAutoCorrectionLevel?: number;

      /**
       * Whether to enable auto capitalization for physical keyboard.
       */
      physicalKeyboardEnableCapitalization?: boolean;

      /**
       * The level of auto correction for virtual keyboard (0: Off, 1: Modest, 2: Aggressive).
       */
      virtualKeyboardAutoCorrectionLevel?: number;

      /**
       * Whether enable auto capitalization for virtual keyboard.
       */
      virtualKeyboardEnableCapitalization?: boolean;

      /**
       * The xkb keyboard (system provided keyboard) layout.
       */
      xkbLayout?: string;

      /**
       * Whether input one syllable at a time in korean input method.
       */
      koreanEnableSyllableInput?: boolean;

      /**
       * The layout of korean keyboard.
       */
      koreanKeyboardLayout?: string;

      /**
       * Whether to show hangul candidates in korean input method.
       */
      koreanShowHangulCandidate?: boolean;

      /**
       * Whether to use Chinese punctuations in pinyin.
       */
      pinyinChinesePunctuation?: boolean;

      /**
       * User can use shortcuts to switch between Chinese and English quickly when using pinyin, this flag indicates whether the default language is Chinese.
       */
      pinyinDefaultChinese?: boolean;

      /**
       * Whether to enable fuzzy pinyin.
       */
      pinyinEnableFuzzy?: boolean;

      /**
       * Whether to enable using ','/'.' to page up/down the candidates in pinyin.
       */
      pinyinEnableLowerPaging?: boolean;

      /**
       * Whether to enable using '-'/'=' to page up/down the candidates in pinyin.
       */
      pinyinEnableUpperPaging?: boolean;

      /**
       * Whether to output full width letters and digits in pinyin.
       */
      pinyinFullWidthCharacter?: boolean;

      /**
       * The configuration of which fuzzy pairs are enable.
       */
      pinyinFuzzyConfig?: {an_ang?: boolean, c_ch?: boolean, en_eng?: boolean, f_h?: boolean, ian_iang?: boolean, in_ing?: boolean, k_g?: boolean, l_n?: boolean, r_l?: boolean, s_sh?: boolean, uan_uang?: boolean, z_zh?: boolean};

      /**
       * The layout of zhuyin keyboard.
       */
      zhuyinKeyboardLayout?: string;

      /**
       * The page size of zhuyin candidate page.
       */
      zhuyinPageSize?: number;

      /**
       * The keys used to select candidates in zhuyin.
       */
      zhuyinSelectKeys?: string;

    }

  }

  /**
   * Use <code>chrome.instanceID</code> to access the Instance ID service.
   */
  export namespace instanceID {
    /**
     * Retrieves an identifier for the app instance. The instance ID will be returned by the <code>callback</code>. The same ID will be returned as long as the application identity has not been revoked or expired.
     */
    export function getID(callback: (instanceID: string) => void): void;

    /**
     * Retrieves the time when the InstanceID has been generated. The creation time will be returned by the <code>callback</code>.
     */
    export function getCreationTime(callback: (creationTime: number) => void): void;

    /**
     * Return a token that allows the authorized entity to access the service defined by scope.
     */
    export function getToken(getTokenParams: {authorizedEntity: string, scope: string, options?: {[name: string]: string}}, callback: (token: string) => void): void;

    /**
     * Revokes a granted token.
     */
    export function deleteToken(deleteTokenParams: {authorizedEntity: string, scope: string}, callback: () => void): void;

    /**
     * Resets the app instance identifier and revokes all tokens associated with it.
     */
    export function deleteID(callback: () => void): void;

  }

  /**
   * Schemas for structured manifest entries
   */
  export namespace manifestTypes {
    /**
     * Chrome settings which can be overriden by an extension.
     */
    export interface ChromeSettingsOverrides {
      /**
       * New value for the homepage.
       */
      homepage?: string;

      /**
       * A search engine
       */
      search_provider?: {name?: string, keyword?: string, favicon_url?: string, search_url: string, encoding?: string, suggest_url?: string, image_url?: string, search_url_post_params?: string, suggest_url_post_params?: string, image_url_post_params?: string, alternate_urls?: string[], prepopulated_id?: number, is_default: boolean};

      /**
       * An array of length one containing a URL to be used as the startup page.
       */
      startup_pages?: string[];

    }

    /**
     * For <code>"file"</code> the source is a file passed via <code>onLaunched</code> event. For <code>"device"</code> contents are fetched from an external device (eg. plugged via USB), without using <code>file_handlers</code>. Finally, for <code>"network"</code> source, contents should be fetched via network.
     */
    export type FileSystemProviderSource = "file" | "device" | "network";

    /**
     * Represents capabilities of a providing extension.
     */
    export interface FileSystemProviderCapabilities {
      /**
       * Whether configuring via <code>onConfigureRequested</code> is supported. By default: <code>false</code>.
       */
      configurable?: boolean;

      /**
       * Whether multiple (more than one) mounted file systems are supported. By default: <code>false</code>.
       */
      multiple_mounts?: boolean;

      /**
       * Whether setting watchers and notifying about changes is supported. By default: <code>false</code>.
       */
      watchable?: boolean;

      /**
       * Source of data for mounted file systems.
       */
      source: FileSystemProviderSource;

    }

  }

  export namespace mediaPlayerPrivate {
  }

  /**
   * The omnibox API allows you to register a keyword with Google Chrome's address bar, which is also known as the omnibox.
   */
  export namespace omnibox {
    /**
     * A callback passed to the onInputChanged event used for sending suggestions back to the browser.
     */
    export function sendSuggestions(requestId: number, suggestResults: SuggestResult[]): void;

    /**
     * Sets the description and styling for the default suggestion. The default suggestion is the text that is displayed in the first suggestion row underneath the URL bar.
     */
    export function setDefaultSuggestion(suggestion: DefaultSuggestResult): void;

    /**
     * The style type.
     */
    export type DescriptionStyleType = "url" | "match" | "dim";

    /**
     * The window disposition for the omnibox query. This is the recommended context to display results. For example, if the omnibox command is to navigate to a certain URL, a disposition of 'newForegroundTab' means the navigation should take place in a new selected tab.
     */
    export type OnInputEnteredDisposition = "currentTab" | "newForegroundTab" | "newBackgroundTab";

    /**
     * The style ranges for the description, as provided by the extension.
     */
    export interface MatchClassification {
      offset: number;

      /**
       * The style type
       */
      type: DescriptionStyleType;

      length?: number;

    }

    /**
     * The style ranges for the description, as provided by ToValue().
     */
    export interface MatchClassificationRaw {
      offset: number;

      type: number;

    }

    /**
     * A suggest result.
     */
    export interface SuggestResult {
      /**
       * The text that is put into the URL bar, and that is sent to the extension when the user chooses this entry.
       */
      content: string;

      /**
       * The text that is displayed in the URL dropdown. Can contain XML-style markup for styling. The supported tags are 'url' (for a literal URL), 'match' (for highlighting text that matched what the user's query), and 'dim' (for dim helper text). The styles can be nested, eg. <dim><match>dimmed match</match></dim>. You must escape the five predefined entities to display them as text: stackoverflow.com/a/1091953/89484
       */
      description: string;

      /**
       * Whether the suggest result can be deleted by the user.
       */
      deletable?: boolean;

      /**
       * An array of style ranges for the description, as provided by the extension.
       */
      descriptionStyles?: MatchClassification[];

      /**
       * An array of style ranges for the description, as provided by ToValue().
       */
      descriptionStylesRaw?: MatchClassificationRaw[];

    }

    /**
     * A suggest result.
     */
    export interface DefaultSuggestResult {
      /**
       * The text that is displayed in the URL dropdown. Can contain XML-style markup for styling. The supported tags are 'url' (for a literal URL), 'match' (for highlighting text that matched what the user's query), and 'dim' (for dim helper text). The styles can be nested, eg. <dim><match>dimmed match</match></dim>.
       */
      description: string;

      /**
       * An array of style ranges for the description, as provided by the extension.
       */
      descriptionStyles?: MatchClassification[];

      /**
       * An array of style ranges for the description, as provided by ToValue().
       */
      descriptionStylesRaw?: MatchClassificationRaw[];

    }

  }

  /**
   * Use the <code>chrome.pageAction</code> API to put icons in the main Google Chrome toolbar, to the right of the address bar. Page actions represent actions that can be taken on the current page, but that aren't applicable to all pages. Page actions appear grayed out when inactive.
   */
  export namespace pageAction {
    /**
     * Shows the page action. The page action is shown whenever the tab is selected.
     */
    export function show(tabId: number, callback: () => void): void;

    /**
     * Hides the page action. Hidden page actions still appear in the Chrome toolbar, but are grayed out.
     */
    export function hide(tabId: number, callback: () => void): void;

    /**
     * Sets the title of the page action. This is displayed in a tooltip over the page action.
     */
    export function setTitle(details: {tabId: number, title: string}, callback: () => void): void;

    /**
     * Gets the title of the page action.
     */
    export function getTitle(details: TabDetails, callback: (result: string) => void): void;

    /**
     * Sets the icon for the page action. The icon can be specified either as the path to an image file or as the pixel data from a canvas element, or as dictionary of either one of those. Either the <b>path</b> or the <b>imageData</b> property must be specified.
     */
    export function setIcon(details: {tabId: number, imageData?: ImageDataType | {[name: string]: any}, path?: string | {[name: string]: any}, iconIndex?: number}, callback: () => void): void;

    /**
     * Sets the html document to be opened as a popup when the user clicks on the page action's icon.
     */
    export function setPopup(details: {tabId: number, popup: string}, callback: () => void): void;

    /**
     * Gets the html document set as the popup for this page action.
     */
    export function getPopup(details: TabDetails, callback: (result: string) => void): void;

    /**
     * Pixel data for an image. Must be an ImageData object (for example, from a <code>canvas</code> element).
     */
    export type ImageDataType = ImageData;

    export interface TabDetails {
      /**
       * The ID of the tab to query state for. If no tab is specified, the non-tab-specific state is returned.
       */
      tabId?: number;

    }

  }

  /**
   * Use the <code>chrome.pageCapture</code> API to save a tab as MHTML.
   */
  export namespace pageCapture {
    /**
     * Saves the content of the tab with given id as MHTML.
     */
    export function saveAsMHTML(details: {tabId: number}, callback: (mhtmlData?: Blob) => void): void;

  }

  /**
   * Use the <code>chrome.permissions</code> API to request <a href='permissions#manifest'>declared optional permissions</a> at run time rather than install time, so users understand why the permissions are needed and grant only those that are necessary.
   */
  export namespace permissions {
    /**
     * Gets the extension's current set of permissions.
     */
    export function getAll(callback: (permissions: Permissions) => void): void;

    /**
     * Checks if the extension has the specified permissions.
     */
    export function contains(permissions: Permissions, callback: (result: boolean) => void): void;

    /**
     * Requests access to the specified permissions, displaying a prompt to the user if necessary. These permissions must either be defined in the <code>optional_permissions</code> field of the manifest or be required permissions that were withheld by the user. Paths on origin patterns will be ignored. You can request subsets of optional origin permissions; for example, if you specify <code>*://./*</code> in the <code>optional_permissions</code> section of the manifest, you can request <code>http://example.com/</code>. If there are any problems requesting the permissions, $(ref:runtime.lastError) will be set.
     */
    export function request(permissions: Permissions, callback: (granted: boolean) => void): void;

    /**
     * Removes access to the specified permissions. If there are any problems removing the permissions, $(ref:runtime.lastError) will be set.
     */
    export function remove(permissions: Permissions, callback: (removed: boolean) => void): void;

    export interface Permissions {
      /**
       * List of named permissions (does not include hosts or origins).
       */
      permissions?: string[];

      /**
       * The list of host permissions, including those specified in the <code>optional_permissions</code> or <code>permissions</code> keys in the manifest, and those associated with <a href='content_scripts'>Content Scripts</a>.
       */
      origins?: string[];

    }

  }

  /**
   * Use the <code>chrome.privacy</code> API to control usage of the features in Chrome that can affect a user's privacy. This API relies on the <a href='types#ChromeSetting'>ChromeSetting prototype of the type API</a> for getting and setting Chrome's configuration.
   */
  export namespace privacy {
    /**
     * Settings that influence Chrome's handling of network connections in general.
     */
    export var network: {networkPredictionEnabled: chrome.types.ChromeSetting<boolean>, webRTCMultipleRoutesEnabled: chrome.types.ChromeSetting<boolean>, webRTCNonProxiedUdpEnabled: chrome.types.ChromeSetting<boolean>, webRTCIPHandlingPolicy: chrome.types.ChromeSetting<IPHandlingPolicy>};

    /**
     * Settings that enable or disable features that require third-party network services provided by Google and your default search provider.
     */
    export var services: {alternateErrorPagesEnabled: chrome.types.ChromeSetting<boolean>, autofillEnabled: chrome.types.ChromeSetting<boolean>, autofillAddressEnabled: chrome.types.ChromeSetting<boolean>, autofillCreditCardEnabled: chrome.types.ChromeSetting<boolean>, passwordSavingEnabled: chrome.types.ChromeSetting<boolean>, safeBrowsingEnabled: chrome.types.ChromeSetting<boolean>, safeBrowsingExtendedReportingEnabled: chrome.types.ChromeSetting<boolean>, searchSuggestEnabled: chrome.types.ChromeSetting<boolean>, spellingServiceEnabled: chrome.types.ChromeSetting<boolean>, translationServiceEnabled: chrome.types.ChromeSetting<boolean>};

    /**
     * Settings that determine what information Chrome makes available to websites.
     */
    export var websites: {thirdPartyCookiesAllowed: chrome.types.ChromeSetting<boolean>, hyperlinkAuditingEnabled: chrome.types.ChromeSetting<boolean>, referrersEnabled: chrome.types.ChromeSetting<boolean>, doNotTrackEnabled: chrome.types.ChromeSetting<boolean>, protectedContentEnabled: chrome.types.ChromeSetting<boolean>};

    /**
     * The IP handling policy of WebRTC.
     */
    export type IPHandlingPolicy = "default" | "default_public_and_private_interfaces" | "default_public_interface_only" | "disable_non_proxied_udp";

  }

  /**
   * Use the <code>chrome.proxy</code> API to manage Chrome's proxy settings. This API relies on the <a href='types#ChromeSetting'>ChromeSetting prototype of the type API</a> for getting and setting the proxy configuration.
   */
  export namespace proxy {
    /**
     * Proxy settings to be used. The value of this setting is a ProxyConfig object.
     */
    export var settings: chrome.types.ChromeSetting<ProxyConfig>;

    export type Scheme = "http" | "https" | "quic" | "socks4" | "socks5";

    export type Mode = "direct" | "auto_detect" | "pac_script" | "fixed_servers" | "system";

    /**
     * An object encapsulating a single proxy server's specification.
     */
    export interface ProxyServer {
      /**
       * The scheme (protocol) of the proxy server itself. Defaults to 'http'.
       */
      scheme?: Scheme;

      /**
       * The hostname or IP address of the proxy server. Hostnames must be in ASCII (in Punycode format). IDNA is not supported, yet.
       */
      host: string;

      /**
       * The port of the proxy server. Defaults to a port that depends on the scheme.
       */
      port?: number;

    }

    /**
     * An object encapsulating the set of proxy rules for all protocols. Use either 'singleProxy' or (a subset of) 'proxyForHttp', 'proxyForHttps', 'proxyForFtp' and 'fallbackProxy'.
     */
    export interface ProxyRules {
      /**
       * The proxy server to be used for all per-URL requests (that is http, https, and ftp).
       */
      singleProxy?: ProxyServer;

      /**
       * The proxy server to be used for HTTP requests.
       */
      proxyForHttp?: ProxyServer;

      /**
       * The proxy server to be used for HTTPS requests.
       */
      proxyForHttps?: ProxyServer;

      /**
       * The proxy server to be used for FTP requests.
       */
      proxyForFtp?: ProxyServer;

      /**
       * The proxy server to be used for everthing else or if any of the specific proxyFor... is not specified.
       */
      fallbackProxy?: ProxyServer;

      /**
       * List of servers to connect to without a proxy server.
       */
      bypassList?: string[];

    }

    /**
     * An object holding proxy auto-config information. Exactly one of the fields should be non-empty.
     */
    export interface PacScript {
      /**
       * URL of the PAC file to be used.
       */
      url?: string;

      /**
       * A PAC script.
       */
      data?: string;

      /**
       * If true, an invalid PAC script will prevent the network stack from falling back to direct connections. Defaults to false.
       */
      mandatory?: boolean;

    }

    /**
     * An object encapsulating a complete proxy configuration.
     */
    export interface ProxyConfig {
      /**
       * The proxy rules describing this configuration. Use this for 'fixed_servers' mode.
       */
      rules?: ProxyRules;

      /**
       * The proxy auto-config (PAC) script for this configuration. Use this for 'pac_script' mode.
       */
      pacScript?: PacScript;

      /**
       * 'direct' = Never use a proxy<br>'auto_detect' = Auto detect proxy settings<br>'pac_script' = Use specified PAC script<br>'fixed_servers' = Manually specify proxy servers<br>'system' = Use system proxy settings
       */
      mode: Mode;

    }

  }

  /**
   * Use the <code>chrome.sessions</code> API to query and restore tabs and windows from a browsing session.
   */
  export namespace sessions {
    /**
     * The maximum number of $(ref:sessions.Session) that will be included in a requested list.
     */
    export var MAX_SESSION_RESULTS: number;

    /**
     * Gets the list of recently closed tabs and/or windows.
     */
    export function getRecentlyClosed(filter: Filter, callback: (sessions: Session[]) => void): void;

    /**
     * Gets the list of recently closed tabs and/or windows.
     */
    export function getRecentlyClosed(callback: (sessions: Session[]) => void): void;

    /**
     * Retrieves all devices with synced sessions.
     */
    export function getDevices(filter: Filter, callback: (devices: Device[]) => void): void;

    /**
     * Retrieves all devices with synced sessions.
     */
    export function getDevices(callback: (devices: Device[]) => void): void;

    /**
     * Reopens a $(ref:windows.Window) or $(ref:tabs.Tab), with an optional callback to run when the entry has been restored.
     */
    export function restore(sessionId: string, callback: (restoredSession: Session) => void): void;

    export interface Filter {
      /**
       * The maximum number of entries to be fetched in the requested list. Omit this parameter to fetch the maximum number of entries ($(ref:sessions.MAX_SESSION_RESULTS)).
       */
      maxResults?: number;

    }

    export interface Session {
      /**
       * The time when the window or tab was closed or modified, represented in milliseconds since the epoch.
       */
      lastModified: number;

      /**
       * The $(ref:tabs.Tab), if this entry describes a tab. Either this or $(ref:sessions.Session.window) will be set.
       */
      tab?: chrome.tabs.Tab;

      /**
       * The $(ref:windows.Window), if this entry describes a window. Either this or $(ref:sessions.Session.tab) will be set.
       */
      window?: chrome.windows.Window;

    }

    export interface Device {
      info: string;

      /**
       * The name of the foreign device.
       */
      deviceName: string;

      /**
       * A list of open window sessions for the foreign device, sorted from most recently to least recently modified session.
       */
      sessions: Session[];

    }

  }

  export namespace systemPrivate {
    /**
     * Returns whether the incognito mode is enabled, disabled or forced
     */
    export function getIncognitoModeAvailability(callback: (value: GetIncognitoModeAvailabilityValue) => void): void;

    /**
     * Gets information about the system update.
     */
    export function getUpdateStatus(callback: (status: UpdateStatus) => void): void;

    /**
     * Gets Chrome's API key to use for requests to Google services.
     */
    export function getApiKey(callback: (key: string) => void): void;

    /**
     * State of system update.  NotAvailable when there is no available update or the update system is in error state, Updating when a system update is in progress, NeedRestart when a system update is finished and restart is needed.
     */
    export type UpdateStatusState = "NotAvailable" | "Updating" | "NeedRestart";

    /**
     * Exposes whether the incognito mode is available to windows. One of 'enabled', 'disabled' (user cannot browse pages in Incognito mode), 'forced' (all pages/sessions are forced into Incognito mode).
     */
    export type GetIncognitoModeAvailabilityValue = "enabled" | "disabled" | "forced";

    /**
     * Information about the system update.
     */
    export interface UpdateStatus {
      /**
       * State of system update.
       */
      state: UpdateStatusState;

      /**
       * Value between 0 and 1 describing the progress of system update download.  This value will be set to 0 when |state| is NotAvailable, 1 when NeedRestart.
       */
      downloadProgress: number;

    }

  }

  /**
   * Use the <code>chrome.tabs</code> API to interact with the browser's tab system. You can use this API to create, modify, and rearrange tabs in the browser.
   */
  export namespace tabs {
    /**
     * An ID that represents the absence of a browser tab.
     */
    export var TAB_ID_NONE: number;

    /**
     * Retrieves details about the specified tab.
     */
    export function get(tabId: number, callback: (tab: Tab) => void): void;

    /**
     * Gets the tab that this script call is being made from. May be undefined if called from a non-tab context (for example, a background page or popup view).
     */
    export function getCurrent(callback: (tab?: Tab) => void): void;

    /**
     * Connects to the content script(s) in the specified tab. The $(ref:runtime.onConnect) event is fired in each content script running in the specified tab for the current extension. For more details, see <a href='messaging'>Content Script Messaging</a>.
     */
    export function connect(tabId: number, connectInfo: {name?: string, frameId?: number}): chrome.runtime.Port;

    /**
     * Sends a single request to the content script(s) in the specified tab, with an optional callback to run when a response is sent back.  The $(ref:extension.onRequest) event is fired in each content script running in the specified tab for the current extension.
     */
    export function sendRequest(tabId: number, request: any, responseCallback: (response: any) => void): void;

    /**
     * Sends a single message to the content script(s) in the specified tab, with an optional callback to run when a response is sent back.  The $(ref:runtime.onMessage) event is fired in each content script running in the specified tab for the current extension.
     */
    export function sendMessage(tabId: number, message: any, options: {frameId?: number}, responseCallback: (response: any) => void): void;

    /**
     * Gets the tab that is selected in the specified window.
     */
    export function getSelected(windowId: number, callback: (tab: Tab) => void): void;

    /**
     * Gets the tab that is selected in the specified window.
     */
    export function getSelected(callback: (tab: Tab) => void): void;

    /**
     * Gets details about all tabs in the specified window.
     */
    export function getAllInWindow(windowId: number, callback: (tabs: Tab[]) => void): void;

    /**
     * Gets details about all tabs in the specified window.
     */
    export function getAllInWindow(callback: (tabs: Tab[]) => void): void;

    /**
     * Creates a new tab.
     */
    export function create(createProperties: {windowId?: number, index?: number, url?: string, active?: boolean, selected?: boolean, pinned?: boolean, openerTabId?: number}, callback: (tab: Tab) => void): void;

    /**
     * Duplicates a tab.
     */
    export function duplicate(tabId: number, callback: (tab?: Tab) => void): void;

    /**
     * Gets all tabs that have the specified properties, or all tabs if no properties are specified.
     */
    export function query(queryInfo: {active?: boolean, pinned?: boolean, audible?: boolean, muted?: boolean, highlighted?: boolean, discarded?: boolean, autoDiscardable?: boolean, currentWindow?: boolean, lastFocusedWindow?: boolean, status?: TabStatus, title?: string, url?: string | string[], groupId?: number, windowId?: number, windowType?: WindowType, index?: number}, callback: (result: Tab[]) => void): void;

    /**
     * Highlights the given tabs and focuses on the first of group. Will appear to do nothing if the specified tab is currently active.
     */
    export function highlight(highlightInfo: {windowId?: number, tabs: number[] | number}, callback: (window: chrome.windows.Window) => void): void;

    /**
     * Modifies the properties of a tab. Properties that are not specified in <var>updateProperties</var> are not modified.
     */
    export function update(tabId: number, updateProperties: {url?: string, active?: boolean, highlighted?: boolean, selected?: boolean, pinned?: boolean, muted?: boolean, openerTabId?: number, autoDiscardable?: boolean}, callback: (tab?: Tab) => void): void;

    /**
     * Modifies the properties of a tab. Properties that are not specified in <var>updateProperties</var> are not modified.
     */
    export function update(updateProperties: {url?: string, active?: boolean, highlighted?: boolean, selected?: boolean, pinned?: boolean, muted?: boolean, openerTabId?: number, autoDiscardable?: boolean}, callback: (tab?: Tab) => void): void;

    /**
     * Moves one or more tabs to a new position within its window, or to a new window. Note that tabs can only be moved to and from normal (window.type === "normal") windows.
     */
    export function move(tabIds: number | number[], moveProperties: {windowId?: number, index: number}, callback: (tabs: Tab | Tab[]) => void): void;

    /**
     * Reload a tab.
     */
    export function reload(tabId: number, reloadProperties: {bypassCache?: boolean}, callback: () => void): void;

    /**
     * Closes one or more tabs.
     */
    export function remove(tabIds: number | number[], callback: () => void): void;

    /**
     * Adds one or more tabs to a specified group, or if no group is specified, adds the given tabs to a newly created group.
     */
    export function group(options: {tabIds: number | ({0: number} & number[]), groupId?: number, createProperties?: {windowId?: number}}, callback: (groupId: number) => void): void;

    /**
     * Removes one or more tabs from their respective groups. If any groups become empty, they are deleted.
     */
    export function ungroup(tabIds: number | ({0: number} & number[]), callback: () => void): void;

    /**
     * Detects the primary language of the content in a tab.
     */
    export function detectLanguage(tabId: number, callback: (language: string) => void): void;

    /**
     * Detects the primary language of the content in a tab.
     */
    export function detectLanguage(callback: (language: string) => void): void;

    /**
     * Captures the visible area of the currently active tab in the specified window. In order to call this method, the extension must have either the <a href='declare_permissions'>&lt;all_urls&gt;</a> permission or the <a href='activeTab'>activeTab</a> permission. In addition to sites that extensions can normally access, this method allows extensions to capture sensitive sites that are otherwise restricted, including chrome:-scheme pages, other extensions' pages, and data: URLs. These sensitive sites can only be captured with the activeTab permission. File URLs may be captured only if the extension has been granted file access.
     */
    export function captureVisibleTab(windowId: number, options: chrome.extensionTypes.ImageDetails, callback: (dataUrl: string) => void): void;

    /**
     * Captures the visible area of the currently active tab in the specified window. In order to call this method, the extension must have either the <a href='declare_permissions'>&lt;all_urls&gt;</a> permission or the <a href='activeTab'>activeTab</a> permission. In addition to sites that extensions can normally access, this method allows extensions to capture sensitive sites that are otherwise restricted, including chrome:-scheme pages, other extensions' pages, and data: URLs. These sensitive sites can only be captured with the activeTab permission. File URLs may be captured only if the extension has been granted file access.
     */
    export function captureVisibleTab(options: chrome.extensionTypes.ImageDetails, callback: (dataUrl: string) => void): void;

    /**
     * Captures the visible area of the currently active tab in the specified window. In order to call this method, the extension must have either the <a href='declare_permissions'>&lt;all_urls&gt;</a> permission or the <a href='activeTab'>activeTab</a> permission. In addition to sites that extensions can normally access, this method allows extensions to capture sensitive sites that are otherwise restricted, including chrome:-scheme pages, other extensions' pages, and data: URLs. These sensitive sites can only be captured with the activeTab permission. File URLs may be captured only if the extension has been granted file access.
     */
    export function captureVisibleTab(windowId: number, callback: (dataUrl: string) => void): void;

    /**
     * Captures the visible area of the currently active tab in the specified window. In order to call this method, the extension must have either the <a href='declare_permissions'>&lt;all_urls&gt;</a> permission or the <a href='activeTab'>activeTab</a> permission. In addition to sites that extensions can normally access, this method allows extensions to capture sensitive sites that are otherwise restricted, including chrome:-scheme pages, other extensions' pages, and data: URLs. These sensitive sites can only be captured with the activeTab permission. File URLs may be captured only if the extension has been granted file access.
     */
    export function captureVisibleTab(callback: (dataUrl: string) => void): void;

    /**
     * Injects JavaScript code into a page. For details, see the <a href='content_scripts#pi'>programmatic injection</a> section of the content scripts doc.
     */
    export function executeScript(tabId: number, details: chrome.extensionTypes.InjectDetails, callback: (result?: any[]) => void): void;

    /**
     * Injects JavaScript code into a page. For details, see the <a href='content_scripts#pi'>programmatic injection</a> section of the content scripts doc.
     */
    export function executeScript(details: chrome.extensionTypes.InjectDetails, callback: (result?: any[]) => void): void;

    /**
     * Injects CSS into a page. For details, see the <a href='content_scripts#pi'>programmatic injection</a> section of the content scripts doc.
     */
    export function insertCSS(tabId: number, details: chrome.extensionTypes.InjectDetails, callback: () => void): void;

    /**
     * Injects CSS into a page. For details, see the <a href='content_scripts#pi'>programmatic injection</a> section of the content scripts doc.
     */
    export function insertCSS(details: chrome.extensionTypes.InjectDetails, callback: () => void): void;

    /**
     * Removes from a page CSS that was previously injected by a call to $(ref:tabs.insertCSS).
     */
    export function removeCSS(tabId: number, details: chrome.extensionTypes.DeleteInjectionDetails, callback: () => void): void;

    /**
     * Removes from a page CSS that was previously injected by a call to $(ref:tabs.insertCSS).
     */
    export function removeCSS(details: chrome.extensionTypes.DeleteInjectionDetails, callback: () => void): void;

    /**
     * Zooms a specified tab.
     */
    export function setZoom(tabId: number, zoomFactor: number, callback: () => void): void;

    /**
     * Zooms a specified tab.
     */
    export function setZoom(zoomFactor: number, callback: () => void): void;

    /**
     * Gets the current zoom factor of a specified tab.
     */
    export function getZoom(tabId: number, callback: (zoomFactor: number) => void): void;

    /**
     * Gets the current zoom factor of a specified tab.
     */
    export function getZoom(callback: (zoomFactor: number) => void): void;

    /**
     * Sets the zoom settings for a specified tab, which define how zoom changes are handled. These settings are reset to defaults upon navigating the tab.
     */
    export function setZoomSettings(tabId: number, zoomSettings: ZoomSettings, callback: () => void): void;

    /**
     * Sets the zoom settings for a specified tab, which define how zoom changes are handled. These settings are reset to defaults upon navigating the tab.
     */
    export function setZoomSettings(zoomSettings: ZoomSettings, callback: () => void): void;

    /**
     * Gets the current zoom settings of a specified tab.
     */
    export function getZoomSettings(tabId: number, callback: (zoomSettings: ZoomSettings) => void): void;

    /**
     * Gets the current zoom settings of a specified tab.
     */
    export function getZoomSettings(callback: (zoomSettings: ZoomSettings) => void): void;

    /**
     * Discards a tab from memory. Discarded tabs are still visible on the tab strip and are reloaded when activated.
     */
    export function discard(tabId: number, callback: (tab?: Tab) => void): void;

    /**
     * Go foward to the next page, if one is available.
     */
    export function goForward(tabId: number, callback: () => void): void;

    /**
     * Go back to the previous page, if one is available.
     */
    export function goBack(tabId: number, callback: () => void): void;

    /**
     * The tab's loading status.
     */
    export type TabStatus = "unloaded" | "loading" | "complete";

    /**
     * An event that caused a muted state change.
     */
    export type MutedInfoReason = "user" | "capture" | "extension";

    /**
     * The tab's muted state and the reason for the last state change.
     */
    export interface MutedInfo {
      /**
       * Whether the tab is muted (prevented from playing sound). The tab may be muted even if it has not played or is not currently playing sound. Equivalent to whether the 'muted' audio indicator is showing.
       */
      muted: boolean;

      /**
       * The reason the tab was muted or unmuted. Not set if the tab's mute state has never been changed.
       */
      reason?: MutedInfoReason;

      /**
       * The ID of the extension that changed the muted state. Not set if an extension was not the reason the muted state last changed.
       */
      extensionId?: string;

    }

    export interface Tab {
      /**
       * The ID of the tab. Tab IDs are unique within a browser session. Under some circumstances a tab may not be assigned an ID; for example, when querying foreign tabs using the $(ref:sessions) API, in which case a session ID may be present. Tab ID can also be set to <code>chrome.tabs.TAB_ID_NONE</code> for apps and devtools windows.
       */
      id?: number;

      /**
       * The zero-based index of the tab within its window.
       */
      index: number;

      /**
       * The ID of the group that the tab belongs to.
       */
      groupId: number;

      /**
       * The ID of the window that contains the tab.
       */
      windowId: number;

      /**
       * The ID of the tab that opened this tab, if any. This property is only present if the opener tab still exists.
       */
      openerTabId?: number;

      /**
       * Whether the tab is selected.
       */
      selected: boolean;

      /**
       * Whether the tab is highlighted.
       */
      highlighted: boolean;

      /**
       * Whether the tab is active in its window. Does not necessarily mean the window is focused.
       */
      active: boolean;

      /**
       * Whether the tab is pinned.
       */
      pinned: boolean;

      /**
       * Whether the tab has produced sound over the past couple of seconds (but it might not be heard if also muted). Equivalent to whether the 'speaker audio' indicator is showing.
       */
      audible?: boolean;

      /**
       * Whether the tab is discarded. A discarded tab is one whose content has been unloaded from memory, but is still visible in the tab strip. Its content is reloaded the next time it is activated.
       */
      discarded: boolean;

      /**
       * Whether the tab can be discarded automatically by the browser when resources are low.
       */
      autoDiscardable: boolean;

      /**
       * The tab's muted state and the reason for the last state change.
       */
      mutedInfo?: MutedInfo;

      /**
       * The last committed URL of the main frame of the tab. This property is only present if the extension's manifest includes the <code>"tabs"</code> permission and may be an empty string if the tab has not yet committed. See also $(ref:Tab.pendingUrl).
       */
      url?: string;

      /**
       * The URL the tab is navigating to, before it has committed. This property is only present if the extension's manifest includes the <code>"tabs"</code> permission and there is a pending navigation.
       */
      pendingUrl?: string;

      /**
       * The title of the tab. This property is only present if the extension's manifest includes the <code>"tabs"</code> permission.
       */
      title?: string;

      /**
       * The URL of the tab's favicon. This property is only present if the extension's manifest includes the <code>"tabs"</code> permission. It may also be an empty string if the tab is loading.
       */
      favIconUrl?: string;

      /**
       * The tab's loading status.
       */
      status?: TabStatus;

      /**
       * Whether the tab is in an incognito window.
       */
      incognito: boolean;

      /**
       * The width of the tab in pixels.
       */
      width?: number;

      /**
       * The height of the tab in pixels.
       */
      height?: number;

      /**
       * The session ID used to uniquely identify a tab obtained from the $(ref:sessions) API.
       */
      sessionId?: string;

    }

    /**
     * Defines how zoom changes are handled, i.e., which entity is responsible for the actual scaling of the page; defaults to <code>automatic</code>.
     */
    export type ZoomSettingsMode = "automatic" | "manual" | "disabled";

    /**
     * Defines whether zoom changes persist for the page's origin, or only take effect in this tab; defaults to <code>per-origin</code> when in <code>automatic</code> mode, and <code>per-tab</code> otherwise.
     */
    export type ZoomSettingsScope = "per-origin" | "per-tab";

    /**
     * Defines how zoom changes in a tab are handled and at what scope.
     */
    export interface ZoomSettings {
      /**
       * Defines how zoom changes are handled, i.e., which entity is responsible for the actual scaling of the page; defaults to <code>automatic</code>.
       */
      mode?: ZoomSettingsMode;

      /**
       * Defines whether zoom changes persist for the page's origin, or only take effect in this tab; defaults to <code>per-origin</code> when in <code>automatic</code> mode, and <code>per-tab</code> otherwise.
       */
      scope?: ZoomSettingsScope;

      /**
       * Used to return the default zoom level for the current tab in calls to tabs.getZoomSettings.
       */
      defaultZoomFactor?: number;

    }

    /**
     * The type of window.
     */
    export type WindowType = "normal" | "popup" | "panel" | "app" | "devtools";

  }

  export namespace terminalPrivate {
    /**
     * Starts new process.
     */
    export function openTerminalProcess(processName: string, args: string[], callback: (id: string) => void): void;

    /**
     * Starts new process.
     */
    export function openTerminalProcess(processName: string, callback: (id: string) => void): void;

    /**
     * Starts new vmshell process.
     */
    export function openVmshellProcess(args: string[], callback: (id: string) => void): void;

    /**
     * Starts new vmshell process.
     */
    export function openVmshellProcess(callback: (id: string) => void): void;

    /**
     * Closes previously opened process from either openTerminalProcess or openVmshellProcess.
     */
    export function closeTerminalProcess(id: string, callback: (success: boolean) => void): void;

    /**
     * Sends input that will be routed to stdin of the process with the specified id.
     */
    export function sendInput(id: string, input: string, callback: (success: boolean) => void): void;

    /**
     * Notify the process with the id id that terminal window size has changed.
     */
    export function onTerminalResize(id: string, width: number, height: number, callback: (success: boolean) => void): void;

    /**
     * Called from |onProcessOutput| when the event is dispatched to terminal extension. Observing the terminal process output will be paused after |onProcessOutput| is dispatched until this method is called.
     */
    export function ackOutput(tabId: number, id: string): void;

    /**
     * Open the Terminal tabbed window.
     */
    export function openWindow(callback: () => void): void;

    /**
     * Open the Terminal Settings page.
     */
    export function openOptionsPage(callback: () => void): void;

    /**
     * Returns an object (DictionaryValue) containing UI settings such as font style and colors used by terminal and stored as a syncable pref.  The UI currently has ~70 properties and we wish to allow flexibility for these to change in the UI without updating this API, so we allow any properties.
     */
    export function getSettings(callback: (settings: null | {[name: string]: null | any}) => void): void;

    /**
     * Sets terminal UI settings which are stored as a syncable pref.
     */
    export function setSettings(settings: null | {[name: string]: null | any}, callback: () => void): void;

    /**
     * Returns a boolean indicating whether the accessibility spoken feedback is on.
     */
    export function getA11yStatus(callback: (a11yStatus: boolean) => void): void;

    /**
     * Type of the output stream from which output came. When process exits, output type will be set to exit
     */
    export type OutputType = "stdout" | "stderr" | "exit";

  }

  /**
   * Use the <code>chrome.topSites</code> API to access the top sites (i.e. most visited sites) that are displayed on the new tab page. These do not include shortcuts customized by the user.
   */
  export namespace topSites {
    /**
     * Gets a list of top sites.
     */
    export function get(callback: (data: MostVisitedURL[]) => void): void;

    /**
     * An object encapsulating a most visited URL, such as the default shortcuts on the new tab page.
     */
    export interface MostVisitedURL {
      /**
       * The most visited URL.
       */
      url: string;

      /**
       * The title of the page
       */
      title: string;

    }

  }

  /**
   * Use the <code>chrome.tts</code> API to play synthesized text-to-speech (TTS). See also the related <a href='http://developer.chrome.com/extensions/ttsEngine'>ttsEngine</a> API, which allows an extension to implement a speech engine.
   */
  export namespace tts {
    /**
     * Speaks text using a text-to-speech engine.
     */
    export function speak(utterance: string, options: TtsOptions, callback: () => void): void;

    /**
     * Stops any current speech and flushes the queue of any pending utterances. In addition, if speech was paused, it will now be un-paused for the next call to speak.
     */
    export function stop(): void;

    /**
     * Pauses speech synthesis, potentially in the middle of an utterance. A call to resume or stop will un-pause speech.
     */
    export function pause(): void;

    /**
     * If speech was paused, resumes speaking where it left off.
     */
    export function resume(): void;

    /**
     * Checks whether the engine is currently speaking. On Mac OS X, the result is true whenever the system speech engine is speaking, even if the speech wasn't initiated by Chrome.
     */
    export function isSpeaking(callback: (speaking: boolean) => void): void;

    /**
     * Gets an array of all available voices.
     */
    export function getVoices(callback: (voices: TtsVoice[]) => void): void;

    export type EventType = "start" | "end" | "word" | "sentence" | "marker" | "interrupted" | "cancelled" | "error" | "pause" | "resume";

    export type VoiceGender = "male" | "female";

    /**
     * The speech options for the TTS engine.
     */
    export interface TtsOptions {
      /**
       * If true, enqueues this utterance if TTS is already in progress. If false (the default), interrupts any current speech and flushes the speech queue before speaking this new utterance.
       */
      enqueue?: boolean;

      /**
       * The name of the voice to use for synthesis. If empty, uses any available voice.
       */
      voiceName?: string;

      /**
       * The extension ID of the speech engine to use, if known.
       */
      extensionId?: string;

      /**
       * The language to be used for synthesis, in the form <em>language</em>-<em>region</em>. Examples: 'en', 'en-US', 'en-GB', 'zh-CN'.
       */
      lang?: string;

      /**
       * Gender of voice for synthesized speech.
       */
      gender?: VoiceGender;

      /**
       * Speaking rate relative to the default rate for this voice. 1.0 is the default rate, normally around 180 to 220 words per minute. 2.0 is twice as fast, and 0.5 is half as fast. Values below 0.1 or above 10.0 are strictly disallowed, but many voices will constrain the minimum and maximum rates further&mdash;for example a particular voice may not actually speak faster than 3 times normal even if you specify a value larger than 3.0.
       */
      rate?: number;

      /**
       * Speaking pitch between 0 and 2 inclusive, with 0 being lowest and 2 being highest. 1.0 corresponds to a voice's default pitch.
       */
      pitch?: number;

      /**
       * Speaking volume between 0 and 1 inclusive, with 0 being lowest and 1 being highest, with a default of 1.0.
       */
      volume?: number;

      /**
       * The TTS event types the voice must support.
       */
      requiredEventTypes?: string[];

      /**
       * The TTS event types that you are interested in listening to. If missing, all event types may be sent.
       */
      desiredEventTypes?: string[];

      /**
       * This function is called with events that occur in the process of speaking the utterance.
       */
      onEvent?: (event: TtsEvent) => void;

    }

    /**
     * An event from the TTS engine to communicate the status of an utterance.
     */
    export interface TtsEvent {
      /**
       * The type can be <code>start</code> as soon as speech has started, <code>word</code> when a word boundary is reached, <code>sentence</code> when a sentence boundary is reached, <code>marker</code> when an SSML mark element is reached, <code>end</code> when the end of the utterance is reached, <code>interrupted</code> when the utterance is stopped or interrupted before reaching the end, <code>cancelled</code> when it's removed from the queue before ever being synthesized, or <code>error</code> when any other error occurs. When pausing speech, a <code>pause</code> event is fired if a particular utterance is paused in the middle, and <code>resume</code> if an utterance resumes speech. Note that pause and resume events may not fire if speech is paused in-between utterances.
       */
      type: EventType;

      /**
       * The index of the current character in the utterance. For word events, the event fires at the end of one word and before the beginning of the next. The <code>charIndex</code> represents a point in the text at the beginning of the next word to be spoken.
       */
      charIndex?: number;

      /**
       * The error description, if the event type is <code>error</code>.
       */
      errorMessage?: string;

      /**
       * An ID unique to the calling function's context so that events can get routed back to the correct tts.speak call.
       */
      srcId?: number;

      /**
       * True if this is the final event that will be sent to this handler.
       */
      isFinalEvent?: boolean;

      /**
       * The length of the next part of the utterance. For example, in a <code>word</code> event, this is the length of the word which will be spoken next. It will be set to -1 if not set by the speech engine.
       */
      length?: number;

    }

    /**
     * A description of a voice available for speech synthesis.
     */
    export interface TtsVoice {
      /**
       * The name of the voice.
       */
      voiceName?: string;

      /**
       * The language that this voice supports, in the form <em>language</em>-<em>region</em>. Examples: 'en', 'en-US', 'en-GB', 'zh-CN'.
       */
      lang?: string;

      /**
       * This voice's gender.
       */
      gender?: VoiceGender;

      /**
       * If true, the synthesis engine is a remote network resource. It may be higher latency and may incur bandwidth costs.
       */
      remote?: boolean;

      /**
       * The ID of the extension providing this voice.
       */
      extensionId?: string;

      /**
       * All of the callback event types that this voice is capable of sending.
       */
      eventTypes?: EventType[];

    }

  }

  /**
   * Use the <code>chrome.ttsEngine</code> API to implement a text-to-speech(TTS) engine using an extension. If your extension registers using this API, it will receive events containing an utterance to be spoken and other parameters when any extension or Chrome App uses the <a href='tts'>tts</a> API to generate speech. Your extension can then use any available web technology to synthesize and output the speech, and send events back to the calling function to report the status.
   */
  export namespace ttsEngine {
    /**
     * Called by an engine to update its list of voices. This list overrides any voices declared in this extension's manifest.
     */
    export function updateVoices(voices: chrome.tts.TtsVoice[]): void;

    /**
     * Routes a TTS event from a speech engine to a client.
     */
    export function sendTtsEvent(requestId: number, event: chrome.tts.TtsEvent): void;

    export type VoiceGender = "male" | "female";

  }

  /**
   * The <code>chrome.types</code> API contains type declarations for Chrome.
   */
  export namespace types {
    /**
     * The scope of the ChromeSetting. One of<ul><li><var>regular</var>: setting for the regular profile (which is inherited by the incognito profile if not overridden elsewhere),</li><li><var>regular_only</var>: setting for the regular profile only (not inherited by the incognito profile),</li><li><var>incognito_persistent</var>: setting for the incognito profile that survives browser restarts (overrides regular preferences),</li><li><var>incognito_session_only</var>: setting for the incognito profile that can only be set during an incognito session and is deleted when the incognito session ends (overrides regular and incognito_persistent preferences).</li></ul>
     */
    export type ChromeSettingScope = "regular" | "regular_only" | "incognito_persistent" | "incognito_session_only";

    /**
     * One of<ul><li><var>not_controllable</var>: cannot be controlled by any extension</li><li><var>controlled_by_other_extensions</var>: controlled by extensions with higher precedence</li><li><var>controllable_by_this_extension</var>: can be controlled by this extension</li><li><var>controlled_by_this_extension</var>: controlled by this extension</li></ul>
     */
    export type LevelOfControl = "not_controllable" | "controlled_by_other_extensions" | "controllable_by_this_extension" | "controlled_by_this_extension";

    /**
     * An interface that allows access to a Chrome browser setting. See $(ref:accessibilityFeatures) for an example.
     */
    export interface ChromeSetting<T> {
      /**
       * Gets the value of a setting.
       */
      get: (details: {incognito?: boolean}, callback: (details: {value: T, levelOfControl: LevelOfControl, incognitoSpecific?: boolean}) => void) => void;

      /**
       * Sets the value of a setting.
       */
      set: (details: {value: T, scope?: ChromeSettingScope}, callback?: () => void) => void;

      /**
       * Clears the setting, restoring any default value.
       */
      clear: (details: {scope?: ChromeSettingScope}, callback?: () => void) => void;

    }

  }

  /**
   * Use the <code>chrome.wallpaper</code> API to change the ChromeOS wallpaper.
   */
  export namespace wallpaper {
    /**
     * Sets wallpaper to the image at <em>url</em> or <em>wallpaperData</em> with the specified <em>layout</em>
     */
    export function setWallpaper(details: {data?: Blob, url?: string, layout: WallpaperLayout, filename: string, thumbnail?: boolean}, callback: (thumbnail?: Blob) => void): void;

    /**
     * The supported wallpaper layouts.
     */
    export type WallpaperLayout = "STRETCH" | "CENTER" | "CENTER_CROPPED";

  }

  export namespace wallpaperPrivate {
    /**
     * Gets translated strings and initialization data.
     */
    export function getStrings(callback: (result: {[name: string]: any}) => void): void;

    /**
     * Gets the sync themes(and wallpaper on ChromeOS) setting value.
     */
    export function getSyncSetting(callback: (result: {[name: string]: any}) => void): void;

    /**
     * Sets wallpaper if it exists in the local file system with specified layout
     */
    export function setWallpaperIfExists(url: string, layout: chrome.wallpaper.WallpaperLayout, previewMode: boolean, callback: (exists: boolean) => void): void;

    /**
     * Sets wallpaper to the image from url with specified layout
     */
    export function setWallpaper(wallpaper: Blob, layout: chrome.wallpaper.WallpaperLayout, url: string, previewMode: boolean, callback: () => void): void;

    /**
     * Clears current user's active custom wallpaper and changes to default wallpaper.
     */
    export function resetWallpaper(): void;

    /**
     * Sets wallpaper to the image from local file with specified layout and returns thumbnail if needed.
     */
    export function setCustomWallpaper(wallpaper: Blob, layout: chrome.wallpaper.WallpaperLayout, generateThumbnail: boolean, fileName: string, previewMode: boolean, callback: (thumbnail?: Blob) => void): void;

    /**
     * Sets current custom wallpaper to the specified layout
     */
    export function setCustomWallpaperLayout(layout: chrome.wallpaper.WallpaperLayout, callback: () => void): void;

    /**
     * Minimizes all inactive open windows.
     */
    export function minimizeInactiveWindows(): void;

    /**
     * Restores all previously minimized windows.
     */
    export function restoreMinimizedWindows(): void;

    /**
     * Gets thumbnail of wallpaper from thumbnail directory.
     */
    export function getThumbnail(urlOrFile: string, source: WallpaperSource, callback: (data?: Blob) => void): void;

    /**
     * Saves thumbnail to thumbnail directory.
     */
    export function saveThumbnail(url: string, data: Blob, callback: () => void): void;

    /**
     * Get the list of file names of downloaded wallpapers.
     */
    export function getOfflineWallpaperList(callback: (results: string[]) => void): void;

    /**
     * Record wallpaper UMA when a new wallpaper is set, either by Wallpaper Picker App, or by a third party App.
     */
    export function recordWallpaperUMA(source: WallpaperSource): void;

    /**
     * Gets the info of wallpaper collections (ie. categories such as Art, Landscape etc.)
     */
    export function getCollectionsInfo(callback: (collectionsInfo: CollectionInfo[]) => void): void;

    /**
     * Gets wallpaper related info (url, description etc.) for a particular collection (ie. category).
     */
    export function getImagesInfo(collectionId: string, callback: (imagesInfo: ImageInfo[]) => void): void;

    /**
     * Gets the paths of the local image files that can be set as wallpaper.
     */
    export function getLocalImagePaths(callback: (localImagePaths: string[]) => void): void;

    /**
     * Read the image data from the file path.
     */
    export function getLocalImageData(imagePath: string, callback: (imageData: Blob) => void): void;

    /**
     * Confirm the wallpaper being previewed to be set as the actual user wallpaper.
     */
    export function confirmPreviewWallpaper(callback: () => void): void;

    /**
     * Cancel the wallpaper preview and revert to the user wallpaper.
     */
    export function cancelPreviewWallpaper(callback: () => void): void;

    /**
     * Get a thumbnail of the wallpaper currently on display.
     */
    export function getCurrentWallpaperThumbnail(thumbnailWidth: number, thumbnailHeight: number, callback: (thumbnail: Blob) => void): void;

    /**
     * Gets the related info (url, description etc.) of a randomly selected wallpaper.
     */
    export function getSurpriseMeImage(collectionId: string, resumeToken: string, callback: (imageInfo: ImageInfo, nextResumeToken: string) => void): void;

    /**
     * Gets the related info (url, description etc.) of a randomly selected wallpaper.
     */
    export function getSurpriseMeImage(collectionId: string, callback: (imageInfo: ImageInfo, nextResumeToken: string) => void): void;

    export type WallpaperSource = "ONLINE" | "OEM" | "DAILY" | "CUSTOM" | "THIRDPARTY";

    /**
     * The name of a wallpaper collection (ie. a category such as Art, Landscape etc.) and its id.
     */
    export interface CollectionInfo {
      /**
       * The name of the collection used for display.
       */
      collectionName: string;

      /**
       * The id of the collection used as a token to fetch images info.
       */
      collectionId: string;

    }

    /**
     * The info (url, description etc.) specific to each wallpaper image.
     */
    export interface ImageInfo {
      /**
       * The url that points to the image.
       */
      imageUrl: string;

      /**
       * The url of the Learn More link.
       */
      actionUrl: string;

      /**
       * The descriptive text such as the name of the artist.
       */
      displayText: string[];

    }

  }

  /**
   * Use the <code>chrome.webNavigation</code> API to receive notifications about the status of navigation requests in-flight.
   */
  export namespace webNavigation {
    /**
     * Retrieves information about the given frame. A frame refers to an &lt;iframe&gt; or a &lt;frame&gt; of a web page and is identified by a tab ID and a frame ID.
     */
    export function getFrame(details: {tabId: number, processId?: number, frameId: number}, callback: (details?: {errorOccurred: boolean, url: string, parentFrameId: number}) => void): void;

    /**
     * Retrieves information about all frames of a given tab.
     */
    export function getAllFrames(details: {tabId: number}, callback: (details?: {errorOccurred: boolean, processId: number, frameId: number, parentFrameId: number, url: string}[]) => void): void;

    /**
     * Cause of the navigation. The same transition types as defined in the history API are used. These are the same transition types as defined in the <a href="history#transition_types">history API</a> except with <code>"start_page"</code> in place of <code>"auto_toplevel"</code> (for backwards compatibility).
     */
    export type TransitionType = "link" | "typed" | "auto_bookmark" | "auto_subframe" | "manual_subframe" | "generated" | "start_page" | "form_submit" | "reload" | "keyword" | "keyword_generated";

    export type TransitionQualifier = "client_redirect" | "server_redirect" | "forward_back" | "from_address_bar";

  }

  export namespace webstorePrivate {
    /**
     * Installs the extension corresponding to the given id
     */
    export function install(expected_id: string, callback: () => void): void;

    /**
     * Initiates the install process for the given extension.
     */
    export function beginInstallWithManifest3(details: {[name: string]: any, id: string, manifest: string, iconUrl?: string, localizedName?: string, locale?: string, appInstallBubble?: boolean, enableLauncher?: boolean, authuser?: string}, callback: (result: Result) => void): void;

    export function completeInstall(expected_id: string, callback: () => void): void;

    export function enableAppLauncher(callback: () => void): void;

    /**
     * Returns the logged-in sync user login if there is one, or the empty string otherwise.
     */
    export function getBrowserLogin(callback: (info: {login: string}) => void): void;

    /**
     * Returns the previous value set by setStoreLogin, or the empty string if there is none.
     */
    export function getStoreLogin(callback: (login: string) => void): void;

    /**
     * Sets a preference value with the store login.
     */
    export function setStoreLogin(login: string, callback: () => void): void;

    /**
     * Invokes a callback that returns whether WebGL is blacklisted or not.
     */
    export function getWebGLStatus(callback: (webgl_status: WebGlStatus) => void): void;

    /**
     * Returns whether the apps launcher is enabled or not.
     */
    export function getIsLauncherEnabled(callback: (is_enabled: boolean) => void): void;

    /**
     * Returns whether the browser is in incognito mode or not.
     */
    export function isInIncognitoMode(callback: (is_incognito: boolean) => void): void;

    /**
     * Returns whether the ephemeral apps feature is enabled.
     */
    export function getEphemeralAppsEnabled(callback: (is_enabled: boolean) => void): void;

    /**
     * Installs an app ephemerally in Chrome (if not already fully installed) and launches the app. A user gesture is required.
     */
    export function launchEphemeralApp(id: string, callback: (result: Result) => void): void;

    /**
     * Checks if an extension installed on a Supervised User profile is pending custodian approval.
     */
    export function isPendingCustodianApproval(id: string, callback: (is_pending_approval: boolean) => void): void;

    /**
     * Returns a base-64 encoded referrer chain leading to the webstore page. Should only be used for extension anti-abuse purposes.
     */
    export function getReferrerChain(callback: (referrerChain: string) => void): void;

    /**
     * Returns the install status of the extension.
     */
    export function getExtensionStatus(id: string, manifest: string, callback: (status: ExtensionInstallStatus) => void): void;

    /**
     * Returns the install status of the extension.
     */
    export function getExtensionStatus(id: string, callback: (status: ExtensionInstallStatus) => void): void;

    /**
     * Ask Chrome to send the extension request to the Admin Console.
     */
    export function requestExtension(id: string, callback: (status: ExtensionInstallStatus) => void): void;

    /**
     * Whether the API call succeeded, or the reason for failure.
     */
    export type Result = "" | "success" | "user_gesture_required" | "unknown_error" | "feature_disabled" | "unsupported_extension_type" | "missing_dependencies" | "install_error" | "user_cancelled" | "invalid_id" | "blacklisted" | "blocked_by_policy" | "install_in_progress" | "launch_in_progress" | "manifest_error" | "icon_error" | "invalid_icon_url" | "already_installed" | "blocked_for_child_account";

    export type WebGlStatus = "webgl_allowed" | "webgl_blocked";

    export type ExtensionInstallStatus = "can_request" | "request_pending" | "blocked_by_policy" | "installable" | "enabled" | "disabled" | "terminated" | "blacklisted" | "custodian_approval_required" | "force_installed";

  }

  /**
   * Use the <code>webview</code> tag to actively load live content from the web over the network and embed it in your Chrome App. Your app can control the appearance of the <code>webview</code> and interact with the web content, initiate navigations in an embedded web page, react to error events that happen within it, and more (see <a href="#usage">Usage</a>).
   */
  export namespace webviewTag {
    /**
     * Object reference which can be used to post messages into the guest page.
     */
    export type contentWindow = ContentWindow;

    /**
     * Interface which provides access to webRequest events on the guest page.
     */
    export type request = WebRequestEventInterface;

    /**
     * Similar to <a href='contextMenus'>chrome's ContextMenus API</a>, but applies to <code>webview</code> instead of browser. Use the <code>webview.contextMenus</code> API to add items to <code>webview</code>'s context menu. You can choose what types of objects your context menu additions apply to, such as images, hyperlinks, and pages.
     */
    export type contextMenus = ContextMenus;

    /**
     * Queries audio state.
     */
    export function getAudioState(callback: (audible: boolean) => void): void;

    /**
     * Sets audio mute state of the webview.
     */
    export function setAudioMuted(mute: boolean): void;

    /**
     * Queries whether audio is muted.
     */
    export function isAudioMuted(callback: (muted: boolean) => void): void;

    /**
     * Captures the visible region of the webview.
     */
    export function captureVisibleRegion(options: chrome.extensionTypes.ImageDetails, callback: (dataUrl: string) => void): void;

    /**
     * Captures the visible region of the webview.
     */
    export function captureVisibleRegion(callback: (dataUrl: string) => void): void;

    /**
     * <p>Adds content script injection rules to the <code>webview</code>. When the <code>webview</code> navigates to a page matching one or more rules, the associated scripts will be injected. You can programmatically add rules or update existing rules.</p><p>The following example adds two rules to the <code>webview</code>: 'myRule' and 'anotherRule'.</p><pre>webview.addContentScripts([
  {
    name: 'myRule',
    matches: ['http://www.foo.com/*'],
    css: { files: ['mystyles.css'] },
    js: { files: ['jquery.js', 'myscript.js'] },
    run_at: 'document_start'
  },
  {
    name: 'anotherRule',
    matches: ['http://www.bar.com/*'],
    js: { code: "document.body.style.backgroundColor = 'red';" },
    run_at: 'document_end'
  }]);
 ...

// Navigates webview.
webview.src = 'http://www.foo.com';</pre><p>You can defer addContentScripts call until you needs to inject scripts.</p><p>The following example shows how to overwrite an existing rule.</p><pre>webview.addContentScripts([{
    name: 'rule',
    matches: ['http://www.foo.com/*'],
    js: { files: ['scriptA.js'] },
    run_at: 'document_start'}]);

// Do something.
webview.src = 'http://www.foo.com/*';
 ...
// Overwrite 'rule' defined before.
webview.addContentScripts([{
    name: 'rule',
    matches: ['http://www.bar.com/*'],
    js: { files: ['scriptB.js'] },
    run_at: 'document_end'}]);</pre><p>If <code>webview</code> has been naviagted to the origin (e.g., foo.com) and calls <code>webview.addContentScripts</code> to add 'myRule', you need to wait for next navigation to make the scripts injected. If you want immediate injection, <code>executeScript</code> will do the right thing.</p><p>Rules are preserved even if the guest process crashes or is killed or even if the <code>webview</code> is reparented.</p><p>Refer to the <a href='/extensions/content_scripts'>content scripts</a> documentation for more details.</p>
     */
    export function addContentScripts(contentScriptList: ({0: ContentScriptDetails} & ContentScriptDetails[])): void;

    /**
     * Navigates backward one history entry if possible. Equivalent to <code>go(-1)</code>.
     */
    export function back(callback: (success: boolean) => void): void;

    /**
     * Indicates whether or not it is possible to navigate backward through history. The state of this function is cached, and updated before each <code>loadcommit</code>, so the best place to call it is on <code>loadcommit</code>.
     */
    export function canGoBack(): boolean;

    /**
     * Indicates whether or not it is possible to navigate forward through history. The state of this function is cached, and updated before each <code>loadcommit</code>, so the best place to call it is on <code>loadcommit</code>.
     */
    export function canGoForward(): boolean;

    /**
     * <p>Clears browsing data for the <code>webview</code> partition.</p>
     */
    export function clearData(options: ClearDataOptions, types: ClearDataTypeSet, callback: () => void): void;

    /**
     * <p>Injects JavaScript code into the guest page.</p><p>The following sample code uses script injection to set the guest page's background color to red:</p><pre>webview.executeScript({ code: "document.body.style.backgroundColor = 'red'" });</pre>
     */
    export function executeScript(details: InjectDetails, callback: (result?: any[]) => void): void;

    /**
     * Initiates a find-in-page request.
     */
    export function find(searchText: string, options: FindOptions, callback: (results?: FindCallbackResults) => void): void;

    /**
     * Navigates forward one history entry if possible. Equivalent to <code>go(1)</code>.
     */
    export function forward(callback: (success: boolean) => void): void;

    /**
     * Returns Chrome's internal process ID for the guest web page's current process, allowing embedders to know how many guests would be affected by terminating the process. Two guests will share a process only if they belong to the same app and have the same <a href="#partition">storage partition ID</a>. The call is synchronous and returns the embedder's cached notion of the current process ID. The process ID isn't the same as the operating system's process ID.
     */
    export function getProcessId(): number;

    /**
     * Returns the user agent string used by the <code>webview</code> for guest page requests.
     */
    export function getUserAgent(): string;

    /**
     * Gets the current zoom factor.
     */
    export function getZoom(callback: (zoomFactor: number) => void): void;

    /**
     * Gets the current zoom mode.
     */
    export function getZoomMode(callback: (ZoomMode: ZoomMode) => void): void;

    /**
     * Navigates to a history entry using a history index relative to the current navigation. If the requested navigation is impossible, this method has no effect.
     */
    export function go(relativeIndex: number, callback: (success: boolean) => void): void;

    /**
     * Injects CSS into the guest page.
     */
    export function insertCSS(details: InjectDetails, callback: () => void): void;

    /**
     * Indicates whether or not the <code>webview</code>'s user agent string has been overridden by $(ref:webviewTag.setUserAgentOverride).
     */
    export function isUserAgentOverridden(): void;

    /**
     * Prints the contents of the <code>webview</code>. This is equivalent to calling scripted print function from the <code>webview</code> itself.
     */
    export function print(): void;

    /**
     * Reloads the current top-level page.
     */
    export function reload(): void;

    /**
     * <p>Removes content scripts from a <code>webview</code>.</p><p>The following example removes "myRule" which was added before.</p><pre>webview.removeContentScripts(['myRule']);</pre><p>You can remove all the rules by calling:</p><pre>webview.removeContentScripts();</pre>
     */
    export function removeContentScripts(scriptNameList: string[]): void;

    /**
     * Override the user agent string used by the <code>webview</code> for guest page requests.
     */
    export function setUserAgentOverride(userAgent: string): void;

    /**
     * Changes the zoom factor of the page. The scope and persistence of this change are determined by the webview's current zoom mode (see $(ref:webviewTag.ZoomMode)).
     */
    export function setZoom(zoomFactor: number, callback: () => void): void;

    /**
     * Sets the zoom mode of the <code>webview</code>.
     */
    export function setZoomMode(ZoomMode: ZoomMode, callback: () => void): void;

    /**
     * Stops loading the current <code>webview</code> navigation if in progress.
     */
    export function stop(): void;

    /**
     * Ends the current find session (clearing all highlighting) and cancels all find requests in progress.
     */
    export function stopFinding(action: "clear" | "keep" | "activate"): void;

    /**
     * Loads a data URL with a specified base URL used for relative links. Optionally, a virtual URL can be provided to be shown to the user instead of the data URL.
     */
    export function loadDataWithBaseUrl(dataUrl: string, baseUrl: string, virtualUrl: string): void;

    /**
     * Sets spatial navigation state of the webview.
     */
    export function setSpatialNavigationEnabled(enabled: boolean): void;

    /**
     * Queries whether spatial navigation is enabled for the webview.
     */
    export function isSpatialNavigationEnabled(callback: (enabled: boolean) => void): void;

    /**
     * Forcibly kills the guest web page's renderer process. This may affect multiple <code>webview</code> tags in the current app if they share the same process, but it will not affect <code>webview</code> tags in other apps.
     */
    export function terminate(): void;

    /**
     * Options that determine what data should be cleared by <code>clearData</code>.
     */
    export interface ClearDataOptions {
      /**
       * Clear data accumulated on or after this date, represented in milliseconds since the epoch (accessible via the getTime method of the JavaScript <code>Date</code> object). If absent, defaults to <code>0</code> (which would remove all browsing data).
       */
      since?: number;

    }

    /**
     * A set of data types. Missing properties are interpreted as <code>false</code>.
     */
    export interface ClearDataTypeSet {
      /**
       * Websites' appcaches.
       */
      appcache?: boolean;

      /**
       * Since Chrome 43.<br>The browser's cache. Note: when removing data, this clears the entire cache; it is not limited to the range you specify.
       */
      cache?: boolean;

      /**
       * The partition's cookies.
       */
      cookies?: boolean;

      /**
       * The partition's session cookies.
       */
      sessionCookies?: boolean;

      /**
       * The partition's persistent cookies.
       */
      persistentCookies?: boolean;

      /**
       * Websites' filesystems.
       */
      fileSystems?: boolean;

      /**
       * Websites' IndexedDB data.
       */
      indexedDB?: boolean;

      /**
       * Websites' local storage data.
       */
      localStorage?: boolean;

      /**
       * Websites' WebSQL data.
       */
      webSQL?: boolean;

    }

    /**
     * The different contexts a menu can appear in. Specifying 'all' is equivalent to the combination of all other contexts.
     */
    export type ContextType = "all" | "page" | "frame" | "selection" | "link" | "editable" | "image" | "video" | "audio";

    /**
     * Details of the script or CSS to inject. Either the code or the file property must be set, but both may not be set at the same time.
     */
    export interface InjectDetails {
      /**
       * JavaScript or CSS code to inject.<br><br><b>Warning:</b><br>Be careful using the <code>code</code> parameter. Incorrect use of it may open your app to <a href="https://en.wikipedia.org/wiki/Cross-site_scripting">cross site scripting</a> attacks.
       */
      code?: string;

      /**
       * JavaScript or CSS file to inject.
       */
      file?: string;

    }

    /**
     * The type of injection item: code or a set of files.
     */
    export interface InjectionItems {
      /**
       * JavaScript code or CSS to be injected into matching pages.
       */
      code?: string;

      /**
       * The list of JavaScript or CSS files to be injected into matching pages. These are injected in the order they appear in this array.
       */
      files?: string[];

    }

    /**
     * Details of the content script to inject. Refer to the <a href='/extensions/content_scripts'>content scripts</a> documentation for more details.
     */
    export interface ContentScriptDetails {
      /**
       * The name of the content script to inject.
       */
      name: string;

      /**
       * Specifies which pages this content script will be injected into.
       */
      matches: string[];

      /**
       * Excludes pages that this content script would otherwise be injected into.
       */
      exclude_matches?: string[];

      /**
       * Whether to insert the content script on about:blank and about:srcdoc. Content scripts will only be injected on pages when their inherit URL is matched by one of the declared patterns in the matches field. The inherit URL is the URL of the document that created the frame or window. Content scripts cannot be inserted in sandboxed frames.
       */
      match_about_blank?: boolean;

      /**
       * The CSS code or a list of CSS files to be injected into matching pages. These are injected in the order they appear, before any DOM is constructed or displayed for the page.
       */
      css?: InjectionItems;

      /**
       * The JavaScript code or a list of JavaScript files to be injected into matching pages. These are injected in the order they appear.
       */
      js?: InjectionItems;

      /**
       * The soonest that the JavaScript or CSS will be injected into the tab. Defaults to "document_idle".
       */
      run_at?: chrome.extensionTypes.RunAt;

      /**
       * If <code>all_frames</code> is <code>true</code>, this implies that the JavaScript or CSS should be injected into all frames of current page. By default, <code>all_frames</code> is <code>false</code> and the JavaScript or CSS is only injected into the top frame.
       */
      all_frames?: boolean;

      /**
       * Applied after matches to include only those URLs that also match this glob. Intended to emulate the @include Greasemonkey keyword.
       */
      include_globs?: string[];

      /**
       * Applied after matches to exclude URLs that match this glob. Intended to emulate the @exclude Greasemonkey keyword.
       */
      exclude_globs?: string[];

    }

    export interface ContextMenuCreateProperties {
      /**
       * The type of menu item. Defaults to 'normal' if not specified.
       */
      type?: chrome.contextMenus.ItemType;

      /**
       * The unique ID to assign to this item. Mandatory for event pages. Cannot be the same as another ID for this extension.
       */
      id?: string;

      /**
       * The text to be displayed in the item; this is <em>required</em> unless <code>type</code> is 'separator'. When the context is 'selection', you can use <code>%s</code> within the string to show the selected text. For example, if this parameter's value is "Translate '%s' to Pig Latin" and the user selects the word "cool", the context menu item for the selection is "Translate 'cool' to Pig Latin".
       */
      title?: string;

      /**
       * The initial state of a checkbox or radio item: true for selected and false for unselected. Only one radio item can be selected at a time in a given group of radio items.
       */
      checked?: boolean;

      /**
       * List of contexts this menu item will appear in. Defaults to ['page'] if not specified.
       */
      contexts?: ({0: ContextType} & ContextType[]);

      /**
       * A function that will be called back when the menu item is clicked.
       */
      onclick?: (info: chrome.contextMenus.OnClickData) => void;

      /**
       * The ID of a parent menu item; this makes the item a child of a previously added item.
       */
      parentId?: number | string;

      /**
       * Lets you restrict the item to apply only to documents whose URL matches one of the given patterns. (This applies to frames as well.) For details on the format of a pattern, see <a href='match_patterns'>Match Patterns</a>.
       */
      documentUrlPatterns?: string[];

      /**
       * Similar to documentUrlPatterns, but lets you filter based on the <code>src</code> attribute of img/audio/video tags and the <code>href</code> of anchor tags.
       */
      targetUrlPatterns?: string[];

      /**
       * Whether this context menu item is enabled or disabled. Defaults to <code>true</code>.
       */
      enabled?: boolean;

    }

    export interface ContextMenuUpdateProperties {
      /**
       * The type of menu item.
       */
      type?: chrome.contextMenus.ItemType;

      /**
       * The text to be displayed in the item
       */
      title?: string;

      /**
       * The state of a checkbox or radio item: true for selected and false for unselected. Only one radio item can be selected at a time in a given group of radio items.
       */
      checked?: boolean;

      /**
       * List of contexts this menu item will appear in.
       */
      contexts?: ({0: ContextType} & ContextType[]);

      /**
       * A function that will be called back when the menu item is clicked.
       */
      onclick?: (info: chrome.contextMenus.OnClickData) => void;

      /**
       * The ID of a parent menu item; this makes the item a child of a previously added item. <em>Note:</em> You cannot change an item to be a child of one of its own descendants.
       */
      parentId?: number | string;

      /**
       * Lets you restrict the item to apply only to documents whose URL matches one of the given patterns. (This applies to frames as well.) For details on the format of a pattern, see <a href='match_patterns'>Match Patterns</a>.
       */
      documentUrlPatterns?: string[];

      /**
       * Similar to documentUrlPatterns, but lets you filter based on the <code>src</code> attribute of img/audio/video tags and the <code>href</code> of anchor tags.
       */
      targetUrlPatterns?: string[];

      /**
       * Whether this context menu item is enabled or disabled.
       */
      enabled?: boolean;

    }

    export interface ContextMenus {
      /**
       * Creates a new context menu item. Note that if an error occurs during creation, you may not find out until the creation callback fires (the details will be in $(ref:runtime.lastError)).
       */
      create: (createProperties: {}, callback?: () => void) => number | string;

      /**
       * Updates a previously created context menu item.
       */
      update: (id: number | string, updateProperties: {}, callback?: () => void) => void;

      /**
       * Removes a context menu item.
       */
      remove: (menuItemId: number | string, callback?: () => void) => void;

      /**
       * Removes all context menu items added to this <code>webview</code>.
       */
      removeAll: (callback?: () => void) => void;

    }

    /**
     * Messaging handle to a guest window.
     */
    export interface ContentWindow {
      /**
       * <p>Posts a message to the embedded web content as long as the embedded content is displaying a page from the target origin. This method is available once the page has completed loading. Listen for the <a href="#event-contentload">contentload</a> event and then call the method.</p><p>The guest will be able to send replies to the embedder by posting message to <code>event.source</code> on the message event it receives.</p><p>This API is identical to the <a href="https://developer.mozilla.org/en-US/docs/DOM/window.postMessage">HTML5 postMessage API</a> for communication between web pages. The embedder may listen for replies by adding a <code>message</code> event listener to its own frame.</p>
       */
      postMessage: (message: any, targetOrigin: string) => void;

    }

    /**
     * Interface attached to <code>dialog</code> DOM events.
     */
    export interface DialogController {
      /**
       * Accept the dialog. Equivalent to clicking OK in an <code>alert</code>, <code>confirm</code>, or <code>prompt</code> dialog.
       */
      ok: (response?: string) => void;

      /**
       * Reject the dialog. Equivalent to clicking Cancel in a <code>confirm</code> or <code>prompt</code> dialog.
       */
      cancel: () => void;

    }

    /**
     * Contains all of the results of the find request.
     */
    export interface FindCallbackResults {
      /**
       * The number of times <code>searchText</code> was matched on the page.
       */
      numberOfMatches: number;

      /**
       * The ordinal number of the current match.
       */
      activeMatchOrdinal: number;

      /**
       * Describes a rectangle around the active match in screen coordinates.
       */
      selectionRect: SelectionRect;

      /**
       * Indicates whether this find request was canceled.
       */
      canceled: boolean;

    }

    /**
     * Options for the find request.
     */
    export interface FindOptions {
      /**
       * Flag to find matches in reverse order. The default value is <code>false</code>.
       */
      backward?: boolean;

      /**
       * Flag to match with case-sensitivity. The default value is <code>false</code>.
       */
      matchCase?: boolean;

    }

    /**
     * Interface attached to <code>newwindow</code> DOM events.
     */
    export interface NewWindow {
      /**
       * Attach the requested target page to an existing <code>webview</code> element.
       */
      attach: (webview: {}) => void;

      /**
       * Cancel the new window request.
       */
      discard: () => void;

    }

    /**
     * The type of <code>request</code> object which accompanies a <code>media</code> <a href="#event-permissionrequest">permissionrequest</a></code> DOM event.
     */
    export interface MediaPermissionRequest {
      /**
       * The URL of the frame requesting access to user media.
       */
      url: string;

      /**
       * Allow the permission request.
       */
      allow: () => void;

      /**
       * Deny the permission request. This is the default behavior if <code>allow</code> is not called.
       */
      deny: () => void;

    }

    /**
     * The type of <code>request</code> object which accompanies a <code>geolocation</code> <a href="#event-permissionrequest">permissionrequest</a></code> DOM event.
     */
    export interface GeolocationPermissionRequest {
      /**
       * The URL of the frame requesting access to geolocation data.
       */
      url: string;

      /**
       * Allow the permission request.
       */
      allow: () => void;

      /**
       * Deny the permission request. This is the default behavior if <code>allow</code> is not called.
       */
      deny: () => void;

    }

    /**
     * The type of <code>request</code> object which accompanies a <code>pointerLock</code> <a href="#event-permissionrequest">permissionrequest</a></code> DOM event.
     */
    export interface PointerLockPermissionRequest {
      /**
       * Whether or not pointer lock was requested as a result of a user input gesture.
       */
      userGesture: boolean;

      /**
       * Whether or not the requesting frame was the most recent client to hold pointer lock.
       */
      lastUnlockedBySelf: boolean;

      /**
       * The URL of the frame requesting pointer lock.
       */
      url: string;

      /**
       * Allow the permission request.
       */
      allow: () => void;

      /**
       * Deny the permission request. This is the default behavior if <code>allow</code> is not called.
       */
      deny: () => void;

    }

    /**
     * The type of <code>request</code> object which accompanies a <code>download</code> <a href="#event-permissionrequest">permissionrequest</a></code> DOM event.
     */
    export interface DownloadPermissionRequest {
      /**
       * The HTTP request type (e.g. <code>GET</code>) associated with the download request.
       */
      requestMethod: string;

      /**
       * The requested download URL.
       */
      url: string;

      /**
       * Allow the permission request.
       */
      allow: () => void;

      /**
       * Deny the permission request. This is the default behavior if <code>allow</code> is not called.
       */
      deny: () => void;

    }

    /**
     * The type of <code>request</code> object which accompanies a <code>filesystem</code> <a href="#event-permissionrequest">permissionrequest</a></code> DOM event.
     */
    export interface FileSystemPermissionRequest {
      /**
       * The URL of the frame requesting access to local file system.
       */
      url: string;

      /**
       * Allow the permission request.
       */
      allow: () => void;

      /**
       * Deny the permission request.
       */
      deny: () => void;

    }

    /**
     * The type of <code>request</code> object which accompanies a <code>fullscreen</code> <a href="#event-permissionrequest">permissionrequest</a> DOM event.<p>
     */
    export interface FullscreenPermissionRequest {
      /**
       * The origin of the frame inside the <code>webview</code> that initiated the fullscreen request.
       */
      origin: string;

      /**
       * Allow the permission request.
       */
      allow: () => void;

      /**
       * Deny the permission request.
       */
      deny: () => void;

    }

    /**
     * The type of <code>request</code> object which accompanies a <code>loadplugin</code> <a href="#event-permissionrequest">permissionrequest</a> DOM event.<p>
     */
    export interface LoadPluginPermissionRequest {
      /**
       * The plugin's identifier string.
       */
      identifier: string;

      /**
       * The plugin's display name.
       */
      name: string;

      /**
       * Allow the permission request. This is the default behavior if <code>deny</code> is not called..
       */
      allow: () => void;

      /**
       * Deny the permission request.
       */
      deny: () => void;

    }

    /**
     * <p>Describes a rectangle in screen coordinates.</p><p>The containment semantics are array-like; that is, the coordinate <code>(left, top)</code> is considered to be contained by the rectangle, but the coordinate <code>(left + width, top)</code> is not.</p>
     */
    export interface SelectionRect {
      /**
       * Distance from the left edge of the screen to the left edge of the rectangle.
       */
      left: number;

      /**
       * Distance from the top edge of the screen to the top edge of the rectangle.
       */
      top: number;

      /**
       * Width of the rectangle.
       */
      width: number;

      /**
       * Height of the rectangle.
       */
      height: number;

    }

    /**
     * Interface which provides access to webRequest events on the guest page. See the <a href="http://developer.chrome.com/extensions/webRequest">chrome.webRequest</a> extensions API for details on webRequest life cycle and related concepts. Note: The <a href="/extensions/webRequest#event-onActionIgnored">chrome.webRequest.onActionIgnored</a> event is not supported for webviews. <p>To illustrate how usage differs from the extensions webRequest API, consider the following example code which blocks any guest requests for URLs which match <code>*://www.evil.com/*</code>:</p><pre>webview.request.onBeforeRequest.addListener(
  function(details) { return {cancel: true}; },
  {urls: ["*://www.evil.com/*"]},
  ["blocking"]);</pre><p>Additionally, this interface supports declarative webRequest rules through <code>onRequest</code> and <code>onMessage</code> events. See <a href="http://developer.chrome.com/extensions/declarativeWebRequest.html">declarativeWebRequest</a> for API details.</p>Note that conditions and actions for declarative webview webRequests should be instantiated from their <code>chrome.webViewRequest.*</code> counterparts. The following example code declaratively blocks all requests to <code>"example.com"</code> on the webview <code>myWebview</code>:</p><pre>var rule = {
  conditions: [
    new chrome.webViewRequest.RequestMatcher({ url: { hostSuffix: 'example.com' } })
  ],
  actions: [ new chrome.webViewRequest.CancelRequest() ]
};
myWebview.request.onRequest.addRules([rule]);</pre>
     */
    export interface WebRequestEventInterface {
    }

    /**
     * Defines the how zooming is handled in the <code>webview</code>.
     */
    export type ZoomMode = "per-origin" | "per-view" | "disabled";

  }

  /**
   * Use the <code>chrome.windows</code> API to interact with browser windows. You can use this API to create, modify, and rearrange windows in the browser.
   */
  export namespace windows {
    /**
     * The windowId value that represents the absence of a chrome browser window.
     */
    export var WINDOW_ID_NONE: number;

    /**
     * The windowId value that represents the <a href='windows#current-window'>current window</a>.
     */
    export var WINDOW_ID_CURRENT: number;

    /**
     * Gets details about a window.
     */
    export function get(windowId: number, queryOptions: QueryOptions, callback: (window: Window) => void): void;

    /**
     * Gets details about a window.
     */
    export function get(windowId: number, callback: (window: Window) => void): void;

    /**
     * Gets the <a href='#current-window'>current window</a>.
     */
    export function getCurrent(queryOptions: QueryOptions, callback: (window: Window) => void): void;

    /**
     * Gets the <a href='#current-window'>current window</a>.
     */
    export function getCurrent(callback: (window: Window) => void): void;

    /**
     * Gets the window that was most recently focused &mdash; typically the window 'on top'.
     */
    export function getLastFocused(queryOptions: QueryOptions, callback: (window: Window) => void): void;

    /**
     * Gets the window that was most recently focused &mdash; typically the window 'on top'.
     */
    export function getLastFocused(callback: (window: Window) => void): void;

    /**
     * Gets all windows.
     */
    export function getAll(queryOptions: QueryOptions, callback: (windows: Window[]) => void): void;

    /**
     * Gets all windows.
     */
    export function getAll(callback: (windows: Window[]) => void): void;

    /**
     * Creates (opens) a new browser window with any optional sizing, position, or default URL provided.
     */
    export function create(createData: {url?: string | string[], tabId?: number, left?: number, top?: number, width?: number, height?: number, focused?: boolean, incognito?: boolean, type?: CreateType, state?: WindowState, setSelfAsOpener?: boolean}, callback: (window?: Window) => void): void;

    /**
     * Updates the properties of a window. Specify only the properties that to be changed; unspecified properties are unchanged.
     */
    export function update(windowId: number, updateInfo: {left?: number, top?: number, width?: number, height?: number, focused?: boolean, drawAttention?: boolean, state?: WindowState}, callback: (window: Window) => void): void;

    /**
     * Removes (closes) a window and all the tabs inside it.
     */
    export function remove(windowId: number, callback: () => void): void;

    /**
     * The type of browser window this is. In some circumstances a window may not be assigned a <code>type</code> property; for example, when querying closed windows from the $(ref:sessions) API.
     */
    export type WindowType = "normal" | "popup" | "panel" | "app" | "devtools";

    /**
     * The state of this browser window. In some circumstances a window may not be assigned a <code>state</code> property; for example, when querying closed windows from the $(ref:sessions) API.
     */
    export type WindowState = "normal" | "minimized" | "maximized" | "fullscreen" | "locked-fullscreen";

    export interface Window {
      /**
       * The ID of the window. Window IDs are unique within a browser session. In some circumstances a window may not be assigned an <code>ID</code> property; for example, when querying windows using the $(ref:sessions) API, in which case a session ID may be present.
       */
      id?: number;

      /**
       * Whether the window is currently the focused window.
       */
      focused: boolean;

      /**
       * The offset of the window from the top edge of the screen in pixels. In some circumstances a window may not be assigned a <code>top</code> property; for example, when querying closed windows from the $(ref:sessions) API.
       */
      top?: number;

      /**
       * The offset of the window from the left edge of the screen in pixels. In some circumstances a window may not be assigned a <code>left</code> property; for example, when querying closed windows from the $(ref:sessions) API.
       */
      left?: number;

      /**
       * The width of the window, including the frame, in pixels. In some circumstances a window may not be assigned a <code>width</code> property; for example, when querying closed windows from the $(ref:sessions) API.
       */
      width?: number;

      /**
       * The height of the window, including the frame, in pixels. In some circumstances a window may not be assigned a <code>height</code> property; for example, when querying closed windows from the $(ref:sessions) API.
       */
      height?: number;

      /**
       * Array of $(ref:tabs.Tab) objects representing the current tabs in the window.
       */
      tabs?: chrome.tabs.Tab[];

      /**
       * Whether the window is incognito.
       */
      incognito: boolean;

      /**
       * The type of browser window this is.
       */
      type?: WindowType;

      /**
       * The state of this browser window.
       */
      state?: WindowState;

      /**
       * Whether the window is set to be always on top.
       */
      alwaysOnTop: boolean;

      /**
       * The session ID used to uniquely identify a window, obtained from the $(ref:sessions) API.
       */
      sessionId?: string;

    }

    /**
     * Specifies what type of browser window to create. 'panel' is deprecated and is available only to existing whitelisted extensions on Chrome OS.
     */
    export type CreateType = "normal" | "popup" | "panel";

    export interface QueryOptions {
      /**
       * If true, the $(ref:windows.Window) object has a <var>tabs</var> property that contains a list of the $(ref:tabs.Tab) objects. The <code>Tab</code> objects only contain the <code>url</code>, <code>pendingUrl</code>, <code>title</code>, and <code>favIconUrl</code> properties if the extension's manifest file includes the <code>"tabs"</code> permission.
       */
      populate?: boolean;

      /**
       * If set, the $(ref:windows.Window) returned is filtered based on its type. If unset, the default filter is set to <code>['normal', 'popup']</code>.
       */
      windowTypes?: WindowType[];

    }

  }

}

