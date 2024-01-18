---
id: trouble_call_service
title: Service calls
---

## CallService does not affect the device/entity/area

There are a number of reasons service calls using `CallService` does not work when you use it indirectly through `TurnOn/TurnOff` methods.

### Problems with the actual device/entity

Please check that the device/entity responds to service calls using the GUI. You can find the tool for calling services under the menu item `Developer Tools` and select the `SERVICES" tab. Call the service from there with the exact parameters you are using in NetDaemon. If this works as expected it is time to check what the actual service call is.

### Check the logs

If you do faulty service calls it would normally log an error. Please check your add-on log, container log, or the log where you run the NetDaemon runtime.

### Check the service calls that are created from NetDaemon

Home Assistant has a great feature to be able to track events in the GUI. Use menu item `Developer Tools` and select the `EVENTS` tab. Use the `Listen to events` section. Type in `call_service` in the form `Listening to` and press `START LISTENING`. The example image below shows how it could look when you get an event from turning on a light.

![](/img/docs/trouble/listen_events.png)