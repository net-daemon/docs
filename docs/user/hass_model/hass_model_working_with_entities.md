---
id: hass_model_working_with_entities
title: Working with entities
---

# Working with Entities

Entities are the core data structures of Home Assistant. In NetDaemon an entity is represented by the `Entity` class.

The `Entity` class provides access to the entity's current state, attributes, and state change events. It also provides a way to call services that take the entity as a target.

## Accessing Entities

The basic way to create an instance of an `Entity` is by calling its constructor:

```csharp
var atticLight = new Entity(haContext, "light.attic");
```

:::note

This does not create a new entity in Home Assistant. It creates an instance of the NetDaemon `Entity` class to interact with an existing Home Assistant entity.

:::

 An alternative way to do this is by using the `Entity` extension method on your `IHaContext`:

```csharp
var atticLight = haContext.Entity("light.attic");
```

When using the code generator all discovered entities in your Home Assistant will be generated as strongly typed properties that can be accessed like this:

```csharp
var myEntities = new Entities(haContext);

var atticLight = myEntities.Light.Attic;
```

## State

Entities in Home Assistant have a state property and a set of attributes. NetDaemon makes these available via the `Entity.State` and `Entity.Attributes` properties.

:::note

Accessing these properties does *NOT* involve calling Home Assistant to retrieve the current state. Instead NetDaemon subscribes to Home Assistant's state_changed event when it starts and keeps an internal cache of the states of all entities in memory.

:::

The current state value of an entity can be retrieved as a string like this:

```csharp
var state = atticLight.State;
```

Some entities, like many sensors, have numeric state values. You can create a `NumericEntity` and use its `State` property of type `double` to avoid manual parsing:

```csharp
var temperatureSensor = new NumericEntity(haContext, "sensor.bathroom_temperature");

if (temperatureSensor.State > 20.5) // ...
```

## Attributes

The `Entity` class also provides access to the entity's attributes. Each entity or set of entities can have its own set of attributes with their own data types. The generic `Entity<TAttributes>` class provides a convenient way to access them in a type safe manner.

For instance a zone entity has the following attributes:

```yaml
latitude: 40.657722371758105
longitude: -74.10552978515626
radius: 12280.977677710147
passive: false
editable: true
friendly_name: New York
icon: mdi:map-marker
```

To use these attributes with type safety you can provide a class that can JSON-deserialize the attributes into properties:

```csharp
record ZoneAttributes
{
    public double latitude { get; init; }
    public double longitude { get; init; }
    public double radius { get; init; }
    public string? friendly_name { get; init; }
    public string? icon { get; init; }
}
```

It can then be used like this:

```csharp
var zone = new Entity<ZoneAttributes>(haContext, "zone.new_york");

double latitude = zone.Attributes.latitude;
double longitude = zone.Attributes.longitude;
```

When using the code generator, a class derived from `Entity<TAttributes>` will be generated for each domain in Home Assistant. Each generated class contains all of the unique entity attributes for that domain.

## State Changes

The API uses a fluent syntax to handle state changes. This is based on .Net's Reactive Extensions.

:::note

If you are unfamiliar with reactive programming it is strongly recommended to read about the basics using one of these resources:

- [Lee Campbell - Introduction to Rx](http://introtorx.com/)
- [ReactiveX - Introduction](https://reactivex.io/intro.html)
- [Microsoft Learn - Reactive Extensions](https://learn.microsoft.com/previous-versions/dotnet/reactive-extensions/hh242985(v=vs.103))
- [Reactive Extensions on GitHub - A Brief Intro](https://github.com/dotnet/reactive#a-brief-intro)

:::

Let´s start with a basic example. If a motion sensor's state turns to `"on"`, turn on a light.

```csharp
myEntities.binary_sensor.my_motion_sensor
    .StateChanges()
    .Where(e.New?.State == "on")
    .Subscribe(s => myEntities.light.Attic.TurnOn());
```

So what is going on here? Let's step through the lines:

1. `myEntities.binary_sensor.my_motion_sensor` selects the entity you want track changes from.
2. `.StateChanges()` creates a `IObservable<T>` from `System.Reactive`, where `T` is a NetDaemon `StateChange`.
3. `.Where(e.New?.State == "on")` uses a predicate to filter state changes to only react those where the `Entity`'s new `State` equals `"on"`.
4. `.Subscribe(s => myEntities.light.Attic.TurnOn());` subscribes to the filtered `IObservable<T>` to react to state changes with the provided lambda. In this case it calls the generated service to turn on a light using Home Assistant.

:::tip

To get all changes including attributes, use `StateAllChanges` instead of `StateChanges`.

:::

If the old state is relevant then the filter could be modified like this:

```csharp
myEntities.BinarySensor.MyMotionSensor
    .StateChanges()
    .Where(e => e.New?.State == "on" && e.Old?.State == "off")
    .Subscribe(s => myEntities.Light.Attic.TurnOn());
```

You can use any combination of state and attributes, or even external methods in the lambda expressions. For example:

```
When the Sun's new elevation is below 3.0, 
and it is not rising, 
and the old elevation is above 3.0, 
then we should turn on a light. 
```

This uses `StateAllChanges` so we can observe attribute changes:

```csharp
myEntities.Sun.Sun
    .StateAllChanges()
    .Where(e =>
        e.New?.Attributes.Elevation <= 3.0 &&
        e.New?.Attributes.Rising == false &&
        e.Old?.Attributes.Elevation > 3.0)
    .Subscribe(s =>
    {
        // Do some logic and stuff here.
        myEntities.light.attic.TurnOn();
    });
```

You may want to wait for an entity to remain in a state for a specific amount of time before reacting. An example would be waiting for a motion sensor to be in the `"off"` state for 5 minutes. The `WhenStateIsFor` extension method can be used here:

```csharp
myEntities.BinarySensor.MyMotionSensor
    .StateChanges()
    .WhenStateIsFor(s => s?.State == "off", TimeSpan.FromMinutes(5), scheduler)
    .Subscribe(s => myEntities.Light.Attic.TurnOff());
```

`WhenStateIsFor` takes a predicate as its first argument, and a `TimeSpan` as the second argument. The predicate declares the entity state we want to react to, and the `TimeSpan` declares how long we want the entity to be in that state before reacting.

As a thrid argument we want to pass an instance that implements `IScheduler`. No need to call any methods on the instance before passing it as an argument. Passing a scheudler ensures that the events stops when the app is stopped. It's also useful to inject a TestScheduler for unit tests. 
To learn more about Scheduler please see [scheduling](user/extensions/scheduling.md).

In this case we want to wait for a motion sensor's state to change to `"off"`, remain in that state for 5 minutes, and then turn off a light. Each time the state changes the wait resets.

:::note

The predicate used by NetDaemon's `WhenStateIsFor` receives an `EntityState`, rather than a `StateChange` as used by `System.Reactive`'s `Where` used previously.

:::

## Call Services on an Entity

Many services in Home Assistant take an entity ID as their target. When you have an instance of an entity you can use it directly to call such a service:

```csharp
light1.CallService("turn_on", new { brightness = 100 } );
```

The second argument is the data that will be JSON-serialized and passed with the service call. This can be any type as long as it has properties that match the arguments of the service. That includes strongly typed objects or anonymous ones.

An `IEnumerable` of entities that have the same domain can also be the source of the service call:

```csharp
var downstairsLights = new [] {
     haContext.Entity("light.living"), 
     haContext.Entity("light.kitchen") };

downstairsLights.CallService("turn_on", new { brightness = 100 } );
```

This will make a single call to Home Assistant's `light.turn_on` service on both entities.

The code generator also creates `Entity` extension methods for all services that take a specific type of entity as their target. `LightEntity` for example has the `TurnOn` extension method:

```csharp
myEntities.Light.Attic.TurnOn(transition: 50, brightnessPct: 50);
```

Extension methods are also created for the corresponding `IEnumerable<T>`, such as for `IEnumerable<LightEntity>`:

```csharp
var downstairsLights = new [] {
     myEntities.Light.Living, 
     myEntities.Light.Kitchen };

downstairsLights.TurnOn(transition: 50, brightnessPct: 50);
```

`CallService` and the generated extension methods are non-blocking fire-and-forget calls. They send a message to Home Assistant using a websocket connection. Your application code does not need to await this async call, NetDaemon does that internally and will log any exceptions to the configured logger.

:::info

Home Assistant service calls do not provide return values, they only change state and throw exceptions. NetDaemon does not currently provide an asynchronous service call method to react to these errors (such as `HomeAssistantError` and `ValueError`).

It is usually the job of integrations to handle errors, retry attempts, and set the `available` property of entities. This is a part of their [Integration Quality Scale](https://developers.home-assistant.io/docs/integration_quality_scale_index/) score.

:::
