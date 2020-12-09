---
id: api_state
title: State management
---


## Get current state

NetDaemon keeps track of states in the background. Getting state is not doing a networking call. States are dynamic values calculated from origin value like double->int->bool->string... The "unavailable" state are null value of the State.

```csharp
string? state = State("light.light1")?.State;
if (state is object)
{
    // Not null
    ...
}

// Get state attributes, returns null if not exist
var brightness = State("light.light1").Attribute?.brightness;

```

## State changes

The API let you manage state very easy. This is based on the System.Reactive. I will only do basic things here but please read up on [System.Reactive](http://introtorx.com/) to learn the true power of this way of handling events.

Let´s start with a very basic example. If the motion sensors state turns to "on", turn on the `light.light1` light. .

```csharp
Entity("binary_sensor.my_motion_sensor")
    .StateChanges
    .Where(e.New?.State == "on")
    .Subscribe(s => Entity("light.light1").TurnOn());
```

So what is going on here? First statement, `Entity("binary_sensor.my_motion_sensor")` selects the entity you want track changes from. The `Where(e.New?.State == "on")` tracks state changes for new events that are getting the state `on`. And finally, `Subscribe(e => Entity("light.light1").TurnOn()` subscribe to the changes and call the code if the where clause is met. In this case it calls turn on service on the ligt entity. `StateChanges`checks if the `New.State != Old.State`. To get all changes inkluding the attribut changes, please use `StateAllChanges` instead of `StateChanges`.

If the `from` state is important then use it like:

```csharp
Entity("binary_sensor.my_motion_sensor")
    .StateChanges
    .Where(e.New?.State == "on" && e.Old?.State=="off")
    .Subscribe(s => Entity("light.light1").TurnOn());
```

Or even more advanced example. You can use any combination of state and attributes or even external methods in the lambda expressions. Here is an example: When sun elevation below 3.0 and not rising and old state elevation is above 3.0 then we should turn on light. This uses the `StateAllChanges` since we want all changes to the elevation attribute.

```csharp
Entity("sun.sun")
    .StateAllChanges
    .Where(e =>
        e.New?.Attribute?.elevation >= 3.0 &&
        e.New?.Attribute?.rising == true &&
        e.Old?.Attribute?.elevation < 3.0)
    .Subscribe(s =>
    {
        // Do some logic and stuff here.
        Entity("light.light1").TurnOn();

    });
```

### Use the observable stream directly
The `Entity/Entities` notation is just a shortcut for the observable stream of state changes. You can use the observable directly. Like this example, selects all events where any entity is turned on.

```csharp
    StateChanges // or StateAllChanges
        .Where(e=> e.New.?State == "on")
        .Subscribe(s=>...);

```

## Set state of custom entities
It is possible to set state of entities that are not in Home Assistant. If the entity does not exist, Home Assistant will create it. Note that these are not real entities and they will not persist during restarts of HA.
```csharp
   SetState("sensor.custom", "on", new { attr = "myattr" });
```

## Using Areas

NetDaemon does match the area where the entity´s device is configured. This means it is very easy to do selections on what area that matches.

All binary sensors (PIRS) in the kitchen turn on the light:

```csharp
Entities(n => n.Area == "kitchen" && n.EntityId.StartsWith("binary_sensor."))
    .StateChanges
    .Where(e=> e.New.?State == "on")
    .Subscribe(s =>
    {
        // Turn on all lights in area kitchen
        Entities(n => n.Area == "kitchen" && n.EntityId.StartsWith("light.")).TurnOn();
    });
```



