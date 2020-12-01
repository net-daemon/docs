---
id: api_callback
title: Callback functions
---

In NetDaemon it is possible to get callbacks from service calls. This feature requires the companion custom component installed in Home Assistant. You can find the companion app in [netdaemon repo](https://github.com/net-daemon/netdaemon#companion-app-home-assistant)

Remember to add the component in your Home Assistant config file:
```yaml
netdaemon:
```
If you use the `[HomeAssistantServiceCall]` attribute on a callback function, se example below, NetDaemon automatically registers a service call that you can use from Home Assistant to call code in your apps. The name of the call will be `netdaemon.name_of_function`. It will convert all upper case to `_` to use snake casing. So function called `CallMeFromHass` will be named `netdaemon.call_me_from_hass`


## Callback function method

Callback function works both as syncronous and asyncronious function calls.

```csharp
/*  */
// Sync version
[HomeAssistantServiceCall]
public void CallMeFromHass(dynamic data)
{
    Log("A call from hass! {data}", data);
}

// Async version
[HomeAssistantServiceCall]
public async Task CallMeTooFromHass(dynamic data)
{
    Log("A call from hass! {data}", data);
}

```

## Data sent in service call

You can send any data and it will be received as dynamic variable in callback function. List will be list of objects, objects will be properties. 

Example of service calls and how to parse them:

Data from Home Assistant
```yaml
a_list_of_strings:
  - Hello
  - World
```

```csharp
[HomeAssistantServiceCall]
public void CallMeFromHass(dynamic data)
{
    var hello = data.a_list_of_strings[0];
    var world = data.a_list_of_strings[1];

    Log("list is : {hello} {world}", hello, world);
}
```

Data from Home Assistant
```yaml
an_int: 10
a_bool: true
a_string: "hello world"
```

```csharp
[HomeAssistantServiceCall]
public void CallMeFromHass(dynamic data)
{
    Log("int: {int}, bool: {bool}, string: {string}",
        data.an_int, data.a_bool, data.a_string);
}
```