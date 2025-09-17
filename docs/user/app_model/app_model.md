---
id: app_model
title: NetDaemon Apps Overview
---

# NetDaemon Application Model Overview

The NetDaemon app model is a framework for organizing and managing your Home Assistant automations. It provides a structured way to:

- Create automation logic as discrete units called "apps"
- Manage app lifecycle
- Load and unload automations from Home Assitant UI


## Two Ways to Create Apps

### 1. Class-based Apps
The traditional object-oriented approach using classes :

```csharp
[NetDaemonApp]
public class MyApp
{
    public MyApp(IHaContext ha)
    {
        ha.CallService("notify", "persistent_notification", 
            data: new { message = "Started", title = "My App" });
    }
}
```

You can register class-based apps in two ways:

NetDeamon will search for all classes with the `[NetDaemonApp]` Attribure in an assembly if it is registered with the DI container like this

```csharp
Services.AddAppsFromAssembly(Assembly.GetExecutingAssembly());
```

Alternatively you can register individial classes 


```csharp
Services.AddNetDaemonApp<MyApp>();
```

Classes registered this way do not need to be decorated with the `[NetDaemonApp]` attribute.

### 2. Minimal Apps
Minimal apps allow for a lighter weight approach using delegates that are directly registered with the ServiceCollection:

```csharp
Services
    .AddNetDaemonApp("LightWeightApp", (IHaContext ha) =>
    {
        ha.CallService("notify", "persistent_notification", 
            data: new { message = "Started", title = "My App" });
    });
```

Both Class and Delegate apps can receive arguments that will be resolved from the dependency injection. For a class this will be done as usual in .Net DI via constructor parameters. Minimal based apps can decalare parameters which will be resolved also from the DI container. Many apps will inject IHaContext, which is the main NetDaemon interface that allows interaction with Home Assitant. For more information see see the [HassModel documentation](./hassmodel). 2

## Setting up the runtime
A typical NetDeamon application has a program.cs file that utilizes the .Net HostApplicationBuilder like this:

```csharp
using Microsoft.Extensions.Hosting;
using NetDaemon.AppModel;
using NetDaemon.Runtime;
using NetDaemon.HassModel;

var hostBuilder = Host.CreateApplicationBuilder(args);

hostBuilder.Services
    .AddNetDaemonRuntime()
    .AddNetDaemonStateManager()

    .AddAppsFromAssembly(Assembly.GetExecutingAssembly())
    // and / or
    .AddNetDaemonApp("LightWeightApp", (IHaContext ha) =>
        ha.Entity("input_button.test_button")
            .StateAllChanges()
            .Subscribe(_ => ha.Entity("input_boolean.dummy_switch").CallService("toggle")));

await hostBuilder.Build().RunAsync();
```

Besides adding your class or minimal apps, this example shows:

`AddNetDaemonRuntime()` will register a `BackgroundService` that is be responsible for maintaining a connection to Home Assitant, loading and unloading apps and setting up other required infrastruture to run your applications.

`AddNetDaemonStateManager()` will allow the apps in your host to be stopped and started via the Home Assistant user interface. If the State Manager is added, it will create an input_boolean entity in Home Assistant for each app. Switching this input_bool On and Off will start and stop the corresponding NetDaemon App

## Application Lifecycle

An application can be _started_, _initialized_ and _stopped_ by the NetDaemon runtime.

When the host starts, the NetDaemon runtime will try to connect to Home Assistant. Once the connection is established, it will start and initialize all enabled apps. If the connection to Home Assistant is for some reason closed, all currently running apps will be stopped. The runtime will keep trying to reconnect, and when it succeeds, it will again start and initialize all enabled apps.


Apps can also be started and stopped by toggeling the input_bool entities that are generaed for each app in Home Assisitant if the `NetDaemonStateManager` is used.

### Class based lifecycle events

When a class based app is started, a new instance of the class is created using the DI container to provide the arguments for its constructor. The class can then optionally implement the `IAsyncInitializable`, `IAsyncDisposable` and / or `IDisposable` interfaces to allow additional async initialisation and cleanup logic.

```csharp
[NetDaemonApp]
public sealed class LifeTimeApp : IAsyncInitializable, IAsyncDisposable
{
    private readonly ILogger<LifeTimeApp> _logger;

    public LifeTimeApp(IHaContext ha, ILogger<LifeTimeApp> logger)
    {
        ha.Events.Where(n => n.EventType == "test_event").Subscribe( _ =>
        {
            logger.LogInformation("LifeTimeApp Hello testevent");
        });
        
        _logger.LogInformation("LifeTimeApp created");
    }

    public async Task InitializeAsync(CancellationToken cancellationToken)
    {
        // async initialisation logic here
        _logger.LogInformation("LifeTimeApp initialized");
    }
    
    public async ValueTask DisposeAsync()
    {
        // cleanup logic here
        _logger.LogInformation("LifeTimeApp disposed");
    }
}
```

### Minimal app lifecycle events
A minimal app consists of just a single delegate. When the app is started, its parameters are resolved from the DI container and the delegate is invoked. A minimal app can implement async initialisation by providing an async delegate (that returns a Task, ValueTask, or other awaitable object) the runtime will the await its return value during initialisation. 

The minimal app can support cleanup by returning an object that implements `IAsyncDisposable` or `IDisposable`.

```csharp
Services
    .AddNetDaemonApp("LightWeightApp", async (IHaContext ha, ILogger<Program> logger) =>
    {
        ha.Entity("input_button.test_button")
            .StateAllChanges()
            .Subscribe(_ => ha.Entity("input_boolean.dummy_switch").CallService("toggle"));

        await SomeInitAsync();
        
        return Disposable.Create(() => logger.LogInformation("Stopping minimal App"));
    });
```


:::note

Note: Most NetDeamon apps do not need explicit cleanup using `I(Async)Disposable`. The `IHaContext` that gets injected into the app is scoped specifically to each app. When the app is stopped, this IHaContext will also stop emitting events from Home Assistant. It is therefore not needed to explicitly unsubscribe to these events when the app is stopped.

:::
