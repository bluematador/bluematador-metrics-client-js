const StatsD = require('hot-shots');
const { sanitize } = require('./sanitizer')

const init = (host, port, errorHandler) => {
  let client = null

  const gauge = async (gauge, value, sampleRate, tags, responseHandler) => {
    // if(sampleRate && typeof sampleRate !== 'number') {

    //   tags = sampleRate
    //   typeof tags === 'function' ? responseHandler = tags : responseHandler = null
    // }
    // console.log(sampleRate, tags, responseHandler)
    try {
      if(sanitize(gauge, value, sampleRate, tags)) {
        await client.gauge(gauge, value, 1, tags, (err, bytes) => {
          if(err) {
            typeof responseHandler === 'function' && responseHandler(err)
          } else {
            typeof responseHandler === 'function' && responseHandler(null, bytes)
          }
        });
      }
    } catch(err) {
      typeof responseHandler === 'function' && responseHandler(err)
    }
  };

  const counter = async (counter, value, tags, sampleRate, errorHandler, successHandler) => {
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
