const databaseIp = require('./../config.json').databaseIp
const databaseName = require('./../config.json').databaseName

const defaultTable = 'measurements'
const r = require('rethinkdbdash')({
  db: databaseName,
  servers: [{
    host: databaseIp,
    port: 28015
  }]
})

module.exports = function saveMeasurement(measurement, _tableName) {
  let tableName = _tableName ? _tableName : defaultTable
  return r.table(tableName).insert(measurement)
}