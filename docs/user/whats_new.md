---
id: whats_new_v5
title: What's new in V7
---

## Version 7 of NetDaemon

NetDaemon V7 runs on .NET 11, with updated NuGet dependencies. C# 14 remains
supported; you do not need to adopt new language features to upgrade your apps.

V7 uses dedicated Docker images (`netdaemon/netdaemon7`) and a separate
**NetDaemon V7 (.NET 11)** Home Assistant add-on. The default add-on application
folder is `/config/netdaemon7`. Both deployment options support 64-bit x86 and ARM
(`amd64` and `aarch64` in Home Assistant).

### Upgrading from V6

Install the .NET 11 SDK, retarget your projects to `net11.0`, update all NetDaemon
packages and the code generator to the same stable V7 release, then rebuild and
publish your apps. Check third-party extensions for compatibility.

Follow the [V7 migration guide](started/upgrade_to_v7.md) for the complete steps.
V6 installations use a separate image and add-on, so their apps and configuration
can be kept separately during migration.

If you still use V3, see the
[V3 migration guide](app_model/moving_from_v3.md) for the package and namespace
changes that also apply.

### Source deployment

Source deployment continues to support `.cs` and configuration files. Keep
`NetDaemon.AppModel.SourceDeployedApps` in your development project if you use
this model. Deploy only your app source and configuration; `.csproj` deployment
and custom NuGet packages are not supported by source deployment.
