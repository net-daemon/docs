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