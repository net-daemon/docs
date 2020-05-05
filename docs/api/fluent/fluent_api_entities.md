---
id: entities
title: Entities
---
## Entity and Entities selection

To select what entity you want to perform actions on use the `Entity()` or `Entities()` starting point.
The examples does not use `ConfigureAwait(false)` but can be used for even more efficency in the async context switching.

### Simple selection

**Example 1: Selects one entity to perform action on**

```csharp
await Entity("light.light1").TurnOn().ExecuteAsync();
```

This selects the `light.light1` to perform the `TurnOn` action on. A full fluent API command ends with `ExecuteAsync()` that execute the command now.

**Example 2: Selects multiple entities to perform action on**
Here we have several options to turn on both light1 and light2.

```csharp
await Entity("light.light1", "light.light2").TurnOn().ExecuteAsync();
```

This one takes a `IEnumerable<string>` as input to selects multiple lights

```csharp
await Entities(new string[]{"light.light1", "light.light2"}).TurnOn().ExecuteAsync();
```

**Example 3: Selects multiple entities to perform action on using lambda**

You can also use lambda expressions to select entities like select all lights that start name with `light.kitchen_`. Now it gets really interesting to use advanced selections with little code using LINQ.

```csharp
await Entities(n => n.EntityId.StartsWith("light.kitchen_")).TurnOn().ExecuteAsync();
```
or select on attributes

```csharp
await Entities(n => n.EntityId.StartsWith("light.kitchen_")).TurnOn().ExecuteAsync();
```
## Using Areas

Turn on all lights in the kitchen area:

```csharp
Entities(n => n.Area == "kitchen" && n.EntityId.StartsWith("light.")).TurnOn().ExecuteAsync();
```

## Special entities

There are some entities that has native support in the API.

### MediaPlayer

Media player has support for the most common service calls through the FluentAPI.

Example:

```csharp
await MediaPlayer("media_player.myplayer").Play().ExecuteAsync();
await MediaPlayer("media_player.myplayer").Stop().ExecuteAsync();
await MediaPlayer("media_player.myplayer").PlayPause().ExecuteAsync();
await MediaPlayer("media_player.myplayer").Pause().ExecuteAsync();
```

The same multiple selections with `IEnumerable<string>` and lambdas are supported like the `Entities`
Lambdas can be used on states and attributes too. Like stop all media players currently playing something:

```csharp
await MediaPlayers(n => n.State == "playing").Stop().ExecuteAsync();
```

### InputSelect

Todo: document input_select
