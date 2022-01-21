---
id: app_model_moving_from_v2
title: Moving from NetDaemon version 2
---

Here is a summary of the main changes between the versions:
- New namespaces `NetDaemon.AppModel` and `NetDaemon.Runtime`. If you are using HassClient today you should just replace any `NetDaemon.xyz` to `NetDaemon.AppModel`. We recommend check out the v3 branch of template.
- Configuration using Yaml is changed. Configuration is now only available as injected `IAppConfig<Class>` in constructor. To migrate, copy public properties to own config class and change the yaml using that class name instead of app name. Class property on yaml can be removed.
- Base class based on `NetDaemonRxApp` is not supported at all. You will need to migrate your applications to HassModel before upgrad to NetDaemon 3.