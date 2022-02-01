---
id: async_features
title: Async features of NetDaemon
---

NetDaemon API:s is built to have a synchronous behavior for users but the underlying implementation is asynchronous. This makes the API easer to use in most situations. Sometimes you do need to call async functions, like database calls for example. NetDaemon provides features to do this easy.

## Async lifetime

Apps that implements this interface gets a callback to allow apps to make async starting point after the app is instanced. If apps implements the 

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

NetDaemon have provided some convenient functions to call async functions in a safe way that guarantees exceptions being logged.

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

The two provided async extensions to IObservable are:

| Method                                         | Description                                                                                                                                                             |
| ------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| SubscribeAsync | Calling async functions in a safe way. Guaranteed to  be logged. If wait for task in that function it will as any async function block that subscription until returned |
| SubscribeAsyncConcurrent | Calling async functions concurrently. Order of handling events are not guaranteed. Blocking waits will still be able to handle next event. |
