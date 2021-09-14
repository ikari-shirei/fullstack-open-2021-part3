const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
require('dotenv').config() // Before person
const Person = require('./models/person')

const app = express()

app.use(express.static('build'))
app.use(express.json())
app.use(morgan('tiny'))
app.use(cors())

app.set('Content-Security-Policy', "default-src 'none'")

let personsLength = 0

Person.countDocuments({}, function (err, count) {
  return count
})
  .then((value) => {
    personsLength = value

    return value
  })
  .catch((err) => {
    console.log(err)

    return 'ERROR'
  })

const currentDate = new Date()

app.get('/api/persons', (request, response) => {
  Person.find({}).then((result) => {
    response.json(result)
  })
})

app.get('/info', (request, response) => {
  response.send(
    `Phonebook has info for ${personsLength} people` + '<br/>' + currentDate
  )
})

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then((person) => {
      person ? response.json(person) : response.status(404).end()
    })
    .catch((error) => next(error))
})

app.delete('/api/persons/:id', (request, response) => {
  Person.findByIdAndRemove(request.params.id)
    .then((result) => {
      response.status(204).end()
    })
    .catch((error) => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body

  const person = {
    name: body.name,
    number: body.number,
  }

  Person.findByIdAndUpdate(request.params.id, person, {
    new: true,
    runValidators: true,
  })
    .then((updatedNote) => {
      response.json(updatedNote)
    })
    .catch((error) => next(error))
})

app.post('/api/persons', (request, response, next) => {
  const body = request.body

  Person.find({}).then((result) => {
    const newPerson = new Person({
      name: body.name,
      number: body.number,
      date: new Date(),
    })

    newPerson
      .save()
      .then((savedNote) => {
        response.json(savedNote)
      })
      .catch((error) => next(error))
  })
})

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

// handler of requests with unknown endpoint
app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'MongoError') {
    return response.status(400).json({ error: error.message })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } else {
    console.log(error.name)
  }

  next(error)
}

//last loaded
app.use(errorHandler)
