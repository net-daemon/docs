---
id: getstate
title: State
---

## Get State of an entity

The method for getting state is using the `State` dictionary. It is thread safe dictionary containing all states in Home Assistant. All states are read at start-up and kept in sync by the netdaemon. This means that getting current state does not make a network call to Home Assistant that in most cases will be cached value. This is very efficient performance wise and will be sufficient in most cases. There might me an API addition in the future that let you get the value from the server directly.

Basic example getting state:

Using the new nullable features in c# 8 you can easily get state or null (no state found)

```csharp
string? state = GetState("light.light1")?.State;
if (state is object)
{
    // Not null
    ...
}

```

Or get all information from the entity state:

This is not async since state is kept in memory and synced in background.

```csharp

string? entityState = GetState("light.light1");
if (entityState != null)
{
    var entityId = entityState.EntityId;
    var state = entityState.State;
    var brightness = entityState?.Attribute?.brightness;
    var lastUpdated = entityState?.LastUpdated; //DateTime in local time
    var lastChanged = entityState?.LastChanged; //DateTime in local time
}

```

# Tips and tricks of the old api

## Your automations are not triggered

There is a good chance you forgot the `..Execute()` or `await ..ExecuteAsync()`. The API is fluent and needs the end function to work. Please check you are using them as expected.

## Async model

NetDaemon is built on .NET and cs async model. It is important that you read up on async programming model. But here is some basics!

### Use the await keyword

Whenever you see a function return a `Task` and mostly these functions has the postfix `Async`. Use the keyword `await` before calling. If you miss the await keyword you will not able to catch any errors generated in the async method. Example using the fluent API below:

```csharp
private async Task MyAsyncFunctionDoingStuff()
{
    await MediaPlayer("media_player.cool_player")
                .Pause().ExecuteAsync();
}
```

Remember that the function needs to be async containing this call as the example shows.

### Do not use Thread.Sleep()

!!! danger
    Never use `Thread.Sleep();`! It is very important that you never block async operations. Use the `await Task.Delay();` instead if you need to pause execution.