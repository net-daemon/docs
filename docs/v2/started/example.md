---
id: example
title: Example app
---
This application shows basic capabilities of the HassModel API of NetDaemon. It has a single file  `ExampleApp.cs` that contains the app logic. This example uses the code generation capability of HassModel [explained here](v2/hass_model/hass_model_codegen.md).

:::warning

This example is for the current version 2. If you are using version 3 it is the same execpt that you should be using the V3 namespaces.
```
using System;
using NetDaemon.AppModel;
using NetDaemon.HassModel.Common;
```
:::

## ExampleApp.cs

```cs
using System;
using System.Reactive.Linq;
using NetDaemon.Common;
using NetDaemon.HassModel.Common;
using NetDaemon.HassModel.Entities;
using HomeAssistantGenerated;

[NetDaemonApp]
public class ExampleAppHaContext
{
    public ExampleAppHaContext(IHaContext ha)
    {
        var entities = new Entities(ha);
        
        entities.BinarySensor.AtticMotionsensor
            .StateChanges()
            .Where(e => e.New.IsOff())
            .Throttle(TimeSpan.FromMinutes(10))
            .Subscribe(_ => entities.Light.Attic.TurnOff());
    }
}
```

## The NetDaemonAppAttribute

```cs
[NetDaemonApp]
```

By decorating a class with the `NetDaemonAppAttribute` it is registered as an application to be loaded by NetDaemon.

## The constructor
```cs
public ExampleAppHaContext(IHaContext ha)
```

When the application is (re-)started a new instance of the class is created by calling its constructor. This constructor will receive constructor arguments by using the standard .NET dependency injection mechanism. In this example the constructor receives an IHaContext interface which provides basic methods for interacting with Home Assistant.

The constructor can be used to do initialization of your application. **Never block the constructor!** Typically here you configure what should happen when a state changes or run a function every minute for example. If you need to do asynchronous initialization of your application this can be done by implementing `IAsyncInitializable`

**Example:**

```cs
        var entities = new Entities(ha);
        
        entities.BinarySensor.AtticMotionsensor
            .StateChanges
            .Where(e => e.New.IsOff())
            .Throttle(TimeSpan.FromMinutes(10))
            .Subscribe(_ => entities.Light.Attic.TurnOff());
```

| Function        | Description                                                              |
| --------------- | -------------------------------------------------------------------------|
| new Entities(ha)     | Creates an Instance of the generated Entities class that provides strong typed access to all your HA entities |
| entities.BinarySensor.Motionsensor01          | Selects an entity from HomeAssistant |
| StateChanges    | Respond to state changes of Motionsensor01                  |
| Where           | Lamda expression of when to do action, in this case when the sensor' state becomes 'off' |
| Throttle        | Do action only if state has not changed for a period of time (10 minutes) |
| Subscribe       | Calls any code/action when criteras met                                  |
| TurnOff()       | Calls a generated service method using an ENtity as the target|

## Real-world example apps

Please check out the apps being developed for NetDaemon. Since documentation is still lacking behind it will be best looking at real code 😊

| User                                                                                                    | Description                                           |
| ------------------------------------------------------------------------------------------------------- | ----------------------------------------------------- |
| [@FrankBakkerNl](https://github.com/FrankBakkerNl/NetDaemonExample)                                    | HassModel examples by Frank the author of HassModel API |
| [@helto4real](https://github.com/helto4real/HassModelAutomations)                          | Tomas NetDaemon apps running in production (The HassModel version)          |
| [@isabellaalstrom](https://github.com/isabellaalstrom/home-assistant-config/tree/master/netdaemon/apps) | Isabella's NetDaemon apps, check them out, nice stuff |
| [@Horizon0156](https://github.com/Horizon0156/netdaemon-apps)                                           | Stefan W's NetDaemon apps, good example extending NetDaemon  functionality |
