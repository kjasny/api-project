const express = require('express')
const app = express()
const cors = require('cors')
const path = require('path')

const {
  getAllCrematoriesController,
  getCrematoryByIdController,
  addNewCrematoryController,
} = require('./controllers/crematoriesControllers')

const {
  getAllFieldMLIsController,
  getFieldMLIBySearchTermWithCrematoriesController,
} = require('./controllers/fieldMLIsControllers')

app.use(cors())

app.use(express.static('client/build'))

app.get('/crematories', getAllCrematoriesController)

app.get('/crematories/:id', getCrematoryByIdController)

app.get('/fieldmlis', getAllFieldMLIsController)

app.get('/fieldmlis/:searchTerm',
  getFieldMLIBySearchTermWithCrematoriesController)

app.post('/crematories', express.json(), addNewCrematoryController)

app.get("*", (request, response) => {
  response.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
})

app.listen(8080, () => {
  console.log('Listening on port http://localhost:8080')
})
