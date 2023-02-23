---
id: call_ha_api
title: Calling Home Assistant API
---

NetDaemon provides an interface that helps you make Home Assistant API calls.

To use it, inject the `IHomeAssistantApiManager` interface in your apps.

```csharp
[NetDaemonApp]
public class UsingApiCallsApp : IAsyncInitializable
{
    private readonly IHomeAssistantApiManager _apiManager;
    public UsingApiCallsApp(IHomeAssistantApiManager apiManager)
    {
        _apiManager = apiManager;
    }

    public async Task InitializeAsync(CancellationToken cancellationToken)
    {
        // Use your extension method defined below
        var entityState = await _apiManager.MyGetEntityStateAsync("light.my_light", cancellationToken);
    }
}
```

It is nice to add extension methods onto `IHomeAssistantApiManager` as shown below:

```csharp
    /// <summary>
    ///     Get the current state for a entity
    /// </summary>
    /// <param name="apiManager">ApiManager to extend</param>
    /// <param name="entityId">Id of the event</param>
    /// <param name="cancellationToken">Token to cancel async operation</param>
    public static async Task<HassState?> MyGetEntityStateAsync(this IHomeAssistantApiManager apiManager, string entityId,
        CancellationToken cancellationToken)
    {
        var apiUrl = $"states/{HttpUtility.UrlEncode(entityId)}";

        return await apiManager.GetApiCallAsync<HassState>(apiUrl, cancellationToken);
    }
```

There is also the ability to post data and receive a result:

```csharp
/// <summary>
    ///     Get the current state for a entity
    /// </summary>
    /// <param name="apiManager">ApiManager to extend</param>
    /// <param name="entityId">Id of the event</param>
    /// <param name="state">The state to set</param>
    /// <param name="attributes">Attributes</param>
    /// <param name="cancellationToken">Token to cancel async operation</param>
    /// <remarks>
    ///     This sets the state of a device within Home Assistant
    ///     and will not communicate with the actual device. To communicate with the device
    ///     use service calls. To persist devices use the NetDaemon integrations and its service calls.
    /// </remarks>
    public static async Task<HassState?> MySetEntityStateAsync(this IHomeAssistantApiManager apiManager, string entityId,
        string state, object? attributes, CancellationToken cancellationToken)
    {
        var apiUrl = $"states/{HttpUtility.UrlEncode(entityId)}";

        var data = new
        {
            state, attributes
        };
        return await apiManager.PostApiCallAsync<HassState>(apiUrl, cancellationToken, data);
    }
```
