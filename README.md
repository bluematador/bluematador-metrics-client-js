# Blue Matador Metric Exporter

**Send StatsD-style custom metrics to your Blue Matador dashboard** 

## Installation
  * `npm install blue-matador-metric-exporter`

## Usage

To start using the Blue Matador metric exporter, simply require the package and call the init method.

```
const blueMatador = require('blue-matador-metric-exporter');
const client = blueMatador.init();
```
### The init method takes two optional parameters
  * `host`
  * `port`

The `host` parameter specifies the host to send the custom metrics to. If no host is specified, `localhost` is the default host.

The `port` parameter specifies the port to send the custom metrics to. If no port is specified, `8767` is the default port. 

```
const blueMatador = require('blue-matador-metric-exporter');
const client = blueMatador.init("127.0.0.1", 8080);
```

**Note:** The port parameter should be set to match the UDP port you have set in your config file for the Blue Matador Agent.


### The init method returns an object containing 3 methods:

### Gauge

The `gauge` method allows you to send statsD-style custom gauge metrics to Blue Matador. 

The `gauge` method returns a Promise and can be chained on with `.then()` and `.catch()`

If the Metric is successfully sent to the Blue Matador Agent the `.then()` response will always be `"Metric successfully sent"`

```
const blueMatador = require('blue-matador-metric-exporter');
const client = blueMatador.init();

client.gauge("testMetric", 32.25, 1, { environment: "Prod", account_id: 1232151 }).then(resp => {
  console.log("Success!")
}).catch(err => {
  console.log(err)
})
```

The `gauge` method takes the following parameters
  * `Name: required` The metric name should be a string describing your metric.
  * `Value: required` The metric value should be a number that will gauge the metric.
  * `sampleRate: optional` The sample rate controls the amount of data sent. The default is 1.
  * `tags: optional` The metric tags should be formatted as either an array of strings, or an object containing tags in key value pairs.
  ```
  // Example of an array of tags
  let arrayTags = ["env:dev", "account_id:123456"];
  
  // Example of an object containing tags
  let objectTags = { env: "Dev", account_id: 123456 };

  // note if tags are sent in an object they will get transformed into an array of strings. The strings will be made up of the key value pair seperated by a semi-colon.
  ```


# License

MIT © Dinesh Pandiyan
