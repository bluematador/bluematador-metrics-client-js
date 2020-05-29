# Blue Matador Metric Exporter

**Send StatsD-style custom metrics to your Blue Matador dashboard** 

## Installation
  * npm install blue-matador-metric-exporter

## Usage

To start using the Blue Matador metric exporter, simply require the package and call the init method.

```
const blueMatador = require('blue-matador-metric-exporter');
const client = blueMatador.init();
```
### The init() method takes two optional parameters
  * `host`
  * `port`

The `host` parameter specifies the host to send the custom metrics to. If no host is specified, `localhost` is the default host.

The `port` parameter specifies the port to send the custom metrics to. If no port is specified, `8767` is the default port. 

```
const blueMatador = require('blue-matador-metric-exporter');
const client = blueMatador.init("127.0.0.1", 8080);
```

**Note:** The port parameter should be set to match the UDP port you have set in your config file for the Blue Matador Agent.


### The init() method returns an object containing 3 methods

### Gauge

The `gauge` method allows you to send statsD-style custom gauge metrics to Blue Matador. 

The `gauge` method returns a Promise and can be chained on with `.then()` and `.catch()`

If the Metric is successfully sent to Blue Matador's Agent the `.then()` response will always be `Metric successfully sent`

```
const blueMatador = require('blue-matador-metric-exporter');
const client = blueMatador.init();

client.gauge("testMetric", 32.25, 1, { environment: "Prod", account_id: 1232151 }).then(resp => {
  console.log("Success!")
}).catch(err => {
  console.log(err)
})
```


# License

MIT © Dinesh Pandiyan
