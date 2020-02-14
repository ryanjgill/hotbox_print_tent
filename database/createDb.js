const databaseIp = require('./../config.json').databaseIp
const databaseName = require('./../config.json').databaseName

const r = require('rethinkdbdash')({
  db: databaseName,
  servers: [{
    host: databaseIp,
    port: 28015
  }]
})

r.dbCreate(databaseName)
  .then(results => {
    r.dbList().then(dbs => {
      console.log(`${databaseName} created!`)
      process.exit()
    })
  })
  .catch(error => {
    if (error.msg.indexOf('already exists.') > -1) {
      console.log(`${databaseName} already exists.`)
      process.exit()
    }
    console.log(error)
    process.exit()
  })