const StatsD = require('hot-shots');
const { sanitize, sanitizeLabels, sanitizeName } = require('./sanitizer');

const formatLabels = labels => {
  const formattedLabels = [];
  if (labels) {
    if (Array.isArray(labels)) {
      labels.forEach(label => {
        if (typeof label === 'string') {
          formattedLabels.push(label);
        } else if (typeof label === 'number' || typeof label === 'boolean') {
          formattedLabels.push(label.toString());
        }
      });
    } else if (typeof labels === 'object') {
      const objectLabels = Object.entries(labels);
      objectLabels.forEach(label => {
        if (typeof label[1] === 'string' || typeof label[1] === 'number' || typeof label[1] === 'boolean') {
          formattedLabels.push(label[0].toString() + ':' + label[1].toString());
        } else {
          formattedLabels.push(label[0].toString());
        }
      });
    }
  }

  return sanitizeLabels(formattedLabels);
};

const createGaugeMetric = (prefix, name, value, sampleRate, labels) => {
  if (!name || typeof name !== 'string') {
    throw new Error('Metric name is missing or is an invalid type. Must be type string');
  }
  if (!value || typeof value !== 'number') {
    throw new Error('Metric value is missing or is an invalid type. Must be type number');
  }
  const metric = {
    name: sanitizeName(name, prefix),
    value,
    sampleRate,
    labels
  };
  if (typeof sampleRate !== 'number') {
    metric.labels = typeof sampleRate === 'object' ? sampleRate : [];
    metric.sampleRate = 1;
  } else if (!labels) {
    metric.labels = [];
  }
  metric.labels = formatLabels(metric.labels);

  return metric;
};

const createCountMetric = (prefix, name, value, sampleRate, labels) => {
  if (!name || typeof name !== 'string') {
    throw new Error('Metric name is missing or is an invalid type. Must be type string');
  }
  const metric = {
    name: sanitizeName(name, prefix),
    value,
    sampleRate,
    labels
  };
  if (typeof value === 'number' && typeof sampleRate !== 'number') {
    metric.sampleRate = 1;
    metric.labels = sampleRate;
  } else if (typeof value === 'object') {
    metric.sampleRate = 1;
    metric.value = 1;
    metric.labels = value;
  } else {
    metric.sampleRate = 1;
    metric.value = 1;
    metric.labels = [];
  }
  metric.labels = formatLabels(metric.labels);

  return metric;
};

const init = (options) => {
  // Prefer passed in host, then env variable, then default to localhost
  const clientHost = options.host || process.env.BLUEMATADOR_AGENT_HOST || 'localhost';
  if (typeof clientHost !== 'string') {
    throw new Error('Host must be a string');
  }

  // Prefer passed in port, then env varible if it is a number, then default to 8767
  let clientPort = options.port;
  if (process.env.BLUEMATADOR_AGENT_PORT) {
    const parsedPort = parseInt(process.env.BLUEMATADOR_AGENT_PORT, 10);
    if (isNaN(parsedPort)) {
      throw new Error('Port must be a number');
    } else {
      clientPort = clientPort || parsedPort;
    }
  }
  clientPort = clientPort || 8767;
  if (typeof clientPort !== 'number') {
    throw new Error('Port must be a number');
  }

  // Sanitize the prefix
  let metricPrefix = options.prefix;
  if (options.prefix && typeof options.prefix === 'string') {
    metricPrefix = options.prefix.replace(/:|\|/gi, '_');
  }

  const client = new StatsD({
    host: clientHost,
    port: clientPort,
    tagSeparator: '#',
  });

  const gauge = (name, value, options, responseHandler) => {
    return new Promise((resolve, reject) => {
      try {
        const metric = createGaugeMetric(metricPrefix, name, value, options.sampleRate || 1, options.labels || "");
        if (sanitize(metric)) {
          client.gauge(metric.name, metric.value, metric.sampleRate, metric.labels, (err) => {
            if (err) {
              reject(err);
            } else {
              resolve(metric);
            }
          });
        }
      } catch (err) {
        reject(err);
      }
    });
  };

  const count = (name, options, responseHandler) => {
    return new Promise((resolve, reject) => {
      try {
        const metric = createCountMetric(metricPrefix, name, options.value || 1, options.sampleRate || 1, options.labels || "", responseHandler);
        if (sanitize(metric)) {
          client.increment(metric.name, metric.value, metric.sampleRate, metric.labels, (err) => {
            if (err) {
              reject(err);
            } else {
              resolve(metric);
            }
          });
        }
      } catch (err) {
        reject(err);
      }
    });
  };

  const close = () => {
    client.close();
  };

  return {
    gauge,
    count,
    close,
    host: clientHost,
    port: clientPort,
    prefix: metricPrefix,
  };
};

module.exports = {
  init,
};
