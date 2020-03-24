---
id: installation
title: Installation
---
# Install NetDaemon

There are two ways of running NetDaemon, as an add-on running under Home Assistant (previously known as hass.io) or as a docker container.

## Install as a Home Assistant add-on

1. Add the `https://github.com/net-daemon/homeassistant-addon` in `Add new repository URL` to the add-on store.

    ![](/img/docs/started/newrepo.png)

2. Add the NetDaemon add-on.

    ![](/img/docs/started/daemon.png)

3. After you install it, do not start it just yet. We need to configure some stuff manually (will be improved as we come closer to release)

## Install as a docker container


The docker container needs 3 enviroment variables to run properly.

env | description
-- | --
HASS_HOST | The host that is running Home Assistant (defaults to `localhost`).
HASS_PORT | The port Home Assistant is running on (default to `8123`).
HASS_TOKEN  | A Long Lived Acces Token(LLAT) that NetDaemon can use for the comminication with Home Assistant.

```bash
docker run -d \
  --name netdaemon \
  --restart=always \
  -e HASS_HOST=192.168.1.1 \
  -e HASS_TOKEN=XXXXX \
  -v ~/netdaemon_config:/data \
  netdaemon/netdaemon
```
