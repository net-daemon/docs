---
id: hass_model_working_with_entities
title: Working with entities
---

# Working with Entities

Entities are the core data structures of Home Assistant. In NetDaemon an Entity is represented by the `Entity` class. 

The Entity class provides access to the Entities current state and attributes, as well as the state change events of the Entity. It also has a way to call Services that take the Entitiy as a target.

## Creating Entities

The basic way to create an Entitiy is just by creating one using its constructor

```csharp
var atticLight = new Entity(haContext, "light.attic");
```

or alteratively by using this extension method on IHaContext

```csharp
var atticLight = haContext.Entity("light.attic");
```

When using the code generator all discoverd Entities in your Home Assistant will be generated as strong typed properties that can be accessed like this.

```csharp
var myEntities = new Entities(haContext);
/// ...

var atticLight = myEntities.Light.Attic;
```

## State
The current state value can be retrieved as a string value like this

```csharp
var state = light1.State;
```

Some entities like many Sensors, have numeric state values. To make it easier to work with them without manually pasing the state, you can use a `NumericEntity` which has a `double` `State` property.

```csharp
var temperatureSensor = new NumericEntity(haContext, "sensor.bathroom_temperature");

if (temperatureSensor.State > 20.5) // ...
```

## Attributes
The Entity class also provides access to the Entities attributes. Each Entity, or set of Entites can have its own set of attributes with their datatypes. The generic `Entity<TAttributes>` class provides a convenient way to acces them in a type safe manner.

For instance a Zone Entity has the folowing attributes
```yaml
latitude: 40.657722371758105
longitude: -74.10552978515626
radius: 12280.977677710147
passive: false
editable: true
friendly_name: New York
icon: mdi:map-marker
```

In order to use these atributes type safely, you can provide a class that can Json-deserialize these attributes into properties. eg:

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
and then use it like this:

```csharp
var zone = new Entity<ZoneAttributes>(haContext, "zone.new_york");

double latitude = zone.Attributes.latitude;
double longitude = zone.Attributes.longitude;
```

When using the code generator, a class derived from `Entity<TAttributes>` will be generated for each domain in Home Assitant. And along with it, a generated class with all the unique Attributes of the Entities of that domain.

## State Changes
The API lets you manage state very easy. This is based on System.Reactive. I will only do basic things here but please read up on [System.Reactive](http://introtorx.com/) to learn the true power of this way of handling events.

Let´s start with a very basic example. If the motion sensors state turns to "on", turn on the `light.attic` light.

```csharp
myEntities.binary_sensor.my_motion_sensor
    .StateChanges()
    .Where(e.New?.State == "on")
    .Subscribe(s => myEntities.light.Attic.TurnOn());
```

So what is going on here? First statement, `myEntities.binary_sensor.my_motion_sensor` selects the entity you want track changes from. The `Where(e.New?.State == "on")` tracks state changes for new events that are getting the state `on`. And finally, `.Subscribe(s => myEntities.light.Attic.TurnOn());` subscribes to the changes and calls the code if the where clause is met. In this case it calls turn on service on the light entity. `StateChanges`checks if the `New.State != Old.State`. To get all changes including the attribute changes, please use `StateAllChanges` instead of `StateChanges`.

If the previous state is important then use it like:

```csharp
myEntities.BinarySensor.MyMotionSensor
    .StateChanges()
    .Where(e.New?.State == "on" && e.Old?.State == "off")
    .Subscribe(s => myEntities.Light.Attic.TurnOn());
```

Or even more advanced example. You can use any combination of state and attributes or even external methods in the lambda expressions. Here is an example: When sun elevation below 3.0 and not rising and old state elevation is above 3.0 then we should turn on light. This uses the `StateAllChanges` since we want all changes to the elevation attribute.

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

## Call services on an Entity
Many services in Home Assitant take an Entity Id's as their target. When you hava an instance of an entity you can use it directly to call such a Service.

```csharp
light1.CallService("turn_on", new { brightness = 100 } );
```

The second argument is the data that is passed with the service call. This can be an object that will be Json-serialized as the service data. You can use an anonymous type for this or any other type that has properties that match the arguments of the service.

The code genrator also provides extension methods for all services that take a specific type of Entity as their target.

```csharp
myEntities.Light.Attic.TurnOn(transition: 50, brightnessPct: 50);
```