---
id: hass_model_events
title: Home Assistant events 
---

Home Assistant has a generic event mechanism. Using HassModel you can respond to events as well as trigger events in Home Assistant

## Respond to Events
All events in Home Assistant are made available to your apps as an `IObservable<Event>` via the `Events` property of the `IHaContext` interface.

```csharp
ha.Events.Where(e => e.EventType == "zha_event").Subscribe(e => { /*...*/ });
```

The event has a `public JsonElement? DataElement` property that contains the payload of the event. 

To make it easy to listen to a specific type of event and handle the payload via a typed class you can use the `Filter` extension method. It will filter events on the event_type and deserialize the payload into a specified type ready for use.

```csharp
ha.Events.Filter<ZhaEventData>("zha_event")
         .Where(e => e.Data?.DeviceIeee == id && e.Data.Command == "shake")
         .Subscribe(HandleCubeShaked);


record ZhaEventData
{
    [JsonPropertyName("device_ieee")] public string? DeviceIeee { get; init; }
    [JsonPropertyName("unique_id")] public string? UniqueId { get; init; }
    [JsonPropertyName("endpoint_id")] public int? EndpointId { get; init; }
    [JsonPropertyName("cluster_id")] public int? ClusterId { get; init; }
    [JsonPropertyName("command")] public string? Command { get; init; }
    [JsonPropertyName("args")] public JsonElement? Args { get; init; }
}
```

## Triggering Events
Sending an event is also very easy. `IHaContext` has a `SendEvent` method with just two arguments, the event_type and the data to send

```csharp
ha.SendEvent("custom_event", new { mode="Standby", duration = 200 });
```

The payload wil be JsonSerialized using `System.Text.Json` it can be an anonymous type or any other type that serializes to the desired Json payload
