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

### Init
`init([host], [port])`
  * `host: (optional)` The `host` parameter specifies the host to send the custom metrics to. If no host is specified, `localhost` is the default host.
  * `port: (optional)` The `port` parameter specifies the port to send the custom metrics to. If no port is specified, `8767` is the default port. 


```
const blueMatador = require('blue-matador-metric-exporter');
const client = blueMatador.init("127.0.0.1", 8080);
```

**Note:** The port parameter should be set to match the UDP port you have in your config file for the Blue Matador Agent.


Once you have an instance of the Blue Matador metric exporter in your code you can start sending custom metrics. 


### Gauge
`gauge(name, value, [sampleRate], [tags])`
  * `Name: (required)` The metric name e.g. 'myapp.request.size'. Cannot contain '#' or '|'
  * `Value: (required)` The latest value to set for the metric
  * `sampleRate: (optional)` sends only a sample of data e.g. 0.5 indicates 50% of data being sent. Default value is 1
  * `tags: (optional)`  adds metadata to a metric. Can be specified as object or array of strings with key-value pairs formatted with a colon separator e.g. ['account:12345'] or {account: 12345}. Cannot contain '#' or '|'

The `gauge` method is asynchronous and returns a Promise that can be chained on with `.then()` and `.catch()`

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

The following are all valid ways to send a gauge metric:

```
client.gauge("testGauge", 23.2323);

client.gauge("testGauge", 23, 1);

client.gauge("testGauge", 23, { environment: "Prod", account_id: 1232151 });

client.gauge("testGauge", 23, 1, { environment: "Prod", account_id: 1232151 });

```

### Counter
`counter(name, [value], [sampleRate], [tags])`
  * `Name: (required)` The metric name e.g. 'myapp.request.size'. Cannot contain '#' or '|'
  * `Value: (optional)` the amount to increment the metric by, the default is 1. 
  * `sampleRate: (optional)` sends only a sample of data e.g. 0.5 indicates 50% of data being sent. Default value is 1
  * `tags: (optional)`  adds metadata to a metric. Can be specified as object or array of strings with key-value pairs formatted with a colon separator e.g. ['account:12345'] or {account: 12345}. Cannot contain '#' or '|'

**Note:** because the counter value is optional, if you want to set the sampleRate the counter value must be set as well.   

The `counter` method is asynchronous and returns a Promise that can be chained on with `.then()` and `.catch()`

If the Metric is successfully sent to the Blue Matador Agent the `.then()` response will always be `"Metric successfully sent"`

```
const blueMatador = require('blue-matador-metric-exporter');
const client = blueMatador.init();

client.gauge("testMetric", 1, 1, { environment: "Prod", account_id: 1232151 }).then(resp => {
  console.log("Success!")
}).catch(err => {
  console.log(err)
})
```

The following are all valid ways to send a counter metric:

```
client.counter("testCounter");

client.counter("testCounter", 2);

client.counter("testCounter", 2, 1);

client.counter("testCounter", { environment: "Prod", account_id: 1232151 });

client.counter("testCounter", 2, { environment: "Prod", account_id: 1232151 });

```

### Close

The close method should be called when shutting down your app.

```
client.close();
```


# License

MIT © Blue Matador
