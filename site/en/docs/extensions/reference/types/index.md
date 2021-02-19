---
api: types
---

## Chrome settings {: #ChromeSetting }

The `ChromeSetting` prototype provides a common set of functions (`get()`, `set()`, and `clear()`)
as well as an event publisher (`onChange`) for settings of the Chrome browser. The [proxy settings
examples][1] demonstrate how these functions are intended to be used.

### Scope and life cycle

Chrome distinguishes between three different scopes of browser settings:

`regular`

: Settings set in the `regular` scope apply to regular browser windows and are inherited by incognito
  windows if they are not overwritten. These settings are stored to disk and remain in place until
  they are cleared by the governing extension, or the governing extension is disabled or uninstalled.

`incognito_persistent`

: Settings set in the `incognito_persistent` scope apply only to incognito windows. For these, they
  override `regular` settings. These settings are stored to disk and remain in place until they are
  cleared by the governing extension, or the governing extension is disabled or uninstalled.

`incognito_session_only`

: Settings set in the `incognito_session_only` scope apply only to incognito windows. For these, they
  override `regular` and `incognito_persistent` settings. These settings are not stored to disk and
  are cleared when the last incognito window is closed. They can only be set when at least one
  incognito window is open.

### Precedence

Chrome manages settings on different layers. The following list describes the layers that may
influence the effective settings, in increasing order of precedence.

1.  System settings provided by the operating system
2.  Command-line parameters
3.  Settings provided by extensions
4.  Policies

As the list implies, policies might overrule any changes that you specify with your extension. You
can use the `get()` function to determine whether your extension is capable of providing a setting
or whether this setting would be overridden.

As discussed above, Chrome allows using different settings for regular windows and incognito
windows. The following example illustrates the behavior. Assume that no policy overrides the
settings and that an extension can set settings for regular windows **(R)** and settings for
incognito windows **(I)**.

- If only **(R)** is set, these settings are effective for both regular and incognito windows.
- If only **(I)** is set, these settings are effective for only incognito windows. Regular windows
  use the settings determined by the lower layers (command-line options and system settings).
- If both **(R)** and **(I)** are set, the respective settings are used for regular and incognito
  windows.

If two or more extensions want to set the same setting to different values, the extension installed
most recently takes precedence over the other extensions. If the most recently installed extension
sets only **(I)**, the settings of regular windows can be defined by previously installed
extensions.

The _effective_ value of a setting is the one that results from considering the precedence rules. It
is used by Chrome.

[1]: /docs/extensions/proxy#overview-examples
