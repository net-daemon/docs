---
id: hass_model_generated_entities
title: Using generated entities
---

After generating code from Home Assistant with `nd-codegen` you can use a strongly typed API to work with entities in Home Assistant. The entities can be accessed like this:

```csharp
_myEntities = new Entities(haContext);

// ..

LightEntity livingRoomLight = _myEntities.Light.LivingRoomLight;
```

`Entities` is a generated class that provides access to all your entities in Home Assistant. The object returned by `_myEntities.Light.LivingRoomLight` is of type `LightEntity` which is also generated. This specific instance represents the `light.living_room_light` entity in Home Assistant.

The LightEntity class provides strongly typed access to the state and attributes of the entity like:

```csharp
if (livingRoomLight.State == "on" && livingRoomLight.Attributes.Brightness > 100) // ...
```

:::tip

You can also check for "on" or "off" states using the Extension Methods `IsOn()` and `IsOff()`

:::

It also allows you to respond to state change events of the entity via the StateAllChanges and StateChanges methods.

```csharp
livingRoomLight.StateAllChanges()
    .Where(s => s.Old?.Attributes.Brightness < 128 
             && s.New?.Attributes.Brightness >= 128)
    .Subscribe(e => HandleBrighnessUp());
```

The code generator will create a class for each domain in Home Assistant that has entities. As an example, for the `climate` domain there is a class `ClimateEntity` and for the `sensor` domain there is a class `SensorEntity`. These classes all derive from the built-in base class `Entity<TEntity, TEntityState, TAttributes>`.
