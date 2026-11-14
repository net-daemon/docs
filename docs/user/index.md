---
id: index
title: NetDaemon
---

NetDaemon provides the capability to write home automations for Home Assistant in C#.
The current version is V7 and uses .NET 11 and C# 14.

## About NetDaemon

Runtime version 7 uses the Docker image `netdaemon/netdaemon7` and the
**NetDaemon V7 (.NET 11)** Home Assistant add-on. Use NuGet packages and a code
generator version that match your runtime release.

If you use V6 or an earlier runtime, follow the
[V7 migration guide](started/upgrade_to_v7.md). V6 uses .NET 10 and a separate
image and add-on. Retarget and rebuild V6 apps before deploying them to V7.

## Migrating from version 3
We are no longer supporting version 3 of the runtime.

If you are a current user of version 3.x of NetDaemon runtime please upgrade, see [migrating from version 3 runtime](user/app_model/moving_from_v3.md)

The daemon core runtime is distributed as a Home Assistant add-on or as Docker container. You can as an alternative deploy your own instance using the template project. Please see [the getting started](user/started/installation.md) documentation for setup.

:::note

You need to restart the add-on every time you change a file. C# needs to compile the changes.

:::

## Issues

If you have issues or suggestions of improvements, please [add an issue](https://github.com/net-daemon/netdaemon/issues)

## Discuss the NetDaemon

Please [join the Discord server](https://discord.gg/K3xwfcX) to get support or if you want to contribute and help others.

If you prefer discussing using [github discussions](https://github.com/net-daemon/netdaemon/discussions) your are welcome to post questions and feature requests there. Bugs are reported as issues.
