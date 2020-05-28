const StatsD = require('hot-shots');
const { sanitize } = require('./sanitizer')

const createGaugeMetric = (name, value, sampleRate, tags) => {
  if(!name || typeof name !== 'string') {
    throw new Error('Metric name is missing or is an invalid type. Must be type string')
  }
  if(!value || typeof value !== 'number') {
    throw new Error('Metric value is missing or is an invalid type. Must be type number')
  }
  const metric = {
    name,
    value,
    sampleRate,
    tags
  }
  if(typeof sampleRate !== 'number') {
    metric.tags = typeof sampleRate === 'object' ? sampleRate : []
    metric.sampleRate = 1
  } else if (typeof tags === 'function') {
    metric.tags = []
  }
  metric.tags = formatTags(metric.tags)
  return metric
}

const createCounterMetric = (name, value, sampleRate, tags) => {
  if(!name || typeof name !== 'string') {
    throw new Error('Metric name is missing or is an invalid type. Must be type string')
  }
  const metric = {
    name,
    value,
    sampleRate,
    tags
  }
  if(typeof value === 'number' && typeof sampleRate !== 'number') {
    metric.sampleRate = 1
    metric.tags = sampleRate
  } else if(typeof value === 'object') {
    metric.sampleRate = 1
    metric.value = 1
    metric.tags = value
  } else {
    metric.sampleRate = 1
    metric.value = 1
    metric.tags = []
  }
  metric.tags = formatTags(metric.tags)
  return metric
}

const formatTags = tags => {
  let formattedTags = []
  if(tags) {
    if(Array.isArray(tags)) {
      tags.forEach(tag => {
        if(typeof tag === 'string') {
          formattedTags.push(tag)
        } else if(typeof tag === 'number') {
          formattedTags.push(tag.toString())
        }
      })
    } else if(typeof tags === 'object') {
      let objectTags = Object.entries(tags)
      objectTags.forEach(tag => {
        if(typeof tag[1] === 'string' || typeof tag[1] === 'number' || typeof tag[1] === 'boolean' ) {
          formattedTags.push(tag[0].toString() + ":" + tag[1].toString())
        } else {
          formattedTags.push(tag[0].toString())
        }
      })
    }
  }
  return formattedTags
}

const init = (host, port) => {
  let client = null

  const gauge = (name, value, sampleRate, tags) => {
    return new Promise((resolve, reject) => {
      try {
        const metric = createGaugeMetric(name, value, sampleRate, tags)
        if(sanitize(metric)) {
           client.gauge(metric.name, metric.value, metric.sampleRate, metric.tags, (err, bytes) => {
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

  const counter = (name, value, sampleRate, tags, responseHandler) => {
    return new Promise((resolve, reject) => {
      try {
        const metric = createCounterMetric(name, value, sampleRate, tags, responseHandler)
        if(sanitize(metric)) {
          client.increment(metric.name, metric.value, metric.sampleRate, metric.tags, (err, bytes) => {
            if(err) {
              reject(err)
            } else {
              resolve('Metric successfully sent')
            }
          });
        }
      } catch(err) {
        reject(err)      }
    })
  };
  const close = () => {
    client.close()
  }

  if(typeof host === 'number') {
    throw new Error('The host argument must be one of type string or falsy. Recieved type number');
  } else if(typeof port !== 'number' && port) {
    throw new Error('The port argument must be of type number. Received type ' + typeof port);
  } else {
    client = new StatsD({
      host: host ? host : 'localhost',
      port: port ? port : 8767,
      tagSeparator: '#',
    });
    return {
      gauge,
      counter,
      close
    }
  }
}


module.exports = {
  init
}
