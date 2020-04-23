---
id: events
title: Events
---

## Subscribe to events

You can subscribe to any events and call a function. Example below is from deconz events and magic cube. The data is provided in dynamic variable. *Do not forget to use the `.Execute();` to end the command.*

```csharp

public override Task InitializeAsync()
{
    Events(n => n.EventId == "deconz_event" && n.Data?.id == "tvroom_cube")
        .Call(async (ev, data) =>
            {
                if (data?.gesture == null)
                    return; // Should have some logging here dooh

                double gesture = data?.gesture;

                switch (gesture)
                {
                    case 1:         // Shake
                        await Entity(RemoteTVRummet).Toggle().ExecuteAsync();
                        break;
                    case 3:         // Flip
                        await PlayPauseMedia();
                        break;
                    case 7:         // Turn clockwise
                        await VolumeUp();
                        break;
                    case 8:         // Turn counter clockwise
                        await VolumeDown();
                        break;
                }

            })
        .Execute();

    // No async calls so just return completed task
    return Task.CompletedTask;
}

```
