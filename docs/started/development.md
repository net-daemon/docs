---
id: development
title: App Development
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
    "image": "ludeeus/devcontainer:netdaemon",
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
7. When the devcontainer has started execute the folowing command to set it up: `dc init`.
8. To start the app, execute this command: `dc run` in the console inside the container.
8. Hack away! Run and debug your stuff!


## Local NetDaemon app development

1. Clone the [netdaemon-app-template](https://github.com/net-daemon/netdaemon-app-template).
2. Open the `netdaemon` folder.
3. Configure the daemon_config.json properly
4. Open the vscode terminal and run `dotnet restore`, this needs to be done to get intellisense to work properly. Sometimes you need to restart vscode once for it to work.
5. Hack away! Run and debug your stuff!

## Deploy your apps

After you have developed and tested you app you want to copy the whole app to the config folder. The new folder structure should be /config/netdaemon/apps where /config is the path to your Home Assistant config.

## Start NetDaemon

Now you can start the daemon, check the logs for any errors.

:::info IMPORTANT
YOU NEED TO RESTART THE ADD-ON EVERYTIME YOU MAKE CHANGES TO A FILE SINCE C# COMPILES
:::

## Other examples

Todo: make link to examples here..

My own automation can be found at : [https://github.com/helto4real/hassio/tree/master/netdaemon/apps](https://github.com/helto4real/hassio/tree/master/netdaemon/apps).
