---
id: hass_model_codegen
title: Using the Code generator
---

NetDeamon has a generator that creates code based on the Entities and services in Home Assitant. This makes it possible to navigate all Entities and Services using intellisense.

The code generator is installed as a global dotNet tool via the following command:

```
dotnet tool install -g JoySoftware.NetDaemon.HassModel.CodeGen --version 21.46.0-beta
```

*While in preview, it is required to include the -version of the most recent version explcitily. Please check
https://www.nuget.org/packages/JoySoftware.NetDaemon.HassModel.CodeGen/ for the latest version*

After it is installed as a global tool it can be run with the command:

`
nd-codegen
`

When the tool it is run from the folder of your NetDaemon project that contains an `appsettings.json` or `appsettings.development.json` file it will automatically use the connection settings from that config file to connect to Home Assistant. It wil output a single file `HomeAssistantGenerated.cs` that contains all the generated code.

The generated code contains the followig

* A class `Entities` that provides properties to navigate to all existig entities in Home Assistant via intellisense
* A record derived from `Entity` for each domain that has entities in Home assistant
* A record with all the attributes of all entities in a specific domain, so they can be accessed via typed properties

* A class `Services` that provides acces to all services in Home Assitant via their domain
* Extension methods for each service that takes an entity as a target

## Commandline arguments

The settings for the code generator can also be set from the command line, this will override the settings from a configuration file if it is present.

| switch | |
|---     |--|
| -host  | Host of the netdaemon instance
| -port  | Port of the NetDaemon instance
| -ssl   | true if NetDaemon instance use ssl
| -token | A long lived Home Assistant token
| -o     | The output file to generate
| -ns    | The namespace to use for the generated code

