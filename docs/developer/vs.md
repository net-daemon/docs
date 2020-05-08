---
id: vs
title: Visual Studio
---



## Visual studio on Windows host os

Visual Studio 2019 community or better is recommended. You need to have dotnet core 3.1 or better installed.

Fork and clone your netdaemon/netdaemon. Make you have remote development extensions installed. Open the NetDaemon folder. Run the `Reopen in container` task. When VSCode is finished you are now ready to code.

### Debug

The debugging can be pointed to the `exampleapps` folder. please turn off the entity generation by `"generate_entities": false`.

### Setup the configuration

Make a file called `netdaemon_config.json` and copy to `src\Service\bin\Debug\netcoreapp3.1`.

```json
{
  "token": "Your token",
  "host": "your ip",
  "port": 8123,
  "ssl": false,
  "source_folder": "drive:\\yourpath\\netdaemon\\exampleapps",
  "generate_entities": false
}
```

## Visual studio using containers

Will be supported at a later time