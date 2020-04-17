---
id: configuration
title: Configuration
---

All configuration is done with the in yaml files. For clarity we recommend to have one yaml file for each app, named the same as the csharp file but you can configure as many apps and types in one to many yaml files if that is prefered.

## Application instance configuration

Example below instance an application with id `light_manager_kitchen` and sets a configuration named `the_light` to a string used by the `LightManager` class.

**lightmanager.yaml**

```yaml

light_manager_kitchen:
    class: LightManager
    the_light: light.kitchenlightwindow

```

Inside the app the `the_light` setting is automatically provitioned to the `TheLight`property if provided in the class. NetDaemon converts python style (used in Home Assistant) to c# style property names. You could use the name `the_light` for the property too.

```csharp

public class LightManager : NetDaemonApp
{
    #region -- Config properties --

    // This property will be automapped with ´the_light´ config
    public string? TheLight { get; set; }

    #endregion

    /// <summary>
    ///     Initialize, is automatically run by the daemon
    /// </summary>
    public override async Task InitializeAsync()
    {
        await Entity(TheLight).TurnOn().ExecuteAsync();
    }
}

```

## Secrets

Secrets lets you store special variables that are global in the tree scope of the app. `secrets.yaml` can be excluded in `.gitignore` to makse sure sensitive data is not pushed to the git repo.

This is how to use secrets. Make any file called `secrets.yaml`. The application will use the configuration in the first secret file it finds in the path.

**secrets.yaml**

```yaml

mysecret_token: this is a secret!

```

**app.yaml**

```yaml

the_api_manager:
    class: APIManager
    token: !secret mysecret_token

```
