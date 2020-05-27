import { expect } from 'chai';
import { init } from '../src';

describe('Counter Tests', () => {
  it('should test the sendCounter function with an invalid metric name', done => {
    let blueMatador = init()
    const expectedVal = 'Illegal character | in metric name illegal|name';
    blueMatador.counter('illegal|name', [], err => {
      expect(err).to.be.an('error', expectedVal);
      done();
    })
  });
  it('should test the sendCounter function with an invalid metric name', done => {
    let blueMatador = init()
    const expectedVal = 'Illegal character # in metric name illegal#name';
    blueMatador.counter('illegal#name', [], err => {
      expect(err).to.be.an('error', expectedVal);
      done();
    })
  });
  it('should test the sendCounter function with illegal character | in tag array', done => {
    let blueMatador = init()
    const expectedVal = 'Illegal character | in tag env:dev|1'
    blueMatador.counter('testMetric', ["valid_tag", "env:dev|1"], err => {
      expect(err).to.be.an('error', expectedVal);
      done();
    });
  });
  it('should test the sendCounter function with illegal character # in tag array', done => {
    let blueMatador = init()
    const expectedVal = 'Illegal character # in tag env:dev#1'
    blueMatador.counter('testMetric', ["valid_tag", "env:dev#1"], err => {
      expect(err).to.be.an('error', expectedVal);
      done();
    });
  });
  it('should test the sendCounter function with correct parameters and return the number of bytes sent to the UDP port', done => {
    let blueMatador = init()
    blueMatador.counter('testMetric', ["env:dev"], null, resp => {
      expect(resp).to.be.a('number');
      done();
    });
  });
});

describe('Gauge Tests', () => {
  it('should test the sendGauge function with an invalid metric name', done => {
    let blueMatador = init()
    const expectedVal = 'Illegal character # in metric name illegal#name';
    blueMatador.gauge('illegal#name', 32, [], err => {
      expect(err).to.be.an('error', expectedVal);
      done();
    });
  });
  it('should test the sendGauge function with an invalid metric name', done => {
    let blueMatador = init()
    const expectedVal = 'Illegal character | in metric name illegal|name';
    blueMatador.gauge('illegal|name', 32, [], err => {
      expect(err).to.be.an('error', expectedVal);
      done();
    });
  });
  it('should test the sendGauge function with an invalid metric value', done => {
    let blueMatador = init()
    const expectedVal = 'Metric value is not a number';
    blueMatador.gauge('cpu_util', true, [], err => {
      expect(err).to.be.an('error', expectedVal);
      done();
    });
  });
  it('should test the sendGauge function with illegal character | in tag array', done => {
    let blueMatador = init()
    const expectedVal = 'Illegal character | in tag env:dev|1'
    blueMatador.gauge('testMetric', 23, ["valid_tag", "env:dev|1"], err => {
      expect(err).to.be.an('error', expectedVal);
      done();
    });
  });
  it('should test the sendGauge function with illegal character # in tag array', done => {
    let blueMatador = init()
    const expectedVal = 'Illegal character # in tag env:dev#1'
    blueMatador.gauge('testMetric', 23, ["valid_tag", "env:dev#1"], err => {
      expect(err).to.be.an('error', expectedVal);
      done();
    });
  });
  it('should test the sendGauge function with correct parameters and return the number of bytes sent to the UDP port', done => {
    let blueMatador = init()
    blueMatador.gauge('testMetric', 23, ["env:dev"], null, resp => {
      expect(resp).to.be.a('number');
      done();
    });
  });
});

describe('Init Client Tests', () => {
  it('should test the init function with incorrect host parameter', done => {
   let blueMatador = init(8787, 8787, err => {
     expect(err).to.be.an('error', 'The host argument must be one of type string or falsy. Recieved type number');
     done();
   });
  });
});
