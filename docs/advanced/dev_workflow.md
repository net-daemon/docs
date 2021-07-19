---
id: dev_workflow
title: Development workflow
---

# Development workflow

## Test individual applications in development environment

Over time a single NetDaemon solution might contain a large number of applications. While you are working on one NetDaemon app in your development environment you might not want to run all the NetDaemon applications each time you run it for testing.

You can do this by applying  the `[Focus]` Attribute to the app class(es) you want to test. If one or more apps have this attribute set NetDaemon will only launch these applications and ugnore all others. 
This will only apply to `development` environment, in all other environments this attribute is ignored.


```c#
[Focus]
public class HelloWorldApp : NetDaemonRxApp
{
    public override void Initialize()
    {
        Log("Hello World!");
    }

}
```