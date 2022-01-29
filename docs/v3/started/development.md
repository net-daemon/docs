---
id: development
title: Get started with NetDaemon app development
---

## 1. Choose deployment method

Before you get started we recommend thinking about how you want to develop and deploy your NetDaemon apps. We have two different options. Select the workflow and capabilities that fits your needs best.

### Deploy compiled assemblies and configurations

With this option you use the default NetDaemon project template as a start. This is the default and recommended option. This option offer:

- Ready to run NetDaemon runtime including apps, dependencies and configuration in one package that you can deploy in any available hosting option (add-on, docker container, custom).
- Use external nuget packages.
- Add your own DI that will get injected in your apps

### Deploy source files and configurations

With this option you can deploy the actual source and NetDaemon will compile them and use it dynamically. This option offer:

- Easy access and editing your apps with integrated editor like VSCode server.
- Limited DI support.
- Does **not** support custom nuget packages.

## 2. Get the project template

We recommend using the dotnet cli tool to get the NetDaemon project template. Watch Eugene go through how to do use it in the video below.

<iframe width="560" height="315" src="https://www.youtube.com/embed/8FDWLy9JtJM" frameborder="0" allow="accelerometer;  encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

### Use dotnet cli tool

The recommended way to get the application template is to install the dotnet cli tool.

#### Use the default compiled deployment template

```bash
dotnet new --install JoySoftware.NetDaemon.Templates.Project
mkdir NetDaemonApps
cd NetDaemonApps
dotnet new nd-project
```

#### Use the source code deployment template

```bash
dotnet new --install JoySoftware.NetDaemon.Templates.Project
mkdir NetDaemonApps
cd NetDaemonApps
dotnet new nd-src-project
```

### Clone the the project template from repo

We are deprecating the use of the [app template repo](https://github.com/net-daemon/netdaemon-app-template). Please use any of the dotnet cli templates.  

## 2. Configure your development tool

We support most popular options. We strongly recommend using containers to run and debug your apps but local compilation and debugging is also supported. We provide a docker file in the project template to use as a start and a dev container for VSCode.

### 2.1 Visual Studio

You should be all set, so skip to step 3

### 2.2 Visual Studio Code

Dev containers are the preferred way to develop your apps. This also requires docker to be installed.

1. Install [remote Development extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.vscode-remote-extensionpack) in VSCode if you have not already.
2. Open folder, the newly cloned template
3. Run task: `Remote-Containers: Open Folder in Container`. Wait until it fully opened

### 2.3 JetBrains Rider

Just as with Visual Studio it is ready to go for local compile and debugging of your apps.

Rider supports debugging of containerized ASP.Net Core apps from version 2018.2.

Open the netdaemon_app folder in Rider and it should be able to build the projects immediately. A default execute and debug profile will be created however these will be executed as local processes.
The preferred way to develop your app is to use devcontainers, which requires docker to be installed.
To configure devcontainers, perform the following steps:

1. Locate `Dockerfile` in the Solution Explorer window
2. Right click and select `Debug Dockerfile`
3. This will create a new profile called "DOCKERFILE"
4. To view progress, located "Docker" in the "Services" tab and double-click it
5. Like all container apps, the first build may take a few minutes - watch the progress in the "Services / Docker" tab

Ensure that the "DOCKERFILE" profile is selected in the toolbar and then `Run` and `Debug` will execute within the container.

## 3. Make configurations

NetDaemon development environment needs to be configured to connect to Home Assistant.  Minimal config is: hostname/ip, port and access token. If you did not already provided this information when creating the new project using cli toll you can edit the `appsettings.json`

Edit the values in the `appsettings.json`. Following settings are mandatory:

- `Host`, the ip or hostname, (port defaults to 8123)
- `Token`, the long lived access token

Example appsettings file

```json
{
   "Logging": {
      "LogLevel": {
         "Default": "Debug",     // Set the loglevel
         "Microsoft": "Warning"
      },
      "ConsoleThemeType": "Ansi" // The theme, Ansi or System
   },
   "HomeAssistant": {
      "Host": "your ip",         // ip or hostname to home assistant 
      "Port": 8123,              // port of home assistant (default 8123)
      "Ssl": false,              // true if use SSL to connect to Home Assistant
      "Token": "Your token",     // Home Assistant security token
      "InsecureBypassCertificateErrors": false // Set att own risk if you want to use self-signed certs
   },
   "NetDaemon": {
         "ApplicationConfigurationFolder": "./apps" //Only change if you change app folder
   }
}
```

## Develop and debug your apps

Now properly configured you can develop your application. The template shows example of both develop and test your apps. A sample app has been provided for you: `src/apps/HelloWorld/HelloWorld.cs`.

Debug and run your apps and view log output for errors.

## Deploy your apps

After you have developed and tested your apps it is time to deploy and run the apps in the production environment. That's what we will look at next...
