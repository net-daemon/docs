---
id: async_features
title: Async features of NetDaemon
---

The NetDaemon API is built to have synchronous behavior for users, but the underlying implementation is asynchronous. This makes the API easer to use in most situations. Sometimes you do need to call async functions, like when working with a database. NetDaemon provides features to do this easily.

## Async lifetime

Apps that implement the `IAsyncInitializable` interface get a callback to execute asynchronous code after the app is instantiated:

```csharp
[NetDaemonApp]
public class AsyncUsingApp : IAsyncInitializable, IAsyncDisposable
{
    private readonly IHomeAssistantApiManager _apiManager;
    public AsyncUsingApp(IHomeAssistantApiManager apiManager)
    {
        _apiManager = apiManager;
    }

    public async Task InitializeAsync(CancellationToken cancellationToken)
    {
        // Use your extension method defined below
        var result = await SomeFunctionAsync("a string", cancellationToken);
    }

    // Get called when app is being disposed
    public async ValueTask DisposeAsync()
    {
        // Do some async dispose here. Do not implement both IDisposable and IAsyncDisposable, choose one of the two depend on your needs 
    }
}
```

## Using async methods in observable

NetDaemon provides some convenient ways to call async methods in a safe way that guarantees exceptions will be logged:

```csharp

[NetDaemonApp]
public class UseAsyncMethodsApp
{
    public UseAsyncMethodsApp(IHaContext ha, ILogger<UseAsyncMethodsApp> logger)
    {
        _entities.Light.TomasRoom?
            .StateChanges()
            .Where(e =>
                e.New.IsOn()
            )
            .SubscribeAsync(async s =>
            {
                await Task.Delay(100);
            }, 
                e => logger.LogError(e, "fail!")); // If you do not provide error handling default will log anyway
    }
}

```

The two provided async extensions to `IObservable` are:

| Method                                         | Description                                                                                                                                                             |
| ------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| SubscribeAsync | Calls async methods in a safe way. Guaranteed to be logged. If you wait on a `Task` in that method it will block that subscription until returned. |
| SubscribeAsyncConcurrent | Calls async methods concurrently. Order of handling events are not guaranteed. Blocking waits will still be able to handle new events. |
