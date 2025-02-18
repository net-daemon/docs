---
id: development_source_deploy
title: Get started with NetDaemon app development
---

### Deploy source files and configurations

With this option you can deploy the actual source and NetDaemon will compile them and use it dynamically. This option offers:

- Easy access and editing your apps with integrated editor like VS Code server.
- Limited DI support.
- Does **not** support custom nuget packages.

Deployment is done by copying source code and config files under your apps folder (.cs and .yaml ) to the destination. 
The provided debug project should never be copied.

#### Use the source code deployment template

```bash
dotnet new --install NetDaemon.Templates.Project
mkdir NetDaemonApps
cd NetDaemonApps
dotnet new nd-src-project
```

### Source files and configurations

**Do not copy project files. Only copy the contents under the `apps` folder!**
Copy the content from the `apps` folder to to `/config/netdaemon5` if you are using add-on (note that you might have changed the destination in add-on config), or the destination folder you chose in the other hosting options. **Do not copy project files. Only copy the contents under the `apps` folder!**

See [installation docs](user\started\installation.md) for how to configure different hosting options.
