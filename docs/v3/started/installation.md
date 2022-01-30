---
id: installation
title: Install NetDaemon runtime
---

There are several ways to deploy your apps. You could just run the development project and set it up yourself. NetDaemon provides a convenient ways to run your apps:
- Using a Home Assistant add-on
- In a docker container
- Or using the template as base deploy your own.

So let's set it up before we can deploy the apps to it.

## Install NetDaemon as a Home Assistant add-on
Two versions are provided, version 2 and version 3 of NetDaemon runtime. Select one of the V3 versions. If you feel you always want the latest and greatest changes you can choose the dev build for the version that you selected but be prepare that things can break!

1. Make a folder structure under your Home Assistant configuration directory to use for NetDaemon apps. `/config/netdaemon`  
2. Add the `https://github.com/net-daemon/homeassistant-addon` in `Add new repository URL` to the add-on store.

    ![](/img/docs/started/newrepo.png)

3. Add the NetDaemon add-on.

    ![](/img/docs/started/daemon.png)

4. Deploy your apps and evenutall yaml config files in the folder `/config/netdaemon3/apps`.

### Advanced add-on configurations
The standard way running your apps in add-on is just to copy the `.cs` and `.yaml` files to `/config/netdaemon3/apps` and it will dynamically compile and run them. If you want to use your own project with custom dependencies you will have to use the advanced deployment options. 

Specify the `app_source` setting in add-on config. If you set a `app_source: folder`, then it will dynamically compile and run apps in `/config/netdaemon3/folder`. 

If you want to deploy your own compiled version of NetDaemon runtime and apps (from the template as an example). Copy the content of bin folder `/config/netdaemon3` and set the `app_source: {assemblyname}.dll` it will run the published project in `/config/netdaemon3/{assemblyname}.dll`.

**There is no way to include other dependencies in the standard dynamically compiled option** No, for this we recommend the `Advanced add-on configurations` decribed above, to include for example a external nuget package.

## Install as a docker container
If you are using Home Assistant Core and do not have the possibility to run add-ons, using the docker container is a convenient way to run NetDaemon apps. 

**Always use specific versioning tags of docker containers (not latest or dev) cause these are constantly getting new versions and things could break** [You can always find the latest stable version here](https://github.com/net-daemon/netdaemon/releases)

### Example docker run configuration

```bash
docker run -d \
  --name netdaemon3 \
  --restart=always \
  -e HomeAssistant__Host=192.168.1.4 \
  -e HomeAssistant__Token=XXXXX \
  -e Logging__LogLevel__Default=Information \
  -e TZ=Europe/Stockholm \
  -v ~/netdaemon_config:/data \
  netdaemon/netdaemon3
```
_Admin gui is currently not supported for V3 yet._

### Example using docker-compose.yaml for
```yaml
version: '3.7'
services:
  netdaemon:
    image: netdaemon/netdaemon3                 # use netdaemon/netdaemon:ver 
                                                # for specific version
    container_name: netdaemon3
    restart: always
    environment:
      - HomeAssistant__Host=your_ip_or_hostname
      - HomeAssistant.Token=your_token
      - Logging__LogLevel__Default=Information  # use Information/Debug/Trace/Warning/Error
      - TZ='Etc/UTC'                            # Set your current timezone
    volumes:
      - /config/netdaemon:/data                 # replace /config/netdaemon 
                                                # to your local folder
```

### Evironment variables
The docker container needs 3 environment variables to run properly.

| ENV                                         | Description                                                                                                                                                             |
| ------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `HomeAssistant__Host`                       | The host that is running Home Assistant (defaults to `localhost`)                                                                                                       |
| `HomeAssistant__Port`                       | The port Home Assistant is running on (default to `8123`)                                                                                                               |
| `HomeAssistant__Token`                       | A Long Lived Acces Token(LLAT) that NetDaemon can use for the comminication with Home Assistant.                                                                        |
| `Logging__LogLevel__Default`                | Defaults to Information, values are (Trace, Debug, Information, Warning, Error)                                                                                         |
| `TZ`                                        | You will need to set container time zone to make the scheduler work properly                                                                                            |
| `NetDaemon__ApplicationAssembly`            | Used to setup more advanced runtime options. Set to `{your_dll}.dll` for published project. For standard dynamically compiled projects you should not set this setting! |
| `NetDaemon__ApplicationConfigurationFolder` | If you want to select another folder for your yaml configurations. Standard is `/data`                                                                                  |

### Volumes

| Vol   | Description                                                                                                                                                                    |
| ----- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| /data | The volume of the netdaemon folder should be mapped to `/data` [See how to setup the correct folder here](installation.md#folder-structure-and-where-to-map-the-docker-volume) |



### Folder structure and where to map the docker volume
The `~/netdaemon_config` need to point to the `netdaemon3` folder. See image below. The **red arrow** in the example configuration below points to the folder that should be mapped to the `/data`!

![](/img/docs/installation/folderstructure_v3.png)

