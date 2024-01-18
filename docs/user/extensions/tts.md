---
id: extensions_tts
title: Text to speech
---

NetDaemon provides an extension that adds more features for text to speech. If you do not need these extra features you can use the code generator to get a nice API to use text to speech functionality.

The main feature of this extension is that it queues all messages in order and waits for each message to be completed before sending next one to provided media player.

The following example shows how to use the TTS service in your own apps:

```csharp

[NetDaemonApp]
public class MyTtsApp
{
    public MyTtsApp(ITextToSpeechService tts)
    {
        // This uses the google service you may use some other like google cloud version, google_cloud_say
        tts.Speak("media_player.kitchen", "Hello this is first queued message", "google_say"); 
        tts.Speak("media_player.kitchen", "Hello this is second queued message", "google_say"); 
    }
}

```

If you use source deployment with the NetDaemon add-on or Docker image this dependency is already included. If you are missing it add:

```cmd
dotnet add package NetDaemon.Extensions.Tts
```

And add the tts service to the host in `program.cs`:

```csharp
await Host.CreateDefaultBuilder(args)
        .UseNetDaemonTextToSpeech()
```
