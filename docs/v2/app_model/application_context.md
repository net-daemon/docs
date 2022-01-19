---
id: app_model_context
title: Application context
---
There are some NetDaemon runtime specific information for each instanced application that can be retreived using the `IApplicationContext` interface.

```csharp
[NetDaemonApp]
public class MyApp
{
    public MyApp(IApplicationContext appCtx)
    {
        // Get the unique application id for this instance
        var myAppId = appCtx.Id;
    }
}
```