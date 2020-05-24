---
id: api_events
title: Events
---

## Subscribe to events

You can subscribe to any events and call a function. Example below is from deconz events and magic cube. The data is provided in dynamic variable.

```csharp

public override void Initialize()
{
    EventChanges
        .Where(
            e => e.Event == "deconz_event" &&
                    e.Data?.id == "tvroom_cube")
        .Subscribe(s =>
        {
            if (s.Data?.gesture == null)
                return;

            double gesture = s.Data?.command;

            switch (gesture)
            {
                case 1:         // Shake
                    Entity(RemoteTVRummet!).Toggle();
                    break;
                case 3:         // Flip
                    PlayPauseMedia();
                    break;
                case 7:         // Turn clockwise
                    VolumeUp();
                    break;
                case 8:         // Turn counter clockwise
                    VolumeDown();
                    break;
            }
        });
}

```
