---
id: advanced_client
title: Client API
---

The recommended way to interact with Home Assistant is to use the AppModel and HassModel API. 
However, there are some cases where you might want to interact with Home Assistant directly. 
The Client APIs provides a convenient way to interact with Home Assistant on a lower level.

This documentation just gives a brief overview of the client API. The Client API is used exetensively internally
in NetDaemon, please check the source code for in depth information how to use it.

## IHomeAssistantConnection
You can access the client api on the currently existing connection by using the `IHomeAssistantConnection` interface.
It is accessable from an NetDaemon app by injecting it in the constructor.
Most of the methods on this interface is async so you will have to use the `IAsyncInitializable` interface to 
be able to use it in the `InitializeAsync` method. Check out [how to use async features](user/advanced/async_features.md) for more 
information how to use async in subcribe method. Remember to add the `using NetDaemon.Client.HomeAssistant.Extensions;` namespace
to be able to use extended features.


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

If you want to make an own implementation that just needs the conveniece to connect to Home Assistant and use basic features of NetDaemon 
without the full app model you can use the `IHomeAssistantRunner` interface. It will take care of connect and reconnect to Home Assistant.

Just add the client nuget package to your application and use the `HomeAssistantRunner` class to connect to Home Assistant.
There are an extension metohd `AddHomeAssistantClient` that you can use to add the client to dependency injection.

Example: Implementation of a background service that uses the `IHomeAssistantRunner` to connect to Home Assistant and subscribe to all events.

```csharp

using System.Reactive.Linq;

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
