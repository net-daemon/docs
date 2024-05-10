---
id: hass_model_service_with_returnvalue
title: Service with return values
---

For newer versions of Home Assistant, you can now return values some services. This is useful when you want to get a response from a service call.

Please check the Home Assistant documentation for more information on how to use this feature and what services support it.

The following example list events from the calendar component in Home Assistant:

```csharp
using System.Text.Json;
using Microsoft.Extensions.Logging;
using NetDaemon.AppModel;
using NetDaemon.HassModel;
using NetDaemon.HassModel.Entities;

namespace Apps;

[NetDaemonApp]
public sealed class ServiceApp : IAsyncInitializable
{
    private readonly IHaContext _ha;
    private readonly ILogger<ServiceApp> _logger;
    private readonly JsonSerializerOptions _jsonOptions = new() { PropertyNameCaseInsensitive = true };

    public ServiceApp(IHaContext ha,  ILogger<ServiceApp> logger)
    {
        _ha = ha;
        _logger = logger;
    }

    public async Task InitializeAsync(CancellationToken cancellationToken)
    {
        var result = await _ha.CallServiceWithResponseAsync("calendar", "list_events", ServiceTarget.FromEntity("calendar.cal"),
            data: new { start_date_time = "2023-07-21 00:00:00", end_date_time = "2023-07-22 03:00:00"});

        if (result is not null)
        {
            var events = result.Value.Deserialize<CalendarEvents>(_jsonOptions);
            if (events is null)
                _logger.LogWarning("No results!");
            else
                _logger.LogInformation("Events: {Events}", events);
        }
    }
}
public record CalendarEvents(IEnumerable<CalendarEvent> Events);
public record CalendarEvent(DateTime Start, DateTime End, string Summary, string Description);
```
