---
api: fileSystemProvider
---

## Manifest

You must declare the "fileSystemProvider" permission and section in the [extension manifest](/extensions/manifest) to use the File System Provider API. For example:

```json
{
  "name": "My extension",
  ...
  "permissions": [
    "fileSystemProvider"
  ],
  ...
  "file_system_provider_capabilities": {
    "configurable": true,
    "watchable": false,
    "multiple_mounts": true,
    "source": "network"
  },
  ...
}
```

The file_system_provider section must be declared as follows:

**`configurable` (boolean)** - optional

: Whether configuring via onConfigureRequested is supported. By default: false.

**`multiple_mounts` (boolean)** - optional

: Whether multiple (more than one) mounted file systems are supported. By default: false.

**`watchable` (boolean)** - optional

: Whether setting watchers and notifying about changes is supported. By default: false.

**`source` (enum of "file", "device", or "network")** - required

: Source of data for mounted file systems.

Files app uses above information in order to render related UI elements approprietly. For example, if `configurable` is set to true, then a menu item for configuring volumes will be rendered. Similarly, if `multiple_mounts` is set to `true`, then Files app will allow to add more than one mount points from the UI. If `watchable` is `false`, then a refresh button will be rendered. Note, that if possible you should add support for watchers, so changes on the file system can be reflected immediately and automatically.

## Overview

File System Provider API allows extensions to support virtual file systems, which are available in the file manager on Chrome OS. Use cases include decompressing archives and accessing files in a cloud service other than Drive.

## Mounting file systems

Providing extensions can either provide file system contents from an external source (such as a remote server or a USB device), or using a local file (such as an archive) as its input.

In order to write file systems which are file handlers (source is `"file"`) the provider must be a packaged app, as the `onLaunched` event is not available to extensions.

If the source is network or a device, then the file system should be mounted when [onMountRequested](#event-onMountRequested) event is called.

| [Source](#manifest-source) of the file system data | Entry point |
|----------------------------------------------------|-------------|
| `"file"` | Available to packaged apps only. |
| `"device"` or `"network"` | [onMountRequested](#event-onMountRequested) |

## Configuring file systems

Provided file systems once mounted can be configured via the [onConfigureRequested](#event-onConfigureRequested) event. It's especially useful for file systems which provide contents via network in order to set proper credentials. Handling this event is optional.

## Life cycle

Provided file systems once mounted are remembered by Chrome and remounted automatically after reboot or restart. Hence, once a file system is [mounted](#method-mount) by a providing extension, it will stay until either the extension is unloaded, or the extension calls the [unmount](#method-unmount) method.