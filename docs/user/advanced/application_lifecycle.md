---
id: application_lifecycle
title: Application lifecycle
---

This topic describes the lifecycle of a NetDaemon app, from instansiation to disposal. Understanding the life-cycle is
important for writing efficient and reliable apps for NetDaemon.

## Lifecycle of a NetDaemon app

The main phases of the life-cycle of a NetDaemon app are:
- Instantiating
- Async initialization
- Running
- Dispose

## Instantiating

When NetDaemon starts it searches for all apps and loads and instantiates them. The app's constructor is called.

_You should never do any blocking operations in the constructor, as it will block the startup of NetDaemon._

### Constructor injection

The constructor is the place to inject dependencies, such as the `IHaContext` or `ILogger`.

__Example of a constructor injecting different dependencies:__
```csharp
[NetDaemonApp]
public class MyFirstApp : NetDaemonApp
{
    private readonly IHaContext _haContext;
    private readonly ILogger _logger;

    public MyFirstApp(IHaContext haContext, ILogger logger)
    {
        _haContext = haContext;
        _logger = logger;
        // Do some initialization of subscriptions to events etc. here
    }
}
```

## Async initialization

If you need to do some async initialization after the application is instanced and before it is running,
you can implement the `IAsyncInitializable` interface. The `InitializeAsync` method is called after
the app is instantiated.

This is a good place to do async initialization, like init async libraries or creating long-running tasks.
You can of course do non async initialization here as long as it is not blocking we do recommend using
the constructor for non async initialization.

_You should never do any blocking operations in initialization phase, as it will block NetDaemon._


__Example of initialization using the `IAsyncInitializable`:__
```csharp
[NetDaemonApp]
public class AsyncUsingApp : IAsyncInitializable
{
    private Task? _longRunningTask; 

    public async Task InitializeAsync(CancellationToken cancellationToken)
    {
        // Always pass the cancellationToken to async methods since it will be cancelled
        // when NetDaemon is stopping and disposing the app
        var result = await SomeInitAsync(cancellationToken);
        _longRunningTask = Task.Run(() => DoSomeLongRunningTask(cancellationToken));
    }
}
```

## Running

After the instantiating and eventual initialization is done, the app is running. This is where the app is listening
to events and performing its tasks as you configured.

## Dispose

There are several reasons for an app to be stopped and disposed:
- NetDaemon runtime is stopping.
- The app is disabled through the Home Assistant UI using the apps input_boolean.
- NetDaemon loose connection to Home Assistant, like if Home Assistant is restarted, then NetDaemon will stop and try to reconnect.

When NetDaemon is stopping the app, it will dispose the apps. If your app has implemented the `IAsyncDisposable` interface, 
or the `IDisposable` interface, the `DisposeAsync` or `Dispose` method is called automatically by NetDaemon when the
app is being disposed.

The disposal phase looks like this:
- Runtime stops new events from being processed.
- The `DisposeAsync` or `Dispose` method is called on the app.
- The runtime clean up the application resources.

This order is very important to understand. You can never subscribe to events in this phase since the runtime stops
processing new events. You can however call services. Keep in mind that if the app is stopped due to Home Assistant
loosing connection, the services will not be called and errors will be logged.

_You should never do any blocking operations in dispose phase, as it will block NetDaemon from stopping._

__Example of using the `IAsyncDisposable`:__
```csharp
[NetDaemonApp]
public class DisposbleApp : IAsyncDisposable
{
    private readonly IHaContext _haContext;
    public DisopsableApp(IHaContext haContext)
    {
        _haContext = haContext;
    }

    // Get called when app is being disposed
    public async ValueTask DisposeAsync()
    {
        // Do some async clean-up here. 
        // Do not implement both IDisposable and IAsyncDisposable, choose one of the two depend on your needs 
    }
}
```

## Important notes on app life-cycle and subscriptions

There are some situations where you need to control the behavior of the subscription to events when the app is being disposed.
In most cases the subscriptions will just be stopped when the app is being disposed, but there are some cases where you want
to control the behavior.

For example the usage of `Throttle` on the observable events. It´s default behavior is to call the action when the observable
is completed (when the app is being disposed). This is not always the desired behavior. You can control this by:
- Using the `WhenStateIsFor` extension method as a replacement. Most use-cases this works better and will never call the action
when the app is being disposed.
- Using the `IgnoreOnComplete` extension method. It will never call the action when the app is being disposed.

__Example of prohibit action being called when app is disposed using `IgnoreOnComplete` extension method:__
```csharp
[NetDaemonApp]
public class IgnoreOnCompleteApp : NetDaemonApp
{
    public IgnoreOnCompleteApp(IHaContext haContext, ILogger<IgnoreOnCompleteApp> logger)
    {
        _entities.Light.TomasRoom?
            .StateChanges()
            .Where(e =>
                e.New.IsOn()
            )
            // Order is important! Needs to be called before Throttle
            .IgnoreOnComplete()
            .Throttle(TimeSpan.FromMinutes(15))
            .Subscribe(s =>
            {
                // Do something like call a service
                // This service will not be called on dispose of the app
            });
    }
}
```
