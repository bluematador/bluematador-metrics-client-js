import { expect } from 'chai';
import { init } from '../src';

describe('Counter Tests', () => {
  it('should test the sendCounter function with an invalid metric name', done => {
    let blueMatador = init()
    const expectedVal = 'Illegal character | in metric name illegal|name';
    blueMatador.counter('illegal|name', []).catch(err => {
      expect(err).to.be.an('error', expectedVal);
      blueMatador.close();
      done();
    })
  });
  it('should test the sendCounter function with an invalid metric name', done => {
    let blueMatador = init()
    const expectedVal = 'Illegal character # in metric name illegal#name';
    blueMatador.counter('illegal#name', []).catch(err => {
      expect(err).to.be.an('error', expectedVal);
      blueMatador.close();
      done();
    })
  });
  it('should test the sendCounter function with illegal character | in tag array', done => {
    let blueMatador = init()
    const expectedVal = 'Illegal character | in tag env:dev|1'
    blueMatador.counter('testMetric', ["valid_tag", "env:dev|1"]).catch(err => {
      expect(err).to.be.an('error', expectedVal);
      blueMatador.close();
      done();
    })
  });
  it('should test the sendCounter function with illegal character # in tag array', done => {
    let blueMatador = init()
    const expectedVal = 'Illegal character # in tag env:dev#1'
    blueMatador.counter('testMetric', ["valid_tag", "env:dev#1"]).catch(err => {
      expect(err).to.be.an('error', expectedVal);
      blueMatador.close();
      done();
    })
  });
  it('should test the sendCounter function with correct parameters and return the number of bytes sent to the UDP port', done => {
    let blueMatador = init()
    blueMatador.counter('testMetric', 2, 1, ["env:dev"]).then(resp => {
      expect(resp).to.be.a('string', 'Metric successfully sent');
      blueMatador.close();
      done();
    });
  });
  it('should test the sendCounter function with default values for value and sampleRate with tags', done => {
    let blueMatador = init()
    blueMatador.counter('testMetric', {env: "dev", account_id: 12324231}).then(resp => {
      expect(resp).to.be.a('string', 'Metric successfully sent');
      blueMatador.close();
      done();
    });
  });
  it('should test the sendCounter function with the default value for sampleRate and explict counter value with tags', done => {
    let blueMatador = init()
      blueMatador.counter('testMetric', 3, {env: "dev", account_id: 12324231}).then(resp => {
        expect(resp).to.be.a('string', 'Metric successfully sent');
        blueMatador.close();
        done();
      });
  });
  it('should test the sendCounter function with the default value for sampleRate, no tags and explicit counter value', done => {
    let blueMatador = init()
    blueMatador.counter('testMetric', 3).then(resp => {
      expect(resp).to.be.a('string', 'Metric successfully sent');
      blueMatador.close();
      done();
    });
  });
  it('should test the sendCounter function with default values for value and sampleRate with no tags', done => {
    let blueMatador = init()
    blueMatador.counter('testMetric').then(resp => {
      expect(resp).to.be.a('string', 'Metric successfully sent');
      blueMatador.close();
      done();
    });
  });
  it('should test the sendCounter function with explicit values for metric value and sampleRate with no tags', done => {
    let blueMatador = init()
    blueMatador.counter('testMetric', 2, .8).then(resp => {
      expect(resp).to.be.a('string', 'Metric successfully sent');
      blueMatador.close();
      done();
    });
  });
  it('should test the sendCounter function with no parameters sent', done => {
    let blueMatador = init()
    const expectedVal = 'Metric name is missing or is an invalid type. Must be type string'
    blueMatador.counter().catch(err => {
      expect(err).to.be.an('error', expectedVal);
      blueMatador.close();
      done();
    });
  });
});

describe('Gauge Tests', () => {
  it('should test the sendGauge function with no parameters sent, error expected', done => {
    let blueMatador = init()
    const expectedVal = 'Metric name is missing or is an invalid type. Must be type string'
    blueMatador.gauge().catch(err => {
      expect(err).to.be.an('error', expectedVal);
      blueMatador.close();
      done();
    });
  });
  it('should test the sendGauge function with no metric value parameter sent, error expected', done => {
    let blueMatador = init()
    const expectedVal = 'Metric value is missing or is an invalid type. Must be type number'
    blueMatador.gauge('cpu_util').catch(err => {
      expect(err).to.be.an('error', expectedVal);
      blueMatador.close();
      done();
    });
  });
  it('should test the sendGauge function with an invalid metric name', done => {
    let blueMatador = init()
    const expectedVal = 'Illegal character # in metric name illegal#name';
    blueMatador.gauge('illegal#name', 32, []).catch(err => {
      expect(err).to.be.an('error', expectedVal);
      blueMatador.close();
      done();
    })
  });
  it('should test the sendGauge function with an invalid metric name', done => {
    let blueMatador = init()
    const expectedVal = 'Illegal character | in metric name illegal|name';
    blueMatador.gauge('illegal|name', 32, []).catch(err => {
      expect(err).to.be.an('error', expectedVal);
      blueMatador.close();
      done();
    });
  });
  it('should test the sendGauge function with an invalid metric value', done => {
    let blueMatador = init()
    const expectedVal = 'Metric value is not a number';
    blueMatador.gauge('cpu_util', true, []).catch(err => {
      expect(err).to.be.an('error', expectedVal);
      blueMatador.close();
      done();
    });
  });
  it('should test the sendGauge function with illegal character | in tag array', done => {
    let blueMatador = init()
    const expectedVal = 'Illegal character | in tag env:dev|1'
    blueMatador.gauge('testMetric', 23, ["valid_tag", "env:dev|1"]).catch(err => {
      expect(err).to.be.an('error', expectedVal);
      blueMatador.close();
      done();
    });
  });
  it('should test the sendGauge function with illegal character # in tag array', done => {
    let blueMatador = init()
    const expectedVal = 'Illegal character # in tag env:dev#1'
    blueMatador.gauge('testMetric', 23, ["valid_tag", "env:dev#1"]).catch(err => {
      expect(err).to.be.an('error', expectedVal);
      blueMatador.close();
      done();
    });
  });
  it('should test the sendGauge function with correct parameters and return the number of bytes sent to the UDP port', done => {
    let blueMatador = init()
    blueMatador.gauge('testMetric', 23, 1, ["env:dev"]).then(resp => {
      expect(resp).to.be.a('string', 'Metric successfully sent');
      blueMatador.close();
      done();
    });
  });
  it('should test the sendGauge function with default value for sampleRate with tags', done => {
    let blueMatador = init()
    blueMatador.gauge('testMetric', 23, ["env:dev"]).then(resp => {
      expect(resp).to.be.a('string', 'Metric successfully sent');
      blueMatador.close();
      done();
    });
  });
  it('should test the sendGauge function with default value for sampleRate with no tags', done => {
    let blueMatador = init()
    blueMatador.gauge('testMetric', 23).then(resp => {
      expect(resp).to.be.a('string', 'Metric successfully sent');
      blueMatador.close();
      done();
    });
  });
  it('should test the formatTags function with an array of tags', done => {
    let blueMatador = init()
    blueMatador.gauge('testMetric', 23, ["env:dev", true, 12321023]).then(resp => {
      expect(resp).to.be.a('string', 'Metric successfully sent');
      blueMatador.close();
      done();
    });
  });
  it('should test the formatTags function with an object of tags', done => {
    let blueMatador = init()
    blueMatador.gauge('testMetric', 23, {env: "dev", account_id: 123151815, siteLive: false, key4: null}).then(resp => {
      expect(resp).to.be.a('string', 'Metric successfully sent');
      blueMatador.close();
      done();
    });
  });
});

describe('Init Client Tests', () => {
  it('should test the init function with incorrect host parameter', done => {
    try {
      let blueMatador = init(8787, 8787)
    } catch(err) {
      expect(err).to.be.an('error', 'The host argument must be one of type string or falsy. Recieved type number');
      done();
    }
  });
  it('should test the init function with incorrect port parameter', done => {
    try {
      let blueMatador = init(null, "string")
    } catch(err) {
      expect(err).to.be.an('error', 'The port argument must be of type number. Received type string');
      done();
    }
  });
  it('should test the init function with no parameters sent and the default settings applied', done => {
    let blueMatador = init();
    expect(blueMatador).to.be.an('object').that.has.all.keys('gauge', 'counter', 'close')
    done();
  });
  it('should test the init function with host and port parameters sent', done => {
    let blueMatador = init("localhost", 8080);
    expect(blueMatador).to.be.an('object').that.has.all.keys('gauge', 'counter', 'close')
    done();
  });
});
