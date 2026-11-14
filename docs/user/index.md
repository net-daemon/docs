---
id: index
title: NetDaemon
---

NetDaemon provides the capability to write home automations for Home Assistant in C#. The current stable version of the NetDaemon runtime is V6 and uses .NET 10 and C# 14.

NetDaemon V7 on .NET 11 is available as an alpha for testing. See the
[V7-alpha guide](started/v7_alpha.md) for migration, matching NuGet packages,
and the separate V7-alpha add-on and Docker images.

## About NetDaemon

Runtime version 6 uses the Docker image `netdaemon/netdaemon6`. Use NuGet packages
that match your runtime release; V7 alpha packages target .NET 11 and cannot be
used with V6.
No additional features will be added to version 5.

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
