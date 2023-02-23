---
id: hass_model_generated_entities
title: Using generated entities
---

After generating code from Home Assistant with `nd-codegen` you can use a strong typed API to work with Entities in Home Assistant. These entities can be accessed like this

```csharp
_myEntities = new Entities(haContext);

// ..

LightEntity livingRoomLight = _myEntities.Light.LivingRoomLight;
```

`Entities` is a generated class that provides acces to all your entities in Home Assistant. The object returnd by `_myEntities.Light.LivingRoomLight` is of type `LightEntity` which is also generated. This specific instance represents the `light.living_room_light` entity in Home Assistant.

The LightEntity class provides strong typed access to the state and attributes of this entity like 

```csharp
if (livingRoomLight.State == "on" && livingRoomLight.Attributes.Brightness > 100) // ...
```

:::info
You can also check for "on" or "off" states using the Extension Methods `IsOn()` and `IsOff()`
:::

It also allows you to respond to state change events of the entity via the StateAllChanges and StateChanges methods.

```csharp
livingRoomLight.StateAllChanges()
    .Where(s => s.Old?.Attributes.Brightness < 128 
             && s.New?.Attributes.Brightness >= 128)
    .Subscribe(e => HandleBrighnessUp());
```

The code generator will create a class for each domain in Home assitant that has entities. eg. for the `climate` domain there is a class `ClimateEntity` and for the `sensor` domain there is a class `SensorEntity`. These classes all derive from the build in base class `Entity<TEntity, TEntityState, TAttributes>`. 