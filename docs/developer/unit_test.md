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
The test class should inherit the `DaemonHostTestBase` class.
```csharp
using System.Threading.Tasks;
using HelloWorld;
using NetDaemon.Daemon.Fakes;
using Xunit;

public class AppTests : DaemonHostTestBase
{
    public AppTests() 
    {
    }
}
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
    // 1. Add the instance of app that we run tests on
    //    This need always need to be first operation
    await AddAppInstance(new HelloWorldApp());

    // 2. Init the fake NetDaemon
    await InitializeFakeDaemon().ConfigureAwait(false);

    // 3. Add change event to simulate update in state
    AddChangedEvent("binary_sensor.mypir", "off", "on");

    // 4. Process events and messages in 
    //    fake Daemon until default timeout 
    //    This ensures all events are handled and 
    //    you app logic is called
    await RunFakeDaemonUntilTimeout().ConfigureAwait(false);

    // 5. Verify that correct service been called. 
    //    for now only underlying service calls can 
    //    be checked. 
    VerifyCallService("light", "turn_on", "light.mylight");
}
```