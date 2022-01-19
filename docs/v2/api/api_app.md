---
id: api_app
title: Other app features
---

### GetApp

It is possible to get a reference to a running application instance and setup dependencies between apps. The use-case for this is to have applications that share state and functionality you want to share to other apps.

**app.cs**
```cs
var lightManagerApp = GetApp("light_manager");
```
**app.yaml**

```yaml
app:
   class: MyApp
   dependencies:
      - light_manager
```

### RunScript

To run scripts use the `RunScript`command.

```csharp

// Both runs the script "myscript"
RunScript("myscript");
RunScript("script.myscript);

// Run multiple scripts
RunScript("myscript", "otherscript");

```

### Delay
Somtimes you just wanna delay a period of time between two different actions. Do **not** use `Thread.Sleep()`. Use the built-in `Delay(TimeSpan timeout)` function. It uses async in the background to do proper exit when app exit.
```csharp
// Do delay 100ms in a safe way
Delay(TimeSpan.FromMiliseconds(100));
```

### ServiceProvider Access
Sometimes you want to use the IServiceProvider to instance your dependencies. Application expose the `ServiceProvider` property to use for this purpose. This is very useful testing the application.
```csharp
var myDependecy = ServiceProvider?.GetService(typeof(IMyDependency);
```
