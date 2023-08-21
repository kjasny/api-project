const express = require('express')
const app = express()

const {
  getAllCrematoriesController,
  getCrematoryByIdController,
  addNewCrematoryController,
} = require('./controllers/crematoriesControllers')

const {
  getAllFieldMLIsController,
  getFieldMLIBySearchTermWithCrematoriesController,
} = require('./controllers/fieldMLIsControllers')

app.set('view engine', 'pug')

app.use(express.static('public'))

app.get('/', (request, response) => {
  return response.render('documentation')
})

app.get('/crematories', getAllCrematoriesController)

app.get('/crematories/:id', getCrematoryByIdController)

app.get('/fieldmlis', getAllFieldMLIsController)

app.get('/fieldmlis/:searchTerm',
  getFieldMLIBySearchTermWithCrematoriesController)

app.post('/crematories', express.json(), addNewCrematoryController)

app.listen(8080, () => {
  console.log('Listening on port http://localhost:8080')
})
