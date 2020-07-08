# Blue Matador Metrics Client

**Send StatsD-style custom metrics to your Blue Matador dashboard** 

## Installation
  * `npm install blue-matador-metric-client`

## Setup

To start using the Blue Matador metrics client, simply require the package and call the init method.

```
const blueMatador = require('blue-matador-metrics-client');
const client = blueMatador.init();
```

### Init
`init([options])`
  * `options.host: (optional)` The `host` parameter specifies the host to send the custom metrics to. If no host is specified, `localhost` is the default host.
  * `options.port: (optional)` The `port` parameter specifies the port to send the custom metrics to. If no port is specified, `8767` is the default port. 
  * `options.prefix: (optional)` The `prefix` parameter is a string that will be prepended to the name of every metric you send. The `host` parameter becomes required when a prefix is supplied. Cannot contain ':' or '|'

```
const blueMatador = require('blue-matador-metrics-client');
const client = blueMatador.init('127.0.0.1', 8767, 'app');
```

**Note:** The init function will detect if you have set `BLUEMATADOR_AGENT_HOST` and `BLUEMATADOR_AGENT_PORT` in the config file for your agent. If these variables have been set there is no need to manually set the host or port as they will be overridden.  

If you are using the `BLUEMATADOR_AGENT_HOST` and `BLUEMATADOR_AGENT_PORT` variables to initialize the client and want to set a prefix for your metrics, you can use the `initWithPrefix()` function.

### InitWithPrefix
`initWithPrefix(prefix)`
   * `prefix:` The `prefix` parameter is a string that will be prepended to the name of every metric you send. Cannot contain ':' or '|'

```
const blueMatador = require('blue-matador-metric-client');
const client = blueMatador.initWithPrefix('app');
```

Once you have an instance of the Blue Matador metrics client in your code you can start sending custom metrics. 


### Gauge
`gauge(name, value, [sampleRate], [labels])`
  * `Name: (required)` The metric name e.g. 'myapp.request.size'. Cannot contain ':' or '|'
  * `Value: (required)` The latest value to set for the metric
  * `sampleRate: (optional)` sends only a sample of data e.g. 0.5 indicates 50% of data being sent. Default value is 1
  * `labels: (optional)`  adds metadata to a metric. Can be specified as object or array of strings with key-value pairs formatted with a colon separator e.g. ['account:12345'] or {account: 12345}. Cannot contain '#' or '|'

The `gauge` method is asynchronous and returns a Promise that can be chained on with `.then()` and `.catch()`

If the metric is successfully sent to the Blue Matador Agent the `.then()` response will always be `'Metric successfully sent'`

```
const blueMatador = require('blue-matador-metrics-client');
const client = blueMatador.init();

client.gauge('request.size', 32.25, 1, { environment: 'Prod', account_id: 1232151 }).then(resp => {
  console.log('Success!')
}).catch(err => {
  console.log(err)
})
```

The following are all valid ways to send a gauge metric:

```
# gauge 100
client.gauge("request.size", 100);

# gauge 100 but sample 50%
client.gauge("request.size", 100, 0.5);

# gauge 100 with labels
client.gauge("request.size", 100, ["environment:Prod", "api"]);

# gauge 100, sample 50%, and send labels
client.gauge("request.size", 100, 0.5, ["environment:Prod", "api"]);

```

### Count
`count(name, [value], [sampleRate], [labels])`
  * `Name: (required)` The metric name e.g. 'myapp.request.size'. Cannot contain ':' or '|'
  * `Value: (optional)` the amount to increment the metric by, the default is 1. 
  * `sampleRate: (optional)` sends only a sample of data e.g. 0.5 indicates 50% of data being sent. Default value is 1
  * `labels: (optional)`  adds metadata to a metric. Can be specified as object or array of strings with key-value pairs formatted with a colon separator e.g. ['account:12345'] or {account: 12345}. Cannot contain '#' or '|'

**Note:** because the count value is optional, if you want to set the sampleRate the count value must be set as well.   

The `count` method is asynchronous and returns a Promise that can be chained on with `.then()` and `.catch()`

If the Metric is successfully sent to the Blue Matador Agent the `.then()` response will always be `'Metric successfully sent'`

```
const blueMatador = require('blue-matador-metrics-client');
const client = blueMatador.init();

client.count('homepage.clicks', 1, 1, { environment: 'Prod', account_id: 1232151 }).then(resp => {
  console.log('Success!')
}).catch(err => {
  console.log(err)
})
```

The following are all valid ways to send a count metric:

```
# count 1
client.count("homepage.clicks");

# count 2
client.count("hompage.clicks", 2);

# count 1 but sample 50%
client.count("homepage.clicks", 1, 0.5);

# count 2 and send labels
client.count("homepage.clicks", 2, ["environment:Prod", "homepage"]);

# count 2, sample 50%, and send labels
client.count("homepage.clicks", 2, 0.5, ["environment:Prod", "homepage"]);

```

### Close

The close method should be called when shutting down your app.

```
client.close();
```


# License

More details in [LICENSE.](https://github.com/bluematador/bluematador-metrics-client-js/blob/master/LICENSE)

Copyright (c) 2020 [Blue Matador, Inc.](https://www.bluematador.com/)
