---
id: app_model_moving_from_v3
title: Moving from NetDaemon version 3
---

This documentation how to upgrade and move to current .NET 7 based NetDaemon runtime v3.x to .NET 10 based NetDaemon runtime 6. There are some breaking issues but should be quite straight forward upgrade your applications and runtime environment.

### Nuget packages

We have removed the `JoySoftware` from the nuget identity and all package now starting with `NetDaemon`. There are no company behind NetDaemon and the naming could lead to that conclusion.

We also moved the source deploy features to it's own nuget package. This will make the size of app builds a lot smaller for users that uses the recommended compiled deploy option.

# Development environment

:::info

We try to always keep NetDaemon up-to-date with the latest versions of .NET. Since we are a small team of maintainers we can not maintain more than one version at a time. This is why new features never is added to old versions. We recommend users to update their apps when ever a new major version of NetDaemon.

:::

The following changes have to be executed in order to develop your apps for NetDaemon 6 and .NET 10.

## 1. Update nuget packages

In this release we decided to change naming of NetDaemon nuget packages. The names are basically the same but without the `JoySoftware`. The reason is we needed to make sure we got the ownership of the NetDaemon id on our nuget packages for security reasons.

1. In all .NET project files `*.csproj`, rename all nuget references that starts with `JoySoftware.NetDaemon` to `NetDaemon`. For users that uses the source deploy option you will have to add the`NetDaemon.AppModel.SourceDeployedApps` nuget package!
2. Change the target framework to 10.0
3. Update Microsoft .NET references in your C# files to the corresponding .NET 10 versions

### 2. Update docker containers and add-ons

The docker container, change the name from `netdaemon3` to `netdaemon6`. All other settings are the same.

If you are using the addon write down the current settings in your current 3.x based addon and install the version 6 version and update settings as needed. In version 4 the default path had changed from `config/netdaemon3` to `config/netdaemon6`.

### 3. Update the code generator

As some of the namespaces have changed you should update your locally installed version of the [Code generator](/user/hass_model/hass_model_codegen.md) by running the following command:

```bash
dotnet tool install -g NetDaemon.HassModel.CodeGen
```

:::warning

You may need to uninstall the old code generator by using the `dotnet tool uninstall -g JoySoftware.NetDaemon.HassModel.CodeGen` command. Since we have changed
the namespace there will be conflicting tool command names.

:::

...and then re-run the generator to create an updated version of `HomeAssistantGenerated.cs`

### 4. Update the CLI tool

As some of the namespaces have changed you should first uninstall the cli tool by `dotnet new uninstall JoySoftware.NetDaemon.Templates.Project`
and then install the new too by 

```bash
dotnet new --install NetDaemon.Templates.Project

```


