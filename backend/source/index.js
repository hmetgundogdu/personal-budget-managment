const express = require('express')

const path = require('path')
const cors = require('cors')

const app = express()
const db = require('./models')

const controllers = require('./controllers')
const authentication = require('./middlewares/authentication')
const standartResponse = require('./middlewares/standartResponse')

// initialize rotues with controllers
// serve static files
app.use(express.static(path.join(__dirname, 'public')))
// parse request bodies (req.body)
app.use(express.urlencoded({ extended: true }))
// parse application/json
app.use(express.json())

app.use(cors({credentials: true, origin: true}));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', '*') // 'GET, POST, OPTIONS, PUT, PATCH, DELETE'
  res.setHeader("Access-Control-Allow-Headers", '*') //"Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With"
  next()
})

app.use(standartResponse)
app.use(authentication)

// it must be after the express.json
controllers(app, db)

app.use(function (req, res) {
  res.status(404).render('404', { url: req.originalUrl })
})
//db.sequelize.sync()
app.listen(81)

require("./tasks").ScheduleManager(db);

console.log('Server started.')
