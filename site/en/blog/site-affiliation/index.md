---
layout: "layouts/blog-post.njk"
title: "Enable Chrome to share login credentials across affiliated sites"
subhead: >
  If you employ multiple domains that share the same account
  management backend, you can now also associate them with one another to
  enable users to save credentials once and have the Chrome password manager
  suggest them to any of the affiliated websites.
description: >
  If you employ multiple domains that share the same account
  management backend, with Digital Asset Links you can now also associate
  them with one another to enable users to save credentials once and have
  the Chrome password manager suggest them to any of the affiliated websites.
authors:
  - mihajlija
date: 2021-04-22
hero: "image/vgdbNJBYHma2o62ZqYmcnkq3j0o1/c5KORd65eNdEeszLJWk1.jpeg"
alt: "A bunch of passwords."
tags:
  - security
---

Chrome's password manager already autofills credentials for sites with saved
credentials, as well as in the following two cases:

1.  When two sites are in the
    [same-site](https://web.dev/same-site-same-origin/) relationship, Chrome
    will show autofill credentials for the other site if there's at least one
    credential saved on one site. For example, because `www.example.com` and
    `m.example.com` are the same-site, Chrome can share saved credentials
    between the two sites and suggest the saved password to another.
1.  When a developer associates an Android app with a site that uses the
    same credentials, Chrome can suggest Android credentials on that site. Apps
    are associated with sites using
    [Digital Asset Links (DALs)](https://developers.google.com/digital-asset-links/v1/getting-started).

You can now also associate websites in a cross-site relationship to enable users
to save their credentials once and have the password manager suggest them to any
of the affiliated websites.

If you employ multiple domains that share the same account management backend
(such as `https://www.example.com` and `https://www.example.co.uk)`, starting in
version 91, you can enable Chrome to suggest passwords saved to domains
associated with Digital Asset Links.

{% Aside %}
There's a similar potential web platform feature called [First-Party
Sets](https://github.com/privacycg/first-party-sets). However, while it allows
for  embeds from cross-site to be treated as the same party when the top-level
domain is owned by the same organization, there's no plan to have any effect on
handling passwords. The Digital Asset Links is Google's technology that can be
used for passwords, but it has no effect on handling cookies.
{% endAside %}

To make a DAL association, developers need to put a JSON file that follows
[the DAL syntax](https://developers.google.com/digital-asset-links/v1/statements)
at `/.well-known/assetlinks.json` on the respective domains.


## Prerequisites

1.  Use Chrome 91 or later.
1.  Enable the flag at `chrome://flags#filling-across-affiliated-websites`.
1.  Make sure "Offer to save passwords" is turned on in
    `chrome://settings/passwords`.
1.  Make sure your website's sign-in domain is available through HTTPS.

## Associate your two websites

1.  To declare that the website, for example
    `https://www.example.com,`can share credentials with
    `https://www.example.co.uk`, create a file named `assetlinks.json` with the
    following content:
    
    <br>
    
    ```json
    [{
      "relation": ["delegate_permission/common.get_login_creds"],
      "target": {
        "namespace": "web",
        "site": "https://www.example.com"
      }
     },
    {
      "relation": ["delegate_permission/common.get_login_creds"],
      "target": {
        "namespace": "web",
        "site": "https://www.example.co.uk"
      }
     }]
     ```
    
    <br>
    
    The `relation` field is an array of one or more strings that describe the
    relationship between the sites. For sites to share sign-in credentials,
    specify the string `delegate_permission/common.get_login_creds`.  
    The `target` field is an object that specifies the asset the declaration
    applies to. The following fields identify a website:
    
    <br>
    
    <table>
      <tr>
        <td><code>namespace</code></td>
        <td>Must be <code>web</code> for websites.</td>
      </tr>
      <tr>
        <td><code>site</code></td>
        <td>The website's URL, in the format
        <code>https://<strong>domain</strong>[:<strong>optional_port</strong>]</code>;
        for example, <code>https://www.example.com</code>.</td>
      </tr>
    </table>

    See the
    [Digital Asset Links reference](https://developers.google.com/digital-asset-links/v1/statements)
    for details.

1.  Host the Digital Asset Links JSON file at the following location on
    the sign-in domain: `https://domain[:optional_port]/.well-known/assetlinks.json`.

    <br>

    In this example, the domain is `www.example.com`, so the JSON file should
    be hosted at `https://www.example.com/.well-known/assetlinks.json`.   

    <br>

    The MIME type for the Digital Asset Links file needs to be JSON. Make sure
    the server sends a `Content-Type: application/json` header in the response.

1.  To declare the association in both websites, host the
    `assetlinks.json `at `https://www.example.co.uk/.well-known/assetlinks.json`
    as well:

    <br>

    ```json
    [{
      "relation": ["delegate_permission/common.get_login_creds"],
      "target": {
        "namespace": "web",
        "site": "https://www.example.com"
      }
     },
    {
      "relation": ["delegate_permission/common.get_login_creds"],
      "target": {
        "namespace": "web",
        "site": "https://www.example.co.uk"
      }
     }]
     ```

1.  Ensure that your host permits Google to retrieve your Digital Asset
    Links file. If you have a `robots.txt` file, it must allow the Googlebot
    agent to retrieve `/.well-known/assetlinks.json`. Most sites can simply
    allow any automated agent to retrieve files in the `/.well-known/` path so
    that other services can access the metadata in those files:

    <br>

    ```text
    User-agent: *
    Allow: /.well-known/
    ```

{% Aside %}
Be aware that once you set up a DAL file, it may take a while for Googlebot to fetch the
resource and recognize the association.
{% endAside %}

## Associate multiple websites with one another

You can associate multiple websites with one another by specifying each one in
the Digital Asset Links file. For example, to associate the `example.com`,
`example.co.uk, `and` example.co.jp`, specify all of those websites in the
`assetlinks.json` JSON file and host it on each website at
`https://EXAMPLE_DOMAIN_NAME/.well-known/assetlinks.json`.

```json
[{  
     "relation":[  
        "delegate_permission/common.get_login_creds"  
     ],  
     "target":{  
        "site":"https://www.example.com",  
        "namespace":"web"  
     }  
  },  
  {  
     "relation":[  
        "delegate_permission/common.get_login_creds"  
     ],  
     "target":{  
        "site":"https://www.example.co.uk",  
        "namespace":"web"  
     }  
  },  
  {  
     "relation":[  
        "delegate_permission/common.get_login_creds"  
     ],  
     "target":{  
        "site":"https://www.example.co.jp",  
        "namespace":"web"  
     }  
  }]
```

{% Aside %}
You can use include statements if you need to [issue
statements](https://developers.google.com/digital-asset-links/v1/statements#scaling-to-dozens-of-statements-or-more)
from different sites to the same set of targets. For example, a website may be
available on many different per-country top level domains, and you want to share
credentials between all of them. Using include statements, you can set up
pointers from many different sites to one central location, which defines
statements for all of them.
{% endAside %}

