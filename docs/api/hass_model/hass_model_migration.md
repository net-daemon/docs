---
id: hass_model_migration
title: Migrating from current API
---

The new NetDaemon release has some awesome new features that fall in the following categories

- Application loading

    Previously all apps were required to implement `INetDaemonAppBase` (usually by deriving from `NetDaemonRxApp`). This is no longer required. A class only needs to be decorated by a `[NetDeamonApp]` attribute to be loaded as a NetDaemon app. 

- Optional yaml config

    Previously all apps needed to have a yaml configuration file in order to be loaded. This is no longer required. Just decorating a class with the `[NetDeamonApp]` attribute is enough to geta single instance of the class loaded as an app. The yaml configuration is still supported for apps that do need configuration or to allow multiple instances of a class to be loaded with different configuration.

- Acces to functions via injected services

    Previously the `NetDaemonRxApp` was used by apps to interact with Home Assistant and the NetDaemon runtime services. Apps can now use constructor injection to receive service objects like `IHaContext` to interact with Home Assistant.

- Strong typed Model 3 API for interacting with Entities and sercices

    The new model 3 API provides a more type safe way to interact with Home Assitant. It is still uses Reactive Extensions for handling events and state changes. All dynamic properties however have been replaced with generic interfaces so you will get strong typing and intellisense on objects like service methods and entity attributes.


For backwards compatibility all these new features are optional. It is also possible to use the independently while still using the old model, even in the same app.

For instance: 

- An existing app that derives from `NetDaemonRxApp` can also add a constructor parameter of type IHaContext and it will be provided by the NetDaemon runtime when the app is loaded. All exisiting application logic that interacts with the base class will still, but you can now also use the HassModel API that is based on this IHaContext interface.

- For an exisiting app that does not need any yaml config you can just delete the yaml file and add the `[NetDeamonApp]` attribute to the class.