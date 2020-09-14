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

`options` is an object with the following keys:
  * `host: (optional)` specifies the host to send the custom metrics to. If no host is specified, `localhost` is the default host.
  * `port: (optional)` specifies the port to send the custom metrics to. If no port is specified, `8767` is the default port. 
  * `prefix: (optional)` a string that will be prepended to the name of every metric you send. Cannot contain ':' or '|'

```
const blueMatador = require('blue-matador-metrics-client');
const options = {
  host: '127.0.0.1',
  port: 8767,
  prefix: 'app'
}
const client = blueMatador.init(options);
```

**Note:** The init function will detect if you have set `BLUEMATADOR_AGENT_HOST` and `BLUEMATADOR_AGENT_PORT` as env variables. Manually setting the `host` or `port` through the options object will override environmental variables.   

Once you have an instance of the Blue Matador metrics client in your code you can start sending custom metrics. A Blue Matador agent must be configured to receive metrics at the destination host and port.

### Gauge
`gauge(name, value, [options])`
  * `name: (required)` The metric name e.g. 'myapp.request.size'. Cannot contain ':' or '|'
  * `value: (required)` The latest value to set for the metric
  
`options` is an object with the following keys: 
  * `sampleRate: (optional)` sends only a sample of data e.g. 0.5 indicates 50% of data being sent. Default value is 1
  * `labels: (optional)`  adds metadata to a metric. Can be specified as object or array of strings with key-value pairs formatted with a colon separator e.g. ['account:12345'] or {account: 12345}. Cannot contain '#' or '|'

The `gauge` method is asynchronous and returns a Promise that can be chained on with `.then()` and `.catch()`

If the metric is successfully sent to the Blue Matador Agent the `.then()` response will return the metric that was sent.

```
const blueMatador = require('blue-matador-metrics-client');
const client = blueMatador.init();

const options = {
  sampleRate: 0.75,
  labels: { environment: 'Prod', account_id: 1232151 }
}

client.gauge('request.size', 32.25, options);
```

The following are all valid ways to send a gauge metric:

```
# gauge 100
client.gauge("request.size", 100);

# gauge 100 but sample 50%
client.gauge("request.size", 100, { sampleRate: 0.5 });

# gauge 100 with labels
client.gauge("request.size", 100, { labels: ["environment:Prod", "api"] });

# gauge 100, sample 50%, and send labels
client.gauge("request.size", 100, { sampleRate: 0.5, labels: ["environment:Prod", "api"] });

```

### Count
`count(name, options)`
  * `name: (required)` The metric name e.g. 'myapp.request.size'. Cannot contain ':' or '|'
  
`options` is an object with the following keys: 
  * `value: (optional)` the amount to increment the metric by, the default is 1. 
  * `sampleRate: (optional)` sends only a sample of data e.g. 0.5 indicates 50% of data being sent. Default value is 1
  * `labels: (optional)`  adds metadata to a metric. Can be specified as object or array of strings with key-value pairs formatted with a colon separator e.g. ['account:12345'] or {account: 12345}. Cannot contain '#' or '|'

The `count` method is asynchronous and returns a Promise that can be chained on with `.then()` and `.catch()`

If the metric is successfully sent to the Blue Matador Agent the `.then()` response will return the metric that was sent.

```
const blueMatador = require('blue-matador-metrics-client');
const client = blueMatador.init();

const options = {
  value: 1,
  sampleRate: 1,
  labels: { environment: 'Prod', account_id: 1232151 }
}

client.count('homepage.clicks', options)
```

The following are all valid ways to send a count metric:

```
# count 1
client.count("homepage.clicks");

# count 2
client.count("hompage.clicks", { value: 2 });

# count 1 but sample 50%
client.count("homepage.clicks", { value: 1, sampleRate: 0.5 });

# count 2 and send labels
client.count("homepage.clicks", { value: 2, labels: ["environment:Prod", "homepage"] });

# count 2, sample 50%, and send labels
client.count("homepage.clicks",{ value: 2, sampleRate: 0.5, labels: ["environment:Prod", "homepage"] });

```

### Close

The close method should be called when shutting down your app.

```
client.close();
```


# License

More details in [LICENSE.](https://github.com/bluematador/bluematador-metrics-client-js/blob/master/LICENSE)

Copyright (c) 2020 [Blue Matador, Inc.](https://www.bluematador.com/)
