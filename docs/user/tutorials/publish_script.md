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
2. In the Open Textbox write \\homeassistant.local\ (adapt if you use a different host name or use the ip adress)
3. You will be prompted to enter User name and Password. Provide your User and Password from your Samba share configuration. Don't forget to tick "Remember my credentials".

The Home Assistant PowerShell Module uses the IP address of Home Assistant to start/stop the addons. It's a anyway a good idea to give a fix IP address to your Home Assistant system.

## The Script

- Create a Powershell file like publish.ps1 in the same folder as your appsettings.json is located.
- Create a subfolder "Home-Assistant" and copy the two files from the PowerShell Module into it.

```powershell
$settings = (Get-Content appsettings.json | ConvertFrom-Json)

#CHANGE ME
$slug = 'c6a2317c_netdaemon5' # the slug can be found in the url of the browser when navigating to the NetDaemon addon

$version = $slug.Split('_')[-1] # adapt if you are not using the default foldername for the addon
$json = '{"addon": "' + $slug + '"}'   
$ip   = $settings.HomeAssistant.Host               
$port = $settings.HomeAssistant.Port                           

$token = $settings.HomeAssistant.Token  

# Point to the HA PowerSHell Module
Unblock-File .\Home-Assistant\Home-Assistant.psd1
Unblock-File .\Home-Assistant\Home-Assistant.psm1
Import-Module .\Home-Assistant
  
New-HomeAssistantSession -ip  $ip -port $port -token $token

Invoke-HomeAssistantService -service hassio.addon_stop -json $json

Remove-Item -Recurse -Force \\$ip\config\$version\*
dotnet publish -c Release HomeAssistant.csproj -o \\$ip\config\$version

Invoke-HomeAssistantService -service hassio.addon_start -json $json
```
