---
id: get_started
title: Getting started with NetDaemon
---

# Getting started with NetDaemon

This guide walks you through setting up your development environment for
building NetDaemon apps.

## Prerequisites

- .NET 10 SDK
- A development environment such as Visual Studio, Visual Studio Code, or Rider
- A Home Assistant instance
- A Home Assistant long-lived access token
- Git (optional)
- Docker (optional)

## 1. Install the NetDaemon templates

Install the NetDaemon .NET templates so you can scaffold a new project:

```bash title="Install templates"
dotnet new --install NetDaemon.Templates.Project
```

## 2. Create a new project

Create a new folder and scaffold your first NetDaemon app:

```bash title="Create a project"
mkdir NetDaemonApps
cd NetDaemonApps
dotnet new nd-project
```

:::tip
Run `dotnet new list netdaemon` to see the available NetDaemon templates.
:::

We assume you are familiar with your development environment,
but for additional guidance and tips, see the
[development tools tips & tricks page](development_tools.md).

## 3. Configure Home Assistant

NetDaemon development environment needs to be configured to
connect to Home Assistant.

Edit the values in the `appsettings.json`. The following settings are mandatory:

- `Host`: the IP address or hostname of your Home Assistant instance
- `Port`: Defaults to 8123
- `Token`: Your long-lived access token

Example `appsettings.json` file:

```json title="appsettings.json"
{
    "Logging": {
        "LogLevel": {
            "Default": "Debug",
            "Microsoft": "Warning"
        },
        "ConsoleThemeType": "Ansi"
    },
    "HomeAssistant": {
        "Host": "home_assistant_host",
        "Port": 8123,
        "Ssl": false,
        "Token": "my_very_secret_token_from_homeassistant"
    },
    "NetDaemon": {
        "ApplicationConfigurationFolder": "./apps"
    },
    "CodeGeneration": {
        "Namespace": "HomeAssistantGenerated",
        "OutputFile": "HomeAssistantGenerated.cs",
        "UseAttributeBaseClasses": "false"
    }
}
```

:::info
We recommend creating a development-specific configuration file named
`appsettings.development.json`, which is automatically excluded from Git.
This prevents accidentally exposing your secret token if you use an
external git repository like GitHub. Remember to remove sensitive data
from `appsettings.json` before push to remote repository.
:::

:::tip
When running your app from the console, ensure an `appsettings.json` file is
in the same directory. Without it, the NetDaemon Runtime will start but will
not connect to Home Assistant, and your apps will not load.
:::

## 4. Run and debug your project

Once configured, you can begin developing your NetDaemon applications.
The project template includes example apps to help you get started with
development and testing.

Run the project from your project folder:

```bash title="Run NetDaemon"
dotnet run
```

Debug your applications while monitoring log output for errors.

For a more powerful and convenient way to interact with Home Assistant
entities and services, we recommend using the
[code generator](../hass_model/hass_model_codegen.md) to generate C# classes.

## 5. Deploy NetDaemon apps

Use `dotnet publish -c Release -o [your output directory]`.
Then, copy all contents from `[your_output_directory]` to the appropriate
location on your Home Assistant host:

- If using the NetDaemon add-on: `/config/netdaemon6`
- If using another hosting option: Copy to your chosen destination folder

For more details on different deployment options, see the
[installation documentation](installation.md).

There is a deployment option where you use the source code to deploy
NetDaemon apps. We do not recommend using it for most users, but see the
[source deployment docs](development_source_deploy.md) for details.

## Keep your dependencies and tools up-to-date

The template project includes a PowerShell script to update NetDaemon
and all dependent packages to their latest versions:

```powershell title="Update dependencies"
update_all_dependencies.ps1
```
