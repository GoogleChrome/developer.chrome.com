# Using glossary partials

These partials each contain one glossary term. If you use any and need a subhead for them, you'll need to include the subhead inline in your content before the include, like so

    ## Ad exchange

    {% Partial 'privacy-sandbox/glossary-entries/ad-exchange.njk' %}
    
    These partials don't line have spacing before the content, thus the line space between the header and the partial reference is necessary, as above.
