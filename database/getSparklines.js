const databaseIp = require('./../config.json').databaseIp
const databaseName = require('./../config.json').databaseName
const moment = require('moment')

const tableName = 'measurements'
const r = require('rethinkdbdash')({
  db: databaseName,
  servers: [{
    host: databaseIp,
    port: 28015
  }]
})

module.exports = function getSparklines() {
  const _today = moment()
  const _yesterday = moment().subtract(1, 'days')

  const today = {
    year: _today.year(),
    month: _today.month()+1,
    day: _today.date(),
    hours: _today.hours()+6,
    minutes: _today.minutes(),
    seconds: _today.seconds()
  }

  const yesterday = {
    year: _yesterday.year(),
    month: _yesterday.month()+1,
    day: _yesterday.date()-1,
    hours: _yesterday.hours()+6,
    minutes: _yesterday.minutes(),
    seconds: _yesterday.seconds()
  }

  return r.table(tableName)
    .between(r.time(yesterday.year, yesterday.month, yesterday.day, yesterday.hours, 0, 0,"Z"), r.time(today.year, today.month, today.day, today.hours, today.minutes, today.seconds, "Z"), {index: 'date'})
    .orderBy({ index: r.desc('date') })
    .limit(300)
    .orderBy(r.asc('date'))
    
}