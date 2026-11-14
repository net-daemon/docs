---
id: upgrade_to_v7
title: Upgrade to V7 (.NET 11)
---

NetDaemon V7 runs on .NET 11. This guide covers upgrading from V6 on .NET 10
and preparing your apps for the V7 runtime.

V7 is the runtime generation; NuGet packages keep their calendar-based version
numbers. Choose a stable V7 version from the
[release notes](https://github.com/net-daemon/netdaemon/releases) and use that
same version for your NetDaemon packages, code generator, and runtime image.

:::warning
Back up your apps and configuration before migrating. When running alongside
V6, enable only one copy of each
automation to avoid duplicate actions in Home Assistant.
:::

## Prepare your apps

Start from a copy of your existing project, or create one using the
[getting started guide](get_started.md), then apply these changes before running it:

1. Install the [.NET 11 SDK](https://dotnet.microsoft.com/download/dotnet/11.0)
   and use an editor or development container that supports it.
2. Change the target framework in your app project and any test projects to
   `net11.0`. C# 14 remains supported; this upgrade does not require adopting
   C# 15 features:

   ```xml title="Project settings"
   <PropertyGroup>
     <TargetFramework>net11.0</TargetFramework>
     <LangVersion>14</LangVersion>
   </PropertyGroup>
   ```

3. If your project pins the SDK in `global.json`, update it to an installed
   .NET 11 SDK, for example:

   ```json title="global.json"
   {
     "sdk": {
       "version": "11.0.100",
       "rollForward": "latestMinor"
     }
   }
   ```

4. Update **all** `NetDaemon.*` package references to the same stable V7 release, including
   references in test projects or `Directory.Packages.props` if you use central
   package management. For example:

   ```bash
   dotnet add package NetDaemon.Runtime
   dotnet add package NetDaemon.HassModel
   ```

   These commands select the latest stable packages. To select a specific V7
   release, append `--version YOUR_V7_RELEASE_VERSION`, replacing the placeholder
   with the version from the release notes. Update the other NetDaemon packages
   your project already uses to the same version.
   Check third-party extensions for .NET 11/V7 compatibility and update
   direct Microsoft.Extensions package references to compatible 11.x versions.

5. Update the code generator to the matching version. For a project with an
   existing local tool manifest:

   ```bash
   dotnet tool update NetDaemon.HassModel.CodeGen --local
   dotnet tool run nd-codegen
   ```

   If the tool is not yet in your manifest, use `dotnet tool install` instead of
   `dotnet tool update`. If you use a global tool, update it with
   `dotnet tool update --global NetDaemon.HassModel.CodeGen`.
   Append `--version YOUR_V7_RELEASE_VERSION` when selecting a specific release.
   See the [code generator guide](../hass_model/hass_model_codegen.md) for
   Home Assistant connection settings.

6. Rebuild, run your tests, and publish your apps with the .NET 11 SDK:

   ```bash
   dotnet --version
   dotnet restore
   dotnet build -c Release
   dotnet test -c Release
   dotnet publish -c Release -o ./publish
   ```

If your project has Dockerfiles or development container configuration, update
their SDK/runtime images to .NET 11 and their NetDaemon runtime image to V7
as well. Keep the package references and code generator on the same stable version.

## Home Assistant add-on

1. Add `https://github.com/net-daemon/homeassistant-addon` to the add-on store's
   repositories, or refresh the store if you already added it.
2. Install **NetDaemon V7 (.NET 11)**. Its slug is `netdaemon7`, so
   it is a separate installation from V6 and alpha add-ons.
3. Copy all files and folders **inside** your publish output to
   `/config/netdaemon7`, the default application folder. Use a separate folder
   from your V6 installation.
4. Set **Application assembly** to your app's entry DLL, for example
   `NetDaemonApps.dll`, relative to the configured application folder.
   Copy any custom add-on settings from your previous installation as needed.
5. Start the add-on and check its logs and your automations in Home Assistant.

The add-on uses `ghcr.io/net-daemon/netdaemon_addon7` with the version selected
by the add-on release and supports `aarch64` and `amd64`. A 32-bit `armhf`
installation is not supported by V7.

### Source deployment

For [source deployments](development_source_deploy.md), copy your app's `.cs`
and configuration files to `/config/netdaemon7` and leave **Application assembly**
empty. Do not copy `.csproj` files; project-file deployment is not supported.
Source deployment does not support custom NuGet packages.

## Docker

Use either of these equivalent V7 images on `linux/amd64` or `linux/arm64`,
with the stable release version as the tag:

- `netdaemon/netdaemon7` (Docker Hub)
- `ghcr.io/net-daemon/netdaemon7` (GitHub Container Registry)

For example, adapt the following Compose configuration to your Home Assistant
connection and publish folder. Create a `.env` file next to it and replace the
placeholder with the same stable V7 version as your NetDaemon packages:

```text title=".env"
NETDAEMON_VERSION=YOUR_V7_RELEASE_VERSION
```

```yaml title="compose.yaml"
services:
  netdaemon:
    image: netdaemon/netdaemon7:${NETDAEMON_VERSION}
    container_name: netdaemon7
    restart: unless-stopped
    environment:
      HomeAssistant__Host: your_ip_or_hostname
      HomeAssistant__Token: your_token
      NetDaemon__ApplicationAssembly: NetDaemonApps.dll
      Logging__LogLevel__Default: Information
      TZ: Etc/UTC
    volumes:
      - ./publish:/data
```

For source deployment, mount your source/configuration folder at `/data` and
omit `NetDaemon__ApplicationAssembly`. See the
[installation guide](installation.md#environment-variables) for other environment
variables and Home Assistant networking options.

## Updating or returning to V6

When updating to a new stable V7 release, update your NetDaemon packages and code
generator to its matching version, rebuild, and update `NETDAEMON_VERSION` in your
`.env` file before pulling the image. With Compose:

```bash
docker compose pull
docker compose up -d
```

To return to V6, use your backed-up .NET 10 project, matching V6 packages and
V6 add-on or image. Rebuild that project before deploying; do not copy V7/.NET 11
binaries into the V6 runtime.
