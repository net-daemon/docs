---
id: installation
title: Install NetDaemon runtime
---

There are several ways to deploy your apps:

- Using a Home Assistant add-on
- In the NetDaemon docker container
- Or using the template as base to deploy your own setup


## Deploy as Home Assistant add-on

Once added to Home Assistant, select one of the V3 versions. If you feel you always want the latest and greatest changes you can choose the dev build but be prepare that things can break!

1. Make a folder structure under your Home Assistant configuration directory to use for NetDaemon apps. `/config/netdaemon3`  
2. Add the `https://github.com/net-daemon/homeassistant-addon` in `Add new repository URL` to the add-on store.

    ![](/img/docs/started/newrepo.png)

3. Add the NetDaemon add-on.

    ![](/img/docs/started/daemon3.png)

4. Deploy your apps and evenutall yaml config files in the folder `/config/netdaemon3`.

### Deploy compiled assemblies and configurations

Copy your published files from `dotnet publish -c Release -o [outputdir]` to `/config/netdaemon3`. All the binaries and configuration should be copied.

In the add-on config, specify the `app_assembly` setting to point to the assembly relative to your `/config/netdaemon3` folder. This assembly should be the entry assembly (dll) from your project template. You can also add a path to the configuration folder separately if you want. See example of how configuration below should look like using default template. The name of the assembly may be different:

![](/img/docs/started/daemon_addon_config.png)

### Deploy source files and configurations

Copy the `.cs` and `.yaml` files to `/config/netdaemon3` folder from the `apps folder` using the template project and start/restart the add-on.

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
    image: netdaemon/netdaemon3                 # use netdaemon/netdaemon3:ver 
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
| `HomeAssistant__Ssl`                       | Set to True if SSL is used to access Home Assistant.                                                                                                               |
| `HomeAssistant__Token`                       | A Long Lived Access Token(LLAT) that NetDaemon can use for the comminication with Home Assistant.                                                                        |
| `HomeAssistant__InsecureBypassCertificateErrors`                       | Ignores certificate errors. Please use at own risk.                                                                        |
| `Logging__LogLevel__Default`                | Defaults to Information, values are (Trace, Debug, Information, Warning, Error)                                                                                         |
| `TZ`                                        | You will need to set container time zone to make the scheduler work properly                                                                                            |
| `NetDaemon__ApplicationAssembly`            | Used to setup more advanced runtime options. Set to `{your_assembly}.dll` for published projects. For source deployment you should not set this setting! |
| `NetDaemon__ApplicationConfigurationFolder` | If you want to select another folder for your yaml configurations. Standard is `/data`                                                                                  |

### Volumes

| Vol   | Description                                                                                                                                                                    |
| ----- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| /data | The volume of the netdaemon folder should be mapped to `/data` [See how to setup the correct folder here](installation.md#folder-structure-and-where-to-map-the-docker-volume) |


### Folder structure and where to map the docker volume

The `~/netdaemon_config` need to point to a local folder. See image below where the local folder is named `netdaemon3` and should be mapped as volume to the `/data`!

![](/img/docs/installation/folderstructure_v3.png)
