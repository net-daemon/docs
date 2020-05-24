---
id: api_call_service
title: Call a service
---

One of the most important features is to call services in Home Assistant. Call service takes three parameters, the domain of the service, the service to call and custom data provided. The custom data is a anonymous type that should have same structure as expected input data. Remember to provide the `entity_id`of these services that require it.

### Example of Call Service commands

```csharp

// Same as Entity("light.mylight").TurnOn();
CallService("light", "turn_on", new {entity_id="light.mylight"});

// Call the notify discord service
CallService("notify", "hass_discord", new
        {
            message = "Hello to discord!",
            target = "5114378315684746008"
        });

// Use persistent notification service
CallService("persistent_notification", "create", new
{
    title = "A message has arrived",
    message = "Cool message from NetDaemon!"
});

// Change input selected value
CallService("input_select", "select_option",
    new { entity_id = "input_select.my_select", option = "selected" });

```



