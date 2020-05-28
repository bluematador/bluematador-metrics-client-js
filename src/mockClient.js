const blueMatador = require("./index")

let client = blueMatador.init()

client.gauge('cpu_util', 32.25, 1, ["env:prod"], (err, resp) => {
  console.log(err)
  console.log(resp)
  client.close()
})

// client.counter('homepage_clicks', ["env:dev"], err => {
//   console.log(err)
// }, success => {
//   console.log(success)
//   client.close()
// })
