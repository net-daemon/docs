---
id: hass_model_subscribe_to_triggers
title: Subscribe to triggers
---

NetDaemon HassModel provides an API to allow subscription to triggers. 

:::warning
Please consider trigger support beta and API:s can change upon release.
:::

:::note

We have no means to make code generation objects to use with this feature. This means you will have to call the subscription with anonymous objects in the same structure that is [documented here](https://www.home-assistant.io/docs/automation/trigger/). You will also need to log the websocket raw message for response message in order to parse results correctly with your custom record class. Luckily we have a way to get the raw event message from Home Assistant with an convenient interface.

We might add record classes to use for responses at a later time.
:::

## How to subscribe to an an trigger

You can inject the `ITriggerManager` interface to use the trigger subscription feature. The `RegisterTrigger` returns a `IObservable<JsonElement>` that you can deserialize to a POCO. You can also use `RegisterTrigger<T>` to have the result return a `IObservable<T>` that deserialize to POCO for you.

```csharp
    public TheApp(ITriggerManager triggerManager)
    {    
        var triggerObservable = triggerManager.RegisterTrigger(
        new
        {
            platform = "state",
            entity_id = new string[] { "media_player.vardagsrum" },
            from = new string[] { "idle", "playing" },
            to = "off"
        });
    triggerObservable.Subscribe(n => 
            // Do some magic here
        );
    }

```

You always need to provide the platform attribute. The id can be set to a unique text or if not set, Home assistant will set one. Everything else is dependent on the platform/type of trigger.

Below is an example using a record class representing the response for the trigger subscription. This example also sets an id for the trigger.

```csharp
    // Record representing result from subscription
    record TimePatternResult(string id, string alias, string platform, DateTimeOffset now, string description);
    // ... ctr of your app
    public TimeApp(ITriggerManager triggerManager)
    {    
        var timePatternTriggerObservable = triggerManager.RegisterTrigger<TimePatternResult>(new
        {
            platform = "time_pattern",
            id = "some id",
            seconds = "/1"
        });
        
        var disposedSubscription = timePatternTriggerObservable.Subscribe(n => 
            _logger.LogCritical("Got trigger message: {Message}", n)
        );
    }
```

## How to check the trigger result data structure

The easiest way is to inject a NetDaemon client interface to log all messages that are received after you use the `RegisterTrigger` function.

```csharp
    public CheckResultFormatApp(ILogger<CheckResultFormatApp> logger, ITriggerManager triggerManager, IHomeAssistantRunner runner)
    {
        _logger = logger;

        // This interface in the client project will allow subscribe to all raw Home Assistant websocket messages.
        var haMessages = (IHomeAssistantHassMessages)runner.CurrentConnection!;

        haMessages.OnHassMessage.Subscribe(m => logger.LogInformation("{Message}", m));
        
        // Do your trigger magic... and the previous subscription will log every message from this trigger.
        var triggerObservable = triggerManager.RegisterTrigger(
        new
        {
            platform = "state",
            entity_id = new string[] { "media_player.vardagsrum" },
            from = new string[] { "idle", "playing" },
            to = "off"
        });
```

Now it should log every message received. Check for the `TriggerElement` property. It has the response. It is recommended to use a single app for this or use `[Focus]` flag so you do not get flooded with messages.

From the results it should be fairly easy to construct a record that allows for deserializing the result and then use the `RegisterTrigger<T>` method instead.
