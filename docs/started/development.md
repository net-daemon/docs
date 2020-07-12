---
id: development
title: App development
---
# Get started with NetDaemon app development

The easiest way to get started with app development for NetDaemon is to use a custom devcontainer, you can also run it localy, but it will not have the same features as the devcontainer provides.

## NetDaemon app development with devcontainer

1. Create a new directory for your app.
2. Open [vscode](https://code.visualstudio.com/) in that directory.
3. Make sure you installed [Remote Development extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.vscode-remote-extensionpack) in vscode.
4. Create a new file (.devcontainer/devcontainer.json) in your app directory.
5. Add this as the content to that file:
```json
{
    "name": "Sample App development",
    "image": "ludeeus/container:netdaemon",
    "settings": {
      "terminal.integrated.shell.linux": "/bin/bash"
    },
    "extensions": [
      "ms-dotnettools.csharp",
      "aaron-bond.better-comments",
      "k--kato.docomment"
    ]
  }
```
6. Open the devcontainer from the command pallet in vscode ("Remote-Containers: Reopen Folder in Container").
7. When the devcontainer has started execute the folowing command to set it up: `container init`.
8. To start the app, execute this command: `container run` in the console inside the container.
8. Hack away! Run and debug your stuff!


## Local NetDaemon app development

1. Go to the [netdaemon-app-template](https://github.com/net-daemon/netdaemon-app-template). and make a project from template functionality at github.
2. Clone your newly created project
3. Open the `netdaemon` folder.
4. Configure the `appsettings.json` properly. **If you run it on windows (no devcontainer) specify the full path to the projectfolder in `source_folder`.** otherwise keep `source_folder` at default.
5. If using vscode, open the vscode terminal and run `dotnet restore`, this needs to be done to get intellisense to work properly. Sometimes you need to restart vscode once for it to work.
6. Hack away! Run and debug your stuff!

### Debugging and appsettings.json

Review the file called `appsettings.json`. Check for explaination in comments below.

```json
{
    "Logging": {
        "MinimumLevel": "info"
    },
    "HomeAssistant": {
        "Host": "your ip",        // Ip to your home assistant instance
        "Port": 8123,             // Port
        "Ssl": false,             // Use SSL to connect to Home Assistant
        "Token": "Your token"     // Home Assistant security token
    },
    "NetDaemon": {
        "SourceFolder": "",       // Path to netdaemon dir, on windows it is [drive]\\pathtoyourapproot
        "GenerateEntities": false // Generates entity helpers on start
    }
}
```

## Deploy your apps

After you have developed and tested you app you want to copy the whole app to the config folder. The new folder structure should be /config/netdaemon/apps where /config is the path to your Home Assistant config.

In your config there should be a folder structure similar to the example below. If you are running docker you should set the volume to the red arrow. If you are running the Add-on that folder should be in the config folder.

![](/img/docs/installation/folder_structure_netdaemon.png)

## Start NetDaemon

Now you can start the daemon, check the logs for any errors.

:::info IMPORTANT
YOU NEED TO RESTART THE ADD-ON EVERYTIME YOU MAKE CHANGES TO A FILE SINCE C# COMPILES
:::

## Other examples

Todo: make link to examples here..

My own automation can be found at : [https://github.com/helto4real/hassio/tree/master/netdaemon/apps](https://github.com/helto4real/hassio/tree/master/netdaemon/apps).
