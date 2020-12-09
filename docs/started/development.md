---
id: development
title: App development
---
# Get started with NetDaemon app development

The easiest way to get started with app development for NetDaemon is to use a custom devcontainer, you can also run it localy, but it will not have the same features as the devcontainer provides.

## NetDaemon app development with devcontainer

1. Create a new directory for your app.
2. Open [VSCode](https://code.visualstudio.com/) in that directory.
3. Make sure you installed [Remote Development extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.vscode-remote-extensionpack) in vscode.
4. Clone or make new repo from the [netdaemon-app-template](https://github.com/net-daemon/netdaemon-app-template) and open the folder in VSCode.
5. Rename `_appsettings.json` to `appsettings.json` and configure  properly.
6. Open the devcontainer from the command pallet in vscode ("Remote-Containers: Reopen Folder in Container").
7. Hack away! Run and debug your stuff!

### Debugging and appsettings.json

Review the file called `appsettings.json`. Check for explaination in comments below.

```json
{
    "Logging": {
        "MinimumLevel": "info"    // debug, trace etc. can be set
    },
    "HomeAssistant": {
        "Host": "your ip",        // ip or hostname to your home assistant instance
        "Port": 8123,             // port of home assistant (default 8123)
        "Ssl": false,             // true if use SSL to connect to Home Assistant
        "Token": "Your token"     // Home Assistant security token
    },
    "NetDaemon": {
        "SourceFolder": "./",     // path to apps directory, normally not change
        "GenerateEntities": false // generates entity helpers on start
    }
}
```

## Deploy your apps

After you have developed and tested your apps, copy the whole `apps` directorys to the Home Assistant config folder. The new folder structure should be `/config/netdaemon/apps` where `/config` is the path to your Home Assistant config.

In your config there should be a folder structure similar to the example below. If you are running docker you should set the volume to the red arrow. If you are running the Add-on that folder should be in the config folder.

![](/img/docs/installation/folder_structure_netdaemon.png)

## Start NetDaemon

Now you can start the daemon, check the logs for any errors.

:::info IMPORTANT
YOU NEED TO RESTART THE ADD-ON EVERYTIME YOU MAKE CHANGES TO A FILE SINCE C# COMPILES
:::

