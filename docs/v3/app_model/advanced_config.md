---
id: app_model_advanced_config
title: Advanced configuration
---

You can use complex data types for config in yaml instancing.

### Advanced configuration
Examples of configuraitions below

| Yaml type                                                             | .NET type                                                                                                                  |
| --------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| *Scalar* <br/>a_string: hello world <br/>an_int: 10 <br/>a_bool: true | <br/>string? AString {get;set;} <br/>int? AnInt {get;set;} <br/>bool? ABool {get;set;}                                     |
| *Sequences* <br/>simple_list:<br/>  - Hello<br/>  - World             | IEnumerable&ltstring&gt? SimpleList {get;set;} <br/>*sequences are always IEnumerable&lttype&gt, lists are not supported!* |
| Sequence complex                                                      | Se code example                                                                                                            |


#### Example of complex data types support

This example shows an example of how to use complex configuration options. 

```yaml

ComplexConfig: # This should have the same name as class
    AString: hello world
    AnInt: 10
    ABool: true
    AStringList:
    - this
    - is
    - cool!
    Devices:
    - name: tv
        commands:
        - name: command1
            data: some code
        - name: command2
            data: some code2";
```
```csharp
// The app using the config
public class ComplexConfig : NetDaemonApp
{
    public string? AString { get; set; }
    public int? AnInt { get; set; }
    public bool? ABool { get; set; }
    public IEnumerable<string>? AStringList { get; set; }
    public IEnumerable<Device>? Devices { get; set; }
    public void ComplexConfig(IAppConfig<ComplexConfig> config)
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
