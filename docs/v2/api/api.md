---
id: api
title: The NetDaemon API
---

:::caution Warning
This section describes the 'Version 2 API'. We are currently moving all our new development towards the new HassModel API and encourage you to us that API for new development. The 'Version2 API' will be around long enough for reasonable adoption.
:::

# NetDaemon API

The netdaemon API is used to access Home Assistant features. The version 2 is based on System.Reactive API. 

## Schedulers

System.Reactive contains scheduling. We strongly suggesst using the built-in to make sure errors are logged and your automations works as expected.


#### Add new reference to your dev project file

Do a `dotnet add package System.Reactive` on the `daemonapp.csproj` (if you are not using the dev template your project is named differently).
Refresh the `JoySoftware.NetDaemon.App` and `JoySoftware.NetDaemon.DaemonRunner` to the latest versions.

#### New base class and imports

Make sure you are using `System` and `System.Reactive.Linq`. Also change to the `NetDaemon.Common.Reactive`. Now you will not need async initializer anymore so use `public override void Initialize()`. Forgetting to use new Initialize can introduce old async code bugs.

Change the baseclass to `NetDaemonRxApp`.

```csharp
using System;
using System.Reactive.Linq;
using NetDaemon.Common.Reactive;

public class HouseStateManager : NetDaemonRxApp
{
    public override void Initialize()
    {

    }
}

```
