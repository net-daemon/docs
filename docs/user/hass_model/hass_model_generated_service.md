---
id: hass_model_generated_service
title: Using generated services
---

After generating code from Home Assistant with `nd-codegen` you can use a strongly typed API to call services in Home Assistant. This can be done via the generated entity classes or by using the generated `Services` class.

## Call services via typed entity classes

The code generator generates a class for each domain that has entities in Home Assistant. For each service in Home Assistant that accepts an entity of that domain there is also a generated extension method for that `Entity` class. This allows services to be called like this:

```csharp
_myEntities = new Entities(haContext);

// ...

_myEntities.Light.LivingRoomLight.TurnOn(brightness: 100, colorTemp: 80);

_myEntities.Climate.AtticHeater.SetHvacMode(hvacMode:"off")

```

The service methods have parameters that corresponds to the fields that are required by the service. Optional fields are provided as optional parameters so they can be skipped by using named parameters for the ones that are used.

## Using the generated Services class

The generated code also contains a class `Services`. This class provides access to all the services in Home Assistant. The `Services` class needs an `IHaContext` in its constructor to access Home Assistant. From there, the services are available as methods grouped by their domain.

Example:

```csharp
_services = new Services(haContext);

// ...

_services.PersistentNotification.Create(
    message: "NetDaemon Application started", 
    title: "Awesome!");

_services.Climate.SetTemperature(
    ServiceTarget.FromEntity("climate.bathroom"),
    temperature: 20.5);

_services.Light.TurnOn(ServiceTarget.FromEntities("light.livingroom_light", "light.diner"),
    brightness: 100,
    colorTemp: 80);

```

Just as with the extension methods on the `Entity` classes, these methods have parameters that correspond to the fields of the service in Home Assistant.

 If the service requires a target, the generated method will also contain a parameter of type 'ServiceTarget' that can be used to pass one or more entities, areas or devices.
