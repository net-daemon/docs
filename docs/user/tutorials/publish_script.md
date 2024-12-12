---
id: publish_script
title: Publish NetDaemon apps with PowerShell
---

## Audience
- NetDaemon developers using Home Assistant OS on a system like Raspberry  Pi, ODROID, etc. 
- Development under Windows (might work also for other OS but hasn't been tested)

## Goal
Write an PowerShell script that deploys your apps to Home Assistant with the following steps:

1. Stop the NetDaemon AddOn
2. Delete the old installation
3. Publish the new installation
4. Restart the NetDaemon AddOn

## Prerequirements
- [Samba share](https://github.com/home-assistant/addons/tree/master/samba) installed
- [Home Assistant PowerShell Module](https://github.com/flemmingss/Home-Assistant-PowerShell-Module)

After installing Samba share, please make sure that you can access your Home Assistant share from your machine:
1. Press Windows + R to open the Run dialog
2. In the Open Textbox write \\homeassistant.local\ (adapt if you use a different host name)
3. You will be prompted to enter User name and Password. Provide your User and Password from your Samba share configuration. Don't forget to tick "Remember my credentials".

The Home Assistant PowerShell Module uses the IP address of Home Assistant to start/stop the addons. It's a anyway a good idea to give a fix IP address to your Home Assistant system.

## The Script

- Create a Powershell file like publish.ps1.
- Create a subfolder "Home-Assistant" and copy the two files from the PowerShell Module into it.

```powershell
$slug = 'c6a2317c_netdaemon5'        # the slug can be found in the url of the browser when navigating to the NetDaemon addon
$json = '{"addon": "' + $slug + '"}'   
$ip   = "192.168.0.44"                 # adapt to your IP address
$port = 8123                           # change if your use another port

$token = "Long-Lived Access Token"     # generate one here http://homeassistant.local:8123/profile 

# Point to the HA PowerSHell Module
Unblock-File .\Home-Assistant\Home-Assistant.psd1
Unblock-File .\Home-Assistant\Home-Assistant.psm1
Import-Module .\Home-Assistant

New-HomeAssistantSession -ip  $ip -port $port -token $token

Invoke-HomeAssistantService -service HASSIO.ADDON_STOP -json $json

Remove-Item -Recurse -Force \\homeassistant.local\config\netdaemon3\*
dotnet publish -c Release HomeAssistant.csproj -o \\homeassistant.local\config\netdaemon3

Invoke-HomeAssistantService -service HASSIO.ADDON_START -json $json
```
