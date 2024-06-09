---
id: hass_model_generated_service
title: Using generated services
---

After generating code from Home Assistant with `nd-codegen` you can use a strongly typed API to call services in Home Assistant. This can be done via the generated entity classes or by using the generated `Services` class.

## Call services via typed entity classes

The code generator generates a class for each domain that has entities in Home Assistant. For each service in Home Assistant that accepts an entity of that domain there is also a generated extension method for that `Entity` class. This allows services to be called like this:

```csharp
_myEntities = new Entities(haContext);

// ...

_myEntities.Light.LivingRoomLight.TurnOn(brightness: 100, colorTemp: 80);

_myEntities.Climate.AtticHeater.SetHvacMode(hvacMode:"off")

```

The service methods have parameters that corresponds to the fields that are required by the service. Optional fields are provided as optional parameters so they can be skipped by using named parameters for the ones that are used.

## Using the generated Services class

The generated code also contains a class `Services`. This class provides access to all the services in Home Assistant. The `Services` class needs an `IHaContext` in its constructor to access Home Assistant. From there, the services are available as methods grouped by their domain.

Example:

```csharp
_services = new Services(haContext);

// ...

_services.PersistentNotification.Create(
    message: "NetDaemon Application started", 
    title: "Awesome!");

_services.Climate.SetTemperature(
    ServiceTarget.FromEntity("climate.bathroom"),
    temperature: 20.5);

_services.Light.TurnOn(ServiceTarget.FromEntities("light.livingroom_light", "light.diner"),
    brightness: 100,
    colorTemp: 80);

```

Just as with the extension methods on the `Entity` classes, these methods have parameters that correspond to the fields of the service in Home Assistant.

 If the service requires a target, the generated method will also contain a parameter of type 'ServiceTarget' that can be used to pass one or more entities, areas or devices.

## Use the generated services with return values

Some Home Assistant services can return values. The generated services have a async method that returns a `JsonElement` that you can parse or serialize 
to a class. This means that you will have to use NetDaemon's async features to call the services and wait for the result.

:::info
Tip! Use the logger to log the returned `JsonElement` to see the structure of the returned data and create a class/record that matches the structure.
:::

### Process to use the generated services with return values:

1. First call the service log the returned `JsonElement` to see the structure of the returned data. For example, if you call the service `weather.get_forecasts`
in this case the it returns a structure that looks like:
```json
{
    "weather.smhi_hemma": {
        "forecast": [
            {
                "datetime": "2024-06-09T16:00:00",
                "condition": "rainy",
                "wind_bearing": 54,
                "cloud_coverage": 100,
                "temperature": 11.0,
                "templow": 11.0,
                "pressure": 989.0,
                "wind_gust_speed": 12.96,
                "wind_speed": 6.12,
                "precipitation": 0.4,
                "humidity": 87
            }
        ]
   }
}
```
2. Make a class that matches the structure of the returned data.
3. Deserialize with the proper casing options to match the json structure. 

A complete example of how to use the generated services with return values:

```csharp
using System.Threading;
using System.Threading.Tasks;
using System.Text.Json;

public record WeaterForecastItem
{
    public DateTime Datetime { get; init; }
    public string Condition { get; init; }
    public int WindBearing { get; init; }
    public int CloudCoverage { get; init; }
    public float Temperature { get; init; }
    public float Templow { get; init; }
    public float Pressure { get; init; }
    public float WindGustSpeed { get; init; }
    public float WindSpeed { get; init; }
    public float Precipitation { get; init; }
    public int Humidity { get; init; }
}

[NetDaemonApp]
public class UseServiceWithReturnValueApp(
        Entities entities,
        Services services,
        ILogger<UseServiceWithReturnValueApp> logger) : IAsyncInitializable
{
    // Camel case json options
    private readonly JsonSerializerOptions _jsonOptions = new JsonSerializerOptions
    {
        PropertyNamingPolicy = JsonNamingPolicy.SnakeCaseLower
    };

    public async Task InitializeAsync(CancellationToken cancellationToken)
    {
        // Get the forecasts from SMHI using the code generated entities
        var forecastResult = await entities.Weather.SmhiHemma.GetForecastsAsync(type: "hourly");
        // Log the forecast to look for the structure of the result
        // Remove when you created the correct deserialization
        logger.LogInformation("Forecast: {forecast}", forecastResult);

        // Find the forecast property and deserialize it to a list of WeaterForecastItem
        var forecasts = forecastResult?.GetProperty(entities.Weather.SmhiHemma.EntityId)
            .GetProperty("forecast");
        if (forecasts is not null)
        {
            var forecastItems = forecasts.Value.Deserialize<List<WeaterForecastItem>>(_jsonOptions);

            logger.LogInformation("Forecast items: {forecastItems}", forecastItems);
        }
        // You can return multiple values from a service call
        var multipleEntitiesForecastResult = await services.Weather
            .GetForecastsAsync(ServiceTarget.FromEntities("weather.smhi_hemma", "weather.test"), "hourly");
        logger.LogInformation("Muliple returns {multiple}", multipleEntitiesForecastResult);
        // Do something useful with the result of multiple forecasts from multiple entities
    }
}
```
