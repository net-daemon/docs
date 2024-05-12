---
id: user_support_policy
title: Maintenance and support
---

## Support and maintenance policy

We are a small team maintaining this project in our free time so we are happy to support and maintain the latest major version of the NetDaemon. 
We have no means to support older versions. We can **not** guarantee anything but we will do our best to help you out as long as this project is active.

_These policies could be changed at any time without prior notice._

### What we support

We offer support through the [Discord server](https://discord.gg/QwvWpy8M) and [GitHub issues](https://github.com/net-daemon/netdaemon/issues) for the latest major version of NetDaemon. We will provide bug fixes and security patches for the latest major version. 
We do recommend using the Discord server for faster response times.

### What happens to older versions?

You can continue to use older versions of NetDaemon, but we will not provide any support, bug fixes or security patches for them. We encourage you to upgrade to the latest version of NetDaemon to take advantage of the latest features and performance improvements.
The nuget packages to all prior versions of the runtime will be deprecated to let you know that you should upgrade to the latest version.

The add-on will remain for the two latest major versions but the oldest one will be deprecated and removed next major version.

All docker/GitHub images will remain in the registries as long as we are allowed to have them there.

### How to upgrade to the latest version

Below you have links to the migration guides for upgrading to the latest version of NetDaemon. If you are on a really old version we
recommend to start a new project from the official CLI template and migrate the old apps one by one. 

[From V3->V4](user/app_model/moving_from_v3.md) (current version)

## Release policy

### Major releases of NetDaemon runtime

We aim to always be on the latest major version of .NET to allow users to take advantage of the latest features and performance improvements of .NET
as well as the newest language features of C#. We will release new versions of NetDaemon as soon as possible after a new version of .NET is released.

Sometimes we might introduce breaking changes if neede in order to make the project easier to maintain or introduce new features. 
This will result in a new major version of NetDaemon. We will provide a migration guide for users to upgrade to the latest version.
New versions will be announced on the [Discord server](https://discord.gg/QwvWpy8M) in good time before the release to give users time to prepare for the upgrade.

### Minor releases of NetDaemon runtime

If the release only contains upgrades to a newer version of .NET and no other breaking changes, we will release a minor version of NetDaemon runtime. This will allow users to upgrade to the latest version of .NET without any breaking changes to their existing code.
It will require users to update their .NET version to the latest version to use the latest version of NetDaemon.

### New features, bug fixes and security patches

New features and bug fixes will be released continuously as soon as they are ready on the latest version of NetDaemon runtime.
No new features, bug fixes and security patches will be released for older versions of NetDaemon runtime. Users are encouraged to upgrade to the latest version of NetDaemon runtime as soon as possible.
New features and bug fixes does not mean new version of the runtime and are mostly not breaking. We will always provide information in the release notes
if we have to introduce breaking changes.


