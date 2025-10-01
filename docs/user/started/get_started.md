---
id: get_started
title: Getting started with NetDaemon
---

# Getting started

This guide walks you through setting up your development environment for
building NetDaemon apps.

## Prerequisites

- Dotnet 9 SDK
- Development environment
- A Home Assistant long lived authorization token
- Git (optional)
- Docker (optional)

## NetDaemon development workflow

The following workflow is the recommended approach
for developing and deploying NetDaemon:

1. Install the NetDaemon CLI tools to access the project template.
2. Develop, build, compile, and test your NetDaemon apps locally using your preferred development environment.
3. Publish your project.
4. Deploy your project using one of the following options:
    - NetDaemon Home Assistant add-on
    - NetDaemon pre-built Docker container
    - Your own Docker container

### Install the NetDaemon .NET CLI tool and creating a project

First, install the NetDaemon .NET CLI tool:

```bash
dotnet new --install NetDaemon.Templates.Project
```

Once installed, create a new project using the template:

```csharp
mkdir NetDaemonApps // Your project folder name
cd NetDaemonApps
dotnet new nd-project
```

*There is an deployment option where you use the source code
to deploy NetDaemon apps, we do not recommend using it but see
[souce deployment docs](development_source_deploy.md)
for details*

We assume you are familiar with your development environment,
but for additional guidance and tips, see the
[development tools tips & tricks page](development_tools.md).

### Configuring NetDaemon appsettings.json

NetDaemon development environment needs to be configured to
connect to Home Assistant.

Edit the values in the `appsettings.json`. The following settings are mandatory:

- `Host`: the IP address or hostname of your Home Assistant instance
- `Port`: Defaults to 8123
- `Token`: Your long-lived access token

Example `appsettings.json` file:

```json
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
        "UseAttributeBaseClasses" : "false"
    }
}
```

:::info
We recommend creating a development-specific configuration file named
`appsettings.development.json`, which is automatically excluded from Git.
This prevents accidentally exposing your secret token if you use an
external git repository like GitHub. Remember to remove sensitive data
from `appsettings.json` before push to remote repository!
:::

:::tip
When running your app from the console (e.g., `dotnet run --project "PATH_TO_YOUR_PROJECT"`), ensure an appsettings.json file is in the same directory. Without it, the NetDaemon Runtime will start but won’t connect to Home Assistant, and your apps won’t load.
:::

## Development and debugging NetDaemon apps

Once configured, you can begin developing your NetDaemon applications.
The project template includes example apps to help you get started with
development and testing.

Run and debug your applications while monitoring log output for errors.

For a more powerful and convenient way to interact with Home Assistant
entities and services, we recommend using the [code generator](../hass_model/hass_model_codegen.md)
code generator to generate C# classes.

## Deploy NetDaemon apps

Use `dotnet publish -c Release -o [your output directory]`
Then, copy all contents from `[your_output_directory]` to the appropriate
location on your Home Assistant host:

- If using the NetDaemon add-on: `/config/netdaemon5`
- If using another hosting option: Copy to your chosen destination folder

For more details on different deployment options, see the [Installation Documentation](user/started/installation.md)

## Keep your dependencies and tools up-to-date

The template project includes a PowerShell script to update NetDaemon
and all dependent packages to their latest versions:

```bash
update_all_dependencies.ps1
```
