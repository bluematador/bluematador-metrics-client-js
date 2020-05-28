const blueMatador = require("./index")

let client = blueMatador.init()

client.gauge('cpu_util', 32.25, ["env:prod"], err => {
  console.log(err)
}, success => {
  console.log(success)
  client.close()
})

client.counter('homepage_clicks', ["env:dev"], err => {
  console.log(err)
}, success => {
  console.log(success)
  client.close()
})
