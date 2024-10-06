---
id: development
title: Get started with NetDaemon app development
---

## 1. Choose deployment method

Before you get started we recommend thinking about how you want to develop and deploy your NetDaemon apps. We have two different options. Select the workflow and capabilities that best fits your needs.

### Deploy compiled assemblies and configurations

With this option you use the default NetDaemon project template as a start. This is the default and recommended option. This option offers:

- Ready to run NetDaemon runtime including apps, dependencies and configuration in one package that you can deploy in any available hosting option (add-on, Docker container, custom).
- Use external nuget packages.
- Add your own DI that will get injected in your apps

### Deploy source files and configurations

With this option you can deploy the actual source and NetDaemon will compile them and use it dynamically. This option offers:

- Easy access and editing your apps with integrated editor like VS Code server.
- Limited DI support.
- Does **not** support custom nuget packages.

Deployment is done by copying source code and config files under your apps folder (.cs and .yaml ) to the destination. The provided debug project should never be copied.

## 2. Get the project template

We recommend using the dotnet cli tool to get the NetDaemon project template. Watch Eugene go through how to do use it in the video below.

<iframe width="560" height="315" src="https://www.youtube.com/embed/8FDWLy9JtJM" frameborder="0" allow="accelerometer;  encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

### Use dotnet cli tool

The recommended way to get the application template is to install the dotnet cli tool.

#### Use the default compiled deployment template

```bash
dotnet new --install NetDaemon.Templates.Project
mkdir NetDaemonApps
cd NetDaemonApps
dotnet new nd-project
```

#### Use the source code deployment template

```bash
dotnet new --install NetDaemon.Templates.Project
mkdir NetDaemonApps
cd NetDaemonApps
dotnet new nd-src-project
```

### Clone the the project template from repo

We are deprecating the use of the app template repo. Please use any of the dotnet cli templates.

## 2. Configure your development tool

We support most popular options. We strongly recommend using containers to run and debug your apps but local compilation and debugging is also supported. We provide a Docker file in the project template to use as a start and a dev container for VSCode.

### 2.1 Visual Studio

You should be all set, so skip to step 3.

### 2.2 Visual Studio Code

Dev Containers are the preferred way to develop your apps. This also requires Docker to be installed. You can also develop and debug directly on your dev machine without Docker.

1. Install [Remote Development extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.vscode-remote-extensionpack) in VS Code if you have not already.
2. Open folder, the newly cloned template
3. Run task: `Remote-Containers: Open Folder in Container`. Wait until it fully opened

### 2.3 JetBrains Rider

Just as with Visual Studio it is ready to go for local compile and debugging of your apps.

Rider supports debugging of containerized ASP.Net Core apps from version 2018.2.

Open the netdaemon_app folder in Rider and it should be able to build the projects immediately. A default execute and debug profile will be created however these will be executed as local processes.
The preferred way to develop your app is to use a container, which requires Docker to be installed.
To configure a container, perform the following steps:

1. Locate `Dockerfile` in the Solution Explorer window
2. Right click and select `Debug Dockerfile`
3. This will create a new profile called "DOCKERFILE"
4. To view progress, located "Docker" in the "Services" tab and double-click it
5. Like all container apps, the first build may take a few minutes - watch the progress in the "Services / Docker" tab

Ensure that the "DOCKERFILE" profile is selected in the toolbar and then `Run` and `Debug` will execute within the container.

### 2.4 Studio Code Server Addon

#### Setup

1. In Home Assistant go to Configurations -> Add-ons, Backups & Supervisor -> Add-on Store -> Menu -> Repositories
2. Add the repository: [https://github.com/hassio-addons/repository](https://github.com/hassio-addons/repository)
3. Install the `Studio Code Server Addon` (a0d7b954_vscode)
4. In the Addon Configuration Tab add the following config:

   ```yaml
   init_commands:
     - >-
       wget
       https://packages.microsoft.com/config/debian/12/packages-microsoft-prod.deb
       -O packages-microsoft-prod.deb
     - dpkg -i packages-microsoft-prod.deb
     - rm packages-microsoft-prod.deb
     - apt-get update
     - apt-get install -y apt-transport-https
     - apt-get update
     - apt-get install -y dotnet-sdk-8.0
     - dotnet tool install -g NetDaemon.HassModel.CodeGen
   packages: []
   log_level: info
   config_path: /
   ```

   --> The part in the `init_commands` will install .NET SDK 6.0 only in the Studio Code Server Addon (Docker Container)
5. Now you can start the Studio Code Server Addon by going the Addon's Info Tab and pressing `OPEN WEB UI`.

HINTS:

- It is recommended to install the C# Extensions (ms-dotnettools.csharp) in Studio Code Server to get Semantic Highlighting and IntelliSense.
- Open only the folder where the solution/project is located to ensure that the C# Extension works properly.

#### Usage

NetDaemon development environment needs to be configured to connect to Home Assistant.  Minimal config is: hostname/ip, port and access token. If you did not already provide this information when creating the new project using the cli tool you can edit the `appsettings.json` file.

Edit the values in the `appsettings.json`. The following settings are mandatory:

- `Host`, the ip or hostname, (port defaults to 8123)
- `Token`, the long lived access token

Example `appsettings.json` file

```json
{
   "Logging": {
      "LogLevel": {
         "Default": "Debug",     // Set the log level
         "Microsoft": "Warning"
      },
      "ConsoleThemeType": "Ansi" // The theme, Ansi or System
   },
   "HomeAssistant": {
      "Host": "your ip",         // IP or hostname to Home Assistant 
      "Port": 8123,              // Port of Home Assistant (default 8123)
      "Ssl": false,              // True if using SSL to connect to Home Assistant
      "Token": "Your token",     // Home Assistant security token
      "InsecureBypassCertificateErrors": false // True at your own risk if you want to use self-signed certs
   },
   "NetDaemon": {
         "ApplicationConfigurationFolder": "./apps" // Only change if you change the app folder
   }
}
```

## Develop and debug your apps

Now properly configured you can develop your application. The template shows examples of developing and testing your apps. A sample app has been provided for you: `src/apps/HassModel/HelloWorld/HelloWorld.cs`.

Debug and run your apps and view log output for errors.

## Deploy your apps

After you have developed and tested your apps it is time to deploy and run the apps in the production environment. The two different deployment options have different deployment methods.

### Compiled assemblies and configurations

Use `dotnet publish -c Release -o [your output directory]` and copy all content from `[your output directory]` to `/config/netdaemon4` if you are using add-on, or the destination folder you chose in the other hosting options.

See [installation docs](user\started\installation.md) for how to configure different hosting options.

### Source files and configurations

Copy the content from the `apps` folder to to `/config/netdaemon4` if you are using add-on (note that you might have changed the destination in add-on config), or the destination folder you chose in the other hosting options. **Do not copy project files. Only copy the contents under the `apps` folder!**

See [installation docs](user\started\installation.md) for how to configure different hosting options.

### Keep your dependencies and tools up-to-date

In the template projects we provided a convenient powershell script that will update NetDaemon and dependent packages to the latest versions: `update_all_dependencies.ps1`.
