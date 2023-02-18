---
id: hass_model_codegen
title: Using the Code generator
---

NetDaemon has a generator that creates code based on the Entities and services in Home Assistant. This makes it possible to navigate all Entities and Services using intellisense.

The code generator is installed as a [.NET global tool](https://docs.microsoft.com/dotnet/core/tools/global-tools) via the following command:

```cmd
dotnet tool install -g JoySoftware.NetDaemon.HassModel.CodeGen --version 22.1.x
```

You can use following command to keep it up to date with the latest version:

```cmd
dotnet tool update -g JoySoftware.NetDaemon.HassModel.CodeGen  --version 22.1.x
```

**Make sure the version of the codegen tool and your nugets `Joysoftware.NetDaemon.*` have the same version.**

Please see what the [latest released version of V2](https://github.com/net-daemon/netdaemon_v2/releases/latest) for correct version.

For V3 version of runtime please see the V3 docs!

After it is installed as a global tool it can be run with the command:

`
nd-codegen
`

When the tool is run from the folder of your NetDaemon project that contains an `appsettings.json` or `appsettings.development.json` file it will automatically use the connection settings from that config file to connect to Home Assistant. It will output a single file `HomeAssistantGenerated.cs` that contains all the generated code.

The generated code contains the following:

* A class `Entities` that provides properties to navigate to all existing entities in Home Assistant via intellisense
* A record derived from `Entity` for each domain that has entities in Home Assistant
* A record with all the attributes of all entities in a specific domain, so they can be accessed via typed properties
* A class `Services` that provides access to all services in Home Assistant via their domain
* Extension methods for each service that takes an entity as a target

## Commandline arguments

The settings for the code generator can also be set from the command line, this will override the settings from a configuration file if it is present.

| switch | |
|---     |--|
| -host  | Host of the NetDaemon instance
| -port  | Port of the NetDaemon instance
| -ssl   | `true` to connect over ssl; otherwise `false`
| -token | A long lived Home Assistant token
| -o     | The output file to generate
| -ns    | The namespace to use for the generated code

