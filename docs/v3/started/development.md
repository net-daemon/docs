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

Deployment is by copy source code and config files under apps folder (.cs and .yaml ) to destination. The provided debug project should never be copied.

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

We are deprecating the use of the app template repo. Please use any of the dotnet cli templates.  

## 2. Configure your development tool

We support most popular options. We strongly recommend using containers to run and debug your apps but local compilation and debugging is also supported. We provide a docker file in the project template to use as a start and a dev container for VSCode.

### 2.1 Visual Studio

You should be all set, so skip to step 3

### 2.2 Visual Studio Code

Dev containers are the preferred way to develop your apps. This also requires docker to be installed. You can also develop and debug directly on your dev machine without docker.

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

### 2.4 Studio Code Server Addon 
#### Setup 
1. In Home Assistant go to Configurations -> Add-ons, Backups & Supervisor -> Add-on Store -> Menu -> Repositories 
2. Add the repository: https://github.com/hassio-addons/repository 
3. Install the `Studio Code Server Addon` (a0d7b954_vscode) 
4. In the Addon Configuration Tab add the following config: 
   ```
   init_commands:
     - >-
       wget
       https://packages.microsoft.com/config/debian/10/packages-microsoft-prod.deb
       -O packages-microsoft-prod.deb
     - dpkg -i packages-microsoft-prod.deb
     - rm packages-microsoft-prod.deb
     - apt-get update
     - apt-get install -y apt-transport-https
     - apt-get update
     - apt-get install -y dotnet-sdk-6.0
     - dotnet tool install -g JoySoftware.NetDaemon.HassModel.CodeGen
   packages: []
   log_level: info
   config_path: /
   ``` 
   --> The part in the `init_commands` will install .NET SDK 6.0 only in the Studio Code Server Addon (Docker Container) 
5. Now you can start the Studio Code Server Addon by going the Addon's Info Tab and pressing `OPEN WEB UI`. 

HINTS: 
- It is recommanded to install the C# Extensions (ms-dotnettools.csharp) in Studio Code Server to get Semantic Highlighting and IntelliSense. 
- Open only the folder where the solution/project is located to ensure that the C# Extension works properly. 

#### Usage 
1. Clone a solution e.g. the [NetDaemon Template](https://github.com/net-daemon/netdaemon-app-template) to e.g. /root/config 
2. Rename the file `_appsettings.json` to `appsettings.json` and modify it as described in the [Template-README](https://github.com/net-daemon/netdaemon-app-template/blob/main/README.md) 
3. Open a Terminal in the Studio Code Server Addon 
   - To run the Code Generator enter: 
     `/root/.dotnet/tools/nd-codegen` 
   - To compile the solution enter: 
     `dotnet build netdaemon-app-template.sln` 
   - To restore the solution enter: 
     `dotnet restore netdaemon-app-template.sln` 

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
      "InsecureBypassCertificateErrors": false // true at own risk if you want to use self-signed certs
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

After you have developed and tested your apps it is time to deploy and run the apps in the production environment. The two different deployment options has different deployment methods.

### Compiled assemblies and configurations

Just do `dotnet -c Release publish -o [your output directory]` and copy all content from [your output directory] to `/config/netdaemon3` if you are using add-on or the destination folder you chose for the other host options.

### Source files and configurations

Copy the content from the `apps` folder to to `/config/netdaemon3` if you are using add-on or the destination folder you chose for the other host options. **Do not copy project files. Only copy contents under `apps` folder!**
