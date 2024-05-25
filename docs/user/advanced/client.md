---
id: advanced_client
title: Client API
---
While the recommended way to interact with Home Assistant is through the AppModel and HassModel API, there are scenarios where direct interaction with Home Assistant is required. The Client APIs offer a convenient method for lower-level interactions with Home Assistant.


## IHomeAssistantConnection
You can access the client API through the `IHomeAssistantConnection` interface on the existing connection.
This can be injected into a NetDaemon app's constructor. Most methods in this interface are asynchronous, so you need to implement 
the `IAsyncInitializable` interface to use them in the `InitializeAsync` method. 
Refer to how to [use async features](/user/advanced/async_features.md) for more details on using 
async in the subscribe method. Don't forget to include the `NetDaemon.Client.HomeAssistant.Extensions` namespace to access extended features.

```csharp
using NetDaemon.AppModel;
using NetDaemon.Client;
using NetDaemon.Client.HomeAssistant.Extensions;

namespace Apps;

[NetDaemonApp]
public sealed class HelperApp(IHomeAssistantConnection conn) : IAsyncInitializable
{
    private readonly IHomeAssistantConnection _conn = conn;

    public async Task InitializeAsync(CancellationToken cancellationToken)
    {
        // Use the connection to call Home Assistant features here...
    }
}

```
## IHomeAssistantRunner

If you need to implement a solution that only requires connecting to Home Assistant and utilizing basic NetDaemon features without the full
app model, you can use the `IHomeAssistantRunner` interface. This interface handles connection and reconnection to Home Assistant.

Add the client NuGet package to your application and use the `HomeAssistantRunner` class to connect to Home Assistant. 
The `AddHomeAssistantClient` extension method can be used to add the client to dependency injection.

Example: Implementation of a background service that uses the `IHomeAssistantRunner` to connect to Home Assistant and subscribe to all events.

```csharp
internal sealed class MyOwnService : BackgroundService
{
    private const int TimeoutInSeconds = 5;

    private readonly IHomeAssistantRunner _homeAssistantRunner;

    private readonly IHostApplicationLifetime _hostLifetime;

    private CancellationToken? _cancelToken;
    private IHomeAssistantConnection? _connection;

    public MyOwnService(
        IHostApplicationLifetime hostLifetime,
        IHomeAssistantRunner homeAssistantRunner,
    {
        _hostLifetime = hostLifetime;
        _homeAssistantRunner = homeAssistantRunner;

        // When ever the client is connected it will trigger the OnConnect
        homeAssistantRunner.OnConnect
            .Select(async s => await OnHomeAssistantClientConnected(s).ConfigureAwait(false))
            .Subscribe();

        // When ever the client is disconnected it will trigger the OnDisconnect
        homeAssistantRunner.OnDisconnect.Subscribe(OnHomeAssistantClientDisconnected);
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        _cancelToken = stoppingToken;
        await _homeAssistantRunner.RunAsync(
            "localhost",
            8123,
            false,
            "YOUR_LONG_LIVED_ACCESS_TOKEN",
            TimeSpan.FromSeconds(TimeoutInSeconds),
            stoppingToken).ConfigureAwait(false);

        // Stop application if this is exited and use _cancelToken as token
        _hostLifetime.StopApplication();
    }

    private async Task OnHomeAssistantClientConnected(IHomeAssistantConnection connection)
    {
        // First you need to tell Home Assistant to subscribe to events
        var hassEvents = await connection.SubscribeToHomeAssistantEventsAsync(null, _cancelToken ?? CancellationToken.None).ConfigureAwait(false);

        // We subscribe to the events that Home Assistant sends and handle them in the HandleEvent method
        hassEvents.Subscribe(HandleEvent);

    }

    private void OnHomeAssistantClientDisconnected(DisconnectReason reason)
    {
        // Here you would typically cancel and dispose any functions
        // using the connection
        if (_connection is not null) _connection = null;
    }

    private void HandleEvent(HassEvent hassEvent)
    {
        switch (hassEvent.EventType)
        {
            case "state_changed":
                var state = hassEvent.ToStateChangedEvent();
                // Do something with the state
                break;
        }
    }
}
```
