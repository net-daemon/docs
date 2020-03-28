---
id: scheduler
title: Scheduler
---

One of the key features of NetDaemon is the scheduling features. Not all is documented yet so please setup the dev container and see the intellisense or look at the [scheduling interfaces code](https://github.com/net-daemon/netdaemon/blob/master/src/App/NetDaemon.App/Common/IScheduler.cs)

## RunEvery

There are several RunEvery implementations.

### RunDaily



** You have to use the hh:mm:ss format setting time of day**
```csharp

Scheduler.RunDaily("23:00:00", async () => await CallFunctionWithParameter("Time to sleep").ConfigureAwait(false);

private async Task CallFunctionWithParameter(string message)
{
    // Do stuff
}
```

or maybe just on weekends?
```csharp

Scheduler.RunDaily("23:00:00", new DayOfWeek[]
{
    DayOfWeek.Friday,
    DayOfWeek.Saturday,
}
, async () => await CallFunctionWithParameter("Time to sleep weekend").ConfigureAwait(false);

private async Task CallFunctionWithParameter(string message)
{
    // Do stuff
}

```

### RunEveryMinute
There are specific implementations of RunEvery... like the RunEveryMinute.

```csharp

Scheduler.RunEveryMinute(0, async () => DoStuffEveryMinute().ConfigureAwait(false);

private async Task DoStuffEveryMinute()
{
    // Do stuff
}
```

### RunIn

If you need to delay excecution a specific time this is the prefered way to do it rather than using await Task.Delay().

```csharp

Scheduler.RunIn(TimeSpan.FromSeconds(10), async () => DoStuffInTenSeconds().ConfigureAwait(false));

```

### Cancel scheduled tasks

Every scheduled task return a `ISchedulerResult` object. You can use that to cancel any running schedules

```csharp

// set class variable you want to save
_savedSchedulerResult = Scheduler.RunIn(TimeSpan.FromHours(2), async () => DoStuffInTwoHours().ConfigureAwait(false));

...
// Some other function needs to cancel it
_savedSchedulerResult.CancelSource.Cancel();

```