const databaseIp = require('./../config.json').databaseIp
const databaseName = require('./../config.json').databaseName

const tableName = 'measurements'
const r = require('rethinkdbdash')({
  db: databaseName,
  servers: [{
    host: databaseIp,
    port: 28015
  }]
})

module.exports = function getSampleMeasurements(sampleSize) {
  const count = sampleSize ? sampleSize : 3000
  return r.table(tableName).sample(count).orderBy('date')
}

/* Other Queries */
// r.db(databaseName).table("measurements").sample(1000).orderBy(r.desc('date'))
