---
id: extensions_scheduling
title: Scheduling extension
---

Many application require some sort of scheduled or periodic task to be executed. Like switching off lights at a specific time.

There are several ways to do this in .Net that may or may not be suitable for use in NetDaemon apps. NetDaemon has an extension that supports scheduling based on the standard `System.Reactive.Concurrency.IScheduler` interface. It is recomended to use this extension for scheduling tasks, as it will automatically cancel tasks when an app is stopped and it adds support for CRON expressions.

### Setup

If you use the NetDaemon project template you will already have the scheduler available and you can skip this setup.

To set up the scheduler manually you should:

* Include the JoySoftware.NetDaemon.Extensions.Scheduling nuget package 

```ps
Install-Package JoySoftware.NetDaemon.Extensions.Scheduling 
```

* Make sure to call .AddNetDaemonScheduler() on the ServiceCollection in the hosts Program.cs

```csharp
.ConfigureServices((_, services) =>
    services
        .AddAppsFromAssembly(Assembly.GetExecutingAssembly())
        .AddNetDaemonStateManager()
        .AddNetDaemonScheduler()
```

### Injecting the scheduler

You can get an instance of the IScheduler interface simply by injecting it into your apps constructor

```csharp
using System.Reactive.Concurrency.Scheduler; 

[NetDaemonApp]
class MyApp(IScheduler scheduler)
{ }
```

The scheduler you will receive is based on the `System.Reactive.Concurrency.DefaultScheduler.Instance`. This scheduler is however wrapped with additional behaviour that will make sure that any tasks you schedule on this scheduler will be cancelled when the application is stopped. It will also log exceptions from scheduled tasks to the configured ILogger.

### Using the Scheduler
The `System.Reactive.Concurrency.Scheduler` namespace provides several extension methods for `IScheduler` that allow you to schedule tasks at a specific time, after a specific time span or periodic. You can use these framework provided methods directly on the scheduler you got via the constructor and they wil be scheduled using the cancellation and logging behaviour.

Eg. to turn off the lights in my living in 2 minutes from now I can use:
```csharp
scheduler.Schedule(TimeSpan.FromMinutes(2), () => entities.Light.Living.TurnOff());
```

Scheduling periodic jobs using the default scheduling methods have some limitations
* Setting up more advanced schedules can be complicated.
* Running jobs at a specific time of a day can cause problems with daylight saving time.
* When a job throws an exception it will be logged, but still subsequent jobs of this schedule are not executed.

As a more convenient way to schedule periodic tasks, the NetDaemon Scheduling Extensions provides an extension method `ScheduleCron()`. This can be used like this:

```csharp
public CronSchedulingApp(IHaContext ha, IScheduler scheduler)
{
    var entities = new Entities(ha); 
    scheduler.ScheduleCron("45 23 * * *", () => entities.Light.Living.TurnOff());
}
```
Which will turn off the living room light at 23:45 each day. 

The first argument of this method is a [CRON expression](https://en.wikipedia.org/wiki/Cron) that describes the pattern of the schedule. Cron supports schedules based on minute hour day month day of week. This CRON expression will be evaluated using the local timezone that is setup for your environment.

The `ScheduleCron()` extension method uses [Cronos](https://github.com/HangfireIO/Cronos) to parse your CRON expression. See its docs for the exact specification.

## Unit testing scheduling apps
Timing in some apps can be pretty complicated. It can therefore be usefull to create unit tests for your schudeules. For this purpose there is a special version of the IScheduler interface implemented by `Microsoft.Reactive.Testing.TestScheduler` in the `Microsoft.Reactive.Testing` nuget package 

This scheduler allows you to do time traveling in unit tests like this:

```csharp
[Fact]
public void TestCron()
{
    var haContextMoq = new Mock<IHaContext>();

    var testScheduler = new Microsoft.Reactive.Testing.TestScheduler();
    testScheduler.AdvanceTo(new DateTime(2020, 2, 1, 23, 44, 0).ToUniversalTime().Ticks);

    var app = new CronSchedulingApp(haContextMoq.Object, testScheduler);

    haContextMoq.VerifyNoOtherCalls();
    testScheduler.AdvanceBy(TimeSpan.FromMinutes(1).Ticks);
    
    haContextMoq.Verify(h => h.CallService("light", "turn_off",
        It.Is<ServiceTarget>(s => s.EntityIds!.Single() == "light.living"),
        It.IsAny<LightTurnOffParameters>()));
}
```

The `TestScheduler` is initially setup to `23:44` local time, just before the lights are supposed to be turned off. The testcode then creates an instance of our `CronSchedulingApp` and passes it a mock of the `IHacontext` and the `TestScheduler`. Initially no calls should be made on the `IHaContext`. But when the `TestScheduler` advances 1 minute we expect the app to call `CallService` on the `IHaContext` to turn of the lights in the livingroom