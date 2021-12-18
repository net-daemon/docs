---
id: hass_model_integration_servicecallback
title: Callback services 
---

From NetDaemon you can register services in Home Assistant and get a callback whenever this service is triggered. For example by an automation or script that runs inside Home Assitant

This feature requires you to install the [NetDaemon integration](/docs/started/integration) and use the JoySoftware.NetDaemon.HassModel.Integration nuget package:


```shell
PM> Install-Package JoySoftware.NetDaemon.HassModel.Integration -Version 21.50.1
```


Then all you have to do is call the `RegisterServiceCallBack()` extension method on the IHaContext and pass a name for the service and a callback.

```csharp
ha.RegisterServiceCallBack<ServiceData>("callback_demo", 
   e => _logger.LogInformation("Service called action: {Action} value: {value}", e?.action, e?.value));

// ...
record ServiceData(string? action, int value);
```

The Type parameter specifies the type that is used to deserialize the arguments from the service call. It will be passed to the callback delegate with the deserialized data.

To test this service, run an app with this code and then go to the developer tools in your home assistant https://my.home-assistant.io/redirect/developer_call_service/?service=netdaemon.callback_demo


And post the folowing yaml 
```yaml
service: netdaemon.callback_demo
data: 
  action: heat
  value: 22
```

This will then trigger the callback inside the NetDaemon app