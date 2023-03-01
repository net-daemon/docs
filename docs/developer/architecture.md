---
id: architecture
title: Architecture of NetDaemon
---

![](/img/docs/dev/overall_architecture.png)

## Namespaces in NetDaemon github project

| Namespace                                         | Description                                                                                                                                                             |
| ------------- | ----------------- |
| Client | Handles basic API to connect and communicate with Home Assistant. Maintains websocket connection and provides an convenient interface for API calls. Normally not used by user apps but can if advanced options are needed. |
|  HassModel | Handles an entity model and service calls. It caches all entity states for fast access. This namespace also contains the code generator. This is typically injected IHaContext or more specific entities and services in user apps to interact with Home Assistant. This namespace also have components that support service callbacks using NetDaemon integration.  |
|  AppModel | Handles application life cycle and application configuration. Instance and disposes applications. This namespace also contains the compiler of source deployed apps. |
|  Runtime | NetDaemon runtime that connect everything together. The runtime also handles app state by creating input_booleans per app.          |
|  Host   |  Default host in all Docker containers. This is used when users use source deployment. It has all dependencies needed for basic operations and all extensions. Users that deploy compiled projects use their own and use the `Runtime` to run NetDaemon  |
|  Extensions   |  The extension namespace contains various extensions that is not part of core features. Logging provides default Serilog logging to ND. Scheduling provides convenient scheduling features. Tts provides a convenient interface to do text to speech and finally MqttEntityManager provides features to create entities using the MQTT features in HA.   |

## Design of NetDaemon

NetDaemon relies heavily on IObservables to handle events from Home Assistant. An easy way to access all events is to inject `IObservable<HassEvent>` using DI. You may need to inject IHomeAssistantRunner or IHomeAssistantConnection depending on need. If you want to see how these are used please see the implementation of `NetDaemon.HassModel.Internal.EntityStateCache class`

NetDaemon utilize dependency injection through constructor injection a lot. Devs that contributes to NetDaemon need to know or learn DI.

One important separation of concerns is the AppModel. We totally separate the application life cycle and configuration from other parts of NetDaemon. We might see other application models in the future.

## Core interfaces in Client

### IHomeAssistantRunner

This interface can be injected through DI and used to maintain a connection to Home Assistant. It will reconnect when needed. It also provides IObservables when connection connects and disconnects. `CurrentConnection` always has current connected connection or null if disconnected.

### IHomeAssistantConnection

This interface can be injected through DI and contains the current connected Home Assistant API connection instance. It has functions to send low level commands and returns results. If you need to add features that is not currently supported by NetDaemon this is the interface to extend.

All events from Home Assistant are available as an IObservable called `OnHomeAssistantEvent`

## Core interfaces in HassModel

### IHaContext

This interface has convenient functions for interacting with Home Assistant. The functions are more "send and forget" and the async code is hidden from user.

### EntityModel

The model for different types of entities you can find in the `NetDaemon.HassModel.Entities` namespace. We support both text and numeric representation of entities.

## Core interfaces in AppModel

### IApplication

Represents an application and current state (Enabled/Disabled/Running/Error).

### IAppStateManager

This interface is used to manage application state. The current implementation in the `Runtime` is to manage state using Home Assistant `input_boolean` helpers. You can add custom state management by adding a singleton to DI `.AddSingleton<IAppStateManager>(s => s.GetRequiredService<MyCustomAppStateManager>());`

### IAsyncInitializable

Makes it possible for user apps to get a async initialization callback from the runtime.

### IAppModelContext

Manage all currently discovered applications.

## Deployment options

NetDaemon can be deployed using source code or just compile the template project and use any kind of host.
