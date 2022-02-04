---
id: extensions_tts
title: Text to speech
---

NetDaemon provides an extension that adds more features for text to speech. If you do not need these extra features you can use the code generator to get a nice API to the text to speech.

The main feature of this extension is that it is queueing all messages in order and wait for each message to be complete before sending next one to provided media player.

Following example shows how to use the TTS service in your own apps.

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