---
id: api_entities
title: Use Entities
---
## Entity and Entities selection

To select what entity you want to perform actions on use the `Entity()` or `Entities()` starting point. Some service calls are built-in to the Entity selections, like turn_on / turn_off.


### Simple selection

**Example 1: Selects one entity to perform action on**

```csharp
Entity("light.light1").TurnOn();
```

If you want to add attributes to the call service just do:

```csharp
Entity("light.light1").TurnOn(new {brightness = 100});
```

it is important that you use the lower case names of attributes when adding them in anonymous types.

This selects the `light.light1` to perform the `TurnOn` service calls on.

**Example 2: Selects multiple entities to perform action on**
Here we have several options to turn on both light1 and light2.

```csharp
Entity("light.light1", "light.light2").TurnOn();
```

This one takes a `IEnumerable<string>` as input to selects multiple lights

```csharp
Entities(new string[]{"light.light1", "light.light2"}).TurnOn();
```

**Example 3: Selects multiple entities to perform action on using lambda**

You can also use lambda expressions to select entities like select all lights that start name with `light.kitchen_`. Now it gets really interesting to use advanced selections with little code using LINQ.

```csharp
Entities(n => n.EntityId.StartsWith("light.kitchen_")).TurnOn();
```
or select on attributes like example below.

```csharp
Entities(n => n.Attributes.brightness > 100).TurnOff();
```
## Using Areas

Turn on all lights in the kitchen area:

```csharp
Entities(n => n.Area == "kitchen" && n.EntityId.StartsWith("light.")).TurnOn();
```

## Special entities

There are no special entities implmented in V2 yet. To use media player features as an example you will have to use CallService.

