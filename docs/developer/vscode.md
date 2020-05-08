---
id: vscode
title: VS Code
---

For Visual Studio Code the recommenced way is to use the devcontainer to edit and debug NetDaemon.

## VSCode devcontainer

Fork and clone your net-daemon/netdaemon. Make you have remote development extensions installed. Open the NetDaemon folder. Run the `Reopen in container` task. When VSCode is finished you are now ready to code.

### Debug

The debugging can be pointed to the `exampleapps`folder.

### Setup the configuration

Make a file called `netdaemon_config.json` and copy to `src/Service/bin/Debug/netcoreapp3.1`.

```json
{
  "token": "Your token",
  "host": "your ip",
  "port": 8123,
  "ssl": false,
  "source_folder": "/workspaces/netdaemon/exampleapps",
  "generate_entities": false
}
```