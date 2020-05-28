const blueMatador = require("./index")

let client = blueMatador.init()

client.gauge('cpu_util', 322.24, {environment: "dev", account: 12321321, flush: true})

// client.counter('homepage_clicks', (err, resp) => {
//   console.log(err, resp)
// })

// client.counter('homepage_clicks')

// client.counter('homepage_clicks', 1, {env: "prod", account: 1234534})

// client.counter('homepage_clicks', 1)

// client.counter('homepage_clicks', 2, 1)




