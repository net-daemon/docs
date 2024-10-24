---
id: unauthorized
title: Unauthorized
---

## Unauthorized

If you find yourself having setup NetDaemon and HomeAssistant, but you get `401`-message, there's a few things to check;

1. The environment settings for NetDaemon `HomeAssistant__Host`, `HomeAssistant__Port`, and `HomeAssistant__Token` must be set to point at the Home Assistant container.
1. Home Assistant has a [configuration.yaml](https://www.home-assistant.io/integrations/http/) file where it allows external calls. Set it up with the following section:

```yaml
http:
  use_x_forwarded_for: true
  trusted_proxies:
    - 127.0.0.1      # Localhost
    - 192.168.1.0/24 # Local LAN subnet, if this is your local computer's network
    # If you have setup a Docker network, you can also add those to this list
``` 

3. The user with which you generated a Long Lived Access Token must **not** have set the property "Local access only", which the administrator of the user can set.
