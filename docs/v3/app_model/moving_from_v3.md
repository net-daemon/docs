---
id: app_model_moving_from_v3
title: Moving from NetDaemon version 3
---

This documentation how to move to current .NET 7 based NetDaemon runtime v3.x to .NET 8 based NetDaemon runtime 4. This change is pretty small and mostly should be quite compatible with your existing applications.

# Development environment

:::info

Before the .NET 8 based version 4 of the NetDaemon runtime is released it will be in `alpha` testing phase.
This means that the docker image will only be accessed with the `alpha` tag, ie `netdaemon4:alpha`. The nuget
packages will be in prelrelease in the form of `yyyy.ww.n-alpha`. The add-on will be a special pre-release version too.

This note will be removed when the V4 is released!

:::

The following changes have to be executed in order to develop your apps for NetDaemon 4 and .NET 8.

## 1. Update your nuget packages

In this release we decided to change naming of NetDaemon nuget packages. The names are basically the same but without the `JoySoftware`. We have good reasons for this and hope this little inconveniece of renaming the references will be ok.

1. In all .net projectfilel `*.csproj`, rename all nuget references that starts with `JoySoftware.NetDaemon` to `NetDaemon`. For users that uses the source deploy option you will have to add the`NetDaemon.AppModel.SourceDeployedApps` package!
2. Change the target framework to 8.0
3. Update Microsoft .NET files to .NET 8 versions

### 2. Update docker containers and add-ons

The docker container, change the name from `netdaemon3` to `netdaemon4`. All other settings are the same.

If you are using the addon write down the current settings in your current 3.x based addon and install the version 4 version and update settings as needed. In version 4 the default path had changed from `config/netdaemon3` to `config/netdaemon4`

### 3. Update the code generator

As some of the namespaces have changed you should update your locally installed version of the [Code generator](/v3/hass_model/hass_model_codegen.md) by running the following command:

```bash
dotnet tool install -g NetDaemon.HassModel.CodeGen
```

:::warning

You may need to uninstall the old code generator by using the `dotnet tool uninstall -g JoySoftware.NetDaemon.HassModel.CodeGen` command. Since we have changed
the namespace there will be conflicting tool command names.

:::

...and then re-run the generator to create an updated version of `HomeAssistantGenerated.cs`

### 3. Update the CLI tool

As some of the namespaces have changed you should first uninstall the cli tool by `dotnet new uninstall JoySoftware.NetDaemon.Templates.Project`
and then install the new too by 

```bash
dotnet new --install NetDaemon.Templates.Project

```


