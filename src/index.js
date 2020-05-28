const StatsD = require('hot-shots');
const { sanitize } = require('./sanitizer')

let client = null

const gauge = async (gauge, value, tags, errorHandler, successHandler) => {
  try {
    if(sanitize(gauge, value, null, tags)) {
      await client.gauge(gauge, value, 1, tags, (err, bytes) => {
        if(err) {
          typeof errorHandler === 'function' && errorHandler(err)
        } else {
          typeof successHandler === 'function' && successHandler(bytes)
        }
      });
    }
  } catch(err) {
    typeof errorHandler === 'function' && errorHandler(err)
  }
};

const counter = async (counter, value, tags, errorHandler, successHandler) => {
  try {
    if(sanitize(counter, value, null, tags)) {
      await client.increment(counter, 1, 1, tags, (err, bytes) => {
        if(err) {
          typeof errorHandler === 'function' && errorHandler(err)
        } else {
          typeof successHandler === 'function' && successHandler(bytes)
        }
      });
    }
  } catch(err) {
    typeof errorHandler === 'function' && errorHandler(err)
  }
};

const close = () => {
  client.close()
}

const init = (host, port, errorHandler) => {
  try {
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
  } catch(err) {
    console.error(err)
    typeof errorHandler === 'function' && errorHandler(err)
    return {}
  }
};

module.exports = {
  init
}
