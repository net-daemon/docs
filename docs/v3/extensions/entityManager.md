---
id: extensions_EntityManager
title: Entity Manager
---

Quite often its necessary to store data in Home Assistant using entities. This can be useful to store custom sensors with values you have acquired from an API or even your own calculations. These entities can then be further used in other automation in NetDaemon and/or Home Assistant.

This extension enables you to Create, Update and Remove entities in Home Assistant leveraging MQTT Discovery.

### Pre-Requisite
- You need MQTT Broker running
- You need to configure the Home Assistant MQTT Integration and enable Discovery.

### Setup
If you use the NetDaemon project template you will already have the Entity Manager available and you can skip this setup.

To set up the Entity Manager manually you should:

- Include the JoySoftware.NetDaemon.Extensions.MqttEntityManager NuGet package 

```ps
Install-Package JoySoftware.NetDaemon.Extensions.MqttEntityManager 
```

- Make sure to call `.UseNetDaemonMqttEntityManagement()` on the HostBuilder in the hosts Program.cs

```csharp
await Host.CreateDefaultBuilder(args)
          // More Host Extensions
          .UseNetDaemonMqttEntityManagement()
          .ConfigureServices((_, services) =>
             // More Service Extensions
          )
          .Build()
          .RunAsync()
          .ConfigureAwait(false);
```
- Update your `appsettings.json` with a new section
```json
{
  "Logging": {
    // more config
  },
  "NetDaemon": {
    // more config
  },
  "Mqtt": {
    "Host": "ENTER YOUR IP TO your MQTT Broker"
  }
}
```
Optional Mqtt Parameters

- Port - default `1883`
- UserId - default `null`
- Password - default `null`
- DiscoveryPrefix - default `homeassistant`

### Injecting the Entity Manager

You can get an instance of the IMqttEntityManager interface simply by injecting it into your apps constructor

```csharp
using System.Reactive.Concurrency.MqttEntityManager; 

[NetDaemonApp]
class MyApp(IMqttEntityManager scheduler)
{ }
```

### Remarks
When creating entities ensure
- that the domain is provided in Home Assistant style for example `binary_sensor`
- that your device class is valid for the given domain, for example see [Binary Sensor Device Classes](https://developers.home-assistant.io/docs/core/entity/binary-sensor?_highlight=device&_highlight=class#available-device-classes) Home Assistant docs
- there is an optional parameter `persist` with default value of `true`, this will ensure your entity survives a Home Assistant restart

### Example 
In the NetDaemon project template there is an example that demonstrates the functionality of the Entity Manager at `\dev\DebugHost\apps\Extensions\MqttEntityManagerApp.cs`
