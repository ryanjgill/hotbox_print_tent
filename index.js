const express = require('express')
const cors = require('cors')
const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server)
const ip = require('ip')
const PORT = 3030
const serverIP = `${ip.address()}:${PORT}`
const path = require('path')
const bodyParser = require('body-parser')
const saveMeasurement = require('./database/saveMeasurement')
const getSampleMeasurements = require('./database/getSampleMeasurements')
const getSparklines = require('./database/getSparklines')

app.use(cors())

app.use(bodyParser.urlencoded({
  extended: true
}))

app.use(express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'views'))

// route for main dashboard
app.get('/', (req, res, next) => {
  res.render('index')
  next()
})

// get last measurement
app.get('/measurement', (req, res, next) => {
  res.json(lastReading || {})
  next()
})

app.get('/measurements', (req, res, next) => {
  getSampleMeasurements()
  .then(results => {
    let temp = results.reduce((measurements, m, index) => {
      if (index % 10 === 0) { measurements.push(m) }
      return measurements
    }, [])

    if (lastReading) {
      results.push(lastReading);
    }
    res.json(temp)
    next()
  })
  .catch(err => {
    console.log(err)
    next()
  })
})

app.get('/sparklines', (req, res, next) => {
  getSparklines()
  .then(results => {
    if (lastReading) {
      results.push(lastReading);
    }

    res.json(results)
    next()
  })
  .catch(err => {
    console.log(err)
    next()
  })
})

// POST temperatures
app.post('/temperatures', (req, res, next) => {
  let body = JSON.parse(JSON.stringify(req.body))
  let reading = {
    date: new Date(),
    probeA: body.probeA,
    probeB: body.probeB,
    probeC: body.probeC,
    probeD: body.probeD,
    probeE: body.probeE,
    rig_name: body.rig_name,
    humidity: body.humidity,
    temperature: body.temperature
  }

  lastReading = reading

  //console.log(lastReading)
  //io.sockets.emit('reading', reading)

  res.sendStatus(200)
  next()
})

setInterval(() => {
  if (!lastReading) { return }

  saveMeasurement(lastReading)
    .then(results => {
      lastSaveTime = new Date().getTime()
      console.log('Reading saved.')
    })
    .catch(error => {
      console.log(error)
    })
}, (1000 * 60))

server.listen(PORT, () => console.log(`API listening on ${serverIP}`))