---
id: architecture
title: Architecture of NetDaemon
---

![](/img/docs/dev/overall_architecture.png)

## Namespaces in NetDaemon github project

| Namespace                                         | Description                                                                                                                                                             |
| ------------- | ----------------- |
| Client | Handles basic API to connection and communicate with Home Assistant. Maintains websocket connection and provides convenient interfaces for API calls. Normally not used by an app but can if advanced options are needed. |
|  HassModel | Handles an entity model and call services. It caches all entity states for fast access. This namespace also contains the code generator. This is typically injected IHaContext or more specific entities and services in user apps to interact with Home Assistant. This namespace also have components that support service callbacks using NetDaemon integration.  |
|  AppModel | Handles application life cycle and application configuration. Instance and disposes applications. This namespace also contains the compiler of source deployed apps. |
|  Runtime | NetDaemon runtime that connect everything together. The runtime also handles app state by creating input_booleans per app.          |
|  Host   |  Default host in all docker containers. This is used when users use source deployment. It has all dependencies needed for basic operations and all extensions. Users that deploy compiled projects use their own and use the `Runtime` to run NetDaemon  |
|  Extensions   |  The extension namespace contains various extensions that is not part of core featureset. Logging provides default Serilog logging to ND. Scheduling provides convenient scheduling features. Tts provides a convenient interface to do text to speech and MqttEntityManager provides features to create entities using the MQTT features in HA.   |

## Deployment options

NetDaemon can be deployed using source code and just compile the template project and use any kind of host.
