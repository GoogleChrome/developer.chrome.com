.well-known is a file used to add redirects to a website from standardized URLs.

For example, password managers can make it easier for users to update passwords
if a website sets a redirect from `/.well-known/change-password` to the change
password page of the site.

In addition, it can be useful to access policy or other information about a
host _before_ making a request. For example, `robots.txt` tells web crawlers
which pages to visit and which pages to ignore. IETF
[RFC8615](https://tools.ietf.org/html/rfc8615) outlines a standardized way
to make site-wide metadata accessible in standard locations in a `/.well-known/` subdirectory.

See a list of recommendations for `.well-known` at
[iana.org/assignments/well-known-uris/well-known-uris.xhtml](https://www.iana.org/assignments/well-known-uris/well-known-uris.xhtml).