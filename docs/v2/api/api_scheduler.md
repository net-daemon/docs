---
id: api_scheduler
title: Scheduler
---

One of the key features of NetDaemon is the scheduling features.

:::warning

Even if Observable has schedulers we recommend using the built-in ones. Then all errors is caught and logged. Also you have to take care of the scheduler life cycle your self.

:::

## RunEvery

There are several RunEvery implementations.

### RunDaily

Run daily at specific time.

*You have to use the hh:mm:ss format setting time of day*

```csharp

RunDaily("23:00:00", () => DoSomeWork());

private void DoSomeWork()
{
    // Do stuff
}
```

or maybe just on weekends?. The dayof week will be implemented in future versions but can be solved like this:

```csharp

var DayOfWeek[] weekend = new DayOfWeek[]
{
    DayOfWeek.Saturday,
    DayOfWeek.Sunday,
};

RunDaily("23:00:00", ()=>
{
    if (weekend.Contains(DateTime.Now.DayOfWeek))
    {
        // Do weekend stuff
    }
});

```

### RunEveryMinute/Hour

There are specific implementations of RunEvery... like the RunEveryMinute.

```csharp

RunEveryMinute(0, () => Log("Once a minute at second 0"));

RunEveryHour("15:00", () => Log("Log every hour quater past"));
```

### RunIn

If you need to delay execution a specific time this is the preferred way to do it rather than using await Task.Delay().

```csharp

RunIn(TimeSpan.FromSeconds(10), () => DoStuffInTenSeconds());

```

### Cancel scheduled tasks

Every scheduled task return a `IDisposabe` object. You can use that to cancel any running schedules

```csharp

// set class variable you want to save
_savedSchedulerResult = RunIn(TimeSpan.FromHours(2), () => DoStuffInTwoHours());

...
// Some other function needs to cancel it
_savedSchedulerResult.Dispose();

```
