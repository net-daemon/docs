---
id: api
title: The NetDaemon API
---

# NetDaemon API

The netdaemon API is used to access Home Assistant features. The version 2 (current) is based on System.Reactive API. V1 of the API will be eventually deprecated and async features will be moved into V2. New users should always use V2. The internals of the V2 API is using async/await but for the user the async implementation is event based to fit the System.Reactive modell better. For users of the V1, remove all async code when migrating!

## Schedulers

System.Reactive contains scheduling. We strongly suggesst using the built-in to make sure errors are logged and your automations works as expected.

### Migrating to V2 from V1

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




