---
id: index
title: NetDaemon Version 2
---

NetDaemon provides the capability to write home automations for Home Assistant in C#. We recommend all users to use HassModel API that is using dependency injection technology of .NET to expose different functionality. This will also be a better road to NetDaemon 3. The old base class API will co-exist in NetDaemon version 2 but we highly recommend using the HassModel in your automation projects. 

## About NetDaemon version 2
This version is current released version. It uses nuget version `22.1.x` and Docker image `netdaemon/netdaemon` and will be continued to be supported for a long time but no new features will be added.

:::warning

This version is no longer getting new features. Please consider migrating to version 3. New users should consider version 3.

:::

The daemon core runtime is distributed as a Home Assistant add-on or as Docker container. You can as an alternative deploy your own instance using the template project. Please see [the getting started](v2/started/installation.md) documentation for setup.

:::note

You need to restart the add-on every time you change a file. C# needs to compile the changes.

:::

## Issues

If you have issues or suggestions of improvements, please [add an issue](https://github.com/net-daemon/netdaemon/issues)

## Discuss the NetDaemon

Please [join the Discord server](https://discord.gg/K3xwfcX) to get support or if you want to contribute and help others.

If you prefer discussing using [github discussions](https://github.com/net-daemon/netdaemon/discussions) your are welcome to post questions and feature requests there. Bugs are reported as issues.





