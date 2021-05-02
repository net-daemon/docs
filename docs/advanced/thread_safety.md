---
id: thread_safety
title: Async & thread safety
---

The NetDaemon is built entirenly on the async model. This means that you never could guarantee thread safety since you never know what operating system thread the app is running on. The good news is that all of NetDaemon APIs are thread safe. As long as you act on events and set states within an app you do not have to worry about being thread safe. There are situations when you **do need to take care of thread safety**.

## Events that trigger actions

One of the most normal cases is to listen to events and do actions on those events like:

```cs
Entity("binary_sensor.kitchen_pir", "binary_sensor.kitchen_pir2")
    .StateChanges
        .Where(e.New?.State == "on" && e.Old?.State=="off")
        .Subscribe(s => Entity("light.light1").TurnOn());
```

In this case the events could theoretically trigger a "TurnOn" on the same time but NetDaemon takes care of the safety to calling Home Assistant backend. Situations like this you will not have to worry about thread safety.

## Shared local variable in an app

Another case is when you might want to store some information or state of your application like the example below.

```cs

public class HouseStateManager : NetDaemonApp
{
    private int _counter = 0;

    public override void Initialize()
    {
        Entity("binary_sensor.kitchen_pir", "binary_sensor.kitchen_pir2")
            .StateChanges
                .Where(e.New?.State == "on")
                .Subscribe(s => _counter++);

        Entity("binary_sensor.kitchen_pir", "binary_sensor.kitchen_pir2")
            .StateChanges
                .Where(e.New?.State == "off")
                .Subscribe(s => _counter--);
    }
}

```

In this case the thread saftey can not be guaranteed. In practice it is very unlikely it does even matter. You will need to trade the unlikelyhood this would ever matter with more complex design. Me the author would not bother to handle thread safety in this case. To be 100% sure you can always use `Interlocked.Increment(_counter);` or `Interlocked.Decrement(_counter);` in this case.

## Static shared variables

It is basically the same as sharing state within an application. See chapter above. In this case I would consider implmenting thread safety if sharing data between apps but i most cases it is not nescessary. If you have one app updating a shared state and several reading it, it would be perfektly ok not to do thread safety.

## Use the global built-in thread safe globals
All apps has a `Global` property that is a thread safe dictionary built-in.
 
## Final words

NetDaemon is built on async programming paradigm. Only guaranteed being thread safe out of the box is the NetDaemon APIs. In most cases you do not have to worry about it but you should always make up your own mind when sharing some kind of state inside or outside the app.
