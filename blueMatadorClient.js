const metrics = require('./statsd.ts')

// metrics.sendGauge('cpu_throttling', 25.25, ['env:dev', 'env:prod'], function(err) {
//     console.log('client recieved err')
//     console.log(err)
// })

metrics.incrementCounter('homepage_clicks', ['env:dev'], function(err) {
    console.log('client recieved error')
    console.log(err)
})

