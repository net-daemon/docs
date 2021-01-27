---
id: unit_test
title: Unit testing 
---

## Unit testing in NetDaemon
NetDaemon provides fakes and mocks to unit test your automations. *This is currently in pre-release so expect the API to be finilized until stable* 
Unit test samples are provided as a part of the official app development template on [github](https://github.com/net-daemon/netdaemon-app-template)

## NetDaemon nuget package for tests
All the funktionality is provided by the `JoySoftware.NetDaemon.Fakes` component.

## Baseclass for tests
The test class should inherit the `RxAppMock` class.
```csharp
using NetDaemon.Daemon.Fakes;
using Xunit;
using HelloWorld;

/// <summary>
///     Tests the apps
/// </summary>
public class AppTests : RxAppMock
{
    ...
```

## Basics of writing tests
The fakes are running the NetDaemon core logic in the background as async messages. This is why the tests needs to be in `async` to ensure proper operation.

As an example we want to test the automation below:
```csharp

Entity("binary_sensor.mypir").StateChanges
    .Where(e => e.New?.State == "on")
    .Subscribe(
        e =>
        {
            Entity("light.mylight").TurnOn();
        }
    );
```
Then we make the following test method
The daemon fake needs to be initialized and ran in specific order for the unit test to work like in the example below:
```csharp
[Fact]
public async Task WhenMyPirIsActivatedThenMyLightShouldTurnOn()
{
    // 1. Instance the app, preferable you make new class for implementation
    //    and initialize it
    HelloWorldImplementation app = new(Object);
    app.Initialize();

    // 3. Trigger a change event to simulate update in state
    TriggerStateChange("binary_sensor.mypir", "off", "on");

    // 3. Use the built-in verify functions to verify actions
    VerifyEntityTurnOn("light.mylight");
}
```
## Using Scheduler in unit Tests
You can use Time Travel funtionality to test configured Schedulers

As an example we want to test the automation below:
```csharp
    _app.RunIn(TimeSpan.FromMilliseconds(100), () => _app.Entity("light.mylight").TurnOn());
```
Then we make the following test method

This is how you time travel `TestScheduler.AdvanceBy(TimeSpan.FromMilliseconds(100).Ticks);`
```csharp
[Fact]
public async Task WhenMyPirIsActivatedThenMyLightShouldTurnOn()
{
    [Fact]
    public void TestFakeRunIn()
    {
        // ARRANGE
        FakeMockableAppImplementation app = new(Object);
        app.Initialize();

        // ACT
        TestScheduler.AdvanceBy(TimeSpan.FromMilliseconds(100).Ticks);

        // ASSERT
        VerifyEntityTurnOn("binary_sensor.fake_run_in_happened", times: Times.Once());
    }
}
```
