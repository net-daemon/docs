---
id: tips_and_tricks
title: Tips & tricks
---
## The file structure

All automation files is in the `netdaemon` folder directly under your configuration folder. Typically you access these files within vscode or any other editor. Your root directory in your editor should look something like this.:

![](/img/docs/started/rootdir.png)

## Get intellisense

Before coding, run the `dotnet restore` to get intellisense.

## Code snippets

We provide some code snippets to create a new app. Check it out.. In vscode, in the cs code file press `ctrl+space` and select.. More will come later.

## Your automations are not triggered

There is a good chance you forgot the `..Execute()` or `await ..ExecuteAsync()`. The API is fluent and needs the end function to work. Please check you are using them as expected.

## Async model

NetDaemon is built on .NET and cs async model. It is important that you read up on async programming model. But here is some basics!

### Use the await keyword

Whenever you see a function return a `Task` and mostly these functions has the postfix `Async`. Use the keyword `await` before calling. If you miss the await keyword you will not able to catch any errors generated in the async method. Example using the fluent API below:

```csharp
private async Task MyAsyncFunctionDoingStuff()
{
    await MediaPlayer("media_player.cool_player")
                .Pause().ExecuteAsync();
}
```

Remember that the function needs to be async containing this call as the example shows.

### Do not use Thread.Sleep()

!!! danger
    Never use `Thread.Sleep();`! It is very important that you never block async operations. Use the `await Task.Delay();` instead if you need to pause execution.
