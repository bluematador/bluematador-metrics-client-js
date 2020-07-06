const StatsD = require('hot-shots');
const { sanitize, sanitizeLabels, sanitizeName } = require('./sanitizer')

var metricPrefix = null

const createGaugeMetric = (name, value, sampleRate, labels) => {
  if(!name || typeof name !== 'string') {
    throw new Error('Metric name is missing or is an invalid type. Must be type string')
  }
  if(!value || typeof value !== 'number') {
    throw new Error('Metric value is missing or is an invalid type. Must be type number')
  }
  const metric = {
    name: sanitizeName(name, metricPrefix),
    value,
    sampleRate,
    labels
  }
  if(typeof sampleRate !== 'number') {
    metric.labels = typeof sampleRate === 'object' ? sampleRate : []
    metric.sampleRate = 1
  } else if (!labels) {
    metric.labels = []
  }
  metric.labels = formatLabels(metric.labels)

  return metric
}

const createCountMetric = (name, value, sampleRate, labels) => {
  if(!name || typeof name !== 'string') {
    throw new Error('Metric name is missing or is an invalid type. Must be type string')
  }
  const metric = {
    name: sanitizeName(name, metricPrefix),
    value,
    sampleRate,
    labels
  }
  if(typeof value === 'number' && typeof sampleRate !== 'number') {
    metric.sampleRate = 1
    metric.labels = sampleRate
  } else if(typeof value === 'object') {
    metric.sampleRate = 1
    metric.value = 1
    metric.labels = value
  } else {
    metric.sampleRate = 1
    metric.value = 1
    metric.labels = []
  }
  metric.labels = formatLabels(metric.labels)

  return metric
}

const formatLabels = labels => {
  const formattedLabels = []
  if(labels) {
    if(Array.isArray(labels)) {
      labels.forEach(label => {
        if(typeof label === 'string') {
          formattedLabels.push(label)
        } else if(typeof label === 'number' || typeof label === 'boolean') {
          formattedLabels.push(label.toString())
        }
      })
    } else if(typeof labels === 'object') {
      const objectLabels = Object.entries(labels)
      objectLabels.forEach(label => {
        if(typeof label[1] === 'string' || typeof label[1] === 'number' || typeof label[1] === 'boolean') {
          formattedLabels.push(label[0].toString() + ':' + label[1].toString())
        } else {
          formattedLabels.push(label[0].toString())
        }
      })
    }
  }

  return sanitizeLabels(formattedLabels)
}

const init = (host, port, prefix) => {
  let client = null
  let clientHost = host
  let clientPort = typeof port === 'number' ? port : null
  let clientPrefix = typeof port === 'string' ? port : prefix

  if(clientPrefix && typeof clientPrefix === 'string') {
    metricPrefix = clientPrefix
  }

  const gauge = (name, value, sampleRate, labels) => {
    return new Promise((resolve, reject) => {
      try {
        const metric = createGaugeMetric(name, value, sampleRate, labels)
        if(sanitize(metric)) {
           client.gauge(metric.name, metric.value, metric.sampleRate, metric.labels, (err) => {
            if(err) {
              reject(err)
            } else {
              resolve('Metric successfully sent')
            }
          });
        }
      } catch(err) {
        reject(err)
      }
    });
  };

  const count = (name, value, sampleRate, labels, responseHandler) => {
    return new Promise((resolve, reject) => {
      try {
        const metric = createCountMetric(name, value, sampleRate, labels, responseHandler)
        if(sanitize(metric)) {
          client.increment(metric.name, metric.value, metric.sampleRate, metric.labels, (err) => {
            if(err) {
              reject(err)
            } else {
              resolve('Metric successfully sent')
            }
          });
        }
      } catch(err) {
        reject(err)
      }
    })
  };

  const close = () => {
    client.close()
  }

  if(typeof clientHost === 'number') {
    throw new Error('The host argument must be one of type string or falsy. Recieved type number');
  } else if(typeof clientPort !== 'number' && clientPort) {
    throw new Error('The port argument must be of type number. Received type ' + typeof clientPort);
  } else {
    let finalHost = clientHost ? clientHost : 'localhost';
    let finalPort = clientPort ? clientPort : 8767;
    client = new StatsD({
      host: process.env.BLUEMATADOR_AGENT_HOST || finalHost,
      port: process.env.BLUEMATADOR_AGENT_PORT || finalPort,
      tagSeparator: '#',
    });
    return {
      gauge,
      count,
      close
    }
  }
}


module.exports = {
  init
}
