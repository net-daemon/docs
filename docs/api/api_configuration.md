---
id: api_configuration
title: Configuration
---

All configuration is done with the in yaml files. For clarity we recommend to have one yaml file for each app, named the same as the csharp file but you can configure as many apps and types in one to many yaml files if that is prefered. 

Allways use nullable types!

## Application instance configuration

Example below instanciates an application with id `light_manager_kitchen` and sets a configuration named `the_light` to a string used by the `LightManager` class.

**lightmanager.yaml**

```yaml

light_manager_kitchen:
    class: LightManager
    the_light: light.kitchenlightwindow

```

Inside the app the `the_light` setting is automatically provisioned to the `TheLight` property if provided in the class. NetDaemon converts python style (used in Home Assistant) to c# style property names. You could use the name `the_light` for the property too.

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

### Instantiating Strongly Typed Entities

Many of the basic entity types can be created from a string in the YAML. This avoids having to create them later and you have the simple methods like TurnOn/TurnOff ready to go.

**humiditycontrol.yaml**

```yaml

Humidity_control_kitchen:
    class: HumidityManager
    humidity_sensor: sensor.kitchen_humidity
    humidifier: switch.humidifier

```

```csharp

public class HumidityManager : NetDaemonRxApp
{
    #region -- Config properties --

    // This property will be automapped with ´the_light´ config
    public SensorEntity? HumiditySensor { get; set; }
    public SwitchEntity? Humidifier { get; set; }

    #endregion

    /// <summary>
    ///     Initialize, is automatically run by the daemon
    /// </summary>
    public override void Initialize()
    {
        this.RunEvery(TimeSpan.FromMinutes(5), () =>
            {
         if (humiditySensor?.State?.GetType() == typeof(System.Int64))
                {
                    Int64 humidity = humiditySensor.State;
                    if (humidity > 80)
                    {
                        if (humidifier.State ?? "Unknown" == "off")
                        {
                            humidifier.TurnOn();
                        }
                    }
                    else
                    {
                        if (humidifier?.State ?? "Unknown" == "on")
                        {
                            humidifier.TurnOff();
                        }
                    }


                }
                else
                {
                    this.LogInformation($"Humidity is not in a valid state. Its current value is {(humiditySensor?.State ?? "Unknown")}");
                }
            }
    }
}

```
Note - Currently this cannot be used with a lists or IEnumerable of entities. But this functionality should be included in a release soon.

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
// The app using the config
public class AppComplexConfig : NetDaemonApp
{
    public string? AString { get; set; }
    public int? AnInt { get; set; }
    public bool? ABool { get; set; }
    public IEnumerable<string>? AStringList { get; set; }
    public IEnumerable<Device>? Devices { get; set; }
    public override void Initialize()
    {
        // Use config
        foreach(var device in Devices)
        {
            // Do something useful or fun
        }
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
