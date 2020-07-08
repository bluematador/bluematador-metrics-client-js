import { expect } from 'chai';
import { init } from '../src';

describe('count', () => {
  it('should sanitize invalid names', done => {
    const blueMatador = init();
    blueMatador.count('a:b|c').then(metric => {
      expect(metric.name).to.be.a('string', 'a_b_c');
      blueMatador.close();
      done();
    });
  });
  it('should reject non-string names', done => {
    const blueMatador = init();
    blueMatador.count(3).catch(err => {
      expect(err).to.be.an('error', 'Metric name is missing or is an invalid type. Must be type string');
      blueMatador.close();
      done();
    });
  });
  it('should send have correct default parameters', done => {
    const blueMatador = init();
    blueMatador.count('a').then(metric => {
      expect(metric.value).to.be.a('number', 1);
      expect(metric.sampleRate).to.be.a('number', 1);
      expect(metric.labels.length).to.be.a('number', 0);
      blueMatador.close();
      done();
    });
  });
  it('should set the correct value', done => {
    const blueMatador = init();
    blueMatador.count('a', {value: 2}).then(metric => {
      expect(metric.value).to.be.a('number', 2);
      blueMatador.close();
      done();
    });
  });
  it('should set the correct sampleRate', done => {
    const blueMatador = init();
    blueMatador.count('a', {sampleRate: 0.5}).then(metric => {
      expect(metric.sampleRate).to.be.a('number', 0.5);
      blueMatador.close();
      done();
    });
  });
  it('should set the correct labels as array', done => {
    const blueMatador = init();
    blueMatador.count('a', {labels: ['b', 'c:3']}).then(metric => {
      expect(metric.labels.length).to.be.a('number', 2);
      expect(metric.labels[0]).to.be.a('string', 'b');
      expect(metric.labels[1]).to.be.a('string', 'c:3');
      blueMatador.close();
      done();
    });
  });
  it('should set the correct labels as object', done => {
    const blueMatador = init();
    blueMatador.count('a', {labels: { b: null, c: 3 }}).then(metric => {
      expect(metric.labels.length).to.be.a('number', 2);
      expect(metric.labels[0]).to.be.a('string', 'b');
      expect(metric.labels[1]).to.be.a('string', 'c:3');
      blueMatador.close();
      done();
    });
  });
  it('should sanitize labels', done => {
    const blueMatador = init();
    blueMatador.count('a', {labels: ['a#b|c']}).then(metric => {
      expect(metric.labels.length).to.be.a('number', 1);
      expect(metric.labels[0]).to.be.a('string', 'a_b_c');
      blueMatador.close();
      done();
    });
  });
  it('should include the prefix in the name', done => {
    const blueMatador = init({prefix: 'prefix'});
    blueMatador.count('a').then(metric => {
      expect(metric.name).to.be.a('string', 'prefix.a');
      blueMatador.close();
      done();
    });
  });
});

describe('gauge', () => {
  it('should sanitize invalid names', done => {
    const blueMatador = init();
    blueMatador.gauge('a:b|c', 1).then(metric => {
      expect(metric.name).to.be.a('string', 'a_b_c');
      blueMatador.close();
      done();
    });
  });
  it('should reject non-string names', done => {
    const blueMatador = init();
    blueMatador.gauge(3).catch(err => {
      expect(err).to.be.an('error', 'Metric name is missing or is an invalid type. Must be type string');
      blueMatador.close();
      done();
    });
  });
  it('should send have correct default parameters', done => {
    const blueMatador = init();
    blueMatador.gauge('a', 1).then(metric => {
      expect(metric.sampleRate).to.be.a('number', 1);
      expect(metric.labels.length).to.be.a('number', 0);
      blueMatador.close();
      done();
    });
  });
  it('should set the correct value', done => {
    const blueMatador = init();
    blueMatador.gauge('a', 2).then(metric => {
      expect(metric.value).to.be.a('number', 2);
      blueMatador.close();
      done();
    });
  });
  it('should set the correct sampleRate', done => {
    const blueMatador = init();
    blueMatador.gauge('a', 1, {sampleRate: 0.5}).then(metric => {
      expect(metric.sampleRate).to.be.a('number', 0.5);
      blueMatador.close();
      done();
    });
  });
  it('should set the correct labels as array', done => {
    const blueMatador = init();
    blueMatador.gauge('a', 1, {labels: ['b', 'c:3']}).then(metric => {
      expect(metric.labels.length).to.be.a('number', 2);
      expect(metric.labels[0]).to.be.a('string', 'b');
      expect(metric.labels[1]).to.be.a('string', 'c:3');
      blueMatador.close();
      done();
    });
  });
  it('should set the correct labels as object', done => {
    const blueMatador = init();
    blueMatador.gauge('a', 1, {labels: { b: null, c: 3 }}).then(metric => {
      expect(metric.labels.length).to.be.a('number', 2);
      expect(metric.labels[0]).to.be.a('string', 'b');
      expect(metric.labels[1]).to.be.a('string', 'c:3');
      blueMatador.close();
      done();
    });
  });
  it('should sanitize labels', done => {
    const blueMatador = init();
    blueMatador.gauge('a', 1, {labels: ['a#b|c']}).then(metric => {
      expect(metric.labels.length).to.be.a('number', 1);
      expect(metric.labels[0]).to.be.a('string', 'a_b_c');
      blueMatador.close();
      done();
    });
  });
  it('should include the prefix in the name', done => {
    const blueMatador = init({prefix: 'prefix'});
    blueMatador.gauge('a', 1).then(metric => {
      expect(metric.name).to.be.a('string', 'prefix.a');
      blueMatador.close();
      done();
    });
  });
});

describe('init', () => {
  it('should reject non-string host', done => {
    try {
      init({host: 8767});
    } catch (err) {
      expect(err).to.be.an('error', 'The host argument must be one of type string or falsy. Recieved type number');
      done();
    }
  });
  it('should reject non-number port', done => {
    try {
      init({port: 'string'});
    } catch (err) {
      expect(err).to.be.an('error', 'The port argument must be of type number. Received type string');
      done();
    }
  });
  it('should set default parameters', done => {
    const blueMatador = init();
    expect(blueMatador).to.be.an('object').that.has.all.keys('gauge', 'count', 'close', 'host', 'port', 'prefix');
    expect(blueMatador.host).to.be.a('string', 'localhost');
    expect(blueMatador.port).to.be.a('number', 8767);
    done();
  });
  it('should set host and port', done => {
    const blueMatador = init({host: 'example', port: 1234});
    expect(blueMatador).to.be.an('object').that.has.all.keys('gauge', 'count', 'close', 'host', 'port', 'prefix');
    expect(blueMatador.host).to.be.a('string', 'example');
    expect(blueMatador.port).to.be.a('number', 1234);
    done();
  });
  it('should set prefix', done => {
    const blueMatador = init({prefix: 'prefix'});
    expect(blueMatador).to.be.an('object').that.has.all.keys('gauge', 'count', 'close', 'host', 'port', 'prefix');
    expect(blueMatador.prefix).to.be.a('string', 'prefix');
    done();
  });
});
