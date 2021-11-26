---
id: index
title: NetDaemon
---

NetDaemon provides capability to write home automations for Home Assistant in C#. We are currently building a new API called the HassModel that are using dependency injection technology of .NET to expose different functionality. The old V2 API will co-exist as long as needed but we highly recommend using the HassModel in your automation projects. We are working hard to make new APIs feature complete to be able to completely replace V2 in the future. 

## Stage of project

:::caution Warning

We are still adding alot of features so expect things to change.  

:::

The daemon core runtime is distributed as a Home Assistant add-on or as docker container. You can as an alternative deploy your own instance using the template project. Please see [the getting started](/docs/started/installation) documentation for setup.

:::info
Please note that you need to restart the add-on every time you change a file. C# needs to compile the changes.
:::

## Issues

If you have issues or suggestions of improvements, please [add an issue](https://github.com/net-daemon/netdaemon/issues)

## Discuss the NetDaemon

Please [join the Discord server](https://discord.gg/K3xwfcX) to get support or if you want to contribute and help others.

If you prefer discussing using [github discussions](https://github.com/net-daemon/netdaemon/discussions) your are welcome to post questions and feature requests there. Bugs are reported as issues.





