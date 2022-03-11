---
id: app_model_advanced_config
title: Advanced configuration
---

You can use complex data types for config in yaml instancing. Make sure you are not using immutable datatypes like strings or read-only collections without making them nullable. For collections we recommend using IList&ltT&gt that are instanced with List&ltT&gt if you do not want to be nullable.

*V3 no longer support snake casing yaml config. The names needs to match case sensitive name of property or class.*

### Advanced configuration
Examples of configuraitions below

| Yaml type                                                             | .NET type                                                                                                                  |
| --------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| *Scalar* <br/>AString: hello world <br/>AnInt: 10 <br/>ABool: true | <br/>string? AString {get;set;} <br/>int? AnInt {get;set;} <br/>bool? ABool {get;set;}                                     |
| *Sequences* <br/>SimpleList:<br/>  - Hello<br/>  - World             | IList&ltstring&gt SimpleList {get;set;} <br/>Sequences can also be IEnumerable&lttype&gt but needs to be nullable in that case |

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
[NetDaemonApp]
public class ComplexConfigApp
{

    public ComplexConfigApp(IAppConfig<ComplexConfig> config)
    {
        ComplexConfig complexConfig = config.Value;
        
        // Use config
        foreach(var device in complexConfig.Devices)
        {
            // Do something useful or fun
        }
    }
}

public class ComplexConfig
{
    public string? AString { get; set; }
    public int? AnInt { get; set; }
    public bool? ABool { get; set; }
    public IList<string> AStringList { get; set; } 
    public IEnumerable<Device>? Devices { get; set; } 
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
