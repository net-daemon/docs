---
id: hass_model_migration
title: Migrating from base class API
---

The new HassModel has some awesome features that fall in the following categories:

- Application loading

    Previously all apps were required to implement `INetDaemonAppBase` (usually by deriving from `NetDaemonRxApp`). This is no longer required. A class only needs to be decorated by a `[NetDaemonApp]` attribute to be loaded as a NetDaemon app.

- Optional YAML config

    Decorating a class with the `[NetDaemonApp]` attribute results in a single instance of the class being loaded as an app. YAML configuration is supported for apps that need to be configured using the new dependency injection `IAppConfig<class>`.

- Access to functions via injected services

    Apps can use constructor injection to receive service objects like `IHaContext` to interact with Home Assistant. Scoped services will be scoped with the life time of the app.

- Strongly typed HassModel API for interacting with Entities and services

    The HassModel API provides a type safe way to interact with Home Assistant. It uses [.NET Reactive Extensions](https://github.com/dotnet/reactive) for handling events and state changes. All dynamic properties use generic interfaces to get strong typing and intellisense on objects like service method arguments and entity attributes.
