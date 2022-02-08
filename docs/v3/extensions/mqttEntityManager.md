---
id: extensions_mqttEntityManager
title: Entity Manager
---

Quite often its necessary to store data in Home Assistant using entities. This can be useful to store custom sensors with values you have acquired from an API or even your own calculations. These entities can then be further used in other automation in NetDaemon and/or Home Assistant.

This extension enables you to Create, Update and Remove entities in Home Assistant leveraging MQTT Discovery.

:::caution Warning

This extension is still in the beta stage and breaking changes should be expected.

:::

## Pre-Requisites
- You need MQTT Broker running
- You need to configure the Home Assistant MQTT Integration and enable Discovery.

## Setup
If you use the NetDaemon project template you will already have the Entity Manager available and you can skip this setup.

To set up the Entity Manager manually you should:

- Include the JoySoftware.NetDaemon.Extensions.MqttEntityManager NuGet package 

```ps
dotnet add package JoySoftware.NetDaemon.Extensions.Mqtt
```


- Make sure to call `.UseNetDaemonMqttEntityManagement()` on the HostBuilder in the host's Program.cs

```csharp
await Host.CreateDefaultBuilder(args)
          // More Host Extensions
          .UseNetDaemonMqttEntityManagement()   // <---
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
- UserName - default `null`
- Password - default `null`
- DiscoveryPrefix - default `homeassistant`


### Injecting the Entity Manager

You can get an instance of the IMqttEntityManager interface simply by injecting it into your apps constructor

```csharp
using NetDaemon.Extensions.MqttEntityManager;
using NetDaemon.Extensions.MqttEntityManager.Models;

private readonly IMqttEntityManager _entityManager;

[NetDaemonApp]
class MyApp(IMqttEntityManager entityManager)
{ 
  _entityManager = entityManager;
  // ...
}
```

## Entity Management API

The extension currently offers three methods:

1. `CreateAsync(..)`, which allows you to create an entity in Home Assistant
1. `UpdateAsync(..)` allows you to change an entity state and/or set its attributes
1. `RemoveAsync(..)` allows you to remove an entity that has been created through this extension


Each of these methods operates on an `entityId`, which is a standard Home Assistant identifier of the format "{domain}.{identifier}", for example "sensor.kitchen_temperature".
When you create an entity you should strive to use a unique identifier for each domain.


Please do bear in mind that the extension is using MQTT to create entities and so you must be aware of both the Home Assistant and the MQTT requirements with regards to creating and updating entities. You can find more information of the domains and device classes supported by MQTT and this extension in the [official MQTT documentation](https://www.home-assistant.io/docs/mqtt/discovery), however this is noted just for reference - the complexities around topic subscription are handled for you within the extension.



### Creating entities

To create an entity you will call the following method:

```csharp
Task CreateAsync(string entityId, EntityCreationOptions? options = null);
```

The only mandatory argument is the `entityId`, which is of the format "domain.identifier" - see the previous section for more information. Note that, depending on the domain, you may need to supply additional parameters - see the [Home Assistant Entity documentation](https://developers.home-assistant.io/docs/core/entity/) for specific details.


The optional `EntityCreationOptions` allows you to override the following parameters:

|Parameter|Type|Description|Default|
|----|----|----|----|
|DeviceClass|string|The device class, which is required for some domains (see the [official documentation](https://developers.home-assistant.io/docs/core/entity/))|`null`|
|UniqueId|string|A unique identifier for the entity across the MQTT namespace|Combination of domain and identifier|
|Name|string|A friendly name that is displayed in the HA user interface|Identifier part of `entityId`|
|Persist|bool|Whether the entity should persist over HA restarts|`true`|


### Updating entities: state and attributes

Use the `UpdateAsync()` method to set state and/or update attributes:

```csharp
Task UpdateAsync(string entityId, string? state, object? attributes = null);
```

The arguments are:
 * `entityId` the "domain.identifier" format entity ID supplied in the `CreateAsync()` method
 * `state` optional new desired state of the entity
 * `attributes` an optional collection of "key=value" attributes - this can be a concrete or anonymous object


### Removing entities

You can delete an entity _that has been created via this extension_ by calling the following method:

```csharp
Task RemoveAsync(string entityId);
```

The `entityId` argument has the same format as in the previous methods.

## Remarks
When creating entities ensure
- that the domain is provided in [Home Assistant style](https://developers.home-assistant.io/docs/core/entity/) for example `binary_sensor`
- that your device class is valid for the given domain, for example see [Binary Sensor Device Classes](https://developers.home-assistant.io/docs/core/entity/binary-sensor?_highlight=device&_highlight=class#available-device-classes) Home Assistant docs

## Examples
In the NetDaemon project template there is an example that demonstrates the functionality of the Entity Manager at `\dev\DebugHost\apps\Extensions\MqttEntityManagerApp.cs`

Below are some additional examples:

**Creating a simple sensor**

```csharp
await _entityManager.CreateAsync("sensor.basic_sensor").ConfigureAwait(false);
```


**Overriding the default unique ID and name**

```csharp
await _entityManager.CreateAsync("sensor.my_id",
  new EntityCreationOptions(UniqueId: "special_id", Name: "A special kind of sensor"))
  .ConfigureAwait(false);
```

**Switches require a device class**

```csharp
await _entityManager.CreateAsync("switch.kitchen_lights",
   new EntityCreationOptions(Name: "Kitchen lights switch", DeviceClass: "switch"))
   .ConfigureAwait(false);
```


**Change state of a sensor, and set an "updated" attribute to right now**

```csharp
await _entityManager.UpdateAsync("sensor.my_id", "shiny", new { updated = DateTime.UtcNow })
   .ConfigureAwait(false);
```

**Remove an entity**

```csharp
await _entityManager.RemoveAsync("sensor.my_id").ConfigureAwait(false);
```
