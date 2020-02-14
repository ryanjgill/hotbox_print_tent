const databaseIp = require('./../config.json').databaseIp
const databaseName = require('./../config.json').databaseName
const saveMeasurement = require('./saveMeasurement')

const r = require('rethinkdbdash')({
  db: databaseName,
  servers: [{
    host: databaseIp,
    port: 28015
  }]
})

function copyTable() {
  r.table('purgedMeasurements')
    .orderBy({index: 'date'})
    .then(results => {
      results.forEach((m, i) => {
        saveMeasurement(m, 'measurements')
            .then(r => { })
            .catch(error => { console.log(error) })
      })
    })
}

copyTable()