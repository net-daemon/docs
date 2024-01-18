---
id: app_model_custom_config
title: Custom config
---
This page describes how to create and configure a custom configuration provider. If you are happy with the standard config providers described in the [Instance applications](/user/app_model/instancing_apps.md) page then you don't need to read this page.

### IOptions and ini Files

The default Microsoft implementation of config comes via the `Microsoft.Extensions.Options.IOptions` interface that can be configured at application startup and then injected into subsequent classes.

If you would prefer to use ini files for your config instead of YAML files you can use a [ini file config provider](https://docs.microsoft.com/dotnet/api/microsoft.extensions.configuration.ini.iniconfigurationprovider) (or any other IConfigurationProvider).

### How the default config is configured

Within `program.cs` the `HostBuilder` startup instructs the framework to use the default NetDaemon configuration defined inside the core NetDaemon app:

```csharp
try
{
    await Host.CreateDefaultBuilder(args)
        .UseDefaultNetDaemonLogging()   
        .UseNetDaemonAppSettings()// <-----
        .UseNetDaemon()
        .Build()
        .RunAsync();
    /// ...
}
```

This configuration builder uses the default [config source](https://docs.microsoft.com/dotnet/api/microsoft.extensions.hosting.host.createdefaultbuilder#microsoft-extensions-hosting-host-createdefaultbuilder(system-string())) as well as a YAML file source custom to NetDaemon, as described in the [Instance applications](user/app_model/instancing_apps.md) page.

To modify the config behavior we can create our own config provider within `program.cs`.

:::note

An in-depth description of host builders is beyond the scope of this article, but you can find more information on the [Microsoft Learn](https://docs.microsoft.com/aspnet/core/fundamentals/host/generic-host))

:::

### Step 1 - Change program.cs to add the ini file config provider

Go to `program.cs` and remove or comment out the call to `UseNetDaemonAppSettings()` and add the configuration provider and the NetDaemon config objects so that it now looks like this:

```csharp
try
{
    await Host.CreateDefaultBuilder(args)
        .UseDefaultNetDaemonLogging()   
        //.UseNetDaemonAppSettings()// <-----
        .ConfigureAppConfiguration((context, config) => config.AddIniFile("appsettings.ini", true, true))// <-----
        .ConfigureServices((context, services) =>// <-----
            services.ConfigureNetDaemonServices(context.Configuration)// <-----
        )// <-----
        .UseNetDaemon()
        .Build()
        .RunAsync();
    /// ...
}
```

Note that there may already be a `ConfigureServices` call in your `program.cs`. If one exists simply add this call inside the configure services (keeping what you have as well).

### Step 2 - Create a appsettings.ini file

You now need to create a ini file. In the previous step we set it up as `appsettings.ini`, so we should make a new file named `appsettings.ini` next to your `program.cs`. In this file you can put any custom config you want and it will be available in the app through dependency injection with IOptions.

Here is an example `appsettings.ini`:

```ini
MyConfigValue=My Super Awesome value
```

### Step 3 - Include appsettings.ini in build output

In your `.csproj` file add the following to tell dotnet build to copy the file from the project into the output directory so that it exists at runtime.

```xml
<ItemGroup>
    <None Update="$(MSBuildProjectDir)appsettings.ini">
        <CopyToOutputDirectory>Always</CopyToOutputDirectory>
    </None>
</ItemGroup>
```

### Step 4 - Create our config class

Just like with the the original YAML config we need to make a class that will be used for us to access our values. This class can be placed anywhere as long as it is accessible from your program.cs file.

```csharp
public class ConfigExample
{
  public string MyConfigValue { get; set; }
}
```

### Step 5 - Register your config class

Now that we created the class we will use to access the configuration we need to tell the app to register it. Back in our `program.cs` file we will add a line to `ConfigureServices`:

```csharp
try
{
    await Host.CreateDefaultBuilder(args)
        .UseDefaultNetDaemonLogging()   
        //.UseNetDaemonAppSettings()
        .ConfigureAppConfiguration((context, config) => config.AddIniFile("appsettings.ini", true, true))
        .ConfigureServices((context, services) =>
            services.ConfigureNetDaemonServices(context.Configuration)
                    .Configure<ConfigExample>(context.Configuration)// <-----
        )
        .UseNetDaemon()
        .Build()
        .RunAsync();
    /// ...
}
```

### Step 6 - Use the config

Inside the constructor of any class you want dependency injected (service, app, ect.) add a parameter for `IOptions<ConfigExample>`. Now we can use our config however we please.

```csharp
[NetDaemonApp]
public class MyFancyApp
{

  public MyFancyApp(IOptions<ConfigExample> config, ILogger<MyFancyApp> logger)
  {
    logger.LogInformation($"My config value is {config.MyConfigValue}");
  }
}
```

`MyFancyApp` simply reads the config we set up and writes it to the configured logger(s). When run it would log "My config value is My Super Awesome Value"

### Additional options / other config providers

You are free to add your own custom ConfigProviders or any system that implements the `Microsoft.Extensions.Configuration.IConfigurationProvider` interface.
