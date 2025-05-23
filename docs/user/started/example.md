---
id: example
title: Example app
---

This application shows basic capabilities of the HassModel API of NetDaemon. It has a single file `ExampleApp.cs` that contains the app logic. This example uses the code generation capability of HassModel [explained here](user/hass_model/hass_model_codegen.md).

## ExampleApp.cs

```cs
using System;
using System.Reactive.Linq;
using NetDaemon.AppModel;
using NetDaemon.HassModel;
using HomeAssistantGenerated;

[NetDaemonApp]
public class ExampleAppHaContext
{
    public ExampleAppHaContext(IHaContext ha)
    {
        var entities = new Entities(ha);
        
        entities.BinarySensor.OfficeMotion
            .StateChanges()
            .Where(e => e.New.IsOn())
            .Subscribe(_ =>entities.Light.Office.TurnOn());
    }
}
```

## The NetDaemonAppAttribute

```cs
[NetDaemonApp]
```

By decorating a class with the `NetDaemonAppAttribute` it is registered as an application to be loaded by NetDaemon.

NetDaemon will create a helper in Home Assistant. By default, the helper is named:

| Environment | Name |
| --------------- | -------------------------------------------------------------------------|
| Development |  `dev_netdaemon_{namespace}_appname` |
| Production  | `netdaemon_{namespace}_appname` |

The app name will be converted to snake casing (i.e: HelloWorld -> hello_world)

When you want to choose your own name you can make use of the Id parameter like:

```cs
[NetDaemonApp(Id = "appname")]
```

Netdaemon will replace \{namespace\}_appname with your given Id

## The constructor

```cs
public ExampleAppHaContext(IHaContext ha)
```

When the application is (re-)started a new instance of the class is created by calling its constructor. This constructor will receive constructor arguments by using the standard .NET dependency injection mechanism. In this example the constructor receives an IHaContext interface which provides basic methods for interacting with Home Assistant.

The constructor can be used to do initialization of your application. **Never block the constructor!** Typically here you configure what should happen when a state changes or run a function every minute for example. If you need to do asynchronous initialization of your application this can be done by implementing `IAsyncInitializable`

**Example:**

```cs
        var entities = new Entities(ha);
        
        entities.BinarySensor.OfficeMotion
            .StateChanges()
            .Where(e => e.New.IsOn())
            .Subscribe(_ => entities.Light.Office.TurnOn());
```

| Function        | Description                                                              |
| --------------- | -------------------------------------------------------------------------|
| new Entities(ha)     | Creates an Instance of the generated Entities class that provides strongly typed access to all your HA entities |
| entities.BinarySensor.OfficeMotion          | Selects the `binary_sensor.office_motion`  entity from Home Assistant |
| StateChanges()  | Respond to changes of the state of this motion sensor
| Where           | FIlter which state changes we are interested in, int this case when the sensor state becomes 'on' |
| Subscribe       | Calls any code/action when the criteria is met                                  |
| TurnOff()       | Turns off the lights in the office using another generated entity and a generated service method |

## Creating and updating Home Assistant entities

If you want to create entities from NetDaemon, set their state attributes, then check out the [MQTT Entity Manager documentation](user/extensions/mqttEntityManager.md)

## Real-world example apps

Please check out the apps being developed for NetDaemon. Since documentation is still lacking behind it would be best to look at real code 😊

| User | Description | Version |
| --- | --- | --- |
| [@helto4real](https://github.com/helto4real/NetDaemon3Automations)            | Tomas NetDaemon apps running in production | 4 |
| [@FrankBakkerNl](https://github.com/FrankBakkerNl/NetDaemonExample)           | HassModel examples by Frank the author of HassModel API |
| [@Kennetjuh](https://github.com/kennetjuh/NetDeamonImpl)                      | Kennetjuh's NetDaemon implementation | 5 |
| [@vinnie1234](https://github.com/vinnie1234/HomeAutomation-NetDaemon)         | Vincent's NetDaemon implementation | 5 |
| [@leosperry](https://github.com/leosperry/NetDeamonImpl)                      | Leonard's NetDaemon implementation | 3 |
| [@pockybum522](https://github.com/PockyBum522/netdaemon-home-assistant-apps)  | David's NetDaemon apps as used Daily | 4 |
| [@philippch](https://github.com/PhilippCh/HomeAutomations)                    | Philipp's apartment automated by NetDaemon | 4 |
| [@DevJasperNL](https://github.com/DevJasperNL/CodeCasa)                       | Jasper's Code Casa 🏡<br />This repository explores creative and powerful ways to use a rich programming language like C# for home automation. From custom logic to seamless integrations, you'll find practical examples and unique ideas to elevate your smart home setup including:<ul><li>Using Blazor to create a custom Home Assistant frontend</li><li>Using pipelines to seperate responsibilities</li></ul> | 5 |

> **Do you have a NetDaemon project you'd like to share? We'd love to see it! Feel free to contribute by adding your project. Learn how here: https://github.com/net-daemon/docs**

## Third party libraries

The following libraries work well together with NetDaemon.

| GitHub and NuGet | Description | Contributor(s) |
| --- | --- | --- |
| [NetDaemon.Extensions.Observables](https://github.com/DevJasperNL/CodeCasa.Libraries/tree/main/src/NetDaemon.Extensions.Observables) ([NuGet](https://www.nuget.org/packages/DevJasper.NetDaemon.Extensions.Observables/)) | Collection of extension methods meant to enhance NetDaemon entities with stateful and boolean observables allowing for a more intuitive and robust coding experience. | [@DevJasperNL](https://github.com/DevJasperNL)
| [Automation Pipelines](https://github.com/DevJasperNL/CodeCasa.Libraries/tree/main/src/AutomationPipelines) ([NuGet](https://www.nuget.org/packages/AutomationPipelines/)) | Composable, reactive, and layered logic pipelines for C# automation. | [@DevJasperNL](https://github.com/DevJasperNL)
