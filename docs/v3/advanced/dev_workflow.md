---
id: dev_workflow3
title: Development workflow
---

## Development workflow

## Test individual applications in development environment

Over time a single NetDaemon solution might contain a large number of applications. While you are working on one NetDaemon app in your development environment you might not want to run all the NetDaemon applications each time you run it for testing or debugging.

You can do this by applying the `[Focus]` Attribute to the app class(es) you want to test. If one or more apps have this attribute set NetDaemon will only launch these applications and ignore all others. 
This will only apply to `development` environment, in all other environments this attribute is ignored. To set the environment to development while debugging make sure the environment variable `DOTNET_ENVIRONMENT` or `ASPNETCORE_ENVIRONMENT` is set to `Development` in the startup settings of your IDE


```csharp
[Focus]
public class HelloWorldApp 
{
    public HelloWorldApp(IHaContext ha)
    {
        // I am the only app started
    }
}
```

### Additional information on development environment settings

This [Microsoft article](https://docs.microsoft.com/en-us/aspnet/core/fundamentals/environments?view=aspnetcore-6.0)
gives more detail on how the application can be configured for a Development or non-Development environment.

If you find that the netdaemon apps that you have deployed to your Home Assistant system are running in Development
mode (because, for example, the `[Focus]` attribute is being enforced in production) then check whether
any of the environment has set either of the `DOTNET_ENVIRONMENT` or `ASPNETCORE_ENVIRONMENT` variables.
Note that a cause of this can be if you've deployed the `Properties/launchSettings.json` file to Home Assistant:
this file should not be deployed into production.
