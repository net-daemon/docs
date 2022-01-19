---
id: hass_model_migration
title: Migrating from base class API
---

The new HassModel has some awesome new features that fall in the following categories

- Application loading

    Previously all apps were required to implement `INetDaemonAppBase` (usually by deriving from `NetDaemonRxApp`). This is no longer required. A class only needs to be decorated by a `[NetDaemonApp]` attribute to be loaded as a NetDaemon app. 

- Optional yaml config

    Decorating a class with the `[NetDaemonApp]` attribute instance a single instance of the class loaded as an app. The yaml configuration is also supported for apps that do need configuration using the new dependency injection `IAppConfig<class>`.

- Acces to functions via injected services

    Apps can use constructor injection to receive service objects like `IHaContext` to interact with Home Assistant. Scoped services will be scoped with the life time of the app.

- Strong typed HassModel API for interacting with Entities and services

    The HassModel API providess a type safe way to interact with Home Assitant. It uses Reactive Extensions for handling events and state changes. All dynamic properties use generic interfaces to get strong typing and intellisense on objects like service method arguments and entity attributes.

