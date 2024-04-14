---
id: hass_model_notifications
title: Home Assistant events 
---

Notifications and actionable notifications are an integral part of Home Assistant. Sending Notifications to a particular receiver can be done via the Notify service.

```csharp
var services = new Services(ha);
services.Notify.MobileApp("Test message");
```

Sending an actionable event involves sending a bit more data and responding to a specific event.
The example below is written with anonymous objects for brevity, but can be made type-safe using custom types.

```csharp
var services = new Services(ha);
ha.Events.Where(e => e.EventType == "mobile_app_notification_action")
.Subscribe(e => 
    {
        logger.LogInformation("Received event" + e.DataElement.ToString());
    });

services.Notify.MobileApp(
    "hallo", data:
        new {
            actions = new [] 
            {
                new {
                    action =  "ALARM",
                    title = "Sound Alarm",
                }
            }
        }
    );
```

It is advisable to use a more unique action value as per the [Home Assistant](https://companion.home-assistant.io/docs/notifications/actionable-notifications/) documentation.
