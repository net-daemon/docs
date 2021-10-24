---
id: hass_model_generated_service
title: Using generated service
---

The HassModel Code Generator can be used to generate strongtyped code to access all services available in Home Assistant.

Example:
```c#
using NetDaemon.Common;
using NetDaemon.HassModel.Common;
using NetDaemon.HassModel.Entities;
using UserApp.GeneratedCode;

namespace NetDaemon.DevelopmentApps.apps.Examples
{
    [NetDaemonApp]
    public class ServicesApp
    {
        private Services _services;

        public ServicesApp(IHaContext ha)
        {
            _services = new Services(ha);
        }

        private void HandleEvent()
        {
            _services.PersistentNotification.Create(
                message: "NetDaemon Application started", 
                title: "Awesome!");
            
            _services.Climate.SetTemperature(
                ServiceTarget.FromEntity("climate.bathroom"),
                temperature: 20.5);

            _services.Light.TurnOn(
                ServiceTarget.FromEntity("light.attic"), 
                transition: 50, 
                brightnessPct: 50);

        }
    }
}
```

The generated code contains a class `Services`. This class provides access to all the services in Home Assitant. The `Services` class needs an IHaContext in its constructor to access Home Assistant. From there, the services are available as methods grouped by their domain.

The service methods have parameters that corresponds to the fields that are required by the service. Optional fields are provides as optional paramaters so they can be skipped by using named parameters for the ones that are used.