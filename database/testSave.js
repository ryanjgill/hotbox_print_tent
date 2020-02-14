const databaseIp = require('./../config.json').databaseIp
const databaseName = require('./../config.json').databaseName

const r = require('rethinkdbdash')({
  db: databaseName,
  servers: [{
    host: databaseIp,
    port: 28015
  }]
})

const tableName = 'test'

const testSave = () => {
  r.table(tableName)
    .insert({
      date: r.now(),
      humidity: Math.round(Math.random() * 1000 / 10),
      name: 'CR-10 Mini',
      temperature: Math.round(Math.random() * 1000 / 10)
    })
    .then(results => console.log(results))
    .catch(error => console.log(error))
}

setInterval(function () {
  testSave()
}, 1000)
