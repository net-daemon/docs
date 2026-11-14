---
id: vs
title: Visual Studio
---



## Visual studio on Windows host os

Use a Visual Studio version that supports the .NET 11 SDK.
[Install .NET 11](https://dotnet.microsoft.com/download/dotnet/11.0) and check
Visual Studio compatibility before opening the solution.

Fork and clone your net-daemon/netdaemon.

### Debug

The debugging can be pointed to the `exampleapps` folder. please turn off the entity generation by `"generate_entities": false`.

### Setup the configuration

## Setup the environment vars
Easiest is to setup environment varables for your Home Assistant instance in the host. The `HOMEASSISTANT__HOST`, `HOMEASSISTANT__TOKEN` is required to debug. You may have to restart Visual Studio after setting the environment vars.

| Environment variable | Description |
| ------ | ------ |
| HOMEASSISTANT__TOKEN   |  Token secret to access the HA instance|
| HOMEASSISTANT__HOST | The ip or hostname of HA |
| HOMEASSISTANT__PORT | The port of home assistant (defaults to 8123 if not specified) |
| NETDAEMON__GENERATEENTITIES | Generate entities, recommed set false unless debugging|
| NETDAEMON__APPSOURCE | The folder/project/dll where it will find daemon. Set this to empty `""` to debug apps local. If needed to debug the dynamic source compilation, set to `/workspaces/netdaemon/Service/apps`

Use `src/Service/apps` as starting point to debug your stuff! 
```

## Visual studio using containers

Will be supported at a later time