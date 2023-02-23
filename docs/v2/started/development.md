---
id: development
title: Get started with NetDaemon app development
---

## 1. Clone the app-template
The easiest way to get started with app development for NetDaemon is to use or clone the [app template repo](https://github.com/net-daemon/netdaemon-app-template). That will give you everything you need to get started developing your first automation.

Example, cloning the template project directly and rename it
```bash
git clone https://github.com/net-daemon/netdaemon-app-template.git
mv netdaemon-app-template netdaemon_apps
cd netdaemon_apps
```
_if you are using the NetDaemon 3 beta you should use the template in V3 branch._

Example, cloning the template project, check out V3 branch and rename it
```bash
git clone https://github.com/net-daemon/netdaemon-app-template.git
mv netdaemon-app-template netdaemon_apps
cd netdaemon_apps
git checkout v3
```

## 2. Configure your development tool

### 2.1 Visual Studio
You should be all set, so skip to step 3

### 2.2 Visual Studio Code
If you are using Visual Studio Code, devcontainers are the preferred way to develop your apps. This also requires Docker to be installed.

1. Install [remote Development extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.vscode-remote-extensionpack) in VSCode if you have not already.
2. Open folder, the newly cloned template
3. Run task: `Remote-Containers: Open Folder in Container`. Wait until it fully opened

### 2.3 JetBrains Rider
Rider supports debugging of containerized ASP.Net Core apps from version 2018.2.

Open the netdaemon_app folder in Rider and it should be able to build the projects immediately.
A default execute and debug profile will be created however these will be executed as local processes.
The preferred way to develop your app is to use devcontainers, which requires Docker to be installed.
To configure devcontainers, perform the following steps:

1. Locate `Dockerfile` in the Solution Explorer window
2. Right click and select `Debug Dockerfile`
3. This will create a new profile called "DOCKERFILE"
4. To view progress, located "Docker" in the "Services" tab and double-click it
5. Like all container apps, the first build may take a few minutes - watch the progress in the "Services / Docker" tab

Ensure that the "DOCKERFILE" profile is selected in the toolbar and then `Run` and `Debug` will execute within the container.

## 3. Make configurations
NetDaemon development environment needs to be configured to connect to Home Assistant.  Minimal config is: hostname/ip, port and access token.

1. Rename `_appsettings.json` to `appsettings.json`.
2. Edit the values in the appsetting `appsettings.json`. Following settings are mandatory:
   - `Host`, the ip or hostname, (port defaults to 8123)
   - `Token`, the long lived access token

Example appsettings file
```json
{
   "Logging": {
      "MinimumLevel": "info"    // debug, trace etc. can be set
   },
   "HomeAssistant": {
      "Host": "your ip",        // ip or hostname to home assistant 
      "Port": 8123,             // port of home assistant (default 8123)
      "Ssl": false,             // true if use SSL to connect to Home Assistant
      "Token": "Your token"     // Home Assistant security token
   },
   "NetDaemon": {
      "AppSource": "./apps",     // path to apps directory
      "GenerateEntities": false // generates entity helpers for V2 API on start
   }
}
```

## Develop and debug your apps
Now properly configured you can develop your application. The template shows example of both develop and test your apps. A sample app has been provided for you: `src/apps/HelloWorld/HelloWorld.cs`.

Debug and run your apps and view log output for errors.

## Deploy your apps

After you have developed and tested your apps it is time to deploy and run the apps in the production environment. That's what we will look at next...

