const moment = require('moment')
const databaseIp = require('./../config.json').databaseIp
const databaseName = require('./../config.json').databaseName
const saveMeasurement = require('./saveMeasurement')

const timeBetweenMeasurements = (1000 * 60 * 5)

const tableName = 'measurements'
const r = require('rethinkdbdash')({
  db: databaseName,
  servers: [{
    host: databaseIp,
    port: 28015
  }]
})

function purgeMeasurements() {
  r.table(tableName)
    .orderBy({index: 'date'})
    //.limit(1000)
    .then(results => {
      let previousDate = new Date(2019, 1, 1)
      results.forEach((m, i) => {
        //if (i > 1000) { return }
        let timeDifference = moment(m.date).valueOf() - moment(previousDate).valueOf()
        //console.log(timeDifference);

        if (timeDifference > (timeBetweenMeasurements)) {
          saveMeasurement(m, 'purgedMeasurements')
            .then(r => { })
            .catch(error => { console.log(error) })
          //console.log(m)
          previousDate = m.date
        }
      })
    })
}

purgeMeasurements()