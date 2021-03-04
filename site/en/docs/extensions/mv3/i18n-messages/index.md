---
layout: "layouts/doc-post.njk"
title: "Localization message formats"
date: 2012-09-18
updated: 2014-05-22
description: Reference documentation about the format of the messages.json file for Chrome Extensions.
---

Each internationalized extension or app has at least one file named `messages.json` that provides
locale-specific strings. This page describes the format of `messages.json` files. For information on
how to internationalize and localize, see the [Internationalization][1] page.

## Field summary {: #overview }

The following code shows the supported fields for `messages.json`. Only the "_name_" and "message"
fields are required.

```json
{
  "name": {
    "message": "Message text, with optional placeholders.",
    "description": "Translator-aimed description of the message.",
    "placeholders": {
      "placeholder_name": {
        "content": "A string to be placed within the message.",
        "example": "Translator-aimed example of the placeholder string."
      },
      ...
    }
  },
  ...
}
```

## Example {: #example }

Here's a `messages.json` file that defines three messages named "prompt_for_name", "hello", and
"bye":

```json
{
  "prompt_for_name": {
    "message": "What's your name?",
    "description": "Ask for the user's name"
  },
  "hello": {
    "message": "Hello, $USER$",
    "description": "Greet the user",
    "placeholders": {
      "user": {
        "content": "$1",
        "example": "Cira"
      }
    }
  },
  "bye": {
    "message": "Goodbye, $USER$. Come back to $OUR_SITE$ soon!",
    "description": "Say goodbye to the user",
    "placeholders": {
      "our_site": {
        "content": "Example.com",
      },
      "user": {
        "content": "$1",
        "example": "Cira"
      }
    }
  }
}
```

## Field details {: #field_details }

This section describes each field that can appear in a `messages.json` file. For details on how the
messages file is used—for example, what happens when a locale doesn't define all the messages—see
[Internationalization][1].

### name {: #name }

Actually, there's no field called "name". This field's name is the name of the message—the same
_name_ that you see in `__MSG__name___` or `getMessage("_name_")`.

The name is a case-insensitive key that lets you retrieve the localized message text. The name can
include the following characters:

- A-Z
- a-z
- 0-9
- \_ (underscore)
- @

{% Aside %}

**Note:** Don't define names that begin with "@@". Those names are reserved for [predefined messages][7].

{% endAside %}

Here are three examples of names, taken from the [Example][8] section:

```json
"prompt_for_name": {
  ...
},
"hello": {
  ...
},
"bye": {
  ...
}
```

For more examples of using names, see the [Internationalization][1] page.

### message {: #message }

The translated message, in the form of a string that can contain [placeholders][5]. Use
`$_placeholder_name_$` (case insensitive) to refer to a particular placeholder. For example, you can
refer to a placeholder named "our_site" as `$our_site$`, `$OUR_SITE$`, or `$oUR_sITe$`.

Here are three examples of messages, taken from the [Example][8] section:

```json
"message": "What's your name?"
...
"message": "Hello, $USER$"
...
"message": "Goodbye, $USER$. Come back to $OUR_SITE$ soon!"
```

To put a dollar sign (`$`) into the string, use `$$`. For example, use the following code to specify
the message **Amount (in \$)**:

```json
"message": "Amount (in $$)"
```

Although placeholders such as `$USER$` are the preferred way of referring to _substitution strings_
(strings specified using the _substitutions_ parameter of [i18n.getMessage][12]) you can also refer
to substitution strings directly within the message. For example, the following message refers to
the first three substitution strings passed into `getMessage()`:

```json
"message": "Params: $1, $2, $3"
```

Despite that example, we recommend that you stick to using placeholders instead of `$_n_` strings
within your messages. Think of placeholders as good variable names. A week after you write your
code, you'll probably forget what `$1` refers to, but you'll know what your placeholders refer to.
For more information on placeholders and substitution strings, see the [placeholders][5] section.

### description {: #description }

_Optional._ A description of the message, intended to give context or details to help the translator
make the best possible translation.

Here are three examples of descriptions, taken from the [Example][8] section:

```json
"description": "Ask for the user's name"
...
"description": "Greet the user"
...
"description": "Say goodbye to the user"
```

### placeholders {: #placeholders }

_Optional._ Defines one or more substrings to be used within the message. Here are two reasons you
might want to use a placeholder:

- To define the text for a part of your message that shouldn't be translated. Examples: HTML code,
  trademarked names, formatting specifiers.
- To refer to a substitution string passed into `getMessage()`. Example: `$1`.

Each placeholder has a name, a "content" item, and an optional "example" item. A placeholder's name
is case-insensitive and can contain the same characters as a [message name][2].

The "content" item's value is a string that can refer to substitution strings, which are specified
using the [i18n.getMessage][12] method's _substitutions_ parameter. The value of a "content" item is
typically something like "Example.com" or "\$1". If you refer to a substitution string that doesn't
exist, you get an empty string. The following table shows how `$_n_` strings correspond to strings
specified by the _substitutions_ parameter.

<table class="simple"><tbody><tr><th><em>substitutions</em> parameter</th><th>Value of $1</th><th>Value of $2</th><th>Value of $3</th></tr><tr><td><code>userName</code></td><td>value of <code>userName</code></td><td><code>""</code></td><td><code>""</code></td></tr><tr><td><code>["Cira", "Kathy"]</code></td><td><code>"Cira"</code></td><td><code>"Kathy"</code></td><td><code>""</code></td></tr></tbody></table>

The "example" item (optional, but highly recommended) helps translators by showing how the content
appears to the end user. For example, a placeholder for a dollar amount should have an example like
`"$23.45"`.

The following snippet, taken from the [Example][8] section, shows a "placeholders" item that
contains two placeholders named "our_site" and "user". The "our_site" placeholder has no "example"
item because its value is obvious from the "content" field.

```json
"placeholders": {
  "our_site": {
    "content": "Example.com",
  },
  "user": {
    "content": "$1",
    "example": "Cira"
  }
}
```

[1]: /docs/extensions/reference/i18n
[2]: #name
[3]: #message
[4]: #description
[5]: #placeholders
[7]: /docs/extensions/reference/i18n#overview-predefined
[8]: #example
[12]: /docs/extensions/reference/i18n#method-getMessage