---
id: hass_model_example
title: Example app
---
This application shows basic capabilities of the fluent API of NetDaemon. It has a single file  `ExampleApp.cs` that contains the app logic.

## ExampleApp.cs

```cs
using System;
using System.Reactive.Linq;
using NetDaemon.Common;
using NetDaemon.Model3.Common;
using NetDaemon.Model3.Entities;
using UserApp;

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

By decorating a class with the `NetDaemonAppAttribute` it is registerd as an application to be loaded by NetDaemon.

## The constructor
```cs
public ExampleAppHaContext(IHaContext ha)
```

When the application is (re-)started a new instance of the class is created by calling its constructor. This constructor will receive constructor arguments by using the standard .Net dependency injecton mechanism. In this example the constructor receives a IHaContext interface which provides basic methods for interacting with Home Assistant.

The constuctor can be used to do initialization of your application. **Never block the constructor!** Typically here you configure what should happen when a state changes or run a function every minute for example. It you need to do asyncronous initialization of your application this can be done by implementing `IAsyncInitializable`

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
| new Entities(ha)     | Creates an Instance of the generated Entities class that provides strong typed access to all your HA entities
| entities.BinarySensor.Motionsensor01          | Selects an entity from HomeAssitant |
| StateChanges    | Respond to state changes of Motionsensor01                  |
| Where           | Lamda expression of when to do action, in this case when the sensor' state becomes 'off'
| Throttle        | Do action only if state has not change for a period of time (10 minutes) |
| Subscribe       | Calls any code/action when criteras met                                  |
| TurnOff()       | Calls a generated service method using an ENtity as the target|
