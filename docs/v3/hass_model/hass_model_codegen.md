---
id: hass_model_codegen
title: Using the Code generator
---

NetDaemon has a generator that creates code based on the Entities and services in Home Assistant. This makes it possible to navigate all Entities and Services using intellisense.

## Use as local tool
If you are using the template project you can install the code generator as a local tool. The advantage is that you will have a update script that keeps your tool version and NetDaemon versions in sync. If you encounter an error adding the local tool, please make a fresh project template using the latest version of the cli tool and move your apps to that version. You do not have to install the tool in this case.

Run the tool using:
`
dotnet tool run nd-codegen
`

You can use following command to keep it up to date with the latest version:

```cmd
dotnet tool update JoySoftware.NetDaemon.HassModel.CodeGen
```

Or use the convenience script `update_all_dependencies.ps1` to update all tools and nuget packages. (Only available in later versions of the template)

## Use as global tool

The code generator is installed as a [.NET global tool](https://docs.microsoft.com/en-us/dotnet/core/tools/global-tools) via the following command:

```cmd
dotnet tool install -g JoySoftware.NetDaemon.HassModel.CodeGen
```

After it is installed as a global tool it can be run with the command:

`
nd-codegen
`

You can use following command to keep it up to date with the latest version:

```cmd
dotnet tool update -g JoySoftware.NetDaemon.HassModel.CodeGen
```

**Make sure the version of the codegen tool and your nugets `Joysoftware.NetDaemon.*` have the same version.**

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

