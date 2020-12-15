---
id: api_configuration
title: Configuration
---

All configuration is done with the in yaml files. For clarity we recommend to have one yaml file for each app, named the same as the csharp file but you can configure as many apps and types in one to many yaml files if that is prefered. 

Allways use nullable types!

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

public class LightManager : NetDaemonRxApp
{
    #region -- Config properties --

    // This property will be automapped with ´the_light´ config
    public string? TheLight { get; set; }

    #endregion

    /// <summary>
    ///     Initialize, is automatically run by the daemon
    /// </summary>
    public override void Initialize()
    {
        Entity(TheLight).TurnOn();
    }
}

```


### Advanced configurations options

| Yaml type                                             | .NET type                                                                |
|-------------------------------------------------------|--------------------------------------------------------------------------|
| *Scalar* <br/>a_string: hello world <br/>an_int: 10 <br/>a_bool: true |<br/>string? AString {get;set;} <br/>int? AnInt {get;set;} <br/>bool? ABool {get;set;} |
| *Sequences* <br/>simple_list:<br/>  - Hello<br/>  - World           |  IEnumerable&ltstring&gt? SimpleList {get;set;} <br/>*sequences are always IEnumerable&lttype&gt, lists are not supported!*                             |
| Sequence complex                                      | Se code example                                                          |


### Example of complex data types support

This example shows an example of how to use complex configuration options. 

```yaml

complex_app:
    class: AppComplexContif
    a_string: hello world
    an_int: 10
    a_bool: true
    a_string_list:
    - this
    - is
    - cool!
    devices:
    - name: tv
        commands:
        - name: command1
            data: some code
        - name: command2
            data: some code2";
```
```csharp

public class AppComplexConfig : NetDaemonApp
{
    public string? AString { get; set; }
    public int? AnInt { get; set; }
    public bool? ABool { get; set; }
    public IEnumerable<string>? AStringList { get; set; }
    public IEnumerable<Device>? Devices { get; set; }
    public override Task InitializeAsync()
    {
        // Do nothing

        return Task.CompletedTask;
    }
}

public class Device
{
    public string? name { get; set; }
    public IEnumerable<Command>? commands { get; set; }
}
public class Command
{
    public string? name { get; set; }
    public string? data { get; set; }
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

depedning on what kind of secret you may have to quote the secret like this:

```yaml

the_api_manager:
    class: APIManager
    secret_number: "!secret mysecret_number_token"

```
