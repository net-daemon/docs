---
id: get_started_index
title: Getting started
---

## What do I need to get started?
Here is what you will need to start developing apps to automate your home with NetDaemon:

- The hostname/ip-address and port of your Home Assistant instance
- Have [git](https://git-scm.com/) installed to get the development template
- Create an access token to use for authorization. The long lived access token is created under your profile in the Home Assistant GUI. Make sure the user account for this access token has Administrator privileges in Home Assistant
- Have a .NET development environment. You can edit .cs files in any tool, but using a development environment is recommended
  - [Visual Studio 2022](https://visualstudio.microsoft.com/vs/), [Visual Studio Code](https://code.visualstudio.com) or [JetBrains Rider](https://www.jetbrains.com/rider/)
  - [.NET 6 SDK](https://dotnet.microsoft.com/download/dotnet/6.0) installed (if running in devcontainer with VSCode, it is pre-installed)
  - [Docker](https://www.docker.com/) installed if you want to use devcontainer in VSCode (recommended)

Now you have all you need to develop an app, lets just do that by moving to App development.

## What version do I want to use?

NetDaemon has two versions of the runtime. Version 3 is the latest and is currently in beta. We recommend starting to adopt to this version as soon as possible. New users should use this version.

## NetDaemon 2

Version 2 is the current released and supports the two API:s HassModel (dependency injected) and base class. Apps using the baseclass is deprecated and we strongly recommend users to use HassModel as the base of your automations. NetDaemon 2 is supported but will only get bugfixes and maintainence. No new features will be added to NetDaemon 2.
[Here you can find information about how to get started with NetDaemon V2](v2/started/get_started.md)

## NetDaemon 3

Version 3 is a new runtime with an architecture built on top of dependency injection. This model only supports HassModel API for automations. This is still en beta and are more likely to have API changes. The NetDaemon V3 has breaking changes coming from V2. It uses different namespaces and the configuration using yaml is redesigned using dependency injection. For new users we recommend start to use this version to stay in sync with new features.
[Here you can find information about how to get started with NetDaemon V3](v3/started/get_started.md)