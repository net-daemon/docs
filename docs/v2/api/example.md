---
id: baseclass_example
title: Baseclass API Example app (deprecated)
---
This application shows basic capabilities of the fluent API of NetDaemon. It has two files, `ExampleApp.yaml` that contains basic configuration of the instance and `ExampleApp.cs` that contains the app logic.

## ExampleApp.yaml

```yaml
example_app:
    class: ExampleApp
```

## ExampleApp.cs

```cs
using System;
using System.Reactive.Linq;
using NetDaemon.Common.Reactive;

/// <summary>
///     Example app
/// </summary>
public class ExampleApp : NetDaemonRxApp
{
    public override void Initialize()
    {
        Entity("binary_sensor.my_motion_sensor")
            .StateChanges
            .Where(e => e.Old?.State != "off" && e => e.New?.State == "off")
            .NDSameStateFor(TimeSpan.FromMinutes(10))
            .Subscribe(s => Entity("light.light1").TurnOff());
    }
}

```

## The NetDaemonApp base class

```cs
public class ExampleApp : NetDaemonRxApp
```

All applications in netdaemon have to inherit the NetDaemonApp base class. This provides discoverability and functionality to the application.

## The Initialize function

```cs
public override void Initialize()
```

This function is called by the daemon and it´s purpose is to do all the initialization of your application. **Never block this function!** Typically you configure what should happen when a state change or run a function every minute for an example.

**Example:**

```cs
Entity("binary_sensor.my_motion_sensor")
    .StateChanges
    .Where(e => e.Old?.State != "off" && e.New?.State == "off")
    .NDSameStateFor(TimeSpan.FromMinutes(10))
    .Subscribe(s => Entity("light.light1").TurnOff());
```

| Function        | Description                                                                               |
| --------------- | ----------------------------------------------------------------------------------------- |
| Entity          | Selects one or more entities where actions are applied                                    |
| StateChanges    | If state changes on previously defined entity do action                                   |
| Where           | Lamda expression of when to do action                                                     |
| NDSameStateFor  | Do action only if state has not change for a period of time (10 minutes)                  |
| Subscribe       | Calls any code/action when criteras met                                                   |
| TurnOff         | The action on previously selected entity/ies                                              |

## Real-world example apps

Please check out the apps being developed for netdaemon. Since documentation is still lacking behind it will be best looking at real code 😊

| User                                                                                                    | Description                                           |
| ------------------------------------------------------------------------------------------------------- | ----------------------------------------------------- |
| [@helto4real](https://github.com/helto4real/hassio/tree/master/netdaemon/apps)                          | My own netdaemon apps running in production (Use V2 veriosn of API)          |
| [@isabellaalstrom](https://github.com/isabellaalstrom/home-assistant-config/tree/master/netdaemon/apps) | Isabella's netdaemon apps, check them out, nice stuff |
| [@Horizon0156](https://github.com/Horizon0156/netdaemon-apps)                                           | Stefan W's netdaemon apps, good example extending netdaemon  functionality |
