---
id: get_app
title: Get application
---

It is possible to get a reference to a running application instance and setup dependencies between apps. The use-case for this is to have applications that share state and functionality you want to share to other apps.

**app.cs**
```cs
var lightManagerApp = GetApp("light_manager");
```
app.yaml
```yaml
app:
   class: MyApp
   dependencies:
      - light_manager
```