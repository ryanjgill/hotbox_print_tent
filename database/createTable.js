const databaseIp = require('./../config.json').databaseIp
const databaseName = require('./../config.json').databaseName

const r = require('rethinkdbdash')({
  db: databaseName,
  servers: [{
    host: databaseIp,
    port: 28015
  }]
})

const tableName = 'measurements'

r.tableCreate(tableName)
  .then(results => {
    console.log(`${tableName} created!`)
    process.exit()
  })
  .catch(error => {
    if (error.msg.indexOf('already exists.') > -1) {
      console.log(`${tableName} already exists.`)
      process.exit()
    }
    console.log(error)
    process.exit()
  })