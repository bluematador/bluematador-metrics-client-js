const metrics = require('./statsd.ts')


metrics.sendGauge('test gauge', 25.25, ['dog', 'cat'])