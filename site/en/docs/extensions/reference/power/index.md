---
api: power
---

## Usage

By default, operating systems dim the screen when users are inactive and eventually suspend the
system. With the power API, an app or extension can keep the system awake.

Using this API, you can specify the [Level][1] to which power management is disabled. The `"system"`
level keeps the system active, but allows the screen to be dimmed or turned off. For example, a
communication app can continue to receive messages while the screen is off. The `"display"` level
keeps the screen and system active. E-book and presentation apps, for example, can keep the screen
and system active while users read.

When a user has more than one app or extension active, each with its own power level, the
highest-precedence level takes effect; `"display"` always takes precedence over `"system"`. For
example, if app A asks for `"system"` power management, and app B asks for `"display"`, `"display"`
is used until app B is unloaded or releases its request. If app A is still active, `"system"` is
then used.

[1]: /docs/extensions/power#type-Level
