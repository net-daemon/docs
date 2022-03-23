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

The extension currently offers the following methods:

1. `CreateAsync(..)`, which allows you to create an entity in Home Assistant
1. `SetStateAsync(...)` sets the state of an entity
1. `SetAttributesAsync(...)` sets a collection of attributes on an entity
1. `SetAvailabilityAsync(...)` sets the availability of an entity
1. `RemoveAsync(..)` allows you to remove an entity that has been created through this extension
1. `PrepareCommandSubscriptionAsync(..)` returns an observable string that you can subscribe to for command updates


In addition, the extension has a single property `QualityOfServiceLevel` which allows you to set the QoS level of the MQTT message that will be transmitted. See [this article](https://www.hivemq.com/blog/mqtt-essentials-part-6-mqtt-quality-of-service-levels/) for more information.


Each of the methods operates on an `entityId`, which is a standard Home Assistant identifier of the format "{domain}.{identifier}", for example "sensor.kitchen_temperature".
When you create an entity you should strive to use a unique identifier for each domain.


Please do bear in mind that the extension is using MQTT to create entities and so you must be aware of both the Home Assistant and the MQTT requirements with regards to creating and updating entities. You can find more information of the domains and device classes supported by MQTT and this extension in the [official MQTT documentation](https://www.home-assistant.io/docs/mqtt/discovery), however this is noted just for reference - the complexities around topic subscription are handled for you within the extension.



### Creating entities

To create an entity you will call the following method:

```csharp
Task CreateAsync(string entityId, EntityCreationOptions? options = null, object? additionalConfig = null);
```

The only mandatory argument is the `entityId`, which is of the format "domain.identifier" - see the previous section for more information. Note that, depending on the domain, you may need to supply additional parameters - see the [Home Assistant Entity documentation](https://developers.home-assistant.io/docs/core/entity/) for specific details.


The optional `EntityCreationOptions` allows you to override the following parameters:

|Parameter|Type|Description|Default|
|----|----|----|----|
|DeviceClass|string|The device class, which is required for some domains (see the [official documentation](https://developers.home-assistant.io/docs/core/entity/))|`null`|
|UniqueId|string|A unique identifier for the entity across the MQTT namespace|Combination of domain and identifier|
|Name|string|A friendly name that is displayed in the HA user interface|Identifier part of `entityId`|
|Persist|bool|Whether the entity should persist over HA restarts|`true`|
|PayloadAvailable|string|The payload that defines an entity is available|`null`|
|PayloadNotAvailable|string|The payload that defines an entity is not available|`null`|
|PayloadOn|string|The payload that defines the "on" state|"ON"|
|PayloadOff|string|The payload that defines the "off" state|"OFF"|


As well as the `EntityCreationOptions` you can suppy additional configuration via the `additionalConfig` argument. This is any kind of object that can be serialized to json and its contents are sent as part of the payload when creating the entity.

You can use `additionalConfig` to supply additional parameters that might be required by some device classes that do not have corresponding properties in the `EntityCreationOptions` class. See the examples below for more information. 

#### Remarks
When creating entities ensure
- that the domain is provided in [Home Assistant style](https://developers.home-assistant.io/docs/core/entity/) for example `binary_sensor`
- that your device class is valid for the given domain, for example see [Binary Sensor Device Classes](https://developers.home-assistant.io/docs/core/entity/binary-sensor?_highlight=device&_highlight=class#available-device-classes) Home Assistant docs

See the section below for more information on working with entity Availability.


### Setting the state of an entity

Use the `SetStateAsync()` method to set an entity's state:

```csharp
Task SetStateAsync(string entityId, string state);
```

The arguments are:
 * `entityId` the "domain.identifier" format entity ID supplied in the `CreateAsync()` method
 * `state` any string value, including a blank string


### Setting attributes on an entity

Use the `SetAttributesAsync()` method to set an entity's state:

```csharp
Task SetAttributesAsync(string entityId, object attributes);
```

The arguments are:
 * `entityId` the "domain.identifier" format entity ID supplied in the `CreateAsync()` method
 * `attributes` a concrete or anonymous object that can be serialized to json



### Working with entity availability

When you create an entity without specifying availability payloads it is assumed to be permanently available. This can be helpful when you are using the entity to store state or attributes that you will use in other automations as you don't need to worry about marking it *available* before use.


On the other hand, if you are using an entity as they were originally intended (i.e. to represent state of a physical device or sensor) then you may want to set it available and unavailable depending on the state of the hardware or device service.

This is easy to configure - all you need to do is specify the payloads that mark it as available and unavailable when you create it, then call the `SetAvailabilityAsync()` to set it's availability with one of these payloads.
To do this, set both the `PayloadAvailable` and `PayloadNotAvailable` properties on the `EntityCreationOptions` when you create the entity. For example:


```csharp
await entityManager.CreateAsync("domain.sensor", 
   new EntityCreationOptions(PayloadAvailable: "up", PayloadNotAvailable: "down"))
   .ConfigureAwait(false);
```


This configures the entity to have an _availability_ state, which you will set by passing it one of the two payloads you just defined. To set the availability, use this method:

```csharp
Task SetAvailabilityAsync(string entityId, string availability);
```

Using the above example, we can toggle a device to be available and then unavailable like this:

```csharp
await entityManager.SetAvailabilityAsync("domain.sensor", "up").ConfigureAwait(false);
await entityManager.SetAvailabilityAsync("domain.sensor", "down").ConfigureAwait(false);
```


Please carefully consider whether you need to use availability on an entity - if you enable it then it becomes your responsibility to ensure that the availability is set correctly before attempting to read or update its state or configuration. An entity that is marked unavailable is... _not available_!


### Removing entities

You can delete an entity _that has been created via this extension_ by calling the following method:

```csharp
Task RemoveAsync(string entityId);
```

The `entityId` argument has the same format as in the previous methods.


### Subscribing to command updates

Note that this method allows you to subscribe to command updates and should not be confused with the far more extensive subscription capabilities defined within the [HassModel API](v3/hass_model/hass_model.md). You would typically use this method with switches to subscribe to their "on" and "off" commands - see the examples for more info.

The method prepares an `Observable<string>` that you can subscribe to:

```csharp
Task<IObservable<string>> PrepareCommandSubscriptionAsync(string entityId);
```

To use this with a switch we can subscribe to the command and then use that to toggle the switch's state:

```csharp
(await _entityManager.PrepareCommandSubscriptionAsync(switch1Id).ConfigureAwait(false))
    .Subscribe(new Action<string>(async state =>
    {
      await _entityManager.SetStateAsync(switch1Id, state).ConfigureAwait(false)
    }));
```


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

**Pressing a switch sends a command, it doesn't set state**

When you press a switch in the Home Assistant UI it does not automatically generate a state change. Instead it sends a command that you would have to subscribe to so that you can decide whether to set its state.

If you think about a physical device switch, this makes sense: pressing a switch to on sends a command to a device to have it turn itself on. If that device successfully turns on then the switch's state is updated to reflect the state of the device.

So if you are going to respond to a switch in NetDaemon you must subscribe to its commands and then set state manually:

```csharp
  var switch1Id = "switch.switch_one";
  var onCommand = "ON";
  var offCommand = "OFF";

  // Create the switch and set its on and off commands
  await _entityManager.CreateAsync(switch1Id,
          new EntityCreationOptions(Name: "Switch One", PayloadOn: onCommand, PayloadOff: offCommand))
      .ConfigureAwait(false);

  // Subscribe to the switch command, setting the state to equal that command
  (await _entityManager.PrepareCommandSubscriptionAsync(switch1Id).ConfigureAwait(false))
    .Subscribe(new Action<string>(async state =>
    {
      await _entityManager.SetStateAsync(switch1Id, state).ConfigureAwait(false)
    }));
```


**A humidity sensor with availability and custom unit-of-measurement**

This example creates a sensor that uses "up" and "down" to mark its availability, and records the level of rain in terms of milimetres per hour. It takes advantage of the Availability payloads, a specific device class ("humidity") and a custom additional-config.

Finally, we set the sensor as being available and record three different measures.

```csharp
var rainNexthour4Id = "sensor.rain_nexthour4";
await _entityManager.CreateAsync(rainNexthour4Id, new EntityCreationOptions(
  Name: "Rain Next Hour4",
  DeviceClass: "humidity",
  PayloadAvailable: "up",
  PayloadNotAvailable: "down"
  ),
new { 
  unit_of_measurement = "mm/h" }
).ConfigureAwait(false);

await _entityManager.SetAvailabilityAsync(rainNexthour4Id, "up").ConfigureAwait(false);
await _entityManager.SetStateAsync(rainNexthour4Id, "11").ConfigureAwait(false);
await _entityManager.SetStateAsync(rainNexthour4Id, "7").ConfigureAwait(false);
await _entityManager.SetStateAsync(rainNexthour4Id, "1").ConfigureAwait(false);
```

**Remove an entity**

```csharp
await _entityManager.RemoveAsync("sensor.my_id").ConfigureAwait(false);
```
