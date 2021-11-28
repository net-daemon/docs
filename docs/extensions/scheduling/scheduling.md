---
id: extensions_scheduling
title: Scheduling extensions
---

If you include the scheduling nuget package with namespace `NetDaemon.Extensions.Scheduler` you can use easy to use and optimized for NetDaemon. We highly recommend using this for scheduling. This package is included as default in NetDaemon runtime and in the project template.

You can do sceduling of one-time calling of functions after a certain time or occuring calls every timeout.
Simple example of scheduling:

```csharp
[NetDaemonApp]
public class MyAppThatUseScheduling
{
    public MyAppThatUseScheduling(INetDaemonScheduler scheduler)
    {
        scheduler.RunIn(TimeSpan.FromMinutes(5), ()=> DoSomething());
        scheduler.RunEvery(TimeSpan.FromMinute(1), () => DoSomethingEveryMinute());
    }
}