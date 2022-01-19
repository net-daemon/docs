---
id: api_gen_entities
title: Generated entities
---

## Get started

This is how you use the auto generated entities in NetDaemon.

1. Turn on enitity generation, You need to turn on generation of entities. If you run docker use the `HASS_GEN_ENTITIES=True` environment var or if you use Home Assistant add-on use the setting `generate_entities: true`.
2. Restart NetDaemon once for the entities to be generated.
3. Two genreated files will be created. Use the new api in the file `_EntityExtensionsRx.cs` that will be created in app folder.
4. Inherit from `GeneratedAppBase`instead of default `NetDaemonRxApp` and add a `using Netdaemon.Generated.Reactive;`to the app file.

## Using the entities

Now you can do several things. All entities has TurnOn/TurnOff/Toggle. All other will inherit the service calls from the domain generated.

All services with a entity_id parameter will be added automatically. Rest you need to add. See examples below.

Examples:

```csharp

    // Your remotes
    Remote.Livingroom.TurnOn(new {activity="TV"});

    // You can also get states
    Log(Remote.Tvrummet.State);

    // Media players id added in the background
    MediaPlayer.House.MediaPlayPause();

```