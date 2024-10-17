---
id: hass_model_generated_entities
title: Using generated entities
---

After generating code from Home Assistant with `nd-codegen` you can use a strongly typed API to work with entities in Home Assistant. The Entities can be injected into your app  like this:


```csharp
[NetDaemonApp]
class MyApp
{
    public MyApp(Entities entities)
    {
        LightEntity livingRoomLight = entities.Light.LivingRoomLight;
        // ..
    }
}
```


`Entities` is a generated class that provides access to all your entities in Home Assistant. The object returned by `Entities.Light.LivingRoomLight` is of type `LightEntity` which is also generated. This specific instance represents the `light.living_room_light` entity in Home Assistant.


It is also possible to directly inject eg the LightEntities class


```csharp
[NetDaemonApp]
class MyApp
{
    public MyApp(LightEntities lightEntities)
    {
        LightEntity livingRoomLight = lightEntities.LivingRoomLight;
        // ..    
    }
}
```


:::note

To inject the generated types, make sure you call `AddHomeAssistantGenerated()` in your startup code.

:::


Alternatively you can create an instance of the generated `Entities` class via its constructor that takes the IHaContext. 
```csharp
_myEntities = new Entities(haContext);

// ..

LightEntity livingRoomLight = _myEntities.Light.LivingRoomLight;
```


The LightEntity class provides strongly typed access to the state and attributes of the entity like:

```csharp
if (livingRoomLight.State == "on" && livingRoomLight.Attributes.Brightness > 100) // ...
```

:::tip

You can also check for "on" or "off" states using the Extension Methods `IsOn()` and `IsOff()`

:::

It also allows you to respond to state change events of the entity via the StateAllChanges and StateChanges methods.

```csharp
kitchenLight.StateAllChanges()
    .Where(s => s.Old?.Attributes?.Brightness < 128 
             && s.New?.Attributes?.Brightness >= 128)
    .Subscribe(e => HandleBrightnessUp());
```

The code generator will create a class for each domain in Home Assistant that has entities. As an example, for the `climate` domain there is a class `ClimateEntity` and for the `sensor` domain there is a class `SensorEntity`. These classes all derive from the built-in base class `Entity<TEntity, TEntityState, TAttributes>`.
