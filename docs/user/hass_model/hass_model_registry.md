---
id: hass_model_registry
title: Registry API
---

The Registry API let you handle entities, floors, areas, labels and devices in Home Assistant.


:::note

This is an alpha feature and you need the latest alpha version of NetDaemon to use it.
It will be released evenutally in a stable version but expext the API to change before release.
The docs will be updated with more examples and details when the API is stable.
:::

To use the new API you need to inject the new `IHaRegistry` interface in your app.

See the example app below for how to use the new API:
```csharp
[NetDaemonApp]
public sealed class RegistryApp
{
    public RegistryApp(IHaRegistry haRegistry)
    {
        var floor = haRegistry.GetFloor("upstairs");
        var upstairsAreas = floor.Areas;
        var upstairsBooleans = upstairsAreas
            .SelectMany(n => n.Entities
                .Where(x => x.EntityId.StartsWith("input_boolean.")));

        upstairsBooleans.ToList().ForEach(x => x.CallService("toggle"));
    }
}
```

You can also use the newly added properties in the ServiceTarget class to target floor, areas, labels 
and devices in your service calls. We will eventually make a nicer API for this but for now 
you can use the ServiceTarget class directly.

```csharp
[NetDaemonApp]
public sealed class TestServiceTargetApp
{
    public TestServiceTargetApp(IHaContext ha)
        ha.CallService("input_boolean", "toggle", new ServiceTarget{ FloorIds = ["upstairs"] });
    }
}
```
