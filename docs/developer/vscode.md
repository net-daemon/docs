---
id: vscode
title: VS Code
---

For Visual Studio Code the recommenced way is to use the devcontainer to edit and debug NetDaemon core projects. 

## VSCode devcontainer

Fork and clone your net-daemon/netdaemon. Make you have remote development extensions installed. Open the NetDaemon folder. Run the `Reopen in container` task. When VSCode is finished you are now ready to code.

### Debug

The debugging can be pointed to the `exampleapps`folder.

### Setup the configuration

## Setup the environment vars
Easiest is to setup environment varables for your Home Assistant instance in the host. The `HOMEASSISTANT__HOST`, `HOMEASSISTANT__TOKEN` is required to debug. You may have to restart VSCode after setting the environment vars.

| Environment variable | Description |
| ------ | ------ |
| HOMEASSISTANT__TOKEN   |  Token secret to access the HA instance|
| HOMEASSISTANT__HOST | The ip or hostname of HA |
| HOMEASSISTANT__PORT | The port of home assistant (defaults to 8123 if not specified) |
| NETDAEMON__GENERATEENTITIES | Generate entities, recommed set false unless debugging|
| NETDAEMON__APPSOURCE | The folder/project/dll where it will find daemon. Set this to empty `""` to debug apps local. If needed to debug the dynamic source compilation, set to `/workspaces/netdaemon/Service/apps`

Use `src/Service/apps` as starting point to debug your stuff! 