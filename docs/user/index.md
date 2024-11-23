---
id: index
title: NetDaemon
---

NetDaemon provides the capability to write home automations for Home Assistant in C#. Current version of the NetDaemon runtime is 5 and use .NET 9 and C# 13.

## About NetDaemon

Runtime version 5 has NuGet version >= `24.47.0` and uses the Docker image `netdaemon/netdaemon5`.
No additional features will be added to version 4.

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
