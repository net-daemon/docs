---
id: app_model_custom_logging
title: Custom logging
---
This page describes how to create and configure a custom logger. If you are happy with the standard logging described in the [Instance applications](/user/app_model/instancing_apps.md) page then this information probably won't be of interest to you.

### ILogger and Serilog

The default Microsoft implementation of logging comes via the `Microsoft.Extensions.Logging.ILogger` interface that can be configured at application startup and then injected into subsequent classes.

If you are familiar with .NET logging then you may want to go ahead and configure the standard Microsoft logging provider into the application, or you can use [Serilog](https://serilog.net/), which is what we provide in the template application.

### How the default logger is configured

Within `program.cs` the `HostBuilder` startup instructs the framework to use the default NetDaemon logging configuration defined inside the core NetDaemon app:

```csharp
try
{
    await Host.CreateDefaultBuilder(args)
        .UseDefaultNetDaemonLogging()   // <-----
        .UseNetDaemon()
        .Build()
        .RunAsync();
    /// ...
}
```

This configuration builder creates a Console Sink logger with the minimum logging level defined in `appsettings.json`, as described in the [Instance applications](user/app_model/instancing_apps.md) page.

To modify the logging behavior we can create our own logging configuration and replace the default one within `program.cs`.

:::note

An in-depth description of host builders is beyond the scope of this article, but you can find more information on [Microsoft Learn](https://learn.microsoft.com/aspnet/core/fundamentals/host/generic-host).

:::

### Step 1 - create a new logging configuration class

Create a new class file and place it within your app folder (at the `daemonapp` root, alongside `program.cs` is a good place). In this sample we're calling it `CustomLoggingProvider`:

```csharp
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using Serilog;

namespace HomeAssistantGenerated.Logging;

public static class CustomLoggingProvider
{
    /// <summary>
    ///     Adds standard Serilog logging configuration, from appsettings, as per:
    ///     https://github.com/datalust/dotnet6-serilog-example
    /// </summary>
    /// <param name="builder"></param>
    public static IHostBuilder UseCustomLogging(this IHostBuilder builder)
    {
        var configuration = new ConfigurationBuilder()
            .AddJsonFile("appsettings.json")
            .Build();

        var logger = new LoggerConfiguration()
            .ReadFrom.Configuration(configuration)
            .CreateLogger();

        return builder.UseSerilog(logger);
    }
}
```

Here we're stating that its entire behavior will be found in the `appsettings.json` file, which is described in more detail in step 3.

### Step 2 - change program.cs to call the new configuration

Go back to `program.cs` and remove or comment out the call to `UseDefaultNetDaemonLogging()` so that it now looks like this:

```csharp
try
{
    Environment.CurrentDirectory = AppDomain.CurrentDomain.BaseDirectory; // <-- Add if not present
    
    await Host.CreateDefaultBuilder(args)
        //.UseDefaultNetDaemonLogging()   // <-- Remove
        .UseCustomLogging()               // <-- Add
        .UseNetDaemon()
        .Build()
        .RunAsync();
    //...
```

Note that there may be a line in the example above that is not in your `program.cs`:

```csharp
Environment.CurrentDirectory = AppDomain.CurrentDomain.BaseDirectory;
```

If you plan to log to files then it is strongly recommended that you ensure this line is present _before_ you configure logging. This ensures that the log files are written relative the application's launch folder.

### Step 3 - Update appsettings.json

You now need to modify the logging configuration in `appsettings.json`. The first step is to rename the existing `"Logging"` high-level object to `"Serilog"`. Note that we decided to retain the `Serilog` name to keep the configuration consistent with the official documentation.

Here is the original `appsettings.json`:

```json
{
  "Logging": {
    "LogLevel": {
      "Default": "Debug",
      "Microsoft": "Warning"
    },
    "ConsoleThemeType": "Ansi"
  },
  "HomeAssistant": {
      "Host": "localhost",
      "Port": 8123,
      "Ssl": false,
      "Token": "enter_token_here"
  },
  "NetDaemon": {
      "ApplicationConfigurationFolder": "./apps"
  }
}
```

You need to remove the top `"Logging"` section and replace it with a new `"Serilog"` section. Please refer to the original [Serilog documentation](https://github.com/serilog/serilog/wiki/Configuration-Basics) for more detail, but here's an example configuration to get started with:

```json
{
  "Serilog": {
    "MinimumLevel": {
      "Default": "Warning",
      "Override": {
        "System": "Information",
        "Microsoft": "Information",
        "System.Net.Http.HttpClient": "Warning",
        "daemonapp.apps.ScottHome": "Verbose"
      }
    },
    "WriteTo": [
      {
        "Name": "File",
        "Args": {
          "path": "logs/log-.txt",
          "rollingInterval": "Day"
        }
      },
      {
        "Name": "Console",
        "Args": {
          "theme": "Serilog.Sinks.SystemConsole.Themes.AnsiConsoleTheme::Code, Serilog.Sinks.Console",
          "outputTemplate": "[{Timestamp:HH:mm:ss} {Level:u3}] {Message:lj} <s:{SourceContext}>{NewLine}{Exception}"
        }
      }
    ]
  },
  "HomeAssistant": {   // Rest of your config starts here...
```

In order, this configuration performs the following:

* Sets the default log level to `Warning`
* Sets four over-ridden namespaces, which will have their own minimum level:
  * Any scoped logger for a namespace beginning `System.` or `Microsoft.` will default to `Information`
  * The `HttpClient` will default to `Warning` (hint: set this to `Verbose` to see HTTP interactions with the HA server, although be careful that this will also log your authentication key!)
  * My own apps (namespace = `daemonapp.apps.ScottHome`) will default to the most detailed logging levels - replace this with the namespace for your apps
* Two "sinks" are configured, via the `WriteTo` array:
  * A file log will create a new log file based on the date, and roll this over each new day
  * A console log will write to both the HA and dev console logs (note that this is mandatory if you want to see your NetDaemon logs inside Home Assistant)

You should have at least one log "sink" configured, and Serilog offers [many options](https://github.com/serilog/serilog/wiki/Provided-Sinks) including writing to remote logging services.

The example has a write-to-console sink and a file-sink, but feel free to remove the file-sink if you don't need it.

### Additional options / other loggers

For more advanced configuration please see the [Serilog documentation](https://github.com/serilog/serilog/wiki/Getting-Started). You are also free to configure your own logger such as Microsoft's default implementation, or any system that implements the `Microsoft.Extensions.Logging.ILogger` interface.
