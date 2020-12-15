---
id: vs
title: Visual Studio
---



## Visual studio on Windows host os

Visual Studio 2019 community or newer is recommended. You need to have dotnet 5 installed.  [Download .net 5 here](https://dotnet.microsoft.com/download/dotnet/5.0) or check the minimal version of Visual Studio supported. 

Fork and clone your net-daemon/netdaemon.

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