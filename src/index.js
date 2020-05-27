const StatsD = require('hot-shots');

function BlueMatadorClient(host, port) {
  this.host = host;
  this.port = port;
  this.tagSeparator = '#';
  this.client = null
  this.sanitizer = null

  this.init = () => {
    this.client = new StatsD({
      host: this.host,
      port: this.port,
      tagSeparator: '#',
    });
    this.sanitizer = new Sanitizer();
  }

  this.gauge = async (gauge, amount, tags, errorHandler, successHandler) => {
    try {
      if(this.sanitizer.sanitizeData(gauge, amount, tags)) {
        await this.client.gauge(gauge, amount, 1, tags, (err, bytes) => {
          if(err) {
            typeof errorHandler === 'function' ? errorHandler(err) : null
          } else {
            typeof successHandler === 'function' ? successHandler(bytes) : null
          }
        });
      }
    } catch(err) {
      typeof errorHandler === 'function' ? errorHandler(err) : null
    }
  };

  this.counter = async (counter, tags, errorHandler, successHandler) => {
    try {
      if(this.sanitizer.sanitizeData(counter, 0, tags)) {
        await this.client.increment(counter, 1, 1, tags, (err, bytes) => {
          if(err) {
            typeof errorHandler === 'function' ? errorHandler(err) : null
          } else {
            typeof successHandler === 'function' ? successHandler(bytes) : null
          }
        });
      }
    } catch(err) {
      typeof errorHandler === 'function' ? errorHandler(err) : null
    }
  };
  this.close = () => {
    this.client.close()
  }
}

function Sanitizer() {
  this.sanitizeData = (name, amount, tags) => {
    this.checkName(name)
    this.checkValue(amount)
    if(Array.isArray(tags)) {
      this.checkTags(tags)
    }
    return true
  }

  this.checkName = name => {
    if(name.includes('#')) {
      throw new Error(`Illegal character # in metric name ${name}`)
    }
    if(name.includes('|')) {
      throw new Error(`Illegal character | in metric name ${name}`)
    }
    return true
  }
  this.checkValue = number => {
    if(typeof number !== 'number') {
      throw new Error('Metric value is not a number')
    }
    return true
  }
  this.checkTags = tags => {
    tags.forEach(tag => {
      if(tag.includes('#')) {
        throw new Error(`Illegal character # in tag ${tag}`)
      }
      if(tag.includes('|')) {
        throw new Error(`Illegal character | in tag ${tag}`)
      }
    })
    return true
  }
}

const init = (host, port, errorHandler) => {
  try {
    if(typeof host === 'number') {
      throw new Error('The host argument must be one of type string or falsy. Recieved type number');
    } else if(typeof port !== 'number' && port) {
      throw new Error('The port argument must be of type number. Received type ' + typeof port);
    } else {
      const host = host ? host : 'localhost'
      const port = port ? port : 8767
      const client = new BlueMatadorClient(host, port);
      client.init()
      return client;
    }
  } catch(err) {
    console.error(err)
    typeof errorHandler === 'function' ? errorHandler(err) : null
    return {}
  }
};

module.exports = {
  init
}
