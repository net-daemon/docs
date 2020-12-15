---
id: index
title: NetDaemon
---

This is the application daemon project for Home Assistant. This project makes it possible to make automatons using the .NET 5. The API uses the new nullable types and C# 9.0. Please make your self familiar with these concepts.

NetDaemon is a great alternative to appdaemon for people who wants to build their automation logic using .NET 5 ecosystem and C#. The daemon will be supported by all supported platforms of .NET 5.

## Two versions of the API

There are currently two versions of the API. Please use the V2 for new projects. Version 1 will be deprecated eventually and it´s async features will be migrated into V2. All old V1 is under the V1 docs.

## Stage of project

:::caution Warning

This is project is in beta stage. Things can break. The API:s is fairly stable at this point. The project use github pre-release for early drops. 

:::

The daemon core runtime is distributed through Hassio add-on or as docker container. 

Please see [the getting started](/docs/started/installation) documentation for setup.

:::info
You need to restart the add-on every time you change a file. C# needs to compile the changes. This will be autodetectable in future releases.
:::

## Issues

If you have issues or suggestions of improvements, please [add an issue](https://github.com/net-daemon/netdaemon/issues)

## Discuss the NetDaemon

Please [join the Discord server](https://discord.gg/K3xwfcX) to get support or if you want to contribute and help others.

If you prefer discussing using [github discussions](https://github.com/net-daemon/netdaemon/discussions) your are welcome to post questions and feature requests there. Bugs are reported as issues.

## Async model

The application daemon are built entirely on the async model in .Net. Even if the API is syncronous it still can be helpful to have some knowledge of async/await/Tasks to use it properly. Especially using the unit test framework.



